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
    // wang shen zhuo
    // HXH_MoraMainAwardItemItem
    // 2019.05.24
    var MoraMainAwardItemItem = (function (_super) {
        __extends(MoraMainAwardItemItem, _super);
        function MoraMainAwardItemItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/MoraMainAwardItemItemSkin.exml";
            zj.cachekeys(zj.UIResource["MoraMainAwardItemItem"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.scaleX = 0.5;
            _this.imgMask.scaleY = 0.5;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 普通物品遮罩
            _this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.rectMaskCommon.scaleX = 0.5;
            _this.rectMaskCommon.scaleY = 0.5;
            _this.groupMain.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        MoraMainAwardItemItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupMain);
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            var itemSet = zj.PlayerItemSystem.Set(this.data.good.goodsId, this.data.good.showType, this.data.good.count);
            this.imageBoard.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelTextNum.text = this.data.good.count;
            if (this.isImgMask(this.data.good.goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
            zj.setCache(this.groupMain);
        };
        // 物品遮罩
        MoraMainAwardItemItem.prototype.isImgMask = function (goodsId) {
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
        MoraMainAwardItemItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return MoraMainAwardItemItem;
    }(eui.ItemRenderer));
    zj.MoraMainAwardItemItem = MoraMainAwardItemItem;
    __reflect(MoraMainAwardItemItem.prototype, "zj.MoraMainAwardItemItem");
    var MoraMainAwardItemItemData = (function () {
        function MoraMainAwardItemItemData() {
        }
        return MoraMainAwardItemItemData;
    }());
    zj.MoraMainAwardItemItemData = MoraMainAwardItemItemData;
    __reflect(MoraMainAwardItemItemData.prototype, "zj.MoraMainAwardItemItemData");
})(zj || (zj = {}));
//# sourceMappingURL=MoraMainAwardItemItem.js.map