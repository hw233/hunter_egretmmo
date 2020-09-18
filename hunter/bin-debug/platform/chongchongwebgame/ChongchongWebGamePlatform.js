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
    // 虫虫h5小游戏环境支持
    var ChongchongWebGamePlatform = (function () {
        function ChongchongWebGamePlatform() {
            this.timer = null; // 失败重试的定时器
            this.gameId = "26110_aonelr";
        }
        // 当前环境是否支持该平台
        ChongchongWebGamePlatform.isSupport = function () {
            return (('location' in window) && ('search' in window['location']) && ('payForCCplay' in window));
        };
        // 平台名字
        ChongchongWebGamePlatform.prototype.name = function () {
            return "chongchong";
        };
        // 复制文本到剪贴板
        ChongchongWebGamePlatform.prototype.setClipboardData = function (str) {
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
            zj.toast_success("复制成功");
        };
        ChongchongWebGamePlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        ChongchongWebGamePlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "chongchongwgame";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!ChongchongWebGamePlatform.isSupport()) {
                                reject("不支持虫虫H5游戏平台");
                                return;
                            }
                            console.log("chongchong h5 sdk init ok!");
                            resolve();
                        })];
                });
            });
        };
        // 关闭平台
        ChongchongWebGamePlatform.prototype.close = function () {
            return;
        };
        // 重启
        ChongchongWebGamePlatform.prototype.restart = function () {
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        ChongchongWebGamePlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        ChongchongWebGamePlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            return;
        };
        // 登录
        ChongchongWebGamePlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            console.log("登录方式：chongchong h5登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            this.userId = zj.Util.getQueryString("userId");
            this.userName = zj.Util.getQueryString("userName");
            this.userImage = zj.Util.getQueryString("userImg");
            this.userSex = zj.Util.getQueryString("userSex");
            this.channelExt = zj.Util.getQueryString("channelExt");
            this.loginTime = zj.Util.getQueryString("time");
            this.loginSign = zj.Util.getQueryString("sign");
            this.auth_chongchong();
            return;
        };
        // 登录验证
        ChongchongWebGamePlatform.prototype.auth_chongchong = function () {
            if (!ChongchongWebGamePlatform.isSupport())
                return;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var login_request = new message.SDKLoginReqBody();
            login_request.sdk_userid = this.userId;
            login_request.sdk_version = "";
            login_request.sdk_token = this.loginTime + "|" + this.loginSign;
            login_request.device_info = zj.Util.getDeviceInfo();
            login_request.version_info = zj.Util.getAppVersionInfo();
            login_request.auth_key = "";
            var body = JSON.stringify(login_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onChongchongGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
            request.send(body);
            //console.log("chongchong_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        ChongchongWebGamePlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_chongchong, this);
            this.timer.start();
        };
        // ajax请求登陆回复
        ChongchongWebGamePlatform.prototype.onChongchongGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("chongchong_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("chongchong登录API失败:") + json.retcode);
                this.callback_fail.call(this.callback_this, "chongchong登录API失败");
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
        ChongchongWebGamePlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        ChongchongWebGamePlatform.prototype.getOption = function (key) {
            return "";
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        ChongchongWebGamePlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        ChongchongWebGamePlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        ChongchongWebGamePlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        ChongchongWebGamePlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        ChongchongWebGamePlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        ChongchongWebGamePlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var _this = this;
            if (!('payForCCplay' in window)) {
                zj.toast_warning("暂不支持chongchong支付");
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                return;
            }
            var ext = developerPayload ? developerPayload : "";
            var ccpayReq = new message.PayReqBody();
            ccpayReq.user_id = zj.Game.Controller.userID();
            ccpayReq.role_id = zj.Game.Controller.roleID();
            ccpayReq.receipt = "";
            ccpayReq.pay_channel = "chongchongwgame";
            ccpayReq.cp_ext = ext;
            ccpayReq.pay_no = "";
            ccpayReq.product_id = productID;
            ccpayReq.auth_key = "";
            ccpayReq.device_info = zj.Util.getDeviceInfo();
            ccpayReq.version_info = zj.Util.getAppVersionInfo();
            ccpayReq.version_info.channel = "chongchongwgame";
            ccpayReq.cp_role_id = zj.Game.Controller.roleID().toString();
            ccpayReq.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            ccpayReq.channel_user_id = this.userId;
            ccpayReq.product_quantity = productNum;
            var body = JSON.stringify(ccpayReq);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("chongchongweb_pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("chongchong下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                window['payForCCplay'](_this.userId, _this.userName, _this.gameId, productID, productID, response.amount, response.pay_no, _this.channelExt, ext);
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，chongchong下单失败");
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay.do", egret.HttpMethod.POST);
            http_request.send(body);
            console.log("chongchong_pay request: " + body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        ChongchongWebGamePlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持chongchong平台");
                        })];
                });
            });
        };
        ChongchongWebGamePlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持chongchong平台");
                        })];
                });
            });
        };
        ChongchongWebGamePlatform.prototype.hideBannerAd = function () {
            return;
        };
        return ChongchongWebGamePlatform;
    }());
    zj.ChongchongWebGamePlatform = ChongchongWebGamePlatform;
    __reflect(ChongchongWebGamePlatform.prototype, "zj.ChongchongWebGamePlatform", ["zj.Platform"]);
    window['ChongchongWebGamePlatform'] = ChongchongWebGamePlatform;
})(zj || (zj = {}));
//# sourceMappingURL=ChongchongWebGamePlatform.js.map