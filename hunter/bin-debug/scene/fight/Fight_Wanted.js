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
    var Fight_Wanted = (function (_super) {
        __extends(Fight_Wanted, _super);
        function Fight_Wanted() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.getMoney = 0;
            _this.getArena = 0;
            _this.skinName = "resource/skins/fight/Fight_Instance.exml";
            return _this;
        }
        Fight_Wanted.prototype.Init = function () {
            this.update = egret.setInterval(this.Update, this, 0);
        };
        Fight_Wanted.prototype.Update = function (dt) {
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
        Fight_Wanted.prototype.OpenBattleNet = function () {
            //this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_Wanted.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_Wanted.prototype.IsEndBattleEnd = function () {
            if (this.time_id == -1) {
                return true;
            }
            return false;
        };
        Fight_Wanted.prototype.NetData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            if (scene.isWin() == true) {
                this.DealWinData();
                this.WantedChallengeReq();
            }
            else if (scene.isLose() == true) {
                this.DealLoseData();
                this.WantedChallengeReq();
            }
        };
        Fight_Wanted.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_Wanted.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_Wanted.prototype.WantedChallengeReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var req = new message.WantedBattleRequest();
            req.body.wantedId = zj.Game.PlayerWantedSystem.wantedCurPos;
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            zj.Game.Controller.send(req, this.ChallengeArena_Visit, null, this, false);
        };
        Fight_Wanted.prototype.ChallengeArena_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (this.IsEndBattleEnd()) {
                return;
            }
            var response = resp;
            if (response.header.result != 0) {
                //toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                // this.WantedChallengeReq();
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
                });
            }
            else {
                scene.mainmenu.CommonSettleWin(response);
                scene.endFightUi();
            }
            this.EndBattleNet();
        };
        Fight_Wanted.prototype.quit = function () {
            zj.Game.PlayerBattleSystem.goBattleBefore();
        };
        Fight_Wanted.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
        };
        return Fight_Wanted;
    }(zj.UI));
    zj.Fight_Wanted = Fight_Wanted;
    __reflect(Fight_Wanted.prototype, "zj.Fight_Wanted");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Wanted.js.map