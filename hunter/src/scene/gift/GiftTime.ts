namespace zj {
    // 
    // lizhengqiang
    // 20190402
    export class GiftTime extends UI {
        private groupAni: eui.Group;
        private imgGiftType: eui.Image;
        private lbNameType: eui.BitmapLabel;
        private imgBuyTypeBoard: eui.Image;
        private imgBuyType: eui.Image;
        // private groupGiftDay: eui.Group;
        // private lbDay: eui.Label;
        private lbBuyAward: eui.Label;
        private lstBuyAward: eui.List;
        private lbDayAward: eui.Label;
        private imgCoinType: eui.Image;
        private lbDayAwardNum: eui.Label;
        private imgGiftAward: eui.Image;
        private lbGiftAwardNum: eui.Label;
        private btnGiftGet: eui.Button;
        private btnGiftGo: eui.Button;
        private groupBuy: eui.Group;
        private btnGiftBuy: eui.Button;
        private imgGestoneIcon: eui.Image;
        private lbGetNum: eui.Label;
        private imgType: eui.Image;
        private groupType: eui.Group;
        private imgTypeTop: eui.Image;


        private adverse: boolean = false;
        private info;
        private father = null;
        private isActivity: boolean = false;
        private giftInfo: TableNewgiftItem;
        private allBackToken: number = 0;
        private allProducts: Array<MyProductInfo> = [];
        private change: boolean = false;
        private thisBuy: boolean = false;

        private TOKEN = message.EResourceType.RESOURCE_TOKEN;

        public constructor() {
            super();
            this.skinName = "resource/skins/gift/GiftTimeSkin.exml";
            this.btnGiftGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftGo, this);
            this.btnGiftGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftGet, this);
            this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGiftBuy, this);

            Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            }, this);

            this.loadPayProducts();
        }

        public setInfo(adverse: boolean, info, father, isActivity: boolean = false) {
            // adverse 广告页，需要光效
            this.adverse = adverse;
            this.info = info;
            this.father = father;
            // 活动界面购买月卡活动
            this.isActivity = isActivity;

            this.giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.setInfoAward();
        }

        private setInfoItem() {
            if (this.adverse) {
                this.groupAni.removeChildren();
                Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "003_beijingguang_04", 0).then(display => {
                    this.groupAni.addChild(display);
                }).catch(reason => {
                    toast(reason);
                });
            }

            // 通用
            let info = this.giftInfo;
            this.lbNameType.text = this.giftInfo.name_str;
            this.lbBuyAward.text = TextsConfig.TextsConfig_Gift.first_get_award[info.pay_type];
            this.imgBuyTypeBoard.source = cachekey(info.push_big_path, this);

            if (this.giftInfo.is_op == 0) {
                this.imgBuyType.visible = false;
            }
            if (info.pay_type == 3) {
                // 免费领取类型
                let firstDailyIndex: number = Number(info.daily_index);
                let firstDailyTbl = PlayerGiftSystem.Instance_days(firstDailyIndex + 1);
                let rewardKey = Table.FindR(firstDailyTbl.goods_id, (k, v) => {
                    return v == this.TOKEN;
                });
                if (rewardKey[1] != null) {
                    let dayCount: number = firstDailyTbl.goods_count[rewardKey[1]];
                    this.lbDayAwardNum.text = "X" + dayCount;
                    this.lbGiftAwardNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.after_get_award, Number(info.daily_num) - 1 + this.allBackToken);
                }
                this.imgTypeTop.source = cachekey(UIConfig.UIConfig_Gift.buy_type2[5], this);
                this.lbDayAward.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.after_get_award, Number(info.daily_num) - 1);
                // this.lbDay.visible = false;

                // Button
                this.groupBuy.visible = false;
                if (this.adverse) {
                    // 广告页
                    if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                        // 第一天未领取
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    } else if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 1) {
                        // 第一天未领取
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    } else {
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    }
                } else {
                    // 通用界面
                    this.btnGiftGo.visible = false;
                    if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 0) {
                        // 第一天未领取
                        this.btnGiftGet.enabled = true;
                    } else if (this.info["dailyIndex"] == info.daily_index && this.info["buy_times"] == 1) {
                        // 第一天未领取
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
                        this.lbGetNum.text = strMoney.toString();
                    } else {
                        this.lbGetNum.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
                    }
                } else if (info.pay_type == 2) {
                    this.lbGetNum.text = info.price.toString();
                    this.lbGetNum.visible = true;
                }
                this.groupBuy.visible = true;
                this.btnGiftGo.visible = false;
                this.btnGiftGet.visible = false;
                this.imgTypeTop.source = cachekey(UIConfig.UIConfig_Gift.buy_type2[4], this);
                this.imgGestoneIcon.source = cachekey(UIConfig.UIConfig_Hunter_Pay.donate[info.pay_type - 1], this);
                if (this.info["buy_times"] < info.buy_times) {
                    // 未购买

                    // end time
                    let soldOut = PlayerGiftSystem.UpToOpTime(this.info["trigger_time"] + info.duration - Game.Controller.serverNow().valueOf() / 1000);
                    if (info.duration == 0) {
                        // 月卡类型不限制时间
                        this.imgTypeTop.visible = false;
                        //this.lbDay.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.get_after_buy, info.daily_num);
                    } else {
                        //this.lbDay.text = soldOut;
                    }
                    this.btnGiftBuy.enabled = true;
                } else {
                    // 已购买
                    //this.lbDay.text = TextsConfig.TextsConfig_Gift.has_bought;
                    // 无操作
                    if (this.adverse) {
                        // 广告界面
                        this.groupBuy.visible = false;
                        this.btnGiftGet.visible = false;
                        this.btnGiftGo.visible = true;
                    } else {
                        // 弹出界面
                        this.btnGiftBuy.enabled = false;
                    }
                }
            }
        }

        private setInfoAward() {
            let rewards: Array<message.GoodsInfo> = [];
            if (this.giftInfo.pay_type == 3) {
                // 免费类型
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
                // 付费类型
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
            this.lstBuyAward.dataProvider = arrCollection;
            this.lstBuyAward.itemRenderer = GiftCommonAwardItem;
        }

        private onBtnGiftGo() {
            Game.PlayerGiftSystem.JumpToGiftById(this.info["index"], this.info["gift_index"]);
        }

        private onBtnGiftGet() {
            this.btnGiftGet.enabled = false;
            Game.PlayerGiftSystem.rewardNewGift(this.info["index"]).then((gameInfo: message.GameInfo) => {
                this.simulateCharge(gameInfo, 0);
            }).catch((err) => {
                this.simulateCharge(null, err);
            });
        }

        private onBtnGiftBuy() {
            this.btnGiftBuy.enabled = false;
            this.dealBuy();
        }

        private dealBuy() {
            let giftInfo = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (giftInfo.pay_type == 1) {
                this.synGiftInfo();
            } else {
                this.requestButtonBuy();
            }
        }

        private requestButtonBuy() {
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
                for (const v of msg.gameInfo.giftInfos) {
                    if (v.index == this.info["index"]) {
                        this.info = Table.DeepCopy(v);
                        (<GiftTimeNode>this.father).info = this.info;
                        break;
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

                    if (CommonConfig.month_card_fit.indexOf(this.info["gift_index"]) != -1 && this.father.father != null) {
                        (<PayMallScene>this.father.father).type = 3;
                        let tbl = PlayerGiftSystem.SortCharge(Game.PlayerGiftSystem.giftInfos);
                        for (let v of tbl) {
                            let num: number = Number(v["gift_index"] + v["index"]);
                            if (Tips.tips_oneday_get(num)) {
                                Tips.tips_oneday_set(num, true);
                            }
                        }
                        (<PayMallScene>this.father.father).setInfoTypeList();
                    };

                    let cbFather = () => {
                        if (this.father.father == null) return;
                        if (CommonConfig.month_card_fit.indexOf(this.info["gift_index"]) == -1 && this.father.father != null) {
                            (<PayMallScene>this.father.father).setInfoItemList();
                        }
                    };
                    (<GiftTimeNode>this.father).cb = cbFather;
                    (<GiftTimeNode>this.father).onBtnClose();
                };
                if (this.isActivity) {
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(msg.gameInfo.getGoods);
                            dialog.setCB(() => {
                                (<GiftTimeNode>this.father).onBtnClose();
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

        private synGiftInfo = () => {
            Game.PlayerGiftSystem.getNewGift().then(() => {
                this.checkGiftExit();
            });
        }

        private checkGiftExit = () => {
            Game.PlayerGiftSystem.newGiftExist(this.info["index"]).then(() => {
                this.requestButtonBuy();
            });
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

                this.setInfoItem();
            });
        }

    }
}