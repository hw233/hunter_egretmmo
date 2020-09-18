namespace zj {
//公会战段位奖励表
//yuqingchao
export class LeagueUnionRewarPreviewItem extends eui.ItemRenderer {
	private lbLimit: eui.Label;
	private imgSegment: eui.Image;

	private lstItem: eui.List;
	private arrCollection: eui.ArrayCollection;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemSkin.exml";
		cachekeys(<string[]>UIResource["LeagueUnionRewarPreviewItem"], null);
		this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.listItem, this);

	}
	protected dataChanged() {
		let i = this.data.i;
		let father0 = this.data.father
		let tbScore = Game.ConfigManager.getTable(StringConfig_Table.leagueMatchScore + ".json");		//公会战段位奖励表
		this.lbLimit.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Contend.matchScore, tbScore[i].score_min) + "以上";
		this.imgSegment.source = cachekey(UIConfig.UIConfig_Union.segmentLogo[i - 1], this);

		this.loadList(i, father0);
	}

	private loadList(i, father) {
		let tbScore = Game.ConfigManager.getTable(StringConfig_Table.leagueMatchScore + ".json");
		this.arrCollection = new eui.ArrayCollection();
		for (let j = 0; j < Object.keys(tbScore[i].daily_reward).length; j++) {
			this.arrCollection.addItem({
				i,
				reward: tbScore[i].daily_reward,
				j,
				father
			})
		}

		this.lstItem.itemRenderer = LeagueUnionRewarPreviewItemItem;
		this.lstItem.dataProvider = this.arrCollection;
	}

	private listItem() {

	}
}
}