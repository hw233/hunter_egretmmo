namespace zj {
// wang shen zhuo
// HXH_MoraMainAwardItem
// 2019.05.24
export class MoraMainAwardItem extends eui.ItemRenderer {
    private groupCache: eui.Group;
    public labelTextName: eui.Label;
    public labelTextDes: eui.Label;
    public listViewTable: eui.List;
    private listMyItem: eui.ArrayCollection;
    public father: MoraMainAwardDialog;
    public id: number = 0;
    public reward = [];

    public constructor() {
        super();
        this.skinName = "resource/skins/fishing/MoraMainAwardItemSkin.exml";
        cachekeys(<string[]>UIResource["MoraMainAwardItem"], null);
        this.reward = PlayerZorkSystem.RunesAllGoods();
    }

    protected dataChanged() {
        this.father = this.data.father;
        this.id = this.data.index;
        this.SetInfoList(this.data.info);
    }

    public SetInfoList(info) {
        closeCache(this.groupCache);
        let star_num = CommonConfig.gain_runes_number + 1 - this.id;
        this.labelTextName.text = info.name;
        this.labelTextDes.text = info.des;
        setCache(this.groupCache);
        this.SetInfoReward(this.reward[this.id]);
    }

    public SetInfoReward(goods) {
        this.listViewTable.itemRenderer = MoraMainAwardItemItem;
        this.listMyItem = new eui.ArrayCollection();
        for (let i = 0; i < goods.length; i++) {
            let data = new MoraMainAwardItemItemData();
            data.father = this;
            data.good = goods[i];
            data.index = i + 1;
            this.listMyItem.addItem(data);
        }
        this.listViewTable.dataProvider = this.listMyItem;
    }



}

export class MoraMainAwardItemData {
    father: MoraMainAwardDialog;
    info: any;
    index: number;
}
}