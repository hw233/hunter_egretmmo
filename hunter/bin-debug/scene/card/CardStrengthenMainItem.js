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
     * @class 卡片注入念力副属性Item
     *
     * @author LianLei
     *
     * @date
     */
    var CardStrengthenMainItem = (function (_super) {
        __extends(CardStrengthenMainItem, _super);
        function CardStrengthenMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/card/CardStrengthenMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["CardStrengthenMainItem"], null);
            return _this;
        }
        CardStrengthenMainItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        CardStrengthenMainItem.prototype.updateView = function (data) {
            var growthValue = null;
            var _type = null;
            var attriId = data.cardInfo.add_attri[data.index].attriId;
            if (zj.Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][0] != 0) {
                growthValue = data.cardInfo.add_attri[data.index].growthValue;
                if (growthValue <= zj.Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
                    _type = 1;
                }
                else {
                    _type = 2;
                }
            }
            var addStr = zj.PlayerCardSystem.GetAddStr(data.cardInfo, growthValue, _type);
            this.labelName.textFlow = zj.Util.RichText(addStr[data.index][0]);
            this.imgBigonName.visible = this.selected;
        };
        return CardStrengthenMainItem;
    }(eui.ItemRenderer));
    zj.CardStrengthenMainItem = CardStrengthenMainItem;
    __reflect(CardStrengthenMainItem.prototype, "zj.CardStrengthenMainItem");
    var CardStrengthenMainItemData = (function () {
        function CardStrengthenMainItemData() {
        }
        return CardStrengthenMainItemData;
    }());
    zj.CardStrengthenMainItemData = CardStrengthenMainItemData;
    __reflect(CardStrengthenMainItemData.prototype, "zj.CardStrengthenMainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CardStrengthenMainItem.js.map