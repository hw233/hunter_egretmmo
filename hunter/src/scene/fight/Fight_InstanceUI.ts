namespace zj {
	export class Fight_InstanceUI extends UI {
		public constructor() {
			super();
			this.skinName = "resource/skins/fight/Fight_Instance.exml";
		}
		public stopChannelTag = false;
		public winSubUi;
		public loseSubUi;
		public battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
		public battleQuality = message.EQuality.QUALITY_NONE;
		public battleStar = message.EBattleStar.BATTLE_STAR_NONO;
		public parentWnd;
		private update;
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
			//this.time_id = egret.setInterval(this.NetData, this, ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
		}
		public EndBattleNet() {
			egret.clearInterval(this.time_id);
			this.time_id = -1;
		}
		public IsEndBattleEnd() {
			// if(this.time_id == -1){
			// 	return true;
			// }
			return false;
		}
		public NetData() {
			let scene = StageSceneManager.Instance.GetCurScene();
			if (Gmgr.Instance.bDisconnectNet == true) {
				return;
			}
			//先判断失败，后判断胜利
			if (scene.isLose() == true) {
				this.DealLoseData();
				this.ChallengeMobReq(false);
			} else if (scene.isWin() == true) {
				this.DealWinData();
				this.ChallengeMobReq(false);
			}
		}
		public OnExit() {
			egret.clearInterval(this.time_id);
			this.time_id = -1;
			egret.clearInterval(this.update);
			this.update = -1;
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
		public ChallengeMobReq(is_jump) {
			this.OnExit();

			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
				let scene = StageSceneManager.Instance.GetCurScene();
				let req = new message.ActivityRandInstanceResultRequest();
				req.body.sequence = Game.PlayerBattleSystem.battleSequence;
				req.body.instanceId = scene.instanceId;
				req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
				Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
				// req.body.battle_id = 
				Game.PlayerBattleSystem.sendMobReq1(req)
					.then((value) => {
						this.ChallengeMob_Visit(value);
					})
					.catch((reason) => {

					});

			} else {
				let scene = StageSceneManager.Instance.GetCurScene();
				let req = new message.ChallengeMobRequest();
				req.body.sequence = Game.PlayerBattleSystem.battleSequence;
				req.body.mobsId = scene.instanceId;
				req.body.is_jump = is_jump;
				req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
				req.body.formation = [Game.PlayerFormationSystem.curFormations[Game.PlayerInstanceSystem.curInstanceType - 1]];
				Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;

				Game.PlayerBattleSystem.sendMobReq(req)
					.then((value) => {
						this.ChallengeMob_Visit(value);
					})
					.catch((reason) => {

					});
			}

		}
		public ChallengeMob_Visit(msg) {
			if (this.IsEndBattleEnd()) {
				return;
			}
			let scene = StageSceneManager.Instance.GetCurScene();
			Game.PlayerBattleSystem.battleReportId = msg.body.battle_id;
			if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
				scene.getItemInfo.exp = 0;
				scene.getItemInfo.coin = 0;
				scene.getItemInfo.items = Helper.hideSpecialGoods(msg.body.gameInfo.getGoods);

				scene.endFightUi();
				loadUI(BattleEnd_Lose)
					.then((dialog: BattleEnd_Lose) => {
						this.loseSubUi = dialog;
						this.loseSubUi.show();
						this.loseSubUi.SetFather(this);
						this.loseSubUi.Init();
						this.loseSubUi.Load();
					});
			} else {
				Game.PlayerInstanceSystem.canSyncLevel = false;
				if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {

				} else {
					let tableInstance = TableInstance.Table();
					let startExp = tableInstance[scene.instanceId].challenge_start;
					let winExp = tableInstance[scene.instanceId].challenge_win;
					let tableLevel = TableLevel.Table();
				}
				scene.mainmenu.CommonSettleWin(msg);
				scene.endFightUi();
			}
		}
		public quit() {
			Game.PlayerBattleSystem.goBattleBefore();
		}
	}
}