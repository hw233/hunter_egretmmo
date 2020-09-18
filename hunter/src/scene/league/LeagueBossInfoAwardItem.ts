namespace zj {
//LeagueBossInfoAwardItem
//yuqingchao
//2019.03.06
export class LeagueBossInfoAwardItem extends eui.ItemRenderer {
    private imgBoard: eui.Image;
    private imgIcon: eui.Image;
    private groupAdd: eui.Group;
    private i: number = 0;
    private goodsId: number = 0;
    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueBossInfoAwardItemSkin.exml";
        cachekeys(<string[]>UIResource["LeagueBossInfoAwardItem"], null);
        this.groupAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
    }

    protected dataChanged() {
        this.goodsId = this.data.goodsId;
        this.i = this.data.i;
        this.imgBoard.source = cachekey(PlayerItemSystem.ItemFrame(this.goodsId), this);
        this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.goodsId), this);
    }

    private onShowGoodProperty(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

}

}