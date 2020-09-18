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
    // vivo小游戏环境支持
    var VivoQGamePlatform = (function () {
        function VivoQGamePlatform() {
            this.timer = null; // 失败重试的定时器
            this.appId = "100001385"; // 平台分配的游戏appId
            this.token = ""; // 简化模式下可用，返回的访问令牌
            this.openid = ""; // 用户的openid，可作为用户的唯一标识
        }
        // 当前环境是否支持该平台
        VivoQGamePlatform.isSupport = function () {
            var qg = window['qg'] ? window['qg'] : {};
            return (('getProvider' in qg) && (qg.getProvider() == "vivo") && ('authorize' in qg) && ('pay' in qg) && ('getProfile' in qg));
        };
        // 平台名字
        VivoQGamePlatform.prototype.name = function () {
            return "vivo";
        };
        // 复制文本到剪贴板
        VivoQGamePlatform.prototype.setClipboardData = function (str) {
        };
        VivoQGamePlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        VivoQGamePlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var qg;
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "vivoqgame";
                    qg = window['qg'] ? window['qg'] : {};
                    if ('onShow' in qg) {
                        qg.onShow(function () { _this.onShow(); });
                    }
                    if ('onHide' in qg) {
                        qg.onHide(function () { _this.onHide(); });
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("vivo platform init ok");
                            resolve();
                        })];
                });
            });
        };
        // 关闭平台
        VivoQGamePlatform.prototype.close = function () {
            return;
        };
        // 重启
        VivoQGamePlatform.prototype.restart = function () {
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        VivoQGamePlatform.prototype.setLoadingProgress = function (percentage) {
        };
        VivoQGamePlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            return;
        };
        // 登录
        VivoQGamePlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            var _this = this;
            console.log("登录方式：vivo登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            this.token = zj.Controller.getGlobalStorageItem("VivoToken");
            console.log("vivo token is:", this.token);
            var qg = window['qg'] ? window['qg'] : {};
            if (this.token == null || this.token == "") {
                this.vivoLogin();
            }
            else {
                qg.getProfile({
                    token: this.token,
                    success: function (data) {
                        console.log("vivo getProfile success, code is:", JSON.stringify(data));
                        _this.openid = data.openid;
                        _this.auth_vivo();
                    },
                    fail: function (data, code) {
                        console.log("vivo getProfile fail, code is:", code);
                        _this.vivoLogin();
                    }
                });
            }
            return;
        };
        VivoQGamePlatform.prototype.vivoLogin = function () {
            var _this = this;
            console.log("vivoLogin");
            var qg = window['qg'] ? window['qg'] : {};
            qg.authorize({
                type: "token",
                success: function (data) {
                    console.log("res is:", JSON.stringify(data));
                    _this.token = data.accessToken;
                    _this.tokenType = data.tokenType;
                    _this.expiresIn = data.expiresIn;
                    _this.scope = data.scope;
                    qg.getProfile({
                        token: _this.token,
                        success: function (data) {
                            console.log("vivo getProfile success, code is:", JSON.stringify(data));
                            _this.openid = data.openid;
                            _this.auth_vivo();
                        },
                        fail: function (data, code) {
                            console.log("vivo getProfile fail, code is:", code);
                            _this.callback_fail.call(_this.callback_this, "vivo小游戏登录失败， 获取用户信息失败");
                        }
                    });
                },
                fail: function (data, code) {
                    console.log("vivo login fail, code is:", code);
                    _this.callback_fail.call(_this.callback_this, "vivo小游戏登录失败");
                }
            });
        };
        // 登录验证获取token
        VivoQGamePlatform.prototype.auth_vivo = function () {
            if (!VivoQGamePlatform.isSupport())
                return;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var vivoLoginreq = new message.SDKLoginReqBody();
            vivoLoginreq.sdk_userid = this.openid;
            vivoLoginreq.sdk_version = "";
            vivoLoginreq.sdk_token = this.token;
            vivoLoginreq.device_info = zj.Util.getDeviceInfo();
            vivoLoginreq.version_info = zj.Util.getAppVersionInfo();
            vivoLoginreq.auth_key = "";
            var body = JSON.stringify(vivoLoginreq);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onVivoGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
            request.send(body);
            //console.log("vivo_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        VivoQGamePlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_vivo, this);
            this.timer.start();
        };
        // ajax请求登陆回复
        VivoQGamePlatform.prototype.onVivoGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("vivo_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("vivo登录API失败:") + json.retcode);
                this.callback_fail.call(this.callback_this, "vivo小游戏登录失败:" + json.retcode);
                return;
            }
            zj.Controller.setGlobalStorageItem("VivoToken", this.token);
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
        VivoQGamePlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        VivoQGamePlatform.prototype.getOption = function (key) {
            return "";
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        VivoQGamePlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        VivoQGamePlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        VivoQGamePlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        VivoQGamePlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        VivoQGamePlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        VivoQGamePlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var qg = window['qg'] ? window['qg'] : {};
            var vivoPayReq = new message.VivoQGamePayReqBody();
            vivoPayReq.user_id = zj.Game.Controller.userID();
            vivoPayReq.product_id = productID;
            vivoPayReq.product_quantity = productNum;
            vivoPayReq.cp_role_id = zj.Game.Controller.roleID().toString();
            vivoPayReq.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            vivoPayReq.cp_ext = developerPayload ? developerPayload : "";
            vivoPayReq.device_info = zj.Util.getDeviceInfo();
            vivoPayReq.version_info = zj.Util.getAppVersionInfo();
            vivoPayReq.version_info.channel = "vivoqgame";
            vivoPayReq.vivo_version = "1.0.0";
            var body = JSON.stringify(vivoPayReq);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("vivoqgame pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("vivo小游戏下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                console.log("vivoqgame response is:" + JSON.stringify(response));
                // 调起支付
                qg.pay({
                    orderInfo: response.respJson,
                    // 成功回调函数，结果以 vivo 小游戏平台通知CP的回调地址为准
                    success: function (res) {
                        console.log('pay success');
                        zj.toast_success("支付成功");
                        zj.Game.UIManager.closeWaitingUI();
                        zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: true });
                    },
                    fail: function (res) {
                        console.log("res is:" + res + " :" + JSON.stringify(res));
                        console.log("code:" + res.code + " errCode:" + res.errCode + " msg:" + res.errMsg);
                        zj.toast_warning("\u652F\u4ED8\u5931\u8D25:(" + res.code + ")");
                        zj.Game.UIManager.closeWaitingUI();
                        zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    }
                });
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，vivo小游戏下单失败");
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_vivoqgame.do", egret.HttpMethod.POST);
            console.log("vivoqgame pay request: " + body);
            http_request.send(body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        VivoQGamePlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持vivo平台");
                        })];
                });
            });
        };
        VivoQGamePlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持vivo平台");
                        })];
                });
            });
        };
        VivoQGamePlatform.prototype.hideBannerAd = function () {
            return;
        };
        VivoQGamePlatform.prototype.onShow = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("切回前台");
                    zj.Game.SoundManager.resumeMusic();
                    return [2 /*return*/];
                });
            });
        };
        VivoQGamePlatform.prototype.onHide = function () {
            console.log("切到后台");
            zj.Game.SoundManager.pauseMusic();
        };
        return VivoQGamePlatform;
    }());
    zj.VivoQGamePlatform = VivoQGamePlatform;
    __reflect(VivoQGamePlatform.prototype, "zj.VivoQGamePlatform", ["zj.Platform"]);
    window['VivoQGamePlatform'] = VivoQGamePlatform;
})(zj || (zj = {}));
//# sourceMappingURL=VivoQGamePlatform.js.map