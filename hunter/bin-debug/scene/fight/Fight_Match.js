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
    var Fight_Match = (function (_super) {
        __extends(Fight_Match, _super);
        function Fight_Match() {
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
        Fight_Match.prototype.Init = function () {
            this.update = egret.setInterval(this.Update, this, 0);
        };
        Fight_Match.prototype.Update = function (dt) {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bInLoading == true) {
                return;
            }
            if (scene.bBalance == false) {
                return;
            }
            if (this.stopChannelTag == false) {
                this.stopChannelTag = true;
                this.NetData();
                this.OpenBattleNet();
            }
        };
        Fight_Match.prototype.OpenBattleNet = function () {
            // this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
        };
        Fight_Match.prototype.EndBattleNet = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
        };
        Fight_Match.prototype.NetData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (zj.Gmgr.Instance.bDisconnectNet == true) {
                return;
            }
            if (scene.isLose() == true) {
                this.DealLoseData();
                this.ChallengeMatchReq();
            }
            else if (scene.isWin() == true) {
                this.DealWinData();
                this.ChallengeMatchReq();
            }
        };
        Fight_Match.prototype.DealWinData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            var num = zj.Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
            this.battleQuality = message.EQuality.QUALITY_E + num;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
        };
        Fight_Match.prototype.DealLoseData = function () {
            this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.battleQuality = message.EQuality.QUALITY_F;
            this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
        };
        Fight_Match.prototype.ChallengeMatchReq = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var req = new message.LeagueMatchFortressBattleResultRequest();
            req.body.type = Math.floor(zj.Gmgr.Instance.matchHard / 100);
            req.body.index = zj.Gmgr.Instance.matchHard;
            req.body.sequence = zj.Game.PlayerBattleSystem.battleSequence;
            req.body.battleInfo = zj.Helper.createBattleResultInfo(zj.Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
            req.body.extraStr = zj.Gmgr.Instance.matchEnemyName;
            zj.Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
            zj.Game.Controller.send(req, this.ChallengeMatch_Visit, null, this, false);
        };
        Fight_Match.prototype.ChallengeMatch_Visit = function (req, resp) {
            var _this = this;
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var tmp = function () {
                zj.loadUI(zj.MatchWinPop)
                    .then(function (dialog) {
                    _this.loseSubUi = dialog;
                    _this.loseSubUi.show();
                });
            };
            this.EndBattleNet();
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            zj.Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
            if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
                scene.getItemInfo.league = zj.Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_LEAGUE_SCORE);
                zj.loadUI(zj.BattleEnd_LoseMatchServer)
                    .then(function (dialog) {
                    _this.loseSubUi = dialog;
                    _this.loseSubUi.show();
                    _this.loseSubUi.Init();
                    _this.loseSubUi.Load();
                });
            }
            else {
                scene.getItemInfo.league = zj.Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_LEAGUE_SCORE);
                scene.endFightUi();
                zj.loadUI(zj.BattleEnd_WinMatchServer)
                    .then(function (dialog) {
                    _this.winSubUi = dialog;
                    _this.winSubUi.show();
                    _this.winSubUi.Init();
                    _this.winSubUi.Load();
                    _this.winSubUi.SetSettleCb(tmp);
                });
            }
        };
        Fight_Match.prototype.quit = function () {
            //Gmgr:goBattleBefore()
        };
        Fight_Match.prototype.OnExit = function () {
            egret.clearInterval(this.time_id);
            this.time_id = -1;
            egret.clearInterval(this.update);
            this.update = -1;
        };
        return Fight_Match;
    }(zj.UI));
    zj.Fight_Match = Fight_Match;
    __reflect(Fight_Match.prototype, "zj.Fight_Match");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Match.js.map