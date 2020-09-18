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
    // 礼包Item HXH_GiftCommonAwardItem
    // hexiaowei
    // 2018-12-07
    var GiftCommonAwardItem = (function (_super) {
        __extends(GiftCommonAwardItem, _super);
        function GiftCommonAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/gift/GiftCommonAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["GiftCommonAwardItem"], null);
            _this.imageIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
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
        GiftCommonAwardItem.prototype.dataChanged = function () {
            var _this = this;
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            var good = this.data;
            this.imageIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(good.goodsId), this);
            this.imageFrame.source = zj.cachekey(zj.PlayerItemSystem.Set(good.goodsId, null, good.count).Frame, this);
            this.labelTextNum.text = good.count >= 100000 ? (good.count / 10000).toString() + "万" : good.count.toString();
            this.groupAni.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(function (display) {
                _this.groupAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
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
        GiftCommonAwardItem.prototype.isImgMask = function (goodsId) {
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
        GiftCommonAwardItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return GiftCommonAwardItem;
    }(eui.ItemRenderer));
    zj.GiftCommonAwardItem = GiftCommonAwardItem;
    __reflect(GiftCommonAwardItem.prototype, "zj.GiftCommonAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=GiftCommonAwardItem.js.map