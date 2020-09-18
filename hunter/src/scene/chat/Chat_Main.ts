namespace zj {
    /**
     * 聊天主界面
     */
    //综合，本服，工会，私聊
    let buttonNames = ["World", "Server", "League", "Whisper"];

    export class Chat_Main extends Dialog {
        public ChatGroup: eui.Group;
        public WorldGroup: eui.Group;// 综合
        // public ButtonWorld: eui.Button;
        public ButtonWorld: eui.Image;
        public SpriteTipWorld: eui.Image;
        public titleWorld: eui.Image;

        public ServerGroup: eui.Group;// 本服
        public ButtonServer: eui.Image;
        public SpriteTipAlly: eui.Image;
        public titleServer: eui.Image;

        public WhisperGroup: eui.Group;// 私聊
        public ButtonWhisper: eui.Image;
        public SpriteTipWonderland: eui.Image;
        public titleWhisper: eui.Image;

        public WorderlandGroup: eui.Group;// 工会
        public ButtonWorderland: eui.Image;
        public SpriteTipWhisper: eui.Image;
        public titleWorderland: eui.Image;
        public NodeLeagueNotice: eui.Group;
        public LabelLeagueNotice: eui.Label;// 公告

        public ButtonNear: eui.Button;
        public ButtonShrink: eui.Button;
        public scrollBar: eui.Scroller;// 滚动条
        public TableViewChat: eui.Group;// 聊天信息list 
        private listBottomData: eui.ArrayCollection = new eui.ArrayCollection();  // 聊天数据
        public NodeChatItem: eui.Group;

        public NodeChannel: eui.Group;// 频道
        // public ButtonSelectedChannel: eui.Image;
        public LbelSelectedChannel: eui.EditableText;
        public EditBoxChannel: eui.Button;

        private labelString: eui.Label;

        private listPinDao: eui.List;
        private listPinDaoItem: eui.ArrayCollection;
        private listPinDaoIndex: number = Game.PlayerChatDataSystem.chatInfo.chat_channel_id;
        private groupPindao: eui.Group;

        public _chatFilter = {};
        public _chatType;
        public _curType;
        public _co_list = [];
        public _chatMap = [];
        public receiverId = 0;
        public receiverName = "";
        public content = "";
        public group_id = 0;
        public _list_size = {};
        public _items_offset = 0;
        public _chatIndex = 0;

        public chatInput: Chat_ItemInputAlly;
        public indexId: number = 0;// 当前按钮

        // 好友私聊数据
        public friendId;
        public friendName;
        public friendGroupId;
        public privateChat: boolean = true;
        public backdropChat: eui.Image; // 背景图
        public personageType;
        public groupCheckBox: eui.Group;
        public imgvisible: eui.Image;
        public cb;
        public itemIndex;// item索引



        public constructor() {
            super();
            this.skinName = "resource/skins/chat/Chat_MainSkin.exml";

            // this.scrollBar.addEventListener(eui.UIEvent.CHANGE_START, this.onTouchEnd, this);
            this.groupPindao.visible = false;
            this.chatInput = new Chat_ItemInputAlly();
            this.inittypr(0);
            this.open();
            this.monitorEvent();
            // this.ChatGroup.cacheAsBitmap = true;
            // this.backdropChat.cacheAsBitmap = true;
            if (Device.isReviewSwitch) {
                this.ButtonShrink.x = 888;
                this.ButtonShrink.y = 25;
            }
            let vis = Device.GetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible");
            if (vis == -1) {
                Device.SetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible", true);
            } else {
                if (vis == true) {
                    this.imgvisible.alpha = 1;
                } else if (vis == false) {
                    this.imgvisible.alpha = 0.01;
                }
            }
            this.groupCheckBox.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                let vis = Device.GetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible");
                Device.SetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible", !vis);
                if (Device.GetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible") == true) {
                    this.imgvisible.alpha = 1;
                } else if (Device.GetSaveIntInfo(Game.PlayerInfoSystem.BaseInfo.id + "imgvisible") == false) {
                    this.imgvisible.alpha = 0.01;
                }
            }, this)
        }
        // public isFullScreen() {
        //     return this.backdropChat.visible;
        // }
        public CB(cb) {
            this.cb = cb;
        }

        private onTouchEnd() {
            this.ButtonWorld.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWorld, this);// 综合
            this.ButtonServer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonServer, this);// 本服
            this.ButtonWhisper.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWhisper, this);// 私聊
            this.ButtonWorderland.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWorderland, this);// 工会
        }

        private open() {
            this.setPosition("open");
            // egret.Tween.get(this.ChatGroup).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
            egret.Tween.get(this.ChatGroup).to({ scaleX: 1 }, 300, egret.Ease.backOut);
        }

        /**
         * 控制聊天面板缩放
         */
        private setPosition(type: string = "other") {
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
        }

        /**
         * 初始化
         */
        public inittypr(type) {
            this._chatFilter = { [1]: 1, [2]: 2, [3]: 3, };
            this._chatType = Game.PlayerChatDataSystem.chatRecordType || message.ChatChannelType.CHAT_CHANNEL_TYPE_CROSS - 1;
            this._curType = Game.PlayerChatDataSystem.chatRecordType || ConstantConfig_Chat.typeLua.world - 1;
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
            this.ButtonWorld.source = cachekey("ui_chat_ButtonChatTypeSel_png", this);
            Helper.SetImageFilterColor(this.titleWorld, 'yellow');
            // 推送聊天消息
            Game.EventManager.on(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.ChatMessageNotice_Visit, this);
            if (this._co_list[0] != null) {
                this._co_list[0].remove(0);
            }

            // 红点
            this.SetTips();
            // 新手引导
            // Teach.CheckTeachName();

            if (Device.isReviewSwitch) {
                this.WorderlandGroup.visible = false;
                this.NodeChannel.visible = false;
            }
        }

        private SetInfoList() {

            this.listPinDao.selectedIndex = Game.PlayerChatDataSystem.chatInfo.chat_channel_id - 1; // 默认选中
            this.listPinDao.itemRenderer = Chat_ListTextItem;//
            this.listPinDaoItem = new eui.ArrayCollection();

            for (let i = 1; i < 100; i++) {
                this.listPinDaoItem.addItem(i);
            }
            this.listPinDao.dataProvider = this.listPinDaoItem;
            this.listPinDaoIndex = this.listPinDao.selectedIndex;
        }

        /**
         * 切换频道初始化
         */
        public curChannel() {
            if (Game.PlayerChatDataSystem.chatInfo.chat_channel_id <= 0) {
                Game.PlayerChatDataSystem.chatInfo.chat_channel_id = 1;
            }
            this.LbelSelectedChannel.text = Game.PlayerChatDataSystem.chatInfo.chat_channel_id.toString();
            this.LbelSelectedChannel.prompt = LANG(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.input_not_number, 99));
        }
        // 判断工会战消息拦截
        public static checkLeagueChat(content) {
            if (content && content.length > 0) {
                let isLeagueChat = content[content.length - 1].indexOf("公会战") != -1;
                if (isLeagueChat) {
                    return !Game.PlayerLeagueSystem.BaseInfo || !Game.PlayerLeagueSystem.BaseInfo.match_join;
                }
            }
            return false;
        }
        /**
         * 聊天内容list列表
         */
        public InitChatList() {
            // closeCache(this.TableViewChat);
            this.TableViewChat.removeChildren();
            let tempData: message.ChatMessage = null;
            let lastData: message.ChatMessage = null;
            let date = new Date();
            let index: number = 0;
            let end = this._chatMap[this.indexId].length;
            let start = Math.max(end - 50, 0);
            for (let i = start; i < end; i++) {
                let v = this._chatMap[this.indexId][i] as message.ChatMessage;
                let content = Game.PlayerChatDataSystem.GetChatInfo(v, 1);
                if (Chat_Main.checkLeagueChat(content)) continue;
                if (v.sender_id == Game.PlayerInfoSystem.BaseInfo.id) {
                    v.sender_name = TextsConfig.TextsConfig_Common.me;
                }
                let timeBody = null;
                if (index == 0) {
                    lastData = v;
                    timeBody = new Chat_Time(v.send_time, date);
                } else {
                    if (v.send_time - lastData.send_time > 60 * 60 // 与上一条时间戳间隔1小时
                        && v.send_time - tempData.send_time > 60) {// 与上条间隔1分钟
                        lastData = v;
                        timeBody = new Chat_Time(v.send_time, date);
                    }
                }
                tempData = v;
                if (timeBody) {
                    this.TableViewChat.addChild(timeBody);
                }
                let item = new Chat_ItemMini(this);
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

            Game.EventManager.event(GameEvent.CHAT_RESTART);

            if(index > 3){
                this.setUIBottom(index);
            }
        }

        private setUIBottom(count) {
            egret.setTimeout(() => {
                if (this.TableViewChat.contentHeight < this.scrollBar.height) {
                    this.TableViewChat.scrollV = 0;
                } else {
                    this.TableViewChat.scrollV = this.TableViewChat.contentHeight - this.scrollBar.height;
                }
            }, this, count * 15);
        }

        // // 根据type返回scroller加载的item
        // private logItemRendererFunction(ChatData: FormatChatData) {
        //     return Chat_ItemMini;
        // }

        /**
         * 存储聊天数据
         */
        public LoadChatDataFromPlayer() {
            this._chatMap[ConstantConfig_Chat.typeLua.world - 1] = Table.copy(Game.PlayerChatDataSystem.chatInfos);
            this._chatMap[ConstantConfig_Chat.typeLua.server - 1] = [];
            this._chatMap[ConstantConfig_Chat.typeLua.league - 1] = [];
            this._chatMap[ConstantConfig_Chat.typeLua.whisper - 1] = [];
            let a = Game.PlayerChatDataSystem.chatInfos;
            for (let i = 0; i < Game.PlayerChatDataSystem.chatInfos.length; i++) {
                if (this._chatFilter[Game.PlayerChatDataSystem.chatInfos[i].type - 1] != null) {
                    this._chatMap[this._chatFilter[Game.PlayerChatDataSystem.chatInfos[i].type - 1]].push(Game.PlayerChatDataSystem.chatInfos[i]);
                }
            }
        }

        /**
         * 判断输入类型
         */
        public SetInput() {
            this.chatInput.ClearContent();
            this.chatInput.SetInfo(this);
        }

        /**
         * 当前按钮功能
         */
        public ButtonDelegate(name) {
            if (this.privateChat == false) {
                // if (this.personageType == 1) {
                //     this.backdropChat.visible = true;
                // } else {
                //     this.backdropChat.visible = false;
                // }
                this.chatInput.SetInfo(this);
                return;
            }
            this._curType = StringConfig_TagType.chat[name];
            Game.PlayerChatDataSystem.chatInfoCnt[this._curType] = 0;
            this.SetInput();

            // 聊天提示
            Tips.SetTipsOfId(Tips.TAG.CHAT);
            // 红点
            this.SetTips();
        }

        /**
         * 红点提示
         */
        public SetTips() {
            this.SpriteTipWhisper.visible = Tips.GetTipsOfId(Tips.TAG.CHAT);
        }

        /**
         * 推送聊天消息
         */
        public ChatMessageNotice_Visit(msg, result) {
            msg = msg.data.body;
            Game.EventManager.event(GameEvent.COMBAT_CHAT, { name: msg.chatinfos[0].sender_name, content: msg.chatinfos[0].content });
            let ik = 0;
            while (ik < msg.chatinfos.length) {
                if (Table.FindK(Game.PlayerChatDataSystem.chatShieldTbl, msg.chatinfos[ik].sender_id) != -1) {
                    msg.chatinfos.remove(ik);
                } else {
                    ik = ik + 1;
                }
            }

            this.AddChatDataToMapLast(msg.chatinfos);
            let newChatList = [];

            if (this._curType == 0) {
                for (let i = 0; i < msg.chatinfos.length; i++) {
                    if (msg.chatinfos[i].type - 1 != 6) {
                        newChatList.push(msg.chatinfos[i]);
                    }
                }
            } else {
                for (let i = 0; i < msg.chatinfos.length; i++) {
                    if (this._chatFilter[this._curType - 1] == msg.chatinfos[i].type - 1) {
                        newChatList.push(msg.chatinfos[i]);
                    }
                }
            }

            // 聊天内容list列表
            this.InitChatList();
            // 红点
            this.SetTips();
        }

        public AddChatDataToMapLast(msgList) {
            for (let i = 0; i < msgList.length; i++) {
                if (msgList[i].type != message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {
                    this._chatMap[0].push(msgList[i]);
                    // Game.PlayerChatDataSystem.chatInfos.push(msgList[i]);
                    if (this._chatFilter[msgList[i].type - 1] != null) {
                        this._chatMap[this._chatFilter[msgList[i].type - 1]].push(msgList[i]);
                    }
                }
            }
        }

        /**
         * 监听事件
         */
        public monitorEvent() {
            this.ButtonWorld.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWorld, this);// 综合
            this.ButtonServer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonServer, this);// 本服
            this.ButtonWhisper.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWhisper, this);// 私聊
            this.ButtonWorderland.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonWorderland, this);// 工会
            // this.NodeChannel.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onNodeChannel, this);// 切换频道
            this.listPinDao.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onNodeChannel, this);
            // this.NodeChannel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNodeChannel, this);// 切换频道
            this.EditBoxChannel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBox, this);
            this.ButtonShrink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonShrink, this);// 关闭 

            Game.EventManager.on(GameEvent.FRIEND_CHAT, this.onFriendPrivateChat, this);// 好友/公会私聊     
            Game.EventManager.on(GameEvent.CLOSE_CHAT, this.onButtonShrink, this);
        }

        private onBtnBox() {
            if (this.groupPindao.visible == true) {
                this.groupPindao.visible = false;
            } else {
                this.groupPindao.visible = true;
            }
        }

        /**
         * 好友私聊    
         */
        public onFriendPrivateChat(e) {
            this.friendId = e.data.id;
            this.friendName = e.data.name;
            this.friendGroupId = e.data.group_id;
            this.personageType = e.data.type;
            this.privateChat = false;

            this.receiverId = this.friendId;
            this.receiverName = this.friendName;
            this.group_id = this.friendGroupId;

            this.onButtonWhisper();
        }


        /** 
        * 将所有按钮颜色变暗 
        */
        private btnColour() {
            // Set.ButtonBackgroud(this.ButtonWorld, "ui_chat_ButtonChatTypeDis_png");
            // Set.ButtonBackgroud(this.ButtonServer, "ui_chat_ButtonChatTypeDis_png");
            // Set.ButtonBackgroud(this.ButtonWhisper, "ui_chat_ButtonChatTypeDis_png");
            // Set.ButtonBackgroud(this.ButtonWorderland, "ui_chat_ButtonChatTypeDis_png");
            this.ButtonWorld.source = cachekey("ui_chat_ButtonChatTypeDis_png", this);
            this.ButtonServer.source = cachekey("ui_chat_ButtonChatTypeDis_png", this);
            this.ButtonWhisper.source = cachekey("ui_chat_ButtonChatTypeDis_png", this);
            this.ButtonWorderland.source = cachekey("ui_chat_ButtonChatTypeDis_png", this);

            Helper.SetImageFilterColor(this.titleWorld);
            Helper.SetImageFilterColor(this.titleServer);
            Helper.SetImageFilterColor(this.titleWhisper);
            Helper.SetImageFilterColor(this.titleWorderland);
        }

        /**
         * 综合
         */
        public onButtonWorld() {
            console.log("点击综合");
            if (this.indexId == 0) {
                return;
            }
            this.scrollBar.stopAnimation();

            if (!Device.isReviewSwitch) {
                this.NodeChannel.visible = true;
            }
            this.TableViewChat.scrollV = 0;
            this.indexId = 0;
            this.btnColour();
            this.ButtonWorld.source = cachekey("ui_chat_ButtonChatTypeSel_png", this);
            Helper.SetImageFilterColor(this.titleWorld, 'yellow');
            // 存储聊天数据
            //this.LoadChatDataFromPlayer();
            this.InitChatList();

            // Set.ButtonBackgroud(this.ButtonWorld, "ui_chat_ButtonChatTypeSel_png");

            this._chatType = 0;
            this._curType = 0;
            Game.PlayerChatDataSystem.chatRecordType = this._chatType;
            this.ButtonDelegate("World");

            this.SetInfoLeagueNotice();// 公会公告
            console.log("进入综合");
        }

        /**
        * 本服
        */
        public onButtonServer() {
            console.log("点击本服");
            if (this.indexId == 1) {
                return;
            }
            this.scrollBar.stopAnimation();
            this.TableViewChat.scrollV = 0;
            this.NodeChannel.visible = false;
            this.indexId = 1;
            this.btnColour();
            this.ButtonServer.source = cachekey("ui_chat_ButtonChatTypeSel_png", this);
            Helper.SetImageFilterColor(this.titleServer, 'yellow');
            // 存储聊天数据
            //this.LoadChatDataFromPlayer();
            this.InitChatList();

            // Set.ButtonBackgroud(this.ButtonServer, "ui_chat_ButtonChatTypeSel_png");

            this._chatType = 1;
            this._curType = 1;
            Game.PlayerChatDataSystem.chatRecordType = this._chatType;
            this.ButtonDelegate("Server");

            this.SetInfoLeagueNotice();// 公会公告
            console.log("进入本服");
        }

        /**
        * 私聊
        */
        public onButtonWhisper() {
            console.log("点击私聊");
            if (this.indexId == 3) {
                return;
            }
            this.scrollBar.stopAnimation();
            this.TableViewChat.scrollV = 0;
            this.NodeChannel.visible = false;
            this.indexId = 3;
            this.btnColour();
            this.ButtonWhisper.source = cachekey("ui_chat_ButtonChatTypeSel_png", this);
            Helper.SetImageFilterColor(this.titleWhisper, 'yellow');
            // 存储聊天数据
            //this.LoadChatDataFromPlayer();
            this.InitChatList();
            this.listBottomData.refresh();

            // Set.ButtonBackgroud(this.ButtonWhisper, "ui_chat_ButtonChatTypeSel_png");

            this._chatType = 3;
            this._curType = 3
            Game.PlayerChatDataSystem.chatRecordType = this._chatType;
            this.ButtonDelegate("Whisper");

            this.SetInfoLeagueNotice();// 公会公告
            console.log("进入私聊");
        }

        /**
        * 工会
        */
        public onButtonWorderland() {
            console.log("点击公会");
            if (this.indexId == 2) {
                return;
            }
            this.scrollBar.stopAnimation();
            this.TableViewChat.scrollV = 0;
            this.NodeChannel.visible = false;
            this.indexId = 2;
            this.btnColour();
            this.ButtonWorderland.source = cachekey("ui_chat_ButtonChatTypeSel_png", this);
            Helper.SetImageFilterColor(this.titleWorderland, 'yellow');
            // 存储聊天数据
            //this.LoadChatDataFromPlayer();
            this.InitChatList();

            // Set.ButtonBackgroud(this.ButtonWorderland, "ui_chat_ButtonChatTypeSel_png");

            this._chatType = 2;
            this._curType = 2;
            Game.PlayerChatDataSystem.chatRecordType = this._chatType;
            this.ButtonDelegate("Worderland");

            this.SetInfoLeagueNotice();// 公会公告
            console.log("进入公会");
        }

        /**
        * 切换频道
        */
        public onNodeChannel(e: eui.ItemTapEvent) {
            if (this.listPinDaoIndex == e.itemIndex) {
                toast_success(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.change_channel_success, Game.PlayerChatDataSystem.chatInfo.chat_channel_id));
                this.groupPindao.visible = false;
                return;
            }
            if (this.listPinDaoIndex != e.itemIndex) {
                this.listPinDaoItem.itemUpdated(this.listPinDaoItem.source[e.itemIndex]);
                this.listPinDaoItem.itemUpdated(this.listPinDaoItem.source[this.listPinDaoIndex]);
                this.listPinDaoIndex = e.itemIndex;
            }
            // toast_success("成功切换到频道0");
            let content = this.listPinDaoIndex + 1;
            Game.PlayerChatDataSystem.chatInfo.chat_channel_id = this.listPinDaoIndex + 1;
            let num = Number(content);
            if (num && num > 0 && num <= 99) {
                this.EnterChatReq(num);
            } else {
                toast_warning(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.input_not_number, 99));
                this.LbelSelectedChannel.text = String(Game.PlayerChatDataSystem.chatInfo.chat_channel_id);
            }
            if (this.groupPindao.visible == true) {
                this.groupPindao.visible = false;
            }

            let cht = new message.ChatMessage();
            cht.type = message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM;
            cht.content = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.enter_chat, (Game.PlayerChatDataSystem.chatInfo.chat_channel_id));
            // Game.PlayerChatDataSystem.chatInfos.push(cht);

            let request = new message.ChatMessageNoticeRequest();
            request.body.chatinfos.push(cht);
            Game.EventManager.event(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, request);
            this.onButtonWorld();


        }

        public EnterChatReq(channelId) {
            Game.PlayerChatDataSystem.SwitchingChannel(channelId).then(() => {
                this.LbelSelectedChannel.text = String(Game.PlayerChatDataSystem.chatInfo.chat_channel_id);
                toast_success(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.change_channel_success, Game.PlayerChatDataSystem.chatInfo.chat_channel_id));
            }).catch((result) => {

            });
            this.LbelSelectedChannel.text = String(Game.PlayerChatDataSystem.chatInfo.chat_channel_id);
        }


        /**
        * 公会公告
        */
        public SetInfoLeagueNotice() {
            if (this.indexId == 2) {
                if (Game.PlayerInfoSystem.BaseInfo != null) {
                    if (Game.PlayerInfoSystem.BaseInfo.leagueId != 0 && Game.PlayerLeagueSystem.LeagueInfo != null && Game.PlayerLeagueSystem.LeagueInfo.info != null) {
                        this.JoinGuild();// 公告数据-工会获取
                    } else {
                        this.QuitGuild();// 未加入公会不提示公告
                    }
                } else {
                    this.QuitGuild();
                }
            } else {
                this.QuitGuild();
            }
        }

        /**
         * 公告数据-工会获取
         */
        public JoinGuild() {
            this.NodeLeagueNotice.visible = true;
            this.scrollBar.top = 160;
            // this.scrollBar.height = 350;
            // this.TableViewChat.height = 350;
            this.LabelLeagueNotice.textFlow = Util.RichText(
                HelpUtil.textConfigFormat(
                    TextsConfig.TextConfig_League.home_pop_notice2, Game.PlayerLeagueSystem.getNotice(
                        (Game.PlayerLeagueSystem.BaseInfo.notice)
                    )
                )
            );
        }

        /**
         * 未加入公会不提示公告
         */
        public QuitGuild() {
            this.NodeLeagueNotice.visible = false;
            this.scrollBar.top = 90;
            // this.scrollBar.height = 450;
            // this.TableViewChat.height = 450;
            this.LabelLeagueNotice.text = "";
        }

        /**
        * 关闭
        */
        public onButtonShrink() {
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
                .call(() => {
                    this.close();
                });
        }

        /**
         * 注销事件
         */
        public cancelEvent() {
            Game.EventManager.off(GameEvent.FRIEND_CHAT, this.onFriendPrivateChat, this)
            Game.EventManager.off(GameEvent.CLOSE_CHAT, this.onButtonShrink, this);
        }

        /**
         * 行数
         */
        public ChatStrlineNum(info: string, width: number, ) {
            let lineNum = 1;
            let richStrArr = Util.RichText(info);
            let richStr = "";
            let chatStr = "　";
            for (let i = 0; i < richStrArr.length; i++) {
                richStr = richStr + richStrArr[i].text;
            }
            this.labelString.text = richStr;
            let richStrArrWidth = this.labelString.width;
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
        }
    }

}