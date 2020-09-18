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
    //WantedSecondChooseItem
    //hexiaowei
    // 2019/02/14
    var WantedSecondMeteorlnstance = (function (_super) {
        __extends(WantedSecondMeteorlnstance, _super);
        function WantedSecondMeteorlnstance() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/meteorstreet/WantedSecondMeteorlnstanceSkin.exml";
            zj.cachekeys(zj.UIResource["WantedSecondMeteorlnstance"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.data.father.onItemTap(true, _this.data);
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.data.father.onItemTap(false, _this.data);
            }, _this);
            return _this;
        }
        WantedSecondMeteorlnstance.prototype.dataChanged = function () {
            var head_path = zj.PlayerHunterSystem.Head(this.data.index);
            this.imgIcon.source = zj.cachekey(head_path, this);
        };
        return WantedSecondMeteorlnstance;
    }(eui.ItemRenderer));
    zj.WantedSecondMeteorlnstance = WantedSecondMeteorlnstance;
    __reflect(WantedSecondMeteorlnstance.prototype, "zj.WantedSecondMeteorlnstance");
    //子项数据源
    var WantedSecondMeteorlnstanceData = (function () {
        function WantedSecondMeteorlnstanceData() {
        }
        return WantedSecondMeteorlnstanceData;
    }());
    zj.WantedSecondMeteorlnstanceData = WantedSecondMeteorlnstanceData;
    __reflect(WantedSecondMeteorlnstanceData.prototype, "zj.WantedSecondMeteorlnstanceData");
})(zj || (zj = {}));
//# sourceMappingURL=WantedSecondMeteorlnstance.js.map