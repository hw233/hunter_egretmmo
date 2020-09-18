namespace zj {
/**通缉令副本场景类 */
export class StageSceneFightWanted extends StageSceneInstance{
	public constructor() {
		super();
		Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_WANTED);
		if(Math.floor(Game.PlayerWantedSystem.wantedCurPos / 10000) > message.EWantedType.WANTED_TYPE_SIX){
			Gmgr.Instance.setFightTalentType(TableEnum.TableEnumFightType.FIGHT_TYPE_GAOJI_WANTED);
		}else{
			Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_WANTED);
		}
		this.battleType = Gmgr.Instance.fightType;
	}
	public loadCurFormation(){
		this.curFormation = Game.PlayerFormationSystem.formatsWant[Game.PlayerMissionSystem.fightExt];
	}
	public getCurFormationGels(){
		let generals = Game.PlayerFormationSystem.formatsWant[Game.PlayerMissionSystem.fightExt].generals;
    	let reserves = Game.PlayerFormationSystem.formatsWant[Game.PlayerMissionSystem.fightExt].reserves;
    	let supports = Game.PlayerFormationSystem.formatsWant[Game.PlayerMissionSystem.fightExt].supports;
    	return [generals, reserves, supports];
	}
	public initSection_Other(){
		this.initStage();
		this.initMap();
		this.initFightNumber();
	}
	private formationType;
	public initSection_Mine(){
		this.formationType = message.EFormationType.FORMATION_TYPE_WANTED;
		this.initAdviser();
		this.saveLeftGeneralInfos();
		this.initGenerals(false); 
		this.initSupports();

		this.nGeneralCount = this.getBeforeGelCount();
	}
	public initSection_Opp(){
		this.initMonster(false);
	}
	public loadAuto(){
		if(Gmgr.Instance.bContinueBattle){
			Gmgr.Instance.bFightAuto = true;
			this.bHideAuto = false;
			this.bLockAuto = false;
			this.bHideLimit = true;
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
		}
		this.bLockKey = false;
	}
	public Init(){
		super.Init();
	}
	private bWantedReview;
	public initStage(){
		this.instanceId = Game.PlayerWantedSystem.wantedCurPos;
		if(Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED){
			this.bWantedReview = Game.PlayerWantedSystem.WantedInstanceIsLast( this.instanceId + 1 ) || (! Game.PlayerWantedSystem.WantedInstanceGetFirstBlood( this.instanceId ))
		}
	}
	public loadMapId(){
		let cell = Game.PlayerWantedSystem.wantedCurPos;
		this.mapId = TableWanted.Item(cell).battle_bg;
	}
	public loadStageId(){
		this.stageNumMax = PlayerStageSystem.stageInfoTbl.length;
		this.stageId = PlayerStageSystem.stageInfoTbl[this.monsterStage-1].stage_id;
	}
	public doFightFilling( role ){
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
			return;
		}
		let cheatDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
		this.updateBastille(cheatDt);
	}
	public updateBastille( tick ){
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
		//左边人物全部死亡
		if(this.checkAllFriendDead() == true && this.tableAllysReserveRec[0] == "empty"){
			this.staticFight();
		}
		if(this.isWin() == true){
			this.goBalance();
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
}
}