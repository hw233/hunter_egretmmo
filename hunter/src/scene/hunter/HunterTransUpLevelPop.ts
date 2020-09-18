namespace zj {
	/**
	 * @author xingliwei
	 * 
	 * @date 2019-7-29
	 * 
	 * @class 猎人技能
	 */
	export class HunterTransUpLevelPop extends Dialog {
		public groupHunter1: eui.Group;
		public imgBoard1: eui.Image;
		public imgIcon1: eui.Image;
		public imgTransformLvNum1: eui.Image;
		public groupHunter2: eui.Group;
		public imgBoard2: eui.Image;
		public imgIcon2: eui.Image;
		public imgTransformLvNum2: eui.Image;
		public groupAni: eui.Group;

		public constructor() {
			super();
			this.skinName = "resource/skins/hunter/HunterTransUpLevelPopSkin.exml";
		}

		public SetInfo(skillId, level, father, cb) {
			this.imgIcon1.source = TableGeneralTalent.Item(skillId).path;
			this.imgIcon2.source = TableGeneralTalent.Item(skillId).path;

			this.imgTransformLvNum1.source = UIConfig.UIConfig_Activity_Battle.skill_level[level - 1];
			this.imgTransformLvNum2.source = UIConfig.UIConfig_Activity_Battle.skill_level[level];

			let paths = [
				this.groupHunter1,
				this.groupHunter2,
			];

			let bones = [
				"001_daoju",
				"001_daoju_gaoguang",
			];

			let thisOne = this;
			Game.DragonBonesManager.getAnimationWithBindImages(this, "bianshen_eff", null, paths, bones)
				.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
					armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
						if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
					}, thisOne)
					// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
					// 	armatureDisplay.animation.stop();
					// 	armatureDisplay.animation.reset();
					// 	armatureDisplay.armature.dispose();
					// 	armatureDisplay.dbClear();
					// 	armatureDisplay.dispose(true);
					// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
					// }, thisOne);
					armatureDisplay.animation.play("000_qianghua", 1);
					thisOne.groupAni.addChild(armatureDisplay);
				});

			egret.Tween.get(this).wait(1500).call(() => {
				this.close(UI.HIDE_TO_TOP);
				egret.Tween.get(this).wait(300).call(() => {
					cb();
					father.FreshGeneral()
				});
			})
		}
	}

}