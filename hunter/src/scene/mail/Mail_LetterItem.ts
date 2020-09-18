namespace zj {
// 邮件-信件item
// lizhengiang
// 20190517
export class Mail_LetterItem extends eui.ItemRenderer {
    private groupItem: eui.Group;
    private imgBG: eui.Image;
    private imgFrame: eui.Image;
    private imgUser: eui.Image;
    private lbTitle: eui.Label;
    private lbFrom: eui.Label;
    private lbTime: eui.Label;
    private imgRead: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/mail/Mail_LetterItemSkin.exml";
        cachekeys(<string[]>UIResource["Mail_LetterItem"], null);
        this.groupItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
    }

    protected dataChanged() {
        closeCache(this.groupItem);
        let info = this.data.info;
        let role = info.roleBaseInfo[0];
        let pathFrame = PlayerItemSystem.ItemPath(role.picFrameId);
        let pathUser = PlayerItemSystem.ItemPath(role.picId);
        let bRead: boolean = !info.is_read;
        let strTitle: string = info.title;
        let strFrom: string = TextsConfig.TextsConfig_Mail.from + TextsConfig.TextsConfig_Mail.system;
        let strTime: string = Set.TimeOffset(info.createtime);

        this.imgFrame.source = cachekey(pathFrame, this);
        this.imgUser.source = cachekey(pathUser, this);
        this.imgRead.visible = bRead;
        this.lbTitle.text = strTitle;
        this.lbFrom.text = strFrom;
        this.lbTime.text = strTime;

        let callFunctionName = this.data.callFunctionName;
        if (callFunctionName == "read") {
            this.setInfoRead();
        }
        setCache(this.groupItem);
    }

    public setInfoRead() {
        this.imgRead.visible = false;
    }

    private onClickItem() {
        if (this.data.father.setSelect != null) {
            this.data.father.setSelect(this.data.index);
        }
    }
}
}