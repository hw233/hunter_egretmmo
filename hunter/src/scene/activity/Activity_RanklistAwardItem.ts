namespace zj {
	/**
	 * @class 排行榜奖励Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-26
	 */
	export class Activity_RanklistAwardItem extends eui.ItemRenderer {
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private labelNum: eui.BitmapLabel;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_RanklistAwardItemSkin.exml";
			cachekeys(<string[]>UIResource["Activity_RanklistAwardItem"], null);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		}

		protected dataChanged() {
			if (!this.data.goodsInfo) return;
			this.imgFrame.source = cachekey(PlayerItemSystem.ItemFrame(this.data.goodsInfo.goodsId), this);
			this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.data.goodsInfo.goodsId), this);
			this.labelNum.text = "x" + this.data.goodsInfo.count;
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}
}