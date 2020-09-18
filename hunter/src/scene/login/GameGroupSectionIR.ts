namespace zj {
// 列表游戏分区区段的item reader
// guoshanhe 创建于2018.11.15

export class GameGroupSectionIR extends eui.ItemRenderer{
    private btnSelect: eui.Button;
    private lbGroupName: eui.Label;
    private lbGroupNameShadow: eui.Label;

    public constructor(){
        super();
        this.skinName = "resource/skins/login/GameGroupSectionIRSkin.exml";
        this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelect, this);
    }

    private onBtnSelect(){
        //toast("item");
    }
    
    protected dataChanged(){
        this.lbGroupName.text = `${this.data.start}-${this.data.end}区`;
        this.lbGroupNameShadow.text = `${this.data.start}-${this.data.end}区`;
        if (this.data.is_selected) {
            this.btnSelect.currentState = "down";
        } else {
            this.btnSelect.currentState = "up";
        }
        console.log("GameGroupSectionIR dataChanged ", this.lbGroupName.text);
    }
}
}