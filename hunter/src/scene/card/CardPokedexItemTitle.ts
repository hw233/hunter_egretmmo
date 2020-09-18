namespace zj {
// created by hhh in 2018/11/16

/************** 图鉴item ****************/

export class CardPokedexItemTitle extends eui.ItemRenderer {
    private imageType: eui.Image;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardPokedexItemTitleSkin.exml";

        cachekeys(<string[]>UIResource["CardPokedexItemTitle"], null);
    }

    protected dataChanged() {
        this.imageType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_pokedex_title_all[this.data.PokedexType][this.data.titleType], this);
    }
}
}