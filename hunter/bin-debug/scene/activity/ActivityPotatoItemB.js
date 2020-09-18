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
    var ActivityPotatoItemB = (function (_super) {
        __extends(ActivityPotatoItemB, _super);
        function ActivityPotatoItemB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityPotatoItemBSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityPotatoItem"], null);
            return _this;
        }
        ActivityPotatoItemB.prototype.dataChanged = function () {
            var info = this.data.addStr;
            this.labelAttri.textFlow = zj.Util.RichText(info);
            this.width = 180;
        };
        return ActivityPotatoItemB;
    }(eui.ItemRenderer));
    zj.ActivityPotatoItemB = ActivityPotatoItemB;
    __reflect(ActivityPotatoItemB.prototype, "zj.ActivityPotatoItemB");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityPotatoItemB.js.map