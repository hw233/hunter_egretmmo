namespace zj {
	/**
	 * @class 卡片注入念力副属性Item
	 * 
	 * @author LianLei
	 * 
	 * @date 
	 */
	export class CardStrengthenMainItem extends eui.ItemRenderer {
		private btnGetAward: eui.Group;
		private imgBigonName: eui.Image;
		private labelName: eui.Label;

		public constructor() {
			super();
			this.skinName = "resource/skins/card/CardStrengthenMainItemSkin.exml";

			cachekeys(<string[]>UIResource["CardStrengthenMainItem"], null);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: CardStrengthenMainItemData) {
			let growthValue = null;
			let _type = null;
			let attriId = data.cardInfo.add_attri[data.index].attriId;

			if (Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][0] != 0) { // range_growth 增幅范围
				growthValue = data.cardInfo.add_attri[data.index].growthValue;
				if (growthValue <= Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
					_type = 1;
				}
				else {
					_type = 2;
				}
			}

			let addStr = PlayerCardSystem.GetAddStr(data.cardInfo, growthValue, _type);
			this.labelName.textFlow = Util.RichText(addStr[data.index][0]);

			this.imgBigonName.visible = this.selected;
		}
	}

	export class CardStrengthenMainItemData {
		index: number;
		cardInfo: message.PotatoInfo;
	}
}