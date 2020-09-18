namespace zj {
export class Fight_Single extends UI {
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/Fight_SingleSkin.exml";
	}
	public SpritFlag1: eui.Group;
	public SpritWord1: eui.Group;
	public SpritFlag2: eui.Group;
	public SpritWord2: eui.Group;
	public SpritFlag3: eui.Group;
	public SpritWord3: eui.Group;
	public Node_313: eui.Group;
	public scene;
	public stopChannelTag = false;
	public winSubUi = null;
	public loseSubUi = null;
	public getMoney = 0;
	public getArena = 0;
	public tblFlags = [];
	public tblWords = [];
	public tblStates = [];
	public update;

	public Init() {
		this.tblFlags = [this.SpritFlag1, this.SpritFlag2, this.SpritFlag3];
		this.tblWords = [this.SpritWord1, this.SpritWord2, this.SpritWord3];
		this.tblStates = [];

		for (let i = 0; i < this.tblFlags.length; i++) {
			this.tblFlags[i].visible = false;
		}
		this.update = egret.setInterval(this.Update, this, 0);
		this.FreshFlag();
	}
	public FreshFlag() {
		for (let i = 1; i <= this.tblWords.length; i++) {
			let info = Game.PlayerBattleSystem.battleSingleInfo[i];
			if (info != null) {
				this.tblWords[i - 1].visible = true;
				if (info.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
					this.tblWords[i - 1].source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.win, this);
				} else {
					this.tblWords[i - 1].source = cachekey(UIConfig.UIConfig_BattleStarcraft.word.fail, this);
				}
			} else {
				this.tblWords[i - 1].visible = false;
			}
		}
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
			this.cacheStarcraftInfo(this.battleResult, Game.PlayerBattleSystem.battleDetailFormation);
			this.FreshFlag();
			this.DealAnimation(200304);
		} else if (scene.isWin() == true) {
			this.DealWinData();
			this.cacheStarcraftInfo(this.battleResult, Game.PlayerBattleSystem.battleDetailFormation);
			this.FreshFlag();
			this.DealAnimation(200303);
		}
	}
	private playerEffect;
	public DealAnimation(id) {
		let scene = StageSceneManager.Instance.GetCurScene();
		function animationEvent() {
			if (this.playerEffect) {
				clearSpine(this.playerEffect);
				this.playerEffect = null;
			}
			this.ChallengeStarcraftReq();
		}
		let item = TableClientAniUi.Item(id);
		let tableAni = TableClientAniCssSource.Item(item.css_id);
		Game.DragonBonesManager.getArmatureDisplayAsync(this, tableAni.name)
			.then((display: dragonBones.EgretArmatureDisplay) => {
				this.playerEffect = display;
				this.playerEffect.x = Device.STANDARD_SCREEN_W / 2;
				this.playerEffect.y = Device.STANDARD_SCREEN_H / 2;
				setDragonBonesRemove(display);
				scene.nodeUpEffect.addChild(this.playerEffect);
				this.playerEffect.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, animationEvent, this);
				let names = this.playerEffect.animation.animationNames;
				for (let i = 0; i < names.length; i++) {
					if (item.index == i) {
						this.playerEffect.animation.play(names[i]);
						break;
					}
				}
			});
	}
	public battleResult;
	public battleQuality;
	public battleStar;
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
	public ChallengeStarcraftReq() {
		let scene = StageSceneManager.Instance.GetCurScene();
		let req = new message.CraftBattleRequest();
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
		if(req.body.battleInfo.battleTime < 150){
			req.body.battleInfo.battleTime = 150;
		}
		Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;

		//第三场没有打那么将第三组攻击阵型传过来
		if (Gmgr.Instance.starcraftIndex == 3
			&& this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN
			&& Game.PlayerBattleSystem.battleSingleInfo[2].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN
		) {
			let formation = new message.SimpleFormationInfo();
			for (let k in Game.PlayerFormationSystem.formatsSingleAttack[2].generals) {
				let v = Game.PlayerFormationSystem.formatsSingleAttack[2].generals[k];
				if (v != 0) {
					formation.generals.push(Helper.LocalGeneralIdTranToGelSimpleInfo(v));
				}
			}
			for (let k in Game.PlayerFormationSystem.formatsSingleAttack[2].supports) {
				let v = Game.PlayerFormationSystem.formatsSingleAttack[2].supports[k];
				if (v != 0) {
					formation.supports.push(Helper.LocalGeneralIdTranToGelSimpleInfo(v));
				}
			}
			req.body.leftFormation.push(formation);
		}
		egret.setTimeout(() => { Game.Controller.send(req, this.ChallengeStarcraft_Visit, null, this, false); }, this, 1000);
	}
	public ChallengeStarcraft_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let scene = StageSceneManager.Instance.GetCurScene();
		this.EndBattleNet();
		let response = <message.CraftBattleResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
		if (response.body.result == 0) {
			Gmgr.Instance.starcraftIndex = Gmgr.Instance.starcraftIndex + 1;
			this.BattleStartReq();
		} else {
			if (Gmgr.Instance.starcraftIndex < 3) {
				for (let i = 0; i < response.body.rightFormation.length; i++) {
					Gmgr.Instance.starcraftIndex = Gmgr.Instance.starcraftIndex + 1;
					this.cacheStarcraftInfo(message.BattleResultState.BATTLE_RESULT_STATE_NO, response.body.rightFormation[i]);
				}
			}
			scene.endFightUi();
			let info = {};
			info["rank"] = response.body.rank;
			info["score"] = response.body.score;
			Game.PlayerBattleSystem.singleEnemyInfo.score = response.body.other_score;
			Game.PlayerBattleSystem.singleEnemyInfo.rank = response.body.other_rank;
			if (response.body.result == 1) {
				loadUI(BattleEnd_WinStarcraftB)
					.then((dialog: BattleEnd_WinStarcraftB) => {
						this.winSubUi = dialog;
						this.winSubUi.show();
						this.winSubUi.SetUI(info);
						this.winSubUi.Init();
						this.winSubUi.Load();
					});
			} else if (response.body.result == 2) {
				loadUI(BattleEnd_LoseStarcraftB)
					.then((dialog: BattleEnd_LoseStarcraftB) => {
						this.loseSubUi = dialog;
						this.loseSubUi.show();
						this.loseSubUi.SetUI(info);
						this.loseSubUi.Init();
						this.loseSubUi.Load();
					});
			}
		}
	}
	public cacheStarcraftInfo(battleResult, rightFormation) {
		let scene = StageSceneManager.Instance.GetCurScene();
		let info = {};
		let [_generals, _reserves, _supports] = scene.getCurFormationGels();
		let leftArmy = {};

		let _tblGel = [];
		for (let i = 0; i < _generals.length; i++) {
			let general = new message.GeneralInfo();
			if (_generals[i] != 0) {
				general = Game.PlayerHunterSystem.allHuntersMap()[_generals[i]];
			}
			_tblGel.push(general);
		}
		let _tblSup = [];
		for (let i = 0; i < _supports.length; i++) {
			let general = new message.GeneralInfo();
			if (_supports[i] != 0) {
				general = Game.PlayerHunterSystem.allHuntersMap()[_supports[i]];
			}
			_tblSup.push(general);
		}
		leftArmy["generals"] = _tblGel;
		leftArmy["supports"] = _tblSup;

		let rightArmy = {};
		rightArmy["generals"] = rightFormation.generals;
		rightArmy["supports"] = rightFormation.supports;
		info["leftInfo"] = leftArmy;
		info["rightInfo"] = rightArmy;

		info["index"] = Gmgr.Instance.starcraftIndex;
		info["battleResult"] = battleResult;
		Game.PlayerBattleSystem.battleSingleInfo[info["index"]] = info;
	}
	public quit() {
		Game.PlayerBattleSystem.goBattleBefore();
	}
	public BattleStartReq() {
		let req = new message.BattleStartRequest();
		req.body.type = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
		req.body.id = Game.PlayerBattleSystem.pvpOppBriefInfo.id;
		req.body.ext = Gmgr.Instance.starcraftIndex;
		Game.Controller.send(req, this.BattleStart_Visit, null, this, false);
	}
	public BattleStart_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let scene = StageSceneManager.Instance.GetCurScene();
		let response = <message.BattleStartResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		if (response.body.detailFormation.length > 0) {
			let para = {}
			para["index"] = 4;
			let inflate = new Zlib.Inflate(response.body.detailFormation, para);
			let plain = inflate.decompress();
			let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
			let detailForma = new message.DetailFormationInfo()
			if (!detailForma.parse_bytes(decoder)) {
				toast(LANG("游戏数据解析失败"));
				return;
			}
			Game.PlayerBattleSystem.battleDetailFormation = detailForma;
		}
		this.CacheSkillSpineId();
		scene.nextStarcraft();
	}
	public CacheSkillSpineId() {
		Gmgr.Instance.relatedAsynDataId = [];
		let suffixs = ["generals", "reserves", "supports"];
		for (let i = 0; i < suffixs.length; i++) {
			let ids = Game.PlayerFormationSystem.formatsSingleAttack[Gmgr.Instance.starcraftIndex][suffixs[i]];
			for (let j = 0; j < ids.length; j++) {
				if (ids[j] > 0) {
					let gelInfo = Game.PlayerHunterSystem.allHuntersMap()[ids[j]];
					for (let x = 0; x < gelInfo.skills.length; x++) {
						Gmgr.Instance.relatedAsynDataId.push(gelInfo.skills[x].skillId);
					}
				}
			}
		}
		let generals = Game.PlayerBattleSystem.battleDetailFormation.generals;
		let supports = Game.PlayerBattleSystem.battleDetailFormation.supports;
		let enemys = [];
		enemys.push(generals);
		enemys.push(generals);//supports
		for (let k = 0; k < enemys.length; k++) {
			let v = enemys[k];
			if (v.general_id != 0) {
				for (let k1 in v.skills) {
					let v1 = v.skills[k1];
					Gmgr.Instance.relatedAsynDataId.push(v1.skillId);
				}
			}

		}
	}
	public OnExit() {
		egret.clearInterval(this.time_id);
		this.time_id = -1;
		egret.clearInterval(this.update);
		this.update = -1;
	}
}
}