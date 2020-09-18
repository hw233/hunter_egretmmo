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
    //DoubleColorPushItem
    //yuqingchao
    var DoubleColorPushItem = (function (_super) {
        __extends(DoubleColorPushItem, _super);
        function DoubleColorPushItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/DoubleColorPushItemSkin.exml";
            return _this;
        }
        DoubleColorPushItem.prototype.dataChanged = function () {
            var index = this.data.i;
            var id = this.data.id;
            var bPrize = this.data.bPrize;
            this.imgEnd.visible = bPrize;
            this.lbNumID.text = (id % 100).toString();
            var is_red = (index == 0) ? 0 : 1;
            this.imgIcon.source = zj.UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[is_red];
        };
        return DoubleColorPushItem;
    }(eui.ItemRenderer));
    zj.DoubleColorPushItem = DoubleColorPushItem;
    __reflect(DoubleColorPushItem.prototype, "zj.DoubleColorPushItem");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorPushItem.js.map