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
     * @class 排行榜奖励Item
     *
     * @author LianLei
     *
     * @date 2019-11-26
     */
    var Activity_RanklistAwardItem = (function (_super) {
        __extends(Activity_RanklistAwardItem, _super);
        function Activity_RanklistAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_RanklistAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_RanklistAwardItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        Activity_RanklistAwardItem.prototype.dataChanged = function () {
            if (!this.data.goodsInfo)
                return;
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(this.data.goodsInfo.goodsId), this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.data.goodsInfo.goodsId), this);
            this.labelNum.text = "x" + this.data.goodsInfo.count;
        };
        Activity_RanklistAwardItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return Activity_RanklistAwardItem;
    }(eui.ItemRenderer));
    zj.Activity_RanklistAwardItem = Activity_RanklistAwardItem;
    __reflect(Activity_RanklistAwardItem.prototype, "zj.Activity_RanklistAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RanklistAwardItem.js.map