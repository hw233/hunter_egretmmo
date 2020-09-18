namespace zj {
export class StageSceneFightBGroupFight extends StageSceneInstance{
	public constructor() {
		super();
		Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT)
		Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT)
		this.battleType = Gmgr.Instance.fightType;
		this.friendIndex = this.getFriendAppearIndex();
	}
	public friendIndex;
	public myDetailInfo;
	public myRoleBriefInfo;
	public loadFightStart(){
		this.loadSingleFightStart();
	}
	public getCurDetailFormationGels(){
		return [this.myDetailInfo.generals, this.myDetailInfo.reserves, this.myDetailInfo.supports];
	}
	public loadCurFormation(){
		// let aaaaa = PlayerGroupFightSystem.groupFightDetailsInfo;
		this.myDetailInfo = PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[Gmgr.Instance.starcraftIndex-1];
		this.curFormation = this.myDetailInfo;
		this.myRoleBriefInfo = Helper.baseToBriefInfo(Game.PlayerInfoSystem.BaseInfo);//(Gmgr.Instance.starcraftIndex == this.friendIndex) && PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo ||
	}
	public loadAuto(){
		Gmgr.Instance.bFightAuto = Gmgr.Instance.backupAutoTbl[Gmgr.Instance.fightType];
		this.bHideAuto = false;  
		this.bLockAuto = false;
		this.bHideLimit = true;
		this.bLockKey = false;
	}
	public Init(){
		super.Init();
		this.InitOther();
	}
	public formationType;
	public initSection_Mine(){
		this.formationType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
		this.initAdviser();
		this.saveLeftGeneralInfos();
		this.initGenerals();
		this.initSupports();
	}
	public initSection_Opp(){
		this.initMonster(true);
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
	public InitOther(){
		 this.UpdateMap( (this.mapWidth - UIManager.StageWidth )/2, 0);
    	this.InitBattleSqueue();
	}
	public initStage(){
		this.instanceId = PlayerGroupFightSystem.groupFightDetailsInfo.instanceId;
	}
	public loadMapId(){
		this.mapId = 29;
	}
	public loadStageId(){
		this.stageNumMax = 1;
		let retTbl = TableInstanceGroup.Item(this.instanceId);
		this.stageId = retTbl.monster_stages[Gmgr.Instance.starcraftIndex - 1];
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
		this.updateGroupFight(cheatDt);
	}
	public updateGroupFight( tick ){
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
	public nextGroupFight(){
		StageSceneManager.Instance.ChangeScene(StageSceneFightBGroupFight);
	}
	public saveLeftGeneralInfos(){
		function _fillGel(t, type,thisobj){
			for(let i = 0;i<t.length;i++){
				if(t[i].general_id != 0){
					let battleGeneral = new message.BattleGeneralInfo();
					battleGeneral.type = type;

					let roleInfo = t[i];
					let result = PlayerHunterSystem.CalcBattleGelAttr( null, roleInfo );
					roleInfo.attri = Helper.tblConvertAttri(result);
                	battleGeneral.generalInfo = roleInfo;
					thisobj.replayBattleInfo.leftReplayInfo.generals.push(battleGeneral);
				}
			}
		}
		_fillGel(this.myDetailInfo.generals, 1,this);
    	_fillGel(this.myDetailInfo.reserves, 2,this);
    	_fillGel(this.myDetailInfo.supports, 3,this);
	}
	public initGeneralTalents(){
		let generals = this.myDetailInfo.generals;
		for(let k in generals){
			let v = generals[k];
			if(v.general_id != 0){
				let [_every, _personal] =  Talentdb.createPersonTalent(v);
				Gmgr.Instance.everybodyTalent[TableEnum.TablePositionType.POSITION_LEFT].push(_every);
				Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_LEFT][v.general_id] = _personal;
			}
		}
		let supports = this.myDetailInfo.supports;
		for(let k in supports){
			let v = supports[k];
			if(v.general_id != 0){
				let [_every, _personal] = Talentdb.createPersonTalent(v);
				Gmgr.Instance.personalTalent[TableEnum.TablePositionType.POSITION_LEFT][v.general_id] = _personal;
			}
		}
	}
	public initGenerals(){
		this.initGeneralTalents();
		let test = [0,1,2,3];
		let [generals, reserves, supports] = [this.myDetailInfo.generals, this.myDetailInfo.reserves, this.myDetailInfo.supports];
		this.setDetailReserveRec(reserves, this.tableAllysReserveRec);
		for(let i = 0;i<test.length;i++){
			let generalInfo =  generals[ test[i] ];
			if(generalInfo != null && generalInfo.general_id > 0){
				let general = this._createMyGel(test[i], generalInfo);
				this.takeBtlGeneralInfo(this.replayBattleInfo.leftReplayInfo.generals, general, 1, true,null,null,null,null);
			}
		}
	}
	public playerToBriefInfo(){
		if(this.myRoleBriefInfo){
			this.replayBattleInfo.leftReplayInfo.roleInfo = this.myRoleBriefInfo;
		}else{
			this.replayBattleInfo.leftReplayInfo.roleInfo = new message.RoleBriefInfo();
		}
	}
	public saveLeftAdviser(){
		for(let k in this.myDetailInfo.advisers){
			let v = this.myDetailInfo.advisers[k];
			this.replayBattleInfo.leftReplayInfo.advisers.push(v);
		}
	}
	public saveLeftArtifact(){
		for(let k in this.myDetailInfo.artifacts){
			let v = this.myDetailInfo.artifacts[k];
			this.replayBattleInfo.leftReplayInfo.artifacts.push(v);
		}
	}
	public saveLeftFormat(){
		this.replayBattleInfo.leftReplayInfo.formation  = Helper.detailCovertFormat(this.myDetailInfo);
	}
	public initAdviser(){
		Gmgr.Instance.leftAdviserId = this.myDetailInfo.adviserId;
		Gmgr.Instance.adviserLeftInfos = this.myDetailInfo.advisers;
		Gmgr.Instance.adviserLeftAttriTbl = Adviserlvdb.GetAllAdviserValueTbl(this.myDetailInfo.advisers, this.myRoleBriefInfo);

		this.initAdviserSkills();
		this.initPokedexSkills();
		this.initPetSkills();
		this.initTitleSkills();
		this.initLeagueSkills();
		this.initSkinSkills();
	}
	public initAdviserSkills(){
		Gmgr.Instance.adviserSkills[TableEnum.TablePositionType.POSITION_LEFT] = Adviserlvdb.GetAdviserSkills(this.myDetailInfo.advisers, this.myRoleBriefInfo);
	}
	public initPokedexSkills(){
		Gmgr.Instance.pokedexSkill[TableEnum.TablePositionType.POSITION_LEFT] = Talentdb.GetPokedexSkills(this.myDetailInfo.historyGenerals);
	}
	public initPetSkills(){
		Gmgr.Instance.petSkill[TableEnum.TablePositionType.POSITION_LEFT] = Adviserdb.GetPetFightSkill(this.myDetailInfo.pets);
	}
	public initTitleSkills(){
		Gmgr.Instance.titleSkill[TableEnum.TablePositionType.POSITION_LEFT] = Otherdb.GetTitleFightSkill(this.myRoleBriefInfo.titleId);
	}
	public initLeagueSkills(){
		Gmgr.Instance.leagueSkill[TableEnum.TablePositionType.POSITION_LEFT] = null;// TODO 工会技能信息 Game.PlayerLeagueSystem.getSkillList();
	}
	public initSkinSkills(){
		Gmgr.Instance.skinSkill[TableEnum.TablePositionType.POSITION_LEFT] = null;//TableItemFashion.Table();
	}
	public getFriendAppearIndex(){
		return Table.FindK(PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos, 3) + 1;
	}
	public oppToBriefInfo(){
		this.replayBattleInfo.rightReplayInfo.roleInfo = Helper.instanceToBriefInfo(Gmgr.Instance.fightType, this.stageId, Gmgr.Instance.pveBossinfo);
	}
}
}