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
    // 规则说明
    // lizhengqiang
    // 20190107
    var Common_RuleDialog = (function (_super) {
        __extends(Common_RuleDialog, _super);
        function Common_RuleDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_RuleDialogSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        Common_RuleDialog.prototype.init = function (text) {
            this.lbRule.text = text;
        };
        Common_RuleDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_RuleDialog.ID = "Common_RuleDialog";
        return Common_RuleDialog;
    }(zj.Dialog));
    zj.Common_RuleDialog = Common_RuleDialog;
    __reflect(Common_RuleDialog.prototype, "zj.Common_RuleDialog");
})(zj || (zj = {}));
//# sourceMappingURL=Common_RuleDialog.js.map