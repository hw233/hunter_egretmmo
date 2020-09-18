var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
    // 疯狂游戏(hortor)公众号游戏支持
    var HortorPlatform = (function () {
        function HortorPlatform() {
            this.timer = null; // 失败重试的定时器
            this.aone_user_id = 0; // (本平台)用户ID
            this.aone_user_account = ""; // (本平台)用户账号名
            this.aone_token = ""; // (本平台)用户身份验证码
        }
        // 当前环境是否支持该平台
        HortorPlatform.isSupport = function () {
            return ('__has_HortorPlatform' in window) && (window['__has_HortorPlatform'] == true);
        };
        // 平台名字
        HortorPlatform.prototype.name = function () {
            return "hortor";
        };
        // 复制文本到剪贴板
        HortorPlatform.prototype.setClipboardData = function (str) {
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
            zj.toast_success("复制成功");
        };
        HortorPlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        HortorPlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var sdk;
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "hortor";
                    sdk = window['HORTOR_AGENT'];
                    if (!sdk)
                        return [2 /*return*/];
                    sdk.init();
                    sdk.config({
                        gameId: "rxlr",
                        share: {
                            timeline: {
                                title: "《热血猎人》最强烧脑策略卡牌手游",
                                imgUrl: zj.AppConfig.ProjectUrlRoot + "icon_lr_h5.png",
                                success: function () { zj.toast_success("分享成功"); },
                                cancel: function () { zj.toast_warning("分享失败"); }
                            },
                            friend: {
                                title: "《热血猎人》",
                                desc: "最强烧脑策略卡牌手游",
                                imgUrl: zj.AppConfig.ProjectUrlRoot + "icon_lr_h5.png",
                                success: function () { zj.toast_success("分享成功"); },
                                cancel: function () { zj.toast_warning("分享失败"); }
                            },
                            shareCustomParam: {
                                cp_param1: "V2.0.4",
                                cp_param2: "",
                            }
                        },
                        pay: {
                            success: function () { zj.toast_success("支付成功，钻石即将到账"); },
                            cancel: function () { zj.toast_warning("支付失败"); }
                        }
                    });
                    sdk.showQRCode(); //引导关注公众号必须接入
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!HortorPlatform.isSupport()) {
                                reject("不支持疯狂游乐场平台");
                                return;
                            }
                            console.log("hortor h5 sdk init ok!");
                            resolve();
                        })];
                });
            });
        };
        // 关闭平台
        HortorPlatform.prototype.close = function () {
            if (window && "close" in window) {
                window["close"]();
            }
            return;
        };
        // 重启
        HortorPlatform.prototype.restart = function () {
            if (window && "location" in window && "reload" in window["location"]) {
                window.location.reload(true);
            }
            // if (window && "location" in window) {
            //     window.location.href = window.location.href;
            // }
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        HortorPlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        HortorPlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            return;
        };
        // 登录
        HortorPlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            console.log("登录方式：hortor h5登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            this.userId = zj.Util.getQueryString("userId");
            this.userName = zj.Util.getQueryString("userName");
            this.userSex = parseInt(zj.Util.getQueryString("userSex")) || 0;
            this.userImg = zj.Util.getQueryString("userImg");
            this.isSubscribe = zj.Util.getQueryString("isSubscribe") == "true";
            this.isShowSubscribe = zj.Util.getQueryString("isShowSubscribe") == "true";
            this.shareCode = zj.Util.getQueryString("shareCode");
            this.friendCode = zj.Util.getQueryString("friendCode");
            this.time = parseInt(zj.Util.getQueryString("time")) || 0;
            this.sign = zj.Util.getQueryString("sign");
            this.auth_hortor();
            return;
        };
        // 登录验证
        HortorPlatform.prototype.auth_hortor = function () {
            if (!HortorPlatform.isSupport())
                return;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var login_request = new message.HortorLoginReqBody();
            login_request.userId = this.userId;
            login_request.userName = this.userName;
            login_request.userSex = this.userSex;
            login_request.userImg = this.userImg;
            login_request.isSubscribe = this.isSubscribe;
            login_request.isShowSubscribe = this.isShowSubscribe;
            login_request.shareCode = this.shareCode;
            login_request.friendCode = this.friendCode;
            login_request.time = this.time;
            login_request.sign = this.sign;
            login_request.device_info = zj.Util.getDeviceInfo();
            login_request.version_info = zj.Util.getAppVersionInfo();
            var body = JSON.stringify(login_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onHortorGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/hortor_login.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("hortor request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        HortorPlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_hortor, this);
            this.timer.start();
        };
        // ajax请求登陆回复
        HortorPlatform.prototype.onHortorGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            console.log("hortor_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("hortor登录API失败:") + json.retcode);
                this.callback_fail.call(this.callback_this, "hortor登录API失败");
                return;
            }
            var response = json.body;
            this.aone_user_id = response.user_id;
            this.aone_user_account = response.user_account;
            this.aone_token = response.token;
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
        HortorPlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        HortorPlatform.prototype.getOption = function (key) {
            return "";
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        HortorPlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        HortorPlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        HortorPlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        HortorPlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        HortorPlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        HortorPlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var ext = developerPayload ? developerPayload : "";
            var payReq = new message.HortorPayReqBody();
            payReq.user_id = zj.Game.Controller.userID();
            payReq.hortor_user_id = this.userId;
            payReq.product_id = productID;
            payReq.product_quantity = productNum;
            payReq.cp_role_id = zj.Game.Controller.roleID().toString();
            payReq.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            payReq.cp_ext = ext;
            payReq.device_info = zj.Util.getDeviceInfo();
            payReq.version_info = zj.Util.getAppVersionInfo();
            payReq.version_info.channel = "hortor";
            var body = JSON.stringify(payReq);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("hortor_pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("hortor下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                var sdk = window['HORTOR_AGENT'];
                sdk && sdk.pay({
                    "order_id": response.order_id,
                    "app_id": response.app_id,
                    "timestamp": response.timestamp,
                    "nonce_str": response.nonce_str,
                    "package": response.package,
                    "sign_type": response.sign_type,
                    "pay_sign": response.pay_sign
                });
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，hortor下单失败");
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                zj.Game.UIManager.closeWaitingUI();
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_hortor.do", egret.HttpMethod.POST);
            http_request.send(body);
            console.log("hortor_pay request: " + body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        HortorPlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持hortor平台");
                        })];
                });
            });
        };
        HortorPlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持hortor平台");
                        })];
                });
            });
        };
        HortorPlatform.prototype.hideBannerAd = function () {
            return;
        };
        return HortorPlatform;
    }());
    zj.HortorPlatform = HortorPlatform;
    __reflect(HortorPlatform.prototype, "zj.HortorPlatform", ["zj.Platform"]);
    window['HortorPlatform'] = HortorPlatform;
})(zj || (zj = {}));
//# sourceMappingURL=HortorPlatform.js.map