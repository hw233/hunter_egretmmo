namespace zj {
	/**
	 * @class 猎人传记Hero Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-10-24
	 */
	export class BiographyHeroItem extends eui.ItemRenderer {
		private imgIcon: eui.Image;
		private imgQuality: eui.Image;
		private imgGet: eui.Image;
		private groupAni: eui.Group;
		private imgSel: eui.Image;

		public constructor() {
			super();
			this.skinName = "resource/skins/biography/BiographyHeroItemSkin.exml";
			cachekeys(<string[]>UIResource["BiographyHeroItem"], null);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: BiographyHeroItemData) {
			let bHaveHero = Table.FindK(Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), data.info.general_id) != -1;
			this.imgGet.visible = bHaveHero;
			if (!bHaveHero) {
				Helper.SetImageFilterColor(this.imgIcon, "gray");
			}
			else {
				Helper.SetImageFilterColor(this.imgIcon);
			}
			this.imgIcon.source = cachekey(data.info.head_path, this);
			this.imgQuality.source = cachekey(UIConfig.UIConfig_General.hunter_grade[data.info.aptitude], this);

			if (this.selected) {
				// if (!this.groupAni.getChildByName("selAni")) {
				// 	this.addAnimation();
				// }
				this.imgSel.visible = true;
			}
			else {
				// let ani = this.groupAni.getChildByName("selAni");
				// if (ani) this.groupAni.removeChild(ani);
				this.imgSel.visible = false;
			}
		}

		private addAnimation() {
			Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0).then(display => {
				display.name = "selAni";
				this.groupAni.addChild(display);
			}).catch(reason => {
				toast(reason);
			});
		}
	}

	export class BiographyHeroItemData {
		info: TableSpgeneralInformation;
		index: number;
	}
}