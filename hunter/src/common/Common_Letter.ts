namespace zj {
// 写信
// lizhengqiang
// 20190518
export class Common_Letter extends Dialog {
    private lbTitle: eui.EditableText;
    private lbName: eui.Label;
    private lbContent: eui.EditableText;
    private btnClose: eui.Button;
    private btnSend: eui.Button;


    private info: message.MailInfo = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/common/Common_LetterSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSend, this);

        this.init();
    }

    private init() {
        this.lbTitle.textColor = ConstantConfig_Common.Color.letter_result;
        this.lbTitle.promptColor = ConstantConfig_Common.Color.letter_default;
        this.lbTitle.prompt = "标题需要两个字可以发送";

        this.lbContent.textColor = ConstantConfig_Common.Color.letter_result;
        this.lbContent.promptColor = ConstantConfig_Common.Color.letter_default;
        this.lbContent.prompt = "请输入信件内容（最长不可超过150字）";
    }

    public setInfo(info: message.MailInfo) {
        this.info = info;
        this.setInfoLetter();
    }

    private setInfoLetter() {
        let role = this.info.roleBaseInfo[0];
        this.lbName.text = Helper.StringFormat(TextsConfig.TextsConfig_Mail.GetMessage, role.name);
    }

    private onBtnSend() {
        if (this.lbTitle.text.length < CommonConfig.limit_mail_title_min) {
            toast_warning(LANG(TextsConfig.TextsConfig_Mail.title_min));
        } else if (this.lbTitle.text.length > 10) {
            toast_warning(LANG(TextsConfig.TextsConfig_Mail.title_max));
        } else if (this.lbContent.text.length < CommonConfig.limit_mail_content_min) {
            toast_warning(LANG(TextsConfig.TextsConfig_Mail.content_min));
        } else if (this.lbContent.text.length > 150) {
            toast_warning(LANG(TextsConfig.TextsConfig_Mail.content_max));
        } else {
            Game.PlayerMailSystem.sendRoleMail(this.info.type, this.info.from_id, this.info.roleBaseInfo[0].name, this.lbTitle.text, this.lbContent.text).then(() => {
                toast_success(LANG(TextsConfig.TextsConfig_Mail.send_success));
                this.onBtnClose();
            });
        }
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}