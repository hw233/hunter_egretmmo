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
 * @class 年兽BOSS 进入战场UI
 *
 * @author Yu Qingchao
 *
 * 2019.07.18
 */
    var Activity_Boss = (function (_super) {
        __extends(Activity_Boss, _super);
        function Activity_Boss() {
            var _this = _super.call(this) || this;
            _this.labelInfoDate = new eui.ArrayCollection();
            _this.listTableViewRankData = new eui.ArrayCollection();
            _this.labelInfoListDate = new eui.ArrayCollection();
            _this.chatInfosMini = zj.Game.PlayerChatDataSystem.chatInfosMini;
            _this.listPop = true; //是否弹出伤害列表
            _this._normal = 0;
            _this._high = 0;
            _this._rank = null;
            _this.updata = null;
            _this.updatas = null;
            _this.skinName = "resource/skins/activity/Activity_BossSkin.exml";
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.gemsGold, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.gemsToken, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPlayer, _this);
            _this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRank, _this);
            _this.btnFightA.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFightA, _this);
            _this.btnFightB.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFightB, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            _this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.AddChatMini, _this);
            _this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.AddChatMini, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, _this.LoadListZorkBossChat, _this);
            _this.btnAttack.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAttack, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_COIN_CHANGE, _this.gemsGold, _this);
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.gemsToken, _this);
                egret.clearInterval(_this.updata);
                egret.clearInterval(_this.updatas);
            }, null);
            _this.init();
            _this.time = egret.setTimeout(_this.timeFun, _this, 200);
            return _this;
        }
        Activity_Boss.prototype.timeFun = function () {
            egret.clearTimeout(this.time);
            var ui = this.getChildByName("__rect_back");
            if (ui) {
                this.removeChild(ui);
            }
        };
        Activity_Boss.prototype.init = function () {
            this.scene = zj.StageSceneManager.Instance.GetCurScene();
            this.gemsToken();
            this.gemsGold();
            this.SetScorePer();
            this.UpdateRank();
            this.updata = egret.setInterval(this.UpdateRank, this, 990);
            this.updatas = egret.setInterval(this.UpdateScore, this, 990);
            egret.setTimeout(this.onClose1, this, 10000);
        };
        Activity_Boss.prototype.onClose1 = function () {
            this.labelInfoDate.removeAll();
            this.messageHistoryChat.visible = false;
        };
        Activity_Boss.prototype.UpdateScore = function () {
            var _this = this;
            var _a = zj.Game.PlayerBossSystem.ActivityBossOpenTime(), bOpen = _a[0], lastTime = _a[1];
            var time = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS].leftTime;
            var leftTime = time - Math.floor(egret.getTimer() / 1000);
            var str_time = zj.Set.timeLeaveSec(Number(lastTime));
            var zeroTime = zj.Set.timeLeaveSec(0);
            if (!bOpen) {
                this.labelStartTime.text = zeroTime;
                zj.loadUI(zj.Activity_BossEnd)
                    .then(function (dialog) {
                    egret.clearInterval(_this.updatas);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.init();
                });
            }
            else {
                this.labelStartTime.text = str_time;
            }
        };
        //玩家积分排行更新
        Activity_Boss.prototype.UpdateRank = function () {
            var _this = this;
            this.arrTableViewRank = new eui.ArrayCollection();
            if (zj.Gmgr.Instance.bDisconnectNet == true)
                return;
            var display_num = 20;
            zj.Game.PlayerBossSystem.darklandBossScoreRank().then(function (msg) {
                _this._rank = msg.body.ranks;
                var _rank = _this._rank;
                if (_this.listPop) {
                    display_num = _rank.length >= display_num ? display_num : _rank.length;
                    for (var i = 0; i < display_num; i++) {
                        _this.arrTableViewRank.addItem({
                            info: _rank[i],
                            num: 1
                        });
                    }
                    _this.listTableViewRank.dataProvider = _this.arrTableViewRank;
                    _this.listTableViewRank.itemRenderer = zj.Activity_BossItem;
                }
                _this.UpdateMyRank(msg.body.self_rank);
            }).catch(function (reason) { });
        };
        //我的排行
        Activity_Boss.prototype.UpdateMyRank = function (rankInfo) {
            var rank = 0;
            if (zj.Game.PlayerBossSystem.ActivityBoss.myRank == 0 || rankInfo.score == 0) {
                this.labelMyRank.text = zj.TextsConfig.TextConfig_League.noRank;
            }
            else {
                this.labelMyRank.text = rankInfo.rank;
            }
            this.labelMyName.text = rankInfo.roleName;
            this.labelMyValue.text = rankInfo.score;
            // this.labelPoints.text = rankInfo.score;
        };
        //金币与钻石数量
        Activity_Boss.prototype.gemsToken = function () {
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
            if (this.lbGemstone.text.length > 6) {
                this.lbGemstone.size = 12;
            }
            else {
                this.lbGemstone.size = 16;
            }
        };
        Activity_Boss.prototype.gemsGold = function () {
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                if (((zj.Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.lbGold.text = ((zj.Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            if (this.lbGold.text.length > 6) {
                this.lbGold.size = 12;
            }
            else {
                this.lbGold.size = 16;
            }
        };
        Activity_Boss.prototype.onBtnRank = function () {
            var _this = this;
            var call = function () {
                _this.listPop = !_this.listPop;
                if (_this.listPop) {
                    _this.UpdateRank();
                }
            };
            var action = null;
            if (this.listPop) {
                zj.Set.ButtonBackgroud(this.btnRank, zj.cachekey("ui_activity_boss_ButtonTopHitRankNor2_png", this), zj.cachekey("ui_activity_boss_ButtonTopHitRankSel2_png", this));
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
                zj.Set.ButtonBackgroud(this.btnRank, zj.cachekey("ui_activity_boss_ButtonTopHitRankNor1_png", this), zj.cachekey("ui_activity_boss_ButtonTopHitRankSel1_png", this));
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
        //设置文本
        Activity_Boss.prototype.SetScorePer = function () {
            var a = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS].info;
            var num = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS].info % 10;
            var bossCommonInspire = 0;
            var bossSeniorInspire = 0;
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossCommonInspire.length != 0) {
                for (var k in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossCommonInspire) {
                    var v = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossCommonInspire[k];
                    if (num == 0) {
                        bossCommonInspire = this._normal;
                    }
                    else if (v.key == num) {
                        bossCommonInspire = v.value;
                    }
                }
            }
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossSeniorInspire.length != 0) {
                for (var k in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossSeniorInspire) {
                    var v = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossSeniorInspire[k];
                    if (num == 0) {
                        bossSeniorInspire = this._high;
                    }
                    else if (v.key == num) {
                        bossSeniorInspire = v.value;
                    }
                }
            }
            var nums = 0;
            if (bossCommonInspire == null) {
                bossCommonInspire = 0;
            }
            if (bossSeniorInspire == null) {
                bossSeniorInspire = 0;
            }
            var str = bossCommonInspire * zj.CommonConfig.darkland_boss_inspire_percent[0] + bossSeniorInspire * zj.CommonConfig.darkland_boss_inspire_percent[1];
            this.lbFightWord.text = str + "%";
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime.length == 0) {
                this.lbAttackTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Error.battle_num, zj.CommonConfig.darkland_boss_battle_times);
            }
            else {
                for (var k in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime) {
                    var v = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime[k];
                    if (v.key == num) {
                        nums = v.value;
                    }
                }
                this.lbAttackTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Error.battle_num, (zj.CommonConfig.darkland_boss_battle_times - nums));
            }
            if ((zj.CommonConfig.darkland_boss_battle_times - nums) <= 0) {
                this.btnAttack.enabled = false;
            }
            else {
                this.btnAttack.enabled = true;
            }
            this.lbGold0.text = zj.CommonConfig.darkland_boss_inspire_consume[0][1].toString();
            this.lbZuanshi.text = zj.CommonConfig.darkland_boss_inspire_consume[1][1].toString();
        };
        /**进入聊天(点击聊天按钮) */
        Activity_Boss.prototype.AddChatMini = function () {
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                dialog.show();
                dialog.inittypr(1);
            });
        };
        /**
         * 对boss伤害简易聊天
         */
        Activity_Boss.prototype.LoadListZorkBossChat = function (msg, result) {
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
            this.labelInfoList.itemRenderer = zj.Chat_ItemMini;
            //egret.Tween.get(this.imgChatBack).wait(100).to({ alpha: 0 });
            egret.Tween.get(this.imgChatBack).wait(100).to({ alpha: 0 })
                .call(function () {
                _this.groupMiniChat.visible = false;
            });
        };
        Activity_Boss.prototype.combatChat = function (e) {
            this.messageHistoryChat.visible = true;
            //this.LabelInfo.text = "【" + e.data.name + "】" + " " + JSON.parse(e.data.content)[0].content;
            this.InitChatList();
        };
        /**
         * 简易聊天内容list列表
         */
        Activity_Boss.prototype.InitChatList = function () {
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
        //金币激励
        Activity_Boss.prototype.onBtnFightA = function () {
            this.DarklandBossInspire(1);
        };
        //钻石激励
        Activity_Boss.prototype.onBtnFightB = function () {
            this.DarklandBossInspire(2);
        };
        Activity_Boss.prototype.DarklandBossInspire = function (inspireType) {
            var _this = this;
            zj.Game.PlayerBossSystem.DarklandBossInspire(inspireType).then(function () {
                zj.toast_success("激励成功");
                _this.MixInfo();
            }).catch(function (reason) { });
        };
        //加金币
        Activity_Boss.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList(true);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //加钻石
        Activity_Boss.prototype.onBtnAddGemstone = function () {
            zj.Game.UIManager.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.init();
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**
         * 挑战
         */
        Activity_Boss.prototype.onBtnAttack = function () {
            var _this = this;
            if (this.scene.playerLeader.otherState == zj.TableEnum.TableEnumOtherState.OtherState_Die) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Wonderland.die_error_tips);
                return;
            }
            this.MobsInfo_Visit().then(function (data) {
                _this.scene.loadFormation();
            }).catch(function (reason) { zj.toast_warning(reason); });
        };
        /**
         * 拉取年兽BOSS怪物信息
         */
        Activity_Boss.prototype.MobsInfo_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
                request.body.battleType = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
                request.body.mobsId = zj.Game.PlayerBossSystem.ActivityBoss.bossId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //屏蔽玩家
        Activity_Boss.prototype.onBtnPlayer = function () {
            var a = this.scene.bHidePerson;
            if (this.scene.bHidePerson == false) {
                this.btnPlayer.currentState = "down";
                zj.Set.ButtonBackgroud(this.btnPlayer, zj.cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png", this), zj.cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png", this), zj.cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png", this));
                this.scene.hidePerson(true);
            }
            else {
                this.bHidePerson = false;
                this.btnPlayer.currentState = "up";
                zj.Set.ButtonBackgroud(this.btnPlayer, zj.cachekey("ui_wonderland_boss_ButtonTopClosePlayerNor_png", this), zj.cachekey("ui_wonderland_boss_ButtonTopClosePlayerSel_png", this), zj.cachekey("ui_wonderland_boss_ButtonTopClosePlayerNor_png", this));
                this.scene.hidePerson(false);
            }
        };
        Activity_Boss.prototype.onBtnClose = function () {
            zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Wonderland.return_tip, function () {
                zj.Game.PlayerBossSystem.closeActivityBoss();
            });
            // loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
            // 	dialog.show(UI.SHOW_FROM_TOP);
            // 	dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Wonderland.return_tip, this));
            // 	dialog.setCB(dark);
            // });
            // let dark = () => {
            // 	Game.PlayerBossSystem.DarklandBossLeave().then(() => {
            // 		this.close(UI.HIDE_TO_TOP);
            // 	}).catch(reason => { });
            // }
        };
        //拉取杂项信息
        Activity_Boss.prototype.MixInfo = function () {
            var _this = this;
            zj.Game.PlayerDoubleBallSystem.GetLotteryFruitInfoReqBody_Visit().then(function (data) {
                _this.SetScorePer();
            }).catch(function () { });
        };
        Activity_Boss.prototype.dealFightUi = function () {
        };
        return Activity_Boss;
    }(zj.Dialog));
    zj.Activity_Boss = Activity_Boss;
    __reflect(Activity_Boss.prototype, "zj.Activity_Boss");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_Boss.js.map