namespace zj {
// vivo小游戏环境支持

export class VivoQGamePlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败
    private login_signature: string; // 登录签名

    private appId: string = "100001385"; // 平台分配的游戏appId
    private token: string = ""; // 简化模式下可用，返回的访问令牌
    private openid: string = ""; // 用户的openid，可作为用户的唯一标识
    private tokenType: string; // 简化模式下可用，访问令牌类型
    private scope: string; // 简化模式下可用，实际权限范围，如果与申请一致，则此处可能为空
    private expiresIn: number; // 简化模式下可用，访问令牌过期时间，单位为秒，如果通过其他方式设置，则此处可能为空
    private platformVersion: string;

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        let qg = window['qg'] ? window['qg'] : {};
        return (('getProvider' in qg) && (qg.getProvider() == "vivo") && ('authorize' in qg) && ('pay' in qg) && ('getProfile' in qg));
    }

    // 平台名字
    public name(): string {
        return "vivo";
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void{
    }

    public playVideo(videoName: string): Promise<any> {
    return new Promise((resolve,reject)=>{
        resolve();
        return;
    });
}

    public async init() {
        AppConfig.Channel = "vivoqgame";
        // 监听小程序的前后台切换事件
        let qg = window['qg'] ? window['qg'] : {};

        if ('onShow' in qg) {
            qg.onShow(() => { this.onShow(); });
        }
        if ('onHide' in qg) {
            qg.onHide(() => { this.onHide(); });
        }

        return new Promise((resolve, reject) => {
            console.log("vivo platform init ok");
            resolve();
        });
    }

    // 关闭平台
    public close() {
        return;
    }

    // 重启
    public restart() {
        return;
    }

    // 通知平台资源加载的百分比(0~100)
    public setLoadingProgress(percentage: number) {
    }

    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        return;
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：vivo登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        this.token = Controller.getGlobalStorageItem("VivoToken");
        console.log("vivo token is:", this.token);

        let qg = window['qg'] ? window['qg'] : {};
        if (this.token == null || this.token == "") {
            this.vivoLogin();
        }
        else {
            qg.getProfile({
                token: this.token,
                success: (data) => {
                    console.log("vivo getProfile success, code is:", JSON.stringify(data));
                    this.openid = data.openid;

                    this.auth_vivo();
                },
                fail: (data, code) => {
                    console.log("vivo getProfile fail, code is:", code);
                    this.vivoLogin();
                }
            });
        }

        return;
    }

    private vivoLogin() {
        console.log("vivoLogin");
        let qg = window['qg'] ? window['qg'] : {};
        qg.authorize({
            type: "token",
            success: (data) => {
                console.log("res is:", JSON.stringify(data));
                this.token = data.accessToken;
                this.tokenType = data.tokenType;
                this.expiresIn = data.expiresIn;
                this.scope = data.scope;

                qg.getProfile({
                    token: this.token,
                    success: (data) => {
                        console.log("vivo getProfile success, code is:", JSON.stringify(data));
                        this.openid = data.openid;

                        this.auth_vivo();
                    },
                    fail: (data, code) => {
                        console.log("vivo getProfile fail, code is:", code);
                        this.callback_fail.call(this.callback_this, "vivo小游戏登录失败， 获取用户信息失败");
                    }
                });
            },
            fail: (data, code) => {
                console.log("vivo login fail, code is:", code);
                this.callback_fail.call(this.callback_this, "vivo小游戏登录失败");
            }
        });
    }

    // 登录验证获取token
    private auth_vivo(): void {
        if (!VivoQGamePlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let vivoLoginreq = new message.SDKLoginReqBody();
        vivoLoginreq.sdk_userid = this.openid;
        vivoLoginreq.sdk_version = "";
        vivoLoginreq.sdk_token = this.token;
        vivoLoginreq.device_info = Util.getDeviceInfo();
        vivoLoginreq.version_info = Util.getAppVersionInfo();
        vivoLoginreq.auth_key = "";
        let body = JSON.stringify(vivoLoginreq);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onVivoGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        request.send(body);
        //console.log("vivo_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_vivo, this);
        this.timer.start();
    }

    // ajax请求登陆回复
    private onVivoGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("vivo_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("vivo登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, "vivo小游戏登录失败:" + json.retcode);
            return;
        }

        Controller.setGlobalStorageItem("VivoToken", this.token);

        let response = <message.SDKLoginRespBody>json.body;

        if (this.callback_this) {
            this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
            this.callback_fail = null;
            this.callback_success = null;
            this.callback_this = null;
        }
        return;
    }

    // 更新角色信息
    // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
    public updateRole(type: string) {
        return;
    }

    // 获取程序启动参数
    public getOption(key: string): string {
        return "";
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
        let qg = window['qg'] ? window['qg'] : {};

        let vivoPayReq = new message.VivoQGamePayReqBody();
        vivoPayReq.user_id = Game.Controller.userID();
        vivoPayReq.product_id = productID;
        vivoPayReq.product_quantity = productNum;
        vivoPayReq.cp_role_id = Game.Controller.roleID().toString();
        vivoPayReq.cp_group_id = Game.Controller.groupOwnerID().toString();
        vivoPayReq.cp_ext = developerPayload ? developerPayload : "";
        vivoPayReq.device_info = Util.getDeviceInfo();
        vivoPayReq.version_info = Util.getAppVersionInfo();
        vivoPayReq.version_info.channel = "vivoqgame";
        vivoPayReq.vivo_version = "1.0.0";
        let body = JSON.stringify(vivoPayReq);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("vivoqgame pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("vivo小游戏下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.VivoQGamePayRespBody>json.body;
            console.log("vivoqgame response is:" + JSON.stringify(response));
            // 调起支付
            qg.pay({
                orderInfo: response.respJson,
                // 成功回调函数，结果以 vivo 小游戏平台通知CP的回调地址为准
                success: function (res) {
                    console.log('pay success');
                    toast_success("支付成功");
                    Game.UIManager.closeWaitingUI();
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});
                },
                fail: function (res) {
                    console.log("res is:" + res + " :" + JSON.stringify(res));
                    console.log(`code:${res.code} errCode:${res.errCode} msg:${res.errMsg}`);
                    toast_warning(`支付失败:(${res.code})`);
                    Game.UIManager.closeWaitingUI();
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                }
            });
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，vivo小游戏下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_vivoqgame.do", egret.HttpMethod.POST);
        console.log("vivoqgame pay request: " + body);
        http_request.send(body);
        Game.UIManager.openWaitingUI();
        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持vivo平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持vivo平台");
        });
    }

    public hideBannerAd() {
        return;
    }

    private async onShow() {
        console.log("切回前台");
        Game.SoundManager.resumeMusic();
    }

    private onHide() {
        console.log("切到后台");
        Game.SoundManager.pauseMusic();
    }
}
window['VivoQGamePlatform'] = VivoQGamePlatform;
}