namespace zj {
export class Fight_ThreeBattle extends UI {
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/Fight_SingleSkin.exml";
	}
	public stopChannelTag = false;
	public winSubUi = null;
	public loseSubUi = null;
	public endResult = -1;
	public getMoney = 0;
	public getArena = 0;
	public update;
	public SpritFlag1: eui.Group;
	public SpritWord1: eui.Group;
	public SpritFlag2: eui.Group;
	public SpritWord2: eui.Group;
	public SpritFlag3: eui.Group;
	public SpritWord3: eui.Group;
	public Node_313: eui.Group;
	public tblFlags = [];
	public tblWords = [];
	public tblStates = [];


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
			this.CacheChallengeSingleBattle();
			this.CacheStarcraftInfo(this.battleResult, Game.PlayerBattleSystem.battleDetailFormation);
			this.FreshFlag();
			this.DealAnimation(200304);
		} else if (scene.isWin() == true) {
			this.DealWinData();
			this.CacheChallengeSingleBattle();
			this.CacheStarcraftInfo(this.battleResult, Game.PlayerBattleSystem.battleDetailFormation);
			this.FreshFlag();
			this.DealAnimation(200303);
		}
	}
	public disPlay;
	public DealAnimation(id) {
		function animationEvent() {
			if (this.checkGoonOrEnd()) {
				this.ChallengeThreePkReq();
			} else {
				this.goOn();
			}
		}
		let item = TableClientAniUi.Item(id);
		let tableAni = TableClientAniCssSource.Item(item.css_id);
		Game.DragonBonesManager.getArmatureDisplayAsync(this, tableAni.name)
			.then((display: dragonBones.EgretArmatureDisplay) => {

				this.disPlay = display;
				display.x = this.width / 2;
				display.y = this.height / 2;
				setDragonBonesRemove(display);
				this.addChild(display);
				display.addDBEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, animationEvent, this);
				let names = display.animation.animationNames;
				for (let i = 0; i < names.length; i++) {
					if (item.index == i) {
						display.animation.play(names[i]);
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
	public CacheChallengeSingleBattle() {
		let scene = StageSceneManager.Instance.GetCurScene();
		Game.PlayerBattleSystem.multiReplayInfo[Gmgr.Instance.starcraftIndex - 1] = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
	}
	public CreateMultiResultInfo(index) {
		index = index - 1;
		let msg = new message.MultiResultInfo();
		for (let i = 0; i < Game.PlayerBattleSystem.multiReplayInfo.length; i++) {
			msg.results.push(Game.PlayerBattleSystem.multiReplayInfo[i]);
		}
		for (let i = index; i < 3; i++) {
			let formation = new message.SimpleFormationInfo();
			for (let k in Game.PlayerFormationSystem.formatsSingleAttack[i].generals) {
				let v = Game.PlayerFormationSystem.formatsSingleAttack[i].generals[k];
				if (v != 0) {
					formation.generals.push(Helper.LocalGeneralIdTranToGelSimpleInfo(v))
				}
			}
			for (let k in Game.PlayerFormationSystem.formatsSingleAttack[i].supports) {
				let v = Game.PlayerFormationSystem.formatsSingleAttack[i].supports[k];
				if (v != 0) {
					formation.supports.push(Helper.LocalGeneralIdTranToGelSimpleInfo(v))
				}
			}
			msg.leftFormation.push(formation);
		}
		for (let i = index; i < 3; i++) {
			let formation = new message.SimpleFormationInfo();
			for (let k in Game.PlayerFormationSystem.threeBattleInfo[i].generals) {
				let v = Game.PlayerFormationSystem.threeBattleInfo[i].generals[k];
				if (v != 0) {
					formation.generals.push(Helper.DetailGeneralTranToGelSimpleInfo(v));
				}
			}
			for (let k in Game.PlayerFormationSystem.threeBattleInfo[i].supports) {
				let v = Game.PlayerFormationSystem.threeBattleInfo[i].supports[k];
				if (v != 0) {
					formation.supports.push(Helper.DetailGeneralTranToGelSimpleInfo(v));
				}
			}
			msg.rightFormation.push(formation);
		}
		return msg;
	}
	public CreatePvpResultInfo() {
		let msg = new message.MoreSimpleFormationInfo();
		for (let i = 0; i < Game.PlayerBattleSystem.multiReplayInfo.length; i++) {
			msg.battle_result.push(Game.PlayerBattleSystem.multiReplayInfo[i].battleResult);
		}
		for (let i = 0; i < 3; i++) {
			let formation = new message.SimpleFormationInfo();
			for (let k in Game.PlayerFormationSystem.formatsSingleAttack[i].generals) {
				let v = Game.PlayerFormationSystem.formatsSingleAttack[i].generals[k];
				if (v != 0) {
					formation.generals.push(Helper.LocalGeneralIdTranToGelSimpleInfo(v));
				} else {
					formation.generals.push(new message.GeneralSimpleInfo());
				}
			}
			for (let k in Game.PlayerFormationSystem.formatsSingleAttack[i].supports) {
				let v = Game.PlayerFormationSystem.formatsSingleAttack[i].supports[k];
				if (v != 0) {
					formation.supports.push(Helper.LocalGeneralIdTranToGelSimpleInfo(v));
				} else {
					formation.supports.push(new message.GeneralSimpleInfo());
				}
			}
			msg.simpleFormation.push(formation);
		}
		return msg;
	}
	public createBattleResult() {
		let winSum = 0;
		for (let k in Game.PlayerBattleSystem.battleSingleInfo) {
			let v = Game.PlayerBattleSystem.battleSingleInfo[k];
			if (v.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
				winSum = winSum + 1;
			}
		}
		if (winSum >= 2) {
			return message.BattleResultState.BATTLE_RESULT_STATE_WIN;
		} else {
			return message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
		}
	}
	public ChallengeThreePkReq() {
		let result = this.createBattleResult();
		this.endResult = result;
		let req = new message.PVPBattleResultRequest();
		// req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		req.body.roleId = Gmgr.Instance.pkRoleId;
		req.body.group_id = Gmgr.Instance.pkRoleGroupId;
		req.body.result = result
		req.body.battle_type = Gmgr.Instance.pkBattleType;

		let index = Gmgr.Instance.starcraftIndex;
		if (Gmgr.Instance.starcraftIndex < 3) {
			Gmgr.Instance.starcraftIndex = Gmgr.Instance.starcraftIndex + 1;
			this.CacheStarcraftInfo(message.BattleResultState.BATTLE_RESULT_STATE_NO, Game.PlayerFormationSystem.threeBattleInfo[2]);
		}
		req.body.battle_date = Helper.createPvpBattleResultInfo(this.CreatePvpResultInfo());
		Game.PlayerBattleSystem.cacheBattleResult = Helper.createMutiBattleResultInfo(Gmgr.Instance.fightType, result, message.EBattleStar.BATTLE_STAR_NONO, 0, 0, 0, this.CreateMultiResultInfo(Gmgr.Instance.starcraftIndex));
		Game.Controller.send(req, this.ChallengeThreePk_Visit, null, this, false);
	}
	public checkGoonOrEnd() {
		let bEnd = false;
		if ((Gmgr.Instance.starcraftIndex == 2
			&& this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN
			&& Game.PlayerBattleSystem.battleSingleInfo[1].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) || (
				Gmgr.Instance.starcraftIndex == 2
				&& this.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL
				&& Game.PlayerBattleSystem.battleSingleInfo[1].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL
			)
		) {
			bEnd = true;
		} else if (Gmgr.Instance.starcraftIndex == 3) {
			bEnd = true;
		} else {
			bEnd = false;
		}
		return bEnd;
	}
	public goOn() {
		let scene = StageSceneManager.Instance.GetCurScene();
		Gmgr.Instance.starcraftIndex = Gmgr.Instance.starcraftIndex + 1;
		Game.PlayerBattleSystem.battleDetailFormation = Game.PlayerFormationSystem.threeBattleInfo[Gmgr.Instance.starcraftIndex - 1];
		this.CacheSkillSpineId();
		scene.nextStarcraft();
	}
	public ChallengeThreePk_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let scene = StageSceneManager.Instance.GetCurScene();
		this.EndBattleNet();
		let response = <message.PVPBattleResultResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		//Game.PlayerBattleSystem.battleReportId =response.body.battle_id;
		scene.endFightUi();
		// let info = {}
		Game.PlayerBattleSystem.singleEnemyInfo.score = 0;
		Game.PlayerBattleSystem.singleEnemyInfo.rank = 0;
		if (this.endResult == 1) {
			loadUI(BattleEnd_WinStarcraftB)
				.then((dialog: BattleEnd_WinStarcraftB) => {
					this.winSubUi = dialog;
					this.winSubUi.show();
					this.winSubUi.Init();
					this.winSubUi.Load();
				});
		} else if (this.endResult == 2) {
			loadUI(BattleEnd_LoseStarcraftB)
				.then((dialog: BattleEnd_LoseStarcraftB) => {
					this.loseSubUi = dialog;
					this.loseSubUi.show();
					this.loseSubUi.Init();
					this.loseSubUi.Load();
				});
		}
	}
	public CacheStarcraftInfo(battleResult, rightFormation) {
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
			_tblGel.push(general);
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
	public CacheSkillSpineId() {
		Gmgr.Instance.relatedAsynDataId = [];
		let suffixs = ["generals", "reserves", "supports"];
		for (let i = 0; i < suffixs.length; i++) {
			let ids = Game.PlayerFormationSystem.formatsSingleAttack[Gmgr.Instance.starcraftIndex - 1][suffixs[i]];
			for (let j = 0; j < ids; j++) {
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
		for(let i = 0;i<generals.length;i++){
			enemys.push(generals[i]);
		}
		for(let i = 0;i<generals.length;i++){
			enemys.push(generals[i]);
		}
		for (let k = 0; k < enemys.length; k++) {
			let v = enemys[k];
			if (v.general_id != 0) {
				for (let k1 = 0; k1 < v.skills.length; k1++) {
					let v1 = v.skills[k1];
					Gmgr.Instance.relatedAsynDataId.push(v1.skillId);
				}
			}
		}
	}
	public quit() {
		//Gmgr:goBattleBefore();
	}
	public OnExit() {
		egret.clearInterval(this.time_id);
		this.time_id = -1;
		egret.clearInterval(this.update);
		this.update = -1;
		if (this.disPlay) {
			clearSpine(this.disPlay);
			this.disPlay = null;
		}
	}
}
}