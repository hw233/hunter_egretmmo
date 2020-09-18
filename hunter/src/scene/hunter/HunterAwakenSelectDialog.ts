namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-7
 */
export class HunterAwakenSelectDialog extends Dialog {
    private btnClose: eui.Button;
    private labelTip: eui.Label;
    private labelSelectedNum: eui.Label;
    private btnConfirm: eui.Button;
    private listMaterial: eui.List;

    private listMaterialData: eui.ArrayCollection = new eui.ArrayCollection();
    private consumeNumber: number;
    private generalId: number;
    private selectedHunterId: Array<number> = [];
    private selectedDollIndex: Array<number> = [];
    private callback: Function;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterAwakenSelectDialogSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
    }

    /**
     * 设置基本信息
     * 
     * @param generalId 猎人ID
     * @param consumeNumber 消耗数量
     * @param selectedHunterId 选中的猎人ID
     * @param selectedDollIndex 选中的人偶下标
     * @param callback 回调函数，上层界面再该回调函数中需要再次刷新界面, 透传回 `选中的猎人ID` 和 `选中的人偶下标`
     */
    public setInfo(generalId: number, consumeNumber: number, selectedHunterId: Array<number>, selectedDollIndex: Array<number>, callback: Function) {
        this.generalId = generalId;
        this.consumeNumber = consumeNumber;
        this.selectedHunterId = selectedHunterId;
        this.selectedDollIndex = selectedDollIndex;
        this.callback = callback;

        this.refresh();
    }

    private refresh() {
        let baseGeneralInfo = PlayerHunterSystem.Table(this.generalId);
        let isShowGetButton = false;
        if (baseGeneralInfo.aptitude == 14 || baseGeneralInfo.aptitude == 13) {
            this.labelTip.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter.awaken);
            isShowGetButton = true; // A 和 S 级猎人显示获取按钮 
        } else {
            this.labelTip.textFlow = Util.RichText(TextsConfig.TextsConfig_Hunter.awaken_next);
        }

        let consumeList = PlayerHunterSystem.SkillConsume(this.generalId);
        if (isShowGetButton) consumeList.push(-1);

        let fix = PlayerItemSystem.FixCount(consumeList.length, 16, 4);
        for (let i = 0; i < fix; i++) {
            consumeList.push(0);
        }
        
        this.setLabelInfo();

        this.listMaterialData.removeAll();
        for (let i = 0; i < consumeList.length; i++) {
            let v = consumeList[i];
            let data = new HunterAwakenSelectDialogItemData();
            data.index = i;
            data.info = v;
            data.isSelected = false;
            data.generalId = this.generalId;
            data.consume = this.consumeNumber;
            data.isSelected = this.materialIsSelected(data);
            this.listMaterialData.addItem(data);
        }
        this.listMaterial.dataProvider = this.listMaterialData;
        this.listMaterial.itemRenderer = HunterAwakenSelectDialogItem;
        this.listMaterial.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListMaterialTap, this);
    }

    private materialIsSelected(data: HunterAwakenSelectDialogItemData): boolean {
        if (this.selectedHunterId.length < 1 && this.selectedDollIndex.length < 1) {
            return false;
        }

        if (typeof data.info === "number") {
            return false;
        }

        if (data.info instanceof message.GeneralInfo) { // 同名猎人
            let index = this.selectedHunterId.indexOf((data.info as any).general_id);
            return index > -1;
        } else if (data.info instanceof Object) { // 玩偶
            let index = this.selectedDollIndex.indexOf(data.index);
            return index > -1;
        }
    }

    private setLabelInfo() {
        let length = this.selectedHunterId.length + this.selectedDollIndex.length;
        if (length != this.consumeNumber) {
            this.labelSelectedNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter.awaken_select, length, this.consumeNumber));
        } else {
            this.labelSelectedNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter.awaken_select_next, length, this.consumeNumber));
        }
    }

    private onListMaterialTap(e: eui.ItemTapEvent) {
        let data = this.listMaterialData.getItemAt(e.itemIndex) as HunterAwakenSelectDialogItemData;
        if (data == null || data == undefined || data.info == 0) return;

        if (data.isSelected == false) {
            if (this.selectedHunterId.length + this.selectedDollIndex.length >= this.consumeNumber) {
                toast_warning(TextsConfig.TextsConfig_Hunter.selectAwaken);
                return;
            }
        }

        let defenceTbl = PlayerHunterSystem.GeneralsIdInDefence();
        let isDefence = Table.FindF(defenceTbl, (_, _v) => {
            return _v[0] == (data.info as any).general_id;
        });
        let [findv, ] = Table.FindR(defenceTbl, (_, _v) => {
            return _v[0] == (data.info as any).general_id;
        });
        
        if (isDefence && findv != null) {
            let defenceType = findv[1];
            let str = "";
            if (defenceType == 1) {
                str = TextsConfig.TextsConfig_Hunter.errorAwaken1;
            } else if (defenceType == 2) {
                str = TextsConfig.TextsConfig_Hunter.errorAwaken2;
            } else if (defenceType == 3) {
                str = TextsConfig.TextsConfig_Hunter.errorAwaken3;
            } else if (defenceType == 4) {
                str = TextsConfig.TextsConfig_Hunter.errorAwaken4;
            }
            toast(str);
            return;
        }

        if (typeof data.info === "number") {
            if (data.info == -1) {
                let baseGeneralInfo = PlayerHunterSystem.Table(data.generalId)
                let itemId = CommonConfig.same_aptitude_doll[baseGeneralInfo.aptitude - 13];

                loadUI(CommonOutExchangeDialog).then((dialog: CommonOutExchangeDialog) => {
                    dialog.setInfo(itemId, () => {
                        this.refresh();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
            }
            return;
        }

        data.isSelected = !data.isSelected;
        this.listMaterialData.replaceItemAt(data, e.itemIndex);

        if (data.isSelected) {
            if (data.info instanceof message.GeneralInfo) {
                this.selectedHunterId.push((data.info as any).general_id);
            } else if (data.info instanceof Object) {
                this.selectedDollIndex.push(data.index);
            }
            
        } else {
            if (data.info instanceof message.GeneralInfo) {
                let index = this.selectedHunterId.indexOf((data.info as any).general_id);
                if (index > -1) {
                    this.selectedHunterId.splice(index, 1);
                }
            } else if (data.info instanceof Object) {
                let index = this.selectedDollIndex.indexOf(data.index);
                if (index > -1) {
                    this.selectedDollIndex.splice(index, 1);
                }
            }
            
        }

        this.setLabelInfo();
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }

    private onBtnConfirm() {
        this.onBtnClose();
        if (this.callback) {
            this.callback(this.selectedHunterId, this.selectedDollIndex);
        }
    }
}

}