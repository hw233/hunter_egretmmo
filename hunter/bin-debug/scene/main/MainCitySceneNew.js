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
    // 改版主城界面
    // 翟伟利
    // 2019.11.7
    var MainCitySceneNew = (function (_super) {
        __extends(MainCitySceneNew, _super);
        function MainCitySceneNew() {
            var _this = _super.call(this) || this;
            _this.ChatItem = new zj.HXH_ChatItem(); // 添加历史聊天记录
            _this.chatInfosMini = zj.Game.PlayerChatDataSystem.chatInfos;
            _this.listBottomData = new eui.ArrayCollection(); // 聊天数据
            _this.ReCheckRaceTips = false;
            _this.VIPvisible = true;
            /** 场景是否进入栈顶 */
            _this.isEntryTopScene = false; // 用于先检测是否有新手引导 再检测是否需要弹出红包
            _this.total_login_time = zj.Game.Controller.LoginInterval * 60;
            _this.last_logintime = zj.Game.PlayerInfoSystem.BaseInfo.lastLoginTime;
            _this.skinName = "resource/skins/main/MainCitySceneNewSkin.exml";
            // this.isBackBG = false;
            // 面板上的按钮
            _this.imgRoleHead.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickRoleHead, _this);
            _this.btnAdventrue.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdventrue, _this);
            _this.imgSearchEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdventrue, _this);
            _this.btnBag.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBag, _this);
            _this.btnHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnHunter, _this);
            _this.btnCard.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCard, _this);
            _this.btnTask.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTask, _this);
            _this.btnLisence.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLisence, _this);
            _this.btnFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFriend, _this);
            _this.btnGift.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGift, _this);
            _this.btnMoon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMoon, _this);
            _this.btnActivity.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnActivity, _this);
            _this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnHelp, _this);
            _this.btnForum.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnForum, _this);
            _this.btnMail.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMail, _this);
            _this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChat, _this);
            _this.btnPet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPet, _this);
            _this.groupbtnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            _this.groupbtnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.groupbtnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddStrength, _this);
            _this.btnDebug.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDebug, _this);
            // this.btnLine.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLine, this);
            _this.btnMatch.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMatch, _this);
            _this.btnZorkBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnZorkBoss, _this);
            _this.groupLayerActivityBoss.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnActivityBoss, _this);
            _this.btnRandom.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRandom, _this);
            _this.groupXuyuan.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnXuyuan, _this);
            _this.btnJewel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnJewel, _this);
            _this.buttonRace.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonRace, _this);
            _this.btnVip.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnVip, _this);
            _this.btnStoryInstance.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnStoryInstance, _this);
            _this.btnAttention.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAttention, _this);
            _this.btnCollection.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCollection, _this);
            _this.btnNovice.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnNovice, _this);
            _this.btnBiography.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBiography, _this);
            _this.btnRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRecharge, _this);
            _this.btnNovice1.addEventListener(egret.TouchEvent.TOUCH_TAP, MainCitySceneNew.onBtnNovice1, _this);
            _this.btnSeven.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSevenGift, _this);
            _this.btnXinChang.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnXinChang, _this);
            _this.btnMysteryShop.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMysteryShop, _this);
            // this.btnNovice2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNovice2, this);
            // this.btnNovice3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNovice3, this);
            // this.btnNovice4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnNovice4, this);
            _this.btnMoney.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMoney, _this);
            _this.btnVIPLogin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnVIPLogin, _this);
            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => { this.groupCollectionOfTips.visible = false }, this)
            _this.groupOnlineGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOnlineGetAward, _this);
            _this.btnFuncOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFunOpenGetAward, _this);
            _this.btnBattlePass.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBattlePass, _this);
            _this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRank, _this);
            _this.groupWorkSend.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnWorkSend, _this);
            _this.btnDailyCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDailyCharge, _this);
            _this.groupLineChange.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLineChange, _this);
            _this.btnRedpackage.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRedpackage, _this);
            // 滑动屏上的按钮
            // this.btnDarkContinent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDarkContinent, this); // 黑暗大陆
            // this.btnGreedyIsland.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGreedyIsland, this); // 贪婪之岛
            // this.btnHunterCambatfield.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHunterCambatfield, this); // 格斗场
            // this.btnMeteorStreet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMeteorStreet, this); // 流星街
            // this.btnPub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPub, this); // 酒馆
            // this.btnShopingMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShopingMall, this); // 商店
            // this.btnSkyArena.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkyArena, this); // 天空竞技场
            // this.btnUnion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnion, this); // 公会
            _this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChat, _this); // 聊天历史记录  
            // 其他事件
            // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnd, this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddedToStage, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemovedFromStage, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_LINE_CHANGE, _this.updateServerLine, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LEVEL_UP, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.MAIN_CITY_UPDATE, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_DAILYFIRSTCHARGE, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, _this.updateTeach, _this);
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, _this.updateLoginTime, _this);
            zj.Game.EventManager.on(zj.GameEvent.REFRESH_MAINCITY_BUBBLE, _this.refreshBubble, _this);
            zj.Game.EventManager.on(zj.GameEvent.CHAT_RESTART, _this.InitChatList, _this);
            zj.Game.EventManager.on(zj.GameEvent.GET_LEVELUP_REWARD, _this.funOpenTip, _this);
            return _this;
        }
        MainCitySceneNew.prototype.init = function () {
            this.groupClear.visible = false;
            this.addBubble(); // 添加主线任务提示气泡
            // 方向键初始化
            this.walkControl.init(this);
            if (Main.isCurrencysMove()) {
                this.groupTR.right = 100;
            }
            if (zj.Device.isReviewSwitch) {
                if (zj.Util.isWxMiniGame()) {
                }
                else {
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
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.updateChatList, this);
            return;
        };
        MainCitySceneNew.prototype.updateChatList = function () {
            var _this = this;
            egret.setTimeout(function () {
                _this.InitChatList();
            }, this, 150);
        };
        MainCitySceneNew.prototype.onWalkStart = function () {
            this.ownerScene.onWalkStart();
        };
        MainCitySceneNew.prototype.onWalkEnd = function () {
            this.ownerScene.onWalkEnd();
        };
        MainCitySceneNew.prototype.isTouchWalk = function () {
            return this.walkControl.isTouch();
        };
        MainCitySceneNew.prototype.getWalkArc = function () {
            return this.walkControl.currArc();
        };
        MainCitySceneNew.prototype.isMapLock = function () {
            return this.ownerScene.sceneMap.isLockMap();
        };
        MainCitySceneNew.prototype.addBubble = function () {
            if (!zj.Device.isReviewSwitch) {
                this.bubble.SetMainMissionAfterLogin();
            }
            else {
                this.bubble.visible = false;
            }
        };
        // public onClose() {
        //     this.listBottomData.removeAll();
        //     this.messageHistoryChat.visible = false;
        // }
        MainCitySceneNew.prototype.addAnimations = function () {
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
        };
        MainCitySceneNew.prototype.CheckActivityBoss = function () {
            var _a = zj.Game.PlayerBossSystem.ActivityBossIsFive(), IsStart = _a[0], IsOver = _a[1], startTime = _a[2], overTime = _a[3];
            var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_ACTIVITY_BOSS];
            var _b = zj.Game.PlayerBossSystem.ActivityBossOpenTime(), Open = _b[0], time = _b[1];
            var a = zj.Game.PlayerInfoSystem.BaseInfo.level;
            var b = zj.PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_ACTIVITY_BOSS).condition;
            var c = zj.Game.PlayerBossSystem.GetBossActivityOpen();
            if (progress != null && zj.Game.PlayerInfoSystem.BaseInfo.level >= zj.PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_ACTIVITY_BOSS).condition && zj.Game.PlayerBossSystem.GetBossActivityOpen()) {
                if ((!Open && time <= 300) || Open || IsOver) {
                    this.groupLayerActivityBoss.visible = true;
                    this.SetBossTip();
                }
                else {
                    this.groupLayerActivityBoss.visible = false;
                }
            }
            else {
                this.groupLayerActivityBoss.visible = false;
            }
        };
        MainCitySceneNew.prototype.SetBossTip = function () {
            var _this = this;
            var _a = zj.Game.PlayerBossSystem.ActivityBossOpenTime(), Open = _a[0], time = _a[1];
            if (Open) {
                this.groupLayerActivityBoss.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, "hongbao", "armatureName", "000_hongbao", 0)
                    .then(function (display) {
                    display.anchorOffsetX = display.width / 2;
                    display.anchorOffsetY = display.height / 2;
                    display.x = display.width / 2;
                    display.y = display.height / 2;
                    _this.groupLayerActivityBoss.addChild(display);
                });
            }
            else {
                this.groupLayerActivityBoss.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, "hongbao", "armatureName", "001_mao", 0)
                    .then(function (display) {
                    display.anchorOffsetX = display.width / 2;
                    display.anchorOffsetY = display.height / 2;
                    display.x = _this.groupLayerActivityBoss.width / 2;
                    display.y = _this.groupLayerActivityBoss.height / 2;
                    _this.groupLayerActivityBoss.addChild(display);
                });
            }
        };
        /**
         * 简易聊天内容list列表
         */
        MainCitySceneNew.prototype.InitChatList = function () {
            var _this = this;
            this.listBottomData.removeAll();
            this.chatInfosMini = zj.Game.PlayerChatDataSystem.chatInfos;
            for (var i = 0; i < this.chatInfosMini.length; i++) {
                var v = this.chatInfosMini[i];
                var ChatItem = new zj.FormatChatItem();
                var content = zj.Game.PlayerChatDataSystem.GetChatInfo(v);
                if (zj.Chat_Main.checkLeagueChat(content))
                    continue;
                var lineNum = 1;
                if (content[0]) {
                    lineNum = zj.Game.PlayerChatDataSystem.getStrlineNum(zj.HelpUtil.textConfigFormat(content[0]), 322);
                }
                else {
                    lineNum = zj.Game.PlayerChatDataSystem.getStrlineNum(zj.HelpUtil.textConfigFormat(content[0] + content[1] + content[2]), 322);
                }
                if (lineNum == 1) {
                    if (v.type == 5 && v.content != "") {
                        ChatItem.itemNum = 42;
                    }
                    else {
                        ChatItem.itemNum = 20;
                    }
                }
                else {
                    ChatItem.itemNum = 42;
                }
                ChatItem.Data = v;
                this.listBottomData.addItem(ChatItem);
            }
            this.simpleChat.dataProvider = this.listBottomData;
            this.simpleChat.itemRenderer = zj.HXH_ChatItem;
            this.scrollBar.viewport = this.simpleChat;
            setTimeout(function () {
                if (_this.simpleChat.contentHeight < _this.scrollBar.height) {
                    _this.simpleChat.scrollV = 0;
                }
                else {
                    _this.simpleChat.scrollV = _this.simpleChat.contentHeight - _this.scrollBar.height;
                }
            }, 100);
        };
        /**探索完成提示缓动 */
        MainCitySceneNew.prototype.runAni = function () {
            var off = 5 + 2 * Math.random();
            var time = (1 + 0.5 * Math.random()) * 1000;
            var groupY = this.groupSearchEnd.y;
            if (Math.random() > 0.5) {
                egret.Tween.get(this.imgSearchEnd, { loop: true }).to({ y: this.imgSearchEnd.y - off }, time, egret.Ease.sineInOut).to({ y: this.imgSearchEnd.y + off }, time, egret.Ease.sineInOut).to({ y: groupY }, time, egret.Ease.sineInOut);
            }
            else {
                egret.Tween.get(this.imgSearchEnd, { loop: true }).to({ y: this.imgSearchEnd.y + off }, time, egret.Ease.sineInOut).to({ y: this.imgSearchEnd.y - off }, time, egret.Ease.sineInOut).to({ y: groupY }, time, egret.Ease.sineInOut);
            }
        };
        /** 红点-贪婪之岛 */
        MainCitySceneNew.prototype.checkRedPointGreedyIsland = function () {
            return zj.Tips.GetTipsOfId(zj.Tips.TAG.WONDERLAND);
        };
        /** 红点-工会 */
        MainCitySceneNew.prototype.checkRedPointUnion = function () {
            return zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE);
        };
        /** 红点-黑暗大陆 */
        MainCitySceneNew.prototype.checkRedPointShadeDrak = function () {
            return zj.Tips.GetTipsOfId(zj.Tips.TAG.DarkLand);
        };
        /** 红点-格斗场 */
        MainCitySceneNew.prototype.checkRedPointArena = function () {
            return zj.Tips.getTipsOfMail(message.MailType.MAIL_TYPE_LADDER)
                || zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.LADDER_MALL)
                || zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.LADDER_FIGHT)
                || zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, zj.Tips.TAG.CHARGE_CHALLENGE)
                || zj.Tips.getTipsOfMail(message.MailType.MAIL_TYPE_SINGLECRAFT);
        };
        /** 红点-天空竞技场 */
        MainCitySceneNew.prototype.checkRedPointSkyArean = function () {
            if (zj.PlayerTowerSystem.jump_floor()[0] || zj.PlayerTowerSystem.jumpHigh_floor()[0]) {
                return true;
            }
            return false;
        };
        /** 红点-流星街 */
        MainCitySceneNew.prototype.checkRedPointWantedSecond = function () {
            return zj.Game.PlayerInfoSystem.BaseInfo.wantedCoin > 0
                || zj.Game.PlayerInfoSystem.BaseInfo.arrestCoin > 0;
        };
        /** 红点-商店 */
        MainCitySceneNew.prototype.checkRedPointShopMall = function () {
            if (zj.Game.PlayerInfoSystem.Level < 5) {
                return false;
            }
            var COST_MALL = [
                message.EMallType.MALL_TYPE_ORDINARY,
                message.EMallType.MALL_TYPE_LADDER,
                message.EMallType.MALL_TYPE_LEAGUE,
                message.EMallType.MALL_TYPE_HONOR,
                message.EMallType.MALL_TYPE_LOTTERY,
            ];
            var count = zj.Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LEAGUE, "MALL");
            for (var i = 0; i < COST_MALL.length; i++) {
                if (zj.ShopMainType.GetTips(COST_MALL[i])) {
                    if (count <= 3 || COST_MALL[i] != message.EMallType.MALL_TYPE_LEAGUE) {
                        return true;
                    }
                }
            }
            return false;
        };
        /** 红点-执照 */
        MainCitySceneNew.prototype.checkRedPointLicense = function () {
            if (zj.Game.PlayerInfoSystem.Level < 10) {
                return false;
            }
            var infos = zj.TableMissionType.Table();
            for (var kk in infos) {
                if (infos.hasOwnProperty(kk)) {
                    var vv = infos[kk];
                    if (vv.type == message.MissionType.MISSION_TYPE_LICENCE) {
                        for (var dataindex = 0; dataindex < 7; ++dataindex) {
                            var list = zj.Game.PlayerMissionSystem.GetItemMissionId(vv.index);
                            var list_1 = zj.Game.PlayerMissionSystem.GetMaxCondition(vv.index);
                            var star = zj.Game.PlayerMissionSystem.GetMaxStar(vv.index);
                            var info = zj.Game.PlayerMissionSystem.missionMap[vv.index];
                            var starId = zj.Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
                            var tbl = zj.Game.PlayerMissionSystem.itemInfo(starId + dataindex);
                            var subId = zj.Game.PlayerMissionSystem.itemSubType(vv.index).sub_type;
                            var value = info.value;
                            var start = starId + dataindex;
                            var max = 0;
                            if (subId == 55) {
                                value = info.value % 10000;
                            }
                            else if (subId == 3) {
                                if (info.valueEx.length == 0) {
                                    value = 0;
                                }
                                else {
                                    var IsHave = void 0;
                                    for (var k in list) {
                                        if (list.hasOwnProperty(k)) {
                                            var v = list[k];
                                            IsHave = zj.Table.FindF(info.valueEx, function (k1, v1) {
                                                return v.condition == v1;
                                            });
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
                                    }
                                    else {
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
                            }
                            else if (value >= tbl.condition && info.missionId == start && dataindex <= star && info.isFinish == false) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        };
        // 更新界面各元素状态
        MainCitySceneNew.prototype.updateUIStates = function () {
            this.imgSearchEnd.visible = false;
            // this.imgFlagDarkContinent.visible = false; // 黑暗大陆标记
            // this.imgFlagGreedyIsland.visible = false; // 贪婪之岛标记
            // this.imgFlagHunterCambatfield.visible = false; // 格斗场标记
            // this.imgFlagMeteorStreet.visible = false; // 流星街标记
            // this.imgFlagPub.visible = false; // 酒馆标记
            // this.imgFlagShopingMall.visible = false; // 商店标记
            // this.imgFlagSkyArena.visible = false; // 天空竞技场标记
            // this.imgFlagUnion.visible = false; // 公会标记
            this.btnPet.visible = false; // 念兽
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
            var roleinfo = zj.Game.Controller.roleInfo();
            var header_pic_id = "" + zj.Game.PlayerInfoSystem.BaseInfo.picId;
            var header_pic_frame = "" + zj.Game.PlayerInfoSystem.BaseInfo.picFrameId;
            var item_pic = zj.TableItemPic.Item(header_pic_id);
            if (item_pic) {
                if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                    this.imgRoleHead.source = zj.cachekey("wx_" + item_pic.path, this);
                }
                else {
                    this.imgRoleHead.source = zj.cachekey(item_pic.path, this);
                }
            }
            //主场景几星猎人执照背景框
            if (zj.Game.PlayerMissionSystem.missionActive.licence == 0) {
                if (this.imgLicenseBackround.source != zj.UIConfig.UIConfig_Task.board[2]) {
                    this.imgLicenseBackround.source = zj.cachekey(zj.UIConfig.UIConfig_Task.board[2], this);
                }
            }
            else if (zj.Game.PlayerMissionSystem.missionActive.licence > zj.CommonConfig.licence_max_level) {
                if (this.imgLicenseBackround.source != zj.UIConfig.UIConfig_Task.board[3]) {
                    this.imgLicenseBackround.source = zj.cachekey(zj.UIConfig.UIConfig_Task.board[3], this);
                }
            }
            else {
                if (this.imgLicenseBackround.source != zj.UIConfig.UIConfig_Task.board[1]) {
                    this.imgLicenseBackround.source = zj.cachekey(zj.UIConfig.UIConfig_Task.board[1], this);
                }
            }
            //主场景经验条
            var level = zj.TableLevel.Item(zj.Game.PlayerInfoSystem.BaseInfo.level);
            this.imgExp.slideDuration = 0;
            this.imgExp.maximum = level.role_exp;
            this.imgExp.value = zj.Game.PlayerInfoSystem.BaseInfo.cur_exp;
            // this.imgExp.width = 166 * Game.PlayerInfoSystem.BaseInfo.cur_exp / level.role_exp;
            var item_frame = zj.TableItemPicFrame.Item(header_pic_frame);
            if (item_frame) {
                this.imgHeadFrame.source = zj.cachekey(item_frame.path, this);
            }
            this.imgLicense.source = zj.cachekey("ui_license_examination_WordsTitle" + zj.Game.PlayerInfoSystem.LecenceLevel + "_png", this);
            this.lbRoleName.text = zj.Util.cutString(zj.Game.PlayerInfoSystem.RoleName, 12);
            this.lbRoleLevel.text = zj.Game.PlayerInfoSystem.Level.toString();
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                if (((zj.Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.lbGold.text = ((zj.Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            if (this.lbGold.text.length > 6) {
                // this.lbGold.size = 12;
            }
            else {
                // this.lbGold.size = 16;
            }
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                if (((zj.Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((zj.Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            if (this.lbGemstone.text.length > 6) {
                // this.lbGemstone.size = 12;
            }
            else {
                // this.lbGemstone.size = 16;
            }
            var str = "";
            if (zj.Game.PlayerInfoSystem.Power > 100000) {
                if (((zj.Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((zj.Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                }
                else {
                    str += (zj.Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            }
            else {
                str += zj.Game.PlayerInfoSystem.Power.toString();
            }
            var str_energy = zj.Helper.StringFormat("%d/%d", str, zj.Game.PlayerInfoSystem.PowerMax);
            this.lbStrength.text = str_energy;
            if (this.lbStrength.text.length > 7) {
                // this.lbStrength.size = 12;
            }
            else {
                // this.lbStrength.size = 16;
            }
            //金币红点
            if (zj.Game.PlayerVIPSystem.vipInfo.buy_coin_free_time < zj.PlayerVIPSystem.LowItem().buy_coin_free_time) {
                this.imgFlagGold.visible = true;
            }
            else {
                this.imgFlagGold.visible = false;
            }
            this.imgFlagGemstone.visible = false;
            this.imgFlagStrength.visible = false;
            //首冲
            var bFirst = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward.length != Object.keys(zj.TableFirstCharge.Table()).length;
            var noCharge = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.old_chargeToken == 0;
            var info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
            var haveTime = info.info == 0 || info.leftTime > 0;
            this.groupFirst.visible = (bFirst && noCharge && haveTime);
            // 每日首充
            this.groupDailyCharge.visible = ((!zj.Game.PlayerInfoSystem.BaseInfo.is_chargeToday) || (zj.Game.PlayerInfoSystem.BaseInfo.is_chargeToday && !zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.is_rewardTodayPay));
            this.imgTipDailyCharge.visible = zj.Game.PlayerInfoSystem.BaseInfo.is_chargeToday && !zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.is_rewardTodayPay;
            var show = false;
            if (zj.Device.isDebug) {
                show = info.leftTime <= 3600 * 24 * 5 && info.leftTime > 0;
            }
            else {
                show = info.leftTime <= 3600 * 24 && info.leftTime > 0;
            }
            this.groupTimeFirst.visible = show;
            if (noCharge && info.leftTime > 0) {
                this.labelTimeFirst.textFlow = zj.Util.RichText(zj.PlayerGiftSystem.upToTime3(zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD].leftTime));
            }
            this.groupRecharge.visible = (info.info == 0);
            this.groupjueban.visible = (info.info == 1);
            //好友红点
            this.updateTipFriend();
            //猎人传记
            var strtime = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime - Math.floor(egret.getTimer() / 1000);
            var _data = zj.PlayerHunterSystem.Activity_Hero();
            var countBio = zj.Table.Count(_data, function (k, v) {
                return zj.Table.FindK(zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), _data[k].general_id) != -1 ? 1 : 0;
            });
            var a = countBio;
            // let bSeven = strtime > 0 && countBio < 6;
            // this.groupBiography.visible = bSeven;
            var bSeven = this.getCreateDay() <= 7;
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
            if (!zj.Device.isReviewSwitch) {
                this.setInfoGiftList();
            }
            else {
                this.offsideGrop.visible = false;
            }
            //VIP礼包
            var num = zj.Game.PlayerInfoSystem.BaseInfo.chargeToken;
            var num0 = zj.PlayerVIPSystem.WealItem(0).charge;
            var isHave = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, function (k, v) {
                return (v == 12);
            });
            if (zj.Game.PlayerInfoSystem.VipLevel <= 12 && !isHave) {
                this.groupNovice.visible = true;
            }
            else {
                this.groupNovice.visible = false;
            }
            // this.groupNovice.visible = Game.PlayerInfoSystem.BaseInfo.chargeToken >= PlayerVIPSystem.WealItem(0).charge;
            //娃娃机
            this.groupWawaji.visible = ((zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info != 0) && (!zj.Device.isReviewSwitch));
            //念兽(暂时关闭)
            this.btnPet.visible = false; //PlayerMissionSystem.FunOpenTo(FUNC.ADVISER, false) || PlayerAdviserSystem.Open();
            //许愿屋
            var timeXuYuan = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime;
            this.groupXuyuan.visible = timeXuYuan > 0 && new Date().getTime() < zj.Game.PlayerProgressesSystem.progressTime1057;
            // 猎人故事
            var status = zj.otherdb.checkOpenTransformAndActivityStatus();
            if (status == 1 || status == 2) {
                this.groupStoryInstance.visible = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.TRANSFORM);
            }
            else {
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
            zj.Tips.SetTipsOfId(zj.Tips.TAG.NOVICE, 1);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.NOVICE1, 1);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.NOVICE2, 1);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.NOVICEMAQI, 1);
            // Tips.tips_LowVip_set(Player.lowVipLevelNum)
            zj.Tips.SetTipsOfId(zj.Tips.TAG.NEWLOWGift, 1);
            //VIP礼包红点刷新
            // Tips.GetTipsOfId(Tips.TAG.NEWLOWGift, 1)
            this.setInfoTips(); //显示主城时刷新一下红点
            //新手狂欢
            var bReward = zj.Table.FindK(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, zj.TableEnum.Enum.TableNoviceMissionType[zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE - 1]) != -1;
            var bNovice = ((zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0) ||
                (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_ONE].leftTime > 0)) &&
                (!zj.Device.isReviewSwitch) && (!bReward);
            this.groupNovice1.visible = bNovice;
            //遗迹猎人特训 美食猎人特训 赏金猎人特训 契约猎人特训
            zj.Tips.SetTipsOfId(zj.Tips.TAG.WEEKMISSION, 1);
            this.groupMoney.visible = false;
            //信长礼包
            var xinchanginfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == 101507;
            })[0];
            if (xinchanginfo) {
                var tableinfo = zj.TableNewgiftItem.Item(101507);
                if (tableinfo && zj.Game.PlayerInfoSystem.BaseInfo.level >= 15 && xinchanginfo.buy_times == 0) {
                    // 开启时间
                    var lastTime = xinchanginfo.trigger_time + tableinfo.duration - zj.Game.Controller.curServerTime;
                    this.labelTimeXinChang.textFlow = zj.Util.RichText(zj.PlayerGiftSystem.upToTime3(lastTime));
                    this.groupXinChang.visible = true;
                }
                else {
                    this.groupXinChang.visible = false;
                }
            }
            else {
                this.groupXinChang.visible = false;
            }
            if (zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex != 0 && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.MISSIONWEEK, false) && zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_WEEK].leftTime == 0) {
                var leftTime = zj.Game.PlayerMissionSystem.missionActive.missionWeekStart + zj.Game.PlayerMissionSystem.itemMissionWeek(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex).duration * 3600 * 24 - zj.Game.Controller.curServerTime;
                var weekType = zj.Game.PlayerMissionSystem.itemMissionWeek(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex).week_mission_type;
                if (leftTime > 0 && !bSeven) {
                    this.groupMoney.visible = true;
                    var btnPath = zj.UIConfig.UIConfig_Activity.WeekMainButton[weekType];
                    zj.Set.ButtonBackgroud(this.btnMoney, btnPath[0], btnPath[1], btnPath[2]);
                }
            }
            // android.view.OrientationEventListener
            // 通行证角色创建7天以后显示
            this.groupBattlePass.visible = !bSeven;
            //收藏有礼
            var vis = true;
            for (var _i = 0, _a = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType; _i < _a.length; _i++) {
                var key = _a[_i];
                if (key == 10001) {
                    vis = false;
                }
            }
            this.groupCollection.visible = vis && zj.ActivityCollection.vis && ((zj.Util.isWxMiniGame() && egret.Capabilities.os == "Android") || (zj.ActivityCollection.myBrowser() == "Safari" && egret.Capabilities.os == "iOS") || (zj.ActivityCollection.myBrowser() == "micromessenger" && egret.Capabilities.os == "iOS") || egret.Capabilities.os == "iOS");
            //收藏有礼引导
            this.collectguidance();
            // 宝石收藏
            zj.Tips.SetTipsOfId(zj.Tips.TAG.Jewel, 1);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.Jewel, 2);
            this.groupJewel.visible = !bSeven && zj.PlayerJewelSystem.GetActivityIndex() != null && !zj.Device.isReviewSwitch;
            // 与时间赛跑
            var openIndex = zj.PlayerRaceSystem.GetActivityIndex();
            this.groupRace.visible = !bSeven && openIndex != null && !zj.Device.isReviewSwitch;
            if (openIndex != null && this.imgTip54.visible == false && !this.ReCheckRaceTips) {
                this.ReCheckRaceTips = true;
                zj.Tips.SetTipsOfId(zj.Tips.TAG.RACE, zj.Tips.TAG.RACEDAY);
            }
            if (zj.PlayerInstanceSystem.RandInfoVis) {
                this.imgTipRand.visible = true;
            }
            else {
                this.imgTipRand.visible = false;
            }
            // 星耀福利
            this.groupVip.visible = zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= zj.PlayerVIPSystem.WealItem(0).charge;
            this.imgTip55.visible = zj.Tips.GetTipsOfId(55);
            this.btnCard.visible = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO);
            this.FreshSearchInstance();
            //福利红点
            var vis1 = function (num) {
                var info = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                    return v.gift_index == num;
                })[0];
                if (info) {
                    if (zj.PlayerGiftSystem.getNextLevel(info)) {
                        return zj.PlayerGiftSystem.getNextLevel(info) <= zj.Game.PlayerInfoSystem.BaseInfo.level && info.buy_times != 0;
                    }
                }
                else {
                    return false;
                }
            };
            var vis2 = function () {
                var table = zj.TableContinuePay.Table();
                var _loop_1 = function (i) {
                    var info_1 = zj.TableContinuePay.Item(i);
                    var vis_1 = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.pay_reward, function (k, v) {
                        return v == info_1.id;
                    });
                    if (info_1.id == zj.Game.PlayerInfoSystem.BaseInfo.pay_day && !vis_1) {
                        return { value: true };
                    }
                };
                for (var i = 1; i <= Object.keys(table).length; i++) {
                    var state_1 = _loop_1(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                return false;
            };
            this.imgTip52.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.AWARD, 1)
                || zj.Tips.GetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_GETPOWER)
                || zj.Tips.GetTipsOfId(zj.Tips.TAG.SPECIAL, zj.Tips.TAG.SPECIAL_GATAWARD)
                || zj.Tips.FUNC[zj.Tips.TAG.SPECIAL][2]()
                || vis1(100302)
                || vis1(100303)
                || vis2();
            // 公会战
            if (zj.Game.PlayerInfoSystem.BaseInfo != null && zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0 && zj.Game.PlayerLeagueSystem.BaseInfo != null && zj.Game.PlayerLeagueSystem.BaseInfo.match_join && zj.PlayerLeagueSystem.IsTimeInBattle()) {
                this.groupMatch.visible = true;
                this.groupMatch.scaleY = 1;
            }
            else {
                this.groupMatch.visible = false;
                this.groupMatch.scaleY = 0;
            }
            this.checkZorkBoss();
            if (zj.Device.isReviewSwitch) {
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
            if (zj.Util.isDisabledPay()) {
                this.btnGift.visible = false;
            }
            this.Chat_MainCB();
            this.funOpenTip();
            // 暂时关闭的功能
            this.groupVIPLogin.visible = false;
            var rankInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];
            this.groupRank.visible = rankInfo != null && zj.Game.Controller.curServerTime > rankInfo.openTime && zj.Game.Controller.curServerTime < rankInfo.closeTime;
            // 线路
            this.updateServerLine();
            this.updateActGroups();
            // banner刷新
            if (this.banner) {
                this.banner.updateUIStates();
            }
        };
        MainCitySceneNew.prototype.updateTipFriend = function () {
            var self = this;
            var vis = false;
            for (var i = 0; i < zj.PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_FRIEND, zj.PlayerRelateSystemSORT.MAIN).length; i++) {
                var relation = zj.PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_FRIEND, zj.PlayerRelateSystemSORT.MAIN)[i];
                if (relation.canReward && relation.isReward == false) {
                    vis = true;
                    i = zj.PlayerRelateSystem.Map(message.ERelationType.RELATION_TYPE_FRIEND, zj.PlayerRelateSystemSORT.MAIN).length;
                    break;
                }
            }
            zj.PlayerRelateSystem.RelationApplyListReq()
                .then(function (data) {
                self.imgTip2_9.visible = zj.Game.PlayerRelateSystem.TipFirend || vis;
            });
        };
        MainCitySceneNew.prototype.updateServerLine = function () {
            this.groupLineChange.visible = zj.Game.PlayerInfoSystem.IsAgreeEnter;
            this.labelLine.text = zj.LineChangeDialog.getLineName(zj.Game.PlayerWonderLandSystem.serverSceneId) + "线";
        };
        MainCitySceneNew.prototype.updateActGroups = function () {
            var dis = 72;
            // icon位置调整
            var groups = [];
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
            var count = 0;
            for (var i = 0; i < groups.length; i++) {
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
            for (var i = 0; i < groups.length; i++) {
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
        };
        /**探索完成提示 */
        MainCitySceneNew.prototype.FreshSearchInstance = function () {
            try {
                var statusList = zj.Game.PlayerInstanceSystem.GetAreaSearchStatus();
                for (var i = 0; i < 9; i++) {
                    if (statusList[i] == true) {
                        this.imgSearchEnd.visible = true;
                        break;
                    }
                }
            }
            catch (e) {
                egret.error("MainCitySceneNew - FreshSearchInstance - error: " + e);
            }
        };
        MainCitySceneNew.prototype.onTouchBegin = function (evt) {
            this.groupCollectionOfTips.visible = false; //将收藏引导去掉
            zj.ActivityCollection.guidance = false;
        };
        MainCitySceneNew.prototype.onTouchMove = function (evt) {
        };
        MainCitySceneNew.prototype.onTouchEnd = function (evt) {
        };
        MainCitySceneNew.prototype.onAddedToStage = function () {
            this.addAnimations();
            zj.cachekey("ui_mainui_BgMaoboli_png", this);
            zj.cachekey("ui_login_boardloading_kulapika_jpg", this);
            zj.cachekey("ui_login_boardloading_kuluoluo_jpg", this);
            zj.cachekey("ui_login_boardloading_niteluo_jpg", this);
            zj.cachekey("ui_login_boardloading_qiya_jpg", this);
            zj.cachekey("ui_login_boardloading_wang_jpg", this);
            zj.cachekey("ui_login_boardloading_xiaodi_jpg", this);
            zj.cachekey("ui_login_boardloading_xiaojie_jpg", this);
            zj.cachekey("ui_login_boardloading_xisuo_jpg", this);
            zj.cachekey("ui_login_boardloading_yiermi_jpg", this);
            zj.cachekey("jg_zhaomu_tex_png", this);
            zj.cachekey("jg_zhaomu_large_tex_png", this);
            // 断线重连
            zj.cachekey("ui_common_BoardServerPopTip_png", this);
            zj.cachekey("ui_common_ButtonServerAgainLinkNor_png", this);
            zj.cachekey("ui_common_ButtonServerAgainLinkSel_png", this);
            zj.cachekey("ui_common_ButtonServerReturnEnterNor_png", this);
            zj.cachekey("ui_common_ButtonServerReturnEnterSel_png", this);
        };
        MainCitySceneNew.prototype.onRemovedFromStage = function () {
            zj.Game.EventManager.off(zj.GameEvent.SERVER_LINE_CHANGE, this.updateServerLine, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_LEVEL_UP, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.MAIN_CITY_UPDATE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.CLOSE_DAILYFIRSTCHARGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.NET_SERVER_CONNECTED, this.updateTeach, this);
            zj.Game.EventManager.off(zj.GameEvent.REFRESH_MAINCITY_BUBBLE, this.refreshBubble, this);
            zj.Game.EventManager.off(zj.GameEvent.CHAT_RESTART, this.InitChatList, this);
            zj.Game.EventManager.off(zj.GameEvent.GET_LEVELUP_REWARD, this.funOpenTip, this);
            zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.updateChatList, this);
            this.stopInterval();
        };
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
        MainCitySceneNew.prototype.onEntryTopDialog = function () {
            // this.timeFun();
            if (zj.Teach.m_bOpenTeach && zj.Teach.teachingNow == false && zj.Teach.isDone(zj.teachBattle.teachPartID_Friend)) {
                if (!zj.Teach.isDone(zj.teachBattle.teachPartID_First_Charge)) {
                    zj.Teach.SetTeachPart(zj.teachBattle.teachPartID_First_Charge);
                }
                else if (!zj.Teach.isDone(zj.teachBattle.teachPartID_GiftBag)) {
                    // Game.EventManager.event(GameEvent.START_NEW_TEACHING, {curPart: 8025});
                }
            }
            if (zj.Teach.isDone(3005) && !zj.Teach.isDone(zj.teachBattle.teachPartID_Friend)) {
                zj.Teach.SetTeachPart(zj.teachBattle.teachPartID_Friend);
            }
            zj.Teach.checkTeachId();
            this.isEntryTopScene = true;
            if (this.groupRedpackage.visible)
                this.showRedpackage();
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
            if (zj.Game.SoundManager.CurMusicName == "city_mp3") {
                zj.Game.SoundManager.resumeMusic();
            }
            else {
                zj.Game.SoundManager.playMusic("city_mp3", 0);
            }
            this.updateUIStates();
            zj.Teach.bFirstTeachUpdata = true;
            zj.TeachSystem.nodeOrStageID = null;
            if (zj.Game.TeachSystem.curPart == -1) {
                zj.Teach.bFirstTeachUpdata = true;
            }
            if (!zj.Device.isReviewSwitch) {
                this.bubble.SetMainMissionOnComeBack();
            }
            this.startInterval();
        };
        // 场景离开栈顶
        // 1. 从舞台移除
        // 2. 压入新场景
        //     this.onLeaveTopDialog();
        // public onLeaveTopScene(){
        // }
        MainCitySceneNew.prototype.onLeaveTopDialog = function () {
            this.stopInterval();
            this.isEntryTopScene = false;
            //Game.SoundManager.pauseMusic();
        };
        MainCitySceneNew.prototype.startInterval = function () {
            if (this.update == -1) {
                this.update = egret.setInterval(this.setInfoTips, this, 1000);
            }
        };
        MainCitySceneNew.prototype.stopInterval = function () {
            egret.clearInterval(this.update);
            this.update = -1;
            // window.location.search = null;
            // window.history.pushState({}, "0", window.location.href);
        };
        MainCitySceneNew.prototype.onClickRoleHead = function () {
            // toast_warning("玩家信息功能未开启");
            zj.loadUI(zj.userMainSense)
                .then(function (scene) {
                zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30001), 100);
                scene.show();
            });
        };
        MainCitySceneNew.prototype.onBtnAdventrue = function () {
            // SceneManager.instance.EnterAdventure();
            zj.PlayerInstanceSystem.RandInfoVis = false;
            this.ownerScene.EnterAdventure();
        };
        MainCitySceneNew.prototype.onBtnBag = function () {
            zj.loadUI(zj.PackageMainScene)
                .then(function (scene) {
                zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30001), 100);
                scene.show();
            });
        };
        MainCitySceneNew.prototype.onBtnHunter = function () {
            zj.loadUI(zj.HunterMainScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnCard = function () {
            zj.loadUI(zj.CardMainScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnTask = function () {
            // toast_warning("日常功能未开启");
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DAILY, true)) {
                zj.loadUI(zj.Daily_Main)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                });
            }
        };
        // private onBtnLine() {
        // loadUI(HXH_GrowUp)
        //     .then((dialog: HXH_GrowUp) => {
        //         dialog.show(UI.SHOW_FILL_OUT);
        //     });
        // if (!Device.isReviewSwitch) {
        //     this.bubble.SetMainMissionOnComeBack(); // 刷新主线任务提示
        // }
        // }
        MainCitySceneNew.prototype.onBtnMatch = function () {
            zj.loadUI(zj.LeagueUnionBattleMain)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init();
            });
        };
        MainCitySceneNew.prototype.onBtnZorkBoss = function () {
            var _this = this;
            zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(zj.TextsConfig.TextsConfig_WonderlandBoss.boss_tips_city);
                dialog.setCB(_this.goZorkBoss);
            });
        };
        MainCitySceneNew.prototype.onBtnActivityBoss = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ACTIVITYBOSS, true)) {
                zj.Game.PlayerBossSystem.darklandBossScoreRank().then(function () {
                    zj.loadUI(zj.Activity_BossMainPop)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.init();
                    });
                }).catch(function (reason) {
                    zj.toast(reason);
                });
            }
        };
        MainCitySceneNew.prototype.goZorkBoss = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.BOSS, true)) {
                zj.Game.PlayerZorkSystem.bossInfo().then(function () {
                    // Game.PlayerZorkSystem.bossEntry(0, 0).then(() => {
                    //     Tips.tips_45_1_setread(true);
                    //     Tips.SetTipsOfId(Tips.TAG.ZORK, 2);
                    // }).catch((result) => {
                    //     if (result == message.EC.XG_SCENE_BOSS_DEAD) {
                    zj.loadUI(zj.ZorkBossMainPop).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                    // }
                    // })
                });
            }
        };
        MainCitySceneNew.prototype.checkZorkBoss = function () {
            var _this = this;
            this.groupZorkBoss.visible = false;
            zj.Game.PlayerZorkSystem.bossInfo().then(function () {
                // 评审版
                if (zj.Device.isReviewSwitch) {
                    _this.groupZorkBoss.visible = false;
                    _this.groupTop.visible = false;
                    _this.groupTop1.visible = false;
                }
                else {
                    var bossDied = false;
                    if (zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre != null) {
                        bossDied = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre == 0;
                    }
                    var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
                    if (progress && zj.Game.PlayerInfoSystem.BaseInfo.level >= zj.PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS).condition) {
                        var visible = _this.groupZorkBoss.visible;
                        if (progress.info > 0) {
                            if (!bossDied) {
                                if (visible == false) {
                                    _this.groupZorkBoss.visible = true;
                                }
                            }
                            else {
                                if (visible) {
                                    _this.groupZorkBoss.visible = false;
                                }
                            }
                        }
                        else {
                            if (visible == true) {
                                _this.groupZorkBoss.visible = false;
                            }
                        }
                        if (_this.groupZorkBoss.visible) {
                            _this.labelZorkBossTime.text = zj.Helper.GetTimeStr(progress.leftTime > 0 ? progress.leftTime : 0, false);
                        }
                    }
                }
                if (_this.groupZorkBoss.visible) {
                    _this.groupZorkBoss.scaleY = 1;
                }
                else {
                    _this.groupZorkBoss.scaleY = 0;
                }
            });
        };
        MainCitySceneNew.prototype.onBtnRandom = function () {
            // 扭蛋机
            if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.Rank_Charge.over);
                return;
            }
            this.QueryIntegralReqBody_Visit()
                .then(function (data) {
                zj.loadUI(zj.Activity_RandomBoomSence)
                    .then(function (scene) {
                    scene.Init();
                    scene.show(zj.UI.SHOW_FILL_OUT);
                });
            }).catch(function (reason) { });
        };
        MainCitySceneNew.prototype.onBtnXuyuan = function () {
            //许愿屋
            // let any = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime;
            if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].leftTime == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.Rank_Charge.over);
                return;
            }
            this.QueryIntegralReqBody_Visit()
                .then(function (data) {
                zj.loadUI(zj.ActivityXuyuanBoom)
                    .then(function (scene) {
                    scene.Init();
                    scene.show(zj.UI.SHOW_FILL_OUT);
                });
            }).catch(function (reason) { });
        };
        MainCitySceneNew.prototype.onBtnNovice = function () {
            //VIP礼包
            zj.loadUI(zj.VipLowGift)
                .then(function (scene) {
                scene.init();
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnBiography = function () {
            //猎人传记
            zj.loadUI(zj.Biography)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        MainCitySceneNew.prototype.onBtnRecharge = function () {
            //首充
            zj.loadUI(zj.HXH_FirstChargeMainNew)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        MainCitySceneNew.prototype.onBtnDailyCharge = function () {
            //首充
            zj.loadUI(zj.Activity_DailyFirstCharge)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        MainCitySceneNew.prototype.onBtnLineChange = function () {
            zj.loadUI(zj.LineChangeDialog)
                .then(function (dialog) {
                dialog.Init();
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        MainCitySceneNew.prototype.onBtnRedpackage = function () {
            var info = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RED_PACKET;
            })[0];
            var time = zj.Game.Controller.Activity_redpackage_countdown - zj.Game.Controller.curServerTime;
            if (info != null && zj.Game.Controller.curServerTime > info.openTime && zj.Game.Controller.curServerTime < info.closeTime && time > 0) {
                zj.loadUI(zj.Activity_redWarsDialogMain).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_success("活动未开启!");
            }
        };
        MainCitySceneNew.onBtnNovice1 = function (a, time) {
            var _this = this;
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
                egret.Tween.get(this).wait(time).call(function () {
                    egret.Tween.removeTweens(_this);
                    zj.loadUI(zj.ActivityNovice)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.setType(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL);
                    });
                });
            }
            else {
                zj.loadUI(zj.ActivityNovice)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.setType(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL);
                });
            }
            // }
        };
        MainCitySceneNew.prototype.onBtnNovice2 = function () {
            //高手进阶1
            // loadUI(ActivityNoviceHigh)
            //     .then((scene: ActivityNoviceHigh) => {
            //         scene.show(UI.SHOW_FROM_TOP);
            //         scene.setType(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_TWO);
            //     });
        };
        MainCitySceneNew.prototype.onBtnNovice3 = function () {
            //高手进阶2
            // loadUI(ActivityNoviceHighNext)
            //     .then((scene: ActivityNoviceHighNext) => {
            //         scene.show(UI.SHOW_FROM_TOP);
            //         scene.setType(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_MAQI);
            //     });
        };
        MainCitySceneNew.prototype.onBtnNovice4 = function () {
            //高手进阶3
            // loadUI(ActivityNoviceHighNext)
            //     .then((scene: ActivityNoviceHighNext) => {
            //         scene.show(UI.SHOW_FROM_TOP);
            //         scene.setType(TableEnum.Enum.TableEnumNoviceIndex.NOVICE_KUBI);
            //     });
        };
        MainCitySceneNew.prototype.onBtnMoney = function () {
            //遗迹猎人特训 美食猎人特训 赏金猎人特训 契约猎人特训
            var weekType = zj.Game.PlayerMissionSystem.itemMissionWeek(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex).week_mission_type;
            if (zj.TableEnum.Enum.WeekMissionTypeUI[weekType - 1] == null) {
                return;
            }
            var type;
            switch (weekType) {
                case 1:
                    zj.loadUI(zj.ActivityWeekMissionOne)
                        .then(function (scene) {
                        scene.SetType(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                    break;
                case 2:
                    zj.loadUI(zj.ActivityWeekMissionTwo)
                        .then(function (scene) {
                        scene.SetType(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                    break;
                case 3:
                    zj.loadUI(zj.ActivityWeekMissionThree)
                        .then(function (scene) {
                        scene.SetType(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                    break;
                case 4:
                    zj.loadUI(zj.ActivityWeekMission)
                        .then(function (scene) {
                        scene.SetType(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                    break;
            }
        };
        /**登录送VIP */
        MainCitySceneNew.prototype.onBtnVIPLogin = function () {
            // loadUI(VipLoginGet)
            //     .then((dialog: VipLoginGet) => {
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
        };
        MainCitySceneNew.prototype.onBtnLisence = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.LICENSE, true)) {
                zj.loadUI(zj.licenseMain)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        MainCitySceneNew.prototype.onBtnFriend = function () {
            // toast_warning("社交功能未开启");
            zj.loadUI(zj.Friend_MainFriendSence)
                .then(function (scene) {
                scene.init();
                scene.show();
            });
        };
        MainCitySceneNew.prototype.onBtnGift = function () {
            // toast_warning("商城功能未开启");
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        };
        MainCitySceneNew.prototype.onBtnMoon = function () {
            // toast_warning("福利功能未开启");
            zj.loadUI(zj.ActivitySpecialMainScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnActivity = function () {
            // toast_warning("活动功能未开启");
            zj.Game.PlayerActivitySystem.queryActivitysReward(message.ActivityType.ACT_TYPE_NONO).then(function (resp) {
                zj.Tips.SetTipsOfAllActivity;
                zj.loadUI(zj.ActivityMain)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            });
        };
        MainCitySceneNew.prototype.onBtnHelp = function () {
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
        };
        MainCitySceneNew.prototype.onBtnOnlineGetAward = function () {
            zj.loadUI(zj.Activity_OnlineGetAwards)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        MainCitySceneNew.prototype.onBtnFunOpenGetAward = function () {
            zj.loadUI(zj.Activity_FunOpen)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        MainCitySceneNew.prototype.onBtnBattlePass = function () {
            zj.loadUI(zj.HXH_BattlePass).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnRank = function () {
            var info = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];
            if (info != null && zj.Game.Controller.curServerTime > info.openTime && zj.Game.Controller.curServerTime < info.closeTime) {
                zj.loadUI(zj.Activity_RanklistMain).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_success("活动未开启!");
            }
        };
        MainCitySceneNew.prototype.onBtnWorkSend = function () {
            // loadUI(WorkSendMain).then((dialog: WorkSendMain) => {
            //     dialog.show(UI.SHOW_FROM_TOP);
            // });
            zj.loadUI(zj.HXH_BattlePass).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnForum = function () {
            zj.toast_warning("社区功能未开启");
        };
        //猎人故事
        MainCitySceneNew.prototype.onBtnStoryInstance = function () {
            zj.loadUI(zj.HunterTransformMainSence)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnAttention = function () {
            // 关注微信
            zj.loadUI(zj.AttentionGiftDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**收藏有礼 */
        MainCitySceneNew.prototype.onBtnCollection = function () {
            zj.loadUI(zj.ActivityCollection)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnMail = function () {
            // toast_warning("邮件功能未开启");
            zj.loadUI(zj.Mail_Main)
                .then(function (scene) {
                scene.show();
                zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30001), 100);
                scene.init();
            });
        };
        MainCitySceneNew.prototype.onBtnChat = function () {
            var _this = this;
            //toast_warning("聊天功能未开启");
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30001), 100);
                dialog.CB(function () {
                    _this.Chat_MainCB();
                });
                dialog.show();
            });
        };
        MainCitySceneNew.prototype.Chat_MainCB = function () {
            var vis = zj.Device.GetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + "imgvisible");
            if (vis == -1) {
                zj.Device.SetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + "imgvisible", true);
            }
            if (zj.Device.GetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + "imgvisible") == true) {
                this.btnChat.visible = false;
                this.messageHistoryChat.visible = true;
            }
            else {
                this.btnChat.visible = true;
                this.messageHistoryChat.visible = false;
            }
        };
        MainCitySceneNew.prototype.onBtnPet = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER, false) || zj.PlayerAdviserSystem.Open()) {
                zj.loadUI(zj.PetMainScene)
                    .then(function (dialog) {
                    dialog.inIt(1);
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                });
            }
        };
        //添加金币
        MainCitySceneNew.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList(true);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnAddGemstone = function () {
            // toast_success("加钻石功能未开启");
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        };
        MainCitySceneNew.prototype.onBtnAddStrength = function () {
            //增加体力
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        MainCitySceneNew.prototype.onBtnDebug = function () {
            // egret.localStorage.clear();
            // platform.restart();
            // return;
            zj.loadUI(zj.DebugDialog)
                .then(function (dialog) {
                dialog.show();
            });
        };
        MainCitySceneNew.prototype.clearActivity = function () {
            this.groupActLeft.visible = false;
            this.groupActRight.visible = false;
            this.topShadow.visible = true;
        };
        MainCitySceneNew.prototype.openActivity = function () {
            this.groupActLeft.visible = true;
            this.groupActRight.visible = true;
            this.topShadow.visible = false;
        };
        MainCitySceneNew.prototype.initTouchTitle = function (touchTitles) {
            this.touchTitles = [];
            for (var i in touchTitles) {
                var item = touchTitles[i];
                this.touchTitles.push(item);
                var redFunc = null;
                var redObj = this;
                switch (zj.MainCityTouchTitle.getFuncIdx(item.type)) {
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
        };
        MainCitySceneNew.prototype.initBanner = function (banner) {
            if (this.banner) {
                if (this.banner.parent) {
                    this.banner.parent.removeChild(this.banner);
                }
                this.banner = null;
            }
            this.banner = banner;
            // this.banner.init();
            this.banner.updateUIStates();
        };
        MainCitySceneNew.prototype.refreshTouchTitle = function () {
            if (this.touchTitles) {
                for (var i = this.touchTitles.length - 1; i >= 0; --i) {
                    this.touchTitles[i].refreshState();
                }
            }
        };
        MainCitySceneNew.prototype.getTouchTitle = function (type) {
            if (this.touchTitles) {
                for (var i = this.touchTitles.length - 1; i >= 0; --i) {
                    if (type == this.touchTitles[i].type) {
                        return this.touchTitles[i];
                    }
                }
            }
            return null;
        };
        MainCitySceneNew.prototype.onTouchGroup = function (item, touchType) {
            this.ownerScene.sceneMap.onTouchGroup(item, touchType);
        };
        MainCitySceneNew.prototype.toJump = function (type) {
            // this.btnDarkContinent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDarkContinent, this); // 黑暗大陆
            // this.btnGreedyIsland.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGreedyIsland, this); // 贪婪之岛
            // this.btnHunterCambatfield.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHunterCambatfield, this); // 格斗场
            // this.btnMeteorStreet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMeteorStreet, this); // 流星街
            // this.btnPub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPub, this); // 酒馆
            // this.btnShopingMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShopingMall, this); // 商店
            // this.btnSkyArena.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkyArena, this); // 天空竞技场
            // this.btnUnion.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnion, this); // 公会
            var title = this.getTouchTitle(type);
            if (!title.refreshState(true)) {
                return;
            }
            switch (zj.MainCityTouchTitle.getFuncIdx(type)) {
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
        };
        // 黑暗大陆
        MainCitySceneNew.prototype.onBtnDarkContinent = function () {
            zj.loadUI(zj.DarkLandHomeScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        // 贪婪之岛
        MainCitySceneNew.prototype.onBtnGreedyIsland = function () {
            zj.SceneManager.instance.EnterSceneZorkBoss();
        };
        // 格斗场
        MainCitySceneNew.prototype.onBtnHunterCambatfield = function () {
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                zj.loadUI(zj.ArenaLadder).then(function (dialog) {
                    zj.Game.PlayerArenaSystem.ladderList(false).then(function (data) {
                        dialog.setInfo(data, function () { });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                });
            }
            else {
                zj.loadUI(zj.ArenaMainScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        // 流星街
        MainCitySceneNew.prototype.onBtnMeteorStreet = function () {
            zj.loadUI(zj.WantedSecondMeteorstanceScene)
                .then(function (scene) {
                scene.Init(1);
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        // 酒馆
        MainCitySceneNew.prototype.onBtnPub = function () {
            zj.loadUI(zj.TavernScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FILL_OUT);
                scene.nPCDialog();
            });
        };
        // 商店
        MainCitySceneNew.prototype.onBtnShopingMall = function () {
            zj.loadUI(zj.ShopMallDialog)
                .then(function (scene) {
                scene.load(1, true);
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        // 天空竞技场
        MainCitySceneNew.prototype.onBtnSkyArena = function () {
            zj.loadUI(zj.SkyAreanMainScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.Init();
            });
        };
        // 公会
        MainCitySceneNew.prototype.onBtnUnion = function () {
            if (zj.Game.PlayerInfoSystem.LeagueId == 0) {
                zj.loadUI(zj.LeagueChooseScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.init();
                });
            }
            else {
                zj.loadUI(zj.LeagueHomeScene)
                    .then(function (scene) {
                    scene.init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        // 宝石收藏
        MainCitySceneNew.prototype.onBtnJewel = function () {
            zj.loadUI(zj.ActivityJewelCollectionSence)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                // scene.Init();
            });
        };
        //时间竞速
        MainCitySceneNew.prototype.onButtonRace = function () {
            zj.loadUI(zj.ActivityTimeRaceMain)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                // scene.Init();
            });
        };
        // 星耀福利
        MainCitySceneNew.prototype.onBtnVip = function () {
            zj.loadUI(zj.VipMain)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        //扭蛋机
        MainCitySceneNew.prototype.QueryIntegralReqBody_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QueryIntegralRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    zj.Game.PlayerRelateSystem.relationInfo();
                    zj.Game.PlayerRelateSystem.givepower();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        MainCitySceneNew.prototype.updateMysteryShop = function () {
            var activityInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
            })[0];
            if (activityInfo == null) {
                return;
            }
            // 开启时间
            var lastTime = activityInfo.closeTime - zj.Game.Controller.curServerTime;
            this.labelTimeMysteryShop.textFlow = zj.Util.RichText(zj.PlayerGiftSystem.upToTime3(lastTime));
            this.imgTipMysteryShop.visible = false;
        };
        // 右侧礼包
        MainCitySceneNew.prototype.setInfoGiftList = function () {
            if (zj.Util.isDisabledPay()) {
                return;
            }
            var form5 = [];
            var secretMalls = zj.otherdb.GetSecretMallInfo();
            var gifts = zj.PlayerGiftSystem.ShowInCity();
            var pushingGifts = zj.PlayerGiftSystem.ShowInCityByPushing();
            var otherGifts = zj.PlayerGiftSystem.ShowInCityOther();
            // 神秘商店放到活动列表里
            if (secretMalls.length > 0) {
                //     let currentInfo = secretMalls;
                //     currentInfo["name"] = "secretMall";
                //     form5.push(currentInfo);
                this.updateMysteryShop();
                this.groupMysteryShop.visible = true;
            }
            else {
                this.groupMysteryShop.visible = false;
            }
            for (var _i = 0, pushingGifts_1 = pushingGifts; _i < pushingGifts_1.length; _i++) {
                var v = pushingGifts_1[_i];
                var currentInfo = zj.Table.DeepCopy(v);
                currentInfo["name"] = "pushingGift";
                form5.push(currentInfo);
            }
            for (var _a = 0, gifts_1 = gifts; _a < gifts_1.length; _a++) {
                var v = gifts_1[_a];
                var currentInfo = zj.Table.DeepCopy(v);
                currentInfo["name"] = "doubleGift";
                form5.push(currentInfo);
            }
            for (var _b = 0, otherGifts_1 = otherGifts; _b < otherGifts_1.length; _b++) {
                var v = otherGifts_1[_b];
                var currentInfo = zj.Table.DeepCopy(v);
                currentInfo["name"] = "otherGift";
                form5.push(currentInfo);
            }
            var newGift = zj.PlayerGiftSystem.CurNewGift();
            for (var _c = 0, newGift_1 = newGift; _c < newGift_1.length; _c++) {
                var v = newGift_1[_c];
                var currentInfo = zj.Table.DeepCopy(v);
                currentInfo["name"] = "monthGift";
                form5.push(currentInfo);
            }
            this.imgBoardGift.visible = (form5.length > 0);
            var arrCollection = new eui.ArrayCollection();
            for (var k in form5) {
                arrCollection.addItem({ index: Number(k) + 1, info: form5[k], father: this });
            }
            this.lstGift.dataProvider = arrCollection;
            this.lstGift.itemRenderer = zj.MainCityGiftItem;
            var bSeven = this.getCreateDay() <= 7;
            this.groupSeven.visible = bSeven || zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length < 7;
            // if (bSeven) {
            //     let currentInfo = { name: "seven" };
            //     form5.push(currentInfo);
            // }
        };
        // 创建角色的天数
        MainCitySceneNew.prototype.getCreateDay = function () {
            return zj.Helper.getDayIdx(zj.Game.PlayerInfoSystem.BaseInfo.createTime * 1000, zj.Game.Controller.curServerTime * 1000);
            // return Math.floor((Game.Controller.curServerTime - Game.PlayerInfoSystem.BaseInfo.createTime) / 86400) + 1;
        };
        /**信长礼包 */
        MainCitySceneNew.prototype.onBtnXinChang = function () {
            zj.loadUI(zj.Activity_HunterGift)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /** 神秘商店 */
        MainCitySceneNew.prototype.onBtnMysteryShop = function () {
            zj.loadUI(zj.PublicGift)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        MainCitySceneNew.prototype.onSevenGift = function () {
            zj.loadUI(zj.ActivityHappySeven)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                // scene.init();
            });
        };
        MainCitySceneNew.prototype.setInfoTips = function (args) {
            this.collectguidance(); //检测有收藏有礼引导时屏幕旋转
            for (var id = zj.Tips.TAG.MIN; id < zj.Tips.TAG.MAX; ++id) {
                if (id == 52) {
                    continue;
                }
                if (this["imgTip" + id] != null) {
                    if (!zj.Device.isReviewSwitch) {
                        this["imgTip" + id].visible = zj.Tips.GetTipsOfId(id);
                    }
                    else {
                        if (id == 53 || id == 50 || id == 22 || id == 28 || id == 47 || id == 49) {
                            this["imgTip" + id].visible = false;
                        }
                        else {
                            //let any = Tips.GetTipsOfId(id);
                            this["imgTip" + id].visible = zj.Tips.GetTipsOfId(id);
                        }
                    }
                }
            }
            this.imgTip28.visible = false; // 念兽红点暂时关闭
            if (!zj.Device.isReviewSwitch) {
                zj.Tips.SetTipsOfProgresses();
            }
            this.imgTip49.visible = this.checkRedPointLicense(); // 执照红点检测
            // this.imgFlagShopingMall.visible = this.checkRedPointShopMall();// 商店红点检测
            this.refreshTouchTitle(); // 商店红点检测
            this.updateOnlineGetAward();
            // 工会战倒计时
            if (this.groupMatch.visible && zj.Game.PlayerLeagueSystem && zj.Game.PlayerLeagueSystem.BaseInfo) {
                this.lbTimeMatch.text = zj.PlayerLeagueSystem.GetTimeDiffShow(zj.PlayerLeagueSystem.getStatus())[2];
                this.groupTimeMatch.visible = true;
            }
            else {
                this.groupTimeMatch.visible = false;
            }
            // 7日奖
            if (this.groupSeven.visible) {
                // Tips.GetTipsOfId(Tips.TAG.SEVEN, Tips.TAG.SEVEN_Gift)
                // this.imgTipSeven.visible = Tips.GetTipsOfId(Tips.TAG.SEVEN, Tips.TAG.SEVEN_Reward) || Tips.GetTipsOfId(Tips.TAG.SEVEN, Tips.TAG.SEVEN_Gift);
                // this.imgTipSeven.visible = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, function (kk, vv) {
                //     return vv == 0;
                // });
                var day = zj.Helper.getDayIdx(zj.Game.PlayerInfoSystem.BaseInfo.createTime * 1000, zj.Game.Controller.curServerTime * 1000);
                this.imgTipSeven.visible = !(day <= zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length);
            }
            var tip1 = false;
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0) {
                if (zj.Game.PlayerInfoSystem.BaseInfo.permitLevel != zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length)
                    tip1 = true;
            }
            else {
                if (zj.Game.PlayerInfoSystem.BaseInfo.permitLevel != zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length || zj.Game.PlayerInfoSystem.BaseInfo.permitLevel != zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length)
                    tip1 = true;
            }
            // 抢红包是否显示
            var redPackageInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RED_PACKET;
            })[0];
            var redPackageTime = zj.Game.Controller.Activity_redpackage_countdown - zj.Game.Controller.curServerTime;
            this.groupRedpackage.visible = redPackageInfo != null && zj.Game.Controller.curServerTime > redPackageInfo.openTime && zj.Game.Controller.curServerTime < redPackageInfo.closeTime && redPackageTime > 0 && zj.Game.PlayerInfoSystem.BaseInfo.level >= 10;
            if (this.groupRedpackage.visible)
                this.showRedpackage();
            var _a = [this.missionComplete(zj.TablePermitMission.Table()), this.missionComplete(zj.Game.PlayerMissionSystem.GetBattlePassWeekMission()), this.missionComplete(zj.Game.PlayerMissionSystem.GetBattlePassMonthMission())], tip3 = _a[0], tip4 = _a[1], tip5 = _a[2];
            this.imgTip68.visible = tip1 || tip3 || tip4 || tip5;
        };
        MainCitySceneNew.prototype.missionComplete = function (itemList) {
            if (itemList instanceof Array) {
                for (var i = 0; i < itemList.length; i++) {
                    var mission = void 0;
                    for (var key in zj.TableMissionType.Table()) {
                        if (zj.TableMissionType.Table().hasOwnProperty(key)) {
                            var element = zj.TableMissionType.Table()[key];
                            if (itemList[i].id >= element.start_id && itemList[i].id <= element.end_id) {
                                mission = element;
                                break;
                            }
                        }
                    }
                    var tb = zj.Game.PlayerMissionSystem.itemCompleteForBattlePass(mission, itemList[i].id);
                    if (tb.isDo >= tb.toDo && tb.finish)
                        return true; // 可以领取
                }
                return false;
            }
            else if (itemList instanceof Object) {
                for (var key in itemList) {
                    if (itemList.hasOwnProperty(key)) {
                        var element = itemList[key];
                        var isGet = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward.indexOf(element.id) != -1;
                        if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && !isGet)
                            return true;
                        if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1)
                            return true;
                        if (element.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && zj.Game.PlayerMissionSystem.missionActive.activeScore >= element.value)
                            return true;
                    }
                }
                return false;
            }
            return false;
        };
        /**回到主城 满足条件弹出红包界面 */
        MainCitySceneNew.prototype.showRedpackage = function () {
            if (!this.isEntryTopScene || zj.Game.UIManager.topDialog() != null)
                return;
            if (zj.Game.PlayerActivitySystem.checkShowRedPackage()) {
                zj.loadUI(zj.Activity_redWarsDialogMain).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_BOTTON);
                });
            }
        };
        MainCitySceneNew.prototype.updateLoginTime = function () {
            this.total_login_time = zj.Game.Controller.LoginInterval * 60;
            this.last_logintime = zj.Game.PlayerInfoSystem.BaseInfo.lastLoginTime;
            this.updateOnlineGetAward();
        };
        MainCitySceneNew.prototype.updateOnlineGetAward = function () {
            var server_Time = zj.Game.Controller.curServerTime;
            var onlineTime = this.total_login_time + (server_Time - this.last_logintime); // 登录总时长
            var timeAll = 0;
            for (var i = 1; i <= Object.keys(zj.TableOnlineReward.Table()).length; i++) {
                timeAll += zj.TableOnlineReward.Item(i).online_time;
            }
            if (onlineTime > timeAll && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.online_reward.length == Object.keys(zj.TableOnlineReward.Table()).length) {
                this.groupOnlineGetAward.visible = false;
                this.groupOnlineGetAward.scaleY = 0;
                return;
            }
            for (var i = 1; i <= zj.Helper.getObjLen(zj.TableOnlineReward.Table()); i++) {
                var a = 0;
                for (var j = 0; j < i; j++) {
                    a += zj.TableOnlineReward.Item(j + 1).online_time;
                }
                if (a - onlineTime > 0) {
                    this.imgOnlineIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.TableOnlineReward.Item(i).goods_id[0]), this);
                    this.labelOnlineNum.text = zj.TableOnlineReward.Item(i).goods_count.toString();
                    this.labelOnlineCountTime.text = zj.Helper.GetTimeStr(a - onlineTime, false);
                    this.labelOnlineCountTime.textColor = 0xffffff;
                    this.imgOnlineRedTip.visible = false;
                    return;
                }
                else {
                    // 判断是否已经领取 如果领取 显示倒计时 未领取一直显示可领取
                    if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.online_reward.indexOf(i) == -1) {
                        this.labelOnlineCountTime.text = "可领取";
                        this.labelOnlineCountTime.textColor = 0xffff00;
                        this.imgOnlineRedTip.visible = true;
                        this.imgOnlineIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(zj.TableOnlineReward.Item(i).goods_id[0]), this);
                        this.labelOnlineNum.text = zj.TableOnlineReward.Item(i).goods_count.toString();
                        return;
                    }
                }
            }
        };
        /**活动开启领取奖励 */
        MainCitySceneNew.prototype.funOpenTip = function () {
            var awardArr = [];
            for (var key in zj.TableUplevelReward.Table()) {
                if (zj.TableUplevelReward.Table().hasOwnProperty(key)) {
                    var element = zj.TableUplevelReward.Table()[key];
                    if (element.index > 1000)
                        awardArr.push(element);
                }
            }
            awardArr.sort(function (a, b) { return a.level - b.level; });
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward.indexOf(awardArr[awardArr.length - 1].index) != -1) {
                this.groupFunOpenTip.visible = false;
                this.imgFunOpenRedTip.visible = false;
                return;
            }
            var funOpenInfo = [];
            for (var key in zj.TableFunctionOpen.Table()) {
                if (zj.TableFunctionOpen.Table().hasOwnProperty(key)) {
                    var element = zj.TableFunctionOpen.Table()[key];
                    if (element.condition == 0 || element.condition == 999 || element.show == 0)
                        continue;
                    funOpenInfo.push(element);
                }
            }
            funOpenInfo.sort(function (a, b) { return a.condition - b.condition; });
            this.imgFunOpenRedTip.visible = false;
            // this.labelOpenLevel.visible = false;
            // this.labelOpenLevel1.visible = false;
            for (var i = 0; i < funOpenInfo.length; i++) {
                var award = null;
                for (var j = 0; j < awardArr.length; j++) {
                    if (funOpenInfo[i].condition == awardArr[j].level) {
                        award = awardArr[j];
                        break;
                    }
                }
                // this.imgFunOpenIcon.source = cachekey(funOpenInfo[i].path, this);
                if (!this.imgFunOpenRedTip.visible && zj.Game.PlayerInfoSystem.BaseInfo.level >= funOpenInfo[i].condition) {
                    if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward.indexOf(award.index) == -1) {
                        this.imgFunOpenRedTip.visible = true;
                    }
                }
                // 不满足领奖条件
                if (zj.Game.PlayerInfoSystem.BaseInfo.level < funOpenInfo[i].condition || i == funOpenInfo.length - 1) {
                    this.labelOpenLevel.text = funOpenInfo[i].condition + "级";
                    // this.labelOpenLevel.visible = true;
                    // this.labelOpenLevel1.visible = true;
                    return;
                }
            }
        };
        MainCitySceneNew.prototype.updateTeach = function () {
            zj.Teach.cleanTeach();
            zj.Game.UIManager.GroupStory.removeChildren();
            if (zj.Teach.nOperateTeachPart == -1) {
                zj.Teach.bFirstTeachUpdata = true;
            }
        };
        MainCitySceneNew.prototype.refreshBubble = function () {
            if (!zj.Device.isReviewSwitch) {
                this.bubble.SetMainMissionOnComeBack();
            }
        };
        /**收藏引导 */
        MainCitySceneNew.prototype.collectguidance = function () {
            var _this = this;
            if (zj.ActivityCollection.guidance) {
                this.groupCollectionOfTips.visible = true;
                var a = function () {
                    c_1();
                    if (zj.ActivityCollection.myBrowser() == "Safari") {
                        _this.groupCollectionOfTips3.visible = true;
                    }
                    else if ((zj.ActivityCollection.myBrowser() == "micromessenger" && egret.Capabilities.os == "iOS")) {
                        _this.groupCollectionOfTips4.visible = true;
                    }
                    else {
                        c_1();
                    }
                };
                var b = function () {
                    c_1();
                    if (zj.ActivityCollection.myBrowser() == "Safari") {
                        _this.groupCollectionOfTips5.visible = true;
                    }
                    else if ((zj.ActivityCollection.myBrowser() == "micromessenger" && egret.Capabilities.os == "iOS")) {
                        _this.groupCollectionOfTips1.visible = true;
                        _this.groupCollectionOfTips1.top = 43;
                    }
                    else if (window.navigator) {
                        if (window.navigator.userAgent) {
                            if (zj.ActivityCollection.myBrowser() == "Safari" && /(iPad)/i.test(window.navigator.userAgent)) {
                                _this.groupCollectionOfTips5.visible = false;
                                _this.groupCollectionOfTips1.visible = true;
                                _this.groupCollectionOfTips1.top = 120;
                            }
                        }
                    }
                    else {
                        c_1();
                    }
                };
                var c_1 = function () {
                    for (var i = 1; i <= 5; i++) {
                        _this["groupCollectionOfTips" + i].visible = false;
                    }
                };
                switch (window.orientation) {
                    case 0://竖屏
                        b();
                        break;
                    case -90://横屏
                        a();
                        break;
                    case 90://横屏
                        a();
                        break;
                    case 180://竖屏
                        b();
                        break;
                }
                ;
                if (zj.Util.isWxMiniGame()) {
                    c_1();
                    this.groupCollectionOfTips2.visible = true;
                }
            }
        };
        MainCitySceneNew.prototype.isGetVip = function () {
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType.length > 0) {
                var n = 0;
                for (var _i = 0, _a = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType; _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (key == 20002) {
                        n = 1;
                    }
                    if (key == 20003) {
                        n = 2;
                    }
                    if (key == 20004) {
                        n = 3;
                    }
                }
                var date = zj.Game.PlayerInfoSystem.BaseInfo.createTime;
                var a = zj.Game.Controller.curServerTime;
                var newDate = new Date(date * 1000);
                var diff = newDate.getHours() * 3600 + newDate.getMinutes() * 60 + newDate.getSeconds();
                var start = date - diff;
                var time = (((a - start) / (24 * 3600)) >> 0) + 1;
                if (time == 1 && n != 1) {
                    return false; // 未领取
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
        };
        MainCitySceneNew.prototype.setOwnerScene = function (scene) {
            this.ownerScene = scene;
        };
        // 关闭场景
        MainCitySceneNew.prototype.close = function (animation) { };
        return MainCitySceneNew;
    }(zj.UI));
    zj.MainCitySceneNew = MainCitySceneNew;
    __reflect(MainCitySceneNew.prototype, "zj.MainCitySceneNew");
})(zj || (zj = {}));
//# sourceMappingURL=MainCitySceneNew.js.map