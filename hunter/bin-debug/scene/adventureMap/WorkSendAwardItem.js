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
     * @class 工作派遣任务奖励Item
     *
     * @author LianLei
     *
     * @date 2019-11-10
     */
    var WorkSendAwardItem = (function (_super) {
        __extends(WorkSendAwardItem, _super);
        function WorkSendAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/adventureMap/WorkSendAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["WorkSendAwardItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        WorkSendAwardItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        WorkSendAwardItem.prototype.updateView = function (data) {
            var itemSet = zj.PlayerItemSystem.Set(data.goodsInfo.goodsId, null, data.goodsInfo.count);
            this.imgFrmae.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.labelNum.text = data.goodsInfo.count.toString();
        };
        WorkSendAwardItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return WorkSendAwardItem;
    }(eui.ItemRenderer));
    zj.WorkSendAwardItem = WorkSendAwardItem;
    __reflect(WorkSendAwardItem.prototype, "zj.WorkSendAwardItem");
    var WorkSendAwardItemData = (function () {
        function WorkSendAwardItemData() {
        }
        return WorkSendAwardItemData;
    }());
    zj.WorkSendAwardItemData = WorkSendAwardItemData;
    __reflect(WorkSendAwardItemData.prototype, "zj.WorkSendAwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=WorkSendAwardItem.js.map