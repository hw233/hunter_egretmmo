namespace zj {
﻿// 礼包系统
// hexiaowei 创建于2018.12.04

export class PlayerGiftSystem {

    ///////////////////////////////////////////////////////////////////////////
    // 静态函数
    public static Instance_index(id) {
        return TableNewgift.Item(id);
    }

    public static Instance_item(id) {
        return TableNewgiftItem.Item(id);
    }

    public static Instance_days(id) {
        return TableNewgiftDaily.Item(id);
    }

    public static Instance_newGiftItem(id) {
        return TableMonthgift.Item(id);
    }

    public static Instance_newGiftIndex(id) {
        return TableClientMonthgiftIndex.Item(id);
    }

    public static Instance_sevenGift(id) {
        return TableNewgiftSeven.Item(id);
    }

    // 高级月卡是否已购买
    public static AdvanceMonthBeBought(): boolean {
        let advancedId: number = CommonConfig.month_card_fit[1];
        let advancedInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
            return v.gift_index == advancedId;
        });
        let advanvedTbl = PlayerGiftSystem.Instance_item(advancedId);

        let isBought: boolean = false;
        if (advancedInfo[0] != null) {
            isBought = (advancedInfo[0].buy_times >= 1);
        }

        return isBought;
    }

    public static GetGiftFate(index: number) {
        let tbl = TableNewgiftDaily.Table();
        let tblDays = [];
        let num: number = Math.floor(index / 100);
        for (let k in tbl) {
            if (Math.floor(tbl[k].index / 100) == num) {
                tblDays.push(tbl[k]);
            }
        }
        tblDays.sort(function (a, b) {
            return a.index - b.index;
        });
        return tblDays;
    }

    public static SortCharge(msg: Array<message.GiftInfo>) {
        let tbl = Table.DeepCopy(msg);
        let newTbl = [];
        for (let v of tbl) {
            let quality: number = 1;
            v["quality"] = 1;
            let num = Number(v.gift_index.toString() + v.index.toString());
            let form = PlayerGiftSystem.Instance_item(v.gift_index).gift_form == 4 ? 2 : PlayerGiftSystem.Instance_item(v.gift_index).gift_form;
            if (CommonConfig.month_card_fit.indexOf(v.gift_index) != -1) {
                if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                    newTbl.push(v);
                }
            }
        }

        newTbl.sort(function (a, b) {
            return PlayerGiftSystem.Instance_item(a.gift_index).sort - PlayerGiftSystem.Instance_item(b.gift_index).sort;
        });

        return newTbl;
    }

    public static SortGift(msg: Array<message.GiftInfo>) {
        let tbl = Table.DeepCopy(msg);
        let newTbl = [];

        for (let v of tbl) {
            let quality: number = 1;
            v["quality"] = 1;
            let num = Number(v.gift_index.toString() + v.index.toString());
            let form = PlayerGiftSystem.Instance_item(v.gift_index).gift_form == 4 ? 2 : PlayerGiftSystem.Instance_item(v.gift_index).gift_form;
            if (form == 3) {
                if (v.buy_times == 0) {
                    v["quality"] = Number(v["quality"]) + 2;
                } else {
                    v["quality"] = -2;
                }
            } else if (form == 1 || form == 2) {
                if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                    if (Tips.tips_oneday_get(num)) {
                        v["quality"] = Number(v["quality"]) + 1;
                    } else {
                        v["quality"] = -1;
                    }
                } else {
                    v["quality"] = -2;
                }
            } else if (form == 5) {
                // 月卡类型放在超值礼包中
                if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                    // 未购买
                    if (Tips.tips_oneday_get(num)) {
                        v["quality"] = Number(v["quality"]) + 1;
                    } else {
                        v["quality"] = -1;
                    }
                } else {
                    // 已购买
                    if (v.mark == 0) {
                        // 未领取
                        v["quality"] = Number(v["quality"]) + 1;
                    } else if (v.mark == 1) {
                        // 已领取
                        v["quality"] = -2;
                    }
                }
            }
            if (PlayerGiftSystem.Instance_item(v.gift_index).is_op == 0) {
                if (v.gift_index == 100209) {
                    newTbl.push(v);
                } else if (CommonConfig.month_card_fit.indexOf(v.gift_index) != -1) {
                    if (v.buy_times >= 1) {
                        newTbl.push(v);
                    }
                } else if (form == 5 && PlayerGiftSystem.Instance_item(v.gift_index).tips[0] != 0) {
                    if (v.buy_times >= 1 && CommonConfig.month_card_fit.indexOf(v.gift_index) == -1) {
                        newTbl.push(v);
                    }
                } else {
                    newTbl.push(v);
                }
            }
        }

        newTbl.sort(function (a, b) {
            return PlayerGiftSystem.Instance_item(a.gift_index).sort - PlayerGiftSystem.Instance_item(b.gift_index).sort;
        });

        return newTbl;
    }

    public static SortOp(msg: Array<message.GiftInfo>) {
        let tbl = Table.DeepCopy(msg);
        let newTbl = [];

        for (let v of tbl) {
            let num = Number(v.gift_index.toString() + v.index.toString());
            let info = PlayerGiftSystem.Instance_item(v.gift_index);
            let quality: number = info.sort;
            v["quality"] = info.sort;

            if (info.gift_form == 5) {
                if (info.pay_type == 1 || info.pay_type == 2) {
                    if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                        if (Tips.tips_oneday_get(num)) {
                            v["quality"] = Number(v["quality"]) + 1;
                        } else {
                            v["quality"] = -1;
                        }
                    } else {
                        if (v.mark == 0) {
                            v["quality"] = Number(v["quality"]) + 1;
                        } else if (v.mark == 1) {
                            v["quality"] = -2;
                        }
                    }
                } else if (info.pay_type == 3) {
                    if (v.mark == 0) {
                        v["quality"] = Number(v["quality"]) + 1;
                    } else if (v.mark == 1) {
                        v["quality"] = -2;
                    }
                }
            } else if (info.gift_form == 6) {
                if (info.pay_type == 1 || info.pay_type == 2) {
                    if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                        if (Tips.tips_oneday_get(num)) {
                            v["quality"] = Number(v["quality"]) + 1;
                        } else {
                            v["quality"] = -1;
                        }
                    } else {
                        if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                            v["quality"] = Number(v["quality"]) + 1;
                        } else {
                            v["quality"] = -3;
                        }
                    }
                } else if (info.pay_type == 3) {
                    if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                        v["quality"] = Number(v["quality"]) + 1;
                    } else {
                        v["quality"] = -3;
                    }
                }
            } else if (info.gift_form == 3) {
                if (v.buy_times == 0) {
                    v["quality"] = Number(v["quality"]) + 1;
                } else {
                    v["quality"] = -2;
                }
            }

            if (PlayerGiftSystem.Instance_item(v.gift_index).is_op == 1) {
                newTbl.push(v);
            }
        }

        newTbl.sort(function (a, b) {
            return PlayerGiftSystem.Instance_item(a.gift_index).sort - PlayerGiftSystem.Instance_item(b.gift_index).sort;
        });

        return newTbl;
    }

    public static OpTypeGiftShowTips(info): boolean {
        let opGiftInfo = PlayerGiftSystem.Instance_item(info["gift_index"]);
        if (opGiftInfo["gift_form"] != 6) {
            return false;
        }
        let daysInfo = PlayerGiftSystem.GetGiftFate(Number(opGiftInfo.daily_index));
        let num: number = Number(info["gift_index"].toString() + info["index"].toString());
        if (<number>info["buy_times"] < PlayerGiftSystem.Instance_item(opGiftInfo.index).buy_times) {
            // 未购买
            if (Tips.tips_oneday_get(num)) {
                return true;
            } else {
                return false;
            }
        } else {
            // 已购买
            for (let v of daysInfo) {
                let find = Table.FindF(info["markIndex"], function (key, value) {
                    return value == v["index"];
                });
                if (Game.PlayerInfoSystem.BaseInfo.level >= v["reward_level"] && !find) {
                    return true;
                }
            }
            return false;
        }
    }

    public static UpToStock(time: number): string {
        if (time == null || time == undefined) return "";
        let str: string = "";
        if (time / 86400 >= 1) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToStock[1], Math.floor(time / 86400));
        } else if (time / 3600 >= 1) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToStock[2], Math.floor(time / 3600));
        } else if (time / 60 >= 0) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToStock[3], Math.floor(time / 60) + 1);
        } else {
            str = TextsConfig.TextsConfig_Gift.upToStock[4];
        }
        return str;
    }

    public static UpToTime(time: number): string {
        if (time == null || time == undefined) return "";
        let str: string = "";
        if (time / 86400 >= 1) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime[1], Math.floor(time / 86400));
        } else if (time / 3600 >= 1) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime[2], Math.floor(time / 3600));
        } else if (time / 60 >= 0) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime[3], Math.floor(time / 60) + 1);
        } else {
            str = TextsConfig.TextsConfig_Gift.upToTime[4];
        }
        return str;
    }

    public static upToTime3(time: number): string {
        if (time == null || time == undefined) return "";
        let str: string = "";
        let day = Math.floor(time / 86400);
        let hour = Math.floor((time % 86400) / 3600);
        let min = Math.floor(((time % 86400) % 3600) / 60);
        if (day == 0) {
            if (hour == 0) {
                if (min == 0) {
                    str = TextsConfig.TextsConfig_Gift.upToTime3[4];
                } else {
                    str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime3[3], min);
                }
            } else {
                str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime3[2], hour);
            }
        } else {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime3[1], day);
        }
        return str;
    }

    public static UpToOpTime(time: number): string {
        if (time == null || time == undefined) return "";
        let str: string = "";
        if (time / 86400 >= 1) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToOpTime[1], Math.floor(time / 86400));
        } else if (time / 3600 >= 1) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToOpTime[2], Math.floor(time / 3600));
        } else if (time / 60 >= 0) {
            str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToOpTime[3], Math.floor(time / 60) + 1);
        } else {
            str = TextsConfig.TextsConfig_Gift.upToOpTime[4];
        }
        return str;
    }

    public static getNextLevel(info): number {
        let giftInfo = PlayerGiftSystem.Instance_item(info["gift_index"]);
        let daysInfo = PlayerGiftSystem.GetGiftFate(Number(giftInfo.daily_index));
        for (let v of daysInfo) {
            let limitLevel: number = v["reward_level"] != null && v["reward_level"] != "" ? Number(v["reward_level"]) : 0;
            if (Game.PlayerInfoSystem.BaseInfo.level < limitLevel) {
                return limitLevel;
            } else if (Game.PlayerInfoSystem.BaseInfo.level >= limitLevel) {
                let find = Table.FindF(info["markIndex"], function (key, value) {
                    return v["index"] == value;
                });
                if (!find) {
                    return limitLevel;
                }
            }
        }
        return null;
    }

    public static ShowInCity() {
        let showTbl = [];
        let allGiftInfoss = TableNewgiftItem.Table();// StringConfig_Table.new_gift_item
        for (const v of Game.PlayerGiftSystem.giftInfos) {
            let giftInfo = allGiftInfoss[v.gift_index];
            if (giftInfo.is_show_city != 0 && giftInfo.is_show_city != null && giftInfo.is_op != 8) {

                let showExit = Table.FindF(showTbl, function (key, value) {
                    return value.cityIndex == giftInfo.is_show_city;
                });

                if (!showExit) {
                    if (giftInfo.pay_type != 3 &&
                        giftInfo.buy_times > v.buy_times &&
                        TableEnum.Enum.GiftCityShow.indexOf(giftInfo.is_show_city) != -1 &&
                        (v.trigger_time + giftInfo.duration >= Game.Controller.curServerTime)) {
                        // 月卡类型不会结束
                        let endTime = giftInfo.duration != null ? giftInfo.duration + v.trigger_time : 0;
                        showTbl.push({ index: v.index, cityIndex: giftInfo.is_show_city, trigger_time: v.trigger_time, end_time: endTime });
                    }
                }
            }
        }

        showTbl.sort(function (a, b) {
            if (a.trigger_time == b.trigger_time) {
                return a.index - b.index;
            } else {
                return b.trigger_time - a.trigger_time;
            }
        });

        return showTbl;
    }

    public static ShowInCityOther() {
        let showTbl = [];
        let allGiftInfoss = TableNewgiftItem.Table();// StringConfig_Table.new_gift_item
        for (const v of Game.PlayerGiftSystem.giftInfos) {
            let giftInfo = allGiftInfoss[v.gift_index];
            if (giftInfo.is_show_city != 0 && giftInfo.is_show_city != null && giftInfo.is_op != 8 && giftInfo.index == giftInfo.is_show_city) {
                if (giftInfo.buy_times > v.buy_times) {
                    let endTime = giftInfo.duration != null ? giftInfo.duration + v.trigger_time : 0;
                    if ((endTime != 0 && endTime > Game.Controller.curServerTime) || endTime == 0) {
                        showTbl.push({ index: v.index, trigger_time: v.trigger_time, end_time: endTime, giftId: v.gift_index });
                    }
                }
            }
        }

        showTbl.sort(function (a, b) {
            if (a.trigger_time == b.trigger_time) {
                return a.index - b.index;
            } else {
                return b.trigger_time - a.trigger_time;
            }
        });

        return showTbl;
    }

    public static ShowInCityByPushing() {
        let showTbl = [];
        let allGiftInfoss = TableNewgiftItem.Table();// StringConfig_Table.new_gift_item
        for (const v of Game.PlayerGiftSystem.giftInfos) {
            let giftInfo = allGiftInfoss[v.gift_index];
            if (giftInfo.is_show_city != 0 && giftInfo.is_show_city != null && giftInfo.is_op == 8) {
                if (giftInfo.buy_times > v.buy_times) {
                    let endTime = giftInfo.duration != 0 ? giftInfo.duration + v.trigger_time : 0;
                    showTbl.push({ index: v.index, trigger_time: v.trigger_time, end_time: endTime, isPushing: true });
                }
            }
        }

        showTbl.sort(function (a, b) {
            if (a.trigger_time == b.trigger_time) {
                return a.index - b.index;
            } else {
                return b.trigger_time - a.trigger_time;
            }
        });

        return showTbl;
    }

    public static CurNewGift() {
        let giftTbl = [];

        if (Game.PlayerInfoSystem.BaseInfo.level < CommonConfig.month_gift_level) {
            return giftTbl;
        }

        let allNewGiftInfos = TableMonthgift.Table(); // StringConfig_Table.new_gift_items

        for (const k in allNewGiftInfos) {
            const v = allNewGiftInfos[k];
            let find = Table.FindF(giftTbl, function (kk, vv) {
                return vv.refrence == v.refrence;
            });

            if (!find) {
                let allSoldOut = PlayerGiftSystem.AllGiftByRefrenceSoldOut(v.refrence);
                let month = PlayerGiftSystem.trigger_month(v.open_time, v.duration);
                if (month != null && !allSoldOut) {
                    let tbl = {};
                    tbl["refrence"] = v.refrence;
                    tbl["month"] = month;
                    tbl["open_time"] = v.open_time;
                    giftTbl.push(tbl);
                }
            }
        }

        giftTbl.sort(function (a, b) {
            if (a.month == b.month) {
                // 相同月份
                return b.open_time - a.open_time;
            } else {
                return a.open_time - b.open_time;
            }
        });

        return giftTbl;
    }

    public static AllGiftByRefrence(refrence: number): TableMonthgift[] {
        let giftTbl: TableMonthgift[] = [];
        let allNewGiftInfos = TableMonthgift.Table();// StringConfig_Table.new_gift_items
        for (const k in allNewGiftInfos) {
            const v = allNewGiftInfos[k];
            if (v.refrence == refrence) {
                giftTbl.push(v);
            }
        }
        giftTbl.sort(function (a, b) {
            return a.index - b.index;
        });
        return giftTbl;
    }

    public static AllGiftByRefrenceSoldOut(refrence): boolean {
        let allGift = PlayerGiftSystem.AllGiftByRefrence(refrence);
        let bSoldOut: boolean = true;
        for (const v of allGift) {
            let find = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.monthGift, function (kk, vv) {
                return vv == v.index;
            });
            bSoldOut = (bSoldOut && find);
            if (!bSoldOut) {
                return bSoldOut;
            }
        }
        return bSoldOut;
    }

    private static LastMonthDays() {
        let curServerTime = Game.Controller.curServerTime;
        let cur = new Date(curServerTime * 1000);
        let lastMonth = curServerTime - (cur.getDate() - 1) * 24 * 3600 - cur.getHours() * 3600 - cur.getMinutes() * 60 - cur.getSeconds() - 1;
        return new Date(lastMonth * 1000);
    }

    public static trigger_month(start: number, duration: number): number {
        let lastMonth = PlayerGiftSystem.LastMonthDays();
        let lastMonthSec = lastMonth.getDate() * 24 * 3600;
        let curMonth = Game.Controller.serverNow();
        let curMonthSec = (curMonth.getDate() - 1) * 24 * 3600 + curMonth.getHours() * 3600 + curMonth.getMinutes() * 60 + curMonth.getSeconds();
        let month: number = null;

        if (start <= curMonthSec && start + duration >= curMonthSec) {
            month = curMonth.getMonth() + 1;
        } else if (start <= curMonthSec + lastMonthSec && start + duration >= curMonthSec + lastMonthSec) {
            month = null
        }
        return month;
    }

    public static LastTime(open_time, duration) {
        let cur = Game.Controller.serverNow();
        let cur_days = PlayerGiftSystem.cur_month_days();
        let cur_days_sec = cur_days * 86400;
        let last_time = 0;
        if (open_time + duration >= cur_days_sec) {
            last_time = cur_days_sec - cur_days * 86400 - cur.getHours() * 3600 - cur.getMinutes() * 60 - cur.getSeconds();
        } else {
            last_time = open_time + duration - (cur.getDate() - 1) * 86400 - cur.getHours() * 3600 - cur.getMinutes() * 60 - cur.getSeconds();
        }
        return last_time;
    }

    public static cur_month_days() {
        let cur = Game.Controller.serverNow();
        let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let year = cur.getFullYear();
        if ((year % 4 == 0 && year % 100 == 0) || year % 400 == 0) {
            days[1] = 29;
        }
        return days[cur.getMonth()];
    }

    public static findOpTipsVip(): boolean {
        let tips1: boolean = false;
        let tips2: boolean = false;
        let tips3: boolean = false;
        let tips4: boolean = false;
        for (const v of Game.PlayerGiftSystem.giftInfos) {
            let giftInfo = this.Instance_item(v.gift_index);
            if(giftInfo){
                if ((giftInfo.gift_form == 1 || giftInfo.gift_form == 2 || giftInfo.gift_form == 4) && giftInfo.is_op == 2) {
                    let tipShow = Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                    tips1 = (tipShow == true ? true : tips1);
                } else if (giftInfo.gift_form == 3 && giftInfo.is_op == 2) {
                    let tipShow = (v.buy_times == 0);
                    tips2 = (tipShow == true ? true : tips2);
                } else if (giftInfo.gift_form == 5 && giftInfo.is_op == 2) {
                    // 月卡类型
                    if (v.buy_times < this.Instance_item(giftInfo.index).buy_times) {
                        // 未购买
                        let tipShow = Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                        tips3 = (tipShow == true ? true : tips3);
                    } else {
                        // 已购买
                        let tipShow = (v.mark == 0);
                        tips3 = (tipShow == true ? true : tips3);
                    }
                } else if (giftInfo.gift_form == 4 && giftInfo.is_op == 2) {
                    let tipShow = Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                    tips4 = (tipShow == true ? true : tips4);
                }
            }
        }
        return (tips1 || tips2 || tips3 || tips4);
    }

    public static findOpTips() {
        let tips1: boolean = false;
        let tips2: boolean = false;
        let tips3: boolean = false;
        let tips4: boolean = false;
        for (const v of Game.PlayerGiftSystem.giftInfos) {
            let giftInfo = this.Instance_item(v.gift_index);
            if(giftInfo){
                if (giftInfo.gift_form == 3 && giftInfo.is_op == 1) {
                    let tipShow = (v.buy_times == 0);
                    tips1 = (tipShow == true ? true : tips1);
                } else if (giftInfo.gift_form == 5 && giftInfo.is_op == 1) {
                    // 月卡类型
                    if (v.buy_times < this.Instance_item(giftInfo.index).buy_times) {
                        // 未购买
                        let tipShow = Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                        tips2 = (tipShow == true ? true : tips2);
                    } else {
                        // 已购买
                        let tipShow = (v.mark == 0);
                        tips2 = (tipShow == true ? true : tips2);
                    }
                } else if (giftInfo.gift_form == 6 && giftInfo.is_op == 1) {
                    // 基金类型
                    let tipShow = PlayerGiftSystem.OpTypeGiftShowTips(v);
                    tips3 = (tipShow == true ? true : tips3);
                } else if (giftInfo.gift_form == 4 && giftInfo.is_op == 1) {
                    // n选1礼包
                    let tipShow = Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                    tips4 = (tipShow == true ? true : tips4);
                }
            }
        }
        return (tips1 || tips2 || tips3 || tips4);
    }

    public static findTips() {
        let tips1: boolean = false;
        let tips2: boolean = false;
        let tips3: boolean = false;
        let tips4: boolean = false;
        let tips5: boolean = false;
        for (const v of Game.PlayerGiftSystem.giftInfos) {
            let giftInfo = this.Instance_item(v.gift_index);
            if(giftInfo){
                if ((giftInfo.gift_form == 1 || giftInfo.gift_form == 2 || giftInfo.gift_form == 4) && giftInfo.is_op == 0) {
                    let tipShow = Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                    tips1 = (tipShow == true ? true : tips1);
                } else if (giftInfo.gift_form == 6 && giftInfo.is_op == 0) {
                    // 基金类型
                    let tipShow = PlayerGiftSystem.OpTypeGiftShowTips(v);
                    tips4 = (tipShow == true ? true : tips4);
                } else if (giftInfo.gift_form == 3 && giftInfo.is_op == 0) {
                    let tipShow = (v.buy_times == 0);
                    tips2 = (tipShow == true ? true : tips2);
                } else if (giftInfo.gift_form == 5 && giftInfo.is_op == 0) {
                    // 月卡类型
                    if (giftInfo.info[0] == "0") {
                        if (v.buy_times < this.Instance_item(giftInfo.index).buy_times) {
                            // 未购买
                            let tipShow = Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                            tips3 = (tipShow == true ? true : tips3);
                        } else {
                            // 已购买
                            let tipShow = (v.mark == 0);
                            tips3 = (tipShow == true ? true : tips3);
                        }
                    } else {
                        // 新手礼包
                        if (v.buy_times >= this.Instance_item(giftInfo.index).buy_times) {
                            // 已购买
                            let tipShow = (v.mark == 0);
                            tips3 = (tipShow == true ? true : tips3);
                        }
                    }
                }
            }
        }
        return (tips1 || tips2 || tips3 || tips4 || tips5);
    }

    public static findTipsCharge() {
        let tips5: boolean = false;
        for (const v of Game.PlayerGiftSystem.giftInfos) {
            let giftInfo = PlayerGiftSystem.Instance_item(v.gift_index);
            if (giftInfo && giftInfo.gift_form == 5 && giftInfo.is_op == 3) {
                // 月卡类型
                if (v.buy_times < PlayerGiftSystem.Instance_item(giftInfo.index).buy_times) {
                    // 未购买
                    let tipShow = Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                    tips5 = (tipShow == true ? true : tips5);
                } else {
                    // 已购买
                    let tipShow = v.mark == 0;
                    tips5 = (tipShow == true ? true : tips5);
                }
            }
        }
        return tips5;
    }

    // 荣耀福利
    public static SortVipX(msg) {
        let tbl = Table.DeepCopy(msg);
        let newTbl = [];

        for (const k of Object.keys(tbl)) {
            let v = tbl[k];
            let num = Number(v.gift_index + v.index);
            let info = PlayerGiftSystem.Instance_item(v.gift_index);

            v.quality = info.sort;

            if (info.gift_form == 5) {
                if (info.pay_type == 1 || info.pay_type == 2) {
                    if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                        if (Tips.tips_oneday_get(num)) {
                            v.quality = v.quality + 1;
                        } else {
                            v.quality = -1;
                        }
                    } else {
                        if (v.mark == 0) {
                            v.quality = v.quality + 1;
                        } else if (v.mark == 1) {
                            v.quality = -2;
                        }
                    }
                } else if (info.pay_type == 3) {
                    if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                        v.quality = v.quality + 1;
                    } else {
                        v.quality = -3;
                    }
                }
            } else if (info.gift_form == 6) {
                if (info.pay_type == 1 || info.pay_type == 2) {
                    if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                        if (Tips.tips_oneday_get(num)) {
                            v.quality = v.quality + 1;
                        } else {
                            v.quality = -1;
                        }
                    } else {
                        if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                            v.quality = v.quality + 1;
                        } else {
                            v.quality = -3;
                        }
                    }
                } else if (info.pay_type == 3) {
                    if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                        v.quality = v.quality + 1;
                    } else {
                        v.quality = -3;
                    }
                }
            } else if (info.gift_form == 3) {
                if (v.buy_times == 0) {
                    v.quality = v.quality + 1;
                } else {
                    v.quality = -2;
                }
            }

            if (PlayerGiftSystem.Instance_item(v.gift_index).is_op == 2) {
                newTbl.push(v);
            }
        }

        newTbl.sort(function (a, b) {
            let aTbl = PlayerGiftSystem.Instance_item(a.gift_index);
            let bTbl = PlayerGiftSystem.Instance_item(b.gift_index);
            return aTbl.sort - bTbl.sort;
        });

        return newTbl;
    }

    public static Trigger(): TableNewgiftItem[] {
        let giftTbl = TableNewgift.Table(); // StringConfig_Table.new_gift
        let tbl = TableLicenceWeal.Table(); // StringConfig_Table.vipWeal

        let nextLevelInfo: TableLicenceWeal = null;
        for (const v of Object.keys(tbl)) {
            if (Game.PlayerInfoSystem.BaseInfo.chargeToken >= tbl[v].sum && tbl[v].charge != "" && Game.PlayerInfoSystem.BaseInfo.chargeToken < tbl[v].sum + Number(tbl[v].charge)) {
                nextLevelInfo = tbl[Number(v) + 1];
                break;
            }
        }

        if (nextLevelInfo == null) return;

        let nextVipLevelGift: TableNewgift = null;
        for (const v of Object.keys(giftTbl)) {
            const vv = giftTbl[v];
            if (vv.gift_type == 6 && Number(vv.trigger_add) >= nextLevelInfo.sum && (nextLevelInfo.charge == "" || Number(vv.trigger_add) < nextLevelInfo.sum + Number(nextLevelInfo.charge))) {
                nextVipLevelGift = vv;
            }
        }

        if (nextVipLevelGift == null) return;

        let giftInfo: TableNewgiftItem[] = [];
        for (const v of nextVipLevelGift.trigger_gift) {
            giftInfo.push(PlayerGiftSystem.Instance_item(v));
        }

        giftInfo.sort(function (a, b) {
            let aTbl = PlayerGiftSystem.Instance_item(a.index);
            let bTbl = PlayerGiftSystem.Instance_item(b.index);
            return bTbl.sort - aTbl.sort;
        });

        return giftInfo;
    }


    ///////////////////////////////////////////////////////////////////////////
    // 变量
    public giftInfos: Array<message.GiftInfo> = []; //  礼包类型
    private mapGiftsInfo: { [id: number]: message.GiftInfo } = {}; // 礼包信息

    ///////////////////////////////////////////////////////////////////////////
    // 成员方法

    public init() {
        Game.EventManager.on(GameEvent.PLAYER_GIFTS_INFO_CHANGE, this.onGiftsInfoChange, this);
    }

    public uninit() {
        this.giftInfos = [];
        this.mapGiftsInfo = {};
    }

    private onGiftsInfoChange(ev: PlayerGiftsInfoChangeEvent) {
        this.giftInfos = ev.giftInfos;
        // 删掉表里没有的礼包
        if(this.giftInfos && this.giftInfos.length > 0){
            let list = TableNewgiftItem.Table();
            for(let i = this.giftInfos.length - 1; i >= 0; --i){
                if(!list[this.giftInfos[i].gift_index]){
                    this.giftInfos.splice(i, 1);
                }
            }
        }

        for (let gift of ev.giftInfos) {
            this.mapGiftsInfo[gift.index] = gift;
        }
        for (let i = 0; i < ev.delGiftIndexs.length; i++) {
            delete this.mapGiftsInfo[ev.delGiftIndexs[i]];
        }
    }

    //跳转到特定的id
    public JumpToGiftById(index, gift_index, cb?: () => void) {
        let giftInfo = PlayerGiftSystem.Instance_item(gift_index);
        let ui = null;
        if (giftInfo.is_op == 1) {
            //绝版
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.loadFrom(TableEnum.Enum.HXHChargeType.Op, index);
                });
            // let [ _ , findk] = Table.FindR()
        } else if (giftInfo.is_op == 0) {
            // 超值
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.loadFrom(TableEnum.Enum.HXHChargeType.Gift, index);
                });
        }
    }

    //首冲
    public firstCharge() {
        let num: any = TableFirstCharge.Table();
        let start = 0;
        let end = Object.keys(num).length;
        let ret = [];
        for (let i = start; i < end; i++) {
            ret[i] = TableFirstCharge.Item(i + 1);
        }
        return ret;
    }


    //是否存在啤酒礼包
    public beerGift() {
        let isHaveBeerGift = Table.FindF(Game.PlayerGiftSystem.giftInfos, function (k, v) {
            return v.gift_index == 100201;
        })
        let giftBTime = PlayerGiftSystem.Instance_item(100202).buy_times;
        let isHaveBeerGiftB = Table.FindF(Game.PlayerGiftSystem.giftInfos, function (k, v) {
            let date = Game.Controller.serverNow();
            let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            let serverTime = humanDate.getTime() / 1000 - 8 * 60 * 60;
            return v.gift_index == 100202 && v.buy_times < giftBTime && (v.trigger_time + PlayerGiftSystem.Instance_item(100202).duration) >= serverTime
        })
        let resultId = isHaveBeerGiftB && 100202 || (isHaveBeerGift && 100201 || false)
        return resultId;
    }

    public getNewGift(): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.GetNewGiftRequest();

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.GetNewGiftResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                resolve(response.body.gameInfo);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    public rewardFormNewGift(giftIndex: number, dailyindex: number = 0): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.RewardFormNewGiftRequest();
            request.body.giftIndex = giftIndex;
            request.body.dailyindex = dailyindex;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.RewardFormNewGiftResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                resolve(response.body.gameInfo);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    public rewardNewGift(giftIndex: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.RewardNewGiftRequest();
            request.body.giftIndex = giftIndex;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.RewardNewGiftResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                resolve(response.body.gameInfo);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, true);
        });
    }

    public newGiftExist(giftIndex: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.NewGiftExistRequest();
            request.body.giftIndex = giftIndex;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.NewGiftExistResponse>resp;
                if (response.header.result != 0) {
                    // reject(response.header.result);
                    return;
                }

                resolve();
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    public secretMallBuy(index: number, mallId: number, itemId: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.SecretMallBuyRequest();
            request.body.index = index;
            request.body.mall_id = mallId;
            request.body.item_id = itemId;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SecretMallBuyResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                resolve(response.body.gameInfo);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

}
}