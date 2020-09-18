namespace zj {
//DoubleColorViewAwardAwardItem
//yuqingchao
//2019.05.29
export class DoubleColorViewAwardAwardItem extends eui.ItemRenderer {
	private groupAll: eui.Group;
	private imgFrame: eui.Image;
	private imgIcon: eui.Image;
	private lbNameID: eui.Label;
	private lbNum: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorViewAwardAwardItemSkin.exml";
		cachekeys(<string[]>UIResource["DoubleColorViewAwardAwardItem"], null);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
	}
	protected dataChanged() {
		closeCache(this.groupAll);
		let good = this.data.info;
		this.setInfo(good);
		setCache(this.groupAll);
	}
	private setInfo(good) {
		let itemSet = PlayerItemSystem.Set(good.goodsId, 1, good.count) as any;
		this.imgIcon.source = cachekey(itemSet.Clip, this);
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.lbNum.text = "x" + Set.NumberUnit2(good.count);
		this.lbNameID.text = itemSet.FruitID;
	}

	//长按详情
	private onShowGoodProperty(e: egret.TouchEvent) {
		Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
	}
}
}