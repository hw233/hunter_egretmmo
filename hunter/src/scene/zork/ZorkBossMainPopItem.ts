namespace zj {
//贪婪之岛-寿富拉比-伤害奖励列表Item
//yuqingchao
//2019.03.15
export class ZorkBossMainPopItem extends eui.ItemRenderer {
	private lbRank: eui.Label;
	private lstItem: eui.List;
	private info;
	private boold: boolean;
	private arrayCollection1: eui.ArrayCollection;
	private arrayCollection2: eui.ArrayCollection;
	private father: ZorkBossMainPop;
	public constructor() {
		super();
		this.skinName = "resource/skins/zork/ZorkBossMainPopItemSkin.exml"
	}
	protected dataChanged() {
		this.info = this.data.info;
		this.boold = this.data.boold;
		let father = this.data.father;
		if (this.boold) {
			if (this.info[0] == this.info[1]) {
				this.lbRank.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank1, this.info[0])
			}
			else {
				this.lbRank.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank2, this.info[0], this.info[1])
			}
		}
		else {
			this.lbRank.text = TextsConfig.TextsConfig_WonderlandBoss.killer;
		}
		this.setList();
	}
	private setList() {
		if (this.boold) {
			if (this.info[2].length <= 4) { }
			this.arrayCollection1 = new eui.ArrayCollection();
			for (let i = 0; i < this.info[2].length; i++) {
				this.arrayCollection1.addItem({
					i,
					info: this.info[2][i],
					boold: this.boold,
					father: this.data.father
				});
			}
			this.lstItem.itemRenderer = ZorkBossMainAwardItem;
			this.lstItem.dataProvider = this.arrayCollection1;
		}
		else {
			this.arrayCollection1 = new eui.ArrayCollection();
			for (let i = 0; i < this.info.length; i++) {
				this.arrayCollection1.addItem({
					i,
					info: this.info[i],
					boold: this.boold,
					father: this.data.father
				});
			}
			this.lstItem.itemRenderer = ZorkBossMainAwardItem;
			this.lstItem.dataProvider = this.arrayCollection1;
		}
	}
}
}