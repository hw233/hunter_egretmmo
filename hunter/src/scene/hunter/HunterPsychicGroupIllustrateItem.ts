namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-12
 */
export class HunterPsychicGroupIllustrateItem extends eui.ItemRenderer {
    private imgIcon: eui.Image;
    private labelName: eui.Label;
    private labelGroup: eui.Label;
    private labelIncludes: eui.Label;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterPsychicGroupIllustrateItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterPsychicGroupIllustrateItem"], null);
    }

    protected dataChanged() {
        let info = this.data as TableGeneralPsychic;
        this.imgIcon.source = cachekey(info.path, this);
        this.labelName.text = info.name;

        let [des,] = PlayerHunterSystem.GetPassiveSkillDes(info.group_talent, 1);
        this.labelGroup.textFlow = Util.RichText(des);

        let [, str] = PlayerHunterSystem.GetPsychicGroupAttriType(info.psychic_id);
        this.labelIncludes.text = str;
    }
}
}