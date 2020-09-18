namespace zj {
//FishingAwardViewItem
//yuqingchao
//2019.05.15
export class FishingAwardViewItem extends eui.ItemRenderer {
	private imgFrame: eui.Image;
	private imgClip: eui.Image;
	private lbNum: eui.Label;
	private groupDown: eui.Group;
	private groupImage: eui.Group;
	private imgMask: eui.Image;		//碎片遮罩
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/FishingAwardViewItemSkin.exml";
		cachekeys(<string[]>UIResource["FishingAwardViewItem"], null);
		this.groupImage.visible = true;
		this.groupDown.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

		// 碎片遮罩
		this.imgMask = new eui.Image;
		this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
		this.imgMask.horizontalCenter = 0;
		this.imgMask.verticalCenter = 0;
		this.groupDown.addChild(this.imgMask);
		this.imgMask.visible = false;
	}
	protected dataChanged() {
		let info = this.data.info;
		if (info == null) {
			this.groupImage.visible = false;
			return;
		} else if (info.goodsId == 0) {
			this.groupImage.visible = false;
		}
		let itemSet = PlayerItemSystem.Set(info.goodsId, 1, info.count);
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgClip.source = cachekey(itemSet.Clip, this);
		this.lbNum.text = info.count;

		if (this.isImgMask(info.goodsId)) {
			this.imgMask.visible = true;
			this.imgClip.mask = this.imgMask;
		}
	}
	// 物品遮罩
	private isImgMask(goodsId: number): boolean {
		if (PlayerItemSystem.ItemType(goodsId) == 4
			|| TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
			|| TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
			|| TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
			|| Math.floor(goodsId / 1000) == 37
			|| TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
			return true;
		}
		return false;
	}
	//长按点击详情
	private onShowGoodProperty(e: egret.TouchEvent) {
		Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
	}
}
}