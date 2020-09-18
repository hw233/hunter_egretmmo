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
    //FishingAwardViewItem
    //yuqingchao
    //2019.05.15
    var FishingAwardViewItem = (function (_super) {
        __extends(FishingAwardViewItem, _super);
        function FishingAwardViewItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/FishingAwardViewItemSkin.exml";
            zj.cachekeys(zj.UIResource["FishingAwardViewItem"], null);
            _this.groupImage.visible = true;
            _this.groupDown.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupDown.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            return _this;
        }
        FishingAwardViewItem.prototype.dataChanged = function () {
            var info = this.data.info;
            if (info == null) {
                this.groupImage.visible = false;
                return;
            }
            else if (info.goodsId == 0) {
                this.groupImage.visible = false;
            }
            var itemSet = zj.PlayerItemSystem.Set(info.goodsId, 1, info.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgClip.source = zj.cachekey(itemSet.Clip, this);
            this.lbNum.text = info.count;
            if (this.isImgMask(info.goodsId)) {
                this.imgMask.visible = true;
                this.imgClip.mask = this.imgMask;
            }
        };
        // 物品遮罩
        FishingAwardViewItem.prototype.isImgMask = function (goodsId) {
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
        //长按点击详情
        FishingAwardViewItem.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return FishingAwardViewItem;
    }(eui.ItemRenderer));
    zj.FishingAwardViewItem = FishingAwardViewItem;
    __reflect(FishingAwardViewItem.prototype, "zj.FishingAwardViewItem");
})(zj || (zj = {}));
//# sourceMappingURL=FishingAwardViewItem.js.map