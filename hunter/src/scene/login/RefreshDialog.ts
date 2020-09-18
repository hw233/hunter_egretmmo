namespace zj {
// 刷新页面确认框
// guoshanhe 创建于2018.11.14

export class RefreshDialog extends Dialog {
    public rect_cancel:eui.Rect;
    public rect_ok:eui.Rect;

    private resolve: (value: boolean) => void;
    private reject: (reason?: any) => void

    public constructor() {
        super();
        this.skinName = "resource/skins/aone/RefreshDialogSkin.exml";

        this.rect_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
        this.rect_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);
    }

    public model(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    private onBtnCancel() {
        this.resolve(false);
    }

    private onBtnOK() {
        this.resolve(true);
    }
}

}