namespace zj {
// 微信小程序(小游戏)环境支持

export class WxAppPlatform implements Platform {

    private button_club: any = null; // 游戏圈按钮
    private button_userinfo: any = null; // 获取用户信息按钮
    private userinfo_response: wx.UserInfoResponse; // 获取的微信用户信息回复
    private code: string = ""; // 微信登录验证返回的临时code
    private openid: string = ""; // 微信openid
    private session_key: string = ""; // 会话key
    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    private token: string; // 游戏平台返回的登录token
    private proxy_host: string; // 代理服主机地址
    private proxy_port: number; // 代理服主机端口

    private rewardedVideoAd: any = null; // 微信视频激励广告控件
    private bannerAd: any = null; // 微信Banner广告控件

    private launch_query: Object = {}; // 启动或者show时带的参数
    private launch_scene: string = ""; // 启动或者show时带的场景信息，类似于 scene=1038  或scene=1037&appid=123456

    public static NAME: string = "wxapp";

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        let wx: any = window['wx'] || {};
        if (!('login' in wx)) return false;
        if (!('getUserInfo' in wx)) return false;
        if (!('getSystemInfoSync' in wx)) return false;
        if (egret.Capabilities.runtimeType != egret.RuntimeType.WXGAME) return false;
        try {
            const res = wx.getSystemInfoSync();
            if (res && res.AppPlatform && res.AppPlatform == "qq") return false; // 可能是QQ小游戏
            return true;
        } catch (e) {
            return false;
        }
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void{
        console.log("wxplatform setClipboardData: " + str);
        wx.setClipboardData({
                data: str,
            })
    }

    public playVideo(videoName: string): Promise<any> {
        return new Promise((resolve,reject)=>{
            resolve();
            return;
        });
    }

    // 平台名字
    public name(): string {
        return WxAppPlatform.NAME;
    }

    public async init() {
        AppConfig.Channel = "wxapp";
        // 监听小程序的前后台切换事件
        if ('onShow' in wx) {
            wx['onShow']((res: any)=>{ this.onShow(res); });
        }
        if ('onHide' in wx) {
            wx['onHide']((res: any)=>{ this.onHide(res); });
        }

        if ('onMemoryWarning' in wx) {
            wx['onMemoryWarning'](function (res) {
                let level = res.level;
                if (!level) level = 0;
                console.log('###onMemoryWarningReceive:' + level);
                toast_warning("内存警告:" + level);
                if('triggerGC' in wx) wx['triggerGC']();
            })
        }

        // 打开右上角分享菜单
        if ('showShareMenu' in wx) { // 支持版本 >= 1.1.0
            let func: any = wx.showShareMenu;
            func({withShareTicket: false});
        }
        // 设置分享的默认内容
        if ('onShareAppMessage' in wx) {
            let onShareAppMessage = wx['aldOnShareAppMessage']; // 优先使用阿拉丁接口
            if (!onShareAppMessage) onShareAppMessage = wx['onShareAppMessage'];
            onShareAppMessage(function(){
                let num: number = Object.keys(TextsConfig.TextsConfig_Share.ShareTexts).length;//分享图片数组的长度
			    let a = Math.floor(Math.random() * num);//随机数，随机抽取一套分享资源
                return {
                    title: TextsConfig.TextsConfig_Share.ShareTexts[a],
                    imageUrl: AppConfig.ProjectUrlRoot + UIConfig.UIConfig_Special.shareImg[a],
                    query: `fromuserid=${Game.Controller.userID()}`
                };
            });
        }


        if ('createRewardedVideoAd' in wx) { // 支持版本 >= 2.0.4
            this.rewardedVideoAd= wx['createRewardedVideoAd']({adUnitId: AppConfig.WxRewardVideoAdUnitId});
            if (this.rewardedVideoAd) this.rewardedVideoAd.onLoad(()=>{console.log("视频广告加载成功")});
            if (this.rewardedVideoAd) this.rewardedVideoAd.onError((err)=>{console.log(err)});
        }

        let sysinfo = wx.getSystemInfoSync();
        console.log(sysinfo);

        let launchOptions: any = wx['getLaunchOptionsSync']();
        console.log(launchOptions);
        this.launch_query = launchOptions.query;
        this.launch_scene = ("scene=" + launchOptions.scene);
        if (launchOptions.referrerInfo && launchOptions.referrerInfo.appId) {
            this.launch_scene += ("&appid=" + launchOptions.referrerInfo.appId);
        }

        console.log("分享处理")
        this.shareFunction();

        await this.check_review_status();

        console.log("init finished");
        return new Promise((resolve,reject)=>{
            console.log("wx init resolve");
            resolve(true);
        });
    }

    // 检测是否提审状态
    public async check_review_status() {
        return new Promise((resolve, reject) => {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                let request = <egret.HttpRequest>event.currentTarget;
                console.log("query_channel_review_versions response: " + request.response);

                let json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    console.log(LANG("check_review_status fail:") + json.retcode);
                    resolve({});
                    return;
                }

                let response = <message.QueryChannelReviewVersionsRespBody>json.body;
                let review_versions: string = response.reviewVersions;
                console.log("review_versions:" + review_versions);
                let versions: string[] = review_versions.split(",");
                // let local_version = `${AppConfig.MajorVersion}.${AppConfig.MinorVersion}.${AppConfig.RevisionVersion}`;
                let local_version = `${AppConfig.ResourceVersion}`; // 换成资源版本号，更新更灵活
                let has_review = false;
                for (let i = 0; i < versions.length; i++) {
                    if (versions[i] == local_version) {
                        has_review = true;
                        break;
                    }
                }
                console.log("has_review:" + (has_review ? "true" : "false"));
                if (has_review) {
                    Device.isReviewSwitch = true;
                }
                resolve({});
                return;
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
                console.warn("query_channel_review_versions io error");
                resolve({});
            }, this);
            request.open(AppConfig.ApiUrlRoot + "/api/query_channel_review_versions.do", egret.HttpMethod.POST);
            let queryconfig_request = new message.QueryChannelReviewVersionsReqBody();
            queryconfig_request.device_info = Util.getDeviceInfo();
            queryconfig_request.version_info = Util.getAppVersionInfo();
            request.send(JSON.stringify(queryconfig_request));
            console.log("query_channel_review_versions request: " + JSON.stringify(queryconfig_request));
        });
    }

    private async onShow(res: any) {
        console.log(JSON.stringify(res));
        console.log("切回前台");
        Game.SoundManager.resumeMusic();
        this.launch_query = res.query;
        this.launch_scene = ("scene=" + res.scene);
        if (res.referrerInfo && res.referrerInfo.appId) {
            this.launch_scene += ("&appid=" + res.referrerInfo.appId);
        }

        console.log("分享处理")
        this.shareFunction();
    }

    private onHide(res: any) {
        console.log("切到后台");
        Game.SoundManager.pauseMusic();
        //Game.Controller.logout();
    }

    // 关闭平台
    public close() {
        if ('exitMiniProgram' in wx) {
            wx['exitMiniProgram']({});
        }
        return;
    }

    //被分享者与服务器之间的联系
    private shareFunction(){
        let shareID = this.getOption("url");
        if (shareID && shareID.length > 0) {
            Controller.setGlobalStorageItem("shareID",shareID);
        }
    }

    // 重启
    public restart() {
        if ('exitMiniProgram' in wx) {
            wx['exitMiniProgram']({});
        }
        return;
    }

    // 通知平台资源加载的百分比(0~100)
    public setLoadingProgress(percentage: number) {
        return;
    }

    // 分享
    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        if (!('shareAppMessage' in wx)) return;
        let shareAppMessage = wx['aldShareAppMessage']; // 优先使用阿拉丁接口
        if (!shareAppMessage) shareAppMessage = wx['shareAppMessage'];
        if (imageUrl.length == 0) AppConfig.ProjectUrlRoot + "share/Share0.jpg";
        shareAppMessage({title: title, imageUrl: imageUrl, query: query});
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：微信登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        if (!('login' in wx)) {
            this.callback_fail.call(this.callback_this, "当前环境不支持微信登录");
            return;
        }
        
        wx.login({
            success: (res: wx.LoginResponse)=>{
                console.log(res);
                this.code = res.code;
                this.checkScopSetting();
            },
            fail:(res:any)=>{
                console.log(res);
                this.callback_fail.call(this.callback_this, "微信登录失败");
            }
        });
    }

    // 检查用户授权
    private checkScopSetting(): void {
        if (!('getSetting' in wx)) { // 支持版本 >= 1.2.0
            this.showUserInfoButton();
            return;
        }

        wx.getSetting({
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
    // 从2018年4月30日起开发版和体验版不再支持该接口弹出授权提示框，2018年7月15日线上版本仍支持
    private getUserInfo(): void {
        if (!('getUserInfo' in wx)) {
            this.callback_fail.call(this.callback_this, "当前环境不支持获取用户基本信息");
            return;
        }

        wx.getUserInfo({
            success: (res: wx.UserInfoResponse) => {
                console.log(res);
                this.userinfo_response = res;
                if (Device.isReviewSwitch) {
                    this.auth_wxapp(); // 提审版微信登录
                } else {
                    this.query_wxapp_openid(); // 正式版以openid为设备ID，采用aone登录
                }
            },
            fail: (res: any) => {
                console.log(res);
                this.callback_fail.call(this.callback_this, "获取用户信息失败");
            }
        })
    }

    // 显示获取用户信息按钮
    // 微信官方推荐的获取用户信息的方案
    private showUserInfoButton(): void {
        if (!('createUserInfoButton' in wx)) { // 支持版本 >= 2.0.1
            this.getUserInfo();
            return;
        }

        if (this.button_userinfo == null) {
            this.button_userinfo = wx['createUserInfoButton']({
                type: 'image',
                image: 'start_game_button.png',
                withCredentials: true,
                lang: "zh_CN",
                style: {
                    left: (window.innerWidth - 167) / 2,
                    top: (window.innerHeight * 2 / 3) + 15,
                    width: 167,
                    height: 62,
                    lineHeight: 40,
                    borderRadius: 4
                }
            });
            if (this.button_userinfo == null) {
                this.callback_fail.call(this.callback_this, "获取用户基本信息失败");
                return;
            }

            this.button_userinfo.onTap((res: wx.UserInfoResponse) => {
                console.log(res);
                console.log("用户点击微信获取用户信息按钮");
                if (this.button_userinfo) this.button_userinfo.hide();
                if (this.button_userinfo) this.button_userinfo.destroy();
                this.button_userinfo = null;
                if ('userInfo' in res) {
                    // 用户同意授权了
                    this.userinfo_response = res;
                    if (Device.isReviewSwitch) {
                        this.auth_wxapp(); // 提审版微信登录
                    } else {
                        this.query_wxapp_openid(); // 正式版以openid为设备ID，采用aone登录
                    }
                } else {
                    // 基本上是用户拒绝授权了
                    console.log("未获得授权，无法进行游戏，您可以重新授权：右上角菜单->关于猎人世界->右上角菜单->设置");
                    //this.callback_fail.call(this.callback_this, "未获得授权，无法进行游戏，您可以重新授权：右上角菜单->关于猎人世界->右上角菜单->设置");
                    this.button_userinfo = null;
                    setTimeout(()=>{this.showUserInfoButton();}, 0);
                    return;
                }
            });
        }
        
        if (this.button_userinfo) this.button_userinfo.show();
        console.log("显示获取用户信息按钮");
    }

    // 获取用户openid
    private query_wxapp_openid(): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let wxlogin_request = new message.WxAppQueryOpenidReqBody();
        wxlogin_request.code = this.code;
        wxlogin_request.raw_data = this.userinfo_response.rawData;
        wxlogin_request.signature = this.userinfo_response.signature;
        wxlogin_request.device_info = Util.getDeviceInfo();
        wxlogin_request.version_info = Util.getAppVersionInfo();
        wxlogin_request.auth_key = "";
        let body = JSON.stringify(wxlogin_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onWxAppQueryOpenidGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/wxapp_query_openid.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("wx_query_openid request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // 登录验证获取token
    private auth_wxapp(): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let wxlogin_request = new message.WxAppLoginReqBody();
        wxlogin_request.code = this.code;
        wxlogin_request.raw_data = this.userinfo_response.rawData;
        wxlogin_request.signature = this.userinfo_response.signature;
        wxlogin_request.device_info = Util.getDeviceInfo();
        wxlogin_request.version_info = Util.getAppVersionInfo();
        wxlogin_request.auth_key = "";
        let body = JSON.stringify(wxlogin_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onWxAppLoginGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/wxapp_login.do", egret.HttpMethod.POST);
        request.send(body);
        //console.log("wx_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        if (Device.isReviewSwitch) {
            // 提审版微信登录
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_wxapp, this);
        } else {
            // 正式版以openid为设备ID，采用aone登录
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.query_wxapp_openid, this);
        }
        this.timer.start();
    }

    // ajax请求weixin登陆回复
    private onWxAppLoginGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("wxapp_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("微信登录API失败:") + json.retcode);
            return;
        }

        let response = <message.WxAppLoginRespBody>json.body;
        this.openid = response.openid;
        this.session_key = response.session_key;
        Controller.setGlobalStorageItem("device_id", this.openid); // 设备Id为openid

        EventTracker.track('账号登录', {
            "login_type": "微信登录",
            "user_id": response.user_id.toString(), 
            "user_account": response.user_account,
            "device_id": Util.getDeviceInfo().device_id
        });

        if (this.callback_this) {
            this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
            this.callback_fail = null;
            this.callback_success = null;
            this.callback_this = null;
        }

        this.check_midas_pay_stub();
        return;
    }

    // ajax请求weixin获取openid回复
    private onWxAppQueryOpenidGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        console.log("wxapp_query_openid response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("微信获取openid API失败:") + json.retcode);
            return;
        }

        let response = <message.WxAppQueryOpenidRespBody>json.body;
        this.openid = response.openid;
        this.session_key = response.session_key;
        Controller.setGlobalStorageItem("device_id", this.openid); // 设备Id为openid

        loadUI(AoneLoginDialog)
        .then((dialog: AoneLoginDialog) => {
            dialog.show(UI.SHOW_FILL_OUT);
            dialog.open(this.callback_success, this.callback_fail, this.callback_this);
            this.callback_fail = null;
            this.callback_success = null;
            this.callback_this = null;
        })

        this.check_midas_pay_stub();
        return;
    }

    // 更新角色信息
    // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
    public updateRole(type: string) {
        return;
    }

    // 获取程序启动参数
    public getOption(key: string): string {
        let query = this.launch_query;
        if (key in query) {
            return query[key];
        } else {
            return "";
        }
    }

    // 获取程序启动场景信息
    // 类似于 scene=1038  或scene=1037&appid=123456
    public getScene(): string {
        return this.launch_scene;
    }

    // 显示游戏圈(游戏论坛)按钮
    public showClubButton(): void {
        if (!('createGameClubButton' in wx)) return; // 支持版本 >= 2.0.3

        if (this.button_club == null) {
            this.button_club = wx['createGameClubButton']({
                icon: 'green',
                type: 'image',
                style: {
                    left: 10,
                    top: 40,
                    width: 40,
                    height: 40
                }
            });
            if (this.button_club == null) return;
            this.button_club.onTap((res) => {
                console.log("打开游戏圈");
            });
        }

        if (this.button_club) this.button_club.show();
        console.log("显示游戏圈按钮");
    }

    // 隐藏游戏圈(游戏论坛)按钮
    public hideClubButton(): void {
        if (this.button_club == null) return;
        this.button_club.hide();
        console.log("隐藏游戏圈按钮");
    }

    // 短时间振动(15ms)
    public vibrateShort(): void {
        if ('vibrateShort' in wx) { // 支持版本 >= 1.2.0
            wx['vibrateShort']({});
        }
    }

    // 较长时间振动(400ms)
    public vibrateLong(): void {
        if ('vibrateLong' in wx) { // 支持版本 >= 1.2.0
            wx['vibrateLong']({});
        }
    }

    public pay(productID: string, productNum: number, developerPayload?: string) {
        //if (Device.isReviewSwitch) {
            let payno = Game.Controller.getRoleStorageItem("midas_pending_payno");
            if (!payno || payno.length <= 0) {
                Game.Controller.removeRoleStorageItem("midas_pending_payno");
                Game.Controller.removeRoleStorageItem("midas_pending_product_id");
                this.pay_midas(productID, productNum, developerPayload);
            } else {
                toast("您有未完成订单正在处理中，请重试");
                this.check_midas_pay_stub();
            }
        //} else {
        //    this.pay_nowpay(productID, productNum, developerPayload);
        //}
    }

    // 米大师
    private pay_midas(productID: string, productNum: number, developerPayload?: string) {
        if (!('requestMidasPayment' in wx)) {
            toast_warning("暂不支持微信支付");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            return;
        }

        let pay_request = new message.PayReqBody();
        pay_request.user_id = Game.Controller.userID();
        pay_request.role_id = Game.Controller.roleID();
        pay_request.receipt = "";
        pay_request.pay_channel = "wxminigame"; // 微信小游戏米大师
        pay_request.cp_ext = developerPayload ? developerPayload : "";
        pay_request.pay_no = "";
        pay_request.product_id = productID;
        pay_request.product_quantity = productNum;
        pay_request.cp_role_id = Game.Controller.roleID().toString();
        pay_request.cp_group_id = Game.Controller.groupOwnerID().toString();
        pay_request.auth_key = "";
        pay_request.device_info = Util.getDeviceInfo();
        pay_request.version_info = Util.getAppVersionInfo();
        pay_request.channel_user_id = "";
        let body = JSON.stringify(pay_request);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event)=>{
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("wx_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("微信下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.PayRespBody>json.body;

            // 下单成功，本地先把单号存下来
            Game.Controller.setRoleStorageItem("midas_pending_payno", response.pay_no);
            Game.Controller.setRoleStorageItem("midas_pending_product_id", productID);

            // 调起微信支付
            wx['requestMidasPayment']({
                mode: 'game',
                env: 0, // 1为沙箱环境，0为正式环境
                offerId: '1450021628',
                currencyType: 'CNY',
                platform: 'android',
                buyQuantity: (response.amount * 10) >> 0,
                zoneId: 1,
                success: (res)=> {
                    //toast_success("支付成功");
                    Game.UIManager.closeWaitingUI();
                    this.check_midas_pay_stub();
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});
                },
                fail: (res)=> {
                    console.log(res);
                    toast_warning("支付失败或取消");
                    Game.UIManager.closeWaitingUI();
                    Game.Controller.removeRoleStorageItem("midas_pending_payno");
                    Game.Controller.removeRoleStorageItem("midas_pending_product_id");
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                }
            });
            
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent)=>{
            toast_warning("Ajax调用错误，微信下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("wx_pay request: " + body);
        Game.UIManager.openWaitingUI();
        return;
    }

    private check_midas_pay_stub() {
        let payno = Game.Controller.getRoleStorageItem("midas_pending_payno");
        if (!payno || payno.length <= 0) {
            Game.Controller.removeRoleStorageItem("midas_pending_payno");
            Game.Controller.removeRoleStorageItem("midas_pending_product_id");
            return;
        }

        let pay_request = new message.WxMiniGamePayReqBody();
        pay_request.pay_no = payno;
        pay_request.open_id = this.openid;
        pay_request.session_key = this.session_key;
        pay_request.device_info = Util.getDeviceInfo();
        pay_request.version_info = Util.getAppVersionInfo();
        let body = JSON.stringify(pay_request);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event)=>{
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("wx_midas_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("微信支付验证失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                return;
            }
            let response = <message.WxMiniGamePayRespBody>json.body;

            Game.UIManager.closeWaitingUI();
            if (response.state == 0 || response.state == 1) {
                let product_id = Game.Controller.getRoleStorageItem("midas_pending_product_id");
                if (!product_id) product_id = "";
                Game.Controller.removeRoleStorageItem("midas_pending_payno"); // 删除单号
                Game.Controller.removeRoleStorageItem("midas_pending_product_id"); // 删除单号
                EventTracker.track('支付', {
                    "product_id": product_id, 
                    "payno": payno, 
                    "user_id": Game.Controller.userID().toString(), 
                    "role_id": Game.Controller.roleID().toString(),
                    "role_name": Game.Controller.roleInfo().role_name
                });
                toast_success("支付成功");
            }
            else if (response.state == 2) {
                toast_warning("支付异常，请联系客服，订单号:" + payno);
            }            
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent)=>{
            toast_warning("Ajax调用错误，微信下单失败");
            Game.UIManager.closeWaitingUI();
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_wxminigame.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("wx_pay_midas request: " + body);
        Game.UIManager.openWaitingUI();
        return;
    }

    private pay_nowpay(productID: string, productNum: number, developerPayload?: string) {
        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            if (!('createRewardedVideoAd' in wx)) { // 支持版本 >= 2.0.4
                reject("该微信版本不支持视频激励广告");
                return;
            }
            if (!this.rewardedVideoAd) {
                reject("该微信版本不支持视频激励广告");
                return;
            }

            this.rewardedVideoAd.load()
            .then(() => {
                this.rewardedVideoAd.onClose(res => {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if ((res && res.isEnded) || res === undefined) {
                        // 正常播放结束，可以下发游戏奖励
                        this.rewardedVideoAd.load();
                        resolve();
                        return;
                    } else {
                        // 播放中途退出，不下发游戏奖励
                        this.rewardedVideoAd.load();
                        reject("播放中途退出");
                        return;
                    }
                });
                this.rewardedVideoAd.show();
            })
            .catch((error) => {
                reject("视频加载失败，请稍候再试！");
            });
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            if (!('createBannerAd' in wx)) { // 支持版本 >= 2.0.4
                reject("该微信版本不支持Banner广告");
                return;
            }

            if (this.bannerAd == null) {
                // 目前游戏区域占用上面1550个像素
                let sysinfo = wx.getSystemInfoSync();
                let windowWidth = sysinfo.windowWidth;
                let windowHeight = sysinfo.windowHeight;
                let top = 1550 * windowHeight / UIManager.StageHeight;
                let height = windowHeight - top;
                this.bannerAd = wx['createBannerAd']({
                        adUnitId: AppConfig.WxBannerAdUnitId,
                        style: {
                            left: windowWidth * 0.03,
                            top: top,
                            width: windowWidth * 0.94,
                            height: height
                        }
                    });
                if (!this.bannerAd) {
                    reject("Banner广告实例创建失败");
                    return;
                }
                this.bannerAd.onLoad(()=>{console.log("banner广告加载成功");})
                this.bannerAd.onError(err=>{console.log(err);})
            }

            this.bannerAd.show()
            .then(() => {
                resolve();
            })
            .catch((error) => {
                console.log(error);
                reject("Banner广告加载失败");
            });
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
window['WxAppPlatform'] = WxAppPlatform;
}