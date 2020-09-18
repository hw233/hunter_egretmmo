namespace zj {
    /**
     * 聊天内容
     */
    export class Chat_ItemMini extends UI {
        public LayerCC: eui.Group;
        public LabelName: eui.Label;// 系统提示
        public LabelTitle: eui.Label;// 标头
        public LabelChat: eui.Label;// 聊天内容

        public dataInfo;
        public _msgInfo;
        public dataSenderName;
        public dataContent;
        public contentType;
        public showType;
        public receiverName;
        public senderId;

        private groupHead: eui.Group;
        private imgType: eui.Image;
        private imgIconBg: eui.Image;
        private imgIcon: eui.Image;
        private imgFrame: eui.Image;

        public _touchName: boolean = true;
        public _reqId;

        public Chat_Main: Chat_Main;
        private colorName: number = 0x4a4a4a;
        private colorMsg: number = 0x59727d;
        public constructor(Chat_Main: Chat_Main) {
            super();
            this.Chat_Main = Chat_Main;
            this.skinName = "resource/skins/chat/Chat_ItemMiniSkin.exml";
            this.monitorEvent();
        }

        public monitorEvent() {
            this.groupHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelName, this);
            this.LabelName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelName, this);
            this.LabelTitle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelTitle, this);
        }

        public onLabelName() {
            if (this.dataInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_WORLD && this.dataInfo.show_type == message.ChatShowType.CHAT_SHOW_TYPE_RECRUIT) {
                if (this._touchName == true) {
                    return;
                } else {
                    // 帮会招募
                    this.ReqLeagueInfo();
                }
            } else {
                if (this.dataInfo.type == 5 ||
                    (this.dataInfo.type == 3 && this.dataInfo.sender_id == 0) ||
                    (this.dataInfo.type == 1 && this.dataInfo.sender_id == 0) ||
                    this.dataInfo.type == 4) {
                    return;
                } else {
                    this.ReqRoleInfo();
                }
            }
        }

        public onLabelTitle() {
            this._touchName = false;
            this.onLabelName();
        }

        public ReqLeagueInfo() {
            Game.PlayerChatDataSystem.organizationChat1(this.dataInfo)
                .then((msg) => {
                    if (msg != null) {
                        loadUI(LeagueJoinMini)
                            .then((dialog: LeagueJoinMini) => {
                                dialog.SetInfo(msg[0], true);
                                dialog.show(UI.SHOW_FROM_TOP);
                            });
                    }
                })
                .catch(() => {

                });
        }

        public ReqRoleInfo() {
            Game.PlayerChatDataSystem.organizationChat2(this.dataInfo, (a: message.QueryRoleInfoRequest) => { this._reqId = a })
                .then((msg) => {
                    this.ManagePop(msg);
                })
                .catch(() => {

                });
        }

        public ManagePop(msg) {
            if ((this.dataInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM && this.dataInfo.sender_id == 0) ||
                (this.dataInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE && this.dataInfo.sender_id == 0)) {
                return;
            }
            if (this._reqId.body.roleId == Game.PlayerInfoSystem.BaseInfo.id) {
                return;
            }
            loadUI(ChatUserPop).then((dialog: ChatUserPop) => {
                dialog.setMsgInfo(msg, this.dataInfo, this._reqId.body.roleId);
                dialog.show();
            });
        }

        // protected dataChanged() {
        //     this.showData(this.data);
        // }
        public isHasText() {
            if (this.LabelChat.text.trim().length == 0) {
                return false;
            }
            if (this.contentType == "client_chat_scene_boss_6") {
                return Gmgr.Instance.layerId == TableEnumLayerId.LAYER_ZORKBOSS;
            }
            return true;
        }
        private setStage(type: number = 0) {// 0-系统，其他-聊天
            if (type == 0) {
                this.currentState = "system";
                this.imgType.source = cachekey("ui_chat_IconChatInfoType4_png", this);
            } else {
                if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_SCENE_SYSTEM
                    || this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_DARKLAND_SYSTEM) {
                    this.setStage();
                    return;
                }
                if (this.senderId == Game.PlayerInfoSystem.BaseInfo.id) {
                    this.currentState = "right";
                } else {
                    this.currentState = "left";
                }
                if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_PERSONAL) {// 私聊
                    this.imgType.source = cachekey("ui_chat_IconChatInfoType1_png", this);
                } else if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE) {// 工会
                    this.imgType.source = cachekey("ui_chat_IconChatInfoType2_png", this);
                } else if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_WORLD) {// 本服
                    this.imgType.source = cachekey("ui_chat_IconChatInfoType3_png", this);
                } else if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_CROSS) {// 世界
                    this.imgType.source = cachekey("ui_chat_IconChatInfoType6_png", this);
                }
                let framePath = PlayerItemSystem.ItemPath(this.dataInfo.sender_picFrame);
                this.imgFrame.source = cachekey(framePath, this);
                let iconPath = PlayerItemSystem.ItemPath(this.dataInfo.sender_pic);
                this.imgIcon.source = cachekey(iconPath, this);
            }
        }

        public showData(data: message.ChatMessage) {
            closeCache(this.LayerCC);
            this.dataInfo = data;
            this._msgInfo = this.dataInfo.type;
            this.dataSenderName = this.dataInfo.sender_name;
            this.dataContent = this.dataInfo.content;
            this.contentType = this.dataInfo.content_type;
            this.showType = this.dataInfo.show_type;
            this.receiverName = this.dataInfo.receiver_name;
            this.senderId = this.dataInfo.sender_id;

            if (this.dataInfo == null) {
                this.LabelChat.visible = false;
                this.LabelName.visible = false;
                this.LabelTitle.visible = false;
            } else {
                this.LabelName.visible = true;
                let color = ConstantConfig_Chat.contentColor[this._msgInfo - 1];
                this.LabelChat.textColor = Helper.RGBToHex("r:" + color[0].toString() + "," + "g:" + color[1].toString() + "," + "b:" + color[2].toString());
                this.LabelName.textColor = Helper.RGBToHex("r:" + color[0].toString() + "," + "g:" + color[1].toString() + "," + "b:" + color[2].toString());

                // // 帮会招募颜色
                // if (this._msgInfo == 2 && this.showType == 5) {
                //     this.LabelChat.textColor = Helper.RGBToHex("r:79, g:191, b:89");
                //     this.LabelName.textColor = Helper.RGBToHex("r:79, g:191, b:89");
                //     this.LabelTitle.textColor = Helper.RGBToHex("r:79, g:191, b:89");
                // } else if (this._msgInfo == 4 && this.senderId != null) {
                //     this.LabelChat.textColor = Helper.RGBToHex("r:225, g:0, b:225");
                //     this.LabelName.textColor = Helper.RGBToHex("r:225, g:0, b:225");
                //     this.LabelTitle.textColor = Helper.RGBToHex("r:225, g:0, b:225");
                // }
                this.LabelChat.textColor = this.colorMsg;
                this.LabelName.textColor = this.colorName;
                this.LabelTitle.textColor = this.colorMsg;

                // 当前频道
                if (this._msgInfo == 5 || (this._msgInfo == 3 && this.senderId == 0) || (this._msgInfo == 1 && this.senderId == 0)) {
                    this.LabelName.visible = false;
                } else if (this._msgInfo != 4) {
                    if (this.showType == 3 || this.showType == 4) {
                        this.LabelName.visible = false;
                    }
                }

                let content = Game.PlayerChatDataSystem.GetChatInfo(this.dataInfo, 1);
                this.LabelName.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[1]));
                if (this.LabelName.textFlow != undefined) {
                    this.LabelName.visible = true;
                }
                let title: egret.ITextElement[] = Util.RichText(HelpUtil.textConfigFormat(content[0]));
                if (title == undefined || title.length == 0) {
                    this.LabelTitle.visible = false;
                } else {// 公会招募
                    this.LabelTitle.visible = true;
                    this.LabelName.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[0]));
                    this.LabelTitle.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[1]));
                }
                if (this.dataInfo.content_type == "") {
                    if (this._msgInfo == 5) {
                        // this.LabelChat.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[0] + content[1] + content[2]));
                        this.LabelChat.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[2]));
                    } else {
                        // this.LabelChat.text = (content[0] + content[1] + content[2]);
                        this.LabelChat.text = content[2];
                    }
                } else {
                    // this.LabelChat.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[0] + content[1] + content[2]));
                    this.LabelChat.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[2]));
                }

                if (this.LabelTitle.visible == false) {
                    if (this.LabelName.text == "【系统消息】" || this.LabelName.text == "【战报分享】") {// 系统消息      
                        this.setStage();
                        if (this.dataContent == "[]") {
                            let labelWidth = Math.ceil(this.LabelName.width / 20);
                            let str: string = "";
                            for (let i = 0; i < labelWidth; i++) {
                                str = "　" + str;
                            }
                            let a = Util.RichText(HelpUtil.textConfigFormat(content[2]));
                            if (Util.RichText(HelpUtil.textConfigFormat(content[2])).length != 0) {
                                this.LabelChat.textFlow = <Array<egret.ITextElement>>[
                                    // { text: str },//"      "
                                    { text: Util.RichText(HelpUtil.textConfigFormat(content[2]))[0].text },
                                ]
                            } else {
                                this.LabelChat.textFlow = <Array<egret.ITextElement>>[
                                    { text: str },//"      "
                                    // { text: Util.RichText(HelpUtil.textConfigFormat(content[2]))[1].text },
                                ]
                            }
                        }
                        let text = this.LabelChat.text;
                        this.LabelChat.textFlow = null;
                        this.LabelChat.text = text;
                        // else if(this._msgInfo == 5){
                        //     let labelWidth = Math.ceil(this.LabelName.width / 20);
                        //     let str: string = "";
                        //     for (let i = 0; i < labelWidth; i++) {
                        //         str = "　" + str;
                        //     }
                        //      this.LabelChat.textFlow = <Array<egret.ITextElement>>[
                        //             { text: str },//"      "
                        //             { text: this.dataContent },
                        //         ]
                        // }

                    } else {// 其他    
                        this.setStage(1);
                        this.LabelChat.text = content[2];
                        // if (this._msgInfo == 4) {
                        //     this.LabelName.textFlow = <Array<egret.ITextElement>>[
                        //         { text: "【" },
                        //         { text: this.LabelName.text, style: { "underline": true } },
                        //         { text: "】" },
                        //     ]
                        //     let labelWidth = Math.ceil(this.LabelName.width / 20);
                        //     let str: string = "";
                        //     for (let i = 0; i < labelWidth; i++) {
                        //         str = "　" + str;
                        //     }
                        //     this.LabelChat.textFlow = <Array<egret.ITextElement>>[
                        //         { text: str },//"        "
                        //         { text: content[2] },
                        //     ]
                        // } else {
                        //     this.LabelName.textFlow = <Array<egret.ITextElement>>[
                        //         { text: "【" },
                        //         { text: this.LabelName.text, style: { "underline": true } },
                        //         { text: "】" },
                        //     ]
                        //     let labelWidth = Math.ceil(this.LabelName.width / 20);
                        //     let str: string = "";
                        //     for (let i = 0; i < labelWidth; i++) {
                        //         str = "　" + str;
                        //     }
                        //     this.LabelChat.textFlow = <Array<egret.ITextElement>>[
                        //         { text: str },//"       "
                        //         { text: content[2] },
                        //     ]
                        // }
                    }
                } else {// 公会招募
                    this.setStage();
                    // this.LabelName.textFlow = <Array<egret.ITextElement>>[
                    //     { text: this.LabelName.text },
                    // ]
                    // let WidthName = this.LabelName.width;
                    // this.LabelTitle.textFlow = <Array<egret.ITextElement>>[
                    //     { text: this.LabelTitle.text },
                    // ]
                    // let WidthTitle = this.LabelTitle.width;
                    // let strtext: string = "";
                    // for (let i = 0; i < WidthName / 20; i++) {
                    //     strtext = "　" + strtext;
                    // }
                    this.LabelName.visible = false;
                    let str = this.LabelName.text;
                    this.LabelTitle.textFlow = <Array<egret.ITextElement>>[
                        // { text: strtext },//"       "
                        // { text: "【" },
                        { text: str, style: { "underline": true, } },
                        // { text: "】" },
                    ]
                    // let labelWidth = Math.ceil((WidthName + WidthTitle) / 20) + 1;

                    // let str: string = "";
                    // for (let i = 0; i < labelWidth; i++) {
                    //     str = "　" + str;
                    // }
                    this.LabelChat.textFlow = <Array<egret.ITextElement>>[
                        // { text: "【" },
                        { text: str, style: { "underline": true, } },
                        // { text: "】" },
                        // { text: "  " },
                        // { text: str },
                        { text: content[2] },
                    ]
                }
            }
            setCache(this.LayerCC);
        }

    }

    export class FormatChatData {
        public Data: number;
        public itemNum: number;
        public height: number;
    }

}