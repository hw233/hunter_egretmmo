var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    /**
     * @class 贪婪之岛 寿富拉比进入战场UI
     *
     * @author Lian Lei
     *
     * 2019.06.17
     */
    var _freshRank = 5;
    var Zork_Boss = (function (_super) {
        __extends(Zork_Boss, _super);
        function Zork_Boss() {
            var _this = _super.call(this) || this;
            _this._rank = [];
            _this.wonderlandChatList = [];
            _this.listTableViewRankData = new eui.ArrayCollection();
            _this.labelInfoListDate = new eui.ArrayCollection();
            _this.labelInfoDate = new eui.ArrayCollection();
            _this.chatInfosMini = zj.Game.PlayerChatDataSystem.chatInfosMini;
            _this.barX = 172 + 339;
            _this.skinName = "resource/skins/zork/Zork_BossSkin.exml";
            _this.timer1 = egret.setInterval(_this.Update, _this, 990);
            _this.timer2 = egret.setInterval(_this.UpdateRank, _this, _freshRank * 100);
            _this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.AddChatMini, _this);
            _this.groupRank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRank, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReturn, _this);
            _this.btnAttack.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAttack, _this);
            _this.groupPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPlayer, _this);
            _this.btnRevive.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRevive, _this);
            _this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.AddChatMini, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.timer = egret.setInterval(_this.update, _this, 1000);
            //Game.EventManager.on(GameEvent.COMBAT_CHAT, this.combatChat, this);
            _this.init();
            _this.time = egret.setTimeout(_this.timeFun, _this, 200);
            return _this;
        }
        Zork_Boss.prototype.timeFun = function () {
            egret.clearTimeout(this.time);
            var ui = this.getChildByName("__rect_back");
            if (ui) {
                this.removeChild(ui);
            }
        };
        Zork_Boss.prototype.init = function () {
            this.scene = zj.StageSceneManager.Instance.GetCurScene();
            this.tagMainMenu = "ZorkBossMenu"; // 标记为主菜单UI
            this.groupAB.scaleX = zj.Device.scaleFactor;
            this.groupAB.scaleY = zj.Device.scaleFactor;
            this.groupScaleB.scaleX = zj.Device.scaleFactor;
            this.groupScaleB.scaleY = zj.Device.scaleFactor;
            this.groupAB2.scaleX = zj.Device.scaleFactor;
            this.groupAB2.scaleY = zj.Device.scaleFactor;
            this.groupBlood.visible = false;
            this.groupButton.visible = false;
            // TipManager.ShowResourcesInfo(this.groupResource, this, [2], null, null);
            this.tokenBefore = -1; // 元宝数
            this.plantBefore = -1; // 金币数
            this.listPop = true; // 伤害排行弹出
            this.bossState = 0; // 打boss阶段
            this._rank = []; // 排行
            this.curBoss = this.scene.getLiveBoss();
            this.bossBlood = this.curBoss.getMaxHp(); // boss总血量
            this.bossBloodPre = -1; // 临时血量
            this.bloodBarWidth = this.imgBossBlood.width;
            this.bloodBarHeight = this.imgBossBlood.height;
            this.barSize = [this.imgBossBlood.height, this.imgBossBlood.width];
            this.selfHp = 0;
            this.labelMyRank.visible = true;
            this.labelMyRank.text = "99+";
            // this.SpriteMyRank:setVisible(false)
            this.labelMyValue.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.perDemage, zj.Set.numberUnit4(0), 0);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.LoadListZorkBossChat, this);
            this.labelMyName.text = zj.Game.PlayerInfoSystem.BaseInfo.name;
            this.wonderlandChatList = [];
            this.SetInfo();
            this.Update();
            this.UpdateRank();
            //this.LoadListZorkBossChat();
            //this.AddChatMini();
            egret.setTimeout(this.onClose1, this, 10000);
        };
        Zork_Boss.prototype.onClose1 = function () {
            this.labelInfoDate.removeAll();
            this.messageHistoryChat.visible = false;
        };
        Zork_Boss.prototype.combatChat = function (e) {
            this.messageHistoryChat.visible = true;
            //this.LabelInfo.text = "【" + e.data.name + "】" + " " + JSON.parse(e.data.content)[0].content;
            this.InitChatList();
        };
        /**
         * 简易聊天内容list列表
         */
        Zork_Boss.prototype.InitChatList = function () {
            this.labelInfoDate.removeAll();
            for (var i = 0; i < this.chatInfosMini.length; i++) {
                var v = this.chatInfosMini[i];
                var ChatItem = new zj.FormatChatItem();
                var content = zj.Game.PlayerChatDataSystem.GetChatInfo(v);
                var lineNum = zj.Game.PlayerChatDataSystem.getStrlineNum(zj.HelpUtil.textConfigFormat(content[0]), 350);
                if (lineNum == 1) {
                    if (v.type == 5 && v.content != "") {
                        ChatItem.itemNum = 40;
                    }
                    else {
                        ChatItem.itemNum = 20;
                    }
                }
                else {
                    ChatItem.itemNum = 40;
                }
                ChatItem.Data = v;
                this.labelInfoDate.addItem(ChatItem);
            }
            this.simpleChat.dataProvider = this.labelInfoDate;
            this.simpleChat.itemRenderer = zj.HXH_ChatItem;
        };
        Zork_Boss.prototype.SetInfo = function () {
            this.btnCancel.visible = false;
            var icon_id = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_roleId != null ? zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_roleId : 27;
            this.imgBossIcon.source = zj.cachekey(zj.TableMapRole.Item(icon_id).head_path, this);
            var cur = this.curBoss.getCurHp();
            var max = this.curBoss.getMaxHp();
            this.labelBlood.text = (zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.lastPerBlood, (cur * 100 / max).toFixed(2)));
        };
        Zork_Boss.prototype.Update = function () {
            this.UpdateUI();
            this.UpdateBossBlood();
            zj.Game.PlayerZorkSystem.bossInfo().then(function () { });
        };
        Zork_Boss.prototype.UpdateUI = function () {
            var time = 0;
            var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
            if (progress != null) {
                if (this.bossState != progress.info) {
                    this.bossState = progress.info;
                }
            }
            if (this.scene.prepareTime <= 0) {
                time = progress.leftTime;
                if (this.groupBlood.visible == false) {
                    this.groupBlood.visible = true;
                }
                if (this.groupButton.visible == false) {
                    this.groupButton.visible = true;
                }
            }
            else {
                time = this.scene.prepareTime / 1000;
                if (this.groupBlood.visible == true) {
                    this.groupBlood.visible = false;
                }
                if (this.groupButton.visible == true) {
                    this.groupButton.visible = false;
                }
            }
            this.labelStartTime.text = zj.Helper.GetTimeStr1(time);
        };
        Zork_Boss.prototype.UpdateRank = function () {
            var _this = this;
            if (zj.Gmgr.Instance.bDisconnectNet == true || zj.Game.PlayerZorkSystem.zorkBoss.isZorkBossEnd == true)
                return;
            if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info != 0) {
                zj.Game.PlayerZorkSystem.bossRank()
                    .then(function (value) {
                    _this.BossRankReqBody_Visit();
                })
                    .catch(function (reason) {
                    // toast_warning(reason);
                });
            }
        };
        Zork_Boss.prototype.BossRankReqBody_Visit = function () {
            var display_num = 10;
            this._rank = zj.Game.PlayerZorkSystem.zorkBoss.rankItems;
            var _rank = this._rank;
            if (this.listPop) {
                display_num = _rank.length >= display_num ? display_num : _rank.length;
                this.listTableViewRankData.removeAll();
                for (var i = 0; i < display_num; i++) {
                    var itemData = new zj.Zork_BossItemData();
                    itemData.info = _rank[i];
                    itemData.blood = this.bossBlood;
                    this.listTableViewRankData.addItem(itemData);
                }
                this.listTableViewRank.dataProvider = this.listTableViewRankData;
                this.listTableViewRank.itemRenderer = zj.Zork_BossItem;
            }
            this.UpdateMyRank();
        };
        Zork_Boss.prototype.UpdateMyRank = function () {
            var rank = 0;
            if (zj.Game.PlayerZorkSystem.zorkBoss.myRank == 0) {
                this.labelMyRank.text = zj.CommonConfig.scene_boss_hurt_rank_number + "+";
            }
            else {
                this.labelMyRank.text = zj.Game.PlayerZorkSystem.zorkBoss.myRank.toString();
            }
            this.labelMyValue.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.perDemage, Number(zj.Set.numberUnit4(zj.Game.PlayerZorkSystem.zork.roleInfo.bossHurt)).toFixed(2), (zj.Game.PlayerZorkSystem.zork.roleInfo.bossHurt / this.bossBlood * 100).toFixed(2));
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this._rank); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (zj.Game.PlayerInfoSystem.BaseInfo.id == v.baseInfo.id) {
                    var rank_1 = v.rank;
                    var persent = v.value / this.bossBlood * 100;
                    this.labelMyRank.text = rank_1;
                    this.labelMyValue.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.perDemage, zj.Set.numberUnit4(v.value), persent.toFixed(2));
                }
            }
        };
        Zork_Boss.prototype.refreshRank = function () {
        };
        /**进入聊天(点击聊天按钮) */
        Zork_Boss.prototype.AddChatMini = function () {
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                dialog.show();
            });
        };
        /**
         * 对boss伤害简易聊天
         */
        Zork_Boss.prototype.LoadListZorkBossChat = function (msg, result) {
            var _this = this;
            msg = msg.data.body;
            zj.Game.PlayerChatDataSystem.LoadServerData_ChatInfos(msg.chatinfos);
            // if (Game.PlayerMissionSystem.tableLength(Game.PlayerZorkSystem.zorkBoss.chatInfosMini) == 0) {
            // 	this.imgChatBack.alpha = 0;
            // 	this.imgChatBack.visible = false;
            // 	return;
            // }
            //egret.Tween.removeTweens(this.imgChatBack);
            //this.imgChatBack.alpha = 1;
            //this.imgChatBack.visible = true;
            this.groupMiniChat.visible = true;
            this.labelInfoListDate.removeAll();
            // 聊天  对炸弹魔的伤害
            for (var i = 0; i < zj.Game.PlayerZorkSystem.zorkBoss.chatInfosMini.length; i++) {
                var v = zj.Game.PlayerZorkSystem.zorkBoss.chatInfosMini[i];
                this.labelInfoListDate.addItem(v);
            }
            this.labelInfoList.dataProvider = this.labelInfoListDate;
            this.labelInfoList.itemRenderer = zj.Chat_HarmBoss;
            //egret.Tween.get(this.imgChatBack).wait(100).to({ alpha: 0 });
            egret.Tween.get(this.imgChatBack).wait(100).to({ alpha: 0 })
                .call(function () {
                _this.groupMiniChat.visible = false;
            });
        };
        Zork_Boss.prototype.SetDieTime = function (time) {
            this.groupDie.visible = true;
            this.time_meter = this.scene.playerLeader.dieProtectTime;
            this.labelLeftTime.text = Math.floor(this.time_meter / 1000).toString();
            // egret.clearInterval(this.time_id);
            // this.time_id = egret.setInterval(this.OnthisTimeKeeper, this, 330);
            this.labelConsume.text = zj.CommonConfig.scene_clear_dead_cooling_consume[this.scene.sceneType].toString();
            egret.setTimeout(this.OnthisTimeKeeper, this, 30);
        };
        Zork_Boss.prototype.OnthisTimeKeeper = function () {
            // if (this.time_id == -1) return;
            if (!this.scene || !this.scene.playerLeader)
                return;
            this.time_meter = this.scene.playerLeader.dieProtectTime;
            var _posState = this.scene.playerLeader.posState;
            var realTime = Math.floor(this.time_meter / 1000);
            if (realTime >= 0 && this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                this.labelLeftTime.text = realTime.toString();
            }
            else {
                // egret.clearInterval(this.time_id);
                this.groupDie.visible = false;
                this.time_id = -1;
            }
        };
        Zork_Boss.prototype.RefreshRes = function () {
            // this.SetInfoUser();
        };
        Zork_Boss.prototype.UpdateBossBlood = function () {
            if (this.curBoss == null)
                return;
            var cur = this.curBoss.getCurHp();
            var max = this.curBoss.getMaxHp();
            if (cur != this.bossBloodPre) {
                this.bossBloodPre = cur;
                var w = this.bloodBarWidth * (cur / max);
                if (!this.rect) {
                    this.rect = zj.Util.getMaskImgBlack(339, 22);
                    this.groupBlood.addChild(this.rect);
                    this.imgBossBlood.mask = this.rect;
                    this.rect.y = 9.5;
                }
                this.rect.x = this.barX - 339 * (cur / max);
                this.labelBlood.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.lastPerBlood, (cur * 100 / max).toFixed(2));
            }
        };
        Zork_Boss.prototype.UpdateUserBlood = function () {
            if (this.selfHp != this.scene.playerLeader.uiHp) {
                this.selfHp = this.scene.playerLeader.uiHp;
                var size_bar = zj.getPercentSize(this.barSize, this.selfHp / 100);
                // this.BarHeroBlood.width = size_bar.width;
                // this.BarHeroBlood.height = size_bar.height;
            }
        };
        /**Boss出现龙骨动画 */
        Zork_Boss.prototype.BossAppearUi = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "tlzd_boss_chuxian", "armatureName", null, 0)
                .then(function (display) {
                display.x = _this.groupMid.explicitWidth / 2;
                display.y = _this.groupMid.explicitHeight / 2;
                display.name = "boss_chuxian";
                _this.groupMid.addChild(display);
                display.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, function () {
                    var ani = _this.groupMid.getChildByName("boss_chuxian");
                    if (ani != null)
                        _this.groupMid.removeChild(ani);
                }, _this);
            })
                .catch(function (reason) {
            });
        };
        Zork_Boss.prototype.onBtnReturn = function () {
            var _this = this;
            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Wonderland.return_tip, function () {
                zj.Game.PlayerZorkSystem.closeZorkBoss(_this.closeFinish, _this);
            });
        };
        Zork_Boss.prototype.closeFinish = function () {
            zj.SceneManager.initType = 3;
            zj.SceneManager.instance.EnterSceneZorkBoss();
        };
        Zork_Boss.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        };
        /**立即复活 */
        Zork_Boss.prototype.onBtnRevive = function () {
            var _this = this;
            var cb = function () {
                _this.time_id = -1;
                egret.clearInterval(_this.time_id);
                _this.groupDie.visible = false;
            };
            this.scene.revivePersonReq(cb);
        };
        /**屏蔽玩家按钮 */
        Zork_Boss.prototype.onBtnPlayer = function () {
            if (this.scene.bHidePerson == false) {
                this.btnPlayer.enabled = true;
                // Set.ButtonBackgroud(this.btnPlayer,cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png",this),cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png",this),cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png",this));
                this.scene.hidePerson(true);
            }
            else {
                this.bHidePerson = false;
                this.btnPlayer.enabled = false;
                // Set.ButtonBackgroud(this.btnPlayer,cachekey("ui_wonderland_boss_ButtonTopClosePlayerNor_png",this),cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png",this),cachekey("ui_wonderland_boss_ButtonTopClosePlayerNor_png",this));
                this.scene.hidePerson(false);
            }
        };
        /**伤害排行按钮 */
        Zork_Boss.prototype.onBtnRank = function () {
            var _this = this;
            this.btnRank.enabled = false;
            egret.Tween.removeTweens(this.groupList);
            if (this.listPop) {
                egret.Tween.get(this.groupList)
                    .to({ y: -138 }, 500, egret.Ease.backIn)
                    .call(function () {
                    _this.btnRank.enabled = true;
                    _this.listPop = !_this.listPop;
                    if (_this.listPop) {
                        _this.UpdateRank();
                    }
                });
            }
            else {
                egret.Tween.get(this.groupList)
                    .to({ y: 60 }, 500, egret.Ease.bounceOut)
                    .call(function () {
                    _this.btnRank.enabled = true;
                    _this.listPop = !_this.listPop;
                    if (_this.listPop) {
                        _this.UpdateRank();
                    }
                });
            }
        };
        /**挑战按钮 */
        Zork_Boss.prototype.onBtnAttack = function () {
            if (this.scene.prepareTime > 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_WonderlandBoss.not_start);
                return;
            }
            if (this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            this.scene.dealFight();
        };
        Zork_Boss.prototype.close = function () {
            _super.prototype.close.call(this);
            egret.Tween.removeTweens(this.imgChatBack);
            this.scene = null;
            this.curBoss = null;
            egret.clearInterval(this.timer1);
            egret.clearInterval(this.timer2);
            egret.clearInterval(this.time_id);
            egret.clearInterval(this.time);
        };
        Zork_Boss.prototype.dealFightUi = function () {
        };
        Zork_Boss.prototype.update = function () {
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                if (((zj.Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((zj.Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
        };
        return Zork_Boss;
    }(zj.Dialog));
    zj.Zork_Boss = Zork_Boss;
    __reflect(Zork_Boss.prototype, "zj.Zork_Boss");
})(zj || (zj = {}));
//# sourceMappingURL=Zork_Boss.js.map