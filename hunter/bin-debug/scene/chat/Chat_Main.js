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
     * 聊天主界面
     */
    //综合，本服，工会，私聊
    var buttonNames = ["World", "Server", "League", "Whisper"];
    var Chat_Main = (function (_super) {
        __extends(Chat_Main, _super);
        function Chat_Main() {
            var _this = _super.call(this) || this;
            _this.listBottomData = new eui.ArrayCollection(); // 聊天数据
            _this.listPinDaoIndex = zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id;
            _this._chatFilter = {};
            _this._co_list = [];
            _this._chatMap = [];
            _this.receiverId = 0;
            _this.receiverName = "";
            _this.content = "";
            _this.group_id = 0;
            _this._list_size = {};
            _this._items_offset = 0;
            _this._chatIndex = 0;
            _this.indexId = 0; // 当前按钮
            _this.privateChat = true;
            _this.skinName = "resource/skins/chat/Chat_MainSkin.exml";
            // this.scrollBar.addEventListener(eui.UIEvent.CHANGE_START, this.onTouchEnd, this);
            _this.groupPindao.visible = false;
            _this.chatInput = new zj.Chat_ItemInputAlly();
            _this.inittypr(0);
            _this.open();
            _this.monitorEvent();
            // this.ChatGroup.cacheAsBitmap = true;
            // this.backdropChat.cacheAsBitmap = true;
            if (zj.Device.isReviewSwitch) {
                _this.ButtonShrink.x = 888;
                _this.ButtonShrink.y = 25;
            }
            var vis = zj.Device.GetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + "imgvisible");
            if (vis == -1) {
                zj.Device.SetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + "imgvisible", true);
            }
            else {
                if (vis == true) {
                    _this.imgvisible.alpha = 1;
                }
                else if (vis == false) {
                    _this.imgvisible.alpha = 0.01;
                }
            }
            _this.groupCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                var vis = zj.Device.GetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + "imgvisible");
                zj.Device.SetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + "imgvisible", !vis);
                if (zj.Device.GetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + "imgvisible") == true) {
                    _this.imgvisible.alpha = 1;
                }
                else if (zj.Device.GetSaveIntInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + "imgvisible") == false) {
                    _this.imgvisible.alpha = 0.01;
                }
            }, _this);
            return _this;
        }
        // public isFullScreen() {
        //     return this.backdropChat.visible;
        // }
        Chat_Main.prototype.CB = function (cb) {
            this.cb = cb;
        };
        Chat_Main.prototype.onTouchEnd = function () {
            this.ButtonWorld.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWorld, this); // 综合
            this.ButtonServer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonServer, this); // 本服
            this.ButtonWhisper.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWhisper, this); // 私聊
            this.ButtonWorderland.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWorderland, this); // 工会
        };
        Chat_Main.prototype.open = function () {
            this.setPosition("open");
            // egret.Tween.get(this.ChatGroup).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
            egret.Tween.get(this.ChatGroup).to({ scaleX: 1 }, 300, egret.Ease.backOut);
        };
        /**
         * 控制聊天面板缩放
         */
        Chat_Main.prototype.setPosition = function (type) {
            if (type === void 0) { type = "other"; }
            switch (type) {
                case "open":
                    // this.ChatGroup.anchorOffsetX = 0;
                    // this.ChatGroup.anchorOffsetY = 640;
                    // this.ChatGroup.x = (UIManager.StageWidth - this.ChatGroup.width) / 2 + this.ChatGroup.anchorOffsetX;
                    // this.ChatGroup.y = (UIManager.StageHeight - this.ChatGroup.height) / 2 + this.ChatGroup.anchorOffsetY;
                    this.ChatGroup.scaleX = 0;
                    // this.ChatGroup.scaleY = 0;
                    break;
                case "close":
                    // this.ChatGroup.anchorOffsetX = 0;
                    // this.ChatGroup.anchorOffsetY = 640;
                    // this.ChatGroup.x = (UIManager.StageWidth - this.ChatGroup.width) / 2 + this.ChatGroup.anchorOffsetX;
                    // this.ChatGroup.y = (UIManager.StageHeight - this.ChatGroup.height) / 2 + this.ChatGroup.anchorOffsetY;
                    break;
                case "other":
                    // this.ChatGroup.anchorOffsetX = this.ChatGroup.width / 2;
                    // this.ChatGroup.anchorOffsetY = this.ChatGroup.height / 2;
                    // this.ChatGroup.x = (UIManager.StageWidth - this.ChatGroup.width) / 2 + this.ChatGroup.anchorOffsetX;
                    // this.ChatGroup.y = (UIManager.StageHeight - this.ChatGroup.height) / 2 + this.ChatGroup.anchorOffsetY;
                    // egret.Tween.get(this.ChatGroup).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
                    break;
            }
        };
        /**
         * 初始化
         */
        Chat_Main.prototype.inittypr = function (type) {
            this._chatFilter = (_a = {}, _a[1] = 1, _a[2] = 2, _a[3] = 3, _a);
            this._chatType = zj.Game.PlayerChatDataSystem.chatRecordType || message.ChatChannelType.CHAT_CHANNEL_TYPE_CROSS - 1;
            this._curType = zj.Game.PlayerChatDataSystem.chatRecordType || zj.ConstantConfig_Chat.typeLua.world - 1;
            this._co_list = [];
            this._chatMap = [];
            this.receiverId = 0;
            this.receiverName = "";
            this.content = "";
            this.group_id = 0;
            // 背景图
            // if (type == 1) {
            //     this.backdropChat.visible = false;
            // } else {
            //     this.backdropChat.visible = true;
            // }
            // 存储聊天数据
            this.LoadChatDataFromPlayer();
            // 聊天内容list列表
            this.InitChatList();
            // 添加输入文本
            this.NodeChatItem.addChild(this.chatInput);
            this.chatInput.x = 0;
            this.chatInput.y = 0;
            // 判断输入类型
            this.SetInput();
            //  切换频道初始化
            this.curChannel();
            this.SetInfoList();
            this.btnColour();
            // Set.ButtonBackgroud(this.ButtonWorld, "ui_chat_ButtonChatTypeSel_png");
            // this.ButtonWorld.currentState = "down";
            this.ButtonWorld.source = zj.cachekey("ui_chat_ButtonChatTypeSel_png", this);
            zj.Helper.SetImageFilterColor(this.titleWorld, 'yellow');
            // 推送聊天消息
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.ChatMessageNotice_Visit, this);
            if (this._co_list[0] != null) {
                this._co_list[0].remove(0);
            }
            // 红点
            this.SetTips();
            // 新手引导
            // Teach.CheckTeachName();
            if (zj.Device.isReviewSwitch) {
                this.WorderlandGroup.visible = false;
                this.NodeChannel.visible = false;
            }
            var _a;
        };
        Chat_Main.prototype.SetInfoList = function () {
            this.listPinDao.selectedIndex = zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id - 1; // 默认选中
            this.listPinDao.itemRenderer = zj.Chat_ListTextItem; //
            this.listPinDaoItem = new eui.ArrayCollection();
            for (var i = 1; i < 100; i++) {
                this.listPinDaoItem.addItem(i);
            }
            this.listPinDao.dataProvider = this.listPinDaoItem;
            this.listPinDaoIndex = this.listPinDao.selectedIndex;
        };
        /**
         * 切换频道初始化
         */
        Chat_Main.prototype.curChannel = function () {
            if (zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id <= 0) {
                zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id = 1;
            }
            this.LbelSelectedChannel.text = zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id.toString();
            this.LbelSelectedChannel.prompt = zj.LANG(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.input_not_number, 99));
        };
        // 判断工会战消息拦截
        Chat_Main.checkLeagueChat = function (content) {
            if (content && content.length > 0) {
                var isLeagueChat = content[content.length - 1].indexOf("公会战") != -1;
                if (isLeagueChat) {
                    return !zj.Game.PlayerLeagueSystem.BaseInfo || !zj.Game.PlayerLeagueSystem.BaseInfo.match_join;
                }
            }
            return false;
        };
        /**
         * 聊天内容list列表
         */
        Chat_Main.prototype.InitChatList = function () {
            // closeCache(this.TableViewChat);
            this.TableViewChat.removeChildren();
            var tempData = null;
            var lastData = null;
            var date = new Date();
            var index = 0;
            var end = this._chatMap[this.indexId].length;
            var start = Math.max(end - 50, 0);
            for (var i = start; i < end; i++) {
                var v = this._chatMap[this.indexId][i];
                var content = zj.Game.PlayerChatDataSystem.GetChatInfo(v, 1);
                if (Chat_Main.checkLeagueChat(content))
                    continue;
                if (v.sender_id == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                    v.sender_name = zj.TextsConfig.TextsConfig_Common.me;
                }
                var timeBody = null;
                if (index == 0) {
                    lastData = v;
                    timeBody = new zj.Chat_Time(v.send_time, date);
                }
                else {
                    if (v.send_time - lastData.send_time > 60 * 60 // 与上一条时间戳间隔1小时
                        && v.send_time - tempData.send_time > 60) {
                        lastData = v;
                        timeBody = new zj.Chat_Time(v.send_time, date);
                    }
                }
                tempData = v;
                if (timeBody) {
                    this.TableViewChat.addChild(timeBody);
                }
                var item = new zj.Chat_ItemMini(this);
                item.showData(v);
                if (item.isHasText()) {
                    this.TableViewChat.addChild(item);
                }
                index++;
            }
            // setCache(this.TableViewChat);
            // this.listBottomData.removeAll();
            // for (let i = 0; i < this._chatMap[this.indexId].length; i++) {// 
            //     let v = this._chatMap[this.indexId][i];
            //     // let ChatData = new FormatChatData();
            //     // ChatData.Data = v;
            //     // let content = Game.PlayerChatDataSystem.GetChatInfo(v);//Game.PlayerChatDataSystem.GetChatInfo(v, 1);
            //     // let lineName = this.ChatStrlineNum(HelpUtil.textConfigFormat(content[0]), 900);
            //     // ChatData.itemNum = 1;
            //     this.listBottomData.addItem(v);
            // }
            // // 列表数据源--dataProvider
            // this.TableViewChat.dataProvider = this.listBottomData;
            // this.TableViewChat.selectedIndex = this._chatMap[this.indexId].length;
            // this.itemIndex = this.TableViewChat.selectedIndex;
            // // this.TableViewChat.itemRendererFunction = this.logItemRendererFunction;
            // this.TableViewChat.itemRenderer = Chat_ItemMini;
            // this.TableViewChat.validateNow();
            // this.scrollBar.viewport = this.TableViewChat;
            zj.Game.EventManager.event(zj.GameEvent.CHAT_RESTART);
            if (index > 3) {
                this.setUIBottom(index);
            }
        };
        Chat_Main.prototype.setUIBottom = function (count) {
            var _this = this;
            egret.setTimeout(function () {
                if (_this.TableViewChat.contentHeight < _this.scrollBar.height) {
                    _this.TableViewChat.scrollV = 0;
                }
                else {
                    _this.TableViewChat.scrollV = _this.TableViewChat.contentHeight - _this.scrollBar.height;
                }
            }, this, count * 15);
        };
        // // 根据type返回scroller加载的item
        // private logItemRendererFunction(ChatData: FormatChatData) {
        //     return Chat_ItemMini;
        // }
        /**
         * 存储聊天数据
         */
        Chat_Main.prototype.LoadChatDataFromPlayer = function () {
            this._chatMap[zj.ConstantConfig_Chat.typeLua.world - 1] = zj.Table.copy(zj.Game.PlayerChatDataSystem.chatInfos);
            this._chatMap[zj.ConstantConfig_Chat.typeLua.server - 1] = [];
            this._chatMap[zj.ConstantConfig_Chat.typeLua.league - 1] = [];
            this._chatMap[zj.ConstantConfig_Chat.typeLua.whisper - 1] = [];
            var a = zj.Game.PlayerChatDataSystem.chatInfos;
            for (var i = 0; i < zj.Game.PlayerChatDataSystem.chatInfos.length; i++) {
                if (this._chatFilter[zj.Game.PlayerChatDataSystem.chatInfos[i].type - 1] != null) {
                    this._chatMap[this._chatFilter[zj.Game.PlayerChatDataSystem.chatInfos[i].type - 1]].push(zj.Game.PlayerChatDataSystem.chatInfos[i]);
                }
            }
        };
        /**
         * 判断输入类型
         */
        Chat_Main.prototype.SetInput = function () {
            this.chatInput.ClearContent();
            this.chatInput.SetInfo(this);
        };
        /**
         * 当前按钮功能
         */
        Chat_Main.prototype.ButtonDelegate = function (name) {
            if (this.privateChat == false) {
                // if (this.personageType == 1) {
                //     this.backdropChat.visible = true;
                // } else {
                //     this.backdropChat.visible = false;
                // }
                this.chatInput.SetInfo(this);
                return;
            }
            this._curType = zj.StringConfig_TagType.chat[name];
            zj.Game.PlayerChatDataSystem.chatInfoCnt[this._curType] = 0;
            this.SetInput();
            // 聊天提示
            zj.Tips.SetTipsOfId(zj.Tips.TAG.CHAT);
            // 红点
            this.SetTips();
        };
        /**
         * 红点提示
         */
        Chat_Main.prototype.SetTips = function () {
            this.SpriteTipWhisper.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.CHAT);
        };
        /**
         * 推送聊天消息
         */
        Chat_Main.prototype.ChatMessageNotice_Visit = function (msg, result) {
            msg = msg.data.body;
            zj.Game.EventManager.event(zj.GameEvent.COMBAT_CHAT, { name: msg.chatinfos[0].sender_name, content: msg.chatinfos[0].content });
            var ik = 0;
            while (ik < msg.chatinfos.length) {
                if (zj.Table.FindK(zj.Game.PlayerChatDataSystem.chatShieldTbl, msg.chatinfos[ik].sender_id) != -1) {
                    msg.chatinfos.remove(ik);
                }
                else {
                    ik = ik + 1;
                }
            }
            this.AddChatDataToMapLast(msg.chatinfos);
            var newChatList = [];
            if (this._curType == 0) {
                for (var i = 0; i < msg.chatinfos.length; i++) {
                    if (msg.chatinfos[i].type - 1 != 6) {
                        newChatList.push(msg.chatinfos[i]);
                    }
                }
            }
            else {
                for (var i = 0; i < msg.chatinfos.length; i++) {
                    if (this._chatFilter[this._curType - 1] == msg.chatinfos[i].type - 1) {
                        newChatList.push(msg.chatinfos[i]);
                    }
                }
            }
            // 聊天内容list列表
            this.InitChatList();
            // 红点
            this.SetTips();
        };
        Chat_Main.prototype.AddChatDataToMapLast = function (msgList) {
            for (var i = 0; i < msgList.length; i++) {
                if (msgList[i].type != message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {
                    this._chatMap[0].push(msgList[i]);
                    // Game.PlayerChatDataSystem.chatInfos.push(msgList[i]);
                    if (this._chatFilter[msgList[i].type - 1] != null) {
                        this._chatMap[this._chatFilter[msgList[i].type - 1]].push(msgList[i]);
                    }
                }
            }
        };
        /**
         * 监听事件
         */
        Chat_Main.prototype.monitorEvent = function () {
            this.ButtonWorld.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWorld, this); // 综合
            this.ButtonServer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonServer, this); // 本服
            this.ButtonWhisper.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWhisper, this); // 私聊
            this.ButtonWorderland.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWorderland, this); // 工会
            // this.NodeChannel.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onNodeChannel, this);// 切换频道
            this.listPinDao.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onNodeChannel, this);
            // this.NodeChannel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNodeChannel, this);// 切换频道
            this.EditBoxChannel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBox, this);
            this.ButtonShrink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonShrink, this); // 关闭 
            zj.Game.EventManager.on(zj.GameEvent.FRIEND_CHAT, this.onFriendPrivateChat, this); // 好友/公会私聊     
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_CHAT, this.onButtonShrink, this);
        };
        Chat_Main.prototype.onBtnBox = function () {
            if (this.groupPindao.visible == true) {
                this.groupPindao.visible = false;
            }
            else {
                this.groupPindao.visible = true;
            }
        };
        /**
         * 好友私聊
         */
        Chat_Main.prototype.onFriendPrivateChat = function (e) {
            this.friendId = e.data.id;
            this.friendName = e.data.name;
            this.friendGroupId = e.data.group_id;
            this.personageType = e.data.type;
            this.privateChat = false;
            this.receiverId = this.friendId;
            this.receiverName = this.friendName;
            this.group_id = this.friendGroupId;
            this.onButtonWhisper();
        };
        /**
        * 将所有按钮颜色变暗
        */
        Chat_Main.prototype.btnColour = function () {
            // Set.ButtonBackgroud(this.ButtonWorld, "ui_chat_ButtonChatTypeDis_png");
            // Set.ButtonBackgroud(this.ButtonServer, "ui_chat_ButtonChatTypeDis_png");
            // Set.ButtonBackgroud(this.ButtonWhisper, "ui_chat_ButtonChatTypeDis_png");
            // Set.ButtonBackgroud(this.ButtonWorderland, "ui_chat_ButtonChatTypeDis_png");
            this.ButtonWorld.source = zj.cachekey("ui_chat_ButtonChatTypeDis_png", this);
            this.ButtonServer.source = zj.cachekey("ui_chat_ButtonChatTypeDis_png", this);
            this.ButtonWhisper.source = zj.cachekey("ui_chat_ButtonChatTypeDis_png", this);
            this.ButtonWorderland.source = zj.cachekey("ui_chat_ButtonChatTypeDis_png", this);
            zj.Helper.SetImageFilterColor(this.titleWorld);
            zj.Helper.SetImageFilterColor(this.titleServer);
            zj.Helper.SetImageFilterColor(this.titleWhisper);
            zj.Helper.SetImageFilterColor(this.titleWorderland);
        };
        /**
         * 综合
         */
        Chat_Main.prototype.onButtonWorld = function () {
            console.log("点击综合");
            if (this.indexId == 0) {
                return;
            }
            this.scrollBar.stopAnimation();
            if (!zj.Device.isReviewSwitch) {
                this.NodeChannel.visible = true;
            }
            this.TableViewChat.scrollV = 0;
            this.indexId = 0;
            this.btnColour();
            this.ButtonWorld.source = zj.cachekey("ui_chat_ButtonChatTypeSel_png", this);
            zj.Helper.SetImageFilterColor(this.titleWorld, 'yellow');
            // 存储聊天数据
            //this.LoadChatDataFromPlayer();
            this.InitChatList();
            // Set.ButtonBackgroud(this.ButtonWorld, "ui_chat_ButtonChatTypeSel_png");
            this._chatType = 0;
            this._curType = 0;
            zj.Game.PlayerChatDataSystem.chatRecordType = this._chatType;
            this.ButtonDelegate("World");
            this.SetInfoLeagueNotice(); // 公会公告
            console.log("进入综合");
        };
        /**
        * 本服
        */
        Chat_Main.prototype.onButtonServer = function () {
            console.log("点击本服");
            if (this.indexId == 1) {
                return;
            }
            this.scrollBar.stopAnimation();
            this.TableViewChat.scrollV = 0;
            this.NodeChannel.visible = false;
            this.indexId = 1;
            this.btnColour();
            this.ButtonServer.source = zj.cachekey("ui_chat_ButtonChatTypeSel_png", this);
            zj.Helper.SetImageFilterColor(this.titleServer, 'yellow');
            // 存储聊天数据
            //this.LoadChatDataFromPlayer();
            this.InitChatList();
            // Set.ButtonBackgroud(this.ButtonServer, "ui_chat_ButtonChatTypeSel_png");
            this._chatType = 1;
            this._curType = 1;
            zj.Game.PlayerChatDataSystem.chatRecordType = this._chatType;
            this.ButtonDelegate("Server");
            this.SetInfoLeagueNotice(); // 公会公告
            console.log("进入本服");
        };
        /**
        * 私聊
        */
        Chat_Main.prototype.onButtonWhisper = function () {
            console.log("点击私聊");
            if (this.indexId == 3) {
                return;
            }
            this.scrollBar.stopAnimation();
            this.TableViewChat.scrollV = 0;
            this.NodeChannel.visible = false;
            this.indexId = 3;
            this.btnColour();
            this.ButtonWhisper.source = zj.cachekey("ui_chat_ButtonChatTypeSel_png", this);
            zj.Helper.SetImageFilterColor(this.titleWhisper, 'yellow');
            // 存储聊天数据
            //this.LoadChatDataFromPlayer();
            this.InitChatList();
            this.listBottomData.refresh();
            // Set.ButtonBackgroud(this.ButtonWhisper, "ui_chat_ButtonChatTypeSel_png");
            this._chatType = 3;
            this._curType = 3;
            zj.Game.PlayerChatDataSystem.chatRecordType = this._chatType;
            this.ButtonDelegate("Whisper");
            this.SetInfoLeagueNotice(); // 公会公告
            console.log("进入私聊");
        };
        /**
        * 工会
        */
        Chat_Main.prototype.onButtonWorderland = function () {
            console.log("点击公会");
            if (this.indexId == 2) {
                return;
            }
            this.scrollBar.stopAnimation();
            this.TableViewChat.scrollV = 0;
            this.NodeChannel.visible = false;
            this.indexId = 2;
            this.btnColour();
            this.ButtonWorderland.source = zj.cachekey("ui_chat_ButtonChatTypeSel_png", this);
            zj.Helper.SetImageFilterColor(this.titleWorderland, 'yellow');
            // 存储聊天数据
            //this.LoadChatDataFromPlayer();
            this.InitChatList();
            // Set.ButtonBackgroud(this.ButtonWorderland, "ui_chat_ButtonChatTypeSel_png");
            this._chatType = 2;
            this._curType = 2;
            zj.Game.PlayerChatDataSystem.chatRecordType = this._chatType;
            this.ButtonDelegate("Worderland");
            this.SetInfoLeagueNotice(); // 公会公告
            console.log("进入公会");
        };
        /**
        * 切换频道
        */
        Chat_Main.prototype.onNodeChannel = function (e) {
            if (this.listPinDaoIndex == e.itemIndex) {
                zj.toast_success(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.change_channel_success, zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id));
                this.groupPindao.visible = false;
                return;
            }
            if (this.listPinDaoIndex != e.itemIndex) {
                this.listPinDaoItem.itemUpdated(this.listPinDaoItem.source[e.itemIndex]);
                this.listPinDaoItem.itemUpdated(this.listPinDaoItem.source[this.listPinDaoIndex]);
                this.listPinDaoIndex = e.itemIndex;
            }
            // toast_success("成功切换到频道0");
            var content = this.listPinDaoIndex + 1;
            zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id = this.listPinDaoIndex + 1;
            var num = Number(content);
            if (num && num > 0 && num <= 99) {
                this.EnterChatReq(num);
            }
            else {
                zj.toast_warning(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.input_not_number, 99));
                this.LbelSelectedChannel.text = String(zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id);
            }
            if (this.groupPindao.visible == true) {
                this.groupPindao.visible = false;
            }
            var cht = new message.ChatMessage();
            cht.type = message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM;
            cht.content = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.enter_chat, (zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id));
            // Game.PlayerChatDataSystem.chatInfos.push(cht);
            var request = new message.ChatMessageNoticeRequest();
            request.body.chatinfos.push(cht);
            zj.Game.EventManager.event(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, request);
            this.onButtonWorld();
        };
        Chat_Main.prototype.EnterChatReq = function (channelId) {
            var _this = this;
            zj.Game.PlayerChatDataSystem.SwitchingChannel(channelId).then(function () {
                _this.LbelSelectedChannel.text = String(zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id);
                zj.toast_success(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.change_channel_success, zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id));
            }).catch(function (result) {
            });
            this.LbelSelectedChannel.text = String(zj.Game.PlayerChatDataSystem.chatInfo.chat_channel_id);
        };
        /**
        * 公会公告
        */
        Chat_Main.prototype.SetInfoLeagueNotice = function () {
            if (this.indexId == 2) {
                if (zj.Game.PlayerInfoSystem.BaseInfo != null) {
                    if (zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0 && zj.Game.PlayerLeagueSystem.LeagueInfo != null && zj.Game.PlayerLeagueSystem.LeagueInfo.info != null) {
                        this.JoinGuild(); // 公告数据-工会获取
                    }
                    else {
                        this.QuitGuild(); // 未加入公会不提示公告
                    }
                }
                else {
                    this.QuitGuild();
                }
            }
            else {
                this.QuitGuild();
            }
        };
        /**
         * 公告数据-工会获取
         */
        Chat_Main.prototype.JoinGuild = function () {
            this.NodeLeagueNotice.visible = true;
            this.scrollBar.top = 160;
            // this.scrollBar.height = 350;
            // this.TableViewChat.height = 350;
            this.LabelLeagueNotice.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.home_pop_notice2, zj.Game.PlayerLeagueSystem.getNotice((zj.Game.PlayerLeagueSystem.BaseInfo.notice))));
        };
        /**
         * 未加入公会不提示公告
         */
        Chat_Main.prototype.QuitGuild = function () {
            this.NodeLeagueNotice.visible = false;
            this.scrollBar.top = 90;
            // this.scrollBar.height = 450;
            // this.TableViewChat.height = 450;
            this.LabelLeagueNotice.text = "";
        };
        /**
        * 关闭
        */
        Chat_Main.prototype.onButtonShrink = function () {
            var _this = this;
            if (this.cb) {
                this.cb();
            }
            this.cancelEvent();
            this.setPosition("close");
            // egret.Tween.get(this.ChatGroup)
            //     .to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.backIn)
            //     .call(() => {
            //         this.close();
            //     });
            egret.Tween.get(this.ChatGroup)
                .to({ scaleX: 0 }, 300, egret.Ease.backIn)
                .call(function () {
                _this.close();
            });
        };
        /**
         * 注销事件
         */
        Chat_Main.prototype.cancelEvent = function () {
            zj.Game.EventManager.off(zj.GameEvent.FRIEND_CHAT, this.onFriendPrivateChat, this);
            zj.Game.EventManager.off(zj.GameEvent.CLOSE_CHAT, this.onButtonShrink, this);
        };
        /**
         * 行数
         */
        Chat_Main.prototype.ChatStrlineNum = function (info, width) {
            var lineNum = 1;
            var richStrArr = zj.Util.RichText(info);
            var richStr = "";
            var chatStr = "　";
            for (var i = 0; i < richStrArr.length; i++) {
                richStr = richStr + richStrArr[i].text;
            }
            this.labelString.text = richStr;
            var richStrArrWidth = this.labelString.width;
            return Math.ceil(richStrArrWidth / width);
            // if ((richStrArr[0].text.length + richStrArr[1].text.length + 1) > 48) {
            //     return 2;
            // } else {
            //     let chineseNum = 0;
            //     for (let i = 0; i < richStr.length; i++) {
            //         if (richStr.charCodeAt(i) > 255 || richStr.charAt(i) == "）" || richStr.charAt(i) == "（")
            //             chineseNum++;
            //     }
            //     lineNum = Math.ceil(((richStr.length - chineseNum) / 2 + chineseNum) / (width / 16));
            //     return lineNum;
            // }
        };
        return Chat_Main;
    }(zj.Dialog));
    zj.Chat_Main = Chat_Main;
    __reflect(Chat_Main.prototype, "zj.Chat_Main");
})(zj || (zj = {}));
//# sourceMappingURL=Chat_Main.js.map