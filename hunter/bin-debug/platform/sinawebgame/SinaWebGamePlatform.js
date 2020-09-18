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
    var SinaWebGamePlatform = (function () {
        function SinaWebGamePlatform() {
            this.timer = null; // 失败重试的定时器
            this.appkey = "2175142436";
            this.pageId = "1068031s2372357442s1079455599"; // 说明：此时pageId为测试ID 上线后拿到正式ID后替换
        }
        // 当前环境是否支持该平台
        SinaWebGamePlatform.isSupport = function () {
            return (('location' in window) && ('search' in window['location']) && ('share_game' in window));
        };
        // 平台名字
        SinaWebGamePlatform.prototype.name = function () {
            return "sina";
        };
        // 复制文本到剪贴板
        SinaWebGamePlatform.prototype.setClipboardData = function (str) {
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
            zj.toast_success("复制成功");
        };
        SinaWebGamePlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        SinaWebGamePlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "sinawgame";
                    if ('sngH5GameOnResume' in window) {
                        window['sngH5GameOnResume'](function (res) { _this.sngH5GameOnResume(); });
                    }
                    if ('sngH5GameOnPause' in window) {
                        window['sngH5GameOnPause'](function (res) { _this.sngH5GameOnPause(); });
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!SinaWebGamePlatform.isSupport()) {
                                reject("不支持sina H5游戏平台");
                                return;
                            }
                            console.log("sina h5 sdk init ok!");
                            resolve();
                        })];
                });
            });
        };
        SinaWebGamePlatform.prototype.sngH5GameOnResume = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("切回前台");
                    zj.Game.SoundManager.resumeMusic();
                    return [2 /*return*/];
                });
            });
        };
        SinaWebGamePlatform.prototype.sngH5GameOnPause = function () {
            console.log("切到后台");
            zj.Game.SoundManager.pauseMusic();
        };
        // 关闭平台
        SinaWebGamePlatform.prototype.close = function () {
            return;
        };
        // 重启
        SinaWebGamePlatform.prototype.restart = function () {
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        SinaWebGamePlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        SinaWebGamePlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            if (!('share_game' in window)) {
                zj.toast_warning("暂不支持sina分享");
                return;
            }
            window['share_game'].share_weibo({
                page_id: this.pageId,
                content: title,
                app_key: this.appkey,
                token: this.token,
                fullscreen: this.fullscreen,
                uid: this.userId,
                success: function () {
                    zj.toast("分享成功");
                },
                error: function () {
                    zj.toast("分享失败");
                }
            });
            return;
        };
        // 登录
        SinaWebGamePlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            console.log("登录方式：sina h5登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            this.userId = zj.Util.getQueryString("uid");
            this.token = zj.Util.getQueryString("access_token");
            this.fullscreen = zj.Util.getQueryString("fullscreen") == "" ? 0 : Number(zj.Util.getQueryString("fullscreen"));
            console.log("fullscreen:", this.fullscreen);
            this.auth_sina();
            return;
        };
        // 登录验证
        SinaWebGamePlatform.prototype.auth_sina = function () {
            if (!SinaWebGamePlatform.isSupport())
                return;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var login_request = new message.SDKLoginReqBody();
            login_request.sdk_userid = this.userId;
            login_request.sdk_version = "";
            login_request.sdk_token = this.token;
            login_request.device_info = zj.Util.getDeviceInfo();
            login_request.version_info = zj.Util.getAppVersionInfo();
            login_request.auth_key = "";
            var body = JSON.stringify(login_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onSinaGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
            request.send(body);
            //console.log("sina_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        SinaWebGamePlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_sina, this);
            this.timer.start();
        };
        // ajax请求登陆回复
        SinaWebGamePlatform.prototype.onSinaGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("sina_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("sina登录API失败:") + json.retcode);
                this.callback_fail.call(this.callback_this, "sina登录API失败");
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
        SinaWebGamePlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        SinaWebGamePlatform.prototype.getOption = function (key) {
            return "";
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        SinaWebGamePlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        SinaWebGamePlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        SinaWebGamePlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        SinaWebGamePlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        SinaWebGamePlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        SinaWebGamePlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var _this = this;
            console.log("sina pay");
            var ext = developerPayload ? developerPayload : "";
            var payReq = new message.PayReqBody();
            payReq.user_id = zj.Game.Controller.userID();
            payReq.role_id = zj.Game.Controller.roleID();
            payReq.receipt = "";
            payReq.pay_channel = "sinawgame";
            payReq.cp_ext = ext;
            payReq.pay_no = "";
            payReq.product_id = productID;
            payReq.auth_key = "";
            payReq.device_info = zj.Util.getDeviceInfo();
            payReq.version_info = zj.Util.getAppVersionInfo();
            payReq.version_info.channel = "sinawgame";
            payReq.cp_role_id = zj.Game.Controller.roleID().toString();
            payReq.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            payReq.channel_user_id = this.userId;
            payReq.product_quantity = productNum;
            var body = JSON.stringify(payReq);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("sinaweb_pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("sina下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                window.top.location.href = "http://sng.sina.com.cn/payment/order/order_cashier?appkey=" + _this.appkey + "&access_token=" + _this.token
                    + "&amount=" + response.amount * 100 + "&uid=" + _this.userId + "&subject=" + productID + "&desc=" + productID + "&pt=" + response.pay_no + "&timestamp=" + zj.Game.Controller.curServerTime;
                zj.Game.UIManager.closeWaitingUI();
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，sina下单失败");
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay.do", egret.HttpMethod.POST);
            http_request.send(body);
            console.log("sina_pay request: " + body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        SinaWebGamePlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持sina平台");
                        })];
                });
            });
        };
        SinaWebGamePlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持sina平台");
                        })];
                });
            });
        };
        SinaWebGamePlatform.prototype.hideBannerAd = function () {
            return;
        };
        return SinaWebGamePlatform;
    }());
    zj.SinaWebGamePlatform = SinaWebGamePlatform;
    __reflect(SinaWebGamePlatform.prototype, "zj.SinaWebGamePlatform", ["zj.Platform"]);
    window['SinaWebGamePlatform'] = SinaWebGamePlatform;
})(zj || (zj = {}));
//# sourceMappingURL=SinaWebGamePlatform.js.map