namespace zj {
/**执照副本场景类 */
export class StageSceneFightLicense extends StageSceneInstance{
	public constructor() {
		super();
		Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_MISSION_LICENCE);  
    	Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_MISSION_LICENCE);     
    	this.battleType = Gmgr.Instance.fightType;
	}
	public formationType;
	public initSection_Other(){
		this.initStage();
		this.initMap();
		this.initFightNumber();
	}
	public initSection_Mine(){
		this.formationType = message.EFormationType.FORMATION_TYPE_MISSION_LICENCE;
		this.initAdviser();
		this.saveLeftGeneralInfos();
		this.initGenerals(false);  
		this.initSupports();
		this.nGeneralCount = this.getBeforeGelCount();
	}
	public initSection_Opp(){
		this.initMonster(true);
	}
	public loadAuto(){
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
	public Init(){
		super.Init();
		this.InitBattleSqueue();
	}
	public initStage(){
		this.instanceId = Game.PlayerMissionSystem.licenseCurPos;
	}
	public initMap(){
		this.loadMapId();
		this.LoadMap(this.mapId);
	}
	public loadMapId(){
		this.mapId = TableMissionLicence.Item(Game.PlayerMissionSystem.licenseCurPos).battle_bg;
	}
	public loadStageId(){
		let tblLicense = TableMissionLicence.Table();
		let pack =  tblLicense[ Game.PlayerMissionSystem.licenseCurPos].battle_id;
		let tbl = [pack];
		this.stageNumMax = tbl.length;
		this.stageId = tbl[this.monsterStage - 1];
	}
	public procSenceAppear( tick ){
		this.procSenceAppear_3( tick );
	}
	public Update( tick ){
		super.Update(tick);
		if(Gmgr.Instance.bPause == true){
			return;
		}
		let cheatDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
		this.updateLicense(cheatDt);
	}
	public updateLicense( tick ){
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