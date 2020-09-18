namespace zj {
// wang shen zhuo
// HXH_MoraMainAwardItemItem
// 2019.05.24
export class MoraMainAwardItemItem extends eui.ItemRenderer {

    public groupMain: eui.Group;
    public imageBoard: eui.Image;
    public imageIcon: eui.Image;
    public labelTextNum: eui.BitmapLabel;


    private imgMask: eui.Image;
    private rectMask: eui.Rect;
    private rectMaskCommon: eui.Rect;

    public constructor() {
        super();
        this.skinName = "resource/skins/fishing/MoraMainAwardItemItemSkin.exml";
        cachekeys(<string[]>UIResource["MoraMainAwardItemItem"], null);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.imgMask.scaleX = 0.5;
        this.imgMask.scaleY = 0.5;
        this.groupMain.addChild(this.imgMask);
        this.imgMask.visible = false;

        // 普通物品遮罩
        this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
        this.rectMaskCommon.horizontalCenter = 0;
        this.rectMaskCommon.verticalCenter = -2;
        this.rectMaskCommon.scaleX = 0.5;
        this.rectMaskCommon.scaleY = 0.5;
        this.groupMain.addChild(this.rectMaskCommon);
        this.rectMaskCommon.visible = false;
    }

    protected dataChanged() {
        closeCache(this.groupMain);
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false

        let itemSet = PlayerItemSystem.Set(this.data.good.goodsId, this.data.good.showType, this.data.good.count);
        this.imageBoard.source = cachekey(itemSet.Frame , this) ;
        this.imageIcon.source = cachekey(itemSet.Clip , this) ;
        this.labelTextNum.text = this.data.good.count;

        if (this.isImgMask(this.data.good.goodsId)) {
            this.imgMask.visible = true;
            this.imageIcon.mask = this.imgMask;
        } else {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imageIcon.mask = this.rectMaskCommon;
        }
        setCache(this.groupMain);
    }

    // 物品遮罩
    private isImgMask(goodsId: number): boolean {
        if (PlayerItemSystem.ItemType(goodsId) == 4
            || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
            || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
            || Math.floor(goodsId / 1000) == 37
            || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
            return true;
        }
        return false;
    }

    private onShowGoodProperty(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

}

export class MoraMainAwardItemItemData {
    father: any;
    good: any;
    index: number;
}
}