namespace zj {
// created by hhh in 2018/11/16

/************** 图鉴item ****************/

export class CardPokedexItemContent extends eui.ItemRenderer {
    private scrollerTableView: eui.Scroller;
    private listTableView: eui.List;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardPokedexItemContentSkin.exml";

        cachekeys(<string[]>UIResource["CardPokedexItemContent"], null);
    }

    protected dataChanged() {
        let num = this.data.num;
        let cardDataArr: Array<TableItemPotato> = this.data.cardDatas;

        this.listTableView.itemRenderer = CardPokedexItemCard;
        this.listTableView.dataProvider = new eui.ArrayCollection(cardDataArr);
        this.listTableView.selectedIndex = 0;
    }
}
}