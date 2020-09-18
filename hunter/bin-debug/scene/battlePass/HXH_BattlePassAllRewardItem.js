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
     * @class 通行证大奖一览Item
     *
     * @author LianLei
     *
     * @date 2019-11-21
     */
    var HXH_BattlePassAllRewardItem = (function (_super) {
        __extends(HXH_BattlePassAllRewardItem, _super);
        function HXH_BattlePassAllRewardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassAllRewardItemSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_BattlePassAllRewardItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.scaleX = 0.9;
            _this.imgMask.scaleY = 0.9;
            _this.groupItem.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(75, 78);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            return _this;
        }
        HXH_BattlePassAllRewardItem.prototype.dataChanged = function () {
            this.updateView(this.data.goodsId, this.data.count);
        };
        HXH_BattlePassAllRewardItem.prototype.updateView = function (goodsId, count) {
            if (goodsId == 0) {
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Common.nothing, this);
                this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Common.nothing, this);
                this.labelCount.text = "";
            }
            else {
                var itemSet = zj.PlayerItemSystem.Set(goodsId, null, count);
                this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
                this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                this.labelCount.text = count.toString();
            }
            // 遮罩
            this.imgMask.visible = false;
            this.rectMask.visible = false;
            this.rectMask.verticalCenter = 0;
            this.imgIcon.mask = null;
            this.imgIcon.scaleX = 0.9;
            this.imgIcon.scaleY = 0.9;
            if (zj.PlayerItemSystem.IsImgMask(goodsId)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }
            else if (zj.PlayerItemSystem.IsRectMask(goodsId)) {
                this.rectMask.visible = true;
                this.rectMask.verticalCenter = -1;
                this.rectMask.scaleX = 0.85;
                this.rectMask.scaleY = 0.83;
                this.imgIcon.scaleX = 0.75;
                this.imgIcon.scaleY = 0.75;
                this.imgIcon.mask = this.rectMask;
            }
            else {
                this.rectMask.visible = true;
                this.rectMask.scaleX = 1;
                this.rectMask.scaleY = 1;
                this.imgIcon.mask = this.rectMask;
            }
        };
        HXH_BattlePassAllRewardItem.prototype.onShowGoodProperty = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.data.goodsId;
            goodsInfo.count = this.data.count;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return HXH_BattlePassAllRewardItem;
    }(eui.ItemRenderer));
    zj.HXH_BattlePassAllRewardItem = HXH_BattlePassAllRewardItem;
    __reflect(HXH_BattlePassAllRewardItem.prototype, "zj.HXH_BattlePassAllRewardItem");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassAllRewardItem.js.map