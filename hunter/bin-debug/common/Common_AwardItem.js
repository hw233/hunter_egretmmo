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
     * @author hexiaowei
     *
     * @date 2019-1-9
     */
    var Common_AwardItem = (function (_super) {
        __extends(Common_AwardItem, _super);
        function Common_AwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_AwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["Common_AwardItem"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupContent1, _this);
            return _this;
        }
        Common_AwardItem.prototype.dataChanged = function () {
            var data = this.data;
            var info = zj.PlayerItemSystem.Set(data.goodInfo.goodsId, 0, data.goodInfo.count);
            this.imageFrame.source = zj.cachekey(info.Frame, this);
            this.imageIcon.source = zj.cachekey(info.Clip, this);
            var itemInfo = info.Info;
            this.labelNum.text = itemInfo.name;
            if (data.typeIndex != 1) {
                this.labelNumNew.visible = false;
            }
            else {
                this.labelNumNew.visible = true;
                this.labelNumNew.text = data.goodInfo.count.toString();
            }
        };
        Common_AwardItem.prototype.onGroupContent1 = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.goodInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return Common_AwardItem;
    }(eui.ItemRenderer));
    zj.Common_AwardItem = Common_AwardItem;
    __reflect(Common_AwardItem.prototype, "zj.Common_AwardItem");
    //子项数据源
    var Common_AwardItemData = (function () {
        function Common_AwardItemData() {
        }
        return Common_AwardItemData;
    }());
    zj.Common_AwardItemData = Common_AwardItemData;
    __reflect(Common_AwardItemData.prototype, "zj.Common_AwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Common_AwardItem.js.map