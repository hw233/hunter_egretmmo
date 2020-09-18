namespace zj {
// 易乐玩 h5小游戏环境支持

export class YilewanWebGamePlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    public token: string;
    public passport: string;
    public uId: string;

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return ('__has_YilewanWebGamePlatform' in window) && (window['__has_YilewanWebGamePlatform'] == true);
    }

    // 平台名字
    public name(): string {
        return "yilewan";
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
        AppConfig.Channel = "yilewanwgame";

        window.addEventListener('message', (e) => {
            let parentBackData = e.data;
            parentBackData = (typeof parentBackData == 'string') ? JSON.parse(parentBackData) : parentBackData;

            switch (parentBackData.dataType) {
                case 'getLogin':
                    this.token = parentBackData.token;
                    this.auth_yilewan();
                    break;
                case 'getPay':
                    console.log("pay complete!")
                    break;
            }

        }, false);

        Game.EventManager.on(GameEvent.TRACK_SELECT_GROUP, ()=>{
            // 易乐玩渠道上报事件
            window.parent.postMessage(JSON.stringify({
                data: {
                    action: 0
                },
                dataType: 'gameServerAction',
                frameDomain: location.protocol + '//' + location.host
            }), '*');
        }, this);
        Game.EventManager.on(GameEvent.TRACK_ENTRY_GAME, (ev:egret.Event)=>{
            let select_group = <message.GameGroupInfo>ev.data.group;
            let select_role = <message.RoleShortInfo>ev.data.role;
            // 易乐玩渠道上报事件
            window.parent.postMessage(JSON.stringify({
                data: {
                    gameCode: 'ZJLRH5', //游戏CODE
                    uid: this.uId, //用户uid
                    passport: this.passport, //用户passport
                    player_role_id: '' + Game.Controller.roleID(),//角色ID
                    player_role_name: Game.Controller.roleInfo().role_name,//角色名
                    player_server_id: '' + select_group.group_id,//区服ID
                    player_server_name: select_group.group_name,//区服名
                    player_grade: '' + select_role.role_level//角色等级
                },
                dataType: 'getGameRole',
                frameDomain: location.protocol + '//' + location.host
            }), '*');
        }, this);

        return new Promise((resolve, reject) => {
            if (!YilewanWebGamePlatform.isSupport()) {
                reject("不支持yilewan H5游戏平台");
                return;
            }

            console.log("yilewan h5 sdk init ok!")
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
        // if (window && "location" in window && "reload" in window["location"]) {
        //     window.location.reload(true);
        // }
        if (window && "location" in window) {
            window.location.href = window.location.href;
        }
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
        console.log("登录方式：yilewan h5登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        window.parent.postMessage(JSON.stringify({getUserInfo: '', dataType: 'getLogin', frameDomain: location.protocol+'//'+location.host}), '*');

        return;
    }

    // 登录验证
    private auth_yilewan(): void {
        if (!YilewanWebGamePlatform.isSupport()) return;
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let login_request = new message.SDKLoginReqBody();
        login_request.sdk_userid = "";
        login_request.sdk_version = "";
        login_request.sdk_token = this.token;
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
        //console.log("yilewan_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_yilewan, this);
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
        //console.log("yilewan_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("yilewan登录API失败:") + json.retcode);
            this.callback_fail.call(this.callback_this, "yilewan登录API失败");
            return;
        }

        // 上报事件
        window.parent.postMessage(JSON.stringify({
            data: {},
            dataType: 'gameLoginSuccess',
            frameDomain: location.protocol + '//' + location.host
        }), '*');

        let response = <message.SDKLoginRespBody>json.body;
        let jsonData = JSON.parse(response.ext);
        this.passport = jsonData.passport;
        this.uId = jsonData.uid + "";

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

        let payReq = new message.YilewanWGamePayReqBody();
        payReq.user_id = Game.Controller.userID();
        payReq.product_id = productID;
        payReq.product_quantity = productNum;
        payReq.cp_role_id = Game.Controller.roleID().toString();
        payReq.cp_group_id = Game.Controller.groupOwnerID().toString();
        payReq.cp_ext = ext;
        payReq.device_info = Util.getDeviceInfo();
        payReq.version_info = Util.getAppVersionInfo();
        payReq.version_info.channel = "yilewanwgame";
        payReq.passport = this.passport;
        payReq.uid = this.uId;
        let body = JSON.stringify(payReq);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("yilewan_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("yilewan下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.YilewanWGamePayRespBody>json.body;
            let payJsonInfo = JSON.parse(response.payInfo);
            payJsonInfo['actor'] = Game.Controller.roleInfo().role_name;
            payJsonInfo['role_id'] = Game.Controller.roleID();

            console.log("payinfo:" + JSON.stringify({getUserPayInfo:payJsonInfo, dataType:'getPay', frameDomain:location.protocol+'//'+location.host}));
            window.parent.postMessage(JSON.stringify({getUserPayInfo:payJsonInfo, dataType:'getPay', frameDomain:location.protocol+'//'+location.host}), '*');

            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，yilewan下单失败");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            Game.UIManager.closeWaitingUI();
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_yilewanwgame.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("yilewan_pay request: " + body);
        Game.UIManager.openWaitingUI();

        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            reject("不支持yilewan平台");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            reject("不支持yilewan平台");
        });
    }

    public hideBannerAd() {
        return;
    }
}
window['YilewanWebGamePlatform'] = YilewanWebGamePlatform;
}