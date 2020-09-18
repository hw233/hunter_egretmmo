namespace zj {
/**普通副本场景类 */
export class StageSceneFightNormal extends StageSceneInstance{
	public constructor() {
		super();
		let type:number = Game.PlayerInstanceSystem.curInstanceType;
		if(type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL){
			Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
		}else if(type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE){
			Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
		}
		this.initTalentFightType();
		this.battleType = Gmgr.Instance.fightType;
	}
	public formationType;
	public initRandSeed(){
		super.initRandSeed();
	}
	public initSection_Other(){
		this.initStage();
		this.initMap();
		this.initFightNumber();
	}
	public initSection_Mine(){
		if(Gmgr.Instance.bQuickFight == true){

		}else{
			let type:number = Game.PlayerInstanceSystem.curInstanceType;
			let formationType = message.EFormationType.FORMATION_TYPE_NONO;
			if(type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL){
				formationType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
			}else if(type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE){
				formationType = message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
			}
			this.formationType = formationType;
			
			// egret.log(JSON.stringify(this.curFormation)) 
			this.initAdviser()
			this.saveLeftGeneralInfos()
			this.initGenerals(false)
			this.initSupports()
		
			this.nGeneralCount = this.getBeforeGelCount();
			this.initDialogGeneral();
			this.loadFakeHelp();
		}
	}
	public checkOpenStory(stage){
		this.dialogStage = stage;
		if(Story.isHaveStory(this.instanceId, stage) == true){
			Story.bInStory = true;
		}
	}
	public loadAuto(){
		if(Gmgr.Instance.bQuickFight == true){
			Gmgr.Instance.bFightAuto = false  
			this.bHideAuto = false;
			this.bLockAuto = true;
			this.bHideLimit = false;
			this.bLockKey = false;
		}else{
			Gmgr.Instance.bFightAuto = Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType];
			this.bHideAuto = false;
			if(PlayerMissionSystem.FunOpenTo(FUNC.AUTO)){
				this.bLockAuto = false;
            	this.bHideLimit = true;
			}else{
				this.bLockAuto = true;
            	this.bHideLimit = false;
			}
			this.bLockKey = false;
		}
	}
	public loadFakeHelp(){
		// let maxMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].maxMobID;
		// let curMobID = this.instanceId;
		// let bClear = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bClear;
		// if(curMobID >= maxMobID && bClear == false){

		// }else{
		// 	return [false, 0];
		// }
		//let tbl = 
	}
	public initDialogGeneral(){
		let maxMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].maxMobID;
		let curMobID = this.instanceId;
		let bClear = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bClear;
		if(curMobID >= maxMobID && bClear == false){
			this.bOpenBattleStory = true;
		}else{
			return;
		}
		let tableInstance = TableInstance.Table();
		let dialog_id = tableInstance[this.instanceId].dialog_role;
		if(dialog_id != null && dialog_id > 0){
			let general = this._createLocalMonster(2, dialog_id, false, true, true,null);
			this.dialogGeneral = general;
			this.bDialogGeneralAppear = true;
		}
	}
	public checkBossInformation(){
		let maxMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].maxMobID;
		let curMobID = this.instanceId;
		let bClear = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bClear;
		//正式模式下开启
		if(curMobID >= maxMobID && bClear == false){

		}else{
			return [false, 0];
		}
		let tableInstance = TableInstance.Table();
		let boss_information = tableInstance[curMobID].boss_information;
		if(boss_information != null && boss_information <= 0){
			return [false, 0];
		}
		let tableInformation = TableClientBossInformation.Table();
		let tbl = tableInformation[boss_information];
		if(tbl == null){
			return [false, 0];
		}
		return [true, boss_information];
	}
	public preLoadBossInformation(){
		let [tag, information_id] = this.checkBossInformation();
		if(tag == false){
			return;
		}
		this.bOpenBossInformation = Boolean(tag);
    	this.bossInformationId = information_id;
	}
	public hasShowInformation = false;
	public loadBossInfo(){
		if(this.hasShowInformation != true){
			this.hasShowInformation = true;
			this.pauseAll();
		}
	}
	public procRule(tick){
		this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
		this.createMainUi();
	}
	public procDialog_4th(){
		this.sceneState = TableEnum.TableSceneState.SCENE_STATE_FIGHT_START;
		this.createMainUi();
	}
	public dialogGeneralLeave(){
		if(this.dialogGeneral != null){
			this.dialogGeneral.changeDir(TableEnum.TableEnumDir.Dir_Right, true);
        	this.dialogGeneral.changeOtherState(TableEnum.TableEnumOtherState.OtherState_Run);
		}
	}
	public dialogGeneralRemove(){
		CC_SAFE_DELETE(this.dialogGeneral);
		this.dialogGeneral = null;
	}
	public initSection_Opp(){
		this.initMonster(false);
	}
	public Init(){
		super.Init();
	}
	public initTalentFightType(){
		Game.PlayerInstanceSystem.checkCurInstances(Game.PlayerInstanceSystem.curInstanceType);
		let id = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
		let tableInstance = TableInstance.Item(id);
		if(tableInstance){
			let talent_type = tableInstance.talent_type;
			Gmgr.Instance.setFightTalentType(talent_type);
		} else {
			if(Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE){
				Gmgr.Instance.setFightTalentType(2);
			} else {
				Gmgr.Instance.setFightTalentType(1);
			}
		}
	}
	public bEliteReview;
	public initStage(){
		if(Gmgr.Instance.bQuickFight == true){
			this.instanceId = 9999999;
		}else{
			this.instanceId = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
		}
		if(Gmgr.Instance.fightType ==  message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE){
			this.bEliteReview = PlayerInstanceSystem.CheckPassed(this.instanceId);
			if(Game.PlayerInstanceSystem.isLastMob(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE)){
			// if(Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].curMobID == Game.PlayerInstanceSystem.ChapterBossInstanceID()){
				this.bEliteReview = true;
			}
		}
	}
	public loadMapId(){
		if(Gmgr.Instance.bQuickFight == true){
			this.mapId = 2;
		}else{
			let tableInstance = TableInstance.Table();
			this.mapId = tableInstance[this.instanceId].battle_bg;
		}
	}
	public loadStageId(){
		if(Gmgr.Instance.bQuickFight == true){
			this.stageNumMax = tableQuickStage
        	this.stageId = tableQuickStage[this.monsterStage-1];
		}else{
			let tableInstance = TableInstance.Table();
			let instancePack = tableInstance[this.instanceId].instance_pack
			this.stageNumMax = instancePack.length;
			this.stageId = instancePack[this.monsterStage-1];
		}
	}
	public doFightFilling(role){
		if(role.bEnemy == false){
			return this.fillMyGeneral(role.getTeamNum() + 1);
		}else if(role.bEnemy == true){
			if(this.bBossDead == true || this.checkAllFriendDead() == true){
				return false;
			}
			return this.fillMonster(role.getTeamNum()+1);
		}
	}
	public Update( tick ){
		super.Update(tick);
		if(Gmgr.Instance.bPause == true){
			return
		}
		let cheatDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
		this.updateNormal(cheatDt);
	}
	public procDialog(tick){
		if(this.bOpenBattleStory == false){
			super.procDialog(tick);
			return;
		}
		let curMobID = this.instanceId;
		Story.update(curMobID, this.dialogStage);
		if(this.dialogGeneral != null){
			this.dialogGeneral.update(tick);
		}
		if(Story.isFinish()){
			Story.bFinish = false;
			if(this.dialogGeneral != null && this.dialogStage == TableEnum.TableDialogStage.DIALOG_STAGE_1ST){
				if(this.bDialogGeneralAppear == true){
					this.bDialogGeneralAppear = false;
					this.dialogGeneralLeave();
				}else{
					if(this.dialogGeneral.otherState == TableEnum.TableEnumOtherState.OtherState_None){
						this.dialogGeneralRemove();
						this.openRun();
					}
				}
			}else{
				super.procDialog(tick);
			}
		}
	}
	public updateNormal( tick ){
		if(this.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT){
			return;
		}
		//所有关卡怪是否死亡 或者 boss死亡
		if((this.checkAllEnemyDead() == true && this.isAllMonsterAppear() == true) || this.bBossDead == true){
			this.staticFight();
		}
		//开启下一挂卡
		if((this.checkEnemyEmpty() == true && this.isAllMonsterAppear() == true && this.checkAllFriendIsFloor() == true && this.checkAllFriendIsState(TableEnum.TableEnumOtherState.OtherState_None) == true) || this.bBossDead == true){
			if(this.isFinalStage() == false){
				this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_3RD);
            	this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
			}
		}
		if(Gmgr.Instance.bQuickFight == true){
			return;
		}
		//左边人物全部死亡
		if(this.checkAllFriendDead() == true && this.tableAllysReserveRec[0] == "empty"){
			this.staticFight();
		}
		if(this.isWin() == true){
			this.goDialog();
		}else if(this.isTimeUp() == true){
			this.goFightTimeUp();
		}else if(this.isLoseGoBalance() == true){
			this.goBalance();
		}
	}
	public isWin(){
		let bTag = false;
		if(this.isFinalStage() == true && this.bBossRemove == true){
			this.nFinalCnt = this.getFinalGelCount();
			bTag = true;
		}
		return bTag;
	}
	public isLose(){
		let bTag = false;
		if(this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")){
			bTag = true;
		}
		return bTag;
	}
	public isLoseGoBalance(){
		let bTag = false;
		if(this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty"){
			bTag = true;
		}
		return bTag;
	}
	public goDialog(){
		this.checkOpenStory(TableEnum.TableDialogStage.DIALOG_STAGE_5TH);
    	this.sceneState = TableEnum.TableSceneState.SCENE_STATE_DIALOG;
	}
}
}