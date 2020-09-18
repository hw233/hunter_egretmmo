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
    //TavernMask
    //hexiaowei
    //2018/11/16
    var TavernMask = (function (_super) {
        __extends(TavernMask, _super);
        function TavernMask() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/tavern/TavernMaskSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.groupMask.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupMask, _this);
            return _this;
        }
        TavernMask.prototype.init = function (tavern) {
            this.tavern = tavern;
        };
        TavernMask.prototype.onGroupMask = function () {
            if (this.tavern.tavernDoorKeelAnimation.parent) {
                this.tavern.tavernDoorKeelAnimation.parent.removeChild(this.tavern.tavernDoorKeelAnimation);
            }
            this.tavern.animationType = true;
            console.log("jieshu");
        };
        return TavernMask;
    }(zj.UI));
    zj.TavernMask = TavernMask;
    __reflect(TavernMask.prototype, "zj.TavernMask");
})(zj || (zj = {}));
//# sourceMappingURL=TavernMask.js.map