namespace zj {
// 神秘商店item HXH_PublicGiftItem
// lizhengqiang
// 20190420
export class PublicGiftItem extends eui.ItemRenderer {
    private imgFloor: eui.Image;
    private lbNameType: eui.Label;
    private lstBuyAward: eui.List;
    private groupBuy: eui.Group;
    private btnGiftBuy: eui.Button;
    private imgGestoneIcon: eui.Image;
    private lbGetNum: eui.BitmapLabel;
    private groupSale: eui.Group;
    private lbDiscount: eui.Label;
    private lbGetNum2: eui.Label;
    private imgShadow: eui.Image;
    private imgSoldOut: eui.Image;

    private index: number = null;
    private info = null;
    private father = null;
    private payTbl = null;
    private TOKEN = message.EResourceType.RESOURCE_TOKEN;

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/PublicGiftItemSkin.exml";
        cachekeys(<string[]>UIResource["PublicGiftItem"], null);
        this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftBuy, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.father = null;
        }, null);
    }

    protected dataChanged() {
        this.index = null;
        this.info = null;
        this.father = null;
        this.payTbl = null;

        this.setInfo();
    }

    private setInfo() {
        this.index = this.data.index;
        this.info = this.data.info;
        this.father = this.data.father;

        this.setInfoPayTbl();
        this.setInfoAward();
        this.setInfoItem();
    }

    private setInfoPayTbl() {
        if (this.info["buy_type"] == 1) {
            for (const v of this.father.allProducts) {
                if (v.cp_product_id == this.info["pay_index"]) {
                    this.payTbl = Table.DeepCopy(v);
                    break;
                }
            }
        }
    }

    private setInfoItem() {
        this.lbNameType.text = this.info["tribute_name"];

        // board
        let boardIndx = Number(this.info["reference"]) % UIConfig.UIConfig_Gift.secretMallBoard.length + 1;
        let boardPath = UIConfig.UIConfig_Gift.secretMallBoard[boardIndx - 1];
        this.imgFloor.source = cachekey(boardPath, this);

        // buy
        this.btnGiftBuy.enabled = (this.info["bBought"] == 0);
        this.imgShadow.visible = (this.info["bBought"] == 1);
        this.imgSoldOut.visible = (this.info["bBought"] == 1);

        // price
        if (this.info["buy_type"] == 1 && this.payTbl != null) {
            let strUnit = Set.CashUnit(this.payTbl["currency"]);
            let strMoney = this.payTbl["amount"];
            let prePrice = Math.floor(Number(this.payTbl["amount"]) * (Number(this.info["discount"]) / 100 + 1)).toString();
            this.lbGetNum.text = strMoney;
            this.lbGetNum2.text = prePrice;

            this.imgGestoneIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[1 - 1], this);
        } else {
            let prePrice = Math.floor(Number(this.info["pay_index"]) * (Number(this.info["discount"]) / 100 + 1)).toString();
            this.lbGetNum.text = this.info["pay_index"];
            this.lbGetNum2.text = prePrice;
            this.imgGestoneIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[2 - 1], this);
        }

        this.groupSale.visible = (Number(this.info["discount"]) > 0);

        this.lbDiscount.text = "-" + this.info["discount"] + "%";
    }

    private setInfoAward() {
        let arrCollection = new eui.ArrayCollection();
        for (const v of this.info["goodses"]) {
            arrCollection.addItem(v);
        }
        this.lstBuyAward.dataProvider = arrCollection;
        this.lstBuyAward.itemRenderer = GiftCommonAwardItem;
    }

    private onBtnGiftBuy() {
        this.btnGiftBuy.enabled = false;
        this.father.reqActivity(this.index);
    }

}
}