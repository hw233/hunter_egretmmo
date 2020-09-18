namespace zj {
// AoneSDK苹果提审包环境支持

export class AoneSDKIosReviewPlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败
    private isLoginOK = false; // 是否已经登录成功

    private appid = 0;
    private channel = "";

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2) && Device.isReviewSwitch;
    }

    // 平台名字
    public name(): string {
        return `aonesdk(${this.channel})`;
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void{
        egret.ExternalInterface.call("sendToNative_setClipboardData",str);
    }

    public playVideo(videoName: string): Promise<any> {
        return new Promise((resolve,reject)=>{
            resolve();
            return;
        });
    }

    public async init() {
        console.log("aone sdk platform init...");
        return new Promise((resolve,reject)=>{
            egret.ExternalInterface.addCallback("sendToJS_ReadConfigResult", (msg)=> {
                console.log(msg);
                let obj = JSON.parse(msg);
                if (obj["action"] != "ReadConfigResult") return;
                //Game.UIManager.closeWaitingUI();
                let code: string = obj["code"] || "";
                if (code != "0") {
                    console.error(`读取SDK参数错误(code:${code})`);
                    resolve();
                    return;
                }
                console.log("aonesdk platform init ok");

                let appId: string = obj["appId"] || "";
                let channel: string = obj["channel"] || "";
                let deviceId: string = obj["deviceId"] || "";
                let model: string = obj["model"] || "";
                let idfa: string = obj["idfa"] || "";
                let numAppId = parseInt(appId);
                if (!numAppId) numAppId = 0;
                if (numAppId != 0) AppConfig.AppId = numAppId;
                channel.trim();
                if (channel.length > 0) AppConfig.Channel = channel;
                if (deviceId.length > 0) {
                    Controller.setGlobalStorageItem("device_id", deviceId);
                    if (Util.deviceinfo) Util.deviceinfo.device_id = deviceId;
                }
                if (model.length > 0) {
                    Controller.setGlobalStorageItem("model", model);
                    if (Util.deviceinfo) Util.deviceinfo.model = model;
                }
                if (idfa.length > 0) {
                    Controller.setGlobalStorageItem("idfa", idfa);
                    if (Util.deviceinfo) Util.deviceinfo.idfa = idfa;
                }
                resolve();
                return;
            });

            //Game.UIManager.openWaitingUI();
            let param = { action: "ReadConfig" }
            egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
        });
    }

    // 关闭平台
    public close() {
        egret.ExternalInterface.call("sendToNative_close", JSON.stringify({}));
        return;
    }

    // 重启
    public restart() {
        egret.ExternalInterface.call("sendToNative_restart", JSON.stringify({}));
        return;
    }

    // 通知平台资源加载的百分比(0~100)
    public setLoadingProgress(percentage: number) {
        return;
    }

    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        let param = {
            action: "Share",
            title: title,
            imageUrl: imageUrl,
            linkUrl: linkUrl,
            query: query
        };
        egret.ExternalInterface.addCallback("sendToJS_ShareResult", (msg)=> {
            console.log(msg);
            let obj = JSON.parse(msg);
            if (obj["action"] != "ShareResult") return;
            Game.UIManager.closeWaitingUI();
            let code: string = obj["code"] || "";
            if (code != "0") {
                toast_warning(`分享失败(code:${code})`);
                return;
            }
            toast_success("分享成功");
        });
        
        Game.UIManager.openWaitingUI();
        if (window['AoneSDKPlatform'] &&　(platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
            egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
        }
        return;
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：Aone登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        
        if (egret.Capabilities.os == "iOS") {
            loadUI(AoneLoginDialog)
            .then((dialog: AoneLoginDialog) => {
                dialog.show(UI.SHOW_FILL_OUT);
                dialog.open(callback_success, callback_fail, callback_this);
            })
        } else {
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;

            // 登录状态需要先登出
            if (this.isLoginOK) {
                egret.ExternalInterface.addCallback("sendToJS_LogoutResult", (msg)=> {
                    console.log(msg);
                    let obj = JSON.parse(msg);
                    if (obj["action"] != "LogoutResult") return;
                    Game.UIManager.closeWaitingUI();

                    this.do_login();
                });

                Game.UIManager.openWaitingUI();
                let param = { action: "Logout" }
                egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
                return;
            }

            this.do_login();
        }
    }

    private do_login() {
        this.isLoginOK = false;
        let param = { action: "Login" }
        egret.ExternalInterface.addCallback("sendToJS_LoginResult", (msg)=> {
            console.log(msg);
            let obj = JSON.parse(msg);
            if (obj["action"] != "LoginResult") return;
            Game.UIManager.closeWaitingUI();
            let code: string = obj["code"] || "";
            if (code != "0") {
                //toast_warning(`登录失败(code:${code})`);
                if (this.callback_fail) {
                    this.callback_fail.call(this.callback_this, code);
                    this.callback_this = null;
                    this.callback_fail = null;
                    this.callback_success = null;
                    this.isLoginOK = false;
                }
                return;
            }
            let token: string = obj["token"] || "";
            let userId: string = obj["userId"] || "";
            let userAccount: string = obj["userAccount"] || "";
            let numUserId = parseInt(userId); 
            if (isNaN(numUserId) || numUserId == undefined) numUserId = 0;
            if (this.callback_this) {
                this.callback_success.call(this.callback_this, numUserId, userAccount, token);
                this.callback_this = null;
                this.callback_fail = null;
                this.callback_success = null;
                this.isLoginOK = true;
            }
        });

        Game.UIManager.openWaitingUI();
        egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
        return;
    }

    // 更新角色信息
    // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
    public updateRole(type: string) {
        let roleinfo: message.RoleShortInfo = Game.Controller.roleInfo();
        let groupinfo: message.GameGroupInfo = Game.Controller.selectedGroup();
        let param = {
            action: "UpdateRole",
            roleId: roleinfo.role_id.toString(),
            roleName: roleinfo.role_name.toString(),
            roleLevel: roleinfo.role_level.toString(),
            roleVip: roleinfo.role_vip.toString(),
            roleCreateTime: roleinfo.role_createtime.toString(),
            groupId: groupinfo.group_id.toString(),
            groupName: groupinfo.group_name.toString(),
            type: type
        };
        console.log(JSON.stringify(param));
        if (window['AoneSDKPlatform'] &&　(platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
            egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
        }
        return;
    }

    // 获取程序启动参数
    public getOption(key: string): string {
        let result = egret.getOption(key);
        if (result == undefined || result == null) return "";
        return result;
    }

    // 获取程序启动场景信息
    // 类似于 scene=1038  或scene=1037&appid=123456
    public getScene(): string {
        return "";
    }

    // 显示游戏圈(游戏论坛)按钮
    public showClubButton(): void {
        return; // 不支持
    }

    // 隐藏游戏圈(游戏论坛)按钮
    public hideClubButton(): void {
        return; // 不支持
    }

    // 短时间振动(15ms)
    public vibrateShort(): void {
        return; // 不支持
    }

    // 较长时间振动(400ms)
    public vibrateLong(): void {
        return; // 不支持
    }

    public pay(productID: string, productNum: number, developerPayload?: string) {
        if (window['AoneSDKPlatform'] &&　(platform instanceof window['AoneSDKIosReviewPlatform'])) {
            if (egret.Capabilities.os == "Android") {
                let param = { action: "Pay", productId: productID, productNum: productNum.toString(), payLoad: developerPayload ? developerPayload : "" }
                egret.ExternalInterface.addCallback("sendToJS_PayResult", (msg)=> {
                    console.log(msg);
                    let obj = JSON.parse(msg);
                    if (obj["action"] != "PayResult") return;
                    Game.UIManager.closeWaitingUI();
                    let code: string = obj["code"] || "";
                    if (code != "0") {
                        toast_warning(`支付失败(code:${code})`);
                        Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                        return;
                    }
                    toast_success("支付成功");
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});
                });

                Game.UIManager.openWaitingUI();
                egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
                return;
            } else if (egret.Capabilities.os == "iOS"){
                let roleId = Game.Controller.roleID() || 0;
                let userId = Game.Controller.userID() || 0;
                let url = Game.Controller.customerWebPayUrl() || Game.Controller.webPayUrl();
                if (!url || !roleId || !userId) {
                    toast_warning("支付功能未开启");
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                    return;
                }
                let token = new md5().hex_md5(userId.toString() + roleId.toString()).toLowerCase().substr(0, 8);
                let request_url = `${url}?product_id=${productID}&role_id=${roleId}&token=${token}`;
                egret.ExternalInterface.call("sendToNative_openWeb", JSON.stringify({url: request_url}));
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            }
        }
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            console.log("aone platform not support RewardedVideoAd");
            reject("暂不支持视频激励广告功能");
        });
    }

    public showBannerAd() {
        return;
    }

    public hideBannerAd() {
        return;
    }
}
window['AoneSDKIosReviewPlatform'] = AoneSDKIosReviewPlatform;
}