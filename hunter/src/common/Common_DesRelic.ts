namespace zj {
// Common_DesRelic
// hexiaowei 
// 2019/03/14

export class Common_DesRelic extends Dialog {

    private listViewAward:eui.List;
    private buttonClose:eui.Button;

    private selectedItem: eui.ArrayCollection;
    private selectedIndex: number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/common/Common_DesRelicSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);

        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoods, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoods, this);
        }, null);
    }
    
    public setInfoActivity(goods : Array<message.GoodsInfo>){
        // for(const k in goods){
        //     let item = 
        // }
        this.listViewAward.selectedIndex = 0; // 默认选中
        this.listViewAward.itemRenderer = Common_AwardItem;//
        this.selectedItem = new eui.ArrayCollection();
        for(const k in goods){
            const v = goods[k];
            let data = new  Common_AwardItemData();
            data.index = Number(k);
            data.goodInfo = v;
            data.father = this;
            this.selectedItem.addItem(data);
        }


        this.listViewAward.dataProvider = this.selectedItem;
        this.selectedIndex = this.listViewAward.selectedIndex;
    }

    private showGoods(ev: egret.Event) {
        let a = Game.UIManager.dialogCount();
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "showgoods";
        this.addChild(show);
    }

    private removeShow() {
        let show = this.getChildByName("showgoods");
        if (show) {
            this.removeChild(show);
        }
    }

    private onButtonClose(){
        this.close();
    }
    
}

}