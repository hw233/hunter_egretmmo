namespace zj {
// 登录页公告
// guoshanhe 创建于2018.11.14

export class SaveAccountDialog extends Dialog {
    public box:eui.Group;
    public lbAccount:eui.Label;
    public lbPassword:eui.Label;
    public btnSave: eui.Button;

    private callback_this: any;
    private callback_click: () => void;

    public constructor() {
        super();
        this.skinName = "resource/skins/login/SaveAccountDialogSkin.exml";
        this.btnSave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    public setValue(account: string, password: string) {
        this.lbAccount.text = account;
        this.lbPassword.text = password;
    }

    public setCallback(callback_click: () => void, callback_this: any) {
        this.callback_this = callback_this;
        this.callback_click = callback_click;
    }

    private onClick() {
        if (this.callback_this) {
            this.callback_click.call(this.callback_this);
        }
    }
}

}