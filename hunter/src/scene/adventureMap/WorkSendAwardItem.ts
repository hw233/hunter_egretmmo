namespace zj {
	/**
	 * @class 工作派遣任务奖励Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-10
	 */
	export class WorkSendAwardItem extends eui.ItemRenderer {
		private imgFrmae: eui.Image;
		private imgIcon: eui.Image;
		private labelNum: eui.Label;

		public constructor() {
			super();
			this.skinName = "resource/skins/adventureMap/WorkSendAwardItemSkin.exml";
			cachekeys(<string[]>UIResource["WorkSendAwardItem"], null);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: WorkSendAwardItemData) {
			let itemSet = PlayerItemSystem.Set(data.goodsInfo.goodsId, null, data.goodsInfo.count) as any;
			this.imgFrmae.source = cachekey(itemSet.Frame, this);
			this.imgIcon.source = cachekey(itemSet.Path, this);
			this.labelNum.text = data.goodsInfo.count.toString();
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}

	export class WorkSendAwardItemData {
		goodsInfo: message.GoodsInfo;
	}
}