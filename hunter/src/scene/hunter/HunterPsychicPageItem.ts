namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-12
 * 
 * @class 猎人念力方案
 */
export class HunterPsychicPageItem extends eui.ItemRenderer {
    private btnLevel: eui.Button;
    private imgPlan: eui.Image;
    private imgLock: eui.Image;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterPsychicPageItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterPsychicPageItem"], null);
    }

    protected dataChanged() {
        let generalId = this.data as number;
        this.imgPlan.source = cachekey(UIConfig.UIConfig_Psychic.plan[this.itemIndex + 1], this);
        let hunterInfo = Game.PlayerHunterSystem.queryHunter(generalId);
        // let unLock = Table.FindF(hunterInfo.psychic_pages, (_, _v: message.IIKVPairs) => {
        //     return _v.key == this.itemIndex;
        // });

        // if (this.itemIndex == 0) {
        //     this.imgLock.visible = false;
        // } else {
        //     this.imgLock.visible = !unLock;
        // }

        // this.btnLevel.enabled = unLock;
    }
}
}