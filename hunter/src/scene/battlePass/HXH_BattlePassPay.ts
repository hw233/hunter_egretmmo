namespace zj {
	/**
	 * @class 升级通行证
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-19
	 */
	export class HXH_BattlePassPay extends Scene {
		private groupAni: eui.Group;
		private labelAward: eui.Label;
		private imgFrame: eui.Image;
		private imgMonthCardLow: eui.Image;
		private imgMonthCardHigh: eui.Image;
		private btnClose: eui.Button;
		private btnDetails: eui.Button;
		private btnUpLow: eui.Button;
		private btnUpHigh: eui.Button;

		private isGetMonthCard: Array<boolean> = [false, false]; // [初级月卡, 高级月卡]
		private giftInfo: message.GiftInfo;
		private allProducts: Array<MyProductInfo> = [];

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassPaySkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnDetails.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDetails, this);
			this.btnUpLow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpLow, this);
			this.btnUpHigh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpHigh, this);
			this.init();
		}

		private init() {
			let [monthCardNormal, monthCardSenior] = [100203, 100204];
			this.isGetMonthCard[0] = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(monthCardNormal) != -1;
			this.isGetMonthCard[1] = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(monthCardSenior) != -1;
			this.imgMonthCardLow.visible = this.isGetMonthCard[0];
			this.imgMonthCardHigh.visible = this.isGetMonthCard[1];

			let high_gift_id = 100210;
			let info: message.GiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) { return v.gift_index == high_gift_id; })[0];
			// if (info.buy_times >= 1) this.btnUpHigh.enabled = false;
			// this.btnUpHigh.enabled = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(high_gift_id) == -1;

			let isBuyHigh: boolean = Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(high_gift_id) == -1 ? (info != null && info.buy_times < 1) : false
			this.btnUpHigh.enabled = isBuyHigh;

			this.imgFrame.source = cachekey(TableItemPicFrame.Item(TableNewgiftItem.Item(high_gift_id).goods_id[1]).path, this);

			this.btnUpLow.visible = !(this.isGetMonthCard[0] && this.isGetMonthCard[1]);
			this.btnUpHigh.horizontalCenter = this.btnUpLow.visible ? 136 : 0;

			this.giftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
				return v.gift_index == high_gift_id;
			})[0];

			this.setAward();
			this.loadPayProducts();
		}

		private setAward() {
			let level = Game.PlayerInfoSystem.BaseInfo.permitLevel;
			let rewardList: Array<TablePermitReward> = [];
			let season = Math.floor((Set.TimeFormatBeijing().getMonth()) + 1);
			let tblInfo = TablePermitReward.Table();
			for (const key in tblInfo) {
				if (tblInfo.hasOwnProperty(key)) {
					const element = tblInfo[key];
					if (element.season == season) rewardList.push(element);
				}
			}
			rewardList.sort((a, b) => { return a.level - b.level; });

			let list: Array<TablePermitReward> = [];
			for (const key in rewardList) {
				if (rewardList.hasOwnProperty(key)) {
					const element = rewardList[key];
					if (element.level >= level && list.length < 5) list.push(element);
				}
			}
			list.sort((a, b) => { return a.level - b.level; });

			let nameArr: Array<string> = [];
			for (let i = 0; i < 5; i++) {
				let itemSet = PlayerItemSystem.Set(list[i].pay_reward[0]) as any;
				if (itemSet != null) nameArr.push(itemSet.Info.name);
			}

			// this.labelAward.text = "还可获得" + nameArr.join(",") + "...等超级大奖"
		}

		// private isBuyMonthCard(index: number): boolean {
		// 	let advancedId: number = CommonConfig.month_card_fit[index];
		// 	let advancedInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
		// 		return v.gift_index == advancedId;
		// 	});

		// 	let isBought: boolean = false;
		// 	if (advancedInfo[0] != null) isBought = (advancedInfo[0].buy_times >= 1);

		// 	return isBought;
		// }

		private onBtnDetails() {
			loadUI(Common_RuleDialog).then((dialog: Common_RuleDialog) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.init(RuleConfig.battlepass);
			});
		}

		private onBtnUpLow() {
			let self = this;
			if (!this.isGetMonthCard[0] || !this.isGetMonthCard[1]) {
				let str = "<text>购买</text><color>r=200,g=38,b=0</color><text>双月卡</text><text>方可激活</text><color>r=200,g=38,b=0</color><text>高级通行证</text><text>，是否前往购买？</text>";
				loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(str);
					dialog.setCB(() => {
						self.close();
						loadUI(ActivitySpecialMainScene).then((scene: ActivitySpecialMainScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.jump(3);
						});
					});
				});
			}
		}

		private onBtnUpHigh() {
			if (Game.PlayerInfoSystem.BaseInfo.permitPay != 1) {
				toast_warning("请先激活高级通行证！");
				return;
			}
			if (this.giftInfo.buy_times >= 1) return;
			this.synGiftInfo();
		}

		private synGiftInfo = () => {
			Game.PlayerGiftSystem.getNewGift().then(() => {
				this.checkGiftExit();
			});
		}

		private checkGiftExit = () => {
			Game.PlayerGiftSystem.newGiftExist(this.giftInfo.index).then(() => {
				this.requestButtonBuy();
			});
		}

		private requestButtonBuy() {
			let self = this;
			let giftInfo = PlayerGiftSystem.Instance_item(this.giftInfo.gift_index);
			if (giftInfo.pay_type == 1) {
				if (Util.getAppVersionInfo().channel == "test") {
					Game.PlayerPaySystem.simulateCharge(this.giftInfo.index).then((resp: message.GameInfo) => {
						this.btnUpHigh.enabled = false;
					})
				}
				else {
					let strIndex = this.giftInfo.index;
					if (this.giftInfo['pay_tbl']) {
						platform.pay(PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, PlayerPaySystem.GetCpExtJson(strIndex));
					}
				}
			}
		}

		private loadPayProducts() {
			let self = this;
			Game.PlayerPaySystem.queryAppProducts().then((resp: message.QueryAppProductsRespBody) => {
				self.pay(resp);
			});
		}

		private pay(resp: message.QueryAppProductsRespBody) {
			for (let v of resp.products) {
				for (let vv of resp.channel_products_ext) {
					if (v.id == vv.id) {
						let tmp: MyProductInfo = { id: "", name: "", describe: "", currency: "", amount: 0, amount_usd: 0, coin: 0, type: "", discount: "", cp_product_id: "", };
						for (const k in tmp) {
							tmp[k] = v[k];
						}
						tmp.cp_product_id = vv.cp_product_id;
						this.allProducts.push(tmp);
						break;
					}
				}
			}

			let i = 0;
			while (i < this.allProducts.length) {
				if (PlayerPaySystem.PayItemByID(this.allProducts[i].cp_product_id) == null) {
					this.allProducts.splice(i, 1);
				} else {
					i = i + 1;
				}
			}

			this.allProducts.sort(function (a, b) {
				let itemA = PlayerPaySystem.PayItemByID(a.cp_product_id);
				let itemB = PlayerPaySystem.PayItemByID(b.cp_product_id);
				return itemA.sort_index - itemB.sort_index;
			});

			let giftInfo = PlayerGiftSystem.Instance_item(this.giftInfo.gift_index);
			let payIndex = TablePayIndex.Item(giftInfo.pay_index);
			for (const v of this.allProducts) {
				if (v.coin == payIndex.raw_token) {
					this.giftInfo['pay_tbl'] = Table.DeepCopy(v);
					break;
				}
			}
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}
}