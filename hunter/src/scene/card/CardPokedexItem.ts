namespace zj {
// created by hhh in 2018/11/14

/************** 图鉴item ****************/

export class CardPokedexItem extends eui.ItemRenderer {
    private imageUp: eui.Image;
    private imageDown: eui.Image;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardPokedexItemSkin.exml";

        cachekeys(<string[]>UIResource["AwardSignItem"], null);
    }

    protected dataChanged() {
        let pokedexType = this.data.pokedexType;
        let index = this.data.pos;

        let imgUpPath = UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][1];
        let imgDownPath = UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][2];

        this.imageUp.source = cachekey(imgUpPath, this);
        this.imageDown.source = cachekey(imgDownPath, this);

        // let image : eui.Image = <eui.Image> this.btnSel.getChildAt(0);
        // image.source = UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][1];

        // let btnSkinStates = this.btnSel.skin.states;
        // let btnStateDown = btnSkinStates[1];
        // let propertyDown: eui.SetProperty = <eui.SetProperty> btnStateDown.overrides[btnStateDown.overrides.length -1];
        // propertyDown.value = UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][2];

        // let btnStateDis = btnSkinStates[2];
        // let propertyDis: eui.SetProperty = <eui.SetProperty> btnStateDis.overrides[btnStateDis.overrides.length -1];
        // propertyDis.value = UIConfig.UIConfig_Hunter_Card.card_pokedex_btn[pokedexType][index][2];
    }
}
}