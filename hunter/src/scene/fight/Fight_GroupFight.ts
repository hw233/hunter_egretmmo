namespace zj {
export class Fight_GroupFight extends UI {
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

		for (let i = 0; i < this.tblWords.length; i++) {
			this.tblWords[i].visible = false;
		}
		for (let i = 0; i < this.tblFlags.length; i++) {
			let image = new eui.Image();
			this.tblFlags[i].addChild(image);
			this.tblFlags[i] = image;
		}
		this.update = egret.setInterval(this.Update, this, 0);
		this.FreshFlag();
	}
	public FreshFlag() {
		for (let i = 1; i <= this.tblFlags.length; i++) {
			let info = Game.PlayerBattleSystem.battleSingleInfo[i];
			if (info != null) {
				this.tblFlags[i - 1].visible = true;
				if (info.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
					this.tblFlags[i - 1].source = cachekey(UIConfig.UIConfig_Mail.win2[0], this);
				} else {
					this.tblFlags[i - 1].source = cachekey(UIConfig.UIConfig_Mail.win2[1], this);
				}
			} else {
				this.tblFlags[i - 1].visible = false;
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
			this.CacheStarcraftInfo(this.battleResult);
			this.FreshFlag();
			this.DealAnimation(200304);
		} else if (scene.isWin() == true) {
			this.DealWinData();
			this.CacheChallengeSingleBattle();
			this.CacheStarcraftInfo(this.battleResult);
			this.FreshFlag();
			this.DealAnimation(200303);
		}
	}
	public disPlay;
	public DealAnimation(id) {
		function animationEvent() {
			if (this.checkGoonOrEnd()) {
				this.ChallengeGroupReq();
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
		Game.PlayerBattleSystem.multiReplayNozipInfo[Gmgr.Instance.starcraftIndex - 1] = scene.replayBattleInfo;
		Game.PlayerBattleSystem.multiReplayInfo[Gmgr.Instance.starcraftIndex - 1] = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getTotalDamageValue(), scene.maxCombo, scene.replayBattleInfo);
	}
	public CreateMultiResultInfo() {
		let msg = new message.MultiResultInfo();
		for (let i = 0; i < Game.PlayerBattleSystem.multiReplayInfo.length; i++) {
			msg.results.push(Game.PlayerBattleSystem.multiReplayInfo[i]);
		}

		for (let i = 0; i < Game.PlayerBattleSystem.multiReplayNozipInfo.length; i++) {
			let leftFormation = new message.SimpleFormationInfo();
			for (let j = 0; j < Game.PlayerBattleSystem.multiReplayNozipInfo[i].leftReplayInfo.generals.length; j++) {
				let type = Game.PlayerBattleSystem.multiReplayNozipInfo[i].leftReplayInfo.generals[j].type;
				if (type == 1) {
					leftFormation.generals.push(Helper.DetailGeneralTranToGelSimpleInfo(Game.PlayerBattleSystem.multiReplayNozipInfo[i].leftReplayInfo.generals[j].generalInfo))
				} else if (type == 3) {
					leftFormation.supports.push(Helper.DetailGeneralTranToGelSimpleInfo(Game.PlayerBattleSystem.multiReplayNozipInfo[i].leftReplayInfo.generals[j].generalInfo))
				}
			}
			msg.leftFormation.push(leftFormation);

			let rightFormation = new message.SimpleFormationInfo();
			for (let j = 0; j < Game.PlayerBattleSystem.multiReplayNozipInfo[i].rightReplayInfo.generals.length; j++) {
				let type = Game.PlayerBattleSystem.multiReplayNozipInfo[i].rightReplayInfo.generals[j].type;
				if (type == 1) {
					rightFormation.generals.push(Helper.DetailGeneralTranToGelSimpleInfo(Game.PlayerBattleSystem.multiReplayNozipInfo[i].rightReplayInfo.generals[j].generalInfo));
				} else if (type == 3) {
					rightFormation.supports.push(Helper.DetailGeneralTranToGelSimpleInfo(Game.PlayerBattleSystem.multiReplayNozipInfo[i].rightReplayInfo.generals[j].generalInfo));
				}
			}
			msg.rightFormation.push(rightFormation);
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
			return [message.BattleResultState.BATTLE_RESULT_STATE_WIN, winSum == 3 && 3 || 2];
		} else {
			return [message.BattleResultState.BATTLE_RESULT_STATE_FAIL, 0];
		}
	}
	public checkGoonOrEnd() {
		let bEnd = false;
		if (Gmgr.Instance.starcraftIndex == 3) {
			bEnd = true
		} else if (Gmgr.Instance.starcraftIndex == 2 && Game.PlayerBattleSystem.battleSingleInfo[1].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL &&
			Game.PlayerBattleSystem.battleSingleInfo[2].battleResult == message.BattleResultState.BATTLE_RESULT_STATE_FAIL) {
			bEnd = true;
		} else {
			bEnd = false;
		}
		return bEnd;
	}
	public goOn() {
		let scene = StageSceneManager.Instance.GetCurScene();
		Gmgr.Instance.starcraftIndex = Gmgr.Instance.starcraftIndex + 1;
		this.CacheGroupSkillSpineId();
		scene.nextGroupFight();
	}
	public ChallengeGroupReq() {
		let scene = StageSceneManager.Instance.GetCurScene();
		let [result, star] = this.createBattleResult();
		this.endResult = result;
		let req = new message.GroupBattleResultRequest();
		req.body.Id = PlayerGroupFightSystem.groupFightDetailsInfo.instanceId
		req.body.sequence = Game.PlayerBattleSystem.battleSequence;
		if (Gmgr.Instance.starcraftIndex < 3) {
			Gmgr.Instance.starcraftIndex = Gmgr.Instance.starcraftIndex + 1;
			this.CacheStarcraftInfo(message.BattleResultState.BATTLE_RESULT_STATE_NO);
		}
		req.body.battleInfo = Helper.createMutiBattleResultInfo(Gmgr.Instance.fightType, result, star, 0,
			PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.id != null && PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.id || 0,
			PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.id != null && scene.friendIndex || 0, this.CreateMultiResultInfo());
		Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
		Game.Controller.send(req, this.ChallengeGroup_Visit, null, this, false);
	}
	public rewardCB() {
		loadUI(BattleEnd_WinGroupFight)
			.then((dialog: BattleEnd_WinGroupFight) => {
				this.winSubUi = dialog;
				this.winSubUi.show();
				this.winSubUi.Init();
				this.winSubUi.Load();
			});
	}
	public ChallengeGroup_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
		let scene = StageSceneManager.Instance.GetCurScene();
		this.EndBattleNet();
		let response = <message.GroupBattleResultResponse>resp;
		if (response.header.result != 0) {
			toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
			return;
		}
		Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
		scene.getItemInfo.items = Helper.hideSpecialGoods(response.body.gameInfo.getGoods);
		if (this.endResult == 1) {
			scene.mainmenu.CommonSettleWin(response, this.rewardCB, this);
		} else if (this.endResult == 2) {
			loadUI(BattleEnd_LoseGroupFight)
				.then((dialog: BattleEnd_LoseGroupFight) => {
					this.loseSubUi = dialog;
					this.loseSubUi.show();
					this.loseSubUi.Init();
					this.loseSubUi.Load();
				});
		}
		scene.endFightUi();
	}
	public CacheStarcraftInfo(battleResult) {
		let info = {};
		info["index"] = Gmgr.Instance.starcraftIndex;
		info["battleResult"] = battleResult;
		Game.PlayerBattleSystem.battleSingleInfo[info["index"]] = info;
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
	public CacheGroupSkillSpineId() {
		Gmgr.Instance.relatedAsynDataId = [];
		let detailFormation = PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[Gmgr.Instance.starcraftIndex - 1];
		for (let i = 0; i < detailFormation.generals.length; i++) {
			let generalInfo = detailFormation.generals[i];
			if (generalInfo.general_id != 0) {
				for (let x = 0; x < generalInfo.skills.length; x++) {
					Gmgr.Instance.relatedAsynDataId.push(generalInfo.skills[x].skillId);
				}
			}
		}
		for (let i = 0; i < detailFormation.supports.length; i++) {
			let generalInfo = detailFormation.supports[i];
			if (generalInfo.general_id != 0) {
				for (let x = 0; x < generalInfo.skills.length; x++) {
					Gmgr.Instance.relatedAsynDataId.push(generalInfo.skills[x].skillId);
				}
			}
		}
		let retTbl = TableInstanceGroup.Item(PlayerGroupFightSystem.groupFightDetailsInfo.instanceId);
		let stageId = retTbl.monster_stages[Gmgr.Instance.starcraftIndex - 1];
		let enemys = getEnemyFomation({ stageId });
		for (let k in enemys) {
			let v = enemys[k];
			let info = Game.PlayerMobSystem.Instance(v.id);
			Gmgr.Instance.relatedAsynDataId.push(info.skill_ids);
		}
	}
}
}