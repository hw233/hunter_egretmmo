namespace zj {
// Aone官方渠道，支持微信公众号和浏览器

class WxBodyConfig {
    debug: boolean;
    appId: string;
    timestamp: number;
    nonceStr: string;
    signature: string;
    jsApiList: Array<string>;
}

class WxShareEvent {
    trigger: Function;
    success: Function;
    cancel: Function;
    fail: Function;
}

class WxBodyMenuShareTimeline extends WxShareEvent {
    title: string;
    link: string;
    imgUrl: string;
}

class WxBodyMenuShareAppMessage extends WxShareEvent {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
    type: string;
    dataUrl: string;
}

export class AonePlatform implements Platform {
    private static appid = "wx593cb89636ffddbe"; // 公众号ID
    private code: string = ""; // 微信登录验证返回的临时code
    private openid: string = ""; // 微信openid
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB && !window["hbs"]) {
            // if (Util.isWeixin() && (egret.getOption("code").length == 0)) {
            //     window.location.href = AonePlatform.get_redirect_url(); // 重定向获取code
            // }
            return true;
        }
        return false;
    }

    private static get_redirect_url(): string {
        let href = AonePlatform.get_no_search_url();
        let url = encodeURIComponent(href);
        let rnd = (Math.random() * 1000) >> 0;
        let weixin_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AonePlatform.appid}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=${rnd}#wechat_redirect`;
        return weixin_url;
    }

    private static get_no_search_url(): string {
        return window.location.protocol + "//" + window.location.hostname + window.location.pathname;
        //return window.location.href;
    }

    // 平台名字
    public name(): string {
        return "aone_h5game";
    }

    public async init() {
        Device.isCopyright = true; // 规避版权
        // AppConfig.Channel = "aone_h5game";
        // if (Util.isWeixin()) {
        //     this.code = egret.getOption("code");
        //     await this.weixin_mp_init();
        //     await this.query_wxapp_openid();
        // }

        return new Promise((resolve, reject) => {
            console.log("aone_h5game platform resolve");
            resolve(true);
        });
    }

    // 关闭平台
    public close() {
        if (window && "close" in window) {
            window["close"]();
        }
        return;
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length);
            try {
                if (document.execCommand('Copy')) {
                    toast_success("复制成功");
                } else {
                    toast_warning("复制失败");
                }
                document.body.removeChild(input);
            } catch (err) {
                document.body.removeChild(input);
                toast_warning("复制失败");
            }
        }
    }

    public playVideo(videoName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve();
            }, 5000);
            return;
        });
    }

    // 重启
    public restart() {
        if (window && "location" in window && "href" in window["location"]) {
            if (Util.isWeixin()) {
                window.location.href = AonePlatform.get_redirect_url();
            }
            window.location.reload(true);
        }
        return;
    }

    // 通知平台资源加载的百分比(0~100)
    public setLoadingProgress(percentage: number) {
        return;
    }

    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        console.log("aonegame platform shared ok");
        toast_success("分享成功");
        return;
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：Aone登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        loadUI(AoneLoginDialog)
            .then((dialog: AoneLoginDialog) => {
                dialog.show(UI.SHOW_FILL_OUT);
                dialog.open(this.callback_success, this.callback_fail, this.callback_this);
                this.callback_fail = null;
                this.callback_success = null;
                this.callback_this = null;
            });
    }

    // 获取用户openid
    private async query_wxapp_openid() {
        // 获取openid
        return new Promise((resolve, reject) => {
            let wxlogin_request = new message.WechatOfficalAccountQueryOpenidReqBody();
            wxlogin_request.code = this.code;
            wxlogin_request.device_info = Util.getDeviceInfo();
            wxlogin_request.version_info = Util.getAppVersionInfo();
            wxlogin_request.auth_key = "";
            let body = JSON.stringify(wxlogin_request);

            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                Game.UIManager.closeWaitingUI();
                let request = <egret.HttpRequest>event.currentTarget;
                console.log("wxapp_query_openid response: " + request.response);

                let json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    if (json.retcode == 1000) {
                        // 1000返回码说明code可能已失效，需要换一个code
                        if (window["location"] && Util.isWeixin()) {
                            // 微信环境中直接重定向取一个新的code
                            window.location.href = AonePlatform.get_redirect_url(); // 重定向获取code
                            return;
                        }
                    }
                    reject(LANG("微信获取openid API失败:") + json.retcode);
                    return;
                }

                let response = <message.WechatOfficalAccountQueryOpenidRespBody>json.body;
                this.openid = response.openid;
                Controller.setGlobalStorageItem("device_id", this.openid); // 设备Id为openid
                resolve({});
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
                Game.UIManager.closeWaitingUI();
                console.warn("query_wxapp_openid io error");
                resolve({});
            }, this);
            request.open(AppConfig.ApiUrlRoot + "/api/wechatofficalaccount_query_openid.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("wx_query_openid request: " + body);
            Game.UIManager.openWaitingUI();
        })
    }

    // 更新角色信息
    // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
    public updateRole(type: string) {
        return;
    }

    // 获取程序启动参数
    public getOption(key: string): string {
        let result = egret.getOption(key);
        if (result == undefined || result == null) return "";
        return result;
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
        // if (Util.isWeixin()) {
        //     this.do_pay("13", productID, productNum, developerPayload);
        // } else {
            loadUI(AonePayDialog)
                .then((dialog: AonePayDialog) => {
                    dialog.model(productID).then((type: string) => {
                        this.do_pay(type, productID, productNum, developerPayload);
                    }).catch(()=>{
                        Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                    });
                }).catch(()=>{
                    Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                });
        // }
    }

    private do_pay(payChannel: string, productID: string, productNum: number, developerPayload?: string) {
        let pay_request = new message.IPayNowPayReqBody();
        pay_request.user_id = Game.Controller.userID();
        pay_request.product_id = productID;
        pay_request.product_quantity = productNum;
        pay_request.cp_role_id = Game.Controller.roleID().toString();
        pay_request.cp_group_id = Game.Controller.groupOwnerID().toString();
        pay_request.cp_ext = developerPayload ? developerPayload : "";
        pay_request.device_info = Util.getDeviceInfo();
        pay_request.version_info = Util.getAppVersionInfo();
        if (Util.isWeixin()) {
            pay_request.deviceType = "0600"; // 0600：公众号，0601：手机网页
            pay_request.payChannelType = "13"; // 公众号=》12：支付宝，13：微信，25：手Q；
            pay_request.outputType = "1";
        } else {
            pay_request.deviceType = "0601"; // 0600：公众号，0601：手机网页
            pay_request.payChannelType = payChannel; // 手机网页=》20：银联，12：支付宝，13：微信， 25：手Q
            pay_request.outputType = "0";
        }
        pay_request.consumerId = this.openid; // 微信公众号：openid
        pay_request.frontNotifyUrl = AonePlatform.get_no_search_url();
        let body = JSON.stringify(pay_request);

        let http_request = new egret.HttpRequest();
        http_request.responseType = egret.HttpResponseType.TEXT;
        http_request.setRequestHeader("Content-Type", "application/json");
        http_request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("wx_pay response: " + request.response);
            Game.UIManager.closeWaitingUI();

            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast_warning(LANG("下单API失败:") + json.retcode);
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
                return;
            }
            let response = <message.IPayNowPayRespBody>json.body;
            // let pay_data = response.pay_data;
            let pay_data = decodeURI(response.pay_data);
            let tn = decodeURIComponent(this.getQueryString(pay_data, "tn"));

            if (Util.isWeixin()) {
                window['wx']['chooseWXPay']({
                    appId: this.getQueryString(tn, "wxAppId"),
                    timestamp: this.getQueryString(tn, "timeStamp"), // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: this.getQueryString(tn, "nonceStr"), // 支付签名随机串，不长于 32 位
                    package: "prepay_id=" + this.getQueryString(tn, "prepay_id"), // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: this.getQueryString(tn, "signType"), // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: this.getQueryString(tn, "paySign"), // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数
                        toast_success("支付成功");
                        Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});
                    }
                });
            } else {
                console.log("do_pay: " + pay_request.payChannelType);
                Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});
                let jumpStr = "pay.html";
                if (pay_request.payChannelType == "13") {// 微信支付
                    // window.location.href = pay_data;// 在本窗体打开一个新的页面
                    let paydata = "channel=13&step=0&back=" + window.location.href + "&jump=" + jumpStr + "&pay_data=" + encodeURI(pay_data);
                    location.href = jumpStr + "?" + paydata;
                } else {
                    // document.documentElement.innerHTML = pay_data;
                    //document.body.innerHTML = pay_data;
                    // document.forms[0].submit();
                    let paydata = response.pay_data;
                    paydata = encodeURI(paydata);
                    let payStr = "channel=12&step=0&back=" + window.location.href + "&jump=" + jumpStr + "&pay_data=" + paydata;
                    location.href = jumpStr + "?" + payStr;
                }
            }
        }, this);
        http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
            toast_warning("Ajax调用错误，微信下单失败");
            Game.UIManager.closeWaitingUI();
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        }, this);
        http_request.open(AppConfig.ApiUrlRoot + "/api/pay_ipaynow.do", egret.HttpMethod.POST);
        http_request.send(body);
        console.log("wx_pay request: " + body);
        Game.UIManager.openWaitingUI();
        return;
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            console.log("aone platform not support RewardedVideoAd");
            reject("暂不支持视频激励广告功能");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            console.log("aone platform not support BannerAd");
            reject("暂不支持Banner广告功能");
        });
    }

    public hideBannerAd() {
        return;
    }

    // 微信公众号环境初始化
    private async weixin_mp_init() {
        // 获取jsapi_ticket
        return new Promise((resolve, reject) => {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                let request = <egret.HttpRequest>event.currentTarget;
                console.log("GetWechatJsTicket response: " + request.response);

                let json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    console.log(LANG("GetWechatJsTicket fail:") + json.retcode);
                    resolve({});
                    return;
                }

                let response = <message.GetWechatJsTicketRespBody>json.body;
                AonePlatform.appid = response.appid;

                let config = new WxBodyConfig();
                config.debug = false;
                config.appId = response.appid;
                config.nonceStr = response.noncestr;
                config.timestamp = response.timestamp;
                config.signature = response.signature;
                config.jsApiList = ["checkJsApi", "onMenuShareAppMessage", "onMenuShareTimeline", "onMenuShareQQ", "onMenuShareQZone", 
                    "getNetworkType", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "chooseWXPay", /**/ "menuItem:copyUrl"];
                window['wx']['ready'](() => {
                    // 明确菜单
                    window['wx']['hideAllNonBaseMenuItem']({});
                    window['wx']['showMenuItems']({ "menuList": ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:QZone", "menuItem:favorite", "menuItem:refresh", "menuItem:copyUrl", "menuItem:openWithQQBrowser", "menuItem:openWithSafari"] });

                    this.set_normal_share();
                    resolve({});
                    return;
                });
                window['wx']['error']((res: any) => {
                    console.log("jssdk初始化失败:" + res.errMsg);
                    resolve({});
                    return;
                });
                window['wx']['config'](config);
                return;
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
                console.warn("weixin_mp_init io error");
                resolve({});
            }, this);
            request.open(AppConfig.ApiUrlRoot + "/api/get_wechat_js_ticket.do", egret.HttpMethod.POST);
            let weixin_jsticket_request = new message.GetWechatJsTicketReqBody();
            weixin_jsticket_request.url = window.location.href;
            weixin_jsticket_request.device_info = Util.getDeviceInfo();
            weixin_jsticket_request.version_info = Util.getAppVersionInfo();
            request.send(JSON.stringify(weixin_jsticket_request));
            console.log("weixin_jsticket: " + JSON.stringify(weixin_jsticket_request));
        });
    }

    // 普通分享
    public set_normal_share() {
        if (!Util.isWeixin()) return;
        let num: number = Object.keys(TextsConfig.TextsConfig_Share.ShareTexts).length;//分享图片数组的长度
        let a = Math.floor(Math.random() * num);//随机数，随机抽取一套分享资源
        let title = TextsConfig.TextsConfig_Share.ShareTexts[a];
        let imageUrl = AppConfig.ProjectUrlRoot + UIConfig.UIConfig_Special.shareImg[a];
        let query = `fromuserid=${Game.Controller.userID()}`;

        // 分享给朋友
        let info1 = new WxBodyMenuShareAppMessage();
        info1.title = title;
        info1.desc = title;
        info1.link = window.location.href;
        info1.imgUrl = imageUrl;
        info1.type = "link";
        info1.success = () => {
            toast("分享成功");
        };
        window['wx']['onMenuShareAppMessage'](info1);

        // 分享朋友圈
        let info2 = new WxBodyMenuShareTimeline();
        info2.title = title;
        info2.link = window.location.href;
        info2.imgUrl = imageUrl;
        info2.success = () => {
            toast("分享成功");
        };
        window['wx']['onMenuShareTimeline'](info2);

        console.log("注册为普通分享");
    }

    private getQueryString(params: string, name: string) {
        if (!('location' in window)) return "";
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = params.match(reg);
        if (r != null) {
            return r[2];
        } else {
            return "";
        }
    }
}
window['AonePlatform'] = AonePlatform;
}