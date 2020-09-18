//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
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
if (!global)
    global = window;
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.splashScene = null;
        _this.isStartupOK = false;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        console.log("main - start");
        this.isStartupOK = false;
        Main.renetDialog = new zj.RenetDialog(this.stage);
        // WEB环境读取从index.html传递过来的参数
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            if ('index_param_AppId' in window) {
                var appid = window['index_param_AppId'];
                console.log("index_param_AppId", appid);
                appid = parseInt(appid);
                if (isNaN(appid))
                    appid = -1;
                if (appid != -1)
                    zj.AppConfig.AppId = appid;
            }
            if ('index_param_Channel' in window) {
                var val = window['index_param_Channel'];
                console.log("index_param_Channel", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.Channel = val;
                }
            }
            if ('index_param_MajorVersion' in window) {
                var version = window['index_param_MajorVersion'];
                console.log("index_param_MajorVersion", version);
                version = parseInt(version);
                if (isNaN(version))
                    version = -1;
                if (version != -1)
                    zj.AppConfig.MajorVersion = version;
            }
            if ('index_param_MinorVersion' in window) {
                var version = window['index_param_MinorVersion'];
                console.log("index_param_MinorVersion", version);
                version = parseInt(version);
                if (isNaN(version))
                    version = -1;
                if (version != -1)
                    zj.AppConfig.MinorVersion = version;
            }
            if ('index_param_RevisionVersion' in window) {
                var version = window['index_param_RevisionVersion'];
                console.log("index_param_RevisionVersion", version);
                version = parseInt(version);
                if (isNaN(version))
                    version = -1;
                if (version != -1)
                    zj.AppConfig.RevisionVersion = version;
            }
            if ('index_param_ResourceVersion' in window) {
                var version = window['index_param_ResourceVersion'];
                console.log("index_param_ResourceVersion", version);
                version = parseInt(version);
                if (isNaN(version))
                    version = -1;
                if (version != -1)
                    zj.AppConfig.ResourceVersion = version;
            }
            if ('index_param_GameLogoImageKey' in window) {
                var val = window['index_param_GameLogoImageKey'];
                console.log("index_param_GameLogoImageKey", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.GameLogoImageKey = val;
                }
            }
            if ('index_param_ApiUrlRoot' in window) {
                var val = window['index_param_ApiUrlRoot'];
                console.log("index_param_ApiUrlRoot", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.ApiUrlRoot = val;
                }
            }
            if ('index_param_EntryUrlRoot' in window) {
                var val = window['index_param_EntryUrlRoot'];
                console.log("index_param_EntryUrlRoot", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.EntryUrlRoot = val;
                }
            }
            if ('index_param_ProjectUrlRoot' in window) {
                var val = window['index_param_ProjectUrlRoot'];
                console.log("index_param_ProjectUrlRoot", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.ProjectUrlRoot = val;
                }
            }
        }
        // 在正式服务器测试
        // zj.TestAppConfig.initReleaseTest();
        // 统计打开次数
        var pageview_count_str = zj.Controller.getGlobalStorageItem("pageview_count");
        var pageview_count = parseInt(pageview_count_str);
        if (!pageview_count_str || isNaN(pageview_count) || pageview_count == undefined)
            pageview_count = 0;
        pageview_count++;
        zj.Controller.setGlobalStorageItem("pageview_count", pageview_count.toString());
        console.log(this.stage.frameRate);
        //this.stage.frameRate = 30; // 以30帧/秒运行
        RES.setMaxLoadingThread(12); // 默认为4,设为12
        console.log("egret.Capabilities.os: ", egret.Capabilities.os);
        console.log("egret.Capabilities.runtimeType: ", egret.Capabilities.runtimeType);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB &&
            !window["hbs"] &&
            !('qg' in window && 'getProvider' in window['qg']) &&
            !('BK' in window)) {
            zj.AppConfig.ProjectUrlRoot = "";
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2) {
            zj.AppConfig.ProjectUrlRoot = ""; // native环境置空
        }
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            // ios12输入框点击完成的时候egret并没有恢复焦点，导致并没有执行egret.ticker.resume();进而导致游戏假死
            if (!((egret.Capabilities.runtimeType == egret.RuntimeType.WEB) && (egret.Capabilities.os == "iOS"))) {
                egret.ticker.pause();
            }
            if (zj.Game.SoundManager)
                zj.Game.SoundManager.pauseMusic();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
            if (zj.Game.SoundManager)
                zj.Game.SoundManager.resumeMusic();
        };
        //console.log(document.fullscreenEnabled);
        //this.launchFullscreen(document.documentElement);
        // 初始化平台参数
        zj.initPlatform();
        if (zj.platform == null) {
            console.warn("不支持该运行环境");
            return;
        }
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        // 添加场景管理器到舞台
        this.stage.addChild(zj.Game.UIManager);
        // 为按钮添加默认音效
        this.attachSoundEffectToButton();
        // 加载资源配置和皮肤
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.isAddRefreshBtn = function () {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB && !window["hbs"];
    };
    Main.isCurrencysMove = function () {
        return this.isAddRefreshBtn() || egret.Capabilities.runtimeType != egret.RuntimeType.RUNTIME2;
    };
    Main.prototype.addRefreshButton = function () {
        var _this = this;
        var that = this;
        if (Main.isAddRefreshBtn()) {
            var btn_1 = new eui.Image();
            btn_1.x = this.stage.stageWidth - 178 * 0.5 - 10;
            btn_1.y = 10;
            btn_1.scaleX = 0.5;
            btn_1.scaleY = 0.5;
            this.stage.addChild(btn_1);
            egret.ImageLoader.crossOrigin = "anonymous";
            var imgLoader = new egret.ImageLoader();
            imgLoader.once(egret.Event.COMPLETE, function (evt) {
                var loader = evt.currentTarget;
                var bmd = loader.data;
                var texture = new egret.Texture();
                texture._setBitmapData(bmd);
                btn_1.texture = texture;
                btn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    if (that.isStartupOK) {
                        var rect_back_1 = new eui.Rect();
                        rect_back_1.width = _this.stage.stageWidth;
                        rect_back_1.height = _this.stage.stageHeight;
                        rect_back_1.fillAlpha = 0;
                        egret.Tween.get(rect_back_1).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
                        _this.stage.addChild(rect_back_1);
                        var dialog_1 = new zj.RefreshDialog();
                        dialog_1.width = _this.stage.stageWidth;
                        dialog_1.height = _this.stage.stageHeight;
                        _this.stage.addChild(dialog_1);
                        dialog_1.model().then(function (bl) {
                            _this.stage.removeChild(rect_back_1);
                            _this.stage.removeChild(dialog_1);
                            if (bl)
                                zj.platform.restart();
                        });
                    }
                    else {
                        zj.platform.restart();
                    }
                }, null);
            }, this);
            imgLoader.load(zj.AppConfig.ProjectUrlRoot + "refresh.png");
            this.stage.addEventListener(egret.Event.RESIZE, function () {
                btn_1.x = _this.stage.stageWidth - 178 * 0.5 - 10;
            }, this);
        }
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var version, played_video, loginScene, rect, loginScene;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // 平台初始化
                    return [4 /*yield*/, zj.platform.init()];
                    case 1:
                        // 平台初始化
                        _a.sent();
                        console.log("platform init ok");
                        zj.DevicePointTracker.track(10); //STEP_APP_START = 10; // 客户端启动
                        zj.DevicePointTracker.track(30); //STEP_UPDATE_START = 30; // 热更新开始
                        zj.ReyunTracker.track("Install"); // 热云， 初始化成功
                        this.uploadDeviceActivityEvent(); // 上传激活事件
                        // 添加闪屏页到舞台
                        this.splashScene = new zj.SplashScene(this.stage.stageWidth, this.stage.stageHeight);
                        this.splashScene.width = this.stage.stageWidth;
                        this.splashScene.height = this.stage.stageHeight;
                        this.stage.addChild(this.splashScene);
                        // 添加刷新按钮
                        this.addRefreshButton();
                        zj.platform.setLoadingProgress(0); // 设置进度为0
                        // 加载资源
                        return [4 /*yield*/, this.loadResource()];
                    case 2:
                        // 加载资源
                        _a.sent();
                        // 应用程序初始化
                        return [4 /*yield*/, zj.Game.init()];
                    case 3:
                        // 应用程序初始化
                        _a.sent();
                        zj.platform.setLoadingProgress(100); // 设置进度为100
                        zj.DevicePointTracker.track(40); //STEP_UPDATE_FINISH = 40; // 热更新完成
                        return [4 /*yield*/, this.getSDKVersion()];
                    case 4:
                        version = _a.sent();
                        console.log("sdk interface version: " + version);
                        played_video = zj.Controller.getGlobalStorageItem("played_video");
                        if (!((version >= 190925) && (played_video != "true") && (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2))) return [3 /*break*/, 7];
                        return [4 /*yield*/, zj.loadUI(zj.LoginScene, false, 5000)];
                    case 5:
                        loginScene = _a.sent();
                        zj.Game.ConfigManager.loadConfigs(); // 开始异步加载其他配置
                        this.splashScene.close();
                        this.splashScene = null;
                        rect = zj.Util.getMaskImgBlack(this.stage.stageWidth, this.stage.stageHeight);
                        this.stage.addChild(rect);
                        console.log("player video");
                        return [4 /*yield*/, zj.platform.playVideo("video.mp4")];
                    case 6:
                        _a.sent();
                        console.log("player video finish");
                        loginScene.show();
                        this.stage.removeChild(rect);
                        zj.Controller.setGlobalStorageItem("played_video", "true");
                        return [3 /*break*/, 9];
                    case 7:
                        // 显示登录页面
                        console.log("start to login scene");
                        return [4 /*yield*/, zj.loadUI(zj.LoginScene, false, 5000)];
                    case 8:
                        loginScene = _a.sent();
                        zj.Game.ConfigManager.loadConfigs(); // 开始异步加载其他配置
                        loginScene.show();
                        this.splashScene.close();
                        this.splashScene = null;
                        _a.label = 9;
                    case 9:
                        this.isStartupOK = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = egret.setTimeout(function () {
                            Main.renetDialog.show(function () { zj.platform.restart(); });
                        }, this, 15000);
                        // 加载资源配置
                        console.log("zj.AppConfig.ProjectUrlRoot", zj.AppConfig.ProjectUrlRoot);
                        egret.ImageLoader.crossOrigin = "anonymous";
                        if (!((egret.Capabilities.runtimeType == egret.RuntimeType.WEB) && ('location' in window) && ('hostname' in window.location) &&
                            ((window.location.hostname == "127.0.0.1") || (window.location.hostname.indexOf("192.168") != -1)))) return [3 /*break*/, 2];
                        return [4 /*yield*/, RES.loadConfig("default.res.json", zj.AppConfig.ProjectUrlRoot + "resource/")];
                    case 1:
                        _a.sent();
                        console.log("default.res.json load ok");
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, Promise.all([
                            RES.loadConfig("default.res_sub0.json", zj.AppConfig.ProjectUrlRoot + "resource/"),
                            RES.loadConfig("default.res_sub1.json", zj.AppConfig.ProjectUrlRoot + "resource/"),
                            RES.loadConfig("default.res_sub2.json", zj.AppConfig.ProjectUrlRoot + "resource/"),
                            RES.loadConfig("default.res_sub3.json", zj.AppConfig.ProjectUrlRoot + "resource/")
                        ])];
                    case 3:
                        _a.sent();
                        console.log("default.res_sub*.json load ok");
                        _a.label = 4;
                    case 4:
                        // 加载皮肤配置文件和所有的exml文件内容
                        console.log("promise them, game start");
                        return [4 /*yield*/, this.loadTheme()];
                    case 5:
                        _a.sent();
                        console.log("promise them, game ok");
                        egret.clearTimeout(id);
                        Main.renetDialog.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // 加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var thm_url = zj.AppConfig.ProjectUrlRoot + "resource/default.thm.json";
            console.log(thm_url);
            var theme = new eui.Theme(thm_url, _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                console.log("load thm ok");
                resolve();
            }, _this);
        });
    };
    // 为所有按钮统一添加音效
    Main.prototype.attachSoundEffectToButton = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (touch) {
            var typeName = egret.getQualifiedClassName(touch.target);
            console.log("统一按钮点击：", typeName);
            switch (typeName) {
                case 'eui.Button':
                case 'eui.ToggleSwitch':
                case 'eui.ToggleButton':
                    {
                        console.log("播放点击音效");
                        zj.Game.SoundManager.playEffect("ui_dianji_anniu_mp3"); // 按钮点击
                        break;
                    }
            }
        }, this, false, Number.POSITIVE_INFINITY);
    };
    // 启动全屏
    Main.prototype.launchFullscreen = function (element) {
        if (!element)
            return;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };
    Main.prototype.getSDKVersion = function () {
        var _this = this;
        var timeout_id = -1;
        return new Promise(function (resolve, reject) {
            egret.ExternalInterface.addCallback("sendToJS_versionResult", function (msg) {
                console.log("getSDKVersion: " + msg);
                var json = {};
                try {
                    json = JSON.parse(msg);
                    if (json["version"] && !isNaN(parseInt(json["version"]))) {
                        var version = parseInt(json["version"]);
                        if (timeout_id != -1)
                            egret.clearTimeout(timeout_id);
                        if (version < 0)
                            version = 0;
                        resolve(version);
                        return;
                    }
                    if (timeout_id != -1)
                        egret.clearTimeout(timeout_id);
                    resolve(0);
                    return;
                }
                catch (e) {
                    console.log("getSDKVersion error: " + JSON.stringify(e));
                    if (timeout_id != -1)
                        egret.clearTimeout(timeout_id);
                    resolve(0);
                    return;
                }
            });
            egret.ExternalInterface.call("sendToNative_version", "{}");
            timeout_id = egret.setTimeout(function () {
                console.log("getSDKVersion timeout");
                resolve(0);
                return;
            }, _this, 100);
        });
    };
    // 上传设备激活事件
    Main.prototype.uploadDeviceActivityEvent = function () {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, function (event) {
            var request = event.currentTarget;
            console.log("uploadDeviceActivityEvent response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                console.log("uploadDeviceActivityEvent response fail: " + json.retcode);
                return;
            }
            console.log("uploadDeviceActivityEvent response OK");
            return;
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
            console.warn("uploadDeviceActivityEvent io error");
        }, this);
        request.open(zj.AppConfig.ApiUrlRoot + "/api/query_channel_config.do", egret.HttpMethod.POST);
        var queryconfig_request = new message.QueryChannelConfigReqBody();
        queryconfig_request.device_info = zj.Util.getDeviceInfo();
        queryconfig_request.version_info = zj.Util.getAppVersionInfo();
        queryconfig_request.auth_key = zj.Util.AuthKey(queryconfig_request.device_info.device_id, "");
        request.send(JSON.stringify(queryconfig_request));
        console.log("uploadDeviceActivityEvent request: " + JSON.stringify(queryconfig_request));
    };
    Main.renetDialog = null;
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map