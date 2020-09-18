namespace zj {
// huawei小游戏环境支持

export class HuaweiGamePlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败
    private login_signature: string; // 登录签名

    private appId: string = "100780303"; // 平台分配的游戏appId
    private loginData: string;
    private playerId: string = ""; // 帐号ID
    private displayName: string; // 用户的昵称
    private playerLevel: number; // 玩家等级
    private isAuth: number; // 当isAuth为1的时候，应用需要校验返回的参数鉴权签名
    private ts: string; // 时间戳，用于鉴权签名校验
    private gameAuthSign: string; // 鉴权签名
    private loginRequest: egret.HttpRequest;
    private deviceId: string;

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        let hbs = window['hbs'] ? window['hbs'] : {};
        return (('gameLogin' in hbs) && ('hwPay' in hbs));
    }

    // 平台名字
    public name(): string {
        return "huawei";
    }

    public async init() {
        AppConfig.Channel = "huaweiqgame";
        // 监听小程序的前后台切换事件
        let hbs = window['hbs'] ? window['hbs'] : {};

        if ('onShow' in hbs) {
            hbs.onShow(() => { this.onShow(); });
        }
        if ('onHide' in hbs) {
            hbs.onHide(() => { this.onHide(); });
        }

        egret.setInterval(() => {
            if (this.deviceId == null) {
                this.deviceId = Controller.getGlobalStorageItem("device_id");
            }

            if (Controller.getGlobalStorageItem("device_id").length == 0) {
                console.log("store deviceId");
                Controller.setGlobalStorageItem("device_id", this.deviceId);
            }
        }, null, 1000)

        return new Promise((resolve, reject) => {
            console.log("huawei platform init ok");
            resolve();
        });
    }

    public playVideo(videoName: string): Promise<any> {
    return new Promise((resolve,reject)=>{
        resolve();
        return;
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
        console.log("登录方式：huawei登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        let hbs = window['hbs'] ? window['hbs'] : {};
        hbs.gameLogin({
            forceLogin: 1,
            appid: this.appId,
            success: (data) => {
                this.loginData = JSON.stringify(data);
                console.log("huaweigame data is:" + this.loginData);

                this.playerId = data.playerId;
                this.displayName = data.displayName;
                this.playerLevel = data.playerLevel;
                this.isAuth = data.isAuth;
                this.ts = data.ts;
                this.gameAuthSign = data.gameAuthSign;

                this.auth_huawei();
            },
            fail: (data, code) => {
                console.log("huaweigame login fail:" + data + ", code:" + code);
                this.callback_fail.call(this.callback_this, "华为小游戏登录失败");
            }
        });

        return;
    }

    // 登录验证获取token
    private auth_huawei(): void {
        if (!HuaweiGamePlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let huaweiLoginreq = new message.SDKLoginReqBody();
        huaweiLoginreq.sdk_userid = "";
        huaweiLoginreq.sdk_version = "";
        huaweiLoginreq.sdk_token = this.loginData;
        huaweiLoginreq.device_info = Util.getDeviceInfo();
        huaweiLoginreq.version_info = Util.getAppVersionInfo();
        huaweiLoginreq.auth_key = "";
        let body = JSON.stringify(huaweiLoginreq);

        this.loginRequest = new egret.HttpRequest();
        this.loginRequest.responseType = egret.HttpResponseType.TEXT;
        this.loginRequest.setRequestHeader("Content-Type", "application/json");
        console.log("hhh getDeviceid0:", Controller.getGlobalStorageItem("device_id"))
        this.loginRequest.addEventListener(egret.Event.COMPLETE, this.onHuaweiGetComplete, this);
        this.loginRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        this.loginRequest.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        this.loginRequest.send(body);
        //console.log("huawei_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_huawei, this);
        this.timer.start();

        this.loginRequest.removeEventListener(egret.Event.COMPLETE, this.onGetIOError, this);
    }

    // ajax请求fbinstant登陆回复
    private onHuaweiGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("huawei_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("huawei登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, "huawei小游戏登录失败:" + json.retcode);
            return;
        }
        console.log("hhh getDeviceid1:", Controller.getGlobalStorageItem("device_id"))
        this.loginRequest.removeEventListener(egret.Event.COMPLETE, this.onHuaweiGetComplete, this);

        let response = <message.SDKLoginRespBody>json.body;

        console.log("hhh getDeviceid2:", Controller.getGlobalStorageItem("device_id"))
        if (this.callback_this) {
            console.log("huawei小游戏登陆成功!")
            console.log("hhh getDeviceid2:", Controller.getGlobalStorageItem("device_id"))
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
        let hbs = window['hbs'] ? window['hbs'] : {};

        let huaweiPayReq = new message.HuaweiQGamePayReqBody();
        huaweiPayReq.user_id = Game.Controller.userID();
        huaweiPayReq.product_id = productID;
        huaweiPayReq.product_quantity = productNum;
        huaweiPayReq.cp_role_id = Game.Controller.roleID().toString();
        huaweiPayReq.cp_group_id = Game.Controller.groupOwnerID().toString();
        huaweiPayReq.cp_ext = developerPayload ? developerPayload : "";
        huaweiPayReq.device_info = Util.getDeviceInfo();
        huaweiPayReq.version_info = Util.getAppVersionInfo();
        huaweiPayReq.version_info.channel = "huaweiqgame";
        let body = JSON.stringify(huaweiPayReq);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("huaweiqgame pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("huawei小游戏下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.HuaweiQGamePayRespBody>json.body;
            console.log("huaweiqgame response is:" + JSON.stringify(response));
            // 调起支付
            hbs.hwPay({
                orderInfo: response.orderInfo,
                success: function (ret) {
                    console.log('pay success');
                    toast_success("支付成功");
                    Game.UIManager.closeWaitingUI();
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});
                },
                fail: function (erromsg, errocode) {
                    console.log("pay fail : " + errocode + erromsg);
                    toast_warning(`支付失败:(${errocode})`);
                    Game.UIManager.closeWaitingUI();
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                }
            });
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，huawei小游戏下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_huaweiqgame.do", egret.HttpMethod.POST);
        console.log("huaweiqgame pay request: " + body);
        http_request.send(body);
        Game.UIManager.openWaitingUI();
        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持huawei平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持huawei平台");
        });
    }

    public hideBannerAd() {
        return;
    }

    public setClipboardData(str: string): void {
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
window['HuaweiGamePlatform'] = HuaweiGamePlatform;
}