namespace zj {
// 邮件-信件
// lizhengqiang
// 20190517
export class Mail_Letter extends Dialog {
    private btnClose: eui.Button;
    private lbTitle: eui.Label;
    private lbFrom: eui.Label;
    private lbTime: eui.Label;
    private lbContent: eui.Label;
    private btnDetail: eui.Button;
    private btnAddFriend: eui.Button;
    private btnSetPrivate: eui.Button;
    private btnReply: eui.Button;

    private info: message.MailInfo = null;
    private father = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/mail/Mail_LetterSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnDetail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDetail, this);
        this.btnAddFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddFriend, this);
        this.btnSetPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSetPrivate, this);
        this.btnReply.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReply, this);
    }

    public setInfo(info: message.MailInfo) {
        this.info = info;
        let role = info.roleBaseInfo[0];

        this.lbTitle.text = info.title;
        this.lbFrom.text = role.name;
        this.lbTime.text = Set.TimeForMail(info.createtime);
        this.lbContent.textFlow = Util.RichText(info.content);
    }

    private onBtnDetail() {
        TipManager.ReqRoleInfo(this.info.from_id, this.info.roleBaseInfo[0].group_id);
    }

    private onBtnAddFriend() {
        TipManager.RelationAdd(this.info.from_id, () => { this.close() });
    }

    private onBtnSetPrivate() {
        let role = this.info.roleBaseInfo[0];
        loadUI(Chat_Main)
            .then((dialog: Chat_Main) => {
                Game.EventManager.event(GameEvent.FRIEND_CHAT, { id: role.id, name: role.name, group_id: null });
                dialog.show();
                this.onBtnClose();
            });
    }

    private onBtnReply() {
        loadUI(Common_Letter)
            .then((dailog: Common_Letter) => {
                dailog.show();
                dailog.setInfo(this.info);
            });
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