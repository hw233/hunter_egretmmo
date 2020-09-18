namespace zj {
// mobo168百思不得姐 h5小游戏环境支持

export class MoboWebGamePlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    private userId: string; // 用户ID
    private appKey: string = "531649BC91EC40A0"; // 这里是游戏中心提供的 app_key（required）
    private timestamp: string; // 时间戳，1970-1-1 至今秒数 （required）
    private nonce: string; // 随机字符串（required）
    private ticket: string; // 认证票据，用于获取游戏中心唯一用户，只能使用一次（required）
    private gameUrl: string; // 游戏 url 地址， 获取之后先 urldecode 再进行签名计算。（required) 
    private shareId: string; // 邀请人标识 （游戏有邀请功能使用）
    private signature: string; // 签名（required）

    private mobo168Game = null;

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return (('location' in window) && ('search' in window['location']) && ('ldgame' in window));
    }

    // 平台名字
    public name(): string {
        return "mobo168";
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void{
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
        AppConfig.Channel = "baisibudejiewgame";

        this.appKey = Util.getQueryString("app_key");
        console.log(console.log("url:", window.location.search))
        this.mobo168Game = new window['ldgame']({"app_key": this.appKey});
        console.log("mobo168Game:", this.mobo168Game)

        return new Promise((resolve, reject) => {
            if (!MoboWebGamePlatform.isSupport()) {
                reject("不支持mobo168 H5游戏平台");
                return;
            }
            
            console.log("mobo168 h5 sdk init ok!")
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
        console.log("登录方式：mobo168 h5登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        this.timestamp = Util.getQueryString("timestamp");
        this.nonce = Util.getQueryString("nonce");
        this.ticket = Util.getQueryString("ticket");
        this.gameUrl = Util.getQueryString("game_url");
        this.shareId = Util.getQueryString("shareid");
        this.signature = Util.getQueryString("signature");

        this.auth_mobo();
        return;
    }

    // 登录验证
    private auth_mobo(): void {
        if (!MoboWebGamePlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let login_request = new message.SDKLoginReqBody();
        login_request.sdk_userid = "";
        login_request.sdk_version = "";
        login_request.sdk_token = this.ticket;
        login_request.device_info = Util.getDeviceInfo();
        login_request.version_info = Util.getAppVersionInfo();
        login_request.auth_key = "";
        let body = JSON.stringify(login_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onMoboGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("mobo168_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_mobo, this);
        this.timer.start();
    }

    // ajax请求登陆回复
    private onMoboGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        console.log("mobo168_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("mobo168登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, "mobo168登录API失败");
            return;
        }

        let response = <message.SDKLoginRespBody>json.body;
        this.userId = response.ext;

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
        if (!('ldgame' in window)) {
            toast_warning("暂不支持mobo168支付");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            return;
        }

        let ext = developerPayload ? developerPayload : "";

        let payReq = new message.BaisibudejieWGamePayReqBody();
        payReq.user_id = Game.Controller.userID();
        payReq.product_id = productID;
        payReq.product_quantity = productNum;
        payReq.cp_role_id = Game.Controller.roleID().toString();
        payReq.cp_group_id = Game.Controller.groupOwnerID().toString();
        payReq.cp_ext = ext;
        payReq.device_info = Util.getDeviceInfo();
        payReq.version_info = Util.getAppVersionInfo();
        payReq.version_info.channel = "baisibudejiewgame";
        payReq.open_id = this.userId;
        let body = JSON.stringify(payReq);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event)=>{
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("mobo168_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("mobo168下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.BaisibudejieWGamePayRespBody>json.body;
            
            let payData = JSON.parse(response.pay_data);
            let price: number = payData.total_fee;
            payData['total_fee'] = price.toFixed(2);
            this.mobo168Game.pay(payData);

            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent)=>{
            toast_warning("Ajax调用错误，mobo168下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_baisibudejiewgame.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("mobo168_pay request: " + body);
        Game.UIManager.openWaitingUI();
        
        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持mobo168平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持mobo168平台");
        });
    }

    public hideBannerAd() {
        return;
    }
}
window['MoboWebGamePlatform'] = MoboWebGamePlatform;
}