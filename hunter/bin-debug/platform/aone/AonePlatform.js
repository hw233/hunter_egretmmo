var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var zj;
(function (zj) {
    // Aone官方渠道，支持微信公众号和浏览器
    var WxBodyConfig = (function () {
        function WxBodyConfig() {
        }
        return WxBodyConfig;
    }());
    __reflect(WxBodyConfig.prototype, "WxBodyConfig");
    var WxShareEvent = (function () {
        function WxShareEvent() {
        }
        return WxShareEvent;
    }());
    __reflect(WxShareEvent.prototype, "WxShareEvent");
    var WxBodyMenuShareTimeline = (function (_super) {
        __extends(WxBodyMenuShareTimeline, _super);
        function WxBodyMenuShareTimeline() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return WxBodyMenuShareTimeline;
    }(WxShareEvent));
    __reflect(WxBodyMenuShareTimeline.prototype, "WxBodyMenuShareTimeline");
    var WxBodyMenuShareAppMessage = (function (_super) {
        __extends(WxBodyMenuShareAppMessage, _super);
        function WxBodyMenuShareAppMessage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return WxBodyMenuShareAppMessage;
    }(WxShareEvent));
    __reflect(WxBodyMenuShareAppMessage.prototype, "WxBodyMenuShareAppMessage");
    var AonePlatform = (function () {
        function AonePlatform() {
            this.code = ""; // 微信登录验证返回的临时code
            this.openid = ""; // 微信openid
        }
        // 当前环境是否支持该平台
        AonePlatform.isSupport = function () {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB && !window["hbs"]) {
                // if (Util.isWeixin() && (egret.getOption("code").length == 0)) {
                //     window.location.href = AonePlatform.get_redirect_url(); // 重定向获取code
                // }
                return true;
            }
            return false;
        };
        AonePlatform.get_redirect_url = function () {
            var href = AonePlatform.get_no_search_url();
            var url = encodeURIComponent(href);
            var rnd = (Math.random() * 1000) >> 0;
            var weixin_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + AonePlatform.appid + "&redirect_uri=" + url + "&response_type=code&scope=snsapi_base&state=" + rnd + "#wechat_redirect";
            return weixin_url;
        };
        AonePlatform.get_no_search_url = function () {
            return window.location.protocol + "//" + window.location.hostname + window.location.pathname;
            //return window.location.href;
        };
        // 平台名字
        AonePlatform.prototype.name = function () {
            return "aone_h5game";
        };
        AonePlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    zj.Device.isCopyright = true; // 规避版权
                    // AppConfig.Channel = "aone_h5game";
                    // if (Util.isWeixin()) {
                    //     this.code = egret.getOption("code");
                    //     await this.weixin_mp_init();
                    //     await this.query_wxapp_openid();
                    // }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("aone_h5game platform resolve");
                            resolve(true);
                        })];
                });
            });
        };
        // 关闭平台
        AonePlatform.prototype.close = function () {
            if (window && "close" in window) {
                window["close"]();
            }
            return;
        };
        // 复制文本到剪贴板
        AonePlatform.prototype.setClipboardData = function (str) {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var input = document.createElement("input");
                input.value = str;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length);
                try {
                    if (document.execCommand('Copy')) {
                        zj.toast_success("复制成功");
                    }
                    else {
                        zj.toast_warning("复制失败");
                    }
                    document.body.removeChild(input);
                }
                catch (err) {
                    document.body.removeChild(input);
                    zj.toast_warning("复制失败");
                }
            }
        };
        AonePlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve();
                }, 5000);
                return;
            });
        };
        // 重启
        AonePlatform.prototype.restart = function () {
            if (window && "location" in window && "href" in window["location"]) {
                if (zj.Util.isWeixin()) {
                    window.location.href = AonePlatform.get_redirect_url();
                }
                window.location.reload(true);
            }
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        AonePlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        AonePlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            console.log("aonegame platform shared ok");
            zj.toast_success("分享成功");
            return;
        };
        // 登录
        AonePlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            var _this = this;
            console.log("登录方式：Aone登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            zj.loadUI(zj.AoneLoginDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.open(_this.callback_success, _this.callback_fail, _this.callback_this);
                _this.callback_fail = null;
                _this.callback_success = null;
                _this.callback_this = null;
            });
        };
        // 获取用户openid
        AonePlatform.prototype.query_wxapp_openid = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    // 获取openid
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var wxlogin_request = new message.WechatOfficalAccountQueryOpenidReqBody();
                            wxlogin_request.code = _this.code;
                            wxlogin_request.device_info = zj.Util.getDeviceInfo();
                            wxlogin_request.version_info = zj.Util.getAppVersionInfo();
                            wxlogin_request.auth_key = "";
                            var body = JSON.stringify(wxlogin_request);
                            var request = new egret.HttpRequest();
                            request.responseType = egret.HttpResponseType.TEXT;
                            request.setRequestHeader("Content-Type", "application/json");
                            request.addEventListener(egret.Event.COMPLETE, function (event) {
                                zj.Game.UIManager.closeWaitingUI();
                                var request = event.currentTarget;
                                console.log("wxapp_query_openid response: " + request.response);
                                var json = JSON.parse(request.response);
                                if (json.retcode != 0) {
                                    if (json.retcode == 1000) {
                                        // 1000返回码说明code可能已失效，需要换一个code
                                        if (window["location"] && zj.Util.isWeixin()) {
                                            // 微信环境中直接重定向取一个新的code
                                            window.location.href = AonePlatform.get_redirect_url(); // 重定向获取code
                                            return;
                                        }
                                    }
                                    reject(zj.LANG("微信获取openid API失败:") + json.retcode);
                                    return;
                                }
                                var response = json.body;
                                _this.openid = response.openid;
                                zj.Controller.setGlobalStorageItem("device_id", _this.openid); // 设备Id为openid
                                resolve({});
                            }, _this);
                            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                                zj.Game.UIManager.closeWaitingUI();
                                console.warn("query_wxapp_openid io error");
                                resolve({});
                            }, _this);
                            request.open(zj.AppConfig.ApiUrlRoot + "/api/wechatofficalaccount_query_openid.do", egret.HttpMethod.POST);
                            request.send(body);
                            console.log("wx_query_openid request: " + body);
                            zj.Game.UIManager.openWaitingUI();
                        })];
                });
            });
        };
        // 更新角色信息
        // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
        AonePlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        AonePlatform.prototype.getOption = function (key) {
            var result = egret.getOption(key);
            if (result == undefined || result == null)
                return "";
            return result;
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        AonePlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        AonePlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        AonePlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        AonePlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        AonePlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        AonePlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var _this = this;
            // if (Util.isWeixin()) {
            //     this.do_pay("13", productID, productNum, developerPayload);
            // } else {
            zj.loadUI(zj.AonePayDialog)
                .then(function (dialog) {
                dialog.model(productID).then(function (type) {
                    _this.do_pay(type, productID, productNum, developerPayload);
                }).catch(function () {
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                });
            }).catch(function () {
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            });
            // }
        };
        AonePlatform.prototype.do_pay = function (payChannel, productID, productNum, developerPayload) {
            var _this = this;
            var pay_request = new message.IPayNowPayReqBody();
            pay_request.user_id = zj.Game.Controller.userID();
            pay_request.product_id = productID;
            pay_request.product_quantity = productNum;
            pay_request.cp_role_id = zj.Game.Controller.roleID().toString();
            pay_request.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            pay_request.cp_ext = developerPayload ? developerPayload : "";
            pay_request.device_info = zj.Util.getDeviceInfo();
            pay_request.version_info = zj.Util.getAppVersionInfo();
            if (zj.Util.isWeixin()) {
                pay_request.deviceType = "0600"; // 0600：公众号，0601：手机网页
                pay_request.payChannelType = "13"; // 公众号=》12：支付宝，13：微信，25：手Q；
                pay_request.outputType = "1";
            }
            else {
                pay_request.deviceType = "0601"; // 0600：公众号，0601：手机网页
                pay_request.payChannelType = payChannel; // 手机网页=》20：银联，12：支付宝，13：微信， 25：手Q
                pay_request.outputType = "0";
            }
            pay_request.consumerId = this.openid; // 微信公众号：openid
            pay_request.frontNotifyUrl = AonePlatform.get_no_search_url();
            var body = JSON.stringify(pay_request);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("wx_pay response: " + request.response);
                zj.Game.UIManager.closeWaitingUI();
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("下单API失败:") + json.retcode);
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                // let pay_data = response.pay_data;
                var pay_data = decodeURI(response.pay_data);
                var tn = decodeURIComponent(_this.getQueryString(pay_data, "tn"));
                if (zj.Util.isWeixin()) {
                    window['wx']['chooseWXPay']({
                        appId: _this.getQueryString(tn, "wxAppId"),
                        timestamp: _this.getQueryString(tn, "timeStamp"),
                        nonceStr: _this.getQueryString(tn, "nonceStr"),
                        package: "prepay_id=" + _this.getQueryString(tn, "prepay_id"),
                        signType: _this.getQueryString(tn, "signType"),
                        paySign: _this.getQueryString(tn, "paySign"),
                        success: function (res) {
                            // 支付成功后的回调函数
                            zj.toast_success("支付成功");
                            zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: true });
                        }
                    });
                }
                else {
                    console.log("do_pay: " + pay_request.payChannelType);
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: true });
                    var jumpStr = "pay.html";
                    if (pay_request.payChannelType == "13") {
                        // window.location.href = pay_data;// 在本窗体打开一个新的页面
                        var paydata = "channel=13&step=0&back=" + window.location.href + "&jump=" + jumpStr + "&pay_data=" + encodeURI(pay_data);
                        location.href = jumpStr + "?" + paydata;
                    }
                    else {
                        // document.documentElement.innerHTML = pay_data;
                        //document.body.innerHTML = pay_data;
                        // document.forms[0].submit();
                        var paydata = response.pay_data;
                        paydata = encodeURI(paydata);
                        var payStr = "channel=12&step=0&back=" + window.location.href + "&jump=" + jumpStr + "&pay_data=" + paydata;
                        location.href = jumpStr + "?" + payStr;
                    }
                }
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，微信下单失败");
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_ipaynow.do", egret.HttpMethod.POST);
            http_request.send(body);
            console.log("wx_pay request: " + body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        AonePlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("aone platform not support RewardedVideoAd");
                            reject("暂不支持视频激励广告功能");
                        })];
                });
            });
        };
        AonePlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("aone platform not support BannerAd");
                            reject("暂不支持Banner广告功能");
                        })];
                });
            });
        };
        AonePlatform.prototype.hideBannerAd = function () {
            return;
        };
        // 微信公众号环境初始化
        AonePlatform.prototype.weixin_mp_init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    // 获取jsapi_ticket
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var request = new egret.HttpRequest();
                            request.responseType = egret.HttpResponseType.TEXT;
                            request.setRequestHeader("Content-Type", "application/json");
                            request.addEventListener(egret.Event.COMPLETE, function (event) {
                                var request = event.currentTarget;
                                console.log("GetWechatJsTicket response: " + request.response);
                                var json = JSON.parse(request.response);
                                if (json.retcode != 0) {
                                    console.log(zj.LANG("GetWechatJsTicket fail:") + json.retcode);
                                    resolve({});
                                    return;
                                }
                                var response = json.body;
                                AonePlatform.appid = response.appid;
                                var config = new WxBodyConfig();
                                config.debug = false;
                                config.appId = response.appid;
                                config.nonceStr = response.noncestr;
                                config.timestamp = response.timestamp;
                                config.signature = response.signature;
                                config.jsApiList = ["checkJsApi", "onMenuShareAppMessage", "onMenuShareTimeline", "onMenuShareQQ", "onMenuShareQZone",
                                    "getNetworkType", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "chooseWXPay", /**/ "menuItem:copyUrl"];
                                window['wx']['ready'](function () {
                                    // 明确菜单
                                    window['wx']['hideAllNonBaseMenuItem']({});
                                    window['wx']['showMenuItems']({ "menuList": ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:QZone", "menuItem:favorite", "menuItem:refresh", "menuItem:copyUrl", "menuItem:openWithQQBrowser", "menuItem:openWithSafari"] });
                                    _this.set_normal_share();
                                    resolve({});
                                    return;
                                });
                                window['wx']['error'](function (res) {
                                    console.log("jssdk初始化失败:" + res.errMsg);
                                    resolve({});
                                    return;
                                });
                                window['wx']['config'](config);
                                return;
                            }, _this);
                            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                                console.warn("weixin_mp_init io error");
                                resolve({});
                            }, _this);
                            request.open(zj.AppConfig.ApiUrlRoot + "/api/get_wechat_js_ticket.do", egret.HttpMethod.POST);
                            var weixin_jsticket_request = new message.GetWechatJsTicketReqBody();
                            weixin_jsticket_request.url = window.location.href;
                            weixin_jsticket_request.device_info = zj.Util.getDeviceInfo();
                            weixin_jsticket_request.version_info = zj.Util.getAppVersionInfo();
                            request.send(JSON.stringify(weixin_jsticket_request));
                            console.log("weixin_jsticket: " + JSON.stringify(weixin_jsticket_request));
                        })];
                });
            });
        };
        // 普通分享
        AonePlatform.prototype.set_normal_share = function () {
            if (!zj.Util.isWeixin())
                return;
            var num = Object.keys(zj.TextsConfig.TextsConfig_Share.ShareTexts).length; //分享图片数组的长度
            var a = Math.floor(Math.random() * num); //随机数，随机抽取一套分享资源
            var title = zj.TextsConfig.TextsConfig_Share.ShareTexts[a];
            var imageUrl = zj.AppConfig.ProjectUrlRoot + zj.UIConfig.UIConfig_Special.shareImg[a];
            var query = "fromuserid=" + zj.Game.Controller.userID();
            // 分享给朋友
            var info1 = new WxBodyMenuShareAppMessage();
            info1.title = title;
            info1.desc = title;
            info1.link = window.location.href;
            info1.imgUrl = imageUrl;
            info1.type = "link";
            info1.success = function () {
                zj.toast("分享成功");
            };
            window['wx']['onMenuShareAppMessage'](info1);
            // 分享朋友圈
            var info2 = new WxBodyMenuShareTimeline();
            info2.title = title;
            info2.link = window.location.href;
            info2.imgUrl = imageUrl;
            info2.success = function () {
                zj.toast("分享成功");
            };
            window['wx']['onMenuShareTimeline'](info2);
            console.log("注册为普通分享");
        };
        AonePlatform.prototype.getQueryString = function (params, name) {
            if (!('location' in window))
                return "";
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = params.match(reg);
            if (r != null) {
                return r[2];
            }
            else {
                return "";
            }
        };
        AonePlatform.appid = "wx593cb89636ffddbe"; // 公众号ID
        return AonePlatform;
    }());
    zj.AonePlatform = AonePlatform;
    __reflect(AonePlatform.prototype, "zj.AonePlatform", ["zj.Platform"]);
    window['AonePlatform'] = AonePlatform;
})(zj || (zj = {}));
//# sourceMappingURL=AonePlatform.js.map