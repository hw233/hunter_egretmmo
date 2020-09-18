namespace zj {
	/**
	 * @class 卡片注入念力 注入方式Item
	 * 
	 * @author LianLei
	 * 
	 * @date 
	 */
	export class HXH_HunterStrengMainAddItem extends eui.ItemRenderer {

		private imgFloor: eui.Image;
		private imgMark: eui.Image;
		private imgSelect: eui.Image;
		private imgBigonName: eui.Image;
		private groupMeterials: eui.Group;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private imgAddSkillMeterials: eui.Image;
		private labelName: eui.Label;

		private goodsId: number;
		private count: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/card/HXH_HunterStrengMainAddItemSkin.exml";

			this.imgAddSkillMeterials.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddMeterials, this);

			cachekeys(<string[]>UIResource["HXH_HunterStrengMainAddItem"], null);

			this.imgSelect.visible = false;
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: HXH_HunterStrengMainAddItemData) {
			this.goodsId = data.goodsId;
			this.count = data.count;

			if (data.goodsId != 0) {
				let itemSet = PlayerItemSystem.Set(data.goodsId) as any;
				let curCount = Game.PlayerItemSystem.itemCount(data.goodsId);
				this.imgFrame.source = cachekey(itemSet.Frame, this);
				this.imgIcon.source = cachekey(itemSet.Path, this);

				if (curCount >= data.count) {
					this.labelName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_up_have, curCount, data.count));
					this.imgAddSkillMeterials.visible = false;
				}
				else {
					this.labelName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_up_no, curCount, data.count));
					this.imgAddSkillMeterials.visible = true;
				}

				// this.groupMeterials.visible = curCount < data.count;
			}

			this.imgFloor.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_Enchant_board[data.id], this);
			this.imgMark.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_Enchant_name[data.id], this);

			this.imgSelect.visible = this.selected;
			this.imgBigonName.visible = this.selected;

		}

		private onBtnAddMeterials() {
			if (this.goodsId != 0) {
				let itemSet = PlayerItemSystem.Set(this.goodsId) as any;
				let curCount = Game.PlayerItemSystem.itemCount(this.goodsId);

				if (curCount < this.count) {
					loadUI(Common_OutPutDialog).then((dialog: Common_OutPutDialog) => {
						dialog.setInfo(this.goodsId, this);
						dialog.show(UI.SHOW_FROM_TOP);
					});
				}
			}
		}
	}

	export class HXH_HunterStrengMainAddItemData {
		id: number;
		goodsId: number;
		count: number;
	}
}