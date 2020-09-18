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
    // 娃娃机---抽取成功--item
    // 2019 04 12
    var Activity_RandomPopItem = (function (_super) {
        __extends(Activity_RandomPopItem, _super);
        function Activity_RandomPopItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_RandomPopItemSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_RandomPopItem"], null);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupMain.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        Activity_RandomPopItem.prototype.SetInfo = function (index, goods, father) {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            if (zj.PlayerItemSystem.ItemType(goods.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                this.SetInfoHero(goods);
            }
            else {
                this.SetInfoItem(goods);
            }
            if (this.isImgMask(goods.goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
        };
        Activity_RandomPopItem.prototype.SetInfoHero = function (goods) {
            var itemSet = zj.PlayerItemSystem.Set(goods.goodsId, 1, goods.count);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.labelTextNum.text = "x" + goods.count;
        };
        Activity_RandomPopItem.prototype.SetInfoItem = function (goods) {
            var itemSet = zj.PlayerItemSystem.Set(goods.goodsId, 1, goods.count);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.labelTextNum.text = "x" + goods.count;
        };
        // 物品遮罩
        Activity_RandomPopItem.prototype.isImgMask = function (goodsId) {
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
        return Activity_RandomPopItem;
    }(eui.ItemRenderer));
    zj.Activity_RandomPopItem = Activity_RandomPopItem;
    __reflect(Activity_RandomPopItem.prototype, "zj.Activity_RandomPopItem");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RandomPopItem.js.map