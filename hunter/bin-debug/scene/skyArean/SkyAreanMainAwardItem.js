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
    //SkyAreanMainAwardItem
    //wangshenzhuo
    // 2019/02/25
    var SkyAreanMainAwardItem = (function (_super) {
        __extends(SkyAreanMainAwardItem, _super);
        function SkyAreanMainAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/skyArean/SkyAreanMainAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["SkyAreanMainAwardItem"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: _this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
                // (this.data as WantedSecondStartItemData).father.onChooseItemTap(true, this.data);
            }, _this);
            return _this;
            // this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            //     (this.data as WantedSecondStartItemData).father.onChooseItemTap(false, this.data);
            // }, this);
        }
        SkyAreanMainAwardItem.prototype.dataChanged = function () {
            var itemSet = zj.PlayerItemSystem.Set(this.data.good.goodsId, this.data.good.showType, this.data.good.count);
            this.imageBoard.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelAwardNum.text = "x" + zj.Set.NumberUnit3(this.data.good.count);
            // if (itemSet["Type"] == 3 && this.data.goodsId <= 30003) {
            //     return;
            // } else {
            //     this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupMain);
            // }
        };
        return SkyAreanMainAwardItem;
    }(eui.ItemRenderer));
    zj.SkyAreanMainAwardItem = SkyAreanMainAwardItem;
    __reflect(SkyAreanMainAwardItem.prototype, "zj.SkyAreanMainAwardItem");
    //子项数据源
    var SkyAreanMainAwardItemData = (function () {
        function SkyAreanMainAwardItemData() {
        }
        return SkyAreanMainAwardItemData;
    }());
    zj.SkyAreanMainAwardItemData = SkyAreanMainAwardItemData;
    __reflect(SkyAreanMainAwardItemData.prototype, "zj.SkyAreanMainAwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=SkyAreanMainAwardItem.js.map