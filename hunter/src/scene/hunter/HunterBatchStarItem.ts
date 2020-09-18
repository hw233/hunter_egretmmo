namespace zj {
	/**
	  * @author xingliwei
	  * 
	  * @date 2019-11-4
	  * 
	  * @class 猎人批量升星Item
	  */
	export class HunterBatchStarItem extends eui.ItemRenderer {
		private imgBg: eui.Image;
		private groupAll: eui.Group;
		private imgFame: eui.Image;
		private imgIcon: eui.Image;
		private labelLevel: eui.BitmapLabel;
		private groupStar: eui.Group;
		private imgIconGrade: eui.Image;
		private imgduigou: eui.Image;

		public constructor() {
			super();
			this.skinName = "resource/skins/hunter/HunterBatchStarItemSkin.exml";
			cachekeys(<string[]>UIResource["HunterBatchStarItem"], null);
		}

		protected dataChanged() {
			let data = this.data as HunterBatchStarItemData;
			if (data.info.general_id == 0) {
				this.groupAll.visible = false;
			} else {
				this.groupAll.visible = true;
				let framePath = PlayerHunterSystem.Frame(data.info.general_id);
				let iconPath = PlayerHunterSystem.Head(data.info.general_id);
				this.imgFame.source = cachekey(framePath, this);
				this.imgIcon.source = cachekey(iconPath, this);
				let baseGeneralInfo = PlayerHunterSystem.Table(data.info.general_id);
				let gradePath = UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude];
				this.imgIconGrade.source = cachekey(gradePath, this);
				Helper.SetHeroAwakenStar(this.groupStar, data.info.star, data.info.awakePassive.level);
				this.labelLevel.text = data.info.level.toString();
			}
			if (data.vis == false) {
				this.imgduigou.visible = false;
			}
		}
	}

	export class HunterBatchStarItemData {
		info: message.GeneralInfo;
		vis: boolean = true;
	}
}
