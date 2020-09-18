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
     * @class 猎人传记奖励Item
     *
     * @author LianLei
     *
     * @date 2019-10-24
     */
    var BiographyAwardItem = (function (_super) {
        __extends(BiographyAwardItem, _super);
        function BiographyAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/biography/BiographyAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["BiographyAwardItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        BiographyAwardItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        BiographyAwardItem.prototype.updateView = function (data) {
            var itemSet = zj.PlayerItemSystem.Set(data.goodsInfo.goodsId, null, data.goodsInfo.count);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.labelNum.text = data.goodsInfo.count.toString();
            if (data.goodsInfo.goodsId != 20001) {
                if (!this.groupAni.getChildByName("ani")) {
                    this.addAnimation();
                }
            }
            else {
                var ani = this.groupAni.getChildByName("ani");
                if (ani)
                    this.groupAni.removeChild(ani);
            }
        };
        BiographyAwardItem.prototype.addAnimation = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", null, "001_daojuguang_02", 0).then(function (display) {
                display.name = "ani";
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                _this.groupAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
        };
        BiographyAwardItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return BiographyAwardItem;
    }(eui.ItemRenderer));
    zj.BiographyAwardItem = BiographyAwardItem;
    __reflect(BiographyAwardItem.prototype, "zj.BiographyAwardItem");
    var BiographyAwardItemData = (function () {
        function BiographyAwardItemData() {
        }
        return BiographyAwardItemData;
    }());
    zj.BiographyAwardItemData = BiographyAwardItemData;
    __reflect(BiographyAwardItemData.prototype, "zj.BiographyAwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=BiographyAwardItem.js.map