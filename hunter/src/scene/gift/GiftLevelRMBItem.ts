namespace zj {
// 
// lizhengqiang
// 20190410
export class GiftLevelRMBItem extends eui.ItemRenderer {
    private lstRmbAward: eui.List;
    private lbRmbLevelGet: eui.Label;
    private lbGiftAwardNum: eui.Label;


    public constructor() {
        super();
        this.skinName = "resource/skins/gift/GiftLevelRMBItemSkin.exml";
        cachekeys(<string[]>UIResource["GiftLevelRMBItem"], null);
    }

    protected dataChanged() {
        let info: TableNewgiftDaily = this.data.info;
        let bOne: boolean = this.data.bOne;

        let arrCollection = new eui.ArrayCollection();
        for (let i = 0; i < info.goods_id.length; i++) {
            let good: message.GoodsInfo = new message.GoodsInfo();
            good.goodsId = info.goods_id[i];
            good.count = info.goods_count[i];
            good.showType = 1;
            arrCollection.addItem(good);
        }

        this.lstRmbAward.dataProvider = arrCollection;
        this.lstRmbAward.itemRenderer = GiftCommonAwardItem;

        if (bOne == undefined) {
            this.lbRmbLevelGet.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.can_get_level, info.reward_level)
        } else {
            this.lbRmbLevelGet.text = info.reward_level;
        }
    }

}
}