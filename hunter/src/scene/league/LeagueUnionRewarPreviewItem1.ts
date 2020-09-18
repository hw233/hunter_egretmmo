namespace zj {
//公会战排位奖励表
//yuqingchao
export class LeagueUnionRewarPreviewItem1 extends eui.ItemRenderer {
	private lbRank: eui.Label;
	private arrCollection: eui.ArrayCollection;
	private lstItem0: eui.List;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemSkin1.exml";
	}

	protected dataChanged() {
		let i = this.data.i + 1;
		let father0 = this.data.father;
		let tbRank = Game.ConfigManager.getTable(StringConfig_Table.leagueMatchRank + ".json");		//公会战段位奖励表
		if (tbRank[i].rank_max - tbRank[i].rank_min == 1)
			this.lbRank.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Contend.mineRank, tbRank[i].rank_max);
		else
			this.lbRank.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Contend.mineRank, tbRank[i].rank_min + 1 + "-" + tbRank[i].rank_max);

		this.loadList(i,father0);
	}

	private loadList(i,father) {
		let tbRank = Game.ConfigManager.getTable(StringConfig_Table.leagueMatchRank + ".json");
		this.arrCollection = new eui.ArrayCollection();
		for (let j = 0; j < Object.keys(tbRank[i].local_rank_reward).length; j++) {
			this.arrCollection.addItem({
				i,
				reward: tbRank[i].local_rank_reward,
				j,
				father
			})
		}

		this.lstItem0.itemRenderer = LeagueUnionRewarPreviewItemItem;
		this.lstItem0.dataProvider = this.arrCollection;
	}
}

}