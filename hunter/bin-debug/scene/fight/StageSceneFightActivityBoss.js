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
     * @class 经验或游戏币副本场景类 年兽boss
     *
     * @author LianLei
     *
     * @date 2019.07.23
     */
    var StageSceneFightActivityBoss = (function (_super) {
        __extends(StageSceneFightActivityBoss, _super);
        function StageSceneFightActivityBoss() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS);
            _this.battleType = zj.Gmgr.Instance.fightType;
            _this.bBossEnding = false;
            return _this;
        }
        StageSceneFightActivityBoss.prototype.initBuffs = function () {
        };
        StageSceneFightActivityBoss.prototype.searchMonsterInfo = function (monster) {
            var info = zj.Game.PlayerMobSystem.GetCurInfo(monster.roleId);
            if (info != null && info.cur_pos != 0 && info.is_dead == false) {
                monster.setHp(info.cur_hp);
            }
        };
        StageSceneFightActivityBoss.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightActivityBoss.prototype.initSection_Mine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
            this.initBuffs();
            this.initAdviser();
            // this.initStrategy();
            // this.initArtifact();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
            // this.initGeneralsPower();
        };
        StageSceneFightActivityBoss.prototype.initSection_Opp = function () {
            this.initMonster(false);
        };
        StageSceneFightActivityBoss.prototype.loadAuto = function () {
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
        StageSceneFightActivityBoss.prototype.Init = function () {
            _super.prototype.Init.call(this);
        };
        StageSceneFightActivityBoss.prototype.initStage = function () {
            this.instanceId = 1;
        };
        StageSceneFightActivityBoss.prototype.loadMapId = function () {
            var tblWorldBoss = zj.TableClientWorldBoss.Table();
            this.mapId = tblWorldBoss[zj.Game.PlayerBossSystem.ActivityBoss.bossId].battle_bg;
        };
        StageSceneFightActivityBoss.prototype.loadStageId = function () {
            this.stageNumMax = 1;
            this.stageId = zj.Game.PlayerBossSystem.ActivityBoss.bossId;
        };
        StageSceneFightActivityBoss.prototype.doFightFilling = function (role) {
            if (role.bEnemy == false) {
                return this.fillMyGeneral(role.getTeamNum() + 1);
            }
            else if (role.bEnemy == true) {
                if (this.bBossDead == true || this.checkAllFriendDead() == true)
                    return false;
                return this.fillMonster(role.getTeamNum() + 1);
            }
        };
        StageSceneFightActivityBoss.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true)
                return;
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateLeagueBoss(cheatDt);
        };
        StageSceneFightActivityBoss.prototype.updateLeagueBoss = function (tick) {
            if (this.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT)
                return;
            if (this.isTimeUp() == true) {
                this.goFightTimeUp();
            }
            else if (this.isWin() == true) {
                this.goBalance();
            }
            else if (this.isLose() == true) {
                this.goBalance();
            }
        };
        StageSceneFightActivityBoss.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && (this.bBossDead == true || (this.battleTime <= 0 && zj.Helper.getObjLen(this.tableAllys) > 0))) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightActivityBoss.prototype.isLose = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightActivityBoss.prototype.oppToBriefInfo = function () {
            this.replayBattleInfo.rightReplayInfo.roleInfo = zj.Helper.instanceToBriefInfo(zj.Gmgr.Instance.fightType, this.stageId, zj.Gmgr.Instance.pveBossinfo);
        };
        return StageSceneFightActivityBoss;
    }(zj.StageSceneInstance));
    zj.StageSceneFightActivityBoss = StageSceneFightActivityBoss;
    __reflect(StageSceneFightActivityBoss.prototype, "zj.StageSceneFightActivityBoss");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightActivityBoss.js.map