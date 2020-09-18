namespace zj {
/**
 * @class 世界boss伤害排行信息Item
 * 
 * @author LianLei
 * 
 * 2019.06.17
 */
export class Zork_BossItem extends eui.ItemRenderer {
	private imgRank: eui.Image;
	private labelText: eui.Label;
	private labelName: eui.Label;
	private labelValue: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/zork/Zork_BossItemSkin.exml";
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	private updateView(data: Zork_BossItemData) {
		this.imgRank.visible = false;
		this.labelName.text = data.info.baseInfo.name;
		this.labelText.text = data.info.rank;
		let persent = (data.info.value / data.blood * 100).toFixed(2);
		this.labelValue.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, Set.numberUnit4(data.info.value), persent);
	}
}

export class Zork_BossItemData {
	info;
	blood: number;
}
}