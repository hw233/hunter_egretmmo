namespace zj {
// 背包-物品使用-礼盒
// lizhengqiang
// 2018/11/27

export class PackageMainPop extends Dialog {
    public groupPop: eui.Group;
    public group1: eui.Group;
    private lbOwn: eui.Label;
    private lbSelect: eui.Label;
    private lbCount: eui.Label;
    private btnClose: eui.Button;
    private btnMin: eui.Button;
    private btnMinus: eui.Button;
    private btnAdd: eui.Button;
    private btnMax: eui.Button;
    private btnUse: eui.Button;
    private lstPop: eui.List;

    private father: PackageMainScene;
    private itemId: number;
    private config: Object;
    private index: number = 0;
    private max: number = 0;
    private count: number = 1;
    private arrayCollection: eui.ArrayCollection;
    private goodsList: { "goodsId": number, "count": number, "showType": number, "index": number }[] = [];
    private isUpdate: boolean = false;

    public constructor() {
        super();
        this.skinName = "resource/skins/package/PackageMainPopSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

        this.lstPop.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstSelectedItem, this);

        this.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMin, this);
        this.btnMinus.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMinus, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);
        this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMax, this);
        this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUse, this);

        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            this.father = null;
        }, null);
    }

    public init(father: PackageMainScene) {
        this.father = father;
        this.lstPop.selectedIndex = 0;
        this.itemId = this.father.itemId;
        this.config = PlayerItemSystem.ItemConfig(this.itemId);
        this.max = Game.PlayerItemSystem.itemCount(this.itemId);
        let str = Helper.StringFormat(TextsConfig.TextsConfig_Pakage.use, this.config["name"], this.max).replace(/[ \r\n\t\v]/g, "");
        this.lbOwn.textFlow = Util.RichText(str);

        this.setInfoList();
        this.setInfoTip();
    }

    private update = () => {
        this.isUpdate = true;
        this.max = Game.PlayerItemSystem.itemCount(this.itemId);
        if (this.max == 0) this.onBtnClose();
        let str = Helper.StringFormat(TextsConfig.TextsConfig_Pakage.use, this.config["name"], this.max).replace(/[ \r\n\t\v]/g, "");
        this.lbOwn.textFlow = Util.RichText(str);
        this.count = 1;
        this.lbCount.text = this.count.toString();
    }

    private setInfoList() {
        for (let i = 0; i < TableItemTransfer.Item(this.itemId).items_id.length; i++) {
            this.goodsList.push({
                goodsId: TableItemTransfer.Item(this.itemId).items_id[i],
                count: TableItemTransfer.Item(this.itemId).items_count[i],
                showType: TableItemTransfer.Item(this.itemId).show_type,
                index: i
            });
        }
        this.arrayCollection = new eui.ArrayCollection(this.goodsList);
        this.lstPop.dataProvider = this.arrayCollection;
        this.lstPop.itemRenderer = PackageMainPopItemIR;
        this.index = this.lstPop.selectedIndex;
    }

    private setInfoTip() {
        let type = PlayerItemSystem.Type2(this.goodsList[this.index].goodsId);
        if (type == message.EGoodsType.GOODS_TYPE_FASHION || type == message.EGoodsType.GOODS_TYPE_GENERAL || type == message.EGoodsType.GOODS_TYPE_POTATO) {
            this.group1.visible = false;
            this.lbSelect.visible = true;
            let config = PlayerItemSystem.ItemConfig(this.goodsList[this.index].goodsId);
            let str = Helper.StringFormat(TextsConfig.TextsConfig_Pakage.selects, config["name"], this.goodsList[this.lstPop.selectedIndex]["count"]).replace(/[ \r\n\t\v]/g, "");
            this.lbSelect.textFlow = Util.RichText(str);
        }
        else {
            this.group1.visible = true;
            this.lbSelect.visible = false;
            this.lbCount.text = this.count.toString();
        }
    }

    private onLstSelectedItem(e: eui.PropertyEvent) {
        if (this.index == this.lstPop.selectedIndex) return;
        this.arrayCollection.itemUpdated(this.arrayCollection.source[this.index]);
        this.arrayCollection.itemUpdated(this.arrayCollection.source[this.lstPop.selectedIndex]);
        this.index = this.lstPop.selectedIndex;
        this.setInfoTip();
    }

    private onBtnMin() {
        this.count = 1;
        this.setInfoTip();
    }

    private onBtnMinus() {
        if (this.count > 1) {
            this.count = this.count - 1;
            this.setInfoTip();
        }
    }

    private onBtnAdd() {
        if (this.count < this.max) {
            this.count = this.count + 1;
            this.setInfoTip();
        }
    }

    private onBtnMax() {
        this.count = this.max;
        this.setInfoTip();
    }

    private onBtnUse() {
        let goodsInfo = new message.GoodsInfo();
        goodsInfo.count = this.count;
        goodsInfo.goodsId = this.itemId;
        goodsInfo.index = this.index;
        goodsInfo.showType = this.goodsList[this.index].showType;

        let type = Math.floor(this.goodsList[this.index].goodsId / 10000);
        if (type == message.EGoodsType.GOODS_TYPE_FASHION || type == message.EGoodsType.GOODS_TYPE_GENERAL) {
            goodsInfo.count = 1;
        }

        Game.PlayerItemSystem.useProp([goodsInfo]).then((resp: message.GameInfo) => {
            if (type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                loadUI(CommonGetGeneral).then((dialog: CommonGetGeneral) => {
                    dialog.setInfo(resp.getGoods[0].goodsId, 0, this.update);
                    dialog.show(UI.SHOW_FILL_OUT);
                });
            } else {
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.show();
                        dialog.init(resp.getGoods);
                        dialog.setCB(this.update);
                    });
            }
        });
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    private showGoodsProperty(ev: egret.Event) {
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
        egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300).call(() => { if (this.isUpdate) this.father.update(); });
    }

}

}