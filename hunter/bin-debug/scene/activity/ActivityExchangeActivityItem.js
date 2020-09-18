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
    //兑换活动
    //yuqingchao
    //2019.05.28
    var ActivityExchangeActivityItem = (function (_super) {
        __extends(ActivityExchangeActivityItem, _super);
        function ActivityExchangeActivityItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityExchangeActivityItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityExchangeActivityItem"], null);
            return _this;
        }
        return ActivityExchangeActivityItem;
    }(eui.ItemRenderer));
    zj.ActivityExchangeActivityItem = ActivityExchangeActivityItem;
    __reflect(ActivityExchangeActivityItem.prototype, "zj.ActivityExchangeActivityItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityExchangeActivityItem.js.map