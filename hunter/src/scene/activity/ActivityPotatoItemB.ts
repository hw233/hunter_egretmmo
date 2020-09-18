namespace zj {
export class ActivityPotatoItemB extends eui.ItemRenderer {
	private labelAttri: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityPotatoItemBSkin.exml";
		cachekeys(<string[]>UIResource["ActivityPotatoItem"], null);
	}
	protected dataChanged() {
		let info = this.data.addStr;
		this.labelAttri.textFlow = Util.RichText(info);
		this.width = 180;
	}
}
}