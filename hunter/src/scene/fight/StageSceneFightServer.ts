namespace zj {
export class StageSceneFightServer extends StageSceneFight{
	public constructor() {
		super();
	}
	public Init(){
		super.Init();
		this.InitOther();
	}
	public initMap(){
		this.loadMapId();
    	this.LoadMap(this.mapId);
	}
	public initSection_Other(){
		this.initMap();
    	this.initFightNumber();
	}
	public initSection_Mine(){
		this.LoadMine();
	}
	public initSection_Opp(){
		this.LoadOpp();
	}
	public initOppAdviser(){
		Gmgr.Instance.rightAdviserId = this.oppDetailInfo.adviserId   
		Gmgr.Instance.adviserRightInfos = this.oppDetailInfo.advisers
		Gmgr.Instance.adviserRightAttriTbl = Adviserlvdb.GetAllAdviserValueTbl(this.oppDetailInfo.advisers, Game.PlayerBattleSystem.pvpOppBriefInfo)   
			
		this.initOppAdviserSkills()
		this.initOppPokedexSkills()
		this.initOppPetSkills()
		this.initOppTitleSkills()
		this.initLeagueSkills();
		this.initSkinSkills();
	}
	public initOppAdviserSkills(){
		Gmgr.Instance.adviserSkills[TableEnum.TablePositionType.POSITION_RIGHT] = Adviserlvdb.GetAdviserSkills( this.oppDetailInfo.advisers, Game.PlayerBattleSystem.pvpOppBriefInfo);
	}
	public initOppPokedexSkills(){
		Gmgr.Instance.pokedexSkill[TableEnum.TablePositionType.POSITION_RIGHT] = Talentdb.GetPokedexSkills( this.oppDetailInfo.historyGenerals);
	}
	public initOppPetSkills(){
		Gmgr.Instance.petSkill[TableEnum.TablePositionType.POSITION_RIGHT] = Adviserdb.GetPetFightSkill( this.oppDetailInfo.pets );
	}
	public initOppTitleSkills(){
		let aa = Game.PlayerBattleSystem.pvpOppBriefInfo;
		Gmgr.Instance.titleSkill[TableEnum.TablePositionType.POSITION_RIGHT] = Otherdb.GetTitleFightSkill( Game.PlayerBattleSystem.pvpOppBriefInfo.titleId );
	}
	public initLeagueSkills(){
		Gmgr.Instance.leagueSkill[TableEnum.TablePositionType.POSITION_RIGHT] = null;// TODO 工会技能信息 message.DetailFormationInfo
	}
	public initSkinSkills(){
		Gmgr.Instance.skinSkill[TableEnum.TablePositionType.POSITION_LEFT] = null;//TableItemFashion.Table();
	}
	public initOppArtifact(){
		for(let k in this.oppDetailInfo.artifacts){
			let v = this.oppDetailInfo.artifacts[k];
			let key = v.artifactId % 1000;
			Gmgr.Instance.artifactRightTbl[key] = v;
		}
	}
	public saveRightAdviser(){
		for(let k in this.oppDetailInfo.advisers){
			let v = this.oppDetailInfo.advisers[k];
			this.replayBattleInfo.rightReplayInfo.advisers.push(v);
		}
	}
	public saveRightArtifact(){
		for(let k in this.oppDetailInfo.artifacts){
			let v = this.oppDetailInfo.artifacts[k];
			this.replayBattleInfo.rightReplayInfo.artifacts.push(v);
		}
	}
	public doFightFilling( role ){
		if(role.bEnemy == false){
			return this.fillMyGeneral(role.getTeamNum() + 1);
		}else if(role.bEnemy == true){
			this.fillOppGeneral(role.getTeamNum() + 1);
		}
	}
	public procSenceAppear( tick ){
		this.procSenceAppear_2( tick );
	}
	public Update(tick){
		super.Update(tick);
		this.procAi();
	}
	public procAi(){
		if((this.tableEnemysReserveRec[0] == "empty" && this.checkAllEnemyDead() == true)){
			this.staticFight();	
		}else if((this.tableAllysReserveRec[0] == "empty" && this.checkAllFriendDead() == true)){
			this.staticFight();	
		}
	}
	public isWin(){
		let bTag = false;
		if(this.checkEnemyEmpty() == true && this.tableEnemysReserveRec[0] == "empty"){
			this.nFinalCnt = this.getFinalGelCount();
        	bTag = true;
		}
		return bTag;
	}
	public isLose(){
		let bTag = false;
		if(this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")){
			bTag = true
		}
		return bTag;
	}
	public isLoseGoBalance(){
		let bTag = false;
		if(this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty"){
			 bTag = true
		}
		return bTag;
	}
	public getAdvanceMonId(pos){
		let reserves = this.oppDetailInfo.reserves;
		let info = this.getReserveInfo(reserves, this.tableEnemysReserveRec, false, this.tableMonsterPosRecord);
		if(info != null){
			return info.general_id;
		}else{
			return -1;
		}
	}
	// public isAllMonsterAppear(){
	// 	//this.isAllReserveAppear();
	// }
	public saveRightFormat(){
		this.replayBattleInfo.rightReplayInfo.formation  = Helper.detailCovertFormat(this.oppDetailInfo);
	}
	public saveRightGeneralInfos(){
		this.fillGel(this.oppDetailInfo.generals, 1);
 		this.fillGel(this.oppDetailInfo.reserves, 2);
    	this.fillGel(this.oppDetailInfo.supports, 3);
	}
	public fillGel(t, type){
		for(let i = 0; i<t.length;i++){
			if(t[i].general_id != 0){
				let battleGeneral = new message.BattleGeneralInfo;
				battleGeneral.type = type;
				let roleInfo = t[i];
				let result = PlayerHunterSystem.CalcBattleGelAttr( null, roleInfo );
				roleInfo.attri = Helper.tblConvertAttri(result);
				battleGeneral.generalInfo = roleInfo;
				this.replayBattleInfo.rightReplayInfo.generals.push(battleGeneral);
			}
		}
	}
}
}