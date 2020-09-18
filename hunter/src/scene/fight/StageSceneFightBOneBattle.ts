namespace zj {
/**好友1队 */
export class StageSceneFightBOneBattle extends StageSceneFightServer{
	public constructor() {
		super();
		Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_PVP_SIMPLE)    
		Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) 
		this.battleType = Gmgr.Instance.fightType
		this.oppDetailInfo = Game.PlayerBattleSystem.battleDetailFormation;
	}
	public loadAuto(){
		if(Gmgr.Instance.debugLocalFight == false){
			Gmgr.Instance.bFightAuto = true;
			this.bHideAuto = false
			this.bLockAuto = true    
			this.bHideLimit = true
			this.bLockKey = true
		}else{
			Gmgr.Instance.bFightAuto = false;
			this.bHideAuto = false
			this.bLockAuto = false    
			this.bHideLimit = true
			this.bLockKey = false
		}
	}
	public formationType;
	public LoadMine(){
		this.formationType = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
		this.stageMaxTime = ConstantConfig_RoleBattle.PVP_CD_TIME;
		this.initAdviser();
		this.saveLeftGeneralInfos();    
		this.initGenerals(false);    
		this.initSupports();
		this.nGeneralCount = this.getBeforeGelCount();
	}
	public LoadOpp(){
		this.initOppAdviser();
		this.saveRightGeneralInfos();
		//替补。出场 远景
		this.initOppPvp(false, false, false);
		this.initOppSupports();
	}
	public InitOther(){
		 this.UpdateMap( (this.mapWidth - UIManager.StageWidth )/2, 0);
		this.InitBattleSqueue();
	}
	public loadMapId(){
		if(Gmgr.Instance.debugLocalFight == false){
			this.mapId = 17;
		}else{
			this.mapId = 17;
		}
	}
	public Update( tick ){
		super.Update(tick);
		if(Gmgr.Instance.bPause == true){
			return;
		}
		let cheatDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
		this.updateArena(cheatDt);
	}
	public updateArena( tick ){
		if(this.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT){
			return;
		}
		if(this.isWin() == true){
			this.goBalance();
		}else if(this.isTimeUp() == true){
			this.goFightTimeUp();
		}else if(this.isLoseGoBalance() == true){
			this.goBalance();
		}
	}
	public oppToBriefInfo(){
		this.replayBattleInfo.rightReplayInfo.roleInfo = Game.PlayerBattleSystem.pvpOppBriefInfo;
	}
}
}