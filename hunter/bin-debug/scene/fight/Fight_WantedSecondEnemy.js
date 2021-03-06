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
    var Fight_WantedSecondEnemy = (function (_super) {
        __extends(Fight_WantedSecondEnemy, _super);
        function Fight_WantedSecondEnemy() {
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
        Fight_WantedSecondEnemy.prototype.Init = function () {
            this.update = egret.setInterval(this.Update, this, 0);
        };
        Fight_WantedSecondEnemy.prototype.Update = function (dt) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bInLoading == true) {
                return;
            }
            if (scene.bBalance == false) {
                return;
            }
            if (this.stopChannelTag == false) {
                if (scene.isWin() == true) {
                    this.DealWinData();
                    this.WantedChallengeReq();
                    this.stopChannelTag = true;
                }
                else if (scene.isLose() == true) {
                    this.DealLoseData();
                    this.WantedChallengeReq();
                    this.stopChannelTag = true;
                }
            }
        };
        Fight_WantedSecondEnemy.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_WantedSecondEnemy.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_WantedSecondEnemy.prototype.WantedChallengeReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var req = new message.EnemyCampBattleRequest();
            req.body.enemyCampId = zj.Game.PlayerWantedSystem.wantedCurPos;
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            zj.Game.Controller.send(req, this.ChallengeArena_Visit, null, this, false);
        };
        Fight_WantedSecondEnemy.prototype.ChallengeArena_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
            // scene.getItemInfo.items = table.deepcopy(Player.getGoods)
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
                scene.endFightUi();
                zj.loadUI(zj.BattleEnd_WinWanted)
                    .then(function (dialog) {
                    _this.winSubUi = dialog;
                    _this.winSubUi.show();
                    _this.winSubUi.Init();
                    _this.winSubUi.Load();
                });
            }
        };
        Fight_WantedSecondEnemy.prototype.quit = function () {
            zj.Game.PlayerBattleSystem.goBattleBefore();
        };
        Fight_WantedSecondEnemy.prototype.OnExit = function () {
            egret.clearInterval(this.update);
            this.update = -1;
        };
        return Fight_WantedSecondEnemy;
    }(zj.UI));
    zj.Fight_WantedSecondEnemy = Fight_WantedSecondEnemy;
    __reflect(Fight_WantedSecondEnemy.prototype, "zj.Fight_WantedSecondEnemy");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_WantedSecondEnemy.js.map