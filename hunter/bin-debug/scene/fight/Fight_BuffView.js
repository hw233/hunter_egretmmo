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
    var Fight_BuffView = (function (_super) {
        __extends(Fight_BuffView, _super);
        function Fight_BuffView() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fight/FightBuffDialogSkin.exml";
            return _this;
        }
        return Fight_BuffView;
    }(zj.UI));
    zj.Fight_BuffView = Fight_BuffView;
    __reflect(Fight_BuffView.prototype, "zj.Fight_BuffView");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_BuffView.js.map