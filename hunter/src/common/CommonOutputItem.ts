namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-9
 */
export class CommonOutputItem extends eui.ItemRenderer {

    private imgIcon: eui.Image;
    private labelName: eui.Label;
    private labelInfo: eui.Label;
    private imgGo: eui.Image;
    private labelNotOpen: eui.Label;
    private fromId;
    public constructor() {
        super();
        this.skinName = "resource/skins/common/CommonOutputItemSkin.exml";
    }

    protected dataChanged() {
        let info = this.data as TableClientGetProp;
        if (info == null) {
            throw Error("info should not null.");
        }
        this.imgIcon.source = cachekey(info.path, this);
        this.labelName.text = info.name;
        let bOpen = Game.PlayerMissionSystem.Open(info.index);
        this.labelInfo.text = bOpen ? info.info : info.open;
        this.imgGo.visible = bOpen;
        this.labelNotOpen.visible = !bOpen;
    }

}
}