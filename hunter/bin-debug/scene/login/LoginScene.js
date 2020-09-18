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
var zj;
(function (zj) {
    // 登录界面
    // guoshanhe
    // 2018.11.5
    var LoginScene = (function (_super) {
        __extends(LoginScene, _super);
        // private disp: number;
        function LoginScene() {
            var _this = _super.call(this) || this;
            _this.roles = []; // 角色列表信息
            _this.groups = []; // 分区列表
            _this.select_group = null; // 选择的分区信息
            _this.select_role = null; // 选择的角色信息
            _this.is_new_role = false; // 是否为新角色
            _this.user_id = 0;
            _this.user_account = "";
            _this.token = "";
            _this.user_token = 0;
            _this.notice = ""; // 公告
            _this.version_click_count = 0; // 点击计数
            _this.timerNum = 0;
            _this.Ticktimer = 0;
            _this.step = 0;
            _this.timeOutId = -1;
            _this.skinName = "resource/skins/login/LoginSceneSkin.exml";
            _this.rectMask.visible = false;
            _this.btnAccountManager.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAccountManager, _this);
            if (!zj.Device.isReviewSwitch) {
                _this.btnNotice.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnNotice, _this);
            }
            else {
                _this.btnNotice.visible = false;
                _this.btnAccountManager.y = 42;
            }
            _this.btnEntryGame.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnEntryGame, _this);
            _this.groupSelectServer.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGroupSelectServer, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            zj.Game.EventManager.on(zj.GameEvent.LOGIN_BLACK_MASK, _this.openLoginMask, _this);
            var version = zj.Util.getAppVersionInfo();
            _this.lbVersion.text = "v" + version.major_version + "." + version.minor_version + "." + version.revision_version + "." + zj.AppConfig.ResourceVersion;
            _this.lbVersion.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { if (++_this.version_click_count > 5)
                zj.toast(zj.AppConfig.AppId.toString()); }, _this);
            // 检测版本
            _this.doCheckVersion();
            zj.DevicePointTracker.track(20); //STEP_CHECK_VERSION = 20; // 检查版本前
            // 初始隐藏进入游戏按钮和选区
            _this.groupSelectServer.visible = false;
            _this.btnEntryGame.visible = false;
            _this.rect_spark_mask.visible = false;
            _this.img_spark.visible = false;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                _this.btnAccountManager.visible = true;
            }
            else if (window['AoneSDKPlatform'] && zj.platform instanceof window['AoneSDKPlatform']) {
                _this.btnAccountManager.visible = true;
            }
            else {
                _this.btnAccountManager.visible = false; // 关闭账号管理功能
            }
            _this.back_img.mask = new egret.Rectangle(0, 0, 1344, 640);
            zj.cachekey("login_ani_dove_json", _this);
            zj.cachekey("login_ani_dove_png", _this);
            zj.cachekey("login_ani_wave_json", _this);
            zj.cachekey("login_ani_wave_png", _this);
            for (var i = 1; i <= 6; ++i) {
                zj.cachekey("ui_login_new_petal" + i + "_png", _this);
            }
            _this.onStageResize();
            return _this;
        }
        LoginScene.prototype.onStageResize = function () {
            this.width = zj.UIManager.StageWidth;
            this.height = zj.UIManager.StageHeight;
            var imgW = 1344;
            var imgH = 640;
            var imgRate = imgW / imgH;
            var currRate = this.width / this.height;
            if (currRate > imgRate) {
                var scale = currRate / imgRate;
                this.imgSky.scaleX = this.imgSky.scaleY =
                    this.imgCloud.scaleX = this.imgCloud.scaleY =
                        this.imgCity.scaleX = this.imgCity.scaleY =
                            this.imgMountain.scaleX = this.imgMountain.scaleY =
                                this.imgRole.scaleX = this.imgRole.scaleY =
                                    scale;
            }
        };
        // private addAnimation(dbName: string, index: number, armatureName: string = "armatureName") {
        //     if (!Device.isReviewSwitch) {
        //         Game.DragonBonesManager.playAnimation(this, dbName, armatureName, null, 0)
        //             .then(display => {
        //                 display.x = 0;
        //                 display.y = UIManager.StageHeight;
        //                 this.groupAnimation.addChildAt(display, index);
        //             })
        //     }
        // }
        LoginScene.prototype.onAddedToStage = function () {
            console.log("AppConfig.Channel: ", zj.AppConfig.Channel);
            console.log("AppConfig.GameLogoImageKey: ", zj.AppConfig.GameLogoImageKey);
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform'])) {
                if (zj.AppConfig.Channel == "aone_android_lrsjh5") {
                    this.logo.source = zj.cachekey("ui_login_Android_lrsjh5_Logo_png", this);
                }
                else if (zj.AppConfig.Channel == "aone_android_lrsj2h5") {
                    this.logo.source = zj.cachekey("ui_login_Android_lrsjh5_Logo_png", this);
                }
                else if (zj.AppConfig.Channel == "aone_android_lrsj0911h5") {
                    this.logo.source = zj.cachekey("ui_login_Android_lrsjh5_Logo_png", this);
                }
                else if (zj.AppConfig.Channel == "aone_android_slsdh5") {
                    this.logo.source = zj.cachekey("ui_login_Android_slsdh5_Logo_png", this);
                }
                else if (zj.AppConfig.Channel == "aone_android_slsd0911h5") {
                    this.logo.source = zj.cachekey("ui_login_Android_slsdh5_Logo_png", this);
                }
                else if (zj.AppConfig.Channel == "aone_ios_jianliushi") {
                    this.logo.source = zj.cachekey("ui_login_IOS_anshafaze_Logo_png", this);
                }
                else if (zj.AppConfig.Channel == "aone_ios_jianliusan") {
                    this.logo.source = zj.cachekey("ui_login_Mowangzhaohuan_png", this);
                }
                else if (zj.AppConfig.Channel == "aone_ios_jianliuliu") {
                    this.logo.source = zj.cachekey("ui_login_Lierenxueyuan_png", this);
                }
                else if (zj.AppConfig.Channel == "aone_ios_jianliuqi") {
                    this.logo.source = zj.cachekey("ui_login_shoulieshidai_png", this);
                }
                else {
                    this.logo.source = zj.cachekey(zj.AppConfig.GameLogoImageKey, this);
                }
            }
            else {
                this.logo.source = zj.cachekey(zj.AppConfig.GameLogoImageKey, this);
            }
            // if (this.back_img.height < this.height) {
            //     let rate = this.height / this.back_img.height;
            //     this.back_img.scaleX = rate;
            //     this.back_img.scaleY = rate;
            // }
            // if (this.back_img.width * this.back_img.scaleX < this.width) {
            //     let rate2 = this.width / this.back_img.width * this.back_img.scaleX;
            //     this.back_img.scaleX = rate2;
            //     this.back_img.scaleY = rate2;
            // }
            // this.addAnimation("cvchain", 1);
            // this.addAnimation("cvchain2", 2);
            // this.addAnimation("cvsmoke", 3);
            // this.addAnimation("cvqiya", 4);
            // this.addAnimation("cvleiouli", 5);
            // this.addAnimation("cvklpk", 6);
            // this.addAnimation("cvxiaojie", 7);
            // this.addAnimation("cveffect1", 8);
            // this.addAnimation("cveffect2", 9);
            // this.addAnimation("cvsmoke2", 10);
            zj.Game.SoundManager.playMusic("login_mp3", 0);
            this.preLoadResources(); // 预加载的部分
            this.initAni();
            zj.TestAppConfig.checkTest();
        };
        LoginScene.prototype.initAni = function () {
            this.isAniRun = true;
            // this.disp = (this.back_img.width - UIManager.StageWidth) / 2 - 10;
            this.initSun(this.imgSun1);
            this.initSun(this.imgSun2);
            // if (this.disp > 0) {
            //     this.initCloud(this.imgCloud1);
            //     this.initCloud(this.imgCloud2);
            // }
            this.initFt(this.imgFt1, Number(this.imgFt1.name));
            this.initFt(this.imgFt2, Number(this.imgFt2.name));
            this.initFt(this.imgFt3, Number(this.imgFt3.name));
            this.initClouds();
            this.initDove();
            this.initWave();
            this.initPetal();
            // egret.Ticker.getInstance().register(this.Update, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        LoginScene.prototype.initClouds = function () {
            var idx = 0;
            while (this["imgCloud" + idx]) {
                var body = this["imgCloud" + idx];
                this.initFt(body, Number(body.name));
                ++idx;
            }
        };
        LoginScene.prototype.initSun = function (img) {
            var _this = this;
            if (this.isAniRun) {
                this.imgSun1.alpha = 0;
                egret.Tween.get(img)
                    .to({ alpha: 1 }, 2000)
                    .wait(2000)
                    .to({ alpha: 0.2 }, 2000)
                    .call(function () {
                    egret.Tween.removeTweens(img);
                    _this.initSun(img);
                });
            }
        };
        // private initCloud(img: eui.Image) {// 云
        //     if (this.isAniRun) {
        //         let time = 5000;
        //         let dis = Util.randomValue(90, 100) / 100 * this.disp;
        //         egret.Tween.get(img)
        //             .to({ x: -dis }, time)
        //             .wait(400)
        //             .to({ x: dis }, time * 2)
        //             .wait(400)
        //             .to({ x: 0 }, time)
        //             .call(() => {
        //                 egret.Tween.removeTweens(img);
        //                 this.initCloud(img);
        //             });
        //     }
        // }
        LoginScene.prototype.initFt = function (img, sp) {
            var _this = this;
            if (this.isAniRun) {
                var tw = egret.Tween.get(img);
                if (sp > 0) {
                    var max = this.back_img.width;
                    var dis = max - img.x;
                    tw.to({ x: max }, sp * dis)
                        .call(function () {
                        egret.Tween.removeTweens(img);
                        img.x = -60;
                        _this.initFt(img, sp);
                    });
                }
                else {
                    var dis = img.x + 60;
                    tw.to({ x: -60 }, -sp * dis)
                        .call(function () {
                        egret.Tween.removeTweens(img);
                        img.x = _this.back_img.width;
                        _this.initFt(img, sp);
                    });
                }
            }
        };
        LoginScene.prototype.initDove = function () {
            var ani = zj.Game.AnimationManager.create("login_ani_dove");
            ani.x = 896;
            ani.y = Number(this.groupDove.name);
            this.groupDove.addChild(ani);
            ani.onPlay();
            this.aniDove = ani;
            this.initDoveTween(ani, 76);
        };
        LoginScene.prototype.initDoveTween = function (ani, sp) {
            var _this = this;
            if (this.isAniRun) {
                var disp = ani.x + 100;
                egret.Tween.get(ani)
                    .to({ x: -100 }, sp * disp)
                    .call(function () {
                    egret.Tween.removeTweens(ani);
                    ani.x = _this.back_img.width;
                    _this.initDoveTween(ani, sp);
                });
            }
        };
        LoginScene.prototype.initWave = function () {
            var ani = zj.Game.AnimationManager.create("login_ani_wave");
            this.groupWave.addChild(ani);
            ani.onPlay();
            this.aniWave = ani;
        };
        LoginScene.prototype.initPetal = function () {
            if (this.isAniRun) {
                if (!this.petalList) {
                    this.petalList = [];
                }
                var idx = this.getIdx(); //Math.floor(Util.randomValue(1, 7));
                var top_1 = 100;
                var bottom = 540;
                var dis = (bottom - top_1) / 6;
                var x = 1200;
                var body = zj.Game.ParticleManager.create("ui_login_new_petal" + idx + "_png", x, x, top_1 + idx * dis, top_1 + (idx + 1) * dis, zj.Util.randomValue(240, 280) + (idx - 1) * 60, zj.Util.randomValue(-10, 10) / 10, 140, 176, function (x, y) {
                    return x < -50 || y > 690;
                });
                this.groupPetal.addChild(body);
                this.petalList.push(body);
                egret.setTimeout(this.initPetal, this, 400, 1000);
            }
        };
        LoginScene.prototype.getIdx = function () {
            var ran = zj.Util.randomValue(0, 160);
            if (ran < 10) {
                return 6;
            }
            if (ran < 30) {
                return 5;
            }
            if (ran < 60) {
                return 4;
            }
            if (ran < 100) {
                return 3;
            }
            if (ran < 140) {
                return 2;
            }
            return 1;
        };
        LoginScene.prototype.enterFrame = function () {
            this.timerNum = (egret.getTimer() - this.Ticktimer) / 1000;
            if (this.timerNum > 0.033) {
                this.timerNum = 0.033;
            }
            this.Update(this.timerNum);
            this.Ticktimer = egret.getTimer();
        };
        LoginScene.prototype.Update = function (dt) {
            for (var i = this.petalList.length - 1; i >= 0; --i) {
                this.petalList[i].update(dt);
                if (this.petalList[i].isFinish) {
                    this.petalList[i].onRelease();
                    this.petalList.splice(i, 1);
                }
            }
            return false;
        };
        LoginScene.prototype.onRemoveFromStage = function () {
            // egret.Ticker.getInstance().unregister(this.Update, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            this.isAniRun = false;
            // egret.Tween.removeAllTweens();
            if (this.aniDove) {
                this.aniDove.onRelease();
                this.aniDove = null;
            }
            if (this.aniWave) {
                this.aniWave.onRelease();
                this.aniWave = null;
            }
            zj.Game.SoundManager.stopMusic();
        };
        // 场景离开栈顶
        // 1. 从舞台移除
        // 2. 压入新场景
        LoginScene.prototype.onLeaveTopScene = function () {
            this.isAniRun = false;
            zj.Game.SoundManager.stopMusic();
        };
        // 需要预加载的资源
        // 预加载的资源不释放
        LoginScene.prototype.preLoadResources = function () {
            if (zj.Device.isReviewSwitch) {
                zj.cachekey("ui_mainui_BgMaoboli_png", this);
            }
            // 登录选择角色UI需要的头像资源
            if (RES.hasRes("hero_icon1_json"))
                RES.getResAsync("hero_icon1_json");
            if (RES.hasRes("hero_icon2_json"))
                RES.getResAsync("hero_icon2_json");
            // 断线重连
            zj.cachekey("ui_common_BoardServerPopTip_png", this);
            zj.cachekey("ui_common_ButtonServerAgainLinkNor_png", this);
            zj.cachekey("ui_common_ButtonServerAgainLinkSel_png", this);
            zj.cachekey("ui_common_ButtonServerReturnEnterNor_png", this);
            zj.cachekey("ui_common_ButtonServerReturnEnterSel_png", this);
            // 连环画的两张图
            zj.cachekey("ui_cartoon_Cartoon1_jpg", this);
            zj.cachekey("ui_cartoon_Cartoon2_jpg", this);
            zj.Game.SoundManager.preloadSound("demon_mp3");
            zj.cachekey("ui_login_boardloading_kulapika_jpg", this);
            zj.cachekey("ui_login_boardloading_kuluoluo_jpg", this);
            zj.cachekey("ui_login_boardloading_niteluo_jpg", this);
            zj.cachekey("ui_login_boardloading_qiya_jpg", this);
            zj.cachekey("ui_login_boardloading_wang_jpg", this);
            zj.cachekey("ui_login_boardloading_xiaodi_jpg", this);
            zj.cachekey("ui_login_boardloading_xiaojie_jpg", this);
            zj.cachekey("ui_login_boardloading_xisuo_jpg", this);
            zj.cachekey("ui_login_boardloading_yiermi_jpg", this);
            // cachekey("map_1_1_png", this);
            // cachekey("map_1_2_png", this);
            // cachekey("map_1_3_png", this);
            // cachekey("map_1_4_png", this);
            // cachekey("map_1_5_png", this);
            // cachekey("map_1_6_png", this);
            // cachekey("map_1_7_png", this);
            // cachekey("sky_tex_png", this);
            // cachekey("far_mountain_tex_png", this);
            // cachekey("middle_city_tex_png", this);
            // cachekey("middle_tex_png", this);
            // cachekey("close_tex_png", this);
            zj.Game.SoundManager.preloadSound("city_mp3");
            zj.Game.SoundManager.preloadSound("ui_lingqu_wupin_mp3");
            zj.cachekey("jg_zhaomu_tex_png", this);
            zj.cachekey("jg_zhaomu_large_tex_png", this);
            zj.Game.DragonBonesManager.preloadDragonbone(this, "ui_tongyong_xinshou");
        };
        LoginScene.prototype.move_spark = function () {
            var _this = this;
            if (!this.stage)
                return;
            this.img_spark.x = -1 * this.img_spark.width;
            egret.Tween.get(this.img_spark)
                .to({ x: this.btnEntryGame.width }, 2000)
                .call(function () {
                egret.Tween.removeTweens(_this.img_spark);
                if (_this.parent)
                    _this.move_spark();
            });
        };
        LoginScene.prototype.do_login = function () {
            var _this = this;
            // 开始验证账号
            zj.platform.login(function (user_id, user_account, token) {
                _this.user_id = user_id;
                _this.user_account = user_account;
                _this.token = token;
                _this.select_role = null;
                _this.select_group = null;
                zj.DevicePointTracker.track(60); //STEP_SDK_LOGIN = 60; // SDK登录成功
                // 登录入口服务并查询分组列表
                _this.doLoginEntryServer();
            }, function (retcode) {
                //toast_warning(LANG("账号验证失败:") + Game.ConfigManager.getAone2CodeReason(retcode));
                _this.btnAuthAccount.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.show_native_login_ui, _this);
            }, this);
            zj.DevicePointTracker.track(50); //STEP_SDK_CALL = 50; // SDK界面弹出
        };
        LoginScene.prototype.show_native_login_ui = function () {
            this.btnAuthAccount.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_native_login_ui, this);
            this.do_login();
        };
        LoginScene.prototype.onBtnAccountManager = function () {
            this.do_login();
        };
        LoginScene.prototype.onBtnNotice = function () {
            var _this = this;
            zj.loadUI(zj.LoginNoticeDialog)
                .then(function (dialog) {
                dialog.open(_this.getNotice(_this.notice));
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        LoginScene.prototype.onBtnEntryGame = function () {
            if (this.select_group == null) {
                //toast_warning("未获取到分区列表");
                this.do_login();
                return;
            }
            this.doCheckVersion();
        };
        LoginScene.prototype.onBtnGroupSelectServer = function () {
            var _this = this;
            if (this.select_group) {
                zj.loadUI(zj.SelectGameGroupDialog)
                    .then(function (dialog) {
                    dialog.open(_this.groups, _this.roles, _this.select_group, _this.onSelectedGroup, _this);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        LoginScene.prototype.onSelectedGroup = function (select_group) {
            this.select_group = select_group;
            this.select_role = null;
            for (var i = 0; i < this.roles.length; i++) {
                if (this.roles[i].owner_groupid == this.select_group.group_id) {
                    this.select_role = this.roles[i];
                    break;
                }
            }
            // 选择分区事件
            zj.Game.EventManager.event(zj.GameEvent.TRACK_SELECT_GROUP, null);
            zj.Controller.setGlobalStorageItem("last_group_id", this.select_group.group_id.toString());
            this.lbGroupName.text = this.getGroupName(this.select_group);
        };
        // 检测版本
        LoginScene.prototype.doCheckVersion = function () {
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
            console.log("checkversion request: " + JSON.stringify(checkversion_request));
            zj.Game.UIManager.openWaitingUI();
        };
        LoginScene.prototype.onCheckVersionResponse = function (event) {
            var _this = this;
            var request = event.currentTarget;
            console.log("checkversion response: " + request.response);
            zj.Game.UIManager.closeWaitingUI();
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("检查版本失败:") + json.retcode);
                this.do_login();
                return;
            }
            var response = json.body;
            this.notice = response.notice;
            var version = parseInt(response.update_url);
            if (!version)
                version = 0;
            if (!zj.Game.Controller.checkVersionScheme(version)) {
                console.log("版本检测拦截，需要重启客户端");
                return;
            }
            if (!zj.Device.isReviewSwitch) {
                if (this.token.length == 0) {
                    // 公告
                    zj.loadUI(zj.LoginNoticeDialog)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                        dialog.open(_this.getNotice(_this.notice), function () {
                            _this.do_login();
                        }, _this);
                        zj.DevicePointTracker.track(70); //STEP_NOTICE_TIPS = 70; // 公告界面
                    });
                }
                else {
                    if (this.select_role == null) {
                        this.doCreateRole();
                    }
                    else {
                        this.doEntryGameServer();
                    }
                }
            }
            else {
                this.do_login();
            }
        };
        // 登录入口服并获取分区列表
        LoginScene.prototype.doLoginEntryServer = function () {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onUserLoginResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.EntryUrlRoot + "/entry/user_login.do", egret.HttpMethod.POST);
            var userlogin_request = new message.UserLoginReqBody();
            userlogin_request.device_info = zj.Util.getDeviceInfo();
            userlogin_request.version_info = zj.Util.getAppVersionInfo();
            userlogin_request.auth_key = zj.Util.AuthKey(userlogin_request.device_info.device_id, "");
            userlogin_request.user_id = this.user_id;
            userlogin_request.token = this.token;
            request.send(JSON.stringify(userlogin_request));
            console.log("userlogin request: " + JSON.stringify(userlogin_request));
            zj.Game.UIManager.openWaitingUI();
        };
        LoginScene.prototype.onUserLoginResponse = function (event) {
            var request = event.currentTarget;
            console.log("userlogin response: " + request.response);
            zj.Game.UIManager.closeWaitingUI();
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("用户登录失败:") + json.retcode);
                return;
            }
            var response = json.body;
            // 构造分区列表
            if (response.groups.length == 0) {
                zj.toast("服务器维护中...");
                return;
            }
            this.groups = response.groups;
            this.roles = response.roles;
            this.user_token = response.user_token;
            if (this.roles.length <= 0) {
                // 还没有创建过角色
                this.select_group = this.groups[this.groups.length - 1];
                for (var i = 0; i < this.groups.length; i++) {
                    if (this.groups[i].is_recommend) {
                        this.select_group = this.groups[i];
                        break;
                    }
                }
            }
            else {
                // 查找上次登录的分区
                var last_group_id = 0;
                var str = zj.Controller.getGlobalStorageItem("last_group_id");
                if (!(str == null || str == undefined || str.length <= 0 || isNaN(parseInt(str))))
                    last_group_id = parseInt(str);
                for (var i = 0; i < this.groups.length; i++) {
                    if (last_group_id == this.groups[i].group_id) {
                        this.select_group = this.groups[i];
                        for (var j = 0; j < this.roles.length; j++) {
                            if (this.roles[j].owner_groupid == last_group_id) {
                                this.select_role = this.roles[j];
                                break;
                            }
                        }
                        break;
                    }
                }
                // 上次登录信息无，选最后一个角色
                if (this.select_group == null) {
                    this.select_role = this.roles[this.roles.length - 1];
                    for (var i = 0; i < this.groups.length; i++) {
                        if (this.select_role.owner_groupid == this.groups[i].group_id) {
                            this.select_group = this.groups[i];
                            break;
                        }
                    }
                }
            }
            // 都没找到时，默认用最后一个分区
            if (this.select_group == null) {
                this.select_group = this.groups[this.groups.length - 1];
                this.select_role = null;
                for (var i = 0; i < this.roles.length; i++) {
                    if (this.roles[i].owner_groupid == this.select_group.group_id) {
                        this.select_role = this.roles[i];
                        break;
                    }
                }
            }
            this.lbGroupName.text = this.getGroupName(this.select_group);
            this.groupSelectServer.visible = true;
            this.btnEntryGame.visible = true;
            this.img_spark.visible = true;
            this.rect_spark_mask.visible = true;
            this.img_spark.mask = this.rect_spark_mask;
            this.move_spark();
            return;
        };
        LoginScene.prototype.doCreateRole = function () {
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onCreateRoleResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.EntryUrlRoot + "/entry/create_role.do", egret.HttpMethod.POST);
            var createrole_request = new message.CreateRoleReqBody();
            createrole_request.device_info = zj.Util.getDeviceInfo();
            createrole_request.version_info = zj.Util.getAppVersionInfo();
            createrole_request.auth_key = zj.Util.AuthKey(createrole_request.device_info.device_id, "");
            createrole_request.user_id = this.user_id;
            createrole_request.user_account = this.user_account;
            createrole_request.group_id = this.select_group.group_id;
            createrole_request.user_token = this.user_token;
            createrole_request.role_type = 0;
            createrole_request.role_name = "角色" + new md5().hex_md5(this.user_id + "_" + this.select_group.group_id + "_" + Math.random()).substr(0, 5);
            request.send(JSON.stringify(createrole_request));
            //console.log("createrole request: " + JSON.stringify(createrole_request));
            zj.Game.UIManager.openWaitingUI();
        };
        LoginScene.prototype.onCreateRoleResponse = function (event) {
            var request = event.currentTarget;
            //console.log("createrole response: " + request.response);
            zj.Game.UIManager.closeWaitingUI();
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("创建角色失败:") + json.retcode);
                this.do_login();
                return;
            }
            var response = json.body;
            this.select_role = response.role;
            this.is_new_role = true;
            zj.EventTracker.track('创建角色', {
                "user_id": response.role.user_id.toString(),
                "role_id": response.role.role_id.toString(),
                "role_name": response.role.role_name,
                "group_id": this.select_group.group_id.toString()
            });
            zj.DevicePointTracker.track(90); //STEP_CREATE_ROLE_FINISH = 90;	// 创建成功
            zj.ReyunTracker.track("Createrole"); // 热云
            // 创建完角色自动登录
            this.doEntryGameServer();
        };
        // 开始登录游戏服
        LoginScene.prototype.doEntryGameServer = function () {
            var _this = this;
            if (this.select_group == null || this.select_group.server_ip == "" || this.select_group.server_port == 0) {
                zj.toast(zj.LANG("该区已暂停服务，请选择其他分区"));
                return;
            }
            if (this.select_group.status == 4) {
                zj.toast(zj.LANG("服务人数已满，请选择其他分区"));
                return;
            }
            else if (this.select_group.status == 3) {
                // 忙状态
            }
            else if (this.select_group.status == 2) {
                // 正常状态
            }
            else {
                zj.toast(zj.LANG("该区已暂停服务，请选择其他分区"));
                return;
            }
            // 进入游戏主城事件
            zj.Game.EventManager.event(zj.GameEvent.TRACK_ENTRY_GAME, { group: this.select_group, role: this.select_role });
            zj.loadUI(zj.LoadingScene).then(function (scene) {
                zj.Game.UIManager.pushScene(scene);
                _this.doLogin();
            });
        };
        LoginScene.prototype.doLogin = function () {
            this.onStartTimeOut();
            this.checkEntryGameServer();
        };
        LoginScene.prototype.onStartTimeOut = function () {
            var self = this;
            this.timeOutId = egret.setTimeout(function () {
                if (self.step == 0) {
                    Main.renetDialog.show(function () {
                        zj.Game.ConfigManager.loadConfigs();
                        self.doLogin();
                    });
                }
            }, this, 20000);
        };
        LoginScene.prototype.checkEntryGameServer = function () {
            switch (this.step) {
                case 0:// 判断剩余配置文件是否加载完毕
                    if (!zj.Game.ConfigManager.isLoadOK()) {
                        egret.setTimeout(this.checkEntryGameServer, this, 100);
                        return;
                    }
                    break;
                case 1:// 判断剩余配置文件是否解压解析完毕
                    if (!zj.Game.ConfigManager.isConfigureOK()) {
                        zj.Game.ConfigManager.TryConfigure(this.checkEntryGameServer, this);
                        return;
                    }
                    break;
                case 2:
                    if (!zj.Game.IsInitOK()) {
                        egret.setTimeout(this.checkEntryGameServer, this, 100);
                        return;
                    }
                    break;
                case 3:
                    this.checkCloseTimeout();
                    this.enterGame();
                    return;
            }
            ++this.step;
            this.checkEntryGameServer();
        };
        LoginScene.prototype.checkCloseTimeout = function () {
            if (this.timeOutId != -1) {
                egret.clearTimeout(this.timeOutId);
                Main.renetDialog.close();
                this.timeOutId = -1;
            }
        };
        LoginScene.prototype.enterGame = function () {
            zj.Game.Controller.login(this.select_group.server_ip, this.select_group.server_port, this.select_role, this.user_token, this.select_group, this.is_new_role);
            zj.DevicePointTracker.track(100); //STEP_ENTRY_GAME = 100; // 进入游戏
            zj.ReyunTracker.track("login"); // 热云 进入游戏
        };
        LoginScene.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast(zj.LANG("网络错误，重试..."));
            zj.Game.UIManager.closeWaitingUI();
            this.do_login();
        };
        // 取出分区名
        LoginScene.prototype.getGroupName = function (groupinfo) {
            if (groupinfo == null)
                return zj.LANG("未知分区");
            var json = JSON.parse(groupinfo.group_name);
            if (typeof json != "object")
                return this.parseGroupName(groupinfo.group_name);
            if (zj.Game.LanguageManager.getLang() in json)
                return this.parseGroupName(json[zj.Game.LanguageManager.getLang()]);
            if ('zhcn' in json)
                return this.parseGroupName(json['zhcn']);
            if ('en' in json)
                return this.parseGroupName(json['en']);
            for (var k in json) {
                return this.parseGroupName(json[k]);
            }
            return zj.LANG("未知分区");
        };
        // 解析分区名
        LoginScene.prototype.parseGroupName = function (groupName) {
            var names = groupName.split("&");
            if (names.length <= 1)
                return zj.Util.cutString(groupName, 16);
            return zj.Util.cutString(names[0] + "\u533A " + names[1], 16);
        };
        // 取出公告
        LoginScene.prototype.getNotice = function (notice) {
            var json = JSON.parse(notice);
            if (typeof json != "object")
                return "";
            if (zj.Game.LanguageManager.getLang() in json)
                return json[zj.Game.LanguageManager.getLang()];
            if ('zhcn' in json)
                return json['zhcn'];
            if ('en' in json)
                return json['en'];
            for (var k in json) {
                return json[k];
            }
            return "";
        };
        LoginScene.prototype.openLoginMask = function () {
            this.rectMask.visible = true;
        };
        return LoginScene;
    }(zj.Scene));
    zj.LoginScene = LoginScene;
    __reflect(LoginScene.prototype, "zj.LoginScene");
})(zj || (zj = {}));
//# sourceMappingURL=LoginScene.js.map