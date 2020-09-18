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
    // AoneSDK环境支持
    var AoneSDKPlatform = (function () {
        function AoneSDKPlatform() {
            this.timer = null; // 失败重试的定时器
            this.isLoginOK = false; // 是否已经登录成功
            this.appid = 0;
            this.channel = "";
        }
        // 当前环境是否支持该平台
        AoneSDKPlatform.isSupport = function () {
            return (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2);
        };
        // 平台名字
        AoneSDKPlatform.prototype.name = function () {
            return "aonesdk(" + this.channel + ")";
        };
        // 复制文本到剪贴板
        AoneSDKPlatform.prototype.setClipboardData = function (str) {
            egret.ExternalInterface.call("sendToNative_setClipboardData", str);
        };
        AoneSDKPlatform.prototype.playVideo = function (videoName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            egret.ExternalInterface.addCallback("sendToJS_PlayVideoResult", function (msg) {
                                console.log(msg);
                                resolve();
                                return;
                            });
                            var param = { action: "PlayVideo", video: videoName };
                            egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
                        })];
                });
            });
        };
        AoneSDKPlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("aone sdk platform init...");
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            egret.ExternalInterface.addCallback("sendToJS_ReadConfigResult", function (msg) {
                                console.log(msg);
                                var obj = JSON.parse(msg);
                                if (obj["action"] != "ReadConfigResult")
                                    return;
                                //Game.UIManager.closeWaitingUI();
                                var code = obj["code"] || "";
                                if (code != "0") {
                                    console.error("\u8BFB\u53D6SDK\u53C2\u6570\u9519\u8BEF(code:" + code + ")");
                                    resolve();
                                    return;
                                }
                                console.log("aonesdk platform init ok");
                                var appId = obj["appId"] || "";
                                var channel = obj["channel"] || "";
                                var deviceId = obj["deviceId"] || "";
                                var model = obj["model"] || "";
                                var idfa = obj["idfa"] || "";
                                var pushToken = obj["pushToken"] || "";
                                var numAppId = parseInt(appId);
                                if (!numAppId)
                                    numAppId = 0;
                                if (numAppId != 0)
                                    zj.AppConfig.AppId = numAppId;
                                channel.trim();
                                if (channel.length > 0)
                                    zj.AppConfig.Channel = channel;
                                zj.AppConfig.PushToken = pushToken;
                                if (deviceId.length > 0) {
                                    zj.Controller.setGlobalStorageItem("device_id", deviceId);
                                    if (zj.Util.deviceinfo)
                                        zj.Util.deviceinfo.device_id = deviceId;
                                }
                                if (model.length > 0) {
                                    zj.Controller.setGlobalStorageItem("model", model);
                                    if (zj.Util.deviceinfo)
                                        zj.Util.deviceinfo.model = model;
                                }
                                if (idfa.length > 0) {
                                    zj.Controller.setGlobalStorageItem("idfa", idfa);
                                    if (zj.Util.deviceinfo)
                                        zj.Util.deviceinfo.idfa = idfa;
                                }
                                window['resource_map'] = obj['resource_map']; // 资源映射表
                                resolve();
                                return;
                            });
                            //Game.UIManager.openWaitingUI();
                            var param = { action: "ReadConfig" };
                            egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
                        })];
                });
            });
        };
        // 关闭平台
        AoneSDKPlatform.prototype.close = function () {
            egret.ExternalInterface.call("sendToNative_close", JSON.stringify({}));
            return;
        };
        // 重启
        AoneSDKPlatform.prototype.restart = function () {
            egret.ExternalInterface.call("sendToNative_restart", JSON.stringify({}));
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        AoneSDKPlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        AoneSDKPlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            var param = {
                action: "Share",
                title: title,
                imageUrl: imageUrl,
                linkUrl: linkUrl,
                query: query
            };
            egret.ExternalInterface.addCallback("sendToJS_ShareResult", function (msg) {
                console.log(msg);
                var obj = JSON.parse(msg);
                if (obj["action"] != "ShareResult")
                    return;
                zj.Game.UIManager.closeWaitingUI();
                var code = obj["code"] || "";
                if (code != "0") {
                    zj.toast_warning("\u5206\u4EAB\u5931\u8D25(code:" + code + ")");
                    return;
                }
                zj.toast_success("分享成功");
            });
            zj.Game.UIManager.openWaitingUI();
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
                egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
            }
            return;
        };
        // 登录
        AoneSDKPlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            var _this = this;
            console.log("登录方式：Aone登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            if (egret.Capabilities.os == "iOS") {
                zj.loadUI(zj.AoneLoginDialog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    dialog.open(callback_success, callback_fail, callback_this);
                });
            }
            else {
                this.callback_success = callback_success;
                this.callback_fail = callback_fail;
                this.callback_this = callback_this;
                // 登录状态需要先登出
                if (this.isLoginOK) {
                    egret.ExternalInterface.addCallback("sendToJS_LogoutResult", function (msg) {
                        console.log(msg);
                        var obj = JSON.parse(msg);
                        if (obj["action"] != "LogoutResult")
                            return;
                        zj.Game.UIManager.closeWaitingUI();
                        _this.do_login();
                    });
                    zj.Game.UIManager.openWaitingUI();
                    var param = { action: "Logout" };
                    egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
                    return;
                }
                this.do_login();
            }
        };
        AoneSDKPlatform.prototype.do_login = function () {
            var _this = this;
            this.isLoginOK = false;
            var param = { action: "Login" };
            egret.ExternalInterface.addCallback("sendToJS_LoginResult", function (msg) {
                console.log(msg);
                var obj = JSON.parse(msg);
                if (obj["action"] != "LoginResult")
                    return;
                zj.Game.UIManager.closeWaitingUI();
                var code = obj["code"] || "";
                if (code != "0") {
                    //toast_warning(`登录失败(code:${code})`);
                    if (_this.callback_fail) {
                        _this.callback_fail.call(_this.callback_this, code);
                        _this.callback_this = null;
                        _this.callback_fail = null;
                        _this.callback_success = null;
                        _this.isLoginOK = false;
                    }
                    return;
                }
                var token = obj["token"] || "";
                var userId = obj["userId"] || "";
                var userAccount = obj["userAccount"] || "";
                var numUserId = parseInt(userId);
                if (isNaN(numUserId) || numUserId == undefined)
                    numUserId = 0;
                if (_this.callback_this) {
                    _this.callback_success.call(_this.callback_this, numUserId, userAccount, token);
                    _this.callback_this = null;
                    _this.callback_fail = null;
                    _this.callback_success = null;
                    _this.isLoginOK = true;
                }
            });
            zj.Game.UIManager.openWaitingUI();
            egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
            return;
        };
        // 更新角色信息
        // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
        AoneSDKPlatform.prototype.updateRole = function (type) {
            var roleinfo = zj.Game.Controller.roleInfo();
            var groupinfo = zj.Game.Controller.selectedGroup();
            var param = {
                action: "UpdateRole",
                roleId: roleinfo.role_id.toString(),
                roleName: roleinfo.role_name.toString(),
                roleLevel: roleinfo.role_level.toString(),
                roleVip: roleinfo.role_vip.toString(),
                roleCreateTime: roleinfo.role_createtime.toString(),
                groupId: groupinfo.group_id.toString(),
                groupName: groupinfo.group_name.toString(),
                type: type
            };
            console.log(JSON.stringify(param));
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
                egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
            }
            return;
        };
        // 获取程序启动参数
        AoneSDKPlatform.prototype.getOption = function (key) {
            var result = egret.getOption(key);
            if (result == undefined || result == null)
                return "";
            return result;
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        AoneSDKPlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        AoneSDKPlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        AoneSDKPlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        AoneSDKPlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        AoneSDKPlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        AoneSDKPlatform.prototype.pay = function (productID, productNum, developerPayload) {
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform'])) {
                if (egret.Capabilities.os == "Android") {
                    var param = { action: "Pay", productId: productID, productNum: productNum.toString(), payLoad: developerPayload ? developerPayload : "" };
                    egret.ExternalInterface.addCallback("sendToJS_PayResult", function (msg) {
                        console.log(msg);
                        var obj = JSON.parse(msg);
                        if (obj["action"] != "PayResult")
                            return;
                        zj.Game.UIManager.closeWaitingUI();
                        var code = obj["code"] || "";
                        if (code != "0") {
                            zj.toast_warning("\u652F\u4ED8\u5931\u8D25(code:" + code + ")");
                            zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                            return;
                        }
                        zj.toast_success("支付成功");
                        zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: true });
                    });
                    zj.Game.UIManager.openWaitingUI();
                    egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
                    return;
                }
                else if (egret.Capabilities.os == "iOS") {
                    var roleId = zj.Game.Controller.roleID() || 0;
                    var userId = zj.Game.Controller.userID() || 0;
                    var url = zj.Game.Controller.customerWebPayUrl() || zj.Game.Controller.webPayUrl();
                    if (!url || !roleId || !userId) {
                        zj.toast_warning("支付功能未开启");
                        zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                        return;
                    }
                    var token = new md5().hex_md5(userId.toString() + roleId.toString()).toLowerCase().substr(0, 8);
                    var request_url = url + "?product_id=" + productID + "&role_id=" + roleId + "&token=" + token;
                    egret.ExternalInterface.call("sendToNative_openWeb", JSON.stringify({ url: request_url }));
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                }
            }
        };
        AoneSDKPlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("aone platform not support RewardedVideoAd");
                            reject("暂不支持视频激励广告功能");
                        })];
                });
            });
        };
        AoneSDKPlatform.prototype.showBannerAd = function () {
            return;
        };
        AoneSDKPlatform.prototype.hideBannerAd = function () {
            return;
        };
        return AoneSDKPlatform;
    }());
    zj.AoneSDKPlatform = AoneSDKPlatform;
    __reflect(AoneSDKPlatform.prototype, "zj.AoneSDKPlatform", ["zj.Platform"]);
    window['AoneSDKPlatform'] = AoneSDKPlatform;
})(zj || (zj = {}));
//# sourceMappingURL=AoneSDKPlatform.js.map