namespace zj {
// 小米小游戏sdk

export class XiaoMiQGamePlatform implements Platform {
    private appId: string = "2882303761518262963";

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    private appAccountId: number; // 游戏中心计费系统 用户Id,作为用户的唯一标识
    private session: string; // 本次登录游戏的会话ID

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        let qg = window['qg'] ? window['qg'] : {};
        return ('getProvider' in qg) && (qg.getProvider() == "Xiaomi") && ('login' in qg) && ('pay' in qg);
    }

    // 平台名字
    name(): string {
        return "xiaomiqgame";
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void {
    }

    public playVideo(videoName: string): Promise<any> {
    return new Promise((resolve,reject)=>{
        resolve();
        return;
    });
}

    // 初始化平台
    init(): Promise<any> {
        AppConfig.Channel = "xiaomiqgame";

        // 监听并更新版本
        if (window['qg'] && window['qg']['getUpdateManager']) {
            let manager = window['qg'].getUpdateManager(); // UpdateManager
            if (manager) {
                if (manager['onUpdateReady']) {
                    manager['onUpdateReady'](function(){
                        window['qg'].getUpdateManager().applyUpdate(); // 强制快游戏重启并使用新版本
                    });
                }
            }
        }

        return new Promise((resolve, reject) => {
            console.log("xiaomiqgame sdk init ok!");
            resolve();
        });
    }

    // 关闭平台
    close(): void {
        if (window['qg'] && window['qg']['getUpdateManager']) {
            let manager = window['qg'].getUpdateManager(); // UpdateManager
            if (manager &&　manager['applyUpdate']) {
                    manager['applyUpdate']();
            }
        }
        return;
    }

    // 重启游戏
    restart(): void {
        if (window['qg'] && window['qg']['getUpdateManager']) {
            let manager = window['qg'].getUpdateManager(); // UpdateManager
            if (manager &&　manager['applyUpdate']) {
                    manager['applyUpdate']();
            }
        }
        return;
    }

    // 通知平台资源加载的百分比(0~100)
    setLoadingProgress(percentage: number): void {
        return;
    }

    // 登录
    login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        let qg = window['qg'] ? window['qg'] : {};
        qg.login({
            success: (res) => {
                console.log("login success, res is:", JSON.stringify(res));
                this.appAccountId = res.data.appAccountId;
                this.session = res.data.session;

                this.authApp();
            },
            fail: (res) => {
                console.log(`xiaomiqgame login failed:${JSON.stringify(res)}`);
                this.callback_fail.call(this.callback_this, "小米小游戏登录失败");
            }
        });

        return;
    }

    // 登录验证
    private authApp(): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let xiaomiqg_request = new message.SDKLoginReqBody();
        xiaomiqg_request.sdk_userid = this.appAccountId + "";
        xiaomiqg_request.sdk_version = "";
        xiaomiqg_request.sdk_token = this.session;
        xiaomiqg_request.device_info = Util.getDeviceInfo();
        xiaomiqg_request.version_info = Util.getAppVersionInfo();
        xiaomiqg_request.auth_key = "";
        let body = JSON.stringify(xiaomiqg_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onAppGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("xiaomiqgame login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.authApp, this);
        this.timer.start();
    }

    // ajax请求ziaomi app登陆回复
    private onAppGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("xiaomiqgame login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("小米快游戏登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, `小米快游戏登录API失败: ${json.retcode}`);
            return;
        }

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
    updateRole(type: string) {
        return;
    }

    // 分享
    // title: 转发标题，不传则默认使用当前小游戏的昵称。
    // imageUrl: 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
    // linkUrl: // 分享跳转的url路径(可选)
    // query: 查询字符串, 必须是 key1=val1&key2=val2 的格式
    share(title: string, imageUrl: string, linkUrl: string, query: string): void {
        return;
    }

    // 获取程序启动参数
    getOption(key: string): string {
        return;
    }

    // 获取程序启动场景信息
    // 类似于 scene=1038  或scene=1037&appid=123456
    getScene(): string {
        return;
    }

    // 显示游戏圈(游戏论坛)按钮
    showClubButton(): void {
        return;
    }

    // 隐藏游戏圈(游戏论坛)按钮
    hideClubButton(): void {
        return;
    }

    // 短时间振动(15ms)
    vibrateShort(): void {
        return;
    }

    // 较长时间振动(400ms)
    vibrateLong(): void {
        return;
    }

    // 支付请求
    // productID: 商口唯一ID
    // productNum: 购买数量
    // developerPayload: 开发附加信息
    pay(productID: string, productNum: number, developerPayload?: string) {
        let qg = window['qg'] ? window['qg'] : {};
        if (!('pay' in qg)) {
            toast_warning("暂不支持小米快游戏支付");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            return;
        }

        let xiaomiqgpay_request = new message.XiaomiQGamePayReqBody();
        xiaomiqgpay_request.user_id = Game.Controller.userID();
        xiaomiqgpay_request.product_id = productID;
        xiaomiqgpay_request.product_quantity = productNum;
        xiaomiqgpay_request.cp_role_id = Game.Controller.roleID().toString();
        xiaomiqgpay_request.cp_group_id = Game.Controller.groupOwnerID().toString();
        xiaomiqgpay_request.cp_ext = developerPayload ? developerPayload : "";
        xiaomiqgpay_request.device_info = Util.getDeviceInfo();
        xiaomiqgpay_request.version_info = Util.getAppVersionInfo();
        xiaomiqgpay_request.version_info.channel = "xiaomiqgame";
        xiaomiqgpay_request.appAccountId = this.appAccountId + "";
        xiaomiqgpay_request.session = this.session;
        let body = JSON.stringify(xiaomiqgpay_request);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("xiaomiqgame pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("小米快游戏下单API失败:") + json.retcode);
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.XiaomiQGamePayRespBody>json.body;
            // 调起支付
            qg.pay({
                orderInfo: JSON.parse(response.orderInfo),
                success: function (res) {
                    console.log('pay success');
                    toast_success("支付成功");
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});
                },
                fail: function (res) {
                    console.log(`code:${res.errCode} msg:${res.errMsg}`);
                    toast_warning(`支付失败`);
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                }
            });
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，小米快游戏下单失败");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_xiaomiqgame.do", egret.HttpMethod.POST);
        console.log("xiaomiggame pay request: " + body);
        http_request.send(body);
        return;
    }

    // 显示视频激励广告
    showRewardedVideoAd(): Promise<any> {
        return new Promise((resolve, reject) => {

        });
    }

    // 显示Banner广告
    showBannerAd(): void {
        return;
    }

    // 隐藏Banner广告
    hideBannerAd(): void {
        return;
    }
}
window['XiaoMiQGamePlatform'] = XiaoMiQGamePlatform;
}