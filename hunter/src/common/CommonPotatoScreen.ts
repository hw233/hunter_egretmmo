namespace zj {

export class CommonPotatoScreen extends Dialog {
    public static ID = "CommonPotatoScreen";

    private btnClose: eui.Button;
    private btnMain: eui.Button;
    private btnAdd1: eui.Button;
    private btnAdd2: eui.Button;
    private btnAdd3: eui.Button;
    private btnReset: eui.Button;
    private btnConfirm: eui.Button;
    private groupAll: eui.Group;
    private groupMain: eui.Group;
    private groupAttribute: eui.Group;

    private screenTable: {[key: string]: TableClientPotatoScreen} = {};
    private screenMain: number[] = [];
    private screenAddition: number[] = [];
    private callback: Function;
    private isShowAttribute: boolean = false;
    private isRemovedFromTapGesture: boolean = false;
    
    constructor() {
        super();
        this.skinName = "resource/skins/common/CommonPotatoScreenSkin.exml";
        this.init();
    }

    private init() {
        let tap = egret.TouchEvent.TOUCH_TAP;
        this.btnClose.addEventListener(tap, this.onBtnClose, this);
        this.btnMain.addEventListener(tap, this.onBtnMain, this);
        this.btnAdd1.addEventListener(tap, this.onBtnAdd1, this);
        this.btnAdd2.addEventListener(tap, this.onBtnAdd2, this);
        this.btnAdd3.addEventListener(tap, this.onBtnAdd3, this);
        this.btnReset.addEventListener(tap, this.onBtnReset, this);
        this.btnConfirm.addEventListener(tap, this.onBtnConfirm, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapEnd, this);

        Helper.SetButtonLabel(this.btnMain, "全部", 18);
        Helper.SetButtonLabel(this.btnAdd1, "全部", 18);
        Helper.SetButtonLabel(this.btnAdd2, "全部", 18);
        Helper.SetButtonLabel(this.btnAdd3, "全部", 18);

        this.screenTable = TableClientPotatoScreen.Table();
    }

    public setInfo(screenMain: number[], screenAddition: number[], callback: Function) {
        this.callback = callback;
        this.screenMain = screenMain;
        this.screenAddition = screenAddition;

        this.refresh();
    }

    private refresh() {
        let getAttributeName = (id: number) => {
            if (id == 0) {
                return TextsConfig.TextsConfig_Potato.all;
            } else {
                return this.screenTable[id].name;
            }
        };

        this.btnMain.label = getAttributeName(this.screenMain[0]);
        for (let i = 0; i < this.screenAddition.length; i++) {
            let v = this.screenAddition[i];
            let btn = this[`btnAdd${i + 1}`] as eui.Button;
            btn.label = getAttributeName(v);
        };
    }

    private onTapEnd(e: egret.TouchEvent) {
        let dialog = this.groupAll.getChildByName("common-potato-screen-attribute");
        if (dialog) {
            let global = this.localToGlobal(this.groupAll.x, this.groupAll.y);
            global.x -= Game.UIManager.x;
            let minX = global.x + dialog.x;
            let maxX = minX + dialog.width;
            let minY = global.y + dialog.y;
            let maxY = minY + dialog.height;
            let touchPoint = this.localToGlobal(e.stageX, e.stageY);
            touchPoint.x -= Game.UIManager.x;
            if ((touchPoint.x >= minX && touchPoint.x <= maxX) && (touchPoint.y >= minY && touchPoint.y <= maxY)) {
               return; 
            }
            this.groupAll.removeChild(dialog);
            this.isShowAttribute = false;
            // fix bug: when click the button, first invoke the tap end listener, then response the click function.
            this.isRemovedFromTapGesture = true;
            egret.setTimeout(() => {
                this.isRemovedFromTapGesture = false
            }, this, 100);
        }
    }

    private onBtnClose() {
        if (this.isShowAttribute == true) {
            this.removeAttributeView();
            return;
        }
        
        TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Hunter_Compound.closeNotSave, () => {
            if (this.callback) {
                this.callback(this.screenMain, this.screenAddition);
            }
            egret.Tween.get(this.groupAll).wait(500).call(() => {
                this.close(UI.HIDE_TO_TOP);
            });
        });
    }

    private onBtnMain() {
        if (this.isRemovedFromTapGesture) return;
        this.isRemovedFromTapGesture = false;

        loadUI(CommonPotatoScreenAttribute).then((dialog: CommonPotatoScreenAttribute) => this.loadAttributeUI(dialog, 0));
    }

    private onBtnAdd1() {
        if (this.isRemovedFromTapGesture) return;
        this.isRemovedFromTapGesture = false;

        loadUI(CommonPotatoScreenAttribute).then((dialog: CommonPotatoScreenAttribute) => this.loadAttributeUI(dialog, 1));
    }

    private onBtnAdd2() {
        if (this.isRemovedFromTapGesture) return;
        this.isRemovedFromTapGesture = false;

        if (this.isShowAttribute) {
            this.removeAttributeView();
            return;
        }

        loadUI(CommonPotatoScreenAttribute).then((dialog: CommonPotatoScreenAttribute) => this.loadAttributeUI(dialog, 2));
    }

    private onBtnAdd3() {
        if (this.isRemovedFromTapGesture) return;
        this.isRemovedFromTapGesture = false;

        if (this.isShowAttribute) {
            this.removeAttributeView();
            return;
        }
        
        loadUI(CommonPotatoScreenAttribute).then((dialog: CommonPotatoScreenAttribute) => this.loadAttributeUI(dialog, 3));
    }

    private loadAttributeUI(dialog: CommonPotatoScreenAttribute, type: number) {
        this.isShowAttribute = true;

        let destX = this.groupAll.width * 0.5 - dialog.width * 0.5;
        let destY = 0;
        if (type == 0) {
            destY = this.groupMain.y + this.groupMain.height - 20
        } else if (type == 1) {
            destY = this.groupAttribute.y + this.btnAdd1.y + this.btnAdd1.height + 10;
        } else if (type == 2 || type == 3) {
            dialog.anchorOffsetY = dialog.height;
            destY = this.groupAttribute.y + this[`btnAdd${type}`].y - 10;
        } else {
            throw new Error("type error.");
        }
        dialog.x = destX;
        dialog.y = destY;
        dialog.name = "common-potato-screen-attribute";

        if (type == 0) {
            dialog.setInfo(true, this.screenMain[0], (id: number) => {
                this.screenMain[0] = id;
                this.removeAttributeView(true);
            });
        } else if (type == 1) {
            dialog.setInfo(false, this.screenAddition[0], (id: number) => {
                this.screenAddition[0] = id;
                this.removeAttributeView(true);
            });
        } else if (type == 2) {
            dialog.setInfo(false, this.screenAddition[1], (id: number) => {
                this.screenAddition[1] = id;
                this.removeAttributeView(true);
            });
        } else if (type == 3) {
            dialog.setInfo(false, this.screenAddition[2], (id: number) => {
                this.screenAddition[2] = id;
                this.removeAttributeView(true);
            });
        }

        this.groupAll.addChild(dialog);

        let time = 120;
        egret.Tween.get(dialog).
            to({ scaleY: 0 }, 0).
            to({ scaleY: 1.05 }, time).
            to({ scaleY: 0.95 }, time).
            to({ scaleY: 1.0 }, time);
        
    }

    private removeAttributeView(refresh?: boolean) {
        let dialog = this.groupAll.getChildByName("common-potato-screen-attribute");
        if (dialog) {
            this.groupAll.removeChild(dialog);
        }
        this.isShowAttribute = false;
        
        if (refresh) this.refresh();

    }

    private onBtnReset() {
        if (this.isRemovedFromTapGesture) return;
        this.isRemovedFromTapGesture = false;

        if (this.isShowAttribute === true) {
            this.removeAttributeView();
            return;
        }
        
        this.screenMain = [0];
        this.screenAddition = [0, 0, 0];
        this.refresh();
    }

    private onBtnConfirm() {
        if (this.isRemovedFromTapGesture) return;
        this.isRemovedFromTapGesture = false;

        if (this.isShowAttribute === true) {
            this.removeAttributeView();
            return;
        }

        if (this.callback) {
            this.callback(this.screenMain, this.screenAddition);
        }
        this.close(UI.HIDE_TO_TOP);
    }
}

}