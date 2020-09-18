namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-14
 * 
 * @class 念力修炼属性变化子项
 */
export class HunterPsychicChangeItem extends eui.ItemRenderer {
    private labelInfo: eui.Label;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterPsychicChangeItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterPsychicChangeItem"], null);
    }

    protected dataChanged() {
        let info = this.data as Array<any>;
        let firstValue = Number(info[0]);
        let name = TextsConfig.TextsConfig_Hunter_psychic.attri_type[firstValue];
        let type = TextsConfig.TextsConfig_Hunter_psychic.attri_type_type[firstValue];
        
        let str = "";
        let secondValue = info[1]
        let lastValue = info[2];
        if (lastValue == null || lastValue == undefined || lastValue == 0) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_psychic.psychic_no_change, name, secondValue + type);
        } else if (lastValue > 0) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_psychic.psychic_add, name, secondValue + type, lastValue + type);
        } else {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_psychic.psychic_sub, name, secondValue + type, lastValue + type);
        }

        this.labelInfo.textFlow = Util.RichText(str);
    }
}
}