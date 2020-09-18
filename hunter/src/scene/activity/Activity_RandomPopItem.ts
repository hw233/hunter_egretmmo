namespace zj {
// wang shen zhuo
// 娃娃机---抽取成功--item
// 2019 04 12
export class Activity_RandomPopItem extends eui.ItemRenderer {

    public imageFrame:eui.Image;
    public imageIcon:eui.Image;
    public labelTextNum:eui.BitmapLabel;
    public groupMain:eui.Group;

    private imgMask: eui.Image;
    private rectMask: eui.Image;
    private rectMaskCommon: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/Activity_RandomPopItemSkin.exml";
        cachekeys(<string[]>UIResource["Activity_RandomPopItem"], null);
         // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupMain.addChild(this.imgMask);
        this.imgMask.visible = false;

        //普通物品遮罩
        this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
        this.rectMaskCommon.horizontalCenter = 0;
        this.rectMaskCommon.verticalCenter = -2;
        this.groupMain.addChild(this.rectMaskCommon);
        this.rectMaskCommon.visible = false;
    }

    public SetInfo(index, goods, father) {
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false;
        if(PlayerItemSystem.ItemType(goods.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
            this.SetInfoHero(goods);
        }else{
            this.SetInfoItem(goods);
        }
         if (this.isImgMask(goods.goodsId)) {
            this.imgMask.visible = true;
            this.imageIcon.mask = this.imgMask;
        } else {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imageIcon.mask = this.rectMaskCommon;
        }
    }

    private SetInfoHero(goods) {
        
        let itemSet = PlayerItemSystem.Set(goods.goodsId , 1 , goods.count);
        this.imageIcon.source = cachekey(itemSet.Clip , this) ;
        this.imageFrame.source = cachekey(itemSet.Frame , this) ;
        this.labelTextNum.text = "x" + goods.count;
    }

    private SetInfoItem(goods) {
        let itemSet = PlayerItemSystem.Set(goods.goodsId , 1 , goods.count);
        this.imageIcon.source = cachekey(itemSet.Clip , this) ;
        this.imageFrame.source = cachekey(itemSet.Frame , this) ;
        this.labelTextNum.text = "x" + goods.count;
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
}

}