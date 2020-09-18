namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-6-14
 * 
 * @class 贪婪之岛港口线路list子项
 */
export class DarkLandChooseCityItem extends eui.ItemRenderer {
	private labelServer: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/DarkLandChooseCityItemSkin.exml";
	}
	protected dataChanged() {
		let data = this.data as DarkLandChooseCityItemData;
		let str = "S" + singLecraft.decodeGroupName(data.info, "&", false) + " " + singLecraft.decodeGroupName(data.info, "&", true);
		this.labelServer.text = str;
	}
}
export class DarkLandChooseCityItemData {
	index: number;
	info;
}
}