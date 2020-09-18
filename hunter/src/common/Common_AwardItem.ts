namespace zj {
/**
 * @author hexiaowei
 * 
 * @date 2019-1-9
 */
export class Common_AwardItem extends eui.ItemRenderer {

    public groupMain: eui.Group;
    public imageFrame: eui.Image;
    public imageIcon: eui.Image;
    public labelNumNew: eui.BitmapLabel;
    public labelNum: eui.Label;

    public constructor() {
        super();
        this.skinName = "resource/skins/common/Common_AwardItemSkin.exml";
        cachekeys(<string[]>UIResource["Common_AwardItem"], null);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupContent1, this);
    }

    protected dataChanged() {
        let data: Common_AwardItemData = this.data;
        let info = PlayerItemSystem.Set(data.goodInfo.goodsId, 0, data.goodInfo.count);
        this.imageFrame.source = cachekey(info.Frame, this);
        this.imageIcon.source = cachekey(info.Clip, this);
        let itemInfo: any = info.Info;
        this.labelNum.text = itemInfo.name;
        if (data.typeIndex != 1) {
            this.labelNumNew.visible = false;
        } else {
            this.labelNumNew.visible = true;
            this.labelNumNew.text = data.goodInfo.count.toString();
        }
    }

    private onGroupContent1(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data.goodInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

}

//子项数据源
export class Common_AwardItemData {
    index: number;
    //数据源
    goodInfo: message.GoodsInfo;
    //父类 //
    father: any;
    typeIndex: number;
}
}