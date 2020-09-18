namespace zj {
/**
 * @class 年兽boss战斗积分显示
 * 
 * @author LianLei
 * 
 * @date 2019.07.26
 */
export class Fight_ActivityBoss extends UI {

	private groupHit: eui.Group;
	private labelHit: eui.BitmapLabel;

	private scene: any;
	private stopChannelTag: boolean;
	private bossHp: number;
	private timer: number;
	private battleResult: number;
	private battleQuality: number;
	private battleStar: number;
	private ScoreSum: number;
	private winSubUi: any;
	private loseSubUi: number;

	private update: number;
	private _timmers: number;
	// private time_id: number;

	public constructor() {
		super();
		this.skinName = "resource/skins/fight/Fight_ActivityBossSkin.exml";
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.scene = null;
			egret.clearInterval(this.update);
			egret.clearInterval(this._timmers);
			// egret.clearInterval(this.time_id);
			this.update = -1;
			this._timmers = -1;
			// this.time_id = -1;
		}, this);
		this.scene = StageSceneManager.Instance.GetCurScene();
		this.stopChannelTag = false;
		this.bossHp = 0;
		this.timer = 0;
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
		this.battleQuality = message.EQuality.QUALITY_NONE;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
		this.ScoreSum = 0;
		this.winSubUi = null;
		this.loseSubUi = null;
	}

	public Init() {
		this.labelHit.text = "0";
		this.update = egret.setInterval(this.Update, this, 0);
		this._timmers = egret.setInterval(this.UpdateEnd, this, 990);
	}

	private UpdateEnd() {
		let [bOpen, lastTime] = Game.PlayerBossSystem.ActivityBossOpenTime();
		let time = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS].leftTime - Math.floor(egret.getTimer() / 1000);
		if (!bOpen && time <= 0) {
			loadUI(Activity_BossEnd).then((dialog: Activity_BossEnd) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.init();
				this.OnExit();
				this.scene = null;
			});
		}
	}

	private getSumHurt(): number {
		let sumHurt = 0;

		for (let [k, v] of HelpUtil.GetKV(this.scene.tableAllys)) {
			if (v != null) {
				sumHurt += v.bossHurtValue;
			}
		}

		for (let [k, v] of HelpUtil.GetKV(this.scene.tableAllySupports)) {
			if (v != null) {
				sumHurt += v.bossHurtValue
			}
		}

		return sumHurt;
	}

	private timeHp() {
		if (this.scene.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT) return;
		let sumHurt = this.getSumHurt();
		let score = CommonConfig.darkland_boss_calc_battle_score(sumHurt);
		this.labelHit.text = score.toString();
	}

	private Update() {
		if (Gmgr.Instance.bInLoading == true) return;
		this.timeHp();
		if (this.scene.bBalance == false) return;
		if (this.stopChannelTag == false && this.scene.bBossEnding == false) {
			this.NetData();
			this.OpenBattleNet();
			this.stopChannelTag = true;
		}
	}

	private OpenBattleNet() {
		// this.time_id = egret.setInterval(this.NetData, this, ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
	}

	// private EndBattleNet() {
	// 	egret.clearInterval(this.time_id);
	// 	this.time_id = -1;
	// }

	private NetData() {
		if (Gmgr.Instance.bDisconnectNet == true) return;

		this.DealLoseData();
		this.ChallengeMobReq();
	}

	private DealLoseData() {
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
		this.battleQuality = message.EQuality.QUALITY_B;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	}

	private ChallengeMobReq() {
		let req = new message.DarklandBossBattleResultRequest();

		let SumHurt = this.getSumHurt();
		let score = CommonConfig.darkland_boss_calc_battle_score(SumHurt);

		req.body.mobId = Game.PlayerBossSystem.ActivityBoss.bossId;
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, this.scene.getTiming(), null, this.scene.maxCombo, this.scene.replayBattleInfo);
		req.body.totalDamage = SumHurt;
		Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
		req.body.score = score;
		Game.Controller.send(req, this.BossBattle_Visit, null, this, false);
	}

	private BossBattle_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		// this.EndBattleNet();
		let response = <message.DarklandBossBattleResultResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		if (response.header.result == message.EC.SUCCESS) {
			this.OnExit();
			this.bossEntry();
		}
		else {
			TipManager.ShowBattleError(response.header.result, this, this.quit);
		}
	}

	private bossEntry() {
		let req = new message.DarklandBossEnterRequest();

		Game.PlayerWonderLandSystem.willGoRpg();

		Game.Controller.send(req, this.BossEntryReqBody_Visit, null, this, false);
	}

	private BossEntryReqBody_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let response = <message.DarklandBossEnterResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		if (response.header.result == message.EC.SUCCESS) {
			PlayerWonderLandSystem.MapHeight = 960;
			response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
			Game.PlayerBossSystem.ActivityBoss.roleInfo = response.body.roleInfo;
			Game.PlayerWonderLandSystem.loadRpgScenePos(response.body.posInfos);
			Game.PlayerBossSystem.ActivityBoss.inZorkBoss = true;
			Game.PlayerWonderLandSystem.darkland.cityId = response.body.cityId;
			Game.PlayerWonderLandSystem.darkland.cityServerInfo = response.body.group_name;
			StageSceneManager.Instance.ChangeScene(StageSceneActivityBoss);
		}
		else {
			TipManager.ShowBattleError(response.header.result, this, this.QuitBossFight);
		}
	}

	private quit() {
		Game.PlayerBattleSystem.goBattleBefore();
	}

	private QuitBossFight() {
		Gmgr.Instance.bPause = false;
		Gmgr.Instance.bReplay = false;
		egret.clearInterval(this.update);
		egret.clearInterval(this._timmers);
		// egret.clearInterval(this.time_id);
		this.update = -1;
		// this.time_id = -1;
		this._timmers = -1;
		loadUI(Activity_BossMainPop).then((scene: Activity_BossMainPop) => {
			scene.show(UI.SHOW_FROM_TOP);
			scene.init();
		});
	}

	public OnExit() { // 战斗结束 清除所有事件计时器
		Gmgr.Instance.bPause = false;
		Gmgr.Instance.bReplay = false;
		egret.clearInterval(this.update);
		egret.clearInterval(this._timmers);
		// egret.clearInterval(this.time_id);
		this.update = -1;
		// this.time_id = -1;
		this._timmers = -1;
		this.scene = null;
	}
}
}