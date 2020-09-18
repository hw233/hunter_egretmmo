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
    /**PVP跨服战类 */
    var StageSceneFightBSingle = (function (_super) {
        __extends(StageSceneFightBSingle, _super);
        function StageSceneFightBSingle() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK);
            _this.battleType = zj.Gmgr.Instance.fightType;
            _this.oppDetailInfo = zj.Game.PlayerBattleSystem.battleDetailFormation;
            return _this;
        }
        StageSceneFightBSingle.prototype.loadFightStart = function () {
            this.loadSingleFightStart();
        };
        StageSceneFightBSingle.prototype.getCurFormationGels = function () {
            var generals = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex - 1].generals;
            var reserves = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex - 1].reserves;
            var supports = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex - 1].supports;
            return [generals, reserves, supports];
        };
        StageSceneFightBSingle.prototype.loadCurFormation = function () {
            var index = zj.Gmgr.Instance.starcraftIndex;
            var attack = zj.Game.PlayerFormationSystem.formatsSingleAttack;
            this.curFormation = zj.Game.PlayerFormationSystem.formatsSingleAttack[zj.Gmgr.Instance.starcraftIndex - 1];
        };
        StageSceneFightBSingle.prototype.loadAuto = function () {
            zj.Gmgr.Instance.bFightAuto = zj.Gmgr.Instance.backupAutoTbl[zj.Gmgr.Instance.fightType];
            this.bHideAuto = false;
            this.bLockAuto = false;
            this.bHideLimit = true;
            this.bLockKey = false;
        };
        StageSceneFightBSingle.prototype.LoadMine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
            this.stageMaxTime = zj.ConstantConfig_RoleBattle.SINGLE_CD_TIME * 1000;
            this.initAdviser();
            //self:initStrategy()
            //self:initArtifact()
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            //self:initHelpIndex()
            //self:initHelpData()
            //self:initHelpGeneral() 
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightBSingle.prototype.LoadOpp = function () {
            this.initOppAdviser();
            this.saveRightGeneralInfos();
            this.initOppPvp(false, false, false);
            this.initOppSupports();
        };
        StageSceneFightBSingle.prototype.InitOther = function () {
            this.UpdateMap((this.mapWidth - zj.UIManager.StageWidth) / 2, 0);
            this.InitBattleSqueue();
        };
        StageSceneFightBSingle.prototype.loadMapId = function () {
            this.mapId = 17;
        };
        StageSceneFightBSingle.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateStarcraft(cheatDt);
        };
        StageSceneFightBSingle.prototype.updateStarcraft = function (tick) {
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
        StageSceneFightBSingle.prototype.nextStarcraft = function () {
            zj.StageSceneManager.Instance.ChangeScene(StageSceneFightBSingle);
        };
        StageSceneFightBSingle.prototype.oppToBriefInfo = function () {
            this.replayBattleInfo.rightReplayInfo.roleInfo = zj.Game.PlayerBattleSystem.pvpOppBriefInfo;
        };
        return StageSceneFightBSingle;
    }(zj.StageSceneFightServer));
    zj.StageSceneFightBSingle = StageSceneFightBSingle;
    __reflect(StageSceneFightBSingle.prototype, "zj.StageSceneFightBSingle");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightBSingle.js.map