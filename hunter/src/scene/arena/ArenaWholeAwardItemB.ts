namespace zj {
	/**
	 * @author xing li wei
	 * 
	 * @date 2019-1-25
	 * 
	 * @class 奖励说明list的List子项
	 */
	export class ArenaWholeAwardItemB extends eui.ItemRenderer {
		private listAward: eui.List;
		private labelRankNumber: eui.BitmapLabel;

		public constructor() {
			super();
			this.skinName = "resource/skins/arena/ArenaWholeAwardItemBSkin.exml";
			cachekeys(<string[]>UIResource["ArenaWholeAwardItemB"], null);
		}

		protected dataChanged() {
			let data = this.data as ArenaWholeAwardItemBData;
			if (data.info.min == data.info.max) {
				this.labelRankNumber.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank_interval[1], data.info.min);
			} else {
				this.labelRankNumber.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank_interval[2], data.info.min, data.info.max);
			}
			let canMove = data.info.good.length > 5;
			let array = new eui.ArrayCollection();
			for (let i = 0; i < data.info.good.length; i++) {
				let data1 = new ArenaWholeAwardItemItemData();
				data1.father = this;
				data1.info = data.info.good[i];
				data.index = i;
				array.addItem(data1);
			}
			this.listAward.dataProvider = array;
			this.listAward.itemRenderer = ArenaWholeAwardItemItem;
		}

	}
	export class ArenaWholeAwardItemBData {
		index: number;
		info;
		forcur: boolean;
		father: ArenaWholeAward;
	}
}