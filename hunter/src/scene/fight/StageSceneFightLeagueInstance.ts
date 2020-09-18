namespace zj {
/**联盟副本场景类 */
export class StageSceneFightLeagueInstance extends StageSceneInstance{
	public constructor() {
		super();
		Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE);
    	Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE);  
    	this.battleType = Gmgr.Instance.fightType;
	}
	public searchGelnfo(){

	}
	public searchMonsterInfo(monster){
		let info = Game.PlayerMobSystem.GetCurInfo( monster.roleId );
		if(info != null && info.cur_pos != 0 && info.is_dead == false){
			monster.setHp(info.cur_hp);
			monster.setRage(info.cur_rage);
			monster.setCurBeanNum(info.cur_bean);
			monster.setPressCdTime(info.cur_skillCd);
			monster.resetPressMaxCd();
		}
	}
	public initSection_Other(){
		this.initStage();
    	this.initMap();
    	this.initFightNumber();
	}
	public initMap(){
		this.loadMapId();
		this.LoadMap(this.mapId);
	}
	public procSenceAppear( tick ){
		this.procSenceAppear_3( tick );
	}
	private formationType;
	public initSection_Mine(){
		this.formationType = message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE;
		this.initAdviser();
		this.saveLeftGeneralInfos();
		this.initGenerals(false);
		this.initSupports();
		this.nGeneralCount = this.getBeforeGelCount();
	}
	public initSection_Opp(){
		this.initMonster(true);
	}
	public InitOther(){
		//this.UpdateMap( (this.mapWidth - UIManager.StageWidth )/2, 0);
		this.InitBattleSqueue();
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
		this.InitOther();
	}
	public initStage(){
		this.instanceId = Game.PlayerLeagueSystem.leagueInstance.curInstanceId;
	}
	public loadMapId(){
		let tblLeagueInstance = TableLeagueInstance.Table();
		this.mapId = tblLeagueInstance[Game.PlayerLeagueSystem.leagueInstance.curInstanceId].battle_bg;
	}
	public loadStageId(){
		this.stageNumMax = 1;
		this.stageId = Game.PlayerLeagueSystem.leagueInstance.leagueInstanceStageInfo[1].stageInfo.stage_id;
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
		this.updateLeagueInstance(cheatDt);
	}
	public updateLeagueInstance( tick ){
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
	public isLoseGoBalance(){
		let bTag = false;
		if(this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty"){
			bTag = true;
		}
		return bTag;
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
	public oppToBriefInfo(){
		this.replayBattleInfo.rightReplayInfo.roleInfo = Helper.instanceToBriefInfo(Gmgr.Instance.fightType, this.stageId, Gmgr.Instance.pveBossinfo)
	}
	public takeGelArmy(){

	}
	public takeMobsArmy(){
		this.replayBattleInfo.stageInfo.push(Game.PlayerLeagueSystem.leagueInstance.leagueInstanceStageInfo[0].stageInfo)
	}

}
}