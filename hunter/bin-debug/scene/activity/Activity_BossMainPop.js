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
    //Activity_BossMainPop 年兽来袭
    //yuqingchao
    //2019.07.16
    var Activity_BossMainPop = (function (_super) {
        __extends(Activity_BossMainPop, _super);
        function Activity_BossMainPop() {
            var _this = _super.call(this) || this;
            _this.rank = [];
            _this.myRank = null;
            _this.reward = [];
            _this.skinName = "resource/skins/activity/Activity_BossMainPopSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnEnter, _this);
            _this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRule, _this);
            _this.groupAward.visible = false;
            _this.groupHit.visible = false;
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.timer);
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            return _this;
        }
        Activity_BossMainPop.prototype.init = function () {
            var any = zj.Game.PlayerActivitySystem.Activities;
            this.reward = zj.Game.PlayerBossSystem.GetBossRankGoodsTbl();
            this.freshList();
            this.setInfo();
            this.upDate();
            this.timer = egret.setInterval(this.upDate, this, 990);
        };
        Activity_BossMainPop.prototype.setInfo = function () {
            var tblWorldBoss = zj.TableClientWorldBoss.Item(zj.CommonConfig.darkland_boss_monster_id[0]);
            var infoLevel = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.bossLevel, tblWorldBoss.init_level);
            this.lbLevel.text = infoLevel.toString();
        };
        //排名挡位奖励
        Activity_BossMainPop.prototype.setRewardList = function () {
            this.arrViewReward = new eui.ArrayCollection();
            for (var i = 0; i < this.reward.length; i++) {
                this.arrViewReward.addItem({
                    i: i,
                    info: this.reward[i],
                    lth: this.reward.length,
                    father: this,
                });
            }
            this.lstViewReward.dataProvider = this.arrViewReward;
            this.lstViewReward.itemRenderer = zj.Activity_BossMainPopItem;
        };
        //击杀奖励
        Activity_BossMainPop.prototype.setRankList = function () {
            var display_num = 20;
            this.rank = zj.Game.PlayerBossSystem.ActivityBoss.rankItems;
            this.myRank = zj.Game.PlayerBossSystem.ActivityBoss.myRank;
            //我的排名
            if (this.myRank.score > 0) {
                this.lbRank.text = this.myRank.rank;
            }
            else {
                this.lbRank.text = zj.TextsConfig.TextsConfig_Rank.noRank;
            }
            this.lbName.text = this.myRank.roleName;
            this.lbHit.text = this.myRank.score;
            //排名列表
            display_num = this.rank.length >= display_num ? display_num : this.rank.length;
            this.arrHit = new eui.ArrayCollection();
            for (var i = 0; i < display_num; i++) {
                this.arrHit.addItem({
                    i: i,
                    info: this.rank[i],
                });
            }
            this.lstHit.dataProvider = this.arrHit;
            this.lstHit.itemRenderer = zj.Activity_BossMainPopHitItem;
        };
        //更新
        Activity_BossMainPop.prototype.upDate = function () {
            this.UpdateBase();
            this.UpdateUI();
            this.freshList();
            this.UpdateBossBlood();
        };
        Activity_BossMainPop.prototype.UpdateBase = function () {
            var _a = zj.Game.PlayerBossSystem.ActivityBossOpenTime(), bOpen = _a[0], lastTime = _a[1];
            if (bOpen) {
                this.btnEnter.enabled = true;
            }
            else {
                this.btnEnter.enabled = false;
            }
        };
        Activity_BossMainPop.prototype.UpdateUI = function () {
            var _a = zj.Game.PlayerBossSystem.ActivityBossOpenTime(), bOpen = _a[0], lastTime = _a[1];
            var _b = zj.Game.PlayerBossSystem.ActivityBossIsFive(), IsStart = _b[0], IsOver = _b[1], startTime = _b[2], overTime = _b[3];
            var str_time = zj.Set.timeLeaveSec(Number(lastTime));
            if (IsOver) {
                str_time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToEnd3, zj.Set.timeLeaveSec(Number(overTime)));
                this.lbTime.textFlow = zj.Util.RichText(str_time);
            }
            else if (!bOpen) {
                str_time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToOpen3, str_time);
                this.lbTime.textFlow = zj.Util.RichText(str_time);
            }
            else {
                str_time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToEnd2, str_time);
                this.lbTime.textFlow = zj.Util.RichText(str_time);
            }
            var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS];
        };
        Activity_BossMainPop.prototype.UpdateBossBlood = function () {
            this.lbBloodPar.text = zj.TextsConfig.TextsConfig_WonderlandBoss.lasBossBlood;
            var _a = zj.Game.PlayerBossSystem.ActivityBossIsFive(), IsStart = _a[0], IsOver = _a[1], startTime = _a[2], overTime = _a[3];
            this.imgSkill.visible = Boolean(IsOver);
        };
        Activity_BossMainPop.prototype.freshList = function () {
            var _this = this;
            //排名挡位奖励开启
            var openAward = function () {
                if (_this.groupAward.visible == false) {
                    _this.groupAward.visible = true;
                    _this.setRewardList();
                    // this.isRewardTip = true;
                }
                if (_this.groupHit.visible) {
                    _this.groupHit.visible = false;
                }
            };
            //击杀排名
            var openHit = function () {
                if (_this.groupHit.visible == false) {
                    _this.groupHit.visible = true;
                    _this.UpdateRank();
                    // this.isRewardTip = false
                }
                if (_this.groupAward.visible) {
                    _this.groupAward.visible = false;
                }
            };
            var _a = zj.Game.PlayerBossSystem.ActivityBossOpenTime(), bOpen = _a[0], lastTime = _a[1];
            var _b = zj.Game.PlayerBossSystem.ActivityBossIsFive(), IsStart = _b[0], IsOver = _b[1], startTime = _b[2], overTime = _b[3];
            if (!bOpen && IsOver) {
                openHit();
            }
            else {
                openAward();
            }
        };
        Activity_BossMainPop.prototype.UpdateRank = function () {
            var _this = this;
            zj.Game.PlayerBossSystem.darklandBossScoreRank().then(function () {
                _this.setRankList();
            }).catch(function (reason) {
                zj.toast(reason);
            });
        };
        /**进入战场 */
        Activity_BossMainPop.prototype.onBtnEnter = function () {
            var _this = this;
            zj.Game.PlayerBossSystem.DarklandBossEnter().then(function () {
                zj.MapSceneLoading.getInstance().loadFightRes(19, _this.wonderlandBoss, _this);
            }).catch(function (reason) { });
        };
        Activity_BossMainPop.prototype.wonderlandBoss = function () {
            zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneActivityBoss);
        };
        /**说明 */
        Activity_BossMainPop.prototype.onBtnRule = function () {
            zj.loadUI(zj.Common_RuleDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(zj.RuleConfig.ActivityBoss);
            });
        };
        Activity_BossMainPop.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        //阵型
        Activity_BossMainPop.prototype.InitWonderlandList = function () {
            var generalIdList = [];
            var hasServerFormat = zj.Table.FindF(zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals, function (k, v) {
                if (v != 0) {
                    return true;
                }
                return false;
            });
            var generalList, isChange;
            if (hasServerFormat) {
                for (var k in zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals) {
                    var v = zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals[k];
                    if (v != 0) {
                        generalIdList.push(v);
                    }
                }
                ;
                for (var k in zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].reserves) {
                    var v = zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].reserves[k];
                    generalIdList.push(v);
                }
                _a = zj.Game.PlayerHunterSystem.getWonderlandGeneral(zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND]), generalList = _a[0], isChange = _a[1];
            }
            else {
                _b = zj.Game.PlayerHunterSystem.getWonderlandGeneral(null), generalList = _b[0], isChange = _b[1];
            }
            zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals = [];
            zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].reserves = [];
            for (var k in generalList) {
                var v = generalList[k];
                if (Number(k) < 4) {
                    zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals.push(v.id);
                }
                else {
                    zj.Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].reserves.push(v.id);
                }
            }
            var _a, _b;
        };
        /**
         * 移除点击详情
         */
        Activity_BossMainPop.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        /**
         * 添加点击详情
         */
        Activity_BossMainPop.prototype.showGoodsProperty = function (ev) {
            // if (Game.UIManager.dialogCount() >= 1) return;
            var ui = this.getChildByName("details");
            if (ui) {
                return;
            }
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return Activity_BossMainPop;
    }(zj.Scene));
    zj.Activity_BossMainPop = Activity_BossMainPop;
    __reflect(Activity_BossMainPop.prototype, "zj.Activity_BossMainPop");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_BossMainPop.js.map