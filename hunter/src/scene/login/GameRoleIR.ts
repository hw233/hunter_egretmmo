namespace zj {
// 列表游戏角色的item reader
// guoshanhe 创建于2018.11.15

export class GameRoleIR extends eui.ItemRenderer {
    private btnSelect: eui.Button;
    private lbRoleName: eui.Label;
    private lbGroupName: eui.Label;
    private imgHeader: eui.Image;
    private imgFrame: eui.Image;
    private imgVIP: eui.Image;
    private lbLevel: eui.BitmapLabel;

    public constructor() {
        super();
        this.skinName = "resource/skins/login/GameRoleIRSkin.exml";
        this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelect, this);
    }

    private onBtnSelect() {
        //toast("item");
    }

    protected dataChanged() {
        if(Device.isReviewSwitch && Util.isWxMiniGame()) {
            this.imgHeader.source = cachekey("wx_" + TableItemPic.Item(Number(this.data.role.role_features[0].value)).path, this);
        }else{
            this.imgHeader.source = cachekey(TableItemPic.Item(Number(this.data.role.role_features[0].value)).path, this);
        }
        this.imgFrame.source = cachekey(TableItemPicFrame.Item(Number(this.data.role.role_features[1].value)).path, this);
        this.lbRoleName.text = this.data.role.role_name;
        this.lbGroupName.text = this.getGroupName(this.data.group.group_name);
        this.lbLevel.text = this.data.role.role_level + "";
        if (Device.isReviewSwitch) {
            this.imgVIP.visible = false;
        }else{
            this.imgVIP.source = "ui_common_WordsVip" + this.data.role.role_vip + "_png";
        }
    }

    // 取出分区名
    private getGroupName(group_name: string): string {
        let json = JSON.parse(group_name);
        if (typeof json != "object") return this.parseGroupName(group_name);
        if (Game.LanguageManager.getLang() in json) return this.parseGroupName(json[Game.LanguageManager.getLang()]);
        if ('zhcn' in json) return this.parseGroupName(json['zhcn']);
        if ('en' in json) return this.parseGroupName(json['en']);
        for (let k in json) {
            return this.parseGroupName(json[k]);
        }
        return LANG("未知分区");
    }

    // 解析分区名
    private parseGroupName(groupName: string): string {
        let names = groupName.split("&");
        if (names.length <= 1) return Util.cutString(groupName, 16);
        return Util.cutString(`${names[0]}区 ${names[1]}`, 16);
    }
}
}