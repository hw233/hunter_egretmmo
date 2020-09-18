namespace zj {
// wang shen zhuo
// HXH_MoraMainTeamItem
// 2019.05.24
export class MoraMainTeamItem extends eui.ItemRenderer {
    private groupCache: eui.Group;
    public imageBoard: eui.Image;
    public imageIcon: eui.Image;
    public imagePlayerId: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/fishing/MoraMainTeamItemSkin.exml";
        cachekeys(<string[]>UIResource["MoraMainTeamItem"], null);
    }

    protected dataChanged() {
        closeCache(this.groupCache);
        let path_head = PlayerHunterSystem.Head(this.data.info);
        this.imageIcon.source = cachekey(path_head , this) ;
        this.imagePlayerId.source = cachekey(UIConfig.UIConfig_WonderRunes.numberPath[this.data.index] , this) ;
        setCache(this.groupCache);
    }
}

export class MoraMainTeamItemData {
    father: MoraMainScene;
    info: any;
    index: number;
}
}