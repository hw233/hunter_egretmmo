namespace zj {
// 人偶礼包 Activity_TimeGiftFistPopN
// lizhengqiang
// 20190429
export class Activity_TimeGiftFistPopN extends Scene {

    private groupMain: eui.Group;
    private imgInfoIcon: eui.Image;
    private lbValue_1: eui.BitmapLabel;
    private lbCanBuy: eui.Label;
    private btnGet_2: eui.Button;
    private lbValue_2: eui.BitmapLabel;
    private scroller: eui.Scroller;
    private lstTableViewList: eui.List;
    private imgIcon: eui.Image;
    private lbSurplusTimes: eui.Label;

    private allProducts: Array<MyProductInfo> = [];
    private cb: Function = null;
    private info = null;
    private buy: boolean = null;
    private timer: egret.Timer;
    private payTbl = null;

    private TOKEN: number = 20002;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/Activity_TimeGiftFistPopNSkin.exml";
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
        this.btnGet_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet_2, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);

        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
        }, this);
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
                if (itemA == null) return 1;
                if (itemB == null) return -1;
                if (itemA.sort_index == itemB.sort_index) {
                    return b.amount - a.amount;
                } else {
                    return itemA.sort_index - itemB.sort_index;
                }

            });

            this.setInfoItem();
        });
    }

    public setInfo(giftIndex: number, cb: Function) {
        this.loadPayProducts();

        this.info = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
            return v.index == giftIndex;
        })[0];

        this.cb = cb;

        this.buy = false;
        this.setInfoUpdate();
        this.setInfoList();

        this.setInfoTime();
        this.timer = new egret.Timer(999, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoTime, this);
        this.timer.start();

        Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
    }

    private setInfoTime() {
        let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        if (giftInfo.duration != 0 && giftInfo.duration != null) {
            let lastTime: number = <number>this.info["trigger_time"] + giftInfo.duration - Game.Controller.curServerTime;
            lastTime = lastTime >= 0 ? lastTime : 0;
            let timeStr = TextsConfig.TextsConfig_Hunter_NewGift.last_time + Helper.FormatDaysTimeCh(lastTime);
            this.lbCanBuy.text = timeStr;
        } else {
            this.lbCanBuy.visible = false;
        }
    }

    private setInfoUpdate() {
        let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);

        this.btnGet_2.enabled = this.info["buy_times"] < giftInfo.buy_times;

        let str: string = "";
        if (giftInfo.gift_form == 1) {
            let getStr: string = "";
            // 限时限购 时间永久
            let curStr: string = "";
            if (giftInfo.buy_times > this.info["buy_times"]) {
                curStr = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
            } else {
                curStr = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
            }
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.popc[1], curStr);
        } else if (giftInfo.gift_form == 2) {
            if (giftInfo.buy_times < 100) {
                let curStr: string = "";
                if (giftInfo.buy_times > this.info["buy_times"]) {
                    curStr = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                } else {
                    curStr = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                }
                str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.popc[2], curStr);
            } else {
                str = TextsConfig.TextsConfig_Gift.gift.popc[5];
            }

        } else if (giftInfo.gift_form == 4) {
            if (giftInfo.buy_times < 100) {
                let curStr: string = "";
                if (giftInfo.buy_times > this.info["buy_times"]) {
                    curStr = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                } else {
                    curStr = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, giftInfo.buy_times - Number(this.info["buy_times"])) + "<color>r=60,g=255,b=0</color><text>/" + giftInfo.buy_times + "</text>";
                }
                str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.popc[4], curStr);
            } else {
                str = TextsConfig.TextsConfig_Gift.gift.popc[5];
            }
        }
        this.lbSurplusTimes.textFlow = Util.RichText(str);
    }

    private setInfoItem() {
        let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);

        this.payTbl = {};

        if (giftInfo.pay_type == 1 && this.payTbl != null) {
            let payIndex = TablePayIndex.Item(giftInfo.pay_index);
            for (const v of this.allProducts) {
                if (v.coin == payIndex.raw_token) {
                    this.payTbl = Table.DeepCopy(v);
                    break;
                }
            }

            if (Object.keys(this.payTbl).length > 0) {
                let strUnit = Set.CashUnit(this.payTbl["currency"]);
                let strMoney = this.payTbl["amount"];
                this.lbValue_2.text = strMoney;
                this.imgIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[1 - 1], this);
                this.lbValue_1.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.yuan, strMoney);
            } else {
                this.lbValue_2.text = "";// TextsConfig.TextsConfig_Gift.no_point;
            }
        } else {
            this.lbValue_2.text = giftInfo.price.toString();
            this.imgIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[2 - 1], this);
            this.lbValue_1.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.zuan, giftInfo.price);
        }
    }

    private refreshInfo(ev: egret.Event) {
        this.buy = true;
        this.btnGet_2.enabled = true;

        let msg = (<message.RoleInfoNoticeRequest>ev.data).body;
        if (msg.gameInfo.giftInfos.length > 0) {
            for (const v of msg.gameInfo.giftInfos) {
                if (v.index == this.info["index"]) {
                    setTimeout(() => {
                        let payTbl = this.payTbl;
                        this.info = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                            return v.index == this.info["index"];
                        })[0];
                        this.payTbl = payTbl;
                    }, 500);
                }
            }
        }

        if (msg.gameInfo.getGoods.length > 0) {
            loadUI(CommonGetDialog)
                .then((dialog: CommonGetDialog) => {
                    dialog.show();
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.setCB(this.followUp);
                });
        } else {
            this.followUp();
        }
    }

    private setInfoList() {
        let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        let rewardList = [];
        for (let i = 0; i < giftInfo.goods_id.length; i++) {
            let good = new message.GoodsInfo();
            good.goodsId = giftInfo.goods_id[i];
            if (giftInfo.goods_id[i] == this.TOKEN) {
                good.count = giftInfo.goods_count[i] + giftInfo.raw_token;
            } else {
                good.count = giftInfo.goods_count[i];
            }
            rewardList.push(good);
        }
        let good = new message.GoodsInfo();
        good.goodsId = 20002;
        good.count = giftInfo.raw_token;

        let findToken = Table.FindF(rewardList, function (k, v) {
            return v.goodsId == 20002;
        });

        if (!findToken && good.count != 0) {
            rewardList.splice(0, 0, good);
        }

        let arrCollection = new eui.ArrayCollection();
        for (const v of rewardList) {
            arrCollection.addItem(v);
        }

        let layout = new eui.HorizontalLayout();
        layout.verticalAlign = "middle";
        layout.horizontalAlign = "center";
        if (68 * arrCollection.length < this.scroller.width) {
            layout.paddingLeft = (this.scroller.width - 68 * arrCollection.length) / 2;
        }

        this.lstTableViewList.layout = layout;
        this.lstTableViewList.dataProvider = arrCollection;
        this.lstTableViewList.itemRenderer = GiftCommonAwardItem;
    }

    private onBtnGet_2() {
        this.reqButtonBuy();
    }

    private reqButtonBuy() {
        this.btnGet_2.enabled = false;
        let gift_info = PlayerGiftSystem.Instance_item(this.info.gift_index);
        if (gift_info.pay_type == 1) {
            if (Util.getAppVersionInfo().channel == "test") {
                Game.PlayerPaySystem.simulateCharge(this.info["index"]).then((gameInfo: message.GameInfo) => {
                    this.simulateCharge(gameInfo, 0);
                }).catch((err) => {
                    this.simulateCharge(null, err);
                });
            } else {
                let strIndex = this.info["index"];
                if (this.payTbl) {
                    platform.pay(PlayerPaySystem.GetProductId(gift_info.pay_index, this.allProducts), 1, PlayerPaySystem.GetCpExtJson(strIndex));
                }
            }
        } else {
            Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then((gameInfo: message.GameInfo) => {
                this.simulateCharge(gameInfo, 0);
            }).catch((err) => {
                this.simulateCharge(null, err);
            });
        }
    }

    private simulateCharge(gameInfo: message.GameInfo, result) {
        this.btnGet_2.enabled = true;
        if (result == message.EC.SUCCESS) {
            this.buy = true;

            if (gameInfo.giftInfos.length > 0) {
                for (let v of gameInfo.giftInfos) {
                    if (v.index == this.info["index"]) {
                        let payTbl = this.info["pay_tbl"];
                        this.info = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
                            return v.index == this.info["index"];
                        })[0];
                        this.payTbl = payTbl;
                    }
                }
            }
        } else {
            this.btnGet_2.enabled = true;
            toast_warning(Game.ConfigManager.getAone2CodeReason(result));
        }
    }

    private followUp = () => {
        this.setInfoUpdate();
    }

    private onClickClose(e: egret.TouchEvent) {
        let global = this.groupMain.localToGlobal();
        global.x -= Game.UIManager.x;
        let rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);

        if (rect.contains(e.stageX, e.stageY) == false) {
            this.onBtnClose();
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

    private onBtnClose = () => {
        this.close(UI.HIDE_TO_TOP);
    }
}
}