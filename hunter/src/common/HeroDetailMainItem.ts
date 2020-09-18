namespace zj {
/**
 * @author chen xi
 * 
 * @date 2019-2-26
 * 
 * @class 查看猎人详情-猎人信息子项
 */
export class HeroDetailMainItem extends eui.ItemRenderer {

    private labelName: eui.Label;
    private labelValue: eui.Label;

    constructor() {
        super();

        this.skinName = "resource/skins/common/HeroDetailMainItemSkin.exml";
    }

    protected dataChanged() {
        let [name, value] = this.data;
        this.labelName.text = name;
        this.labelValue.text = value;
    }
}
}