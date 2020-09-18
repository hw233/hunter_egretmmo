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
     * @date 2019-3-21
     *
     * @class 执照主界面奖励list子项
     */
    var licenseProgressItem = (function (_super) {
        __extends(licenseProgressItem, _super);
        function licenseProgressItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/license/licenseProgressItemSkin.exml";
            zj.cachekeys(zj.UIResource["licenseProgressItem"], null);
            return _this;
        }
        /** 修改数据源被动执行*/
        licenseProgressItem.prototype.dataChanged = function () {
            var data = this.data;
            var itemSet = zj.PlayerItemSystem.Set(data.goods, 0, data.count);
            this.imgBoard.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelNum.text = "x" + zj.Set.NumberUnit2(data.count);
            if (data.count > 10000 && data.count < 100000) {
                // this.labelNum
            }
            function call() {
                var info = new message.GoodsInfo;
                info.goodsId = data.goods;
                info.count = data.count;
                zj.TipManager.ShowProp(info, this, 0, 0, 0);
            }
        };
        return licenseProgressItem;
    }(eui.ItemRenderer));
    zj.licenseProgressItem = licenseProgressItem;
    __reflect(licenseProgressItem.prototype, "zj.licenseProgressItem");
    var licenseProgressItemData = (function () {
        function licenseProgressItemData() {
        }
        return licenseProgressItemData;
    }());
    zj.licenseProgressItemData = licenseProgressItemData;
    __reflect(licenseProgressItemData.prototype, "zj.licenseProgressItemData");
})(zj || (zj = {}));
//# sourceMappingURL=licenseProgressItem.js.map