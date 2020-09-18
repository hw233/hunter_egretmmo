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
    // huawei小游戏环境支持
    var HuaweiGamePlatform = (function () {
        function HuaweiGamePlatform() {
            this.timer = null; // 失败重试的定时器
            this.appId = "100780303"; // 平台分配的游戏appId
            this.playerId = ""; // 帐号ID
        }
        // 当前环境是否支持该平台
        HuaweiGamePlatform.isSupport = function () {
            var hbs = window['hbs'] ? window['hbs'] : {};
            return (('gameLogin' in hbs) && ('hwPay' in hbs));
        };
        // 平台名字
        HuaweiGamePlatform.prototype.name = function () {
            return "huawei";
        };
        HuaweiGamePlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var hbs;
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "huaweiqgame";
                    hbs = window['hbs'] ? window['hbs'] : {};
                    if ('onShow' in hbs) {
                        hbs.onShow(function () { _this.onShow(); });
                    }
                    if ('onHide' in hbs) {
                        hbs.onHide(function () { _this.onHide(); });
                    }
                    egret.setInterval(function () {
                        if (_this.deviceId == null) {
                            _this.deviceId = zj.Controller.getGlobalStorageItem("device_id");
                        }
                        if (zj.Controller.getGlobalStorageItem("device_id").length == 0) {
                            console.log("store deviceId");
                            zj.Controller.setGlobalStorageItem("device_id", _this.deviceId);
                        }
                    }, null, 1000);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("huawei platform init ok");
                            resolve();
                        })];
                });
            });
        };
        HuaweiGamePlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        // 关闭平台
        HuaweiGamePlatform.prototype.close = function () {
            return;
        };
        // 重启
        HuaweiGamePlatform.prototype.restart = function () {
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        HuaweiGamePlatform.prototype.setLoadingProgress = function (percentage) {
        };
        HuaweiGamePlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            return;
        };
        // 登录
        HuaweiGamePlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            var _this = this;
            console.log("登录方式：huawei登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            var hbs = window['hbs'] ? window['hbs'] : {};
            hbs.gameLogin({
                forceLogin: 1,
                appid: this.appId,
                success: function (data) {
                    _this.loginData = JSON.stringify(data);
                    console.log("huaweigame data is:" + _this.loginData);
                    _this.playerId = data.playerId;
                    _this.displayName = data.displayName;
                    _this.playerLevel = data.playerLevel;
                    _this.isAuth = data.isAuth;
                    _this.ts = data.ts;
                    _this.gameAuthSign = data.gameAuthSign;
                    _this.auth_huawei();
                },
                fail: function (data, code) {
                    console.log("huaweigame login fail:" + data + ", code:" + code);
                    _this.callback_fail.call(_this.callback_this, "华为小游戏登录失败");
                }
            });
            return;
        };
        // 登录验证获取token
        HuaweiGamePlatform.prototype.auth_huawei = function () {
            if (!HuaweiGamePlatform.isSupport())
                return;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var huaweiLoginreq = new message.SDKLoginReqBody();
            huaweiLoginreq.sdk_userid = "";
            huaweiLoginreq.sdk_version = "";
            huaweiLoginreq.sdk_token = this.loginData;
            huaweiLoginreq.device_info = zj.Util.getDeviceInfo();
            huaweiLoginreq.version_info = zj.Util.getAppVersionInfo();
            huaweiLoginreq.auth_key = "";
            var body = JSON.stringify(huaweiLoginreq);
            this.loginRequest = new egret.HttpRequest();
            this.loginRequest.responseType = egret.HttpResponseType.TEXT;
            this.loginRequest.setRequestHeader("Content-Type", "application/json");
            console.log("hhh getDeviceid0:", zj.Controller.getGlobalStorageItem("device_id"));
            this.loginRequest.addEventListener(egret.Event.COMPLETE, this.onHuaweiGetComplete, this);
            this.loginRequest.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            this.loginRequest.open(zj.AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
            this.loginRequest.send(body);
            //console.log("huawei_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        HuaweiGamePlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_huawei, this);
            this.timer.start();
            this.loginRequest.removeEventListener(egret.Event.COMPLETE, this.onGetIOError, this);
        };
        // ajax请求fbinstant登陆回复
        HuaweiGamePlatform.prototype.onHuaweiGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("huawei_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("huawei登录API失败:") + json.retcode);
                this.callback_fail.call(this.callback_this, "huawei小游戏登录失败:" + json.retcode);
                return;
            }
            console.log("hhh getDeviceid1:", zj.Controller.getGlobalStorageItem("device_id"));
            this.loginRequest.removeEventListener(egret.Event.COMPLETE, this.onHuaweiGetComplete, this);
            var response = json.body;
            console.log("hhh getDeviceid2:", zj.Controller.getGlobalStorageItem("device_id"));
            if (this.callback_this) {
                console.log("huawei小游戏登陆成功!");
                console.log("hhh getDeviceid2:", zj.Controller.getGlobalStorageItem("device_id"));
                this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
                this.callback_fail = null;
                this.callback_success = null;
                this.callback_this = null;
            }
            return;
        };
        // 更新角色信息
        // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
        HuaweiGamePlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        HuaweiGamePlatform.prototype.getOption = function (key) {
            return "";
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        HuaweiGamePlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        HuaweiGamePlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        HuaweiGamePlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        HuaweiGamePlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        HuaweiGamePlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        HuaweiGamePlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var hbs = window['hbs'] ? window['hbs'] : {};
            var huaweiPayReq = new message.HuaweiQGamePayReqBody();
            huaweiPayReq.user_id = zj.Game.Controller.userID();
            huaweiPayReq.product_id = productID;
            huaweiPayReq.product_quantity = productNum;
            huaweiPayReq.cp_role_id = zj.Game.Controller.roleID().toString();
            huaweiPayReq.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            huaweiPayReq.cp_ext = developerPayload ? developerPayload : "";
            huaweiPayReq.device_info = zj.Util.getDeviceInfo();
            huaweiPayReq.version_info = zj.Util.getAppVersionInfo();
            huaweiPayReq.version_info.channel = "huaweiqgame";
            var body = JSON.stringify(huaweiPayReq);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("huaweiqgame pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("huawei小游戏下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                console.log("huaweiqgame response is:" + JSON.stringify(response));
                // 调起支付
                hbs.hwPay({
                    orderInfo: response.orderInfo,
                    success: function (ret) {
                        console.log('pay success');
                        zj.toast_success("支付成功");
                        zj.Game.UIManager.closeWaitingUI();
                        zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: true });
                    },
                    fail: function (erromsg, errocode) {
                        console.log("pay fail : " + errocode + erromsg);
                        zj.toast_warning("\u652F\u4ED8\u5931\u8D25:(" + errocode + ")");
                        zj.Game.UIManager.closeWaitingUI();
                        zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    }
                });
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，huawei小游戏下单失败");
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_huaweiqgame.do", egret.HttpMethod.POST);
            console.log("huaweiqgame pay request: " + body);
            http_request.send(body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        HuaweiGamePlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持huawei平台");
                        })];
                });
            });
        };
        HuaweiGamePlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持huawei平台");
                        })];
                });
            });
        };
        HuaweiGamePlatform.prototype.hideBannerAd = function () {
            return;
        };
        HuaweiGamePlatform.prototype.setClipboardData = function (str) {
            return;
        };
        HuaweiGamePlatform.prototype.onShow = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("切回前台");
                    zj.Game.SoundManager.resumeMusic();
                    return [2 /*return*/];
                });
            });
        };
        HuaweiGamePlatform.prototype.onHide = function () {
            console.log("切到后台");
            zj.Game.SoundManager.pauseMusic();
        };
        return HuaweiGamePlatform;
    }());
    zj.HuaweiGamePlatform = HuaweiGamePlatform;
    __reflect(HuaweiGamePlatform.prototype, "zj.HuaweiGamePlatform", ["zj.Platform"]);
    window['HuaweiGamePlatform'] = HuaweiGamePlatform;
})(zj || (zj = {}));
//# sourceMappingURL=HuaweiGamePlatform.js.map