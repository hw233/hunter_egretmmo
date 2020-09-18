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
    //DoubleColorViewAwardAwardItem
    //yuqingchao
    //2019.05.29
    var DoubleColorViewAwardAwardItem = (function (_super) {
        __extends(DoubleColorViewAwardAwardItem, _super);
        function DoubleColorViewAwardAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/DoubleColorViewAwardAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["DoubleColorViewAwardAwardItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        DoubleColorViewAwardAwardItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupAll);
            var good = this.data.info;
            this.setInfo(good);
            zj.setCache(this.groupAll);
        };
        DoubleColorViewAwardAwardItem.prototype.setInfo = function (good) {
            var itemSet = zj.PlayerItemSystem.Set(good.goodsId, 1, good.count);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.lbNum.text = "x" + zj.Set.NumberUnit2(good.count);
            this.lbNameID.text = itemSet.FruitID;
        };
        //长按详情
        DoubleColorViewAwardAwardItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return DoubleColorViewAwardAwardItem;
    }(eui.ItemRenderer));
    zj.DoubleColorViewAwardAwardItem = DoubleColorViewAwardAwardItem;
    __reflect(DoubleColorViewAwardAwardItem.prototype, "zj.DoubleColorViewAwardAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorViewAwardAwardItem.js.map