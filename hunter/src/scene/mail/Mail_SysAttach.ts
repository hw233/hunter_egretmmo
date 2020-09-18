namespace zj {
// �ʼ�-ϵͳ-����ȡ
// lizhengqiang
// 20190517
export class Mail_SysAttach extends Dialog {
    private btnClose: eui.Button;
    private lbTitle: eui.Label;
    private lbFrom: eui.Label;
    private lbTime: eui.Label;
    private lbContent: eui.Label;
    private lstViewAttach: eui.List;
    private imgGet: eui.Image;
    private btnGet: eui.Button;

    private info: message.MailInfo = null;
    private father = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/mail/Mail_SysAttachSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
    }

    public setInfo(info: message.MailInfo) {
        this.info = info;

        this.lbTitle.text = info.title;
        this.lbFrom.text = TextsConfig.TextsConfig_Mail.system;
        this.lbTime.text = Set.TimeForMail(info.createtime);
        this.lbContent.textFlow = Util.RichText(info.content);
        this.btnGet.enabled = !info.is_attachment;
        this.imgGet.visible = info.is_attachment;

        let arrCollection = new eui.ArrayCollection();
        for (const v of info.attachment) {
            arrCollection.addItem({ itemInfo: v });
        }

        this.lstViewAttach.dataProvider = arrCollection;
        this.lstViewAttach.itemRenderer = Mail_AttachItem_;
    }

    public setFather(father) {
        this.father = father;
    }

    private runActionGet = () => {
        this.imgGet.visible = true;
        egret.Tween.get(this.imgGet)
            .to({ scaleX: 4, scaleY: 4 }, 0)
            .to({ scaleX: 0.7, scaleY: 0.7 }, 100)
            .to({ scaleX: 1, scaleY: 1 }, 100)
            .call(() => {
                this.btnGet.enabled = false;
            })
            .call(() => {
                this.onBtnClose();
            });
    }

    private onBtnGet() {
        this.btnGet.enabled = false;
        Game.PlayerMailSystem.saveAttachment(this.info.type, [this.info.mailId]).then(() => {
            this.father.setMailIsGet();
            loadUI(CommonGetDialog)
                .then((dialog: CommonGetDialog) => {
                    dialog.show();
                    dialog.init(this.info.attachment);
                    dialog.setCB(this.runActionGet);
                });
        }).catch(() => {
            this.btnGet.enabled = true;
        });
    }

    private onBtnClose() {
        if (this.father && this.father.groupMail) {
            egret.Tween.get(this.father.groupMail).to({ scaleX: 1, scaleY: 1 }, 150);
        }

        this.close(UI.HIDE_TO_TOP);
    }
}
}