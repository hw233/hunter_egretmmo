var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 礼包系统
    // hexiaowei 创建于2018.12.04
    var PlayerGiftSystem = (function () {
        function PlayerGiftSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 变量
            this.giftInfos = []; //  礼包类型
            this.mapGiftsInfo = {}; // 礼包信息
        }
        ///////////////////////////////////////////////////////////////////////////
        // 静态函数
        PlayerGiftSystem.Instance_index = function (id) {
            return zj.TableNewgift.Item(id);
        };
        PlayerGiftSystem.Instance_item = function (id) {
            return zj.TableNewgiftItem.Item(id);
        };
        PlayerGiftSystem.Instance_days = function (id) {
            return zj.TableNewgiftDaily.Item(id);
        };
        PlayerGiftSystem.Instance_newGiftItem = function (id) {
            return zj.TableMonthgift.Item(id);
        };
        PlayerGiftSystem.Instance_newGiftIndex = function (id) {
            return zj.TableClientMonthgiftIndex.Item(id);
        };
        PlayerGiftSystem.Instance_sevenGift = function (id) {
            return zj.TableNewgiftSeven.Item(id);
        };
        // 高级月卡是否已购买
        PlayerGiftSystem.AdvanceMonthBeBought = function () {
            var advancedId = zj.CommonConfig.month_card_fit[1];
            var advancedInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == advancedId;
            });
            var advanvedTbl = PlayerGiftSystem.Instance_item(advancedId);
            var isBought = false;
            if (advancedInfo[0] != null) {
                isBought = (advancedInfo[0].buy_times >= 1);
            }
            return isBought;
        };
        PlayerGiftSystem.GetGiftFate = function (index) {
            var tbl = zj.TableNewgiftDaily.Table();
            var tblDays = [];
            var num = Math.floor(index / 100);
            for (var k in tbl) {
                if (Math.floor(tbl[k].index / 100) == num) {
                    tblDays.push(tbl[k]);
                }
            }
            tblDays.sort(function (a, b) {
                return a.index - b.index;
            });
            return tblDays;
        };
        PlayerGiftSystem.SortCharge = function (msg) {
            var tbl = zj.Table.DeepCopy(msg);
            var newTbl = [];
            for (var _i = 0, tbl_1 = tbl; _i < tbl_1.length; _i++) {
                var v = tbl_1[_i];
                var quality = 1;
                v["quality"] = 1;
                var num = Number(v.gift_index.toString() + v.index.toString());
                var form = PlayerGiftSystem.Instance_item(v.gift_index).gift_form == 4 ? 2 : PlayerGiftSystem.Instance_item(v.gift_index).gift_form;
                if (zj.CommonConfig.month_card_fit.indexOf(v.gift_index) != -1) {
                    if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                        newTbl.push(v);
                    }
                }
            }
            newTbl.sort(function (a, b) {
                return PlayerGiftSystem.Instance_item(a.gift_index).sort - PlayerGiftSystem.Instance_item(b.gift_index).sort;
            });
            return newTbl;
        };
        PlayerGiftSystem.SortGift = function (msg) {
            var tbl = zj.Table.DeepCopy(msg);
            var newTbl = [];
            for (var _i = 0, tbl_2 = tbl; _i < tbl_2.length; _i++) {
                var v = tbl_2[_i];
                var quality = 1;
                v["quality"] = 1;
                var num = Number(v.gift_index.toString() + v.index.toString());
                var form = PlayerGiftSystem.Instance_item(v.gift_index).gift_form == 4 ? 2 : PlayerGiftSystem.Instance_item(v.gift_index).gift_form;
                if (form == 3) {
                    if (v.buy_times == 0) {
                        v["quality"] = Number(v["quality"]) + 2;
                    }
                    else {
                        v["quality"] = -2;
                    }
                }
                else if (form == 1 || form == 2) {
                    if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                        if (zj.Tips.tips_oneday_get(num)) {
                            v["quality"] = Number(v["quality"]) + 1;
                        }
                        else {
                            v["quality"] = -1;
                        }
                    }
                    else {
                        v["quality"] = -2;
                    }
                }
                else if (form == 5) {
                    // 月卡类型放在超值礼包中
                    if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                        // 未购买
                        if (zj.Tips.tips_oneday_get(num)) {
                            v["quality"] = Number(v["quality"]) + 1;
                        }
                        else {
                            v["quality"] = -1;
                        }
                    }
                    else {
                        // 已购买
                        if (v.mark == 0) {
                            // 未领取
                            v["quality"] = Number(v["quality"]) + 1;
                        }
                        else if (v.mark == 1) {
                            // 已领取
                            v["quality"] = -2;
                        }
                    }
                }
                if (PlayerGiftSystem.Instance_item(v.gift_index).is_op == 0) {
                    if (v.gift_index == 100209) {
                        newTbl.push(v);
                    }
                    else if (zj.CommonConfig.month_card_fit.indexOf(v.gift_index) != -1) {
                        if (v.buy_times >= 1) {
                            newTbl.push(v);
                        }
                    }
                    else if (form == 5 && PlayerGiftSystem.Instance_item(v.gift_index).tips[0] != 0) {
                        if (v.buy_times >= 1 && zj.CommonConfig.month_card_fit.indexOf(v.gift_index) == -1) {
                            newTbl.push(v);
                        }
                    }
                    else {
                        newTbl.push(v);
                    }
                }
            }
            newTbl.sort(function (a, b) {
                return PlayerGiftSystem.Instance_item(a.gift_index).sort - PlayerGiftSystem.Instance_item(b.gift_index).sort;
            });
            return newTbl;
        };
        PlayerGiftSystem.SortOp = function (msg) {
            var tbl = zj.Table.DeepCopy(msg);
            var newTbl = [];
            for (var _i = 0, tbl_3 = tbl; _i < tbl_3.length; _i++) {
                var v = tbl_3[_i];
                var num = Number(v.gift_index.toString() + v.index.toString());
                var info = PlayerGiftSystem.Instance_item(v.gift_index);
                var quality = info.sort;
                v["quality"] = info.sort;
                if (info.gift_form == 5) {
                    if (info.pay_type == 1 || info.pay_type == 2) {
                        if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                            if (zj.Tips.tips_oneday_get(num)) {
                                v["quality"] = Number(v["quality"]) + 1;
                            }
                            else {
                                v["quality"] = -1;
                            }
                        }
                        else {
                            if (v.mark == 0) {
                                v["quality"] = Number(v["quality"]) + 1;
                            }
                            else if (v.mark == 1) {
                                v["quality"] = -2;
                            }
                        }
                    }
                    else if (info.pay_type == 3) {
                        if (v.mark == 0) {
                            v["quality"] = Number(v["quality"]) + 1;
                        }
                        else if (v.mark == 1) {
                            v["quality"] = -2;
                        }
                    }
                }
                else if (info.gift_form == 6) {
                    if (info.pay_type == 1 || info.pay_type == 2) {
                        if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                            if (zj.Tips.tips_oneday_get(num)) {
                                v["quality"] = Number(v["quality"]) + 1;
                            }
                            else {
                                v["quality"] = -1;
                            }
                        }
                        else {
                            if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                                v["quality"] = Number(v["quality"]) + 1;
                            }
                            else {
                                v["quality"] = -3;
                            }
                        }
                    }
                    else if (info.pay_type == 3) {
                        if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                            v["quality"] = Number(v["quality"]) + 1;
                        }
                        else {
                            v["quality"] = -3;
                        }
                    }
                }
                else if (info.gift_form == 3) {
                    if (v.buy_times == 0) {
                        v["quality"] = Number(v["quality"]) + 1;
                    }
                    else {
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
        };
        PlayerGiftSystem.OpTypeGiftShowTips = function (info) {
            var opGiftInfo = PlayerGiftSystem.Instance_item(info["gift_index"]);
            if (opGiftInfo["gift_form"] != 6) {
                return false;
            }
            var daysInfo = PlayerGiftSystem.GetGiftFate(Number(opGiftInfo.daily_index));
            var num = Number(info["gift_index"].toString() + info["index"].toString());
            if (info["buy_times"] < PlayerGiftSystem.Instance_item(opGiftInfo.index).buy_times) {
                // 未购买
                if (zj.Tips.tips_oneday_get(num)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                var _loop_1 = function (v) {
                    var find = zj.Table.FindF(info["markIndex"], function (key, value) {
                        return value == v["index"];
                    });
                    if (zj.Game.PlayerInfoSystem.BaseInfo.level >= v["reward_level"] && !find) {
                        return { value: true };
                    }
                };
                // 已购买
                for (var _i = 0, daysInfo_1 = daysInfo; _i < daysInfo_1.length; _i++) {
                    var v = daysInfo_1[_i];
                    var state_1 = _loop_1(v);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                return false;
            }
        };
        PlayerGiftSystem.UpToStock = function (time) {
            if (time == null || time == undefined)
                return "";
            var str = "";
            if (time / 86400 >= 1) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToStock[1], Math.floor(time / 86400));
            }
            else if (time / 3600 >= 1) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToStock[2], Math.floor(time / 3600));
            }
            else if (time / 60 >= 0) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToStock[3], Math.floor(time / 60) + 1);
            }
            else {
                str = zj.TextsConfig.TextsConfig_Gift.upToStock[4];
            }
            return str;
        };
        PlayerGiftSystem.UpToTime = function (time) {
            if (time == null || time == undefined)
                return "";
            var str = "";
            if (time / 86400 >= 1) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime[1], Math.floor(time / 86400));
            }
            else if (time / 3600 >= 1) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime[2], Math.floor(time / 3600));
            }
            else if (time / 60 >= 0) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime[3], Math.floor(time / 60) + 1);
            }
            else {
                str = zj.TextsConfig.TextsConfig_Gift.upToTime[4];
            }
            return str;
        };
        PlayerGiftSystem.upToTime3 = function (time) {
            if (time == null || time == undefined)
                return "";
            var str = "";
            var day = Math.floor(time / 86400);
            var hour = Math.floor((time % 86400) / 3600);
            var min = Math.floor(((time % 86400) % 3600) / 60);
            if (day == 0) {
                if (hour == 0) {
                    if (min == 0) {
                        str = zj.TextsConfig.TextsConfig_Gift.upToTime3[4];
                    }
                    else {
                        str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime3[3], min);
                    }
                }
                else {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime3[2], hour);
                }
            }
            else {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToTime3[1], day);
            }
            return str;
        };
        PlayerGiftSystem.UpToOpTime = function (time) {
            if (time == null || time == undefined)
                return "";
            var str = "";
            if (time / 86400 >= 1) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToOpTime[1], Math.floor(time / 86400));
            }
            else if (time / 3600 >= 1) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToOpTime[2], Math.floor(time / 3600));
            }
            else if (time / 60 >= 0) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Gift.upToOpTime[3], Math.floor(time / 60) + 1);
            }
            else {
                str = zj.TextsConfig.TextsConfig_Gift.upToOpTime[4];
            }
            return str;
        };
        PlayerGiftSystem.getNextLevel = function (info) {
            var giftInfo = PlayerGiftSystem.Instance_item(info["gift_index"]);
            var daysInfo = PlayerGiftSystem.GetGiftFate(Number(giftInfo.daily_index));
            var _loop_2 = function (v) {
                var limitLevel = v["reward_level"] != null && v["reward_level"] != "" ? Number(v["reward_level"]) : 0;
                if (zj.Game.PlayerInfoSystem.BaseInfo.level < limitLevel) {
                    return { value: limitLevel };
                }
                else if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limitLevel) {
                    var find = zj.Table.FindF(info["markIndex"], function (key, value) {
                        return v["index"] == value;
                    });
                    if (!find) {
                        return { value: limitLevel };
                    }
                }
            };
            for (var _i = 0, daysInfo_2 = daysInfo; _i < daysInfo_2.length; _i++) {
                var v = daysInfo_2[_i];
                var state_2 = _loop_2(v);
                if (typeof state_2 === "object")
                    return state_2.value;
            }
            return null;
        };
        PlayerGiftSystem.ShowInCity = function () {
            var showTbl = [];
            var allGiftInfoss = zj.TableNewgiftItem.Table(); // StringConfig_Table.new_gift_item
            var _loop_3 = function (v) {
                var giftInfo = allGiftInfoss[v.gift_index];
                if (giftInfo.is_show_city != 0 && giftInfo.is_show_city != null && giftInfo.is_op != 8) {
                    var showExit = zj.Table.FindF(showTbl, function (key, value) {
                        return value.cityIndex == giftInfo.is_show_city;
                    });
                    if (!showExit) {
                        if (giftInfo.pay_type != 3 &&
                            giftInfo.buy_times > v.buy_times &&
                            zj.TableEnum.Enum.GiftCityShow.indexOf(giftInfo.is_show_city) != -1 &&
                            (v.trigger_time + giftInfo.duration >= zj.Game.Controller.curServerTime)) {
                            // 月卡类型不会结束
                            var endTime = giftInfo.duration != null ? giftInfo.duration + v.trigger_time : 0;
                            showTbl.push({ index: v.index, cityIndex: giftInfo.is_show_city, trigger_time: v.trigger_time, end_time: endTime });
                        }
                    }
                }
            };
            for (var _i = 0, _a = zj.Game.PlayerGiftSystem.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                _loop_3(v);
            }
            showTbl.sort(function (a, b) {
                if (a.trigger_time == b.trigger_time) {
                    return a.index - b.index;
                }
                else {
                    return b.trigger_time - a.trigger_time;
                }
            });
            return showTbl;
        };
        PlayerGiftSystem.ShowInCityOther = function () {
            var showTbl = [];
            var allGiftInfoss = zj.TableNewgiftItem.Table(); // StringConfig_Table.new_gift_item
            for (var _i = 0, _a = zj.Game.PlayerGiftSystem.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                var giftInfo = allGiftInfoss[v.gift_index];
                if (giftInfo.is_show_city != 0 && giftInfo.is_show_city != null && giftInfo.is_op != 8 && giftInfo.index == giftInfo.is_show_city) {
                    if (giftInfo.buy_times > v.buy_times) {
                        var endTime = giftInfo.duration != null ? giftInfo.duration + v.trigger_time : 0;
                        if ((endTime != 0 && endTime > zj.Game.Controller.curServerTime) || endTime == 0) {
                            showTbl.push({ index: v.index, trigger_time: v.trigger_time, end_time: endTime, giftId: v.gift_index });
                        }
                    }
                }
            }
            showTbl.sort(function (a, b) {
                if (a.trigger_time == b.trigger_time) {
                    return a.index - b.index;
                }
                else {
                    return b.trigger_time - a.trigger_time;
                }
            });
            return showTbl;
        };
        PlayerGiftSystem.ShowInCityByPushing = function () {
            var showTbl = [];
            var allGiftInfoss = zj.TableNewgiftItem.Table(); // StringConfig_Table.new_gift_item
            for (var _i = 0, _a = zj.Game.PlayerGiftSystem.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                var giftInfo = allGiftInfoss[v.gift_index];
                if (giftInfo.is_show_city != 0 && giftInfo.is_show_city != null && giftInfo.is_op == 8) {
                    if (giftInfo.buy_times > v.buy_times) {
                        var endTime = giftInfo.duration != 0 ? giftInfo.duration + v.trigger_time : 0;
                        showTbl.push({ index: v.index, trigger_time: v.trigger_time, end_time: endTime, isPushing: true });
                    }
                }
            }
            showTbl.sort(function (a, b) {
                if (a.trigger_time == b.trigger_time) {
                    return a.index - b.index;
                }
                else {
                    return b.trigger_time - a.trigger_time;
                }
            });
            return showTbl;
        };
        PlayerGiftSystem.CurNewGift = function () {
            var giftTbl = [];
            if (zj.Game.PlayerInfoSystem.BaseInfo.level < zj.CommonConfig.month_gift_level) {
                return giftTbl;
            }
            var allNewGiftInfos = zj.TableMonthgift.Table(); // StringConfig_Table.new_gift_items
            var _loop_4 = function (k) {
                var v = allNewGiftInfos[k];
                var find = zj.Table.FindF(giftTbl, function (kk, vv) {
                    return vv.refrence == v.refrence;
                });
                if (!find) {
                    var allSoldOut = PlayerGiftSystem.AllGiftByRefrenceSoldOut(v.refrence);
                    var month = PlayerGiftSystem.trigger_month(v.open_time, v.duration);
                    if (month != null && !allSoldOut) {
                        var tbl = {};
                        tbl["refrence"] = v.refrence;
                        tbl["month"] = month;
                        tbl["open_time"] = v.open_time;
                        giftTbl.push(tbl);
                    }
                }
            };
            for (var k in allNewGiftInfos) {
                _loop_4(k);
            }
            giftTbl.sort(function (a, b) {
                if (a.month == b.month) {
                    // 相同月份
                    return b.open_time - a.open_time;
                }
                else {
                    return a.open_time - b.open_time;
                }
            });
            return giftTbl;
        };
        PlayerGiftSystem.AllGiftByRefrence = function (refrence) {
            var giftTbl = [];
            var allNewGiftInfos = zj.TableMonthgift.Table(); // StringConfig_Table.new_gift_items
            for (var k in allNewGiftInfos) {
                var v = allNewGiftInfos[k];
                if (v.refrence == refrence) {
                    giftTbl.push(v);
                }
            }
            giftTbl.sort(function (a, b) {
                return a.index - b.index;
            });
            return giftTbl;
        };
        PlayerGiftSystem.AllGiftByRefrenceSoldOut = function (refrence) {
            var allGift = PlayerGiftSystem.AllGiftByRefrence(refrence);
            var bSoldOut = true;
            var _loop_5 = function (v) {
                var find = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.monthGift, function (kk, vv) {
                    return vv == v.index;
                });
                bSoldOut = (bSoldOut && find);
                if (!bSoldOut) {
                    return { value: bSoldOut };
                }
            };
            for (var _i = 0, allGift_1 = allGift; _i < allGift_1.length; _i++) {
                var v = allGift_1[_i];
                var state_3 = _loop_5(v);
                if (typeof state_3 === "object")
                    return state_3.value;
            }
            return bSoldOut;
        };
        PlayerGiftSystem.LastMonthDays = function () {
            var curServerTime = zj.Game.Controller.curServerTime;
            var cur = new Date(curServerTime * 1000);
            var lastMonth = curServerTime - (cur.getDate() - 1) * 24 * 3600 - cur.getHours() * 3600 - cur.getMinutes() * 60 - cur.getSeconds() - 1;
            return new Date(lastMonth * 1000);
        };
        PlayerGiftSystem.trigger_month = function (start, duration) {
            var lastMonth = PlayerGiftSystem.LastMonthDays();
            var lastMonthSec = lastMonth.getDate() * 24 * 3600;
            var curMonth = zj.Game.Controller.serverNow();
            var curMonthSec = (curMonth.getDate() - 1) * 24 * 3600 + curMonth.getHours() * 3600 + curMonth.getMinutes() * 60 + curMonth.getSeconds();
            var month = null;
            if (start <= curMonthSec && start + duration >= curMonthSec) {
                month = curMonth.getMonth() + 1;
            }
            else if (start <= curMonthSec + lastMonthSec && start + duration >= curMonthSec + lastMonthSec) {
                month = null;
            }
            return month;
        };
        PlayerGiftSystem.LastTime = function (open_time, duration) {
            var cur = zj.Game.Controller.serverNow();
            var cur_days = PlayerGiftSystem.cur_month_days();
            var cur_days_sec = cur_days * 86400;
            var last_time = 0;
            if (open_time + duration >= cur_days_sec) {
                last_time = cur_days_sec - cur_days * 86400 - cur.getHours() * 3600 - cur.getMinutes() * 60 - cur.getSeconds();
            }
            else {
                last_time = open_time + duration - (cur.getDate() - 1) * 86400 - cur.getHours() * 3600 - cur.getMinutes() * 60 - cur.getSeconds();
            }
            return last_time;
        };
        PlayerGiftSystem.cur_month_days = function () {
            var cur = zj.Game.Controller.serverNow();
            var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var year = cur.getFullYear();
            if ((year % 4 == 0 && year % 100 == 0) || year % 400 == 0) {
                days[1] = 29;
            }
            return days[cur.getMonth()];
        };
        PlayerGiftSystem.findOpTipsVip = function () {
            var tips1 = false;
            var tips2 = false;
            var tips3 = false;
            var tips4 = false;
            for (var _i = 0, _a = zj.Game.PlayerGiftSystem.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                var giftInfo = this.Instance_item(v.gift_index);
                if (giftInfo) {
                    if ((giftInfo.gift_form == 1 || giftInfo.gift_form == 2 || giftInfo.gift_form == 4) && giftInfo.is_op == 2) {
                        var tipShow = zj.Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                        tips1 = (tipShow == true ? true : tips1);
                    }
                    else if (giftInfo.gift_form == 3 && giftInfo.is_op == 2) {
                        var tipShow = (v.buy_times == 0);
                        tips2 = (tipShow == true ? true : tips2);
                    }
                    else if (giftInfo.gift_form == 5 && giftInfo.is_op == 2) {
                        // 月卡类型
                        if (v.buy_times < this.Instance_item(giftInfo.index).buy_times) {
                            // 未购买
                            var tipShow = zj.Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                            tips3 = (tipShow == true ? true : tips3);
                        }
                        else {
                            // 已购买
                            var tipShow = (v.mark == 0);
                            tips3 = (tipShow == true ? true : tips3);
                        }
                    }
                    else if (giftInfo.gift_form == 4 && giftInfo.is_op == 2) {
                        var tipShow = zj.Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                        tips4 = (tipShow == true ? true : tips4);
                    }
                }
            }
            return (tips1 || tips2 || tips3 || tips4);
        };
        PlayerGiftSystem.findOpTips = function () {
            var tips1 = false;
            var tips2 = false;
            var tips3 = false;
            var tips4 = false;
            for (var _i = 0, _a = zj.Game.PlayerGiftSystem.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                var giftInfo = this.Instance_item(v.gift_index);
                if (giftInfo) {
                    if (giftInfo.gift_form == 3 && giftInfo.is_op == 1) {
                        var tipShow = (v.buy_times == 0);
                        tips1 = (tipShow == true ? true : tips1);
                    }
                    else if (giftInfo.gift_form == 5 && giftInfo.is_op == 1) {
                        // 月卡类型
                        if (v.buy_times < this.Instance_item(giftInfo.index).buy_times) {
                            // 未购买
                            var tipShow = zj.Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                            tips2 = (tipShow == true ? true : tips2);
                        }
                        else {
                            // 已购买
                            var tipShow = (v.mark == 0);
                            tips2 = (tipShow == true ? true : tips2);
                        }
                    }
                    else if (giftInfo.gift_form == 6 && giftInfo.is_op == 1) {
                        // 基金类型
                        var tipShow = PlayerGiftSystem.OpTypeGiftShowTips(v);
                        tips3 = (tipShow == true ? true : tips3);
                    }
                    else if (giftInfo.gift_form == 4 && giftInfo.is_op == 1) {
                        // n选1礼包
                        var tipShow = zj.Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                        tips4 = (tipShow == true ? true : tips4);
                    }
                }
            }
            return (tips1 || tips2 || tips3 || tips4);
        };
        PlayerGiftSystem.findTips = function () {
            var tips1 = false;
            var tips2 = false;
            var tips3 = false;
            var tips4 = false;
            var tips5 = false;
            for (var _i = 0, _a = zj.Game.PlayerGiftSystem.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                var giftInfo = this.Instance_item(v.gift_index);
                if (giftInfo) {
                    if ((giftInfo.gift_form == 1 || giftInfo.gift_form == 2 || giftInfo.gift_form == 4) && giftInfo.is_op == 0) {
                        var tipShow = zj.Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                        tips1 = (tipShow == true ? true : tips1);
                    }
                    else if (giftInfo.gift_form == 6 && giftInfo.is_op == 0) {
                        // 基金类型
                        var tipShow = PlayerGiftSystem.OpTypeGiftShowTips(v);
                        tips4 = (tipShow == true ? true : tips4);
                    }
                    else if (giftInfo.gift_form == 3 && giftInfo.is_op == 0) {
                        var tipShow = (v.buy_times == 0);
                        tips2 = (tipShow == true ? true : tips2);
                    }
                    else if (giftInfo.gift_form == 5 && giftInfo.is_op == 0) {
                        // 月卡类型
                        if (giftInfo.info[0] == "0") {
                            if (v.buy_times < this.Instance_item(giftInfo.index).buy_times) {
                                // 未购买
                                var tipShow = zj.Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                                tips3 = (tipShow == true ? true : tips3);
                            }
                            else {
                                // 已购买
                                var tipShow = (v.mark == 0);
                                tips3 = (tipShow == true ? true : tips3);
                            }
                        }
                        else {
                            // 新手礼包
                            if (v.buy_times >= this.Instance_item(giftInfo.index).buy_times) {
                                // 已购买
                                var tipShow = (v.mark == 0);
                                tips3 = (tipShow == true ? true : tips3);
                            }
                        }
                    }
                }
            }
            return (tips1 || tips2 || tips3 || tips4 || tips5);
        };
        PlayerGiftSystem.findTipsCharge = function () {
            var tips5 = false;
            for (var _i = 0, _a = zj.Game.PlayerGiftSystem.giftInfos; _i < _a.length; _i++) {
                var v = _a[_i];
                var giftInfo = PlayerGiftSystem.Instance_item(v.gift_index);
                if (giftInfo && giftInfo.gift_form == 5 && giftInfo.is_op == 3) {
                    // 月卡类型
                    if (v.buy_times < PlayerGiftSystem.Instance_item(giftInfo.index).buy_times) {
                        // 未购买
                        var tipShow = zj.Tips.tips_oneday_get(Number(v.gift_index.toString() + v.index.toString()));
                        tips5 = (tipShow == true ? true : tips5);
                    }
                    else {
                        // 已购买
                        var tipShow = v.mark == 0;
                        tips5 = (tipShow == true ? true : tips5);
                    }
                }
            }
            return tips5;
        };
        // 荣耀福利
        PlayerGiftSystem.SortVipX = function (msg) {
            var tbl = zj.Table.DeepCopy(msg);
            var newTbl = [];
            for (var _i = 0, _a = Object.keys(tbl); _i < _a.length; _i++) {
                var k = _a[_i];
                var v = tbl[k];
                var num = Number(v.gift_index + v.index);
                var info = PlayerGiftSystem.Instance_item(v.gift_index);
                v.quality = info.sort;
                if (info.gift_form == 5) {
                    if (info.pay_type == 1 || info.pay_type == 2) {
                        if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                            if (zj.Tips.tips_oneday_get(num)) {
                                v.quality = v.quality + 1;
                            }
                            else {
                                v.quality = -1;
                            }
                        }
                        else {
                            if (v.mark == 0) {
                                v.quality = v.quality + 1;
                            }
                            else if (v.mark == 1) {
                                v.quality = -2;
                            }
                        }
                    }
                    else if (info.pay_type == 3) {
                        if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                            v.quality = v.quality + 1;
                        }
                        else {
                            v.quality = -3;
                        }
                    }
                }
                else if (info.gift_form == 6) {
                    if (info.pay_type == 1 || info.pay_type == 2) {
                        if (v.buy_times < PlayerGiftSystem.Instance_item(v.gift_index).buy_times) {
                            if (zj.Tips.tips_oneday_get(num)) {
                                v.quality = v.quality + 1;
                            }
                            else {
                                v.quality = -1;
                            }
                        }
                        else {
                            if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                                v.quality = v.quality + 1;
                            }
                            else {
                                v.quality = -3;
                            }
                        }
                    }
                    else if (info.pay_type == 3) {
                        if (PlayerGiftSystem.OpTypeGiftShowTips(v)) {
                            v.quality = v.quality + 1;
                        }
                        else {
                            v.quality = -3;
                        }
                    }
                }
                else if (info.gift_form == 3) {
                    if (v.buy_times == 0) {
                        v.quality = v.quality + 1;
                    }
                    else {
                        v.quality = -2;
                    }
                }
                if (PlayerGiftSystem.Instance_item(v.gift_index).is_op == 2) {
                    newTbl.push(v);
                }
            }
            newTbl.sort(function (a, b) {
                var aTbl = PlayerGiftSystem.Instance_item(a.gift_index);
                var bTbl = PlayerGiftSystem.Instance_item(b.gift_index);
                return aTbl.sort - bTbl.sort;
            });
            return newTbl;
        };
        PlayerGiftSystem.Trigger = function () {
            var giftTbl = zj.TableNewgift.Table(); // StringConfig_Table.new_gift
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var nextLevelInfo = null;
            for (var _i = 0, _a = Object.keys(tbl); _i < _a.length; _i++) {
                var v = _a[_i];
                if (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= tbl[v].sum && tbl[v].charge != "" && zj.Game.PlayerInfoSystem.BaseInfo.chargeToken < tbl[v].sum + Number(tbl[v].charge)) {
                    nextLevelInfo = tbl[Number(v) + 1];
                    break;
                }
            }
            if (nextLevelInfo == null)
                return;
            var nextVipLevelGift = null;
            for (var _b = 0, _c = Object.keys(giftTbl); _b < _c.length; _b++) {
                var v = _c[_b];
                var vv = giftTbl[v];
                if (vv.gift_type == 6 && Number(vv.trigger_add) >= nextLevelInfo.sum && (nextLevelInfo.charge == "" || Number(vv.trigger_add) < nextLevelInfo.sum + Number(nextLevelInfo.charge))) {
                    nextVipLevelGift = vv;
                }
            }
            if (nextVipLevelGift == null)
                return;
            var giftInfo = [];
            for (var _d = 0, _e = nextVipLevelGift.trigger_gift; _d < _e.length; _d++) {
                var v = _e[_d];
                giftInfo.push(PlayerGiftSystem.Instance_item(v));
            }
            giftInfo.sort(function (a, b) {
                var aTbl = PlayerGiftSystem.Instance_item(a.index);
                var bTbl = PlayerGiftSystem.Instance_item(b.index);
                return bTbl.sort - aTbl.sort;
            });
            return giftInfo;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerGiftSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_GIFTS_INFO_CHANGE, this.onGiftsInfoChange, this);
        };
        PlayerGiftSystem.prototype.uninit = function () {
            this.giftInfos = [];
            this.mapGiftsInfo = {};
        };
        PlayerGiftSystem.prototype.onGiftsInfoChange = function (ev) {
            this.giftInfos = ev.giftInfos;
            // 删掉表里没有的礼包
            if (this.giftInfos && this.giftInfos.length > 0) {
                var list = zj.TableNewgiftItem.Table();
                for (var i = this.giftInfos.length - 1; i >= 0; --i) {
                    if (!list[this.giftInfos[i].gift_index]) {
                        this.giftInfos.splice(i, 1);
                    }
                }
            }
            for (var _i = 0, _a = ev.giftInfos; _i < _a.length; _i++) {
                var gift = _a[_i];
                this.mapGiftsInfo[gift.index] = gift;
            }
            for (var i = 0; i < ev.delGiftIndexs.length; i++) {
                delete this.mapGiftsInfo[ev.delGiftIndexs[i]];
            }
        };
        //跳转到特定的id
        PlayerGiftSystem.prototype.JumpToGiftById = function (index, gift_index, cb) {
            var giftInfo = PlayerGiftSystem.Instance_item(gift_index);
            var ui = null;
            if (giftInfo.is_op == 1) {
                //绝版
                zj.loadUI(zj.PayMallScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.loadFrom(zj.TableEnum.Enum.HXHChargeType.Op, index);
                });
                // let [ _ , findk] = Table.FindR()
            }
            else if (giftInfo.is_op == 0) {
                // 超值
                zj.loadUI(zj.PayMallScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.loadFrom(zj.TableEnum.Enum.HXHChargeType.Gift, index);
                });
            }
        };
        //首冲
        PlayerGiftSystem.prototype.firstCharge = function () {
            var num = zj.TableFirstCharge.Table();
            var start = 0;
            var end = Object.keys(num).length;
            var ret = [];
            for (var i = start; i < end; i++) {
                ret[i] = zj.TableFirstCharge.Item(i + 1);
            }
            return ret;
        };
        //是否存在啤酒礼包
        PlayerGiftSystem.prototype.beerGift = function () {
            var isHaveBeerGift = zj.Table.FindF(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == 100201;
            });
            var giftBTime = PlayerGiftSystem.Instance_item(100202).buy_times;
            var isHaveBeerGiftB = zj.Table.FindF(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                var date = zj.Game.Controller.serverNow();
                var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
                var serverTime = humanDate.getTime() / 1000 - 8 * 60 * 60;
                return v.gift_index == 100202 && v.buy_times < giftBTime && (v.trigger_time + PlayerGiftSystem.Instance_item(100202).duration) >= serverTime;
            });
            var resultId = isHaveBeerGiftB && 100202 || (isHaveBeerGift && 100201 || false);
            return resultId;
        };
        PlayerGiftSystem.prototype.getNewGift = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GetNewGiftRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerGiftSystem.prototype.rewardFormNewGift = function (giftIndex, dailyindex) {
            var _this = this;
            if (dailyindex === void 0) { dailyindex = 0; }
            return new Promise(function (resolve, reject) {
                var request = new message.RewardFormNewGiftRequest();
                request.body.giftIndex = giftIndex;
                request.body.dailyindex = dailyindex;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerGiftSystem.prototype.rewardNewGift = function (giftIndex) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RewardNewGiftRequest();
                request.body.giftIndex = giftIndex;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, true);
            });
        };
        PlayerGiftSystem.prototype.newGiftExist = function (giftIndex) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.NewGiftExistRequest();
                request.body.giftIndex = giftIndex;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerGiftSystem.prototype.secretMallBuy = function (index, mallId, itemId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SecretMallBuyRequest();
                request.body.index = index;
                request.body.mall_id = mallId;
                request.body.item_id = itemId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        return PlayerGiftSystem;
    }());
    zj.PlayerGiftSystem = PlayerGiftSystem;
    __reflect(PlayerGiftSystem.prototype, "zj.PlayerGiftSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerGiftSystem.js.map