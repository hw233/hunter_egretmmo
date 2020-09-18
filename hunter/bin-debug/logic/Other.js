var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // other 对应 otherdb
    // hexiaowei
    // 2019-02-13
    var otherdb = (function () {
        function otherdb() {
        }
        otherdb.WantedTypeInfo = function (type) {
            var tbl = zj.TableWanted.Table();
            var wanted_tbl = [];
            for (var k in tbl) {
                var v = tbl[k];
                if (Math.floor(v.wanted_id / 10000) == type) {
                    wanted_tbl.push(v);
                }
            }
            wanted_tbl.sort(function (a, b) {
                return a.wanted_id - b.wanted_id;
            });
            return wanted_tbl;
        };
        otherdb.WantedInstance = function (wantedId) {
            return zj.TableWanted.Item(wantedId);
        };
        otherdb.GetSecretMallInfo = function () {
            var giftInfos = [];
            var mallInfo = null;
            // 活动开启
            var activityInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_SECRET_MALL;
            })[0];
            if (activityInfo == null || zj.Game.PlayerInfoSystem.Level < 10) {
                return giftInfos;
            }
            if (!((activityInfo.openTime < zj.Game.Controller.curServerTime) && (zj.Game.Controller.curServerTime <= activityInfo.closeTime))) {
                return giftInfos;
            }
            if (activityInfo.secretMalls == null) {
                return giftInfos;
            }
            mallInfo = zj.Table.FindR(activityInfo.secretMalls, function (k, v) {
                return v.mall_id == activityInfo.daysIndex;
            })[0];
            if (mallInfo == null) {
                return giftInfos;
            }
            var _loop_1 = function (k) {
                var v = mallInfo.items[k];
                var buyInfo = zj.Table.FindR(activityInfo.kvInfos, function (kk, vv) {
                    return vv.key == Number(k);
                })[0];
                if (buyInfo != null) {
                    var nextGiftInfo = v.tributeInfo[buyInfo.value + 1];
                    if (nextGiftInfo == null) {
                        var currentGiftInfo = v.tributeInfo[buyInfo.value];
                        // 最后一个显示当前礼包
                        if (currentGiftInfo != null) {
                            var tmp = {
                                tribute_id: currentGiftInfo.tribute_id,
                                tribute_name: currentGiftInfo.tribute_name,
                                buy_type: currentGiftInfo.buy_type,
                                pay_index: currentGiftInfo.pay_index,
                                discount: currentGiftInfo.discount,
                                goodses: currentGiftInfo.goodses,
                                sort_power: currentGiftInfo.sort_power,
                                bBought: 1,
                                reference: Number(k),
                                gift_pay_index: buyInfo.value,
                            };
                            giftInfos.push(tmp);
                        }
                    }
                    else {
                        // 下一个礼包
                        var tmp = {
                            tribute_id: nextGiftInfo.tribute_id,
                            tribute_name: nextGiftInfo.tribute_name,
                            buy_type: nextGiftInfo.buy_type,
                            pay_index: nextGiftInfo.pay_index,
                            discount: nextGiftInfo.discount,
                            goodses: nextGiftInfo.goodses,
                            sort_power: nextGiftInfo.sort_power,
                            bBought: 0,
                            reference: Number(k),
                            gift_pay_index: buyInfo.value + 1,
                        };
                        giftInfos.push(tmp);
                    }
                }
                else {
                    //  第一个礼包
                    var nextGiftInfo = v.tributeInfo[0];
                    if (nextGiftInfo != null) {
                        var tmp = {
                            tribute_id: nextGiftInfo.tribute_id,
                            tribute_name: nextGiftInfo.tribute_name,
                            buy_type: nextGiftInfo.buy_type,
                            pay_index: nextGiftInfo.pay_index,
                            discount: nextGiftInfo.discount,
                            goodses: nextGiftInfo.goodses,
                            sort_power: nextGiftInfo.sort_power,
                            bBought: 0,
                            reference: Number(k),
                            gift_pay_index: 0,
                        };
                        giftInfos.push(tmp);
                    }
                }
            };
            for (var k in mallInfo.items) {
                _loop_1(k);
            }
            giftInfos.sort(function (a, b) {
                if (a.bBought == b.bBought) {
                    return a.reference - b.reference;
                }
                else {
                    return a.bBought - b.bBought;
                }
            });
            return giftInfos;
        };
        otherdb.exchangeTips = function () {
            var exchange = zj.TableExchangeMall.Table();
            var types = [];
            var _loop_2 = function (k) {
                var v = exchange[k];
                var typeExit = zj.Table.FindFCall(types, function (_k, _v) {
                    return _v == v.type;
                }, this_1);
                if (!typeExit) {
                    types.push(v.type);
                    var b_convert = zj.PlayerConvertSystem.Tips(v.type);
                    if (b_convert) {
                        return { value: true };
                    }
                }
            };
            var this_1 = this;
            for (var k in exchange) {
                var state_1 = _loop_2(k);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return false;
        };
        otherdb.checkOpenTransformAndActivityStatus = function () {
            var transferTab = zj.TableGeneralTransfer.Table();
            var transformData = [];
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.TRANSFORM)) {
                for (var k in transferTab) {
                    var v = transferTab[k];
                    if (v.general_add == 1) {
                        transformData.push(v);
                    }
                }
                if (transformData.length != 0) {
                    //开启转至新界面
                    return zj.TableEnum.Enum.TableTransformStatus.ShowTransform;
                }
                else {
                    if (otherdb.getActivityBattle().length != 0) {
                        return zj.TableEnum.Enum.TableTransformStatus.OnlyShowActivity;
                    }
                    else {
                        return zj.TableEnum.Enum.TableTransformStatus.AllClosed;
                    }
                }
            }
            else {
                if (otherdb.getActivityBattle().length != 0) {
                    return zj.TableEnum.Enum.TableTransformStatus.OnlyShowActivity;
                }
                else {
                    return zj.TableEnum.Enum.TableTransformStatus.AllClosed;
                }
            }
        };
        otherdb.getActivityBattle = function () {
            var data = [];
            for (var k in zj.Game.PlayerActivitySystem.Activities) {
                var v = zj.Game.PlayerActivitySystem.Activities[k];
                var curTime = zj.Game.Controller.serverNow();
                var timestamp = Date.parse(curTime.toString()) / 1000;
                if (v.stopTime > timestamp) {
                    if (v.type == message.ActivityType.ACT_TYPE_INSTANCE_BATTLE) {
                        var tbl = zj.TableActivityBattle.Item(v.buffValue);
                        ;
                        if (tbl.open_level <= zj.Game.PlayerInfoSystem.BaseInfo.level) {
                            data.push(v);
                        }
                    }
                }
            }
            return data;
        };
        otherdb.ActivityBattleGetCurStar = function (info) {
            var starInfo = info.dailyAddItems;
            var curStar = 0;
            for (var k in starInfo) {
                var v = starInfo[k];
                curStar = curStar + v.rewardIndex.length;
            }
            return curStar;
        };
        otherdb.getActivityByTypeAndIndex = function (type, index) {
            for (var k in zj.Game.PlayerActivitySystem.Activities) {
                var v = zj.Game.PlayerActivitySystem.Activities[k];
                if (v.index == index && v.type == type) {
                    return v;
                }
            }
            return null;
        };
        otherdb.ActivityBattleGetInstanceStarDes = function (id) {
            var tbl = zj.TableActivityBattleInstance.Item(id);
            var ret = [];
            for (var k in tbl.check_type) {
                var v = tbl.check_type[k];
                if (v == message.ActivityInstanceStarType.ACT_INSTANCE_TYPE_BATTLE_WIN) {
                    if (Number(k) == 0) {
                        ret.push(zj.TextsConfig.TextsConfig_Activity.battleStar1);
                    }
                    else {
                        ret.push(zj.TextsConfig.TextsConfig_Activity.battleStarX);
                    }
                }
                else if (v == message.ActivityInstanceStarType.ACT_INSTANCE_TYPE_GENERAL_TYPE) {
                    ret.push(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.battleStar2, zj.TextsConfig.TextsConfig_Hunter.hunter_type[tbl.check_value[Number(k) - 1] - 1]));
                }
                else if (v == message.ActivityInstanceStarType.ACT_INSTANCE_TYPE_GENERAL_ID) {
                    ret.push(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.battleStar3, zj.PlayerHunterSystem.Table(tbl.check_value[k]).general_name));
                }
            }
            return ret;
        };
        otherdb.ActivityBattleGetCurStarById = function (info, instanceId) {
            var starInfo = info.dailyAddItems;
            for (var k in starInfo) {
                var v = starInfo[k];
                if (v.index == instanceId) {
                    return v.rewardIndex;
                }
            }
            return [];
        };
        return otherdb;
    }());
    zj.otherdb = otherdb;
    __reflect(otherdb.prototype, "zj.otherdb");
})(zj || (zj = {}));
//# sourceMappingURL=Other.js.map