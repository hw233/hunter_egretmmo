namespace zj {
export class Fight_WantedSecondEnemy extends UI {
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
	public getMoney = 0;
	public getArena = 0;

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
			if (scene.isWin() == true) {
				this.DealWinData();
				this.WantedChallengeReq();
				this.stopChannelTag = true;
			} else if (scene.isLose() == true) {
				this.DealLoseData();
				this.WantedChallengeReq();
				this.stopChannelTag = true;
			}
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
	public WantedChallengeReq() {
		let scene = StageSceneManager.Instance.GetCurScene();
		let req = new message.EnemyCampBattleRequest();
		req.body.enemyCampId = Game.PlayerWantedSystem.wantedCurPos;
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
		Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
		Game.Controller.send(req, this.ChallengeArena_Visit, null, this, false);
	}
	public ChallengeArena_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let scene = StageSceneManager.Instance.GetCurScene();
		let response = <message.EnemyCampBattleResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
		// scene.getItemInfo.items = table.deepcopy(Player.getGoods)
		if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
			scene.endFightUi();
			loadUI(BattleEnd_Lose)
				.then((dialog: BattleEnd_Lose) => {
					this.loseSubUi = dialog;
					this.loseSubUi.show();
					this.loseSubUi.Init();
					this.loseSubUi.Load();
				});
		} else {
			scene.endFightUi();
			loadUI(BattleEnd_WinWanted)
				.then((dialog: BattleEnd_WinWanted) => {
					this.winSubUi = dialog;
					this.winSubUi.show();
					this.winSubUi.Init();
					this.winSubUi.Load();
				});
		}
	}
	public quit() {
		Game.PlayerBattleSystem.goBattleBefore();
	}
	public OnExit() {
		egret.clearInterval(this.update);
		this.update = -1;
	}
}
}