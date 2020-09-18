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
    // 登录页公告
    // guoshanhe 创建于2018.11.14
    var LoginNoticeDialog = (function (_super) {
        __extends(LoginNoticeDialog, _super);
        function LoginNoticeDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/login/LoginNoticeDialogSkin.exml";
            _this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOK, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        LoginNoticeDialog.prototype.open = function (notice, callback_function, callback_this) {
            this.callback_function = callback_function;
            this.callback_this = callback_this;
            this.lbNotice.text = notice;
        };
        LoginNoticeDialog.prototype.onBtnOK = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        LoginNoticeDialog.prototype.onRemoveFromStage = function () {
            if (this.callback_function) {
                this.callback_function.call(this.callback_this);
                this.callback_this = null;
                this.callback_function = null;
            }
        };
        return LoginNoticeDialog;
    }(zj.Dialog));
    zj.LoginNoticeDialog = LoginNoticeDialog;
    __reflect(LoginNoticeDialog.prototype, "zj.LoginNoticeDialog");
})(zj || (zj = {}));
//# sourceMappingURL=LoginNoticeDialog.js.map