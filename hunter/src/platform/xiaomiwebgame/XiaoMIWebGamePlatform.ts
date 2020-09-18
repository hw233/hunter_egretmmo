namespace zj {
// 小米h5小游戏环境支持

export class XiaoMIWebGamePlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败
    private login_signature: string; // 登录签名

    private userName: string; // 用户昵称
    private userImage: string; // 用户头像
    private uid: number; // 用户ID
    private session: string; // 游戏中心计费系统 session

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return (('hy_wy_sdk' in window) && ('ready' in window['hy_wy_sdk']) && ('getBaseData' in window['hy_wy_sdk']));
    }

    // 平台名字
    public name(): string {
        return "mi";
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
        AppConfig.Channel = "xiaomiwebgame";
        return new Promise((resolve, reject) => {
            if (!XiaoMIWebGamePlatform.isSupport()) {
                reject("不支持小米游戏平台");
                return;
            }
            window["hy_wy_sdk"]["ready"]({zIndex:9999, pin:0},function(){
                resolve();
            });
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
        console.log("登录方式：MI登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        let obj = window['hy_wy_sdk']['getBaseData']();
        this.userName = obj.userName;
        this.userImage = obj.userImage;
        this.uid = obj.appAccountId;
        this.session = obj.session;

        this.auth_mi();
        return;
    }

    // 登录验证获取token
    private auth_mi(): void {
         if (!XiaoMIWebGamePlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let login_request = new message.SDKLoginReqBody();
        login_request.sdk_userid = FBInstant.player.getID();
        login_request.sdk_version = "";
        login_request.sdk_token = this.login_signature;
        login_request.device_info = Util.getDeviceInfo();
        login_request.version_info = Util.getAppVersionInfo();
        login_request.auth_key = "";
        let body = JSON.stringify(login_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onMIGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        request.send(body);
        //console.log("mi_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_mi, this);
        this.timer.start();
    }

    // ajax请求fbinstant登陆回复
    private onMIGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("mi_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("mi登录API失败:") + json.retcode);
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
        Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持MI平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持MI平台");
        });
    }

    public hideBannerAd() {
        return;
    }
}
window['XiaoMIWebGamePlatform'] = XiaoMIWebGamePlatform;
}