namespace zj {
	export class Fight_Relic extends UI {
		public constructor() {
			super();
			this.skinName = "resource/skins/fight/Fight_RelicSkin.exml";
		}
		public scene;
		public stopChannelTag = false;
		public winSubUi = null;
		public loseSubUi = null;
		public battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
		public battleQuality = message.EQuality.QUALITY_NONE;
		public battleStar = message.EBattleStar.BATTLE_STAR_NONO;
		public update;
		public instanceTbl;
		public curLevel;
		public curDemage;
		public nextDemage;
		public barPer;
		public Right: eui.Group;
		public LabelStage: eui.Label;
		public SpriteLevel: eui.Image;
		public SpriteExpBar: eui.Group;
		public TextExp: eui.BitmapLabel;
		public NodeTime: eui.Group;
		public SpriteBoard: eui.Image;
		public SpriteBlood: eui.Image;
		public SpriteBloodLight: eui.Image;
		public SpriteWeekGray: eui.Image;
		public SpriteWeekLight: eui.Image;


		//public barSizeW;
		//public barSizeH;
		public serverRelicInfo = null;
		public _exp_sizeW;
		public _exp_sizeH;

		public Init() {
			this.LabelStage.visible = false;
			this.SpriteLevel.visible = false;
			this.update = egret.setInterval(this.Update, this, 0);

			this.instanceTbl = TableInstanceRelic.Item(Game.PlayerMissionSystem.fightExt + 1);
			this.curLevel = null;
			this.curDemage = null;
			this.nextDemage = null;

			this.barPer = -1;
			//this.barSizeW = this.SpriteBlood.width;
			//this.barSizeH = this.SpriteBlood.height;
			function f(_k, _v) {
				return _v.id == Game.PlayerMissionSystem.fightExt;
			}
			for (let i = 0; i < Game.PlayerInstanceSystem.RelicInfo.length; i++) {
				if (f(i, Game.PlayerInstanceSystem.RelicInfo[i])) {
					this.serverRelicInfo = [Game.PlayerInstanceSystem.RelicInfo[i], i]
				}
			}
			this.serverRelicInfo = Table.FindR(Game.PlayerInstanceSystem.InstanceInfo.relicInfo, (_k, _v) => {
				return _v.id == Game.PlayerMissionSystem.fightExt;
			})
			if (this.serverRelicInfo == null) {
				this.serverRelicInfo = new message.InstanceRelic();
				this.serverRelicInfo.def = null;
				this.serverRelicInfo.id = Game.PlayerMissionSystem.fightExt;
			}
			this._exp_sizeW = this.SpriteExpBar.width;
			this._exp_sizeH = this.SpriteExpBar.height;
			this.SetInfoHurt();
			this.FreshMainChest(1);

			this.CloseWeek();
		}
		public Update(dt) {
			let scene = StageSceneManager.Instance.GetCurScene();
			this.SetInfoHurt();
			this.SetTimerProgress();
			if (Gmgr.Instance.bInLoading == true) {
				return;
			}
			if (scene.bBalance == false) {
				return;
			}
			if (this.stopChannelTag == false) {
				this.NetData();
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
		public IsEndBattleEnd() {
			if (this.time_id == -1) {
				return true;
			}
			return false;
		}
		public NetData() {
			if (Gmgr.Instance.bDisconnectNet == true) {
				return;
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
		public RelicChallengeReq() {
			let scene = StageSceneManager.Instance.GetCurScene();
			let req = new message.ChallengeRelicResultRequest();
			req.body.sequence = Game.PlayerBattleSystem.battleSequence;
			req.body.mobsId = scene.instanceId;
			req.body.battleInfo = Helper.createBattleResultInfo(Gmgr.Instance.fightType, this.battleResult, this.battleStar, scene.getTiming(), scene.getWeekBossHurt(), scene.maxCombo, scene.replayBattleInfo);
			Game.PlayerBattleSystem.cacheBattleResult = req.body.battleInfo;
			Game.Controller.send(req, this.ChallengeRelicResult_Visit, null, this, false);
		}
		public battleHurt;
		public ChallengeRelicResult_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
			if (this.IsEndBattleEnd()) {
				return;
			}
			let response = <message.ChallengeRelicResultResponse>resp;
			if (response.header.result != 0) {
				toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
				return;
			}
			Game.PlayerBattleSystem.battleReportId = response.body.battle_id;
			loadUI(Relic_BigEnd)
				.then((dialog: Relic_BigEnd) => {
					dialog.show();
					dialog.Init();
					dialog.SetInfo(this.battleStar, this.battleHurt);
				});
			this.EndBattleNet();
		}
		public SetStageEnd() {
			let scene = StageSceneManager.Instance.GetCurScene();
			let chestCB = () => {
				this.FreshMainChest();
			}
			let step = scene.getCurrChapSetp();
			let result = scene.getChapResultTbl()[step];
			function tmp1(thisobj) {
				let scene = StageSceneManager.Instance.GetCurScene();
				if ((step == thisobj.instanceTbl.max_step) || (result != message.BattleResultState.BATTLE_RESULT_STATE_WIN)) {
					thisobj.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
					thisobj.battleQuality = message.EQuality.QUALITY_F;
					thisobj.battleStar = step;
					if (result != message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
						thisobj.battleStar = thisobj.battleStar - 1;
					}
					thisobj.battleHurt = scene.getWeekBossHurt();
					thisobj.RelicChallengeReq();
				} else {
					scene.openNextChap();
				}
			}
			function tmp2(thisobj) {
				loadUI(Relic_SmallEnd)
					.then((dialog: Relic_SmallEnd) => {
						thisobj.loseSubUi = dialog;
						dialog.SetInfo(step);
						dialog.SetCB(chestCB, tmp1, thisobj);
						dialog.show();
					});
			}
			function tmp3(thisobj) {
				if (step > thisobj.serverRelicInfo.star) {
					let goods = new message.GoodsInfo();
					goods.goodsId = thisobj.instanceTbl.first_rewards[step][0];
					goods.count = thisobj.instanceTbl.first_rewards[step][1];
					goods.showType = 1;

					// TipMgr:GetFirstBlood({goods} ,self, tmp2);
					// loadUI(CommonGetDialog)
					// 	.then((dialog: CommonGetDialog) => {
					// 		dialog.init([goods])
					// 		dialog.setCB(() => {
					// 			tmp2(thisobj);
					// 		});
					// 		dialog.show(UI.SHOW_FROM_TOP);
					// 	});
					loadUI(Common_FirstBlood)
						.then((dialog: Common_FirstBlood) => {
							dialog.SetInfoGet([goods]);
							dialog.SetCB(() => {
								tmp2(thisobj);
							});
							dialog.show();
						});
				} else {
					tmp2(thisobj);
				}
			}
			if (result == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
				tmp3(this);
			} else {
				tmp1(this);
			}
		}
		public SetStageBegin() {

		}
		public FreshMainChest(step1?) {
			let scene = StageSceneManager.Instance.GetCurScene();
			let step = step1 || (scene.getCurrChapSetp() + 1);
			this.LabelStage.text = Helper.StringFormat(TextsConfig.TextsConfig_DarkLand.relic.step, step);
			if (scene.mainmenu != null) {
				if (scene.mainmenu.roleMsg != null) {
					scene.mainmenu.roleMsg.SetRelicBox(step);
				}
			}
		}
		public SetInfoHurt() {
			let scene = StageSceneManager.Instance.GetCurScene();
			let level1 = 1;
			function getLevelByHurt(damage, thisobj) {
				for (let k in thisobj.instanceTbl.damage_zone) {
					let v = thisobj.instanceTbl.damage_zone[k];
					if (damage >= v) {
						level1 = parseInt(k);
					}
				}
				return level1;
			}
			let damage = scene.getWeekBossHurt();
			let level = getLevelByHurt(damage, this);
			let maxHurt = this.instanceTbl.damage_zone[this.instanceTbl.damage_zone.length - 1];
			let per = (damage / maxHurt) < 1 && (damage / maxHurt) || 1;
			let rect_exp = getPercentSize({ width: this._exp_sizeW, height: this._exp_sizeH }, per);

			if (this.curLevel != level) {
				this.curLevel = level;
				this.SpriteLevel.source = cachekey(UIConfig.UIConfig_DarkLand.relicHurtLevel[this.curLevel], this);
			}
			if (this.curDemage != damage) {
				this.curDemage = damage;
				this.SpriteExpBar.width = rect_exp.width;
				this.SpriteExpBar.height = rect_exp.height;
				if (this.curDemage >= 100000) {
					this.TextExp.text = (this.curDemage / 10000).toFixed(0) + "万"
				} else {
					this.TextExp.text = (this.curDemage / 10000).toFixed(0);
				}
			}
		}
		public quit() {
			// Gmgr.Instance.goBattleBefore();
		}
		public OpenWeek() {
			this.SpriteBlood.visible = false;
			this.SpriteBloodLight.visible = true;
			this.SpriteWeekGray.visible = false;
			this.SpriteWeekLight.visible = true;
			this.SpriteBlood.width = getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).width;
			this.SpriteBlood.height = getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).height;
			this.SpriteBloodLight.width = getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).width;
			this.SpriteBloodLight.height = getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).height;
		}
		public CloseWeek() {
			this.SpriteBlood.visible = true;
			this.SpriteBloodLight.visible = false;
			this.SpriteWeekGray.visible = true;
			this.SpriteWeekLight.visible = false;
			this.SpriteBlood.width = getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).width;
			this.SpriteBlood.height = getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).height;
			this.SpriteBloodLight.width = getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).width;
			this.SpriteBloodLight.height = getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, 1).height;
		}
		public SetTimerProgress() {
			let scene = StageSceneManager.Instance.GetCurScene();
			if (scene.bossInstance != null) {
				let per = scene.bossInstance.getWeekProgressPer();
				if (Math.floor(this.barPer * 100) != Math.floor(per * 100)) {
					this.barPer = per;
					let size_bar = getPercentSize({ width: this.SpriteBlood.width, height: this.SpriteBlood.height }, this.barPer);
					if (scene.isWeekSteping) {
						this.SpriteBloodLight.width = getPercentSize({ width: size_bar.width, height: size_bar.height }, 1).width;
						this.SpriteBloodLight.height = getPercentSize({ width: size_bar.width, height: size_bar.height }, 1).height;
					} else {
						this.SpriteBlood.width = getPercentSize({ width: size_bar.width, height: size_bar.height }, 1).width;
						this.SpriteBlood.height = getPercentSize({ width: size_bar.width, height: size_bar.height }, 1).height;
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