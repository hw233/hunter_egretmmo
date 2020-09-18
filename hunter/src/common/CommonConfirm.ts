namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-4-8
 * 
 * @class 公共对话框
 */
export class CommonConfirm extends Dialog {
	private LayerShow: eui.Group;
	private labelNotice: eui.Label;
	private btnConfirm: eui.Button;
	private groupAni: eui.Group;

	private confirmCB;
	public constructor() {
		super();
		this.skinName = "resource/skins/common/CommonBossSkillItemSkin.exml";
		this.init();
	}

	public init() {
		this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnConfirm, this);
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
	}


	private onBtnConfirm() {
		let tmp = () => {
			if (this.confirmCB != null) {
				this.confirmCB();
			}
		}
		tmp();
		this.close();
	}

	public setInfo(message, bFreezeRootAction) {
		if (bFreezeRootAction != false) {
			this.LayerShow.visible = false;
		}
		this.labelNotice.text = message;
	}

	public setCB(confirmCB) {
		this.confirmCB = confirmCB;
	}
}
}