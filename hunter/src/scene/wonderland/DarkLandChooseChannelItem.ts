namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-6-14
 * 
 * @class 贪婪之岛港口线路list子项
 */
export class DarkLandChooseChannelItem extends eui.ItemRenderer {
	private btnSelect: eui.Button;
	private label1: eui.Label;
	private label2: eui.Label;

	private channelId;

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/DarkLandChooseChannelItemSkin.exml";
		this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelect, this);
	}
	protected dataChanged() {
		let data = this.data as DarkLandChooseChannelItemData;
		let maxNum = TableDarkland.Item(1).branch_condition;

		this.channelId = data.info.key
		let channelID = this.channelId % 100
		let strNum = ""
		if (data.info.value >= maxNum) {
			strNum = "<text>(</text>" + TextsConfig.TextsConfig_DarkLand.redFull + "<text>)</text>"
		} else {
			strNum = "<text>(</text><color>r=60,g=255,b=0</color><text>" + data.info.value + "</text><text>/" + maxNum + ")</text>"
		}
		this.label1.text = Helper.StringFormat(TextsConfig.TextsConfig_DarkLand.curPortChannel, channelID)
		this.label2.textFlow = Util.RichText(Helper.StringFormat(strNum));
	}

	private onBtnSelect() {
		let data = this.data as DarkLandChooseChannelItemData;
		data.father.selectChannelId = this.channelId;
		data.father.ChangeChannel()
	}
}
export class DarkLandChooseChannelItemData {
	index: number;
	info;
	father: DarkLandChoose;
}
}