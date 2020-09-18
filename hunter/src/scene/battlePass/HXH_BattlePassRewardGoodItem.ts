namespace zj {
	/**
	 * @class 通行证主界面奖励UI 每十级奖励Item
	 * 
	 * @author lianlei
	 * 
	 * @date 2019-11-21
	 */
	export class HXH_BattlePassRewardGoodItem extends eui.ItemRenderer {
		private scrollerView: eui.Scroller;
		private listView: eui.List;

		private listViewData: eui.ArrayCollection = new eui.ArrayCollection();

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassRewardGoodItemSkin.exml";
			cachekeys(<string[]>UIResource["HXH_BattlePassRewardGoodItem"], null);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: HXH_BattlePassRewardGoodItemData) {
			let rewardList: Array<TablePermitReward> = [];
			let season = Math.floor((Set.TimeFormatBeijing().getMonth()) + 1);
			let tblInfo = TablePermitReward.Table();
			for (const key in tblInfo) {
				if (tblInfo.hasOwnProperty(key)) {
					const element = tblInfo[key];
					if (element.season == season) rewardList.push(element);
				}
			}
			rewardList.sort((a, b) => { return a.level - b.level; });

			let info: TablePermitReward = null;
			for (let j = 0; j < rewardList.length; j++) {
				if (rewardList[j].level == data.level) {
					info = rewardList[j];
					break;
				}
			}

			this.listViewData.removeAll();
			for (let i = 0; i < 1; i++) {
				let itemData = new HXH_BattlePassRewardItemData();
				itemData.index = data.level;
				itemData.high = true;
				itemData.info = info;
				this.listViewData.addItem(itemData);
			}
			this.listView.dataProvider = this.listViewData;
			this.listView.itemRenderer = HXH_BattlePassRewardItem;
		}
	}

	export class HXH_BattlePassRewardGoodItemData {
		level: number;
	}
}