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
    // created by hhh in 2018/11/21
    var ConfirmOkDialog = (function (_super) {
        __extends(ConfirmOkDialog, _super);
        function ConfirmOkDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/ConfirmOkDialogSkin.exml";
            _this.init();
            return _this;
        }
        ConfirmOkDialog.prototype.init = function () {
            var _this = this;
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            zj.Game.DragonBonesManager.playAnimation(this, "npc_bisiji", "armatureName", null, 0)
                .then(function (display) {
                display.x = _this.groupAni.width / 2;
                display.y = _this.groupAni.height;
                display.scaleX = 0.6;
                display.scaleY = 0.6;
                _this.groupAni.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        ConfirmOkDialog.prototype.setInfo = function (message, callback_function, callback_this) {
            this.callback_function = callback_function;
            this.callback_this = callback_this;
            this.labelNotice.text = message;
        };
        ConfirmOkDialog.prototype.onBtnConfirm = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        ConfirmOkDialog.prototype.onRemoveFromStage = function () {
            if (this.callback_function) {
                this.callback_function.call(this.callback_this);
                this.callback_this = null;
                this.callback_function = null;
            }
        };
        ConfirmOkDialog.ID = "ConfirmOkDialog";
        return ConfirmOkDialog;
    }(zj.Dialog));
    zj.ConfirmOkDialog = ConfirmOkDialog;
    __reflect(ConfirmOkDialog.prototype, "zj.ConfirmOkDialog");
})(zj || (zj = {}));
//# sourceMappingURL=ConfirmOkDialog.js.map