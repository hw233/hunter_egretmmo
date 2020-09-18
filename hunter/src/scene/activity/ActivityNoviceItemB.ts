namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-11-13
	 * 
	 * @class 新手狂欢礼包item
	 */
	export class ActivityNoviceItemB extends eui.ItemRenderer {
		public imgFloor: eui.Image;
		public labelTitle: eui.Label;
		public groupRed: eui.Group;
		public labelTitle1: eui.Label;
		public labelOriginalPrice: eui.Label;
		public imgRed: eui.Image;
		public listViewAward: eui.List;
		public imgGet: eui.Image;
		public btnGet: eui.Button;
		public btnGo: eui.Button;
		public groupPurchase: eui.Group;
		public labelMoney: eui.Label;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityNoviceItemBSkin.exml";
			cachekeys(<string[]>UIResource["ActivityNoviceItemB"], null);
			this.groupPurchase.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
		}

		protected dataChanged() {
			this.setinfo();
			this.setInfoAward();
		}

		private setinfo() {
			let info = this.data.info as TableMissionGift    //.father.data[this.data.TypeId - 1].dataInfo[this.data.index]
			//礼包名
			this.labelTitle.text = info.name;
			//完成条件
			this.labelTitle1.text = "";
			if (Number(info.vip_level) != 0) {
				// this.labelTitle1.text += "VIP要求" + info.vip_level;
			}
			if (Number(info.charge_token) != 0) {
				let a = Game.PlayerInfoSystem.BaseInfo.chargeToken <= info.charge_token ? Game.PlayerInfoSystem.BaseInfo.chargeToken : info.charge_token
				this.labelTitle1.text += "已充值" + a / 10 + "/" + info.charge_token / 10;
			}
			if (Number(info.comsume_token) != 0) {
				// this.labelTitle1.text += "原价" + info.comsume_token;
				// this.groupPurchase.visible = true;
				this.labelMoney.text = info.comsume_token.toString();
			} else {
				this.groupPurchase.visible = false;
			}
			//原价多少
			if (info.primer != null && info.primer != "") {
				this.labelOriginalPrice.text = info.primer;
				this.groupRed.visible = true;
				this.labelTitle1.text = "";
			} else {
				this.groupRed.visible = false;
			}
			//判断是否领取过
			let vis = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, (k, v: number) => {
				return v == this.data.info.index;
			})
			this.btnGet.enabled = true;
			if (vis) {
				this.groupPurchase.visible = false;
				this.btnGo.visible = false;
				this.btnGet.visible = false;
				this.imgGet.visible = true;
			} else {
				this.imgGet.visible = false;
				// let day = Math.floor((Game.Controller.curServerTime - Game.PlayerInfoSystem.BaseInfo.createTime) / 3600 / 24)
				if (this.data.father.btnIndex <= Helper.day()) {
					if (info.primer != null && info.primer != "") {
						this.groupPurchase.visible = true;
						this.btnGo.visible = false;
						this.btnGet.visible = false;
						this.btnGet.enabled = false;
						this.imgGet.visible = false;
					} else if (Number(info.charge_token) != 0) {
						if (Game.PlayerInfoSystem.BaseInfo.chargeToken >= info.charge_token) {
							this.groupPurchase.visible = false;
							this.btnGo.visible = false;
							this.btnGet.visible = true;
							this.btnGet.enabled = true;
							this.imgGet.visible = false;
						} else {
							this.groupPurchase.visible = false;
							this.btnGo.visible = false;
							this.btnGet.visible = true;
							this.btnGet.enabled = false;
							this.imgGet.visible = false;
						}
					} else {
						this.groupPurchase.visible = false;
						this.btnGo.visible = false;
						this.btnGet.visible = true;
						this.btnGet.enabled = true;
						this.imgGet.visible = false;
					}
				} else {
					this.groupPurchase.visible = false;
					this.btnGo.visible = false;
					this.btnGet.visible = true;
					this.btnGet.enabled = false;
					this.imgGet.visible = false;
				}
			}

		}
		/**领取 */
		private onBtnGet() {
			this.buyMissionGift().then((gameInfo: message.GameInfo) => {
				let goods: message.GoodsInfo[] = [];
				for (let i = 0; i < this.data.info.reward_goods.length; i++) {
					let b = new message.GoodsInfo();
					b.goodsId = this.data.info.reward_goods[i];
					b.count = this.data.info.reward_count[i]
					goods.push(b);
				}
				loadUI(CommonGetDialog)
					.then((dialog: CommonGetDialog) => {
						dialog.init(goods);
						dialog.setCB(() => {
							this.setinfo();
						});
						dialog.show();
					});
				this.data.father.initAfterSetType();
			}).catch((result: number) => {
				if (result == 10209) {
					TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
						loadUI(PayMallScene)
							.then((scene: PayMallScene) => {
								scene.show(UI.SHOW_FROM_TOP);
								scene.init();
							});
					})
				} else if (result == 10347) {
					loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
						dialog.show(UI.SHOW_FROM_TOP);
						dialog.setInfo("VIP不足，是否前往提升VIP等级？");
						dialog.setCB(() => {
							loadUI(PayMallScene)
								.then((dialog: PayMallScene) => {
									dialog.show(UI.SHOW_FILL_OUT);
									dialog.init(true);
								});
						});
					});
				} else {
					Game.ConfigManager.getAone2CodeReason(result);
				}
			})
		}
		/**领取协议 */
		private buyMissionGift(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.BuyMissionGiftRequest();
				request.body.index = Number(this.data.info.index);

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.BuyMissionGiftResponse>resp;
					if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
						reject(response.header.result);
						return;
					}
					resolve(response.body.gameInfo);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
						return;
					}, this, false, true);
			});
		}

		private onBtnGo() {
			loadUI(PayMallScene)
				.then((scene: PayMallScene) => {
					scene.show(UI.SHOW_FROM_TOP);
					scene.init(true);
				});
		}

		/**加载奖励列表 */
		private setInfoAward() {
			let itemInfo = this.data.info.reward_goods;
			let count = this.data.info.reward_count;
			let array = new eui.ArrayCollection();
			for (let i = 0; i < itemInfo.length; i++) {
				let data = new ActivityNoviceItemItemData();
				data.index = i;
				data.itemInfo = [itemInfo[i], count[i]]
				data.father = this;
				array.addItem(data);
			}
			this.listViewAward.dataProvider = array;
			this.listViewAward.itemRenderer = ActivityNoviceItemItem;
		}

	}

	export class ActivityNoviceItemBData {
		index: number;
		info: number;
		father: ActivityNovice;
	}
} 