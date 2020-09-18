namespace zj {
/**
 * @author xingliwei 
 * 
 * @time 2019-7-30
 * 
 * @class 猎人念力组合效果长按详情界面list子项
 */
export class CommonDesPsychicGroupItem extends eui.ItemRenderer {
	public labelPropertyChange: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/common/CommonDesPsychicGroupItemSkin.exml";
	}

	protected dataChanged() {
		let data = this.data as CommonDesPsychicGroupItemData;
		this.labelPropertyChange.textFlow = Util.RichText(data.describeStr);
		if (!data.bGetEffect) {
			this.labelPropertyChange.alpha = 0.8;
		} else {
			this.labelPropertyChange.alpha = 1;
		}
	}
}

export class CommonDesPsychicGroupItemData {
	index;
	describeStr;
	bGetEffect;
}
}