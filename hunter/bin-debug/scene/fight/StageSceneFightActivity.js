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
     * @class 活动副本场景类 猎人故事副本
     *
     * @author LianLei
     *
     * @date 2019.07.24
     */
    var StageSceneFightActivity = (function (_super) {
        __extends(StageSceneFightActivity, _super);
        function StageSceneFightActivity() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_ACTIVITY);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_ACTIVITY);
            _this.battleType = zj.Gmgr.Instance.fightType;
            return _this;
        }
        StageSceneFightActivity.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightActivity.prototype.initSection_Mine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_ACTIVITY;
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.initDialogGeneral();
            this.nGeneralCount = this.getBeforeGelCount();
            // this.initGeneralsPower();
        };
        StageSceneFightActivity.prototype.initSection_Opp = function () {
            this.initMonster(false);
        };
        StageSceneFightActivity.prototype.loadAuto = function () {
            // Gmgr.Instance.bFightAuto = false;
            // let tmp = Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType];
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
        StageSceneFightActivity.prototype.Init = function () {
            _super.prototype.Init.call(this);
        };
        StageSceneFightActivity.prototype.initStage = function () {
            this.instanceId = zj.PlayerActivitySystem.activityBattleCurPos;
        };
        StageSceneFightActivity.prototype.loadMapId = function () {
            var cell = zj.PlayerActivitySystem.activityBattleCurPos;
            this.mapId = zj.TableActivityBattleInstance.Item(cell).battle_bg;
        };
        StageSceneFightActivity.prototype.loadStageId = function () {
            var cell = zj.PlayerActivitySystem.activityBattleCurPos;
            var pack = zj.TableActivityBattleInstance.Item(cell).instance_stage;
            this.stageNumMax = zj.Game.PlayerMissionSystem.tableLength(pack);
            this.stageId = pack[this.monsterStage - 1];
        };
        StageSceneFightActivity.prototype.doFightFilling = function (role) {
            if (role.bEnemy == false) {
                return this.fillMyGeneral(role.getTeamNum() + 1);
            }
            else if (role.bEnemy == true) {
                if (this.bBossDead == true && this.checkAllFriendDead() == true)
                    return false;
                return this.fillMonster(role.getTeamNum() + 1);
            }
        };
        StageSceneFightActivity.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true)
                return;
            var cheaDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateBastille(cheaDt);
        };
        StageSceneFightActivity.prototype.updateBastille = function (tick) {
            if (this.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT)
                return;
            // 所有关卡怪是否死亡 或者boss死亡
            if ((this.checkAllEnemyDead() == true && this.isAllMonsterAppear() == true) || this.bBossDead == true) {
                this.staticFight();
            }
            // 开启下一关卡
            if ((this.checkEnemyEmpty() == true && this.isAllMonsterAppear() == true && this.checkAllFriendIsFloor() == true && this.checkAllFriendIsState(zj.TableEnum.TableEnumOtherState.OtherState_None) == true) || this.bBossDead == true) {
                if (this.isFinalStage() == false) {
                    this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_3RD);
                    this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
                }
            }
            // 左边人物全部死亡
            if (this.checkAllFriendDead() == true && this.tableAllysReserveRec[0] == "empty") {
                this.staticFight();
            }
            if (this.isWin() == true) {
                this.goDialog();
            }
            else if (this.isTimeUp() == true) {
                this.goFightTimeUp();
            }
            else if (this.isLoseGoBalance() == true) {
                this.goBalance();
            }
        };
        StageSceneFightActivity.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && this.bBossRemove == true) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightActivity.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightActivity.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightActivity.prototype.checkOpenStory = function (stage) {
            this.dialogStage = stage;
            if (zj.Story.isHaveStory(300000 + this.instanceId, stage) == true) {
                zj.Story.bInStory = true;
            }
        };
        StageSceneFightActivity.prototype.procDialog = function (tick) {
            if (this.bOpenBattleStory == false) {
                _super.prototype.procDialog.call(this, tick);
                return;
            }
            var curMobId = this.instanceId;
            zj.Story.update(300000 + curMobId, this.dialogStage);
            if (this.dialogGeneral != null) {
                this.dialogGeneral.update(tick);
            }
            if (zj.Story.isFinish() == true) {
                if (this.dialogGeneral != null && this.dialogStage == zj.TableEnum.TableDialogStage.DIALOG_STAGE_1ST) {
                    if (this.bDialogGeneralAppear == true) {
                        this.bDialogGeneralAppear = false;
                        // this.dialogGeneralLeave(); // 暂时空着
                    }
                    else {
                        if (this.dialogGeneral.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                            // this.dialogGeneralRemove(); // 暂时空着
                            this.openRun();
                        }
                    }
                }
                else {
                    _super.prototype.procDialog.call(this, tick);
                }
            }
        };
        StageSceneFightActivity.prototype.goDialog = function () {
            this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_5TH);
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
        };
        StageSceneFightActivity.prototype.procDialog_4th = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
            this.createMainUi();
        };
        StageSceneFightActivity.prototype.initDialogGeneral = function () {
            var activityInfo = zj.otherdb.getActivityByTypeAndIndex(message.ActivityType.ACT_TYPE_INSTANCE_BATTLE, zj.Game.PlayerInstanceSystem.activityBattleIndex);
            var maxMob = activityInfo.itemCount;
            var curMob = zj.PlayerActivitySystem.activityBattleCurPos;
            var tbl = zj.TableActivityBattle.Item(activityInfo.buffValue);
            if (maxMob == 0) {
                this.bOpenBattleStory = curMob == tbl.instance_pack[0];
            }
            else {
                this.bOpenBattleStory = curMob == maxMob + 1;
            }
        };
        return StageSceneFightActivity;
    }(zj.StageSceneInstance));
    zj.StageSceneFightActivity = StageSceneFightActivity;
    __reflect(StageSceneFightActivity.prototype, "zj.StageSceneFightActivity");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightActivity.js.map