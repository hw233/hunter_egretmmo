namespace zj {
// 新版本确认框
// guoshanhe 创建于2018.11.14

export class NewVersionDialog extends Dialog {
    public rect_ok:eui.Rect;


    private resolve: (value: boolean) => void;
    private reject: (reason?: any) => void

    public constructor() {
        super();
        this.skinName = "resource/skins/aone/NewVersionDialogSkin.exml";

        this.rect_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);
    }

    public model(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    private onBtnOK() {
        this.resolve(true);
    }
}

}