namespace zj {
// 邮件-系统item
// lizhengiang
// 20190516
export class Mail_SysItem extends eui.ItemRenderer {
    private groupItem: eui.Group;
    private imgBG: eui.Image;
    private imgLogo: eui.Image;
    private lbTitle: eui.Label;
    private lbFrom: eui.Label;
    private lbTime: eui.Label;
    private imgRead: eui.Image;
    private imgGet: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/mail/Mail_SysItemSkin.exml";
        cachekeys(<string[]>UIResource["Mail_SysItem"], null);
        this.groupItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
    }

    protected dataChanged() {
        let info = this.data.info;
        closeCache(this.groupItem);
        let pathLogo: string = info.is_read ? UIConfig.UIConfig_Mail.read[0] : UIConfig.UIConfig_Mail.read[1];
        let bRead: boolean = !info.is_read;
        let bGet: boolean = info.attachment.length > 0 && !info.is_attachment;
        let strTitle: string = info.title;
        let strFrom: string = TextsConfig.TextsConfig_Mail.from + TextsConfig.TextsConfig_Mail.system;
        let strTime: string = Set.TimeOffset(info.createtime);

        this.imgLogo.source = cachekey(pathLogo, this);
        this.imgRead.visible = bRead;
        this.imgGet.visible = bGet;
        this.lbTitle.text = strTitle;
        this.lbFrom.text = strFrom;
        this.lbTime.text = strTime;

        let callFunctionName = this.data.callFunctionName;
        if (callFunctionName == "read") {
            this.setInfoRead();
        } else if (callFunctionName == "get") {
            this.setInfoGet();
        }
        setCache(this.groupItem);
    }

    private setInfoRead() {
        this.imgRead.visible = false;
        this.imgLogo.source = cachekey(UIConfig.UIConfig_Mail.read[0], this);
    }

    private setInfoGet() {
        this.imgGet.visible = false;
    }

    private onClickItem() {
        if (this.data.father.setSelect != null) {
            this.data.father.setSelect(this.data.index);
        }
    }
}
}