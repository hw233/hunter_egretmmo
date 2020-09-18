namespace zj {
// 
// lizhengqiang
// 20190410
export class GiftLevelRMB extends Dialog {
    private groupMain: eui.Group;
    private imgGiftType: eui.Image;
    private imgGiftAward: eui.Image;
    private lbNameType: eui.BitmapLabel;
    private lbBuyNeed: eui.BitmapLabel;
    private imgGestoneIcon: eui.Image;
    private lbGiftAwardNum: eui.BitmapLabel;
    private lbLevelNum: eui.BitmapLabel;
    private lbCurrentLevel: eui.Label;
    private lstBuyAward: eui.List;
    private btnGiftBuy: eui.Button;
    private lbGetNeedNum: eui.BitmapLabel;
    private lbTipClose: eui.Label;

    private info;
    private father;
    private cb: Function = null;
    private giftInfo: TableNewgiftItem;
    private allLevelInfo: TableNewgiftDaily[];
    private change: boolean = false;
    private allProducts: Array<MyProductInfo> = [];

    private _TOKEN = message.EResourceType.RESOURCE_TOKEN;

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/GiftLevelRMBSkin.exml";
        this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftBuy, this);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.lbTipClose); // 因为是循环播放，需要特别处理
            Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, this);

        this.loadPayProducts();
    }

    public setInfo(info, father, cb?: Function) {
        this.info = info;
        this.father = father;
        this.cb = cb;

        if (this.father != null) {
            this.father.openDown();
        }

        this.giftInfo = PlayerGiftSystem.Instance_item(info["gift_index"]);
        this.allLevelInfo = PlayerGiftSystem.GetGiftFate(Number(this.giftInfo.daily_index));

        this.setInfoList();
        this.setInfoButton();

        egret.Tween.get(this.lbTipClose, { loop: true })
            .to({ alpha: 1 }, 1000)
            .to({ alpha: 0 }, 1000);
    }

    private setInfoOther() {
        // tips
        let tipIndex: number = Number(this.info["gift_index"] + this.info["index"]);
        if (Tips.tips_oneday_get(tipIndex)) {
            Tips.tips_oneday_set(tipIndex, true)
            this.change = true;
        }

        let price: number = 0;
        let payIndex: TablePayIndex = TablePayIndex.Item(this.giftInfo.pay_index);
        for (let v of this.allProducts) {
            if (v.coin == payIndex.raw_token) {
                price = v.amount;
                break;
            }
        }

        let canBuyLevel: number = this.giftInfo.limit_level;
        let allGet: number = 0;
        for (let v of this.allLevelInfo) {
            for (let vv of v.goods_id) {
                allGet = allGet + Number(v.value);
            }
        }
        this.lbNameType.text = this.giftInfo.name_str;
        this.lbCurrentLevel.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.cur_level, Game.PlayerInfoSystem.BaseInfo.level));
        this.lbBuyNeed.text = price.toString();
        this.lbGiftAwardNum.text = allGet.toString();
        this.lbLevelNum.text = canBuyLevel.toString() + "级";//Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.get_level, canBuyLevel);
        this.lbGetNeedNum.text = price.toString();
    }

    private setInfoList() {
        // 成長禮包C購買後可獲得
        let msg: TableNewgiftDaily = new TableNewgiftDaily();
        msg.reward_level = TextsConfig.TextsConfig_Gift.get_after_buy2;

        for (let i = 0; i < this.giftInfo.goods_id.length; i++) {
            let count: number = 0;
            if (this.giftInfo.goods_id[i] == this._TOKEN) {
                count = this.giftInfo.goods_count[i] + this.giftInfo.raw_token;
            } else {
                count = this.giftInfo.goods_count[i];
            }
            msg.goods_id.push(this.giftInfo.goods_id[i]);
            msg.goods_count.push(count);
        }
        let tokenCount: number = this.giftInfo.raw_token;

        let findToken = Table.FindF(msg["goods_id"], (k, v) => {
            return v == this._TOKEN;
        });

        if (!findToken && tokenCount != 0) {
            msg.goods_id.push(this._TOKEN);
            msg.goods_count.push(tokenCount);
        }

        this.allLevelInfo.splice(0, 0, msg);

        let arrCollection = new eui.ArrayCollection();
        for (let i = 0; i < this.allLevelInfo.length; i++) {
            if (i == 0) {
                arrCollection.addItem({ info: this.allLevelInfo[i], bOne: true });
                continue;
            }
            arrCollection.addItem({ info: this.allLevelInfo[i] });
        }
        this.lstBuyAward.dataProvider = arrCollection;
        this.lstBuyAward.itemRenderer = GiftLevelRMBItem;
    }

    private setInfoButton() {
        this.btnGiftBuy.enabled = (this.info["buy_times"] < this.giftInfo.buy_times);
    }

    private onBtnGiftBuy() {
        let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        if (giftInfo.pay_type == 1) {
            Game.PlayerGiftSystem.getNewGift().then(() => {
                Game.PlayerGiftSystem.newGiftExist(this.info["index"]).then(() => {
                    this.requestButtonBuy();
                });
            });
        } else {
            this.requestButtonBuy();
        }
    }

    private requestButtonBuy() {
        this.btnGiftBuy.enabled = false;
        let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        if (Util.getAppVersionInfo().channel == "test") {
            Game.PlayerPaySystem.simulateCharge(this.info["index"]);
        } else {
            let strIndex = this.info["index"];
            if (this.info["pay_tbl"]) {
                platform.pay(PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, PlayerPaySystem.GetCpExtJson(strIndex));
            }
        }
    }

    private loadPayProducts() {
        Game.PlayerPaySystem.queryAppProducts().then((resp: message.QueryAppProductsRespBody) => {
            for (let v of resp.products) {
                for (let vv of resp.channel_products_ext) {
                    if (v.id == vv.id) {
                        let tmp: MyProductInfo = {
                            id: "",
                            name: "",
                            describe: "",
                            currency: "",
                            amount: 0,
                            amount_usd: 0,
                            coin: 0,
                            type: "",
                            discount: "",
                            cp_product_id: "",
                        };
                        for (const k in tmp) {
                            tmp[k] = v[k];
                        }
                        tmp.cp_product_id = vv.cp_product_id;
                        this.allProducts.push(tmp);
                        break;
                    }
                }
            }

            let i = 0;
            while (i < this.allProducts.length) {
                if (PlayerPaySystem.PayItemByID(this.allProducts[i].cp_product_id) == null) {
                    this.allProducts.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }

            this.allProducts.sort(function (a, b) {
                let itemA = PlayerPaySystem.PayItemByID(a.cp_product_id);
                let itemB = PlayerPaySystem.PayItemByID(b.cp_product_id);
                return itemA.sort_index - itemB.sort_index;
            });

            this.setInfoOther();
        });
    }

    private refreshInfo(ev: egret.Event) {
        this.btnGiftBuy.enabled = true;
        this.change = true;
        let cb = () => {
            this.setInfoButton();

            toast_success(LANG(TextsConfig.TextConfig_Tower.mallBuy));
            this.onBtnClose();
        };

        let msg = (<message.RoleInfoNoticeRequest>ev.data).body;

        if (msg.gameInfo.giftInfos.length > 0) {
            for (let v of msg.gameInfo.giftInfos) {
                if (v.index == this.info["index"]) {
                    this.info = Table.DeepCopy(v);
                    if (this.info["buy_times"] >= this.giftInfo.buy_times) {
                        if (msg.gameInfo.getGoods.length > 0) {
                            loadUI(CommonGetDialog)
                                .then((dialog: CommonGetDialog) => {
                                    dialog.show();
                                    dialog.init(msg.gameInfo.getGoods);
                                    dialog.setCB(cb);
                                });
                        } else {
                            cb();
                        }
                    }
                }
            }
        }
    }

    private onClickClose(e: egret.TouchEvent) {
        let global = this.groupMain.localToGlobal();
        global.x -= Game.UIManager.x;
        let rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);

        if (rect.contains(e.stageX, e.stageY) == false) {
            this.onBtnClose(false);
        }
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

    private onBtnClose(isPop: boolean = true) {
        if (this.father != null) {
            this.father.closeUp();
        }

        if (this.change && this.cb != null) {
            this.cb();
        }

        if (isPop) {
            (<PayMallScene>this.father).popItem(this.info["index"]);
        }

        this.close(UI.HIDE_TO_TOP);
    }
}
}