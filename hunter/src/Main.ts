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

if (!global) global = window;
class Main extends eui.UILayer {
    public static renetDialog: zj.RenetDialog = null;

    private splashScene: zj.SplashScene = null;
    private isStartupOK: boolean = false;

    protected createChildren(): void {
        super.createChildren();
        console.log("main - start");
        this.isStartupOK = false;

        Main.renetDialog = new zj.RenetDialog(this.stage);

        // WEB环境读取从index.html传递过来的参数
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            if ('index_param_AppId' in window) {
                let appid = window['index_param_AppId'];
                console.log("index_param_AppId", appid);
                appid = parseInt(appid);
                if (isNaN(appid)) appid = -1;
                if (appid != -1) zj.AppConfig.AppId = appid;
            }
            if ('index_param_Channel' in window) {
                let val = window['index_param_Channel'];
                console.log("index_param_Channel", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.Channel = val;
                }
            }
            if ('index_param_MajorVersion' in window) {
                let version = window['index_param_MajorVersion'];
                console.log("index_param_MajorVersion", version);
                version = parseInt(version);
                if (isNaN(version)) version = -1;
                if (version != -1) zj.AppConfig.MajorVersion = version;
            }
            if ('index_param_MinorVersion' in window) {
                let version = window['index_param_MinorVersion'];
                console.log("index_param_MinorVersion", version);
                version = parseInt(version);
                if (isNaN(version)) version = -1;
                if (version != -1) zj.AppConfig.MinorVersion = version;
            }
            if ('index_param_RevisionVersion' in window) {
                let version = window['index_param_RevisionVersion'];
                console.log("index_param_RevisionVersion", version);
                version = parseInt(version);
                if (isNaN(version)) version = -1;
                if (version != -1) zj.AppConfig.RevisionVersion = version;
            }
            if ('index_param_ResourceVersion' in window) {
                let version = window['index_param_ResourceVersion'];
                console.log("index_param_ResourceVersion", version);
                version = parseInt(version);
                if (isNaN(version)) version = -1;
                if (version != -1) zj.AppConfig.ResourceVersion = version;
            }
            if ('index_param_GameLogoImageKey' in window) {
                let val = window['index_param_GameLogoImageKey'];
                console.log("index_param_GameLogoImageKey", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.GameLogoImageKey = val;
                }
            }
            if ('index_param_ApiUrlRoot' in window) {
                let val = window['index_param_ApiUrlRoot'];
                console.log("index_param_ApiUrlRoot", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.ApiUrlRoot = val;
                }
            }
            if ('index_param_EntryUrlRoot' in window) {
                let val = window['index_param_EntryUrlRoot'];
                console.log("index_param_EntryUrlRoot", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.EntryUrlRoot = val;
                }
            }
            if ('index_param_ProjectUrlRoot' in window) {
                let val = window['index_param_ProjectUrlRoot'];
                console.log("index_param_ProjectUrlRoot", val);
                if (!!val && typeof val == "string" && val.length > 0) {
                    zj.AppConfig.ProjectUrlRoot = val;
                }
            }
        }
        // 在正式服务器测试
        // zj.TestAppConfig.initReleaseTest();
        // 统计打开次数
        let pageview_count_str = zj.Controller.getGlobalStorageItem("pageview_count");
        let pageview_count = parseInt(pageview_count_str);
        if (!pageview_count_str || isNaN(pageview_count) || pageview_count == undefined) pageview_count = 0;
        pageview_count++;
        zj.Controller.setGlobalStorageItem("pageview_count", pageview_count.toString());

        console.log(this.stage.frameRate);
        //this.stage.frameRate = 30; // 以30帧/秒运行
        RES.setMaxLoadingThread(12); // 默认为4,设为12

        console.log("egret.Capabilities.os: ", egret.Capabilities.os);
        console.log("egret.Capabilities.runtimeType: ", egret.Capabilities.runtimeType);
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB &&
            !window["hbs"] &&  // hbs是华为环境特有
            !('qg' in window && 'getProvider' in window['qg']) && // 小米快游戏
            !('BK' in window)) { // BK是QQ玩吧环境特有
            zj.AppConfig.ProjectUrlRoot = "";
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2) {
            zj.AppConfig.ProjectUrlRoot = ""; // native环境置空
        }

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            // ios12输入框点击完成的时候egret并没有恢复焦点，导致并没有执行egret.ticker.resume();进而导致游戏假死
            if (!((egret.Capabilities.runtimeType == egret.RuntimeType.WEB) && (egret.Capabilities.os == "iOS"))) {
                egret.ticker.pause();
            }
            if (zj.Game.SoundManager) zj.Game.SoundManager.pauseMusic();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
            if (zj.Game.SoundManager) zj.Game.SoundManager.resumeMusic();
        }

        //console.log(document.fullscreenEnabled);
        //this.launchFullscreen(document.documentElement);

        // 初始化平台参数
        zj.initPlatform();
        if (zj.platform == null) {
            console.warn("不支持该运行环境");
            return;
        }

        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        // 添加场景管理器到舞台
        this.stage.addChild(zj.Game.UIManager);
        // 为按钮添加默认音效
        this.attachSoundEffectToButton();

        // 加载资源配置和皮肤
        this.runGame().catch(e => {
            console.log(e);
        })
    }

    public static isAddRefreshBtn() {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB && !window["hbs"];
    }

    public static isCurrencysMove() {// 右上角货币区域是否向左移(除了安卓和ios原生，其他都向左移)
        return this.isAddRefreshBtn() || egret.Capabilities.runtimeType != egret.RuntimeType.RUNTIME2;
    }

    public addRefreshButton() {
        let that = this;
        if (Main.isAddRefreshBtn()) {
            let btn = new eui.Image();
            btn.x = this.stage.stageWidth - 178 * 0.5 - 10;
            btn.y = 10;
            btn.scaleX = 0.5;
            btn.scaleY = 0.5;
            this.stage.addChild(btn);
            egret.ImageLoader.crossOrigin = "anonymous";
            let imgLoader: egret.ImageLoader = new egret.ImageLoader();
            imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event) => {
                let loader: egret.ImageLoader = evt.currentTarget;
                let bmd: egret.BitmapData = loader.data;
                let texture = new egret.Texture();
                texture._setBitmapData(bmd);
                btn.texture = texture;
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                    if (that.isStartupOK) {
                        let rect_back = new eui.Rect();
                        rect_back.width = this.stage.stageWidth;
                        rect_back.height = this.stage.stageHeight;
                        rect_back.fillAlpha = 0;
                        egret.Tween.get(rect_back).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
                        this.stage.addChild(rect_back);
                        let dialog = new zj.RefreshDialog();
                        dialog.width = this.stage.stageWidth;
                        dialog.height = this.stage.stageHeight;
                        this.stage.addChild(dialog);
                        dialog.model().then((bl) => {
                            this.stage.removeChild(rect_back);
                            this.stage.removeChild(dialog);
                            if (bl) zj.platform.restart();
                        })
                    } else {
                        zj.platform.restart();
                    }
                }, null);
            }, this);
            imgLoader.load(zj.AppConfig.ProjectUrlRoot + "refresh.png");
            this.stage.addEventListener(egret.Event.RESIZE, () => {
                btn.x = this.stage.stageWidth - 178 * 0.5 - 10;
            }, this);
        }
    }
    
    private async runGame() {
        // 平台初始化
        await zj.platform.init();
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
        await this.loadResource();

        // 应用程序初始化
        await zj.Game.init();

        zj.platform.setLoadingProgress(100); // 设置进度为100

        zj.DevicePointTracker.track(40); //STEP_UPDATE_FINISH = 40; // 热更新完成

        let version = await this.getSDKVersion();
        console.log("sdk interface version: " + version);

        let played_video = zj.Controller.getGlobalStorageItem("played_video");
        if ((version >= 190925) && (played_video != "true") && (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2)) {
            // 播放视频
            let loginScene = <zj.LoginScene> await zj.loadUI(zj.LoginScene, false, 5000);
            zj.Game.ConfigManager.loadConfigs(); // 开始异步加载其他配置
            this.splashScene.close();
            this.splashScene = null;
            let rect = zj.Util.getMaskImgBlack(this.stage.stageWidth, this.stage.stageHeight);
            this.stage.addChild(rect);
            console.log("player video");
            await zj.platform.playVideo("video.mp4");
            console.log("player video finish");

            loginScene.show();
            this.stage.removeChild(rect);
            zj.Controller.setGlobalStorageItem("played_video", "true");
        } else {
            // 显示登录页面
            console.log("start to login scene");
            let loginScene = <zj.LoginScene> await zj.loadUI(zj.LoginScene, false, 5000);
            zj.Game.ConfigManager.loadConfigs(); // 开始异步加载其他配置
            loginScene.show();
            this.splashScene.close();
            this.splashScene = null;
        }

        this.isStartupOK = true;
    }

    private async loadResource() {
        // 设置加载的超时
        let id = egret.setTimeout(()=>{
            Main.renetDialog.show(function(){zj.platform.restart();});
        }, this, 15000);

        // 加载资源配置
        console.log("zj.AppConfig.ProjectUrlRoot", zj.AppConfig.ProjectUrlRoot);
        egret.ImageLoader.crossOrigin = "anonymous";
        if ((egret.Capabilities.runtimeType == egret.RuntimeType.WEB) && ('location' in window) && ('hostname' in window.location) &&
            ((window.location.hostname == "127.0.0.1") || (window.location.hostname.indexOf("192.168") != -1))) {
            await RES.loadConfig("default.res.json", zj.AppConfig.ProjectUrlRoot + "resource/");
            console.log("default.res.json load ok");
        } else {
            await Promise.all([
                RES.loadConfig("default.res_sub0.json", zj.AppConfig.ProjectUrlRoot + "resource/"),
                RES.loadConfig("default.res_sub1.json", zj.AppConfig.ProjectUrlRoot + "resource/"),
                RES.loadConfig("default.res_sub2.json", zj.AppConfig.ProjectUrlRoot + "resource/"),
                RES.loadConfig("default.res_sub3.json", zj.AppConfig.ProjectUrlRoot + "resource/")]);
            console.log("default.res_sub*.json load ok");
        }

        // 加载皮肤配置文件和所有的exml文件内容
        console.log("promise them, game start");
        await this.loadTheme();
        console.log("promise them, game ok");

        egret.clearTimeout(id);
        Main.renetDialog.close();
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // 加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let thm_url = zj.AppConfig.ProjectUrlRoot + "resource/default.thm.json";
            console.log(thm_url);
            let theme = new eui.Theme(thm_url, this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                console.log("load thm ok");
                resolve();
            }, this);
        })
    }

    // 为所有按钮统一添加音效
    private attachSoundEffectToButton() {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,
            (touch: egret.TouchEvent): void => {
                let typeName = egret.getQualifiedClassName(touch.target);
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
            },
            this, false, Number.POSITIVE_INFINITY);
    }

    // 启动全屏
    public launchFullscreen(element) {
        if (!element) return;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    public getSDKVersion(): Promise<number> {
        let timeout_id = -1;
        return new Promise((resolve, reject) => {
            egret.ExternalInterface.addCallback("sendToJS_versionResult", function (msg) {
                console.log("getSDKVersion: " + msg);
                let json = {};
                try {
                    json = JSON.parse(msg);
                    if (json["version"] && !isNaN(parseInt(json["version"]))) {
                        let version = parseInt(json["version"]);
                        if (timeout_id != -1) egret.clearTimeout(timeout_id);
                        if (version < 0) version = 0;
                        resolve(version);
                        return;
                    }
                    if (timeout_id != -1) egret.clearTimeout(timeout_id);
                    resolve(0);
                    return;
                } catch (e) {
                    console.log("getSDKVersion error: " + JSON.stringify(e));
                    if (timeout_id != -1) egret.clearTimeout(timeout_id);
                    resolve(0);
                    return;
                }
            });

            egret.ExternalInterface.call("sendToNative_version", "{}");
            timeout_id = egret.setTimeout(() => {
                console.log("getSDKVersion timeout");
                resolve(0);
                return;
            }, this, 100);
        });
    }

    // 上传设备激活事件
    private uploadDeviceActivityEvent() {
        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("uploadDeviceActivityEvent response: " + request.response);

            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                console.log("uploadDeviceActivityEvent response fail: " + json.retcode);
                return;
            }

            console.log("uploadDeviceActivityEvent response OK");
            return;
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
            console.warn("uploadDeviceActivityEvent io error");
        }, this);
        request.open(zj.AppConfig.ApiUrlRoot + "/api/query_channel_config.do", egret.HttpMethod.POST);
        let queryconfig_request = new message.QueryChannelConfigReqBody();
        queryconfig_request.device_info = zj.Util.getDeviceInfo();
        queryconfig_request.version_info = zj.Util.getAppVersionInfo();
        queryconfig_request.auth_key = zj.Util.AuthKey(queryconfig_request.device_info.device_id, "");
        request.send(JSON.stringify(queryconfig_request));
        console.log("uploadDeviceActivityEvent request: " + JSON.stringify(queryconfig_request));
    }
}
