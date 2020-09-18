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
    /**联盟副本场景类 */
    var StageSceneFightLeagueInstance = (function (_super) {
        __extends(StageSceneFightLeagueInstance, _super);
        function StageSceneFightLeagueInstance() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE);
            _this.battleType = zj.Gmgr.Instance.fightType;
            return _this;
        }
        StageSceneFightLeagueInstance.prototype.searchGelnfo = function () {
        };
        StageSceneFightLeagueInstance.prototype.searchMonsterInfo = function (monster) {
            var info = zj.Game.PlayerMobSystem.GetCurInfo(monster.roleId);
            if (info != null && info.cur_pos != 0 && info.is_dead == false) {
                monster.setHp(info.cur_hp);
                monster.setRage(info.cur_rage);
                monster.setCurBeanNum(info.cur_bean);
                monster.setPressCdTime(info.cur_skillCd);
                monster.resetPressMaxCd();
            }
        };
        StageSceneFightLeagueInstance.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightLeagueInstance.prototype.initMap = function () {
            this.loadMapId();
            this.LoadMap(this.mapId);
        };
        StageSceneFightLeagueInstance.prototype.procSenceAppear = function (tick) {
            this.procSenceAppear_3(tick);
        };
        StageSceneFightLeagueInstance.prototype.initSection_Mine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE;
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightLeagueInstance.prototype.initSection_Opp = function () {
            this.initMonster(true);
        };
        StageSceneFightLeagueInstance.prototype.InitOther = function () {
            //this.UpdateMap( (this.mapWidth - UIManager.StageWidth )/2, 0);
            this.InitBattleSqueue();
        };
        StageSceneFightLeagueInstance.prototype.loadAuto = function () {
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
        StageSceneFightLeagueInstance.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.InitOther();
        };
        StageSceneFightLeagueInstance.prototype.initStage = function () {
            this.instanceId = zj.Game.PlayerLeagueSystem.leagueInstance.curInstanceId;
        };
        StageSceneFightLeagueInstance.prototype.loadMapId = function () {
            var tblLeagueInstance = zj.TableLeagueInstance.Table();
            this.mapId = tblLeagueInstance[zj.Game.PlayerLeagueSystem.leagueInstance.curInstanceId].battle_bg;
        };
        StageSceneFightLeagueInstance.prototype.loadStageId = function () {
            this.stageNumMax = 1;
            this.stageId = zj.Game.PlayerLeagueSystem.leagueInstance.leagueInstanceStageInfo[1].stageInfo.stage_id;
        };
        StageSceneFightLeagueInstance.prototype.doFightFilling = function (role) {
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
        StageSceneFightLeagueInstance.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateLeagueInstance(cheatDt);
        };
        StageSceneFightLeagueInstance.prototype.updateLeagueInstance = function (tick) {
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
        StageSceneFightLeagueInstance.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightLeagueInstance.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && this.bBossRemove == true) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightLeagueInstance.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightLeagueInstance.prototype.oppToBriefInfo = function () {
            this.replayBattleInfo.rightReplayInfo.roleInfo = zj.Helper.instanceToBriefInfo(zj.Gmgr.Instance.fightType, this.stageId, zj.Gmgr.Instance.pveBossinfo);
        };
        StageSceneFightLeagueInstance.prototype.takeGelArmy = function () {
        };
        StageSceneFightLeagueInstance.prototype.takeMobsArmy = function () {
            this.replayBattleInfo.stageInfo.push(zj.Game.PlayerLeagueSystem.leagueInstance.leagueInstanceStageInfo[0].stageInfo);
        };
        return StageSceneFightLeagueInstance;
    }(zj.StageSceneInstance));
    zj.StageSceneFightLeagueInstance = StageSceneFightLeagueInstance;
    __reflect(StageSceneFightLeagueInstance.prototype, "zj.StageSceneFightLeagueInstance");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightLeagueInstance.js.map