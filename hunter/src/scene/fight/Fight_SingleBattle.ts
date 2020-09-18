namespace zj {
export class Fight_SingleBattle extends UI{
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/Fight_Instance.exml";
	}
	public scene;
	public stopChannelTag = false;
	public winSubUi = null;
	public loseSubUi = null;
	public battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
    public battleQuality = message.EQuality.QUALITY_NONE;
    public battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	public update;
	public Init(){
		this.update = egret.setInterval(this.Update,this,0);
	}
	public Update(dt){
		let scene = StageSceneManager.Instance.GetCurScene();
		if(Gmgr.Instance.bInLoading == true){
			return;
		}
		if(scene.bBalance == false){
			return;
		}
		if(this.stopChannelTag == false){
            this.NetData();
            this.OpenBattleNet();
			this.stopChannelTag = true;
		}
	}
	private time_id;
	public OpenBattleNet(){
		// this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
	}
	public EndBattleNet(){
		egret.clearInterval(this.time_id);
		this.time_id = -1;
	}
	public NetData(){
		let scene = StageSceneManager.Instance.GetCurScene();
		if(Gmgr.Instance.bDisconnectNet == true){
			return;
		}
		if(scene.isLose() == true){
			this.DealLoseData();
        	this.ChallengePkReq();
		}else if(scene.isWin() == true){
			this.DealWinData();
        	this.ChallengePkReq();
		}
	}
	public DealWinData(){
		let scene = StageSceneManager.Instance.GetCurScene();
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN; 
		let num = Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
		this.battleQuality = message.EQuality.QUALITY_E + num;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
	}
	public DealLoseData(){
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
		this.battleQuality = message.EQuality.QUALITY_F;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	}
	public ChallengePkReq(){
		let scene = StageSceneManager.Instance.GetCurScene();
		let req = new message.PVPBattleResultRequest();
		// req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.roleId = Gmgr.Instance.pkRoleId;
		req.body.group_id = Gmgr.Instance.pkRoleGroupId;
		req.body.result = this.battleResult;
		req.body.battle_type = Gmgr.Instance.pkBattleType;
		req.body.battle_date = Helper.createPvpBattleResultInfo( this.CreatePvpResultInfo());
		Game.PlayerBattleSystem.cacheBattleResult = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
		Game.Controller.send(req, this.ChallengePk_Visit, null, this, false);
	}
	public ChallengePk_Visit(req: aone.AoneRequest, resp: aone.AoneResponse){
		let scene = StageSceneManager.Instance.GetCurScene();
		let response = <message.PVPBattleResultResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		Game.PlayerBattleSystem.battleReportId = 0;//response.body.battle_id;
		if(this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL){
			scene.endFightUi();
			loadUI(BattleEnd_LoseArenaServer)
					.then((dialog: BattleEnd_LoseArenaServer) => {
						this.loseSubUi = dialog;
						this.loseSubUi.show();
						this.loseSubUi.Init();
						this.loseSubUi.Load();
					});
		}else{
			loadUI(BattleEnd_WinArenaServer)
					.then((dialog: BattleEnd_WinArenaServer) => {
						this.winSubUi = dialog;
						this.winSubUi.show();
						this.winSubUi.Init();
						this.winSubUi.Load();
					});
		}
	}
	public CreatePvpResultInfo(){
		let scene = StageSceneManager.Instance.GetCurScene();
		let msg = new message.MoreSimpleFormationInfo();
		msg.battle_result.push(this.battleResult);

		let [generals, reserves, supports] = scene.getCurFormationGels();
		let formation = new message.SimpleFormationInfo();
		for(let k in generals){
			let v = generals[k];
			if(v!=0){
				formation.generals.push(Helper.LocalGeneralIdTranToGelSimpleInfo( v ));
			}else{
				formation.generals.push(new message.GeneralSimpleInfo());
			}
		}
		for(let k in supports){
			let v = supports[k];
			if(v!=0){
				formation.supports.push(Helper.LocalGeneralIdTranToGelSimpleInfo( v ));
			}else{
				formation.supports.push(new message.GeneralSimpleInfo());
			}
		}
		msg.simpleFormation.push(formation);
		return msg;
	}
	public quit(){
		//Gmgr:goBattleBefore()
	}
	public OnExit(){
		egret.clearInterval(this.time_id);
		this.time_id = -1;
		egret.clearInterval(this.update);
		this.update = -1;
		this.scene = null;
	}
}
}