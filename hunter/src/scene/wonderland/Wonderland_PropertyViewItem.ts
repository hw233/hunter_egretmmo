namespace zj {
/**
 * 
 *  2019-5-29 
 * @class 贪婪之岛 阵容  详情 Item
 */
export class Wonderland_PropertyViewItem extends eui.ItemRenderer {
	public imgFloor: eui.Image;
	public imgFloor1: eui.Image;
	public labelTextServer: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/Wonderland_PropertyViewItemSkin.exml";
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	private updateView(data: Wonderland_PropertyViewItemData) {
		let attrName, attrNum, text
		if (data.info.key <= Object.keys(TextsConfig.TextsConfig_HeroMain.attr).length) {
			attrName = TextsConfig.TextsConfig_HeroMain.attr[Number(data.info.key) + 1];
			attrNum = data.info.value;
			text = Helper.StringFormat(TextsConfig.TextsConfig_DarkLand.allAddAttr, attrName, attrNum);
		} else {
			let key = data.info.key - 1000
			text = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_passive_des[key + 1], data.info.value);
		}
		this.labelTextServer.text = text;
		this.imgFloor.visible = (data.index + 1) % 2 == 1;
		this.imgFloor1.visible = (data.index + 1) % 2 == 0;
	}


}
export class Wonderland_PropertyViewItemData {
	index: number;
	info;
	father: Wonderland_PropertyView;
}
}