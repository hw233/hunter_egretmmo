namespace zj {
	export class Fight_Wanted extends UI {
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
				this.NetData();
				this.OpenBattleNet();
				this.stopChannelTag = true;
			}
		}
		private time_id;
		public OpenBattleNet() {
			//this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
		}
		public EndBattleNet() {
			egret.clearInterval(this.time_id);
			this.time_id = -1;
		}
		public IsEndBattleEnd() {
			if (this.time_id == -1) {
				return true;
			}
			return false;
		}
		public NetData() {
			let scene = StageSceneManager.Instance.GetCurScene();
			if (Gmgr.Instance.bDisconnectNet == true) {
				return;
			}
			if (scene.isWin() == true) {
				this.DealWinData();
				this.WantedChallengeReq();
			} else if (scene.isLose() == true) {
				this.DealLoseData();
				this.WantedChallengeReq();
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
			let req = new message.WantedBattleRequest();
			req.body.wantedId = Game.PlayerWantedSystem.wantedCurPos;
			req.body.sequence = Game.PlayerBattleSystem.battleSequence;
			req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
			Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
			Game.Controller.send(req, this.ChallengeArena_Visit, null, this, false);
		}
		public ChallengeArena_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
			let scene = StageSceneManager.Instance.GetCurScene();
			if (this.IsEndBattleEnd()) {
				return;
			}
			let response = <message.WantedBattleResponse>resp;
			if (response.header.result != 0) {
				//toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				// this.WantedChallengeReq();
				return;
			}
			Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
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
				scene.mainmenu.CommonSettleWin(response);
				scene.endFightUi();
			}
			this.EndBattleNet();
		}
		public quit() {
			Game.PlayerBattleSystem.goBattleBefore();
		}
		public OnExit() {
			egret.clearInterval(this.time_id);
			this.time_id = -1;
			egret.clearInterval(this.update);
			this.update = -1;
		}
	}
}