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
    // GameReal h5小游戏环境支持
    var GameRealWebGamePlatform = (function () {
        function GameRealWebGamePlatform() {
            this.timer = null; // 失败重试的定时器
            this.gameId = "10202";
        }
        // 当前环境是否支持该平台
        GameRealWebGamePlatform.isSupport = function () {
            return (('location' in window) && ('search' in window['location']) && ('CY_GAME_SDK' in window) && ('config' in window['CY_GAME_SDK']) && ('pay' in window['CY_GAME_SDK']));
        };
        // 平台名字
        GameRealWebGamePlatform.prototype.name = function () {
            return "gamereal";
        };
        // 复制文本到剪贴板
        GameRealWebGamePlatform.prototype.setClipboardData = function (str) {
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
            zj.toast_success("复制成功");
        };
        GameRealWebGamePlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        GameRealWebGamePlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "gamerealwgame";
                    window['CY_GAME_SDK'].config({
                        gameId: this.gameId,
                        share: {
                            success: function () {
                            }
                        },
                        pay: {
                            success: function () {
                                console.log("pay complete!");
                            }
                        }
                    });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!GameRealWebGamePlatform.isSupport()) {
                                reject("不支持gamereal H5游戏平台");
                                return;
                            }
                            console.log("gamereal h5 sdk init ok!");
                            resolve();
                        })];
                });
            });
        };
        // 关闭平台
        GameRealWebGamePlatform.prototype.close = function () {
            return;
        };
        // 重启
        GameRealWebGamePlatform.prototype.restart = function () {
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        GameRealWebGamePlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        GameRealWebGamePlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            return;
        };
        // 登录
        GameRealWebGamePlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            console.log("登录方式：gamereal h5登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            this.gameId = zj.Util.getQueryString("gameId");
            this.userId = zj.Util.getQueryString("uid");
            this.userName = zj.Util.getQueryString("userName");
            this.userImage = zj.Util.getQueryString("avatar");
            this.userSex = zj.Util.getQueryString("userSex");
            this.loginTime = zj.Util.getQueryString("time");
            this.loginSign = zj.Util.getQueryString("sign");
            this.auth_gamereal();
            return;
        };
        // 登录验证
        GameRealWebGamePlatform.prototype.auth_gamereal = function () {
            if (!GameRealWebGamePlatform.isSupport())
                return;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var login_request = new message.SDKLoginReqBody();
            login_request.sdk_userid = this.userId;
            login_request.sdk_version = "";
            login_request.sdk_token = this.userName + "|" + this.loginTime + "|" + this.loginSign;
            login_request.device_info = zj.Util.getDeviceInfo();
            login_request.version_info = zj.Util.getAppVersionInfo();
            login_request.auth_key = "";
            var body = JSON.stringify(login_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onGamerealGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("gamereal_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        GameRealWebGamePlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_gamereal, this);
            this.timer.start();
        };
        // ajax请求登陆回复
        GameRealWebGamePlatform.prototype.onGamerealGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            console.log("gamereal_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("gamereal登录API失败:") + json.retcode);
                this.callback_fail.call(this.callback_this, "gamereal登录API失败");
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
        GameRealWebGamePlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        GameRealWebGamePlatform.prototype.getOption = function (key) {
            return "";
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        GameRealWebGamePlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        GameRealWebGamePlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        GameRealWebGamePlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        GameRealWebGamePlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        GameRealWebGamePlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        GameRealWebGamePlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var ext = developerPayload ? developerPayload : "";
            var payReq = new message.GamerealWGamePayReqBody();
            payReq.user_id = zj.Game.Controller.userID();
            payReq.cp_ext = ext;
            payReq.product_id = productID;
            payReq.device_info = zj.Util.getDeviceInfo();
            payReq.version_info = zj.Util.getAppVersionInfo();
            payReq.version_info.channel = "gamerealwgame";
            payReq.cp_role_id = zj.Game.Controller.roleID().toString();
            payReq.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            payReq.product_quantity = productNum;
            payReq.uid = this.userId;
            var body = JSON.stringify(payReq);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("gamreal_pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("gamereal下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                var payInfo = JSON.parse(response.payInfo);
                var money = payInfo.money;
                payInfo['money'] = money.toFixed(2);
                window['CY_GAME_SDK'].pay(payInfo);
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，gamereal下单失败");
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_gamerealwgame.do", egret.HttpMethod.POST);
            http_request.send(body);
            console.log("gamereal_pay request: " + body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        GameRealWebGamePlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持gamereal平台");
                        })];
                });
            });
        };
        GameRealWebGamePlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持gamereal平台");
                        })];
                });
            });
        };
        GameRealWebGamePlatform.prototype.hideBannerAd = function () {
            return;
        };
        return GameRealWebGamePlatform;
    }());
    zj.GameRealWebGamePlatform = GameRealWebGamePlatform;
    __reflect(GameRealWebGamePlatform.prototype, "zj.GameRealWebGamePlatform", ["zj.Platform"]);
    window['GameRealWebGamePlatform'] = GameRealWebGamePlatform;
})(zj || (zj = {}));
//# sourceMappingURL=GameRealWebGamePlatform.js.map