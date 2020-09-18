namespace zj {
// 账号注册页
// guoshanhe 创建于2018.11.14

export class AoneRegisterDialog extends Dialog {
    private btnReturn: eui.Image;
    private btnRegister: eui.Rect;
    private lbAccount: eui.EditableText;
    private lbPassword: eui.EditableText;
    private lbPassword2: eui.EditableText;
    public lbPromptAccount:eui.Label;
    public lbPromptPassword:eui.Label;
    public lbPromptPassword2:eui.Label;

    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    public constructor() {
        super();
        this.skinName = "resource/skins/aone/AoneRegisterDialogSkin.exml";

        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturn, this);
        this.btnRegister.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRegister, this);

        this.lbAccount.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{ this.lbPromptAccount.text = "";}, this);
        this.lbPassword.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{ this.lbPromptPassword.text = "";}, this);
        this.lbPassword2.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{ this.lbPromptPassword2.text = "";}, this);
    }

    public open(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any) {
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;
    }

    private onBtnRegister() {
        let account = this.lbAccount.text;
        let password1 = this.lbPassword.text;
        let password2 = this.lbPassword2.text;
        if (account.length < 3) {
            toast_warning("账号至少要3个字符");
            return;
        }
        if (account.length > 64) {
            toast_warning("账号不能超过64个字符");
            return;
        }
        if (password1 != password2)
        {
            toast_warning("两次输入密码不一致");
            return;
        }
        if (password1.length < 6) {
            toast_warning("密码不能少于6个字符");
            return;
        }
        if (password1.length > 12) {
            toast_warning("密码不能多于12个字符");
            return;
        }

        let register_request = new message.AoneRegisterReqBody();
        register_request.account = account;
        register_request.password = password1;
        register_request.device_info = Util.getDeviceInfo();
        register_request.version_info = Util.getAppVersionInfo();
        register_request.auth_key = "";
        let body = JSON.stringify(register_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onRegisterAccountResponse, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/aone_register.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("register_account request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，注册账号失败");
        toast("网络错误，注册账号失败");
        Game.UIManager.closeWaitingUI();
    }

    private onRegisterAccountResponse(event: egret.Event): void {
        let request = <egret.HttpRequest>event.currentTarget;
        console.log("register account response: " + request.response);
        Game.UIManager.closeWaitingUI();

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast_warning(`${Game.ConfigManager.getAone2CodeReason(json.retcode)}(${json.retcode})`);
            return;
        }

        let response = <message.AoneRegisterRespBody>json.body;

        EventTracker.track('创建账号', {
            "account_type": "aone",
            "user_id": response.user_id.toString(), 
            "user_account": response.user_account,
            "device_id": Util.getDeviceInfo().device_id
        });

        let accounts = this.readAccounts();
        accounts.unshift([this.lbAccount.text, this.lbPassword.text]);
        this.writeAccounts(accounts);
        toast_success("注册成功");
        this.onBtnReturn();
    }

    private onBtnReturn() {
        loadUI(AoneLoginDialog)
        .then((dialog: AoneLoginDialog) => {
            this.close(UI.HIDE_TRAIL_OFF);
            dialog.show(UI.SHOW_FILL_OUT);
            dialog.open(this.callback_success, this.callback_fail, this.callback_this);
        })
    }

    // 读出账号列表
    public readAccounts(): Array<any>{
        let data = Controller.getGlobalStorageItem("accounts");
        if (data && data.length > 0) {
            try{
                let json = JSON.parse(data);
                return json;
            } catch(e) {
                console.log(e);
                return [];
            }
        }
        return [];
    }

    // 保存账号列表
    public writeAccounts(accounts: any) {
        Controller.setGlobalStorageItem("accounts", JSON.stringify(accounts));
    }
}

}