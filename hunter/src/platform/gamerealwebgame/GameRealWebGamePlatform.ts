namespace zj {
// GameReal h5小游戏环境支持

export class GameRealWebGamePlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    private gameId: string = "10202";
    private userId: string; // 用户ID
    private userName: string; // 用户昵称
    private userImage: string; // 用户头像
    private userSex: string; // 用户性别
    private loginTime: string; // Unix时间戳
    private loginSign: string; // 登录验证签名

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return (('location' in window) && ('search' in window['location']) && ('CY_GAME_SDK' in window) && ('config' in window['CY_GAME_SDK']) && ('pay' in window['CY_GAME_SDK']));
    }

    // 平台名字
    public name(): string {
        return "gamereal";
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
        AppConfig.Channel = "gamerealwgame";
        window['CY_GAME_SDK'].config(
            {
                gameId: this.gameId,
                share: {
                    success: function () { // 分享好友成功回调
                    }
                },
                pay: {
                    success: function () { // 支付成功回调方法（仅针对于快捷支付方式有效，该方法不做回调处理，游戏发货请以服务端回调为准）
                        console.log("pay complete!");
                    }
                }
            }
        );

        return new Promise((resolve, reject) => {
            if (!GameRealWebGamePlatform.isSupport()) {
                reject("不支持gamereal H5游戏平台");
                return;
            }

            console.log("gamereal h5 sdk init ok!")
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
        return;
    }

    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        return;
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：gamereal h5登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        this.gameId = Util.getQueryString("gameId");
        this.userId = Util.getQueryString("uid");
        this.userName = Util.getQueryString("userName");
        this.userImage = Util.getQueryString("avatar");
        this.userSex = Util.getQueryString("userSex");
        this.loginTime = Util.getQueryString("time");
        this.loginSign = Util.getQueryString("sign");

        this.auth_gamereal();
        return;
    }

    // 登录验证
    private auth_gamereal(): void {
        if (!GameRealWebGamePlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let login_request = new message.SDKLoginReqBody();
        login_request.sdk_userid = this.userId;
        login_request.sdk_version = "";
        login_request.sdk_token = this.userName + "|" + this.loginTime + "|" + this.loginSign;
        login_request.device_info = Util.getDeviceInfo();
        login_request.version_info = Util.getAppVersionInfo();
        login_request.auth_key = "";
        let body = JSON.stringify(login_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onGamerealGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("gamereal_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_gamereal, this);
        this.timer.start();
    }

    // ajax请求登陆回复
    private onGamerealGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        console.log("gamereal_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("gamereal登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, "gamereal登录API失败");
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
        let ext = developerPayload ? developerPayload : "";
        let payReq = new message.GamerealWGamePayReqBody();
        payReq.user_id = Game.Controller.userID();
        payReq.cp_ext = ext;
        payReq.product_id = productID;
        payReq.device_info = Util.getDeviceInfo();
        payReq.version_info = Util.getAppVersionInfo();
        payReq.version_info.channel = "gamerealwgame";
        payReq.cp_role_id = Game.Controller.roleID().toString();
        payReq.cp_group_id = Game.Controller.groupOwnerID().toString();
        payReq.product_quantity = productNum;
        payReq.uid = this.userId;
        let body = JSON.stringify(payReq);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("gamreal_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("gamereal下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.GamerealWGamePayRespBody>json.body;

            let payInfo = JSON.parse(response.payInfo);
            let money: number = payInfo.money;
            payInfo['money'] = money.toFixed(2);

            window['CY_GAME_SDK'].pay(payInfo);

            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，gamereal下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_gamerealwgame.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("gamereal_pay request: " + body);
        Game.UIManager.openWaitingUI();

        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持gamereal平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持gamereal平台");
        });
    }

    public hideBannerAd() {
        return;
    }
}
window['GameRealWebGamePlatform'] = GameRealWebGamePlatform;
}