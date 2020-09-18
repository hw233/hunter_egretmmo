namespace zj {
// 
// lizhengqiang
// 20190410
export class GiftLevelGemstoneItem extends eui.ItemRenderer {
    private lstGemstoneAward: eui.List;
    private lbLevelGet: eui.Label;

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/GiftLevelGemStoneItemSkin.exml";
        cachekeys(<string[]>UIResource["GiftLevelGemstoneItem"], null);
    }

    protected dataChanged() {
        let info: TableNewgiftDaily = this.data;

        let arrCollection = new eui.ArrayCollection();
        for (let i = 0; i < info.goods_id.length; i++) {
            let good: message.GoodsInfo = new message.GoodsInfo();
            good.goodsId = info.goods_id[i];
            good.count = info.goods_count[i];
            arrCollection.addItem(good);
        }

        this.lstGemstoneAward.dataProvider = arrCollection;
        this.lstGemstoneAward.itemRenderer = GiftCommonAwardItem;

        this.lbLevelGet.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.can_get_level, info.reward_level)
    }

}
}