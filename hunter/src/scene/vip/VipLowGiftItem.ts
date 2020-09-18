namespace zj {
	//VipLowGiftItem
	//yuqingchao
	//2019.04.12
	export class VipLowGiftItem extends eui.ItemRenderer {
		private index: number = 0;
		private info;
		private imgDay: eui.Image;				//VIP
		private imgGet: eui.Image;				//已购买
		private imgIcon: eui.Image;				//钻石图
		private imgTips: eui.Image;				//红点
		private btnGet: eui.Button;				//购买按钮
		private groupImg: eui.Group				//图片

		private lbToken: eui.Label;				//价格
		private labelyuanjia: eui.Label;
		private groupGet: eui.Group;
		private lstViewAward: eui.List;
		private arrayCollection: eui.ArrayCollection;
		private scroller: eui.Scroller;
		private imgMask: eui.Image;
		private father: null;
		public constructor() {
			super();
			this.skinName = "resource/skins/vip/VipLowGiftItemSkin.exml";
			cachekeys(<string[]>UIResource["VipLowGiftItem"], null);
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.father = null;
				this.data.father = null;
			}, null);
		}
		private init() {
			this.scroller.mask = this.imgMask;
			this.imgDay.visible = true;
			this.imgGet.visible = true;
			this.imgIcon.visible = true;
			this.imgTips.visible = true;
			this.groupGet.visible = true;

			this.imgGet.visible = false;
		}
		protected dataChanged() {
			this.init();
			this.index = this.data.i;
			this.info = this.data.info;
			this.father = this.data.father;
			this.imgDay.source = cachekey(UIConfig.UIConfig_VipMall.low_vip_title_new[this.index], this);
			let goods = PlayerVIPSystem.LowWealItem(this.index).goods_content;
			let count = PlayerVIPSystem.LowWealItem(this.index).goods_count;
			let getList = [];
			this.arrayCollection = new eui.ArrayCollection();
			for (let i = 0; i < goods.length; i++) {
				this.arrayCollection.addItem({
					i,
					good: goods[i],
					count: count[i],
					father: this.father,
				})
			}
			this.lstViewAward.dataProvider = this.arrayCollection;
			this.lstViewAward.itemRenderer = VipLowItemB;

			this.setButtonInfo();
		}
		private setButtonInfo() {
			let isHave = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, (k, v) => {
				return (v == this.index);
			})
			if (isHave) {
				this.imgGet.visible = true;
				this.groupGet.visible = false;
			} else {
				this.imgGet.visible = false;
				this.groupGet.visible = true;
			}
			this.lbToken.text = PlayerVIPSystem.LowWealItem(this.index).consume_token.toString();
			this.labelyuanjia.text = PlayerVIPSystem.LowWealItem(this.index).primer.toString();
			this.imgTips.visible = this.index <= Game.PlayerInfoSystem.VipLevel && !isHave;
		}
		private onBtnGet() {
			if (this.index <= Game.PlayerInfoSystem.VipLevel) {
				Game.PlayerVIPSystem.lowVipBuyWealReward(this.index).then((resp: message.GameInfo) => {
					this.setButtonInfo();
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(resp.getGoods);
							dialog.show();
						})
				})
			} else {
				loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Vip.vip_gift_go, this.index, Helper.GetNumCH(this.index.toString(), false)));
					dialog.setCB(this.onBtnPay);
				});
			}
		}
		private onBtnPay = () => {
			setTimeout(() => {
				if (this.father == null) return;
				else {
					let father = this.father as any;
					father.onBtnClose();
				}

			}, 1000);

			setTimeout(function () {
				loadUI(PayMallScene)
					.then((dialog: PayMallScene) => {
						dialog.show(UI.SHOW_FILL_OUT);
						dialog.init(true);
					});
			}, 1500);
		}

	}
}