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
     * @date 2019-3-20
     *
     * @class 执照特权信息
     */
    var licenseProgressInfoItemB = (function (_super) {
        __extends(licenseProgressInfoItemB, _super);
        function licenseProgressInfoItemB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/license/licenseProgressInfoItemBSkin.exml";
            zj.cachekeys(zj.UIResource["licenseProgressInfoItemB"], null);
            return _this;
        }
        /** 修改数据源被动执行*/
        licenseProgressInfoItemB.prototype.dataChanged = function () {
            this.labelInfo.textFlow = zj.Util.RichText(this.data.id);
        };
        return licenseProgressInfoItemB;
    }(eui.ItemRenderer));
    zj.licenseProgressInfoItemB = licenseProgressInfoItemB;
    __reflect(licenseProgressInfoItemB.prototype, "zj.licenseProgressInfoItemB");
    var licenseProgressInfoItemBData = (function () {
        function licenseProgressInfoItemBData() {
        }
        return licenseProgressInfoItemBData;
    }());
    zj.licenseProgressInfoItemBData = licenseProgressInfoItemBData;
    __reflect(licenseProgressInfoItemBData.prototype, "zj.licenseProgressInfoItemBData");
})(zj || (zj = {}));
//# sourceMappingURL=licenseProgressInfoItemB.js.map