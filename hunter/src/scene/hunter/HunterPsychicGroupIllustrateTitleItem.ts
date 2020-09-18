namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-12
 */
export class HunterPsychicGroupIllustrateTitleItem extends eui.ItemRenderer {
    private labelTitle: eui.Label;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterPsychicGroupIllustrateTitleItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterPsychicGroupIllustrateTitleItem"], null);
    }

    protected dataChanged() {
        let num = this.data as number;
        let chNum = Helper.GetNumCH(num.toString());
        this.labelTitle.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_psychic.psychic_title_str, chNum, chNum);
    }

}
}