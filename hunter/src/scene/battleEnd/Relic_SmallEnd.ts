namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-4-30
 * 
 * @class 遗迹探索胜利中场界面
 */
export class Relic_SmallEnd extends Dialog {
	public NodeAni: eui.Group;
	public NodeStar: eui.Group;
	public SpriteStage: eui.Image;
	public NodeBoxAni: eui.Group;


	public ui_name: string;
	public hurtPer: number = 0;
	public star;
	public hurt;
	public instanceTbl: TableInstanceRelic;
	public serverRelicInfo;
	public curLevelPic: eui.Image = new eui.Image();
	public boxPath = new eui.Image();
	public cb1: Function;
	public cb2;
	public labelPath;
	public battleResult;
	public battleQuality;
	public battleStar;
	public battleHurt;
	public father;
	public constructor() {
		super();
		this.ui_name = "Relic_SmallEnd";
		this.skinName = "resource/skins/battleEnd/Relic_SmallEndSkin.exml";
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.Tween.removeTweens(this);
		}, this)
	}

	public Init() {

	}

	public SetInfo(star) {
		this.star = star;
		let instanceInfo = PlayerDarkSystem.RelicInstance(Game.PlayerMissionSystem.fightExt + 1);

		this.boxPath.source = cachekey(PlayerDarkSystem.RelicInstanceChest(instanceInfo.open_chest[this.star - 1]).path[0], this);
		this.boxPath.anchorOffsetX = 134;
		this.boxPath.anchorOffsetY = 134;
		// let 

	}

	public SetCB(cb1, cb2, father) {
		this.cb1 = cb1;
		this.cb2 = cb2;
		this.father = father;
		egret.Tween.get(this).wait(400).call(() => {
			this.SetInfoAni();
		})

		egret.Tween.get(this).wait(3000).call(() => {
			//this.Exit();
		})
	}

	public SetInfoAni() {
		let bones = ["000_baoxiang", "000_wenzi"];
		cachekey(UIConfig.UIConfig_DarkLand.relicLevelEnd[this.star - 1], this);
		let img = new eui.Image(UIConfig.UIConfig_DarkLand.relicLevelEnd[this.star - 1]);
		let paths: any[] = [this.boxPath, img];
		let star = [];
		let thisOne = this;
		for (let i = 1; i <= this.star; i++) {
			if (i <= this.star - 1) {
				bones.push("000_huixingxing" + i);
				cachekey(UIConfig.UIConfig_DarkLand.relicBigStar[0], this);
				let image = new eui.Image(UIConfig.UIConfig_DarkLand.relicBigStar[0]);
				image.anchorOffsetX = 47;
				image.anchorOffsetY = 45;
				paths.push(image);
			}
			let a: dragonBones.EgretArmatureDisplay;
			if (i == this.star) {
				Game.DragonBonesManager.getAnimationWithBindImages(this, "xiaojiesuan_heiandalu", null, [], [])
					.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
						// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
						// 	armatureDisplay.animation.stop();
						// 	armatureDisplay.animation.reset();
						// 	armatureDisplay.armature.dispose();
						// 	armatureDisplay.dbClear();
						// 	armatureDisplay.dispose(true);
						// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
						// }, null);
						armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
							armatureDisplay.animation.stop();
						}, thisOne)
						a = armatureDisplay;
						star.push(a);
						armatureDisplay.x = (i - 1) * 100;
						cb();
					});
			}

		}
		let cb = () => {
			egret.Tween.get(this).wait(100).call(() => {
				Game.DragonBonesManager.getAnimationWithBindImages(this, "xiaojiesuan_heiandalu", null, paths, bones)
					.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
						// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
						// 	armatureDisplay.animation.stop();
						// 	armatureDisplay.animation.reset();
						// 	armatureDisplay.armature.dispose();
						// 	armatureDisplay.dbClear();
						// 	armatureDisplay.dispose(true);
						// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
						// }, null);
						armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
							this.Exit();
						}, thisOne)
						for (let i = 0; i < star.length; i++) {
							this.NodeStar.addChild(star[i]);
							star[i].animation.play("002_zaxingxing", 1);
						}
						armatureDisplay.animation.play("001_diban", 1);
						thisOne.NodeAni.addChild(armatureDisplay);
					});
			})
		}

	}

	private Exit() {
		this.close();
		if (this.cb1 != null) {
			this.cb1();
		}
		this.cb2(this.father);
	}
}
}