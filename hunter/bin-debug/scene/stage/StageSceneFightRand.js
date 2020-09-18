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
    /**冒险鼠崽闹春场景类 */
    var StageSceneFightRand = (function (_super) {
        __extends(StageSceneFightRand, _super);
        function StageSceneFightRand() {
            var _this = _super.call(this) || this;
            _this.hasShowInformation = false;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND);
            // this.initTalentFightType();
            _this.battleType = zj.Gmgr.Instance.fightType;
            return _this;
        }
        StageSceneFightRand.prototype.initRandSeed = function () {
            _super.prototype.initRandSeed.call(this);
        };
        StageSceneFightRand.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightRand.prototype.initSection_Mine = function () {
            if (zj.Gmgr.Instance.bQuickFight == true) {
            }
            else {
                this.formationType = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;
                // egret.log(JSON.stringify(this.curFormation)) 
                this.initAdviser();
                this.saveLeftGeneralInfos();
                this.initGenerals(false);
                this.initSupports();
                this.nGeneralCount = this.getBeforeGelCount();
            }
        };
        StageSceneFightRand.prototype.checkOpenStory = function (stage) {
            this.dialogStage = stage;
            if (zj.Story.isHaveStory(this.instanceId, stage) == true) {
                zj.Story.bInStory = true;
            }
        };
        StageSceneFightRand.prototype.loadAuto = function () {
            if (zj.Gmgr.Instance.bQuickFight == true) {
                zj.Gmgr.Instance.bFightAuto = false;
                this.bHideAuto = false;
                this.bLockAuto = true;
                this.bHideLimit = false;
                this.bLockKey = false;
            }
            else {
                zj.Gmgr.Instance.bFightAuto = zj.Gmgr.Instance.backupAutoTbl[zj.Gmgr.Instance.fightType] || 1;
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
        // public loadAuto() {
        // 	Gmgr.Instance.bFightAuto = Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType] || 1;
        // 	this.bHideAuto = false;
        // 	if (PlayerMissionSystem.FunOpenTo(FUNC.AUTO)) {
        // 		this.bLockAuto = false;
        // 		this.bHideLimit = true;
        // 	}
        // 	else {
        // 		this.bLockAuto = true;
        // 		this.bHideLimit = false;
        // 	}
        // 	this.bLockKey = false;
        // }
        StageSceneFightRand.prototype.checkBossInformation = function () {
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
        StageSceneFightRand.prototype.preLoadBossInformation = function () {
            var _a = this.checkBossInformation(), tag = _a[0], information_id = _a[1];
            if (tag == false) {
                return;
            }
            this.bOpenBossInformation = Boolean(tag);
            this.bossInformationId = information_id;
        };
        StageSceneFightRand.prototype.loadBossInfo = function () {
            if (this.hasShowInformation != true) {
                this.hasShowInformation = true;
                this.pauseAll();
            }
        };
        StageSceneFightRand.prototype.procRule = function (tick) {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
            this.createMainUi();
        };
        StageSceneFightRand.prototype.procDialog_4th = function () {
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
            this.createMainUi();
        };
        StageSceneFightRand.prototype.dialogGeneralLeave = function () {
            if (this.dialogGeneral != null) {
                this.dialogGeneral.changeDir(zj.TableEnum.TableEnumDir.Dir_Right, true);
                this.dialogGeneral.changeOtherState(zj.TableEnum.TableEnumOtherState.OtherState_Run);
            }
        };
        StageSceneFightRand.prototype.dialogGeneralRemove = function () {
            zj.CC_SAFE_DELETE(this.dialogGeneral);
            this.dialogGeneral = null;
        };
        StageSceneFightRand.prototype.initSection_Opp = function () {
            this.initMonster(false);
        };
        StageSceneFightRand.prototype.Init = function () {
            _super.prototype.Init.call(this);
        };
        StageSceneFightRand.prototype.initTalentFightType = function () {
            var id = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            var tableInstance = zj.TableInstance.Table();
            var talent_type = tableInstance[id].talent_type;
            zj.Gmgr.Instance.setFightTalentType(talent_type);
        };
        StageSceneFightRand.prototype.initStage = function () {
            this.instanceId = StageSceneFightRand.indexId;
        };
        StageSceneFightRand.prototype.loadMapId = function () {
            var tableInstance = zj.TableActivityRandInstance.Table();
            this.mapId = tableInstance[this.instanceId].battle_bg;
            // this.LoadMap(this.mapId);
            // Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
            // 	.then(display => {
            // 		display.x = 300;
            // 		display.y = 300;
            // 		this.stage.addChild(display);
            // 	})
            // 	.catch(reason => {
            // 		toast(reason);
            // 	});
            // egret.setTimeout(() => {
            // 	Game.DragonBonesManager.playAnimation(this, "wj_niu", "armatureName", null, 0)
            // 		.then(display => {
            // 			display.x = 300;
            // 			display.y = 300;
            // 			this.stage.addChild(display);
            // 		});
            // }, this, 4000);
        };
        StageSceneFightRand.prototype.loadStageId = function () {
            if (zj.Gmgr.Instance.bQuickFight == true) {
                this.stageNumMax = zj.tableQuickStage;
                this.stageId = zj.tableQuickStage[this.monsterStage - 1];
            }
            else {
                var tableInstance = zj.TableActivityRandInstance.Table();
                var instancePack = tableInstance[this.instanceId].instance_stage;
                this.stageNumMax = 2;
                this.stageId = instancePack[this.monsterStage - 1];
            }
        };
        StageSceneFightRand.prototype.doFightFilling = function (role) {
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
        StageSceneFightRand.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateNormal(cheatDt);
        };
        StageSceneFightRand.prototype.updateNormal = function (tick) {
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
        StageSceneFightRand.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && this.bBossRemove == true) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightRand.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightRand.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightRand.prototype.goDialog = function () {
            this.checkOpenStory(zj.TableEnum.TableDialogStage.DIALOG_STAGE_5TH);
            this.sceneState = zj.TableEnum.TableSceneState.SCENE_STATE_DIALOG;
        };
        StageSceneFightRand.indexId = 1;
        return StageSceneFightRand;
    }(zj.StageSceneInstance));
    zj.StageSceneFightRand = StageSceneFightRand;
    __reflect(StageSceneFightRand.prototype, "zj.StageSceneFightRand");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightRand.js.map