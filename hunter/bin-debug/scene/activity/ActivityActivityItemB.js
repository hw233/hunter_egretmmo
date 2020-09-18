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
    // 
    // lizhengiang
    // 20190323
    var ActivityActivityItemB = (function (_super) {
        __extends(ActivityActivityItemB, _super);
        function ActivityActivityItemB() {
            var _this = _super.call(this) || this;
            _this.goods = 0;
            _this.count = 0;
            _this.isGet = false;
            _this.skinName = "resource/skins/activity/ActivityActivityItemBSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityActivityItemB"], null);
            _this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            _this.imgMask = new eui.Image();
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            return _this;
        }
        ActivityActivityItemB.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            this.goods = this.data.goods;
            this.count = this.data.count;
            this.isGet = this.data.isGet;
            this.imgMask.visible = false;
            if (zj.PlayerItemSystem.IsImgMask(this.goods)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }
            var itemSet = zj.PlayerItemSystem.Set(this.goods, null, this.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.data.goods), this);
            this.imgLogo.source = "";
            this.lbNum.text = zj.Set.NumberUnit2(this.count);
            this.imgGet.visible = this.isGet;
            zj.setCache(this.groupCache);
        };
        ActivityActivityItemB.prototype.onShowGoodProperty = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.data.goods;
            goodsInfo.count = this.data.count;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return ActivityActivityItemB;
    }(eui.ItemRenderer));
    zj.ActivityActivityItemB = ActivityActivityItemB;
    __reflect(ActivityActivityItemB.prototype, "zj.ActivityActivityItemB");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityActivityItemB.js.map