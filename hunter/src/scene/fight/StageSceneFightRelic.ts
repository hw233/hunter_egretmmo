namespace zj {
/**遗迹副本场景类 */
export class StageSceneFightRelic extends StageSceneInstance{
	public constructor() {
		super();
		Gmgr.Instance.setFightType(Game.PlayerInstanceSystem.curInstanceType)    
		Gmgr.Instance.setFightTalentType(Game.PlayerInstanceSystem.curInstanceType)  
		this.battleType = Gmgr.Instance.fightType;
		this.weekTime = 60*1000;
	}
	public formationType;
	public loadCurFormation(){
		this.curFormation = Game.PlayerFormationSystem.formatsRelic[Game.PlayerMissionSystem.fightExt];
	}
	public getCurFormationGels(){
		let generals = Game.PlayerFormationSystem.formatsRelic[Game.PlayerMissionSystem.fightExt].generals;
		let reserves = Game.PlayerFormationSystem.formatsRelic[Game.PlayerMissionSystem.fightExt].reserves;
		let supports = Game.PlayerFormationSystem.formatsRelic[Game.PlayerMissionSystem.fightExt].supports;
		return [generals, reserves, supports];
	}
	public initSection_Other(){
		this.initStage();
    	this.initMap();
    	this.initFightNumber();
	}
	public initSection_Mine(){
		this.formationType = Game.PlayerInstanceSystem.curInstanceType;
		this.initAdviser();
		this.saveLeftGeneralInfos()
		this.initGenerals(false)    
		this.initSupports();
		this.nGeneralCount = this.getBeforeGelCount();
	}
	public initSection_Opp(){
		this.initMonster(true);
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
		this.InitOther();
	}
	public initStage(){
		this.instanceId = Game.PlayerMissionSystem.fightExt+1;
	}
	public initMap(){
		this.loadMapId();
		this.LoadMap(this.mapId);
	}
	public InitOther(){
		//this.UpdateMap( (this.mapWidth - UIManager.StageWidth )/2, 0);
		this.InitBattleSqueue();
		this.initRelicResultTbl();
	}
	public loadMapId(){
		this.mapId = TableInstanceRelic.Item( Game.PlayerMissionSystem.fightExt+1 ).mapBg;
	}
	public initRelicResultTbl(){
		let tableInstance = TableInstanceRelic.Table();
		let instancePack = tableInstance[this.instanceId].monster_stage;
		for(let i = 0;i<instancePack.length;i++){
			this.chapResultTbl[i] = message.BattleResultState.BATTLE_RESULT_STATE_NO;
		}
		this.maxChapStep = instancePack.length;
		this.stageNumMax = this.maxChapStep;
	}
	public loadStageId(){
		let tableInstance = TableInstanceRelic.Table();
		let instancePack = tableInstance[this.instanceId].monster_stage;
		this.stageId = instancePack[this.currChapStep-1];
		this.weekTime = tableInstance[this.instanceId].week_time[this.currChapStep] * 1000;
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
		this.updateRelic(cheatDt);
	}
	public updateRelic( tick ){
		if(this.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT){
			return;
		}
		if(this.isWin() == true){
			this.goBalance(true);
		}else if(this.isTimeUp() == true){
			this.goFightTimeUp();
		}else if(this.isLoseGoBalance() == true){
			this.goBalance(false);
		}
	}
	public doFightFilling( role ){
		if(role.bEnemy == false){
			return this.fillMyGeneral(role.getTeamNum() + 1);
		}else if(role.bEnemy == true){
			if(this.bBossDead == true || this.isWeekSteping == true || this.checkAllFriendDead() == true){
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
	public goBalance(bWin){
		if(bWin == false){
			this.chapResultTbl[ this.currChapStep ] = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
		}else{
			this.chapResultTbl[ this.currChapStep ] = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
		}
		this.lockPause();
		this.commonBalance();
		if(this.mainmenu != null){
			this.mainmenu.EndCurrChap();
		}
	}
	public goTimeUp(){
		this.chapResultTbl[ this.currChapStep ] = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
		this.lockPause();
		this.commonBalance();
	}
	public endTimeUp(){
		if(this.mainmenu != null){
			this.mainmenu.EndCurrChap();
		}
	}
}
}