namespace zj {
	/**
	 * @class 开服七天乐奖励Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-12-04
	 */
	export class ActivityHappySevenAwardItem extends eui.ItemRenderer {
		public groupAll: eui.Group;
		public imgFrame: eui.Image;
		public imgIcon: eui.Image;
		public labelNum: eui.BitmapLabel;
		public imgSign: eui.Image;
		public imgCanget: eui.Image;
		public imgHaveGot: eui.Image;

		public goodsId: number;
		public count: number;
		public isAwardList: boolean;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityHappySevenAwardItemSkin.exml";
			cachekeys(<string[]>UIResource["ActivityHappySevenAwardItem"], null);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
		}

		protected dataChanged() {
			this.setData(this.data.goodsId, this.data.count, this.data.showType, this.data.isReward, this.data.isAwardList);
		}

		/**
		 * @param goodsId 物品id
		 * @param count 物品数量
		 * @param showType
		 * @param isReward 是否已经领取
		 * @param isAwardList 是否是七日奖中list调用
		 * @param isHaveGot 是否可领取状态
		 */
		public setData(goodsId: number, count: number, showType: number, isReward: boolean = false, isAwardList: boolean = false, isHaveGot: boolean = false) {
			this.isAwardList = isAwardList;
			this.goodsId = goodsId;
			this.count = count;
			let type = PlayerItemSystem.ItemType(goodsId);
			let itemSet = PlayerItemSystem.Set(goodsId, showType, count) as any;
			if (!isAwardList) {
				this.imgFrame.source = cachekey("ui_acitivity_serverseven_Frame_png", this);
			}
			else {
				this.imgFrame.source = cachekey(itemSet.Frame, this);
			}
			this.imgIcon.source = cachekey(itemSet.Path, this);
			this.labelNum.text = count.toString();
			this.imgSign.visible = (type == message.EGoodsType.GOODS_TYPE_FASHION); // 时装

			this.imgHaveGot.visible = isReward;
			this.imgCanget.visible = isHaveGot;
		}

		private onShowGoodProperty(e: egret.TouchEvent) {
			if (!this.isAwardList) return;
			let goodsInfo: message.GoodsInfo = new message.GoodsInfo();
			goodsInfo.goodsId = this.goodsId;
			goodsInfo.count = this.count;
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}
}