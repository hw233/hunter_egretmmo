namespace zj {
// 
// lizhengqiang
// 20190111
export class Common_InputLongDialog extends Dialog {
    public static ID = "Common_InputLongDialog";

    private imgTip: eui.Image;
    private textContent: eui.TextInput;
    private btnCancel: eui.Button;
    private btnConfirm: eui.Button;

    private CB: Function = null;

    public constructor() {
        super();

        this.skinName = "resource/skins/common/Common_InputLongDialogSkin.exml";

        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);

        this.init();
    }

    private init() {
        this.textContent.skinName = "resource/skins/common/TextInputSkin.exml";
        this.textContent.textDisplay.textColor = 0xB19782;
        this.textContent.promptDisplay.textColor = 0xB19782;
        this.textContent.inputType = egret.TextFieldType.INPUT;
        this.textContent.prompt = TextsConfig.TextConfig_Input.commonLong;
    }

    public setCB(cb?) {
        this.CB = cb;
    }

    public setInfo(title: string, num: number) {
        this.imgTip.source = cachekey(UIConfig.UIConfig_League.wordsInput[num - 1], this);
    }

    private onBtnCancel() {
        this.onBtnClose();
    }

    private onBtnConfirm() {
        if (this.CB != null) this.CB(this.textContent.text);
        this.close(UI.HIDE_TO_TOP);
    }

    private onBtnClose() {
        if (this.CB != null) this.CB(undefined);
        this.close(UI.HIDE_TO_TOP);
    }

}

}