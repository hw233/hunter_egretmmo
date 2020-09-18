namespace zj {

export class CommonPotatoScreenAttribute extends UI {
    public static ID = "CommonPotatoScreenAttribute";
    private listInfo: eui.List;
    private listInfoData: eui.ArrayCollection = new eui.ArrayCollection();
    private lastSelectedIndex: number = -1;
    private callback: Function = null;

    constructor() {
        super();
        this.skinName = "resource/skins/common/CommonPotatoScreenAttributeSkin.exml";
    }

    public setInfo(bMain: boolean, selectedId: number = 0,  callback?: Function) {
        this.callback = callback;

        this.listInfoData.removeAll();
        let data = new CommonPotatoScreenItemData();
        data.id = 0;
        data.name = TextsConfig.TextsConfig_Potato.all;
        data.type = 0;
        data.isSelected = (selectedId == 0);
        this.listInfoData.addItem(data);
        
        let screenInfo = TableClientPotatoScreen.Table();
        for (let k in screenInfo) {
            if (screenInfo.hasOwnProperty(k)) {
                let v = screenInfo[k];
                let data = new CommonPotatoScreenItemData();
                data.id = v.id;
                data.type = v.type;
                data.name = v.name;
                data.isSelected = (v.id == selectedId);
                if (bMain && v.type == 1) {
                    this.listInfoData.addItem(data);
                } else if (!bMain && v.type == 2){
                    this.listInfoData.addItem(data);
                }
            }
        }
        this.listInfo.dataProvider = this.listInfoData;
        this.listInfo.itemRenderer = CommonPotatoScreenItem;
        this.listInfo.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListInfoTap, this);
        
        this.lastSelectedIndex = this.getLastSelectedIndex();
    }

    private getLastSelectedIndex() {
        let index = -1;
        for (let i = 0; i < this.listInfoData.length; i++) {
            let data = this.listInfoData.getItemAt(i) as CommonPotatoScreenItemData;
            if (data.isSelected == true) {
                index = i;
                break;
            }
        }
        return index;
    }

    private onListInfoTap(e: eui.ItemTapEvent) {
        if (this.lastSelectedIndex < 0) {
            return;
        }
        
        let lastData = this.listInfoData.getItemAt(this.lastSelectedIndex) as CommonPotatoScreenItemData;
        if (lastData) {
            lastData.isSelected = false;
            this.listInfoData.replaceItemAt(lastData, this.lastSelectedIndex);
        }

        let data = this.listInfoData.getItemAt(e.itemIndex) as CommonPotatoScreenItemData;
        data.isSelected = true;
        this.listInfoData.replaceItemAt(data, e.itemIndex);

        this.lastSelectedIndex = e.itemIndex;
        if (this.callback) {
            this.callback(data.id);
        }
    }
}

}