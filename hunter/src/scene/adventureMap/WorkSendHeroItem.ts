namespace zj {
	/**
	 * @class 工作派遣猎人Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-10
	 */
	export class WorkSendHeroItem extends eui.ItemRenderer {
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private groupStar: eui.Group;
		private imgQuality: eui.Image;
		private imgSel: eui.Image;
		private groupAni: eui.Group;

		public constructor() {
			super();
			this.skinName = "resource/skins/adventureMap/WorkSendHeroItemSkin.exml";
			cachekeys(<string[]>UIResource["WorkSendHeroItem"], null);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: WorkSendHeroItemData) {
			if (data.generalInfo == null) return;
			let baseInfo = PlayerHunterSystem.Table(data.generalInfo.general_id);
			this.imgFrame.source = cachekey(PlayerHunterSystem.Frame(data.generalInfo.general_id), this);
			this.imgIcon.source = cachekey(PlayerHunterSystem.Head(data.generalInfo.general_id), this);
			Helper.SetHeroAwakenStar(this.groupStar, data.generalInfo.star, data.generalInfo.awakePassive.level);
			this.imgQuality.source = cachekey(UIConfig.UIConfig_General.hunter_grade[Game.PlayerHunterSystem.Table(data.generalInfo.general_id).aptitude], this);
			this.imgSel.visible = data.isSel;
			this.imgFrame.horizontalCenter = 0;
			if (this.imgIcon.source == "hero_icon_head_gw_moguguai_png") this.imgFrame.horizontalCenter = -2;
			// if (this.selected) {
			// 	if (!this.groupAni.getChildByName("selAni")) this.addAnimation();
			// }
			// else {
			// 	let ani = this.groupAni.getChildByName("selAni");
			// 	if (ani) this.groupAni.removeChild(ani);
			// }
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

	export class WorkSendHeroItemData {
		generalInfo: message.GeneralInfo;
		isSel: boolean;
	}
}