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
    /**执照副本场景类 */
    var StageSceneFightLicense = (function (_super) {
        __extends(StageSceneFightLicense, _super);
        function StageSceneFightLicense() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_MISSION_LICENCE);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_MISSION_LICENCE);
            _this.battleType = zj.Gmgr.Instance.fightType;
            return _this;
        }
        StageSceneFightLicense.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightLicense.prototype.initSection_Mine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_MISSION_LICENCE;
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightLicense.prototype.initSection_Opp = function () {
            this.initMonster(true);
        };
        StageSceneFightLicense.prototype.loadAuto = function () {
            zj.Gmgr.Instance.bFightAuto = zj.Gmgr.Instance.backupAutoTbl[zj.Gmgr.Instance.fightType];
            this.bHideAuto = false;
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.AUTO)) {
                this.bLockAuto = false;
                this.bHideLimit = true;
            }
            else {
                this.bLockAuto = true;
                this.bHideLimit = false;
            }
            this.bLockKey = false;
        };
        StageSceneFightLicense.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.InitBattleSqueue();
        };
        StageSceneFightLicense.prototype.initStage = function () {
            this.instanceId = zj.Game.PlayerMissionSystem.licenseCurPos;
        };
        StageSceneFightLicense.prototype.initMap = function () {
            this.loadMapId();
            this.LoadMap(this.mapId);
        };
        StageSceneFightLicense.prototype.loadMapId = function () {
            this.mapId = zj.TableMissionLicence.Item(zj.Game.PlayerMissionSystem.licenseCurPos).battle_bg;
        };
        StageSceneFightLicense.prototype.loadStageId = function () {
            var tblLicense = zj.TableMissionLicence.Table();
            var pack = tblLicense[zj.Game.PlayerMissionSystem.licenseCurPos].battle_id;
            var tbl = [pack];
            this.stageNumMax = tbl.length;
            this.stageId = tbl[this.monsterStage - 1];
        };
        StageSceneFightLicense.prototype.procSenceAppear = function (tick) {
            this.procSenceAppear_3(tick);
        };
        StageSceneFightLicense.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateLicense(cheatDt);
        };
        StageSceneFightLicense.prototype.updateLicense = function (tick) {
            if (this.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            if (this.isWin() == true) {
                this.goBalance();
            }
            else if (this.isTimeUp() == true) {
                this.goFightTimeUp();
            }
            else if (this.isLoseGoBalance() == true) {
                this.goBalance();
            }
        };
        StageSceneFightLicense.prototype.doFightFilling = function (role) {
            if (role.bEnemy == false) {
                return this.fillMyGeneral(role.getTeamNum() + 1);
            }
            else if (role.bEnemy == true) {
                if (this.bBossDead == true || this.checkAllFriendDead() == true) {
                    return false;
                }
                return this.fillMonster(role.getTeamNum() + 1);
            }
        };
        StageSceneFightLicense.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && this.bBossRemove == true) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightLicense.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightLicense.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        return StageSceneFightLicense;
    }(zj.StageSceneInstance));
    zj.StageSceneFightLicense = StageSceneFightLicense;
    __reflect(StageSceneFightLicense.prototype, "zj.StageSceneFightLicense");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightLicense.js.map