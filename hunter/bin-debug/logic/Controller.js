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
    // 全局流程控制器
    var Controller = (function () {
        function Controller() {
            this.token = 0; // 登录验证码
            this.roleinfo = new message.RoleShortInfo(); // 角色简要信息
            this.selectGroup = new message.GameGroupInfo(); // 玩家选择登录的服务器
            this.isNewRole = false; // 是否为新创建角色
            this.proxyHost = ""; // 网关服主机
            this.proxyPort = 0; // 网关服端口
            this.timer = null; // 做心跳的定时器
            this.transfer = new zj.AoneTransfer(); // 与服务端连接通道
            this.loginState = 0; // 登录状态 0未登录，1登录中，2登录成功
            this.keepliveInterval = 120000; // 心跳周期（120秒）
            this.lastServerTime = new Date().getTime() / 1000; // 最后一次心跳获得的服务端时间(1970至今的秒数)
            this.lastGetTimer = egret.getTimer(); // 最后一次心跳时客户端已运行毫秒数
            this.lastPower = new Date().getTime() / 1000; // 最后一次体力刷新时间（1970年至今的秒数）
            this.total_servers = new Array(); // 可连接的nginx服务列表
            this.usable_servers = new Array(); // 可用的nginx服务列表
            this.sessionId = 0; // 会话id
            this.isReconnect = false; // 是否为断线重连模式
            this.last_server = ""; // 最后尝试连接服务
            this.web_pay = ""; // 网页充值地址
            this.customer_web_pay = ""; // 玩家特有网页充值地址
            this.m_shareRoleid = 0;
            this.count_ReconnectUI = 0; // 断线重连弹框计数
            this.dialog_ReconnectUI = null; // 断线重连框
            this.loginInterval = 0; // 角色累计在线时间
            this.reconnect_fail_count = 0; // 重连失败次数，连续重连3次均失败则弹出对话框
            this.activity_redpackage_countdown = 0; // 红包活动结束时间
        }
        Controller.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.registerNotifyHandlers();
                            return [4 /*yield*/, this.load_servers()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        Controller.prototype.uninit = function () {
            this.logout();
            this.token = 0;
            this.roleinfo = new message.RoleShortInfo();
            this.selectGroup = new message.GameGroupInfo();
            this.isNewRole = false;
            this.proxyHost = "";
            this.proxyPort = 0;
            this.loginState = 0;
            this.sessionId = 0;
            this.isReconnect = false;
        };
        Controller.prototype.load_servers = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.addEventListener(egret.Event.COMPLETE, function (event) {
                    try {
                        var request_1 = event.currentTarget;
                        var json = JSON.parse(request_1.response);
                        for (var i = 0; i < json.length; i++) {
                            _this.total_servers.push(json[i]);
                            _this.usable_servers.push(json[i]);
                        }
                        return resolve();
                    }
                    catch (e) {
                        console.log(request.response);
                        zj.toast_warning("解析服务列表失败");
                        return reject();
                    }
                }, _this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                    zj.toast_warning("更新服务列表失败");
                    return reject();
                }, _this);
                egret.ImageLoader.crossOrigin = "anonymous";
                var serverlist = "servers_debug.json";
                if (zj.AppConfig.AppId != 2010 || zj.Device.isReviewSwitch)
                    serverlist = "servers.json";
                request.open(zj.AppConfig.ProjectUrlRoot + serverlist + "?v=" + Math.random(), egret.HttpMethod.GET);
                request.send();
            });
        };
        // 从API获取入口服务域名
        Controller.prototype.query_entry_host = function () {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("query_entry_host response: " + request.response);
                var json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    zj.toast(zj.LANG("query_entry_host fail:") + json.retcode);
                    return;
                }
                var response = json.body;
                zj.AppConfig.EntryBackupUrlRoot = "https://" + response.entryserver_ip;
                return;
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                console.warn("query_entry_host io error");
            }, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/query_channel_config.do", egret.HttpMethod.POST);
            var queryconfig_request = new message.QueryChannelConfigReqBody();
            queryconfig_request.device_info = zj.Util.getDeviceInfo();
            queryconfig_request.version_info = zj.Util.getAppVersionInfo();
            queryconfig_request.auth_key = zj.Util.AuthKey(queryconfig_request.device_info.device_id, "");
            request.send(JSON.stringify(queryconfig_request));
            console.log("query config request: " + JSON.stringify(queryconfig_request));
        };
        Object.defineProperty(Controller.prototype, "isLoginOK", {
            // 是否已登陆游戏成功
            get: function () {
                return this.loginState == 2;
            },
            enumerable: true,
            configurable: true
        });
        // 获取用户ID
        Controller.prototype.userID = function () {
            return this.roleinfo.user_id;
        };
        // 获取角色ID
        Controller.prototype.roleID = function () {
            return this.roleinfo.role_id;
        };
        // 获取share_roleid
        Controller.prototype.shareRoleID = function () {
            return this.m_shareRoleid;
        };
        // 获取所属分区ID
        Controller.prototype.groupOwnerID = function () {
            return this.roleinfo.owner_groupid;
        };
        // 获取最后登录分区ID
        Controller.prototype.lastLoginGroupID = function () {
            return this.roleinfo.last_groupid;
        };
        // 获取玩家登录的分区信息
        Controller.prototype.selectedGroup = function () {
            return this.selectGroup;
        };
        // 获取角色简要信息
        Controller.prototype.roleInfo = function () {
            return this.roleinfo;
        };
        // 网页充值地址
        Controller.prototype.webPayUrl = function () {
            return this.web_pay;
        };
        // 玩家特有网页充值地址
        Controller.prototype.customerWebPayUrl = function () {
            return this.customer_web_pay;
        };
        // 获取本地维护的服务器时间
        Controller.prototype.serverNow = function () {
            var ms = this.lastServerTime * 1000 + (egret.getTimer() - this.lastGetTimer);
            var now = new Date();
            now.setTime(ms);
            return now;
        };
        Object.defineProperty(Controller.prototype, "curServerTime", {
            get: function () {
                return Math.floor(this.serverNow().valueOf() / 1000);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Controller.prototype, "LoginInterval", {
            get: function () {
                return this.loginInterval;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Controller.prototype, "Activity_redpackage_countdown", {
            get: function () {
                return this.activity_redpackage_countdown;
            },
            enumerable: true,
            configurable: true
        });
        // 本地存储
        Controller.getGlobalStorageItem = function (key) {
            if (zj.Util.IsNullOrEmptyString(key))
                return "";
            var v = egret.localStorage.getItem(key);
            if (zj.Util.IsNullOrEmptyString(v))
                return "";
            return v;
        };
        Controller.setGlobalStorageItem = function (key, value) {
            if (zj.Util.IsNullOrEmptyString(key) || zj.Util.IsNullOrEmptyString(value))
                return false;
            egret.localStorage.setItem(key, value);
            return true;
        };
        Controller.removeGlobalStorageItem = function (key) {
            if (zj.Util.IsNullOrEmptyString(key))
                return;
            egret.localStorage.removeItem(key);
            return;
        };
        Controller.prototype.getRoleStorageItem = function (key) {
            if (zj.Util.IsNullOrEmptyString(key))
                return "";
            key = this.roleID() + "_" + key;
            var v = egret.localStorage.getItem(key);
            if (zj.Util.IsNullOrEmptyString(v))
                return "";
            return v;
        };
        Controller.prototype.setRoleStorageItem = function (key, value) {
            if (zj.Util.IsNullOrEmptyString(key) || zj.Util.IsNullOrEmptyString(value))
                return false;
            key = this.roleID() + "_" + key;
            egret.localStorage.setItem(key, value);
            return true;
        };
        Controller.prototype.removeRoleStorageItem = function (key) {
            if (zj.Util.IsNullOrEmptyString(key))
                return;
            key = this.roleID() + "_" + key;
            egret.localStorage.removeItem(key);
            return;
        };
        // 获取一个可用的服务
        Controller.prototype.get_usable_server = function () {
            if (this.total_servers.length == 0)
                return "";
            if (this.usable_servers.length == 0) {
                for (var i = 0; i < this.total_servers.length; i++) {
                    this.usable_servers.push(this.total_servers[i]);
                }
            }
            var rnd = (Math.random() * 1000) >> 0;
            var index = rnd % this.usable_servers.length;
            var server = this.usable_servers[index];
            return server;
        };
        // 删除一个服务
        Controller.prototype.remove_server = function (server) {
            for (var i = 0; i < this.usable_servers.length; i++) {
                if (this.usable_servers[i] == server) {
                    this.usable_servers.splice(i, 1);
                    return;
                }
            }
        };
        // 发送消息
        // msg: 要发送的请求消息
        // thisObject: 回调时的上下文指针
        // callback_response: 对应的回复消息处理方法
        // callback_timeout: 消息处理超时的处理方法
        // isQuietLoading: true时网络请求有loading转圈
        // isQuietToast: true时如果返回消息result非0则弹toast提示
        Controller.prototype.send = function (msg, callback_response, callback_timeout, thisObject, isQuietLoading, isQuietToast) {
            if (this.loginState == 0) {
                //toast_warning(LANG("当前处于未登录状态，无法发送请求"));
                this.showReconnectUI(true);
                return false;
            }
            if (!this.transfer.isConnected || !this.transfer.send(msg, callback_response, callback_timeout, thisObject, isQuietLoading, isQuietToast)) {
                //toast_warning(LANG("网络连接不通畅，无法发送请求"));
                this.showReconnectUI(true);
                return false;
            }
            return true;
        };
        // 开始登录游戏服流程
        Controller.prototype.login = function (proxyHost, proxyPort, roleinfo, token, selectedGroup, isnewRole) {
            this.proxyHost = proxyHost;
            this.proxyPort = proxyPort;
            this.roleinfo = roleinfo;
            this.token = token;
            this.selectGroup = selectedGroup;
            this.isNewRole = isnewRole;
            this.isReconnect = false;
            this.doLoginGame();
        };
        // 登出游戏
        Controller.prototype.logout = function () {
            this.isReconnect = false;
            this.token = 0;
            this.loginState = 0;
            this.transfer.close();
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
        };
        // 登录
        Controller.prototype.doLoginGame = function () {
            if (!this.dialog_ReconnectUI)
                this.dialog_ReconnectUI = new zj.Common_ReLogin();
            this.loginState = 1; // 置为登录流程中状态
            this.transfer.close();
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            this.last_server = this.get_usable_server();
            if (this.last_server.length == 0) {
                zj.toast_warning("没有可用的服务");
                if (zj.Game.UIManager.topScene() instanceof zj.LoadingScene)
                    zj.Game.UIManager.popScene();
                this.showReconnectUI(this.isReconnect);
                return;
            }
            // 开始连接
            if (this.selectGroup.group_id == 31) {
                this.transfer.open("ws://192.168.13.17:25000/hunter", this.onSocketOpen, this.onSocketClose, this);
            }
            else {
                this.transfer.open("wss://" + this.last_server + "/hunter/" + this.selectGroup.group_id, this.onSocketOpen, this.onSocketClose, this);
            }
            zj.Game.UIManager.openWaitingUI();
        };
        // websocket关闭
        Controller.prototype.onSocketClose = function (event) {
            this.transfer.close();
            if (this.loginState == 1) {
                if (zj.Game.UIManager.topScene() instanceof zj.LoadingScene)
                    zj.Game.UIManager.popScene();
                zj.Game.UIManager.closeWaitingUI();
                this.remove_server(this.last_server);
                this.showReconnectUI(!!this.isReconnect);
            }
            else if (this.loginState == 2) {
                zj.Game.EventManager.event(zj.GameEvent.NET_SERVER_DISCONNECTED, {}); // 连接断开(只有断线重连时有事件)
                this.showReconnectUI(true);
            } // 其他情况(忽略)
        };
        // 显示重连UI
        Controller.prototype.showReconnectUI = function (isReconnect) {
            var _this = this;
            if (this.count_ReconnectUI > 0)
                return;
            if (this.reconnect_fail_count < 3) {
                this.reconnect_fail_count++;
                this.isReconnect = !!isReconnect;
                this.doLoginGame();
                return;
            }
            this.reconnect_fail_count++;
            var dialog = new zj.Common_ReLogin();
            dialog.setCB(function () {
                _this.reLogin();
                if (_this.count_ReconnectUI > 0)
                    _this.count_ReconnectUI--;
            }, function () {
                _this.isReconnect = !!isReconnect;
                _this.doLoginGame();
                if (_this.count_ReconnectUI > 0)
                    _this.count_ReconnectUI--;
            }, this);
            dialog.width = zj.UIManager.StageWidth;
            dialog.height = zj.UIManager.StageHeight;
            dialog.anchorOffsetX = 0;
            dialog.anchorOffsetY = 0;
            dialog.x = 0;
            dialog.y = 0;
            var rect_back = new eui.Rect();
            rect_back.fillAlpha = 0;
            egret.Tween.get(rect_back).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
            rect_back.name = "__rect_back";
            rect_back.width = zj.UIManager.StageWidth;
            rect_back.height = zj.UIManager.StageHeight;
            rect_back.x = 0;
            rect_back.y = 0;
            dialog.addChildAt(rect_back, 0);
            zj.Game.UIManager.addChild(dialog);
            this.count_ReconnectUI++;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
        };
        // 强制重新登录
        Controller.prototype.showLoadErrorUI = function () {
            var _this = this;
            if (this.count_ReconnectUI > 0)
                return;
            var dialog = new zj.Common_ReLogin();
            dialog.setCB(function () {
                _this.reLogin();
                if (_this.count_ReconnectUI > 0)
                    _this.count_ReconnectUI--;
            }, null, this);
            dialog.width = zj.UIManager.StageWidth;
            dialog.height = zj.UIManager.StageHeight;
            dialog.anchorOffsetX = 0;
            dialog.anchorOffsetY = 0;
            dialog.x = 0;
            dialog.y = 0;
            var rect_back = new eui.Rect();
            rect_back.fillAlpha = 0;
            egret.Tween.get(rect_back).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
            rect_back.name = "__rect_back";
            rect_back.width = zj.UIManager.StageWidth;
            rect_back.height = zj.UIManager.StageHeight;
            rect_back.x = 0;
            rect_back.y = 0;
            dialog.addChildAt(rect_back, 0);
            dialog.setOneBtn();
            dialog.setMsgInfo(zj.TextsConfig.TextsConfig_Reconnect.loadError);
            zj.Game.UIManager.addChild(dialog);
            this.count_ReconnectUI++;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
        };
        /**断线重连 返回登陆界面 */
        Controller.prototype.reLogin = function () {
            zj.Teach.cleanTeach(); // 清除新手引导
            zj.loadUI(zj.LoginScene).then(function (scene) {
                zj.Game.UIManager.popAllUIs();
                scene.show();
                zj.Game.uninit();
            });
            zj.Game.EventManager.event(zj.GameEvent.NET_SERVER_DISCONNECTED, {}); // 连接断开(只有断线重连时有事件)
        };
        // websocket打开
        Controller.prototype.onSocketOpen = function (event) {
            zj.Game.UIManager.closeWaitingUI();
            //toast(LANG("连接游戏服成功"));
            if (!this.isReconnect) {
                var request = new message.LoginGameserverRequest();
                request.body.token = this.token;
                request.body.userId = this.roleinfo.user_id;
                request.body.roleId = this.roleinfo.role_id;
                request.body.push_token = "";
                request.body.push_channel = "";
                request.body.screen_w = zj.UIManager.StageWidth;
                request.body.screen_h = zj.UIManager.StageHeight;
                request.body.local_language = zj.Util.getAppVersionInfo().app_lang;
                request.body.login_channel = zj.Util.getAppVersionInfo().channel;
                if (!this.transfer.send(request, this.onLoginGameResponse, this.onLoginGameTimeout, this, false)) {
                    this.showReconnectUI(this.isReconnect);
                    if (zj.Game.UIManager.topScene() instanceof zj.LoadingScene)
                        zj.Game.UIManager.popScene();
                    return;
                }
            }
            else {
                var request = new message.ReconnectRequest();
                request.header.srcid = this.roleID();
                request.header.session = this.sessionId;
                request.body.sessionId = this.sessionId;
                if (!this.transfer.send(request, this.onReLoginGameResponse, this.onLoginGameTimeout, this, false)) {
                    this.showReconnectUI(this.isReconnect);
                    return;
                }
            }
        };
        Controller.prototype.onReLoginGameResponse = function (req, resp) {
            var _this = this;
            var request = req;
            var response = resp;
            if (response.header.result != 0) {
                zj.loadUI(zj.ConfirmOkDialog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    var msg = zj.Game.ConfigManager.getAone2CodeReason(response.header.result) + "(" + response.header.result + ")";
                    if (response.header.result == message.EC.XG_INVALID_ROLEID_OR_SESSION)
                        msg = "账号已在其他设备登录，确定返回登录界面";
                    if (response.header.result == message.EC.XG_INVALID_LOGIN)
                        msg = "已被管理员强制下线，确定返回登录界面";
                    if (response.header.result == message.EC.XG_INVALID_ARG)
                        msg = "服务器已重新启动，确定返回登录界面";
                    if (response.header.result == message.EC.XC_SERVER_ID_NOT_EXIST)
                        msg = "服务器已完全断开，确定返回登录界面";
                    if (response.header.result == message.EC.XG_SERVER_RESTART)
                        msg = "服务器已重新启动，确定返回登录界面";
                    if (response.header.result == message.EC.XG_PLUGIN_CHECK_SPEEDUP)
                        msg = "检测到您的网络环境不佳，请检测网络环境后重新进入游戏";
                    dialog.setInfo(msg, function () {
                        _this.logout();
                        _this.reLogin();
                    }, _this);
                });
                return;
            }
            this.web_pay = response.body.web_pay;
            this.customer_web_pay = response.body.customer_web_pay;
            this.lastPower = response.body.lastPower;
            this.loginInterval = response.body.loginInterval;
            // 解压gameinfo信息
            var para = {};
            para["index"] = 4;
            var inflate = new Zlib.Inflate(response.body.gameInfo, para);
            var plain = inflate.decompress();
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var gameInfo = new message.GameInfo();
            if (!gameInfo.parse_bytes(decoder)) {
                zj.toast(zj.LANG("游戏数据解析失败"));
                this.showReconnectUI(false);
                if (zj.Game.UIManager.topScene() instanceof zj.LoadingScene)
                    zj.Game.UIManager.popScene();
                return;
            }
            this.onUpdateGameInfo(gameInfo);
            this.loginState = 2; // 登录成功
            zj.Game.EventManager.event(zj.GameEvent.NET_SERVER_CONNECTED, {}); // 登录成功后广播事件
            // 定时心跳
            if (this.timer)
                this.timer.stop();
            this.timer = new egret.Timer(this.keepliveInterval, 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.doKeepLive, this);
            this.timer.start();
            // 转到主城界面
            //Game.UIManager.popAllScenesAndDialogs();
            this.doKeepLive();
            this.doCheckVersion();
            // 重新进入主城
            if (this.reconnect_fail_count <= 0 || this.reconnect_fail_count > 3) {
                zj.Teach.cleanTeach();
                zj.Game.TeachSystem.uninit();
                zj.Game.TeachSystem.init();
                zj.SceneManager.instance.ReEnterMainCityNew(); // 自动重连不进主城
            }
            this.reconnect_fail_count = 0; // 清0
            return;
        };
        // 登录游戏回复
        Controller.prototype.onLoginGameResponse = function (req, resp) {
            var _this = this;
            var request = req;
            var response = resp;
            if (response.header.result != 0) {
                zj.loadUI(zj.ConfirmOkDialog)
                    .then(function (dialog) {
                    if (zj.Game.UIManager.topScene() instanceof zj.LoadingScene)
                        zj.Game.UIManager.popScene();
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    var msg = zj.Game.ConfigManager.getAone2CodeReason(response.header.result) + "(" + response.header.result + ")";
                    dialog.setInfo(msg, function () {
                        _this.logout();
                    }, _this);
                });
                return;
            }
            this.sessionId = response.body.sessionId;
            this.web_pay = response.body.web_pay;
            this.customer_web_pay = response.body.customer_web_pay;
            this.m_shareRoleid = response.body.share_roleId;
            this.loginInterval = response.body.loginInterval;
            // 解压gameinfo信息
            var para = {};
            para["index"] = 4;
            var inflate = new Zlib.Inflate(response.body.gameInfo, para);
            var plain = inflate.decompress();
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var gameInfo = new message.GameInfo();
            if (!gameInfo.parse_bytes(decoder)) {
                zj.toast(zj.LANG("游戏数据解析失败"));
                this.showReconnectUI(false);
                if (zj.Game.UIManager.topScene() instanceof zj.LoadingScene)
                    zj.Game.UIManager.popScene();
                return;
            }
            // 更新各个系统
            zj.Game.EventManager.event(zj.GameEvent.PLAYER_LOGIN_GAMESERVER_INFO, response.body);
            this.onUpdateGameInfo(gameInfo);
            // 拉取帮会等其他数据
            var other_request = new message.QueryRoleOtherInfoRequest();
            if (!this.transfer.send(other_request, this.onQueryRoleOtherInfoResponse, this.onLoginGameTimeout, this, false)) {
                this.showReconnectUI(false);
                if (zj.Game.UIManager.topScene() instanceof zj.LoadingScene)
                    zj.Game.UIManager.popScene();
                return;
            }
        };
        Controller.prototype.onQueryRoleOtherInfoResponse = function (req, resp) {
            var request = req;
            var response = resp;
            if (response.header.result != 0) {
                zj.toast(zj.LANG("游戏数据拉取失败"));
                this.showReconnectUI(false);
                if (zj.Game.UIManager.topScene() instanceof zj.LoadingScene)
                    zj.Game.UIManager.popScene();
                return;
            }
            // 解压其他gameinfo信息
            var para = {};
            para["index"] = 4;
            var inflate = new Zlib.Inflate(response.body.otherInfo, para);
            var plain = inflate.decompress();
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var otherGameInfo = new message.OtherGameInfo();
            if (!otherGameInfo.parse_bytes(decoder)) {
                zj.toast_warning(zj.LANG("其他游戏数据解析失败"));
                this.showReconnectUI(false);
                if (zj.Game.UIManager.topScene() instanceof zj.LoadingScene)
                    zj.Game.UIManager.popScene();
                return;
            }
            this.loginState = 2; // 登录成功
            this.reconnect_fail_count = 0; // 清0
            zj.EventTracker.track('角色登录', {
                "user_id": this.roleinfo.user_id.toString(),
                "role_id": this.roleinfo.role_id.toString(),
                "role_name": this.roleinfo.role_name,
                "group_id": this.selectGroup.group_id.toString()
            });
            //toast_success(LANG("登录游戏成功V3"));
            // 更新各个系统
            this.onUpdateOtherGameInfo(otherGameInfo);
            zj.Game.EventManager.event(zj.GameEvent.NET_SERVER_CONNECTED, {}); // 登录成功后广播事件
            // 向平台更新角色信息
            zj.AoneTracker.track("login");
            if (this.isNewRole) {
                zj.AoneTracker.track("createRole");
            }
            // 定时心跳
            if (this.timer)
                this.timer.stop();
            this.timer = new egret.Timer(this.keepliveInterval, 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.doKeepLive, this);
            this.timer.start();
            // 转到主城界面(如果新手引导开启并且演示关未结束 跳转到演示关)
            // Device.isTeachOpen == true 新手引导开启 关闭新手引导修改Device.isTeachOpen = false
            // Device.isReviewSwitch评审版标志  为true时不开启新手引导
            // Device.isTeachOpen = false
            this.isShowMainCity(!zj.Device.isTeachOpen && !zj.Device.isReviewSwitch);
            this.doKeepLive();
            return;
        };
        Controller.prototype.gotoMainCityScene = function () {
            zj.SceneManager.instance.EnterMainCityLogin();
        };
        Controller.prototype.isShowMainCity = function (isShow) {
            if (isShow) {
                // Game.TeachSystem.QueryTeach().then((teachItems: Array<message.TeachItem>) => {
                //     Teach.nServerPart = teachItems;
                //     Game.TeachSystem.init();
                this.gotoMainCityScene();
                // });
            }
            else {
                var self_1 = this;
                zj.Game.TeachSystem.QueryTeach().then(function (teachItems) {
                    zj.Teach.nServerPart = teachItems;
                    zj.Teach.nServerPartLocal = zj.Teach.nServerPart;
                    zj.Teach.m_bOpenTeach = true;
                    if (zj.Teach.m_bOpenTeach == true) {
                        if (zj.Teach.isDone(zj.teachBattle.teachPart) == false) {
                            zj.loadUI(zj.Common_Animation).then(function (dialog) {
                                dialog.show();
                                dialog.LoadAni(1000, function () { });
                            });
                        }
                        else {
                            zj.Game.TeachSystem.init();
                            self_1.gotoMainCityScene();
                        }
                    }
                    else {
                        self_1.gotoMainCityScene();
                    }
                }).catch(function () {
                    self_1.gotoMainCityScene();
                });
            }
        };
        // 登录游戏请求超时
        Controller.prototype.onLoginGameTimeout = function (req) {
            zj.toast_warning(zj.LANG("登录超时，尝试重新登录..."));
            this.transfer.close();
            // 定时3秒后重试
            if (this.timer)
                this.timer.stop();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.doLoginGame, this);
            this.timer.start();
        };
        Controller.prototype.doKeepLive = function () {
            console.log("////////////////////////////////////////////////////////////////////");
            console.log("/////////////////////////////doKeepLive/////////////////////////////");
            console.log("////////////////////////////////////////////////////////////////////");
            var request = new message.HeartBeatRequest();
            if (!this.transfer.send(request, this.onKeepLiveResponse, this.onKeepLiveTimeout, this, true)) {
                this.isReconnect = true;
                this.doLoginGame();
                return;
            }
        };
        Controller.prototype.onKeepLiveTimeout = function (req) {
            //toast(LANG("网络似乎有点弱~~"));
            this.showReconnectUI(true);
            return;
        };
        Controller.prototype.onKeepLiveResponse = function (req, resp) {
            var _this = this;
            var request = req;
            var response = resp;
            if (response.header.result != 0) {
                zj.loadUI(zj.ConfirmOkDialog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    var msg = zj.Game.ConfigManager.getAone2CodeReason(response.header.result) + "(" + response.header.result + ")";
                    if (response.header.result == message.EC.XG_PLUGIN_CHECK_SPEEDUP)
                        msg = "检测到您的网络环境不佳，请检测网络环境后重新进入游戏";
                    dialog.setInfo(msg, function () {
                        _this.logout();
                        _this.reLogin();
                    }, _this);
                });
                return;
            }
            this.lastServerTime = response.body.serverTime;
            this.lastGetTimer = egret.getTimer();
            this.lastPower = response.body.lastPower;
            for (var key in response.body.processes) {
                var element = response.body.processes[key];
                if (element.type == message.EProcessType.PROCESS_TYPE_ACTIVITY_REDPACKET) {
                    this.activity_redpackage_countdown = zj.Game.Controller.curServerTime + element.leftTime;
                    zj.Game.PlayerProgressesSystem.progressMap[element.type] = element;
                    break;
                }
            }
            var newPower = response.body.power;
            zj.Game.PlayerInfoSystem.Power = newPower;
            zj.Game.EventManager.event(zj.GameEvent.PLAYER_POWER_CHANGE, newPower);
            zj.Game.PlayerInfoSystem.checkPowerAdd(response.body.serverTime, response.body.lastPower);
            zj.Game.EventManager.event(zj.GameEvent.HUNTER_USERSTRENG_POWER, { power: response.body.power, lastPower: response.body.lastPower });
            // 设置推送
            zj.PushNotice.NotifyLogin();
            // 定时心跳
            if (this.timer)
                this.timer.stop();
            this.timer = new egret.Timer(this.keepliveInterval, 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.doKeepLive, this);
            this.timer.start();
        };
        // 检测版本
        Controller.prototype.doCheckVersion = function () {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onCheckVersionResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.EntryUrlRoot + "/entry/check_version.do", egret.HttpMethod.POST);
            var checkversion_request = new message.CheckVersionReqBody();
            checkversion_request.device_info = zj.Util.getDeviceInfo();
            checkversion_request.version_info = zj.Util.getAppVersionInfo();
            checkversion_request.auth_key = zj.Util.AuthKey(checkversion_request.device_info.device_id, "");
            request.send(JSON.stringify(checkversion_request));
            //console.log("checkversion request: " + JSON.stringify(checkversion_request));
        };
        Controller.prototype.onGetIOError = function (event) {
            console.log("检测版本，Ajax调用错误");
        };
        Controller.prototype.onCheckVersionResponse = function (event) {
            var request = event.currentTarget;
            //console.log("checkversion response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("检查版本失败:") + json.retcode);
                return;
            }
            var response = json.body;
            var version = parseInt(response.update_url);
            if (!version)
                version = 0;
            if (!zj.Game.Controller.checkVersionScheme(version)) {
                console.log("版本检测拦截，需要重启客户端");
                return;
            }
            return;
        };
        // 检测通过返回true
        Controller.prototype.checkVersionScheme = function (version) {
            if (version == 0 || version <= zj.AppConfig.ResourceVersion)
                return true;
            var rect_back = new eui.Rect();
            rect_back.width = zj.Game.UIManager.stage.stageWidth;
            rect_back.height = zj.Game.UIManager.stage.stageHeight;
            rect_back.fillAlpha = 0;
            egret.Tween.get(rect_back).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
            zj.Game.UIManager.stage.addChild(rect_back);
            var dialog = new zj.NewVersionDialog();
            dialog.width = zj.Game.UIManager.stage.stageWidth;
            dialog.height = zj.Game.UIManager.stage.stageHeight;
            zj.Game.UIManager.stage.addChild(dialog);
            dialog.model().then(function (bl) {
                zj.Game.UIManager.stage.removeChild(rect_back);
                zj.Game.UIManager.stage.removeChild(dialog);
                if (bl)
                    zj.platform.restart();
            });
            return false;
        };
        // 注册服务端通知
        Controller.prototype.registerNotifyHandlers = function () {
            // 玩家数据变更
            this.transfer.setNotifyHandler(message.RoleInfoNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, request);
                zj.Game.Controller.onUpdateGameInfo(request.body.gameInfo);
            }, this);
            // 玩家其他数据变更
            this.transfer.setNotifyHandler(message.RoleOtherInfoNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_OTHER_ROLE_INFO, request);
                zj.Game.Controller.onUpdateOtherGameInfo(request.body.otherGameInfo);
            }, this);
            // 跨服聊天频道变化通知
            this.transfer.setNotifyHandler(message.ChatChannelChangeNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_CHAT_CHANNEL, request);
            }, this);
            // 是否参与Ip筛选通知
            this.transfer.setNotifyHandler(message.IPCheckResultNoticeRequest.ID, function (ms) {
                var request = ms;
                // 暂时忽略该通知
            }, this);
            // 推送聊天消息
            this.transfer.setNotifyHandler(message.ChatMessageNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, request);
            }, this);
            // 新邮件通知
            this.transfer.setNotifyHandler(message.MailStateNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_MAIL_STATE, request);
            }, this);
            // 新充值通知
            this.transfer.setNotifyHandler(message.ChargeNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_CHARGE, request);
            }, this);
            // 申请联盟通知
            this.transfer.setNotifyHandler(message.LeagueApplyNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_LEAGUE_APPLY, request);
            }, this);
            // 好友申请通知
            this.transfer.setNotifyHandler(message.FriendApplyNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_FRIEND_APPLY, request);
            }, this);
            // 删除阵型通知
            this.transfer.setNotifyHandler(message.RemoveFormationNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_REMOVE_FORMATION, request);
            }, this);
            // 新手引导通知
            this.transfer.setNotifyHandler(message.TeachStepNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_TEACH_STEP, request);
            }, this);
            // 成员加入场景通知
            this.transfer.setNotifyHandler(message.LeagueSceneJoinNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_LEAGUE_SCENE_JOIN, request);
            }, this);
            // BOSS变化通知
            this.transfer.setNotifyHandler(message.LeagueBossNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS, request);
            }, this);
            // BOSS伤害排行榜通知
            this.transfer.setNotifyHandler(message.LeagueBossRankNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS_RANK, request);
            }, this);
            // 通知联盟成员信息变化
            this.transfer.setNotifyHandler(message.LeagueMemberNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, request);
            }, this);
            // 联盟加餐通知
            this.transfer.setNotifyHandler(message.LeagueBossPartyNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS_PARTY, request);
            }, this);
            // 联盟副本变化通知
            this.transfer.setNotifyHandler(message.LeagueInstanceNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_LEAGUE_INSTANCE, request);
            }, this);
            // 联赛联盟信息变化
            this.transfer.setNotifyHandler(message.LeagueMatchBattleNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_LEAGUE_MATCH_BATTLE, request);
            }, this);
            // 场景推送其他玩家位置
            this.transfer.setNotifyHandler(message.SceneItemPosInfoNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, request);
            }, this);
            // 推送对方战斗结果
            this.transfer.setNotifyHandler(message.BattleImitateResultNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, request);
            }, this);
            // 推送其他玩家位置
            this.transfer.setNotifyHandler(message.SceneItemPosNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, request);
            }, this);
            // 仙境玩家信息
            this.transfer.setNotifyHandler(message.WonderlandRoleInfoNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_WONDERLAND_ROLE_INFO, request);
            }, this);
            // 仙境boss血量变化
            this.transfer.setNotifyHandler(message.BossHpChangeNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_BOSS_HP_CHANGE, request);
            }, this);
            // 仙境BOSS玩家信息
            this.transfer.setNotifyHandler(message.BossRoleInfoNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_BOSS_ROLE_INFO, request);
            }, this);
            // 仙境boss结算信息
            this.transfer.setNotifyHandler(message.SceneBossResultNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_SCENE_BOSS_RESULT, request);
            }, this);
            // 推送匹配成功信息
            this.transfer.setNotifyHandler(message.MatchingResultNoticeRequest.ID, function (ms) {
                var request = ms;
                zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_MATCHING_RESULT, request);
            }, this);
        };
        Controller.prototype.onUpdateGameInfo = function (gameInfo) {
            if (gameInfo == null)
                return;
            var isNeedSetTipsOfAllActivity = false;
            // 1.角色基础数据(取最后一个元素)
            if (gameInfo.baseInfo.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_BASE_INFO_CHANGE, gameInfo.baseInfo[gameInfo.baseInfo.length - 1]);
            }
            // 2.数据杂项(取最后一个元素)
            if (gameInfo.mixUnitInfo.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_MIX_UNIT_INFO_CHANGE, gameInfo.mixUnitInfo[gameInfo.mixUnitInfo.length - 1]);
            }
            // 3.宝物信息(不覆盖)
            if (gameInfo.potatos.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_POTATOS_INFO_CHANGE, gameInfo.potatos);
            }
            // 4.签到信息(取最后一个元素)
            // if (gameInfo.signInfo.length > 0) {
            //     Game.EventManager.event(GameEvent.PLAYER_SIGN_INFO_CHANGE, gameInfo.signInfo[gameInfo.signInfo.length - 1]);
            //     // 领奖提示
            //     Tips.SetTipsOfId(Tips.TAG.AWARD, Tips.TAG.AWARD_SIGN);
            //     Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_SIGN);
            // }
            // 5.物品信息(不覆盖)
            // 6.删除物品(删除没有的物品Id)
            if (gameInfo.goodsInfo.length > 0 || gameInfo.delGoods.length > 0) {
                var ev = new zj.PlayerGoodsInfoChangeEvent(zj.GameEvent.PLAYER_GOODS_INFO_CHANGE);
                ev.goodsInfo = gameInfo.goodsInfo;
                ev.delGoods = gameInfo.delGoods;
                zj.Game.EventManager.dispatchEvent(ev);
                // 背包
                zj.Tips.SetTipsOfId(zj.Tips.TAG.PACKAGE, 1);
                // 福利
                zj.Tips.SetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_GATAWARD);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_UpStar);
                // 时装
                zj.Tips.SetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.FASHION);
                //活动提示（兑换活动，获得红陀螺时）
                //Tips.SetTipsOfAllActivity()
                isNeedSetTipsOfAllActivity = true;
            }
            // 7.执照信息(取最后一个元素)
            if (gameInfo.licenceInfo.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_LICENCE_INFO_CHANGE, gameInfo.licenceInfo[gameInfo.licenceInfo.length - 1]);
            }
            //活动红点
            if (gameInfo.activities.length > 0) {
                //活动红点
                //Tips.SetTipsOfAllActivity();
                isNeedSetTipsOfAllActivity = true;
            }
            // 8.任务信息(不覆盖)
            if (gameInfo.missionInfo.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_MISSION_INFO_CHANGE, gameInfo.missionInfo);
            }
            // 9.每日活跃度(取最后一个元素)
            if (gameInfo.missionActive.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_MISSION_ACTIVE_CHANGE, gameInfo.missionActive[gameInfo.missionActive.length - 1]);
            }
            // 10.武将信息(不覆盖)
            if (gameInfo.generals.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_GENERALS_CHANGE, gameInfo.generals);
            }
            // 11.普通怪物信息(不覆盖)
            if (gameInfo.mobInfos.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_MOB_INFO_CHANGE, gameInfo.mobInfos);
            }
            // 12.副本其他信息(取最后一个元素)
            if (gameInfo.instanceInfo.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_INSTANCE_INFO_CHANGE, gameInfo.instanceInfo[gameInfo.instanceInfo.length - 1]);
            }
            // 13.塔信息(取最后一个元素)
            if (gameInfo.towerInfo.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_TOWER_INFO_CHANGE, gameInfo.towerInfo[gameInfo.towerInfo.length - 1]);
            }
            // 14.军师信息(不覆盖)
            if (gameInfo.advisers.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_ADVISER_INFO_CHANGE, gameInfo.advisers);
            }
            // 15.阵型信息(不覆盖)
            if (gameInfo.formations.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_FORMATION_INFO_CHANGE, gameInfo.formations);
            }
            // 16.进程队列(不覆盖)
            if (gameInfo.progresses.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_PROGRESS_INFO_CHANGE, gameInfo.progresses);
            }
            // 18.联盟成员信息(取最后一个元素)
            if (gameInfo.memberInfo.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_MEMBER_INFO_CHANGE, gameInfo.memberInfo[gameInfo.memberInfo.length - 1]);
            }
            // 19.通缉令(取最后一个元素)
            if (gameInfo.wantedInfo.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_WANTED_INFO_CHANGE, gameInfo.wantedInfo[gameInfo.wantedInfo.length - 1]);
            }
            // 20.所有活动信息(不覆盖)
            if (gameInfo.activities.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_ACTIVITY_INFO_CHANGE, gameInfo.activities);
            }
            // 21.角色属性(取最后一个元素)
            if (gameInfo.otherAttri.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_ROLE_OTHER_ATTRI_CHANGE, gameInfo.otherAttri[gameInfo.otherAttri.length - 1]);
            }
            // 22.神兵信息(不覆盖)
            if (gameInfo.artifacts.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_ARTIFACT_INFO_CHANGE, gameInfo.artifacts);
            }
            // 23.礼包情况(不覆盖)
            // 24.删除礼包(删除已购买的礼包)
            if (gameInfo.giftInfos.length > 0 || gameInfo.delGiftIndexs.length > 0) {
                var ev = new zj.PlayerGiftsInfoChangeEvent(zj.GameEvent.PLAYER_GIFTS_INFO_CHANGE);
                ev.giftInfos = gameInfo.giftInfos;
                ev.delGiftIndexs = gameInfo.delGiftIndexs;
                zj.Game.EventManager.dispatchEvent(ev);
            }
            // 25.已通关最大关卡(不覆盖)
            if (gameInfo.enemyCamp.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_ENEMY_CAMP_CHANGE, gameInfo.enemyCamp);
            }
            // 26.跨服信息
            if (gameInfo.singlecraft.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_SINGLECRAFT_INFO_CHANGE, gameInfo.singlecraft);
            }
            // 27.猎人图鉴
            if (gameInfo.generalHistoryIds.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_GENERAL_HISTORY_IDS_CHANGE, gameInfo.generalHistoryIds);
                // Tips.SetTipsOfId(Tips.TAG.Pokedex);
                // Tips.SetTipsOfId(Tips.TAG.Biography)
            }
            // 28.卡片图鉴
            if (gameInfo.potatoHistoryIds.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_POTATO_HISTORY_IDS_CHANGE, gameInfo.potatoHistoryIds);
            }
            // 30. 宠物信息
            if (gameInfo.petInfo.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_PET_INFO_CHANGE, gameInfo.petInfo);
            }
            if (gameInfo.baseInfo.length > 0 || gameInfo.goodsInfo.length > 0 || gameInfo.delGoods.length > 0 || gameInfo.advisers.length > 0) {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.ADVISER_GET);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.ADVISER_UP);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.ADVISER_AWARD);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.PET_GET);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.PET_UPSTAR);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.ADVISER, zj.Tips.TAG.PET_STEP);
                // 福利
                zj.Tips.SetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_GATAWARD);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_GETPOWER);
                // 荣耀福利
                zj.Tips.SetTipsOfId(zj.Tips.TAG.VIPX, zj.Tips.TAG.VipX_Right);
                // 领奖提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.AWARD);
                // 背包提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.PACKAGE, 1);
                // 时装
                zj.Tips.SetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.FASHION);
                // 帮会提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_DONATE);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_APPLY);
            }
            // 物品获得信息
            if (gameInfo.getGoods.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_GET_GOODS_CHANGE, gameInfo.getGoods);
            }
            if (gameInfo.giftInfos.length > 0) {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.NEWGIFT);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.VIPX, zj.Tips.TAG.VipXGift);
            }
            if (gameInfo.missionInfo.length > 0) {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.DAILY, zj.Tips.TAG.DAILY_ACTIVE);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.DAILY, zj.Tips.TAG.DAILY_ACHIEVE);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.RACE, zj.Tips.TAG.RACEDAY);
            }
            if (gameInfo.missionActive.length > 0) {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.DAILY, zj.Tips.TAG.DAILY_GIFT);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.RACE, zj.Tips.TAG.RACEBOX);
                //宝石商店
                zj.Tips.SetTipsOfId(zj.Tips.TAG.Jewel, zj.Tips.TAG.Jewel_Mall);
            }
            if (gameInfo.goodsInfo.length > 0 || gameInfo.potatos.length > 0 || gameInfo.generals.length > 0) {
                //武将提示
                if (zj.Game.PlayerHunterSystem.queryAllHunters().length == gameInfo.generals.length) {
                    for (var k in zj.Game.PlayerHunterSystem.queryAllHunters()) {
                        var v = zj.Game.PlayerHunterSystem.queryAllHunters()[k];
                        zj.Tips.SetTipsOfHero(v.general_id);
                    }
                }
                else if (gameInfo.generals.length == 1) {
                    for (var k in zj.Game.PlayerHunterSystem.queryAllHunters()) {
                        var v = zj.Game.PlayerHunterSystem.queryAllHunters()[k];
                        for (var i = 0; i < gameInfo.generals.length; i++) {
                            if (v.general_id == gameInfo.generals[i].general_id) {
                                zj.Tips.SetTipsOfHero(v.general_id);
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < gameInfo.generals.length; i++) {
                        zj.Tips.SetTipsOfHero(gameInfo.generals[i].general_id);
                    }
                }
                zj.Tips.SetTipsOfAllHero();
                //卡片提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.POTATO);
            }
            if (gameInfo.generals.length > 0) {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_UpStar);
            }
            if (gameInfo.mobInfos.length > 0 || gameInfo.instanceInfo.length > 0) {
                //遗迹提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.DarkLand, zj.Tips.TAG.RELIC_INSTANCE);
            }
            if (gameInfo.baseInfo.length > 0) {
                //首充
                zj.Tips.SetTipsOfId(zj.Tips.TAG.FIRST);
                //遗迹
                zj.Tips.SetTipsOfId(zj.Tips.TAG.DarkLand, zj.Tips.TAG.RELIC_INSTANCE);
                //扭蛋机
                zj.Tips.SetTipsOfId(zj.Tips.TAG.EGG);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.NEWGIFT);
                // 通行证
                // Tips.SetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_AWARD)
                // Tips.SetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_MISSION)
            }
            if (gameInfo.wantedInfo.length > 0) {
                zj.Tips.SetTipsOfId(zj.Tips.TAG.DarkLand, zj.Tips.TAG.GROUPDARKFIGHT);
            }
            if (gameInfo.mixUnitInfo.length > 0) {
                //首冲提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.FIRST);
                // 领奖提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.AWARD);
                // 福利
                zj.Tips.SetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_GATAWARD);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_UpStar);
                //活动
                //Tips.SetTipsOfAllActivity();
                isNeedSetTipsOfAllActivity = true;
                //猎人传记
                zj.Tips.SetTipsOfId(zj.Tips.TAG.Biography);
                //钓鱼提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.FISH);
                //双色果
                zj.Tips.SetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.DOUBLE);
                //猜拳
                zj.Tips.SetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.RUNES);
                // 通行证
                // Tips.SetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_AWARD)
                // Tips.SetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_MISSION)
            }
            if (gameInfo.licenceInfo.length > 0) {
                //竞技场提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.LADDER_FIGHT);
                //酒馆提示
                zj.Tips.SetTipsOfId(zj.Tips.TAG.TAVERN, zj.Tips.TAG.TAVERN_FREE);
                //争霸
                zj.Tips.SetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.CONTEND_COUNT);
                //跨服战
                zj.Tips.SetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.CHARGE_CHALLENGE);
            }
            isNeedSetTipsOfAllActivity = true;
            if (isNeedSetTipsOfAllActivity) {
                zj.Tips.SetTipsOfAllActivity();
            }
        };
        Controller.prototype.onUpdateOtherGameInfo = function (otherGameInfo) {
            if (otherGameInfo == null)
                return;
            // 联盟
            if (otherGameInfo.info.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_LEAGUE_INFO_CHANGE, otherGameInfo.info[0]);
            }
            // 签到
            // if (otherGameInfo.items.length > 0) {
            //     Game.EventManager.event(GameEvent.PLAYER_SIGN_ITEMS_CHANGE, otherGameInfo.items);
            //     Tips.SetTipsOfId(Tips.TAG.AWARD, Tips.TAG.AWARD_SIGN);
            // }
            // 邮件
            if (otherGameInfo.mailBoxs.length > 0) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_MAIL_BOX_INFO_CHANGE, otherGameInfo.mailBoxs);
            }
            // 联盟提示
            zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, 1);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, 3);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, 4);
        };
        return Controller;
    }());
    zj.Controller = Controller;
    __reflect(Controller.prototype, "zj.Controller");
})(zj || (zj = {}));
//# sourceMappingURL=Controller.js.map