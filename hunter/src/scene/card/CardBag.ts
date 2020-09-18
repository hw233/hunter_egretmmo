namespace zj {
// created by hhh in 2018/11/8

/************** 卡包界面 ****************/

export class CardBag extends CardBase {
    private containerGroup: eui.Group;
    private groupCard: eui.Group;
    private groupNoCard: eui.Group;
    private groupContent: eui.Group;
    private groupBgSpine: eui.Group;
    private groupSpine: eui.Group;
    private groupCardUI: eui.Group;

    private imageOpenCardBag: eui.Image;
    private imageCardBig: eui.Image;

    private btnOpenCard: eui.Button;

    private listCardBag: eui.List;

    private labelCardName: eui.Label;
    private labelOpenTip: eui.Label;

    private curSel: number = 0;
    private lastSel: number = 0;

    private cardBagGoods: Array<message.GoodsInfo> = new Array<message.GoodsInfo>();
    private listDataArr: eui.ArrayCollection = new eui.ArrayCollection();

    private isFirstOpen: boolean = true;
    private isAniEnd = false;
    private callBack: Function;

    private _teachIndex: number;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardBagSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.groupContent); // 因为是循环播放，需要特别处理
        }, null);

        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        this.init();
    }

    private init() {
        this.btnOpenCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOpenCard, this);

        this.listCardBag.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardSelChange, this);

        this.groupCard.visible = false;
        this.imageOpenCardBag.visible = false;

        this.setUI();
        this.aniPlay();
    }

    private aniPlay() {
        egret.Tween.get(this.groupContent, { loop: true })
            .to({ y: 7 }, 700, egret.Ease.sineOut)
            .to({ y: 0 }, 700, egret.Ease.sineIn);

        let squareMask: egret.Shape = new egret.Shape();
        squareMask.graphics.beginFill(0xff0000);
        squareMask.graphics.drawRect(this.groupBgSpine.x, this.groupBgSpine.y, this.groupBgSpine.width, this.groupBgSpine.height - 4);
        squareMask.graphics.endFill();

        Game.DragonBonesManager.playAnimation(this, "cardpart", "armatureName", null, 0)
            .then(display => {
                display.x = 0;
                display.y = this.groupBgSpine.height;
                this.containerGroup.addChild(squareMask);
                display.mask = squareMask;
                this.groupBgSpine.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    public setUI() {
        this.cardBagGoods = PlayerCardSystem.GetAllCardBag();

        let [_, key] = Table.FindR(this.cardBagGoods, function (_k, _v) {
            return _v.goodsId == 139001;
        });
        this._teachIndex = key == null ? 1 : key;

        this.setLeftList();
    }

    private setLeftList() {
        if (this.cardBagGoods.length != 0) {
            this.groupCard.visible = true;
            this.groupNoCard.visible = false;

            if (this.curSel >= this.cardBagGoods.length)
                this.curSel = this.cardBagGoods.length - 1 >= 0 ? this.cardBagGoods.length - 1 : -1;

            this.listCardBag.itemRenderer = CardBagItem;

            let cardBagArr = [];
            for (let i = 0; i < this.cardBagGoods.length + 1; i++) {
                if (i == this.cardBagGoods.length) {
                    cardBagArr[i] = null;
                    break;
                }
                cardBagArr[i] = { index: i, info: this.cardBagGoods[i], ani: i == this.curSel };
            }
            this.listDataArr.source = cardBagArr;
            this.listCardBag.dataProvider = this.listDataArr;
            this.listCardBag.selectedIndex = this.curSel;
            this.lastSel = this.curSel;

            if (this.isFirstOpen) {
                this.showCardUI(this.curSel);
                this.isFirstOpen = false;
            }
            else {
                this.showCardAni(this.curSel);
            }
        }
        else {
            this.listCardBag.itemRenderer = CardBagItem;
            this.listCardBag.dataProvider = new eui.ArrayCollection([null]);

            this.groupCard.visible = false;
            this.groupNoCard.visible = true;
        }

        if (this.cardBagGoods.length != 0 && this.cardBagGoods != null) {
            let aa = this.cardBagGoods[this.curSel].goodsId;
            let index = this.getCardIndex(aa);
            this.scrollList(index);
        }
        else {
            return;
        }

    }

    private getCardIndex(id: number) {
        let index: number = -1;
        if (id == null || id == undefined || id == 0) {
            return index;
        }

        for (let i = 0; i < this.cardBagGoods.length; i++) {
            let data = this.cardBagGoods[i];
            if (data.goodsId != null && data.goodsId == id) {
                index = i;
            }
        }
        return index;
    }

    private scrollList(selectedIndex: number) {
        if (selectedIndex < 0) {
            selectedIndex = 0;
        }
        if (selectedIndex > 4) {
            let item = new CardBagItem();
            let gap = 6;
            let scrollWidth = (item.height + gap) * selectedIndex;

            egret.Tween.get(this.listCardBag)
                .to({ scrollV: scrollWidth }, 350, egret.Ease.backIn);
        }
    }

    private showCardUI(index: number) {
        this.groupCardUI.alpha = 0;

        this.imageCardBig.alpha = 0;
        this.showCardAni(index);
    }

    private showCardAni(index: number) {
        this.isAniEnd = false;

        egret.Tween.get(this.groupCardUI).to({ alpha: 1 }, 200);
        this.btnOpenCard.enabled = true;

        let beginX = this.imageCardBig.x;
        egret.Tween.get(this.imageCardBig)
            .to({ alpha: 0, x: beginX + 200 }, 500, egret.Ease.backIn)
            .to({ x: beginX - 200 })
            .call(() => { this.setBigCard(index); })
            .to({ alpha: 1, x: beginX }, 400, egret.Ease.backOut)
            .call(() => { this.isAniEnd = true; })
    }

    private setBigCard(index: number) {
        let itemId = this.cardBagGoods[index].goodsId;
        let itemInfo: TableItemCimelia = <TableItemCimelia>PlayerItemSystem.ItemConfig(itemId);
        this.imageCardBig.source = cachekey(itemInfo.path_big, this);
        this.labelCardName.text = itemInfo.name;
        this.labelOpenTip.text = itemInfo.des;
    }

    private onCardSelChange() {
        if (this.isAniEnd == false)
            return;

        if (this.listCardBag.selectedIndex == this.cardBagGoods.length) {
            this.listCardBag.selectedIndex = this.curSel;
            return;
        }

        if (this.curSel == this.listCardBag.selectedIndex)
            return;

        this.curSel = this.listCardBag.selectedIndex;

        this.listDataArr.replaceItemAt({ index: this.lastSel, info: this.cardBagGoods[this.lastSel], ani: false }, this.lastSel);
        this.listDataArr.replaceItemAt({ index: this.curSel, info: this.cardBagGoods[this.curSel], ani: true }, this.curSel);

        this.lastSel = this.curSel;

        this.showCardAni(this.curSel);
    }

    private onBtnOpenCard() {
        if (this.isAniEnd == false)
            return;
        Game.PlayerInfoSystem.playAnnouce = false;
        Game.PlayerCardSystem.cardBagOpen(this.cardBagGoods[this.curSel].goodsId)
            .then((value) => {
                this.playBreakBag(value);
                if (this.callBack) {
                    this.callBack();
                }
            })
            .catch((reason) => {
                Game.PlayerInfoSystem.playAnnouce = true;
            })
    }

    public cb(cb: Function) {
        this.callBack = cb;
    }

    private playBreakBag(cardInfos) {
        egret.Tween.get(this.groupCardUI).to({ alpha: 0 }, 200);
        this.btnOpenCard.enabled = false;

        Game.DragonBonesManager.playAnimation(this, "cardopen", "armatureName", null, 1)
            .then(display => {
                display.x = 0;
                display.y = this.groupBgSpine.height;
                this.groupBgSpine.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });

        Game.DragonBonesManager.playAnimation(this, "cardopen2", "armatureName", null, 1)
            .then(display => {
                display.x = 0;
                display.y = this.groupSpine.height;
                this.groupSpine.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });

        egret.Tween.get(this.imageCardBig)
            .to({ alpha: 0 }, 800)
            .wait(500)
            .call(() => {
                loadUI(CardBagPopDialog)
                    .then((dialog: CardBagPopDialog) => {
                        dialog.playAni(cardInfos, this);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            })
    }

    private itemList: Array<CardBagItem> = [];

    private getItemList() {
        this.itemList = [];
        for (let i = 0; i < this.cardBagGoods.length + 1; i++) {
            let item = this.listCardBag.getElementAt(i) as CardBagItem;
            this.itemList.push(item);
        }
    }
}

}