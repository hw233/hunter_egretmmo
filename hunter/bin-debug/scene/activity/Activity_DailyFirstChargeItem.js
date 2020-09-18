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
    var Activity_DailyFirstChargeItem = (function (_super) {
        __extends(Activity_DailyFirstChargeItem, _super);
        function Activity_DailyFirstChargeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_DailyFirstChargeItemSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_DailyFirstChargeItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        Activity_DailyFirstChargeItem.prototype.dataChanged = function () {
            this.setData(this.data.goodsId, this.data.count);
        };
        Activity_DailyFirstChargeItem.prototype.setData = function (goodsId, count) {
            this.goodsId = goodsId;
            this.count = count;
            var type = zj.PlayerItemSystem.ItemType(goodsId);
            var itemSet = zj.PlayerItemSystem.Set(goodsId, null, count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.labelNum.text = count.toString();
        };
        Activity_DailyFirstChargeItem.prototype.onShowGoodProperty = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.goodsId;
            goodsInfo.count = this.count;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return Activity_DailyFirstChargeItem;
    }(eui.ItemRenderer));
    zj.Activity_DailyFirstChargeItem = Activity_DailyFirstChargeItem;
    __reflect(Activity_DailyFirstChargeItem.prototype, "zj.Activity_DailyFirstChargeItem");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_DailyFirstChargeItem.js.map