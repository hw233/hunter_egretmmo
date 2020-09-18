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
     * 聊天内容
     */
    var Chat_ItemMini = (function (_super) {
        __extends(Chat_ItemMini, _super);
        function Chat_ItemMini(Chat_Main) {
            var _this = _super.call(this) || this;
            _this._touchName = true;
            _this.colorName = 0x4a4a4a;
            _this.colorMsg = 0x59727d;
            _this.Chat_Main = Chat_Main;
            _this.skinName = "resource/skins/chat/Chat_ItemMiniSkin.exml";
            _this.monitorEvent();
            return _this;
        }
        Chat_ItemMini.prototype.monitorEvent = function () {
            this.groupHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelName, this);
            this.LabelName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelName, this);
            this.LabelTitle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelTitle, this);
        };
        Chat_ItemMini.prototype.onLabelName = function () {
            if (this.dataInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_WORLD && this.dataInfo.show_type == message.ChatShowType.CHAT_SHOW_TYPE_RECRUIT) {
                if (this._touchName == true) {
                    return;
                }
                else {
                    // 帮会招募
                    this.ReqLeagueInfo();
                }
            }
            else {
                if (this.dataInfo.type == 5 ||
                    (this.dataInfo.type == 3 && this.dataInfo.sender_id == 0) ||
                    (this.dataInfo.type == 1 && this.dataInfo.sender_id == 0) ||
                    this.dataInfo.type == 4) {
                    return;
                }
                else {
                    this.ReqRoleInfo();
                }
            }
        };
        Chat_ItemMini.prototype.onLabelTitle = function () {
            this._touchName = false;
            this.onLabelName();
        };
        Chat_ItemMini.prototype.ReqLeagueInfo = function () {
            zj.Game.PlayerChatDataSystem.organizationChat1(this.dataInfo)
                .then(function (msg) {
                if (msg != null) {
                    zj.loadUI(zj.LeagueJoinMini)
                        .then(function (dialog) {
                        dialog.SetInfo(msg[0], true);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            })
                .catch(function () {
            });
        };
        Chat_ItemMini.prototype.ReqRoleInfo = function () {
            var _this = this;
            zj.Game.PlayerChatDataSystem.organizationChat2(this.dataInfo, function (a) { _this._reqId = a; })
                .then(function (msg) {
                _this.ManagePop(msg);
            })
                .catch(function () {
            });
        };
        Chat_ItemMini.prototype.ManagePop = function (msg) {
            var _this = this;
            if ((this.dataInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM && this.dataInfo.sender_id == 0) ||
                (this.dataInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE && this.dataInfo.sender_id == 0)) {
                return;
            }
            if (this._reqId.body.roleId == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                return;
            }
            zj.loadUI(zj.ChatUserPop).then(function (dialog) {
                dialog.setMsgInfo(msg, _this.dataInfo, _this._reqId.body.roleId);
                dialog.show();
            });
        };
        // protected dataChanged() {
        //     this.showData(this.data);
        // }
        Chat_ItemMini.prototype.isHasText = function () {
            if (this.LabelChat.text.trim().length == 0) {
                return false;
            }
            if (this.contentType == "client_chat_scene_boss_6") {
                return zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_ZORKBOSS;
            }
            return true;
        };
        Chat_ItemMini.prototype.setStage = function (type) {
            if (type === void 0) { type = 0; }
            if (type == 0) {
                this.currentState = "system";
                this.imgType.source = zj.cachekey("ui_chat_IconChatInfoType4_png", this);
            }
            else {
                if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_SCENE_SYSTEM
                    || this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_DARKLAND_SYSTEM) {
                    this.setStage();
                    return;
                }
                if (this.senderId == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                    this.currentState = "right";
                }
                else {
                    this.currentState = "left";
                }
                if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_PERSONAL) {
                    this.imgType.source = zj.cachekey("ui_chat_IconChatInfoType1_png", this);
                }
                else if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE) {
                    this.imgType.source = zj.cachekey("ui_chat_IconChatInfoType2_png", this);
                }
                else if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_WORLD) {
                    this.imgType.source = zj.cachekey("ui_chat_IconChatInfoType3_png", this);
                }
                else if (this._msgInfo == message.ChatChannelType.CHAT_CHANNEL_TYPE_CROSS) {
                    this.imgType.source = zj.cachekey("ui_chat_IconChatInfoType6_png", this);
                }
                var framePath = zj.PlayerItemSystem.ItemPath(this.dataInfo.sender_picFrame);
                this.imgFrame.source = zj.cachekey(framePath, this);
                var iconPath = zj.PlayerItemSystem.ItemPath(this.dataInfo.sender_pic);
                this.imgIcon.source = zj.cachekey(iconPath, this);
            }
        };
        Chat_ItemMini.prototype.showData = function (data) {
            zj.closeCache(this.LayerCC);
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
            }
            else {
                this.LabelName.visible = true;
                var color = zj.ConstantConfig_Chat.contentColor[this._msgInfo - 1];
                this.LabelChat.textColor = zj.Helper.RGBToHex("r:" + color[0].toString() + "," + "g:" + color[1].toString() + "," + "b:" + color[2].toString());
                this.LabelName.textColor = zj.Helper.RGBToHex("r:" + color[0].toString() + "," + "g:" + color[1].toString() + "," + "b:" + color[2].toString());
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
                }
                else if (this._msgInfo != 4) {
                    if (this.showType == 3 || this.showType == 4) {
                        this.LabelName.visible = false;
                    }
                }
                var content = zj.Game.PlayerChatDataSystem.GetChatInfo(this.dataInfo, 1);
                this.LabelName.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[1]));
                if (this.LabelName.textFlow != undefined) {
                    this.LabelName.visible = true;
                }
                var title = zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[0]));
                if (title == undefined || title.length == 0) {
                    this.LabelTitle.visible = false;
                }
                else {
                    this.LabelTitle.visible = true;
                    this.LabelName.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[0]));
                    this.LabelTitle.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[1]));
                }
                if (this.dataInfo.content_type == "") {
                    if (this._msgInfo == 5) {
                        // this.LabelChat.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[0] + content[1] + content[2]));
                        this.LabelChat.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[2]));
                    }
                    else {
                        // this.LabelChat.text = (content[0] + content[1] + content[2]);
                        this.LabelChat.text = content[2];
                    }
                }
                else {
                    // this.LabelChat.textFlow = Util.RichText(HelpUtil.textConfigFormat(content[0] + content[1] + content[2]));
                    this.LabelChat.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[2]));
                }
                if (this.LabelTitle.visible == false) {
                    if (this.LabelName.text == "【系统消息】" || this.LabelName.text == "【战报分享】") {
                        this.setStage();
                        if (this.dataContent == "[]") {
                            var labelWidth = Math.ceil(this.LabelName.width / 20);
                            var str = "";
                            for (var i = 0; i < labelWidth; i++) {
                                str = "　" + str;
                            }
                            var a = zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[2]));
                            if (zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[2])).length != 0) {
                                this.LabelChat.textFlow = [
                                    // { text: str },//"      "
                                    { text: zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[2]))[0].text },
                                ];
                            }
                            else {
                                this.LabelChat.textFlow = [
                                    { text: str },
                                ];
                            }
                        }
                        var text = this.LabelChat.text;
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
                    }
                    else {
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
                }
                else {
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
                    var str = this.LabelName.text;
                    this.LabelTitle.textFlow = [
                        // { text: strtext },//"       "
                        // { text: "【" },
                        { text: str, style: { "underline": true, } },
                    ];
                    // let labelWidth = Math.ceil((WidthName + WidthTitle) / 20) + 1;
                    // let str: string = "";
                    // for (let i = 0; i < labelWidth; i++) {
                    //     str = "　" + str;
                    // }
                    this.LabelChat.textFlow = [
                        // { text: "【" },
                        { text: str, style: { "underline": true, } },
                        // { text: "】" },
                        // { text: "  " },
                        // { text: str },
                        { text: content[2] },
                    ];
                }
            }
            zj.setCache(this.LayerCC);
        };
        return Chat_ItemMini;
    }(zj.UI));
    zj.Chat_ItemMini = Chat_ItemMini;
    __reflect(Chat_ItemMini.prototype, "zj.Chat_ItemMini");
    var FormatChatData = (function () {
        function FormatChatData() {
        }
        return FormatChatData;
    }());
    zj.FormatChatData = FormatChatData;
    __reflect(FormatChatData.prototype, "zj.FormatChatData");
})(zj || (zj = {}));
//# sourceMappingURL=Chat_ItemMini.js.map