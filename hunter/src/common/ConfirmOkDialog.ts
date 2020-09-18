namespace zj {
// created by hhh in 2018/11/21

export class ConfirmOkDialog extends Dialog {
    public static ID = "ConfirmOkDialog";
    private groupAni: eui.Group;
    private labelNotice: eui.Label;
    private btnConfirm: eui.Button;

    private callback_this: any; // 回调接收者
    private callback_function: () => void; // 回调函数

    public constructor() {
        super();

        this.skinName = "resource/skins/common/ConfirmOkDialogSkin.exml";

        this.init();
    }

    private init() {
        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);

        Game.DragonBonesManager.playAnimation(this, "npc_bisiji", "armatureName", null, 0)
            .then(display => {
                display.x = this.groupAni.width / 2;
                display.y = this.groupAni.height;
                display.scaleX = 0.6;
                display.scaleY = 0.6;
                this.groupAni.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    public setInfo(message: string, callback_function?: () => void, callback_this?: any) {
        this.callback_function = callback_function;
        this.callback_this = callback_this;
        this.labelNotice.text = message;
    }

    private onBtnConfirm() {
        this.close(UI.HIDE_TO_TOP);
    }

    private onRemoveFromStage() {
        if (this.callback_function) {
            this.callback_function.call(this.callback_this);
            this.callback_this = null;
            this.callback_function = null;
        }
    }
}

}