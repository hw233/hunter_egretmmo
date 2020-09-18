namespace zj {
	/**
	 * xingliwei
	 * 2019.11.6
	 * 信长礼包
	 */
	export class Activity_HunterGift extends Dialog {
		public groupMain: eui.Group;
		public groupKeel: eui.Group;
		public labeltime: eui.Label;
		public btnBuy: eui.Button;
		public btnClose: eui.Button;
		public list: eui.List;
		public list1: eui.List;


		private update: number;
		private info: message.GiftInfo;
		private tableinfo: TableNewgiftItem;
		private allProducts = [];
		private vis: boolean = true;
		public payTbl;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_HunterGiftSkin.exml";
			// this.groupMain.cacheAsBitmap = true;
			this.init();
		}

		private init() {
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			this.loadPayProducts(() => {
				setCache(this.groupMain);
				this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
				this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy, this);
				this.update = egret.setInterval(this.Update, this, 1000);
				this.loadKeel(2);
				this.info = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v: message.GiftInfo) => {
					return v.gift_index == 101507;
				})[0];
				this.payTbl = {};
				let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
				let payIndex = TablePayIndex.Item(giftInfo.pay_index);
				for (const v of this.allProducts) {
					if (v.coin == payIndex.raw_token) {
						this.payTbl = Table.DeepCopy(v);
						break;
					}
				}
				this.tableinfo = TableNewgiftItem.Item(101507);
				this.Update();
				this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
					egret.clearInterval(this.update)
				}, this);

				let array = new eui.ArrayCollection();
				for (let i = 0; i < 2; i++) {
					let data = new Activity_HunterGiftItemData();
					data.goodsId = this.tableinfo.goods_id[i];
					data.count = this.tableinfo.goods_count[i];
					array.addItem(data);
				}
				this.list.dataProvider = array;
				this.list.itemRenderer = Activity_HunterGiftItem;
				this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTap, this);

				let array1 = new eui.ArrayCollection();
				for (let i = 2; i < this.tableinfo.goods_id.length; i++) {
					let data = new Activity_HunterGiftItemData();
					data.goodsId = this.tableinfo.goods_id[i];
					data.count = this.tableinfo.goods_count[i];
					array1.addItem(data);
				}
				this.list1.dataProvider = array1;
				this.list1.itemRenderer = Activity_HunterGiftItem;
			});

		}

		/**点击list */
		private onListTap(e: eui.ItemTapEvent) {
			if (e.itemIndex == 0) {
				this.loadKeel(1);
			} else if (e.itemIndex == 1) {
				this.loadKeel(2);
			}
		}

		private Update() {
			if (this.info) {
				let time = this.info.trigger_time + this.tableinfo.duration - Game.Controller.curServerTime;
				if (Math.floor(time / 86400) != 0) {
					this.labeltime.text = Math.floor(time / 86400) + "天 " + Math.floor(time / 3600) % 24 + ":" + Math.floor((time % 3600) / 60) + ":" + Math.floor(time % 60);
				} else {
					this.labeltime.text = Math.floor(time / 3600) % 24 + ":" + Math.floor((time % 3600) / 60) + ":" + Math.floor(time % 60);
				}

			}
		}
		/**加载龙骨 */
		private loadKeel(type: number) {
			this.groupKeel.removeChildren();
			let body = type == 1 ? "wj_027_xinchang" : "wj_000_xinchang_bssz";
			Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
				.then(display => {
					display.scaleX = 1;
					display.scaleY = 1;
					display.name = "fashion";
					this.groupKeel.addChild(display);
				});
		}

		private onBtnBuy() {
			let giftInfo = PlayerGiftSystem.Instance_item(101507);
			Game.EventManager.on(GameEvent.PLAYER_GOODS_INFO_CHANGE, this.getGoods, this);
			if (this.tableinfo.pay_type == 1) {
				if (Util.getAppVersionInfo().channel == "test") {
					Game.PlayerPaySystem.simulateCharge(this.info["index"]).then((resp: message.GameInfo) => {

					}).catch((err) => {
						console.log(err);
					});
				} else {
					let strIndex = this.info["index"];
					if (this.payTbl) {
						platform.pay(PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, PlayerPaySystem.GetCpExtJson(strIndex));
					}
				}
			} else if (this.tableinfo.pay_type == 2) {
				Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"]).then((gameInfo: message.GameInfo) => {
					loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
						dialog.init(gameInfo.goodsInfo);
						dialog.show();
						dialog.setCB(() => {
							Game.EventManager.off(GameEvent.PLAYER_GOODS_INFO_CHANGE, this.getGoods, this)
							this.onBtnClose();
						});
					});
				}).catch((err) => {
					console.log(err);
				});
			}
		}
		private goods: Array<message.GoodsInfo> = [];
		private getGoods() {
			this.goods.length = 0;
			for (let i = 0; i < this.tableinfo.goods_id.length; i++) {
				let a = new message.GoodsInfo();
				a.goodsId = this.tableinfo.goods_id[i];
				a.count = this.tableinfo.goods_count[i];
				this.goods.push(a);
			}
			loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
				dialog.init(this.goods);
				dialog.show();
				dialog.setCB(() => {
					this.onBtnClose();
				});
			})
		}

		private loadPayProducts(cb?) {
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
					return itemA.sort_index - itemB.sort_index;
				});
				if (cb) cb();
			});
		}

		private removeShow() {
			let show = this.getChildByName("details");
			if (show) {
				this.removeChild(show);
			}
		}

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

		private onBtnClose() {
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
			this.close(UI.HIDE_TO_TOP);
		}
	}
}