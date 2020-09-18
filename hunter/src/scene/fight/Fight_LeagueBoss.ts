namespace zj {
export class Fight_LeagueBoss extends UI {
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
	public bossHp = 0;
	public timer = 0;
	public totalSum = 0;
	public time_id;

	public Init() {
		let scene = StageSceneManager.Instance.GetCurScene();
		this.update = egret.setInterval(this.Update, this, 0);

		Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_BOSS, this.LeagueBossNotice_Visit, this);
		this.bossHp = scene.bossInstance.getHp();
	}
	public LeagueBossNotice_Visit(response) {
		let data:message.LeagueBossNoticeRequest = response.data;
		// if (data.header.result != 0) {
		// 	toast(Game.ConfigManager.getAone2CodeReason(data.header.result));
		// 	return;
		// }
		if (data.body.type == 2 || data.body.type == 3) {
			this.freshBossHp(data.body.value);
		}
	}
	public getSumHurt(bclear) {
		let scene = StageSceneManager.Instance.GetCurScene();
		let sumHurt = 0;
		for (let k in scene.tableAllys) {
			let v = scene.tableAllys[k];
			if (v != null) {
				sumHurt = sumHurt + v.bossHurtValue
				if (bclear == true) {
					v.bossHurtValue = 0;
				}
			}
		}
		for (let k in scene.tableAllySupports) {
			let v = scene.tableAllySupports[k];
			if (v != null) {
				sumHurt = sumHurt + v.bossHurtValue;
				if (bclear == true) {
					v.bossHurtValue = 0;
				}
			}
		}
		return sumHurt;
	}
	public timeHp(tick) {
		let scene = StageSceneManager.Instance.GetCurScene();
		tick = 1/ConstantConfig_RoleBattle.DEFAULTFPS;
		if (scene.sceneState != TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
			return;
		}
		this.timer = this.timer + tick * 1000;
		if (this.timer >= 2000) {
			this.timer = 0;
			let sumHurt = this.getSumHurt(true);
			this.timeReq(sumHurt);
		}
	}
	public timeReq(value) {
		let req = new message.LeagueBossHurtRequest();
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.hurtValue = value;
		this.totalSum = this.totalSum + value;
		Game.Controller.send(req, this.LeagueBossHurt_Visit, null, this,false);


	}
	public LeagueBossHurt_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let response = <message.LeagueBossHurtResponse>resp;
		if (response.header.result != 0) {
			//toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		this.freshBossHp(response.body.value);
	}
	public freshBossHp(hp) {
		let scene = StageSceneManager.Instance.GetCurScene();
		if (scene.bBossDead == true) {
			return;
		}
		if (scene.bossInstance != null) {
			let curHp = scene.bossInstance.getHp();
			let a = hp - this.getSumHurt(false);
			if (a < 0) {
				a = 0;
			}
			scene.bossInstance.setHp(a);
		}
	}
	public Update(dt) {
		let scene = StageSceneManager.Instance.GetCurScene();
		if (Gmgr.Instance.bInLoading == true) {
			return;
		}
		this.timeHp(dt);
		if (scene.bBalance == false) {
			return;
		}
		if (this.stopChannelTag == false) {
			this.NetData();
			this.OpenBattleNet();
			this.stopChannelTag = true;
		}
	}
	public OpenBattleNet() {
		// this.time_id = egret.setInterval(this.NetData,this,ConstantConfig_RoleBattle.BATTLE_SETTLE_RECONNECT_TIME);
	}
	public EndBattleNet() {
		egret.clearInterval(this.time_id);
		this.time_id = -1;
	}
	public NetData() {
		if (Gmgr.Instance.bDisconnectNet == true) {
			return;
		}
		this.DealLoseData();
		this.ChallengeMobReq();
	}
	public DealWinData() {
		let scene = StageSceneManager.Instance.GetCurScene();
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
		this.battleQuality = message.EQuality.QUALITY_F;
		this.battleStar = message.EBattleStar.BATTLE_STAR_3;
		let battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
		Game.PlayerBattleSystem.cacheBattleResult = battleInfo;
	}
	public DealLoseData() {
		this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
		this.battleQuality = message.EQuality.QUALITY_B;
		this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
	}
	public ChallengeMobReq() {
		let scene = StageSceneManager.Instance.GetCurScene();
		let req = new message.LeagueBossBattleRequest();

		let sum = this.getSumHurt(true);
		this.totalSum = this.totalSum + sum;
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
		Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;

		Game.Controller.send(req, this.LeagueBossBattle_Visit, null, this, false);
	}
	public LeagueBossBattle_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let scene = StageSceneManager.Instance.GetCurScene();
		let response = <message.LeagueBossBattleResponse>resp;
		if (response.header.result != 0) {
			//toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		Game.EventManager.event(GameEvent.LEAGUEBOSSBATTLE,response.body);//工会需要的数据
		Game.PlayerLeagueSystem.updateLeagueBossHp(response.body.bossHp);
		if (response.body.is_kill == true) {
			Game.PlayerInstanceSystem.canSyncLevel = false;
			this.DealWinData();

			scene.endFightUi();
			loadUI(BattleEnd_WinLeagueMonster)
				.then((dialog: BattleEnd_WinLeagueMonster) => {
					this.winSubUi = dialog;
					this.winSubUi.show();
					this.winSubUi.Init();
					this.winSubUi.loadLabel(this);
					this.winSubUi.Load();
				});
		} else {
			this.DealLoseData();
			scene.endFightUi();
			loadUI(BattleEnd_LoseLeagueMonster)
				.then((dialog: BattleEnd_LoseLeagueMonster) => {
					this.loseSubUi = dialog;
					this.loseSubUi.show();
					this.loseSubUi.Init();
					this.loseSubUi.loadLabel(this);
					this.loseSubUi.Load();
				});
		}
	}
	public quit() {
		Game.PlayerBattleSystem.goBattleBefore();
	}
	public OnExit() {
		Game.EventManager.off(GameEvent.SERVER_NOTICE_LEAGUE_BOSS, this.LeagueBossNotice_Visit, this);
		egret.clearInterval(this.time_id);
		this.time_id = -1;
		egret.clearInterval(this.update);
		this.update = -1;
	}
}
}