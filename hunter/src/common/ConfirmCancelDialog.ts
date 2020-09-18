namespace zj {
// created by hhh in 2018/11/23

export class ConfirmCancelDialog extends Dialog {
    public static ID = "ConfirmCancelDialog";

    private groupAni: eui.Group;

    private labelNotice: eui.Label;
    private btnConfirm: eui.Button;
    private btnCancel: eui.Button;

    private confirmCB: Function = null
    private cancelCB: Function = null

    public constructor() {
        super();

        this.skinName = "resource/skins/common/ConfirmCancelDialogSkin.exml";

        this.init();
    }

    private init() {
        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);

        Game.DragonBonesManager.playAnimation(this, "npc_bisiji", null, "animation2", 0)
            .then(display => {
                display.x = this.groupAni.width / 2;
                display.y = this.groupAni.height;
                display.scaleX = 0.6;
                display.scaleY = 0.58;
                this.groupAni.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    public setInfo(message: string) {
        this.labelNotice.textFlow = Util.RichText(message);
    }

    public setCB(confirmCB?: Function, cancelCB?: Function) {
        this.confirmCB = confirmCB;
        this.cancelCB = cancelCB;
    }

    private onBtnConfirm() {
        if (this.confirmCB != null)
            this.confirmCB();

        this.close();
    }

    private onBtnCancel() {
        if (this.cancelCB != null)
            this.cancelCB();

        this.close();
    }
}

}