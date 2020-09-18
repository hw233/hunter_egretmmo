namespace zj {
/**
 * 掉落奖励Item
 * wangshenzhuo
 * 2019-7-24
 */
export class StoryInstanceAdventureItemItem extends eui.ItemRenderer {

    public groupAll: eui.Group;
    public groupLight: eui.Group;
    public groupIcon: eui.Group;
    public imgFrame: eui.Image;
    public imgIcon: eui.Image;
    public imgPiece: eui.Image;
    public imgMask: eui.Image;
    public labelTextNum: eui.BitmapLabel;
    public groupAnimate: eui.Group;
    public rect: eui.Rect;
    public groupLP: eui.Group;

    private imageMask: eui.Image;
    private goodsId: number;
    private goodsCount: number;
    private father: StoryInstanceAdventureItem;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/StoryInstanceAdventureItemItemSkin.exml";
        cachekeys(<string[]>UIResource["StoryInstanceAdventureItemItem"], null);
        this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
        this.imgMask.visible = false;

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.father = null;
        }, null);

        // 碎片遮罩
        this.imageMask = new eui.Image;
        this.imageMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
        this.imageMask.horizontalCenter = 0;
        this.imageMask.verticalCenter = 0;
        this.imageMask.width = this.imgIcon.width;
        this.imageMask.height = this.imgIcon.height;
        this.imgMask.visible = false;
    }

    protected dataChanged() {
        this.father = this.data.father;
        this.setInfoProp(this.data.itemId, this.data.itemCount);
    }


    // 显示道具数量的
    private setInfoProp(itemId: number, itemCount?: number) {
        let itemSet = PlayerItemSystem.Set(itemId) as any;
        this.goodsId = itemId;
        this.goodsCount = itemCount;

        this.imgFrame.source = cachekey(itemSet.Frame, this);
        this.groupLight.removeChildren();
        this.imgPiece.source = cachekey(itemSet.Logo, this);
        this.imgIcon.source = cachekey(itemSet.Path, this);

        this.chooseMask(this.goodsId);

        this.labelTextNum.visible = (itemCount != null);

        if (itemCount != null) {
            this.labelTextNum.text = itemCount.toString();
        }
    }

    private onShowGoodProperty(e: egret.TouchEvent) {
        let goodsinfo = new message.GoodsInfo();
        goodsinfo.goodsId = this.goodsId;
        goodsinfo.count = this.goodsCount;
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsinfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY  , isshow: false });
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

    // 徽章遮罩
    private isRectMask(goodsId: number): boolean {
        if (TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
            return true;
        }
        return false;
    }

    private chooseMask(goodsId: number) {
        this.groupAnimate.removeChildren();
        if (this.isImgMask(goodsId)) {
            this.imgMask.visible = true;
            this.imgIcon.mask = this.imageMask;
            this.groupAnimate.addChild(this.imageMask);
        } else if (this.isRectMask(goodsId)) {
            this.rect.visible = true;
            this.imgMask.visible = false;
            this.imgIcon.mask = this.rect;
            this.groupAnimate.addChild(this.rect);
        }
    }
}

export class StoryInstanceAdventureItemItemData {
    itemId: number;
    itemCount: number;
    father;
}
}