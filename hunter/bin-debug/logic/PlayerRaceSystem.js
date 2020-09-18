var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 时间赛跑 系统
    // wangshenzhuo 创建于2019.05.10
    // 对应db_rece.ts
    var PlayerRaceSystem = (function () {
        function PlayerRaceSystem() {
        }
        PlayerRaceSystem.RewardItem = function (id) {
            return zj.TableMissionRace.Item(id);
        };
        PlayerRaceSystem.MissionItem = function (id) {
            return zj.TableMissionMain.Item(id);
        };
        //获取所有大阶段对应分数
        PlayerRaceSystem.GetAllCore = function (index) {
            var tbl = PlayerRaceSystem.RewardItem(index);
            return;
        };
        // 获取活动索引
        PlayerRaceSystem.GetActivityIndex = function () {
            //服务器是否有相关任务
            // let bExit = Table.FindR(Game.PlayerMissionSystem.missionMap, function (k, v) {
            //     return v.type == message.MissionType.MISSION_TYPE_RACE;
            // })
            var bExit;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.Game.PlayerMissionSystem.missionMap); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.type == message.MissionType.MISSION_TYPE_RACE) {
                    bExit = v;
                    break;
                }
            }
            if (bExit == null || zj.Game.PlayerMissionSystem.TimeNumber == 0 || zj.Game.PlayerMissionSystem.TimeNumber == null) {
                return;
            }
            var tbl = zj.TableMissionRace.Table();
            var curTime = zj.Game.Controller.serverNow();
            var curRelativeTime = (curTime.getDate() - 1) * 24 * 3600 + curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            var activityIndex = null;
            for (var k in tbl) {
                var v = tbl[k];
                var beginTime = (v.month_open_day - 1) * 24 * 3600 + 4 * 3600;
                var endTime = (v.month_open_day + v.day_num - 1) * 24 * 3600 + 4 * 3600;
                //测试环境刷新时间
                // let beginTime = (v.month_open_day - 1) * 24 * 3600 + 15 * 3600;  
                // let endTime = (v.month_open_day + v.day_num - 1) * 24 * 3600 + 15 * 3600;
                if (beginTime < curRelativeTime && curRelativeTime <= endTime) {
                    activityIndex = v.index;
                }
            }
            return activityIndex;
        };
        //获取活动剩余时间
        PlayerRaceSystem.GetLastTime = function (index) {
            if (index == null) {
                return "";
            }
            var info = PlayerRaceSystem.RewardItem(index);
            var curTime = zj.Game.Controller.serverNow();
            var curRelativeTime = (curTime.getDate() - 1) * 24 * 3600 + curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            var endTime = (info.month_open_day + info.day_num - 1) * 24 * 3600 + 4 * 3600;
            var minusTime = endTime - curRelativeTime;
            return this.formatMsTimeCh(minusTime);
        };
        //获取今天是活动第几天
        PlayerRaceSystem.GetActivityDays = function (index) {
            if (index == null) {
                return 1;
            }
            var info = PlayerRaceSystem.RewardItem(index);
            var curTime = zj.Game.Controller.serverNow();
            var curRelativeTime = (curTime.getDate() - 1) * 24 * 3600 + curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            var beginTime = (info.month_open_day - 1) * 24 * 3600 + 4 * 3600;
            var minusTime = curRelativeTime - beginTime;
            return Math.ceil(minusTime / (24 * 3600));
            // if(Game.PlayerMissionSystem.TimeNumber == 0 || Game.PlayerMissionSystem.TimeNumber == null) {
            //     return 1;
            // }
            // return Game.PlayerMissionSystem.TimeNumber;
        };
        //任务详情排序  活动期数  当日索引
        PlayerRaceSystem.SortActivityMission = function (index, dayIndex) {
            var awardTbl = PlayerRaceSystem.RewardItem(index);
            if (dayIndex >= awardTbl.day_num) {
                dayIndex = awardTbl.day_num;
            }
            var dayMissions = awardTbl.daily_missions[dayIndex - 1];
            var todayMissionTbls = [];
            for (var k in dayMissions) {
                var v = dayMissions[k];
                var tbl = [];
                var _a = zj.Game.PlayerMissionSystem.raceItemComplete(v), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4], isCanGet = _a[5];
                var missionInfos = PlayerRaceSystem.MissionItem(v);
                var times = isdo;
                var get = isOver;
                var color = [];
                if (percent < 1) {
                    color = [255, 38, 0];
                }
                else {
                    color = [0, 97, 0];
                }
                var completeStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.completeMission, color[0], color[1], color[2], times, todo);
                var desStr = "<text>" + missionInfos.description + "<text>";
                var openStr = "";
                if (Number(missionInfos.open_level) > 0) {
                    openStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Daily.lock, missionInfos.open_level);
                }
                else if (Number(missionInfos.open_instance) > 0) {
                    openStr = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Daily.inst, zj.Game.PlayerInstanceSystem.Set(Number(missionInfos.open_instance)).Stage);
                }
                var bOpen = true;
                if ((Number(missionInfos.open_level) != 0 && Number(missionInfos.open_level) > Number(zj.Game.PlayerInfoSystem.Level)) || (Number(missionInfos.open_level) == 0 && Number(missionInfos.open_instance) != 0 && !zj.Game.PlayerInstanceSystem.Set(Number(missionInfos.open_instance)).Clear)) {
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
                }
                else if (!isCanGet) {
                    //不可领取
                    tbl.state = 1;
                }
                else {
                    //可领取
                    tbl.state = 2;
                }
                todayMissionTbls.push(tbl);
            }
            todayMissionTbls.sort(function (a, b) {
                if (a.openNum == b.openNum) {
                    if (a.state == b.state) {
                        return a.info.id - b.info.id;
                    }
                    else {
                        return b.state - a.state;
                    }
                }
                else {
                    return b.openNum - a.openNum;
                }
            });
            return todayMissionTbls;
        };
        //红点
        PlayerRaceSystem.GetTipsShow = function () {
            var index = PlayerRaceSystem.GetActivityIndex();
            if (index == null) {
                return false;
            }
            var dayIndex = PlayerRaceSystem.GetActivityDays(index);
            var awardTbl = PlayerRaceSystem.RewardItem(index);
            if (dayIndex >= awardTbl.day_num) {
                dayIndex = awardTbl.day_num;
            }
            var dayMission = awardTbl.daily_missions[dayIndex - 1];
            var todayMissionTbls = [];
            for (var k in dayMission) {
                var v = dayMission[k];
                var _a = zj.Game.PlayerMissionSystem.raceItemComplete(v), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4], isCanGet = _a[5];
                if (isCanGet) {
                    return true;
                }
            }
            return false;
        };
        //计算总公里
        PlayerRaceSystem.GetAllKM = function () {
            return zj.Table.Add(0, zj.Game.PlayerMissionSystem.missionActive.raceKM.length, function (i) {
                return zj.Game.PlayerMissionSystem.missionActive.raceKM[i];
            });
        };
        // 中文时间
        PlayerRaceSystem.formatMsTimeCh = function (ms) {
            var d = Math.floor(ms / 86400);
            var ttmp = Math.floor(ms % 86400);
            var a = Math.floor(ttmp / 3600);
            var tmp = Math.floor(ttmp % 3600);
            var b = Math.floor(tmp / 60);
            var c = Math.floor(tmp % 60);
            var hour = a;
            var min = b;
            var sec = c;
            var day = d;
            if (d == 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hour + min + zj.TextsConfig.TextsConfig_Time.min;
            }
            return day + zj.TextsConfig.TextsConfig_Time.day + hour + zj.TextsConfig.TextsConfig_Time.hour + min + zj.TextsConfig.TextsConfig_Time.min;
        };
        PlayerRaceSystem.ReqGetMissionReward_Visit = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionRaceRewardRequest();
                request.body.index = index;
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
        PlayerRaceSystem.ReqReward_Visit = function (sub_type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionRewardRequest();
                request.body.type = message.MissionType.MISSION_TYPE_RACE;
                request.body.subType = sub_type;
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
        return PlayerRaceSystem;
    }());
    zj.PlayerRaceSystem = PlayerRaceSystem;
    __reflect(PlayerRaceSystem.prototype, "zj.PlayerRaceSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerRaceSystem.js.map