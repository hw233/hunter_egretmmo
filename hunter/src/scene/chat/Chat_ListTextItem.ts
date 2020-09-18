namespace zj {

export class Chat_ListTextItem extends eui.ItemRenderer {
    public labelNum:eui.Label;
    public imageBg: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/chat/Chat_ListTextItemSkin.exml";
        cachekeys(<string[]>UIResource["Chat_ListTextItem"], null);
    }

    protected dataChanged() {
        let num = this.data;
        this.labelNum.text = num;

        if(this.selected) {
            this.imageBg.visible = true;
        }else{
            this.imageBg.visible = false;
        }
    }
}
}