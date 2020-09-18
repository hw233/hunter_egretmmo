namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-12
 * 
 * @class 组合图鉴
 */
export class HunterPsychicGroupIllustrateDialog extends Dialog {
    private btnClose: eui.Button;
    private listGroup: eui.List;
    private listGroupData: eui.ArrayCollection = new eui.ArrayCollection();

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterPsychicGroupIllustrateDialogSkin.exml";

        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

        this.loadList();
    }

    private loadList() {
        this.listGroupData.removeAll();

        let listData = PlayerHunterSystem.GetPsychicGroupIllustrateData();
        for (let key in listData) {
            if (listData.hasOwnProperty(key)) {
                let value = listData[key];
                this.listGroupData.addItem(Number(key));
                for (let i = 0; i < value.length; i++) {
                    let vv = value[i];
                    this.listGroupData.addItem(vv);
                }
            }
        }

        this.listGroup.dataProvider = this.listGroupData;
        this.listGroup.itemRendererFunction = this.listItemRenderer;
    }

    private listItemRenderer(data: number | Object) {
       if (typeof data === "number") {
            return HunterPsychicGroupIllustrateTitleItem;
        } else {
            return HunterPsychicGroupIllustrateItem;
        }
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}

}