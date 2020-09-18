namespace zj {
	export class Activity_DailyFirstChargeItem extends eui.ItemRenderer {
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelNum: eui.BitmapLabel;

		private goodsId: number;
		private count: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_DailyFirstChargeItemSkin.exml";
			cachekeys(<string[]>UIResource["Activity_DailyFirstChargeItem"], null);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		}

		protected dataChanged() {
			this.setData(this.data.goodsId, this.data.count);
		}

		private setData(goodsId: number, count: number) {
			this.goodsId = goodsId;
			this.count = count;
			let type = PlayerItemSystem.ItemType(goodsId);
			let itemSet = PlayerItemSystem.Set(goodsId, null, count) as any;
			this.imgFrame.source = cachekey(itemSet.Frame, this);
			this.imgIcon.source = cachekey(itemSet.Path, this);
			this.labelNum.text = count.toString();
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			let goodsInfo: message.GoodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.goodsId;
			goodsInfo.count = this.count;
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}
}