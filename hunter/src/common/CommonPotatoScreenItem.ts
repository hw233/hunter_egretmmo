namespace zj {
/**
 * @author chen xi 
 * 
 * @date 2019-1-2
 */
export class CommonPotatoScreenItem extends eui.ItemRenderer {
    
    private btnSwitch: eui.ToggleButton;
    
    constructor() {
        super();
        this.skinName = "resource/skins/common/CommonPotatoScreenItemSkin.exml";
    }

    protected dataChanged() {
        let data = this.data as CommonPotatoScreenItemData;
        Helper.SetButtonLabel(this.btnSwitch, data.name);
        this.btnSwitch.selected = data.isSelected;
    }
}

export class CommonPotatoScreenItemData {
    type: number;
    id: number;
    name: string;
    isSelected: boolean = false;
}
}