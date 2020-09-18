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
    /**好友3队 */
    var StageSceneFightBThreeBattle = (function (_super) {
        __extends(StageSceneFightBThreeBattle, _super);
        function StageSceneFightBThreeBattle() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_PVP_THIRD);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_PVP_THIRD);
            _this.battleType = zj.Gmgr.Instance.fightType;
            _this.oppDetailInfo = zj.Game.PlayerBattleSystem.battleDetailFormation;
            return _this;
        }
        StageSceneFightBThreeBattle.prototype.loadFightStart = function () {
            this.loadSingleFightStart();
        };
        StageSceneFightBThreeBattle.prototype.getCurFormationGels = function () {
            var generals = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex - 1].generals;
            var reserves = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex - 1].reserves;
            var supports = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex - 1].supports;
            return [generals, reserves, supports];
        };
        StageSceneFightBThreeBattle.prototype.loadCurFormation = function () {
            this.curFormation = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex - 1];
        };
        StageSceneFightBThreeBattle.prototype.loadAuto = function () {
            zj.Gmgr.Instance.bFightAuto = zj.Gmgr.Instance.backupAutoTbl[zj.Gmgr.Instance.fightType];
            this.bHideAuto = false;
            this.bLockAuto = false;
            this.bHideLimit = true;
            this.bLockKey = false;
        };
        StageSceneFightBThreeBattle.prototype.LoadMine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
            this.stageMaxTime = zj.ConstantConfig_RoleBattle.SINGLE_CD_TIME * 1000;
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightBThreeBattle.prototype.LoadOpp = function () {
            this.initOppAdviser();
            this.saveRightGeneralInfos();
            this.initOppPvp(false, false, false);
            this.initOppSupports();
        };
        StageSceneFightBThreeBattle.prototype.InitOther = function () {
            this.InitBattleSqueue();
        };
        StageSceneFightBThreeBattle.prototype.loadMapId = function () {
            this.mapId = 17;
        };
        StageSceneFightBThreeBattle.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateStarcraft(cheatDt);
        };
        StageSceneFightBThreeBattle.prototype.updateStarcraft = function (tick) {
            if (this.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            if (this.isWin() == true) {
                this.goBalance();
            }
            else if (this.isTimeUp() == true) {
                this.goBalance();
            }
            else if (this.isLoseGoBalance() == true) {
                this.goBalance();
            }
        };
        StageSceneFightBThreeBattle.prototype.nextStarcraft = function () {
            zj.StageSceneManager.Instance.ChangeScene(StageSceneFightBThreeBattle);
        };
        StageSceneFightBThreeBattle.prototype.oppToBriefInfo = function () {
            this.replayBattleInfo.rightReplayInfo.roleInfo = zj.Game.PlayerBattleSystem.pvpOppBriefInfo;
        };
        return StageSceneFightBThreeBattle;
    }(zj.StageSceneFightServer));
    zj.StageSceneFightBThreeBattle = StageSceneFightBThreeBattle;
    __reflect(StageSceneFightBThreeBattle.prototype, "zj.StageSceneFightBThreeBattle");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightBThreeBattle.js.map