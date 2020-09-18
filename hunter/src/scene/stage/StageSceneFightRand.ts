namespace zj {
	/**冒险鼠崽闹春场景类 */
	export class StageSceneFightRand extends StageSceneInstance {
		public constructor() {
			super();
			Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND);
			// this.initTalentFightType();
			this.battleType = Gmgr.Instance.fightType;
		}
		public formationType;
		public static indexId = 1;
		public initRandSeed() {
			super.initRandSeed();
		}
		public initSection_Other() {
			this.initStage();
			this.initMap();
			this.initFightNumber();
		}
		public initSection_Mine() {
			if (Gmgr.Instance.bQuickFight == true) {

			} else {
				this.formationType = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;
				// egret.log(JSON.stringify(this.curFormation)) 
				this.initAdviser()
				this.saveLeftGeneralInfos()
				this.initGenerals(false)
				this.initSupports()

				this.nGeneralCount = this.getBeforeGelCount();
			}
		}
		public checkOpenStory(stage) {
			this.dialogStage = stage;
			if (Story.isHaveStory(this.instanceId, stage) == true) {
				Story.bInStory = true;
			}
		}
		public loadAuto() {
			if (Gmgr.Instance.bQuickFight == true) {
				Gmgr.Instance.bFightAuto = false
				this.bHideAuto = false;
				this.bLockAuto = true;
				this.bHideLimit = false;
				this.bLockKey = false;
			} else {
				Gmgr.Instance.bFightAuto = Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType] || 1;
				this.bHideAuto = false;
				if (PlayerMissionSystem.FunOpenTo(FUNC.AUTO)) {
					this.bLockAuto = false;
					this.bHideLimit = true;
				} else {
					this.bLockAuto = true;
					this.bHideLimit = false;
				}
				this.bLockKey = false;
			}
		}
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

		public checkBossInformation() {
			let maxMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].maxMobID;
			let curMobID = this.instanceId;
			let bClear = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bClear;
			//正式模式下开启
			if (curMobID >= maxMobID && bClear == false) {

			} else {
				return [false, 0];
			}
			let tableInstance = TableInstance.Table();
			let boss_information = tableInstance[curMobID].boss_information;
			if (boss_information != null && boss_information <= 0) {
				return [false, 0];
			}
			let tableInformation = TableClientBossInformation.Table();
			let tbl = tableInformation[boss_information];
			if (tbl == null) {
				return [false, 0];
			}
			return [true, boss_information];
		}
		public preLoadBossInformation() {
			let [tag, information_id] = this.checkBossInformation();
			if (tag == false) {
				return;
			}
			this.bOpenBossInformation = Boolean(tag);
			this.bossInformationId = information_id;
		}
		public hasShowInformation = false;
		public loadBossInfo() {
			if (this.hasShowInformation != true) {
				this.hasShowInformation = true;
				this.pauseAll();
			}
		}
		public procRule(tick) {
			this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
			this.createMainUi();
		}
		public procDialog_4th() {
			this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
			this.createMainUi();
		}
		public dialogGeneralLeave() {
			if (this.dialogGeneral != null) {
				this.dialogGeneral.changeDir(TableEnum.TableEnumDir.Dir_Right, true);
				this.dialogGeneral.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
			}
		}
		public dialogGeneralRemove() {
			CC_SAFE_DELETE(this.dialogGeneral);
			this.dialogGeneral = null;
		}
		public initSection_Opp() {
			this.initMonster(false);
		}
		public Init() {
			super.Init();
		}
		public initTalentFightType() {
			let id = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
			let tableInstance = TableInstance.Table();
			let talent_type = tableInstance[id].talent_type;
			Gmgr.Instance.setFightTalentType(talent_type);
		}
		public bEliteReview;
		public initStage() {
			this.instanceId = StageSceneFightRand.indexId;
		}
		public loadMapId() {

			let tableInstance = TableActivityRandInstance.Table();
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


		}
		public loadStageId() {
			if (Gmgr.Instance.bQuickFight == true) {
				this.stageNumMax = tableQuickStage
				this.stageId = tableQuickStage[this.monsterStage - 1];
			} else {
				let tableInstance = TableActivityRandInstance.Table();
				let instancePack = tableInstance[this.instanceId].instance_stage
				this.stageNumMax = 2;
				this.stageId = instancePack[this.monsterStage - 1];
			}
		}
		public doFightFilling(role) {
			if (role.bEnemy == false) {
				return this.fillMyGeneral(role.getTeamNum() + 1);
			} else if (role.bEnemy == true) {
				if (this.bBossDead == true || this.checkAllFriendDead() == true) {
					return false;
				}
				return this.fillMonster(role.getTeamNum() + 1);
			}
		}
		public Update(tick) {
			super.Update(tick);
			if (Gmgr.Instance.bPause == true) {
				return
			}
			let cheatDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
			this.updateNormal(cheatDt);
		}

		public updateNormal(tick) {
			if (this.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
				return;
			}
			//所有关卡怪是否死亡 或者 boss死亡
			if ((this.checkAllEnemyDead() == true && this.isAllMonsterAppear() == true) || this.bBossDead == true) {
				this.staticFight();
			}
			//开启下一挂卡
			if ((this.checkEnemyEmpty() == true && this.isAllMonsterAppear() == true && this.checkAllFriendIsFloor() == true && this.checkAllFriendIsState(TableEnum.TableEnumOtherState.OtherState_None) == true) || this.bBossDead == true) {
				if (this.isFinalStage() == false) {
					this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_3RD);
					this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
				}
			}
			if (Gmgr.Instance.bQuickFight == true) {
				return;
			}
			//左边人物全部死亡
			if (this.checkAllFriendDead() == true && this.tableAllysReserveRec[0] == "empty") {
				this.staticFight();
			}
			if (this.isWin() == true) {
				this.goDialog();
			} else if (this.isTimeUp() == true) {
				this.goFightTimeUp();
			} else if (this.isLoseGoBalance() == true) {
				this.goBalance();
			}
		}
		public isWin() {
			let bTag = false;
			if (this.isFinalStage() == true && this.bBossRemove == true) {
				this.nFinalCnt = this.getFinalGelCount();
				bTag = true;
			}
			return bTag;
		}
		public isLose() {
			let bTag = false;
			if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
				bTag = true;
			}
			return bTag;
		}
		public isLoseGoBalance() {
			let bTag = false;
			if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
				bTag = true;
			}
			return bTag;
		}
		public goDialog() {
			this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_5TH);
			this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
		}
	}
}