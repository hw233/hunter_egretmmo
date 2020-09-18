namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-3-29
 * 
 * @class  君主升级
 * 
 */
export class CommonLevelUp extends Dialog {
	private groupUp: eui.Group;
	private groupAdd: eui.Group;
	private labelLevel: eui.BitmapLabel;
	private labelValue1: eui.Label;
	private labelUp1: eui.Label;
	private labelValue2: eui.Label;
	private labelUp2: eui.Label;
	private groupFunc1: eui.Group;
	private imgFunc1: eui.Image;
	private labelFunc1: eui.Label;
	private groupFunc2: eui.Group;
	private imgFunc2: eui.Image;
	private labelFunc2: eui.Label;
	private labelClose: eui.Label;
	private groupAni: eui.Group;
	private aone: { group, icon, text };
	private textValue = [[], []];
	private groupFunc = [];
	public constructor() {
		super();
		this.skinName = "resource/skins/common/CommonLevelUpSkin.exml";
		this.init();
		Game.SoundManager.playEffect(SoundManager.SoundOpen(30069), 500);
	}

	private init() {
		for (let i = 0; i < 2; i++) {
			this.textValue[i][0] = this["labelValue" + (i + 1)];
			this.textValue[i][1] = this["labelUp" + (i + 1)];
		}
		for (let i = 0; i < 2; i++) {
			this.groupFunc[i] = aone;
			this.groupFunc[i].group = this["groupFunc" + (i + 1)];
			this.groupFunc[i].icon = this["imgFunc" + (i + 1)];
			this.groupFunc[i].text = this["labelFunc" + (i + 1)];
		}

		this.setInfoAttr();
		this.setInfoOpen();
		egret.Tween.get(this).to(400).call(() => {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		})
		egret.Tween.get(this.labelClose, ).to({ alpha: 0 }, 400).to({ alpha: 1 }, 400);
		Game.DragonBonesManager.playAnimation(this, "npc_bisiji", null, "animation2", 0)
			.then(display => {
				display.x = this.groupAni.width / 2;
				display.y = this.groupAni.height;
				display.scaleX = 0.6;
				display.scaleY = 0.58;
				this.groupAni.addChild(display);
			})
			.catch(reason => {
				toast(reason);
			});
		Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "001_beijignguang_02", 0)
			.then(display => {
				this.groupAdd.addChild(display);
			})
			.catch(reason => {
				toast(reason);
			});
		Game.DragonBonesManager.playAnimation(this, "ui_tongyong_diban", "armatureName", "005_diban3_xunhuan", 0)
			.then(display => {
				this.groupAdd.addChild(display);
			})
			.catch(reason => {
				toast(reason);
			});
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.Tween.removeTweens(this.groupUp);
			egret.Tween.removeTweens(this);
		}, this);
		egret.Tween.get(this.groupUp, { loop: true }).to({ y: 139 }, 500).to({ y: 129 }, 1000).to({ y: 134 }, 500);
	}

	private setInfoAttr() {
		let string: string = "wowowo";
		let str = [[string, string], [string, string]];
		try {
			str[0][0] = Helper.StringFormat("%d", Game.PlayerInfoSystem.baseInfo_pre.power);
			str[0][1] = Helper.StringFormat("%d", PlayerVIPSystem.Item(Game.PlayerInfoSystem.baseInfo_pre.level).role_power);
			str[1][0] = Helper.StringFormat("%d", Game.PlayerInfoSystem.BaseInfo.power);
			str[1][1] = Helper.StringFormat("%d", PlayerVIPSystem.Item().role_power);
		} catch (e) {
			str[0][0] = "00"
			str[0][1] = "00"
			str[1][0] = "00"
			str[1][1] = "00"
		}

		this.labelLevel.text = Game.PlayerInfoSystem.BaseInfo.level.toString();
		for (let i = 0; i < this.textValue.length; i++) {
			for (let j = 0; j < this.textValue[i].length; j++) {
				this.textValue[i][j].text = str[j][i];
			}
		}
	}

	private setInfoOpen() {
		let open = Game.PlayerMissionSystem.FunOpen();
		for (let i = 0; i < this.groupFunc.length; i++) {
			if (open[i]) {
				this["labelFunc" + (i + 1)].text = open[i].name;
				this["imgFunc" + (i + 1)].source = cachekey(open[i].path, this);
			} else {
				this["groupFunc" + (i + 1)].visible = false;
			}
		}
	}

	private callBack: () => void;

	public setCB(cb: () => void) {
		this.callBack = cb;
	}

	public onBtnClose() {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		if (this.callBack) {
			this.callBack();
		}
		this.close(UI.HIDE_TO_TOP);
	}
}
}