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
    // 礼包Item
    // wangshenzhuo
    // 2019-4-23
    var HXH_GiftMonthItem = (function (_super) {
        __extends(HXH_GiftMonthItem, _super);
        function HXH_GiftMonthItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/gift/GiftCommonAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_GiftMonthItem"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.data.father.onChooseItemTap(true, _this.data);
            }, _this);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.data.father.onChooseItemTap(false, _this.data);
            }, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.scaleX = 0.6;
            _this.imgMask.scaleY = 0.6;
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(50, 50.4);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupMain.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        HXH_GiftMonthItem.prototype.dataChanged = function () {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            var good = this.data.goods;
            this.imageIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(good.goodsId), this);
            this.imageFrame.source = zj.cachekey(zj.PlayerItemSystem.Set(good.goodsId, null, good.count).Frame, this);
            this.labelTextNum.text = good.count >= 100000 ? (good.count / 10000).toString() + "万" : good.count.toString();
            if (this.isImgMask(good.goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
        };
        // 物品遮罩
        HXH_GiftMonthItem.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true;
            }
            return false;
        };
        return HXH_GiftMonthItem;
    }(eui.ItemRenderer));
    zj.HXH_GiftMonthItem = HXH_GiftMonthItem;
    __reflect(HXH_GiftMonthItem.prototype, "zj.HXH_GiftMonthItem");
    var HXH_GiftMonthItemData = (function () {
        function HXH_GiftMonthItemData() {
        }
        return HXH_GiftMonthItemData;
    }());
    zj.HXH_GiftMonthItemData = HXH_GiftMonthItemData;
    __reflect(HXH_GiftMonthItemData.prototype, "zj.HXH_GiftMonthItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GiftMonthItem.js.map