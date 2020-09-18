namespace zj {
// 虫虫h5小游戏环境支持

export class ChongchongWebGamePlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    private gameId: string = "26110_aonelr";

    private userId: string; // 用户ID
    private userName: string; // 用户昵称
    private userImage: string; // 用户头像
    private userSex: string; // 用户性别
    private channelExt: string; // 渠道透传参数，此参数支付时会原样回传给渠道支付页面
    private loginTime: string; // Unix时间戳
    private loginSign: string; // 登录验证签名

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return (('location' in window) && ('search' in window['location']) && ('payForCCplay' in window));
    }

    // 平台名字
    public name(): string {
        return "chongchong";
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
        AppConfig.Channel = "chongchongwgame";
        return new Promise((resolve, reject) => {
            if (!ChongchongWebGamePlatform.isSupport()) {
                reject("不支持虫虫H5游戏平台");
                return;
            }
            
            console.log("chongchong h5 sdk init ok!")
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
        console.log("登录方式：chongchong h5登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        this.userId = Util.getQueryString("userId");
        this.userName = Util.getQueryString("userName");
        this.userImage = Util.getQueryString("userImg");
        this.userSex = Util.getQueryString("userSex");
        this.channelExt = Util.getQueryString("channelExt");
        this.loginTime = Util.getQueryString("time");
        this.loginSign = Util.getQueryString("sign");

        this.auth_chongchong();
        return;
    }

    // 登录验证
    private auth_chongchong(): void {
        if (!ChongchongWebGamePlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let login_request = new message.SDKLoginReqBody();
        login_request.sdk_userid = this.userId;
        login_request.sdk_version = "";
        login_request.sdk_token = this.loginTime + "|" + this.loginSign;
        login_request.device_info = Util.getDeviceInfo();
        login_request.version_info = Util.getAppVersionInfo();
        login_request.auth_key = "";
        let body = JSON.stringify(login_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onChongchongGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        request.send(body);
        //console.log("chongchong_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_chongchong, this);
        this.timer.start();
    }

    // ajax请求登陆回复
    private onChongchongGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("chongchong_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("chongchong登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, "chongchong登录API失败");
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
        if (!('payForCCplay' in window)) {
            toast_warning("暂不支持chongchong支付");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            return;
        }

        let ext = developerPayload ? developerPayload : "";

        let ccpayReq = new message.PayReqBody();
        ccpayReq.user_id = Game.Controller.userID();
        ccpayReq.role_id = Game.Controller.roleID();
        ccpayReq.receipt = "";
        ccpayReq.pay_channel = "chongchongwgame";
        ccpayReq.cp_ext = ext;
        ccpayReq.pay_no = "";
        ccpayReq.product_id = productID;
        ccpayReq.auth_key = "";
        ccpayReq.device_info = Util.getDeviceInfo();
        ccpayReq.version_info = Util.getAppVersionInfo();
        ccpayReq.version_info.channel = "chongchongwgame";
        ccpayReq.cp_role_id = Game.Controller.roleID().toString();
        ccpayReq.cp_group_id = Game.Controller.groupOwnerID().toString();
        ccpayReq.channel_user_id = this.userId;
        ccpayReq.product_quantity = productNum;
        let body = JSON.stringify(ccpayReq);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event)=>{
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("chongchongweb_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("chongchong下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.PayRespBody>json.body;
            
            window['payForCCplay'](this.userId, this.userName, this.gameId, productID, productID, response.amount, response.pay_no, this.channelExt, ext);
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent)=>{
            toast_warning("Ajax调用错误，chongchong下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("chongchong_pay request: " + body);
        Game.UIManager.openWaitingUI();
        
        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持chongchong平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持chongchong平台");
        });
    }

    public hideBannerAd() {
        return;
    }
}
window['ChongchongWebGamePlatform'] = ChongchongWebGamePlatform;
}