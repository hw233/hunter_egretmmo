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
    // 商城item
    // lizhengiang
    // 20190326
    var PayMallItem = (function (_super) {
        __extends(PayMallItem, _super);
        function PayMallItem() {
            var _this = _super.call(this) || this;
            _this.info = null;
            _this.fatherType = null;
            _this.allProducts = [];
            _this.skinName = "resource/skins/pay/PayMallItemSkin.exml";
            zj.cachekeys(zj.UIResource["PayMallItem"], null);
            _this.btnItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnItem, _this);
            return _this;
        }
        PayMallItem.prototype.init = function () {
            this.imgIcon.visible = true;
            this.groupB.visible = true;
            this.lbNameB.visible = true;
            this.imgDiscount.visible = true;
            this.lbDis.visible = true;
            this.imgDouble.visible = true;
            this.groupA.visible = true;
            this.imgType.visible = true;
            this.groupAB.visible = true;
            this.lbGetNum.visible = true;
            this.lbEndNum.visible = true;
            this.lbEndNum_.visible = true;
            this.imgV3.visible = true;
            this.imgGestone.visible = true;
            this.lbNameA.visible = true;
            this.lbValue.visible = true;
            this.imgTips.visible = true;
            this.lbCostB.visible = true;
            this.groupC.visible = true;
            this.imgShadow.visible = true;
            this.imgBuy.visible = true;
            this.groupC.visible = false;
            this.imgShadow.visible = true;
            this.lbValue.visible = false;
            this.imgGestone.visible = false;
            this.imgTips.visible = false;
            this.imgV3.visible = false;
        };
        PayMallItem.prototype.dataChanged = function () {
            this.info = this.data.info;
            this.fatherType = this.data.type;
            this.allProducts = this.data.allProducts;
            this.type = null;
            this.item = null;
            this.init();
            if (this.fatherType == zj.TableEnum.Enum.HXHChargeType.Charge && this.info["gift_index"] == null) {
                this.item = zj.PlayerPaySystem.PayItemByID(this.info.cp_product_id);
                this.groupA.visible = false;
                this.groupB.visible = true;
                if (this.item == null) {
                    this.setInfoDefault();
                }
                else {
                    this.setInfoCharge();
                }
            }
            else if (this.fatherType == zj.TableEnum.Enum.HXHChargeType.Charge && this.info["gift_index"] != null) {
                this.groupB.visible = false;
                this.setInfoGiftItem();
            }
            else if (this.fatherType == zj.TableEnum.Enum.HXHChargeType.Gift || this.fatherType == zj.TableEnum.Enum.HXHChargeType.Op || this.fatherType == zj.TableEnum.Enum.HXHChargeType.Vip) {
                this.groupB.visible = false;
                this.setInfoGiftItem();
            }
            if (zj.Device.isReviewSwitch) {
                this.imgType.visible = false;
                this.groupAB.visible = false;
                this.imgDouble.visible = false;
                this.imgDiscount.visible = false;
                this.lbDis.visible = false;
            }
        };
        PayMallItem.prototype.setInfoGiftItem = function () {
            var info = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.type = info.gift_form;
            this.lbEndNum.visible = false;
            this.lbEndNum_.visible = false;
            if (zj.PlayerItemSystem.Type2(this.info["mark"]) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                this.lbCostB.text = info.name + "(" + zj.PlayerHunterSystem.Table(this.info["mark"]).general_name + ")";
            }
            else {
                this.lbCostB.text = info.name;
            }
            this.imgIcon.source = zj.cachekey(info.path, this);
            if (this.type == 1) {
                var perGet = "";
                if (this.info["buy_times"] < info.buy_times) {
                    perGet = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.all_limit.limit, 0, 249, 0, info.buy_times - this.info["buy_times"]);
                }
                else {
                    perGet = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.all_limit.limit, 255, 38, 38, info.buy_times - this.info["buy_times"]);
                }
                this.lbGetNum.textFlow = zj.Util.RichText(perGet);
                this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[1], this);
                if (info.is_forever == 1) {
                    this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[3], this);
                }
                var tipShow = zj.Tips.tips_oneday_get(Number(this.info["gift_index"].toString() + this.info["index"].toString()));
                if (tipShow && this.info["buy_times"] == info.buy_times) {
                    tipShow = false;
                    zj.Tips.tips_oneday_set(Number(this.info["gift_index"].toString() + this.info["index"].toString()), true);
                }
                this.imgTips.visible = tipShow;
                var soldOut = zj.PlayerGiftSystem.UpToStock(this.info["trigger_time"] + info.duration - zj.Game.Controller.curServerTime);
                this.lbEndNum_.visible = true;
                this.lbEndNum_.textFlow = zj.Util.RichText(soldOut);
                if (info.is_forever == 1) {
                    this.lbEndNum_.visible = false;
                }
                this.imgBuy.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.getorbuy[0], this);
                this.groupC.visible = (this.info["buy_times"] == info.buy_times);
                if (info.pay_type == 1) {
                    var payIndex = zj.TablePayIndex.Item(info.pay_index);
                    var payTbl = null;
                    for (var _i = 0, _a = this.allProducts; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (v.coin == payIndex.raw_token) {
                            payTbl = zj.Table.DeepCopy(v);
                            break;
                        }
                    }
                    this.lbNameA.visible = true;
                    if (payTbl != null) {
                        this.info["pay_tbl"] = {};
                        this.info["pay_tbl"] = payTbl;
                        this.lbNameA.text = zj.Set.CashUnit(payTbl["currency"]) + payTbl["amount"];
                    }
                    else {
                        this.lbNameA.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
                    }
                }
                else if (info.pay_type == 2) {
                    this.lbNameA.text = info.price.toString();
                    this.lbNameA.visible = true;
                    this.imgGestone.visible = true;
                }
            }
            else if (this.type == 2 || this.type == 4) {
                if (this.type == 2) {
                    var getStr = "";
                    if (this.info["buy_times"] > info.buy_times) {
                        getStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.count_limit.day_last, 0, 249, 0, info.buy_times - this.info["buy_times"]);
                    }
                    else {
                        getStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.count_limit.day_last, 255, 38, 38, info.buy_times - this.info["buy_times"]);
                    }
                    if (info.buy_times < 100) {
                        this.lbEndNum_.visible = true;
                        this.lbEndNum_.textFlow = zj.Util.RichText(getStr);
                        this.lbGetNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.count_limit.day_buy, info.buy_times));
                    }
                    else {
                        this.groupAB.visible = false;
                        this.imgType.visible = false;
                        this.lbEndNum.visible = true;
                        this.lbEndNum.text = zj.TextsConfig.TextsConfig_Hunter_Pay.not_limit_buy;
                        this.lbGetNum.text = zj.TextsConfig.TextsConfig_Hunter_Pay.not_limit;
                    }
                }
                else if (this.type == 4) {
                    var getStr = "";
                    if (info.buy_times > this.info["buy_times"]) {
                        getStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.count_limit.week_last, 0, 249, 0, info.buy_times - this.info["buy_times"]);
                    }
                    else {
                        getStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.count_limit.week_last, 255, 38, 38, info.buy_times - this.info["buy_times"]);
                    }
                    if (info.buy_times < 100) {
                        this.lbEndNum_.visible = true;
                        this.lbEndNum_.textFlow = zj.Util.RichText(getStr);
                        this.lbGetNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.count_limit.week_buy, info.buy_times));
                    }
                    else {
                        this.groupAB.visible = false;
                        this.imgType.visible = false;
                        this.lbEndNum.visible = true;
                        this.lbEndNum.text = zj.TextsConfig.TextsConfig_Hunter_Pay.not_limit_buy;
                        this.lbGetNum.text = zj.TextsConfig.TextsConfig_Hunter_Pay.not_limit;
                    }
                }
                this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[3], this);
                this.imgBuy.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.getorbuy[0], this);
                this.groupC.visible = (this.info["buy_times"] == info.buy_times);
                var tipShow = zj.Tips.tips_oneday_get(Number(this.info["gift_index"].toString() + this.info["index"].toString()));
                if (tipShow && this.info["buy_times"] == info.buy_times) {
                    tipShow = false;
                    zj.Tips.tips_oneday_set(Number(this.info["gift_index"].toString() + this.info["index"].toString()), true);
                }
                this.imgTips.visible = tipShow;
                if (info.pay_type == 1) {
                    var payIndex = zj.TablePayIndex.Item(info.pay_index);
                    var payTbl = null;
                    for (var _b = 0, _c = this.allProducts; _b < _c.length; _b++) {
                        var v = _c[_b];
                        if (v.coin == payIndex.raw_token) {
                            payTbl = zj.Table.DeepCopy(v);
                        }
                    }
                    this.lbNameA.visible = true;
                    if (payTbl != null) {
                        this.info["pay_tbl"] = {};
                        this.info["pay_tbl"] = payTbl;
                        this.lbNameA.text = zj.Set.CashUnit(payTbl["currency"]) + payTbl["amount"];
                    }
                    else {
                        this.lbNameA.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
                    }
                }
                else if (info.pay_type == 2) {
                    this.lbNameA.text = info.price.toString();
                    this.lbNameA.visible = true;
                    this.imgGestone.visible = true;
                }
            }
            else if (this.type == 3) {
                var buyTimes = this.info["buy_times"] == 0 ? this.info["dailyIndex"] % 100 - 1 : this.info["dailyIndex"] % 100;
                var perGet = "";
                if (this.info["buy_times"] == 0) {
                    var color = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.time_limit.per_str, buyTimes, info.daily_num);
                    perGet = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, color);
                }
                else {
                    var color = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.time_limit.per_str, buyTimes, info.daily_num);
                    perGet = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, color);
                }
                var strGet = zj.TextsConfig.TextsConfig_Gift.gift.time_limit.get_pro;
                var strToDate = zj.PlayerGiftSystem.UpToTime(this.info["trigger_time"] + info.duration - zj.Game.Controller.curServerTime);
                var strHasget = this.info["buy_times"] == 0 ? zj.TextsConfig.TextsConfig_Gift.gift.time_limit.can_get : zj.TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
                var tipShow = (this.info["buy_times"] == 0);
                this.lbNameA.visible = false;
                this.imgBuy.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.getorbuy[1], this);
                this.groupC.visible = (this.info["buy_times"] != 0);
                this.imgShadow.visible = false;
                this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[2], this);
                this.imgTips.visible = tipShow;
                this.lbGetNum.textFlow = zj.Util.RichText(strGet + perGet);
                this.lbEndNum_.visible = true;
                this.lbEndNum_.textFlow = zj.Util.RichText(strToDate);
                this.lbValue.visible = true;
                this.lbValue.textFlow = zj.Util.RichText(strHasget);
            }
            else if (this.type == 5) {
                this.groupAB.visible = false;
                if (info.pay_type == 3) {
                    // 免费领取类型
                    this.lbNameA.visible = false;
                    var hasGet = (this.info["dailyIndex"] - Number(info.daily_index) + this.info["mark"]).toString();
                    var allGet = info.daily_num;
                    var strGet = zj.TextsConfig.TextsConfig_Gift.gift.time_limit.get_pro;
                    var strPer = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.time_limit.per_str2, hasGet, allGet);
                    var strHasget = "";
                    if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                        strHasget = zj.TextsConfig.TextsConfig_Gift.gift.free;
                    }
                    else if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 1) {
                        strHasget = zj.TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
                    }
                    else {
                        strHasget = this.info["mark"] == 0 ? zj.TextsConfig.TextsConfig_Gift.gift.time_limit.can_get : zj.TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
                    }
                    this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[5], this);
                    if (this.info["dailyIndex"] == info.daily_index) {
                        // 第一天
                        this.lbEndNum_.visible = false;
                    }
                    else {
                        this.lbEndNum_.visible = true;
                        this.lbEndNum_.textFlow = zj.Util.RichText(strGet + strPer);
                    }
                    this.imgBuy.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.getorbuy[1], this);
                    this.groupC.visible = (this.info["mark"] != 0);
                    this.imgShadow.visible = false;
                    this.lbValue.visible = true;
                    this.lbValue.textFlow = zj.Util.RichText(strHasget);
                    this.imgTips.visible = (this.info["mark"] == 0);
                }
                else {
                    if (this.info["buy_times"] < info.buy_times) {
                        // 未购买
                        // tips
                        this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[4], this);
                        var tipShow = zj.Tips.tips_oneday_get(Number(this.info["gift_index"].toString() + this.info["index"].toString()));
                        this.imgTips.visible = tipShow;
                        // price
                        if (info.pay_type == 1) {
                            var payIndex = zj.TablePayIndex.Item(info.pay_index);
                            var payTbl = null;
                            for (var _d = 0, _e = this.allProducts; _d < _e.length; _d++) {
                                var v = _e[_d];
                                if (v.coin == payIndex.raw_token) {
                                    payTbl = zj.Table.DeepCopy(v);
                                    break;
                                }
                            }
                            this.lbNameA.visible = true;
                            if (payTbl != null) {
                                this.info["pay_tbl"] = {};
                                this.info["pay_tbl"] = payTbl;
                                this.lbNameA.text = zj.Set.CashUnit(payTbl["currency"]) + payTbl["amount"];
                            }
                            else {
                                this.lbNameA.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
                            }
                        }
                        else if (info.pay_type == 2) {
                            this.lbNameA.text = info.price.toString();
                            this.lbNameA.visible = true;
                            this.imgGestone.visible = true;
                        }
                        // end time
                        var soldOut = zj.PlayerGiftSystem.UpToOpTime(this.info["trigger_time"] + info.duration - zj.Game.Controller.curServerTime);
                        if (info.duration == 0) {
                            // 月卡类型不限制时间
                            this.imgType.visible = false;
                            this.lbEndNum.visible = true;
                            this.lbEndNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.get_after_buy, info.daily_num);
                        }
                        else {
                            this.lbEndNum_.visible = true;
                            this.lbEndNum_.textFlow = zj.Util.RichText(soldOut);
                        }
                        this.groupC.visible = false;
                    }
                    else {
                        // 已购买
                        // 领取
                        this.lbNameA.visible = false;
                        this.imgType.visible = false;
                        var hasGet = (this.info["dailyIndex"] - Number(info.daily_index) + this.info["mark"]).toString();
                        var allGet = info.daily_num;
                        var strGet = zj.TextsConfig.TextsConfig_Gift.gift.time_limit.get_pro;
                        var strPer = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.time_limit.per_str2, hasGet, allGet);
                        var strHasget = this.info["mark"] == 0 ? zj.TextsConfig.TextsConfig_Gift.gift.time_limit.can_get : zj.TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
                        this.imgBuy.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.getorbuy[1], this);
                        this.groupC.visible = (this.info["mark"] != 0);
                        this.imgShadow.visible = false;
                        this.lbEndNum_.visible = true;
                        this.lbEndNum_.textFlow = zj.Util.RichText(strGet + strPer);
                        this.lbValue.visible = true;
                        this.lbValue.textFlow = zj.Util.RichText(strHasget);
                        this.imgTips.visible = (this.info["mark"] == 0);
                    }
                }
            }
            else if (this.type == 6) {
                this.groupAB.visible = false;
                if (info.pay_type == 3) {
                    // 免费领取类型
                    this.lbNameA.visible = false;
                    this.lbValue.visible = true;
                    var nextLevel = zj.PlayerGiftSystem.getNextLevel(this.info);
                    var color = [];
                    var strPer = "";
                    if (nextLevel == null) {
                        // 红色
                        color = [255, 38, 38];
                        strPer = zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.get_out;
                        this.groupC.visible = true;
                        this.imgBuy.visible = false;
                    }
                    else {
                        if (nextLevel <= zj.Game.PlayerInfoSystem.BaseInfo.level) {
                            // 绿色
                            color = [0, 249, 0];
                            this.groupC.visible = false;
                        }
                        else {
                            // 红色
                            color = [255, 38, 38];
                            this.groupC.visible = true;
                            this.imgShadow.visible = false;
                            this.imgBuy.visible = false;
                        }
                        strPer = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.next_pro, color[0], color[1], color[2], zj.Game.PlayerInfoSystem.BaseInfo.level, nextLevel);
                    }
                    var strHasget = "";
                    // 是否领取任意
                    var hasGet = (this.info["markIndex"] != null && this.info["markIndex"].length != 0);
                    if (nextLevel == null) {
                        strHasget = zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                    }
                    else if (!hasGet && nextLevel <= zj.Game.PlayerInfoSystem.BaseInfo.level) {
                        // 首次可领（免费）
                        strHasget = zj.TextsConfig.TextsConfig_Gift.gift.free;
                    }
                    else if (!hasGet && nextLevel > zj.Game.PlayerInfoSystem.BaseInfo.level) {
                        // 首次不可领取
                        strHasget = zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                    }
                    else {
                        strHasget = nextLevel <= zj.Game.PlayerInfoSystem.BaseInfo.level ? zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.can_get : zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                    }
                    this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[5], this);
                    if (!hasGet) {
                        // 任意一次未领
                        this.lbValue.textFlow = zj.Util.RichText(strHasget);
                        this.lbEndNum.visible = true;
                        this.lbEndNum.text = zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.forever;
                    }
                    else {
                        this.lbEndNum_.visible = true;
                        this.lbEndNum_.textFlow = zj.Util.RichText(strPer);
                        this.lbValue.textFlow = zj.Util.RichText(strHasget);
                    }
                    if (nextLevel != null) {
                        this.imgTips.visible = (nextLevel <= zj.Game.PlayerInfoSystem.BaseInfo.level);
                    }
                    else {
                        this.imgTips.visible = false;
                    }
                }
                else {
                    if (this.info["buy_times"] < info.buy_times) {
                        // 未购买
                        // tips
                        this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[4], this);
                        var tipShow = zj.Tips.tips_oneday_get(Number(this.info["gift_index"].toString() + this.info["index"].toString()));
                        this.imgTips.visible = tipShow;
                        // price
                        if (info.pay_type == 1) {
                            var payIndex = zj.TablePayIndex.Item(info.pay_index);
                            var payTbl = null;
                            for (var _f = 0, _g = this.allProducts; _f < _g.length; _f++) {
                                var v = _g[_f];
                                if (v.coin == payIndex.raw_token) {
                                    payTbl = zj.Table.DeepCopy(v);
                                }
                            }
                            this.lbNameA.visible = true;
                            if (payTbl != null) {
                                this.info["pay_tbl"] = {};
                                this.info["pay_tbl"] = payTbl;
                                this.lbNameA.text = zj.Set.CashUnit(payTbl["currency"]) + payTbl["amount"];
                            }
                            else {
                                this.lbNameA.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
                            }
                        }
                        else if (info.pay_type == 2) {
                            this.lbNameA.text = info.price.toString();
                            this.lbNameA.visible = true;
                            this.imgGestone.visible = true;
                            this.imgV3.visible = true;
                            this.lbEndNum_.visible = true;
                            this.lbEndNum_.text = "";
                        }
                        // end level
                        if (info.pay_type != 2) {
                            if (zj.Game.PlayerInfoSystem.BaseInfo.level < info.limit_level) {
                                this.lbEndNum.visible = true;
                                this.lbEndNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.can_buy, info.limit_level);
                            }
                            else {
                                var strLast = zj.PlayerGiftSystem.UpToOpTime(this.info["mark"] + info.duration - zj.Game.Controller.curServerTime);
                                this.lbEndNum_.visible = true;
                                this.lbEndNum_.textFlow = zj.Util.RichText(strLast);
                            }
                        }
                    }
                    else {
                        // 已购买
                        // 领取
                        this.lbNameA.visible = false;
                        this.imgType.visible = false;
                        this.lbValue.visible = true;
                        var nextLevel = zj.PlayerGiftSystem.getNextLevel(this.info);
                        var color = [];
                        var strPer = "";
                        var strHasget = "";
                        if (nextLevel == null) {
                            // 红色
                            color = [255, 38, 38];
                            strPer = zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.get_out;
                            strHasget = zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                            this.groupC.visible = true;
                            this.imgBuy.visible = false;
                        }
                        else {
                            if (nextLevel <= zj.Game.PlayerInfoSystem.BaseInfo.level) {
                                // 绿色
                                color = [0, 249, 0];
                                this.groupC.visible = false;
                            }
                            else {
                                // 红色
                                color = [255, 38, 38];
                                this.groupC.visible = true;
                                this.imgShadow.visible = false;
                                this.imgBuy.visible = false;
                            }
                            strPer = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.next_pro, color[0], color[1], color[2], zj.Game.PlayerInfoSystem.BaseInfo.level, nextLevel);
                            strHasget = nextLevel <= zj.Game.PlayerInfoSystem.BaseInfo.level ? zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.can_get : zj.TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                        }
                        this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[5], this);
                        this.lbEndNum_.visible = true;
                        this.lbEndNum_.textFlow = zj.Util.RichText(strPer);
                        this.lbValue.textFlow = zj.Util.RichText(strHasget);
                        if (nextLevel != null) {
                            this.imgTips.visible = (nextLevel <= zj.Game.PlayerInfoSystem.BaseInfo.level);
                        }
                        else {
                            this.imgTips.visible = false;
                        }
                    }
                }
            }
            if (info.buy_times == 1 && info.is_forever == 0 && this.type != 2 && this.type != 4 && info.pay_type != 3) {
                zj.Set.ButtonBackgroud(this.btnItem, zj.UIConfig.UIConfig_Hunter_Pay.backButton[2][0], zj.UIConfig.UIConfig_Hunter_Pay.backButton[2][1], zj.UIConfig.UIConfig_Hunter_Pay.backButton[2][2]);
                this.groupAB.visible = false;
                this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[6], this);
            }
            else {
                zj.Set.ButtonBackgroud(this.btnItem, zj.UIConfig.UIConfig_Hunter_Pay.backButton[1][0], zj.UIConfig.UIConfig_Hunter_Pay.backButton[1][1], zj.UIConfig.UIConfig_Hunter_Pay.backButton[1][2]);
            }
            if (this.lbNameA.visible == true) {
                this.lbNameA.left = 200;
                if (this.imgGestone.visible == false) {
                    this.lbNameA.left = 188;
                }
            }
        };
        PayMallItem.prototype.setInfoDefault = function () {
            this.imgTips.visible = false;
            this.lbCostB.visible = true;
            // 代币
            this.lbCostB.visible = true;
            this.lbCostB.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.token, this.info["coin"]);
            // 价格
            this.lbNameB.text = zj.Set.CashUnit(this.info["currency"]) + this.info["amount"];
        };
        PayMallItem.prototype.setInfoCharge = function () {
            var _this = this;
            if (this.item.month_type != 0) {
                this.lbCostB.visible = false;
                this.imgTips.visible = true;
            }
            else {
                // 代币
                this.lbCostB.visible = true;
                this.lbCostB.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.token, this.info["coin"]);
                // 查询是否购买过
                var bBought = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.payIndexs, function (k, v) {
                    return v == _this.item.index;
                });
                if (!bBought && this.item.product_type == zj.TableEnum.Enum.ChargeType.DOUBLE) {
                    // 未购买过且是首翻类型
                    this.imgDouble.visible = true;
                    this.imgDiscount.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.extern_away[0], this);
                    this.lbDis.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.addToken, this.info["coin"]);
                }
                else if (bBought && this.item.product_type == zj.TableEnum.Enum.ChargeType.DOUBLE) {
                    // 购买过且是首翻类型
                    this.imgDouble.visible = false;
                    this.imgDiscount.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.extern_away[1], this);
                    if (this.item.give_token == 0) {
                        this.imgDiscount.visible = false;
                        this.lbDis.visible = false;
                    }
                    this.lbDis.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Pay.addToken, this.item.give_token);
                }
                else {
                    // 其他
                    this.imgDouble.visible = false;
                    this.imgDiscount.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.extern_away[1], this);
                    this.lbDis.text = this.item.give_token.toString();
                }
            }
            // 价格
            var strUnit = zj.Set.CashUnit(this.info["currency"]);
            var strMoney = this.info["amount"];
            this.lbNameB.text = strUnit + strMoney;
            // 图片
            this.imgIcon.source = zj.cachekey(this.item.img_path, this);
        };
        PayMallItem.prototype.onBtnItem = function () {
            this["clickButtonResponse" + this.fatherType]();
        };
        PayMallItem.prototype.clickButtonResponse2 = function () {
            var _this = this;
            var info = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            // 成长礼包到等级不能购买
            if (this.type == 6 && info.limit_level != 0 && zj.Game.PlayerInfoSystem.BaseInfo.level >= info.limit_level && this.info["buy_times"] < 1) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Charge.noPay));
                return;
            }
            if (this.type == 5) {
                // 每日领取
                if (info.pay_type == 1 || info.pay_type == 2) {
                    // cost
                    if (this.info["buy_times"] < info.buy_times) {
                        // 未购买
                        // "HXH_GiftTimeNode"
                        zj.loadUI(zj.GiftTimeNode)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                    else {
                        // "HXH_GiftTimePop"
                        zj.loadUI(zj.GiftTimePop)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                }
                else if (info.pay_type == 3) {
                    // free
                    if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                        // 第一天未领取
                        // "HXH_GiftTimeNode"
                        zj.loadUI(zj.GiftTimeNode)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                    else {
                        // "HXH_GiftTimePop"
                        zj.loadUI(zj.GiftTimePop)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                }
            }
            else if (this.type == 6) {
                // 等级领取
                if (info.pay_type == 1) {
                    // RMB
                    if (this.info["buy_times"] < info.buy_times) {
                        // 未购买
                        // "HXH_GiftLevelRMB"
                        zj.loadUI(zj.GiftLevelRMB)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                    else {
                        // "HXH_GiftLevelPop"
                        zj.loadUI(zj.GiftLevelPop)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                }
                else if (info.pay_type == 2) {
                    // token
                    if (this.info["buy_times"] < info.buy_times) {
                        // 未购买
                        // "HXH_GiftLevelGemstone"
                        zj.loadUI(zj.GiftLevelGemstone)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                    else {
                        // "HXH_GiftLevelPop"
                        zj.loadUI(zj.GiftLevelPop)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                }
                else if (info.pay_type == 3) {
                    // free
                    // "HXH_GiftLevelPop"
                    zj.loadUI(zj.GiftLevelPop)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                    });
                }
            }
            else if (this.type == 3) {
                if (this.info["dailyIndex"] == info.daily_index) {
                    // 第一天
                    // "HXH_GiftTimeNode"
                    zj.loadUI(zj.GiftTimeNode)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                    });
                }
                else {
                    // "HXH_GiftTimePop"
                    zj.loadUI(zj.GiftTimePop)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                    });
                }
            }
            else if (this.type == 1) {
                // Activity_TimeGiftFirstPopC
                zj.loadUI(zj.GiftFirstPopC)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.info, _this.data.father, false);
                });
            }
        };
        PayMallItem.prototype.clickButtonResponse3 = function () {
            var _this = this;
            var info = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            // 成长礼包到等级不能购买
            if (this.type == 6 && info.limit_level != 0 && zj.Game.PlayerInfoSystem.BaseInfo.level >= info.limit_level && this.info["buy_times"] < 1) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Charge.noPay));
                return;
            }
            if (this.type == 5) {
                // 每日领取
                if (info.pay_type == 1 || info.pay_type == 2) {
                    // cost
                    if (this.info["buy_times"] < info.buy_times) {
                        // 未购买
                        // "HXH_GiftTimeNode"
                        zj.loadUI(zj.GiftTimeNode)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                    else {
                        // "HXH_GiftTimePop"
                        zj.loadUI(zj.GiftTimePop)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                }
                else if (info.pay_type == 3) {
                    // free
                    if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                        // 第一天未领取
                        // "HXH_GiftTimeNode"
                        zj.loadUI(zj.GiftTimeNode)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                    else {
                        // "HXH_GiftTimePop"
                        zj.loadUI(zj.GiftTimePop)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                }
            }
            else if (this.type == 3) {
                // free
                // "HXH_GiftLevelPop"
                zj.loadUI(zj.GiftLevelPop)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                });
            }
            else if (this.type == 6) {
                // 等级领取
                if (info.pay_type == 1) {
                    // RMB
                    if (this.info["buy_times"] < info.buy_times) {
                        // 未购买
                        // "HXH_GiftLevelRMB"
                        zj.loadUI(zj.GiftLevelRMB)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                    else {
                        // "HXH_GiftLevelPop"
                        zj.loadUI(zj.GiftLevelPop)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                }
                else if (info.pay_type == 2) {
                    // token
                    if (this.info["buy_times"] < info.buy_times) {
                        // 未购买
                        // "HXH_GiftLevelGemstone"
                        zj.loadUI(zj.GiftLevelGemstone)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                    else {
                        // "HXH_GiftLevelPop"
                        zj.loadUI(zj.GiftLevelPop)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                        });
                    }
                }
                else if (info.pay_type == 3) {
                    // free
                    // "HXH_GiftLevelPop"
                    zj.loadUI(zj.GiftLevelPop)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                    });
                }
            }
            else {
                // Activity_TimeGiftFirstPopC
                zj.loadUI(zj.GiftFirstPopC)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.info, _this.data.father, false);
                });
            }
        };
        PayMallItem.prototype.clickButtonResponse4 = function () {
            var _this = this;
            if (this.info["gift_index"] == null) {
                // 充值
                var localIndex = 0;
                if (this.item != null) {
                    localIndex = this.item.index;
                }
                if (zj.Util.getAppVersionInfo().channel == "test" && this.item != null) {
                    zj.Game.PlayerPaySystem.simulateCharge(localIndex).then(function () {
                        zj.toast_success(zj.LANG(zj.TextsConfig.TextsConfig_Charge.chargeSuccess));
                        setTimeout(function () {
                            _this.data.father.updateItemList();
                        }, 300);
                    });
                }
                else {
                    zj.platform.pay(zj.PlayerPaySystem.GetProductId(localIndex, this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(localIndex));
                }
            }
            else {
                // 月卡
                var info = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
                if (this.type == 5) {
                    // 每日领取
                    if (info.pay_type == 1 || info.pay_type == 2) {
                        // cost
                        if (this.info["buy_times"] < info.buy_times) {
                            // "HXH_GiftTimeNode"
                            zj.loadUI(zj.GiftTimeNode)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                            });
                        }
                        else {
                            // "HXH_GiftTimePop"
                            zj.loadUI(zj.GiftTimePop)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                            });
                        }
                    }
                    else if (info.pay_type == 3) {
                        // free
                        if (this.info["dailyIndex"] < info.daily_index && this.info["mark"] == 0) {
                            // "HXH_GiftTimeNode"
                            zj.loadUI(zj.GiftTimeNode)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                            });
                        }
                        else {
                            // "HXH_GiftTimePop"
                            zj.loadUI(zj.GiftTimePop)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(_this.info, _this.data.father, _this.data.father.updateItemList);
                            });
                        }
                    }
                }
            }
        };
        return PayMallItem;
    }(eui.ItemRenderer));
    zj.PayMallItem = PayMallItem;
    __reflect(PayMallItem.prototype, "zj.PayMallItem");
})(zj || (zj = {}));
//# sourceMappingURL=PayMallItem.js.map