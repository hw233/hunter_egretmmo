namespace zj {
	/** 
	 * @author 
	 * 
	 * @date 2019-1-28
	 * 
	 * @class 跨服奖励界面
	 */
	const enum enumAwardType {
		/**日常奖励 */
		dailyReward = 1,
		/**赛季奖励 */
		seasonReward = 2,
		/**世界排名奖励 */
		rankReward = 3,
		/**本服排名奖励 */
		selfRankReward = 4,
	}
	export class ArenaWholeAward extends Dialog {
		private btnDayRank: eui.Button;
		private btnYeserday: eui.Button;
		private btnOne: eui.Button;
		private btnOneSelf: eui.Button;
		private btnClose: eui.Button;
		private labelAwardRushTime: eui.Label;
		private Group1: eui.Group;
		private Group2: eui.Group;
		private labelRank: eui.Label;
		private listAward: eui.List;
		private imgGrade: eui.Image;
		private labelJifen: eui.Label;
		private imgMyRankServer: eui.Image;
		private imgMyRankWorld: eui.Image;
		private scroller: eui.Scroller;
		private father: ArenaWhole;
		private type: number = 1;
		private list = [];
		public constructor() {
			super();
			this.skinName = "resource/skins/arena/ArenaWholeAwardSkin.exml";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.father = null;
			}, null);
			this.init();
		}

		private init() {
			let tap = egret.TouchEvent.TOUCH_TAP;
			this.btnClose.addEventListener(tap, this.onBtnClose, this);
			this.btnDayRank.addEventListener(tap, this.onBtnDayRank, this);
			this.btnYeserday.addEventListener(tap, this.onBtnYeserday, this);
			this.btnOne.addEventListener(tap, this.onBtnOne, this);
			this.btnOneSelf.addEventListener(tap, this.onBtnOneSelf, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.awardUp, this);
		}

		public setInfo(father: ArenaWhole) {
			this.father = father;
			this.loadInfo();
		}

		/**点击不同按钮显示不同顶部信息 */
		private loadInfoBtn() {
			let rankShow = this.type == enumAwardType.rankReward || this.type == enumAwardType.selfRankReward;
			let swasonShow = this.type == enumAwardType.dailyReward || this.type == enumAwardType.seasonReward;
			this.Group1.visible = swasonShow;
			this.Group2.visible = rankShow;
		}

		/**加载信息 */
		private loadInfo() {
			this.loadInfoTop();
			this.loadInfoList();
		}

		/**加载顶部信息 */
		private loadInfoTop() {
			if (this.father.myInfo != null) {
				let level = singLecraft.GetLevel(this.father.myInfo.craft_score);
				let info = singLecraft.InstanceScore(level);
				this.imgGrade.source = cachekey(info.icon_num, this);
				this.labelJifen.text = Helper.StringFormat(this.father.myInfo.craft_score);
				if (this.type == enumAwardType.rankReward) {
					this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.order, this.father.myInfo.craft_rank);
					this.imgMyRankWorld.visible = true;
					this.imgMyRankServer.visible = false;
				} else {
					this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.order, this.father.myInfo.craft_rank_self);
					this.imgMyRankWorld.visible = false;
					this.imgMyRankServer.visible = true;
				}
			} else {
				this.imgGrade.source = null;
				this.labelJifen.text = TextsConfig.TextsConfig_Pk.norank.score;
				this.labelRank.text = TextsConfig.TextsConfig_Pk.norank.rangking;
			}
			if (this.type == enumAwardType.dailyReward) {
				let time = Math.floor((CommonConfig.singlecraft_state_duration[2] - 86400 * 6) / 3600);
				this.labelAwardRushTime.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Pk.award_fresh[1], time));
			} else {
				this.labelAwardRushTime.text = TextsConfig.TextsConfig_Pk.award_fresh[2];
			}
		}

		/**加载list信息 */
		private loadInfoList() {

			let score = CommonConfig.singlecraft_init_score;//初始积分
			let rank = 0;
			if (this.father.myInfo.craft_score != null) {
				score = this.father.myInfo.craft_score;
				if (this.type == enumAwardType.rankReward) {
					rank = this.father.myInfo.craft_rank;
				} else if (this.type == enumAwardType.selfRankReward) {
					rank = this.father.myInfo.craft_rank_self;
				}
			}
			this.list = singLecraft.RewardGoods(this.type, this.father.index);
			let forcusIndex = singLecraft.GetLevel(score);
			if (this.type == enumAwardType.rankReward) {
				forcusIndex = 0;
				for (var k in this.list) {
					if (this.list.hasOwnProperty(k)) {
						var v = this.list[k];
						if (rank >= v.min && rank <= v.max) {
							forcusIndex = Number(k);
						}
					}
				}
			} else if (this.type == enumAwardType.selfRankReward) {
				forcusIndex = 0;
				for (var k in this.list) {
					if (this.list.hasOwnProperty(k)) {
						var v = this.list[k];
						if (rank >= v.min && rank <= v.max) {
							forcusIndex = Number(k);
						}
					}
				}
			}

			egret.Tween.get(this.listAward).to({ alpha: 0 }, 100).call(() => {
				this.scroller.stopAnimation();
				this.listAward.scrollV = 0;
				let array = new eui.ArrayCollection();
				if (this.type == enumAwardType.dailyReward || this.type == enumAwardType.seasonReward) {
					for (let j = 0; j < this.list.length; j++) {
						let data = new ArenaWholeAwardItemData();
						data.index = this.list.length - j + 1;
						data.info = this.list[this.list.length - j - 1];
						data.forcus = (forcusIndex == this.list.length - j + 1);
						data.father = this;
						array.addItem(data);
					}
					this.listAward.dataProvider = array;
					this.listAward.itemRenderer = ArenaWholeAwardItem;
				} else {
					for (let j = 0; j < this.list.length; j++) {
						let data = new ArenaWholeAwardItemBData();
						data.index = j;
						data.info = this.list[j];
						data.forcur = (forcusIndex == j);
						data.father = this;
						array.addItem(data);
					}
					this.listAward.dataProvider = array;
					this.listAward.itemRenderer = ArenaWholeAwardItemB;
				}
				this.listAward.scrollV = 0;
			}).to({ alpha: 1 }, 150);

		}

		/**日常奖励 */
		private onBtnDayRank() {
			this.btnColour();
			Set.ButtonBackgroud(this.btnDayRank, "ui_arena_ButtonNumTeamSel_png", );//将按钮颜色变亮 
			this.type = enumAwardType.dailyReward;
			this.loadInfoBtn();
			this.loadInfo();
		}

		/**赛季奖励 */
		private onBtnYeserday() {
			this.btnColour();
			Set.ButtonBackgroud(this.btnYeserday, "ui_arena_ButtonNumTeamSel_png", );//将按钮颜色变亮 
			this.type = enumAwardType.seasonReward;
			this.loadInfoBtn();
			this.loadInfo();
		}

		/**世界排名奖励 */
		private onBtnOne() {
			this.btnColour();
			Set.ButtonBackgroud(this.btnOne, "ui_arena_ButtonWorldAwardSel_png", );//将按钮颜色变亮 
			this.type = enumAwardType.rankReward;
			this.loadInfoBtn();
			this.loadInfo();
		}

		/**本服排名奖励 */
		private onBtnOneSelf() {
			this.btnColour();
			Set.ButtonBackgroud(this.btnOneSelf, "ui_arena_ButtonServerAwardSel_png", );//将按钮颜色变亮 
			this.type = enumAwardType.selfRankReward;
			this.loadInfoBtn();
			this.loadInfo();
		}

		/**将所有按钮颜色变暗 */
		private btnColour() {
			Set.ButtonBackgroud(this.btnDayRank, "ui_arena_ButtonNumTeamNor_png", );
			Set.ButtonBackgroud(this.btnYeserday, "ui_arena_ButtonNumTeamNor_png", );
			Set.ButtonBackgroud(this.btnOne, "ui_arena_ButtonWorldAwardNor_png", );
			Set.ButtonBackgroud(this.btnOneSelf, "ui_arena_ButtonServerAwardNor_png", );
		}

		/**奖励详情 */
		public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
			if (Math.floor(info.goodsId / 1000) == 195) {
			} else {
				let ui = this.getChildByName("UI");
				if (ui) {
					return;
				}
				let commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
				commonDesSkill.name = "UI";
				this.addChild(commonDesSkill);
			}
		}

		/**抬起移除奖励详情界面 */
		private awardUp() {
			let ui = this.getChildByName("UI");
			if (ui) {
				this.removeChild(ui);
			}
		}

		/**关闭弹窗*/
		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}

}