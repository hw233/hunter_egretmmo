namespace zj {
//Activity_BossMainPopItem
//yuqingchao
// 2019.07.16
export class Activity_BossMainPopItem extends eui.ItemRenderer {
	private lbRank: eui.Label;			//排名
	private lstViewReward: eui.List;
	private scrollerReward: eui.Scroller;
	private arrReward: eui.ArrayCollection;
	private index: number = 0;
	private info: any = null;
	private num: number = 0;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/Activity_BossMainPopItemSkin.exml";
	}
	protected dataChanged() {
		this.index = this.data.i;
		this.info = this.data.info;
		this.num = this.data.lth;

		if (this.info.rankZone[1] - this.info.rankZone[0] == 1) {
			this.lbRank.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank1, this.info.rankZone[1]);
		} else if (this.index == this.num) {
			this.lbRank.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank3, this.info.rankZone[0]);
		} else {
			this.lbRank.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank2, this.info.rankZone[0] + 1, this.info.rankZone[1]);
		}

		this.SetList()
	}
	private SetList() {
		if (this.info.goodsInfo.length <= 4) {
			this.scrollerReward.scrollPolicyH = "off";
		}
		this.arrReward = new eui.ArrayCollection();
		for (let i = 0; i < this.info.goodsInfo.length; i++) {
			this.arrReward.addItem({
				info: this.info.goodsInfo[i],
				boold: false,
			});
		}
		this.lstViewReward.dataProvider = this.arrReward;
		this.lstViewReward.itemRenderer = ZorkBossMainAwardItem;
	}
}
}