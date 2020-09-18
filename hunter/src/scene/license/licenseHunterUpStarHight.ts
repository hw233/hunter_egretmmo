namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-7-16
 * 
 * @class 领取高级执照界面
 */
export class licenseHunterUpStarHight extends Dialog {
	private groupgu: eui.Group;
	private groupRight: eui.Group;
	private imgLicenceLevel: eui.Image;
	private listStarAward: eui.List;
	private listHunterInfo: eui.List;
	private imgLicense: eui.Image;
	private gropeTitle: eui.Group;
	private gropeLicense: eui.Group;
	private labelLicenSeLevel: eui.Label;
	private groupStar: eui.Group;
	private groupStar1: eui.Group;
	private labelCloseTip: eui.Label;
	private index: number;
	private msg: message.GameInfo;
	private father: licenseMain;
	private cb: Function;
	private aniEnd: boolean = false;
	public constructor() {
		super();
		this.skinName = "resource/skins/license/licenseHunterUpStarHightSkin.exml"

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.Tween.removeTweens(this.labelCloseTip); // 因为是循环播放，需要特别处理
		}, null);
	}
	public setInfo(index: number, msg, father: licenseMain, cb: Function) {
		this.index = index;
		this.msg = msg;
		this.father = father;
		this.cb = cb;
		egret.Tween.get(this).wait(3000).call(() => {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			egret.Tween.get(this.labelCloseTip, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
		})
		// this.grouplic 


		this.setInfoLicenseInfo();
		egret.Tween.get(this).wait(4).call(() => {
			this.groupStar.anchorOffsetX = this.groupStar.width / 2;
			this.groupStar.anchorOffsetY = this.groupStar.height / 2;
			this.setInfoAni();
		})

		this.labelCloseTip.visible = false;
	}

	private setInfoLicenseInfo() {
		let goods = this.msg.getGoods;
		this.imgLicenceLevel.source = cachekey(UIConfig.UIConfig_Task.Title[this.index], this);
		this.labelLicenSeLevel.text = "NO. " + Game.PlayerInfoSystem.BaseInfo.id;
		egret.Tween.get(this).wait(4).call(() => {
			this.labelLicenSeLevel.anchorOffsetX = this.labelLicenSeLevel.width / 2;
			this.labelLicenSeLevel.anchorOffsetY = this.labelLicenSeLevel.height / 2;
		})

		let array = new eui.ArrayCollection();
		for (let i = 0; i < goods.length; i++) {
			let data = new licenseProgressItemData();
			data.index = i;
			data.goods = goods[i].goodsId;
			data.count = goods[i].count;
			// data.father = this;
			array.addItem(data);
		}
		this.listStarAward.dataProvider = array;
		this.listStarAward.itemRenderer = licenseProgressItem;

		let strVip = PlayerVIPSystem.StrVip(this.index);

		let array1 = new eui.ArrayCollection();
		for (let i = 0; i < strVip.length; i++) {
			let data = new licenseProgressInfoItemBData();
			data.id = strVip[i];
			array1.addItem(data);
		}
		this.listHunterInfo.dataProvider = array1;
		this.listHunterInfo.itemRenderer = licenseProgressInfoItemB;

		if (Game.PlayerMissionSystem.missionActive.licence == 1) {
			this.groupStar.visible = false;
		} else {
			Helper.SetStar(this.groupStar, Game.PlayerMissionSystem.missionActive.licence - CommonConfig.licence_max_level, UIConfig.UIConfig_Role.heroAwakenStar[1], 1, 18);
		}
		this.groupRight.visible = false;
		this.labelCloseTip.visible = false;
	}

	private setInfoAni() {

		let path1 = [this.groupStar, this.labelLicenSeLevel, this.imgLicense];
		let bones = ["002_xingxing01", "004_id", "002_juese"];

		Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_zhizhao_shengxing", null, path1, bones)
			.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
				armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
					armatureDisplay.animation.stop();
					this.groupRight.visible = true;
					this.labelCloseTip.visible = true;
					this.aniEnd = true;
				}, this)
				// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// 	armatureDisplay.animation.stop();
				// 	armatureDisplay.animation.reset();
				// 	armatureDisplay.armature.dispose();
				// 	armatureDisplay.dbClear();
				// 	armatureDisplay.dispose(true);
				// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
				// }, null);
				armatureDisplay.animation.play("000_shengxing", 1);
				this.groupgu.addChild(armatureDisplay);
			});
	}
	private onClose() {
		this.close();
	}
}
}