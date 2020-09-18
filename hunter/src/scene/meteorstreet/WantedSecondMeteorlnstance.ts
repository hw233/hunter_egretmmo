namespace zj {
//WantedSecondChooseItem
//hexiaowei
// 2019/02/14
export class WantedSecondMeteorlnstance extends eui.ItemRenderer {

    private imgFrame: eui.Image;
    private imgIcon: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/meteorstreet/WantedSecondMeteorlnstanceSkin.exml";
        cachekeys(<string[]>UIResource["WantedSecondMeteorlnstance"], null);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            (this.data as WantedSecondMeteorlnstanceData).father.onItemTap(true, this.data);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            (this.data as WantedSecondMeteorlnstanceData).father.onItemTap(false, this.data);
        }, this);
    }

    protected dataChanged() {
        let head_path = PlayerHunterSystem.Head(this.data.index);
        this.imgIcon.source = cachekey(head_path , this) ;
    }

}

//子项数据源
export class WantedSecondMeteorlnstanceData {
    index : number;
    father : WantedSecondMeteorstanceScene;
    id : number;
}



}