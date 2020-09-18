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
    /**通缉令副本场景类 */
    var StageSceneFightWanted = (function (_super) {
        __extends(StageSceneFightWanted, _super);
        function StageSceneFightWanted() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_WANTED);
            if (Math.floor(zj.Game.PlayerWantedSystem.wantedCurPos / 10000) > message.EWantedType.WANTED_TYPE_SIX) {
                zj.Gmgr.Instance.setFightTalentType(zj.TableEnum.TableEnumFightType.FIGHT_TYPE_GAOJI_WANTED);
            }
            else {
                zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_WANTED);
            }
            _this.battleType = zj.Gmgr.Instance.fightType;
            return _this;
        }
        StageSceneFightWanted.prototype.loadCurFormation = function () {
            this.curFormation = zj.Game.PlayerFormationSystem.formatsWant[zj.Game.PlayerMissionSystem.fightExt];
        };
        StageSceneFightWanted.prototype.getCurFormationGels = function () {
            var generals = zj.Game.PlayerFormationSystem.formatsWant[zj.Game.PlayerMissionSystem.fightExt].generals;
            var reserves = zj.Game.PlayerFormationSystem.formatsWant[zj.Game.PlayerMissionSystem.fightExt].reserves;
            var supports = zj.Game.PlayerFormationSystem.formatsWant[zj.Game.PlayerMissionSystem.fightExt].supports;
            return [generals, reserves, supports];
        };
        StageSceneFightWanted.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightWanted.prototype.initSection_Mine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_WANTED;
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightWanted.prototype.initSection_Opp = function () {
            this.initMonster(false);
        };
        StageSceneFightWanted.prototype.loadAuto = function () {
            if (zj.Gmgr.Instance.bContinueBattle) {
                zj.Gmgr.Instance.bFightAuto = true;
                this.bHideAuto = false;
                this.bLockAuto = false;
                this.bHideLimit = true;
            }
            else {
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
            }
            this.bLockKey = false;
        };
        StageSceneFightWanted.prototype.Init = function () {
            _super.prototype.Init.call(this);
        };
        StageSceneFightWanted.prototype.initStage = function () {
            this.instanceId = zj.Game.PlayerWantedSystem.wantedCurPos;
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                this.bWantedReview = zj.Game.PlayerWantedSystem.WantedInstanceIsLast(this.instanceId + 1) || (!zj.Game.PlayerWantedSystem.WantedInstanceGetFirstBlood(this.instanceId));
            }
        };
        StageSceneFightWanted.prototype.loadMapId = function () {
            var cell = zj.Game.PlayerWantedSystem.wantedCurPos;
            this.mapId = zj.TableWanted.Item(cell).battle_bg;
        };
        StageSceneFightWanted.prototype.loadStageId = function () {
            this.stageNumMax = zj.PlayerStageSystem.stageInfoTbl.length;
            this.stageId = zj.PlayerStageSystem.stageInfoTbl[this.monsterStage - 1].stage_id;
        };
        StageSceneFightWanted.prototype.doFightFilling = function (role) {
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
        StageSceneFightWanted.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateBastille(cheatDt);
        };
        StageSceneFightWanted.prototype.updateBastille = function (tick) {
            if (this.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            //所有关卡怪是否死亡 或者 boss死亡
            if ((this.checkAllEnemyDead() == true && this.isAllMonsterAppear() == true) || this.bBossDead == true) {
                this.staticFight();
            }
            //开启下一挂卡
            if ((this.checkEnemyEmpty() == true && this.isAllMonsterAppear() == true && this.checkAllFriendIsFloor() == true && this.checkAllFriendIsState(zj.TableEnum.TableEnumOtherState.OtherState_None) == true) || this.bBossDead == true) {
                if (this.isFinalStage() == false) {
                    this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_3RD);
                    this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
                }
            }
            //左边人物全部死亡
            if (this.checkAllFriendDead() == true && this.tableAllysReserveRec[0] == "empty") {
                this.staticFight();
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
        StageSceneFightWanted.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && this.bBossRemove == true) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightWanted.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightWanted.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        return StageSceneFightWanted;
    }(zj.StageSceneInstance));
    zj.StageSceneFightWanted = StageSceneFightWanted;
    __reflect(StageSceneFightWanted.prototype, "zj.StageSceneFightWanted");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightWanted.js.map