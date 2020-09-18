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
     * @class 开服七天乐奖励Item
     *
     * @author LianLei
     *
     * @date 2019-12-04
     */
    var ActivityHappySevenAwardItem = (function (_super) {
        __extends(ActivityHappySevenAwardItem, _super);
        function ActivityHappySevenAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityHappySevenAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityHappySevenAwardItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        ActivityHappySevenAwardItem.prototype.dataChanged = function () {
            this.setData(this.data.goodsId, this.data.count, this.data.showType, this.data.isReward, this.data.isAwardList);
        };
        /**
         * @param goodsId 物品id
         * @param count 物品数量
         * @param showType
         * @param isReward 是否已经领取
         * @param isAwardList 是否是七日奖中list调用
         * @param isHaveGot 是否可领取状态
         */
        ActivityHappySevenAwardItem.prototype.setData = function (goodsId, count, showType, isReward, isAwardList, isHaveGot) {
            if (isReward === void 0) { isReward = false; }
            if (isAwardList === void 0) { isAwardList = false; }
            if (isHaveGot === void 0) { isHaveGot = false; }
            this.isAwardList = isAwardList;
            this.goodsId = goodsId;
            this.count = count;
            var type = zj.PlayerItemSystem.ItemType(goodsId);
            var itemSet = zj.PlayerItemSystem.Set(goodsId, showType, count);
            if (!isAwardList) {
                this.imgFrame.source = zj.cachekey("ui_acitivity_serverseven_Frame_png", this);
            }
            else {
                this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            }
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.labelNum.text = count.toString();
            this.imgSign.visible = (type == message.EGoodsType.GOODS_TYPE_FASHION); // 时装
            this.imgHaveGot.visible = isReward;
            this.imgCanget.visible = isHaveGot;
        };
        ActivityHappySevenAwardItem.prototype.onShowGoodProperty = function (e) {
            if (!this.isAwardList)
                return;
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.goodsId;
            goodsInfo.count = this.count;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return ActivityHappySevenAwardItem;
    }(eui.ItemRenderer));
    zj.ActivityHappySevenAwardItem = ActivityHappySevenAwardItem;
    __reflect(ActivityHappySevenAwardItem.prototype, "zj.ActivityHappySevenAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityHappySevenAwardItem.js.map