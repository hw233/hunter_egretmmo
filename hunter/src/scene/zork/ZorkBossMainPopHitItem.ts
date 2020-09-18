namespace zj {
//贪婪之岛-寿富拉比-伤害列表Item
//yuqingchao
//2019.03.15
export class ZorkBossMainPopHitItem extends eui.ItemRenderer {
	private lbRank: eui.Label;
	private lbName: eui.Label;
	private lbHit: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/zork/ZorkBossMainPopHitItemSkin.exml"
	}
	protected dataChanged() {
		let info = this.data.info;
		let blood = this.data.hp
		this.lbName.text = info.baseInfo.name;
		this.lbRank.text = info.rank;
		// toFixed
		let propres = info.value / blood * 100;
		let persent = propres.toFixed(2) + "%";
		// let persent = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, info.value / blood * 100)
		// this.lbHit.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, info.value, persent);
		this.lbHit.text = info.value + " (" + persent + ")";
	}
}
}