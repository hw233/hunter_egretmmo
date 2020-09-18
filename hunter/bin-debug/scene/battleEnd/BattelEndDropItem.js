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
     * @author xingliwei
     *
     * @date 2019-4-11
     *
     * @class 结算界面掉落物品
     */
    var BattleEndDropItem = (function (_super) {
        __extends(BattleEndDropItem, _super);
        function BattleEndDropItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/BattleEndDropItemSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
            zj.cachekeys(zj.UIResource["BattleEndDropItem"], null);
            return _this;
        }
        BattleEndDropItem.prototype.dataChanged = function () {
            var data = this.data;
            var itemSet = zj.PlayerItemSystem.Set(data.itemInfo.goodsId, null, data.itemInfo.count);
            this.SpriteItemIcon.source = zj.cachekey(itemSet.Clip, this);
            this.SpriteItemFrame.source = zj.cachekey(itemSet.Frame, this);
            this.SpriteItemFrame1.source = zj.cachekey(itemSet.Frame, this);
            this.SpritePiece.source = zj.cachekey(itemSet.Logo, this);
            this.SpriteItemIcon.mask = this.SpriteItemFrame1;
            //叠加数量
            this.LabelNumber.text = data.itemInfo.count.toString();
            var cardInfo = zj.TableItemPotato.Table();
            var cardId = zj.Table.FindF(zj.CardInfo, function (k, v) {
                return v.id == data.itemInfo.goodsId;
            });
            var Resume = function () {
            };
        };
        BattleEndDropItem.prototype.touchBegin = function (e) {
            var data = this.data;
            data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, data.itemInfo);
        };
        return BattleEndDropItem;
    }(eui.ItemRenderer));
    zj.BattleEndDropItem = BattleEndDropItem;
    __reflect(BattleEndDropItem.prototype, "zj.BattleEndDropItem");
    var BattleEndDropItemData = (function () {
        function BattleEndDropItemData() {
        }
        return BattleEndDropItemData;
    }());
    zj.BattleEndDropItemData = BattleEndDropItemData;
    __reflect(BattleEndDropItemData.prototype, "zj.BattleEndDropItemData");
})(zj || (zj = {}));
//# sourceMappingURL=BattelEndDropItem.js.map