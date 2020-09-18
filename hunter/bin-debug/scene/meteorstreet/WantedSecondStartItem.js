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
    //WantedSecondStartItem
    //hexiaowei
    // 2019/02/14
    var WantedSecondStartItem = (function (_super) {
        __extends(WantedSecondStartItem, _super);
        function WantedSecondStartItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/meteorstreet/WantedSecondStartItemSkin.exml";
            zj.cachekeys(zj.UIResource["WantedSecondStartItem"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            _this.imgIcon.mask = _this.rectMask;
            return _this;
        }
        WantedSecondStartItem.prototype.dataChanged = function () {
            var info = zj.PlayerWantedSystem.InstanceMobsFeature(this.data.talent);
            this.imgIcon.source = zj.cachekey(info.path, this);
        };
        WantedSecondStartItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return WantedSecondStartItem;
    }(eui.ItemRenderer));
    zj.WantedSecondStartItem = WantedSecondStartItem;
    __reflect(WantedSecondStartItem.prototype, "zj.WantedSecondStartItem");
    //子项数据源
    var WantedSecondStartItemData = (function () {
        function WantedSecondStartItemData() {
        }
        return WantedSecondStartItemData;
    }());
    zj.WantedSecondStartItemData = WantedSecondStartItemData;
    __reflect(WantedSecondStartItemData.prototype, "zj.WantedSecondStartItemData");
})(zj || (zj = {}));
//# sourceMappingURL=WantedSecondStartItem.js.map