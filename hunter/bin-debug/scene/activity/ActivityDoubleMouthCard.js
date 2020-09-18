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
    //购双月卡送A级猎人
    //yuqingchao
    //2019.03.23
    var ActivityDoubleMouthCard = (function (_super) {
        __extends(ActivityDoubleMouthCard, _super);
        function ActivityDoubleMouthCard() {
            var _this = _super.call(this) || this;
            _this.juniorId = zj.CommonConfig.month_card_fit[0];
            _this.advancedId = zj.CommonConfig.month_card_fit[1];
            _this.saveBtnState = 0;
            _this.allProducts = [];
            _this.openDown = function () {
            };
            _this.skinName = "resource/skins/activity/ActivityDoubleMouthCardSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityDoubleMouthCard"], null);
            _this.btnGetHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetHunter, _this);
            _this.btnGetHunter.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGetHunterBegin, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnGetHunterEnd, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.btnMouthCardA.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMouthCardA, _this);
            _this.btnMouthCardB.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMouthCardB, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.init();
            return _this;
        }
        ActivityDoubleMouthCard.prototype.init = function () {
            this.juniorInfo = null;
            this.advancedInfo = null;
            this.juniorTbl = zj.PlayerGiftSystem.Instance_item(this.juniorId);
            this.advancedTbl = zj.PlayerGiftSystem.Instance_item(this.advancedId);
            this.saveBtnState = 0;
        };
        ActivityDoubleMouthCard.prototype.setInfo = function (info, father) {
            this.father = father;
            this.info = info;
            this.setInfoTime();
            this.setInfoMonthInfo();
            this.loadPayProducts();
        };
        //时间戳转换为字符串格式
        ActivityDoubleMouthCard.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityDoubleMouthCard.prototype.setInfoTime = function () {
            var strOpen = this.time(this.info.openTime);
            var timeOpen;
            if (strOpen.m < 10) {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + "0" + strOpen.m;
            }
            else {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + strOpen.m;
            }
            var strColse = this.time(this.info.closeTime);
            var timeColse;
            if (strColse.m < 10) {
                timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + "0" + strColse.m;
            }
            else {
                timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + strColse.m;
            }
            this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
            this.lbInfo.text = this.info.des;
        };
        ActivityDoubleMouthCard.prototype.setInfoMonthInfo = function () {
            var any = zj.Game.PlayerGiftSystem.giftInfos;
            var juniorInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == zj.CommonConfig.month_card_fit[0];
            })[0];
            var advancedInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == zj.CommonConfig.month_card_fit[1];
            })[0];
            this.juniorInfo = juniorInfo;
            this.advancedInfo = advancedInfo;
            if (juniorInfo == null || advancedInfo == null) {
                this.saveBtnState = 0;
            }
            var bJunBought = true;
            var bAdvBought = true;
            if (juniorInfo != null && this.juniorTbl != null) {
                bJunBought = this.juniorTbl.buy_times > this.juniorInfo.buy_times;
            }
            if (advancedInfo != null && this.advancedTbl != null) {
                bAdvBought = this.advancedTbl.buy_times > this.advancedInfo.buy_times;
            }
            if (!bJunBought) {
                this.btnMouthCardA.enabled = bJunBought;
            }
            if (!bAdvBought) {
                this.btnMouthCardB.enabled = bAdvBought;
            }
            var rewardHasGet = zj.Table.FindF(this.info.rewardIndex, function (k, v) {
                return v == 1;
            });
            if (rewardHasGet) {
                this.saveBtnState = 2;
                this.imgGetHunterTip.visible = true;
                this.imgGetHunterTip.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.spriteGet[2], this);
                this.btnGetHunter.getChildAt(0).source = zj.cachekey(zj.UIConfig.UIConfig_Activity.doubleMonth[3][0], this);
            }
            else {
                if (!bJunBought && !bAdvBought) {
                    this.saveBtnState = 1;
                    this.imgGetHunterTip.visible = false;
                    this.btnGetHunter.getChildAt(0).source = zj.cachekey(zj.UIConfig.UIConfig_Activity.doubleMonth[2][0], this);
                    this.GetAwardAni();
                }
                else {
                    this.saveBtnState = 0;
                    this.imgGetHunterTip.visible = false;
                    this.btnGetHunter.getChildAt(0).source = zj.cachekey(zj.UIConfig.UIConfig_Activity.doubleMonth[1][0], this);
                }
            }
            // if (this.saveBtnState == 0) {
            // 	this.imgGetHunterTip.visible = false;
            // 	(this.btnGetHunter.getChildAt(0) as eui.Image).source = cachekey(UIConfig.UIConfig_Activity.doubleMonth[1][0], this);
            // }
            // else if (this.saveBtnState == 1) {
            // 	this.imgGetHunterTip.visible = false;
            // 	(this.btnGetHunter.getChildAt(0) as eui.Image).source = cachekey(UIConfig.UIConfig_Activity.doubleMonth[2][0], this);
            // }
            // else if (this.saveBtnState == 2) {
            // 	this.imgGetHunterTip.visible = true;
            // 	this.imgGetHunterTip.source = cachekey(UIConfig.UIConfig_Activity.spriteGet[2], this);
            // 	(this.btnGetHunter.getChildAt(0) as eui.Image).source = cachekey(UIConfig.UIConfig_Activity.doubleMonth[3][0], this);
            // }
        };
        ActivityDoubleMouthCard.prototype.loadPayProducts = function () {
            var _this = this;
            zj.Game.PlayerPaySystem.queryAppProducts().then(function (resp) {
                for (var _i = 0, _a = resp.products; _i < _a.length; _i++) {
                    var v = _a[_i];
                    for (var _b = 0, _c = resp.channel_products_ext; _b < _c.length; _b++) {
                        var vv = _c[_b];
                        if (v.id == vv.id) {
                            var tmp = {
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
                            for (var k in tmp) {
                                tmp[k] = v[k];
                            }
                            tmp.cp_product_id = vv.cp_product_id;
                            _this.allProducts.push(tmp);
                            break;
                        }
                    }
                }
                var all = _this.allProducts;
                _this.setInfoPayInfo();
                var i = 0;
                while (i < _this.allProducts.length) {
                    if (zj.PlayerPaySystem.PayItemByID(_this.allProducts[i].cp_product_id) == null) {
                        _this.allProducts.splice(i, 1);
                    }
                    else {
                        i = i + 1;
                    }
                }
                _this.allProducts.sort(function (a, b) {
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
            });
        };
        ActivityDoubleMouthCard.prototype.setInfoPayInfo = function () {
            var tablePay = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.pay + ".json");
            var payIndexJun = tablePay[this.juniorTbl.pay_index];
            var payIndexAdv = tablePay[this.advancedTbl.pay_index];
            var payTblJun = null;
            var payTblAdv = null;
            var any = this.allProducts;
            for (var _i = 0, _a = this.allProducts; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.coin == payIndexJun.raw_token) {
                    payTblJun = zj.Table.DeepCopy(v);
                }
                if (v.coin == payIndexAdv.raw_token) {
                    payTblAdv = zj.Table.DeepCopy(v);
                }
            }
            if (payTblJun != null) {
                var num = payTblJun.Currency;
                var strUnit = zj.Set.CashUnit(payTblJun.Currency);
                var strMoney = payTblJun.amount;
                this.lbOne.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.month_price1, strUnit, strMoney);
            }
            else {
                this.lbOne.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
            }
            if (payTblAdv != null) {
                var num = payTblAdv.Currency;
                var strUnit = zj.Set.CashUnit(payTblAdv.Currency);
                var strMoney = payTblAdv.amount;
                this.lbMore.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.month_price2, strUnit, strMoney);
            }
            else {
                this.lbMore.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.no_point));
            }
        };
        ActivityDoubleMouthCard.prototype.onBtnMouthCardA = function () {
            var _this = this;
            if (this.juniorInfo != null) {
                zj.loadUI(zj.GiftTimeNode)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.juniorInfo);
                    dialog.CB = function () {
                        _this.father.setInit(true);
                        _this.setInfoMonthInfo();
                    };
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.cannotBuyReason);
            }
        };
        ActivityDoubleMouthCard.prototype.onBtnMouthCardB = function () {
            var _this = this;
            if (this.advancedInfo != null) {
                zj.loadUI(zj.GiftTimeNode)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.advancedInfo);
                    dialog.CB = function () {
                        _this.father.setInit(true);
                        _this.setInfoMonthInfo();
                    };
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.cannotBuyReason);
            }
        };
        ActivityDoubleMouthCard.prototype.onBtnGetHunter = function () {
            var _this = this;
            if (this.saveBtnState == 0) {
                zj.loadUI(zj.Daily_AwardPop)
                    .then(function (dialog) {
                    dialog.SetInfoGift(_this.info.rewards[0].goodsInfo, null, null);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (this.saveBtnState == 1) {
                var type = this.info.type;
                var index = this.info.index;
                var rewardIndex = 1;
                zj.Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then(function (resp) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(resp.getGoods);
                        dialog.show();
                        dialog.setCB(function () {
                            _this.father.setInit(true);
                            _this.setInfoMonthInfo();
                            zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_TYPE_UPDATE);
                        });
                    });
                }).catch(function () {
                });
            }
        };
        ActivityDoubleMouthCard.prototype.onBtnGetHunterBegin = function () {
            this.btnGetHunter.scaleX = 1;
            this.btnGetHunter.scaleY = 1;
        };
        ActivityDoubleMouthCard.prototype.onBtnGetHunterEnd = function () {
            this.btnGetHunter.scaleX = 0.8;
            this.btnGetHunter.scaleY = 0.8;
        };
        ActivityDoubleMouthCard.prototype.onTouchBegin = function () {
            if (this)
                this.setInfoMonthInfo();
        };
        ActivityDoubleMouthCard.prototype.GetAwardAni = function () {
            var a = this.btnGetHunter.y;
            var tw = egret.Tween.get(this.btnGetHunter, { loop: true }); //
            egret.Tween.get(this.btnGetHunter, { loop: true }).to({ rotation: -5 }, 100).to({ rotation: 5 }, 200).to({ rotation: 0 }, 100).to({ rotation: -5 }, 100).to({ rotation: 0 }, 100)
                .wait(1400);
            egret.Tween.get(this.btnGetHunter, { loop: true }).to({ scaleY: 0.9 }, 600).wait(400)
                .to({ scaleY: 0.8 }, 600).wait(400);
            egret.Tween.get(this.btnGetHunter, { loop: true }).to({ y: 150 }, 1000)
                .to({ y: 179.5 }, 1000);
        };
        return ActivityDoubleMouthCard;
    }(zj.UI));
    zj.ActivityDoubleMouthCard = ActivityDoubleMouthCard;
    __reflect(ActivityDoubleMouthCard.prototype, "zj.ActivityDoubleMouthCard");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityDoubleMouthCard.js.map