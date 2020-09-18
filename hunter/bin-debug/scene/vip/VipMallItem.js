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
    // 星耀福利-商城item
    // lizhengiang
    // 20190513
    var VipMallItem = (function (_super) {
        __extends(VipMallItem, _super);
        function VipMallItem() {
            var _this = _super.call(this) || this;
            _this.id = null;
            _this.info = null;
            _this.father = null;
            _this.level = null;
            _this.type = null;
            _this.skinName = "resource/skins/vip/VipMallItemSkin.exml";
            zj.cachekeys(zj.UIResource["VipMallItem"], null);
            _this.btnItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnItem, _this);
            return _this;
        }
        VipMallItem.prototype.init = function () {
            this.btnItem.visible = true;
            this.imgIcon.visible = true;
            this.groupA.visible = true;
            this.imgType.visible = true;
            this.groupAB.visible = true;
            this.lbGetNum.visible = true;
            this.lbEndNum.visible = true;
            this.lbEndNum_.visible = true;
            this.imgGestone.visible = true;
            this.lbNameA.visible = true;
            this.lbValue.visible = true;
            this.imgTips.visible = false;
            this.lbCostB.visible = true;
            this.groupC.visible = true;
            this.imgShadow.visible = true;
            this.imgBuy.visible = true;
            this.lbBuyRight.visible = true;
        };
        VipMallItem.prototype.dataChanged = function () {
            this.id = this.data.id;
            this.info = this.data.info;
            this.father = this.data.father;
            this.level = this.data.level;
            this.init();
            if (this.info["trigger_time"] == null) {
                this.setInfoGiftItemNext();
            }
            else {
                this.setInfoGiftItem();
            }
        };
        VipMallItem.prototype.setInfoGiftItemNext = function () {
            this.lbValue.visible = false;
            this.imgGestone.visible = false;
            this.imgBuy.visible = false;
            this.lbEndNum.visible = false;
            this.lbEndNum_.visible = false;
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            this.type = this.info["gift_form"];
            if (this.type == 1) {
                if (this.info["buy_times"] < 100) {
                    this.lbGetNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.all_limit.limit, 0, 249, 0, this.info["buy_times"]));
                }
                else {
                    this.lbGetNum.text = zj.TextsConfig.TextsConfig_Hunter_Pay.not_limit;
                }
            }
            else if (this.type == 2) {
                if (this.info["buy_times"] < 100) {
                    this.lbGetNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.count_limit.day_buy, this.info["buy_times"]));
                }
                else {
                    this.lbGetNum.text = zj.TextsConfig.TextsConfig_Hunter_Pay.not_limit;
                }
            }
            else if (this.type == 4) {
                if (this.info["buy_times"] < 100) {
                    this.lbGetNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.count_limit.week_buy, this.info["buy_times"]));
                }
                else {
                    this.lbGetNum.text = zj.TextsConfig.TextsConfig_Hunter_Pay.not_limit;
                }
            }
            this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[3], this);
            this.imgTips.visible = false;
            this.lbCostB.text = this.info["name"];
            this.imgIcon.source = zj.cachekey(this.info["path"], this);
            this.lbBuyRight.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_VipMall.buyGift, tbl[this.level + 1].starLevelName);
            if (this.info["pay_type"] == 1) {
                var payIndex = zj.TablePayIndex.Item(this.info["pay_index"]); // StringConfig_Table.pay
                var payTbl = null;
                for (var _i = 0, _a = this.father.allProducts; _i < _a.length; _i++) {
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
                    var strUnit = zj.Set.CashUnit(payTbl.currency);
                    var strMoney = payTbl.amount;
                    this.lbNameA.text = strUnit + strMoney;
                }
                else {
                    this.lbNameA.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
                }
            }
            else if (this.info["pay_type"] == 2) {
                this.imgGestone.visible = true;
                this.lbNameA.visible = false;
                this.lbValue.visible = true;
                this.lbValue.text = this.info["price"];
            }
            else {
                this.lbNameA.text = zj.TextsConfig.TextsConfig_Gift.gift.free;
            }
        };
        VipMallItem.prototype.setInfoGiftItem = function () {
            this.groupC.visible = false;
            this.lbValue.visible = false;
            this.imgGestone.visible = false;
            this.lbBuyRight.visible = false;
            this.lbEndNum.visible = false;
            this.lbEndNum_.visible = false;
            var info = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            this.type = info.gift_form;
            if (zj.PlayerItemSystem.Type2(this.info["mark"]) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                this.lbCostB.text = info.name + "(" + zj.PlayerHunterSystem.Table(this.info["mark"]).general_name + ")";
            }
            else {
                this.lbCostB.text = info.name;
            }
            this.imgIcon.source = zj.cachekey(info.path, this);
            if (this.type == 1) {
                var perGet = null;
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
                var tipShow = zj.Tips.tips_oneday_get(Number(this.info["gift_index"] + this.info["index"]));
                if (tipShow && this.info["buy_times"] == info.buy_times) {
                    tipShow = false;
                    zj.Tips.tips_oneday_set(Number(this.info["gift_index"] + this.info["index"]), true);
                }
                this.imgTips.visible = tipShow;
                var soldOut = zj.PlayerGiftSystem.UpToStock(Number(this.info["trigger_time"]) + info.duration - zj.Game.Controller.curServerTime);
                this.lbEndNum_.visible = true;
                this.lbEndNum_.textFlow = zj.Util.RichText(soldOut);
                if (info.is_forever == 1) {
                    this.lbEndNum_.visible = false;
                }
                this.imgBuy.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.getorbuy[0], this);
                this.groupC.visible = this.info["buy_times"] == info.buy_times;
                if (info.pay_type == 1) {
                    var payIndex = zj.TablePayIndex.Item(info.pay_index); // StringConfig_Table.pay
                    var payTbl = null;
                    for (var _i = 0, _a = this.father.allProducts; _i < _a.length; _i++) {
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
                        var strUnit = zj.Set.CashUnit(payTbl.currency);
                        var strMoney = payTbl.amount;
                        this.lbNameA.text = strUnit + strMoney;
                    }
                    else {
                        this.lbNameA.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
                    }
                }
                else if (info.pay_type == 2) {
                    this.lbNameA.visible = true;
                    this.lbNameA.text = info.price.toString();
                    this.imgGestone.visible = true;
                }
            }
            else if (this.type == 2 || this.type == 4) {
                if (this.type == 2) {
                    var getStr = null;
                    if (info.buy_times > this.info["buy_times"]) {
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
                    var getStr = null;
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
                this.groupC.visible = this.info["buy_times"] == info.buy_times;
                var tipShow = zj.Tips.tips_oneday_get(Number(this.info["gift_index"] + this.info["index"]));
                if (tipShow && this.info["buy_times"] == info.buy_times) {
                    tipShow = false;
                    zj.Tips.tips_oneday_set(Number(this.info["gift_index"] + this.info["index"]), true);
                }
                this.imgTips.visible = tipShow;
                if (info.pay_type == 1) {
                    var payIndex = zj.TablePayIndex.Item(info.pay_index); // StringConfig_Table.pay
                    var payTbl = null;
                    for (var _b = 0, _c = this.father.allProducts; _b < _c.length; _b++) {
                        var v = _c[_b];
                        if (v.coin == payIndex.raw_token) {
                            payTbl = zj.Table.DeepCopy(v);
                            break;
                        }
                    }
                    this.lbNameA.visible = true;
                    if (payTbl != null) {
                        this.info["pay_tbl"] = {};
                        this.info["pay_tbl"] = payTbl;
                        var strUnit = zj.Set.CashUnit(payTbl.currency);
                        var strMoney = payTbl.amount;
                        this.lbNameA.text = strUnit + strMoney;
                    }
                    else {
                        this.lbNameA.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Gift.no_point);
                    }
                }
                else if (info.pay_type == 2) {
                    this.lbNameA.visible = true;
                    this.lbNameA.text = info.price.toString();
                    this.imgGestone.visible = true;
                }
            }
            else if (this.type == 3) {
                var buyTimes = this.info["buy_times"] == 0 ? this.info["dailyIndex"] % 100 - 1 : this.info["dailyIndex"] % 100;
                var perGet = null;
                if (this.info["buy_times"] == 0) {
                    var color = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.time_limit.per_str, buyTimes, info.daily_num);
                    perGet = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.greenstr_light, color);
                }
                else {
                    var color = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.gift.time_limit.per_str, buyTimes, info.daily_num);
                    perGet = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.redstr_light, color);
                }
                var strGet = zj.TextsConfig.TextsConfig_Gift.gift.time_limit.get_pro;
                var strTodate = zj.PlayerGiftSystem.UpToTime(this.info["trigger_time"] + info.duration - zj.Game.Controller.curServerTime);
                var strHasget = this.info["buy_times"] == 0 ? zj.TextsConfig.TextsConfig_Gift.gift.time_limit.can_get : zj.TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
                var tipShow = this.info["buy_times"] == 0;
                this.lbNameA.visible = false;
                this.imgBuy.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.getorbuy[1], this);
                this.groupC.visible = this.info["buy_times"] != 0;
                this.imgShadow.visible = false;
                this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[2], this);
                this.imgTips.visible = tipShow;
                this.lbGetNum.textFlow = zj.Util.RichText(strGet + perGet);
                this.lbEndNum_.visible = true;
                this.lbEndNum_.textFlow = zj.Util.RichText(strTodate);
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
                        // 第一天未领取
                        strHasget = zj.TextsConfig.TextsConfig_Gift.gift.free;
                    }
                    else if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 1) {
                        // 第一天领取
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
                        var tipShow = zj.Tips.tips_oneday_get(Number(this.info["gift_index"] + this.info["index"]));
                        this.imgTips.visible = tipShow;
                        // price
                        if (info.pay_type == 1) {
                            var payIndex = zj.TablePayIndex.Item(info.pay_index);
                            var payTbl = null;
                            for (var _d = 0, _e = this.father.allProducts; _d < _e.length; _d++) {
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
                                var strUnit = zj.Set.CashUnit(payTbl.currency);
                                var strMoney = payTbl.amount;
                                this.lbNameA.text = strUnit + strMoney;
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
                        var tipShow = zj.Tips.tips_oneday_get(Number(this.info["gift_index"] + this.info["index"]));
                        this.imgTips.visible = tipShow;
                        // price
                        if (info.pay_type == 1) {
                            var payIndex = zj.TablePayIndex.Item(info.pay_index);
                            var payTbl = null;
                            for (var _f = 0, _g = this.father.allProducts; _f < _g.length; _f++) {
                                var v = _g[_f];
                                if (v.coin == payIndex.raw_token) {
                                    payTbl = zj.Table.DeepCopy(v);
                                    break;
                                }
                            }
                            this.lbNameA.visible = true;
                            if (payTbl != null) {
                                this.info["pay_tbl"] = {};
                                this.info["pay_tbl"] = payTbl;
                                var strUnit = zj.Set.CashUnit(payTbl.currency);
                                var strMoney = payTbl.amount;
                                this.lbNameA.text = strUnit + strMoney;
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
                        // end level
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
        };
        VipMallItem.prototype.onBtnItem = function () {
            var _this = this;
            if (this.info["trigger_time"] == null) {
                var TOKEN_1 = 20002;
                var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["index"]);
                var rewardList_1 = [];
                for (var k in giftInfo.goods_id) {
                    var good_1 = new message.GoodsInfo();
                    good_1.goodsId = giftInfo.goods_id[k];
                    if (giftInfo.goods_id[k] == TOKEN_1) {
                        good_1.count = giftInfo.goods_count[k] + giftInfo.raw_token;
                    }
                    else {
                        good_1.count = giftInfo.goods_count[k];
                    }
                    rewardList_1.push(good_1);
                }
                var good = new message.GoodsInfo();
                good.goodsId = TOKEN_1;
                good.count = giftInfo.raw_token;
                var findToken = zj.Table.FindF(rewardList_1, function (kk, vv) {
                    return vv.goodsId == TOKEN_1;
                });
                if (!findToken && good.count != 0) {
                    rewardList_1.splice(0, 0, good);
                }
                // "Common_DesAward"
                // ???
                zj.loadUI(zj.Daily_AwardPop)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.SetInfoGift(rewardList_1, null, null);
                });
            }
            else {
                var info = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
                if (this.type == 5) {
                    if (info.pay_type == 1 || info.pay_type == 2) {
                        if (this.info["buy_times"] < info.buy_times) {
                            zj.loadUI(zj.GiftTimeNode)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(_this.info);
                            });
                        }
                        else {
                            zj.loadUI(zj.GiftTimePop)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(_this.info);
                            });
                        }
                    }
                    else if (info.pay_type == 3) {
                        if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                            zj.loadUI(zj.GiftTimeNode)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(_this.info);
                            });
                        }
                        else {
                            zj.loadUI(zj.GiftTimePop)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(_this.info);
                            });
                        }
                    }
                }
                else if (this.type == 3) {
                    zj.loadUI(zj.GiftLevelPop)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(_this.info);
                    });
                }
                else {
                    zj.loadUI(zj.GiftFirstPopC)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(_this.info);
                    });
                }
            }
        };
        return VipMallItem;
    }(eui.ItemRenderer));
    zj.VipMallItem = VipMallItem;
    __reflect(VipMallItem.prototype, "zj.VipMallItem");
})(zj || (zj = {}));
//# sourceMappingURL=VipMallItem.js.map