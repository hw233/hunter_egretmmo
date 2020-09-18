namespace zj {
export class Fight_Arena extends UI {
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
			this.stopChannelTag = true
			this.NetData();
			//this.OpenBattleNet();
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
			this.ChallengeArenaReq();
		} else if (scene.isWin() == true) {
			this.DealWinData();
			this.ChallengeArenaReq();
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
	public ChallengeArenaReq() {
		let scene = StageSceneManager.Instance.GetCurScene();
		let request = new message.LadderBattleRequest();
		request.body.sequence = Game.PlayerBattleSystem.battleSequence;
		request.body.roleId = Gmgr.Instance.arenaRoleId;
		request.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
		Game.PlayerBattleSystem.cacheBattleResult = request.body.battleInfo;

		Game.Controller.send(request, this.ChallengeArena_Visit, null, this, false);
		Game.PlayerArenaSystem.ladderList(true).then((data: any) => {
			ArenaMainScene.roleFormationInfo = data;
		});
	}
	public ChallengeArena_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let scene = StageSceneManager.Instance.GetCurScene();
		let goods = new message.GoodsInfo();
		function tmp() {
			loadUI(CommonGetDialog)
				.then((dialog: CommonGetDialog) => {
					dialog.init([goods])
					dialog.setCB(() => {
					});
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}
		let response = <message.LadderBattleResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
		if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
			scene.getItemInfo.arena = Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_LADDER);
			scene.endFightUi();
			loadUI(BattleEnd_LoseArenaServer)
				.then((dialog: BattleEnd_LoseArenaServer) => {
					this.loseSubUi = dialog;
					this.loseSubUi.show();
					this.loseSubUi.Init();
					this.loseSubUi.Load();

				});
		} else {
			scene.getItemInfo.coin = Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_MONEY);
			scene.getItemInfo.arena = Helper.getGoodsCountFrTbl(response.body.gameInfo.getGoods, message.EResourceType.RESOURCE_LADDER);

			scene.endFightUi();
			loadUI(BattleEnd_WinArenaServer)
				.then((dialog: BattleEnd_WinArenaServer) => {
					this.winSubUi = dialog;
					this.winSubUi.show();
					this.winSubUi.Init();
					this.winSubUi.Load();
					if (Game.PlayerInfoSystem.BaseInfo.ladderMax < Gmgr.Instance.arenaBestRank) {
						goods.goodsId = message.EResourceType.RESOURCE_TOKEN;
						goods.count = Game.PlayerInfoSystem.BaseInfo.token - Game.PlayerInfoSystem.baseInfo_pre.token;
						if (goods.count > 0) {
							dialog.SetSettleCb(tmp);
						}
					}
				});

		}
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