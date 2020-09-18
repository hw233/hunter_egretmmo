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
    //TavernCommon
    //hexiaowei
    // 2018/11/28
    var TavernCommon = (function (_super) {
        __extends(TavernCommon, _super);
        function TavernCommon() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/tavern/TavernCommonSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            return _this;
        }
        TavernCommon.prototype.init = function (tavern) {
            this.tavern = tavern;
        };
        TavernCommon.prototype.setInfo = function (info) {
            this.labelHint.text = info;
        };
        TavernCommon.prototype.onButtonClose = function () {
            var _this = this;
            egret.Tween.get(this)
                .wait(1000, true)
                .to({ x: 155, y: -350 }, 1000, egret.Ease.backOut)
                .call(function () { _this.tavern.removeChild(_this); });
        };
        return TavernCommon;
    }(zj.UI));
    zj.TavernCommon = TavernCommon;
    __reflect(TavernCommon.prototype, "zj.TavernCommon");
})(zj || (zj = {}));
//# sourceMappingURL=TavernCommon.js.map