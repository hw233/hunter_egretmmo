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
     * 2019.12.3
     * xingliwei
     * @class 信长礼包item
     * */
    var Activity_HunterGiftItem = (function (_super) {
        __extends(Activity_HunterGiftItem, _super);
        function Activity_HunterGiftItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_HunterGiftItemSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        Activity_HunterGiftItem.prototype.dataChanged = function () {
            var data = this.data;
            var info = zj.PlayerItemSystem.ItemConfig(data.goodsId);
            this.imgIcon.source = zj.cachekey(info.path, this);
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.Set(data.goodsId, null, data.count).Frame, this);
            this.labelCount.text = zj.Set.NumberUnit2(data.count);
            if (zj.PlayerItemSystem.ItemType(data.goodsId) == message.EGoodsType.GOODS_TYPE_FASHION) {
                this.imgpifu.visible = true;
            }
            else {
                this.imgpifu.visible = false;
            }
        };
        Activity_HunterGiftItem.prototype.onShowGoodProperty = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.data.goodsId;
            goodsInfo.count = this.data.count;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return Activity_HunterGiftItem;
    }(eui.ItemRenderer));
    zj.Activity_HunterGiftItem = Activity_HunterGiftItem;
    __reflect(Activity_HunterGiftItem.prototype, "zj.Activity_HunterGiftItem");
    var Activity_HunterGiftItemData = (function () {
        function Activity_HunterGiftItemData() {
        }
        return Activity_HunterGiftItemData;
    }());
    zj.Activity_HunterGiftItemData = Activity_HunterGiftItemData;
    __reflect(Activity_HunterGiftItemData.prototype, "zj.Activity_HunterGiftItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_HunterGiftItem.js.map