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
    // oppo小游戏环境支持
    var OppoPlatform = (function () {
        function OppoPlatform() {
            this.timer = null; // 失败重试的定时器
            this.appId = "30147954"; // 平台分配的游戏appId
        }
        // 当前环境是否支持该平台
        OppoPlatform.isSupport = function () {
            var qg = window['qg'] ? window['qg'] : {};
            return (('getProvider' in qg) && (qg.getProvider() == "OPPO") && ('login' in qg) && ('setLoadingProgress' in qg) && ('pay' in qg));
        };
        // 平台名字
        OppoPlatform.prototype.name = function () {
            return "oppo";
        };
        // 复制文本到剪贴板
        OppoPlatform.prototype.setClipboardData = function (str) {
        };
        OppoPlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        OppoPlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var qg;
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "oppogame";
                    qg = window['qg'] ? window['qg'] : {};
                    if ('onShow' in qg) {
                        qg.onShow(function (res) { _this.onShow(res); });
                    }
                    if ('onHide' in qg) {
                        qg.onHide(function (res) { _this.onHide(res); });
                    }
                    qg.getSystemInfo({
                        success: function (res) {
                            console.log("platformVersion is:" + res.platformVersion);
                            _this.platformVersion = res.platformVersion + "";
                        },
                        fail: function (err) { },
                        complete: function (res) { }
                    });
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("oppo platform init ok");
                            resolve();
                        })];
                });
            });
        };
        // 关闭平台
        OppoPlatform.prototype.close = function () {
            return;
        };
        // 重启
        OppoPlatform.prototype.restart = function () {
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        OppoPlatform.prototype.setLoadingProgress = function (percentage) {
            window['qg']['setLoadingProgress']({ progress: percentage });
            if (percentage == 100) {
                window['qg']['loadingComplete']({});
            }
        };
        OppoPlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            return;
        };
        // 登录
        OppoPlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            var _this = this;
            console.log("登录方式：oppo登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            var qg = window['qg'] ? window['qg'] : {};
            qg.login({
                success: function (res) {
                    console.log("res is:", JSON.stringify(res));
                    _this.uid = res.uid;
                    _this.token = res.token;
                    _this.nickName = res.nickName;
                    _this.avatar = res.avatar;
                    _this.sex = res.sex;
                    _this.birthday = res.birthday;
                    _this.phoneNum = res.phoneNum;
                    _this.auth_oppo();
                },
                fail: function (res) {
                    console.log(res);
                    _this.callback_fail.call(_this.callback_this, "oppo小游戏登录失败");
                }
            });
            return;
        };
        // 登录验证获取token
        OppoPlatform.prototype.auth_oppo = function () {
            if (!OppoPlatform.isSupport())
                return;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var oppoLoginreq = new message.SDKLoginReqBody();
            oppoLoginreq.sdk_userid = "";
            oppoLoginreq.sdk_version = "";
            oppoLoginreq.sdk_token = this.token;
            oppoLoginreq.device_info = zj.Util.getDeviceInfo();
            oppoLoginreq.version_info = zj.Util.getAppVersionInfo();
            oppoLoginreq.auth_key = "";
            var body = JSON.stringify(oppoLoginreq);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onOppoGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
            request.send(body);
            //console.log("oppo_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        OppoPlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_oppo, this);
            this.timer.start();
        };
        // ajax请求fbinstant登陆回复
        OppoPlatform.prototype.onOppoGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("oppo_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("oppo登录API失败:") + json.retcode);
                this.callback_fail.call(this.callback_this, "oppo小游戏登录失败:" + json.retcode);
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
        OppoPlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        OppoPlatform.prototype.getOption = function (key) {
            return "";
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        OppoPlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        OppoPlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        OppoPlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        OppoPlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        OppoPlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        OppoPlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var _this = this;
            var qg = window['qg'] ? window['qg'] : {};
            var oppoPayReq = new message.OppoGamePayReqBody();
            oppoPayReq.user_id = zj.Game.Controller.userID();
            oppoPayReq.product_id = productID;
            oppoPayReq.product_quantity = productNum;
            oppoPayReq.cp_role_id = zj.Game.Controller.roleID().toString();
            oppoPayReq.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            oppoPayReq.cp_ext = developerPayload ? developerPayload : "";
            oppoPayReq.device_info = zj.Util.getDeviceInfo();
            oppoPayReq.version_info = zj.Util.getAppVersionInfo();
            oppoPayReq.version_info.channel = "oppogame";
            oppoPayReq.open_id = this.token;
            oppoPayReq.app_version = zj.AppConfig.MajorVersion + "." + zj.AppConfig.MinorVersion + "." + zj.AppConfig.RevisionVersion;
            oppoPayReq.engine_version = this.platformVersion;
            var body = JSON.stringify(oppoPayReq);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("oppogame pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("oppo小游戏下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                console.log("oppogame response is:" + JSON.stringify(response));
                // 调起支付
                qg.pay({
                    appId: _this.appId,
                    token: _this.token,
                    timestamp: response.timestamp,
                    paySign: response.paySign,
                    orderNo: response.orderNo,
                    // 成功回调函数，结果以 OPPO 小游戏平台通知CP的回调地址为准
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
                zj.toast_warning("Ajax调用错误，oppo小游戏下单失败");
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_oppogame.do", egret.HttpMethod.POST);
            console.log("oppogame pay request: " + body);
            http_request.send(body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        OppoPlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持oppo平台");
                        })];
                });
            });
        };
        OppoPlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持oppo平台");
                        })];
                });
            });
        };
        OppoPlatform.prototype.hideBannerAd = function () {
            return;
        };
        OppoPlatform.prototype.onShow = function (res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("切回前台");
                    zj.Game.SoundManager.resumeMusic();
                    return [2 /*return*/];
                });
            });
        };
        OppoPlatform.prototype.onHide = function (res) {
            console.log("切到后台");
            zj.Game.SoundManager.pauseMusic();
        };
        return OppoPlatform;
    }());
    zj.OppoPlatform = OppoPlatform;
    __reflect(OppoPlatform.prototype, "zj.OppoPlatform", ["zj.Platform"]);
    window['OppoPlatform'] = OppoPlatform;
})(zj || (zj = {}));
//# sourceMappingURL=OppoPlatform.js.map