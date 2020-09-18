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
    // 新版本确认框
    // guoshanhe 创建于2018.11.14
    var NewVersionDialog = (function (_super) {
        __extends(NewVersionDialog, _super);
        function NewVersionDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/aone/NewVersionDialogSkin.exml";
            _this.rect_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOK, _this);
            return _this;
        }
        NewVersionDialog.prototype.model = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
        };
        NewVersionDialog.prototype.onBtnOK = function () {
            this.resolve(true);
        };
        return NewVersionDialog;
    }(zj.Dialog));
    zj.NewVersionDialog = NewVersionDialog;
    __reflect(NewVersionDialog.prototype, "zj.NewVersionDialog");
})(zj || (zj = {}));
//# sourceMappingURL=NewVersionDialog.js.map