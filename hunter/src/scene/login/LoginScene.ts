namespace zj {
    // 登录界面
    // guoshanhe
    // 2018.11.5

    export class LoginScene extends Scene {
        private back_img: eui.Group;
        private btnAccountManager: eui.Button; // 账号管理
        private btnNotice: eui.Button; // 公告
        private btnEntryGame: eui.Button; // 进入游戏
        private groupSelectServer: eui.Group; // 选择游戏组
        // private groupAnimation: eui.Group; // 动画层
        private lbGroupName: eui.Label; // 分区名
        private lbVersion: eui.Label; // 版本信息
        private rect_spark_mask: eui.Rect;
        private img_spark: eui.Image;
        private logo: eui.Image; // logo图
        private btnAuthAccount: eui.Button;

        private roles: Array<message.RoleShortInfo> = [];  // 角色列表信息
        private groups: Array<message.GameGroupInfo> = [];  // 分区列表
        private select_group: message.GameGroupInfo = null; // 选择的分区信息
        private select_role: message.RoleShortInfo = null; // 选择的角色信息
        private is_new_role = false; // 是否为新角色

        private user_id = 0;
        private user_account = "";
        private token = "";
        private user_token = 0;
        private notice = ""; // 公告
        private rectMask: eui.Rect;
        private version_click_count = 0; // 点击计数

        private groupDove: eui.Group;// 鸽子层
        private aniDove: AnimationBody;
        private groupWave: eui.Group;
        private aniWave: AnimationBody;
        private imgFt1: eui.Image;
        private imgFt2: eui.Image;
        private imgFt3: eui.Image;
        // private imgCloud1: eui.Image;
        // private imgCloud2: eui.Image;
        private imgSun1: eui.Image;
        private imgSun2: eui.Image;
        private isAniRun: boolean;

        // private disp: number;
        public constructor() {
            super();
            this.skinName = "resource/skins/login/LoginSceneSkin.exml";
            this.rectMask.visible = false;
            this.btnAccountManager.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAccountManager, this);
            if (!Device.isReviewSwitch) {
                this.btnNotice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNotice, this);
            } else {
                this.btnNotice.visible = false;
                this.btnAccountManager.y = 42;
            }
            this.btnEntryGame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEntryGame, this);
            this.groupSelectServer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupSelectServer, this);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

            Game.EventManager.on(GameEvent.LOGIN_BLACK_MASK, this.openLoginMask, this);

            let version = Util.getAppVersionInfo();
            this.lbVersion.text = `v${version.major_version}.${version.minor_version}.${version.revision_version}.${AppConfig.ResourceVersion}`;
            this.lbVersion.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { if (++this.version_click_count > 5) toast(AppConfig.AppId.toString()) }, this);

            // 检测版本
            this.doCheckVersion();
            DevicePointTracker.track(20); //STEP_CHECK_VERSION = 20; // 检查版本前

            // 初始隐藏进入游戏按钮和选区
            this.groupSelectServer.visible = false;
            this.btnEntryGame.visible = false;
            this.rect_spark_mask.visible = false;
            this.img_spark.visible = false;
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                this.btnAccountManager.visible = true;
            } else if (window['AoneSDKPlatform'] && platform instanceof window['AoneSDKPlatform']) {
                this.btnAccountManager.visible = true;
            } else {
                this.btnAccountManager.visible = false; // 关闭账号管理功能
            }

            this.back_img.mask = new egret.Rectangle(0, 0, 1344, 640);

            cachekey("login_ani_dove_json", this);
            cachekey("login_ani_dove_png", this);
            cachekey("login_ani_wave_json", this);
            cachekey("login_ani_wave_png", this);

            for (let i = 1; i <= 6; ++i) {
                cachekey(`ui_login_new_petal` + i + `_png`, this);
            }

            this.onStageResize();
        }

        // private imgCloud: eui.Image;
        private imgSky: eui.Image;
        private imgCloud: eui.Image;
        private imgCity: eui.Image;
        private imgMountain: eui.Image;
        private imgRole: eui.Image;
        public onStageResize() {
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            let imgW = 1344;
            let imgH = 640;
            let imgRate = imgW / imgH;
            let currRate = this.width / this.height;
            if (currRate > imgRate) {
                let scale = currRate / imgRate;
                this.imgSky.scaleX = this.imgSky.scaleY =
                    this.imgCloud.scaleX = this.imgCloud.scaleY =
                    this.imgCity.scaleX = this.imgCity.scaleY =
                    this.imgMountain.scaleX = this.imgMountain.scaleY =
                    this.imgRole.scaleX = this.imgRole.scaleY =
                    scale;
            }

        }

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

        protected onAddedToStage() {
            console.log("AppConfig.Channel: ", AppConfig.Channel);
            console.log("AppConfig.GameLogoImageKey: ", AppConfig.GameLogoImageKey);
            if (window['AoneSDKPlatform'] && (platform instanceof window['AoneSDKPlatform'])) {
                if (AppConfig.Channel == "aone_android_lrsjh5") { // 猎人世界
                    this.logo.source = cachekey("ui_login_Android_lrsjh5_Logo_png", this);
                } else if (AppConfig.Channel == "aone_android_lrsj2h5") { // 猎人世界
                    this.logo.source = cachekey("ui_login_Android_lrsjh5_Logo_png", this);
                } else if (AppConfig.Channel == "aone_android_lrsj0911h5") { // 猎人世界
                    this.logo.source = cachekey("ui_login_Android_lrsjh5_Logo_png", this);
                } else if (AppConfig.Channel == "aone_android_slsdh5") { // 狩猎时代
                    this.logo.source = cachekey("ui_login_Android_slsdh5_Logo_png", this);
                } else if (AppConfig.Channel == "aone_android_slsd0911h5") { // 狩猎时代
                    this.logo.source = cachekey("ui_login_Android_slsdh5_Logo_png", this);
                } else if (AppConfig.Channel == "aone_ios_jianliushi") { // ios提审 暗杀法则
                    this.logo.source = cachekey("ui_login_IOS_anshafaze_Logo_png", this);
                } else if (AppConfig.Channel == "aone_ios_jianliusan") { // ios提审 魔王召唤
                    this.logo.source = cachekey("ui_login_Mowangzhaohuan_png", this);
                } else if (AppConfig.Channel == "aone_ios_jianliuliu") { // ios提审 猎人学院
                    this.logo.source = cachekey("ui_login_Lierenxueyuan_png", this);
                } else if (AppConfig.Channel == "aone_ios_jianliuqi") { // ios提审 狩猎时代
                    this.logo.source = cachekey("ui_login_shoulieshidai_png", this);
                } else {
                    this.logo.source = cachekey(AppConfig.GameLogoImageKey, this);
                }
            } else {
                this.logo.source = cachekey(AppConfig.GameLogoImageKey, this);
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

            Game.SoundManager.playMusic("login_mp3", 0);

            this.preLoadResources(); // 预加载的部分

            this.initAni();

            TestAppConfig.checkTest();
        }

        private initAni() {
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
        }

        private initClouds() {
            let idx = 0;
            while (this["imgCloud" + idx]) {
                let body = this["imgCloud" + idx];
                this.initFt(body, Number(body.name));
                ++idx;
            }
        }
        private initSun(img: eui.Image) {// 阳光
            if (this.isAniRun) {
                this.imgSun1.alpha = 0;
                egret.Tween.get(img)
                    .to({ alpha: 1 }, 2000)
                    .wait(2000)
                    .to({ alpha: 0.2 }, 2000)
                    .call(() => {
                        egret.Tween.removeTweens(img);
                        this.initSun(img);
                    });
            }
        }
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
        private initFt(img: eui.Image, sp: number) {// 飞艇
            if (this.isAniRun) {
                let tw = egret.Tween.get(img);
                if (sp > 0) {
                    let max = this.back_img.width;
                    let dis = max - img.x;
                    tw.to({ x: max }, sp * dis)
                        .call(() => {
                            egret.Tween.removeTweens(img);
                            img.x = -60;
                            this.initFt(img, sp);
                        });
                } else {
                    let dis = img.x + 60;
                    tw.to({ x: -60 }, -sp * dis)
                        .call(() => {
                            egret.Tween.removeTweens(img);
                            img.x = this.back_img.width;
                            this.initFt(img, sp);
                        });
                }
            }
        }
        private initDove() {// 鸽子
            let ani = Game.AnimationManager.create("login_ani_dove");
            ani.x = 896;
            ani.y = Number(this.groupDove.name);
            this.groupDove.addChild(ani);
            ani.onPlay();
            this.aniDove = ani;
            this.initDoveTween(ani, 76);
        }
        private initDoveTween(ani: AnimationBody, sp: number) {
            if (this.isAniRun) {
                let disp = ani.x + 100;
                egret.Tween.get(ani)
                    .to({ x: -100 }, sp * disp)
                    .call(() => {
                        egret.Tween.removeTweens(ani);
                        ani.x = this.back_img.width;
                        this.initDoveTween(ani, sp);
                    });
            }
        }
        private initWave() {// 波浪
            let ani = Game.AnimationManager.create("login_ani_wave");
            this.groupWave.addChild(ani);
            ani.onPlay();
            this.aniWave = ani;
        }

        private petalList: ParticleBody[];
        private groupPetal: eui.Group;
        private initPetal() {// 花瓣
            if (this.isAniRun) {
                if (!this.petalList) {
                    this.petalList = [];
                }
                let idx = this.getIdx();//Math.floor(Util.randomValue(1, 7));
                let top = 100;
                let bottom = 540;
                let dis = (bottom - top) / 6;
                let x = 1200;
                let body = Game.ParticleManager.create("ui_login_new_petal" + idx + "_png", x, x, top + idx * dis, top + (idx + 1) * dis,
                    Util.randomValue(240, 280) + (idx - 1) * 60, Util.randomValue(-10, 10) / 10, 140, 176, (x: number, y: number) => {
                        return x < -50 || y > 690;
                    })
                this.groupPetal.addChild(body);
                this.petalList.push(body);

                egret.setTimeout(this.initPetal, this, 400, 1000);
            }
        }
        private getIdx() {
            let ran = Util.randomValue(0, 160);
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
        }
        private timerNum = 0;
        private Ticktimer: number = 0;
        private enterFrame() {
            this.timerNum = (egret.getTimer() - this.Ticktimer) / 1000;
            if (this.timerNum > 0.033) {
                this.timerNum = 0.033;
            }
            this.Update(this.timerNum);
            this.Ticktimer = egret.getTimer();
        }
        private Update(dt) {
            for (let i = this.petalList.length - 1; i >= 0; --i) {
                this.petalList[i].update(dt);
                if (this.petalList[i].isFinish) {
                    this.petalList[i].onRelease();
                    this.petalList.splice(i, 1);
                }
            }
            return false;
        }

        protected onRemoveFromStage() {
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
            Game.SoundManager.stopMusic();
        }

        // 场景离开栈顶
        // 1. 从舞台移除
        // 2. 压入新场景
        public onLeaveTopScene() {
            this.isAniRun = false;
            Game.SoundManager.stopMusic();
        }

        // 需要预加载的资源
        // 预加载的资源不释放
        private preLoadResources() {
            if (Device.isReviewSwitch) {
                cachekey("ui_mainui_BgMaoboli_png", this);
            }

            // 登录选择角色UI需要的头像资源
            if (RES.hasRes("hero_icon1_json")) RES.getResAsync("hero_icon1_json");
            if (RES.hasRes("hero_icon2_json")) RES.getResAsync("hero_icon2_json");

            // 断线重连
            cachekey("ui_common_BoardServerPopTip_png", this);
            cachekey("ui_common_ButtonServerAgainLinkNor_png", this);
            cachekey("ui_common_ButtonServerAgainLinkSel_png", this);
            cachekey("ui_common_ButtonServerReturnEnterNor_png", this);
            cachekey("ui_common_ButtonServerReturnEnterSel_png", this);

            // 连环画的两张图
            cachekey("ui_cartoon_Cartoon1_jpg", this);
            cachekey("ui_cartoon_Cartoon2_jpg", this);
            Game.SoundManager.preloadSound("demon_mp3");

            cachekey("ui_login_boardloading_kulapika_jpg", this);
            cachekey("ui_login_boardloading_kuluoluo_jpg", this);
            cachekey("ui_login_boardloading_niteluo_jpg", this);
            cachekey("ui_login_boardloading_qiya_jpg", this);
            cachekey("ui_login_boardloading_wang_jpg", this);
            cachekey("ui_login_boardloading_xiaodi_jpg", this);
            cachekey("ui_login_boardloading_xiaojie_jpg", this);
            cachekey("ui_login_boardloading_xisuo_jpg", this);
            cachekey("ui_login_boardloading_yiermi_jpg", this);

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
            Game.SoundManager.preloadSound("city_mp3");
            Game.SoundManager.preloadSound("ui_lingqu_wupin_mp3");

            cachekey("jg_zhaomu_tex_png", this);
            cachekey("jg_zhaomu_large_tex_png", this);
            Game.DragonBonesManager.preloadDragonbone(this, "ui_tongyong_xinshou");
        }

        private move_spark() {
            if (!this.stage) return;
            this.img_spark.x = -1 * this.img_spark.width;
            egret.Tween.get(this.img_spark)
                .to({ x: this.btnEntryGame.width }, 2000)
                .call(() => {
                    egret.Tween.removeTweens(this.img_spark)
                    if (this.parent)
                        this.move_spark();
                });
        }

        private do_login() {
            // 开始验证账号
            platform.login((user_id: number, user_account: string, token: string) => {
                this.user_id = user_id;
                this.user_account = user_account;
                this.token = token;
                this.select_role = null;
                this.select_group = null;

                DevicePointTracker.track(60); //STEP_SDK_LOGIN = 60; // SDK登录成功

                // 登录入口服务并查询分组列表
                this.doLoginEntryServer();
            }, (retcode: number) => {
                //toast_warning(LANG("账号验证失败:") + Game.ConfigManager.getAone2CodeReason(retcode));
                this.btnAuthAccount.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_native_login_ui, this);
            }, this);
            DevicePointTracker.track(50); //STEP_SDK_CALL = 50; // SDK界面弹出
        }

        private show_native_login_ui() {
            this.btnAuthAccount.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.show_native_login_ui, this);
            this.do_login();
        }

        private onBtnAccountManager() {
            this.do_login();
        }

        private onBtnNotice() {
            loadUI(LoginNoticeDialog)
                .then((dialog: LoginNoticeDialog) => {
                    dialog.open(this.getNotice(this.notice));
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnEntryGame() {
            if (this.select_group == null) {
                //toast_warning("未获取到分区列表");
                this.do_login();
                return;
            }

            this.doCheckVersion();
        }

        private onBtnGroupSelectServer() {
            if (this.select_group) {
                loadUI(SelectGameGroupDialog)
                    .then((dialog: SelectGameGroupDialog) => {
                        dialog.open(this.groups, this.roles, this.select_group, this.onSelectedGroup, this);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private onSelectedGroup(select_group: message.GameGroupInfo) {
            this.select_group = select_group;
            this.select_role = null;
            for (let i = 0; i < this.roles.length; i++) {
                if (this.roles[i].owner_groupid == this.select_group.group_id) {
                    this.select_role = this.roles[i];
                    break;
                }
            }

            // 选择分区事件
            Game.EventManager.event(GameEvent.TRACK_SELECT_GROUP, null);

            Controller.setGlobalStorageItem("last_group_id", this.select_group.group_id.toString());
            this.lbGroupName.text = this.getGroupName(this.select_group);
        }

        // 检测版本
        private doCheckVersion() {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onCheckVersionResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(AppConfig.EntryUrlRoot + "/entry/check_version.do", egret.HttpMethod.POST);
            let checkversion_request = new message.CheckVersionReqBody();
            checkversion_request.device_info = Util.getDeviceInfo();
            checkversion_request.version_info = Util.getAppVersionInfo();
            checkversion_request.auth_key = Util.AuthKey(checkversion_request.device_info.device_id, "");
            request.send(JSON.stringify(checkversion_request));
            console.log("checkversion request: " + JSON.stringify(checkversion_request));
            Game.UIManager.openWaitingUI();
        }

        private onCheckVersionResponse(event: egret.Event): void {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("checkversion response: " + request.response);
            Game.UIManager.closeWaitingUI();

            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast(LANG("检查版本失败:") + json.retcode);
                this.do_login();
                return;
            }

            let response = <message.CheckVersionRespBody>json.body;
            this.notice = response.notice;

            let version = parseInt(response.update_url);
            if (!version) version = 0;
            if (!Game.Controller.checkVersionScheme(version)) {
                console.log("版本检测拦截，需要重启客户端");
                return;
            }

            if (!Device.isReviewSwitch) {
                if (this.token.length == 0) {
                    // 公告
                    loadUI(LoginNoticeDialog)
                        .then((dialog: LoginNoticeDialog) => {
                            dialog.show(UI.SHOW_FILL_OUT);
                            dialog.open(this.getNotice(this.notice), () => {
                                this.do_login();
                            }, this);
                            DevicePointTracker.track(70); //STEP_NOTICE_TIPS = 70; // 公告界面
                        });
                } else {
                    if (this.select_role == null) {
                        this.doCreateRole();
                    } else {
                        this.doEntryGameServer();
                    }
                }
            } else {
                this.do_login();
            }
        }

        // 登录入口服并获取分区列表
        private doLoginEntryServer() {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onUserLoginResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(AppConfig.EntryUrlRoot + "/entry/user_login.do", egret.HttpMethod.POST);
            let userlogin_request = new message.UserLoginReqBody();
            userlogin_request.device_info = Util.getDeviceInfo();
            userlogin_request.version_info = Util.getAppVersionInfo();
            userlogin_request.auth_key = Util.AuthKey(userlogin_request.device_info.device_id, "");
            userlogin_request.user_id = this.user_id;
            userlogin_request.token = this.token;
            request.send(JSON.stringify(userlogin_request));
            console.log("userlogin request: " + JSON.stringify(userlogin_request));
            Game.UIManager.openWaitingUI();
        }

        private onUserLoginResponse(event: egret.Event): void {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("userlogin response: " + request.response);
            Game.UIManager.closeWaitingUI();

            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast(LANG("用户登录失败:") + json.retcode);
                return;
            }

            let response = <message.UserLoginRespBody>json.body;

            // 构造分区列表
            if (response.groups.length == 0) {
                toast("服务器维护中...");
                return;
            }

            this.groups = response.groups;
            this.roles = response.roles;
            this.user_token = response.user_token;

            if (this.roles.length <= 0) {
                // 还没有创建过角色
                this.select_group = this.groups[this.groups.length - 1];
                for (let i = 0; i < this.groups.length; i++) {
                    if (this.groups[i].is_recommend) {
                        this.select_group = this.groups[i];
                        break;
                    }
                }
            } else {
                // 查找上次登录的分区
                let last_group_id = 0;
                let str = Controller.getGlobalStorageItem("last_group_id");
                if (!(str == null || str == undefined || str.length <= 0 || isNaN(parseInt(str)))) last_group_id = parseInt(str);
                for (let i = 0; i < this.groups.length; i++) {
                    if (last_group_id == this.groups[i].group_id) {
                        this.select_group = this.groups[i];
                        for (let j = 0; j < this.roles.length; j++) {
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
                    for (let i = 0; i < this.groups.length; i++) {
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
                for (let i = 0; i < this.roles.length; i++) {
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
        }

        private doCreateRole() {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onCreateRoleResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(AppConfig.EntryUrlRoot + "/entry/create_role.do", egret.HttpMethod.POST);
            let createrole_request = new message.CreateRoleReqBody();
            createrole_request.device_info = Util.getDeviceInfo();
            createrole_request.version_info = Util.getAppVersionInfo();
            createrole_request.auth_key = Util.AuthKey(createrole_request.device_info.device_id, "");
            createrole_request.user_id = this.user_id;
            createrole_request.user_account = this.user_account;
            createrole_request.group_id = this.select_group.group_id;
            createrole_request.user_token = this.user_token;
            createrole_request.role_type = 0;
            createrole_request.role_name = "角色" + new md5().hex_md5(`${this.user_id}_${this.select_group.group_id}_${Math.random()}`).substr(0, 5);
            request.send(JSON.stringify(createrole_request));
            //console.log("createrole request: " + JSON.stringify(createrole_request));
            Game.UIManager.openWaitingUI();
        }

        private onCreateRoleResponse(event: egret.Event): void {
            let request = <egret.HttpRequest>event.currentTarget;
            //console.log("createrole response: " + request.response);
            Game.UIManager.closeWaitingUI();

            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast(LANG("创建角色失败:") + json.retcode);
                this.do_login();
                return;
            }

            let response = <message.CreateRoleRespBody>json.body;
            this.select_role = response.role;
            this.is_new_role = true;

            EventTracker.track('创建角色', {
                "user_id": response.role.user_id.toString(),
                "role_id": response.role.role_id.toString(),
                "role_name": response.role.role_name,
                "group_id": this.select_group.group_id.toString()
            });
            DevicePointTracker.track(90); //STEP_CREATE_ROLE_FINISH = 90;	// 创建成功
            ReyunTracker.track("Createrole"); // 热云

            // 创建完角色自动登录
            this.doEntryGameServer();
        }

        // 开始登录游戏服
        private doEntryGameServer() {
            if (this.select_group == null || this.select_group.server_ip == "" || this.select_group.server_port == 0) {
                toast(LANG("该区已暂停服务，请选择其他分区"));
                return;
            }
            if (this.select_group.status == 4) {
                toast(LANG("服务人数已满，请选择其他分区"));
                return;
            } else if (this.select_group.status == 3) {
                // 忙状态
            } else if (this.select_group.status == 2) {
                // 正常状态
            } else {
                toast(LANG("该区已暂停服务，请选择其他分区"));
                return;
            }

            // 进入游戏主城事件
            Game.EventManager.event(GameEvent.TRACK_ENTRY_GAME, { group: this.select_group, role: this.select_role });

            loadUI(LoadingScene).then((scene) => {
                Game.UIManager.pushScene(scene);
                this.doLogin();
            });
        }

        private doLogin() {
            this.onStartTimeOut();
            this.checkEntryGameServer();
        }

        private step: number = 0;
        private timeOutId: number = -1;
        private onStartTimeOut() {
            let self = this;
            this.timeOutId = egret.setTimeout(() => {
                if(self.step == 0){
                    Main.renetDialog.show(() => {
                        Game.ConfigManager.loadConfigs();
                        self.doLogin();
                    });
                }
            }, this, 20000);
        }

        private checkEntryGameServer() {
            switch (this.step) {
                case 0:// 判断剩余配置文件是否加载完毕
                    if (!Game.ConfigManager.isLoadOK()) {
                        egret.setTimeout(this.checkEntryGameServer, this, 100);
                        return;
                    }
                    break;
                case 1:// 判断剩余配置文件是否解压解析完毕
                    if (!Game.ConfigManager.isConfigureOK()) {
                        Game.ConfigManager.TryConfigure(this.checkEntryGameServer, this);
                        return;
                    }
                    break;
                case 2:
                    if (!Game.IsInitOK()) {
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
        }
        private checkCloseTimeout() {
            if (this.timeOutId != -1) {
                egret.clearTimeout(this.timeOutId);
                Main.renetDialog.close();
                this.timeOutId = -1;
            }
        }

        private enterGame() {
            Game.Controller.login(this.select_group.server_ip, this.select_group.server_port, this.select_role, this.user_token, this.select_group, this.is_new_role);
            DevicePointTracker.track(100); //STEP_ENTRY_GAME = 100; // 进入游戏
            ReyunTracker.track("login"); // 热云 进入游戏
        }

        private onGetIOError(event: egret.IOErrorEvent): void {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            toast(LANG("网络错误，重试..."));
            Game.UIManager.closeWaitingUI();
            this.do_login();
        }

        // 取出分区名
        private getGroupName(groupinfo: message.GameGroupInfo): string {
            if (groupinfo == null) return LANG("未知分区");
            let json = JSON.parse(groupinfo.group_name);
            if (typeof json != "object") return this.parseGroupName(groupinfo.group_name);
            if (Game.LanguageManager.getLang() in json) return this.parseGroupName(json[Game.LanguageManager.getLang()]);
            if ('zhcn' in json) return this.parseGroupName(json['zhcn']);
            if ('en' in json) return this.parseGroupName(json['en']);
            for (let k in json) {
                return this.parseGroupName(json[k]);
            }
            return LANG("未知分区");
        }

        // 解析分区名
        private parseGroupName(groupName: string): string {
            let names = groupName.split("&");
            if (names.length <= 1) return Util.cutString(groupName, 16);
            return Util.cutString(`${names[0]}区 ${names[1]}`, 16);
        }

        // 取出公告
        private getNotice(notice: string): string {
            let json = JSON.parse(notice);
            if (typeof json != "object") return "";
            if (Game.LanguageManager.getLang() in json) return json[Game.LanguageManager.getLang()];
            if ('zhcn' in json) return json['zhcn'];
            if ('en' in json) return json['en'];
            for (let k in json) {
                return json[k];
            }
            return "";
        }

        public openLoginMask() {
            this.rectMask.visible = true;
        }
    }

}