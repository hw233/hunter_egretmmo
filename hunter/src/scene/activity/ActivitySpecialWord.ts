namespace zj {
    /**
     * @class 福利-超值月卡
     * 
     * @author LianLei
     * 
     * @date 2019-12-02
     */
    export class ActivitySpecialWord extends UI {
        private groupNormal: eui.Group;
        private imgNormalMonthCard: eui.Image;
        private imgRenewNormal: eui.Image;
        private btnGetNormal: eui.Button;
        private btnBuyNormal: eui.Button;
        private groupNormalTime: eui.Group;
        private labelNormalTime: eui.Label;
        private labelGetNormal: eui.Label;
        private scrollerNormalAward: eui.Scroller;
        private listNormalAward: eui.List;
        private groupSenior: eui.Group;
        private imgSeniorMonthCard: eui.Image;
        private imgRenewSenior: eui.Image;
        private btnGetSenior: eui.Button;
        private btnBuytSenior: eui.Button;
        private groupSeniorTime: eui.Group;
        private labelSeniorTime: eui.Label;
        private labelGetSenior: eui.Label;
        private scrollerSeniorAward: eui.Scroller;
        private listSeniorAward: eui.List;

        private allProducts: Array<MyProductInfo> = [];
        private monthCardData: Array<{ info: message.GiftInfo/*, type: number */ }> = [];
        private monthCardNormalData: TableNewgiftItem = null;
        private monthCardSeniorData: TableNewgiftItem = null;
        private listNormalAwardData: eui.ArrayCollection = new eui.ArrayCollection();
        private listSeniorAwardData: eui.ArrayCollection = new eui.ArrayCollection();
        private thisBuy: boolean = false;

        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivitySpecialWordSkin.exml";
            this.btnBuyNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuyNormal, this);
            this.btnBuytSenior.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuySenior, this);
            this.btnGetNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetNormal, this);
            this.btnGetSenior.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetSenior, this);
            this.imgRenewNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuyNormal, this);
            this.imgRenewSenior.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuySenior, this);
            this.imgNormalMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuyNormal, this);
            this.imgSeniorMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuySenior, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
                Game.EventManager.off(GameEvent.PLAYER_GIFTS_INFO_CHANGE, this.init, this);
            }, this);
            Game.EventManager.on(GameEvent.PLAYER_GIFTS_INFO_CHANGE, this.init, this);

            let gift = Table.FindF(PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                return v.gift_index == 100203 || v.gift_index == 100204;
            });
            let charge = Table.FindF(PlayerGiftSystem.SortCharge(Game.PlayerGiftSystem.giftInfos), (k, v) => {
                return v.gift_index == 100203 || v.gift_index == 100204;
            });

            if (!gift && !charge) {
                Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            }
        }

        public init() {
            this.loadData();
            this.loadPayProducts();
            if (this.monthCardNormalData) {
                this.setInfoAward();
            }
        }

        private loadData() {
            this.monthCardData = [];
            let tbl: Array<message.GiftInfo> = [];
            // if ((PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos).length == 0) && (PlayerGiftSystem.SortCharge(Game.PlayerGiftSystem.giftInfos).length == 0)) {
            //     Game.EventManager.off(GameEvent.SERVER_NOTICE_ROLE_INFO, this.refreshInfo, this);
            //     return;
            // }
            // let chargeList = PlayerGiftSystem.SortCharge(Game.PlayerGiftSystem.giftInfos);
            // for (const v of chargeList) {
            //     if (CommonConfig.month_card_fit.indexOf(v.gift_index) == -1 || tbl.indexOf(v) != -1) continue;
            //     this.monthCardData.push({ "info": v, "type": TableEnum.Enum.HXHChargeType.Charge });
            //     tbl.push(v);
            // }

            // let giftList = PlayerGiftSystem.SortGift(Game.PlayerGiftSystem.giftInfos);
            // for (const v of giftList) {
            //     if (CommonConfig.month_card_fit.indexOf(v.gift_index) == -1 || tbl.indexOf(v) != -1) continue;
            //     this.monthCardData.push({ "info": v, "type": TableEnum.Enum.HXHChargeType.Gift });
            //     tbl.push(v);
            // }
            for (let i = 0; i < Game.PlayerGiftSystem.giftInfos.length; i++) {
                if (Game.PlayerGiftSystem.giftInfos[i].gift_index == 100203 || Game.PlayerGiftSystem.giftInfos[i].gift_index == 100204) {
                    this.monthCardData.push({ info: Game.PlayerGiftSystem.giftInfos[i] });
                }
            }
            if (this.monthCardData.length == 0) {
                Game.EventManager.off(GameEvent.PLAYER_GIFTS_INFO_CHANGE, this.init, this);
                return;
            }

            this.monthCardData.sort((a, b) => { return a.info.gift_index - b.info.gift_index; });

            this.monthCardNormalData = null;
            this.monthCardSeniorData = null;

            for (let i = 0; i < this.monthCardData.length; i++) {
                if (CommonConfig.month_card_fit.indexOf(this.monthCardData[i].info.gift_index) == -1) return;
            }
            this.monthCardNormalData = PlayerGiftSystem.Instance_item(this.monthCardData[0].info.gift_index);
            this.monthCardSeniorData = PlayerGiftSystem.Instance_item(this.monthCardData[1].info.gift_index);

            this.setUI();
        }

        private setInfoAward() {
            let rewardsNormal: Array<message.GoodsInfo> = [];
            let rewardsSenior: Array<message.GoodsInfo> = [];
            if (this.monthCardNormalData.pay_type == 3) { // 免费类型
                let firstDailyIndex: number = Number(this.monthCardNormalData.daily_index);
                let firstDailyTbl: TableNewgiftDaily = PlayerGiftSystem.Instance_days(firstDailyIndex);

                for (let i = 0; i < firstDailyTbl.goods_id.length; i++) {
                    let good = new message.GoodsInfo();
                    good.goodsId = firstDailyTbl.goods_id[i];
                    good.count = firstDailyTbl.goods_count[i];
                    rewardsNormal.push(good);
                }
            }
            else { // 付费类型
                for (let i = 0; i < this.monthCardNormalData.goods_id.length; i++) {
                    let good = new message.GoodsInfo();
                    good.goodsId = this.monthCardNormalData.goods_id[i];
                    if (this.monthCardNormalData.goods_id[i] == message.EResourceType.RESOURCE_TOKEN) {
                        good.count = this.monthCardNormalData.goods_count[i] + this.monthCardNormalData.raw_token;
                    } else {
                        good.count = this.monthCardNormalData.goods_count[i];
                    }
                    rewardsNormal.push(good);
                }

                let good = new message.GoodsInfo();
                good.goodsId = message.EResourceType.RESOURCE_TOKEN;
                good.count = this.monthCardNormalData.raw_token;

                let findToken = Table.FindF(rewardsNormal, (k, v) => {
                    return v.goodId == message.EResourceType.RESOURCE_TOKEN;
                });

                if (!findToken && good.count != 0) rewardsNormal.splice(0, 0, good);
            }

            if (this.monthCardSeniorData.pay_type == 3) { // 免费类型
                let firstDailyIndex: number = Number(this.monthCardSeniorData.daily_index);
                let firstDailyTbl: TableNewgiftDaily = PlayerGiftSystem.Instance_days(firstDailyIndex);

                for (let i = 0; i < firstDailyTbl.goods_id.length; i++) {
                    let good = new message.GoodsInfo();
                    good.goodsId = firstDailyTbl.goods_id[i];
                    good.count = firstDailyTbl.goods_count[i];
                    rewardsSenior.push(good);
                }
            }
            else { // 付费类型
                for (let i = 0; i < this.monthCardSeniorData.goods_id.length; i++) {
                    let good = new message.GoodsInfo();
                    good.goodsId = this.monthCardSeniorData.goods_id[i];
                    if (this.monthCardSeniorData.goods_id[i] == message.EResourceType.RESOURCE_TOKEN) {
                        good.count = this.monthCardSeniorData.goods_count[i] + this.monthCardSeniorData.raw_token;
                    } else {
                        good.count = this.monthCardSeniorData.goods_count[i];
                    }
                    rewardsSenior.push(good);
                }

                let good = new message.GoodsInfo();
                good.goodsId = message.EResourceType.RESOURCE_TOKEN;
                good.count = this.monthCardSeniorData.raw_token;

                let findToken = Table.FindF(rewardsSenior, (k, v) => {
                    return v.goodId == message.EResourceType.RESOURCE_TOKEN;
                });

                if (!findToken && good.count != 0) rewardsSenior.splice(0, 0, good);
            }

            this.listNormalAwardData.removeAll();
            for (let i = 0; i < rewardsNormal.length; i++) this.listNormalAwardData.addItem(rewardsNormal[i]);
            this.listNormalAward.dataProvider = this.listNormalAwardData;
            this.listNormalAward.itemRenderer = GiftCommonAwardItem;

            this.listSeniorAwardData.removeAll();
            for (let i = 0; i < rewardsSenior.length; i++) this.listSeniorAwardData.addItem(rewardsSenior[i]);
            this.listSeniorAward.dataProvider = this.listSeniorAwardData;
            this.listSeniorAward.itemRenderer = GiftCommonAwardItem;

            let gap = 6;
            this.scrollerNormalAward.width = rewardsNormal.length * 63.6 + gap * (rewardsNormal.length - 1);
            this.scrollerSeniorAward.width = rewardsSenior.length * 63.6 + gap * (rewardsSenior.length - 1);
        }

        private setUI() {
            // 初级月卡
            let hasGetNormal: number = Number(this.monthCardData[0].info.dailyIndex) - Number(this.monthCardNormalData.daily_index) + Number(this.monthCardData[0].info.mark);
            let canGetNormal: number = Number(this.monthCardNormalData.daily_num) - hasGetNormal;
            this.btnGetNormal.enabled = (this.monthCardData[0].info.mark == 0);
            let remainDayNormal: number = this.monthCardData[0].info.buy_times * Number(this.monthCardNormalData.daily_num) - hasGetNormal;
            this.labelNormalTime.text = "剩余" + remainDayNormal + "天";
            this.btnBuyNormal.visible = this.monthCardData[0].info.buy_times < 1;
            this.groupNormalTime.visible = !(this.monthCardData[0].info.buy_times < 1);
            // this.imgRenewNormal.visible = canGetNormal <= 0;
            this.imgRenewNormal.visible = this.monthCardData[0].info.buy_times >= 1;

            // 高级月卡
            let hasGetSenior: number = Number(this.monthCardData[1].info.dailyIndex) - Number(this.monthCardSeniorData.daily_index) + Number(this.monthCardData[1].info.mark);
            let canGetSenior: number = Number(this.monthCardSeniorData.daily_num) - hasGetSenior;
            this.btnGetSenior.enabled = (this.monthCardData[1].info.mark == 0);
            let remainDaySenior: number = this.monthCardData[1].info.buy_times * Number(this.monthCardSeniorData.daily_num) - hasGetSenior;
            this.labelSeniorTime.text = "剩余" + remainDaySenior + "天";
            this.btnBuytSenior.visible = this.monthCardData[1].info.buy_times < 1;
            this.groupSeniorTime.visible = !(this.monthCardData[1].info.buy_times < 1);
            // this.imgRenewSenior.visible = canGetSenior <= 0;
            this.imgRenewSenior.visible = this.monthCardData[1].info.buy_times >= 1;
            Game.EventManager.event(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
        }

        private loadPayProducts() {
            let self = this;
            Game.PlayerPaySystem.queryAppProducts().then((resp: message.QueryAppProductsRespBody) => {
                self.pay(resp);
            });
        }

        private pay(resp: message.QueryAppProductsRespBody) {
            for (let v of resp.products) {
                for (let vv of resp.channel_products_ext) {
                    if (v.id == vv.id) {
                        let tmp: MyProductInfo = { id: "", name: "", describe: "", currency: "", amount: 0, amount_usd: 0, coin: 0, type: "", discount: "", cp_product_id: "", };
                        for (const k in tmp) tmp[k] = v[k];
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
            for (let k = 0; k < this.monthCardData.length; k++) {
                let giftInfo = PlayerGiftSystem.Instance_item(this.monthCardData[k].info.gift_index);
                let payIndex = TablePayIndex.Item(giftInfo.pay_index);
                for (const v of this.allProducts) {
                    if (v.coin == payIndex.raw_token) {
                        this.monthCardData[k].info['pay_tbl'] = Table.DeepCopy(v);
                        break;
                    }
                }

            }
        }

        private onBtnBuyNormal() {
            if (!this.btnBuyNormal.visible && !this.imgRenewNormal.visible) return;
            // this.btnBuyNormal.enabled = false;
            this.dealBuy(this.monthCardData[0].info, this.monthCardNormalData);
        }

        private onBtnBuySenior() {
            if (!this.btnBuytSenior.visible && !this.imgRenewSenior.visible) return;
            // this.btnBuytSenior.enabled = false;
            this.dealBuy(this.monthCardData[1].info, this.monthCardSeniorData);
        }

        private dealBuy(info: message.GiftInfo, giftItemInfo: TableNewgiftItem) {
            let giftInfo = PlayerGiftSystem.Instance_item(info.gift_index);
            if (giftInfo.pay_type == 1) {
                this.synGiftInfo(info, giftItemInfo);
            } else {
                this.requestButtonBuy(info, giftItemInfo);
            }
        }

        private synGiftInfo = (info: message.GiftInfo, giftItemInfo: TableNewgiftItem) => {
            Game.PlayerGiftSystem.getNewGift().then(() => {
                this.checkGiftExit(info, giftItemInfo);
            });
        }

        private checkGiftExit = (info: message.GiftInfo, giftItemInfo: TableNewgiftItem) => {
            Game.PlayerGiftSystem.newGiftExist(info.index).then(() => {
                this.requestButtonBuy(info, giftItemInfo);
            });
        }

        private requestButtonBuy(info: message.GiftInfo, giftItemInfo: TableNewgiftItem) {
            let self = this;
            this.thisBuy = true;
            if (giftItemInfo.pay_type == 1) {
                if (Util.getAppVersionInfo().channel == "test") {
                    Game.PlayerPaySystem.simulateCharge(info.index).then((resp: message.GameInfo) => {
                        // this.simulateCharge(resp, 0);
                        if (CommonConfig.month_card_fit.indexOf(info.gift_index) == 0) { // 购买的是初级月卡
                            this.btnBuyNormal.enabled = false;
                            self.init();
                        }
                        else if (CommonConfig.month_card_fit.indexOf(info.gift_index) == 1) { // 购买的是高级月卡
                            this.btnBuytSenior.enabled = false;
                            self.init();
                        }
                    }).catch((err) => {
                        // this.simulateCharge(null, err);
                        if (CommonConfig.month_card_fit.indexOf(info.gift_index) == 0) { // 购买的是初级月卡
                            this.btnBuyNormal.enabled = true;
                            self.init();
                        }
                        else if (CommonConfig.month_card_fit.indexOf(info.gift_index) == 1) { // 购买的是高级月卡
                            this.btnBuytSenior.enabled = true;
                            self.init();
                        }
                    });
                } else {
                    let strIndex = info.index;
                    if (info['pay_tbl']) {
                        platform.pay(PlayerPaySystem.GetProductId(giftItemInfo.pay_index, this.allProducts), 1, PlayerPaySystem.GetCpExtJson(strIndex));
                        self.init();
                    }
                }
            } else if (giftItemInfo.pay_type == 2) {
                Game.PlayerGiftSystem.rewardFormNewGift(info.index).then((gameInfo: message.GameInfo) => {
                    // this.simulateCharge(gameInfo, 0);
                    if (CommonConfig.month_card_fit.indexOf(info.gift_index) == 0) { // 购买的是初级月卡
                        this.btnBuyNormal.enabled = false;
                        self.init();
                    }
                    else if (CommonConfig.month_card_fit.indexOf(info.gift_index) == 1) { // 购买的是高级月卡
                        this.btnBuytSenior.enabled = false;
                        self.init();
                    }
                }).catch((err) => {
                    // this.simulateCharge(null, err);
                    if (CommonConfig.month_card_fit.indexOf(info.gift_index) == 0) { // 购买的是初级月卡
                        this.btnBuyNormal.enabled = true;
                        self.init();
                    }
                    else if (CommonConfig.month_card_fit.indexOf(info.gift_index) == 1) { // 购买的是高级月卡
                        this.btnBuytSenior.enabled = true;
                        self.init();
                    }
                });
            }
        }

        private onBtnGetNormal() {
            let self = this;
            if (this.monthCardNormalData.gift_form != 3) {
                Game.PlayerGiftSystem.rewardFormNewGift(this.monthCardData[0].info.index, this.monthCardData[0].info.dailyIndex).then((gameInfo: message.GameInfo) => {
                    if (gameInfo.getGoods.length > 0) {
                        loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(self.init());
                        });
                    }
                });
            } else {
                Game.PlayerGiftSystem.rewardNewGift(this.monthCardData[0].info.index).then((gameInfo: message.GameInfo) => {
                    if (gameInfo.getGoods.length > 0) {
                        loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(self.init());
                        });
                    }
                });
            }
        }

        private onBtnGetSenior() {
            let self = this;
            if (this.monthCardSeniorData.gift_form != 3) {
                Game.PlayerGiftSystem.rewardFormNewGift(this.monthCardData[1].info.index, this.monthCardData[1].info.dailyIndex).then((gameInfo: message.GameInfo) => {
                    if (gameInfo.getGoods.length > 0) {
                        loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(self.init());
                        });
                    }
                });
            } else {
                Game.PlayerGiftSystem.rewardNewGift(this.monthCardData[1].info.index).then((gameInfo: message.GameInfo) => {
                    if (gameInfo.getGoods.length > 0) {
                        loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(self.init());
                        });
                    }
                });
            }
        }

        private refreshInfo(ev: egret.Event) {
            let self = this;
            // if (!this.thisBuy) return;
            // this.thisBuy = false;
            let msg = (<message.RoleInfoNoticeRequest>ev.data).body;
            if (msg.gameInfo.getGoods.length > 0) {
                loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
                    dialog.show();
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.setCB(self.init());
                });
            }
            else {
                this.init();
            }
        }
    }
}