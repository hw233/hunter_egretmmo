namespace zj {
//DoubleColorViewAwardGroupItem
//yuqingchao
//2019.05.29
export class DoubleColorViewAwardGroupItem extends eui.ItemRenderer {
	private groupAll: eui.Group;
	private imgFrame: eui.Image;
	private imgIcon: eui.Image;
	private imgAdd: eui.Image;
	private groupClose: eui.Group;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorViewAwardGroupItemSkin.exml";
		// cachekeys(<string[]>UIResource["DoubleColorViewAwardGroupItem"], null);
	}
	protected dataChanged() {
		closeCache(this.groupAll);
		let num = this.data.num;
		this.groupClose.visible = num != 0;
		this.imgAdd.visible = num == 0;
		if (num != 0) {
			this.imgFrame.visible = true;
			this.imgFrame.scaleX = this.imgFrame.scaleY = 0.4;
			this.imgIcon.source = cachekey(UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[num - 1], this);
		}
		setCache(this.groupAll);
	}
}
}