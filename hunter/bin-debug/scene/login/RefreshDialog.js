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
    // 刷新页面确认框
    // guoshanhe 创建于2018.11.14
    var RefreshDialog = (function (_super) {
        __extends(RefreshDialog, _super);
        function RefreshDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/aone/RefreshDialogSkin.exml";
            _this.rect_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCancel, _this);
            _this.rect_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOK, _this);
            return _this;
        }
        RefreshDialog.prototype.model = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
            });
        };
        RefreshDialog.prototype.onBtnCancel = function () {
            this.resolve(false);
        };
        RefreshDialog.prototype.onBtnOK = function () {
            this.resolve(true);
        };
        return RefreshDialog;
    }(zj.Dialog));
    zj.RefreshDialog = RefreshDialog;
    __reflect(RefreshDialog.prototype, "zj.RefreshDialog");
})(zj || (zj = {}));
//# sourceMappingURL=RefreshDialog.js.map