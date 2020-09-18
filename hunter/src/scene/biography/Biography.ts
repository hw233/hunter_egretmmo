namespace zj {
	/**
	 * @class 猎人传记
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-10-24
	 */
	let UI_STATE = {
		button_left1: 1,
		button_left2: 2,
		button_left3: 3,
		button_left4: 4
	}

	export class Biography extends Scene {
		private imgBanner: eui.Image;
		private imgHeroType: eui.Image;
		private imgGetAllAward: eui.Image;
		private labelMissionInfo: eui.Label;
		private labelMissionState: eui.Label;
		private labelHeroName: eui.Label;
		private labelUserExperience: eui.Label;
		private labelRoleDefinition: eui.Label;
		private labelTeamRecommended: eui.Label;
		private labelMissionNum: eui.Label;
		private btnDetails: eui.Button;
		private btnGetWay: eui.Button;
		private btnClose: eui.Button;
		private btnGetAward: eui.Button;
		private btnLeft1: eui.Button;
		private btnLeft2: eui.Button;
		private btnLeft3: eui.Button;
		private btnLeft4: eui.Button;
		private scrollerHero: eui.Scroller;
		private listHero: eui.List;
		private scrollerAward: eui.Scroller;
		private listAward: eui.List;
		private imgRedTip1: eui.Image;
		private imgRedTip2: eui.Image;
		private imgRedTip3: eui.Image;
		private imgRedTip4: eui.Image;
		private groupbtnAddGold: eui.Group;
		private labelGold: eui.Label;
		private btnAddGold: eui.Button;
		private groupbtnAddGemstone: eui.Group;
		private labelGemstone: eui.Label;
		private jewel: eui.Image;
		private btnAddGemstone: eui.Button;
		private groupbtnAddStrength: eui.Group;
		private labelStrength: eui.Label;
		private energy: eui.Image;
		private btnAddStrength: eui.Button;

		private listHeroData: eui.ArrayCollection = new eui.ArrayCollection();
		private listAwardData: eui.ArrayCollection = new eui.ArrayCollection();
		private heroData: Array<TableSpgeneralInformation>;
		private rewardData: Array<TableSpgeneralReward>;
		private itemIndex: number = 0;
		private uiState: number;
		private missionIndex: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/biography/BiographySkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnDetails.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDetails, this);
			this.btnGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetAward, this);
			this.btnGetWay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetWay, this);
			this.listHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeHeroList, this);
			for (let i = 1; i <= 4; i++) {
				(<eui.Button>this[`btnLeft${i}`]).addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onBtnLeft${i}`], this);
			}

			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);

			Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.update, this);
			Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.update, this);
			Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.update, this);

			this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
			this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
			this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);

			this.init(1);
			this.setButtonState();
		}

		public onEntryTopScene() {
			this.setHeroList();
			this.setMissionInfo();
			this.setRedTip();
		}

		private init(uiState: number) {
			this.itemIndex = 0;
			this.uiState = uiState;
			this.heroData = [];
			this.rewardData = [];
			for (const key in TableSpgeneralInformation.Table()) {
				if (TableSpgeneralInformation.Table().hasOwnProperty(key)) {
					const element = TableSpgeneralInformation.Table()[key];
					if (element.task_type == uiState) {
						this.heroData.push(element);
					}
				}
			}

			for (const key in TableSpgeneralReward.Table()) {
				if (TableSpgeneralReward.Table().hasOwnProperty(key)) {
					const element = TableSpgeneralReward.Table()[key];
					if (element.index.toString().substr(0, 1) == uiState.toString()) {
						this.rewardData.push(element);
					}
				}
			}

			this.setInfoList();
			this.setMissionInfo();
			this.setHeroDescription();
			this.setRedTip();
			this.update();
		}

		private update() {
			if (Game.PlayerInfoSystem.Coin > 100000) {
				if (((Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
					this.labelGold.text = ((Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
				} else {
					this.labelGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
				}
			} else {
				this.labelGold.text = Game.PlayerInfoSystem.Coin.toString();
			}
			if (Game.PlayerInfoSystem.Token > 100000) {
				if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
					this.labelGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
				} else {
					this.labelGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
				}
			} else {
				this.labelGemstone.text = Game.PlayerInfoSystem.Token.toString();
			}
			let str = "";
			if (Game.PlayerInfoSystem.Power > 100000) {
				if (((Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
					str += ((Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
				} else {
					str += (Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
				}
			} else {
				str += Game.PlayerInfoSystem.Power.toString();
			}
			let str_energy = Helper.StringFormat("%d/%d", str, (TableLevel.Item(Game.PlayerInfoSystem.Level).role_power + PlayerVIPSystem.LowLevel().power_add));
			this.labelStrength.text = str_energy;
		}

		private setInfoList() {
			this.setHeroList();
			this.setAwardList();
		}

		private setHeroList() {
			this.listHeroData.removeAll();
			for (let i = 0; i < this.heroData.length; i++) {
				let itemData = new BiographyHeroItemData();
				itemData.info = this.heroData[i];
				itemData.index = i;
				this.listHeroData.addItem(itemData);
			}
			this.listHero.itemRenderer = BiographyHeroItem;
			this.listHero.dataProvider = this.listHeroData;
			this.listHero.selectedIndex = this.itemIndex;
		}

		private setAwardList() {
			let awardIds = null;
			let awardCounts = null;

			for (let i = 0; i < this.rewardData.length; i++) {
				if (Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(this.rewardData[i].index) == -1) {// 没领取过奖励
					awardIds = this.rewardData[i].reward_goods;
					awardCounts = this.rewardData[i].reward_count;
					break;
				}
			}

			if (awardIds == null) { // 奖励都领取完 显示最后一次的奖励
				awardIds = this.rewardData[this.rewardData.length - 1].reward_goods;
				awardCounts = this.rewardData[this.rewardData.length - 1].reward_count;
			}

			let goodsInfo: Array<message.GoodsInfo> = [];
			for (let i = 0; i < awardIds.length; i++) {
				let info = new message.GoodsInfo();
				info.goodsId = awardIds[i];
				info.count = awardCounts[i];
				goodsInfo.push(info);
			}

			let gap = 6;
			this.scrollerAward.width = goodsInfo.length * 85 + gap * (goodsInfo.length - 1);

			this.listAwardData.removeAll();
			for (let i = 0; i < goodsInfo.length; i++) {
				let itemData = new BiographyAwardItemData();
				itemData.goodsInfo = goodsInfo[i];
				this.listAwardData.addItem(itemData);
			}
			this.listAward.itemRenderer = BiographyAwardItem;
			this.listAward.dataProvider = this.listAwardData;
		}

		private onChangeHeroList(e: eui.ItemTapEvent) {
			if (e.itemIndex == this.itemIndex) return;
			let item = this.listHero.getElementAt(e.itemIndex) as BiographyHeroItem;
			let data = this.listHeroData.getItemAt(e.itemIndex) as BiographyHeroItemData;

			this.listHeroData.itemUpdated(this.listHeroData.source[e.itemIndex]);
			this.listHeroData.itemUpdated(this.listHeroData.source[this.itemIndex]);
			this.itemIndex = e.itemIndex;

			this.setHeroDescription();
		}

		private setMissionInfo() {
			let heroCount: number = 0;
			let own_count: number = 0;
			let missionNum: number = 0;
			let bAwardAll: boolean = false;

			for (let i = 0; i < this.rewardData.length; i++) {
				if (Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(this.rewardData[i].index) == -1) {// 没领取过奖励
					own_count = this.rewardData[i].own_count;
					missionNum = i + 1;
					this.missionIndex = this.rewardData[i].index;
					break;
				}
			}

			if (own_count == 0) { // 收集奖励领取完 显示最后一个数量
				own_count = this.rewardData[this.rewardData.length - 1].own_count;
			}

			for (let i = 0; i < this.heroData.length; i++) {
				if (Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(this.heroData[i].general_id) != -1) {
					heroCount++;
				}
			}

			bAwardAll = Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(this.rewardData[this.rewardData.length - 1].index) != -1; // 三个任务是否全部完成并领取奖励
			if (bAwardAll) {
				this.labelMissionNum.text = this.rewardData.length + "/" + this.rewardData.length
			}
			else {
				this.labelMissionNum.text = missionNum + "/" + this.rewardData.length
			}
			this.labelMissionInfo.text = "收集其中" + own_count + "种猎人";
			let num = heroCount >= own_count ? own_count : heroCount;
			this.labelMissionState.textColor = heroCount >= own_count ? 0x00FF00 : 0xFF0000;
			this.labelMissionState.text = "(" + num + "/" + own_count + ")";
			this.btnGetAward.enabled = heroCount >= own_count;
			this.btnGetAward.visible = !bAwardAll;
			this.imgGetAllAward.visible = bAwardAll;
		}

		private setRedTip() {
			let [heroData1, heroData2, heroData3, heroData4] = [[], [], [], []];
			let [rewardData1, rewardData2, rewardData3, rewardData4] = [[], [], [], []];

			for (const key in TableSpgeneralInformation.Table()) {
				if (TableSpgeneralInformation.Table().hasOwnProperty(key)) {
					const element = TableSpgeneralInformation.Table()[key];
					if (element.task_type == UI_STATE.button_left1) heroData1.push(element);
					if (element.task_type == UI_STATE.button_left2) heroData2.push(element);
					if (element.task_type == UI_STATE.button_left3) heroData3.push(element);
					if (element.task_type == UI_STATE.button_left4) heroData4.push(element);
				}
			}

			for (const key in TableSpgeneralReward.Table()) {
				if (TableSpgeneralReward.Table().hasOwnProperty(key)) {
					const element = TableSpgeneralReward.Table()[key];
					if (element.index.toString().substr(0, 1) == UI_STATE.button_left1.toString()) rewardData1.push(element);
					if (element.index.toString().substr(0, 1) == UI_STATE.button_left2.toString()) rewardData2.push(element);
					if (element.index.toString().substr(0, 1) == UI_STATE.button_left3.toString()) rewardData3.push(element);
					if (element.index.toString().substr(0, 1) == UI_STATE.button_left4.toString()) rewardData4.push(element);
				}
			}

			let [heroCount1, heroCount2, heroCount3, heroCount4] = [0, 0, 0, 0];
			let [own_count1, own_count2, own_count3, own_count4] = [0, 0, 0, 0];

			let getRedTipVis = (awardData, ownCount, heroData, heroCount) => {
				for (let i = 0; i < awardData.length; i++) {
					if (Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(awardData[i].index) == -1) {// 没领取过奖励
						ownCount = awardData[i].own_count;
						break;
					}
				}

				let awardlen = 0;
				for (let i = 0; i < awardData.length; i++) {
					if (Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(awardData[i].index) != -1) {// 没领取过奖励
						awardlen++;
					}
				}

				for (let i = 0; i < heroData.length; i++) {
					if (Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[i].general_id) != -1) {
						heroCount++;
					}
				}

				return heroCount >= ownCount && awardlen != awardData.length;
			}

			this.imgRedTip1.visible = getRedTipVis(rewardData1, own_count1, heroData1, heroCount1);
			this.imgRedTip2.visible = getRedTipVis(rewardData2, own_count2, heroData2, heroCount2);
			this.imgRedTip3.visible = getRedTipVis(rewardData3, own_count3, heroData3, heroCount3);
			this.imgRedTip4.visible = getRedTipVis(rewardData4, own_count4, heroData4, heroCount4);
		}

		private setHeroDescription() {
			let hunterBaseInfo = (this.heroData[this.listHero.selectedIndex]);
			if (hunterBaseInfo == null) return;
			this.imgHeroType.source = cachekey(hunterBaseInfo.general_type_path, this);
			this.labelHeroName.text = hunterBaseInfo.general_name;
			this.labelUserExperience.text = hunterBaseInfo.general_technique;
			this.labelRoleDefinition.text = hunterBaseInfo.general_des;
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}

		private onBtnDetails() {
			loadUI(Biographyinfo).then((dialog: Biographyinfo) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.init(this.heroData[this.listHero.selectedIndex]);
			});
		}

		private onBtnGetWay() {
			loadUI(Common_OutPutDialog).then((dialog: Common_OutPutDialog) => {
				let any = this.heroData[this.listHero.selectedIndex].general_id;
				dialog.setInfo(this.heroData[this.listHero.selectedIndex].general_id, this);
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private setButtonState() {
			for (let i = 1; i <= Helper.getObjLen(UI_STATE); i++) {
				if (i == UI_STATE.button_left1) {
					this[`btnLeft${i}`].enabled = false;
					this.imgBanner.source = cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left1 + "_png", this);
					this.labelTeamRecommended.text = "秒杀清场，打断控制，副本畅通无阻！";
				}
				else {
					this[`btnLeft${i}`].enabled = true;
				}
			}
		}

		private onBtnGetAward() {
			let self = this;
			Game.PlayerActivitySystem.sPgeneralReward(this.missionIndex).then((resp: message.GameInfo) => {
				loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.init(resp.getGoods);
					dialog.setCB(() => {
						self.setInfoList();
						self.setMissionInfo();
						self.setRedTip();
						Tips.SetTipsOfId(Tips.TAG.Biography);
					});
				});
			});
		}

		private onBtnLeft1() {
			this.scrollerHero.stopAnimation();
			for (let i = 1; i <= Helper.getObjLen(UI_STATE); i++) {
				if (i == UI_STATE.button_left1) {
					this[`btnLeft${i}`].enabled = false;
					continue;
				}
				this[`btnLeft${i}`].enabled = true;
			}
			this.init(UI_STATE.button_left1);
			this.imgBanner.source = cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left1 + "_png", this);
			this.labelTeamRecommended.text = "秒杀清场，打断控制，副本畅通无阻！";
		}

		private onBtnLeft2() {
			this.scrollerHero.stopAnimation();
			for (let i = 1; i <= Helper.getObjLen(UI_STATE); i++) {
				if (i == UI_STATE.button_left2) {
					this[`btnLeft${i}`].enabled = false;
					continue;
				}
				this[`btnLeft${i}`].enabled = true;
			}
			this.init(UI_STATE.button_left2);
			this.imgBanner.source = cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left2 + "_png", this);
			this.labelTeamRecommended.text = "浮空沉默，致命毒伤，流星街boss克星！";
		}

		private onBtnLeft3() {
			this.scrollerHero.stopAnimation();
			for (let i = 1; i <= Helper.getObjLen(UI_STATE); i++) {
				if (i == UI_STATE.button_left3) {
					this[`btnLeft${i}`].enabled = false;
					continue;
				}
				this[`btnLeft${i}`].enabled = true;
			}
			this.init(UI_STATE.button_left3);
			this.imgBanner.source = cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left3 + "_png", this);
			this.labelTeamRecommended.text = "加速控制，高额输出，天空竞技场所向披靡！";
		}

		private onBtnLeft4() {
			this.scrollerHero.stopAnimation();
			for (let i = 1; i <= Helper.getObjLen(UI_STATE); i++) {
				if (i == UI_STATE.button_left4) {
					this[`btnLeft${i}`].enabled = false;
					continue;
				}
				this[`btnLeft${i}`].enabled = true;
			}
			this.init(UI_STATE.button_left4);
			this.imgBanner.source = cachekey("ui_acitivity_biography_banner" + UI_STATE.button_left4 + "_png", this);
			this.labelTeamRecommended.text = "多段加速，免疫恢复，配合爆发输出，助你成为最强王者！";
		}

		//添加金币
		private onBtnAddGold() {
			loadUI(HelpGoldDialog).then((dialog: HelpGoldDialog) => {
				dialog.SetInfoList(true);
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private onBtnAddGemstone() {
			// toast_success("加钻石功能未开启");
			loadUI(PayMallScene).then((scene: PayMallScene) => {
				scene.show(UI.SHOW_FROM_TOP);
				scene.init(true);
			});
		}

		private onBtnAddStrength() {
			//增加体力
			loadUI(HXH_HunterUserStrength).then((dialog: HXH_HunterUserStrength) => {
				dialog.SetInfo();
				dialog.show(UI.SHOW_FROM_TOP);
			});
		}

		private removeShow() {
			let show = this.getChildByName("details");
			if (show) this.removeChild(show);
		}

		private showGoodsProperty(ev: egret.Event) {
			if (Game.UIManager.dialogCount() > 0) return;
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "details";
			this.addChild(show);
		}
	}
}