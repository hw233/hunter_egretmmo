namespace zj {
// 星耀福利-商城item
// lizhengiang
// 20190513
export class VipMallItem extends eui.ItemRenderer {
    private btnItem: eui.Button;
    private imgIcon: eui.Image;
    private groupA: eui.Group;
    private imgType: eui.Image;
    private groupAB: eui.Group;
    private lbGetNum: eui.Label;
    private lbEndNum: eui.BitmapLabel;
    private lbEndNum_: eui.Label;
    private imgGestone: eui.Image;
    private lbNameA: eui.Label;
    private lbValue: eui.Label;
    private imgTips: eui.Image;
    private lbCostB: eui.BitmapLabel;
    private groupC: eui.Group;
    private imgShadow: eui.Image;
    private imgBuy: eui.Image;
    private lbBuyRight: eui.Label;

    private id: number = null;
    private info = null;
    private father = null;
    private level: number = null;
    private type: number = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/vip/VipMallItemSkin.exml";
        cachekeys(<string[]>UIResource["VipMallItem"], null);
        this.btnItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnItem, this);
    }

    private init() {
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
    }

    protected dataChanged() {
        this.id = this.data.id;
        this.info = this.data.info;
        this.father = this.data.father;
        this.level = this.data.level;

        this.init();

        if (this.info["trigger_time"] == null) {
            this.setInfoGiftItemNext();
        } else {
            this.setInfoGiftItem();
        }
    }

    private setInfoGiftItemNext() {
        this.lbValue.visible = false;
        this.imgGestone.visible = false;
        this.imgBuy.visible = false;
        this.lbEndNum.visible = false;
        this.lbEndNum_.visible = false;

        let tbl = TableLicenceWeal.Table();// StringConfig_Table.vipWeal
        this.type = this.info["gift_form"];
        if (this.type == 1) {
            if (this.info["buy_times"] < 100) {
                this.lbGetNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.all_limit.limit, 0, 249, 0, this.info["buy_times"]));
            } else {
                this.lbGetNum.text = TextsConfig.TextsConfig_Hunter_Pay.not_limit;
            }
        } else if (this.type == 2) {
            if (this.info["buy_times"] < 100) {
                this.lbGetNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.day_buy, this.info["buy_times"]));
            } else {
                this.lbGetNum.text = TextsConfig.TextsConfig_Hunter_Pay.not_limit;
            }
        } else if (this.type == 4) {
            if (this.info["buy_times"] < 100) {
                this.lbGetNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.week_buy, this.info["buy_times"]));
            } else {
                this.lbGetNum.text = TextsConfig.TextsConfig_Hunter_Pay.not_limit;
            }
        }

        this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[3], this);
        this.imgTips.visible = false;
        this.lbCostB.text = this.info["name"];
        this.imgIcon.source = cachekey(this.info["path"], this);
        this.lbBuyRight.text = Helper.StringFormat(TextsConfig.TextsConfig_VipMall.buyGift, tbl[this.level + 1].starLevelName);

        if (this.info["pay_type"] == 1) {
            let payIndex = TablePayIndex.Item(this.info["pay_index"]); // StringConfig_Table.pay
            let payTbl = null;
            for (const v of <Array<MyProductInfo>>this.father.allProducts) {
                if (v.coin == payIndex.raw_token) {
                    payTbl = Table.DeepCopy(v);
                    break;
                }
            }
            this.lbNameA.visible = true;
            if (payTbl != null) {
                this.info["pay_tbl"] = {};
                this.info["pay_tbl"] = payTbl;
                let strUnit = Set.CashUnit(payTbl.currency);
                let strMoney = payTbl.amount;
                this.lbNameA.text = strUnit + strMoney;
            } else {
                this.lbNameA.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
            }
        } else if (this.info["pay_type"] == 2) {
            this.imgGestone.visible = true;
            this.lbNameA.visible = false;
            this.lbValue.visible = true;
            this.lbValue.text = this.info["price"];
        } else {
            this.lbNameA.text = TextsConfig.TextsConfig_Gift.gift.free;
        }
    }

    private setInfoGiftItem() {
        this.groupC.visible = false;
        this.lbValue.visible = false;
        this.imgGestone.visible = false;
        this.lbBuyRight.visible = false;
        this.lbEndNum.visible = false;
        this.lbEndNum_.visible = false;

        let info = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        this.type = info.gift_form;

        if (PlayerItemSystem.Type2(this.info["mark"]) == message.EGoodsType.GOODS_TYPE_GENERAL) {
            this.lbCostB.text = info.name + "(" + PlayerHunterSystem.Table(this.info["mark"]).general_name + ")";
        } else {
            this.lbCostB.text = info.name;
        }
        this.imgIcon.source = cachekey(info.path, this);

        if (this.type == 1) {
            let perGet: string = null;
            if (this.info["buy_times"] < info.buy_times) {
                perGet = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.all_limit.limit, 0, 249, 0, info.buy_times - this.info["buy_times"]);
            } else {
                perGet = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.all_limit.limit, 255, 38, 38, info.buy_times - this.info["buy_times"]);
            }
            this.lbGetNum.textFlow = Util.RichText(perGet);

            this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[1], this);
            if (info.is_forever == 1) {
                this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[3], this);
            }

            let tipShow = Tips.tips_oneday_get(Number((<string>this.info["gift_index"]) + (<string>this.info["index"])));
            if (tipShow && this.info["buy_times"] == info.buy_times) {
                tipShow = false;
                Tips.tips_oneday_set(Number((<string>this.info["gift_index"]) + (<string>this.info["index"])), true);
            }
            this.imgTips.visible = tipShow;

            let soldOut = PlayerGiftSystem.UpToStock(Number(this.info["trigger_time"]) + info.duration - Game.Controller.curServerTime);
            this.lbEndNum_.visible = true;
            this.lbEndNum_.textFlow = Util.RichText(soldOut);
            if (info.is_forever == 1) {
                this.lbEndNum_.visible = false;
            }

            this.imgBuy.source = cachekey(UIConfig.UIConfig_Hunter_Pay.getorbuy[0], this);
            this.groupC.visible = this.info["buy_times"] == info.buy_times;

            if (info.pay_type == 1) {
                let payIndex = TablePayIndex.Item(info.pay_index); // StringConfig_Table.pay
                let payTbl = null;
                for (const v of <Array<MyProductInfo>>this.father.allProducts) {
                    if (v.coin == payIndex.raw_token) {
                        payTbl = Table.DeepCopy(v);
                        break;
                    }
                }
                this.lbNameA.visible = true;
                if (payTbl != null) {
                    this.info["pay_tbl"] = {};
                    this.info["pay_tbl"] = payTbl;
                    let strUnit = Set.CashUnit(payTbl.currency);
                    let strMoney = payTbl.amount;
                    this.lbNameA.text = strUnit + strMoney;
                } else {
                    this.lbNameA.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
                }
            } else if (info.pay_type == 2) {
                this.lbNameA.visible = true;
                this.lbNameA.text = info.price.toString();
                this.imgGestone.visible = true;
            }
        } else if (this.type == 2 || this.type == 4) {
            if (this.type == 2) {
                let getStr: string = null;
                if (info.buy_times > this.info["buy_times"]) {
                    getStr = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.day_last, 0, 249, 0, info.buy_times - this.info["buy_times"]);
                } else {
                    getStr = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.day_last, 255, 38, 38, info.buy_times - this.info["buy_times"]);
                }

                if (info.buy_times < 100) {
                    this.lbEndNum_.visible = true;
                    this.lbEndNum_.textFlow = Util.RichText(getStr);
                    this.lbGetNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.day_buy, info.buy_times));
                } else {
                    this.groupAB.visible = false;
                    this.imgType.visible = false;
                    this.lbEndNum.visible = true;
                    this.lbEndNum.text = TextsConfig.TextsConfig_Hunter_Pay.not_limit_buy;
                    this.lbGetNum.text = TextsConfig.TextsConfig_Hunter_Pay.not_limit;
                }
            } else if (this.type == 4) {
                let getStr: string = null;
                if (info.buy_times > this.info["buy_times"]) {
                    getStr = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.week_last, 0, 249, 0, info.buy_times - this.info["buy_times"]);
                } else {
                    getStr = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.week_last, 255, 38, 38, info.buy_times - this.info["buy_times"]);
                }

                if (info.buy_times < 100) {
                    this.lbEndNum_.visible = true;
                    this.lbEndNum_.textFlow = Util.RichText(getStr);
                    this.lbGetNum.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.week_buy, info.buy_times));
                } else {
                    this.groupAB.visible = false;
                    this.imgType.visible = false;
                    this.lbEndNum.visible = true;
                    this.lbEndNum.text = TextsConfig.TextsConfig_Hunter_Pay.not_limit_buy;
                    this.lbGetNum.text = TextsConfig.TextsConfig_Hunter_Pay.not_limit;
                }
            }

            this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[3], this);
            this.imgBuy.source = cachekey(UIConfig.UIConfig_Hunter_Pay.getorbuy[0], this);
            this.groupC.visible = <number>this.info["buy_times"] == info.buy_times;

            let tipShow = Tips.tips_oneday_get(Number((<string>this.info["gift_index"]) + (<string>this.info["index"])));
            if (tipShow && (<number>this.info["buy_times"]) == info.buy_times) {
                tipShow = false;
                Tips.tips_oneday_set(Number((<string>this.info["gift_index"]) + (<string>this.info["index"])), true);
            }
            this.imgTips.visible = tipShow;

            if (info.pay_type == 1) {
                let payIndex = TablePayIndex.Item(info.pay_index); // StringConfig_Table.pay
                let payTbl = null;
                for (const v of <Array<MyProductInfo>>this.father.allProducts) {
                    if (v.coin == payIndex.raw_token) {
                        payTbl = Table.DeepCopy(v);
                        break;
                    }
                }
                this.lbNameA.visible = true;
                if (payTbl != null) {
                    this.info["pay_tbl"] = {};
                    this.info["pay_tbl"] = payTbl;
                    let strUnit = Set.CashUnit(payTbl.currency);
                    let strMoney = payTbl.amount;
                    this.lbNameA.text = strUnit + strMoney;
                } else {
                    this.lbNameA.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
                }
            } else if (info.pay_type == 2) {
                this.lbNameA.visible = true;
                this.lbNameA.text = info.price.toString();
                this.imgGestone.visible = true;
            }
        } else if (this.type == 3) {
            let buyTimes = this.info["buy_times"] == 0 ? this.info["dailyIndex"] % 100 - 1 : this.info["dailyIndex"] % 100;
            let perGet: string = null;
            if (this.info["buy_times"] == 0) {
                let color = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.time_limit.per_str, buyTimes, info.daily_num);
                perGet = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, color);
            } else {
                let color = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.time_limit.per_str, buyTimes, info.daily_num);
                perGet = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, color);
            }
            let strGet = TextsConfig.TextsConfig_Gift.gift.time_limit.get_pro;
            let strTodate = PlayerGiftSystem.UpToTime(this.info["trigger_time"] + info.duration - Game.Controller.curServerTime);
            let strHasget = this.info["buy_times"] == 0 ? TextsConfig.TextsConfig_Gift.gift.time_limit.can_get : TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
            let tipShow = this.info["buy_times"] == 0;
            this.lbNameA.visible = false;
            this.imgBuy.source = cachekey(UIConfig.UIConfig_Hunter_Pay.getorbuy[1], this);
            this.groupC.visible = this.info["buy_times"] != 0;
            this.imgShadow.visible = false;
            this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[2], this);
            this.imgTips.visible = tipShow;
            this.lbGetNum.textFlow = Util.RichText(strGet + perGet);
            this.lbEndNum_.visible = true;
            this.lbEndNum_.textFlow = Util.RichText(strTodate);
            this.lbValue.visible = true;
            this.lbValue.textFlow = Util.RichText(strHasget);
        } else if (this.type == 5) {
            this.groupAB.visible = false;
            if (info.pay_type == 3) {
                // 免费领取类型
                this.lbNameA.visible = false;

                let hasGet: string = (<number>this.info["dailyIndex"] - Number(info.daily_index) + (<number>this.info["mark"])).toString();
                let allGet: string = info.daily_num;
                let strGet: string = TextsConfig.TextsConfig_Gift.gift.time_limit.get_pro;
                let strPer: string = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.time_limit.per_str2, hasGet, allGet);
                let strHasget: string = "";
                if (this.info["dailyIndex"] == info.daily_index && (<number>this.info["mark"]) == 0) {
                    // 第一天未领取
                    strHasget = TextsConfig.TextsConfig_Gift.gift.free;
                } else if (this.info["dailyIndex"] == info.daily_index && (<number>this.info["mark"]) == 1) {
                    // 第一天领取
                    strHasget = TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
                } else {
                    strHasget = <number>this.info["mark"] == 0 ? TextsConfig.TextsConfig_Gift.gift.time_limit.can_get : TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
                }
                this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[5], this);
                if (this.info["dailyIndex"] == info.daily_index) {
                    // 第一天
                    this.lbEndNum_.visible = false;
                } else {
                    this.lbEndNum_.visible = true;
                    this.lbEndNum_.textFlow = Util.RichText(strGet + strPer);
                }

                this.imgBuy.source = cachekey(UIConfig.UIConfig_Hunter_Pay.getorbuy[1], this);
                this.groupC.visible = (this.info["mark"] != 0);
                this.imgShadow.visible = false;
                this.lbValue.visible = true;
                this.lbValue.textFlow = Util.RichText(strHasget);
                this.imgTips.visible = (<number>this.info["mark"] == 0);
            } else {
                if (this.info["buy_times"] < info.buy_times) {
                    // 未购买

                    // tips
                    this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[4], this);
                    let tipShow: boolean = Tips.tips_oneday_get(Number((<string>this.info["gift_index"]) + (<string>this.info["index"])));
                    this.imgTips.visible = tipShow;

                    // price
                    if (info.pay_type == 1) {
                        let payIndex = TablePayIndex.Item(info.pay_index);
                        let payTbl = null;
                        for (const v of this.father.allProducts) {
                            if (v.coin == payIndex.raw_token) {
                                payTbl = Table.DeepCopy(v);
                                break;
                            }
                        }
                        this.lbNameA.visible = true;
                        if (payTbl != null) {
                            this.info["pay_tbl"] = {};
                            this.info["pay_tbl"] = payTbl;
                            let strUnit = Set.CashUnit(payTbl.currency);
                            let strMoney = payTbl.amount;
                            this.lbNameA.text = strUnit + strMoney;
                        } else {
                            this.lbNameA.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
                        }
                    } else if (info.pay_type == 2) {
                        this.lbNameA.text = info.price.toString();
                        this.lbNameA.visible = true;
                        this.imgGestone.visible = true;
                    }

                    // end time
                    let soldOut = PlayerGiftSystem.UpToOpTime(<number>this.info["trigger_time"] + info.duration - Game.Controller.curServerTime);
                    if (info.duration == 0) {
                        // 月卡类型不限制时间
                        this.imgType.visible = false;
                        this.lbEndNum.visible = true;
                        this.lbEndNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.get_after_buy, info.daily_num);
                    } else {
                        this.lbEndNum_.visible = true;
                        this.lbEndNum_.textFlow = Util.RichText(soldOut);
                    }
                    this.groupC.visible = false;
                } else {
                    // 已购买

                    // 领取
                    this.lbNameA.visible = false;
                    this.imgType.visible = false;

                    let hasGet: string = (<number>this.info["dailyIndex"] - Number(info.daily_index) + (<number>this.info["mark"])).toString();
                    let allGet: string = info.daily_num;
                    let strGet: string = TextsConfig.TextsConfig_Gift.gift.time_limit.get_pro;
                    let strPer: string = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.time_limit.per_str2, hasGet, allGet);
                    let strHasget: string = <number>this.info["mark"] == 0 ? TextsConfig.TextsConfig_Gift.gift.time_limit.can_get : TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
                    this.imgBuy.source = cachekey(UIConfig.UIConfig_Hunter_Pay.getorbuy[1], this);
                    this.groupC.visible = (<number>this.info["mark"] != 0);
                    this.imgShadow.visible = false;
                    this.lbEndNum_.visible = true;
                    this.lbEndNum_.textFlow = Util.RichText(strGet + strPer);
                    this.lbValue.visible = true;
                    this.lbValue.textFlow = Util.RichText(strHasget);
                    this.imgTips.visible = (<number>this.info["mark"] == 0);
                }
            }
        } else if (this.type == 6) {
            this.groupAB.visible = false;
            if (info.pay_type == 3) {
                // 免费领取类型

                this.lbNameA.visible = false;
                this.lbValue.visible = true;
                let nextLevel = PlayerGiftSystem.getNextLevel(this.info);
                let color: number[] = [];
                let strPer: string = "";
                if (nextLevel == null) {
                    // 红色
                    color = [255, 38, 38];
                    strPer = TextsConfig.TextsConfig_Gift.gift.fund_limit.get_out;
                    this.groupC.visible = true;
                    this.imgBuy.visible = false;
                } else {
                    if (nextLevel <= Game.PlayerInfoSystem.BaseInfo.level) {
                        // 绿色
                        color = [0, 249, 0];
                        this.groupC.visible = false;
                    } else {
                        // 红色
                        color = [255, 38, 38];
                        this.groupC.visible = true;
                        this.imgShadow.visible = false;
                        this.imgBuy.visible = false;
                    }
                    strPer = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.fund_limit.next_pro, color[0], color[1], color[2], Game.PlayerInfoSystem.BaseInfo.level, nextLevel);
                }

                let strHasget: string = "";
                // 是否领取任意
                let hasGet: boolean = (this.info["markIndex"] != null && this.info["markIndex"].length != 0);

                if (nextLevel == null) {
                    strHasget = TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                } else if (!hasGet && nextLevel <= Game.PlayerInfoSystem.BaseInfo.level) {
                    // 首次可领（免费）
                    strHasget = TextsConfig.TextsConfig_Gift.gift.free;
                } else if (!hasGet && nextLevel > Game.PlayerInfoSystem.BaseInfo.level) {
                    // 首次不可领取
                    strHasget = TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                } else {
                    strHasget = nextLevel <= Game.PlayerInfoSystem.BaseInfo.level ? TextsConfig.TextsConfig_Gift.gift.fund_limit.can_get : TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                }

                this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[5], this);
                if (!hasGet) {
                    // 任意一次未领
                    this.lbValue.textFlow = Util.RichText(strHasget);
                    this.lbEndNum.visible = true;
                    this.lbEndNum.text = TextsConfig.TextsConfig_Gift.gift.fund_limit.forever;
                } else {
                    this.lbEndNum_.visible = true;
                    this.lbEndNum_.textFlow = Util.RichText(strPer);
                    this.lbValue.textFlow = Util.RichText(strHasget);
                }

                if (nextLevel != null) {
                    this.imgTips.visible = (nextLevel <= Game.PlayerInfoSystem.BaseInfo.level);
                } else {
                    this.imgTips.visible = false;
                }
            } else {
                if (<number>this.info["buy_times"] < info.buy_times) {
                    // 未购买

                    // tips
                    this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[4], this);
                    let tipShow: boolean = Tips.tips_oneday_get(Number((<string>this.info["gift_index"]) + (<string>this.info["index"])));
                    this.imgTips.visible = tipShow;

                    // price
                    if (info.pay_type == 1) {
                        let payIndex = TablePayIndex.Item(info.pay_index);
                        let payTbl = null;
                        for (const v of this.father.allProducts) {
                            if (v.coin == payIndex.raw_token) {
                                payTbl = Table.DeepCopy(v);
                                break;
                            }
                        }
                        this.lbNameA.visible = true;
                        if (payTbl != null) {
                            this.info["pay_tbl"] = {};
                            this.info["pay_tbl"] = payTbl;
                            let strUnit = Set.CashUnit(payTbl.currency);
                            let strMoney = payTbl.amount;
                            this.lbNameA.text = strUnit + strMoney;
                        } else {
                            this.lbNameA.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
                        }
                    } else if (info.pay_type == 2) {
                        this.lbNameA.text = info.price.toString();
                        this.lbNameA.visible = true;
                        this.imgGestone.visible = true;
                    }

                    // end level
                    if (Game.PlayerInfoSystem.BaseInfo.level < info.limit_level) {
                        this.lbEndNum.visible = true;
                        this.lbEndNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.fund_limit.can_buy, info.limit_level);
                    } else {
                        let strLast = PlayerGiftSystem.UpToOpTime(<number>this.info["mark"] + info.duration - Game.Controller.curServerTime);
                        this.lbEndNum_.visible = true;
                        this.lbEndNum_.textFlow = Util.RichText(strLast);
                    }
                } else {
                    // 已购买

                    // 领取
                    this.lbNameA.visible = false;
                    this.imgType.visible = false;
                    this.lbValue.visible = true;

                    let nextLevel = PlayerGiftSystem.getNextLevel(this.info);
                    let color: number[] = [];
                    let strPer: string = "";
                    let strHasget: string = "";

                    if (nextLevel == null) {
                        // 红色
                        color = [255, 38, 38];
                        strPer = TextsConfig.TextsConfig_Gift.gift.fund_limit.get_out;
                        strHasget = TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                        this.groupC.visible = true;
                        this.imgBuy.visible = false;
                    } else {
                        if (nextLevel <= Game.PlayerInfoSystem.BaseInfo.level) {
                            // 绿色
                            color = [0, 249, 0];
                            this.groupC.visible = false;
                        } else {
                            // 红色
                            color = [255, 38, 38];
                            this.groupC.visible = true;
                            this.imgShadow.visible = false;
                            this.imgBuy.visible = false;
                        }
                        strPer = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.fund_limit.next_pro, color[0], color[1], color[2], Game.PlayerInfoSystem.BaseInfo.level, nextLevel);
                        strHasget = nextLevel <= Game.PlayerInfoSystem.BaseInfo.level ? TextsConfig.TextsConfig_Gift.gift.fund_limit.can_get : TextsConfig.TextsConfig_Gift.gift.fund_limit.not_get;
                    }

                    this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[5], this);
                    this.lbEndNum_.visible = true;
                    this.lbEndNum_.textFlow = Util.RichText(strPer);
                    this.lbValue.textFlow = Util.RichText(strHasget);
                    if (nextLevel != null) {
                        this.imgTips.visible = (nextLevel <= Game.PlayerInfoSystem.BaseInfo.level);
                    } else {
                        this.imgTips.visible = false;
                    }
                }
            }
        }
    }


    private onBtnItem() {
        if (this.info["trigger_time"] == null) {
            const TOKEN = 20002;

            let giftInfo = PlayerGiftSystem.Instance_item(this.info["index"]);
            let rewardList = [];
            for (const k in giftInfo.goods_id) {
                let good = new message.GoodsInfo();
                good.goodsId = giftInfo.goods_id[k];
                if (giftInfo.goods_id[k] == TOKEN) {
                    good.count = giftInfo.goods_count[k] + giftInfo.raw_token;
                } else {
                    good.count = giftInfo.goods_count[k];
                }
                rewardList.push(good);
            }

            let good = new message.GoodsInfo();
            good.goodsId = TOKEN;
            good.count = giftInfo.raw_token;

            let findToken = Table.FindF(rewardList, function (kk, vv) {
                return vv.goodsId == TOKEN;
            });

            if (!findToken && good.count != 0) {
                rewardList.splice(0, 0, good);
            }

            // "Common_DesAward"
            // ???
            loadUI(Daily_AwardPop)
                .then((dialog: Daily_AwardPop) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.SetInfoGift(rewardList, null, null);
                });
        } else {
            let info = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (this.type == 5) {
                if (info.pay_type == 1 || info.pay_type == 2) {
                    if (this.info["buy_times"] < info.buy_times) {
                        loadUI(GiftTimeNode)
                            .then((dialog: GiftTimeNode) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.info);
                            });
                    } else {
                        loadUI(GiftTimePop)
                            .then((dialog: GiftTimePop) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.info);
                            });
                    }
                } else if (info.pay_type == 3) {
                    if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                        loadUI(GiftTimeNode)
                            .then((dialog: GiftTimeNode) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.info);
                            });
                    } else {
                        loadUI(GiftTimePop)
                            .then((dialog: GiftTimePop) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.info);
                            });
                    }
                }
            } else if (this.type == 3) {
                loadUI(GiftLevelPop)
                    .then((dialog: GiftLevelPop) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(this.info);
                    });
            } else {
                loadUI(GiftFirstPopC)
                    .then((dialog: GiftFirstPopC) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(this.info);
                    });
            }
        }
    }

}
}