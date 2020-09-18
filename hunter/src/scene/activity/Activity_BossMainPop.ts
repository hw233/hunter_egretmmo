namespace zj {
	//Activity_BossMainPop 年兽来袭
	//yuqingchao
	//2019.07.16
	export class Activity_BossMainPop extends Scene {

		private btnClose: eui.Button;
		private btnEnter: eui.Button;			//进入战场
		private btnRule: eui.Button;			//说明

		private lbTime: eui.Label;				//开启时间
		private lbLevel: eui.Label;				//BOSS等级
		private lbBloodPar: eui.Label;			//BOSS血量
		private lbRank: eui.Label;				//自身排名
		private lbName: eui.Label;				//猎人名字
		private lbHit: eui.Label;				//伤害

		private imgSkill: eui.Image;			//已逃走

		private groupAward: eui.Group;			//排名挡位奖励Group
		private scrollerReward: eui.Scroller;
		private lstViewReward: eui.List;
		private arrViewReward: eui.ArrayCollection;

		private groupHit: eui.Group;				//击杀排名Group
		private lstHit: eui.List;
		private arrHit: eui.ArrayCollection;

		private rank = [];
		private myRank: any = null;

		private reward = [];
		private timer;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_BossMainPopSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEnter, this);
			this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRule, this);
			this.groupAward.visible = false;
			this.groupHit.visible = false;
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.clearInterval(this.timer);
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null)
		}
		public init() {
			let any = Game.PlayerActivitySystem.Activities;
			this.reward = Game.PlayerBossSystem.GetBossRankGoodsTbl();
			this.freshList();
			this.setInfo();
			this.upDate();
			this.timer = egret.setInterval(this.upDate, this, 990);
		}

		private setInfo() {
			let tblWorldBoss = TableClientWorldBoss.Item(CommonConfig.darkland_boss_monster_id[0]);
			let infoLevel = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.bossLevel, tblWorldBoss.init_level);
			this.lbLevel.text = infoLevel.toString();
		}

		//排名挡位奖励
		private setRewardList() {
			this.arrViewReward = new eui.ArrayCollection();
			for (let i = 0; i < this.reward.length; i++) {
				this.arrViewReward.addItem({
					i: i,
					info: this.reward[i],
					lth: this.reward.length,
					father: this,
				})
			}
			this.lstViewReward.dataProvider = this.arrViewReward;
			this.lstViewReward.itemRenderer = Activity_BossMainPopItem;
		}

		//击杀奖励
		private setRankList() {
			let display_num = 20;
			this.rank = Game.PlayerBossSystem.ActivityBoss.rankItems;
			this.myRank = Game.PlayerBossSystem.ActivityBoss.myRank;
			//我的排名
			if (this.myRank.score > 0) {
				this.lbRank.text = this.myRank.rank;
			} else {
				this.lbRank.text = TextsConfig.TextsConfig_Rank.noRank;
			}
			this.lbName.text = this.myRank.roleName;
			this.lbHit.text = this.myRank.score;

			//排名列表
			display_num = this.rank.length >= display_num ? display_num : this.rank.length;
			this.arrHit = new eui.ArrayCollection();
			for (let i = 0; i < display_num; i++) {
				this.arrHit.addItem({
					i: i,
					info: this.rank[i],
				});
			}
			this.lstHit.dataProvider = this.arrHit;
			this.lstHit.itemRenderer = Activity_BossMainPopHitItem;
		}

		//更新
		private upDate() {
			this.UpdateBase();
			this.UpdateUI();
			this.freshList();
			this.UpdateBossBlood();
		}

		private UpdateBase() {
			let [bOpen, lastTime] = Game.PlayerBossSystem.ActivityBossOpenTime();
			if (bOpen) {
				this.btnEnter.enabled = true;
			} else {
				this.btnEnter.enabled = false;
			}
		}

		private UpdateUI() {
			let [bOpen, lastTime] = Game.PlayerBossSystem.ActivityBossOpenTime()
			let [IsStart, IsOver, startTime, overTime] = Game.PlayerBossSystem.ActivityBossIsFive()
			let str_time = Set.timeLeaveSec(Number(lastTime));
			if (IsOver) {
				str_time = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToEnd3, Set.timeLeaveSec(Number(overTime)));
				this.lbTime.textFlow = Util.RichText(str_time);
			} else if (!bOpen) {
				str_time = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToOpen3, str_time);
				this.lbTime.textFlow = Util.RichText(str_time);
			} else {
				str_time = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToEnd2, str_time);
				this.lbTime.textFlow = Util.RichText(str_time);
			}

			let progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS];
		}

		private UpdateBossBlood() {
			this.lbBloodPar.text = TextsConfig.TextsConfig_WonderlandBoss.lasBossBlood;
			let [IsStart, IsOver, startTime, overTime] = Game.PlayerBossSystem.ActivityBossIsFive();
			this.imgSkill.visible = Boolean(IsOver);
		}

		private freshList() {
			//排名挡位奖励开启
			let openAward = () => {
				if (this.groupAward.visible == false) {
					this.groupAward.visible = true;
					this.setRewardList();
					// this.isRewardTip = true;
				}
				if (this.groupHit.visible) {
					this.groupHit.visible = false;
				}
			}

			//击杀排名
			let openHit = () => {
				if (this.groupHit.visible == false) {
					this.groupHit.visible = true;
					this.UpdateRank()
					// this.isRewardTip = false
				}
				if (this.groupAward.visible) {
					this.groupAward.visible = false;
				}
			}

			let [bOpen, lastTime] = Game.PlayerBossSystem.ActivityBossOpenTime();
			let [IsStart, IsOver, startTime, overTime] = Game.PlayerBossSystem.ActivityBossIsFive();
			if (!bOpen && IsOver) {
				openHit();
			} else {
				openAward();
			}
		}

		private UpdateRank() {
			Game.PlayerBossSystem.darklandBossScoreRank().then(() => {
				this.setRankList();
			}).catch(reason => {
				toast(reason);
			});
		}

		/**进入战场 */
		private onBtnEnter() {
			Game.PlayerBossSystem.DarklandBossEnter().then(() => {
				MapSceneLoading.getInstance().loadFightRes(19, this.wonderlandBoss, this);
			}).catch(reason => { });
		}
		public wonderlandBoss() {
			StageSceneManager.Instance.ChangeScene(StageSceneActivityBoss);
		}

		/**说明 */
		private onBtnRule() {
			loadUI(Common_RuleDialog)
				.then((dialog: Common_RuleDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.init(RuleConfig.ActivityBoss);
				});
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}

		//阵型
		private InitWonderlandList() {
			let generalIdList = [];
			let hasServerFormat = Table.FindF(Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals,
				function (k, v) {
					if (v != 0) {
						return true;
					}
					return false;
				});
			let generalList, isChange;
			if (hasServerFormat) {
				for (let k in Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals) {
					let v = Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals[k];
					if (v != 0) {
						generalIdList.push(v);
					}
				};
				for (let k in Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].reserves) {
					let v = Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].reserves[k];
					generalIdList.push(v);
				}
				[generalList, isChange] = Game.PlayerHunterSystem.getWonderlandGeneral(Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND]);

			} else {
				[generalList, isChange] = Game.PlayerHunterSystem.getWonderlandGeneral(null);
			}

			Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals = [];
			Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].reserves = [];

			for (let k in generalList) {
				let v = generalList[k];
				if (Number(k) < 4) {
					Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].generals.push(v.id);
				} else {
					Game.PlayerFormationSystem.curCharmInfos[message.EFormationType.FORMATION_TYPE_WONDERLAND].reserves.push(v.id);
				}
			}
		}

		/**
		 * 移除点击详情
		 */
		private removeShow() {
			let show = this.getChildByName("details");
			if (show) {
				this.removeChild(show);
			}
		}

		/**
		 * 添加点击详情
		 */
		private showGoodsProperty(ev: egret.Event) {
			// if (Game.UIManager.dialogCount() >= 1) return;
			let ui = this.getChildByName("details");
			if (ui) {
				return;
			}
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "details";
			this.addChild(show);
		}
	}
}