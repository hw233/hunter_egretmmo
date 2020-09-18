namespace zj {
/**
 * @class 活动副本场景类 猎人故事副本
 * 
 * @author LianLei
 * 
 * @date 2019.07.24
 */
export class StageSceneFightActivity extends StageSceneInstance {

	public formationType: number;

	public constructor() {
		super();
		Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_ACTIVITY);
		Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_ACTIVITY);
		this.battleType = Gmgr.Instance.fightType;
	}

	public initSection_Other() {
		this.initStage();
		this.initMap();
		this.initFightNumber();
	}

	public initSection_Mine() {
		this.formationType = message.EFormationType.FORMATION_TYPE_ACTIVITY;
		this.initAdviser();
		this.saveLeftGeneralInfos();
		this.initGenerals(false);
		this.initSupports();
		this.initDialogGeneral();
		this.nGeneralCount = this.getBeforeGelCount();

		// this.initGeneralsPower();
	}

	public initSection_Opp() {
		this.initMonster(false);
	}

	public loadAuto() {
		// Gmgr.Instance.bFightAuto = false;
		// let tmp = Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType];

		Gmgr.Instance.bFightAuto = Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType];
		this.bHideAuto = false;
		if (PlayerMissionSystem.FunOpenTo(FUNC.AUTO)) {
			this.bLockAuto = false;
			this.bHideLimit = true;
		}
		else {
			this.bLockAuto = true;
			this.bHideLimit = false;
		}
		this.bLockKey = false;
	}

	public Init() {
		super.Init();
	}

	public initStage() {
		this.instanceId = PlayerActivitySystem.activityBattleCurPos;
	}

	public loadMapId() {
		let cell = PlayerActivitySystem.activityBattleCurPos;
		this.mapId = TableActivityBattleInstance.Item(cell).battle_bg;
	}

	public loadStageId() {
		let cell = PlayerActivitySystem.activityBattleCurPos;
		let pack = TableActivityBattleInstance.Item(cell).instance_stage;
		this.stageNumMax = Game.PlayerMissionSystem.tableLength(pack);
		this.stageId = pack[this.monsterStage - 1];
	}

	public doFightFilling(role) {
		if (role.bEnemy == false) {
			return this.fillMyGeneral(role.getTeamNum() + 1);
		}
		else if (role.bEnemy == true) {
			if (this.bBossDead == true && this.checkAllFriendDead() == true) return false;
			return this.fillMonster(role.getTeamNum() + 1);
		}
	}

	public Update(tick) {
		super.Update(tick);
		if (Gmgr.Instance.bPause == true) return;
		let cheaDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
		this.updateBastille(cheaDt);
	}

	public updateBastille(tick) {
		if (this.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT) return;

		// 所有关卡怪是否死亡 或者boss死亡
		if ((this.checkAllEnemyDead() == true && this.isAllMonsterAppear() == true) || this.bBossDead == true) {
			this.staticFight();
		}

		// 开启下一关卡
		if ((this.checkEnemyEmpty() == true && this.isAllMonsterAppear() == true && this.checkAllFriendIsFloor() == true && this.checkAllFriendIsState(TableEnum.TableEnumOtherState.OtherState_None) == true) || this.bBossDead == true) {
			if (this.isFinalStage() == false) {
				this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_3RD);
				this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
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

	public checkOpenStory(stage: number) {
		this.dialogStage = stage;
		if (Story.isHaveStory(300000 + this.instanceId, stage) == true) {
			Story.bInStory = true;
		}
	}

	public procDialog(tick) {
		if (this.bOpenBattleStory == false) {
			super.procDialog(tick);
			return;
		}

		let curMobId = this.instanceId;
		Story.update(300000 + curMobId, this.dialogStage);

		if (this.dialogGeneral != null) {
			this.dialogGeneral.update(tick);
		}

		if (Story.isFinish() == true) {
			if (this.dialogGeneral != null && this.dialogStage == TableEnum.TableDialogStage.DIALOG_STAGE_1ST) {
				if (this.bDialogGeneralAppear == true) {
					this.bDialogGeneralAppear = false;
					// this.dialogGeneralLeave(); // 暂时空着
				}
				else {
					if (this.dialogGeneral.otherState == TableEnum.TableEnumOtherState.OtherState_None) {
						// this.dialogGeneralRemove(); // 暂时空着
						this.openRun();
					}
				}
			}
			else {
				super.procDialog(tick);
			}
		}
	}

	public goDialog() {
		this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_5TH);
		this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
	}

	public procDialog_4th() {
		this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
		this.createMainUi();
	}

	public initDialogGeneral() {
		let activityInfo = otherdb.getActivityByTypeAndIndex(message.ActivityType.ACT_TYPE_INSTANCE_BATTLE, Game.PlayerInstanceSystem.activityBattleIndex);
		let maxMob = activityInfo.itemCount;
		let curMob = PlayerActivitySystem.activityBattleCurPos;
		let tbl = TableActivityBattle.Item(activityInfo.buffValue);
		if (maxMob == 0) {
			this.bOpenBattleStory = curMob == tbl.instance_pack[0];
		}
		else {
			this.bOpenBattleStory = curMob == maxMob + 1;
		}
	}
}
}