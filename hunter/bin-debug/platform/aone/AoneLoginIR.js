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
    var AoneLoginIR = (function (_super) {
        __extends(AoneLoginIR, _super);
        function AoneLoginIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/aone/AoneLoginIRSkin.exml";
            zj.cachekeys(zj.UIResource["AoneLoginIR"], null);
            _this.img_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onDelete, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSelect, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSelect, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBegin, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onEnd, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, _this.onEnd, _this);
            return _this;
        }
        AoneLoginIR.prototype.dataChanged = function () {
            this.rect_bg.fillColor = 0xffffff;
            if (this.data == "") {
                this.lb_tail.visible = true;
                this.box.visible = false;
            }
            else {
                this.lb_tail.visible = false;
                this.box.visible = true;
                this.lb_account.text = this.data;
            }
        };
        AoneLoginIR.prototype.onDelete = function () {
            zj.Game.EventManager.event(zj.GameEvent.AONE_DELETE_ACCOUNT, this.data);
        };
        AoneLoginIR.prototype.onSelect = function () {
            zj.Game.EventManager.event(zj.GameEvent.AONE_SELECT_ACCOUNT, this.data);
        };
        AoneLoginIR.prototype.onBegin = function () {
            this.rect_bg.fillColor = 0xD1C132;
        };
        AoneLoginIR.prototype.onEnd = function () {
            this.rect_bg.fillColor = 0xffffff;
        };
        return AoneLoginIR;
    }(eui.ItemRenderer));
    zj.AoneLoginIR = AoneLoginIR;
    __reflect(AoneLoginIR.prototype, "zj.AoneLoginIR");
})(zj || (zj = {}));
//# sourceMappingURL=AoneLoginIR.js.map