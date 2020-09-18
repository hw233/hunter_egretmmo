namespace zj {
// 宝石收藏 系统
// wangshenzhuo 创建于2019.05.06
// 对应db_jewel.ts

//关系成员排序
export enum PlayerJewelSystemMission_Type {
    CARD = 1,        // 卡片
    HUNTER = 2,      // 猎人
}



export class PlayerJewelSystem {

    public static JewelItem(index) {
        let tblConsume = Game.ConfigManager.getTable(StringConfig_Table.jewelMission + ".json");  //读表
        return tblConsume[index];
    }

    // 获取活动索引
    public static GetActivityIndex() {
        // 服务器是否有相关任务
        // let bExit = Table.FindR(Game.PlayerMissionSystem.missionInfo, function(k, v){
        //     return v.type == message.MissionType.MISSION_TYPE_JEWEL;
        // }
        let checkCount = 0;
        for (const k in Game.PlayerMissionSystem.missionMap) {
            const v = Game.PlayerMissionSystem.missionMap[k];
            if (v.type == message.MissionType.MISSION_TYPE_JEWEL) {
                checkCount = checkCount + 1;
            }
        }

        if (checkCount < 2) {
            return null;
        }

        let tbl = TableMissionJewel.Table();
        let curTime = Game.Controller.serverNow();
        let curRelativeTime = (curTime.getDate() - 1) * 24 * 3600 + curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
        let activityIndex = null;
        for (const k in tbl) {
            const v = tbl[k];
            let beginTime = (v.month_open_day - 1) * 24 * 3600 + 4 * 3600;
            let endTime = (v.month_open_day + v.day_num - 1) * 24 * 3600 + 4 * 3600;
            if (beginTime < curRelativeTime && curRelativeTime <= endTime) {
                activityIndex = v.index;
            }
        }
        return activityIndex;
    }

    //活动时间
    public static GetActivityTime(index) {
        let tbl = PlayerJewelSystem.JewelItem(index);
        let curTime = Game.Controller.serverNow();
        let time = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.activityTime, curTime.getFullYear(), curTime.getMonth() + 1, tbl.month_open_day, curTime.getFullYear(), curTime.getMonth() + 1, tbl.month_open_day + tbl.day_num);
        return time;
    }

    //条件一
    public static GetCondition_1(index) {
        let tbl = PlayerJewelSystem.JewelItem(index);
        let aCondition = [];
        for (let i = 0; i < tbl.check_star.length; i++) {
            if (i > 0 && aCondition[i - 1] != null && tbl.add_jewel_star[i] == aCondition[i - 1].iReward) {   //奖励数量相同的合并
                aCondition[i - 1].iEnd = tbl.check_star[i];
                aCondition[i] = aCondition[i - 1];
                aCondition[i - 1] = null;
            } else if (tbl.add_jewel_star[i] != 0) {
                let t: any = [];
                t.iStart = tbl.check_star[i]; // 起始星级
                t.iEnd = null; // 终止星级
                t.iReward = tbl.add_jewel_star[i]; // 奖励
                aCondition[i] = t;
            }
        }
        let result = [];
        for (let i = 0; i < tbl.check_star.length; i++) {
            if (aCondition[i] != null) {
                result.push(aCondition[i]);
            }
        }
        let strCon = "";
        //活动类型是收集卡牌还是猎人
        if (PlayerJewelSystem.GetMissionType(index) == PlayerJewelSystemMission_Type.CARD) {
            strCon = TextsConfig.TextsConfig_Activity.Jewel.get_card;
        } else if (PlayerJewelSystem.GetMissionType(index) == PlayerJewelSystemMission_Type.HUNTER) {
            strCon = TextsConfig.TextsConfig_Activity.Jewel.get_hunter;
        }
        for (let i = 0; i < result.length; i++) {
            let t: any = [];
            let str = "";
            if (result[i].iEnd != null) {
                str = Helper.StringFormat(strCon, result[i].iStart + "~" + result[i].iEnd);
            } else {
                str = Helper.StringFormat(strCon, result[i].iStart);
            }
            result[i] = [str, result[i].iReward];
        }
        return result;
    }

    //条件二
    public static GetCondition_2(index) {
        let tbl = PlayerJewelSystem.JewelItem(index);
        let aCondition = [];
        for (let i = 0; i < tbl.check_star.length; i++) {
            if (i > 0 && aCondition[i - 1] != null && tbl.add_jewel_upstar[i] == aCondition[i - 1].iReward) { //奖励数量相同的合并
                aCondition[i - 1].iEnd = tbl.check_star[i];
                aCondition[i] = aCondition[i - 1];
                aCondition[i - 1] = null;
            } else if (tbl.add_jewel_upstar[i] != 0) {
                let t: any = [];
                t.iStart = tbl.check_star[i]; // 起始星级
                t.iEnd = null; // 终止星级
                t.iReward = tbl.add_jewel_upstar[i]; // 奖励
                aCondition[i] = t;
            }
        }
        let result = [];
        for (let i = 0; i < tbl.check_star.length; i++) {
            if (aCondition[i] != null) {
                result.push(aCondition[i]);
            }
        }

        let strCon = "";
        //活动类型是收集卡牌还是猎人
        if (PlayerJewelSystem.GetMissionType(index) == PlayerJewelSystemMission_Type.CARD) {
            strCon = TextsConfig.TextsConfig_Activity.Jewel.up_card;
        } else if (PlayerJewelSystem.GetMissionType(index) == PlayerJewelSystemMission_Type.HUNTER) {
            strCon = TextsConfig.TextsConfig_Activity.Jewel.up_hunter;
        }

        for (let i = 0; i < result.length; i++) {
            let t = [];
            let str = "";
            if (result[i].iEnd != null) {
                str = Helper.StringFormat(strCon, result[i].iStart + "~" + result[i].iEnd);
            } else {
                str = Helper.StringFormat(strCon, result[i].iStart);
            }
            result[i] = [str, result[i].iReward];
        }
        return result;
    }

    //条件三
    public static GetCondition_3(index) {
        let tbl = PlayerJewelSystem.JewelItem(index);
        let aCondition = [];
        for (let i = 0; i < tbl.check_goods.length; i++) {
            let t = [tbl.check_goods[i], tbl.add_jewel_goods[i]];
            aCondition.push(t);
        }
        return aCondition;
    }

    //本次活动任务类型
    public static GetMissionType(index) {
        let tbl = PlayerJewelSystem.JewelItem(index);
        if (tbl.check_type[0] == 1) {
            return PlayerJewelSystemMission_Type.CARD;
        } else if (tbl.check_type[0] == 3) {
            return PlayerJewelSystemMission_Type.HUNTER;
        }
    }

    //宝石商店数据
    public static GetJewelMallData(index) {
        let tbl = PlayerJewelSystem.JewelItem(index);
        let aData = [];
        for (let i = 0; i < tbl.exchange_goods.length; i++) {
            let t: any = [];
            t.itemIndex = i ;                          // 表里数据的顺序？？？？  WTF
            t.itemID = tbl.exchange_goods[i][0];      // 道具ID
            t.itemCount = tbl.exchange_goods[i][1];   // 道具数量
            t.totalTimes = tbl.exchange_count[i];     // 总次数
            // t.leftTimes =                          // 剩余次数
            // t.isDailyRefresh =                     // 每日刷新
            t.consume = tbl.exchange_jewel[i];        // 花费

            let has = false;
            for (let j = 0; j < Game.PlayerMissionSystem.missionActive.jewelMall.length; j++) {
                if (Game.PlayerMissionSystem.missionActive.jewelMall[j].key == (i+1)) {
                    has = true;
                    if (Game.PlayerMissionSystem.missionActive.jewelMall[j].value == 0) {
                        t.leftTimes = t.totalTimes;
                    } else {
                        t.leftTimes = t.totalTimes - Game.PlayerMissionSystem.missionActive.jewelMall[j].value;
                    }
                }
            }
            if (!has) {
                t.leftTimes = t.totalTimes;
            }
            if (tbl.exchange_daily_update[i] > 0) {
                t.isDailyRefresh = true;
            } else {
                t.isDailyRefresh = false;
            }
            aData.push(t);
        }
        return aData;
    }

    //获取每日任务
    public static GetJewelDailyMission(index) {
        let tbl = PlayerJewelSystem.JewelItem(index);
        return tbl.daily_mission;
    }

    //获取终极任务
    public static GetJewelFinalMission(index) {
        let tbl = PlayerJewelSystem.JewelItem(index);
        return tbl.final_mission;
    }

    //请求领取任务奖励
    public static ReqReward(mType,subType) {
        return new Promise((resolve, reject) => {
            let request = new message.MissionRewardRequest();
            request.body.type = mType;
            request.body.subType = subType;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.MissionRewardResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    return;
                }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

    public static MissionJewelExchangeReq(index , count) {
        return new Promise((resolve, reject) => {
            let request = new message.MissionJewelExchangeRequest();
            request.body.index = index;
            request.body.num = count;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.MissionJewelExchangeResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    return;
                }
                resolve(response);
               
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }
}
}