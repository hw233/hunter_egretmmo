namespace zj {
	/**
	 * 2019.12.3
	 * xingliwei
	 * @class 信长礼包item 
	 * */
	export class Activity_HunterGiftItem extends eui.ItemRenderer {
		public imgFrame: eui.Image;
		public imgIcon: eui.Image;
		public labelCount: eui.Label;
		public imgpifu: eui.Image;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_HunterGiftItemSkin.exml";
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this)
		}
		protected dataChanged() {
			let data = this.data as Activity_HunterGiftItemData;
			let info = PlayerItemSystem.ItemConfig(data.goodsId) as any;
			this.imgIcon.source = cachekey(info.path, this);
			this.imgFrame.source = cachekey(PlayerItemSystem.Set(data.goodsId, null, data.count).Frame, this);
			this.labelCount.text = Set.NumberUnit2(data.count);
			if (PlayerItemSystem.ItemType(data.goodsId) == message.EGoodsType.GOODS_TYPE_FASHION) {
				this.imgpifu.visible = true;
			} else {
				this.imgpifu.visible = false;
			}

		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			let goodsInfo: message.GoodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.data.goodsId;
			goodsInfo.count = this.data.count;

			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}
	export class Activity_HunterGiftItemData {
		goodsId: number;
		count: number;
	}
}
