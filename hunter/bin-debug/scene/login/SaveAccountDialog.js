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
    var SaveAccountDialog = (function (_super) {
        __extends(SaveAccountDialog, _super);
        function SaveAccountDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/login/SaveAccountDialogSkin.exml";
            _this.btnSave.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
            return _this;
        }
        SaveAccountDialog.prototype.setValue = function (account, password) {
            this.lbAccount.text = account;
            this.lbPassword.text = password;
        };
        SaveAccountDialog.prototype.setCallback = function (callback_click, callback_this) {
            this.callback_this = callback_this;
            this.callback_click = callback_click;
        };
        SaveAccountDialog.prototype.onClick = function () {
            if (this.callback_this) {
                this.callback_click.call(this.callback_this);
            }
        };
        return SaveAccountDialog;
    }(zj.Dialog));
    zj.SaveAccountDialog = SaveAccountDialog;
    __reflect(SaveAccountDialog.prototype, "zj.SaveAccountDialog");
})(zj || (zj = {}));
//# sourceMappingURL=SaveAccountDialog.js.map