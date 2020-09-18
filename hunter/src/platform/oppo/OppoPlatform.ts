namespace zj {
// oppo小游戏环境支持

export class OppoPlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败
    private login_signature: string; // 登录签名

    private appId: string = "30147954"; // 平台分配的游戏appId
    private uid: string; // 用户唯一Id
    private token: string; // token
    private nickName: string; // 昵称
    private avatar: string; // 头像
    private sex: string; // 性别，M：男，F：女
    private birthday: string; // 生日
    private phoneNum: string; // 手机号(带*号)
    private location: string; // 地理位置
    private platformVersion: string;

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        let qg = window['qg'] ? window['qg'] : {};
        return (('getProvider' in qg) && (qg.getProvider() == "OPPO") && ('login' in qg) && ('setLoadingProgress' in qg) && ('pay' in qg));
    }

    // 平台名字
    public name(): string {
        return "oppo";
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
        AppConfig.Channel = "oppogame";
        // 监听小程序的前后台切换事件
        let qg = window['qg'] ? window['qg'] : {};
        if ('onShow' in qg) {
            qg.onShow((res: any)=>{this.onShow(res); });
        }
        if ('onHide' in qg) {
            qg.onHide((res: any)=>{ this.onHide(res); });
        }

        qg.getSystemInfo({
            success: (res) => {
                console.log("platformVersion is:" + res.platformVersion);
                this.platformVersion = res.platformVersion + "";
            },
            fail: (err) => {},
            complete:(res) => {}
        });

        return new Promise((resolve, reject) => {
            console.log("oppo platform init ok");
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
        window['qg']['setLoadingProgress']({ progress: percentage });
        if (percentage == 100) {
            window['qg']['loadingComplete']({ });
        }
    }

    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        return;
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：oppo登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        let qg = window['qg'] ? window['qg'] : {};
        qg.login({
            success: (res: any)=>{
                console.log("res is:", JSON.stringify(res));
                this.uid = res.uid;
                this.token = res.token;
                this.nickName = res.nickName;
                this.avatar = res.avatar;
                this.sex = res.sex;
                this.birthday = res.birthday;
                this.phoneNum = res.phoneNum;

                this.auth_oppo();
            },
            fail:(res: any)=>{
                console.log(res);
                this.callback_fail.call(this.callback_this, "oppo小游戏登录失败");
            }
        });
        return;
    }

    // 登录验证获取token
    private auth_oppo(): void {
        if (!OppoPlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let oppoLoginreq = new message.SDKLoginReqBody();
        oppoLoginreq.sdk_userid = "";
        oppoLoginreq.sdk_version = "";
        oppoLoginreq.sdk_token = this.token;
        oppoLoginreq.device_info = Util.getDeviceInfo();
        oppoLoginreq.version_info = Util.getAppVersionInfo();
        oppoLoginreq.auth_key = "";
        let body = JSON.stringify(oppoLoginreq);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onOppoGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        request.send(body);
        //console.log("oppo_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_oppo, this);
        this.timer.start();
    }

    // ajax请求fbinstant登陆回复
    private onOppoGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("oppo_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("oppo登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, "oppo小游戏登录失败:" + json.retcode);
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
        let qg = window['qg'] ? window['qg'] : {};

        let oppoPayReq = new message.OppoGamePayReqBody();
        oppoPayReq.user_id = Game.Controller.userID();
        oppoPayReq.product_id = productID;
        oppoPayReq.product_quantity = productNum;
        oppoPayReq.cp_role_id = Game.Controller.roleID().toString();
        oppoPayReq.cp_group_id = Game.Controller.groupOwnerID().toString();
        oppoPayReq.cp_ext = developerPayload ? developerPayload : "";
        oppoPayReq.device_info = Util.getDeviceInfo();
        oppoPayReq.version_info = Util.getAppVersionInfo();
        oppoPayReq.version_info.channel = "oppogame";
        oppoPayReq.open_id = this.token;
        oppoPayReq.app_version = AppConfig.MajorVersion + "." + AppConfig.MinorVersion + "." + AppConfig.RevisionVersion;
        oppoPayReq.engine_version = this.platformVersion;
        let body = JSON.stringify(oppoPayReq);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("oppogame pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("oppo小游戏下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.OppoGamePayRespBody>json.body;
            console.log("oppogame response is:" + JSON.stringify(response));
            // 调起支付
             qg.pay({
                appId: this.appId,
                token: this.token,
                timestamp: response.timestamp,
                paySign: response.paySign,
                orderNo: response.orderNo,
                // 成功回调函数，结果以 OPPO 小游戏平台通知CP的回调地址为准
                success: function(res){
                    console.log('pay success');
                    toast_success("支付成功");
                    Game.UIManager.closeWaitingUI();
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});
                },
                fail: function(res){
                    console.log("res is:" + res + " :" + JSON.stringify(res));
                    console.log(`code:${res.code} errCode:${res.errCode} msg:${res.errMsg}`);
                    toast_warning(`支付失败:(${res.code})`);
                    Game.UIManager.closeWaitingUI();
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                }
            });
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，oppo小游戏下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_oppogame.do", egret.HttpMethod.POST);
        console.log("oppogame pay request: " + body);
        http_request.send(body);
        Game.UIManager.openWaitingUI();
        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持oppo平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持oppo平台");
        });
    }

    public hideBannerAd() {
        return;
    }

    private async onShow(res: any) {
        console.log("切回前台");
        Game.SoundManager.resumeMusic();
    }

    private onHide(res: any) {
        console.log("切到后台");
        Game.SoundManager.pauseMusic();
    }
}
window['OppoPlatform'] = OppoPlatform;
}