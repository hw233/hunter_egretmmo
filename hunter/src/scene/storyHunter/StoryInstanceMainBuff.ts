namespace zj {
// HXH_StoryInstanceMainBuff
// wangshenzhuo
// 2019-07-18
export class StoryInstanceMainBuff extends eui.ItemRenderer {

    public imageBuff: eui.Image;
    public labelBuffNum: eui.Label;


    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/StoryInstanceMainBuffSkin.exml";
        cachekeys(<string[]>UIResource["StoryInstanceMainBuff"], null);
    }

    protected dataChanged() {
        this.imageBuff.source = cachekey(PlayerItemSystem.ItemPath(this.data.goodsId) , this);
        this.labelBuffNum.text = "+" + this.data.per + "%";
    }
}


//子项数据源
export class StoryInstanceMainBuffData {
    //数据源
    goodsId: any;
    id: number;
    per;
    father: StoryInstanceMainScene;


}


}