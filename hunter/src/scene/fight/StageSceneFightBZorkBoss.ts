namespace zj {
export class StageSceneFightBZorkBoss extends StageSceneInstance{
	public constructor() {
		super();
		Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_ZORK);
		Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_ZORK);    
		this.battleType = Gmgr.Instance.fightType;
		this.bBossEnding = false;
	}
	public bBossEnding;

	public initBuffs(){

	}
	public searchMonsterInfo(monster){
		let info = Game.PlayerMobSystem.GetCurInfo( monster.roleId );
		if(info != null && info.cur_pos != 0 && info.is_dead == false){
			monster.setHp(info.cur_hp);
		}
	}
	public initSection_Other(){
		this.initStage();
		this.initMap();
		this.initFightNumber();
	}
	public formationType;
	public initSection_Mine(){
		this.formationType = message.EFormationType.FORMATION_TYPE_ZORK;
		this.initBuffs() 
		this.initAdviser()
		//this.initStrategy()
		//this.initArtifact()
		this.saveLeftGeneralInfos()
		this.initGenerals(false)      
		this.initSupports()

		this.nGeneralCount = this.getBeforeGelCount();
	}
	public initSection_Opp(){
		this.initMonster(false);
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
		Game.EventManager.on(GameEvent.SERVER_NOTICE_SCENE_BOSS_RESULT,this.SceneBossResultNotice_Visit,this)
	}
	public initStage(){
		this.instanceId = 1;
	}
	public loadMapId(){
		let tblWorldBoss = TableClientWorldBoss.Table();
		this.mapId = tblWorldBoss[1].battle_bg;
	}
	public loadStageId(){
		this.stageNumMax = 1;
		this.stageId = Game.PlayerZorkSystem.zorkBoss.bossInfo.bossInfo.stage_id;
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
		super.Update( tick );
		if(Gmgr.Instance.bPause == true){
			return;
		}
		let cheatDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
		this.updateLeagueBoss(cheatDt);
	}
	public updateLeagueBoss( tick ){
		if(this.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT){
			return;
		}
		if(this.isTimeUp() == true){
			this.goFightTimeUp();
		}else if(this.isWin() == true){
			this.goBalance();
		}else if(this.isLose() == true){
			this.goBalance();
		}
	}
	public isWin(){
		let bTag = false;
		if(this.isFinalStage() == true && (this.bBossDead == true || (this.battleTime <= 0 && Helper.getObjLen(this.tableAllys) > 0))){
			this.nFinalCnt = this.getFinalGelCount();
			bTag = true;
		}
		return bTag;
	}
	public isLose(){
		let bTag = false;
		if(this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty"){
			bTag = true;
		}
		return bTag;
	}
	public oppToBriefInfo(){
		//世界boss最终有boss
		this.replayBattleInfo.rightReplayInfo.roleInfo = Helper.instanceToBriefInfo(Gmgr.Instance.fightType, this.stageId, Gmgr.Instance.pveBossinfo);
	}
	public SceneBossResultNotice_Visit(result){
		let data:message.SceneBossResultNoticeRequest = result.data;
		if(this.bBossEnding == false){
			this.bBossEnding = true
        	// this.Pause();
        	// PushUI("Zork_BossEnd");
			loadUI(ZorkBossEnd).then((dialog: ZorkBossEnd) => {
				dialog.show(UI.SHOW_FROM_TOP);
        	});
		}
	}
}
}