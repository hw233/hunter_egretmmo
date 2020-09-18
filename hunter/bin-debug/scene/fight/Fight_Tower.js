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
    var Fight_Tower = (function (_super) {
        __extends(Fight_Tower, _super);
        function Fight_Tower() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.skinName = "resource/skins/fight/Fight_Instance.exml";
            return _this;
        }
        Fight_Tower.prototype.Init = function () {
            this.update = egret.setInterval(this.Update, this, 0);
        };
        Fight_Tower.prototype.Update = function (dt) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bInLoading == true) {
                return;
            }
            if (scene.bBalance == false) {
                return;
            }
            if (this.stopChannelTag == false) {
                this.NetData();
                this.OpenBattleNet();
                this.stopChannelTag = true;
            }
        };
        Fight_Tower.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_Tower.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_Tower.prototype.IsEndBattleEnd = function () {
            if (this.time_id == -1) {
                return true;
            }
            return false;
        };
        Fight_Tower.prototype.NetData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            if (scene.isLose() == true) {
                this.DealLoseData();
                this.TowerChallengeReq();
            }
            else if (scene.isWin() == true) {
                this.DealWinData();
                this.TowerChallengeReq();
            }
        };
        Fight_Tower.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_Tower.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_Tower.prototype.TowerChallengeReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var request = new message.TowerChallengeRequest();
            request.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            request.body.instanceId = scene.instanceId;
            request.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            zj.Game.PlayerBattleSystem.cacheBattleResult = request.body.battleInfo;
            zj.Game.Controller.send(request, this.ChallengeArena_Visit, null, this, false);
        };
        Fight_Tower.prototype.ChallengeArena_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
            if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                scene.endFightUi();
                zj.loadUI(zj.BattleEnd_Lose)
                    .then(function (dialog) {
                    _this.loseSubUi = dialog;
                    _this.loseSubUi.show();
                    _this.loseSubUi.Init();
                    _this.loseSubUi.Load();
                    scene = null;
                });
            }
            else {
                scene.mainmenu.CommonSettleWin(response);
                scene.endFightUi();
            }
            this.EndBattleNet();
        };
        Fight_Tower.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
        };
        return Fight_Tower;
    }(zj.UI));
    zj.Fight_Tower = Fight_Tower;
    __reflect(Fight_Tower.prototype, "zj.Fight_Tower");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Tower.js.map