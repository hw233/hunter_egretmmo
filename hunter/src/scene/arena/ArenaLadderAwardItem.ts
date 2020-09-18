namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-1-25
 * 
 * @class 奖励说明list界面
 */
export class ArenaLadderAwardItem extends eui.ItemRenderer {
	private groupCache: eui.Group;
	private lbRank: eui.Label;
	private lstItem0: eui.List;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemSkin1.exml";
		cachekeys(<string[]>UIResource["ArenaLadderAwardItem"], null);
	}

	protected dataChanged() {
		closeCache(this.groupCache);
		let data1 = this.data as ArenaLadderAwardItemData;
		let min = data1.info.rank_min;
		let max = data1.info.rank_max;

		if (min == max - 1) {
			this.lbRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank_interval[1], max);
		} else {
			this.lbRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank_interval[2], min + 1, max)
		}

		let array = new eui.ArrayCollection();
		for (let i = 0; i < data1.info.reward_goods.length; i++) {
			let data = new ArenaLadderAwardItemBData();
			data.goodsId = data1.info.reward_goods[i];
			data.count = data1.info.reward_count[i];
			data.index = i;
			data.father = this;
			array.addItem(data);
		}

		this.lstItem0.dataProvider = array;
		this.lstItem0.itemRenderer = ArenaLadderAwardItemB;
		setCache(this.groupCache);
	}
}
export class ArenaLadderAwardItemData {
	info;
	father: ArenaLadderAward;
}
}