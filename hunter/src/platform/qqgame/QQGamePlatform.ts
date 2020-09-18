namespace zj {
// QQ小程序(小游戏)环境支持

export class QQGamePlatform implements Platform {

    private button_club: any = null; // 游戏圈按钮
    private button_userinfo: any = null; // 获取用户信息按钮
    private userinfo_response: any /*qq.UserInfoResponse*/; // 获取的QQ用户信息回复
    private code: string = ""; // QQ登录验证返回的临时code
    private openid: string = ""; // QQopenid
    private session_key: string = ""; // 会话key
    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    private token: string; // 游戏平台返回的登录token
    private proxy_host: string; // 代理服主机地址
    private proxy_port: number; // 代理服主机端口

    private rewardedVideoAd: any = null; // QQ视频激励广告控件
    private bannerAd: any = null; // QQBanner广告控件

    private launch_query: Object = {}; // 启动或者show时带的参数
    private launch_scene: string = ""; // 启动或者show时带的场景信息，类似于 scene=1038  或scene=1037&appid=123456

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        let ret = egret.Capabilities.runtimeType == "qqgame";
        console.log('QQGamePlatform isSupport test is :' + ret);
        return ret;
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void{
        console.log("qqplatform setClipboardData: " + str);
        let qq: any = window['qq'] || {};
        if (!('setClipboardData' in qq)) return;
        qq.setClipboardData({
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
        return "qqgame";
    }

    public async init() {
        AppConfig.Channel = "qqgame";
        Device.isCopyright = true; // 规避版权
        // 监听小程序的前后台切换事件
        let qq: any = window['qq'] || {};
        if ('onShow' in qq) {
            qq['onShow']((res: any)=>{ this.onShow(res); });
        }
        if ('onHide' in qq) {
            qq['onHide']((res: any)=>{ this.onHide(res); });
        }

        // 打开右上角分享菜单
        if ('showShareMenu' in qq) { // 支持版本 >= 1.1.0
            let func: any = qq.showShareMenu;
            func({withShareTicket: false});
        }
        // 设置分享的默认内容
        if ('onShareAppMessage' in qq) {
            let onShareAppMessage = qq['aldOnShareAppMessage']; // 优先使用阿拉丁接口
            if (!onShareAppMessage) onShareAppMessage = qq['onShareAppMessage'];
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

        if ('createRewardedVideoAd' in qq) { // 支持版本 >= 2.0.4
            this.rewardedVideoAd= qq['createRewardedVideoAd']({adUnitId: AppConfig.QQRewardVideoAdUnitId});
            if (this.rewardedVideoAd) this.rewardedVideoAd.onLoad(()=>{console.log("视频广告加载成功")});
            if (this.rewardedVideoAd) this.rewardedVideoAd.onError((err)=>{console.log(err)});
        }

        let sysinfo = qq.getSystemInfoSync();
        console.log(sysinfo);

        let launchOptions: any = qq['getLaunchOptionsSync']();
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
            console.log("qq init resolve");
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
                let local_version = `${AppConfig.MajorVersion}.${AppConfig.MinorVersion}.${AppConfig.RevisionVersion}`;
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
        let qq: any = window['qq'] || {};
        if ('exitMiniProgram' in qq) {
            qq['exitMiniProgram']({});
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
        let qq: any = window['qq'] || {};
        if ('exitMiniProgram' in qq) {
            qq['exitMiniProgram']({});
        }
        return;
    }

    // 通知平台资源加载的百分比(0~100)
    public setLoadingProgress(percentage: number) {
        return;
    }

    // 分享
    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        let qq: any = window['qq'] || {};
        if (!('shareAppMessage' in qq)) return;
        let shareAppMessage = qq['aldShareAppMessage']; // 优先使用阿拉丁接口
        if (!shareAppMessage) shareAppMessage = qq['shareAppMessage'];
        if (imageUrl.length == 0) AppConfig.ProjectUrlRoot + "share/Share0.jpg";
        shareAppMessage({title: title, imageUrl: imageUrl, query: query});
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：QQ登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        let qq: any = window['qq'] || {};
        if (!('login' in qq)) {
            this.callback_fail.call(this.callback_this, "当前环境不支持QQ登录");
            return;
        }
        
        qq.login({
            success: (res: any/*qq.LoginResponse*/)=>{
                console.log(res);
                this.code = res.code;
                // this.checkScopSetting();

                if (Device.isReviewSwitch) {
                    this.auth_qqapp(); // 提审版QQ登录
                } else {
                    this.query_qqapp_openid(); // 正式版以openid为设备ID，采用aone登录
                }
            },
            fail:(res:any)=>{
                console.log(res);
                this.callback_fail.call(this.callback_this, "QQ登录失败");
            }
        });
    }

    // 检查用户授权
    private checkScopSetting(): void {
        let qq: any = window['qq'] || {};
        if (!('getSetting' in qq)) { // 支持版本 >= 1.2.0
            this.showUserInfoButton();
            return;
        }

        qq.getSetting({
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
        let qq: any = window['qq'] || {};
        if (!('getUserInfo' in qq)) {
            this.callback_fail.call(this.callback_this, "当前环境不支持获取用户基本信息");
            return;
        }

        qq.getUserInfo({
            success: (res: any/*qq.UserInfoResponse*/) => {
                console.log(res);
                this.userinfo_response = res;
                if (Device.isReviewSwitch) {
                    this.auth_qqapp(); // 提审版QQ登录
                } else {
                    this.query_qqapp_openid(); // 正式版以openid为设备ID，采用aone登录
                }
            },
            fail: (res: any) => {
                console.log(res);
                this.callback_fail.call(this.callback_this, "获取用户信息失败");
            }
        })
    }

    // 显示获取用户信息按钮
    // QQ官方推荐的获取用户信息的方案
    private showUserInfoButton(): void {
        let qq: any = window['qq'] || {};
        if (!('createUserInfoButton' in qq)) { // 支持版本 >= 2.0.1
            this.getUserInfo();
            return;
        }

        if (this.button_userinfo == null) {
            this.button_userinfo = qq['createUserInfoButton']({
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

            this.button_userinfo.onTap((res: any/*qq.UserInfoResponse*/) => {
                console.log(res);
                console.log("用户点击QQ获取用户信息按钮");
                if (this.button_userinfo) this.button_userinfo.hide();
                if (this.button_userinfo) this.button_userinfo.destroy();
                this.button_userinfo = null;
                if ('userInfo' in res) {
                    // 用户同意授权了
                    this.userinfo_response = res;
                    if (Device.isReviewSwitch) {
                        this.auth_qqapp(); // 提审版QQ登录
                    } else {
                        this.query_qqapp_openid(); // 正式版以openid为设备ID，采用aone登录
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
    private query_qqapp_openid(): void {
        let qq: any = window['qq'] || {};
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let qqlogin_request = new message.QQQueryOpenidReqBody();
        qqlogin_request.code = this.code;
        qqlogin_request.device_info = Util.getDeviceInfo();
        qqlogin_request.version_info = Util.getAppVersionInfo();
        qqlogin_request.auth_key = "";
        let body = JSON.stringify(qqlogin_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onQQGameQueryOpenidGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/qq_query_openid.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("qq_query_openid request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // 登录验证获取token
    private auth_qqapp(): void {
        let qq: any = window['qq'] || {};
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let qqlogin_request = new message.QQGameLoginReqBody();
        qqlogin_request.code = this.code;
        qqlogin_request.device_info = Util.getDeviceInfo();
        qqlogin_request.version_info = Util.getAppVersionInfo();
        qqlogin_request.auth_key = "";
        let body = JSON.stringify(qqlogin_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onQQGameLoginGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/qqgame_login.do", egret.HttpMethod.POST);
        request.send(body);
        //console.log("qq_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        let qq: any = window['qq'] || {};
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.closeWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        if (Device.isReviewSwitch) {
            // 提审版QQ登录
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_qqapp, this);
        } else {
            // 正式版以openid为设备ID，采用aone登录
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.query_qqapp_openid, this);
        }
        this.timer.start();
    }

    // ajax请求weixin登陆回复
    private onQQGameLoginGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("qqapp_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("QQ登录API失败:") + json.retcode);
            return;
        }

        let response = <message.QQGameLoginRespBody>json.body;
        this.openid = response.openid;
        this.session_key = response.session_key;
        Controller.setGlobalStorageItem("device_id", this.openid); // 设备Id为openid

        EventTracker.track('账号登录', {
            "login_type": "QQ登录",
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

        return;
    }

    // ajax请求weixin获取openid回复
    private onQQGameQueryOpenidGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        console.log("qqapp_query_openid response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("QQ获取openid API失败:") + json.retcode);
            return;
        }

        let response = <message.QQQueryOpenidRespBody>json.body;
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
        let qq: any = window['qq'] || {};
        if (!('createGameClubButton' in qq)) return; // 支持版本 >= 2.0.3

        if (this.button_club == null) {
            this.button_club = qq['createGameClubButton']({
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
        let qq: any = window['qq'] || {};
        if ('vibrateShort' in qq) { // 支持版本 >= 1.2.0
            qq['vibrateShort']({});
        }
    }

    // 较长时间振动(400ms)
    public vibrateLong(): void {
        let qq: any = window['qq'] || {};
        if ('vibrateLong' in qq) { // 支持版本 >= 1.2.0
            qq['vibrateLong']({});
        }
    }

    public pay_midas(productID: string, productNum: number, developerPayload?: string) {
        let qq: any = window['qq'] || {};
        if (!('requestMidasPayment' in qq)) {
            toast_warning("暂不支持米大师支付");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            return;
        }

        let productInfo: MyProductInfo = Game.PlayerPaySystem.queryProduct(productID);
        if (productInfo == null) {
            toast_warning("未找到指定商品");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            return;
        }

        let qq_request = new message.QQGamePayReqBody();
        qq_request.user_id = Game.Controller.userID();
        qq_request.product_id = productID;
        qq_request.product_quantity = productNum;
        qq_request.cp_role_id = Game.Controller.roleID().toString();
        qq_request.cp_group_id = Game.Controller.groupOwnerID().toString();
        qq_request.cp_ext = developerPayload ? developerPayload : "";
        qq_request.device_info = Util.getDeviceInfo();
        qq_request.version_info = Util.getAppVersionInfo();
        qq_request.openid = this.openid;
        qq_request.session_key = this.session_key;
        let body = JSON.stringify(qq_request);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event)=>{
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("qqgame_pay response: " + request.response);
            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("米大师下单API失败:") + json.retcode);
                Game.UIManager.closeWaitingUI();
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.QQGamePayRespBody>json.body;
            // 调起米大师支付
            console.log("starCurrency" + ((productInfo.amount * productNum * 10) >> 0));
            qq['requestMidasPayment']({
                prepayId: response.prepayId,
                starCurrency: (productInfo.amount * productNum * 10) >> 0,
                setEnv: 1, // 0正式，1测试
                success(res) { toast_success("支付成功"); Game.UIManager.closeWaitingUI(); Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});},
                fail(res) { toast_warning("支付失败"); console.log(JSON.stringify(res)); Game.UIManager.closeWaitingUI(); Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});}
            });
            
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent)=>{
            toast_warning("Ajax调用错误，米大师下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_qqgame.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("qqgame_pay request: " + body);
        Game.UIManager.openWaitingUI();
        return;
    }

    public pay(productID: string, productNum: number, developerPayload?: string) {
        //if (Device.isReviewSwitch) {
            this.pay_midas(productID, productNum, developerPayload);
        //} else {
        //    this.pay_nowpay(productID, productNum, developerPayload);
        //}
    }

    private pay_nowpay(productID: string, productNum: number, developerPayload?: string) {
        return;
    }

    public async showRewardedVideoAd() {
        let qq: any = window['qq'] || {};
        return new Promise((resolve, reject) => {
            if (!('createRewardedVideoAd' in qq)) { // 支持版本 >= 
                reject("该QQ版本不支持视频激励广告");
                return;
            }
            if (!this.rewardedVideoAd) {
                reject("该QQ版本不支持视频激励广告");
                return;
            }

            this.rewardedVideoAd.load()
            .then(() => {
                this.rewardedVideoAd.onClose(res => {
                    // 用户点击了【关闭广告】按钮
                    if (res && res.isEnded) {
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
        let qq: any = window['qq'] || {};
        return new Promise((resolve, reject) => {
            if (!('createBannerAd' in qq)) { // 支持版本 >= 2.0.4
                reject("该微信版本不支持Banner广告");
                return;
            }

            if (this.bannerAd == null) {
                // 目前游戏区域占用上面1550个像素
                let sysinfo = qq.getSystemInfoSync();
                let windowWidth = sysinfo.windowWidth;
                let windowHeight = sysinfo.windowHeight;
                let top = 1550 * windowHeight / UIManager.StageHeight;
                let height = windowHeight - top;
                this.bannerAd = qq['createBannerAd']({
                        adUnitId: AppConfig.QQBannerAdUnitId,
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
window['QQGamePlatform'] = QQGamePlatform;
}