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
    // created by hhh in 2018/11/23
    var ConfirmCancelDialog = (function (_super) {
        __extends(ConfirmCancelDialog, _super);
        function ConfirmCancelDialog() {
            var _this = _super.call(this) || this;
            _this.confirmCB = null;
            _this.cancelCB = null;
            _this.skinName = "resource/skins/common/ConfirmCancelDialogSkin.exml";
            _this.init();
            return _this;
        }
        ConfirmCancelDialog.prototype.init = function () {
            var _this = this;
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
            this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
            zj.Game.DragonBonesManager.playAnimation(this, "npc_bisiji", null, "animation2", 0)
                .then(function (display) {
                display.x = _this.groupAni.width / 2;
                display.y = _this.groupAni.height;
                display.scaleX = 0.6;
                display.scaleY = 0.58;
                _this.groupAni.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        ConfirmCancelDialog.prototype.setInfo = function (message) {
            this.labelNotice.textFlow = zj.Util.RichText(message);
        };
        ConfirmCancelDialog.prototype.setCB = function (confirmCB, cancelCB) {
            this.confirmCB = confirmCB;
            this.cancelCB = cancelCB;
        };
        ConfirmCancelDialog.prototype.onBtnConfirm = function () {
            if (this.confirmCB != null)
                this.confirmCB();
            this.close();
        };
        ConfirmCancelDialog.prototype.onBtnCancel = function () {
            if (this.cancelCB != null)
                this.cancelCB();
            this.close();
        };
        ConfirmCancelDialog.ID = "ConfirmCancelDialog";
        return ConfirmCancelDialog;
    }(zj.Dialog));
    zj.ConfirmCancelDialog = ConfirmCancelDialog;
    __reflect(ConfirmCancelDialog.prototype, "zj.ConfirmCancelDialog");
})(zj || (zj = {}));
//# sourceMappingURL=ConfirmCancelDialog.js.map