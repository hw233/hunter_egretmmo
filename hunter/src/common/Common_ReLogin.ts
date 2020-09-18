namespace zj {
/**
 * @class 断线重连Tip
 * 
 * @author LianLei
 * 
 * @date 2019.07.11
 */
export class Common_ReLogin extends Dialog {
	private labelNotice: eui.Label;
	private btnConfirm: eui.Button;
	private btnCancel: eui.Button;
	private TableViewNpc: eui.Group;

	private cancelCallback:Function; // 返回登陆界面回调

	private confirmCallback:Function; // 重新连接回调

	private thisObj; // 执行域

	public constructor() {
		super();

		this.skinName = "resource/skins/common/Common_ReLoginSkin.exml";

		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
		this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
		Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.onAutoClose, this);
		Game.EventManager.event(GameEvent.NETWORK_DISCONNECTION);
		this.init();
	}

	private init() {
		Game.DragonBonesManager.playAnimation(this, "npc_bisiji", null, "animation2", 0)
			.then(display => {
				display.x = this.TableViewNpc.width / 2;
				display.y = this.TableViewNpc.height;
				display.scaleX = 0.6;
				display.scaleY = 0.58;
				this.TableViewNpc.addChild(display);
			})
			.catch(reason => {
				// toast(reason);
			});
	}

	/**
	 * 断线重连回调方法
	 * 
	 * @param _confirmCallback 重新连接回调
	 * 
	 * @param _cancelCallback 返回登陆回调
	 * 
	 * @param _thisObj 执行域
	 */
	public setCB(_cancelCallback:Function, _confirmCallback:Function,_thisObj) {
		
		this.cancelCallback = _cancelCallback;

		this.confirmCallback = _confirmCallback;
		
		this.thisObj = _thisObj;
	}

	private onBtnCancel() {
		Game.EventManager.off(GameEvent.NET_SERVER_CONNECTED, this.onAutoClose, this);
		this.cancelCallback.call(this.thisObj);
		this.thisObj = null;
		if (this.parent) this.parent.removeChild(this);
	}

	private onBtnConfirm() {
		Game.EventManager.off(GameEvent.NET_SERVER_CONNECTED, this.onAutoClose, this);
		this.confirmCallback.call(this.thisObj);
		this.thisObj = null;
		if (this.parent) this.parent.removeChild(this);
	}

	private onAutoClose() {
		Game.EventManager.off(GameEvent.NET_SERVER_CONNECTED, this.onAutoClose, this);
		this.thisObj = null;
		if (this.parent) this.parent.removeChild(this);
	}
	
	public setOneBtn(){
		this.btnConfirm.visible = false;
		this.btnCancel.horizontalCenter = "0";
	}
	
	public setMsgInfo(str){
		this.labelNotice.text = str;
	}
}
}