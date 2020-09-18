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
    /**
     * @author xing li wei
     *
     * @date 2019-5-25
     *
     * @class 贪婪之岛包裹list子项
     */
    var CommonOneKeySellItem = (function (_super) {
        __extends(CommonOneKeySellItem, _super);
        function CommonOneKeySellItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonOneKeySellItemSkin.exml";
            zj.cachekeys(zj.UIResource["CommonOneKeySellItem"], null);
            return _this;
        }
        CommonOneKeySellItem.prototype.dataChanged = function () {
            var data = this.data;
            if (data.goods == 0) {
                this.groupItem.visible = (false);
                return;
            }
            var goods = data.goods;
            var itemSet = zj.PlayerItemSystem.Set(goods.goodsId);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            var info = itemSet.Info;
            this.labelName.text = info.name;
            this.labelCount.text = "x" + goods.count;
        };
        return CommonOneKeySellItem;
    }(eui.ItemRenderer));
    zj.CommonOneKeySellItem = CommonOneKeySellItem;
    __reflect(CommonOneKeySellItem.prototype, "zj.CommonOneKeySellItem");
    var CommonOneKeySellItemData = (function () {
        function CommonOneKeySellItemData() {
        }
        return CommonOneKeySellItemData;
    }());
    zj.CommonOneKeySellItemData = CommonOneKeySellItemData;
    __reflect(CommonOneKeySellItemData.prototype, "zj.CommonOneKeySellItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CommonOneKeySellItem.js.map