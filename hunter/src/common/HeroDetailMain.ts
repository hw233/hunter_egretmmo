namespace zj {
/**
 * @author chen xi
 * 
 * @date 2019-2-26
 * 
 * @class 查看猎人详情-查看猎人信息界面
 */
export class HeroDetailMain extends Dialog {
    
    private btnClose: eui.Button;
    private listAttribute: eui.List;

    constructor() {
        super();

        this.skinName = "resource/skins/common/HeroDetailMainSkin.exml";

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.listAttribute.itemRenderer = HeroDetailMainItem;
    }

    public setInfo(info: message.GeneralInfo, cb?: Function) {
        let [values, ] = PlayerHunterSystem.HXHCalcGelBaseAttrToShow(info);
        let serverInfo = Helper.AttriConvertTbl(info.attri);
        
        let array = new eui.ArrayCollection();
        for (let i = 0; i < TableEnum.EnumHunterAttriReal.length; i++) {
            let v = TableEnum.EnumHunterAttriReal[i];
            let b_percent = Table.FindF(TableEnum.EnumHunterAttriPercent, (_, v) => {
                return TableEnum.EnumHunterAttriReal[i] == v;
            });
            let name = TextsConfig.TextsConfig_HeroMain.attr[v] + ":";
            if (b_percent) {
                let value = Helper.StringFormat(TextsConfig.TextsConfig_HeroMain.test_specail_attri, Math.ceil(values[v - 1]), Math.ceil(serverInfo[v]));

                array.addItem([name, value]);
            } else {
                let value = Helper.StringFormat(TextsConfig.TextsConfig_HeroMain.test_attri, Math.ceil(values[v - 1]), Math.ceil(serverInfo[v]));

                array.addItem([name, value]);
            }
        }
        this.listAttribute.dataProvider = array;
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }

}
}