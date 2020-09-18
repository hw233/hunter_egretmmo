namespace zj {
// 列表游戏分区的item reader
// guoshanhe 创建于2018.11.15

export class GameGroupIR extends eui.ItemRenderer{
    private btnSelect: eui.Button;
    private imgRecommend: eui.Image;
    private imgInitialed: eui.Image;
    private imgClose: eui.Image;
    private imgGood: eui.Image;
    private imgBusy: eui.Image;
    private imgFull: eui.Image;
    private lbGroupName: eui.Label;

    public constructor(){
        super();
        this.skinName = "resource/skins/login/GameGroupIRSkin.exml";
        this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelect, this);
    }

    private onBtnSelect(){
        //toast("item");
    }
    
    protected dataChanged(){
        this.imgRecommend.visible = this.data.is_recommend;
        this.imgInitialed.visible = this.data.is_initialed;
        this.imgClose.visible = false;
        this.imgBusy.visible = false;
        this.imgFull.visible = false;
        this.imgGood.visible = false;
        this.btnSelect.enabled = true;
        if (this.data.status == 4) {
            this.imgFull.visible = true;
        } else if (this.data.status == 3) {
            this.imgBusy.visible = true;
        } else if (this.data.status == 2) {
            this.imgGood.visible = true;
        } else {
            this.imgClose.visible = true;
            this.btnSelect.enabled = false;
        }
        this.lbGroupName.text = this.getGroupName(this.data.group_name);
        console.log("GameGroupIR dataChanged ", this.lbGroupName.text);
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