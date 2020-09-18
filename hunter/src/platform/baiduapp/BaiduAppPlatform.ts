namespace zj {
// 百度小程序(小游戏)环境支持

export class BaiduAppPlatform implements Platform {

    private userinfo_response: any; // 获取的百度用户信息回复
    private code: string = ""; // 百度登录验证返回的临时code
    private openid: string = ""; // 百度openid
    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    private token: string; // 游戏平台返回的登录token
    private proxy_host: string; // 代理服主机地址
    private proxy_port: number; // 代理服主机端口

    private rewardedVideoAd: any = null; // 百度视频激励广告控件
    private bannerAd: any = null; // 百度Banner广告控件

    private launch_query: Object = {}; // 启动或者show时带的参数
    private launch_scene: string = ""; // 启动或者show时带的场景信息，类似于 scene=1038  或scene=1037&appid=123456

    public static NAME: string = "baiduapp";

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        let swan = window['swan'] ? window['swan'] : {};
        return (swan && ('login' in swan) && ('getUserInfo' in swan));
    }

    // 平台名字
    public name(): string {
        return BaiduAppPlatform.NAME;
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void {
    }

    public playVideo(videoName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
            return;
        });
    }

    // public static compareVersion(v1, v2) {
    //     v1 = v1.split('.')
    //     v2 = v2.split('.')
    //     const len = Math.max(v1.length, v2.length)

    //     while (v1.length < len) {
    //         v1.push('0')
    //     }
    //     while (v2.length < len) {
    //         v2.push('0')
    //     }

    //     for (let i = 0; i < len; i++) {
    //         const num1 = parseInt(v1[i])
    //         const num2 = parseInt(v2[i])

    //         if (num1 > num2) {
    //             return 1
    //         } else if (num1 < num2) {
    //             return -1
    //         }
    //     }

    //     return 0
    // }

    public async init() {
        AppConfig.Channel = "baiduapp";
        let swan = window['swan'] ? window['swan'] : {};
        // 监听小程序的前后台切换事件
        if ('onShow' in swan) {
            swan['onShow']((res: any) => { this.onShow(res); });
        }
        if ('onHide' in swan) {
            swan['onHide']((res: any) => { this.onHide(res); });
        }

        // 显示调试窗口
        // if ('setEnableDebug' in swan) {
        //     swan.setEnableDebug({
        //         enableDebug: true
        //     })
        // }

        let sysinfo = swan.getSystemInfoSync();
        console.log(sysinfo);

        // const version = swan.getSystemInfoSync().SDKVersion;
        // if (BaiduAppPlatform.compareVersion(version, '1.1.3') < 0) {
        //     // 如果希望用户在最新版本的客户端上体验您的小游戏，可以提示用户升级
        //     swan.showModal({
        //         title: '提示',
        //         content: '当前客户端版本过低，请升级到最新版本以获得更好游戏体验。'
        //     })
        // }

        console.log("init finished");
        return new Promise((resolve, reject) => {
            console.log("swan init resolve");
            resolve(true);
        });
    }

    private async onShow(res: any) {
        console.log(JSON.stringify(res));
        console.log("切回前台");
        Game.SoundManager.resumeMusic();
    }

    private onHide(res: any) {
        console.log("切到后台");
        Game.SoundManager.pauseMusic();
    }

    // 关闭平台
    public close() {
        this.applyUpdate();
        return;
    }

    // 重启
    public restart() {
        this.applyUpdate();
        return;
    }

    private applyUpdate() {
        let swan = window['swan'] ? window['swan'] : {};
        if (!('getUpdateManager' in swan)) return;
        const updateManager = swan.getUpdateManager();
        if (!updateManager) return;
        if (!('showModal' in swan)) return;
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log("res", res.hasUpdate);
            if(!res.hasUpdate){
                swan.showModal({
                    title: '更新提示',
                    content: '无可用更新版本',
                });
            } else {
                updateManager.onUpdateReady(function (res) {  
                    swan.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success(res) {
                            if (res.confirm) {
                                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                updateManager.applyUpdate();
                            }
                        }
                    });
                });
                updateManager.onUpdateFailed(function (err) {
                    // 新的版本下载失败
                    swan.showModal({
                        title: '更新提示',
                        content: '新版本下载失败，请稍后再试'
                    });
                });
            }
        }); 
    }

    // 通知平台资源加载的百分比(0~100)
    public setLoadingProgress(percentage: number) {
        return;
    }

    // 分享
    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        toast_warning("暂不支持分享");
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        let swan = window['swan'] ? window['swan'] : {};
        console.log("登录方式：百度登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        if (!('login' in swan)) {
            this.callback_fail.call(this.callback_this, "当前环境不支持百度登录");
            return;
        }

        // loadUI(AoneLoginDialog)
        //     .then((dialog: AoneLoginDialog) => {
        //         dialog.show(UI.SHOW_FILL_OUT);
        //         dialog.open(this.callback_success, this.callback_fail, this.callback_this);
        //         this.callback_fail = null;
        //         this.callback_success = null;
        //         this.callback_this = null;
        //     })
        // return;

        swan.login({
            success: (res: any)=>{
                console.log(res);
                this.code = res.code;
                this.checkScopSetting();
            },
            fail:(res:any)=>{
                console.log(res);
                this.callback_fail.call(this.callback_this, "百度登录失败");
            }
        });
    }

    // 检查用户授权
    private checkScopSetting(): void {
        let swan = window['swan'] ? window['swan'] : {};
        if (!('getSetting' in swan)) { // 支持版本 >= 1.2.0
            this.showUserInfoButton();
            return;
        }

        swan.getSetting({
            success: (res) => {
                let authSetting = res.authSetting;
                if (authSetting['scope.userInfo'] === true) {
                    // 用户已授权，可以直接调用相关 API
                    this.getUserInfo();
                } else {
                    // 用户曾经拒绝过授权或者未询问过用户授权
                    this.showUserInfoButton();
                }
            },
            fail: (res: any) => {
                console.log(res);
                this.showUserInfoButton();
            }
        });
    }

    // 获取玩家用户信息
    private getUserInfo(): void {
        let swan = window['swan'] ? window['swan'] : {};
        if (!('getUserInfo' in swan)) {
            this.callback_fail.call(this.callback_this, "当前环境不支持获取用户基本信息");
            return;
        }

        swan.getUserInfo({
            success: (res: any) => {
                console.log(res);
                this.userinfo_response = res;
                this.auth_baiduapp();
            },
            fail: (res: any) => {
                console.log(res);
                this.callback_fail.call(this.callback_this, "获取用户信息失败");
            }
        })
    }

    // 显示获取用户信息按钮
    // 百度官方推荐的获取用户信息的方案
    private showUserInfoButton(): void {
        this.getUserInfo();
    }

    // 登录验证获取token
    private auth_baiduapp(): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let baidulogin_request = new message.BaiduAppLoginReqBody();
        baidulogin_request.code = this.code;
        baidulogin_request.nickname = this.userinfo_response.userInfo.nickName;
        baidulogin_request.headimgurl = this.userinfo_response.userInfo.avatarUrl;
        baidulogin_request.device_info = Util.getDeviceInfo();
        baidulogin_request.version_info = Util.getAppVersionInfo();
        baidulogin_request.auth_key = "";
        let body = JSON.stringify(baidulogin_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onBaiduAppLoginGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/baiduapp_login.do", egret.HttpMethod.POST);
        request.send(body);
        //console.log("baiduapp_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_baiduapp, this);
        this.timer.start();
    }

    // ajax请求baidu登陆回复
    private onBaiduAppLoginGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("baiduapp_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("百度登录API失败:") + json.retcode);
            return;
        }

        let response = <message.BaiduAppLoginRespBody>json.body;
        this.openid = response.openid;

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
    public getScene(): string {
        return "";
    }

    // 显示游戏圈(游戏论坛)按钮
    public showClubButton(): void {
        return;
    }

    // 隐藏游戏圈(游戏论坛)按钮
    public hideClubButton(): void {
        return;
    }

    // 短时间振动(15ms)
    public vibrateShort(): void {
        let swan = window['swan'] ? window['swan'] : {};
        if ('vibrateShort' in swan) {
            swan['vibrateShort']({});
        }
    }

    // 较长时间振动(400ms)
    public vibrateLong(): void {
        let swan = window['swan'] ? window['swan'] : {};
        if ('vibrateLong' in swan) {
            swan['vibrateLong']({});
        }
    }

    public pay(productID: string, productNum: number, developerPayload?: string) {
        let swan = window['swan'] ? window['swan'] : {};
        if (!('requestPolymerPayment' in swan)) {
            toast_warning("暂不支持百度支付");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, { result: false });
            return;
        }

        let baidupay_request = new message.BaiduAppPayReqBody();
        baidupay_request.user_id = Game.Controller.userID();
        baidupay_request.product_id = productID;
        baidupay_request.product_quantity = productNum;
        baidupay_request.cp_role_id = Game.Controller.roleID().toString();
        baidupay_request.cp_group_id = Game.Controller.groupOwnerID().toString();
        baidupay_request.cp_ext = developerPayload ? developerPayload : "";
        baidupay_request.device_info = Util.getDeviceInfo();
        baidupay_request.version_info = Util.getAppVersionInfo();
        baidupay_request.version_info.channel = "baiduapp";
        let body = JSON.stringify(baidupay_request);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("baidu_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("百度下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, { result: false });
                return;
            }
            let response = <message.BaiduAppPayRespBody>json.body;
            // 调起百度支付
            swan['requestPolymerPayment']({
                orderInfo: {
                    dealId: response.dealId,
                    appKey: response.appKey,
                    totalAmount: response.totalAmount,
                    tpOrderId: response.pay_no,
                    dealTitle: response.dealTitle,
                    signFieldsRange: 1,
                    rsaSign: response.rsaSign,
                    bizInfo: "{}"
                },
                bannedChannels: [],
                success(res) { toast_success("支付成功"); Game.UIManager.closeWaitingUI(); Game.EventManager.event(GameEvent.USER_PAY_RESULT, { result: true }); },
                fail(res) { toast_warning("支付失败"); Game.UIManager.closeWaitingUI(); Game.EventManager.event(GameEvent.USER_PAY_RESULT, { result: false }); }
            });

        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，百度下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, { result: false });
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_baiduapp.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("baidu_pay request: " + body);
        Game.UIManager.openWaitingUI();
        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            console.log("baidu platform not support RewardedVideoAd");
            reject("暂不支持视频激励广告功能");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("暂不支持Banner广告");
        });
    }

    public hideBannerAd() {
        if (this.bannerAd) {
            this.bannerAd.hide();
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
    }
}

if (!("swan" in window)) window["swan"] = {};
window['BaiduAppPlatform'] = BaiduAppPlatform;
}