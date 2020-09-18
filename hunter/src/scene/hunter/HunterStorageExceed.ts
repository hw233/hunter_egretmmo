namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-31
 * 
 * @class 猎人仓库容量达到上限
 */
export class HunterStorageExceed extends Dialog {
    private imgMaxOwn: eui.Image;
    private imgMaxStorage: eui.Image;
    private labelNumber: eui.Label;
    private labelBig: eui.Label;
    private btnConfirm: eui.Button;

    private callback: Function;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterStorageExceedSkin.exml";

        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
    }

    public setInfo(showMaxStorage: boolean, selectedNumber: string, bigNumber: string, cb: Function) {
        this.callback = cb;
        this.imgMaxStorage.visible = showMaxStorage;
        this.imgMaxOwn.visible = !showMaxStorage;
        this.labelNumber.text = selectedNumber;
        this.labelBig.text = bigNumber;
    }

    private onBtnConfirm() {
        this.close(UI.HIDE_TO_TOP);
        if (this.callback) this.callback();
    }
}

}