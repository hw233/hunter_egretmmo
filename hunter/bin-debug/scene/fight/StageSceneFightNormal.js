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
    /**普通副本场景类 */
    var StageSceneFightNormal = (function (_super) {
        __extends(StageSceneFightNormal, _super);
        function StageSceneFightNormal() {
            var _this = _super.call(this) || this;
            _this.hasShowInformation = false;
            var type = zj.Game.PlayerInstanceSystem.curInstanceType;
            if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
            }
            else if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
            }
            _this.initTalentFightType();
            _this.battleType = zj.Gmgr.Instance.fightType;
            return _this;
        }
        StageSceneFightNormal.prototype.initRandSeed = function () {
            _super.prototype.initRandSeed.call(this);
        };
        StageSceneFightNormal.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightNormal.prototype.initSection_Mine = function () {
            if (zj.Gmgr.Instance.bQuickFight == true) {
            }
            else {
                var type = zj.Game.PlayerInstanceSystem.curInstanceType;
                var formationType = message.EFormationType.FORMATION_TYPE_NONO;
                if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                    formationType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
                }
                else if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                    formationType = message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
                }
                this.formationType = formationType;
                // egret.log(JSON.stringify(this.curFormation)) 
                this.initAdviser();
                this.saveLeftGeneralInfos();
                this.initGenerals(false);
                this.initSupports();
                this.nGeneralCount = this.getBeforeGelCount();
                this.initDialogGeneral();
                this.loadFakeHelp();
            }
        };
        StageSceneFightNormal.prototype.checkOpenStory = function (stage) {
            this.dialogStage = stage;
            if (zj.Story.isHaveStory(this.instanceId, stage) == true) {
                zj.Story.bInStory = true;
            }
        };
        StageSceneFightNormal.prototype.loadAuto = function () {
            if (zj.Gmgr.Instance.bQuickFight == true) {
                zj.Gmgr.Instance.bFightAuto = false;
                this.bHideAuto = false;
                this.bLockAuto = true;
                this.bHideLimit = false;
                this.bLockKey = false;
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
                this.bLockKey = false;
            }
        };
        StageSceneFightNormal.prototype.loadFakeHelp = function () {
            // let maxMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].maxMobID;
            // let curMobID = this.instanceId;
            // let bClear = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bClear;
            // if(curMobID >= maxMobID && bClear == false){
            // }else{
            // 	return [false, 0];
            // }
            //let tbl = 
        };
        StageSceneFightNormal.prototype.initDialogGeneral = function () {
            var maxMobID = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].maxMobID;
            var curMobID = this.instanceId;
            var bClear = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bClear;
            if (curMobID >= maxMobID && bClear == false) {
                this.bOpenBattleStory = true;
            }
            else {
                return;
            }
            var tableInstance = zj.TableInstance.Table();
            var dialog_id = tableInstance[this.instanceId].dialog_role;
            if (dialog_id != null && dialog_id > 0) {
                var general = this._createLocalMonster(2, dialog_id, false, true, true, null);
                this.dialogGeneral = general;
                this.bDialogGeneralAppear = true;
            }
        };
        StageSceneFightNormal.prototype.checkBossInformation = function () {
            var maxMobID = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].maxMobID;
            var curMobID = this.instanceId;
            var bClear = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bClear;
            //正式模式下开启
            if (curMobID >= maxMobID && bClear == false) {
            }
            else {
                return [false, 0];
            }
            var tableInstance = zj.TableInstance.Table();
            var boss_information = tableInstance[curMobID].boss_information;
            if (boss_information != null && boss_information <= 0) {
                return [false, 0];
            }
            var tableInformation = zj.TableClientBossInformation.Table();
            var tbl = tableInformation[boss_information];
            if (tbl == null) {
                return [false, 0];
            }
            return [true, boss_information];
        };
        StageSceneFightNormal.prototype.preLoadBossInformation = function () {
            var _a = this.checkBossInformation(), tag = _a[0], information_id = _a[1];
            if (tag == false) {
                return;
            }
            this.bOpenBossInformation = Boolean(tag);
            this.bossInformationId = information_id;
        };
        StageSceneFightNormal.prototype.loadBossInfo = function () {
            if (this.hasShowInformation != true) {
                this.hasShowInformation = true;
                this.pauseAll();
            }
        };
        StageSceneFightNormal.prototype.procRule = function (tick) {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
            this.createMainUi();
        };
        StageSceneFightNormal.prototype.procDialog_4th = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
            this.createMainUi();
        };
        StageSceneFightNormal.prototype.dialogGeneralLeave = function () {
            if (this.dialogGeneral != null) {
                this.dialogGeneral.changeDir(zj.TableEnum.TableEnumDir.Dir_Right, true);
                this.dialogGeneral.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
            }
        };
        StageSceneFightNormal.prototype.dialogGeneralRemove = function () {
            zj.CC_SAFE_DELETE(this.dialogGeneral);
            this.dialogGeneral = null;
        };
        StageSceneFightNormal.prototype.initSection_Opp = function () {
            this.initMonster(false);
        };
        StageSceneFightNormal.prototype.Init = function () {
            _super.prototype.Init.call(this);
        };
        StageSceneFightNormal.prototype.initTalentFightType = function () {
            zj.Game.PlayerInstanceSystem.checkCurInstances(zj.Game.PlayerInstanceSystem.curInstanceType);
            var id = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            var tableInstance = zj.TableInstance.Item(id);
            if (tableInstance) {
                var talent_type = tableInstance.talent_type;
                zj.Gmgr.Instance.setFightTalentType(talent_type);
            }
            else {
                if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                    zj.Gmgr.Instance.setFightTalentType(2);
                }
                else {
                    zj.Gmgr.Instance.setFightTalentType(1);
                }
            }
        };
        StageSceneFightNormal.prototype.initStage = function () {
            if (zj.Gmgr.Instance.bQuickFight == true) {
                this.instanceId = 9999999;
            }
            else {
                this.instanceId = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            }
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                this.bEliteReview = zj.PlayerInstanceSystem.CheckPassed(this.instanceId);
                if (zj.Game.PlayerInstanceSystem.isLastMob(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE)) {
                    // if(Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].curMobID == Game.PlayerInstanceSystem.ChapterBossInstanceID()){
                    this.bEliteReview = true;
                }
            }
        };
        StageSceneFightNormal.prototype.loadMapId = function () {
            if (zj.Gmgr.Instance.bQuickFight == true) {
                this.mapId = 2;
            }
            else {
                var tableInstance = zj.TableInstance.Table();
                this.mapId = tableInstance[this.instanceId].battle_bg;
            }
        };
        StageSceneFightNormal.prototype.loadStageId = function () {
            if (zj.Gmgr.Instance.bQuickFight == true) {
                this.stageNumMax = zj.tableQuickStage;
                this.stageId = zj.tableQuickStage[this.monsterStage - 1];
            }
            else {
                var tableInstance = zj.TableInstance.Table();
                var instancePack = tableInstance[this.instanceId].instance_pack;
                this.stageNumMax = instancePack.length;
                this.stageId = instancePack[this.monsterStage - 1];
            }
        };
        StageSceneFightNormal.prototype.doFightFilling = function (role) {
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
        StageSceneFightNormal.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateNormal(cheatDt);
        };
        StageSceneFightNormal.prototype.procDialog = function (tick) {
            if (this.bOpenBattleStory == false) {
                _super.prototype.procDialog.call(this, tick);
                return;
            }
            var curMobID = this.instanceId;
            zj.Story.update(curMobID, this.dialogStage);
            if (this.dialogGeneral != null) {
                this.dialogGeneral.update(tick);
            }
            if (zj.Story.isFinish()) {
                zj.Story.bFinish = false;
                if (this.dialogGeneral != null && this.dialogStage == zj.TableEnum.TableDialogStage.DIALOG_STAGE_1ST) {
                    if (this.bDialogGeneralAppear == true) {
                        this.bDialogGeneralAppear = false;
                        this.dialogGeneralLeave();
                    }
                    else {
                        if (this.dialogGeneral.otherState == zj.TableEnum.TableEnumOtherState.OtherState_None) {
                            this.dialogGeneralRemove();
                            this.openRun();
                        }
                    }
                }
                else {
                    _super.prototype.procDialog.call(this, tick);
                }
            }
        };
        StageSceneFightNormal.prototype.updateNormal = function (tick) {
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
            if (zj.Gmgr.Instance.bQuickFight == true) {
                return;
            }
            //左边人物全部死亡
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
        StageSceneFightNormal.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && this.bBossRemove == true) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightNormal.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightNormal.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightNormal.prototype.goDialog = function () {
            this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_5TH);
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
        };
        return StageSceneFightNormal;
    }(zj.StageSceneInstance));
    zj.StageSceneFightNormal = StageSceneFightNormal;
    __reflect(StageSceneFightNormal.prototype, "zj.StageSceneFightNormal");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightNormal.js.map