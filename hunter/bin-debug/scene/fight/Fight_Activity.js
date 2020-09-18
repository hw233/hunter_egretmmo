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
     * @class 猎人故事 战斗UI
     *
     * @author LianLei
     *
     * @date 2019.07.31
     */
    var Fight_Activity = (function (_super) {
        __extends(Fight_Activity, _super);
        function Fight_Activity() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fight/Fight_ActivitySkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.scene = null;
                egret.clearInterval(_this.update);
                egret.clearInterval(_this.time_id);
                _this.update = -1;
                _this.time_id = -1;
            }, _this);
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            _this.stopChannelTag = false;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.getMoney = 0;
            _this.getArena = 0;
            return _this;
        }
        Fight_Activity.prototype.Init = function () {
            this.update = egret.setInterval(this.Update, this, 0);
        };
        Fight_Activity.prototype.Update = function () {
            if (zj.Gmgr.Instance.bInLoading == true)
                return;
            if (this.scene.bBalance == false)
                return;
            if (this.stopChannelTag == false) {
                this.NetData();
                this.OpenBattleNet();
                this.stopChannelTag = true;
            }
        };
        Fight_Activity.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData, this, ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME); // 重新连接结算
        };
        Fight_Activity.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_Activity.prototype.IsEndBattleEnd = function () {
            if (this.time_id == -1) {
                return true;
            }
            return false;
        };
        Fight_Activity.prototype.NetData = function () {
            if (zj.Gmgr.Instance.bDisconnectNet == true)
                return;
            if (this.scene.isWin() == true) {
                this.DealWinData();
                this.ActivityChallengeReq();
            }
            else if (this.scene.isLose() == true) {
                this.DealLoseData();
                this.ActivityChallengeReq();
            }
        };
        Fight_Activity.prototype.DealWinData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getWantedBattleStar(this.scene.nFinalCnt, this.scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_Activity.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_Activity.prototype.ActivityChallengeReq = function () {
            var req = new message.ActivityInstanceResultRequest();
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.instanceId = zj.PlayerActivitySystem.activityBattleCurPos;
            req.body.activityIndex = zj.Game.PlayerInstanceSystem.activityBattleIndex;
            req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, this.scene.getTiming(), this.scene.getTotalDamageValue(), this.scene.maxCombo, this.scene.replayBattleInfo);
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            zj.Game.Controller.send(req, this.ActivityChallenge_Visit, null, this, false);
        };
        Fight_Activity.prototype.ActivityChallenge_Visit = function (req, resp) {
            var _this = this;
            if (this.IsEndBattleEnd())
                return;
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            if (response.header.result == message.EC.SUCCESS) {
                zj.Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
                this.scene.getItemInfo.items = zj.Helper.hideSpecialGoods(response.body.gameInfo.getGoods);
                this.scene.getItemInfo.turnItems, this.scene.getItemInfo.extraItems = zj.Helper.getTurnGoods(response.body.gameInfo.getGoods, zj.Gmgr.Instance.fightType);
                this.scene.getItemInfo.firstBloodItems = zj.Helper.getFirstBloodGoods(response.body.gameInfo.getGoods, zj.Gmgr.Instance.fightType);
                this.scene.potatos = response.body.gameInfo.potatos;
                this.scene.getItemInfo.potatos = zj.Table.DeepCopy(response.body.gameInfo.potatos);
                if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                    this.scene.endFightUi();
                    zj.loadUI(zj.BattleEnd_Lose).then(function (dialog) {
                        _this.loseSubUi = dialog;
                        _this.loseSubUi.show();
                        _this.loseSubUi.SetFather(_this);
                        _this.loseSubUi.Init();
                        _this.loseSubUi.Load();
                        _this.scene = null;
                    });
                }
                else {
                    this.scene.endFightUi();
                    zj.loadUI(zj.BattleEnd_WinStoryInstance).then(function (dialog) {
                        _this.winSubUi = dialog;
                        _this.winSubUi.show();
                        _this.winSubUi.Init();
                        _this.winSubUi.Load();
                    });
                }
            }
            else {
                zj.TipManager.ShowBattleError(response.header.result, this, this.quit);
            }
        };
        Fight_Activity.prototype.quit = function () {
            zj.Game.PlayerBattleSystem.goBattleBefore();
        };
        Fight_Activity.prototype.OnExit = function () {
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            egret.clearInterval(this.update);
            egret.clearInterval(this.time_id);
            this.update = -1;
            this.time_id = -1;
            this.scene = null;
        };
        return Fight_Activity;
    }(zj.UI));
    zj.Fight_Activity = Fight_Activity;
    __reflect(Fight_Activity.prototype, "zj.Fight_Activity");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Activity.js.map