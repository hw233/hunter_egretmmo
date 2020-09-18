namespace zj {
// 时间赛跑 系统
// wangshenzhuo 创建于2019.05.10
// 对应db_rece.ts

export class PlayerRaceSystem {

    public static RewardItem(id: number) {
        return TableMissionRace.Item(id);
    }

    public static MissionItem(id: number) {
        return TableMissionMain.Item(id);
    }

    //获取所有大阶段对应分数
    public static GetAllCore(index) {
        let tbl = PlayerRaceSystem.RewardItem(index);
        return;
    }

    // 获取活动索引
    public static GetActivityIndex() {
        //服务器是否有相关任务
        // let bExit = Table.FindR(Game.PlayerMissionSystem.missionMap, function (k, v) {
        //     return v.type == message.MissionType.MISSION_TYPE_RACE;
        // })

        let bExit;
        for (let [k, v] of HelpUtil.GetKV(Game.PlayerMissionSystem.missionMap)) {
            if (v.type == message.MissionType.MISSION_TYPE_RACE) {
                bExit = v;
                break;
            }
        }

        if (bExit == null || Game.PlayerMissionSystem.TimeNumber == 0 || Game.PlayerMissionSystem.TimeNumber == null) {
            return;
        }

        let tbl = TableMissionRace.Table();
        let curTime = Game.Controller.serverNow();
        let curRelativeTime = (curTime.getDate() - 1) * 24 * 3600 + curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
        let activityIndex = null;
        for (const k in tbl) {
            const v = tbl[k];

            let beginTime = (v.month_open_day - 1) * 24 * 3600 + 4 * 3600;
            let endTime = (v.month_open_day + v.day_num - 1) * 24 * 3600 + 4 * 3600;
            //测试环境刷新时间
            // let beginTime = (v.month_open_day - 1) * 24 * 3600 + 15 * 3600;  
            // let endTime = (v.month_open_day + v.day_num - 1) * 24 * 3600 + 15 * 3600;
            if (beginTime < curRelativeTime && curRelativeTime <= endTime) {
                activityIndex = v.index;
            }
        }
        return activityIndex;
    }

    //获取活动剩余时间
    public static GetLastTime(index) {
        if (index == null) {
            return "";
        }
        let info = PlayerRaceSystem.RewardItem(index);
        let curTime = Game.Controller.serverNow();
        let curRelativeTime = (curTime.getDate() - 1) * 24 * 3600 + curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds() ;
        let endTime = (info.month_open_day + info.day_num - 1) * 24 * 3600 + 4 * 3600;
        let minusTime = endTime - curRelativeTime;
        return this.formatMsTimeCh(minusTime);
    }

    //获取今天是活动第几天
    public static GetActivityDays(index) {
        if (index == null) {
            return 1;
        }
        let info = PlayerRaceSystem.RewardItem(index);
        let curTime = Game.Controller.serverNow();
        let curRelativeTime = (curTime.getDate() - 1) * 24 * 3600 + curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
        let beginTime = (info.month_open_day - 1) * 24 * 3600 + 4 * 3600;
        let minusTime = curRelativeTime - beginTime;
        return Math.ceil(minusTime / (24 * 3600));
        // if(Game.PlayerMissionSystem.TimeNumber == 0 || Game.PlayerMissionSystem.TimeNumber == null) {
        //     return 1;
        // }
        // return Game.PlayerMissionSystem.TimeNumber;
    }

    //任务详情排序  活动期数  当日索引
    public static SortActivityMission(index, dayIndex) {
        let awardTbl = PlayerRaceSystem.RewardItem(index);
        if (dayIndex >= awardTbl.day_num) {
            dayIndex = awardTbl.day_num;
        }

        let dayMissions = awardTbl.daily_missions[dayIndex - 1];
        let todayMissionTbls = [];
        for (const k in dayMissions) {
            const v = dayMissions[k];
            let tbl: any = [];
            let [isdo, todo, isLock, isOver, percent, isCanGet] = Game.PlayerMissionSystem.raceItemComplete(v);
            let missionInfos = PlayerRaceSystem.MissionItem(v);
            let times = isdo;
            let get = isOver;
            let color = [];
            if (percent < 1) {
                color = [255, 38, 0];
            } else {
                color = [0, 97, 0];
            }
            let completeStr = Helper.StringFormat(TextsConfig.TextsConfig_Activity.completeMission, color[0], color[1], color[2], times, todo);
            let desStr = "<text>" + missionInfos.description + "<text>";
            let openStr = "";
            if (Number(missionInfos.open_level) > 0) {
                openStr = Helper.StringFormat(TextsConfig.TextsConfig_Daily.lock, missionInfos.open_level);
            } else if (Number(missionInfos.open_instance) > 0) {
                openStr = Helper.StringFormat(TextsConfig.TextsConfig_Daily.inst, Game.PlayerInstanceSystem.Set(Number(missionInfos.open_instance)).Stage)
            }

            let bOpen = true;
            if ((Number(missionInfos.open_level) != 0 && Number(missionInfos.open_level) > Number(Game.PlayerInfoSystem.Level)) || (Number(missionInfos.open_level) == 0 && Number(missionInfos.open_instance) != 0 && !Game.PlayerInstanceSystem.Set(Number(missionInfos.open_instance)).Clear)) {
                bOpen = false;
            }
            tbl.info = missionInfos;
            tbl.des = desStr + " " + completeStr;
            tbl.openStr = openStr;
            tbl.bOpen = bOpen;
            tbl.openNum = bOpen && 1 || 0;

            if (get) {
                //已领取
                tbl.state = 0;
            } else if (!isCanGet) {
                //不可领取
                tbl.state = 1;
            } else {
                //可领取
                tbl.state = 2;
            }
            todayMissionTbls.push(tbl);
        }
        todayMissionTbls.sort( function (a, b) {
            if (a.openNum == b.openNum) {
                if (a.state == b.state) {
                    return a.info.id - b.info.id;
                } else {
                    return b.state - a.state;
                }
            } else {
                return b.openNum - a.openNum;
            }
        })
        return todayMissionTbls;

    }

    //红点
    public static GetTipsShow() {
        let index = PlayerRaceSystem.GetActivityIndex();
        if (index == null) {
            return false;
        }
        let dayIndex = PlayerRaceSystem.GetActivityDays(index);
        let awardTbl = PlayerRaceSystem.RewardItem(index);
        if (dayIndex >= awardTbl.day_num) {
            dayIndex = awardTbl.day_num;
        }
        let dayMission = awardTbl.daily_missions[dayIndex - 1];
        let todayMissionTbls = [];
        for (const k in dayMission) {
            const v = dayMission[k];
            let [isdo, todo, isLock, isOver, percent, isCanGet] = Game.PlayerMissionSystem.raceItemComplete(v);
            if (isCanGet) {
                return true;
            }
        }
        return false;
    }

    //计算总公里
    public static GetAllKM() {
        return Table.Add(0, Game.PlayerMissionSystem.missionActive.raceKM.length, function (i) {
            return Game.PlayerMissionSystem.missionActive.raceKM[i];
        })
    }

    // 中文时间
    private static formatMsTimeCh(ms: number) {
        let d: number = Math.floor(ms / 86400);
        let ttmp: number = Math.floor(ms % 86400);
        let a: number = Math.floor(ttmp / 3600);
        let tmp: number = Math.floor(ttmp % 3600);
        let b: number = Math.floor(tmp / 60);
        let c: number = Math.floor(tmp % 60);

        let hour = a;
        let min = b;
        let sec = c;
        let day = d;

        if (d == 0) {
            return hour + TextsConfig.TextsConfig_Time.hour + min + TextsConfig.TextsConfig_Time.min;
        }
        return day + TextsConfig.TextsConfig_Time.day + hour + TextsConfig.TextsConfig_Time.hour + min + TextsConfig.TextsConfig_Time.min;
    }

    public static ReqGetMissionReward_Visit(index) {
        return new Promise((resolve, reject) => {
            let request = new message.MissionRaceRewardRequest();
			request.body.index = index;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.MissionRaceRewardResponse>resp;
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

    public static ReqReward_Visit(sub_type) {
        return new Promise((resolve, reject) => {
            let request = new message.MissionRewardRequest();
            request.body.type = message.MissionType.MISSION_TYPE_RACE;
            request.body.subType = sub_type;
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


}
}