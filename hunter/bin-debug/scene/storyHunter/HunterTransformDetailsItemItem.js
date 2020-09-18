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
    //HXH_HunterTransformDetailsItemItem
    // wangshenzhuo
    // 2019-07-17
    var HunterTransformDetailsItemItem = (function (_super) {
        __extends(HunterTransformDetailsItemItem, _super);
        function HunterTransformDetailsItemItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/HunterTransformDetailsItemItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterTransformDetailsItemItem"], null);
            return _this;
        }
        HunterTransformDetailsItemItem.prototype.dataChanged = function () {
            var index = this.data.index + 1;
            var value = this.data.info;
            if (index && value) {
                this.lebelPlayerInfo.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Train.Attri[index], value);
                if (index >= 3) {
                    index = index + 1;
                    this.lebelPlayerInfo.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Train.Attri[index], value);
                }
                if (index >= 3) {
                    index = index + 1;
                }
                this.imageGM.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.collection[index - 1], this);
            }
        };
        return HunterTransformDetailsItemItem;
    }(eui.ItemRenderer));
    zj.HunterTransformDetailsItemItem = HunterTransformDetailsItemItem;
    __reflect(HunterTransformDetailsItemItem.prototype, "zj.HunterTransformDetailsItemItem");
    //子项数据源
    var HunterTransformDetailsItemItemData = (function () {
        function HunterTransformDetailsItemItemData() {
        }
        return HunterTransformDetailsItemItemData;
    }());
    zj.HunterTransformDetailsItemItemData = HunterTransformDetailsItemItemData;
    __reflect(HunterTransformDetailsItemItemData.prototype, "zj.HunterTransformDetailsItemItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterTransformDetailsItemItem.js.map