namespace zj {
// created by hhh in 2018/11/16

/************** 图鉴item ****************/

export class CardPokedexItemCard extends eui.ItemRenderer {
    private groupPokedexCard: eui.Group;
    private groupLock: eui.Group;
    private groupStar: eui.Group;

    private labelNum: eui.Label;
    private labelName: eui.Label;

    private imageCardBoard: eui.Image;
    private imageCardPic: eui.Image;

    private info: TableItemPotato;

    private isTouch: boolean = false;
    private touchX: number = 0;
    private touchY: number = 0;

    private timeOut: number;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardPokedexItemCardSkin.exml";

        cachekeys(<string[]>UIResource["CardPokedexItemCard"], null);

        this.init();
    }

    private init() {
        this.groupPokedexCard.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchGroupPokedexCardBegin, this);
        this.groupPokedexCard.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchGroupPokedexCardMove, this);
        this.groupPokedexCard.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchGroupPokedexCardEnd, this);
    }

    protected dataChanged() {
        this.info = this.data;

        let [_, __, outFrame] = PlayerCardSystem.GetItemFrame(this.info.id);

        let find = false;
        let potatoHistoryIds = Game.PlayerCardSystem.getAllPotatoHistoryIds();
        for (let k in potatoHistoryIds) {
            if (potatoHistoryIds[k] == this.info.id) {
                find = true;
                break;
            }
        }

        this.groupLock.visible = !find;

        this.labelNum.text = this.info.num;
        this.labelName.text = this.info.name;

        this.imageCardPic.source = cachekey(this.info.paths, this);
        this.imageCardBoard.source = cachekey(outFrame, this);

        Helper.SetStar(this.groupStar, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 15);
    }

    private onTouchGroupPokedexCardBegin(e: egret.TouchEvent) {
        this.touchX = e.stageX;
        this.touchY = e.stageY;

        this.timeOut = egret.setTimeout(() => { TipManager.ShowCardNotGet(this.info); }, this, 1000);
    }

    private onTouchGroupPokedexCardMove(e: egret.TouchEvent) {
        if (Math.abs(e.stageX - this.touchX) <= 3 && Math.abs(e.stageY - this.touchY) <= 3)
            return;

        egret.clearTimeout(this.timeOut);
    }

    private onTouchGroupPokedexCardEnd() {
        egret.clearTimeout(this.timeOut);
    }
}
}