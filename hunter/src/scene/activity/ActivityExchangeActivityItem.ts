namespace zj {
	//兑换活动
	//yuqingchao
	//2019.05.28
	export class ActivityExchangeActivityItem extends eui.ItemRenderer {
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityExchangeActivityItemSkin.exml";
			cachekeys(<string[]>UIResource["ActivityExchangeActivityItem"], null);
		}
	}
}