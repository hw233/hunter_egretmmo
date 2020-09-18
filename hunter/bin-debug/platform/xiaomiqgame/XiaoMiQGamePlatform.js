var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 小米小游戏sdk
    var XiaoMiQGamePlatform = (function () {
        function XiaoMiQGamePlatform() {
            this.appId = "2882303761518262963";
            this.timer = null; // 失败重试的定时器
        }
        // 当前环境是否支持该平台
        XiaoMiQGamePlatform.isSupport = function () {
            var qg = window['qg'] ? window['qg'] : {};
            return ('getProvider' in qg) && (qg.getProvider() == "Xiaomi") && ('login' in qg) && ('pay' in qg);
        };
        // 平台名字
        XiaoMiQGamePlatform.prototype.name = function () {
            return "xiaomiqgame";
        };
        // 复制文本到剪贴板
        XiaoMiQGamePlatform.prototype.setClipboardData = function (str) {
        };
        XiaoMiQGamePlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        // 初始化平台
        XiaoMiQGamePlatform.prototype.init = function () {
            zj.AppConfig.Channel = "xiaomiqgame";
            // 监听并更新版本
            if (window['qg'] && window['qg']['getUpdateManager']) {
                var manager = window['qg'].getUpdateManager(); // UpdateManager
                if (manager) {
                    if (manager['onUpdateReady']) {
                        manager['onUpdateReady'](function () {
                            window['qg'].getUpdateManager().applyUpdate(); // 强制快游戏重启并使用新版本
                        });
                    }
                }
            }
            return new Promise(function (resolve, reject) {
                console.log("xiaomiqgame sdk init ok!");
                resolve();
            });
        };
        // 关闭平台
        XiaoMiQGamePlatform.prototype.close = function () {
            if (window['qg'] && window['qg']['getUpdateManager']) {
                var manager = window['qg'].getUpdateManager(); // UpdateManager
                if (manager && manager['applyUpdate']) {
                    manager['applyUpdate']();
                }
            }
            return;
        };
        // 重启游戏
        XiaoMiQGamePlatform.prototype.restart = function () {
            if (window['qg'] && window['qg']['getUpdateManager']) {
                var manager = window['qg'].getUpdateManager(); // UpdateManager
                if (manager && manager['applyUpdate']) {
                    manager['applyUpdate']();
                }
            }
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        XiaoMiQGamePlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        // 登录
        XiaoMiQGamePlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            var _this = this;
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            var qg = window['qg'] ? window['qg'] : {};
            qg.login({
                success: function (res) {
                    console.log("login success, res is:", JSON.stringify(res));
                    _this.appAccountId = res.data.appAccountId;
                    _this.session = res.data.session;
                    _this.authApp();
                },
                fail: function (res) {
                    console.log("xiaomiqgame login failed:" + JSON.stringify(res));
                    _this.callback_fail.call(_this.callback_this, "小米小游戏登录失败");
                }
            });
            return;
        };
        // 登录验证
        XiaoMiQGamePlatform.prototype.authApp = function () {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var xiaomiqg_request = new message.SDKLoginReqBody();
            xiaomiqg_request.sdk_userid = this.appAccountId + "";
            xiaomiqg_request.sdk_version = "";
            xiaomiqg_request.sdk_token = this.session;
            xiaomiqg_request.device_info = zj.Util.getDeviceInfo();
            xiaomiqg_request.version_info = zj.Util.getAppVersionInfo();
            xiaomiqg_request.auth_key = "";
            var body = JSON.stringify(xiaomiqg_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onAppGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("xiaomiqgame login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        XiaoMiQGamePlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.authApp, this);
            this.timer.start();
        };
        // ajax请求ziaomi app登陆回复
        XiaoMiQGamePlatform.prototype.onAppGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("xiaomiqgame login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("小米快游戏登录API失败:") + json.retcode);
                this.callback_fail.call(this.callback_this, "\u5C0F\u7C73\u5FEB\u6E38\u620F\u767B\u5F55API\u5931\u8D25: " + json.retcode);
                return;
            }
            var response = json.body;
            if (this.callback_this) {
                this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
                this.callback_fail = null;
                this.callback_success = null;
                this.callback_this = null;
            }
            return;
        };
        // 更新角色信息
        // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
        XiaoMiQGamePlatform.prototype.updateRole = function (type) {
            return;
        };
        // 分享
        // title: 转发标题，不传则默认使用当前小游戏的昵称。
        // imageUrl: 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
        // linkUrl: // 分享跳转的url路径(可选)
        // query: 查询字符串, 必须是 key1=val1&key2=val2 的格式
        XiaoMiQGamePlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            return;
        };
        // 获取程序启动参数
        XiaoMiQGamePlatform.prototype.getOption = function (key) {
            return;
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        XiaoMiQGamePlatform.prototype.getScene = function () {
            return;
        };
        // 显示游戏圈(游戏论坛)按钮
        XiaoMiQGamePlatform.prototype.showClubButton = function () {
            return;
        };
        // 隐藏游戏圈(游戏论坛)按钮
        XiaoMiQGamePlatform.prototype.hideClubButton = function () {
            return;
        };
        // 短时间振动(15ms)
        XiaoMiQGamePlatform.prototype.vibrateShort = function () {
            return;
        };
        // 较长时间振动(400ms)
        XiaoMiQGamePlatform.prototype.vibrateLong = function () {
            return;
        };
        // 支付请求
        // productID: 商口唯一ID
        // productNum: 购买数量
        // developerPayload: 开发附加信息
        XiaoMiQGamePlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var qg = window['qg'] ? window['qg'] : {};
            if (!('pay' in qg)) {
                zj.toast_warning("暂不支持小米快游戏支付");
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                return;
            }
            var xiaomiqgpay_request = new message.XiaomiQGamePayReqBody();
            xiaomiqgpay_request.user_id = zj.Game.Controller.userID();
            xiaomiqgpay_request.product_id = productID;
            xiaomiqgpay_request.product_quantity = productNum;
            xiaomiqgpay_request.cp_role_id = zj.Game.Controller.roleID().toString();
            xiaomiqgpay_request.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            xiaomiqgpay_request.cp_ext = developerPayload ? developerPayload : "";
            xiaomiqgpay_request.device_info = zj.Util.getDeviceInfo();
            xiaomiqgpay_request.version_info = zj.Util.getAppVersionInfo();
            xiaomiqgpay_request.version_info.channel = "xiaomiqgame";
            xiaomiqgpay_request.appAccountId = this.appAccountId + "";
            xiaomiqgpay_request.session = this.session;
            var body = JSON.stringify(xiaomiqgpay_request);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("xiaomiqgame pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("小米快游戏下单API失败:") + json.retcode);
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                // 调起支付
                qg.pay({
                    orderInfo: JSON.parse(response.orderInfo),
                    success: function (res) {
                        console.log('pay success');
                        zj.toast_success("支付成功");
                        zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: true });
                    },
                    fail: function (res) {
                        console.log("code:" + res.errCode + " msg:" + res.errMsg);
                        zj.toast_warning("\u652F\u4ED8\u5931\u8D25");
                        zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    }
                });
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，小米快游戏下单失败");
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_xiaomiqgame.do", egret.HttpMethod.POST);
            console.log("xiaomiggame pay request: " + body);
            http_request.send(body);
            return;
        };
        // 显示视频激励广告
        XiaoMiQGamePlatform.prototype.showRewardedVideoAd = function () {
            return new Promise(function (resolve, reject) {
            });
        };
        // 显示Banner广告
        XiaoMiQGamePlatform.prototype.showBannerAd = function () {
            return;
        };
        // 隐藏Banner广告
        XiaoMiQGamePlatform.prototype.hideBannerAd = function () {
            return;
        };
        return XiaoMiQGamePlatform;
    }());
    zj.XiaoMiQGamePlatform = XiaoMiQGamePlatform;
    __reflect(XiaoMiQGamePlatform.prototype, "zj.XiaoMiQGamePlatform", ["zj.Platform"]);
    window['XiaoMiQGamePlatform'] = XiaoMiQGamePlatform;
})(zj || (zj = {}));
//# sourceMappingURL=XiaoMiQGamePlatform.js.map