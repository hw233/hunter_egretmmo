namespace zj {
// 商城item
// lizhengiang
// 20190326
export class PayMallItem extends eui.ItemRenderer {
    private btnItem: eui.Button;
    private imgIcon: eui.Image;
    private groupB: eui.Group;
    private lbNameB: eui.Label;
    private imgDiscount: eui.Image;
    private lbDis: eui.Label;
    private imgDouble: eui.Image;
    private groupA: eui.Group;
    private imgType: eui.Image;
    private groupAB: eui.Group;
    private lbGetNum: eui.Label;
    private lbEndNum: eui.BitmapLabel;
    private lbEndNum_: eui.Label;
    private imgV3: eui.Image;
    private imgGestone: eui.Image;
    private lbNameA: eui.Label;
    private lbValue: eui.Label;
    private imgTips: eui.Image;
    private lbCostB: eui.BitmapLabel;
    private groupC: eui.Group;
    private imgShadow: eui.Image;
    private imgBuy: eui.Image;

    private info = null;
    private fatherType: number = null;
    private allProducts: Array<MyProductInfo> = [];
    private type: number;
    private item: TablePayIndex;

    public constructor() {
        super();
        this.skinName = "resource/skins/pay/PayMallItemSkin.exml";
        cachekeys(<string[]>UIResource["PayMallItem"], null);
        this.btnItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnItem, this);
    }

    private init() {
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
    }

    protected dataChanged() {
        this.info = this.data.info;
        this.fatherType = this.data.type;
        this.allProducts = this.data.allProducts;
        this.type = null;
        this.item = null;

        this.init();

        if (this.fatherType == TableEnum.Enum.HXHChargeType.Charge && this.info["gift_index"] == null) {
            this.item = PlayerPaySystem.PayItemByID((<MyProductInfo>this.info).cp_product_id);
            this.groupA.visible = false;
            this.groupB.visible = true;
            if (this.item == null) {
                this.setInfoDefault();
            } else {
                this.setInfoCharge();
            }
        } else if (this.fatherType == TableEnum.Enum.HXHChargeType.Charge && this.info["gift_index"] != null) {
            this.groupB.visible = false;
            this.setInfoGiftItem();
        } else if (this.fatherType == TableEnum.Enum.HXHChargeType.Gift || this.fatherType == TableEnum.Enum.HXHChargeType.Op || this.fatherType == TableEnum.Enum.HXHChargeType.Vip) {
            this.groupB.visible = false;
            this.setInfoGiftItem();
        }

        if (Device.isReviewSwitch) {
            this.imgType.visible = false;
            this.groupAB.visible = false;
            this.imgDouble.visible = false;
            this.imgDiscount.visible = false;
            this.lbDis.visible = false;
        }
    }

    private setInfoGiftItem() {
        let info = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
        this.type = info.gift_form;

        this.lbEndNum.visible = false;
        this.lbEndNum_.visible = false;

        if (PlayerItemSystem.Type2(this.info["mark"]) == message.EGoodsType.GOODS_TYPE_GENERAL) {
            this.lbCostB.text = info.name + "(" + PlayerHunterSystem.Table(this.info["mark"]).general_name + ")";
        } else {
            this.lbCostB.text = info.name;
        }
        this.imgIcon.source = cachekey(info.path, this);

        if (this.type == 1) {
            let perGet: string = "";
            if (this.info["buy_times"] < info.buy_times) {
                perGet = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.all_limit.limit, 0, 249, 0, info.buy_times - (<number>this.info["buy_times"]));
            } else {
                perGet = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.all_limit.limit, 255, 38, 38, info.buy_times - (<number>this.info["buy_times"]));
            }
            this.lbGetNum.textFlow = Util.RichText(perGet);

            this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[1], this);
            if (info.is_forever == 1) {
                this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[3], this);
            }

            let tipShow: boolean = Tips.tips_oneday_get(Number(this.info["gift_index"].toString() + this.info["index"].toString()));
            if (tipShow && (<number>this.info["buy_times"]) == info.buy_times) {
                tipShow = false;
                Tips.tips_oneday_set(Number(this.info["gift_index"].toString() + this.info["index"].toString()), true);
            }
            this.imgTips.visible = tipShow;

            let soldOut = PlayerGiftSystem.UpToStock(<number>this.info["trigger_time"] + info.duration - Game.Controller.curServerTime);
            this.lbEndNum_.visible = true;
            this.lbEndNum_.textFlow = Util.RichText(soldOut);
            if (info.is_forever == 1) {
                this.lbEndNum_.visible = false;
            }

            this.imgBuy.source = cachekey(UIConfig.UIConfig_Hunter_Pay.getorbuy[0], this);
            this.groupC.visible = (<number>this.info["buy_times"] == info.buy_times);
            if (info.pay_type == 1) {
                let payIndex = TablePayIndex.Item(info.pay_index);
                let payTbl = null;
                for (let v of this.allProducts) {
                    if (v.coin == payIndex.raw_token) {
                        payTbl = Table.DeepCopy(v);
                        break;
                    }
                }
                this.lbNameA.visible = true;
                if (payTbl != null) {
                    this.info["pay_tbl"] = {};
                    this.info["pay_tbl"] = payTbl;
                    this.lbNameA.text = Set.CashUnit(payTbl["currency"]) + payTbl["amount"];
                } else {
                    this.lbNameA.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
                }
            } else if (info.pay_type == 2) {
                this.lbNameA.text = info.price.toString();
                this.lbNameA.visible = true;
                this.imgGestone.visible = true;
            }
        } else if (this.type == 2 || this.type == 4) {
            if (this.type == 2) {
                let getStr: string = "";
                if (<number>this.info["buy_times"] > info.buy_times) {
                    getStr = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.day_last, 0, 249, 0, info.buy_times - (<number>this.info["buy_times"]));
                } else {
                    getStr = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.day_last, 255, 38, 38, info.buy_times - (<number>this.info["buy_times"]));
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
                let getStr: string = "";
                if (info.buy_times > <number>this.info["buy_times"]) {
                    getStr = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.week_last, 0, 249, 0, info.buy_times - (<number>this.info["buy_times"]));
                } else {
                    getStr = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.count_limit.week_last, 255, 38, 38, info.buy_times - (<number>this.info["buy_times"]));
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
            this.groupC.visible = (<number>this.info["buy_times"] == info.buy_times);

            let tipShow: boolean = Tips.tips_oneday_get(Number(this.info["gift_index"].toString() + this.info["index"].toString()));
            if (tipShow && (<number>this.info["buy_times"]) == info.buy_times) {
                tipShow = false;
                Tips.tips_oneday_set(Number(this.info["gift_index"].toString() + this.info["index"].toString()), true);
            }
            this.imgTips.visible = tipShow;

            if (info.pay_type == 1) {
                let payIndex = TablePayIndex.Item(info.pay_index);
                let payTbl = null;
                for (let v of this.allProducts) {
                    if (v.coin == payIndex.raw_token) {
                        payTbl = Table.DeepCopy(v);
                    }
                }
                this.lbNameA.visible = true;
                if (payTbl != null) {
                    this.info["pay_tbl"] = {};
                    this.info["pay_tbl"] = payTbl;
                    this.lbNameA.text = Set.CashUnit(payTbl["currency"]) + payTbl["amount"];
                } else {
                    this.lbNameA.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
                }
            } else if (info.pay_type == 2) {
                this.lbNameA.text = info.price.toString();
                this.lbNameA.visible = true;
                this.imgGestone.visible = true;
            }
        } else if (this.type == 3) {
            let buyTimes: number = <number>this.info["buy_times"] == 0 ? (<number>this.info["dailyIndex"]) % 100 - 1 : <number>this.info["dailyIndex"] % 100;
            let perGet: string = "";
            if (<number>this.info["buy_times"] == 0) {
                let color = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.time_limit.per_str, buyTimes, info.daily_num);
                perGet = Helper.StringFormat(TextsConfig.TextsConfig_Activity.greenstr_light, color);
            } else {
                let color = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.time_limit.per_str, buyTimes, info.daily_num);
                perGet = Helper.StringFormat(TextsConfig.TextsConfig_Activity.redstr_light, color);
            }
            let strGet: string = TextsConfig.TextsConfig_Gift.gift.time_limit.get_pro;
            let strToDate: string = PlayerGiftSystem.UpToTime(<number>this.info["trigger_time"] + info.duration - Game.Controller.curServerTime);
            let strHasget: string = <number>this.info["buy_times"] == 0 ? TextsConfig.TextsConfig_Gift.gift.time_limit.can_get : TextsConfig.TextsConfig_Gift.gift.time_limit.not_get;
            let tipShow: boolean = (<number>this.info["buy_times"] == 0);
            this.lbNameA.visible = false;
            this.imgBuy.source = cachekey(UIConfig.UIConfig_Hunter_Pay.getorbuy[1], this);
            this.groupC.visible = (<number>this.info["buy_times"] != 0);
            this.imgShadow.visible = false;
            this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[2], this);
            this.imgTips.visible = tipShow;
            this.lbGetNum.textFlow = Util.RichText(strGet + perGet);
            this.lbEndNum_.visible = true;
            this.lbEndNum_.textFlow = Util.RichText(strToDate);
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
                    strHasget = TextsConfig.TextsConfig_Gift.gift.free;
                } else if (this.info["dailyIndex"] == info.daily_index && (<number>this.info["mark"]) == 1) {
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
                    let tipShow: boolean = Tips.tips_oneday_get(Number(this.info["gift_index"].toString() + this.info["index"].toString()));
                    this.imgTips.visible = tipShow;

                    // price
                    if (info.pay_type == 1) {
                        let payIndex = TablePayIndex.Item(info.pay_index);
                        let payTbl = null;
                        for (let v of this.allProducts) {
                            if (v.coin == payIndex.raw_token) {
                                payTbl = Table.DeepCopy(v);
                                break;
                            }
                        }
                        this.lbNameA.visible = true;
                        if (payTbl != null) {
                            this.info["pay_tbl"] = {};
                            this.info["pay_tbl"] = payTbl;
                            this.lbNameA.text = Set.CashUnit(payTbl["currency"]) + payTbl["amount"];
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
                    let tipShow: boolean = Tips.tips_oneday_get(Number(this.info["gift_index"].toString() + this.info["index"].toString()));
                    this.imgTips.visible = tipShow;

                    // price
                    if (info.pay_type == 1) {
                        let payIndex = TablePayIndex.Item(info.pay_index);
                        let payTbl = null;
                        for (let v of this.allProducts) {
                            if (v.coin == payIndex.raw_token) {
                                payTbl = Table.DeepCopy(v);
                            }
                        }
                        this.lbNameA.visible = true;
                        if (payTbl != null) {
                            this.info["pay_tbl"] = {};
                            this.info["pay_tbl"] = payTbl;
                            this.lbNameA.text = Set.CashUnit(payTbl["currency"]) + payTbl["amount"];
                        } else {
                            this.lbNameA.textFlow = Util.RichText(TextsConfig.TextsConfig_Gift.no_point);
                        }
                    } else if (info.pay_type == 2) {
                        this.lbNameA.text = info.price.toString();
                        this.lbNameA.visible = true;
                        this.imgGestone.visible = true;

                        this.imgV3.visible = true;
                        this.lbEndNum_.visible = true;
                        this.lbEndNum_.text = "";
                    }

                    // end level
                    if (info.pay_type != 2) {
                        if (Game.PlayerInfoSystem.BaseInfo.level < info.limit_level) {
                            this.lbEndNum.visible = true;
                            this.lbEndNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Gift.gift.fund_limit.can_buy, info.limit_level);
                        } else {
                            let strLast = PlayerGiftSystem.UpToOpTime(<number>this.info["mark"] + info.duration - Game.Controller.curServerTime);
                            this.lbEndNum_.visible = true;
                            this.lbEndNum_.textFlow = Util.RichText(strLast);
                        }
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

        if (info.buy_times == 1 && info.is_forever == 0 && this.type != 2 && this.type != 4 && info.pay_type != 3) {
            Set.ButtonBackgroud(this.btnItem, UIConfig.UIConfig_Hunter_Pay.backButton[2][0], UIConfig.UIConfig_Hunter_Pay.backButton[2][1], UIConfig.UIConfig_Hunter_Pay.backButton[2][2]);
            this.groupAB.visible = false;
            this.imgType.source = cachekey(UIConfig.UIConfig_Gift.buy_type[6], this);
        } else {
            Set.ButtonBackgroud(this.btnItem, UIConfig.UIConfig_Hunter_Pay.backButton[1][0], UIConfig.UIConfig_Hunter_Pay.backButton[1][1], UIConfig.UIConfig_Hunter_Pay.backButton[1][2]);
        }

        if (this.lbNameA.visible == true) {
            this.lbNameA.left = 200;
            if (this.imgGestone.visible == false) {
                this.lbNameA.left = 188;
            }
        }
    }

    private setInfoDefault() {
        this.imgTips.visible = false;
        this.lbCostB.visible = true;

        // 代币
        this.lbCostB.visible = true;
        this.lbCostB.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.token, this.info["coin"]);
        // 价格
        this.lbNameB.text = Set.CashUnit(this.info["currency"]) + this.info["amount"];
    }

    private setInfoCharge() {
        if (this.item.month_type != 0) {
            this.lbCostB.visible = false;
            this.imgTips.visible = true;
        } else {
            // 代币
            this.lbCostB.visible = true;
            this.lbCostB.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.token, this.info["coin"]);
            // 查询是否购买过
            let bBought = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.payIndexs, (k, v) => {
                return v == this.item.index;
            });
            if (!bBought && this.item.product_type == TableEnum.Enum.ChargeType.DOUBLE) {
                // 未购买过且是首翻类型
                this.imgDouble.visible = true;
                this.imgDiscount.source = cachekey(UIConfig.UIConfig_Hunter_Pay.extern_away[0], this);
                this.lbDis.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.addToken, this.info["coin"]);
            } else if (bBought && this.item.product_type == TableEnum.Enum.ChargeType.DOUBLE) {
                // 购买过且是首翻类型
                this.imgDouble.visible = false;
                this.imgDiscount.source = cachekey(UIConfig.UIConfig_Hunter_Pay.extern_away[1], this);
                if (this.item.give_token == 0) {
                    this.imgDiscount.visible = false;
                    this.lbDis.visible = false;
                }
                this.lbDis.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Pay.addToken, this.item.give_token);
            } else {
                // 其他
                this.imgDouble.visible = false;
                this.imgDiscount.source = cachekey(UIConfig.UIConfig_Hunter_Pay.extern_away[1], this);
                this.lbDis.text = this.item.give_token.toString();
            }
        }

        // 价格
        let strUnit: string = Set.CashUnit(this.info["currency"]);
        let strMoney: string = this.info["amount"];
        this.lbNameB.text = strUnit + strMoney;
        // 图片
        this.imgIcon.source = cachekey(this.item.img_path, this);
    }

    public onBtnItem() {
        this[`clickButtonResponse${this.fatherType}`]();
    }

    private clickButtonResponse2() {
        let info = PlayerGiftSystem.Instance_item(this.info["gift_index"]);

        // 成长礼包到等级不能购买
        if (this.type == 6 && info.limit_level != 0 && Game.PlayerInfoSystem.BaseInfo.level >= info.limit_level && this.info["buy_times"] < 1) {
            toast_warning(LANG(TextsConfig.TextsConfig_Charge.noPay));
            return;
        }

        if (this.type == 5) {
            // 每日领取
            if (info.pay_type == 1 || info.pay_type == 2) {
                // cost
                if (this.info["buy_times"] < info.buy_times) {
                    // 未购买
                    // "HXH_GiftTimeNode"
                    loadUI(GiftTimeNode)
                        .then((dialog: GiftTimeNode) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                } else {
                    // "HXH_GiftTimePop"
                    loadUI(GiftTimePop)
                        .then((dialog: GiftTimePop) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                }
            } else if (info.pay_type == 3) {
                // free
                if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                    // 第一天未领取
                    // "HXH_GiftTimeNode"
                    loadUI(GiftTimeNode)
                        .then((dialog: GiftTimeNode) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                } else {
                    // "HXH_GiftTimePop"
                    loadUI(GiftTimePop)
                        .then((dialog: GiftTimePop) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                }
            }
        } else if (this.type == 6) {
            // 等级领取
            if (info.pay_type == 1) {
                // RMB
                if (this.info["buy_times"] < info.buy_times) {
                    // 未购买
                    // "HXH_GiftLevelRMB"
                    loadUI(GiftLevelRMB)
                        .then((dialog: GiftLevelRMB) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                } else {
                    // "HXH_GiftLevelPop"
                    loadUI(GiftLevelPop)
                        .then((dialog: GiftLevelPop) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                }
            } else if (info.pay_type == 2) {
                // token
                if (this.info["buy_times"] < info.buy_times) {
                    // 未购买
                    // "HXH_GiftLevelGemstone"
                    loadUI(GiftLevelGemstone)
                        .then((dialog: GiftLevelGemstone) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                } else {
                    // "HXH_GiftLevelPop"
                    loadUI(GiftLevelPop)
                        .then((dialog: GiftLevelPop) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                }
            } else if (info.pay_type == 3) {
                // free
                // "HXH_GiftLevelPop"
                loadUI(GiftLevelPop)
                    .then((dialog: GiftLevelPop) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                    });
            }
        } else if (this.type == 3) {
            if (this.info["dailyIndex"] == info.daily_index) {
                // 第一天
                // "HXH_GiftTimeNode"
                loadUI(GiftTimeNode)
                    .then((dialog: GiftTimeNode) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                    });
            } else {
                // "HXH_GiftTimePop"
                loadUI(GiftTimePop)
                    .then((dialog: GiftTimePop) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                    });
            }
        } else if (this.type == 1) {
            // Activity_TimeGiftFirstPopC
            loadUI(GiftFirstPopC)
                .then((dialog: GiftFirstPopC) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.setInfo(this.info, this.data.father, false);
                });
        }
    }

    private clickButtonResponse3() {
        let info = PlayerGiftSystem.Instance_item(this.info["gift_index"]);

        // 成长礼包到等级不能购买
        if (this.type == 6 && info.limit_level != 0 && Game.PlayerInfoSystem.BaseInfo.level >= info.limit_level && this.info["buy_times"] < 1) {
            toast_warning(LANG(TextsConfig.TextsConfig_Charge.noPay));
            return;
        }

        if (this.type == 5) {
            // 每日领取
            if (info.pay_type == 1 || info.pay_type == 2) {
                // cost
                if (this.info["buy_times"] < info.buy_times) {
                    // 未购买
                    // "HXH_GiftTimeNode"
                    loadUI(GiftTimeNode)
                        .then((dialog: GiftTimeNode) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                } else {
                    // "HXH_GiftTimePop"
                    loadUI(GiftTimePop)
                        .then((dialog: GiftTimePop) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                }
            } else if (info.pay_type == 3) {
                // free
                if (this.info["dailyIndex"] == info.daily_index && this.info["mark"] == 0) {
                    // 第一天未领取
                    // "HXH_GiftTimeNode"
                    loadUI(GiftTimeNode)
                        .then((dialog: GiftTimeNode) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                } else {
                    // "HXH_GiftTimePop"
                    loadUI(GiftTimePop)
                        .then((dialog: GiftTimePop) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                }
            }
        } else if (this.type == 3) {
            // free
            // "HXH_GiftLevelPop"
            loadUI(GiftLevelPop)
                .then((dialog: GiftLevelPop) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                });
        } else if (this.type == 6) {
            // 等级领取
            if (info.pay_type == 1) {
                // RMB
                if (this.info["buy_times"] < info.buy_times) {
                    // 未购买
                    // "HXH_GiftLevelRMB"
                    loadUI(GiftLevelRMB)
                        .then((dialog: GiftLevelRMB) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                } else {
                    // "HXH_GiftLevelPop"
                    loadUI(GiftLevelPop)
                        .then((dialog: GiftLevelPop) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                }
            } else if (info.pay_type == 2) {
                // token
                if (this.info["buy_times"] < info.buy_times) {
                    // 未购买
                    // "HXH_GiftLevelGemstone"
                    loadUI(GiftLevelGemstone)
                        .then((dialog: GiftLevelGemstone) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                } else {
                    // "HXH_GiftLevelPop"
                    loadUI(GiftLevelPop)
                        .then((dialog: GiftLevelPop) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                        });
                }
            } else if (info.pay_type == 3) {
                // free
                // "HXH_GiftLevelPop"
                loadUI(GiftLevelPop)
                    .then((dialog: GiftLevelPop) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                    });
            }
        } else {
            // Activity_TimeGiftFirstPopC
            loadUI(GiftFirstPopC)
                .then((dialog: GiftFirstPopC) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.setInfo(this.info, this.data.father, false);
                });
        }
    }

    private clickButtonResponse4() {
        if (this.info["gift_index"] == null) {
            // 充值
            let localIndex: number = 0;
            if (this.item != null) {
                localIndex = this.item.index;
            }

            if (Util.getAppVersionInfo().channel == "test" && this.item != null) {
                Game.PlayerPaySystem.simulateCharge(localIndex).then(() => {
                    toast_success(LANG(TextsConfig.TextsConfig_Charge.chargeSuccess));
                    setTimeout(() => {
                        (this.data.father as PayMallScene).updateItemList();
                    }, 300);

                });
            } else {
                platform.pay(PlayerPaySystem.GetProductId(localIndex, this.allProducts), 1, PlayerPaySystem.GetCpExtJson(localIndex));
            }
        } else {
            // 月卡
            let info = PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (this.type == 5) {
                // 每日领取
                if (info.pay_type == 1 || info.pay_type == 2) {
                    // cost
                    if (this.info["buy_times"] < info.buy_times) {
                        // "HXH_GiftTimeNode"
                        loadUI(GiftTimeNode)
                            .then((dialog: GiftTimeNode) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                            });
                    } else {
                        // "HXH_GiftTimePop"
                        loadUI(GiftTimePop)
                            .then((dialog: GiftTimePop) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                            });
                    }
                } else if (info.pay_type == 3) {
                    // free
                    if (this.info["dailyIndex"] < info.daily_index && this.info["mark"] == 0) {
                        // "HXH_GiftTimeNode"
                        loadUI(GiftTimeNode)
                            .then((dialog: GiftTimeNode) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                            });
                    } else {
                        // "HXH_GiftTimePop"
                        loadUI(GiftTimePop)
                            .then((dialog: GiftTimePop) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.info, this.data.father, (this.data.father as PayMallScene).updateItemList);
                            });
                    }
                }
            }
        }
    }


}
}