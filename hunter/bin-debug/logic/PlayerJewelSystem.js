var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 宝石收藏 系统
    // wangshenzhuo 创建于2019.05.06
    // 对应db_jewel.ts
    //关系成员排序
    var PlayerJewelSystemMission_Type;
    (function (PlayerJewelSystemMission_Type) {
        PlayerJewelSystemMission_Type[PlayerJewelSystemMission_Type["CARD"] = 1] = "CARD";
        PlayerJewelSystemMission_Type[PlayerJewelSystemMission_Type["HUNTER"] = 2] = "HUNTER";
    })(PlayerJewelSystemMission_Type = zj.PlayerJewelSystemMission_Type || (zj.PlayerJewelSystemMission_Type = {}));
    var PlayerJewelSystem = (function () {
        function PlayerJewelSystem() {
        }
        PlayerJewelSystem.JewelItem = function (index) {
            var tblConsume = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.jewelMission + ".json"); //读表
            return tblConsume[index];
        };
        // 获取活动索引
        PlayerJewelSystem.GetActivityIndex = function () {
            // 服务器是否有相关任务
            // let bExit = Table.FindR(Game.PlayerMissionSystem.missionInfo, function(k, v){
            //     return v.type == message.MissionType.MISSION_TYPE_JEWEL;
            // }
            var checkCount = 0;
            for (var k in zj.Game.PlayerMissionSystem.missionMap) {
                var v = zj.Game.PlayerMissionSystem.missionMap[k];
                if (v.type == message.MissionType.MISSION_TYPE_JEWEL) {
                    checkCount = checkCount + 1;
                }
            }
            if (checkCount < 2) {
                return null;
            }
            var tbl = zj.TableMissionJewel.Table();
            var curTime = zj.Game.Controller.serverNow();
            var curRelativeTime = (curTime.getDate() - 1) * 24 * 3600 + curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            var activityIndex = null;
            for (var k in tbl) {
                var v = tbl[k];
                var beginTime = (v.month_open_day - 1) * 24 * 3600 + 4 * 3600;
                var endTime = (v.month_open_day + v.day_num - 1) * 24 * 3600 + 4 * 3600;
                if (beginTime < curRelativeTime && curRelativeTime <= endTime) {
                    activityIndex = v.index;
                }
            }
            return activityIndex;
        };
        //活动时间
        PlayerJewelSystem.GetActivityTime = function (index) {
            var tbl = PlayerJewelSystem.JewelItem(index);
            var curTime = zj.Game.Controller.serverNow();
            var time = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.Jewel.activityTime, curTime.getFullYear(), curTime.getMonth() + 1, tbl.month_open_day, curTime.getFullYear(), curTime.getMonth() + 1, tbl.month_open_day + tbl.day_num);
            return time;
        };
        //条件一
        PlayerJewelSystem.GetCondition_1 = function (index) {
            var tbl = PlayerJewelSystem.JewelItem(index);
            var aCondition = [];
            for (var i = 0; i < tbl.check_star.length; i++) {
                if (i > 0 && aCondition[i - 1] != null && tbl.add_jewel_star[i] == aCondition[i - 1].iReward) {
                    aCondition[i - 1].iEnd = tbl.check_star[i];
                    aCondition[i] = aCondition[i - 1];
                    aCondition[i - 1] = null;
                }
                else if (tbl.add_jewel_star[i] != 0) {
                    var t = [];
                    t.iStart = tbl.check_star[i]; // 起始星级
                    t.iEnd = null; // 终止星级
                    t.iReward = tbl.add_jewel_star[i]; // 奖励
                    aCondition[i] = t;
                }
            }
            var result = [];
            for (var i = 0; i < tbl.check_star.length; i++) {
                if (aCondition[i] != null) {
                    result.push(aCondition[i]);
                }
            }
            var strCon = "";
            //活动类型是收集卡牌还是猎人
            if (PlayerJewelSystem.GetMissionType(index) == PlayerJewelSystemMission_Type.CARD) {
                strCon = zj.TextsConfig.TextsConfig_Activity.Jewel.get_card;
            }
            else if (PlayerJewelSystem.GetMissionType(index) == PlayerJewelSystemMission_Type.HUNTER) {
                strCon = zj.TextsConfig.TextsConfig_Activity.Jewel.get_hunter;
            }
            for (var i = 0; i < result.length; i++) {
                var t = [];
                var str = "";
                if (result[i].iEnd != null) {
                    str = zj.Helper.StringFormat(strCon, result[i].iStart + "~" + result[i].iEnd);
                }
                else {
                    str = zj.Helper.StringFormat(strCon, result[i].iStart);
                }
                result[i] = [str, result[i].iReward];
            }
            return result;
        };
        //条件二
        PlayerJewelSystem.GetCondition_2 = function (index) {
            var tbl = PlayerJewelSystem.JewelItem(index);
            var aCondition = [];
            for (var i = 0; i < tbl.check_star.length; i++) {
                if (i > 0 && aCondition[i - 1] != null && tbl.add_jewel_upstar[i] == aCondition[i - 1].iReward) {
                    aCondition[i - 1].iEnd = tbl.check_star[i];
                    aCondition[i] = aCondition[i - 1];
                    aCondition[i - 1] = null;
                }
                else if (tbl.add_jewel_upstar[i] != 0) {
                    var t = [];
                    t.iStart = tbl.check_star[i]; // 起始星级
                    t.iEnd = null; // 终止星级
                    t.iReward = tbl.add_jewel_upstar[i]; // 奖励
                    aCondition[i] = t;
                }
            }
            var result = [];
            for (var i = 0; i < tbl.check_star.length; i++) {
                if (aCondition[i] != null) {
                    result.push(aCondition[i]);
                }
            }
            var strCon = "";
            //活动类型是收集卡牌还是猎人
            if (PlayerJewelSystem.GetMissionType(index) == PlayerJewelSystemMission_Type.CARD) {
                strCon = zj.TextsConfig.TextsConfig_Activity.Jewel.up_card;
            }
            else if (PlayerJewelSystem.GetMissionType(index) == PlayerJewelSystemMission_Type.HUNTER) {
                strCon = zj.TextsConfig.TextsConfig_Activity.Jewel.up_hunter;
            }
            for (var i = 0; i < result.length; i++) {
                var t = [];
                var str = "";
                if (result[i].iEnd != null) {
                    str = zj.Helper.StringFormat(strCon, result[i].iStart + "~" + result[i].iEnd);
                }
                else {
                    str = zj.Helper.StringFormat(strCon, result[i].iStart);
                }
                result[i] = [str, result[i].iReward];
            }
            return result;
        };
        //条件三
        PlayerJewelSystem.GetCondition_3 = function (index) {
            var tbl = PlayerJewelSystem.JewelItem(index);
            var aCondition = [];
            for (var i = 0; i < tbl.check_goods.length; i++) {
                var t = [tbl.check_goods[i], tbl.add_jewel_goods[i]];
                aCondition.push(t);
            }
            return aCondition;
        };
        //本次活动任务类型
        PlayerJewelSystem.GetMissionType = function (index) {
            var tbl = PlayerJewelSystem.JewelItem(index);
            if (tbl.check_type[0] == 1) {
                return PlayerJewelSystemMission_Type.CARD;
            }
            else if (tbl.check_type[0] == 3) {
                return PlayerJewelSystemMission_Type.HUNTER;
            }
        };
        //宝石商店数据
        PlayerJewelSystem.GetJewelMallData = function (index) {
            var tbl = PlayerJewelSystem.JewelItem(index);
            var aData = [];
            for (var i = 0; i < tbl.exchange_goods.length; i++) {
                var t = [];
                t.itemIndex = i; // 表里数据的顺序？？？？  WTF
                t.itemID = tbl.exchange_goods[i][0]; // 道具ID
                t.itemCount = tbl.exchange_goods[i][1]; // 道具数量
                t.totalTimes = tbl.exchange_count[i]; // 总次数
                // t.leftTimes =                          // 剩余次数
                // t.isDailyRefresh =                     // 每日刷新
                t.consume = tbl.exchange_jewel[i]; // 花费
                var has = false;
                for (var j = 0; j < zj.Game.PlayerMissionSystem.missionActive.jewelMall.length; j++) {
                    if (zj.Game.PlayerMissionSystem.missionActive.jewelMall[j].key == (i + 1)) {
                        has = true;
                        if (zj.Game.PlayerMissionSystem.missionActive.jewelMall[j].value == 0) {
                            t.leftTimes = t.totalTimes;
                        }
                        else {
                            t.leftTimes = t.totalTimes - zj.Game.PlayerMissionSystem.missionActive.jewelMall[j].value;
                        }
                    }
                }
                if (!has) {
                    t.leftTimes = t.totalTimes;
                }
                if (tbl.exchange_daily_update[i] > 0) {
                    t.isDailyRefresh = true;
                }
                else {
                    t.isDailyRefresh = false;
                }
                aData.push(t);
            }
            return aData;
        };
        //获取每日任务
        PlayerJewelSystem.GetJewelDailyMission = function (index) {
            var tbl = PlayerJewelSystem.JewelItem(index);
            return tbl.daily_mission;
        };
        //获取终极任务
        PlayerJewelSystem.GetJewelFinalMission = function (index) {
            var tbl = PlayerJewelSystem.JewelItem(index);
            return tbl.final_mission;
        };
        //请求领取任务奖励
        PlayerJewelSystem.ReqReward = function (mType, subType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionRewardRequest();
                request.body.type = mType;
                request.body.subType = subType;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerJewelSystem.MissionJewelExchangeReq = function (index, count) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionJewelExchangeRequest();
                request.body.index = index;
                request.body.num = count;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        return PlayerJewelSystem;
    }());
    zj.PlayerJewelSystem = PlayerJewelSystem;
    __reflect(PlayerJewelSystem.prototype, "zj.PlayerJewelSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerJewelSystem.js.map