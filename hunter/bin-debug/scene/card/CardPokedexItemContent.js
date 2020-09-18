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
    // created by hhh in 2018/11/16
    /************** 图鉴item ****************/
    var CardPokedexItemContent = (function (_super) {
        __extends(CardPokedexItemContent, _super);
        function CardPokedexItemContent() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/card/CardPokedexItemContentSkin.exml";
            zj.cachekeys(zj.UIResource["CardPokedexItemContent"], null);
            return _this;
        }
        CardPokedexItemContent.prototype.dataChanged = function () {
            var num = this.data.num;
            var cardDataArr = this.data.cardDatas;
            this.listTableView.itemRenderer = zj.CardPokedexItemCard;
            this.listTableView.dataProvider = new eui.ArrayCollection(cardDataArr);
            this.listTableView.selectedIndex = 0;
        };
        return CardPokedexItemContent;
    }(eui.ItemRenderer));
    zj.CardPokedexItemContent = CardPokedexItemContent;
    __reflect(CardPokedexItemContent.prototype, "zj.CardPokedexItemContent");
})(zj || (zj = {}));
//# sourceMappingURL=CardPokedexItemContent.js.map