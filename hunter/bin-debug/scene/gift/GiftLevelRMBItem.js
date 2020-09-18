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
    var GiftLevelRMBItem = (function (_super) {
        __extends(GiftLevelRMBItem, _super);
        function GiftLevelRMBItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/gift/GiftLevelRMBItemSkin.exml";
            zj.cachekeys(zj.UIResource["GiftLevelRMBItem"], null);
            return _this;
        }
        GiftLevelRMBItem.prototype.dataChanged = function () {
            var info = this.data.info;
            var bOne = this.data.bOne;
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < info.goods_id.length; i++) {
                var good = new message.GoodsInfo();
                good.goodsId = info.goods_id[i];
                good.count = info.goods_count[i];
                good.showType = 1;
                arrCollection.addItem(good);
            }
            this.lstRmbAward.dataProvider = arrCollection;
            this.lstRmbAward.itemRenderer = zj.GiftCommonAwardItem;
            if (bOne == undefined) {
                this.lbRmbLevelGet.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.can_get_level, info.reward_level);
            }
            else {
                this.lbRmbLevelGet.text = info.reward_level;
            }
        };
        return GiftLevelRMBItem;
    }(eui.ItemRenderer));
    zj.GiftLevelRMBItem = GiftLevelRMBItem;
    __reflect(GiftLevelRMBItem.prototype, "zj.GiftLevelRMBItem");
})(zj || (zj = {}));
//# sourceMappingURL=GiftLevelRMBItem.js.map