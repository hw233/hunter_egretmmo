namespace zj {
/**PVP跨服战类 */
export class StageSceneFightBSingle extends StageSceneFightServer{
	public constructor() {
		super();
		Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK)  
		Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK)  
		this.battleType = Gmgr.Instance.fightType
		this.oppDetailInfo = Game.PlayerBattleSystem.battleDetailFormation;
	}
	public loadFightStart(){
		this.loadSingleFightStart();
	}
	public getCurFormationGels(){
		let generals = Game.PlayerFormationSystem.formatsSingleAttack[Gmgr.Instance.starcraftIndex-1].generals;
    	let reserves = Game.PlayerFormationSystem.formatsSingleAttack[Gmgr.Instance.starcraftIndex-1].reserves;
    	let supports = Game.PlayerFormationSystem.formatsSingleAttack[Gmgr.Instance.starcraftIndex-1].supports;
    	return [generals, reserves, supports];
	}
	public loadCurFormation(){
		let index = Gmgr.Instance.starcraftIndex;
		let attack = Game.PlayerFormationSystem.formatsSingleAttack;
		this.curFormation = Game.PlayerFormationSystem.formatsSingleAttack[Gmgr.Instance.starcraftIndex-1];
	}
	public loadAuto(){
		Gmgr.Instance.bFightAuto = Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType];
		this.bHideAuto = false;    
		this.bLockAuto = false;
		this.bHideLimit = true;
		this.bLockKey = false;
	}
	public formationType;
	public LoadMine(){
		this.formationType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
		this.stageMaxTime = ConstantConfig_RoleBattle.SINGLE_CD_TIME * 1000;
		this.initAdviser();
		//self:initStrategy()
		//self:initArtifact()
		this.saveLeftGeneralInfos()
		this.initGenerals(false)
		this.initSupports()

		//self:initHelpIndex()
		//self:initHelpData()
		//self:initHelpGeneral() 

		this.nGeneralCount = this.getBeforeGelCount();
	}
	public LoadOpp(){
		this.initOppAdviser();
		this.saveRightGeneralInfos();
		this.initOppPvp(false, false, false);
		this.initOppSupports();
	}
	public InitOther(){
		this.UpdateMap( (this.mapWidth - UIManager.StageWidth )/2, 0);
		this.InitBattleSqueue();
	}
	public loadMapId(){
		this.mapId = 17;
	}
	public Update( tick ){
		super.Update(tick);
		if(Gmgr.Instance.bPause == true){
			return;
		}
		let cheatDt = 1.0 / ConstantConfig_RoleBattle.DEFAULTFPS;
		this.updateStarcraft(cheatDt);
	}
	public updateStarcraft( tick ){
		if(this.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT){
			return;
		}
		if(this.isWin() == true){
			this.goBalance();
		}else if(this.isTimeUp() == true){
			this.goBalance();
		}else if(this.isLoseGoBalance() == true){
			this.goBalance();
		}
	}
	public nextStarcraft(){
		StageSceneManager.Instance.ChangeScene(StageSceneFightBSingle);
	}
	public oppToBriefInfo(){
		this.replayBattleInfo.rightReplayInfo.roleInfo = Game.PlayerBattleSystem.pvpOppBriefInfo;
	}
}
}