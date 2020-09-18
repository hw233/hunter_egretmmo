namespace zj {
/**
 * @author chen xi
 * 
 * @date 2018-12-11
 * 
 * @class 猎人升星界面显示内容
 */
export class HunterUpStarAttributeItem extends UI {
    private labelName: eui.Label;
    private labelValue: eui.Label;
    private labelValueRight: eui.Label;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterUpStarAttributeItemSkin.exml";
    }

    /**
     * 设置基本信息
     * 
     * @param name 属性
     * @param value 当前值
     * @param nextValue 下一级别的值
     */
    public setInfo(name: string, value: string, nextValue: string) {
        this.labelName.text = name;
        this.labelValue.text = value;
        this.labelValueRight.text = nextValue;
    }
}

}