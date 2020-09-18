namespace zj {
	/**
	 * xingliwei
	 * 2019.11.30
	 * c 成长基金item
	 */
	export class ActivitySpecialWonderlandItem extends eui.ItemRenderer {
		public labelLevel: eui.Group;
		public lbPlayerLevel: eui.BitmapLabel;
		public lbGetTip: eui.Label;
		public lstAward: eui.List;
		public btnMonthCard: eui.Button;
		public imgMask: eui.Image;
		public imgGet: eui.Image;
		private info;
		private giftInfo;
		private dailyInfo;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivitySpecialWonderlandItemSkin.exml";
			this.btnMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMonthCard, this);
		}

		protected dataChanged() {
			let data = this.data as ActivitySpecialWonderlandItemData;
			this.lbPlayerLevel.text = "" + data.info.reward_level;
			let arrCollection = new eui.ArrayCollection();
			for (let i = 0; i < data.info.goods_id.length; i++) {
				arrCollection.addItem(
					{
						"goods": data.info.goods_id[i],
						"count": data.info.goods_count[i],
						"isGet": false
					}
				);
			}
			this.lstAward.dataProvider = arrCollection;
			this.lstAward.itemRenderer = ActivityActivityItemB;
			this.info = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
				return v.gift_index == data.id;
			})[0];
			this.giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
			this.dailyInfo = PlayerGiftSystem.GetGiftFate(Number(this.giftInfo.daily_index));
			this.imgGet.visible = false;

			let level: number = Number(this.dailyInfo[this.data.index].reward_level);
			let find = Table.FindF(this.info["markIndex"], (k, v) => {
				return v == this.dailyInfo[this.data.index].index;
			});

			let image1 = UIConfig.UIConfig_Gift.reach; // 达成
			let image2 = UIConfig.UIConfig_Gift.get; // 领取

			if (!find && Game.PlayerInfoSystem.BaseInfo.level >= level && data.father.vis) {
				// 可领取
				this.btnMonthCard.visible = true;
				this.btnMonthCard.enabled = true;
			} else if (find && Game.PlayerInfoSystem.BaseInfo.level >= level && data.father.vis) {
				// 已领取
				this.imgGet.visible = true;
				this.btnMonthCard.visible = false;
			} else if (Game.PlayerInfoSystem.BaseInfo.level < level && !data.father.vis) {
				// 不可领
				this.btnMonthCard.visible = true;
				this.btnMonthCard.enabled = false;
			} else {
				this.btnMonthCard.visible = true;
				this.btnMonthCard.enabled = false;
			}
		}

		private onBtnMonthCard() {
			if (this.giftInfo.gift_form == 6) {
				Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"], this.dailyInfo[this.data.index].index).then((msg: message.GameInfo) => { this.simulateCharge(msg) });
			} else if (this.giftInfo.gift_form == 3) {
				Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then((msg: message.GameInfo) => { this.simulateCharge(msg) });
			}
		}

		private simulateCharge(msg: message.GameInfo) {
			for (let v of msg.giftInfos) {
				if (v.index == this.info["index"]) {
					this.info = Table.DeepCopy(v);
				}
			}
			let data = this.data as ActivitySpecialWonderlandItemData;
			let goods: message.GoodsInfo[] = [];
			for (let i = 0; i < data.info.goods_id.length; i++) {
				let a = new message.GoodsInfo();
				a.goodsId = data.info.goods_id[i]
				a.count = data.info.goods_count[i]
				goods.push(a);
			}
			loadUI(CommonGetDialog)
				.then((dialog: CommonGetDialog) => {
					dialog.show();
					dialog.init(goods);
					dialog.setCB(() => {
						this.data.father.init();
					});
				});
		}
	}

	export class ActivitySpecialWonderlandItemData {
		index: number;
		father: ActivitySpecialWonderland | ActivitySpecialWantedSeonde;
		info;
		id: number;
	}
} 