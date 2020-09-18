namespace zj {

export class SinaWebGamePlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    private appkey: string = "2175142436";
    private pageId: string = "1068031s2372357442s1079455599"; // 说明：此时pageId为测试ID 上线后拿到正式ID后替换

    private userId: string; // 用户ID
    private token: string;
    private fullscreen: number;

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return (('location' in window) && ('search' in window['location']) && ('share_game' in window));
    }

    // 平台名字
    public name(): string {
        return "sina";
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
        AppConfig.Channel = "sinawgame";
        if ('sngH5GameOnResume' in window) {
            window['sngH5GameOnResume']((res: any) => { this.sngH5GameOnResume(); });
        }
        if ('sngH5GameOnPause' in window) {
            window['sngH5GameOnPause']((res: any) => { this.sngH5GameOnPause(); });
        }

        return new Promise((resolve, reject) => {
            if (!SinaWebGamePlatform.isSupport()) {
                reject("不支持sina H5游戏平台");
                return;
            }

            console.log("sina h5 sdk init ok!")
            resolve();
        });
    }

    private async sngH5GameOnResume() {
        console.log("切回前台");
        Game.SoundManager.resumeMusic();
    }

    private sngH5GameOnPause() {
        console.log("切到后台");
        Game.SoundManager.pauseMusic();
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
        return;
    }

    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        if (!('share_game' in window)) {
            toast_warning("暂不支持sina分享");
            return;
        }

        window['share_game'].share_weibo({
            page_id: this.pageId, //上线时，运营人员会给新的pageid，替换一下即可
            content: title, //填写分享的内容，可为空
            app_key: this.appkey, //填写app_key,pc端分享时候用到
            token: this.token, //填写token
            fullscreen: this.fullscreen, //从url上面获取fullscreen的值，填写到这里。
            uid: this.userId, //填写uid
            success: function () {
                toast("分享成功");
            },
            error: function () {
                toast("分享失败");
            }
        });

        return;
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：sina h5登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        this.userId = Util.getQueryString("uid");
        this.token = Util.getQueryString("access_token");
        this.fullscreen = Util.getQueryString("fullscreen") == "" ? 0 : Number(Util.getQueryString("fullscreen"));
        console.log("fullscreen:", this.fullscreen)

        this.auth_sina();
        return;
    }

    // 登录验证
    private auth_sina(): void {
        if (!SinaWebGamePlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let login_request = new message.SDKLoginReqBody();
        login_request.sdk_userid = this.userId;
        login_request.sdk_version = "";
        login_request.sdk_token = this.token;
        login_request.device_info = Util.getDeviceInfo();
        login_request.version_info = Util.getAppVersionInfo();
        login_request.auth_key = "";
        let body = JSON.stringify(login_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onSinaGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        request.send(body);
        //console.log("sina_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_sina, this);
        this.timer.start();
    }

    // ajax请求登陆回复
    private onSinaGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("sina_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("sina登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, "sina登录API失败");
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
        console.log("sina pay")

        let ext = developerPayload ? developerPayload : "";
        let payReq = new message.PayReqBody();
        payReq.user_id = Game.Controller.userID();
        payReq.role_id = Game.Controller.roleID();
        payReq.receipt = "";
        payReq.pay_channel = "sinawgame";
        payReq.cp_ext = ext;
        payReq.pay_no = "";
        payReq.product_id = productID;
        payReq.auth_key = "";
        payReq.device_info = Util.getDeviceInfo();
        payReq.version_info = Util.getAppVersionInfo();
        payReq.version_info.channel = "sinawgame";
        payReq.cp_role_id = Game.Controller.roleID().toString();
        payReq.cp_group_id = Game.Controller.groupOwnerID().toString();
        payReq.channel_user_id = this.userId;
        payReq.product_quantity = productNum;
        let body = JSON.stringify(payReq);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("sinaweb_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("sina下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.PayRespBody>json.body;

            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});

            window.top.location.href = "http://sng.sina.com.cn/payment/order/order_cashier?appkey=" + this.appkey + "&access_token=" + this.token
                + "&amount=" + response.amount * 100 + "&uid=" + this.userId + "&subject=" + productID + "&desc=" + productID + "&pt=" + response.pay_no + "&timestamp=" + Game.Controller.curServerTime;

            Game.UIManager.closeWaitingUI();
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，sina下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("sina_pay request: " + body);
        Game.UIManager.openWaitingUI();

        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持sina平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持sina平台");
        });
    }

    public hideBannerAd() {
        return;
    }
}
window['SinaWebGamePlatform'] = SinaWebGamePlatform;
}