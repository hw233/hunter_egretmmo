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
     * 快速上阵基类
     * created by LianLei
     * 2019.05.27
     */
    var FormatChooseFast = (function (_super) {
        __extends(FormatChooseFast, _super);
        function FormatChooseFast() {
            return _super.call(this) || this;
        }
        return FormatChooseFast;
    }(zj.Dialog));
    zj.FormatChooseFast = FormatChooseFast;
    __reflect(FormatChooseFast.prototype, "zj.FormatChooseFast");
})(zj || (zj = {}));
//# sourceMappingURL=FormatChooseFast.js.map