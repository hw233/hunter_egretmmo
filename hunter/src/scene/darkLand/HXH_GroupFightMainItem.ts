namespace zj {
// HXH_GroupFightMainItem
// wangshenzhuo
// 2019/03/06
export class HXH_GroupFightMainItem extends eui.ItemRenderer {

    public buttonLevel: eui.Button;
    public labelLevel: eui.BitmapLabel;
    public imageLock: eui.Image;
    public imageSelected: eui.Image;


    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/HXH_GroupFightMainItemSkin.exml";
        cachekeys(<string[]>UIResource["HXH_GroupFightMainItem"], null);
    }

    protected dataChanged() {
        let open = this.data.id < PlayerGroupFightSystem.GetMaxCustomsByIndex(PlayerGroupFightSystem.fightGroupExt);
        this.buttonLevel.touchEnabled = false;
        this.imageSelected.visible = false;

        if (open) {
            Set.ButtonBackgroud(this.buttonLevel, UIConfig.UIConfig_Hunter_GroupFight.chooseOpen[1]);
            this.buttonLevel.touchEnabled = true;
            if (this.selected) {
                Set.ButtonBackgroud(this.buttonLevel, UIConfig.UIConfig_Hunter_GroupFight.chooseOpen[1]);
            } else {
                Set.ButtonBackgroud(this.buttonLevel, UIConfig.UIConfig_Hunter_GroupFight.chooseOpen[0]);
            }
        } else {
            Set.ButtonBackgroud(this.buttonLevel, UIConfig.UIConfig_Hunter_GroupFight.chooseUnOpen[0]);
            this.buttonLevel.touchEnabled = false;
        }

        this.imageLock.visible = !open;
        this.labelLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.hard, this.data.index % 10000);

        this.SetInfoSelect(this.data.index == this.data.father.hardIndex % 10000);
    }

    private SetInfoSelect(select) {

    }
}

//子项数据源
export class HXH_GroupFightMainItemData {
    index: number;
    id: number;
    father: any;

}
}