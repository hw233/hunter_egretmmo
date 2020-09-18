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
     * @author chen xi
     *
     * @date 2019-1-2
     */
    var CommonPotatoScreenItem = (function (_super) {
        __extends(CommonPotatoScreenItem, _super);
        function CommonPotatoScreenItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonPotatoScreenItemSkin.exml";
            return _this;
        }
        CommonPotatoScreenItem.prototype.dataChanged = function () {
            var data = this.data;
            zj.Helper.SetButtonLabel(this.btnSwitch, data.name);
            this.btnSwitch.selected = data.isSelected;
        };
        return CommonPotatoScreenItem;
    }(eui.ItemRenderer));
    zj.CommonPotatoScreenItem = CommonPotatoScreenItem;
    __reflect(CommonPotatoScreenItem.prototype, "zj.CommonPotatoScreenItem");
    var CommonPotatoScreenItemData = (function () {
        function CommonPotatoScreenItemData() {
            this.isSelected = false;
        }
        return CommonPotatoScreenItemData;
    }());
    zj.CommonPotatoScreenItemData = CommonPotatoScreenItemData;
    __reflect(CommonPotatoScreenItemData.prototype, "zj.CommonPotatoScreenItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CommonPotatoScreenItem.js.map