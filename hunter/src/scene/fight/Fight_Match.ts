namespace zj {
export class Fight_Match extends UI {
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/Fight_Instance.exml";
	}
	public stopChannelTag = false;
	public winSubUi = null;
	public loseSubUi = null;
	public battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
	public battleQuality = message.EQuality.QUALITY_NONE;
	public battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	public update;

	public Init() {
		this.update = egret.setInterval(this.Update, this, 0);
	}
	public Update(dt) {
		let scene = StageSceneManager.Instance.GetCurScene();
		if (Gmgr.Instance.bInLoading == true) {
			return;
		}
		if (scene.bBalance == false) {
			return;
		}
		if (this.stopChannelTag == false) {
			this.stopChannelTag = true;
			this.NetData();
			this.OpenBattleNet();
		}
	}
	private time_id;
	public OpenBattleNet() {
		// this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
	}
	public EndBattleNet() {
		egret.clearInterval(this.time_id);
		this.time_id = -1;
	}
	public NetData() {
		let scene = StageSceneManager.Instance.GetCurScene();
		if (Gmgr.Instance.bDisconnectNet == true) {
			return;
		}
		if (scene.isLose() == true) {
			this.DealLoseData();
			this.ChallengeMatchReq();
		} else if (scene.isWin() == true) {
			this.DealWinData();
			this.ChallengeMatchReq();
		}
	}
	public DealWinData() {
		let scene = StageSceneManager.Instance.GetCurScene();
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
		let num = Helper.getBattleStar(scene.nFinalCnt, scene.nGeneralCount);
		this.battleQuality = message.EQuality.QUALITY_E + num;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
	}
	public DealLoseData() {
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
		this.battleQuality = message.EQuality.QUALITY_F;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	}
	public ChallengeMatchReq() {
		let scene = StageSceneManager.Instance.GetCurScene();
		let req = new message.LeagueMatchFortressBattleResultRequest();
		req.body.type = Math.floor(Gmgr.Instance.matchHard / 100);
		req.body.index = Gmgr.Instance.matchHard;
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
		req.body.extraStr = Gmgr.Instance.matchEnemyName;
		Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
		Game.Controller.send(req, this.ChallengeMatch_Visit, null, this, false);
	}
	public ChallengeMatch_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let scene = StageSceneManager.Instance.GetCurScene();
		let tmp = () => {
			loadUI(MatchWinPop)
				.then((dialog: MatchWinPop) => {
					this.loseSubUi = dialog;
					this.loseSubUi.show();
				});
		}
		this.EndBattleNet();
		let response = <message.LeagueMatchFortressBattleResultResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
		if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
			scene.getItemInfo.league = Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_LEAGUE_SCORE);
			loadUI(BattleEnd_LoseMatchServer)
				.then((dialog: BattleEnd_LoseMatchServer) => {
					this.loseSubUi = dialog;
					this.loseSubUi.show();
					this.loseSubUi.Init();
					this.loseSubUi.Load();
				});
		} else {
			scene.getItemInfo.league = Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_LEAGUE_SCORE);
			scene.endFightUi();
			loadUI(BattleEnd_WinMatchServer)
				.then((dialog: BattleEnd_WinMatchServer) => {
					this.winSubUi = dialog;
					this.winSubUi.show();
					this.winSubUi.Init();
					this.winSubUi.Load();
					this.winSubUi.SetSettleCb(tmp);
				});
			
		}
	}
	public quit() {
		//Gmgr:goBattleBefore()
	}
	public OnExit() {
		egret.clearInterval(this.time_id);
		this.time_id = -1;
		egret.clearInterval(this.update);
		this.update = -1;
	}
}
}