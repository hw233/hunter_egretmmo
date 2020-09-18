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
    // 百度小程序(小游戏)环境支持
    var BaiduAppPlatform = (function () {
        function BaiduAppPlatform() {
            this.code = ""; // 百度登录验证返回的临时code
            this.openid = ""; // 百度openid
            this.timer = null; // 失败重试的定时器
            this.rewardedVideoAd = null; // 百度视频激励广告控件
            this.bannerAd = null; // 百度Banner广告控件
            this.launch_query = {}; // 启动或者show时带的参数
            this.launch_scene = ""; // 启动或者show时带的场景信息，类似于 scene=1038  或scene=1037&appid=123456
        }
        // 当前环境是否支持该平台
        BaiduAppPlatform.isSupport = function () {
            var swan = window['swan'] ? window['swan'] : {};
            return (swan && ('login' in swan) && ('getUserInfo' in swan));
        };
        // 平台名字
        BaiduAppPlatform.prototype.name = function () {
            return BaiduAppPlatform.NAME;
        };
        // 复制文本到剪贴板
        BaiduAppPlatform.prototype.setClipboardData = function (str) {
        };
        BaiduAppPlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        // public static compareVersion(v1, v2) {
        //     v1 = v1.split('.')
        //     v2 = v2.split('.')
        //     const len = Math.max(v1.length, v2.length)
        //     while (v1.length < len) {
        //         v1.push('0')
        //     }
        //     while (v2.length < len) {
        //         v2.push('0')
        //     }
        //     for (let i = 0; i < len; i++) {
        //         const num1 = parseInt(v1[i])
        //         const num2 = parseInt(v2[i])
        //         if (num1 > num2) {
        //             return 1
        //         } else if (num1 < num2) {
        //             return -1
        //         }
        //     }
        //     return 0
        // }
        BaiduAppPlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var swan, sysinfo;
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "baiduapp";
                    swan = window['swan'] ? window['swan'] : {};
                    // 监听小程序的前后台切换事件
                    if ('onShow' in swan) {
                        swan['onShow'](function (res) { _this.onShow(res); });
                    }
                    if ('onHide' in swan) {
                        swan['onHide'](function (res) { _this.onHide(res); });
                    }
                    sysinfo = swan.getSystemInfoSync();
                    console.log(sysinfo);
                    // const version = swan.getSystemInfoSync().SDKVersion;
                    // if (BaiduAppPlatform.compareVersion(version, '1.1.3') < 0) {
                    //     // 如果希望用户在最新版本的客户端上体验您的小游戏，可以提示用户升级
                    //     swan.showModal({
                    //         title: '提示',
                    //         content: '当前客户端版本过低，请升级到最新版本以获得更好游戏体验。'
                    //     })
                    // }
                    console.log("init finished");
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("swan init resolve");
                            resolve(true);
                        })];
                });
            });
        };
        BaiduAppPlatform.prototype.onShow = function (res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log(JSON.stringify(res));
                    console.log("切回前台");
                    zj.Game.SoundManager.resumeMusic();
                    return [2 /*return*/];
                });
            });
        };
        BaiduAppPlatform.prototype.onHide = function (res) {
            console.log("切到后台");
            zj.Game.SoundManager.pauseMusic();
        };
        // 关闭平台
        BaiduAppPlatform.prototype.close = function () {
            this.applyUpdate();
            return;
        };
        // 重启
        BaiduAppPlatform.prototype.restart = function () {
            this.applyUpdate();
            return;
        };
        BaiduAppPlatform.prototype.applyUpdate = function () {
            var swan = window['swan'] ? window['swan'] : {};
            if (!('getUpdateManager' in swan))
                return;
            var updateManager = swan.getUpdateManager();
            if (!updateManager)
                return;
            if (!('showModal' in swan))
                return;
            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                console.log("res", res.hasUpdate);
                if (!res.hasUpdate) {
                    swan.showModal({
                        title: '更新提示',
                        content: '无可用更新版本',
                    });
                }
                else {
                    updateManager.onUpdateReady(function (res) {
                        swan.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function (res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate();
                                }
                            }
                        });
                    });
                    updateManager.onUpdateFailed(function (err) {
                        // 新的版本下载失败
                        swan.showModal({
                            title: '更新提示',
                            content: '新版本下载失败，请稍后再试'
                        });
                    });
                }
            });
        };
        // 通知平台资源加载的百分比(0~100)
        BaiduAppPlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        // 分享
        BaiduAppPlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            zj.toast_warning("暂不支持分享");
        };
        // 登录
        BaiduAppPlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            var _this = this;
            var swan = window['swan'] ? window['swan'] : {};
            console.log("登录方式：百度登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            if (!('login' in swan)) {
                this.callback_fail.call(this.callback_this, "当前环境不支持百度登录");
                return;
            }
            // loadUI(AoneLoginDialog)
            //     .then((dialog: AoneLoginDialog) => {
            //         dialog.show(UI.SHOW_FILL_OUT);
            //         dialog.open(this.callback_success, this.callback_fail, this.callback_this);
            //         this.callback_fail = null;
            //         this.callback_success = null;
            //         this.callback_this = null;
            //     })
            // return;
            swan.login({
                success: function (res) {
                    console.log(res);
                    _this.code = res.code;
                    _this.checkScopSetting();
                },
                fail: function (res) {
                    console.log(res);
                    _this.callback_fail.call(_this.callback_this, "百度登录失败");
                }
            });
        };
        // 检查用户授权
        BaiduAppPlatform.prototype.checkScopSetting = function () {
            var _this = this;
            var swan = window['swan'] ? window['swan'] : {};
            if (!('getSetting' in swan)) {
                this.showUserInfoButton();
                return;
            }
            swan.getSetting({
                success: function (res) {
                    var authSetting = res.authSetting;
                    if (authSetting['scope.userInfo'] === true) {
                        // 用户已授权，可以直接调用相关 API
                        _this.getUserInfo();
                    }
                    else {
                        // 用户曾经拒绝过授权或者未询问过用户授权
                        _this.showUserInfoButton();
                    }
                },
                fail: function (res) {
                    console.log(res);
                    _this.showUserInfoButton();
                }
            });
        };
        // 获取玩家用户信息
        BaiduAppPlatform.prototype.getUserInfo = function () {
            var _this = this;
            var swan = window['swan'] ? window['swan'] : {};
            if (!('getUserInfo' in swan)) {
                this.callback_fail.call(this.callback_this, "当前环境不支持获取用户基本信息");
                return;
            }
            swan.getUserInfo({
                success: function (res) {
                    console.log(res);
                    _this.userinfo_response = res;
                    _this.auth_baiduapp();
                },
                fail: function (res) {
                    console.log(res);
                    _this.callback_fail.call(_this.callback_this, "获取用户信息失败");
                }
            });
        };
        // 显示获取用户信息按钮
        // 百度官方推荐的获取用户信息的方案
        BaiduAppPlatform.prototype.showUserInfoButton = function () {
            this.getUserInfo();
        };
        // 登录验证获取token
        BaiduAppPlatform.prototype.auth_baiduapp = function () {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var baidulogin_request = new message.BaiduAppLoginReqBody();
            baidulogin_request.code = this.code;
            baidulogin_request.nickname = this.userinfo_response.userInfo.nickName;
            baidulogin_request.headimgurl = this.userinfo_response.userInfo.avatarUrl;
            baidulogin_request.device_info = zj.Util.getDeviceInfo();
            baidulogin_request.version_info = zj.Util.getAppVersionInfo();
            baidulogin_request.auth_key = "";
            var body = JSON.stringify(baidulogin_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onBaiduAppLoginGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/baiduapp_login.do", egret.HttpMethod.POST);
            request.send(body);
            //console.log("baiduapp_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        BaiduAppPlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_baiduapp, this);
            this.timer.start();
        };
        // ajax请求baidu登陆回复
        BaiduAppPlatform.prototype.onBaiduAppLoginGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("baiduapp_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("百度登录API失败:") + json.retcode);
                return;
            }
            var response = json.body;
            this.openid = response.openid;
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
        BaiduAppPlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        BaiduAppPlatform.prototype.getOption = function (key) {
            return "";
        };
        // 获取程序启动场景信息
        BaiduAppPlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        BaiduAppPlatform.prototype.showClubButton = function () {
            return;
        };
        // 隐藏游戏圈(游戏论坛)按钮
        BaiduAppPlatform.prototype.hideClubButton = function () {
            return;
        };
        // 短时间振动(15ms)
        BaiduAppPlatform.prototype.vibrateShort = function () {
            var swan = window['swan'] ? window['swan'] : {};
            if ('vibrateShort' in swan) {
                swan['vibrateShort']({});
            }
        };
        // 较长时间振动(400ms)
        BaiduAppPlatform.prototype.vibrateLong = function () {
            var swan = window['swan'] ? window['swan'] : {};
            if ('vibrateLong' in swan) {
                swan['vibrateLong']({});
            }
        };
        BaiduAppPlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var swan = window['swan'] ? window['swan'] : {};
            if (!('requestPolymerPayment' in swan)) {
                zj.toast_warning("暂不支持百度支付");
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                return;
            }
            var baidupay_request = new message.BaiduAppPayReqBody();
            baidupay_request.user_id = zj.Game.Controller.userID();
            baidupay_request.product_id = productID;
            baidupay_request.product_quantity = productNum;
            baidupay_request.cp_role_id = zj.Game.Controller.roleID().toString();
            baidupay_request.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            baidupay_request.cp_ext = developerPayload ? developerPayload : "";
            baidupay_request.device_info = zj.Util.getDeviceInfo();
            baidupay_request.version_info = zj.Util.getAppVersionInfo();
            baidupay_request.version_info.channel = "baiduapp";
            var body = JSON.stringify(baidupay_request);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("baidu_pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("百度下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                // 调起百度支付
                swan['requestPolymerPayment']({
                    orderInfo: {
                        dealId: response.dealId,
                        appKey: response.appKey,
                        totalAmount: response.totalAmount,
                        tpOrderId: response.pay_no,
                        dealTitle: response.dealTitle,
                        signFieldsRange: 1,
                        rsaSign: response.rsaSign,
                        bizInfo: "{}"
                    },
                    bannedChannels: [],
                    success: function (res) { zj.toast_success("支付成功"); zj.Game.UIManager.closeWaitingUI(); zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: true }); },
                    fail: function (res) { zj.toast_warning("支付失败"); zj.Game.UIManager.closeWaitingUI(); zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false }); }
                });
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，百度下单失败");
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_baiduapp.do", egret.HttpMethod.POST);
            http_request.send(body);
            console.log("baidu_pay request: " + body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        BaiduAppPlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("baidu platform not support RewardedVideoAd");
                            reject("暂不支持视频激励广告功能");
                        })];
                });
            });
        };
        BaiduAppPlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("暂不支持Banner广告");
                        })];
                });
            });
        };
        BaiduAppPlatform.prototype.hideBannerAd = function () {
            if (this.bannerAd) {
                this.bannerAd.hide();
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        };
        BaiduAppPlatform.NAME = "baiduapp";
        return BaiduAppPlatform;
    }());
    zj.BaiduAppPlatform = BaiduAppPlatform;
    __reflect(BaiduAppPlatform.prototype, "zj.BaiduAppPlatform", ["zj.Platform"]);
    if (!("swan" in window))
        window["swan"] = {};
    window['BaiduAppPlatform'] = BaiduAppPlatform;
})(zj || (zj = {}));
//# sourceMappingURL=BaiduAppPlatform.js.map