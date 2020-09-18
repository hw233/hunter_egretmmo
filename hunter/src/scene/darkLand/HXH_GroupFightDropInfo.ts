namespace zj {
// HXH_GroupFightDropInfo(首领奖励)
// wangshenzhuo
// 20019/03/06

export class HXH_GroupFightDropInfo extends Dialog {

    private groupCache: eui.Group;
    public buttonClose:eui.Button;
    public listViewDrop:eui.List;

    private listViewItem: eui.ArrayCollection;
    private listViewIndex: number = 0;

    private scrollerRewards : eui.Scroller;
    private groupFrist : eui.Group;


     public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/HXH_GroupFightDropInfoSkin.exml";   

         this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        //  this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this); 
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);

        setCache(this.groupCache);
    }

    public SetInfo(){
        let tbl = PlayerGroupFightSystem.AwardList();

        this.listViewDrop.selectedIndex = 0; // 默认选中
        this.listViewDrop.itemRenderer = HXH_GroupFightDropInfoItem;//
        
        this.listViewItem = new eui.ArrayCollection();
        for (let i = 0; i < tbl.length; i++) {
            let data = new HXH_GroupFightDropInfoItemData();
            data.father = this;
            data.reward = tbl[i].reward;
            data.id = tbl[i].id;
            data.first = tbl[i].firstBlood
            data.index = i;
            this.listViewItem.addItem(data);
        }

        this.listViewDrop.dataProvider = this.listViewItem;
        this.listViewIndex = this.listViewDrop.selectedIndex;
    }

    private showGoodsProperty(ev: egret.Event) {
        let a = ev.data;
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    private onButtonClose() {
        this.close(Dialog.SHOW_FROM_TOP);
    }
}
}