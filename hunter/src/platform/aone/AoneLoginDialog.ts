namespace zj {
// 账号登录页
// guoshanhe 创建于2018.11.14

export class AoneLoginDialog extends Dialog {
    public btnAoneLogin:eui.Rect;
    public btnRegisterAccount:eui.Rect;
    public btnQuickLogin:eui.Rect;
    public ButtonShrink:eui.Image;
    public lbPromptAccount:eui.Label;
    public lbPromptPassword:eui.Label;
    public lbAccount:eui.EditableText;
    public lbPassword:eui.EditableText;
    public lst_accounts:eui.List;
    public img_list_open:eui.Image;
    public img_list_close:eui.Image;
    public rect_bg: eui.Rect;


    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    public constructor() {
        super();
        this.skinName = "resource/skins/aone/AoneLoginDialogSkin.exml";
        if (Device.isReviewSwitch) {
            this.ButtonShrink.visible = true;
            this.ButtonShrink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonShrink, this);
        }
        this.btnAoneLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAoneLogin, this);
        this.btnQuickLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnQuickLogin, this);
        this.btnRegisterAccount.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRegisterAccount, this);

        this.lbAccount.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{ this.lbPromptAccount.text = "";}, this);
        this.lbPassword.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{ this.lbPromptPassword.text = "";}, this);

        this.initAccounts();
        this.lst_accounts.itemRenderer = AoneLoginIR;
        this.rect_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBg, this);
        this.img_list_open.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowAccounts, this);
        this.img_list_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseAccounts, this);
        Game.EventManager.on(GameEvent.AONE_SELECT_ACCOUNT, this.onSelectAccount, this);
        Game.EventManager.on(GameEvent.AONE_DELETE_ACCOUNT, this.onDeleteAccount, this);
        
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=>{
            Game.EventManager.off(GameEvent.AONE_SELECT_ACCOUNT, this.onSelectAccount, this);
            Game.EventManager.off(GameEvent.AONE_DELETE_ACCOUNT, this.onDeleteAccount, this);
        }, this);
    }

    public initAccounts() {
        this.img_list_open.visible = false;
        this.img_list_close.visible = false;
        this.lst_accounts.visible = false;
        this.lbAccount.text = "";
        this.lbPassword.text = "";
        this.lbPromptAccount.text = "请输入账号";
        this.lbPromptPassword.text = "请输入密码";

        let accounts = this.readAccounts();
        if (accounts.length <= 0) return;
        this.img_list_open.visible = true;
        this.lbAccount.text = accounts[0][0];
        this.lbPassword.text = accounts[0][1];
        this.lbPromptAccount.text = "";
        this.lbPromptPassword.text = "";
    }

    public onClickBg() {
        if (this.lst_accounts.visible) {
            this.onCloseAccounts();
        }
    }

    public onShowAccounts() {
        this.initAccounts();

        let accounts = this.readAccounts();
        let data = [];
        for (let i = 0; i < accounts.length; i++) data.push(accounts[i][0]);
        data.push("");

        this.img_list_open.visible = false;
        this.img_list_close.visible = true;
        this.lst_accounts.visible = true;
        this.lst_accounts.alpha = 0;
        this.lst_accounts.scaleY = 0.6;
        this.lst_accounts.dataProvider = new eui.ArrayCollection(data);
        egret.Tween.get(this.lst_accounts).to({scaleY: 1, alpha: 1}, 100);
    }

    public onCloseAccounts() {
        this.lst_accounts.alpha = 1;
        this.lst_accounts.scaleY = 1;
        this.img_list_open.visible = true;
        this.img_list_close.visible = false;
        egret.Tween.get(this.lst_accounts).to({scaleY: 0.6, alpha: 0}, 100).call(()=>{
            this.lst_accounts.visible = false;
        })
    }

    public onDeleteAccount(evt: egret.Event) {
        let account: string = evt.data;
        let accounts = this.readAccounts();
        let data = [];
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i][0] != account) {
                data.push(accounts[i]);
            }
        }
        this.writeAccounts(data);

        this.onCloseAccounts();
        this.initAccounts();
    }

    public onSelectAccount(evt: egret.Event) {
        let account: string = evt.data;
        let accounts = this.readAccounts();
        if (account == "") {
            this.lbAccount.text = "";
            this.lbPassword.text = "";
            this.lbPromptAccount.text = "请输入账号";
            this.lbPromptPassword.text = "请输入密码";
            this.onCloseAccounts();
        } else {
            let accounts = this.readAccounts();
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i][0] == account) {
                    let data = accounts[i];
                    accounts.splice(i, 1);
                    accounts.unshift(data);
                    this.writeAccounts(accounts);
                    this.onCloseAccounts();
                    this.initAccounts();
                    break;
                }
            }
        }
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



    public open(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any) {
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;
    }

    private onBtnRegisterAccount() {
        loadUI(AoneRegisterDialog)
            .then((dialog: AoneRegisterDialog) => {
                this.close(UI.HIDE_TRAIL_OFF);
                dialog.show(UI.SHOW_FILL_OUT);
                dialog.open(this.callback_success, this.callback_fail, this.callback_this);
            })
    }

    private onButtonShrink() {
        this.close();
    }

    private onBtnQuickLogin() {
        let quicklogin_request = new message.QuickRegisterReqBody();
        quicklogin_request.device_info = Util.getDeviceInfo();
        quicklogin_request.version_info = Util.getAppVersionInfo();
        quicklogin_request.auth_key = "";
        let body = JSON.stringify(quicklogin_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onQuickLoginResponse, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/quick_register.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("quick_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    private onQuickLoginResponse(event: egret.Event): void {
        let request = <egret.HttpRequest>event.currentTarget;
        console.log("quicklogin response: " + request.response);
        Game.UIManager.closeWaitingUI();

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast_warning(`${Game.ConfigManager.getAone2CodeReason(json.retcode)}(${json.retcode})`);
            return;
        }

        let response = <message.QuickRegisterRespBody>json.body;
        if (response.aone_password.length > 0) {
            let accounts = this.readAccounts();
            let data = [];
            data.push([response.aone_account, response.aone_password]);
            for (let i = 0; i < accounts.length; i++) {
                if (accounts[i][0] != response.aone_account) {
                    data.push(accounts[i]);
                }
            }
            this.writeAccounts(data);
            this.initAccounts();
        }
        if (response.aone_password.length > 0) {
            this.saveAccountAsImg();
        }
        if (response.aone_password && response.aone_password.length > 0) {
            EventTracker.track('创建账号', {
                "account_type": "aone",
                "user_id": response.user_id.toString(), 
                "user_account": response.user_account,
                "device_id": Util.getDeviceInfo().device_id
            });
        }

        EventTracker.track('账号登录', {
            "login_type": "快速注册登录",
            "user_id": response.user_id.toString(), 
            "user_account": response.user_account,
            "device_id": Util.getDeviceInfo().device_id
        });

        this.close(UI.HIDE_TO_TOP);
        if (this.callback_this) {
            this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
            this.callback_fail = null;
            this.callback_success = null;
            this.callback_this = null;
        }

        ReyunTracker.track("Quick login"); // 热云，快速登录
    }

    // 保存账号到图片
    private saveAccountAsImg() {
        let dialog = newUI(SaveAccountDialog);
        let accounts = this.readAccounts();
        let account = "";
        let password = "";
        if (accounts.length > 0){
            account = accounts[0][0];
            password = accounts[0][1];
        }
        dialog.setValue(account, password);
        dialog.box.width = UIManager.StageWidth / 2;
        dialog.box.height = UIManager.StageHeight * 3 / 5;
        dialog.show();
        if (window['WxAppPlatform'] && (platform instanceof window['WxAppPlatform'])) {
            dialog.setCallback(()=>{
                let canvas: any = window['canvas'];
                canvas.toTempFilePath({
                    x: canvas.width / 4,
                    y: canvas.height / 5,
                    width: canvas.width / 2,
                    height: canvas.height * 3 / 5,
                    destWidth: canvas.width / 2,
                    destHeight: canvas.height * 3 / 5,
                    canvasId: '',
                    success: ((res)=> {
                        dialog.close();
                        dialog.setCallback(null, null);
                        let imgPath = res.tempFilePath;
                        window['wx'].saveImageToPhotosAlbum({
                            filePath: imgPath,
                            success: (res) => {
                                toast_success("成功保存到相册");
                            }
                        })
                    }),
                    fail: (res)=> { dialog.close(); dialog.setCallback(null, null); }
                }, this);
            }, this);
        } else {
            dialog.setCallback(()=>{
                dialog.close();
                dialog.setCallback(null, null);
            }, this);
        }
    }

    private onBtnAoneLogin() {
        let account = this.lbAccount.text;
        let password = this.lbPassword.text;

        if (account.length <= 0) {
            toast_warning("请输入账号！");
            return;
        }
        if (password.length <= 0) {
            toast_warning("请输入密码！");
            return;
        }
        if (password.length <= 3) {
            toast_warning("密码太短！");
            return;
        }

        let login_request = new message.AoneLoginReqBody();
        login_request.account = account;
        login_request.password = password;
        login_request.device_info = Util.getDeviceInfo();
        login_request.version_info = Util.getAppVersionInfo();
        login_request.auth_key = "";
        let body = JSON.stringify(login_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onLoginAccountResponse, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/aone_login.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("login_account request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，验证账号失败");
        toast("网络错误，验证账号失败");
        Game.UIManager.closeWaitingUI();
    }

    private onLoginAccountResponse(event: egret.Event): void {
        let request = <egret.HttpRequest>event.currentTarget;
        console.log("login account response: " + request.response);
        Game.UIManager.closeWaitingUI();

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast_warning(`${Game.ConfigManager.getAone2CodeReason(json.retcode)}(${json.retcode})`);
            return;
        }

        let accounts = this.readAccounts();
        let data = [];
        data.push([this.lbAccount.text, this.lbPassword.text]);
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i][0] != this.lbAccount.text) {
                data.push(accounts[i]);
            }
        }
        this.writeAccounts(data);
        this.initAccounts();

        let response = <message.AoneLoginRespBody>json.body;

        EventTracker.track('账号登录', {
            "login_type": "Aone登录",
            "user_id": response.user_id.toString(), 
            "user_account": response.user_account,
            "device_id": Util.getDeviceInfo().device_id
        });

        // toast_success("登录成功");

        this.close(UI.HIDE_TO_TOP);
        if (this.callback_this) {
            this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
            this.callback_fail = null;
            this.callback_success = null;
            this.callback_this = null;
        }
    }

}

}