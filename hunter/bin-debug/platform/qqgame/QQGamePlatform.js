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
    // QQ小程序(小游戏)环境支持
    var QQGamePlatform = (function () {
        function QQGamePlatform() {
            this.button_club = null; // 游戏圈按钮
            this.button_userinfo = null; // 获取用户信息按钮
            this.code = ""; // QQ登录验证返回的临时code
            this.openid = ""; // QQopenid
            this.session_key = ""; // 会话key
            this.timer = null; // 失败重试的定时器
            this.rewardedVideoAd = null; // QQ视频激励广告控件
            this.bannerAd = null; // QQBanner广告控件
            this.launch_query = {}; // 启动或者show时带的参数
            this.launch_scene = ""; // 启动或者show时带的场景信息，类似于 scene=1038  或scene=1037&appid=123456
        }
        // 当前环境是否支持该平台
        QQGamePlatform.isSupport = function () {
            var ret = egret.Capabilities.runtimeType == "qqgame";
            console.log('QQGamePlatform isSupport test is :' + ret);
            return ret;
        };
        // 复制文本到剪贴板
        QQGamePlatform.prototype.setClipboardData = function (str) {
            console.log("qqplatform setClipboardData: " + str);
            var qq = window['qq'] || {};
            if (!('setClipboardData' in qq))
                return;
            qq.setClipboardData({
                data: str,
            });
        };
        QQGamePlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        // 平台名字
        QQGamePlatform.prototype.name = function () {
            return "qqgame";
        };
        QQGamePlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var qq, func, onShareAppMessage, sysinfo, launchOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            zj.AppConfig.Channel = "qqgame";
                            zj.Device.isCopyright = true; // 规避版权
                            qq = window['qq'] || {};
                            if ('onShow' in qq) {
                                qq['onShow'](function (res) { _this.onShow(res); });
                            }
                            if ('onHide' in qq) {
                                qq['onHide'](function (res) { _this.onHide(res); });
                            }
                            // 打开右上角分享菜单
                            if ('showShareMenu' in qq) {
                                func = qq.showShareMenu;
                                func({ withShareTicket: false });
                            }
                            // 设置分享的默认内容
                            if ('onShareAppMessage' in qq) {
                                onShareAppMessage = qq['aldOnShareAppMessage'];
                                if (!onShareAppMessage)
                                    onShareAppMessage = qq['onShareAppMessage'];
                                onShareAppMessage(function () {
                                    var num = Object.keys(zj.TextsConfig.TextsConfig_Share.ShareTexts).length; //分享图片数组的长度
                                    var a = Math.floor(Math.random() * num); //随机数，随机抽取一套分享资源
                                    return {
                                        title: zj.TextsConfig.TextsConfig_Share.ShareTexts[a],
                                        imageUrl: zj.AppConfig.ProjectUrlRoot + zj.UIConfig.UIConfig_Special.shareImg[a],
                                        query: "fromuserid=" + zj.Game.Controller.userID()
                                    };
                                });
                            }
                            if ('createRewardedVideoAd' in qq) {
                                this.rewardedVideoAd = qq['createRewardedVideoAd']({ adUnitId: zj.AppConfig.QQRewardVideoAdUnitId });
                                if (this.rewardedVideoAd)
                                    this.rewardedVideoAd.onLoad(function () { console.log("视频广告加载成功"); });
                                if (this.rewardedVideoAd)
                                    this.rewardedVideoAd.onError(function (err) { console.log(err); });
                            }
                            sysinfo = qq.getSystemInfoSync();
                            console.log(sysinfo);
                            launchOptions = qq['getLaunchOptionsSync']();
                            console.log(launchOptions);
                            this.launch_query = launchOptions.query;
                            this.launch_scene = ("scene=" + launchOptions.scene);
                            if (launchOptions.referrerInfo && launchOptions.referrerInfo.appId) {
                                this.launch_scene += ("&appid=" + launchOptions.referrerInfo.appId);
                            }
                            console.log("分享处理");
                            this.shareFunction();
                            return [4 /*yield*/, this.check_review_status()];
                        case 1:
                            _a.sent();
                            console.log("init finished");
                            return [2 /*return*/, new Promise(function (resolve, reject) {
                                    console.log("qq init resolve");
                                    resolve(true);
                                })];
                    }
                });
            });
        };
        // 检测是否提审状态
        QQGamePlatform.prototype.check_review_status = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var request = new egret.HttpRequest();
                            request.responseType = egret.HttpResponseType.TEXT;
                            request.setRequestHeader("Content-Type", "application/json");
                            request.addEventListener(egret.Event.COMPLETE, function (event) {
                                var request = event.currentTarget;
                                console.log("query_channel_review_versions response: " + request.response);
                                var json = JSON.parse(request.response);
                                if (json.retcode != 0) {
                                    console.log(zj.LANG("check_review_status fail:") + json.retcode);
                                    resolve({});
                                    return;
                                }
                                var response = json.body;
                                var review_versions = response.reviewVersions;
                                console.log("review_versions:" + review_versions);
                                var versions = review_versions.split(",");
                                var local_version = zj.AppConfig.MajorVersion + "." + zj.AppConfig.MinorVersion + "." + zj.AppConfig.RevisionVersion;
                                var has_review = false;
                                for (var i = 0; i < versions.length; i++) {
                                    if (versions[i] == local_version) {
                                        has_review = true;
                                        break;
                                    }
                                }
                                console.log("has_review:" + (has_review ? "true" : "false"));
                                if (has_review) {
                                    zj.Device.isReviewSwitch = true;
                                }
                                resolve({});
                                return;
                            }, _this);
                            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                                console.warn("query_channel_review_versions io error");
                                resolve({});
                            }, _this);
                            request.open(zj.AppConfig.ApiUrlRoot + "/api/query_channel_review_versions.do", egret.HttpMethod.POST);
                            var queryconfig_request = new message.QueryChannelReviewVersionsReqBody();
                            queryconfig_request.device_info = zj.Util.getDeviceInfo();
                            queryconfig_request.version_info = zj.Util.getAppVersionInfo();
                            request.send(JSON.stringify(queryconfig_request));
                            console.log("query_channel_review_versions request: " + JSON.stringify(queryconfig_request));
                        })];
                });
            });
        };
        QQGamePlatform.prototype.onShow = function (res) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log(JSON.stringify(res));
                    console.log("切回前台");
                    zj.Game.SoundManager.resumeMusic();
                    this.launch_query = res.query;
                    this.launch_scene = ("scene=" + res.scene);
                    if (res.referrerInfo && res.referrerInfo.appId) {
                        this.launch_scene += ("&appid=" + res.referrerInfo.appId);
                    }
                    console.log("分享处理");
                    this.shareFunction();
                    return [2 /*return*/];
                });
            });
        };
        QQGamePlatform.prototype.onHide = function (res) {
            console.log("切到后台");
            zj.Game.SoundManager.pauseMusic();
            //Game.Controller.logout();
        };
        // 关闭平台
        QQGamePlatform.prototype.close = function () {
            var qq = window['qq'] || {};
            if ('exitMiniProgram' in qq) {
                qq['exitMiniProgram']({});
            }
            return;
        };
        //被分享者与服务器之间的联系
        QQGamePlatform.prototype.shareFunction = function () {
            var shareID = this.getOption("url");
            if (shareID && shareID.length > 0) {
                zj.Controller.setGlobalStorageItem("shareID", shareID);
            }
        };
        // 重启
        QQGamePlatform.prototype.restart = function () {
            var qq = window['qq'] || {};
            if ('exitMiniProgram' in qq) {
                qq['exitMiniProgram']({});
            }
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        QQGamePlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        // 分享
        QQGamePlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            var qq = window['qq'] || {};
            if (!('shareAppMessage' in qq))
                return;
            var shareAppMessage = qq['aldShareAppMessage']; // 优先使用阿拉丁接口
            if (!shareAppMessage)
                shareAppMessage = qq['shareAppMessage'];
            if (imageUrl.length == 0)
                zj.AppConfig.ProjectUrlRoot + "share/Share0.jpg";
            shareAppMessage({ title: title, imageUrl: imageUrl, query: query });
        };
        // 登录
        QQGamePlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            var _this = this;
            console.log("登录方式：QQ登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            var qq = window['qq'] || {};
            if (!('login' in qq)) {
                this.callback_fail.call(this.callback_this, "当前环境不支持QQ登录");
                return;
            }
            qq.login({
                success: function (res /*qq.LoginResponse*/) {
                    console.log(res);
                    _this.code = res.code;
                    // this.checkScopSetting();
                    if (zj.Device.isReviewSwitch) {
                        _this.auth_qqapp(); // 提审版QQ登录
                    }
                    else {
                        _this.query_qqapp_openid(); // 正式版以openid为设备ID，采用aone登录
                    }
                },
                fail: function (res) {
                    console.log(res);
                    _this.callback_fail.call(_this.callback_this, "QQ登录失败");
                }
            });
        };
        // 检查用户授权
        QQGamePlatform.prototype.checkScopSetting = function () {
            var _this = this;
            var qq = window['qq'] || {};
            if (!('getSetting' in qq)) {
                this.showUserInfoButton();
                return;
            }
            qq.getSetting({
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
        // 从2018年4月30日起开发版和体验版不再支持该接口弹出授权提示框，2018年7月15日线上版本仍支持
        QQGamePlatform.prototype.getUserInfo = function () {
            var _this = this;
            var qq = window['qq'] || {};
            if (!('getUserInfo' in qq)) {
                this.callback_fail.call(this.callback_this, "当前环境不支持获取用户基本信息");
                return;
            }
            qq.getUserInfo({
                success: function (res /*qq.UserInfoResponse*/) {
                    console.log(res);
                    _this.userinfo_response = res;
                    if (zj.Device.isReviewSwitch) {
                        _this.auth_qqapp(); // 提审版QQ登录
                    }
                    else {
                        _this.query_qqapp_openid(); // 正式版以openid为设备ID，采用aone登录
                    }
                },
                fail: function (res) {
                    console.log(res);
                    _this.callback_fail.call(_this.callback_this, "获取用户信息失败");
                }
            });
        };
        // 显示获取用户信息按钮
        // QQ官方推荐的获取用户信息的方案
        QQGamePlatform.prototype.showUserInfoButton = function () {
            var _this = this;
            var qq = window['qq'] || {};
            if (!('createUserInfoButton' in qq)) {
                this.getUserInfo();
                return;
            }
            if (this.button_userinfo == null) {
                this.button_userinfo = qq['createUserInfoButton']({
                    type: 'image',
                    image: 'start_game_button.png',
                    withCredentials: true,
                    lang: "zh_CN",
                    style: {
                        left: (window.innerWidth - 167) / 2,
                        top: (window.innerHeight * 2 / 3) + 15,
                        width: 167,
                        height: 62,
                        lineHeight: 40,
                        borderRadius: 4
                    }
                });
                if (this.button_userinfo == null) {
                    this.callback_fail.call(this.callback_this, "获取用户基本信息失败");
                    return;
                }
                this.button_userinfo.onTap(function (res /*qq.UserInfoResponse*/) {
                    console.log(res);
                    console.log("用户点击QQ获取用户信息按钮");
                    if (_this.button_userinfo)
                        _this.button_userinfo.hide();
                    if (_this.button_userinfo)
                        _this.button_userinfo.destroy();
                    _this.button_userinfo = null;
                    if ('userInfo' in res) {
                        // 用户同意授权了
                        _this.userinfo_response = res;
                        if (zj.Device.isReviewSwitch) {
                            _this.auth_qqapp(); // 提审版QQ登录
                        }
                        else {
                            _this.query_qqapp_openid(); // 正式版以openid为设备ID，采用aone登录
                        }
                    }
                    else {
                        // 基本上是用户拒绝授权了
                        console.log("未获得授权，无法进行游戏，您可以重新授权：右上角菜单->关于猎人世界->右上角菜单->设置");
                        //this.callback_fail.call(this.callback_this, "未获得授权，无法进行游戏，您可以重新授权：右上角菜单->关于猎人世界->右上角菜单->设置");
                        _this.button_userinfo = null;
                        setTimeout(function () { _this.showUserInfoButton(); }, 0);
                        return;
                    }
                });
            }
            if (this.button_userinfo)
                this.button_userinfo.show();
            console.log("显示获取用户信息按钮");
        };
        // 获取用户openid
        QQGamePlatform.prototype.query_qqapp_openid = function () {
            var qq = window['qq'] || {};
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var qqlogin_request = new message.QQQueryOpenidReqBody();
            qqlogin_request.code = this.code;
            qqlogin_request.device_info = zj.Util.getDeviceInfo();
            qqlogin_request.version_info = zj.Util.getAppVersionInfo();
            qqlogin_request.auth_key = "";
            var body = JSON.stringify(qqlogin_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onQQGameQueryOpenidGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/qq_query_openid.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("qq_query_openid request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // 登录验证获取token
        QQGamePlatform.prototype.auth_qqapp = function () {
            var qq = window['qq'] || {};
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var qqlogin_request = new message.QQGameLoginReqBody();
            qqlogin_request.code = this.code;
            qqlogin_request.device_info = zj.Util.getDeviceInfo();
            qqlogin_request.version_info = zj.Util.getAppVersionInfo();
            qqlogin_request.auth_key = "";
            var body = JSON.stringify(qqlogin_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onQQGameLoginGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/qqgame_login.do", egret.HttpMethod.POST);
            request.send(body);
            //console.log("qq_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        QQGamePlatform.prototype.onGetIOError = function (event) {
            var qq = window['qq'] || {};
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.closeWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            if (zj.Device.isReviewSwitch) {
                // 提审版QQ登录
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_qqapp, this);
            }
            else {
                // 正式版以openid为设备ID，采用aone登录
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.query_qqapp_openid, this);
            }
            this.timer.start();
        };
        // ajax请求weixin登陆回复
        QQGamePlatform.prototype.onQQGameLoginGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("qqapp_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("QQ登录API失败:") + json.retcode);
                return;
            }
            var response = json.body;
            this.openid = response.openid;
            this.session_key = response.session_key;
            zj.Controller.setGlobalStorageItem("device_id", this.openid); // 设备Id为openid
            zj.EventTracker.track('账号登录', {
                "login_type": "QQ登录",
                "user_id": response.user_id.toString(),
                "user_account": response.user_account,
                "device_id": zj.Util.getDeviceInfo().device_id
            });
            if (this.callback_this) {
                this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
                this.callback_fail = null;
                this.callback_success = null;
                this.callback_this = null;
            }
            return;
        };
        // ajax请求weixin获取openid回复
        QQGamePlatform.prototype.onQQGameQueryOpenidGetComplete = function (event) {
            var _this = this;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            console.log("qqapp_query_openid response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("QQ获取openid API失败:") + json.retcode);
                return;
            }
            var response = json.body;
            this.openid = response.openid;
            this.session_key = response.session_key;
            zj.Controller.setGlobalStorageItem("device_id", this.openid); // 设备Id为openid
            zj.loadUI(zj.AoneLoginDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.open(_this.callback_success, _this.callback_fail, _this.callback_this);
                _this.callback_fail = null;
                _this.callback_success = null;
                _this.callback_this = null;
            });
            return;
        };
        // 更新角色信息
        // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
        QQGamePlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        QQGamePlatform.prototype.getOption = function (key) {
            var query = this.launch_query;
            if (key in query) {
                return query[key];
            }
            else {
                return "";
            }
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        QQGamePlatform.prototype.getScene = function () {
            return this.launch_scene;
        };
        // 显示游戏圈(游戏论坛)按钮
        QQGamePlatform.prototype.showClubButton = function () {
            var qq = window['qq'] || {};
            if (!('createGameClubButton' in qq))
                return; // 支持版本 >= 2.0.3
            if (this.button_club == null) {
                this.button_club = qq['createGameClubButton']({
                    icon: 'green',
                    type: 'image',
                    style: {
                        left: 10,
                        top: 40,
                        width: 40,
                        height: 40
                    }
                });
                if (this.button_club == null)
                    return;
                this.button_club.onTap(function (res) {
                    console.log("打开游戏圈");
                });
            }
            if (this.button_club)
                this.button_club.show();
            console.log("显示游戏圈按钮");
        };
        // 隐藏游戏圈(游戏论坛)按钮
        QQGamePlatform.prototype.hideClubButton = function () {
            if (this.button_club == null)
                return;
            this.button_club.hide();
            console.log("隐藏游戏圈按钮");
        };
        // 短时间振动(15ms)
        QQGamePlatform.prototype.vibrateShort = function () {
            var qq = window['qq'] || {};
            if ('vibrateShort' in qq) {
                qq['vibrateShort']({});
            }
        };
        // 较长时间振动(400ms)
        QQGamePlatform.prototype.vibrateLong = function () {
            var qq = window['qq'] || {};
            if ('vibrateLong' in qq) {
                qq['vibrateLong']({});
            }
        };
        QQGamePlatform.prototype.pay_midas = function (productID, productNum, developerPayload) {
            var qq = window['qq'] || {};
            if (!('requestMidasPayment' in qq)) {
                zj.toast_warning("暂不支持米大师支付");
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                return;
            }
            var productInfo = zj.Game.PlayerPaySystem.queryProduct(productID);
            if (productInfo == null) {
                zj.toast_warning("未找到指定商品");
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                return;
            }
            var qq_request = new message.QQGamePayReqBody();
            qq_request.user_id = zj.Game.Controller.userID();
            qq_request.product_id = productID;
            qq_request.product_quantity = productNum;
            qq_request.cp_role_id = zj.Game.Controller.roleID().toString();
            qq_request.cp_group_id = zj.Game.Controller.groupOwnerID().toString();
            qq_request.cp_ext = developerPayload ? developerPayload : "";
            qq_request.device_info = zj.Util.getDeviceInfo();
            qq_request.version_info = zj.Util.getAppVersionInfo();
            qq_request.openid = this.openid;
            qq_request.session_key = this.session_key;
            var body = JSON.stringify(qq_request);
            var http_request = new egret.HttpRequest();
            http_request.responseType = egret.HttpResponseType.TEXT;
            http_request.setRequestHeader("Content-Type", "application/json");
            http_request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("qqgame_pay response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast_warning(zj.LANG("米大师下单API失败:") + json.retcode);
                    zj.Game.UIManager.closeWaitingUI();
                    zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                    return;
                }
                var response = json.body;
                // 调起米大师支付
                console.log("starCurrency" + ((productInfo.amount * productNum * 10) >> 0));
                qq['requestMidasPayment']({
                    prepayId: response.prepayId,
                    starCurrency: (productInfo.amount * productNum * 10) >> 0,
                    setEnv: 1,
                    success: function (res) { zj.toast_success("支付成功"); zj.Game.UIManager.closeWaitingUI(); zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: true }); },
                    fail: function (res) { zj.toast_warning("支付失败"); console.log(JSON.stringify(res)); zj.Game.UIManager.closeWaitingUI(); zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false }); }
                });
            }, this);
            http_request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                zj.toast_warning("Ajax调用错误，米大师下单失败");
                zj.Game.UIManager.closeWaitingUI();
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            }, this);
            http_request.open(zj.AppConfig.ApiUrlRoot + "/api/pay_qqgame.do", egret.HttpMethod.POST);
            http_request.send(body);
            console.log("qqgame_pay request: " + body);
            zj.Game.UIManager.openWaitingUI();
            return;
        };
        QQGamePlatform.prototype.pay = function (productID, productNum, developerPayload) {
            //if (Device.isReviewSwitch) {
            this.pay_midas(productID, productNum, developerPayload);
            //} else {
            //    this.pay_nowpay(productID, productNum, developerPayload);
            //}
        };
        QQGamePlatform.prototype.pay_nowpay = function (productID, productNum, developerPayload) {
            return;
        };
        QQGamePlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var qq;
                return __generator(this, function (_a) {
                    qq = window['qq'] || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!('createRewardedVideoAd' in qq)) {
                                reject("该QQ版本不支持视频激励广告");
                                return;
                            }
                            if (!_this.rewardedVideoAd) {
                                reject("该QQ版本不支持视频激励广告");
                                return;
                            }
                            _this.rewardedVideoAd.load()
                                .then(function () {
                                _this.rewardedVideoAd.onClose(function (res) {
                                    // 用户点击了【关闭广告】按钮
                                    if (res && res.isEnded) {
                                        // 正常播放结束，可以下发游戏奖励
                                        _this.rewardedVideoAd.load();
                                        resolve();
                                        return;
                                    }
                                    else {
                                        // 播放中途退出，不下发游戏奖励
                                        _this.rewardedVideoAd.load();
                                        reject("播放中途退出");
                                        return;
                                    }
                                });
                                _this.rewardedVideoAd.show();
                            })
                                .catch(function (error) {
                                reject("视频加载失败，请稍候再试！");
                            });
                        })];
                });
            });
        };
        QQGamePlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var qq;
                return __generator(this, function (_a) {
                    qq = window['qq'] || {};
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!('createBannerAd' in qq)) {
                                reject("该微信版本不支持Banner广告");
                                return;
                            }
                            if (_this.bannerAd == null) {
                                // 目前游戏区域占用上面1550个像素
                                var sysinfo = qq.getSystemInfoSync();
                                var windowWidth = sysinfo.windowWidth;
                                var windowHeight = sysinfo.windowHeight;
                                var top_1 = 1550 * windowHeight / zj.UIManager.StageHeight;
                                var height = windowHeight - top_1;
                                _this.bannerAd = qq['createBannerAd']({
                                    adUnitId: zj.AppConfig.QQBannerAdUnitId,
                                    style: {
                                        left: windowWidth * 0.03,
                                        top: top_1,
                                        width: windowWidth * 0.94,
                                        height: height
                                    }
                                });
                                if (!_this.bannerAd) {
                                    reject("Banner广告实例创建失败");
                                    return;
                                }
                                _this.bannerAd.onLoad(function () { console.log("banner广告加载成功"); });
                                _this.bannerAd.onError(function (err) { console.log(err); });
                            }
                            _this.bannerAd.show()
                                .then(function () {
                                resolve();
                            })
                                .catch(function (error) {
                                console.log(error);
                                reject("Banner广告加载失败");
                            });
                        })];
                });
            });
        };
        QQGamePlatform.prototype.hideBannerAd = function () {
            if (this.bannerAd) {
                this.bannerAd.hide();
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        };
        return QQGamePlatform;
    }());
    zj.QQGamePlatform = QQGamePlatform;
    __reflect(QQGamePlatform.prototype, "zj.QQGamePlatform", ["zj.Platform"]);
    window['QQGamePlatform'] = QQGamePlatform;
})(zj || (zj = {}));
//# sourceMappingURL=QQGamePlatform.js.map