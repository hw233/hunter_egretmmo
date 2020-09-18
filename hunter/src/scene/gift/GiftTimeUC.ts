namespace zj {
    // 新手礼包 HXH_GiftTimeUC
    // lizhengqiang
    // 20190419
    export class GiftTimeUC extends Scene {
        private imgBackground: eui.Image;
        private groupMain: eui.Group;
        private lbNameType: eui.BitmapLabel;
        private imgBuyTypeBoard: eui.Image;
        private scroller: eui.Scroller;
        private lstBuyAward: eui.List;
        private lbDayAward: eui.Label;
        private imgCoinType: eui.Image;
        private lbDayAwardNum: eui.Label;
        private lbGiftAwardNum: eui.BitmapLabel;
        private btnGiftGet: eui.Button;
        private btnGiftGo: eui.Button;
        private groupBuy: eui.Group;
        private btnGiftBuy: eui.Button;
        private imgGestoneIcon: eui.Image;
        private lbGetNum: eui.BitmapLabel;
        private lbGetNum1: eui.Label;
        private groupType: eui.Group;
        private imgTypeTop: eui.Image;
        private btnClose: eui.Button;

        private adverse: boolean = false;
        private info = null;
        private father = null;
        private bActivity: boolean = false;
        private giftInfo: TableNewgiftItem = null;
        private cb: Function = null;
        private allBackToken: number = 0;
        private change: boolean = false;
        private thisBuy: boolean = false;
        private allProducts: Array<MyProductInfo> = [];

        private TOKEN = message.EResourceType.RESOURCE_TOKEN;

        public constructor() {
            super();
            this.skinName = "resource/skins/gift/GiftTimeUCSkin.exml";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnGiftGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftGet, this);
            this.btnGiftGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftGo, this);
            this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftBuy, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
            Game.EventManager.on(GameEvent.USER_PAY_RESULT, () => {
                this.btnGiftBuy.enabled = true;
            }, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
                Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);

                this.father = null;
            }, this);
        }

        public setInfo(adverse: boolean = false, info, father, bActivity: boolean = false) {
            this.groupMain.visible = false;
            this.loadPayProducts();

            this.adverse = adverse;
            this.info = info;
            this.father = father;
            this.bActivity = false;

            this.giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        }

        private setInfoItem() {
            let info = this.giftInfo;
            this.lbNameType.text = this.giftInfo.name_str;
            this.imgBuyTypeBoard.source = cachekey(info.push_big_path, this);

            if (info.pay_type == 3) {
                let firstDailyIndex: number = Number(info.daily_index);
                let firstDailyTbl = PlayerGiftSystem.Instance_days(firstDailyIndex + 1);
                let rewardKey = Table.FindR(firstDailyTbl.goods_id, (k, v) => {
                    return v == this.TOKEN;
                });
                if (rewardKey[1] != null) {
                    let dayCount: number = firstDailyTbl.goods_count[rewardKey[1]];
                    this.lbDayAwardNum.text = "X" + dayCount;
                    this.lbGiftAwardNum.text = (dayCount * Number(info.daily_num) - 1 + this.allBackToken).toString();
                }
                this.imgTypeTop.source = cachekey(UIConfig.UIConfig_Gift.buy_type2[5], this);
                this.lbDayAward.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.after_get_award, Number(info.daily_num) - 1);

                this.groupBuy.visible = false;
                if (this.adverse) {
                    if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    } else if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 1) {
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    } else {
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                } else {
                    this.btnGiftGo.visible = false;
                    if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 0) {
                        this.btnGiftGet.enabled = true;
                    } else if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 1) {
                        this.btnGiftGet.enabled = false;
                    } else {
                        this.btnGiftGet.enabled = false;
                    }
                }
            } else {
                let firstDailyIndex = info.daily_index;
                let firstDailyTbl = PlayerGiftSystem.Instance_days(firstDailyIndex);
                let rewardKey = Table.FindR(firstDailyTbl.goods_id, (k, v) => {
                    return v == this.TOKEN;
                });
                if (rewardKey[1] != null) {
                    let dayCount = firstDailyTbl.goods_count[rewardKey[1]];
                    this.lbDayAwardNum.text = "X" + dayCount;
                    this.lbGiftAwardNum.text = (dayCount * Number(info.daily_num) + this.allBackToken).toString();
                }
                this.lbDayAward.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.after_get_award, info.daily_num);

                // tip
                let tipIndex = Number(this.info["gift_index"] + this.info["index"]);
                if (Tips.tips_oneday_get(tipIndex)) {
                    Tips.tips_oneday_set(tipIndex, true);
                    this.change = true;
                }

                // price
                if (info.pay_type == 1) {
                    // rmb
                    let payIndex = TablePayIndex.Item(info.pay_index);
                    let payTbl: MyProductInfo = null;
                    for (const v of this.allProducts) {
                        if (v.coin == payIndex.raw_token) {
                            payTbl = Table.DeepCopy(v);
                            break;
                        }
                    }

                    if (payTbl != null) {
                        this.info["pay_tbl"] = {};
                        this.info["pay_tbl"] = payTbl;
                        let strUnit = Set.CashUnit(payTbl.currency);
                        let strMoney = payTbl.amount;
                        this.lbGetNum.visible = true;
                        this.lbGetNum1.visible = false;
                        this.lbGetNum.text = strMoney.toString();
                    } else {
                        this.lbGetNum.visible = false;
                        this.lbGetNum1.visible = true;
                        this.lbGetNum1.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
                    }
                } else if (info.pay_type == 2) {
                    this.lbGetNum.text = info.price.toString();
                    this.lbGetNum.visible = true;
                    this.lbGetNum1.visible = false;
                }
                this.groupBuy.visible = true;
                this.btnGiftGo.visible = false;
                this.btnGiftGet.visible = false;
                this.imgTypeTop.source = cachekey(UIConfig.UIConfig_Gift.buy_type2[4], this);
                this.imgGestoneIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[info.pay_type - 1], this);
                if (this.info["buy_times"] < info.buy_times) {
                    if (info.duration == 0) {
                        this.imgTypeTop.visible = false;
                    }
                    this.btnGiftBuy.enabled = true;
                } else {
                    if (this.adverse) {
                        this.groupBuy.visible = false;
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    } else {
                        this.btnGiftBuy.enabled = false;
                    }
                }
            }
        }

        private setInfoAward() {
            let rewards: Array<message.GoodsInfo> = [];
            if (this.giftInfo.pay_type == 3) {
                let firstDailyIndex = this.giftInfo.daily_index;
                let firstDailyTbl = PlayerGiftSystem.Instance_days(firstDailyIndex);

                for (let i = 0; i < firstDailyTbl.goods_id.length; i++) {
                    let good = new message.GoodsInfo();
                    good.goodsId = firstDailyTbl.goods_id[i];
                    good.count = firstDailyTbl.goods_count[i];
                    rewards.push(good);
                    if (good.goodsId == this.TOKEN) {
                        this.allBackToken = good.count;
                    }
                }
            } else {
                for (let i = 0; i < this.giftInfo.goods_id.length; i++) {
                    let good = new message.GoodsInfo();
                    good.goodsId = this.giftInfo.goods_id[i];
                    if (this.giftInfo.goods_id[i] == this.TOKEN) {
                        good.count = this.giftInfo.goods_count[i] + this.giftInfo.raw_token;
                        this.allBackToken = good.count;
                    } else {
                        good.count = this.giftInfo.goods_count[i];
                    }
                    rewards.push(good);
                }
                let good = new message.GoodsInfo();
                good.goodsId = this.TOKEN;
                good.count = this.giftInfo.raw_token;

                let findToken = Table.FindF(rewards, (k, v) => {
                    return v.goodId == this.TOKEN;
                });

                if (!findToken && good.count != 0) {
                    this.allBackToken = good.count;
                    rewards.splice(0, 0, good);
                }
            }

            let arrCollection = new eui.ArrayCollection();
            for (const v of rewards) {
                arrCollection.addItem(v);
            }

            let layout = new eui.HorizontalLayout();
            layout.verticalAlign = "middle";
            layout.horizontalAlign = "center";
            if (68 * arrCollection.length < this.scroller.width) {
                layout.paddingLeft = (this.scroller.width - 68 * arrCollection.length) / 2;
            }

            this.lstBuyAward.layout = layout;
            this.lstBuyAward.dataProvider = arrCollection;
            this.lstBuyAward.itemRenderer = GiftCommonAwardItem;
        }

        private onBtnGiftGo() {
            this.onBtnClose();
            Game.PlayerGiftSystem.JumpToGiftById(this.info["index"], this.info["gift_index"]);
        }

        private onBtnGiftGet() {
            this.btnGiftGet.enabled = false;
            this.dealGet();
        }

        private onBtnGiftBuy() {
            this.btnGiftBuy.enabled = false;
            this.dealBuy();
        }

        private dealBuy() {
            this.thisBuy = true;
            let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (this.giftInfo.pay_type == 1) {
                if (Util.getAppVersionInfo().channel == "test") {
                    Game.PlayerPaySystem.simulateCharge(this.info["index"]).then((resp: message.GameInfo) => {
                        this.simulateCharge(resp, 0);
                    }).catch((err) => {
                        this.simulateCharge(null, err);
                    });
                } else {
                    let strIndex = this.info["index"];
                    if (this.info["pay_tbl"]) {
                        platform.pay(PlayerPaySystem.GetProductId(giftInfo.pay_index, this.allProducts), 1, PlayerPaySystem.GetCpExtJson(strIndex));
                    }
                }
            } else if (this.giftInfo.pay_type == 2) {
                Game.PlayerGiftSystem.rewardFormNewGift(this.info["index"]).then((gameInfo: message.GameInfo) => {
                    this.simulateCharge(gameInfo, 0);
                }).catch((err) => {
                    this.simulateCharge(null, err);
                });
            }
        }

        private dealGet() {
            Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then((gameInfo: message.GameInfo) => {
                this.simulateCharge(gameInfo, 0);
            }).catch((err) => {
                this.simulateCharge(null, err);
            });
        }

        private simulateCharge = (gameInfo: message.GameInfo, result: number) => {
            this.btnGiftGet.enabled = true;
            if (result == message.EC.SUCCESS) {
                this.btnGiftBuy.enabled = false;
            } else {
                this.btnGiftBuy.enabled = true;
            }
        }

        private refreshInfo(ev: egret.Event) {
            if (!this.thisBuy) {
                return;
            } else {
                this.change = true;
            }
            this.btnGiftBuy.enabled = false;
            this.btnGiftGet.enabled = true;

            let msg = (<message.RoleInfoNoticeRequest>ev.data).body;

            if (msg.gameInfo.giftInfos.length > 0) {
                for (let v of msg.gameInfo.giftInfos) {
                    if (v.index == this.info["index"]) {
                        this.info = Table.DeepCopy(v);
                    }
                }
            }

            if (msg.gameInfo.getGoods.length > 0) {
                let adCb = () => {
                    this.btnGiftBuy.enabled = false;
                    this.followUp(true);
                };
                let cb = () => {
                    this.btnGiftBuy.enabled = false;
                    this.onBtnClose();
                };
                if (this.bActivity) {
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(msg.gameInfo.getGoods);
                            dialog.setCB(() => {
                                this.onBtnClose();
                            });
                        });
                } else {
                    if (this.adverse) {
                        loadUI(CommonGetDialog)
                            .then((dialog: CommonGetDialog) => {
                                dialog.show();
                                dialog.init(msg.gameInfo.getGoods);
                                dialog.setCB(adCb);
                            });
                    } else {
                        loadUI(CommonGetDialog)
                            .then((dialog: CommonGetDialog) => {
                                dialog.show();
                                dialog.init(msg.gameInfo.getGoods);
                                dialog.setCB(cb);
                            });
                    }
                }
            }
            else {
                this.followUp(false);
            }
        }

        private followUp(runAnimation: boolean = false) {
            if (this.adverse) {
                if (runAnimation) {
                    // ???

                    this.thisBuy = false;
                    this.setInfo(this.adverse, this.info, this.father);
                } else {
                    this.setInfo(this.adverse, this.info, this.father);
                }
            } else {
                this.setInfo(this.adverse, this.info, this.father);
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
                    if (itemA == null) return 1;
                    if (itemB == null) return -1;
                    return itemA.sort_index - itemB.sort_index;
                });

                this.groupMain.visible = true;
                this.setInfoAward();
                this.setInfoItem();
            });
        }

        public setCB2(cb: Function) {
            this.cb = cb;
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
            if (this.cb != null) {
                this.cb();
            }
            this.close(UI.HIDE_TO_TOP);
        }


    }
}