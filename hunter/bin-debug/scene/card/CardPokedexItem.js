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
    // created by hhh in 2018/11/14
    /************** 图鉴item ****************/
    var CardPokedexItem = (function (_super) {
        __extends(CardPokedexItem, _super);
        function CardPokedexItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/card/CardPokedexItemSkin.exml";
            zj.cachekeys(zj.UIResource["AwardSignItem"], null);
            return _this;
        }
        CardPokedexItem.prototype.dataChanged = function () {
            var pokedexType = this.data.pokedexType;
            var index = this.data.pos;
            var imgUpPath = zj.UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][1];
            var imgDownPath = zj.UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][2];
            this.imageUp.source = zj.cachekey(imgUpPath, this);
            this.imageDown.source = zj.cachekey(imgDownPath, this);
            // let image : eui.Image = <eui.Image> this.btnSel.getChildAt(0);
            // image.source = UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][1];
            // let btnSkinStates = this.btnSel.skin.states;
            // let btnStateDown = btnSkinStates[1];
            // let propertyDown: eui.SetProperty = <eui.SetProperty> btnStateDown.overrides[btnStateDown.overrides.length -1];
            // propertyDown.value = UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][2];
            // let btnStateDis = btnSkinStates[2];
            // let propertyDis: eui.SetProperty = <eui.SetProperty> btnStateDis.overrides[btnStateDis.overrides.length -1];
            // propertyDis.value = UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][2];
        };
        return CardPokedexItem;
    }(eui.ItemRenderer));
    zj.CardPokedexItem = CardPokedexItem;
    __reflect(CardPokedexItem.prototype, "zj.CardPokedexItem");
})(zj || (zj = {}));
//# sourceMappingURL=CardPokedexItem.js.map