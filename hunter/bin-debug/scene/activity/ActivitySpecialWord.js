var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    /**
     * @class 福利-超值月卡
     *
     * @author LianLei
     *
     * @date 2019-12-02
     */
    var ActivitySpecialWord = (function (_super) {
        __extends(ActivitySpecialWord, _super);
        function ActivitySpecialWord() {
            var _this = _super.call(this) || this;
            _this.allProducts = [];
            _this.monthCardData = [];
            _this.monthCardNormalData = null;
            _this.monthCardSeniorData = null;
            _this.listNormalAwardData = new eui.ArrayCollection();
            _this.listSeniorAwardData = new eui.ArrayCollection();
            _this.thisBuy = false;
            _this.synGiftInfo = function (info, giftItemInfo) {
                zj.Game.PlayerGiftSystem.getNewGift().then(function () {
                    _this.checkGiftExit(info, giftItemInfo);
                });
            };
            _this.checkGiftExit = function (info, giftItemInfo) {
                zj.Game.PlayerGiftSystem.newGiftExist(info.index).then(function () {
                    _this.requestButtonBuy(info, giftItemInfo);
                });
            };
            _this.skinName = "resource/skins/activity/ActivitySpecialWordSkin.exml";
            _this.btnBuyNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuyNormal, _this);
            _this.btnBuytSenior.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuySenior, _this);
            _this.btnGetNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetNormal, _this);
            _this.btnGetSenior.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetSenior, _this);
            _this.imgRenewNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuyNormal, _this);
            _this.imgRenewSenior.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuySenior, _this);
            _this.imgNormalMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuyNormal, _this);
            _this.imgSeniorMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuySenior, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_GIFTS_INFO_CHANGE, _this.init, _this);
            }, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_GIFTS_INFO_CHANGE, _this.init, _this);
            var gift = zj.Table.FindF(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                return v.gift_index == 100203 || v.gift_index == 100204;
            });
            var charge = zj.Table.FindF(zj.PlayerGiftSystem.SortCharge(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                return v.gift_index == 100203 || v.gift_index == 100204;
            });
            if (!gift && !charge) {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            }
            return _this;
        }
        ActivitySpecialWord.prototype.init = function () {
            this.loadData();
            this.loadPayProducts();
            if (this.monthCardNormalData) {
                this.setInfoAward();
            }
        };
        ActivitySpecialWord.prototype.loadData = function () {
            this.monthCardData = [];
            var tbl = [];
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
            for (var i = 0; i < zj.Game.PlayerGiftSystem.giftInfos.length; i++) {
                if (zj.Game.PlayerGiftSystem.giftInfos[i].gift_index == 100203 || zj.Game.PlayerGiftSystem.giftInfos[i].gift_index == 100204) {
                    this.monthCardData.push({ info: zj.Game.PlayerGiftSystem.giftInfos[i] });
                }
            }
            if (this.monthCardData.length == 0) {
                zj.Game.EventManager.off(zj.GameEvent.PLAYER_GIFTS_INFO_CHANGE, this.init, this);
                return;
            }
            this.monthCardData.sort(function (a, b) { return a.info.gift_index - b.info.gift_index; });
            this.monthCardNormalData = null;
            this.monthCardSeniorData = null;
            for (var i = 0; i < this.monthCardData.length; i++) {
                if (zj.CommonConfig.month_card_fit.indexOf(this.monthCardData[i].info.gift_index) == -1)
                    return;
            }
            this.monthCardNormalData = zj.PlayerGiftSystem.Instance_item(this.monthCardData[0].info.gift_index);
            this.monthCardSeniorData = zj.PlayerGiftSystem.Instance_item(this.monthCardData[1].info.gift_index);
            this.setUI();
        };
        ActivitySpecialWord.prototype.setInfoAward = function () {
            var rewardsNormal = [];
            var rewardsSenior = [];
            if (this.monthCardNormalData.pay_type == 3) {
                var firstDailyIndex = Number(this.monthCardNormalData.daily_index);
                var firstDailyTbl = zj.PlayerGiftSystem.Instance_days(firstDailyIndex);
                for (var i = 0; i < firstDailyTbl.goods_id.length; i++) {
                    var good = new message.GoodsInfo();
                    good.goodsId = firstDailyTbl.goods_id[i];
                    good.count = firstDailyTbl.goods_count[i];
                    rewardsNormal.push(good);
                }
            }
            else {
                for (var i = 0; i < this.monthCardNormalData.goods_id.length; i++) {
                    var good_1 = new message.GoodsInfo();
                    good_1.goodsId = this.monthCardNormalData.goods_id[i];
                    if (this.monthCardNormalData.goods_id[i] == message.EResourceType.RESOURCE_TOKEN) {
                        good_1.count = this.monthCardNormalData.goods_count[i] + this.monthCardNormalData.raw_token;
                    }
                    else {
                        good_1.count = this.monthCardNormalData.goods_count[i];
                    }
                    rewardsNormal.push(good_1);
                }
                var good = new message.GoodsInfo();
                good.goodsId = message.EResourceType.RESOURCE_TOKEN;
                good.count = this.monthCardNormalData.raw_token;
                var findToken = zj.Table.FindF(rewardsNormal, function (k, v) {
                    return v.goodId == message.EResourceType.RESOURCE_TOKEN;
                });
                if (!findToken && good.count != 0)
                    rewardsNormal.splice(0, 0, good);
            }
            if (this.monthCardSeniorData.pay_type == 3) {
                var firstDailyIndex = Number(this.monthCardSeniorData.daily_index);
                var firstDailyTbl = zj.PlayerGiftSystem.Instance_days(firstDailyIndex);
                for (var i = 0; i < firstDailyTbl.goods_id.length; i++) {
                    var good = new message.GoodsInfo();
                    good.goodsId = firstDailyTbl.goods_id[i];
                    good.count = firstDailyTbl.goods_count[i];
                    rewardsSenior.push(good);
                }
            }
            else {
                for (var i = 0; i < this.monthCardSeniorData.goods_id.length; i++) {
                    var good_2 = new message.GoodsInfo();
                    good_2.goodsId = this.monthCardSeniorData.goods_id[i];
                    if (this.monthCardSeniorData.goods_id[i] == message.EResourceType.RESOURCE_TOKEN) {
                        good_2.count = this.monthCardSeniorData.goods_count[i] + this.monthCardSeniorData.raw_token;
                    }
                    else {
                        good_2.count = this.monthCardSeniorData.goods_count[i];
                    }
                    rewardsSenior.push(good_2);
                }
                var good = new message.GoodsInfo();
                good.goodsId = message.EResourceType.RESOURCE_TOKEN;
                good.count = this.monthCardSeniorData.raw_token;
                var findToken = zj.Table.FindF(rewardsSenior, function (k, v) {
                    return v.goodId == message.EResourceType.RESOURCE_TOKEN;
                });
                if (!findToken && good.count != 0)
                    rewardsSenior.splice(0, 0, good);
            }
            this.listNormalAwardData.removeAll();
            for (var i = 0; i < rewardsNormal.length; i++)
                this.listNormalAwardData.addItem(rewardsNormal[i]);
            this.listNormalAward.dataProvider = this.listNormalAwardData;
            this.listNormalAward.itemRenderer = zj.GiftCommonAwardItem;
            this.listSeniorAwardData.removeAll();
            for (var i = 0; i < rewardsSenior.length; i++)
                this.listSeniorAwardData.addItem(rewardsSenior[i]);
            this.listSeniorAward.dataProvider = this.listSeniorAwardData;
            this.listSeniorAward.itemRenderer = zj.GiftCommonAwardItem;
            var gap = 6;
            this.scrollerNormalAward.width = rewardsNormal.length * 63.6 + gap * (rewardsNormal.length - 1);
            this.scrollerSeniorAward.width = rewardsSenior.length * 63.6 + gap * (rewardsSenior.length - 1);
        };
        ActivitySpecialWord.prototype.setUI = function () {
            // 初级月卡
            var hasGetNormal = Number(this.monthCardData[0].info.dailyIndex) - Number(this.monthCardNormalData.daily_index) + Number(this.monthCardData[0].info.mark);
            var canGetNormal = Number(this.monthCardNormalData.daily_num) - hasGetNormal;
            this.btnGetNormal.enabled = (this.monthCardData[0].info.mark == 0);
            var remainDayNormal = this.monthCardData[0].info.buy_times * Number(this.monthCardNormalData.daily_num) - hasGetNormal;
            this.labelNormalTime.text = "剩余" + remainDayNormal + "天";
            this.btnBuyNormal.visible = this.monthCardData[0].info.buy_times < 1;
            this.groupNormalTime.visible = !(this.monthCardData[0].info.buy_times < 1);
            // this.imgRenewNormal.visible = canGetNormal <= 0;
            this.imgRenewNormal.visible = this.monthCardData[0].info.buy_times >= 1;
            // 高级月卡
            var hasGetSenior = Number(this.monthCardData[1].info.dailyIndex) - Number(this.monthCardSeniorData.daily_index) + Number(this.monthCardData[1].info.mark);
            var canGetSenior = Number(this.monthCardSeniorData.daily_num) - hasGetSenior;
            this.btnGetSenior.enabled = (this.monthCardData[1].info.mark == 0);
            var remainDaySenior = this.monthCardData[1].info.buy_times * Number(this.monthCardSeniorData.daily_num) - hasGetSenior;
            this.labelSeniorTime.text = "剩余" + remainDaySenior + "天";
            this.btnBuytSenior.visible = this.monthCardData[1].info.buy_times < 1;
            this.groupSeniorTime.visible = !(this.monthCardData[1].info.buy_times < 1);
            // this.imgRenewSenior.visible = canGetSenior <= 0;
            this.imgRenewSenior.visible = this.monthCardData[1].info.buy_times >= 1;
            zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
        };
        ActivitySpecialWord.prototype.loadPayProducts = function () {
            var self = this;
            zj.Game.PlayerPaySystem.queryAppProducts().then(function (resp) {
                self.pay(resp);
            });
        };
        ActivitySpecialWord.prototype.pay = function (resp) {
            for (var _i = 0, _a = resp.products; _i < _a.length; _i++) {
                var v = _a[_i];
                for (var _b = 0, _c = resp.channel_products_ext; _b < _c.length; _b++) {
                    var vv = _c[_b];
                    if (v.id == vv.id) {
                        var tmp = { id: "", name: "", describe: "", currency: "", amount: 0, amount_usd: 0, coin: 0, type: "", discount: "", cp_product_id: "", };
                        for (var k in tmp)
                            tmp[k] = v[k];
                        tmp.cp_product_id = vv.cp_product_id;
                        this.allProducts.push(tmp);
                        break;
                    }
                }
            }
            var i = 0;
            while (i < this.allProducts.length) {
                if (zj.PlayerPaySystem.PayItemByID(this.allProducts[i].cp_product_id) == null) {
                    this.allProducts.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
            this.allProducts.sort(function (a, b) {
                var itemA = zj.PlayerPaySystem.PayItemByID(a.cp_product_id);
                var itemB = zj.PlayerPaySystem.PayItemByID(b.cp_product_id);
                if (itemA == null)
                    return 1;
                if (itemB == null)
                    return -1;
                if (itemA.sort_index == itemB.sort_index) {
                    return b.amount - a.amount;
                }
                else {
                    return itemA.sort_index - itemB.sort_index;
                }
            });
            for (var k = 0; k < this.monthCardData.length; k++) {
                var giftInfo = zj.PlayerGiftSystem.Instance_item(this.monthCardData[k].info.gift_index);
                var payIndex = zj.TablePayIndex.Item(giftInfo.pay_index);
                for (var _d = 0, _e = this.allProducts; _d < _e.length; _d++) {
                    var v = _e[_d];
                    if (v.coin == payIndex.raw_token) {
                        this.monthCardData[k].info['pay_tbl'] = zj.Table.DeepCopy(v);
                        break;
                    }
                }
            }
        };
        ActivitySpecialWord.prototype.onBtnBuyNormal = function () {
            if (!this.btnBuyNormal.visible && !this.imgRenewNormal.visible)
                return;
            // this.btnBuyNormal.enabled = false;
            this.dealBuy(this.monthCardData[0].info, this.monthCardNormalData);
        };
        ActivitySpecialWord.prototype.onBtnBuySenior = function () {
            if (!this.btnBuytSenior.visible && !this.imgRenewSenior.visible)
                return;
            // this.btnBuytSenior.enabled = false;
            this.dealBuy(this.monthCardData[1].info, this.monthCardSeniorData);
        };
        ActivitySpecialWord.prototype.dealBuy = function (info, giftItemInfo) {
            var giftInfo = zj.PlayerGiftSystem.Instance_item(info.gift_index);
            if (giftInfo.pay_type == 1) {
                this.synGiftInfo(info, giftItemInfo);
            }
            else {
                this.requestButtonBuy(info, giftItemInfo);
            }
        };
        ActivitySpecialWord.prototype.requestButtonBuy = function (info, giftItemInfo) {
            var _this = this;
            var self = this;
            this.thisBuy = true;
            if (giftItemInfo.pay_type == 1) {
                if (zj.Util.getAppVersionInfo().channel == "test") {
                    zj.Game.PlayerPaySystem.simulateCharge(info.index).then(function (resp) {
                        // this.simulateCharge(resp, 0);
                        if (zj.CommonConfig.month_card_fit.indexOf(info.gift_index) == 0) {
                            _this.btnBuyNormal.enabled = false;
                            self.init();
                        }
                        else if (zj.CommonConfig.month_card_fit.indexOf(info.gift_index) == 1) {
                            _this.btnBuytSenior.enabled = false;
                            self.init();
                        }
                    }).catch(function (err) {
                        // this.simulateCharge(null, err);
                        if (zj.CommonConfig.month_card_fit.indexOf(info.gift_index) == 0) {
                            _this.btnBuyNormal.enabled = true;
                            self.init();
                        }
                        else if (zj.CommonConfig.month_card_fit.indexOf(info.gift_index) == 1) {
                            _this.btnBuytSenior.enabled = true;
                            self.init();
                        }
                    });
                }
                else {
                    var strIndex = info.index;
                    if (info['pay_tbl']) {
                        zj.platform.pay(zj.PlayerPaySystem.GetProductId(giftItemInfo.pay_index, this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex));
                        self.init();
                    }
                }
            }
            else if (giftItemInfo.pay_type == 2) {
                zj.Game.PlayerGiftSystem.rewardFormNewGift(info.index).then(function (gameInfo) {
                    // this.simulateCharge(gameInfo, 0);
                    if (zj.CommonConfig.month_card_fit.indexOf(info.gift_index) == 0) {
                        _this.btnBuyNormal.enabled = false;
                        self.init();
                    }
                    else if (zj.CommonConfig.month_card_fit.indexOf(info.gift_index) == 1) {
                        _this.btnBuytSenior.enabled = false;
                        self.init();
                    }
                }).catch(function (err) {
                    // this.simulateCharge(null, err);
                    if (zj.CommonConfig.month_card_fit.indexOf(info.gift_index) == 0) {
                        _this.btnBuyNormal.enabled = true;
                        self.init();
                    }
                    else if (zj.CommonConfig.month_card_fit.indexOf(info.gift_index) == 1) {
                        _this.btnBuytSenior.enabled = true;
                        self.init();
                    }
                });
            }
        };
        ActivitySpecialWord.prototype.onBtnGetNormal = function () {
            var self = this;
            if (this.monthCardNormalData.gift_form != 3) {
                zj.Game.PlayerGiftSystem.rewardFormNewGift(this.monthCardData[0].info.index, this.monthCardData[0].info.dailyIndex).then(function (gameInfo) {
                    if (gameInfo.getGoods.length > 0) {
                        zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(self.init());
                        });
                    }
                });
            }
            else {
                zj.Game.PlayerGiftSystem.rewardNewGift(this.monthCardData[0].info.index).then(function (gameInfo) {
                    if (gameInfo.getGoods.length > 0) {
                        zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(self.init());
                        });
                    }
                });
            }
        };
        ActivitySpecialWord.prototype.onBtnGetSenior = function () {
            var self = this;
            if (this.monthCardSeniorData.gift_form != 3) {
                zj.Game.PlayerGiftSystem.rewardFormNewGift(this.monthCardData[1].info.index, this.monthCardData[1].info.dailyIndex).then(function (gameInfo) {
                    if (gameInfo.getGoods.length > 0) {
                        zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(self.init());
                        });
                    }
                });
            }
            else {
                zj.Game.PlayerGiftSystem.rewardNewGift(this.monthCardData[1].info.index).then(function (gameInfo) {
                    if (gameInfo.getGoods.length > 0) {
                        zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(self.init());
                        });
                    }
                });
            }
        };
        ActivitySpecialWord.prototype.refreshInfo = function (ev) {
            var self = this;
            // if (!this.thisBuy) return;
            // this.thisBuy = false;
            var msg = ev.data.body;
            if (msg.gameInfo.getGoods.length > 0) {
                zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                    dialog.show();
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.setCB(self.init());
                });
            }
            else {
                this.init();
            }
        };
        return ActivitySpecialWord;
    }(zj.UI));
    zj.ActivitySpecialWord = ActivitySpecialWord;
    __reflect(ActivitySpecialWord.prototype, "zj.ActivitySpecialWord");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialWord.js.map