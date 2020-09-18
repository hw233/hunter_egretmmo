namespace zj {
// created by hhh in 2018/11/6

/************** card主界面 ****************/

export class CardMainScene extends Scene {
    private btnClose: eui.Button;
    private btnCard: eui.Button;
    private btnCardBag: eui.Button;
    private btnCardCompose: eui.Button;
    private btnCardPokedex: eui.Button;
    private btnCardSp: eui.Button;
    private btnCardBagSp: eui.Button;
    private btnCardComposeSp: eui.Button;
    private btnCardPokedexSp: eui.Button;
    private groupCenter: eui.Group;
    private labelGold: eui.Label;
    private btnAddGold: eui.Button;

    private imageCardBagTips: eui.Image;
    private imageCardComposeTips: eui.Image;

    private addUIs = [null, null, null, null];

    private rightButtons: Array<eui.Button> = [];
    private rightButtonSps: Array<eui.Button> = [];

    private curUI: number = 0;
    private lastUI: number = 1;
    private callback: Function;
    private update: number;
    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardMainSceneSkin.exml";

        this.init();
    }

    private init() {
        this.rightButtons = [
            this.btnCard,
            this.btnCardBag,
            this.btnCardCompose,
            this.btnCardPokedex
        ];
        this.rightButtonSps = [
            this.btnCardSp,
            this.btnCardBagSp,
            this.btnCardComposeSp,
            this.btnCardPokedexSp
        ];

        this.btnCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCard, this);
        this.btnCardBag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardBag, this);
        this.btnCardCompose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardPokedex, this);
        this.btnCardPokedex.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCardCompose, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
        this.update = egret.setInterval(this.Update, this, 1000);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.clearInterval(this.update);
        }, this);
        this.Update();
        this.initUI();
        this.setTips();
        this.refreshGold();
    }

    private Update() {
        this.setTips();
        this.refreshGold();
    }

    public refreshGold() {
        if (Game.PlayerInfoSystem.Coin > 100000) {
            this.labelGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
        } else {
            this.labelGold.text = Game.PlayerInfoSystem.Coin.toString();
        }
    }

    private initUI() {
        this.selectUI(1);
    }

    private selectUI(index: number) {
        this.curUI = index;

        let curIndex = index - 1;
        this.setRightButtons(curIndex);

        if (this.addUIs[curIndex] == null) {
            this.addSubCardUI(curIndex);
        }
        else {
            this.setSubCardUISelected(curIndex);
        }

        this.lastUI = this.curUI;
    }

    private addSubCardUI(type: number) {
        if (type == 0) {
            loadUI(CardInfo)
                .then((cardInfo: CardInfo) => {
                    cardInfo.verticalCenter = 0;
                    this.groupCenter.addChild(cardInfo);
                    cardInfo.name = "cardInfo";
                    cardInfo.alpha = 0;
                    this.addUIs[type] = cardInfo;
                    this.setSubCardUISelected(type);
                });
        }
        else if (type == 1) {
            loadUI(CardBag)
                .then((cardBag: CardBag) => {
                    cardBag.verticalCenter = 0;
                    this.groupCenter.addChild(cardBag);
                    cardBag.name = "cardBag";
                    cardBag.alpha = 0;
                    cardBag.cb(this.callback);
                    this.addUIs[type] = cardBag;
                    this.setSubCardUISelected(type);
                });
        }
        else if (type == 2) {
            loadUI(CardCompose)
                .then((cardCompose: CardCompose) => {
                    cardCompose.verticalCenter = 0;
                    this.groupCenter.addChild(cardCompose);
                    cardCompose.name = "cardCompose";
                    cardCompose.alpha = 0;
                    this.addUIs[type] = cardCompose;
                    this.setSubCardUISelected(type);
                });
        }
        else if (type == 3) {
            loadUI(CardPokedex)
                .then((cardPokedex: CardPokedex) => {
                    cardPokedex.verticalCenter = 0;
                    this.groupCenter.addChild(cardPokedex);
                    cardPokedex.name = "cardPokedex";
                    cardPokedex.alpha = 0;
                    this.addUIs[type] = cardPokedex;
                    this.setSubCardUISelected(type);
                });
        }
    }

    private setSubCardUISelected(index: number) {
        for (let i = 0; i < this.addUIs.length; i++) {
            if (this.addUIs[i] != null) {
                this.addUIs[i].setSelect(i == index);
            }
        }
    }

    private setRightButtons(index: number) {
        for (let i = 0; i < this.rightButtons.length; i++) {
            this.rightButtons[i].enabled = (this.curUI != i + 1);
        }

        for (let j = 0; j < this.rightButtonSps.length; j++) {
            if (this.curUI == j + 1) {
                let initX = this.rightButtonSps[j].x;

                egret.Tween.get(this.rightButtonSps[j])
                    .call(() => { this.rightButtonSps[j].visible = true; })
                    .to({ x: initX + 50 }, 0)
                    .to({ x: initX + 5 }, 200, egret.Ease.backInOut);
            }
            else if (this.lastUI != null && this.lastUI == j + 1) {
                let initX = this.rightButtonSps[j].x;

                egret.Tween.get(this.rightButtonSps[j])
                    .to({ x: initX + 45 }, 200, egret.Ease.backInOut)
                    .call(() => { this.rightButtonSps[j].visible = false; })
                    .to({ x: initX - 5 }, 0)
            }
        }
    }

    private onBtnCard() {
        this.selectUI(1);
    }

    /**
     * 打开卡包
     * 
     * @param cb 回调函数， 获得卡片之后，执行回调函数
     */
    public onBtnCardBag(cb?: Function) {
        this.callback = cb;

        this.selectUI(2);
    }

    private onBtnCardPokedex() {
        this.selectUI(3);
    }

    private onBtnCardCompose() {
        this.selectUI(4);
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }

    private onBtnAddGold() {
        //toast("加金币功能未开启");
        loadUI(HelpGoldDialog)
            .then((dialog: HelpGoldDialog) => {
                dialog.SetInfoList();
                // dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Money.moneys));
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private setTips() {
        this.imageCardBagTips.visible = Tips.GetTipsOfId(Tips.TAG.POTATO, 1);
        this.imageCardComposeTips.visible = Tips.GetTipsOfId(Tips.TAG.POTATO, 3);
    }

    /**
     * 卡片模块(外部调用)
     * @param type 类型 0卡片 1卡包 2碎片 3图鉴
     */
    public addUI(type: number) {
        this.addSubCardUI(type);
    }
}

}