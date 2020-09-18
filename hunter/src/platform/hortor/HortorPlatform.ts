namespace zj {
// 疯狂游戏(hortor)公众号游戏支持

export class HortorPlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    private userId: string;
    private userName: string;
    private userSex: number;
    private userImg: string;
    private isSubscribe: boolean;
    private isShowSubscribe: boolean;
    private shareCode: string;
    private friendCode: string;
    private time: number;
    private sign: string;

    private aone_user_id = 0; // (本平台)用户ID
	private aone_user_account = ""; // (本平台)用户账号名
	private aone_token = ""; // (本平台)用户身份验证码

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return ('__has_HortorPlatform' in window) && (window['__has_HortorPlatform'] == true);
    }

    // 平台名字
    public name(): string {
        return "hortor";
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void {
        var input = document.createElement("input");
        input.value = str;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
        document.body.removeChild(input);
        toast_success("复制成功");
    }

    public playVideo(videoName: string): Promise<any> {
        return new Promise((resolve,reject)=>{
            resolve();
            return;
        });
    }

    public async init() {
        AppConfig.Channel = "hortor";

        var sdk = window['HORTOR_AGENT'];
        if (!sdk) return;
        sdk.init();

        sdk.config({
            gameId: "rxlr",
            share: {
                timeline: {
                    title: "《热血猎人》最强烧脑策略卡牌手游",
                    imgUrl: AppConfig.ProjectUrlRoot + "icon_lr_h5.png",
                    success: ()=>{toast_success("分享成功")},
                    cancel: ()=>{toast_warning("分享失败")}
                },
                friend: {
                    title: "《热血猎人》",
                    desc: "最强烧脑策略卡牌手游",
                    imgUrl: AppConfig.ProjectUrlRoot + "icon_lr_h5.png",
                    success: ()=>{toast_success("分享成功")},
                    cancel: ()=>{toast_warning("分享失败")}
                },
                shareCustomParam: {
                    cp_param1: "V2.0.4",
                    cp_param2: "",
                }
            },
            pay: {
                success: ()=>{ toast_success("支付成功，钻石即将到账")},
                cancel: ()=>{toast_warning("支付失败")}
            }
        });

        sdk.showQRCode(); //引导关注公众号必须接入

        return new Promise((resolve, reject) => {
            if (!HortorPlatform.isSupport()) {
                reject("不支持疯狂游乐场平台");
                return;
            }

            console.log("hortor h5 sdk init ok!")
            resolve();
        });
    }

    // 关闭平台
    public close() {
        if (window && "close" in window) {
            window["close"]();
        }
        return;
    }

    // 重启
    public restart() {
        if (window && "location" in window && "reload" in window["location"]) {
            window.location.reload(true);
        }
        // if (window && "location" in window) {
        //     window.location.href = window.location.href;
        // }
        return;
    }

    // 通知平台资源加载的百分比(0~100)
    public setLoadingProgress(percentage: number) {
        return;
    }

    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        return;
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：hortor h5登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;


        this.userId = Util.getQueryString("userId");
        this.userName = Util.getQueryString("userName");
        this.userSex = parseInt(Util.getQueryString("userSex")) || 0;
        this.userImg = Util.getQueryString("userImg");
        this.isSubscribe = Util.getQueryString("isSubscribe") == "true";
        this.isShowSubscribe = Util.getQueryString("isShowSubscribe") == "true";
        this.shareCode = Util.getQueryString("shareCode");
        this.friendCode = Util.getQueryString("friendCode");
        this.time = parseInt(Util.getQueryString("time")) || 0;
        this.sign = Util.getQueryString("sign");

        this.auth_hortor();
        return;
    }

    // 登录验证
    private auth_hortor(): void {
        if (!HortorPlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let login_request = new message.HortorLoginReqBody();
        login_request.userId = this.userId;
        login_request.userName = this.userName;
        login_request.userSex = this.userSex;
        login_request.userImg = this.userImg;
        login_request.isSubscribe = this.isSubscribe;
        login_request.isShowSubscribe = this.isShowSubscribe;
        login_request.shareCode = this.shareCode;
        login_request.friendCode = this.friendCode;
        login_request.time = this.time;
        login_request.sign = this.sign;
        login_request.device_info = Util.getDeviceInfo();
        login_request.version_info = Util.getAppVersionInfo();
        let body = JSON.stringify(login_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onHortorGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/hortor_login.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("hortor request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_hortor, this);
        this.timer.start();
    }

    // ajax请求登陆回复
    private onHortorGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        console.log("hortor_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("hortor登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, "hortor登录API失败");
            return;
        }

        let response = <message.HortorLoginRespBody>json.body;
        this.aone_user_id = response.user_id;
        this.aone_user_account = response.user_account;
        this.aone_token = response.token;

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
        
        let ext = developerPayload ? developerPayload : "";

        let payReq = new message.HortorPayReqBody();
        payReq.user_id = Game.Controller.userID();
        payReq.hortor_user_id = this.userId;
        payReq.product_id = productID;
        payReq.product_quantity = productNum;
        payReq.cp_role_id = Game.Controller.roleID().toString();
        payReq.cp_group_id = Game.Controller.groupOwnerID().toString();
        payReq.cp_ext = ext;
        payReq.device_info = Util.getDeviceInfo();
        payReq.version_info = Util.getAppVersionInfo();
        payReq.version_info.channel = "hortor";
        let body = JSON.stringify(payReq);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("hortor_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("hortor下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.HortorPayRespBody>json.body;
            var sdk = window['HORTOR_AGENT'];
            sdk && sdk.pay({
                "order_id": response.order_id,
                "app_id": response.app_id,
                "timestamp": response.timestamp,
                "nonce_str": response.nonce_str,
                "package": response.package,
                "sign_type": response.sign_type,
                "pay_sign": response.pay_sign
            });

            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，hortor下单失败");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            Game.UIManager.closeWaitingUI();
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_hortor.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("hortor_pay request: " + body);
        Game.UIManager.openWaitingUI();

        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持hortor平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持hortor平台");
        });
    }

    public hideBannerAd() {
        return;
    }
}
window['HortorPlatform'] = HortorPlatform;
}