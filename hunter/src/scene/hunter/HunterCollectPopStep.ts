namespace zj {
export class HunterCollectPopStep extends Dialog {
	private father: eui.Group;
	private imgFrame: eui.Image;
	private imgIcon: eui.Image;
	private imgStarBackground: eui.Image;
	private groupStepStar: eui.Group;
	private imgStepStar: eui.Image;
	private father0: eui.Group;
	private imgFrame0: eui.Image;
	private imgIcon0: eui.Image;
	private imgStarBackground0: eui.Image;
	private groupStepStar0: eui.Group;
	private imgStepStar0: eui.Image;
	private father1: eui.Group;
	private imgFrame1: eui.Image;
	private imgIcon1: eui.Image;
	private imgStarBackground1: eui.Image;
	private groupStepStar1: eui.Group;
	private imgStepStar1: eui.Image;
	private father2: eui.Group;
	private imgFrame2: eui.Image;
	private imgIcon2: eui.Image;
	private imgStarBackground2: eui.Image;
	private groupStepStar2: eui.Group;
	private imgStepStar2: eui.Image;

	private dragdisplay: dragonBones.EgretArmatureDisplay;
	private spineState: dragonBones.AnimationState
	private visbale: boolean = false;
	/**回调方法 */
	private callback: () => void;
	private id: number;
	private index: number;
	private generalId: number;
	private fatherfather;
	private imgscore: String;
	public constructor() {
		super();
		this.skinName = "resource/skins/hunter/HunterCollectPopStepSkin.exml";
		this.init();
	}
	private init() {
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enter, this);
			this.father = null;
			egret.Tween.removeTweens(this);
		}, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.enter, this);
	}

	private enter() {
		if (this.spineState) {
			let fr = this.spineState.animationData.frameCount * (this.spineState.currentTime / this.spineState.totalTime);
			if (Math.floor(fr) > 60 && this.visbale == true) {
				let slot = this.dragdisplay.armature.getSlot("001_daoju");
				let display = this.father2;
				if (slot && display) {
					if (display.parent) display.parent.removeChild(display);
					slot.setDisplay(display);
				}
				this.visbale = false;
			}
		}
	}

	public setInfo(id: number, index: number, generalId: number, father, cb: () => void) {
		this.callback = cb;
		this.id = id;
		this.index = index;
		this.generalId = generalId;
		this.fatherfather = father;
		this.imgIcon.source = cachekey(TableGeneralEquip.Item(this.id).equip_icon, this);
		let step = 0;
		let equipInfo = Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
		for (let kk in equipInfo) {
			if (equipInfo.hasOwnProperty(kk)) {
				let vv = equipInfo[kk];
				if (vv.equipId == id) {
					step = vv.step;
				}
			}
		}

		this.imgFrame.source = cachekey(UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1], this);
		let paths = null;
		let bones = null;
		paths = [
			TableGeneralEquip.Item(this.id).equip_icon,
			TableGeneralEquip.Item(this.id).equip_icon,
			TableGeneralEquip.Item(this.id).equip_icon,
		];

		bones = [
			"001_daoju_gaoguang",
			"001_daoju_heise",
			"001_daoju",
		];
		cachekeys([paths[0], paths[1], paths[2]], this);
		let image = new eui.Image(paths[0]);
		image.width = image.height = 120;
		image.anchorOffsetX = image.width / 2;
		image.anchorOffsetY = image.height / 2;
		let image1 = new eui.Image(paths[0]);
		image1.width = image1.height = 100;
		Helper.SetImageFilterColor(image1, "black");
		image1.anchorOffsetX = image1.width / 2;
		image1.anchorOffsetY = image1.height / 2;
		let image2 = new eui.Image(paths[0]);
		image2.width = image2.height = 150;
		image2.anchorOffsetX = image2.width / 2;
		image2.anchorOffsetY = image2.height / 2;
		if (index == 1) {
			Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_eff", null, [image, image1, image2], ["001_daoju_gaoguang", "001_daoju_heise", "001_daoju"])
				.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
					armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
						if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);

					}, this)
					// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
					// 	armatureDisplay.animation.stop();
					// 	armatureDisplay.animation.reset();
					// 	armatureDisplay.armature.dispose();
					// 	armatureDisplay.dbClear();
					// 	armatureDisplay.dispose(true);
					// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
					// }, null);
					armatureDisplay.animation.play("000_jihuo", 1);
					armatureDisplay.x = this.width * 0.5;
					armatureDisplay.y = this.height * 0.5;
					this.addChild(armatureDisplay);
				});

			egret.Tween.get(this).wait(1500).call(() => {
				this.removeEventListener(egret.Event.ENTER_FRAME, this.enter, this);
				this.close(UI.HIDE_TO_TOP);
				egret.Tween.get(this).wait(300).call(() => {
					this.callback();
				});
			});
		} else {
			this.father.visible = false;
			this.father0.visible = true;
			this.father1.visible = true;

			this.imgStepStar0.source = cachekey(UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 2], this);
			this.imgStepStar1.source = cachekey(UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1], this);
			this.imgStepStar2.source = cachekey(UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1], this);
			this.imgStarBackground0.source = cachekey(UIConfig.UIConfig_Hunter_Equip.frameBoard[Math.floor((step - 1) / 5)], this);
			this.imgStarBackground1.source = cachekey(UIConfig.UIConfig_Hunter_Equip.frameBoard[Math.floor((step - 1) / 5)], this);
			this.imgStarBackground2.source = cachekey(UIConfig.UIConfig_Hunter_Equip.frameBoard[Math.floor((step - 1) / 5)], this);
			let stepone = 0;
			for (var kk in Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo) {
				if (Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo.hasOwnProperty(kk)) {
					var vv = Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo[kk];
					if (vv.equipId == id) {
						stepone = vv.step;
					}
				}
			}
			let skillLevelNumber;
			if (this.fatherfather.index != 3) {
				if (step < 5) {
					skillLevelNumber = 1;
				} else {
					skillLevelNumber = Math.floor((step - 1) / 5) + 1;
				}
			}
			this.imgIcon0.source = cachekey(TableGeneralEquip.Item(this.id).equip_icon, this);

			if (step < 5) {
				skillLevelNumber = 1;
			} else {
				skillLevelNumber = Math.floor((step - 2) / 5) + 1;
			}

			if (this.fatherfather.index == 2) {
				this.imgFrame0.source = cachekey(UIConfig.UIConfig_Hunter_Equip.Speical_Frame[skillLevelNumber], this);
			} else {
				this.imgFrame0.source = cachekey(UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber], this);
			}

			this.imgIcon1.source = cachekey(TableGeneralEquip.Item(this.id).equip_icon, this);
			this.imgIcon2.source = cachekey(TableGeneralEquip.Item(this.id).equip_icon, this);
			if (step < 5) {
				skillLevelNumber = 1;
			} else {
				skillLevelNumber = Math.floor((step - 1) / 5) + 1;
			}

			if (this.fatherfather.index == 2) {
				this.imgFrame1.source = cachekey(UIConfig.UIConfig_Hunter_Equip.Speical_Frame[skillLevelNumber], this);
				this.imgFrame2.source = cachekey(UIConfig.UIConfig_Hunter_Equip.Speical_Frame[skillLevelNumber], this);
			} else {
				this.imgFrame1.source = cachekey(UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber], this);
				this.imgFrame2.source = cachekey(UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber], this);
			}




			Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_eff", null, [this.father0, this.father1], ["001_daoju", "001_daoju_gaoguang"])
				.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
					this.visbale = true;
					armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
						if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);

					}, this)
					// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
					// 	armatureDisplay.animation.stop();
					// 	armatureDisplay.animation.reset();
					// 	armatureDisplay.armature.dispose();
					// 	armatureDisplay.dbClear();
					// 	armatureDisplay.dispose(true);
					// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
					// }, null);
					this.dragdisplay = armatureDisplay;
					this.spineState = armatureDisplay.animation.play("000_qianghua", 2);
					armatureDisplay.x = this.width * 0.5;
					armatureDisplay.y = this.height * 0.5;
					this.addChild(armatureDisplay);
				});

			egret.Tween.get(this).wait(1500).call(() => {
				this.removeEventListener(egret.Event.ENTER_FRAME, this.enter, this);
				this.close(UI.HIDE_TO_TOP);
				egret.Tween.get(this).wait(300).call(() => {
					this.callback();
				});
			});
		}


	}
}

}