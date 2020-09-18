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
    //VipLowItem
    //yuqingchao
    //2019.04.12
    var VipLowItem = (function (_super) {
        __extends(VipLowItem, _super);
        function VipLowItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/vip/VipLowItemSkin.exml";
            return _this;
        }
        VipLowItem.prototype.dataChanged = function () {
            var str = this.data.info;
            this.lbInfo.textFlow = zj.Util.RichText(str);
        };
        return VipLowItem;
    }(eui.ItemRenderer));
    zj.VipLowItem = VipLowItem;
    __reflect(VipLowItem.prototype, "zj.VipLowItem");
})(zj || (zj = {}));
//# sourceMappingURL=VipLowItem.js.map