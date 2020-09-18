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
    // lizhengqiang
    // 2018/11/08
    var PackageMainTypeIR = (function (_super) {
        __extends(PackageMainTypeIR, _super);
        function PackageMainTypeIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/package/PackageMainTypeIRSkin.exml";
            zj.cachekeys(zj.UIResource["PackageMainTypeIR"], null);
            return _this;
        }
        PackageMainTypeIR.prototype.dataChanged = function () {
            this.imgText.source = zj.cachekey(this.data.imgTextSource, this);
            this.imgTip.visible = this.data.imgTipVisible;
            if (this.selected)
                this.btnTag.currentState = "down";
        };
        return PackageMainTypeIR;
    }(eui.ItemRenderer));
    zj.PackageMainTypeIR = PackageMainTypeIR;
    __reflect(PackageMainTypeIR.prototype, "zj.PackageMainTypeIR");
})(zj || (zj = {}));
//# sourceMappingURL=PackageMainTypeIR.js.map