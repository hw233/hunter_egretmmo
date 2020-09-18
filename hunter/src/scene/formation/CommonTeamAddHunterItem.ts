namespace zj {
export class CommonTeamAddHunterItem extends eui.ItemRenderer {
    public btnAddTeam: eui.Button;
    public imgHeroFrame: eui.Image;
    public imgHeroHead: eui.Image;


    public constructor() {
        super();
        this.skinName = "resource/skins/formation/CommonTeamAddHunterItemSkin.exml";
        cachekeys(<string[]>UIResource["CommonTeamAddHunterItem"], null);
    }

    protected dataChanged() {
        let generalId: number = this.data.generalId;
        let isShowAdd: boolean = this.data.isShowAdd;

        if (generalId == null || generalId == 0) {
            let showAdd: boolean = isShowAdd == null ? true : false;
            this.imgHeroFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[0] , this) ;
            this.imgHeroHead.visible = false;
            this.btnAddTeam.visible = showAdd;
            this.btnAddTeam.touchEnabled = false;
        } else {
            this.imgHeroFrame.visible = true;
            this.btnAddTeam.visible = false;
            this.btnAddTeam.touchEnabled = false;
            this.imgHeroHead.source = cachekey(PlayerHunterSystem.Head(generalId) , this) ;
            this.imgHeroFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[Game.PlayerHunterSystem.queryHunter(generalId).step] , this) ;
        }
    }
}
}