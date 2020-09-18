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
    //遮罩类  xingliwie 2019-4-10
    var CommonShade = (function (_super) {
        __extends(CommonShade, _super);
        function CommonShade() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonShadeSkin.exml";
            _this.init();
            return _this;
        }
        CommonShade.prototype.init = function () {
            this.shade.width = zj.UIManager.StageWidth;
            this.shade.height = zj.UIManager.StageHeight;
        };
        return CommonShade;
    }(zj.Dialog));
    zj.CommonShade = CommonShade;
    __reflect(CommonShade.prototype, "zj.CommonShade");
})(zj || (zj = {}));
//# sourceMappingURL=CommonShade.js.map