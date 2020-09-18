namespace zj {
// 规则说明
// lizhengqiang
// 20190107
export class Common_RuleDialog extends Dialog {
    public static ID = "Common_RuleDialog";

    private lbRule: eui.Label;
    private btnClose: eui.Button;
    private groupView: eui.Group;

    public constructor() {
        super();

        this.skinName = "resource/skins/common/Common_RuleDialogSkin.exml";

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
    }

    public init(text: string) {
        this.lbRule.text = text;
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }

}

}