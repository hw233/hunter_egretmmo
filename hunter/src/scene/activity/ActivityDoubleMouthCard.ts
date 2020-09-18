namespace zj {
	//购双月卡送A级猎人
	//yuqingchao
	//2019.03.23
	export class ActivityDoubleMouthCard extends UI {
		private info;
		private lbOne: eui.Label;				//初级月卡价格
		private lbMore: eui.Label;				//高级月卡价格
		private lbTime: eui.Label;				//活动时间
		private lbInfo: eui.Label;				//活动内容
		private btnMouthCardA: eui.Button;		//初级月卡按钮
		private btnMouthCardB: eui.Button;		//高级月卡按钮
		private btnGetHunter: eui.Button;		//领取按钮
		public imgGetHunterTip: eui.Image;		//可领取图片
		private juniorId: number = CommonConfig.month_card_fit[0];
		private advancedId: number = CommonConfig.month_card_fit[1];
		private juniorTbl;
		private advancedTbl;
		private juniorInfo;
		private advancedInfo;
		private saveBtnState: number = 0;
		private allProducts: Array<MyProductInfo> = [];
		private father: ActivityMain;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityDoubleMouthCardSkin.exml";
			cachekeys(<string[]>UIResource["ActivityDoubleMouthCard"], null);
			this.btnGetHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetHunter, this);
			this.btnGetHunter.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGetHunterBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnGetHunterEnd, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.btnMouthCardA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMouthCardA, this);
			this.btnMouthCardB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMouthCardB, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.father = null;
			}, null);
			this.init();
		}
		private init() {
			this.juniorInfo = null;
			this.advancedInfo = null;
			this.juniorTbl = PlayerGiftSystem.Instance_item(this.juniorId);
			this.advancedTbl = PlayerGiftSystem.Instance_item(this.advancedId);
			this.saveBtnState = 0;
		}
		public setInfo(info, father?: ActivityMain) {
			this.father = father;
			this.info = info;
			this.setInfoTime();
			this.setInfoMonthInfo();
			this.loadPayProducts();
		}
		//时间戳转换为字符串格式
		private time(timestamp: number) {
			let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let Y = date.getFullYear();
			let M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
			let D = date.getDate();
			let h = date.getHours();
			let m = date.getMinutes();
			let s = date.getSeconds();
			return { Y: Y, M: M, D: D, h: h, m: m, s: s };		//年月日时分秒
		}
		private setInfoTime() {
			let strOpen = this.time(this.info.openTime);
			let timeOpen;
			if (strOpen.m < 10) {
				timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + "0" + strOpen.m;
			} else {
				timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + strOpen.m;
			}
			let strColse = this.time(this.info.closeTime);
			let timeColse;
			if (strColse.m < 10) {
				timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + "0" + strColse.m;
			} else {
				timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + strColse.m;
			}
			this.lbTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
			this.lbInfo.text = this.info.des;
		}
		private setInfoMonthInfo() {
			let any = Game.PlayerGiftSystem.giftInfos;
			let juniorInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
				return v.gift_index == CommonConfig.month_card_fit[0];
			})[0];
			let advancedInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
				return v.gift_index == CommonConfig.month_card_fit[1];
			})[0];
			this.juniorInfo = juniorInfo;
			this.advancedInfo = advancedInfo;
			if (juniorInfo == null || advancedInfo == null) {
				this.saveBtnState = 0;
			}
			let bJunBought: boolean = true;
			let bAdvBought: boolean = true;
			if (juniorInfo != null && this.juniorTbl != null) {
				bJunBought = this.juniorTbl.buy_times > this.juniorInfo.buy_times;
			}
			if (advancedInfo != null && this.advancedTbl != null) {
				bAdvBought = this.advancedTbl.buy_times > this.advancedInfo.buy_times;
			}
			if (!bJunBought) {
				this.btnMouthCardA.enabled = bJunBought;
			}
			if (!bAdvBought) {
				this.btnMouthCardB.enabled = bAdvBought;
			}
			let rewardHasGet = Table.FindF(this.info.rewardIndex, (k, v) => {
				return v == 1;
			});
			if (rewardHasGet) {
				this.saveBtnState = 2;
				this.imgGetHunterTip.visible = true;
				this.imgGetHunterTip.source = cachekey(UIConfig.UIConfig_Activity.spriteGet[2], this);
				(this.btnGetHunter.getChildAt(0) as eui.Image).source = cachekey(UIConfig.UIConfig_Activity.doubleMonth[3][0], this);
			} else {
				if (!bJunBought && !bAdvBought) {
					this.saveBtnState = 1;
					this.imgGetHunterTip.visible = false;
					(this.btnGetHunter.getChildAt(0) as eui.Image).source = cachekey(UIConfig.UIConfig_Activity.doubleMonth[2][0], this);
					this.GetAwardAni();
				} else {
					this.saveBtnState = 0;
					this.imgGetHunterTip.visible = false;
					(this.btnGetHunter.getChildAt(0) as eui.Image).source = cachekey(UIConfig.UIConfig_Activity.doubleMonth[1][0], this);
				}
			}
			// if (this.saveBtnState == 0) {
			// 	this.imgGetHunterTip.visible = false;
			// 	(this.btnGetHunter.getChildAt(0) as eui.Image).source = cachekey(UIConfig.UIConfig_Activity.doubleMonth[1][0], this);
			// }
			// else if (this.saveBtnState == 1) {
			// 	this.imgGetHunterTip.visible = false;
			// 	(this.btnGetHunter.getChildAt(0) as eui.Image).source = cachekey(UIConfig.UIConfig_Activity.doubleMonth[2][0], this);
			// }
			// else if (this.saveBtnState == 2) {
			// 	this.imgGetHunterTip.visible = true;
			// 	this.imgGetHunterTip.source = cachekey(UIConfig.UIConfig_Activity.spriteGet[2], this);
			// 	(this.btnGetHunter.getChildAt(0) as eui.Image).source = cachekey(UIConfig.UIConfig_Activity.doubleMonth[3][0], this);
			// }
		}
		private loadPayProducts() {
			Game.PlayerPaySystem.queryAppProducts().then((resp: message.QueryAppProductsRespBody) => {
				for (let v of resp.products) {
					for (let vv of resp.channel_products_ext) {
						if (v.id == vv.id) {
							let tmp: MyProductInfo = {
								id: "",
								name: "",
								describe: "",
								currency: "",
								amount: 0,
								amount_usd: 0,
								coin: 0,
								type: "",
								discount: "",
								cp_product_id: "",
							};
							for (const k in tmp) {
								tmp[k] = v[k];
							}
							tmp.cp_product_id = vv.cp_product_id;
							this.allProducts.push(tmp);
							break;
						}
					}
				}
				let all = this.allProducts;
				this.setInfoPayInfo();

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
					if (itemA == null) return 1;
					if (itemB == null) return -1;
					if (itemA.sort_index == itemB.sort_index) {
						return b.amount - a.amount;
					} else {
						return itemA.sort_index - itemB.sort_index;
					}

				});
			});


		}
		private setInfoPayInfo() {
			let tablePay = Game.ConfigManager.getTable(StringConfig_Table.pay + ".json");
			let payIndexJun = tablePay[this.juniorTbl.pay_index];
			let payIndexAdv = tablePay[this.advancedTbl.pay_index];
			let payTblJun: any = null;
			let payTblAdv: any = null;
			let any = this.allProducts;
			for (const v of this.allProducts) {
				if (v.coin == payIndexJun.raw_token) {
					payTblJun = Table.DeepCopy(v);
				}
				if (v.coin == payIndexAdv.raw_token) {
					payTblAdv = Table.DeepCopy(v);
				}
			}
			if (payTblJun != null) {
				let num = payTblJun.Currency;
				let strUnit = Set.CashUnit(payTblJun.Currency);
				let strMoney = payTblJun.amount;
				this.lbOne.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.month_price1, strUnit, strMoney);
			} else {
				this.lbOne.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
			}
			if (payTblAdv != null) {
				let num = payTblAdv.Currency;
				let strUnit = Set.CashUnit(payTblAdv.Currency);
				let strMoney = payTblAdv.amount;
				this.lbMore.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.month_price2, strUnit, strMoney);
			} else {
				this.lbMore.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Gift.no_point));
			}
		}
		private onBtnMouthCardA() {
			if (this.juniorInfo != null) {
				loadUI(GiftTimeNode)
					.then((dialog: GiftTimeNode) => {
						dialog.show(UI.SHOW_FROM_TOP);
						dialog.setInfo(this.juniorInfo);
						dialog.CB = () => {
							this.father.setInit(true);
							this.setInfoMonthInfo();
						}
					});
			} else {
				toast_warning(TextsConfig.TextsConfig_Activity.cannotBuyReason);
			}
		}
		private onBtnMouthCardB() {
			if (this.advancedInfo != null) {
				loadUI(GiftTimeNode)
					.then((dialog: GiftTimeNode) => {
						dialog.show(UI.SHOW_FROM_TOP);
						dialog.setInfo(this.advancedInfo);
						dialog.CB = () => {
							this.father.setInit(true);
							this.setInfoMonthInfo();
						}
					});
			} else {
				toast_warning(TextsConfig.TextsConfig_Activity.cannotBuyReason);
			}
		}
		public openDown = () => {

		}
		private onBtnGetHunter() {
			if (this.saveBtnState == 0) {
				loadUI(Daily_AwardPop)
					.then((dialog: Daily_AwardPop) => {
						dialog.SetInfoGift(this.info.rewards[0].goodsInfo, null, null)
						dialog.show(UI.SHOW_FROM_TOP);
					});
			} else if (this.saveBtnState == 1) {
				let type = this.info.type;
				let index = this.info.index;
				let rewardIndex = 1;
				Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then((resp: message.GameInfo) => {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(resp.getGoods);
							dialog.show();
							dialog.setCB(() => {
								this.father.setInit(true);
								this.setInfoMonthInfo();
								Game.EventManager.event(GameEvent.ACTIVITY_TYPE_UPDATE);
							})
						})

				}).catch(() => {

				})
			}

		}
		private onBtnGetHunterBegin() {
			this.btnGetHunter.scaleX = 1;
			this.btnGetHunter.scaleY = 1;
		}
		private onBtnGetHunterEnd() {
			this.btnGetHunter.scaleX = 0.8;
			this.btnGetHunter.scaleY = 0.8;
		}
		private onTouchBegin() {
			if (this as ActivityDoubleMouthCard)
				this.setInfoMonthInfo();
		}
		private GetAwardAni() {
			let a = this.btnGetHunter.y;
			let tw = egret.Tween.get(this.btnGetHunter, { loop: true });		//
			egret.Tween.get(this.btnGetHunter, { loop: true }).to({ rotation: -5 }, 100).to({ rotation: 5 }, 200).to({ rotation: 0 }, 100).to({ rotation: -5 }, 100).to({ rotation: 0 }, 100)
				.wait(1400);
			egret.Tween.get(this.btnGetHunter, { loop: true }).to({ scaleY: 0.9 }, 600).wait(400)
				.to({ scaleY: 0.8 }, 600).wait(400);
			egret.Tween.get(this.btnGetHunter, { loop: true }).to({ y: 150 }, 1000)
				.to({ y: 179.5 }, 1000);
		}
	}
}