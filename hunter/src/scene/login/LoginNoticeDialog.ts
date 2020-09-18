namespace zj {
// 登录页公告
// guoshanhe 创建于2018.11.14

export class LoginNoticeDialog extends Dialog {
    private lbNotice: eui.Label;
    private btnOK: eui.Button;

    private callback_this: any; // 回调接收者
    private callback_function: () => void; // 回调函数

    public constructor() {
        super();
        this.skinName = "resource/skins/login/LoginNoticeDialogSkin.exml";

        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
    }

    public open(notice: string, callback_function?: () => void, callback_this?: any) {
        this.callback_function = callback_function;
        this.callback_this = callback_this;
        this.lbNotice.text = notice;
    }

    private onBtnOK() {
        this.close(UI.HIDE_TO_TOP);
    }

    private onRemoveFromStage() {
        if (this.callback_function) {
            this.callback_function.call(this.callback_this);
            this.callback_this = null;
            this.callback_function = null;
        }
    }
}

}