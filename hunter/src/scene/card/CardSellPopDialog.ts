namespace zj {
// created by hhh in 2018/11/14

/************** 卡片出售dialog ****************/

export class CardSellPopDialog extends Dialog {
    private btnClose: eui.Button;
    private btnSellWholeStar1: eui.Button;
    private btnSellWholeStar2: eui.Button;
    private btnSellWholeStar3: eui.Button;
    private btnSellWholeStar4: eui.Button;
    private btnBulkSell: eui.Button;

    private groupCheck1: eui.Group;
    private groupCheck2: eui.Group;
    private groupCheck3: eui.Group;
    private groupCheck4: eui.Group;

    private labelSellConst: eui.Label;
    private labelConstSell1: eui.Label;
    private labelConstSell2: eui.Label;
    private labelConstSell3: eui.Label;
    private labelConstSell4: eui.Label;
    private labelConstStar1: eui.Label;
    private labelConstStar2: eui.Label;
    private labelConstStar3: eui.Label;
    private labelConstStar4: eui.Label;
    private labelGetGold: eui.Label;

    private father: CardInfo;

    private selList: Array<boolean> = [
        false,
        false,
        false,
        false
    ];

    private groupCheckArr: Array<eui.Group> = [];

    private list = [];
    private totalMoney: number = 0;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardSellPopDialogSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);

        this.init();
    }

    private init() {
        this.labelSellConst.text = LANG("出售获得：");
        this.labelConstSell1.text = LANG("出售全部");
        this.labelConstSell2.text = LANG("出售全部");
        this.labelConstSell3.text = LANG("出售全部");
        this.labelConstSell4.text = LANG("出售全部");
        this.labelConstStar1.text = LANG("1星卡片");
        this.labelConstStar2.text = LANG("2星卡片");
        this.labelConstStar3.text = LANG("3星卡片");
        this.labelConstStar4.text = LANG("4星卡片");

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnSellWholeStar1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelWholeStar1, this);
        this.btnSellWholeStar2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelWholeStar2, this);
        this.btnSellWholeStar3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelWholeStar3, this);
        this.btnSellWholeStar4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelWholeStar4, this);
        this.btnBulkSell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBulkSell, this);

        this.groupCheckArr = [
            this.groupCheck1,
            this.groupCheck2,
            this.groupCheck3,
            this.groupCheck4
        ];
    }

    public loadSellPop(father: CardInfo) {
        this.father = father;

        this.freshUI();
    }

    private freshUI() {
        for (let i = 0; i < 4; i++) {
            this.groupCheckArr[i].visible = this.selList[i];
        }

        this.list = [];

        let value = PlayerCardSystem.GetAllSellCardIndexByStar(this.selList);
        for (let i = 0; i < value.length; i++) {
            if (i == value.length - 1) {
                this.totalMoney = value[i];
                break;
            }
            this.list[i] = value[i];
        }

        this.labelGetGold.text = this.totalMoney + "";
    }

    private onBtnSelWholeStar1() {
        this.selList[0] = !this.selList[0];
        this.freshUI();
    }

    private onBtnSelWholeStar2() {
        this.selList[1] = !this.selList[1];
        this.freshUI();
    }

    private onBtnSelWholeStar3() {
        this.selList[2] = !this.selList[2];
        this.freshUI();
    }

    private onBtnSelWholeStar4() {
        this.selList[3] = !this.selList[3];
        this.freshUI();
    }

    private onBtnBulkSell() {
        if (this.list.length == 0) {
            toast(TextsConfig.TextsConfig_Hunter_Card.nothing_sell);
        }
        else {
            Game.PlayerCardSystem.cardSell(this.list)
                .then((value: {}) => {
                    this.father.refreshCardList();
                    this.close(UI.HIDE_TO_TOP);
                })
                .catch((reason) => {
                })
        }
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}

}