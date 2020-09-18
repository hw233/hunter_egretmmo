namespace zj {
// 邮件-系统
// lizhengqiang
// 20190517
export class Mail_Sys extends Dialog {
    private btnClose: eui.Button;
    private lbTitle: eui.Label;
    private lbFrom: eui.Label;
    private lbTime: eui.Label;
    private lbContent: eui.Label;

    private father = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/mail/Mail_SysSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
    }

    public setInfo(info: message.MailInfo) {
        this.lbTitle.text = info.title;
        this.lbFrom.text = TextsConfig.TextsConfig_Mail.system;
        this.lbTime.text = Set.TimeForMail(info.createtime);
        this.lbContent.textFlow = Util.RichText(info.content);
    }

    public setFather(father) {
        this.father = father;
    }

    private onBtnClose() {
        if (this.father && this.father.groupMail) {
            egret.Tween.get(this.father.groupMail).to({ scaleX: 1, scaleY: 1 }, 150);
        }

        this.close(UI.HIDE_TO_TOP);
    }
}
}