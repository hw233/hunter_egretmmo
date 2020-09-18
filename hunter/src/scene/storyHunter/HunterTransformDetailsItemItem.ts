namespace zj {
//HXH_HunterTransformDetailsItemItem
// wangshenzhuo
// 2019-07-17
export class HunterTransformDetailsItemItem extends eui.ItemRenderer {

    public imageLine: eui.Image;
    public lebelPlayerInfo: eui.Label;
    public imageGM: eui.Image;


    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/HunterTransformDetailsItemItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterTransformDetailsItemItem"], null);
    }

    protected dataChanged() {
        let index = this.data.index + 1;
        let value = this.data.info;
        if(index && value) {
            this.lebelPlayerInfo.text = Helper.StringFormat(TextsConfig.TextsConfig_Train.Attri[index] , value);
            if(index >= 3) {
                index = index + 1;
                this.lebelPlayerInfo.text = Helper.StringFormat(TextsConfig.TextsConfig_Train.Attri[index] , value);
            } 
            if(index >= 3) {
                index = index + 1;
            }
            this.imageGM.source = cachekey(UIConfig.UIConfig_Hunter_Equip.collection[index - 1] , this);
        }
    }   

}


//子项数据源
export class HunterTransformDetailsItemItemData {
    index: number;
    info: any;
    father: HunterTransformDetailsItem;
}


}