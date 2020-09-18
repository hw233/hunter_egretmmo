namespace zj {
	/**
	 * 2019.11.22
	 * xingliwei
	 * @class 公会技能Item 
	 */
	export class LeagueSkillItem extends eui.ItemRenderer {
		public imgIcon: eui.Image;
		public imgIconbg: eui.Image;
		public labelName: eui.Label;
		public labelBonuses: eui.Label;
		public constructor() {
			super();
			this.skinName = "resource/skins/league/LeagueSkillItemSkin.exml";
			cachekeys(<string[]>UIResource["LeagueSkillItem"], null);
			this.imgIcon.mask = this.imgIconbg;
		}

		protected dataChanged() {
			let data = this.data as LeagueSkillItemData;
			this.labelName.text = data.info[2];
			let a = data.info[1] as number;
			if (data.info[3] == 24) {
				this.labelBonuses.text = "+" + a.toFixed(1);
			} else {
				this.labelBonuses.text = "+" + a.toFixed(1) + "%";
			}

			this.imgIcon.source = cachekey(data.father.getimg(data.info[0]), this);
		}
	}

	export class LeagueSkillItemData {
		index: number;
		info;
		father: LeagueSkill;
	}
} 