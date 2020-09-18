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
    var Common_HotUpDateTips = (function (_super) {
        __extends(Common_HotUpDateTips, _super);
        function Common_HotUpDateTips() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/teach/Common_HotUpDateTipsSkin.exml";
            return _this;
        }
        return Common_HotUpDateTips;
    }(zj.UI));
    zj.Common_HotUpDateTips = Common_HotUpDateTips;
    __reflect(Common_HotUpDateTips.prototype, "zj.Common_HotUpDateTips");
})(zj || (zj = {}));
//# sourceMappingURL=Common_HotUpDateTips.js.map