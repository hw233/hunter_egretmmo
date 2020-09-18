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
     * 私聊
     */
    var Chat_ItemDialogue = (function (_super) {
        __extends(Chat_ItemDialogue, _super);
        function Chat_ItemDialogue() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/chat/Chat_ItemDialogueSkin.exml";
            _this.Init();
            _this.monitorEvent();
            return _this;
        }
        Chat_ItemDialogue.prototype.Init = function () {
        };
        Chat_ItemDialogue.prototype.monitorEvent = function () {
            this.ButtonCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonCheck, this);
            this.ButtonShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonShow, this);
        };
        /**
         * 悄悄话
         */
        Chat_ItemDialogue.prototype.onButtonCheck = function () {
            if ((this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM && this.curMsgInfo.senderId == 0) ||
                (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE && this.curMsgInfo.senderId == 0)) {
                return;
            }
            if (this.curMsgInfo.senderId == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                return;
            }
            // 加载Chat_UserPop
            // local pop = PushUI("Chat_UserPop")
            // pop: SetMsgInfo(self.curMsgInfo, self.index)
            // local trans = self.NodePop:convertToWorldSpace(cc.p(0, 0))
            // local sizeBG = pop.SpriteBG:getContentSize()
            // local dstX, dstY = trans.x, trans.y
            // --高度调整
            // if dstY - sizeBG.height / 2 < 0 then
            // dstY = sizeBG.height / 2
            // end
            // pop.AdaptBoard:setPosition(cc.p(dstX, dstY))
            // pop.AdaptBoard:setVisible(false)
            // pop.AdaptBoard:runAction(createAction.PopAction())
        };
        /**
         * 发送内容
         */
        Chat_ItemDialogue.prototype.onButtonShow = function () {
            // 战报
            if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_WONDERLAND || zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_LEAGUE_FIGHT) {
                return;
            }
            if (this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_WARREPORT ||
                this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_WARREPORT_BIG) {
                // 加载Common_BattleReport
                // local ui = PushUI("Common_BattleReport")
                // Gmgr:setReplaySkipType(TableEnumReportSkipType.REPORT_SKIP_CHAT)
                zj.Gmgr.Instance.etReplaySkipType(zj.TableEnum.TableEnumReportSkipType.REPORT_SKIP_CHAT);
            }
        };
        Chat_ItemDialogue.prototype.LoadData = function (index, msgInfo) {
            // 聊天总数据结构的下标
            this.index = index;
            // 当前聊天信息
            //let this.curMsgInfo = msgInfo;
            if (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM ||
                (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE && this.curMsgInfo.senderId == 0)) {
                this.LayerVip.visible = false;
            }
            else {
                if (this.curMsgInfo.roleBaseInfo.length != 0 && this.curMsgInfo.roleBaseInfo[1].vipLevel != 0) {
                    this.LayerVip.visible = true;
                }
                else {
                    this.LayerVip.visible = false;
                }
            }
            // 展示类型
            if (this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_NONE) {
                this.ButtonShow.enabled = false;
            }
            else {
                this.ButtonShow.enabled = true;
            }
            if (this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_WARREPORT ||
                this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_WARREPORT_BIG) {
                this.LayerCommon.visible = false;
            }
            else {
                this.LayerCommon.visible = true;
            }
            // 聊天内容
            var name = "";
            if (this.curMsgInfo.roleBaseInfo.length != 0) {
                name = this.curMsgInfo.roleBaseInfo[1].name;
            }
            var content = zj.Lang.chatContent(this.curMsgInfo);
            // 都先做一下多语言的处理
            content = zj.Set.DecodeJson(content);
            if (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM ||
                (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE && this.curMsgInfo.senderId == 0)) {
                name = zj.TextsConfig.TextsConfig_Chat.say_tag_1;
            }
            else if (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_PERSONAL) {
                if (this.curMsgInfo.senderId == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                    name = zj.TextsConfig.TextsConfig_Chat.say_you;
                    content = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.say_tag_2, (this.curMsgInfo.receiverName, content));
                }
                else {
                    content = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.say_tag_2, (zj.TextsConfig.TextsConfig_Chat.say_you, content));
                }
            }
            this.TextName.text = name;
            // 设置头像、外框
            // 系统的角色信息备用，以后查看详情什么的可能会用到
            if (this.curMsgInfo.type != message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM && this.curMsgInfo.roleBaseInfo.length != 0) {
                var tblHead = zj.TableItemPic.Table();
                var tblFrame = zj.TableItemPicFrame.Table();
                // self.SpriteHead:setTexture(tblHead[this.curMsgInfo.roleBaseInfo[1].picId].path)
                // self.SpriteFrame:setTexture(tblFrame[this.curMsgInfo.roleBaseInfo[1].picFrameId].path)
            }
            this.curMsgInfo = this.curMsgInfo;
        };
        return Chat_ItemDialogue;
    }(zj.UI));
    zj.Chat_ItemDialogue = Chat_ItemDialogue;
    __reflect(Chat_ItemDialogue.prototype, "zj.Chat_ItemDialogue");
})(zj || (zj = {}));
//# sourceMappingURL=Chat_ItemDialogue.js.map