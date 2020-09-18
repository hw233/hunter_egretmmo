namespace zj {
/**
 * @author wang  shen  zhuo
 * 
 * @date 2019-1-3
 */
export class Common_PlayerCardPopBItem extends eui.ItemRenderer {
    private groupAttri: eui.Group;
    private imageAttri: eui.Image;
    private labelAttri: eui.Label;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/Common_PlayerCardPopBItemSkin.exml";
        cachekeys(<string[]>UIResource["Common_PlayerCardPopBItem"], null);
        // this.groupAttri
    }

    protected dataChanged() {
        // this.groupAttri
        this.updateView(this.data);
        this.width = this.data.width;
    }

    private updateView(data: Common_PlayerCardPopBItemData) {
        this.labelAttri
        this.labelAttri.textFlow = Util.RichText(data.description);
        let color = Helper.RGBToHex("r:30,g:30,b:30");
        if (data.cardInfo.star == 6) {
            color = Helper.RGBToHex("r:120,g:120,b:120");
        }
        this.labelAttri.textColor = color;
        // this.imageAttri.y = data.index
    }
}

export class Common_PlayerCardPopBItemData {

    description: string;

    cardInfo: message.PotatoInfo;

    width: number;
    index: number;
}
}