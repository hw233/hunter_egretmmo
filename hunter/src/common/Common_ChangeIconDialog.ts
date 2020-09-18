namespace zj {
// 
// lizhengqiang
// 201901
export class Common_ChangeIconDialog extends Dialog {
    private lbTipUser: eui.Label;
    private lbTipLeague: eui.Label;
    private lstIconStyle: eui.List;
    private btnConfirm: eui.Button;
    private btnClose: eui.Button;

    readonly COUNT_PER_ROW: number = 5;
    private CB: Function = null;
    private picId: number = 0;
    public static index: number = 1;
    public static picType1: number;
    public mapIndex = 0;
    public idMap = [];
    private idRet;
    private focusLast;
    private focisCur;
    public vis: boolean = false;
    public constructor() {
        super();

        this.skinName = "resource/skins/common/Common_ChangeIconDialogSkin.exml";

        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        Common_ChangeIconDialog.index = 1;
        Common_ChangeIconDialog.picType1 = null;
        Game.EventManager.on("COMMON_CHANGE_ICON_SETPICID", this.setPicId, this);

    }

    public setCB(cb?) {
        this.CB = cb;
    }

    public loadList(picType: number) {
        Common_ChangeIconDialog.picType1 = picType;
        if (picType == TableEnum.TableIconListState.LEAGUE) {
            this.loadListLEAGUE();
        }
        this.focisCur = 1;
        this.focusLast = this.focisCur;
    }

    private itemRendererFunction(source) {
        if (source.listType == "title") {
            if (PlayerItemSystem.GetNormalPic(3).length != 0) {
                return Common_ChangeIconTitleIR;
            } else {
                return Common_ChangeIconNoneIR;
            }
        } else if (source.listType == "content") {
            return Common_ChangeIconContentIR;
        }
    }

    private itemRendererFunction1(source) {
        if (source.listType == "1") {
            return Common_ChangeIconTitleIR;
        } else if (source.listType == "2") {
            return Common_ChangeIconNoneIR;
        } else if (source.listType == "3") {
            return Common_ChangeIconContentIR;
        }
    }

    private loadListLEAGUE() {
        this.lbTipUser.visible = false;
        this.lbTipLeague.visible = false;

        let picIdsNormal = PlayerItemSystem.GetNormalPic(3);

        let arrayCollection = new eui.ArrayCollection();
        arrayCollection.addItem({ "listType": "title", "iconType": TableEnum.TableIconListState.LEAGUE, "titleType": 1 });
        let index1 = 0;
        for (let i = 0; i < Math.ceil(picIdsNormal.length / this.COUNT_PER_ROW); i++) {
            let num = (i + 1) * this.COUNT_PER_ROW;
            if (num <= picIdsNormal.length) {
                let arr: number[] = [];
                let indexArr: number[] = [];
                for (let j = 0; j < this.COUNT_PER_ROW; j++) {
                    let index = i * 5 + j;
                    arr.push(picIdsNormal[index]);
                    indexArr.push(index1 += 1);
                }
                arrayCollection.addItem({ "listType": "content", "iconType": TableEnum.TableIconListState.LEAGUE, "picIds": arr, "index": indexArr, "father": this, "i": i });
            } else {
                let arr: number[] = [];
                let indexArr: number[] = [];
                for (let j = 0; j < num - picIdsNormal.length; j++) {
                    let index = i * 5 + j;
                    arr.push(picIdsNormal[index]);
                    indexArr.push(index1 += 1);
                }
                arrayCollection.addItem({ "listType": "content", "iconType": TableEnum.TableIconListState.LEAGUE, "picIds": arr, "index": indexArr, "father": this, "i": i });
            }

        }
        this.lstIconStyle.itemRendererFunction = this.itemRendererFunction;
        this.lstIconStyle.dataProvider = arrayCollection;
    }

    private setPicId(ev: egret.Event) {
        this.picId = <number>ev.data;
    }

    private onBtnConfirm() {
        if (this.CB != null) this.CB(this.picId);
        this.close(UI.HIDE_TO_TOP);
    }

    private onBtnClose() {
        if (this.CB != null) this.CB(0);
        this.close(UI.HIDE_TO_TOP);
    }

    private FreshFocus(index, id, vis) {
        this.idRet = id;
        this.vis = vis;
    }
}

}