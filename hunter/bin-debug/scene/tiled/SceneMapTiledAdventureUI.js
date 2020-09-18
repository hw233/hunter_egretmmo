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
    /**
     * tiledMap 副本大地图UI
     * zhaiweili
     * 2019.10.24
     */
    var SceneMapTiledAdventureUI = (function (_super) {
        __extends(SceneMapTiledAdventureUI, _super);
        function SceneMapTiledAdventureUI() {
            var _this = _super.call(this) || this;
            _this.listBottomData = new eui.ArrayCollection(); // 聊天数据
            _this.maxArea = -1; // 当前地图开启的最大小岛id
            _this.maxMob = -1; // 当前最大关卡bossid
            _this.maxAreaE = -1; // 当前地图挑战开启的最大小岛id
            _this.maxMobE = -1; // 当前挑战最大关卡bossid
            for (var i = 0; i < 6; ++i) {
                zj.cachekey("map_adv_" + (i + 1) + "_jpg", _this);
            }
            for (var i = 0; i < 20; ++i) {
                zj.cachekey("adv_build_" + (i + 1) + "_png", _this);
            }
            zj.cachekey("cloud_1_png", _this);
            zj.cachekey("cloud_3_png", _this);
            zj.cachekey("cloud_4_png", _this);
            var list = zj.UIResource["HXH_InstanceFast"];
            for (var i = 0; i < list.length; ++i) {
                zj.cachekey(list[i], _this);
            }
            return _this;
        }
        SceneMapTiledAdventureUI.prototype.onSkinName = function () {
            this.skinName = "resource/skins/adventure/TiledSceneAdventureUISkin.exml";
        };
        SceneMapTiledAdventureUI.prototype.onInit = function () {
            _super.prototype.onInit.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
            this.btnCloseTop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchClose, this);
            this.btnHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHunter, this);
            this.btnDaily.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDaily, this);
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);
            this.btnDropAwardBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDropAwardBox, this);
            this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChat, this);
            this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChat, this);
            this.btnDropAwardBox.visible = false;
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LEVEL_UP, this.refreshDialog, this);
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_DIALOG, this.checkCloseDialog, this);
            zj.Game.EventManager.on(zj.GameEvent.REFRESH_MAINCITY_BUBBLE, this.refreshBubble, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_MOB_INFO_CHANGE, this.refreshDialog, this);
            zj.Game.EventManager.on(zj.GameEvent.CHAT_RESTART, this.InitChatList, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
            this.isOpenNewArea = false;
            this.isOpenElite = false;
            if (Main.isCurrencysMove()) {
                this.groupTR.right = 100;
            }
            this.openType = 0;
            this.updateData();
            this.addBubble();
            this.initDialog();
            this.closeAdventureInfo();
        };
        SceneMapTiledAdventureUI.prototype.onLoadMap = function () {
            this.sceneMap = zj.newUI(zj.SceneMapTiledAdventure);
            this.sceneMap.init(this, zj.SceneManager.mapIdAdventure);
            this.addChildAt(this.sceneMap, 0);
        };
        SceneMapTiledAdventureUI.prototype.mapLoadFinish = function () {
            _super.prototype.mapLoadFinish.call(this);
            this.checkOpenType();
        };
        // 场景进入栈顶
        SceneMapTiledAdventureUI.prototype.onEntryTopScene = function () {
            zj.Gmgr.Instance.setLayerId(zj.TableEnum.TableEnumLayerId.LAYER_WONDERLAND);
            _super.prototype.onEntryTopScene.call(this);
            this.updateUIStates();
            this.InitChatList();
            this.refreshBubble();
            this.refreshDialog();
            this.checkNewAreaStart();
            zj.Teach.checkTeachId();
        };
        // 场景离开栈顶
        SceneMapTiledAdventureUI.prototype.onLeaveTopScene = function () {
            _super.prototype.onLeaveTopScene.call(this);
            this.refreshBubble();
        };
        /**
         * 设置打开类型：默认0,1-打开当前最高普通副本，2-打开当前最高跳转副本, -1-打开指定的area（普通），-2-打开指定的area（挑战）
         */
        SceneMapTiledAdventureUI.prototype.setOpenType = function (type, openArea) {
            if (openArea === void 0) { openArea = -1; }
            this.openType = type;
            this.openArea = openArea;
        };
        SceneMapTiledAdventureUI.prototype.checkOpenType = function () {
            var currInfo;
            var maxArea;
            switch (this.openType) {
                case -1:
                    maxArea = zj.TableInstanceArea.Item(Math.min(this.openArea, zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL)));
                    if (maxArea) {
                        this.showAdventureInfo(maxArea, message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
                    }
                    break;
                case -2:
                    maxArea = zj.TableInstanceArea.Item(Math.min(this.openArea, zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE)));
                    if (maxArea) {
                        this.showAdventureInfo(maxArea, message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
                    }
                    break;
                case 1:
                    maxArea = zj.TableInstanceArea.Item(zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL));
                    this.showAdventureInfo(maxArea, message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
                    break;
                case 2:
                    maxArea = zj.TableInstanceArea.Item(zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE));
                    this.showAdventureInfo(maxArea, message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
                    break;
            }
        };
        /**
         * 添加任务框
         */
        SceneMapTiledAdventureUI.prototype.addBubble = function () {
            if (!zj.Device.isReviewSwitch) {
                this.bubble.SetMainMissionAfterLogin();
            }
            else {
                this.bubble.visible = false;
            }
        };
        SceneMapTiledAdventureUI.prototype.refreshBubble = function () {
            if (!zj.Device.isReviewSwitch) {
                this.bubble.SetMainMissionOnComeBack();
            }
        };
        SceneMapTiledAdventureUI.prototype.showAdventureInfo = function (data, type) {
            if (type === void 0) { type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL; }
            this.dialogInfo.setData(data, type);
            this.openAdventureInfo();
        };
        SceneMapTiledAdventureUI.prototype.initDialog = function () {
            if (!this.dialogInfo) {
                this.dialogInfo = zj.newUI(zj.AdventureDialog);
                this.dialogBG.width = zj.UIManager.StageWidth;
                this.dialogBG.height = zj.UIManager.StageHeight;
                this.dialogInfo.setOwner(this);
                this.dialogBG.addChild(this.dialogInfo);
                this.dialogBG.visible = false;
                // this.dialogBG.scaleX = this.dialogBG.scaleY = 0;
            }
        };
        SceneMapTiledAdventureUI.prototype.openAdventureInfo = function () {
            if (this.dialogInfo) {
                this.dialogInfo.show();
                this.dialogBG.visible = true;
            }
        };
        SceneMapTiledAdventureUI.prototype.closeAdventureInfo = function () {
            this.dialogBG.visible = false;
            this.checkNewAreaStart();
        };
        SceneMapTiledAdventureUI.prototype.checkNewAreaStart = function () {
            if (this.isOpenNewArea || this.isOpenElite) {
                if (this.dialogBG.visible) {
                    return;
                }
                if (zj.Game.UIManager.topScene() != this) {
                    return;
                }
                if (zj.Game.UIManager.dialogCount() > 0) {
                    return;
                }
                var newArea = this.isOpenNewArea;
                var newElite = this.isOpenElite;
                this.isOpenNewArea = false;
                this.isOpenElite = false;
                this.sceneMap.openAnimation(newArea, newElite);
            }
        };
        SceneMapTiledAdventureUI.prototype.SetMapCanTouch = function (isCanTouch) {
            this.sceneMap.setLockMap(!isCanTouch);
        };
        SceneMapTiledAdventureUI.prototype.setCanTouch = function (isCanTouch) {
            this.touchEnabled = this.touchChildren = isCanTouch;
        };
        SceneMapTiledAdventureUI.prototype.enterMap = function (data) {
            // 进入跑图
            // loadUI(SceneMapAreaUI).then((scene: SceneMapAreaUI) => {
            // 	scene.setData(data);
            // 	scene.onInit();
            // 	scene.onLoadMap();
            // });
        };
        SceneMapTiledAdventureUI.prototype.isOpen = function (idx) {
            return idx <= Math.min(this.maxArea, zj.SceneManager.adventureOpenMax);
        };
        // 猎人
        SceneMapTiledAdventureUI.prototype.onBtnHunter = function () {
            zj.loadUI(zj.HunterMainScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                zj.Teach.delTouchTipSpx();
            });
        };
        // 日常
        SceneMapTiledAdventureUI.prototype.onBtnDaily = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DAILY, true)) {
                zj.loadUI(zj.Daily_Main)
                    .then(function (dialog) {
                    dialog.isInstanceMain(true);
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                });
            }
        };
        // 通关奖励
        SceneMapTiledAdventureUI.prototype.onBtnDropAwardBox = function () {
            zj.loadUI(zj.HXH_InstancePassDropInfo)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        //添加金币
        SceneMapTiledAdventureUI.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList(true);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        SceneMapTiledAdventureUI.prototype.onBtnAddGemstone = function () {
            // toast_success("加钻石功能未开启");
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        };
        SceneMapTiledAdventureUI.prototype.onBtnAddStrength = function () {
            //增加体力
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        SceneMapTiledAdventureUI.prototype.onBtnChat = function () {
            var _this = this;
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30001), 100);
                dialog.CB(function () {
                    _this.Chat_MainCB();
                });
                dialog.show();
            });
        };
        /**
         * 简易聊天内容list列表
         */
        SceneMapTiledAdventureUI.prototype.InitChatList = function () {
            var _this = this;
            this.listBottomData.removeAll();
            var chatInfosMini = zj.Game.PlayerChatDataSystem.chatInfos;
            for (var i = 0; i < chatInfosMini.length; i++) {
                var v = chatInfosMini[i];
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
        SceneMapTiledAdventureUI.prototype.OnTouchClose = function () {
            zj.SceneManager.initType = 1;
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_MOB_INFO_CHANGE, this.refreshDialog, this);
            zj.Game.EventManager.off(zj.GameEvent.CHAT_RESTART, this.InitChatList, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_LEVEL_UP, this.refreshDialog, this);
            zj.Game.EventManager.off(zj.GameEvent.CLOSE_DIALOG, this.checkCloseDialog, this);
            zj.Game.EventManager.off(zj.GameEvent.REFRESH_MAINCITY_BUBBLE, this.refreshBubble, this);
            this.close();
        };
        SceneMapTiledAdventureUI.prototype.updateUIStates = function () {
            this.lbGold.text = zj.Util.getValueStr(zj.Game.PlayerInfoSystem.Coin);
            this.lbGemstone.text = zj.Util.getValueStr(zj.Game.PlayerInfoSystem.Token);
            this.lbStrength.text = zj.Helper.StringFormat("%d/%d", zj.Util.getValueStr(zj.Game.PlayerInfoSystem.Power), (zj.TableLevel.Item(zj.Game.PlayerInfoSystem.Level).role_power + zj.PlayerVIPSystem.LowLevel().power_add));
            //金币红点
            this.imgFlagGold.visible = zj.Game.PlayerVIPSystem.vipInfo.buy_coin_free_time < zj.PlayerVIPSystem.LowItem().buy_coin_free_time;
            this.imgFlagGemstone.visible = false;
            this.imgFlagStrength.visible = false;
            this.Chat_MainCB();
        };
        SceneMapTiledAdventureUI.prototype.Chat_MainCB = function () {
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
        SceneMapTiledAdventureUI.prototype.checkCloseDialog = function (ev) {
            var className = ev.data.typeName;
            this.checkNewAreaStart();
        };
        SceneMapTiledAdventureUI.prototype.refreshDialog = function () {
            var lastMaxMobId = this.maxMob;
            var lastAreaId = this.maxArea;
            var lastMaxMobIdeE = this.maxMobE;
            var lastAreaIE = this.maxAreaE;
            this.updateData();
            if (this.dialogBG.visible) {
                if (this.maxMob > lastMaxMobId || this.maxMobE > lastMaxMobIdeE) {
                    this.dialogInfo.updateUI(true);
                }
                else {
                    this.dialogInfo.updateUI(false);
                }
            }
            this.checkOpenNormal(lastAreaId, lastAreaIE);
        };
        SceneMapTiledAdventureUI.prototype.checkOpenNormal = function (lastAreaId, lastAreaIE) {
            if (this.maxArea > lastAreaId) {
                this.isOpenNewArea = true;
            }
            if (this.maxAreaE > lastAreaIE) {
                this.isOpenElite = true;
            }
        };
        SceneMapTiledAdventureUI.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (this.dialogBG.visible) {
                this.dialogInfo.Update(tick);
            }
            return false;
        };
        SceneMapTiledAdventureUI.prototype.updateData = function () {
            this.maxArea = zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
            this.maxMob = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
            this.maxAreaE = zj.Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
            this.maxMobE = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID;
        };
        SceneMapTiledAdventureUI.prototype.onRemoveDialog = function () {
            var dialogFirstBlood = this.getChildByName("First_Blood");
            if (dialogFirstBlood)
                this.removeChild(dialogFirstBlood);
            var dialogDrop = this.getChildByName("DropOrAward");
            if (dialogDrop)
                this.removeChild(dialogDrop);
            var dialogAward = this.getChildByName("award");
            if (dialogAward)
                this.removeChild(dialogAward);
        };
        SceneMapTiledAdventureUI.prototype.test = function () {
            // this.areaMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID;
            // this.chapterMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxChapterID;
            // this.mobMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
            // 副本数据
            // areaNum = Game.PlayerMissionSystem.tableLength(TableInstanceArea.Table());// 表，一共10个小岛
            // FORMATION_TYPE_INSTANCE_NORMAL = 1,// 普天
            // FORMATION_TYPE_INSTANCE_ELITE = 2,// 挑战
            // 当前开启的最大小岛，从1开始
            // this.areaMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID;
            // 当前小岛里章id
            // this.chapterMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxChapterID;
            // 怪物id
            // this.mobMax = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
            // let mobInfos = Game.PlayerInstanceSystem.mobInfos;// 关卡数据列表
            // // 拿到物品id和数量
            // let goodsTbl: Array<number> = Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
            // let countTbl: Array<number> = Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
            // let itemSet = PlayerItemSystem.Set(goodsTbl[0], 0, countTbl[0]) as any;
            // this[`imgFrame${index}`].source = cachekey(itemSet.Frame, this);
            // this[`imgIcon${index}`].source = cachekey(itemSet.Path, this);
            // /**挑战 */ 	private onRightBtn2() 是否开启判断
        };
        return SceneMapTiledAdventureUI;
    }(zj.SceneMapUIBase));
    zj.SceneMapTiledAdventureUI = SceneMapTiledAdventureUI;
    __reflect(SceneMapTiledAdventureUI.prototype, "zj.SceneMapTiledAdventureUI");
})(zj || (zj = {}));
//# sourceMappingURL=SceneMapTiledAdventureUI.js.map