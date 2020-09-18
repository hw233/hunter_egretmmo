namespace zj {

// lizhengqiang
// 2018/11/08

export class PackageMainTypeIR extends eui.ItemRenderer {
    private btnTag: eui.Button;
    private imgText: eui.Image;
    private imgTip: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/package/PackageMainTypeIRSkin.exml";
        cachekeys(<string[]>UIResource["PackageMainTypeIR"], null);
    }

    protected dataChanged() {
        this.imgText.source = cachekey(this.data.imgTextSource, this);
        this.imgTip.visible = this.data.imgTipVisible;
        if (this.selected) this.btnTag.currentState = "down";
    }
}

}