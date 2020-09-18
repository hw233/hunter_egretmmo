namespace zj {
	/**
	 * 卡片强化信息
	 * created by Lian Lei
	 * 2018.11.27
	 */
	export class CardStrengthen extends UI {
		private labelCurrentLevel: eui.Label;
		private labelNextLevel: eui.Label;
		private labelCurrentAtt: eui.Label;
		private labelNextAtt: eui.Label;
		private scrollerAttri: eui.Scroller;
		private listAttri: eui.List;
		private groupYinCang: eui.Group;
		private groupUpStar: eui.Group;
		private labelYinCang: eui.Label;
		private labelYinCang1: eui.Label;
		private btnGoUpStar: eui.Button;
		private groupBreak: eui.Group;
		private labelYinCang2: eui.Label;
		private labelYinCang3: eui.Label;
		private btnGoBreak: eui.Button;
		private groupUpLevel: eui.Group;
		private btnStrengthenUp: eui.Button;
		private labelStrengthenNum: eui.Label;
		private btnStrengthenFiveNum: eui.Button;
		private labelStrengthenFiveNum: eui.Label;
		private bitmapStrengthenFiveTime: eui.BitmapLabel;

		private cardStrengthenMain: CardStrengthenMain;

		private cardInfo: message.PotatoInfo;
		private callback: (isRefresh: boolean, isBreak: boolean) => void;
		private listAttriData: eui.ArrayCollection = new eui.ArrayCollection();

		public constructor() {
			super();
			this.skinName = "resource/skins/card/CardStrengthenSkin.exml";
			this.btnStrengthenFiveNum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStrengthenFive, this);
			this.btnStrengthenUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStrengthenUp, this);
			this.btnGoBreak.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoBreak, this);
			this.btnGoUpStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoUpStar, this);
		}

		public setInfo(info: message.PotatoInfo, cb?: (isRefresh: boolean, isBreak: boolean) => void) {
			this.cardInfo = info;
			this.callback = cb;

			this.refresh();
		}

		// 初始化(刷新)当前强化卡片信息
		private refresh() {
			this.cardInfo = PlayerCardSystem.RefreshCard(this.cardInfo);

			let baseStr = PlayerCardSystem.GetCardBaseAttri(this.cardInfo.id, this.cardInfo.star, this.cardInfo.level);

			if (this.cardInfo.break_level != 0) {
				this.labelCurrentLevel.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_level_level_before, this.cardInfo.level, CommonConfig.card_star_max_level[this.cardInfo.star - 1] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level));
			}
			else {
				this.labelCurrentLevel.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_level_level_before, this.cardInfo.level, CommonConfig.card_star_max_level[this.cardInfo.star - 1]));
			}

			this.labelCurrentAtt.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_level_attr_before, baseStr[0][0]));
			if (this.cardInfo.break_level != 0 && this.cardInfo.level + 1 > (CommonConfig.card_star_max_level[this.cardInfo.star - 1] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level)) {
				this.labelNextLevel.textFlow = Util.RichText("" + TextsConfig.TextsConfig_Hunter.card_level_max);
				this.labelNextAtt.textFlow = Util.RichText("" + TextsConfig.TextsConfig_Hunter.card_level_attr_max);
			}
			else if (this.cardInfo.break_level != 0 && this.cardInfo.level + 1 <= (CommonConfig.card_star_max_level[this.cardInfo.star - 1] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level)) {
				this.labelNextLevel.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_level_level_after, this.cardInfo.level + 1, CommonConfig.card_star_max_level[this.cardInfo.star - 1] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level));
				this.labelNextAtt.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_level_attr_after, PlayerCardSystem.GetCardBaseAttri(this.cardInfo.id, this.cardInfo.star, this.cardInfo.level + 1)[0][0]));
			}
			else if (this.cardInfo.level + 1 > CommonConfig.card_star_max_level[this.cardInfo.star - 1]) {
				this.labelNextLevel.textFlow = Util.RichText("" + (TextsConfig.TextsConfig_Hunter.card_level_max));
				this.labelNextAtt.textFlow = Util.RichText("" + (TextsConfig.TextsConfig_Hunter.card_level_attr_max));
			}
			else {
				this.labelNextLevel.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_level_level_after, this.cardInfo.level + 1, CommonConfig.card_star_max_level[this.cardInfo.star - 1]));
				this.labelNextAtt.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_level_attr_after, PlayerCardSystem.GetCardBaseAttri(this.cardInfo.id, this.cardInfo.star, this.cardInfo.level + 1)[0][0]));
			}

			let addStr = PlayerCardSystem.GetAddStr(this.cardInfo);

			this.listAttriData.removeAll();
			for (let i = 0; i < addStr.length; i++) {
				let itemData = new CardAttriItemData();
				itemData.index = i;
				itemData.info = addStr[i];
				itemData.cardInfo = this.cardInfo;
				itemData.width = this.scrollerAttri.width;
				itemData.addStrlength = addStr.length;
				itemData.type = 0;
				this.listAttriData.addItem(itemData);
			}
			this.listAttri.dataProvider = this.listAttriData;
			this.listAttri.itemRenderer = CardAttriItem;

			this.labelStrengthenNum.textFlow = Util.RichText("" + CommonConfig.potato_uplevel_comsume_money(this.cardInfo.star, this.cardInfo.level));

			let times = null;
			if (this.cardInfo.break_level != 0 && (CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level) <= 5) {
				times = CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level;
			}
			else if (this.cardInfo.break_level != 0 && (CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level > 5)) {
				times = 5;
			}
			else {
				times = (CommonConfig.card_star_max_level[this.cardInfo.star - 1] - this.cardInfo.level) > 5 ? 5 : (CommonConfig.card_star_max_level[this.cardInfo.star - 1] - this.cardInfo.level);
			}

			this.bitmapStrengthenFiveTime.text = "" + times;
			this.labelStrengthenFiveNum.textFlow = Util.RichText("" + (this.getCostMoney(this.cardInfo.star, this.cardInfo.level, times)));

			this.groupYinCang.visible = true;
			this.groupUpLevel.visible = (this.cardInfo.level < CommonConfig.card_star_max_level[this.cardInfo.star - 1] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level ? true : false);
			this.groupUpStar.visible = (this.cardInfo.level >= CommonConfig.card_star_max_level[this.cardInfo.star - 1] && this.cardInfo.level < CommonConfig.card_star_max_level[5] ? true : false);
			this.groupBreak.visible = (this.cardInfo.level == CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level ? true : false);

			this.labelYinCang.text = LANG("已强化至当前品质最大等级");
			this.labelYinCang1.text = LANG("升星可增加等级上限");
			this.labelYinCang2.text = LANG("已强化至当前品质最大等级");
			this.labelYinCang3.text = LANG("突破可增加等级上限");
		}

		// 强化卡片所需金币
		private getCostMoney(star, level, upLevel) {
			let sum = 0;
			for (let i = 0; i < upLevel; i++) {
				sum = sum + CommonConfig.potato_uplevel_comsume_money(star, level + i);
			}
			return sum;
		}

		// 强化一次
		private onBtnStrengthenUp() {
			Game.PlayerCardSystem.potatoUplevel(this.cardInfo.index, 1, this.cardInfo.pos).then((value: {}) => {
				toast(TextsConfig.TextsConfig_Hunter_Card.uplevel_success);
				if (this.callback) {
					this.callback(true, false);
				}
				this.refresh();
			}).catch((reason) => { });
		}

		// 强化五次
		private onBtnStrengthenFive() {
			let times: number = null;
			if (this.cardInfo.break_level != 0 && (CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level) <= 5) {
				times = CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level;
			}
			else if (this.cardInfo.break_level != 0 && (CommonConfig.card_star_max_level[5] + CommonConfig.card_break_add_max_level * this.cardInfo.break_level - this.cardInfo.level) > 5) {
				times = 5;
			}
			else {
				times = (CommonConfig.card_star_max_level[this.cardInfo.star - 1] - this.cardInfo.level > 5 ? 5 : CommonConfig.card_star_max_level[this.cardInfo.star - 1] - this.cardInfo.level);
			}

			Game.PlayerCardSystem.potatoUplevel(this.cardInfo.index, times, this.cardInfo.pos).then(() => {
				toast(TextsConfig.TextsConfig_Hunter_Card.uplevel_success);
				if (this.callback) {
					this.callback(true, false);
				}
				this.refresh();
			});
		}

		// 前往升星
		private onBtnGoUpStar() {
			if (this.cardInfo != null) {
				if (this.cardInfo.star < CommonConfig.card_max_star) {
					loadUI(CardUpStarNewDialog).then((dialog: CardUpStarNewDialog) => {
						dialog.setInfo(this.cardInfo, () => {
							if (this.callback) this.callback(true, false);
							this.refresh();
						});
						dialog.show(UI.SHOW_FROM_TOP);
					});
				}
				else {
					toast(TextsConfig.TextsConfig_Hunter.card_level_max);
				}
			}
		}

		// 前往突破
		private onBtnGoBreak() {
			if (this.cardInfo.break_level < CommonConfig.card_break_through_max_level && this.cardInfo.level >= CommonConfig.card_star_max_level[5]) {
				if (this.callback) {
					this.callback(true, true);
				}

			}
			else if (this.cardInfo.break_level == CommonConfig.card_break_through_max_level) {
				toast_warning(TextsConfig.TextsConfig_Hunter.card_break_level_max);
			}
		}
	}

}