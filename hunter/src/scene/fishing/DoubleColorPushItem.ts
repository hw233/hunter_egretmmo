namespace zj {
//DoubleColorPushItem
//yuqingchao
export class DoubleColorPushItem extends eui.ItemRenderer {
	private imgIcon: eui.Image;
	private lbNumID: eui.Label;
	private imgEnd: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorPushItemSkin.exml";
	}
	protected dataChanged() {
		let index = this.data.i;
		let id = this.data.id;
		let bPrize = this.data.bPrize;

		this.imgEnd.visible = bPrize;
		this.lbNumID.text = (id % 100).toString();
		let is_red = (index == 0) ? 0 : 1;
		this.imgIcon.source = UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[is_red];
	}
}
}