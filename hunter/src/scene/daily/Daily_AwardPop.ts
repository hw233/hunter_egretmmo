namespace zj {
	/**
	 * 日常活跃度奖励预览
	 * created by Lian Lei
	 * 2019.03.19
	 */
	export class Daily_AwardPop extends Dialog {

		private btnClose: eui.Button;
		private scrollerAward: eui.Scroller;
		private listAward: eui.List;
		private listAwardData: eui.ArrayCollection = new eui.ArrayCollection();
		private bFinish: boolean;
		private ismissionnewReward;
		private father: ActivityNovice;
		private cb: Function;
		public constructor() {
			super();
			this.skinName = "resource/skins/daily/Daily_AwardPopSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);
		}

		public setInfoActive(activeId: number) {
			let tbl: { [key: string]: TableMissionActive } = TableMissionActive.Table();
			let goods = tbl[activeId].reward_goods;

			this.listAwardData.removeAll();
			for (let i = 0; i < goods.length; i++) {
				let itemData = new Daily_AwardPopItemData();
				itemData.goodsId = goods[i][0];
				itemData.count = goods[i][1];
				itemData.noName = null;
				itemData.needDetail = true;
				itemData.father = this;
				this.listAwardData.addItem(itemData);
			}

			let layout = new eui.HorizontalLayout();
			layout.verticalAlign = "middle";
			layout.horizontalAlign = "center";
			layout.gap = 6;

			// 1~4个商品时，居中显示特殊处理
			if (goods.length > 0 && goods.length < 5) {
				let width = 130;
				switch (goods.length) {
					case 1: {
						layout.paddingLeft = this.listAward.width / 2 - width / 2;
					}; break;
					case 2: {
						layout.paddingLeft = this.listAward.width / 2 - width - layout.gap / 2;
					}; break;
					case 3: {
						layout.paddingLeft = this.listAward.width / 2 - width * 3 / 2 - layout.gap;
					}; break;
					case 4: {
						layout.paddingLeft = this.listAward.width / 2 - width * 2 - layout.gap * 3 / 2;
					}; break;
				}
			}

			this.listAward.layout = layout;
			this.listAward.dataProvider = this.listAwardData;
			this.listAward.itemRenderer = Daily_AwardPopItem;

		}

		public SetInfoGift(goods: Array<message.GoodsInfo>, bFinish, ismissionnewReward, father?: ActivityNovice, cb?: Function) {
			this.bFinish = bFinish;
			this.father = father;
			this.cb = cb;
			this.ismissionnewReward = ismissionnewReward;
			for (let k in goods) {
				if (goods.hasOwnProperty(k)) {
					let v = goods[k];
					this.listAwardData.removeAll();
					for (let i = 0; i < goods.length; i++) {
						let itemData = new Daily_AwardPopItemData();
						itemData.goodsId = goods[i].goodsId;
						itemData.count = goods[i].count;
						itemData.noName = null;
						itemData.needDetail = true;
						itemData.father = this;
						this.listAwardData.addItem(itemData);
					}
					this.listAward.dataProvider = this.listAwardData;
					this.listAward.itemRenderer = Daily_AwardPopItem;
				}
			}
			if (this.bFinish && this.bFinish != null && !ismissionnewReward) {
				let path1 = UIConfig.UIConfig_Activity.buttonGet2[1];
				let path2 = UIConfig.UIConfig_Activity.buttonGet2[2];
				Set.ButtonBackgroud(this.btnClose, path1, path2, path1);
			} else {
				let path1 = UIConfig.UIConfig_Activity.bknow[1];
				let path2 = UIConfig.UIConfig_Activity.bknow[2];
				Set.ButtonBackgroud(this.btnClose, path1, path2, path1);
			}
		}

		private onBtnClose() {
			if (this.bFinish && !this.ismissionnewReward) {
				this.reqRewardEnd();
			} else {
				if (this.cb) {
					this.cb();
				}
				this.close(UI.HIDE_TO_TOP);
			}
		}

		private reqRewardEnd() {
			this.missionNew().then((response: message.MissionNewResponse) => {
				let goods = Table.DeepCopy(response.body.gameInfo.getGoods);
				let hero = Table.FindR(goods, (k, v: message.GoodsInfo) => {
					return PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
				})
				if (hero[0] != null) {
					loadUI(CommonGetGeneral)
						.then((dialog: CommonGetGeneral) => {
							dialog.setInfo(hero[0].goodsId, null, () => {
								loadUI(CommonGetDialog)
									.then((dialog: CommonGetDialog) => {
										dialog.init(goods);
										dialog.setCB(() => {
											this.close(UI.HIDE_TO_TOP);
											if (this.cb) {
												this.cb();
											}
										});
										dialog.show(UI.SHOW_FROM_TOP);
									});
							});
							dialog.show(UI.SHOW_FROM_TOP);
						});
				} else {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(goods);
							dialog.setCB(() => {
								this.close(UI.HIDE_TO_TOP);
								if (this.cb) {
									this.cb();
								}
							});
							dialog.show();
						});
				}
			}).catch(() => {

			})
		}


		public missionNew(): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.MissionNewRequest()
				request.body.mission_type = this.father.missionType;

				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.MissionNewResponse>resp;
					if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve(response);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
					}, this, false);
			});
		}

		private removeShow() {
			let show = this.getChildByName("details");
			if (show) {
				this.removeChild(show);
			}
		}

		private showGoodsProperty(ev: egret.Event) {
			if (Game.UIManager.dialogCount() > 1) return;
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "details";
			this.addChild(show);
		}
	}
}