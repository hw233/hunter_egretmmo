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
    // 
    // lizhengqiang
    // 20190111
    var Common_InputLongDialog = (function (_super) {
        __extends(Common_InputLongDialog, _super);
        function Common_InputLongDialog() {
            var _this = _super.call(this) || this;
            _this.CB = null;
            _this.skinName = "resource/skins/common/Common_InputLongDialogSkin.exml";
            _this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCancel, _this);
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConfirm, _this);
            _this.init();
            return _this;
        }
        Common_InputLongDialog.prototype.init = function () {
            this.textContent.skinName = "resource/skins/common/TextInputSkin.exml";
            this.textContent.textDisplay.textColor = 0xB19782;
            this.textContent.promptDisplay.textColor = 0xB19782;
            this.textContent.inputType = egret.TextFieldType.INPUT;
            this.textContent.prompt = zj.TextsConfig.TextConfig_Input.commonLong;
        };
        Common_InputLongDialog.prototype.setCB = function (cb) {
            this.CB = cb;
        };
        Common_InputLongDialog.prototype.setInfo = function (title, num) {
            this.imgTip.source = zj.cachekey(zj.UIConfig.UIConfig_League.wordsInput[num - 1], this);
        };
        Common_InputLongDialog.prototype.onBtnCancel = function () {
            this.onBtnClose();
        };
        Common_InputLongDialog.prototype.onBtnConfirm = function () {
            if (this.CB != null)
                this.CB(this.textContent.text);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_InputLongDialog.prototype.onBtnClose = function () {
            if (this.CB != null)
                this.CB(undefined);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_InputLongDialog.ID = "Common_InputLongDialog";
        return Common_InputLongDialog;
    }(zj.Dialog));
    zj.Common_InputLongDialog = Common_InputLongDialog;
    __reflect(Common_InputLongDialog.prototype, "zj.Common_InputLongDialog");
})(zj || (zj = {}));
//# sourceMappingURL=Common_InputLongDialog.js.map