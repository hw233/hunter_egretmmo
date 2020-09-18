namespace zj {
/**
 * 输入
 */
export class chatInput extends UI {
    public ButtonSend: eui.Button;// 发送
    public EditBoxChat: eui.EditableText;// 输入框文本
    public Chat_Main: Chat_Main;
    constructor() {
        super();
        this.skinName = "resource/skins/chat/Chat_ItemInputAllySkin.exml";
        this.monitorEvent();
    }

    public ClearContent() {
        this.EditBoxChat.text = "";
        this.EditBoxChat.prompt = LANG(TextsConfig.TextConfig_Input.chat);
    }

    /**
     * 事件监听
     */
    public monitorEvent() {
        this.EditBoxChat.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onEditBoxChat, this)// 输入框
        this.ButtonSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSend, this);// 发送   
    }

    /**
     * 发送
     */
    public onButtonSend() {
        if (this.Chat_Main._chatType == ConstantConfig_Chat.typeLua.whisper - 1) {
            if (this.Chat_Main.receiverId != 0 && this.Chat_Main.receiverName != "") {

            } else {
                toast_warning(TextsConfig.TextsConfig_Chat.no_receiver);
                return;
            }
        }

        // 限制
        let content = this.Chat_Main.content.trim();
        if (content.length == 0) {
            toast_warning(TextsConfig.TextsConfig_Chat.send_err_2);
        } else {
            this.SendChatReq()
        }
    }

    /**
     * 输入框文本
     */
    public onEditBoxChat() {
        let content = this.EditBoxChat.text;
        this.Chat_Main.content = content;
        this.EditBoxChat_PERSONAL();
    }

    /**
     * 发协议--上传服务器
     */
    public SendChatReq() {
        Game.PlayerChatDataSystem.SendChat(this.Chat_Main._chatType, this.Chat_Main.receiverId, this.Chat_Main.content, this.Chat_Main.group_id)
            .then(() => {
                this.Chat_Main.content = "";
                this.EditBoxChat.text = "";
            }).catch((result) => {

            });
    }

    /**
     * 私聊
     */
    public SetInfo(father: Chat_Main) {
        this.Chat_Main = father;
        if (this.Chat_Main._curType == ConstantConfig_Chat.typeLua.whisper - 1 && this.Chat_Main.receiverId != 0 && this.Chat_Main.receiverName != "") {
            let strHold = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.input_whisper, this.Chat_Main.receiverName, TextsConfig.TextConfig_Input.chat);
            this.EditBoxChat.prompt = LANG(strHold);
        }
    }

    /**
     * 私聊
     */
    public EditBoxChat_PERSONAL() {
        if (this.Chat_Main._curType != ConstantConfig_Chat.typeLua.whisper - 1) {
            return;
        }
        if (this.Chat_Main.receiverId != 0 && this.Chat_Main.receiverName != "" && this.Chat_Main.content != "") {
            let str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.input_whisper, this.Chat_Main.receiverName, this.Chat_Main.content);
            this.EditBoxChat.text = str;
        }
    }
}
}