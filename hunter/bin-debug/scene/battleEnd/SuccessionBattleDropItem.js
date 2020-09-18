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
     * @author xing li wei
     *
     * @date 2019-4-19
     *
     * @class 奖励子项
     */
    var SuccessionBattleDropItem = (function (_super) {
        __extends(SuccessionBattleDropItem, _super);
        function SuccessionBattleDropItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/SuccessionBattleDropItemSkin.exml";
            zj.cachekeys(zj.UIResource["SuccessionBattleDropItem"], null);
            return _this;
        }
        SuccessionBattleDropItem.prototype.dataChanged = function () {
            var data = this.data;
            var itemSet = zj.PlayerItemSystem.Set(data.itemInfo.goodsId, null, data.itemInfo.count);
            this.SpriteItemIcon.source = zj.cachekey(itemSet.Clip, this);
            this.SpriteItemFrame.source = zj.cachekey(itemSet.Frame, this);
            // this.Labe
            //叠加数量
            this.LabelNum.text = data.itemInfo.count.toString();
            var cardInfo = zj.TableItemPotato.Table();
            var cardId = zj.Table.FindF(zj.CardInfo, function (k, v) {
                return v.id == data.itemInfo.goodsId;
            });
            if (data.showWhite == false) {
                this.SpriteWhite.visible = false;
            }
        };
        return SuccessionBattleDropItem;
    }(eui.ItemRenderer));
    zj.SuccessionBattleDropItem = SuccessionBattleDropItem;
    __reflect(SuccessionBattleDropItem.prototype, "zj.SuccessionBattleDropItem");
    var SuccessionBattleDropItemData = (function () {
        function SuccessionBattleDropItemData() {
        }
        return SuccessionBattleDropItemData;
    }());
    zj.SuccessionBattleDropItemData = SuccessionBattleDropItemData;
    __reflect(SuccessionBattleDropItemData.prototype, "zj.SuccessionBattleDropItemData");
})(zj || (zj = {}));
//# sourceMappingURL=SuccessionBattleDropItem.js.map