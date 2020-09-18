namespace zj {
//RelicFinaChest (遗迹探索)结算宝箱
//hexiaowei
// 2019/03/12
export class RelicFinaChest extends Dialog {

    private buttonClose: eui.Button;
    private listTableView: eui.List;

    private selectedItem: eui.ArrayCollection;
    private selectedIndex: number = 0;

    private openchest: Array<number>;
    private cb: Function;
    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicFinaChestSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);


    }

    public Init(open_chest: Array<number>, cb) {
        this.openchest = open_chest;
        this.cb = cb;
        this.setInfoList();
    }

    public setInfoList() {

        this.listTableView.selectedIndex = 0; // 默认选中
        this.listTableView.itemRenderer = RelicFinaChestItem;//
        this.selectedItem = new eui.ArrayCollection();
        for (const k in this.openchest) {
            const v = this.openchest[k];
            let data = new RelicFinaChestItemData();
            data.father = this;
            data.chest = v;
            this.selectedItem.addItem(data);
        }


        this.listTableView.dataProvider = this.selectedItem;
        this.selectedIndex = this.listTableView.selectedIndex;


    }




    private onButtonClose() {
        if (this.cb != null) {
            this.cb();
        }
        this.close();
    }


}

}