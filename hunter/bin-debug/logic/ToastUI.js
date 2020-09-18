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
    var ToastUI = (function (_super) {
        __extends(ToastUI, _super);
        function ToastUI(str) {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/ToastUISkin.exml";
            _this.width = 688;
            _this.height = 65;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this.label.textFlow = zj.Util.RichText(str);
            _this.imgBG.x = -_this.width / 2;
            _this.label.x = _this.width / 2;
            return _this;
        }
        ToastUI.prototype.onStart = function () {
            var _this = this;
            egret.Tween.get(this.imgBG)
                .to({ x: 0 }, 200, egret.Ease.sineOut)
                .call(function () {
                egret.Tween.removeTweens(_this.imgBG);
            });
            egret.Tween.get(this.label)
                .to({ x: 0 }, 200, egret.Ease.sineOut)
                .call(function () {
                egret.Tween.removeTweens(_this.label);
            });
            egret.Tween.get(this.group)
                .wait(2000)
                .to({ y: -100, alpha: 0 }, 500, egret.Ease.circIn)
                .call(function () {
                egret.Tween.removeTweens(_this.group);
                _this.close();
            });
        };
        ToastUI.prototype.close = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return ToastUI;
    }(eui.Component));
    zj.ToastUI = ToastUI;
    __reflect(ToastUI.prototype, "zj.ToastUI");
})(zj || (zj = {}));
//# sourceMappingURL=ToastUI.js.map