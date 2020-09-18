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
    var StageSceneFightBZorkBoss = (function (_super) {
        __extends(StageSceneFightBZorkBoss, _super);
        function StageSceneFightBZorkBoss() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_ZORK);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_ZORK);
            _this.battleType = zj.Gmgr.Instance.fightType;
            _this.bBossEnding = false;
            return _this;
        }
        StageSceneFightBZorkBoss.prototype.initBuffs = function () {
        };
        StageSceneFightBZorkBoss.prototype.searchMonsterInfo = function (monster) {
            var info = zj.Game.PlayerMobSystem.GetCurInfo(monster.roleId);
            if (info != null && info.cur_pos != 0 && info.is_dead == false) {
                monster.setHp(info.cur_hp);
            }
        };
        StageSceneFightBZorkBoss.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightBZorkBoss.prototype.initSection_Mine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_ZORK;
            this.initBuffs();
            this.initAdviser();
            //this.initStrategy()
            //this.initArtifact()
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightBZorkBoss.prototype.initSection_Opp = function () {
            this.initMonster(false);
        };
        StageSceneFightBZorkBoss.prototype.loadAuto = function () {
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
        StageSceneFightBZorkBoss.prototype.Init = function () {
            _super.prototype.Init.call(this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_SCENE_BOSS_RESULT, this.SceneBossResultNotice_Visit, this);
        };
        StageSceneFightBZorkBoss.prototype.initStage = function () {
            this.instanceId = 1;
        };
        StageSceneFightBZorkBoss.prototype.loadMapId = function () {
            var tblWorldBoss = zj.TableClientWorldBoss.Table();
            this.mapId = tblWorldBoss[1].battle_bg;
        };
        StageSceneFightBZorkBoss.prototype.loadStageId = function () {
            this.stageNumMax = 1;
            this.stageId = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.bossInfo.stage_id;
        };
        StageSceneFightBZorkBoss.prototype.doFightFilling = function (role) {
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
        StageSceneFightBZorkBoss.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateLeagueBoss(cheatDt);
        };
        StageSceneFightBZorkBoss.prototype.updateLeagueBoss = function (tick) {
            if (this.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
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
        StageSceneFightBZorkBoss.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && (this.bBossDead == true || (this.battleTime <= 0 && zj.Helper.getObjLen(this.tableAllys) > 0))) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightBZorkBoss.prototype.isLose = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightBZorkBoss.prototype.oppToBriefInfo = function () {
            //世界boss最终有boss
            this.replayBattleInfo.rightReplayInfo.roleInfo = zj.Helper.instanceToBriefInfo(zj.Gmgr.Instance.fightType, this.stageId, zj.Gmgr.Instance.pveBossinfo);
        };
        StageSceneFightBZorkBoss.prototype.SceneBossResultNotice_Visit = function (result) {
            var data = result.data;
            if (this.bBossEnding == false) {
                this.bBossEnding = true;
                // this.Pause();
                // PushUI("Zork_BossEnd");
                zj.loadUI(zj.ZorkBossEnd).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        return StageSceneFightBZorkBoss;
    }(zj.StageSceneInstance));
    zj.StageSceneFightBZorkBoss = StageSceneFightBZorkBoss;
    __reflect(StageSceneFightBZorkBoss.prototype, "zj.StageSceneFightBZorkBoss");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightBZorkBoss.js.map