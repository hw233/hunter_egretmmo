namespace zj {
	/**
	 * 2019.12.3
	 * xingliwei
	 * @class 累天充值子项
	 */
	export class ActivityRechargeItem extends eui.ItemRenderer {
		public labelLevel: eui.Group;
		public lbPlayerday: eui.BitmapLabel;
		public lstAward: eui.List;
		public btnMonthCard: eui.Button;
		public imgMask: eui.Image;
		public imgGet: eui.Image;


		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityRechargeItemSkin.exml";
			this.btnMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMonthCard, this);
		}
		protected dataChanged() {
			let data = this.data as ActivityRechargeItemData
			let arrCollection = new eui.ArrayCollection();
			for (let i = 0; i < data.info.reward_goods.length; i++) {
				arrCollection.addItem(
					{
						"goods": data.info.reward_goods[i],
						"count": data.info.reward_count[i],
						"isGet": false
					}
				);
			}
			this.lstAward.dataProvider = arrCollection;
			this.lstAward.itemRenderer = ActivityActivityItemB;

			let vis = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.pay_reward, (k, v) => {
				return v == data.info.id;
			})
			this.imgGet.visible = false;
			if (data.info.id == Game.PlayerInfoSystem.BaseInfo.pay_day && !vis) { // 可领取
				this.btnMonthCard.visible = true;
				// this.btnMonthCard.enabled = true;
				this.btnMonthCard.currentState = "up";
			} else if (data.info.id >= Game.PlayerInfoSystem.BaseInfo.pay_day && vis == false) { // 不可领取
				this.btnMonthCard.visible = true;
				// this.btnMonthCard.enabled = false;
				this.btnMonthCard.currentState = "disabled";
			} else { // 已领取
				this.btnMonthCard.visible = false;
				this.imgGet.visible = true;
			}

			this.lbPlayerday.text = "" + data.info.id;
		}
		private onBtnMonthCard() {
			// 今天是否充值
			let isCharge: boolean = Game.PlayerInfoSystem.BaseInfo.is_chargeToday;
			if (this.btnMonthCard.currentState == "disabled" && !isCharge) { // 今天没充值
				let str = "<text>任意充值即可领取，是否前往？</text>";
				loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(HelpUtil.textConfigFormat(str, 3));
					dialog.setCB(() => {
						Game.EventManager.event(GameEvent.CLOSE_ACTIVITY_SCENE);
						loadUI(PayMallScene).then((scene: PayMallScene) => {
							scene.show(UI.SHOW_FROM_TOP);
							scene.init(true);
							scene.loadFrom(TableEnum.Enum.HXHChargeType.Gift);
						});
					});
				});
			}
			else if (this.btnMonthCard.currentState == "disabled" && isCharge) { // 今天已充值
				toast_success("今天的累充任务已达成！");
			}
			else { // 可以领取
				this.ContinuePayReward(this.data.info.id).then((gameInfo: message.GameInfo) => {
					loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
						let a: message.GoodsInfo[] = [];
						for (let i = 0; i < this.data.info.reward_goods.length; i++) {
							let b = new message.GoodsInfo;
							b.goodsId = this.data.info.reward_goods[i];
							b.count = this.data.info.reward_count[i];
							a.push(b);
						}
						dialog.init(a);
						dialog.setCB(() => {
							this.dataChanged();
							this.data.father.init();
						});
						dialog.show();
					});
				});
			}
		}

		public ContinuePayReward(index: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.ContinuePayRewardRequest();
				request.body.index = index;
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ContinuePayRewardResponse>resp;
					if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
						reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
						return;
					}
					resolve(response.body.gameInfo);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
						return;
					}, this, false);
			});
		}

	}
	export class ActivityRechargeItemData {
		index: number;
		info: TableContinuePay;
		father: ActivityRecharge;
	}
}
