namespace zj {
//VipLowItem
//yuqingchao
//2019.04.12
export class VipLowItem extends eui.ItemRenderer {
	private lbInfo: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/vip/VipLowItemSkin.exml";
	}
	protected dataChanged() {
		let str = this.data.info;
		this.lbInfo.textFlow = Util.RichText(str);
	}
}
}