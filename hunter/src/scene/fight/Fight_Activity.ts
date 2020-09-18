namespace zj {
/**
 * @class 猎人故事 战斗UI
 * 
 * @author LianLei
 * 
 * @date 2019.07.31
 */
export class Fight_Activity extends UI {

	private scene: any;
	private stopChannelTag: boolean;
	private battleResult: number;
	private battleQuality: number;
	private battleStar: number;
	private getMoney: number;
	private getArena: number;
	private update: number; // 计时器
	private time_id: number; // 计时器
	private winSubUi: BattleEnd_WinStoryInstance;
	private loseSubUi: BattleEnd_Lose;

	public constructor() {
		super();
		this.skinName = "resource/skins/fight/Fight_ActivitySkin.exml";
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.scene = null;
			egret.clearInterval(this.update);
			egret.clearInterval(this.time_id);
			this.update = -1;
			this.time_id = -1;
		}, this);
		this.scene = StageSceneManager.Instance.GetCurScene();
		this.stopChannelTag = false;
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
		this.battleQuality = message.EQuality.QUALITY_NONE;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
		this.getMoney = 0;
		this.getArena = 0;
	}

	public Init() {
		this.update = egret.setInterval(this.Update, this, 0);
	}

	private Update() {
		if (Gmgr.Instance.bInLoading == true) return;
		if (this.scene.bBalance == false) return;
		if (this.stopChannelTag == false) {
			this.NetData();
			this.OpenBattleNet();
			this.stopChannelTag = true;
		}
	}

	private OpenBattleNet() {
		// this.time_id = egret.setInterval(this.NetData, this, ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME); // 重新连接结算
	}

	private EndBattleNet() {
		egret.clearInterval(this.time_id);
		this.time_id = -1;
	}

	private IsEndBattleEnd() {
		if (this.time_id == -1) {
			return true;
		}
		return false;
	}

	private NetData() {
		if (Gmgr.Instance.bDisconnectNet == true) return;
		if (this.scene.isWin() == true) {
			this.DealWinData();
			this.ActivityChallengeReq();
		}
		else if (this.scene.isLose() == true) {
			this.DealLoseData();
			this.ActivityChallengeReq();
		}
	}

	private DealWinData() {
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
		let num = Helper.getWantedBattleStar(this.scene.nFinalCnt, this.scene.nGeneralCount);
		this.battleQuality = message.EQuality.QUALITY_E + num;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO + num;
	}

	private DealLoseData() {
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
		this.battleQuality = message.EQuality.QUALITY_F;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	}

	private ActivityChallengeReq() {
		let req = new message.ActivityInstanceResultRequest();
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.instanceId = PlayerActivitySystem.activityBattleCurPos;
		req.body.activityIndex = Game.PlayerInstanceSystem.activityBattleIndex;
		req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, this.scene.getTiming(), this.scene.getTotalDamageValue(), this.scene.maxCombo, this.scene.replayBattleInfo);
		Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;

		Game.Controller.send(req, this.ActivityChallenge_Visit, null, this, false);
	}

	private ActivityChallenge_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		if (this.IsEndBattleEnd()) return;
		let response = <message.ActivityInstanceResultResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}

		if (response.header.result == message.EC.SUCCESS) {
			Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
			this.scene.getItemInfo.items = Helper.hideSpecialGoods(response.body.gameInfo.getGoods);
			this.scene.getItemInfo.turnItems, this.scene.getItemInfo.extraItems = Helper.getTurnGoods(response.body.gameInfo.getGoods, Gmgr.Instance.fightType);
			this.scene.getItemInfo.firstBloodItems = Helper.getFirstBloodGoods(response.body.gameInfo.getGoods, Gmgr.Instance.fightType);
			this.scene.potatos = response.body.gameInfo.potatos;
			this.scene.getItemInfo.potatos = Table.DeepCopy(response.body.gameInfo.potatos);

			if (this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
				this.scene.endFightUi();
				loadUI(BattleEnd_Lose).then((dialog: BattleEnd_Lose) => {
					this.loseSubUi = dialog;
					this.loseSubUi.show();
					this.loseSubUi.SetFather(this);
					this.loseSubUi.Init();
					this.loseSubUi.Load();
					this.scene = null;
				});
			}
			else {
				this.scene.endFightUi();
				loadUI(BattleEnd_WinStoryInstance).then((dialog: BattleEnd_WinStoryInstance) => {
					this.winSubUi = dialog;
					this.winSubUi.show();
					this.winSubUi.Init();
					this.winSubUi.Load();
				});
			}
		}
		else {
			TipManager.ShowBattleError(response.header.result, this, this.quit);
		}
	}

	private quit() {
		Game.PlayerBattleSystem.goBattleBefore();
	}

	public OnExit() { // 战斗结束 清除所有事件计时器
		Gmgr.Instance.bPause = false;
		Gmgr.Instance.bReplay = false;
		egret.clearInterval(this.update);
		egret.clearInterval(this.time_id);
		this.update = -1;
		this.time_id = -1;
		this.scene = null;
	}
}
}