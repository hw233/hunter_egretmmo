namespace zj {
// 礼包Item HXH_GiftCommonAwardItem
// hexiaowei
// 2018-12-07
export class GiftCommonAwardItem extends eui.ItemRenderer {
    private imageFrame: eui.Image; // 物品框
    private imageIcon: eui.Image // 物品
    private labelTextNum: eui.BitmapLabel // 物品数量
    private groupAni: eui.Group;
    private groupMain: eui.Group;

    private imgMask: eui.Image;
    private rectMask: eui.Image;
    private rectMaskCommon: eui.Image;

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/GiftCommonAwardItemSkin.exml";
        cachekeys(<string[]>UIResource["GiftCommonAwardItem"], null);
        this.imageIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);

        // 碎片遮罩
        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.scaleX = 0.6;
        this.imgMask.scaleY = 0.6;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.groupMain.addChild(this.imgMask);
        this.imgMask.visible = false;

        //普通物品遮罩
        this.rectMaskCommon = Util.getMaskImgBlack(50, 50.4);
        this.rectMaskCommon.horizontalCenter = 0;
        this.rectMaskCommon.verticalCenter = -2;
        this.groupMain.addChild(this.rectMaskCommon);
        this.rectMaskCommon.visible = false;
    }

    protected dataChanged() {
        this.imgMask.visible = false;
        this.rectMaskCommon.visible = false;
        let good: message.GoodsInfo = <message.GoodsInfo>this.data;
        this.imageIcon.source = cachekey(PlayerItemSystem.ItemPath(good.goodsId), this);
        this.imageFrame.source = cachekey(PlayerItemSystem.Set(good.goodsId, null, good.count).Frame, this);
        this.labelTextNum.text = good.count >= 100000 ? (good.count / 10000).toString() + "万" : good.count.toString();

        this.groupAni.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(display => {
            this.groupAni.addChild(display);
        }).catch(reason => {
            toast(reason);
        });

        if (this.isImgMask(good.goodsId)) {
            this.imgMask.visible = true;
            this.imageIcon.mask = this.imgMask;
        } else {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = true;
            this.imageIcon.mask = this.rectMaskCommon;
        }
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
}