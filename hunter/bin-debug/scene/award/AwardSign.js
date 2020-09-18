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
    // 福利-签到
    // lizhengqiang
    // 20190320
    var AwardSign = (function (_super) {
        __extends(AwardSign, _super);
        function AwardSign() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/award/AwardSignSkin.exml";
            return _this;
        }
        AwardSign.prototype.init = function () {
            this.setInfo();
        };
        AwardSign.prototype.setInfo = function () {
            var arrCollection = new eui.ArrayCollection();
            for (var i = 1; i <= 30; i++) {
                arrCollection.addItem(i);
            }
            this.lstViewDay.dataProvider = arrCollection;
            this.lstViewDay.itemRenderer = zj.AwardSignItem;
        };
        return AwardSign;
    }(zj.UI));
    zj.AwardSign = AwardSign;
    __reflect(AwardSign.prototype, "zj.AwardSign");
})(zj || (zj = {}));
//# sourceMappingURL=AwardSign.js.map