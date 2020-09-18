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
    // 易乐玩 h5小游戏环境支持
    var YilewanWebGamePlatform = (function () {
        function YilewanWebGamePlatform() {
            this.timer = null; // 失败重试的定时器
        }
        // 当前环境是否支持该平台
        YilewanWebGamePlatform.isSupport = function () {
            return ('__has_YilewanWebGamePlatform' in window) && (window['__has_YilewanWebGamePlatform'] == true);
        };
        // 平台名字
        YilewanWebGamePlatform.prototype.name = function () {
            return "yilewan";
        };
        // 复制文本到剪贴板
        YilewanWebGamePlatform.prototype.setClipboardData = function (str) {
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
            zj.toast_success("复制成功");
        };
        YilewanWebGamePlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        YilewanWebGamePlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "yilewanwgame";
                    window.addEventListener('message', function (e) {
                        var parentBackData = e.data;
                        parentBackData = (typeof parentBackData == 'string') ? JSON.parse(parentBackData) : parentBackData;
                        switch (parentBackData.dataType) {
                            case 'getLogin':
                                _this.token = parentBackData.token;
                                _this.auth_yilewan();
                                break;
                            case 'getPay':
                                console.log("pay complete!");
                                break;
                        }
                    }, false);
                    zj.Game.EventManager.on(zj.GameEvent.TRACK_SELECT_GROUP, function () {
                        // 易乐玩渠道上报事件
                        window.parent.postMessage(JSON.stringify({
                            data: {
                                action: 0
                            },
                            dataType: 'gameServerAction',
                            frameDomain: location.protocol + '//' + location.host
                        }), '*');
                    }, this);
                    zj.Game.EventManager.on(zj.GameEvent.TRACK_ENTRY_GAME, function (ev) {
                        var select_group = ev.data.group;
                        var select_role = ev.data.role;
                        // 易乐玩渠道上报事件
                        window.parent.postMessage(JSON.stringify({
                            data: {
                                gameCode: 'ZJLRH5',
                                uid: _this.uId,
                                passport: _this.passport,
                                player_role_id: '' + zj.Game.Controller.roleID(),
                                player_role_name: zj.Game.Controller.roleInfo().role_name,
                                player_server_id: '' + select_group.group_id,
                                player_server_name: select_group.group_name,
                                player_grade: '' + select_role.role_level //角色等级
                            },
                            dataType: 'getGameRole',
                            frameDomain: location.protocol + '//' + location.host
                        }), '*');
                    }, this);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!YilewanWebGamePlatform.isSupport()) {
                                reject("不支持yilewan H5游戏平台");
                                return;
                            }
                            console.log("yilewan h5 sdk init ok!");
                            resolve();
                        })];
                });
            });
        };
        // 关闭平台
        YilewanWebGamePlatform.prototype.close = function () {
            if (window && "close" in window) {
                window["close"]();
            }
            return;
        };
        // 重启
        YilewanWebGamePlatform.prototype.restart = function () {
            // if (window && "location" in window && "reload" in window["location"]) {
            //     window.location.reload(true);
            // }
            if (window && "location" in window) {
                window.location.href = window.location.href;
            }
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        YilewanWebGamePlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        YilewanWebGamePlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            return;
        };
        // 登录
        YilewanWebGamePlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            console.log("登录方式：yilewan h5登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            window.parent.postMessage(JSON.stringify({ getUserInfo: '', dataType: 'getLogin', frameDomain: location.protocol + '//' + location.host }), '*');
            return;
        };
        // 登录验证
        YilewanWebGamePlatform.prototype.auth_yilewan = function () {
            if (!YilewanWebGamePlatform.isSupport())
                return;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var login_request = new message.SDKLoginReqBody();
            login_request.sdk_userid = "";
            login_request.sdk_version = "";
            login_request.sdk_token = this.token;
            login_request.device_info = zj.Util.getDeviceInfo();
            login_request.version_info = zj.Util.getAppVersionInfo();
            login_request.auth_key = "";
            var body = JSON.stringify(login_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onMoboGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
            request.send(body);
            //console.log("yilewan_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        YilewanWebGamePlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_yilewan, this);
            this.timer.start();
        };
        // ajax请求登陆回复
        YilewanWebGamePlatform.prototype.onMoboGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("yilewan_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("yilewan登录API失败:") + json.retcode);
                this.callback_fail.call(this.callback_this, "yilewan登录API失败");
                return;
            }
            // 上报事件
            window.parent.postMessage(JSON.stringify({
                data: {},
                dataType: 'gameLoginSuccess',
                frameDomain: location.protocol + '//' + location.host
            }), '*');
            var response = json.body;
            var jsonData = JSON.parse(response.ext);
            this.passport = jsonData.passport;
            this.uId = jsonData.uid + "";
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
        YilewanWebGamePlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        YilewanWebGamePlatform.prototype.getOption = function (key) {
            return "";
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        YilewanWebGamePlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        YilewanWebGamePlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        YilewanWebGamePlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        YilewanWebGamePlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        YilewanWebGamePlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        YilewanWebGamePlatform.prototype.pay = function (productID, productNum, developerPayload) {
            var ext = developerPayload ? developerPayload : "";
            var payReq = new message.YilewanWGamePayReqBody();
            payReq.user_id = zj.Game.Controller.userID();
            payReq.product_id = productID;
            payReq.product_quantity = productNum;
            payReq.cp_role_id = zj.Game.Controller.roleID().toString();
            payReq.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            payReq.cp_ext = ext;
            payReq.device_info = zj.Util.getDeviceInfo();
            payReq.version_info = zj.Util.getAppVersionInfo();
            payReq.version_info.channel = "yilewanwgame";
            payReq.passport = this.passport;
            payReq.uid = this.uId;
            var body = JSON.stringify(payReq);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("yilewan_pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("yilewan下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                var payJsonInfo = JSON.parse(response.payInfo);
                payJsonInfo['actor'] = zj.Game.Controller.roleInfo().role_name;
                payJsonInfo['role_id'] = zj.Game.Controller.roleID();
                console.log("payinfo:" + JSON.stringify({ getUserPayInfo: payJsonInfo, dataType: 'getPay', frameDomain: location.protocol + '//' + location.host }));
                window.parent.postMessage(JSON.stringify({ getUserPayInfo: payJsonInfo, dataType: 'getPay', frameDomain: location.protocol + '//' + location.host }), '*');
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，yilewan下单失败");
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                zj.Game.UIManager.closeWaitingUI();
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_yilewanwgame.do", egret.HttpMethod.POST);
            http_request.send(body);
            console.log("yilewan_pay request: " + body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        YilewanWebGamePlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持yilewan平台");
                        })];
                });
            });
        };
        YilewanWebGamePlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            reject("不支持yilewan平台");
                        })];
                });
            });
        };
        YilewanWebGamePlatform.prototype.hideBannerAd = function () {
            return;
        };
        return YilewanWebGamePlatform;
    }());
    zj.YilewanWebGamePlatform = YilewanWebGamePlatform;
    __reflect(YilewanWebGamePlatform.prototype, "zj.YilewanWebGamePlatform", ["zj.Platform"]);
    window['YilewanWebGamePlatform'] = YilewanWebGamePlatform;
})(zj || (zj = {}));
//# sourceMappingURL=YilewanWebGamePlatform.js.map