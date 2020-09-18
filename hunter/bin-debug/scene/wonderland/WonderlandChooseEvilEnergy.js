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
    /**
     * @author xingliwei
     *
     * @date 2019-6-17
     *
     * @class 贪婪之岛罪恶值详情介绍
     */
    var WonderlandChooseEvilEnergy = (function (_super) {
        __extends(WonderlandChooseEvilEnergy, _super);
        function WonderlandChooseEvilEnergy() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/WonderlandChooseEvilEnergySkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.close();
            }, _this);
            return _this;
        }
        return WonderlandChooseEvilEnergy;
    }(zj.UI));
    zj.WonderlandChooseEvilEnergy = WonderlandChooseEvilEnergy;
    __reflect(WonderlandChooseEvilEnergy.prototype, "zj.WonderlandChooseEvilEnergy");
})(zj || (zj = {}));
//# sourceMappingURL=WonderlandChooseEvilEnergy.js.map