namespace zj {
    // 改版主城界面
    // 翟伟利
    // 2019.11.7

    export class MainCitySceneNew extends UI {
        private ownerScene: MainCityUI;
        private topShadow: eui.Group;
        private btnAdventrue: eui.Button; // 冒险
        private imgTipRand: eui.Image;//冒险红点
        private groupAdventure: eui.Group; // 冒险上层动画层
        private imgSearchEnd: eui.Image;
        private groupSearchEnd: eui.Group;
        private groupRedBR: eui.Group;
        private btnBag: eui.Button; // 背包
        private imgTip31: eui.Image; //背包红点
        private btnHunter: eui.Button; // 猎人
        private imgTip27: eui.Image; // 猎人红点
        private btnCard: eui.Button; // 卡片
        private imgTip47: eui.Image; // 卡片红点
        private groupLeftBtn: eui.Group;// 左侧按钮group
        private btnTask: eui.Button; // 日常
        private imgTip22: eui.Image; // 日常红点
        private btnLisence: eui.Button; // 执照
        private imgTip49: eui.Image;//执照红点
        private btnFriend: eui.Button; // 交友
        private imgTip2_9: eui.Image; //社交红点
        private btnGift: eui.Button; // 商城
        private imgTip50: eui.Image; // 商城红点
        private btnMoon: eui.Button; // 福利
        private imgTip52: eui.Image; // 福利红点
        private btnActivity: eui.Button; // 活动
        private imgTip25: eui.Image; // 活动红点
        private btnHelp: eui.Button; // 帮助
        private btnForum: eui.Button; // 社区
        private btnMail: eui.Button; // 邮件
        private imgTip33: eui.Image;//邮件上的红点
        private btnChat: eui.Button; // 聊天
        private scrollBar: eui.Scroller//聊天
        private btnPet: eui.Button; // 念兽
        private imgTip28: eui.Image;//念兽红点
        // private btnLine: eui.Button; // 主线
        private groupMatch: eui.Group; // 公会战
        private groupTimeMatch: eui.Group;
        private lbTimeMatch: eui.Label;
        private btnMatch: eui.Button;
        private groupZorkBoss: eui.Group;//世界BOSS
        private labelZorkBossTime: eui.Label;// 世界BOSS倒计时
        private groupLayerActivityBoss: eui.Group;//年兽BOSS
        private btnZorkBoss: eui.Button;
        private groupRedpackage: eui.Group; // 抢红包
        private btnRedpackage: eui.Button; // 抢红包
        // private btnActivityBoss: eui.Group;
        private btnNovice: eui.Button; // VIP礼包
        private imgTip60: eui.Image; // VIP礼包红点
        private btnBiography: eui.Button; // 猎人传记
        private imgTip58: eui.Image; //猎人传记红点
        private btnRecharge: eui.Button; // 首充
        private imgTip35: eui.Image; // 首充红点
        private btnNovice1: eui.Button; // 新手狂欢
        private imgTip61: eui.Image; // 新手狂欢红点
        private imgTip37: eui.Image; // 新手狂欢红点
        private btnMoney: eui.Button; // 赏金特训
        private imgTip66: eui.Image; // 赏金特训红点
        private btnRandom: eui.Button; // 扭蛋机
        private btnJewel: eui.Button; //宝石收藏
        private imgTip56: eui.Image; //宝石收藏红点
        private btnXuyuan: eui.Button;//许愿屋
        private imgTip59: eui.Image; // 许愿屋红点
        private buttonRace: eui.Button;//时间竞速
        private imgTip54: eui.Image;//时间竞速红点
        private btnVip: eui.Button; // 星耀福利
        private imgTip55: eui.Image; // 星耀福利红点
        private imgBoardGift: eui.Image;
        private lstGift: eui.List;
        // private imgCardBg: eui.Image;
        private imgTip51: eui.Image;  //娃娃机红点
        // private imgDone: eui.Image;   // 贪婪之岛可收杆
        private btnVIPLogin: eui.Button; //登录送VIP
        private btnStoryInstance: eui.Button; // 猎人故事
        private groupOnlineGetAward: eui.Group; // 在线时长活动
        private imgOnlineIcon: eui.Image;
        private labelOnlineNum: eui.BitmapLabel;
        private labelOnlineCountTime: eui.Label;
        private imgOnlineRedTip: eui.Image;
        private groupFunOpenTip: eui.Group; // 功能开启领奖
        private btnFuncOpen: eui.Button;
        // private imgFunOpenIcon: eui.Image;
        private imgFunOpenRedTip: eui.Image;
        private labelOpenLevel: eui.BitmapLabel;
        private labelOpenLevel1: eui.BitmapLabel;

        private groupLeft2: eui.Group;

        private groupLineChange: eui.Group;
        private labelLine: eui.Label;

        private groupMall: eui.Group;
        private groupXinChang: eui.Group;
        private btnXinChang: eui.Group;
        private labelTimeXinChang: eui.Label;

        private groupMysteryShop: eui.Group;
        private btnMysteryShop: eui.Button;
        private imgTipMysteryShop: eui.Image;
        private groupTimeMysteryShop: eui.Group;
        private labelTimeMysteryShop: eui.Label;
        // 滑动屏上的按钮
        // private btnDarkContinent: eui.Button; // 黑暗大陆
        // private btnGreedyIsland: eui.Button; // 贪婪之岛
        // private btnHunterCambatfield: eui.Button; // 格斗场
        // private btnMeteorStreet: eui.Button; // 流星街
        // private btnPub: eui.Button; // 酒馆
        // private btnShopingMall: eui.Button; // 商店
        // private btnSkyArena: eui.Button; // 天空竞技场
        // private btnUnion: eui.Button; // 公会
        private btnAttention: eui.Button; // 兑换码 微信
        private btnCollection: eui.Button;// 收藏有礼

        // private imgFlagDarkContinent: eui.Image; // 黑暗大陆标记
        // private imgFlagGreedyIsland: eui.Image; // 贪婪之岛标记
        // private imgFlagHunterCambatfield: eui.Image; // 格斗场标记
        // private imgFlagMeteorStreet: eui.Image; // 流星街标记
        // private imgFlagPub: eui.Image; // 酒馆标记
        // private imgFlagShopingMall: eui.Image; // 商店标记
        // private imgFlagSkyArena: eui.Image; // 天空竞技场标记
        // private imgFlagUnion: eui.Image; // 公会标记

        // private groupShadeDarkContinent: eui.Group; // 黑暗大陆遮罩
        // private groupShadeGreedyIsland: eui.Group; // 贪婪之岛遮罩
        // private groupShadeHunterCambatfield: eui.Group; // 格斗场遮罩
        // private groupShadeMeteorStreet: eui.Group; // 流星街遮罩
        // private groupShadePub: eui.Group; // 酒馆遮罩
        // private groupShadeShopingMall: eui.Group; // 商店遮罩
        // private groupShadeSkyArena: eui.Group; // 天空竞技场遮罩
        // private groupShadeUnion: eui.Group; // 公会遮罩

        private groupClear: eui.Group;// 不用的活动按钮容器，需要隐藏
        private groupTop: eui.Group;// 上端礼包
        private groupTop1: eui.Group;// 上端礼包
        private groupRecharge: eui.Group; //首冲动画
        private groupjueban: eui.Group; // 绝版动画
        private groupRandom: eui.Group; // 扭蛋机动画
        private groupMoon: eui.Group; // 福利动画
        private NodeNovice1: eui.Group; // 新手狂欢动画
        private nodeXuyuan: eui.Group;//许愿屋动画

        private groupNovice: eui.Group; // vip礼包
        private groupSeven: eui.Group;// 7日奖
        private btnSeven: eui.Button;
        private imgTipSeven: eui.Image;
        // private groupBiography: eui.Group; // 猎人传记
        private groupTimeBiography: eui.Group;//猎人传记时间
        private groupFirst: eui.Group; // 首冲
        private groupTimeFirst: eui.Group; //首冲时间
        private groupNovice1: eui.Group; // 新手狂欢
        private groupMoney: eui.Group; // 赏金特训
        private groupWawaji: eui.Group; //娃娃机（visible
        private groupJewel: eui.Group; // 宝石收藏
        private groupXuyuan: eui.Group;//许愿屋
        private groupRace: eui.Group;//时间竞速
        private groupVip: eui.Group; // 星耀福利
        private messageHistoryChat: eui.Group;// 聊天历史记录
        private offsideGrop: eui.Group;// 右侧活动
        private groupStoryInstance: eui.Group; // 猎人故事
        private groupAttention: eui.Group; // 兑换码 微信
        private groupCollection: eui.Group; // 收藏有礼
        private groupVIPLogin: eui.Group; // 登录送VIP
        private groupCollectionOfTips: eui.Group;//收藏有礼引导
        private groupCollectionOfTips1: eui.Group;//苹果微信竖版
        private groupCollectionOfTips2: eui.Group;//微信小游戏
        private groupCollectionOfTips3: eui.Group;//苹果浏览器横着
        private groupCollectionOfTips4: eui.Group;//苹果微信横着
        private groupCollectionOfTips5: eui.Group;//苹果浏览器竖着

        // 滑动屏上的功能方块
        // private rectPub: eui.Rect; // 酒馆
        // private rectShopingMall: eui.Rect; // 商店
        // private rectHunterCambatfield: eui.Rect; // 格斗场
        // private rectMeteorStreet: eui.Rect; // 流星街
        // private rectUnion: eui.Rect; // 公会
        // private rectGreedyIsland: eui.Rect; // 贪婪之岛
        // private rectSkyArena: eui.Rect; // 天空竞技场
        // private rectDarkContinent: eui.Rect; // 黑暗大陆

        private groupActLeft: eui.Group;
        private groupActRight: eui.Group;

        private activityGroup: eui.Group;// 活动
        private activityGroup1: eui.Group;// 活动

        private groupBattlePass: eui.Group;
        private btnBattlePass: eui.Button;
        private imgTip68: eui.Image;

        private groupRank: eui.Group;
        private btnRank: eui.Button;
        private groupWorkSend: eui.Group;

        private groupDailyCharge: eui.Group;
        private btnDailyCharge: eui.Button;
        private imgTipDailyCharge: eui.Image;

        // private tavernGroup: eui.Group;// 酒馆
        // private shopGroup: eui.Group;// 商店
        // private battlegroundGroup: eui.Group;// 格斗场
        // private groupDarkContinent: eui.Group; // 黑暗大陆
        // private groupUnion: eui.Group; // 公会

        // private MeteorGroup: eui.Group;// 流星街
        // private climbing: eui.Group;// 天空竞技场

        private groupTR: eui.Group;// 金币栏group
        private gold: eui.Image;// 金币
        private jewel: eui.Image;// 钻石
        private energy: eui.Image;// 能量

        private lbRoleName: eui.Label; // 角色名
        private lbRoleLevel: eui.Label; // 角色等级
        private imgHeadFrame: eui.Image; // 头像框
        private imgRoleHead: eui.Image; // 角色头像
        private imgExp: eui.ProgressBar; // 经验EXP进度
        private imgLicenseBackround: eui.Image; // 执照背景
        private imgLicense: eui.Image; // 执照
        private lbGold: eui.Label; // 金币数
        private lbGemstone: eui.Label; // 钻石数
        private lbStrength: eui.Label; // 体力
        private btnAddGold: eui.Button; // 加金币按钮
        private btnAddGemstone: eui.Button; // 加钻石按钮
        private btnAddStrength: eui.Button; // 加体力按钮
        private imgFlagGold: eui.Image; // 金币标记
        private imgFlagGemstone: eui.Image; // 钻石标记
        private imgFlagStrength: eui.Image; // 体力标记
        private labelTimeFirst: eui.Label; //首冲结束时间
        private labelTimeBiography: eui.Label;//猎人传记结束时间
        private btnDebug: eui.Button; // 调试按钮

        private banner: MainCityBanner;

        private bubble: Bubble;
        private walkControl: MainCityWalk;

        private groupbtnAddGold: eui.Group;
        private groupbtnAddGemstone: eui.Group;
        private groupbtnAddStrength: eui.Group;

        public touchTitles: MainCityTouchTitle[];

        private ChatItem = new HXH_ChatItem();// 添加历史聊天记录
        private simpleChat: eui.List;
        public chatInfosMini = Game.PlayerChatDataSystem.chatInfos;
        private listBottomData: eui.ArrayCollection = new eui.ArrayCollection();  // 聊天数据
        private ReCheckRaceTips: boolean = false;
        private VIPvisible: boolean = true;

        private update: number;//计时器id

        public constructor() {
            super();

            this.skinName = "resource/skins/main/MainCitySceneNewSkin.exml";
            // this.isBackBG = false;

            // 面板上的按钮
            this.imgRoleHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRoleHead, this);
            this.btnAdventrue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdventrue, this);
            this.imgSearchEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdventrue, this);
            this.btnBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBag, this);
            this.btnHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHunter, this);
            this.btnCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCard, this);
            this.btnTask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTask, this);
            this.btnLisence.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLisence, this);
            this.btnFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFriend, this);
            this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGift, this);
            this.btnMoon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMoon, this);
            this.btnActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnActivity, this);
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHelp, this);
            this.btnForum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnForum, this);
            this.btnMail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMail, this);
            this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChat, this);
            this.btnPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPet, this);
            this.groupbtnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.groupbtnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.groupbtnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);
            this.btnDebug.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDebug, this);
            // this.btnLine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLine, this);
            this.btnMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMatch, this);
            this.btnZorkBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnZorkBoss, this);
            this.groupLayerActivityBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnActivityBoss, this);
            this.btnRandom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRandom, this);
            this.groupXuyuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnXuyuan, this);
            this.btnJewel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnJewel, this);
            this.buttonRace.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonRace, this);
            this.btnVip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnVip, this);
            this.btnStoryInstance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStoryInstance, this);
            this.btnAttention.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAttention, this);
            this.btnCollection.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCollection, this);
            this.btnNovice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNovice, this);
            this.btnBiography.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBiography, this);
            this.btnRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRecharge, this);
            this.btnNovice1.addEventListener(egret.TouchEvent.TOUCH_TAP, MainCitySceneNew.onBtnNovice1, this);
            this.btnSeven.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSevenGift, this);
            this.btnXinChang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnXinChang, this);
            this.btnMysteryShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMysteryShop, this);
            // this.btnNovice2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNovice2, this);
            // this.btnNovice3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNovice3, this);
            // this.btnNovice4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNovice4, this);
            this.btnMoney.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMoney, this);
            this.btnVIPLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnVIPLogin, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => { this.groupCollectionOfTips.visible = false }, this)
            this.groupOnlineGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOnlineGetAward, this);
            this.btnFuncOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFunOpenGetAward, this);
            this.btnBattlePass.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBattlePass, this);
            this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRank, this);
            this.groupWorkSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnWorkSend, this);
            this.btnDailyCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDailyCharge, this);
            this.groupLineChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLineChange, this);
            this.btnRedpackage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRedpackage, this);

            // 滑动屏上的按钮
            // this.btnDarkContinent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDarkContinent, this); // 黑暗大陆
            // this.btnGreedyIsland.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGreedyIsland, this); // 贪婪之岛
            // this.btnHunterCambatfield.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHunterCambatfield, this); // 格斗场
            // this.btnMeteorStreet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMeteorStreet, this); // 流星街
            // this.btnPub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPub, this); // 酒馆
            // this.btnShopingMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShopingMall, this); // 商店
            // this.btnSkyArena.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkyArena, this); // 天空竞技场
            // this.btnUnion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnion, this); // 公会
            this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChat, this); // 聊天历史记录  

            // 其他事件
            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnd, this);

            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);

            Game.EventManager.on(GameEvent.SERVER_LINE_CHANGE, this.updateServerLine, this);
            Game.EventManager.on(GameEvent.PLAYER_LEVEL_UP, this.updateUIStates, this);
            Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
            Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
            Game.EventManager.on(GameEvent.MAIN_CITY_UPDATE, this.updateUIStates, this);
            Game.EventManager.on(GameEvent.CLOSE_DAILYFIRSTCHARGE, this.updateUIStates, this);
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.updateTeach, this);
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.updateLoginTime, this);
            Game.EventManager.on(GameEvent.REFRESH_MAINCITY_BUBBLE, this.refreshBubble, this);
            Game.EventManager.on(GameEvent.CHAT_RESTART, this.InitChatList, this);
            Game.EventManager.on(GameEvent.GET_LEVELUP_REWARD, this.funOpenTip, this);
        }
        public init() {
            this.groupClear.visible = false;
            this.addBubble(); // 添加主线任务提示气泡

            // 方向键初始化
            this.walkControl.init(this);

            if (Main.isCurrencysMove()) {
                this.groupTR.right = 100;
            }

            if (Device.isReviewSwitch) {
                if (Util.isWxMiniGame()) {

                } else {
                    this.gold.width = 40;
                    this.gold.height = 40;
                    this.jewel.width = 40;
                    this.jewel.height = 40;
                    this.energy.width = 40;
                    this.energy.height = 40;

                    this.btnAddGemstone.y = 7;
                    this.btnAddGemstone.width = 30;
                    this.btnAddGemstone.height = 30;
                    this.btnAddStrength.width = 30;
                    this.btnAddStrength.height = 30;
                }
            }

            this.setInfoTips();

            this.update = -1;
            this.runAni();

            // egret.setTimeout(this.onClose, this, 10000);
            // this.imgDone.visible = false;
            Game.EventManager.on(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.updateChatList, this);
            return;
        }

        private updateChatList() {
            egret.setTimeout(() => {
                this.InitChatList();
            }, this, 150);
        }

        public onWalkStart() {
            this.ownerScene.onWalkStart();
        }

        public onWalkEnd() {
            this.ownerScene.onWalkEnd();
        }

        public isTouchWalk(): boolean {
            return this.walkControl.isTouch();
        }

        public getWalkArc(): number {
            return this.walkControl.currArc();
        }

        public isMapLock(): boolean {
            return this.ownerScene.sceneMap.isLockMap();
        }

        private addBubble() {
            if (!Device.isReviewSwitch) {
                this.bubble.SetMainMissionAfterLogin();
            } else {
                this.bubble.visible = false;
            }
        }

        // public onClose() {
        //     this.listBottomData.removeAll();
        //     this.messageHistoryChat.visible = false;
        // }

        private addAnimations() {
            // TODO 按钮动画
            // if (Device.isReviewSwitch) {
            //     if (Util.isWxMiniGame()) {
            //         //福利
            //         Game.DragonBonesManager.playAnimation(this, "icon_fuli", "armatureName", "000_fuli", 0)
            //             .then((display: dragonBones.EgretArmatureDisplay) => {
            //                 display.x = this.groupMoon.x + display.width / 2 - 10;
            //                 display.y = this.groupMoon.y + display.height / 2 - 13;
            //                 this.groupMoon.addChild(display);
            //             });
            //     }
            //     //  else {
            //     //     this.tavernGroup.x = 200// 酒馆
            //     //     this.shopGroup.x = 400;// 商店
            //     //     this.battlegroundGroup.x = 600;// 格斗场
            //     // }
            // } else {
            //     //福利
            //     Game.DragonBonesManager.playAnimation(this, "icon_fuli", "armatureName", "000_fuli", 0)
            //         .then((display: dragonBones.EgretArmatureDisplay) => {
            //             display.x = this.groupMoon.width / 2;
            //             display.y = this.groupMoon.height / 2;
            //             this.groupMoon.addChild(display);
            //         });
            // }

            // // 首冲
            // let info = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD]
            // Game.DragonBonesManager.playAnimation(this, "icon_fuli", "armatureName", "003_shouchong", 0)
            //     .then((display: dragonBones.EgretArmatureDisplay) => {
            //         display.x = this.groupRecharge.width / 2;
            //         display.y = this.groupRecharge.height / 2;
            //         this.groupRecharge.addChild(display);
            //     });
            // // 绝版
            // Game.DragonBonesManager.playAnimation(this, "icon_fuli", "armatureName", "004_jueban", 0)
            //     .then((display: dragonBones.EgretArmatureDisplay) => {
            //         display.x = this.groupjueban.width / 2;
            //         display.y = this.groupjueban.height / 2;
            //         this.groupjueban.addChild(display);
            //     });
            // //扭蛋机（抓娃娃）
            // Game.DragonBonesManager.playAnimation(this, "icon_fuli", "armatureName", "001_niudanji", 0)
            //     .then((display: dragonBones.EgretArmatureDisplay) => {
            //         display.x = this.groupRandom.width / 2;
            //         display.y = this.groupRandom.height / 2;
            //         this.groupRandom.addChild(display);
            //     });
            // //许愿屋
            // Game.DragonBonesManager.playAnimation(this, "ui_xuyuan", "armatureName", null, 0)
            //     .then((display: dragonBones.EgretArmatureDisplay) => {
            //         display.x = this.nodeXuyuan.width / 2;
            //         display.y = this.nodeXuyuan.height / 2;
            //         this.nodeXuyuan.addChild(display);
            //     });

            // // 新手狂欢
            // Game.DragonBonesManager.playAnimation(this, "icon_fuli", "armatureName", "002_jiamianhua", 0)
            //     .then((display: dragonBones.EgretArmatureDisplay) => {
            //         display.x = this.NodeNovice1.width / 2;
            //         display.y = this.NodeNovice1.height / 2;
            //         this.NodeNovice1.addChild(display);
            //     });
            // 历史聊天记录 
            this.messageHistoryChat.visible = true;
            if (this.messageHistoryChat.visible == true) {
                this.InitChatList();
            }
        }
        private CheckActivityBoss() {
            let [IsStart, IsOver, startTime, overTime] = Game.PlayerBossSystem.ActivityBossIsFive();
            let progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS];
            let [Open, time] = Game.PlayerBossSystem.ActivityBossOpenTime();
            let a = Game.PlayerInfoSystem.BaseInfo.level;
            let b = PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_ACTIVITY_BOSS).condition;
            let c = Game.PlayerBossSystem.GetBossActivityOpen();
            if (progress != null && Game.PlayerInfoSystem.BaseInfo.level >= PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_ACTIVITY_BOSS).condition && Game.PlayerBossSystem.GetBossActivityOpen()) {
                if ((!Open && time <= 300) || Open || IsOver) {
                    this.groupLayerActivityBoss.visible = true;
                    this.SetBossTip();
                } else {
                    this.groupLayerActivityBoss.visible = false;
                }
            } else {
                this.groupLayerActivityBoss.visible = false;
            }
        }

        private SetBossTip() {
            let [Open, time] = Game.PlayerBossSystem.ActivityBossOpenTime();
            if (Open) {
                this.groupLayerActivityBoss.removeChildren();
                Game.DragonBonesManager.playAnimation(this, "hongbao", "armatureName", "000_hongbao", 0)
                    .then((display: dragonBones.EgretArmatureDisplay) => {
                        display.anchorOffsetX = display.width / 2;
                        display.anchorOffsetY = display.height / 2;
                        display.x = display.width / 2;
                        display.y = display.height / 2;
                        this.groupLayerActivityBoss.addChild(display);
                    });
            } else {
                this.groupLayerActivityBoss.removeChildren();
                Game.DragonBonesManager.playAnimation(this, "hongbao", "armatureName", "001_mao", 0)
                    .then((display: dragonBones.EgretArmatureDisplay) => {
                        display.anchorOffsetX = display.width / 2;
                        display.anchorOffsetY = display.height / 2;
                        display.x = this.groupLayerActivityBoss.width / 2;
                        display.y = this.groupLayerActivityBoss.height / 2;
                        this.groupLayerActivityBoss.addChild(display);
                    });
            }
        }
        /**
         * 简易聊天内容list列表
         */
        private InitChatList() {
            this.listBottomData.removeAll();
            this.chatInfosMini = Game.PlayerChatDataSystem.chatInfos;
            for (let i = 0; i < this.chatInfosMini.length; i++) {
                let v = this.chatInfosMini[i];
                let ChatItem = new FormatChatItem();
                let content = Game.PlayerChatDataSystem.GetChatInfo(v);
                if (Chat_Main.checkLeagueChat(content)) continue;
                let lineNum = 1;
                if (content[0]) {
                    lineNum = Game.PlayerChatDataSystem.getStrlineNum(HelpUtil.textConfigFormat(content[0]), 322);
                } else {
                    lineNum = Game.PlayerChatDataSystem.getStrlineNum(HelpUtil.textConfigFormat(content[0] + content[1] + content[2]), 322);
                }
                if (lineNum == 1) {
                    if (v.type == 5 && v.content != "") {
                        ChatItem.itemNum = 42;
                    } else {
                        ChatItem.itemNum = 20;
                    }
                } else {
                    ChatItem.itemNum = 42;
                }
                ChatItem.Data = v;
                this.listBottomData.addItem(ChatItem);
            }
            this.simpleChat.dataProvider = this.listBottomData;
            this.simpleChat.itemRenderer = HXH_ChatItem;
            this.scrollBar.viewport = this.simpleChat;
            setTimeout(() => {
                if (this.simpleChat.contentHeight < this.scrollBar.height) {
                    this.simpleChat.scrollV = 0;
                } else {
                    this.simpleChat.scrollV = this.simpleChat.contentHeight - this.scrollBar.height;
                }
            }, 100)
        }

        /**探索完成提示缓动 */
        private runAni() {
            let off: number = 5 + 2 * Math.random();
            let time: number = (1 + 0.5 * Math.random()) * 1000;
            let groupY: number = this.groupSearchEnd.y;
            if (Math.random() > 0.5) {
                egret.Tween.get(this.imgSearchEnd, { loop: true }).to({ y: this.imgSearchEnd.y - off }, time, egret.Ease.sineInOut).to({ y: this.imgSearchEnd.y + off }, time, egret.Ease.sineInOut).to({ y: groupY }, time, egret.Ease.sineInOut);
            }
            else {
                egret.Tween.get(this.imgSearchEnd, { loop: true }).to({ y: this.imgSearchEnd.y + off }, time, egret.Ease.sineInOut).to({ y: this.imgSearchEnd.y - off }, time, egret.Ease.sineInOut).to({ y: groupY }, time, egret.Ease.sineInOut);
            }
        }
        /** 红点-贪婪之岛 */
        private checkRedPointGreedyIsland() {
            return Tips.GetTipsOfId(Tips.TAG.WONDERLAND);
        }
        /** 红点-工会 */
        private checkRedPointUnion() {
            return Tips.GetTipsOfId(Tips.TAG.LEAGUE);
        }
        /** 红点-黑暗大陆 */
        private checkRedPointShadeDrak() {
            return Tips.GetTipsOfId(Tips.TAG.DarkLand);
        }
        /** 红点-格斗场 */
        private checkRedPointArena() {
            return Tips.getTipsOfMail(message.MailType.MAIL_TYPE_LADDER)
                || Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL)
                || Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_FIGHT)
                || Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.CHARGE_CHALLENGE)
                || Tips.getTipsOfMail(message.MailType.MAIL_TYPE_SINGLECRAFT);
        }
        /** 红点-天空竞技场 */
        private checkRedPointSkyArean() {
            if (PlayerTowerSystem.jump_floor()[0] || PlayerTowerSystem.jumpHigh_floor()[0]) {
                return true;
            }
            return false;
        }
        /** 红点-流星街 */
        private checkRedPointWantedSecond() {
            return Game.PlayerInfoSystem.BaseInfo.wantedCoin > 0
                || Game.PlayerInfoSystem.BaseInfo.arrestCoin > 0;
        }
        /** 红点-商店 */
        private checkRedPointShopMall() {
            if (Game.PlayerInfoSystem.Level < 5) {
                return false;
            }
            let COST_MALL = [
                message.EMallType.MALL_TYPE_ORDINARY,  //普通商店
                message.EMallType.MALL_TYPE_LADDER,  //竞技场商店
                message.EMallType.MALL_TYPE_LEAGUE,  //公会商店
                message.EMallType.MALL_TYPE_HONOR,  //荣誉商店
                message.EMallType.MALL_TYPE_LOTTERY,  //酒馆商店
            ]
            let count = Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LEAGUE, "MALL");
            for (let i = 0; i < COST_MALL.length; i++) {
                if (ShopMainType.GetTips(COST_MALL[i])) {
                    if (count <= 3 || COST_MALL[i] != message.EMallType.MALL_TYPE_LEAGUE) {
                        return true;
                    }
                }
            }
            return false;
        }
        /** 红点-执照 */
        private checkRedPointLicense() {
            if (Game.PlayerInfoSystem.Level < 10) {
                return false;
            }
            let infos = TableMissionType.Table();
            for (let kk in infos) {
                if (infos.hasOwnProperty(kk)) {
                    let vv = infos[kk];
                    if (vv.type == message.MissionType.MISSION_TYPE_LICENCE) {
                        for (let dataindex = 0; dataindex < 7; ++dataindex) {
                            let list = Game.PlayerMissionSystem.GetItemMissionId(vv.index);
                            let list_1 = Game.PlayerMissionSystem.GetMaxCondition(vv.index);
                            let star = Game.PlayerMissionSystem.GetMaxStar(vv.index);
                            let info = Game.PlayerMissionSystem.missionMap[vv.index];
                            let starId = Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
                            let tbl = Game.PlayerMissionSystem.itemInfo(starId + dataindex);
                            let subId = Game.PlayerMissionSystem.itemSubType(vv.index).sub_type;
                            let value = info.value;
                            let start = starId + dataindex;
                            let max = 0;
                            if (subId == 55) {
                                value = info.value % 10000;
                            } else if (subId == 3) {
                                if (info.valueEx.length == 0) {
                                    value = 0;
                                } else {
                                    let IsHave;
                                    for (var k in list) {
                                        if (list.hasOwnProperty(k)) {
                                            var v = list[k];
                                            IsHave = Table.FindF(info.valueEx, (k1, v1) => {
                                                return v.condition == v1;
                                            })
                                        }
                                    }
                                    if (IsHave == true || IsHave == null) {
                                        for (var kkk in info.valueEx) {
                                            if (info.valueEx.hasOwnProperty(kkk)) {
                                                var vvv = info.valueEx[kkk];
                                                if (vvv > max) {
                                                    max = vvv;
                                                    value = max;
                                                }
                                            }
                                        }
                                    } else {
                                        for (var k0 in list_1) {
                                            if (list_1.hasOwnProperty(k0)) {
                                                var v0 = list_1[k0];
                                                if (v0.id > max) {
                                                    max = v0.id;
                                                    value = v0.condition;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if (value >= tbl.condition && info.missionId < start && dataindex <= star) {
                                return true;
                            } else if (value >= tbl.condition && info.missionId == start && dataindex <= star && info.isFinish == false) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
        // 更新界面各元素状态
        private updateUIStates() {
            this.imgSearchEnd.visible = false;
            // this.imgFlagDarkContinent.visible = false; // 黑暗大陆标记
            // this.imgFlagGreedyIsland.visible = false; // 贪婪之岛标记
            // this.imgFlagHunterCambatfield.visible = false; // 格斗场标记
            // this.imgFlagMeteorStreet.visible = false; // 流星街标记
            // this.imgFlagPub.visible = false; // 酒馆标记
            // this.imgFlagShopingMall.visible = false; // 商店标记
            // this.imgFlagSkyArena.visible = false; // 天空竞技场标记
            // this.imgFlagUnion.visible = false; // 公会标记
            this.btnPet.visible = false;  // 念兽

            this.refreshTouchTitle();
            // // 滑屏各功能的开关
            // if (Game.PlayerInfoSystem.Level >= 36) {
            //     this.groupShadeDarkContinent.visible = false; // 黑暗大陆遮罩
            //     this.imgFlagDarkContinent.visible = this.checkRedPointShadeDrak();
            // }
            // if (Game.PlayerInfoSystem.Level >= 20) {
            //     this.groupShadeSkyArena.visible = false; // 天空竞技场遮罩
            //     this.imgFlagSkyArena.visible = this.checkRedPointSkyArean();
            // }
            // if (Game.PlayerInfoSystem.Level >= 18) {
            //     this.groupShadeMeteorStreet.visible = false; // 流星街遮罩
            //     this.imgFlagMeteorStreet.visible = this.checkRedPointWantedSecond();
            // }
            // if (Game.PlayerInfoSystem.Level >= 15) {
            //     this.groupShadeGreedyIsland.visible = false; // 贪婪之岛遮罩
            //     this.imgFlagGreedyIsland.visible = this.checkRedPointGreedyIsland();
            // }
            // if (Game.PlayerInfoSystem.Level >= 12) {
            //     this.groupShadeUnion.visible = false; // 公会遮罩
            //     this.imgFlagUnion.visible = this.checkRedPointUnion();
            // }
            // if (Game.PlayerInfoSystem.Level >= 8) {
            //     this.groupShadeHunterCambatfield.visible = false; // 格斗场遮罩
            //     this.imgFlagHunterCambatfield.visible = this.checkRedPointArena();
            // }
            // if (Game.PlayerInfoSystem.Level >= 5) {
            //     this.groupShadeShopingMall.visible = false; // 商店遮罩
            // }
            // this.groupShadePub.visible = false; // 酒馆遮罩

            // 头像与边框、执照
            let roleinfo = Game.Controller.roleInfo();
            let header_pic_id: string = "" + Game.PlayerInfoSystem.BaseInfo.picId;
            let header_pic_frame: string = "" + Game.PlayerInfoSystem.BaseInfo.picFrameId;
            let item_pic = TableItemPic.Item(header_pic_id);
            if (item_pic) {
                if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                    this.imgRoleHead.source = cachekey("wx_" + item_pic.path, this);
                } else {
                    this.imgRoleHead.source = cachekey(item_pic.path, this);
                }

            }
            //主场景几星猎人执照背景框
            if (Game.PlayerMissionSystem.missionActive.licence == 0) {
                if (this.imgLicenseBackround.source != UIConfig.UIConfig_Task.board[2]) {
                    this.imgLicenseBackround.source = cachekey(UIConfig.UIConfig_Task.board[2], this);
                }
            } else if (Game.PlayerMissionSystem.missionActive.licence > CommonConfig.licence_max_level) {
                if (this.imgLicenseBackround.source != UIConfig.UIConfig_Task.board[3]) {
                    this.imgLicenseBackround.source = cachekey(UIConfig.UIConfig_Task.board[3], this);
                }
            } else {
                if (this.imgLicenseBackround.source != UIConfig.UIConfig_Task.board[1]) {
                    this.imgLicenseBackround.source = cachekey(UIConfig.UIConfig_Task.board[1], this);
                }
            }

            //主场景经验条
            let level = TableLevel.Item(Game.PlayerInfoSystem.BaseInfo.level);
            this.imgExp.slideDuration = 0;
            this.imgExp.maximum = level.role_exp;
            this.imgExp.value = Game.PlayerInfoSystem.BaseInfo.cur_exp;
            // this.imgExp.width = 166 * Game.PlayerInfoSystem.BaseInfo.cur_exp / level.role_exp;
            let item_frame = TableItemPicFrame.Item(header_pic_frame);
            if (item_frame) {
                this.imgHeadFrame.source = cachekey(item_frame.path, this);
            }
            this.imgLicense.source = cachekey(`ui_license_examination_WordsTitle${Game.PlayerInfoSystem.LecenceLevel}_png`, this);

            this.lbRoleName.text = Util.cutString(Game.PlayerInfoSystem.RoleName, 12);
            this.lbRoleLevel.text = Game.PlayerInfoSystem.Level.toString();
            if (Game.PlayerInfoSystem.Coin > 100000) {
                if (((Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.lbGold.text = ((Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                } else {
                    this.lbGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            } else {
                this.lbGold.text = Game.PlayerInfoSystem.Coin.toString();
            }
            if (this.lbGold.text.length > 6) {
                // this.lbGold.size = 12;
            } else {
                // this.lbGold.size = 16;
            }
            if (Game.PlayerInfoSystem.Token > 100000) {
                if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                } else {
                    this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            } else {
                this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
            }
            if (this.lbGemstone.text.length > 6) {
                // this.lbGemstone.size = 12;
            } else {
                // this.lbGemstone.size = 16;
            }
            let str = "";
            if (Game.PlayerInfoSystem.Power > 100000) {
                if (((Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                } else {
                    str += (Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            } else {
                str += Game.PlayerInfoSystem.Power.toString();
            }
            let str_energy = Helper.StringFormat("%d/%d", str, Game.PlayerInfoSystem.PowerMax);
            this.lbStrength.text = str_energy;
            if (this.lbStrength.text.length > 7) {
                // this.lbStrength.size = 12;
            } else {
                // this.lbStrength.size = 16;
            }
            //金币红点
            if (Game.PlayerVIPSystem.vipInfo.buy_coin_free_time < PlayerVIPSystem.LowItem().buy_coin_free_time) {
                this.imgFlagGold.visible = true;
            } else {
                this.imgFlagGold.visible = false;
            }
            this.imgFlagGemstone.visible = false;
            this.imgFlagStrength.visible = false;

            //首冲
            let bFirst = Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward.length != Object.keys(TableFirstCharge.Table()).length;
            let noCharge = Game.PlayerMixUnitInfoSystem.mixunitinfo.old_chargeToken == 0;
            let info = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
            let haveTime = info.info == 0 || info.leftTime > 0;
            this.groupFirst.visible = (bFirst && noCharge && haveTime);
            // 每日首充
            this.groupDailyCharge.visible = ((!Game.PlayerInfoSystem.BaseInfo.is_chargeToday) || (Game.PlayerInfoSystem.BaseInfo.is_chargeToday && !Game.PlayerMixUnitInfoSystem.mixunitinfo.is_rewardTodayPay))
            this.imgTipDailyCharge.visible = Game.PlayerInfoSystem.BaseInfo.is_chargeToday && !Game.PlayerMixUnitInfoSystem.mixunitinfo.is_rewardTodayPay;
            let show = false;
            if (Device.isDebug) {
                show = info.leftTime <= 3600 * 24 * 5 && info.leftTime > 0;
            } else {
                show = info.leftTime <= 3600 * 24 && info.leftTime > 0
            }
            this.groupTimeFirst.visible = show;
            if (noCharge && info.leftTime > 0) {
                this.labelTimeFirst.textFlow = Util.RichText(PlayerGiftSystem.upToTime3(Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD].leftTime));
            }
            this.groupRecharge.visible = (info.info == 0);
            this.groupjueban.visible = (info.info == 1);
            //好友红点
            this.updateTipFriend();
            //猎人传记
            let strtime = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime - Math.floor(egret.getTimer() / 1000);
            let _data = PlayerHunterSystem.Activity_Hero();
            let countBio = Table.Count(_data, function (k, v) {
                return Table.FindK(Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), _data[k].general_id) != -1 ? 1 : 0;
            });
            let a = countBio;
            // let bSeven = strtime > 0 && countBio < 6;
            // this.groupBiography.visible = bSeven;
            let bSeven: boolean = this.getCreateDay() <= 7;

            // 强者之路，外部倒计时，暂时关闭
            // let call = () => {
            //     let show = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime <= 3600 * 24
            //         && Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0;
            //     this.groupTimeBiography.visible = show;
            //     if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime <= 0) {
            //         this.groupTimeBiography.visible = false;
            //     }
            //     this.labelTimeBiography.textFlow = Util.RichText(PlayerGiftSystem.upToTime3(Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime));
            // }
            // call();


            // gifts
            this.imgBoardGift.visible = false;

            // 评审版
            if (!Device.isReviewSwitch) {
                this.setInfoGiftList();
            } else {
                this.offsideGrop.visible = false;
            }

            //VIP礼包
            let num = Game.PlayerInfoSystem.BaseInfo.chargeToken;
            let num0 = PlayerVIPSystem.WealItem(0).charge;
            let isHave = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, (k, v) => {
                return (v == 12);
            });
            if (Game.PlayerInfoSystem.VipLevel <= 12 && !isHave) {
                this.groupNovice.visible = true;
            } else {
                this.groupNovice.visible = false;
            }
            // this.groupNovice.visible = Game.PlayerInfoSystem.BaseInfo.chargeToken >= PlayerVIPSystem.WealItem(0).charge;

            //娃娃机
            this.groupWawaji.visible = ((Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info != 0) && (!Device.isReviewSwitch));

            //念兽(暂时关闭)
            this.btnPet.visible = false;//PlayerMissionSystem.FunOpenTo(FUNC.ADVISER, false) || PlayerAdviserSystem.Open();
            //许愿屋
            let timeXuYuan = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime;
            this.groupXuyuan.visible = timeXuYuan > 0 && new Date().getTime() < Game.PlayerProgressesSystem.progressTime1057;

            // 猎人故事
            let status = otherdb.checkOpenTransformAndActivityStatus();
            if (status == 1 || status == 2) {
                this.groupStoryInstance.visible = PlayerMissionSystem.FunOpenTo(FUNC.TRANSFORM);
            } else {
                this.groupStoryInstance.visible = false;
            }

            // 兑换码 
            this.groupAttention.visible = true;
            // 可收杆
            // if (!this.imgDone.visible 
            //     && Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0 
            //     && Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime - Math.floor(egret.getTimer() / 1000) <= 0 
            //     && !this.groupShadeGreedyIsland.visible) {
            //     this.imgDone.visible = true;
            // } else if (this.imgDone.visible && Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
            //     this.imgDone.visible = false;
            // }

            //任务系列功能红点，在主城界面实时刷新
            Tips.SetTipsOfId(Tips.TAG.NOVICE, 1);
            Tips.SetTipsOfId(Tips.TAG.NOVICE1, 1);
            Tips.SetTipsOfId(Tips.TAG.NOVICE2, 1);
            Tips.SetTipsOfId(Tips.TAG.NOVICEMAQI, 1);

            // Tips.tips_LowVip_set(Player.lowVipLevelNum)
            Tips.SetTipsOfId(Tips.TAG.NEWLOWGift, 1)
            //VIP礼包红点刷新
            // Tips.GetTipsOfId(Tips.TAG.NEWLOWGift, 1)
            this.setInfoTips();//显示主城时刷新一下红点

            //新手狂欢
            let bReward = Table.FindK(Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, TableEnum.Enum.TableNoviceMissionType[TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE - 1]) != -1;
            let bNovice = ((Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0) ||
                (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_ONE].leftTime > 0)) &&
                (!Device.isReviewSwitch) && (!bReward);
            this.groupNovice1.visible = bNovice;

            //遗迹猎人特训 美食猎人特训 赏金猎人特训 契约猎人特训
            Tips.SetTipsOfId(Tips.TAG.WEEKMISSION, 1);
            this.groupMoney.visible = false;

            //信长礼包
            let xinchanginfo = <message.GiftInfo>Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v: message.GiftInfo) => {
                return v.gift_index == 101507;
            })[0];
            if (xinchanginfo) {
                let tableinfo = TableNewgiftItem.Item(101507);
                if (tableinfo && Game.PlayerInfoSystem.BaseInfo.level >= 15 && xinchanginfo.buy_times == 0) {
                    // 开启时间
                    let lastTime: number = xinchanginfo.trigger_time + tableinfo.duration - Game.Controller.curServerTime;
                    this.labelTimeXinChang.textFlow = Util.RichText(PlayerGiftSystem.upToTime3(lastTime));

                    this.groupXinChang.visible = true;
                } else {
                    this.groupXinChang.visible = false;
                }
            } else {
                this.groupXinChang.visible = false;
            }

            if (Game.PlayerMissionSystem.missionActive.missionWeekIndex != 0 && PlayerMissionSystem.FunOpenTo(FUNC.MISSIONWEEK, false) && Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_WEEK].leftTime == 0) {
                let leftTime = Game.PlayerMissionSystem.missionActive.missionWeekStart + Game.PlayerMissionSystem.itemMissionWeek(Game.PlayerMissionSystem.missionActive.missionWeekIndex).duration * 3600 * 24 - Game.Controller.curServerTime;
                let weekType = Game.PlayerMissionSystem.itemMissionWeek(Game.PlayerMissionSystem.missionActive.missionWeekIndex).week_mission_type;
                if (leftTime > 0 && !bSeven) {
                    this.groupMoney.visible = true;
                    let btnPath = UIConfig.UIConfig_Activity.WeekMainButton[weekType];
                    Set.ButtonBackgroud(this.btnMoney, btnPath[0], btnPath[1], btnPath[2]);
                }
            }
            // android.view.OrientationEventListener
            // 通行证角色创建7天以后显示
            this.groupBattlePass.visible = !bSeven;

            //收藏有礼
            let vis: boolean = true;
            for (var key of Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType) {
                if (key == 10001) {
                    vis = false;
                }
            }

            this.groupCollection.visible = vis && ActivityCollection.vis && ((Util.isWxMiniGame() && egret.Capabilities.os == "Android") || (ActivityCollection.myBrowser() == "Safari" && egret.Capabilities.os == "iOS") || (ActivityCollection.myBrowser() == "micromessenger" && egret.Capabilities.os == "iOS") || egret.Capabilities.os == "iOS");
            //收藏有礼引导
            this.collectguidance();
            // 宝石收藏
            Tips.SetTipsOfId(Tips.TAG.Jewel, 1);
            Tips.SetTipsOfId(Tips.TAG.Jewel, 2);
            this.groupJewel.visible = !bSeven && PlayerJewelSystem.GetActivityIndex() != null && !Device.isReviewSwitch;

            // 与时间赛跑
            let openIndex = PlayerRaceSystem.GetActivityIndex();
            this.groupRace.visible = !bSeven && openIndex != null && !Device.isReviewSwitch;
            if (openIndex != null && this.imgTip54.visible == false && !this.ReCheckRaceTips) {
                this.ReCheckRaceTips = true;
                Tips.SetTipsOfId(Tips.TAG.RACE, Tips.TAG.RACEDAY);
            }
            if (PlayerInstanceSystem.RandInfoVis) {
                this.imgTipRand.visible = true;
            } else {
                this.imgTipRand.visible = false;
            }


            // 星耀福利
            this.groupVip.visible = Game.PlayerInfoSystem.BaseInfo.chargeToken >= <number>PlayerVIPSystem.WealItem(0).charge;
            this.imgTip55.visible = Tips.GetTipsOfId(55);

            this.btnCard.visible = PlayerMissionSystem.FunOpenTo(FUNC.POTATO);

            this.FreshSearchInstance();

            //福利红点
            let vis1 = (num) => {
                let info: message.GiftInfo = Table.FindR(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                    return v.gift_index == num;
                })[0];
                if (info) {
                    if (PlayerGiftSystem.getNextLevel(info)) {
                        return PlayerGiftSystem.getNextLevel(info) <= Game.PlayerInfoSystem.BaseInfo.level && info.buy_times != 0;
                    }
                } else {
                    return false;
                }
            }
            let vis2 = () => {
                let table = TableContinuePay.Table();
                for (let i = 1; i <= Object.keys(table).length; i++) {
                    let info = TableContinuePay.Item(i);
                    let vis = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.pay_reward, (k, v) => {
                        return v == info.id;
                    })
                    if (info.id == Game.PlayerInfoSystem.BaseInfo.pay_day && !vis) {//领取
                        return true;
                    }
                }
                return false;
            }
            this.imgTip52.visible = Tips.GetTipsOfId(Tips.TAG.AWARD, 1)
                || Tips.GetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GETPOWER)
                || Tips.GetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GATAWARD)
                || Tips.FUNC[Tips.TAG.SPECIAL][2]()
                || vis1(100302)
                || vis1(100303)
                || vis2();

            // 公会战
            if (Game.PlayerInfoSystem.BaseInfo != null && Game.PlayerInfoSystem.BaseInfo.leagueId != 0 && Game.PlayerLeagueSystem.BaseInfo != null && Game.PlayerLeagueSystem.BaseInfo.match_join && PlayerLeagueSystem.IsTimeInBattle()) {
                this.groupMatch.visible = true;
                this.groupMatch.scaleY = 1;
            } else {
                this.groupMatch.visible = false;
                this.groupMatch.scaleY = 0;
            }
            this.checkZorkBoss();

            if (Device.isReviewSwitch) {
                this.groupLeftBtn.visible = false;
                this.groupRedBR.visible = false;
                this.btnCard.visible = false;
                this.btnPet.visible = false;
                this.groupMatch.visible = false;
                this.groupZorkBoss.visible = false;
                this.activityGroup.visible = false;
                this.btnHelp.visible = false;
                this.btnAddGold.visible = false;
                this.imgFlagGold.visible = false;
                // this.imgDone.visible = false;
                this.imgLicenseBackround.visible = false;
                this.imgLicense.visible = false;
                this.groupSearchEnd.visible = false;
            }

            //年兽BOSS
            this.CheckActivityBoss();

            if (Util.isDisabledPay()) {
                this.btnGift.visible = false;
            }
            this.Chat_MainCB();
            this.funOpenTip();

            // 暂时关闭的功能
            this.groupVIPLogin.visible = false;

            let rankInfo: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];

            this.groupRank.visible = rankInfo != null && Game.Controller.curServerTime > rankInfo.openTime && Game.Controller.curServerTime < rankInfo.closeTime;
            // 线路
            this.updateServerLine();

            this.updateActGroups();
            // banner刷新
            if (this.banner) {
                this.banner.updateUIStates();
            }
        }

        private updateTipFriend() {
            let self = this;
            let vis = false;
            for (let i = 0; i < PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_FRIEND, PlayerRelateSystemSORT.MAIN).length; i++) {
                let relation = PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_FRIEND, PlayerRelateSystemSORT.MAIN)[i];
                if (relation.canReward && relation.isReward == false) {
                    vis = true;
                    i = PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_FRIEND, PlayerRelateSystemSORT.MAIN).length;
                    break;
                }
            }
            PlayerRelateSystem.RelationApplyListReq()
                .then((data: any) => {
                    self.imgTip2_9.visible = Game.PlayerRelateSystem.TipFirend || vis;
                });
        }

        private updateServerLine() {
            this.groupLineChange.visible = Game.PlayerInfoSystem.IsAgreeEnter;
            this.labelLine.text = LineChangeDialog.getLineName(Game.PlayerWonderLandSystem.serverSceneId) + "线";
        }

        private updateActGroups() {
            let dis = 72;
            // icon位置调整
            let groups = [];

            groups.push(this.groupMall);
            groups.push(this.activityGroup1);
            groups.push(this.groupNovice);
            groups.push(this.groupVip);
            groups.push(this.groupSeven);
            groups.push(this.groupNovice1);
            groups.push(this.groupXuyuan);
            groups.push(this.groupWawaji);
            groups.push(this.groupMoney);
            groups.push(this.groupJewel);
            groups.push(this.groupRace);
            let count = 0;
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].visible) {
                    groups[i].right = count;
                    groups[i].y = 0;
                    count += dis;
                }
            }

            groups = [];
            groups.push(this.groupBattlePass);
            groups.push(this.activityGroup);
            groups.push(this.groupXinChang);
            groups.push(this.groupFirst);
            groups.push(this.groupRank);
            // groups.push(this.groupNovice);
            // groups.push(this.groupCollection);
            groups.push(this.groupDailyCharge);
            groups.push(this.groupMysteryShop);
            count = 0;
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].visible) {
                    groups[i].right = count;
                    groups[i].y = 0;
                    count += dis;
                }
            }

            // groups.push(this.groupNovice); // VIP礼包
            // groups.push(this.groupXuyuan);//许愿屋
            // // groups.push(this.groupBiography); // 猎人传记
            // groups.push(this.groupFirst); // 首冲
            // groups.push(this.groupNovice1); // 新手狂欢
            // groups.push(this.groupMoney); // 赏金特训
            // groups.push(this.groupWawaji); //娃娃机
            // groups.push(this.groupJewel); // 宝石收藏
            // groups.push(this.groupRace); // 时间竞速
            // groups.push(this.groupVip); // 星耀福利
            // groups.push(this.groupStoryInstance); // 猎人故事
            // groups.push(this.groupAttention); // 兑换码 微信
            // groups.push(this.groupCollection);//收藏有礼
            // // groups.push(this.groupVIPLogin);//登录送VIP
            // let count = 0;
            // for (let i = 0; i < groups.length; i++) {
            //     if (!groups[i].visible) continue;
            //     groups[i].right = count;
            //     count += 100;
            // }
        }

        /**探索完成提示 */
        private FreshSearchInstance() {
            try {
                let statusList = Game.PlayerInstanceSystem.GetAreaSearchStatus();
                for (let i = 0; i < 9; i++) {
                    if (statusList[i] == true) {
                        this.imgSearchEnd.visible = true;
                        break;
                    }
                }
            } catch (e) {
                egret.error("MainCitySceneNew - FreshSearchInstance - error: " + e);
            }

        }

        private onTouchBegin(evt: egret.TouchEvent) {
            this.groupCollectionOfTips.visible = false;//将收藏引导去掉
            ActivityCollection.guidance = false;
        }

        private onTouchMove(evt: egret.TouchEvent) {
        }

        private onTouchEnd(evt: egret.TouchEvent) {
        }

        protected onAddedToStage() {
            this.addAnimations();
            cachekey("ui_mainui_BgMaoboli_png", this);
            cachekey("ui_login_boardloading_kulapika_jpg", this);
            cachekey("ui_login_boardloading_kuluoluo_jpg", this);
            cachekey("ui_login_boardloading_niteluo_jpg", this);
            cachekey("ui_login_boardloading_qiya_jpg", this);
            cachekey("ui_login_boardloading_wang_jpg", this);
            cachekey("ui_login_boardloading_xiaodi_jpg", this);
            cachekey("ui_login_boardloading_xiaojie_jpg", this);
            cachekey("ui_login_boardloading_xisuo_jpg", this);
            cachekey("ui_login_boardloading_yiermi_jpg", this);
            cachekey("jg_zhaomu_tex_png", this);
            cachekey("jg_zhaomu_large_tex_png", this);

            // 断线重连
            cachekey("ui_common_BoardServerPopTip_png", this);
            cachekey("ui_common_ButtonServerAgainLinkNor_png", this);
            cachekey("ui_common_ButtonServerAgainLinkSel_png", this);
            cachekey("ui_common_ButtonServerReturnEnterNor_png", this);
            cachekey("ui_common_ButtonServerReturnEnterSel_png", this);
        }

        protected onRemovedFromStage() {
            Game.EventManager.off(GameEvent.SERVER_LINE_CHANGE, this.updateServerLine, this);
            Game.EventManager.off(GameEvent.PLAYER_LEVEL_UP, this.updateUIStates, this);
            Game.EventManager.off(GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
            Game.EventManager.off(GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
            Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
            Game.EventManager.off(GameEvent.MAIN_CITY_UPDATE, this.updateUIStates, this);
            Game.EventManager.off(GameEvent.CLOSE_DAILYFIRSTCHARGE, this.updateUIStates, this);
            Game.EventManager.off(GameEvent.NET_SERVER_CONNECTED, this.updateTeach, this);
            Game.EventManager.off(GameEvent.REFRESH_MAINCITY_BUBBLE, this.refreshBubble, this);
            Game.EventManager.off(GameEvent.CHAT_RESTART, this.InitChatList, this);
            Game.EventManager.off(GameEvent.GET_LEVELUP_REWARD, this.funOpenTip, this);
            Game.EventManager.off(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.updateChatList, this);
            this.stopInterval();
        }

        // private timeFun() {
        // 	let ui = this.getChildByName("__rect_back");
        // 	if (ui) {
        // 		this.removeChild(ui);
        // 	}
        // }
        // 场景进入栈顶
        // 1. 刚放进去时
        // 2. 上层场景弹出，该场景被弹到栈顶时
        // public onEntryTopScene(){
        //     this.onEntryTopDialog();
        // }
        public onEntryTopDialog() {
            // this.timeFun();
            if (/*this.isGetVip() && */Teach.m_bOpenTeach && Teach.teachingNow == false && Teach.isDone(teachBattle.teachPartID_Friend)) {
                if (!Teach.isDone(teachBattle.teachPartID_First_Charge)) {
                    Teach.SetTeachPart(teachBattle.teachPartID_First_Charge);
                } else if (!Teach.isDone(teachBattle.teachPartID_GiftBag)) {
                    // Game.EventManager.event(GameEvent.START_NEW_TEACHING, {curPart: 8025});
                }
            }

            if (Teach.isDone(3005) && !Teach.isDone(teachBattle.teachPartID_Friend)) {
                Teach.SetTeachPart(teachBattle.teachPartID_Friend);
            }
            Teach.checkTeachId();
            this.isEntryTopScene = true;
            if (this.groupRedpackage.visible) this.showRedpackage();
            // if (Teach.m_bOpenTeach == true && Teach.teachingNow == false && Teach.isDone(teachBattle.teachPartID_Attention) == false && zj.Game.UIManager.topDialog() == null && Teach.isDone(3005)) {
            //     Teach.SetTeachPart(teachBattle.teachPartID_Attention);
            // }
            // if (Teach.m_bOpenTeach && Teach.teachingNow == false && Game.UIManager.topDialog() == null && this.VIPvisible) {
            //     this.VIPvisible = false;
            //     //如果登录送VIP礼包没有领取就自动弹出
            //     if (Teach.m_bOpenTeach == true && Teach.teachingNow == false) {
            //         if (Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType.length > 0) {
            //             let n = 0;
            //             for (var key of Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType) {
            //                 if (key == 20002) {
            //                     n = 1;
            //                 }
            //                 if (key == 20003) {
            //                     n = 2;
            //                 }
            //                 if (key == 20004) {
            //                     n = 3
            //                 }
            //             }
            //             let date = Game.PlayerInfoSystem.BaseInfo.createTime;
            //             let a = Game.Controller.curServerTime;
            //             let newDate = new Date(date * 1000);
            //             let diff = newDate.getHours() * 3600 + newDate.getMinutes() * 60 + newDate.getSeconds();
            //             let start = date - diff;
            //             let time = (((a - start) / (24 * 3600)) >> 0) + 1;
            //             if (time == 1 && n != 1) {
            //                 this.onBtnVIPLogin();
            //             }
            //             if (time == 2 && n != 2) {
            //                 this.onBtnVIPLogin();
            //             }
            //             if (time == 3 && n != 3) {
            //                 this.onBtnVIPLogin();
            //             }
            //         } else {
            //             this.onBtnVIPLogin();
            //         }
            //     }
            // }
            // 进入主场景，清理战斗对象池
            // Game.ObjectPool.destoryPool();
            // dragonBonesPool.getInstance().destoryPool();
            if (Game.SoundManager.CurMusicName == "city_mp3") {
                Game.SoundManager.resumeMusic();
            } else {
                Game.SoundManager.playMusic("city_mp3", 0);
            }
            this.updateUIStates();
            Teach.bFirstTeachUpdata = true;
            TeachSystem.nodeOrStageID = null;

            if (Game.TeachSystem.curPart == -1) {
                Teach.bFirstTeachUpdata = true;
            }
            if (!Device.isReviewSwitch) {
                this.bubble.SetMainMissionOnComeBack();
            }
            this.startInterval();
        }

        // 场景离开栈顶
        // 1. 从舞台移除
        // 2. 压入新场景
        //     this.onLeaveTopDialog();
        // public onLeaveTopScene(){
        // }
        public onLeaveTopDialog() {
            this.stopInterval();
            this.isEntryTopScene = false;
            //Game.SoundManager.pauseMusic();
        }
        private startInterval() {
            if (this.update == -1) {
                this.update = egret.setInterval(this.setInfoTips, this, 1000);
            }
        }
        private stopInterval() {
            egret.clearInterval(this.update);
            this.update = -1;
            // window.location.search = null;
            // window.history.pushState({}, "0", window.location.href);

        }

        private onClickRoleHead() {
            // toast_warning("玩家信息功能未开启");
            loadUI(userMainSense)
                .then((scene: userMainSense) => {
                    Game.SoundManager.playEffect(SoundManager.SoundOpen(30001), 100);
                    scene.show();
                });
        }

        public onBtnAdventrue() {
            // SceneManager.instance.EnterAdventure();
            PlayerInstanceSystem.RandInfoVis = false;
            this.ownerScene.EnterAdventure();
        }

        private onBtnBag() {
            loadUI(PackageMainScene)
                .then((scene: PackageMainScene) => {
                    Game.SoundManager.playEffect(SoundManager.SoundOpen(30001), 100);
                    scene.show();
                });
        }

        private onBtnHunter() {
            loadUI(HunterMainScene)
                .then((scene: HunterMainScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnCard() {
            loadUI(CardMainScene)
                .then((scene: CardMainScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnTask() {
            // toast_warning("日常功能未开启");
            if (PlayerMissionSystem.FunOpenTo(FUNC.DAILY, true)) {
                loadUI(Daily_Main)
                    .then((dialog: Daily_Main) => {
                        dialog.show(UI.SHOW_FILL_OUT);
                    });
            }
        }

        // private onBtnLine() {
        // loadUI(HXH_GrowUp)
        //     .then((dialog: HXH_GrowUp) => {
        //         dialog.show(UI.SHOW_FILL_OUT);
        //     });
        // if (!Device.isReviewSwitch) {
        //     this.bubble.SetMainMissionOnComeBack(); // 刷新主线任务提示
        // }
        // }

        private onBtnMatch() {
            loadUI(LeagueUnionBattleMain)
                .then((dialog: LeagueUnionBattleMain) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.init();
                });
        }

        private onBtnZorkBoss() {
            loadUI(ConfirmCancelDialog).then((dialog: ConfirmCancelDialog) => {
                dialog.show(UI.SHOW_FROM_TOP);
                dialog.setInfo(TextsConfig.TextsConfig_WonderlandBoss.boss_tips_city);
                dialog.setCB(this.goZorkBoss);
            });
        }

        private onBtnActivityBoss() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.ACTIVITYBOSS, true)) {
                Game.PlayerBossSystem.darklandBossScoreRank().then(() => {
                    loadUI(Activity_BossMainPop)
                        .then((scene: Activity_BossMainPop) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.init();
                        });
                }).catch(reason => {
                    toast(reason);
                })
            }
        }

        private goZorkBoss() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.BOSS, true)) {
                Game.PlayerZorkSystem.bossInfo().then(() => {
                    // Game.PlayerZorkSystem.bossEntry(0, 0).then(() => {
                    //     Tips.tips_45_1_setread(true);
                    //     Tips.SetTipsOfId(Tips.TAG.ZORK, 2);
                    // }).catch((result) => {
                    //     if (result == message.EC.XG_SCENE_BOSS_DEAD) {
                    loadUI(ZorkBossMainPop).then((dialog: ZorkBossMainPop) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                    // }
                    // })
                })
            }
        }

        private checkZorkBoss() {
            this.groupZorkBoss.visible = false;
            Game.PlayerZorkSystem.bossInfo().then(() => {
                // 评审版
                if (Device.isReviewSwitch) {
                    this.groupZorkBoss.visible = false;
                    this.groupTop.visible = false;
                    this.groupTop1.visible = false;
                } else {
                    let bossDied = false;
                    if (Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre != null) {
                        bossDied = Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre == 0;
                    }
                    let progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
                    if (progress && Game.PlayerInfoSystem.BaseInfo.level >= PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS).condition) {
                        let visible = this.groupZorkBoss.visible;
                        if (progress.info > 0) {
                            if (!bossDied) {
                                if (visible == false) {
                                    this.groupZorkBoss.visible = true;
                                }
                            } else {
                                if (visible) {
                                    this.groupZorkBoss.visible = false;
                                }
                            }
                        } else {
                            if (visible == true) {
                                this.groupZorkBoss.visible = false;
                            }
                        }
                        if (this.groupZorkBoss.visible) {
                            this.labelZorkBossTime.text = Helper.GetTimeStr(progress.leftTime > 0 ? progress.leftTime : 0, false);
                        }
                    }
                }
                if (this.groupZorkBoss.visible) {
                    this.groupZorkBoss.scaleY = 1;
                } else {
                    this.groupZorkBoss.scaleY = 0;
                }
            })
        }

        private onBtnRandom() {
            // 扭蛋机
            if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info == 0) {
                toast_warning(TextsConfig.TextsConfig_Activity.Rank_Charge.over);
                return;
            }
            this.QueryIntegralReqBody_Visit()
                .then((data: any) => {
                    loadUI(Activity_RandomBoomSence)
                        .then((scene: Activity_RandomBoomSence) => {
                            scene.Init();
                            scene.show(UI.SHOW_FILL_OUT);
                        });
                }).catch(reason => { });

        }
        private onBtnXuyuan() {
            //许愿屋
            // let any = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime;
            if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime == 0) {
                toast_warning(TextsConfig.TextsConfig_Activity.Rank_Charge.over);
                return;
            }
            this.QueryIntegralReqBody_Visit()
                .then((data: any) => {
                    loadUI(ActivityXuyuanBoom)
                        .then((scene: ActivityXuyuanBoom) => {
                            scene.Init();
                            scene.show(UI.SHOW_FILL_OUT);
                        });
                }).catch(reason => { });
        }

        private onBtnNovice() {
            //VIP礼包
            loadUI(VipLowGift)
                .then((scene: VipLowGift) => {
                    scene.init();
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnBiography() {
            //猎人传记
            loadUI(Biography)
                .then((scene: Biography) => {
                    scene.show(UI.SHOW_FILL_OUT);
                });
        }

        private onBtnRecharge() {
            //首充
            loadUI(HXH_FirstChargeMainNew)
                .then((dialog: HXH_FirstChargeMainNew) => {
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }

        private onBtnDailyCharge() {
            //首充
            loadUI(Activity_DailyFirstCharge)
                .then((dialog: Activity_DailyFirstCharge) => {
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }

        private onBtnLineChange() {
            loadUI(LineChangeDialog)
                .then((dialog: LineChangeDialog) => {
                    dialog.Init();
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }

        private onBtnRedpackage() {
            let info: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RED_PACKET;
            })[0];

            let time = Game.Controller.Activity_redpackage_countdown - Game.Controller.curServerTime;

            if (info != null && Game.Controller.curServerTime > info.openTime && Game.Controller.curServerTime < info.closeTime && time > 0) {
                loadUI(Activity_redWarsDialogMain).then((dialog: Activity_redWarsDialogMain) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                });
            }
            else {
                toast_success("活动未开启!");
            }
        }

        public static onBtnNovice1(a?, time?: number) {
            //新手狂欢与高手进阶
            // if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_ONE].leftTime > 0) {
            //     loadUI(ActivityNoviceContinue)
            //         .then((scene: ActivityNoviceContinue) => {
            //             scene.show(UI.SHOW_FROM_TOP);
            //             scene.setType(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE);
            //         });
            // } else if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0) {
            //     if (time == null || time == undefined) {
            //         time = 0;
            //     }
            if (time && time > 0) {
                egret.Tween.get(this).wait(time).call(() => {
                    egret.Tween.removeTweens(this);
                    loadUI(ActivityNovice)
                        .then((scene: ActivityNovice) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.setType(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL);
                        });
                })
            } else {
                loadUI(ActivityNovice)
                    .then((scene: ActivityNovice) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.setType(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL);
                    });
            }

            // }
        }

        private onBtnNovice2() {
            //高手进阶1
            // loadUI(ActivityNoviceHigh)
            //     .then((scene: ActivityNoviceHigh) => {
            //         scene.show(UI.SHOW_FROM_TOP);
            //         scene.setType(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_TWO);
            //     });
        }

        private onBtnNovice3() {
            //高手进阶2
            // loadUI(ActivityNoviceHighNext)
            //     .then((scene: ActivityNoviceHighNext) => {
            //         scene.show(UI.SHOW_FROM_TOP);
            //         scene.setType(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_MAQI);
            //     });
        }

        private onBtnNovice4() {
            //高手进阶3
            // loadUI(ActivityNoviceHighNext)
            //     .then((scene: ActivityNoviceHighNext) => {
            //         scene.show(UI.SHOW_FROM_TOP);
            //         scene.setType(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_KUBI);
            //     });
        }

        private onBtnMoney() {
            //遗迹猎人特训 美食猎人特训 赏金猎人特训 契约猎人特训
            let weekType = Game.PlayerMissionSystem.itemMissionWeek(Game.PlayerMissionSystem.missionActive.missionWeekIndex).week_mission_type;
            if (TableEnum.Enum.WeekMissionTypeUI[weekType - 1] == null) {
                return;
            }
            let type: any;
            switch (weekType) {
                case 1:
                    loadUI(ActivityWeekMissionOne)
                        .then((scene: ActivityWeekMissionOne) => {
                            scene.SetType(Game.PlayerMissionSystem.missionActive.missionWeekIndex);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                    break;
                case 2:
                    loadUI(ActivityWeekMissionTwo)
                        .then((scene: ActivityWeekMissionTwo) => {
                            scene.SetType(Game.PlayerMissionSystem.missionActive.missionWeekIndex);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                    break;
                case 3:
                    loadUI(ActivityWeekMissionThree)
                        .then((scene: ActivityWeekMissionThree) => {
                            scene.SetType(Game.PlayerMissionSystem.missionActive.missionWeekIndex);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                    break;
                case 4:
                    loadUI(ActivityWeekMission)
                        .then((scene: ActivityWeekMission) => {
                            scene.SetType(Game.PlayerMissionSystem.missionActive.missionWeekIndex);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                    break;
            }
        }

        /**登录送VIP */
        private onBtnVIPLogin() {
            // loadUI(VipLoginGet)
            //     .then((dialog: VipLoginGet) => {
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
        }

        private onBtnLisence() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.LICENSE, true)) {
                loadUI(licenseMain)
                    .then((scene: licenseMain) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private onBtnFriend() {
            // toast_warning("社交功能未开启");
            loadUI(Friend_MainFriendSence)
                .then((scene: Friend_MainFriendSence) => {
                    scene.init();
                    scene.show();
                });
        }

        private onBtnGift() {
            // toast_warning("商城功能未开启");
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(true);
                });
        }

        private onBtnMoon() {
            // toast_warning("福利功能未开启");
            loadUI(ActivitySpecialMainScene)
                .then((scene: ActivitySpecialMainScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnActivity() {
            // toast_warning("活动功能未开启");
            Game.PlayerActivitySystem.queryActivitysReward(message.ActivityType.ACT_TYPE_NONO).then((resp: message.QueryActivitysResponse) => {
                Tips.SetTipsOfAllActivity;
                loadUI(ActivityMain)
                    .then((scene: ActivityMain) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            })
        }

        private onBtnHelp() {
            // this.ownerScene.sceneMap.print();
            // loadUI(HelpDialog)
            //     .then((dialog: HelpDialog) => {
            //         dialog.show(UI.SHOW_FILL_OUT);
            //     });
            // this.moveToHunterCambatfield(null, null);
            // loadUI(TestSound)
            //     .then((dialog: TestSound) => {
            //         dialog.onInit();
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
        }

        private onBtnOnlineGetAward() {
            loadUI(Activity_OnlineGetAwards)
                .then((dialog: Activity_OnlineGetAwards) => {
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }

        private onBtnFunOpenGetAward() {
            loadUI(Activity_FunOpen)
                .then((dialog: Activity_FunOpen) => {
                    dialog.show(UI.SHOW_FILL_OUT);
                });
        }

        private onBtnBattlePass() {
            loadUI(HXH_BattlePass).then((dialog: HXH_BattlePass) => {
                dialog.show(UI.SHOW_FROM_TOP);
            });
        }

        private onBtnRank() {
            let info: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];

            if (info != null && Game.Controller.curServerTime > info.openTime && Game.Controller.curServerTime < info.closeTime) {
                loadUI(Activity_RanklistMain).then((dialog: Activity_RanklistMain) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                });
            }
            else {
                toast_success("活动未开启!");
            }
        }

        private onBtnWorkSend() {
            // loadUI(WorkSendMain).then((dialog: WorkSendMain) => {
            //     dialog.show(UI.SHOW_FROM_TOP);
            // });
            loadUI(HXH_BattlePass).then((dialog: HXH_BattlePass) => {
                dialog.show(UI.SHOW_FROM_TOP);
            });
        }

        private onBtnForum() {
            toast_warning("社区功能未开启");
        }

        //猎人故事
        private onBtnStoryInstance() {
            loadUI(HunterTransformMainSence)
                .then((scene: HunterTransformMainSence) => {
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnAttention() {
            // 关注微信
            loadUI(AttentionGiftDialog)
                .then((dialog: AttentionGiftDialog) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        /**收藏有礼 */
        private onBtnCollection() {
            loadUI(ActivityCollection)
                .then((dialog: ActivityCollection) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnMail() {
            // toast_warning("邮件功能未开启");
            loadUI(Mail_Main)
                .then((scene: Mail_Main) => {
                    scene.show();
                    Game.SoundManager.playEffect(SoundManager.SoundOpen(30001), 100);
                    scene.init();
                });
        }

        private onBtnChat() {
            //toast_warning("聊天功能未开启");
            loadUI(Chat_Main)
                .then((dialog: Chat_Main) => {
                    Game.SoundManager.playEffect(SoundManager.SoundOpen(30001), 100);
                    dialog.CB(() => {
                        this.Chat_MainCB();
                    });
                    dialog.show();
                });
        }

        public Chat_MainCB() {
            let vis = Device.GetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible");
            if (vis == -1) {
                Device.SetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible", true)
            }
            if (Device.GetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible") == true) {
                this.btnChat.visible = false;
                this.messageHistoryChat.visible = true;
            } else {
                this.btnChat.visible = true;
                this.messageHistoryChat.visible = false;
            }
        }

        private onBtnPet() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER, false) || PlayerAdviserSystem.Open()) {
                loadUI(PetMainScene)
                    .then((dialog: PetMainScene) => {
                        dialog.inIt(1);
                        dialog.show(UI.SHOW_FILL_OUT);
                    });
            }
        }

        //添加金币
        private onBtnAddGold() {
            loadUI(HelpGoldDialog)
                .then((dialog: HelpGoldDialog) => {
                    dialog.SetInfoList(true);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnAddGemstone() {
            // toast_success("加钻石功能未开启");
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(true);
                });
        }

        private onBtnAddStrength() {
            //增加体力
            loadUI(HXH_HunterUserStrength)
                .then((dialog: HXH_HunterUserStrength) => {
                    dialog.SetInfo();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnDebug() {
            // egret.localStorage.clear();
            // platform.restart();
            // return;
            loadUI(DebugDialog)
                .then((dialog: DebugDialog) => {
                    dialog.show();
                })
        }

        public clearActivity() {
            this.groupActLeft.visible = false;
            this.groupActRight.visible = false;
            this.topShadow.visible = true;
        }

        public openActivity() {
            this.groupActLeft.visible = true;
            this.groupActRight.visible = true;
            this.topShadow.visible = false;
        }

        public initTouchTitle(touchTitles) {
            this.touchTitles = [];
            for (let i in touchTitles) {
                let item = touchTitles[i] as MainCityTouchTitle;
                this.touchTitles.push(item);
                let redFunc = null;
                let redObj = this;
                switch (MainCityTouchTitle.getFuncIdx(item.type)) {
                    default:// 酒馆
                        break;
                    case 1:// 1工会
                        redFunc = this.checkRedPointUnion;
                        break;
                    case 2:// 2格斗
                        redFunc = this.checkRedPointArena;
                        break;
                    case 3:// 5天空竞技场
                        redFunc = this.checkRedPointSkyArean;
                        break;
                    case 4:// 62黑暗大陆
                        redFunc = this.checkRedPointShadeDrak;
                        break;
                    case 5:// 7流星街
                        redFunc = this.checkRedPointWantedSecond;
                        break;
                    case 6:// 26商店
                        redFunc = this.checkRedPointShopMall;
                        break;
                    case 7:// 37大草原（贪婪之岛）
                        redFunc = this.checkRedPointGreedyIsland;
                        break;
                }
                item.init(this.onTouchGroup, this, redFunc, redObj);
            }
        }

        public initBanner(banner: MainCityBanner) {
            if (this.banner) {
                if (this.banner.parent) {
                    this.banner.parent.removeChild(this.banner);
                }
                this.banner = null;
            }
            this.banner = banner;
            // this.banner.init();
            this.banner.updateUIStates();
        }

        private refreshTouchTitle() {
            if (this.touchTitles) {
                for (let i = this.touchTitles.length - 1; i >= 0; --i) {
                    this.touchTitles[i].refreshState();
                }
            }
        }

        public getTouchTitle(type: message.FunctionOpen): MainCityTouchTitle {
            if (this.touchTitles) {
                for (let i = this.touchTitles.length - 1; i >= 0; --i) {
                    if (type == this.touchTitles[i].type) {
                        return this.touchTitles[i];
                    }
                }
            }
            return null;
        }
        public onTouchGroup(item: MainCityTouchTitle, touchType: number) {
            this.ownerScene.sceneMap.onTouchGroup(item, touchType);
        }
        public toJump(type: message.FunctionOpen) {
            // this.btnDarkContinent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDarkContinent, this); // 黑暗大陆
            // this.btnGreedyIsland.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGreedyIsland, this); // 贪婪之岛
            // this.btnHunterCambatfield.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHunterCambatfield, this); // 格斗场
            // this.btnMeteorStreet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMeteorStreet, this); // 流星街
            // this.btnPub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPub, this); // 酒馆
            // this.btnShopingMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShopingMall, this); // 商店
            // this.btnSkyArena.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkyArena, this); // 天空竞技场
            // this.btnUnion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnion, this); // 公会
            let title = this.getTouchTitle(type);
            if (!title.refreshState(true)) {
                return;
            }
            switch (MainCityTouchTitle.getFuncIdx(type)) {
                case 0:// 酒馆
                    this.onBtnPub();
                    break;
                case 1:// 1工会
                    this.onBtnUnion();
                    break;
                case 2:// 2格斗
                    this.onBtnHunterCambatfield();
                    break;
                case 3:// 5天空竞技场
                    this.onBtnSkyArena();
                    break;
                case 4:// 62黑暗大陆
                    this.onBtnDarkContinent();
                    break;
                case 5:// 7流星街
                    this.onBtnMeteorStreet();
                    break;
                case 6:// 26商店
                    this.onBtnShopingMall();
                    break;
                case 7:// 37大草原（贪婪之岛）
                    // this.onBtnGreedyIsland();
                    break;
            }
        }

        // 黑暗大陆
        private onBtnDarkContinent() {
            loadUI(DarkLandHomeScene)
                .then((scene: DarkLandHomeScene) => {
                    scene.show(UI.SHOW_FILL_OUT);
                });
        }

        // 贪婪之岛
        private onBtnGreedyIsland() {
            SceneManager.instance.EnterSceneZorkBoss();
        }

        // 格斗场
        private onBtnHunterCambatfield() {
            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                loadUI(ArenaLadder).then((dialog: ArenaLadder) => {
                    Game.PlayerArenaSystem.ladderList(false).then((data: any) => {
                        dialog.setInfo(data, () => { });
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                });
            } else {
                loadUI(ArenaMainScene)
                    .then((scene: ArenaMainScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        // 流星街
        private onBtnMeteorStreet() {
            loadUI(WantedSecondMeteorstanceScene)
                .then((scene: WantedSecondMeteorstanceScene) => {
                    scene.Init(1);
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        // 酒馆
        private onBtnPub() {
            loadUI(TavernScene)
                .then((scene: TavernScene) => {
                    scene.show(UI.SHOW_FILL_OUT);
                    scene.nPCDialog();
                });
        }

        // 商店
        private onBtnShopingMall() {
            loadUI(ShopMallDialog)
                .then((scene: ShopMallDialog) => {
                    scene.load(1, true);
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        // 天空竞技场
        private onBtnSkyArena() {
            loadUI(SkyAreanMainScene)
                .then((scene: SkyAreanMainScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.Init();
                });
        }

        // 公会
        private onBtnUnion() {
            if (Game.PlayerInfoSystem.LeagueId == 0) {
                loadUI(LeagueChooseScene)
                    .then((scene: LeagueChooseScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.init();
                    });
            } else {
                loadUI(LeagueHomeScene)
                    .then((scene: LeagueHomeScene) => {
                        scene.init();
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        // 宝石收藏
        private onBtnJewel() {
            loadUI(ActivityJewelCollectionSence)
                .then((scene: ActivityJewelCollectionSence) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    // scene.Init();
                });
        }

        //时间竞速
        private onButtonRace() {
            loadUI(ActivityTimeRaceMain)
                .then((scene: ActivityTimeRaceMain) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    // scene.Init();
                });
        }

        // 星耀福利
        private onBtnVip() {
            loadUI(VipMain)
                .then((scene: VipMain) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init();
                });
        }

        //扭蛋机
        public QueryIntegralReqBody_Visit() {
            return new Promise((resolve, reject) => {
                let request = new message.QueryIntegralRequest();
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.QueryIntegralResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    Game.PlayerRelateSystem.relationInfo();
                    Game.PlayerRelateSystem.givepower();
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        private updateMysteryShop() {
            let activityInfo: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
            })[0];

            if (activityInfo == null) {
                return;
            }

            // 开启时间
            let lastTime: number = activityInfo.closeTime - Game.Controller.curServerTime;
            this.labelTimeMysteryShop.textFlow = Util.RichText(PlayerGiftSystem.upToTime3(lastTime));
            this.imgTipMysteryShop.visible = false;
        }
        // 右侧礼包
        public setInfoGiftList() {
            if (Util.isDisabledPay()) {
                return;
            }

            let form5 = [];
            let secretMalls = otherdb.GetSecretMallInfo();
            let gifts = PlayerGiftSystem.ShowInCity();
            let pushingGifts = PlayerGiftSystem.ShowInCityByPushing();
            let otherGifts = PlayerGiftSystem.ShowInCityOther();

            // 神秘商店放到活动列表里
            if (secretMalls.length > 0) {
                //     let currentInfo = secretMalls;
                //     currentInfo["name"] = "secretMall";
                //     form5.push(currentInfo);
                this.updateMysteryShop();
                this.groupMysteryShop.visible = true;
            } else {
                this.groupMysteryShop.visible = false;
            }

            for (const v of pushingGifts) {
                let currentInfo = Table.DeepCopy(v);
                currentInfo["name"] = "pushingGift";
                form5.push(currentInfo);
            }

            for (const v of gifts) {
                let currentInfo = Table.DeepCopy(v);
                currentInfo["name"] = "doubleGift";
                form5.push(currentInfo);
            }

            for (const v of otherGifts) {
                let currentInfo = Table.DeepCopy(v);
                currentInfo["name"] = "otherGift";
                form5.push(currentInfo);
            }

            let newGift = PlayerGiftSystem.CurNewGift();
            for (const v of newGift) {
                let currentInfo = Table.DeepCopy(v);
                currentInfo["name"] = "monthGift";
                form5.push(currentInfo);
            }

            this.imgBoardGift.visible = (form5.length > 0);
            let arrCollection = new eui.ArrayCollection();
            for (const k in form5) {
                arrCollection.addItem({ index: Number(k) + 1, info: form5[k], father: this });
            }
            this.lstGift.dataProvider = arrCollection;
            this.lstGift.itemRenderer = MainCityGiftItem;

            let bSeven: boolean = this.getCreateDay() <= 7;
            this.groupSeven.visible = bSeven || Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length < 7;
            // if (bSeven) {
            //     let currentInfo = { name: "seven" };
            //     form5.push(currentInfo);
            // }
        }
        // 创建角色的天数
        private getCreateDay() {
            return Helper.getDayIdx(Game.PlayerInfoSystem.BaseInfo.createTime * 1000, Game.Controller.curServerTime * 1000);
            // return Math.floor((Game.Controller.curServerTime - Game.PlayerInfoSystem.BaseInfo.createTime) / 86400) + 1;
        }

        /**信长礼包 */
        private onBtnXinChang() {
            loadUI(Activity_HunterGift)
                .then((dialog: Activity_HunterGift) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                })
        }
        /** 神秘商店 */
        private onBtnMysteryShop() {
            loadUI(PublicGift)
                .then((scene: PublicGift) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init();
                });
        }

        private onSevenGift() {
            loadUI(ActivityHappySeven)
                .then((scene: ActivityHappySeven) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    // scene.init();
                });
        }

        private setInfoTips(args?: any) {
            this.collectguidance();//检测有收藏有礼引导时屏幕旋转
            for (let id = Tips.TAG.MIN; id < Tips.TAG.MAX; ++id) {
                if (id == 52) {
                    continue;
                }
                if (this["imgTip" + id] != null) {
                    if (!Device.isReviewSwitch) {// 评审版
                        this["imgTip" + id].visible = Tips.GetTipsOfId(id);
                    } else {
                        if (id == 53 || id == 50 || id == 22 || id == 28 || id == 47 || id == 49) {
                            this["imgTip" + id].visible = false;
                        } else {
                            //let any = Tips.GetTipsOfId(id);
                            this["imgTip" + id].visible = Tips.GetTipsOfId(id);
                        }
                    }
                }
            }
            this.imgTip28.visible = false;// 念兽红点暂时关闭
            if (!Device.isReviewSwitch) {// 评审版
                Tips.SetTipsOfProgresses();
            }

            this.imgTip49.visible = this.checkRedPointLicense();// 执照红点检测
            // this.imgFlagShopingMall.visible = this.checkRedPointShopMall();// 商店红点检测
            this.refreshTouchTitle();// 商店红点检测

            this.updateOnlineGetAward();

            // 工会战倒计时
            if (this.groupMatch.visible && Game.PlayerLeagueSystem && Game.PlayerLeagueSystem.BaseInfo) {
                this.lbTimeMatch.text = PlayerLeagueSystem.GetTimeDiffShow(PlayerLeagueSystem.getStatus())[2];
                this.groupTimeMatch.visible = true;
            } else {
                this.groupTimeMatch.visible = false;
            }
            // 7日奖
            if (this.groupSeven.visible) {
                // Tips.GetTipsOfId(Tips.TAG.SEVEN, Tips.TAG.SEVEN_Gift)
                // this.imgTipSeven.visible = Tips.GetTipsOfId(Tips.TAG.SEVEN, Tips.TAG.SEVEN_Reward) || Tips.GetTipsOfId(Tips.TAG.SEVEN, Tips.TAG.SEVEN_Gift);
                // this.imgTipSeven.visible = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, function (kk, vv) {
                //     return vv == 0;
                // });
                let day = Helper.getDayIdx(Game.PlayerInfoSystem.BaseInfo.createTime * 1000, Game.Controller.curServerTime * 1000);
                this.imgTipSeven.visible = !(day <= Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length);
            }

            let tip1: boolean = false;
            if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0) { // 未购买高级通行证
                if (Game.PlayerInfoSystem.BaseInfo.permitLevel != Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) tip1 = true;
            }
            else {
                if (Game.PlayerInfoSystem.BaseInfo.permitLevel != Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length || Game.PlayerInfoSystem.BaseInfo.permitLevel != Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) tip1 = true;
            }

            // 抢红包是否显示
            let redPackageInfo: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RED_PACKET;
            })[0];

            let redPackageTime = Game.Controller.Activity_redpackage_countdown - Game.Controller.curServerTime;

            this.groupRedpackage.visible = redPackageInfo != null && Game.Controller.curServerTime > redPackageInfo.openTime && Game.Controller.curServerTime < redPackageInfo.closeTime && redPackageTime > 0 && Game.PlayerInfoSystem.BaseInfo.level >= 10;
            if (this.groupRedpackage.visible) this.showRedpackage();

            let [tip3, tip4, tip5] = [this.missionComplete(TablePermitMission.Table()), this.missionComplete(Game.PlayerMissionSystem.GetBattlePassWeekMission()), this.missionComplete(Game.PlayerMissionSystem.GetBattlePassMonthMission())];
            this.imgTip68.visible = tip1 || tip3 || tip4 || tip5;
        }

        private missionComplete(itemList: Array<TableMissionItem> | { [key: string]: TablePermitMission }): boolean {
            if (itemList instanceof Array) {
                for (let i = 0; i < itemList.length; i++) {
                    let mission: TableMissionType;
                    for (const key in TableMissionType.Table()) {
                        if (TableMissionType.Table().hasOwnProperty(key)) {
                            const element = TableMissionType.Table()[key];
                            if (itemList[i].id >= element.start_id && itemList[i].id <= element.end_id) {
                                mission = element;
                                break;
                            }
                        }
                    }
                    let tb = Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, itemList[i].id);
                    if (tb.isDo >= tb.toDo && tb.finish) return true; // 可以领取
                }
                return false;
            }
            else if (itemList instanceof Object) {
                for (const key in itemList) {
                    if (itemList.hasOwnProperty(key)) {
                        const element = itemList[key];
                        let isGet = Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward.indexOf(element.id) != -1
                        if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && !isGet) return true;
                        if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && Game.PlayerInfoSystem.BaseInfo.permitPay == 1) return true;
                        if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && Game.PlayerMissionSystem.missionActive.activeScore >= element.value) return true;
                    }
                }
                return false;
            }
            return false;
        }

        /** 场景是否进入栈顶 */
        private isEntryTopScene: boolean = false; // 用于先检测是否有新手引导 再检测是否需要弹出红包
        /**回到主城 满足条件弹出红包界面 */
        private showRedpackage() {
            if (!this.isEntryTopScene || Game.UIManager.topDialog() != null) return;
            if (Game.PlayerActivitySystem.checkShowRedPackage()) {
                loadUI(Activity_redWarsDialogMain).then((dialog: Activity_redWarsDialogMain) => {
                    dialog.show(UI.SHOW_FROM_BOTTON);
                });
            }
        }

        private total_login_time: number = Game.Controller.LoginInterval * 60;
        private last_logintime: number = Game.PlayerInfoSystem.BaseInfo.lastLoginTime;

        private updateLoginTime() {
            this.total_login_time = Game.Controller.LoginInterval * 60;
            this.last_logintime = Game.PlayerInfoSystem.BaseInfo.lastLoginTime;
            this.updateOnlineGetAward();
        }

        private updateOnlineGetAward() {
            let server_Time = Game.Controller.curServerTime;
            let onlineTime = this.total_login_time + (server_Time - this.last_logintime); // 登录总时长

            let timeAll = 0;
            for (let i = 1; i <= Object.keys(TableOnlineReward.Table()).length; i++) {
                timeAll += TableOnlineReward.Item(i).online_time;
            }

            if (onlineTime > timeAll && Game.PlayerMixUnitInfoSystem.mixunitinfo.online_reward.length == Object.keys(TableOnlineReward.Table()).length) {
                this.groupOnlineGetAward.visible = false;
                this.groupOnlineGetAward.scaleY = 0;
                return;
            }

            for (let i = 1; i <= Helper.getObjLen(TableOnlineReward.Table()); i++) {
                let a = 0;
                for (let j = 0; j < i; j++) {
                    a += TableOnlineReward.Item(j + 1).online_time;
                }
                if (a - onlineTime > 0) {
                    this.imgOnlineIcon.source = cachekey(PlayerItemSystem.ItemPath(TableOnlineReward.Item(i).goods_id[0]), this);
                    this.labelOnlineNum.text = TableOnlineReward.Item(i).goods_count.toString();
                    this.labelOnlineCountTime.text = Helper.GetTimeStr(a - onlineTime, false);
                    this.labelOnlineCountTime.textColor = 0xffffff;
                    this.imgOnlineRedTip.visible = false;
                    return;
                }
                else {
                    // 判断是否已经领取 如果领取 显示倒计时 未领取一直显示可领取
                    if (Game.PlayerMixUnitInfoSystem.mixunitinfo.online_reward.indexOf(i) == -1) {
                        this.labelOnlineCountTime.text = "可领取";
                        this.labelOnlineCountTime.textColor = 0xffff00;
                        this.imgOnlineRedTip.visible = true;
                        this.imgOnlineIcon.source = cachekey(PlayerItemSystem.ItemPath(TableOnlineReward.Item(i).goods_id[0]), this);
                        this.labelOnlineNum.text = TableOnlineReward.Item(i).goods_count.toString();
                        return;
                    }
                }
            }
        }
        /**活动开启领取奖励 */
        private funOpenTip() {
            let awardArr: Array<TableUplevelReward> = [];
            for (const key in TableUplevelReward.Table()) {
                if (TableUplevelReward.Table().hasOwnProperty(key)) {
                    const element = TableUplevelReward.Table()[key];
                    if (element.index > 1000) awardArr.push(element);
                }
            }
            awardArr.sort((a, b) => { return a.level - b.level; });

            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward.indexOf(awardArr[awardArr.length - 1].index) != -1) {
                this.groupFunOpenTip.visible = false;
                this.imgFunOpenRedTip.visible = false;
                return;
            }

            let funOpenInfo: Array<TableFunctionOpen> = [];
            for (const key in TableFunctionOpen.Table()) {
                if (TableFunctionOpen.Table().hasOwnProperty(key)) {
                    const element = TableFunctionOpen.Table()[key];
                    if (element.condition == 0 || element.condition == 999 || element.show == 0) continue;
                    funOpenInfo.push(element);
                }
            }
            funOpenInfo.sort((a, b) => { return a.condition - b.condition; });

            this.imgFunOpenRedTip.visible = false;
            // this.labelOpenLevel.visible = false;
            // this.labelOpenLevel1.visible = false;
            for (let i = 0; i < funOpenInfo.length; i++) {
                let award: TableUplevelReward = null;
                for (let j = 0; j < awardArr.length; j++) {
                    if (funOpenInfo[i].condition == awardArr[j].level) {
                        award = awardArr[j];
                        break;
                    }
                }
                // this.imgFunOpenIcon.source = cachekey(funOpenInfo[i].path, this);
                if (!this.imgFunOpenRedTip.visible && Game.PlayerInfoSystem.BaseInfo.level >= funOpenInfo[i].condition) {
                    if (Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward.indexOf(award.index) == -1) { // 满足条件未领奖
                        this.imgFunOpenRedTip.visible = true;
                    }
                }
                // 不满足领奖条件
                if (Game.PlayerInfoSystem.BaseInfo.level < funOpenInfo[i].condition || i == funOpenInfo.length - 1) {
                    this.labelOpenLevel.text = funOpenInfo[i].condition + "级";
                    // this.labelOpenLevel.visible = true;
                    // this.labelOpenLevel1.visible = true;
                    return;
                }
            }
        }

        private updateTeach() {
            Teach.cleanTeach();
            Game.UIManager.GroupStory.removeChildren();
            if (Teach.nOperateTeachPart == -1) {
                Teach.bFirstTeachUpdata = true;
            }
        }

        private refreshBubble() {
            if (!Device.isReviewSwitch) {
                this.bubble.SetMainMissionOnComeBack();
            }
        }

        /**收藏引导 */
        private collectguidance() {
            if (ActivityCollection.guidance) {
                this.groupCollectionOfTips.visible = true;
                let a = () => {
                    c();
                    if (ActivityCollection.myBrowser() == "Safari") {
                        this.groupCollectionOfTips3.visible = true;
                    } else if ((ActivityCollection.myBrowser() == "micromessenger" && egret.Capabilities.os == "iOS")) {
                        this.groupCollectionOfTips4.visible = true;
                    } else {
                        c();
                    }
                }
                let b = () => {
                    c();
                    if (ActivityCollection.myBrowser() == "Safari") {
                        this.groupCollectionOfTips5.visible = true;
                    } else if ((ActivityCollection.myBrowser() == "micromessenger" && egret.Capabilities.os == "iOS")) {
                        this.groupCollectionOfTips1.visible = true;
                        this.groupCollectionOfTips1.top = 43;
                    } else if (window.navigator) {
                        if (window.navigator.userAgent) {
                            if (ActivityCollection.myBrowser() == "Safari" && /(iPad)/i.test(window.navigator.userAgent)) {
                                this.groupCollectionOfTips5.visible = false;
                                this.groupCollectionOfTips1.visible = true;
                                this.groupCollectionOfTips1.top = 120;
                            }
                        }
                    } else {
                        c();
                    }
                }
                let c = () => {
                    for (let i = 1; i <= 5; i++) {
                        this["groupCollectionOfTips" + i].visible = false;
                    }
                }
                switch (window.orientation) {
                    case 0:   //竖屏
                        b();
                        break;
                    case -90: //横屏
                        a();
                        break;
                    case 90:   //横屏
                        a();
                        break;
                    case 180:   //竖屏
                        b();
                        break;
                };
                if (Util.isWxMiniGame()) {
                    c();
                    this.groupCollectionOfTips2.visible = true;
                }
            }
        }

        public isGetVip() {
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType.length > 0) {
                let n = 0;
                for (var key of Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType) {
                    if (key == 20002) {
                        n = 1;
                    }
                    if (key == 20003) {
                        n = 2;
                    }
                    if (key == 20004) {
                        n = 3
                    }
                }
                let date = Game.PlayerInfoSystem.BaseInfo.createTime;
                let a = Game.Controller.curServerTime;
                let newDate = new Date(date * 1000);
                let diff = newDate.getHours() * 3600 + newDate.getMinutes() * 60 + newDate.getSeconds();
                let start = date - diff;
                let time = (((a - start) / (24 * 3600)) >> 0) + 1;
                if (time == 1 && n != 1) {
                    return false;// 未领取
                }
                if (time == 2 && n != 2) {
                    return false;
                }
                if (time == 3 && n != 3) {
                    return false;
                }
            }
            else {
                return false;
            }
            return true; // 已领取
        }

        public setOwnerScene(scene: MainCityUI) {
            this.ownerScene = scene;
        }
        // 关闭场景
        public close(animation?: string) { }

    }

}