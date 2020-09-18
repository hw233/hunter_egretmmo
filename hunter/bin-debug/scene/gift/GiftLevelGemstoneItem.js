var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    // 
    // lizhengqiang
    // 20190410
    var GiftLevelGemstoneItem = (function (_super) {
        __extends(GiftLevelGemstoneItem, _super);
        function GiftLevelGemstoneItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/gift/GiftLevelGemStoneItemSkin.exml";
            zj.cachekeys(zj.UIResource["GiftLevelGemstoneItem"], null);
            return _this;
        }
        GiftLevelGemstoneItem.prototype.dataChanged = function () {
            var info = this.data;
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < info.goods_id.length; i++) {
                var good = new message.GoodsInfo();
                good.goodsId = info.goods_id[i];
                good.count = info.goods_count[i];
                arrCollection.addItem(good);
            }
            this.lstGemstoneAward.dataProvider = arrCollection;
            this.lstGemstoneAward.itemRenderer = zj.GiftCommonAwardItem;
            this.lbLevelGet.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.can_get_level, info.reward_level);
        };
        return GiftLevelGemstoneItem;
    }(eui.ItemRenderer));
    zj.GiftLevelGemstoneItem = GiftLevelGemstoneItem;
    __reflect(GiftLevelGemstoneItem.prototype, "zj.GiftLevelGemstoneItem");
})(zj || (zj = {}));
//# sourceMappingURL=GiftLevelGemstoneItem.js.map