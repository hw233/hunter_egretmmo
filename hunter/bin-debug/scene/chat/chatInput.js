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
     * 输入
     */
    var chatInput = (function (_super) {
        __extends(chatInput, _super);
        function chatInput() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/chat/Chat_ItemInputAllySkin.exml";
            _this.monitorEvent();
            return _this;
        }
        chatInput.prototype.ClearContent = function () {
            this.EditBoxChat.text = "";
            this.EditBoxChat.prompt = zj.LANG(zj.TextsConfig.TextConfig_Input.chat);
        };
        /**
         * 事件监听
         */
        chatInput.prototype.monitorEvent = function () {
            this.EditBoxChat.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onEditBoxChat, this); // 输入框
            this.ButtonSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSend, this); // 发送   
        };
        /**
         * 发送
         */
        chatInput.prototype.onButtonSend = function () {
            if (this.Chat_Main._chatType == zj.ConstantConfig_Chat.typeLua.whisper - 1) {
                if (this.Chat_Main.receiverId != 0 && this.Chat_Main.receiverName != "") {
                }
                else {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Chat.no_receiver);
                    return;
                }
            }
            // 限制
            var content = this.Chat_Main.content.trim();
            if (content.length == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Chat.send_err_2);
            }
            else {
                this.SendChatReq();
            }
        };
        /**
         * 输入框文本
         */
        chatInput.prototype.onEditBoxChat = function () {
            var content = this.EditBoxChat.text;
            this.Chat_Main.content = content;
            this.EditBoxChat_PERSONAL();
        };
        /**
         * 发协议--上传服务器
         */
        chatInput.prototype.SendChatReq = function () {
            var _this = this;
            zj.Game.PlayerChatDataSystem.SendChat(this.Chat_Main._chatType, this.Chat_Main.receiverId, this.Chat_Main.content, this.Chat_Main.group_id)
                .then(function () {
                _this.Chat_Main.content = "";
                _this.EditBoxChat.text = "";
            }).catch(function (result) {
            });
        };
        /**
         * 私聊
         */
        chatInput.prototype.SetInfo = function (father) {
            this.Chat_Main = father;
            if (this.Chat_Main._curType == zj.ConstantConfig_Chat.typeLua.whisper - 1 && this.Chat_Main.receiverId != 0 && this.Chat_Main.receiverName != "") {
                var strHold = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.input_whisper, this.Chat_Main.receiverName, zj.TextsConfig.TextConfig_Input.chat);
                this.EditBoxChat.prompt = zj.LANG(strHold);
            }
        };
        /**
         * 私聊
         */
        chatInput.prototype.EditBoxChat_PERSONAL = function () {
            if (this.Chat_Main._curType != zj.ConstantConfig_Chat.typeLua.whisper - 1) {
                return;
            }
            if (this.Chat_Main.receiverId != 0 && this.Chat_Main.receiverName != "" && this.Chat_Main.content != "") {
                var str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Chat.input_whisper, this.Chat_Main.receiverName, this.Chat_Main.content);
                this.EditBoxChat.text = str;
            }
        };
        return chatInput;
    }(zj.UI));
    zj.chatInput = chatInput;
    __reflect(chatInput.prototype, "zj.chatInput");
})(zj || (zj = {}));
//# sourceMappingURL=chatInput.js.map