namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-5-16
 * 
 * @class 玩家详情系统设置
 */
export class userSystem extends Dialog {
	private btnClose: eui.Button;
	private btnOk: eui.Button;
	private listViewSet: eui.List;
	private btn1: eui.ToggleSwitch;
	private btn2: eui.ToggleSwitch;
	private btn3: eui.ToggleSwitch;
	private btn4: eui.ToggleSwitch;

	private info = { particulars: true, physical: true };
	public constructor() {
		super();
		this.skinName = "resource/skins/user/userSystemSkin.exml";
		this.init();
	}

	private init() {
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
		this.btn1.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
		this.btn2.addEventListener(eui.UIEvent.CHANGE, this.onChange1, this);
		this.btn3.addEventListener(eui.UIEvent.CHANGE, this.onChange2, this);
		this.btn4.addEventListener(eui.UIEvent.CHANGE, this.onChange3, this);

		this.info = Game.PlayerUserSystem.info;
		this.btn1.selected = Game.SoundManager.isMusicEnabled();
		this.btn2.selected = Game.SoundManager.isEffectEnabled();
		this.btn3.selected = this.info.particulars;
		this.btn4.selected = this.info.physical;
	}

	private onChange(e: eui.UIEvent) {
		let btn: eui.ToggleButton = e.target;
		console.log(btn.selected); //按下true， 正常false
		Game.PlayerUserSystem.Music();
		this.btn1.selected = Game.SoundManager.isMusicEnabled();
	}

	private onChange1(e: eui.UIEvent) {
		let btn: eui.ToggleButton = e.target;
		// Game.SoundManager
		Game.PlayerUserSystem.Effect();
		this.btn2.selected = Game.SoundManager.isEffectEnabled();
	}

	private onChange2(e: eui.UIEvent) {
		let btn: eui.ToggleButton = e.target;

		Game.PlayerInfoSystem.BaseInfo.agree_detail = !Game.PlayerInfoSystem.BaseInfo.agree_detail;
		Game.PlayerUserSystem.modifyRoleNameRespBody()
			.then(() => {
				this.setinfo(btn.selected, null);
			}).catch(() => {

			})
	}

	private onChange3(e: eui.UIEvent) {
		let btn: eui.ToggleButton = e.target;
		Game.PlayerUserSystem.SaveClientOperationReqBody(1)
			.then(() => {
				this.setinfo(null, btn.selected);
			}).catch(() => {

			})
	}

	private onClose() {
		this.close(UI.HIDE_TO_TOP);
	}

	private setinfo(particulars: boolean, physical: boolean) {
		let info = this.info;
		info.particulars = particulars != null ? particulars : info.particulars;
		info.physical = physical != null ? physical : info.physical;
		Game.PlayerUserSystem.setSystemInfo(info);
		this.info = info;
		Game.PlayerUserSystem.info = info;
	}
	private SetAgreeDetailReq(flag) {

	}



}
}