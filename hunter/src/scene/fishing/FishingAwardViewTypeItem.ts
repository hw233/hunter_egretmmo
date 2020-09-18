namespace zj {
//FishingAwardViewTypeItem
//yuqingchao
//2019.05.15
export class FishingAwardViewTypeItem extends eui.ItemRenderer {
	private groupAll: eui.Group;
	private imgFrame: eui.Image;
	private imgFish: eui.Image;
	private imgTitle: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/FishingAwardViewTypeItemSkin.exml";
		cachekeys(<string[]>UIResource["FishingAwardViewTypeItem"], null);
	}
	protected dataChanged() {
		let info = this.data.info;
		let index = this.data.id;
		this.imgFish.source = cachekey(info.fish_image, this);
		this.imgTitle.source = cachekey(info.image_title, this);
		this.imgFrame.visible = this.selected;
	}
}
}