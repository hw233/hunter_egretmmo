var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * @author haohuihui
     *
     * @date 2018-12-11
     *
     * @classs 设置红点
     */
    var Tips = (function () {
        function Tips() {
        }
        Tips.Init = function () {
            Tips.Value = {};
            var actiInit = message.ActivityType.ACT_TYPE_END;
            for (var k in Tips.FUNC) {
                Tips.Value[k] = (_a = {},
                    _a[0] = false,
                    _a);
                for (var kk in Tips.FUNC[k]) {
                    Tips.Value[k][kk] = false;
                }
            }
            for (var i = 1; i <= actiInit; i++) {
                Tips.Activity[i] = {};
            }
            var _a;
        };
        Tips.UnInit = function () {
            this.Init();
        };
        Tips.InitTipHero = function () {
            Tips.Hero = {};
            var heroInit = 10;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.Game.PlayerHunterSystem.allHuntersMap()); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                Tips.Hero[k] = {};
                for (var i = 1; i <= heroInit; i++) {
                    Tips.Hero[k][i] = false;
                }
            }
        };
        // 主城背景tag转换
        Tips.FixBugOfBuild = function (id) {
            if (id == zj.TableEnum.BuildType.Build_Type_Mall) {
                return Tips.TAG.MALL;
            }
            else if (id == zj.TableEnum.BuildType.Build_Type_Tavern) {
                return Tips.TAG.TAVERN;
            }
            else if (id == zj.TableEnum.BuildType.Build_Type_Jade) {
                return Tips.TAG.JADE;
            }
            else if (id == zj.TableEnum.BuildType.Build_Type_Zork) {
                return Tips.TAG.ZORK;
            }
            return id;
        };
        // 设置提示
        // id1 {number} 类型  id2 {number} 子类型
        Tips.SetTipsOfId = function (id1, id2) {
            id1 = Tips.FixBugOfBuild(id1);
            if (id2 == undefined || id2 == null) {
                for (var k in Tips.FUNC[id1]) {
                    Tips.SetFunction(id1, Number(k));
                }
            }
            else {
                Tips.SetFunction(id1, id2);
            }
            Tips.Value[id1][0] = zj.Table.FindF(Tips.Value[id1], function (k, v) {
                return Number(k) > 0 && v == true;
            });
        };
        // 获取提示
        Tips.GetTipsOfId = function (id1, id2) {
            id1 = Tips.FixBugOfBuild(id1);
            if (Tips.Value[id1] && Tips.Value[id1][id2] != null)
                return Tips.Value[id1][id2];
            return Tips.Value[id1][0];
        };
        // 设置值
        Tips.SetFunction = function (id1, id2) {
            Tips.Value[id1][id2] = Tips.FUNC[id1][id2]();
        };
        // 进程
        Tips.SetTipsOfProgresses = function () {
            for (var _i = 0, _a = zj.HelpUtil.GetKV(Tips.PROGRESS); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                Tips.SetTipsOfProgressesWithId(v);
            }
            Tips.SetTipsOfId(Tips.TAG.INSTANCE, Tips.TAG.INST_SEARCH);
            Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GETPOWER);
        };
        // 进程相关红点
        Tips.SetTipsOfProgressesWithId = function (progressId) {
            if (zj.Game.PlayerProgressesSystem.progressMap[progressId] != null) {
                if (zj.Game.PlayerProgressesSystem.progressMap[progressId].leftTime != 0) {
                    // 领体力计时
                    if (progressId == message.EProcessType.PROCESS_TYPE_OPEN_POWER) {
                        Tips.SetTipsOfId(Tips.TAG.AWARD, Tips.TAG.AWARD_POWER);
                    }
                    else if (progressId == message.EProcessType.PROCESS_TYPE_REWARD_POWER) {
                        Tips.SetTipsOfId(Tips.TAG.AWARD, Tips.TAG.AWARD_POWER);
                    }
                }
                // 演武堂
                if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LADDER) {
                    Tips.SetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_NORMAL) {
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LEAGUE) {
                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE) {
                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.MATCH_MALL);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_RELIC) {
                    Tips.SetTipsOfId(Tips.TAG.DarkLand, Tips.TAG.RELIC_MALL);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LADDER) {
                    Tips.SetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_HONOR) {
                    Tips.SetTipsOfId(Tips.TAG.LADDER, Tips.TAG.PK_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_MALL_LOTTERY) {
                    Tips.SetTipsOfId(Tips.TAG.TREAUSER, Tips.TAG.TREAUSER_MALL);
                    Tips.SetTipsOfId(Tips.TAG.MALL, Tips.TAG.MALL_OTHER);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY) {
                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_CELEBRATE);
                }
                else if (progressId == message.EProcessType.PROCESS_TYPE_SCENE_BOSS) {
                    Tips.SetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.ZORK_BOSS);
                }
            }
        };
        Tips.GetInTimeOfPid = function (startId, stopId) {
            var timeStart = zj.Game.PlayerProgressesSystem.progressMap[startId].leftTime;
            var timeStop = zj.Game.PlayerProgressesSystem.progressMap[stopId].leftTime;
            var bToStop = timeStart <= 0 && timeStop == 0;
            var bInStop = timeStart == 0 && timeStop > 0;
            return bToStop || bInStop;
        };
        // 活动提示
        Tips.GetTipsOfActivity = function (type, index) {
            return Tips.Activity[type][index];
        };
        // 本地值 
        Tips.GetSaveTime = function (id) {
            var key = Tips.TIP_FORMART_TIME + "_" + id;
            var value = zj.Game.Controller.getRoleStorageItem(key);
            if (value.length == 0)
                return 0;
            var t = parseInt(value);
            if (isNaN(t))
                return 0;
            return t;
        };
        Tips.SetSaveTime = function (id, time) {
            if (id == null || time == null)
                return;
            var key = Tips.TIP_FORMART_TIME + "_" + id;
            zj.Game.Controller.setRoleStorageItem(key, time.toString());
        };
        // 获取点击进入次数TAVERN
        Tips.GetSaveIntValue = function (type, modules) {
            var id = 100202;
            if (id == null || id == undefined) {
                return 1;
            }
            var key = id + "_" + this.TIP_FORMART_TIME + "_" + modules + "_" + type;
            var value = zj.Game.Controller.getRoleStorageItem(key);
            if (value.length == 0)
                return 0;
            var t = parseInt(value);
            if (isNaN(t))
                return 0;
            return t;
        };
        // 存取点击进入次数TAVERN
        Tips.SetSaveIntValue = function (type, time, modules) {
            var id = 100202;
            if (id == null || id == undefined) {
                return false;
            }
            var key = id + "_" + this.TIP_FORMART_TIME + "_" + modules + "_" + type;
            return zj.Game.Controller.setRoleStorageItem(key, time.toString());
        };
        Tips.GetSaveIntInfo = function (key, initValue) {
            var value = zj.Game.Controller.getRoleStorageItem(key);
            if (value.length == 0)
                return initValue;
            var t = parseInt(value);
            if (isNaN(t))
                return initValue;
            return t;
        };
        Tips.SetSaveIntInfo = function (key, value) {
            return zj.Game.Controller.setRoleStorageItem(key, value.toString());
        };
        Tips.GetSaveBoolInfo = function (key, initValue) {
            var value = zj.Game.Controller.getRoleStorageItem(key);
            if (value == "true") {
                return true;
            }
            else if (value == "false") {
                return false;
            }
            else {
                if (initValue) {
                    zj.Game.Controller.setRoleStorageItem(key, initValue.toString());
                    return initValue;
                }
                else {
                    return false;
                }
            }
        };
        Tips.SetSaveBoolInfo = function (key, value) {
            return zj.Game.Controller.setRoleStorageItem(key, value.toString());
        };
        Tips.GetSaveBool = function (id, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (id == null || baseId == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + id, bool ? bool : true);
        };
        Tips.SetSaveBool = function (id, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (id == null || baseId == null || baseId == 0)
                return;
            var key = baseId.toString() + Tips.TIP_FORMART_SAVE + id.toString();
            Tips.SetSaveBoolInfo(key, bool ? bool : false);
        };
        Tips.GetSaveBoolForActivity = function (type, index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || index == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + type + "_" + "index", bool ? bool : true);
        };
        Tips.SetSaveBoolForActivity = function (type, index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || index == null || baseId == 0)
                return;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + type + "_" + "index", bool ? bool : false);
        };
        Tips.GetSaveByMallNewProduct = function (type) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || baseId == 0)
                return 1;
            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "MALL" + type, 0);
        };
        Tips.SetSaveTimeByMallNewProduct = function (type, time) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0)
                return;
            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "MALL" + type, time);
        };
        //流星街（新）图标
        Tips.GetSaveBoolForWantedNewOpen = function (type, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "_WantedNewOpen_" + type, bool ? bool : true);
        };
        Tips.SetSaveBoolForWantedNewOpen = function (type, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || baseId == 0)
                return;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "_WantedNewOpen_" + type, bool ? bool : false);
        };
        // 时装
        Tips.GetSaveBoolForFashionNewGet = function (id, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "_FashionNewGet_" + id, bool ? bool : false);
        };
        Tips.SetSaveBoolForFashionNewGet = function (id, bool) {
            if (bool === void 0) { bool = false; }
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return;
            Tips.SetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + this.TIP_FORMART_TIME + "_FashionNewGet_" + id, bool ? bool : false);
        };
        Tips.GetSaveByTavernNewProduct = function (type) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (type == null || baseId == null || baseId == 0)
                return 1;
            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "TAVERN" + type, 0);
        };
        Tips.SetSaveTimeByTavernNewProduct = function (type, time) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0)
                return;
            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "TAVERN" + type, time);
        };
        // 武将排序默认顺序 sort 默认按照等级排序
        Tips.GetSaveTimeForGeneralSort = function (time) {
            if (time === void 0) { time = 1; }
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return 1;
            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "general_sort", time);
        };
        Tips.SetSaveTimeForGeneralSort = function (time) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0)
                return;
            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "general_sort", time);
        };
        // 卡片排序默认顺序
        Tips.GetSaveTimeForCardSort = function (time) {
            if (time === void 0) { time = 1; }
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return 1;
            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "card_sort", time);
        };
        Tips.SetSaveTimeForCardSort = function (time) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0)
                return;
            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "card_sort", time);
        };
        Tips.GetSaveTimeForCardHostSort = function (time) {
            if (time === void 0) { time = 1; }
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return 1;
            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "card_host_sort", time);
        };
        Tips.SetSaveTimeForCardHostSort = function (time) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0)
                return;
            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "card_host_sort", time);
        };
        // 武将升星值
        Tips.GetSaveBoolForGeneralUpStar = function () {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + "general_up_star", false);
        };
        Tips.SetSaveBoolForGeneralUpStar = function (bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + "general_up_star", bool ? bool : false);
        };
        // 卡片升星值
        Tips.GetSaveBoolForCardUpStar = function () {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + "card_up_star", false);
        };
        Tips.SetSaveBoolForCardUpStar = function (bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return false;
            return Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_SAVE + "card_up_star", bool ? bool : false);
        };
        //天空竞技场上次难度本地值
        Tips.GetSaveTowerLastDiff = function () {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return 1;
            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "tower_diff", 1);
        };
        Tips.SetSaveTowerLastDiff = function (time) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0)
                return;
            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "tower_diff", time);
        };
        // 帮会战结算上次弹出时间记录
        Tips.GetSaveUnionBattlePushRecord = function () {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return 1;
            return Tips.GetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "union_battle_record");
        };
        Tips.SetSaveUnionBattlePushRecord = function (time) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (time == null || baseId == null || baseId == 0)
                return;
            Tips.SetSaveIntInfo(baseId + this.TIP_FORMART_TIME + "union_battle_record", time);
        };
        // 攻略
        Tips.GetSaveBoolForHighHand = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "highhand" + index, bool ? bool : true);
        };
        Tips.SetSaveBoolForHighHand = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return false;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "highhand" + index, bool ? bool : false);
        };
        // 突破
        Tips.GetSaveBoolForHunterBreak = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "Breakattri" + index, bool ? bool : true);
        };
        Tips.SetSaveBoolForHunterBreak = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "Breakattri" + index, bool ? bool : false);
        };
        // VIP星耀
        Tips.GetSaveBoolForVip_attri = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "attri" + index, bool ? bool : true);
        };
        Tips.SetSaveBoolForVip_attri = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return false;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "attri" + index, bool ? bool : false);
        };
        Tips.GetSaveBoolForlowVip = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "lowVip" + index, bool ? bool : true);
        };
        Tips.SetSaveBoolForlowVip = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || baseId == 0)
                return false;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "lowVip" + index, bool ? bool : false);
        };
        Tips.GetSaveBoolForRandom = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || index == null)
                return false;
            return Tips.GetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "Random" + index, bool ? bool : true);
        };
        Tips.SetSaveBoolForRandom = function (index, bool) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (index == null || baseId == null || baseId == 0)
                return;
            Tips.SetSaveBoolInfo(baseId + this.TIP_FORMART_ACT + "Random" + index, bool ? bool : false);
        };
        Tips.SetTipsOfArena = function (generalId, id) {
            if (generalId == null && id == null)
                return;
            if (Tips.ArenaValue[generalId] == null)
                Tips.ArenaValue[generalId] = {};
        };
        Tips.GetTipsOfArena = function (generalId, id) {
            if (id === void 0) { id = 0; }
            if (Tips.ArenaValue[generalId]) {
                return Tips.ArenaValue[generalId][id];
            }
            return false;
        };
        Tips.tips_instance_1 = function (id) {
            var normalBox = false;
            var eliteBox = false;
            var instanceData = zj.Game.PlayerInstanceSystem.AreaInstance(id);
            if (instanceData == null)
                return;
            var chapterList = instanceData.area_normal;
            var instanceListNormal = [];
            for (var i = 0; i < chapterList.length; i++) {
                var vv = chapterList[i];
                var chapterData = zj.Game.PlayerInstanceSystem.ChapterInstance(vv);
                instanceListNormal.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
            }
            var giftInfoNormal = zj.Table.DeepCopy(instanceListNormal);
            for (var i = 0; i < instanceListNormal.length; i++) {
                var vv = instanceListNormal[i];
                var mobInfos = zj.Game.PlayerInstanceSystem.mobInfos;
                var instance = null;
                for (var j = 0; j < mobInfos.length; j++) {
                    if (mobInfos[j].mobId == vv) {
                        instance = mobInfos[j];
                        break;
                    }
                }
                if (instance != null) {
                    giftInfoNormal[i] = instance;
                }
                if (!(typeof giftInfoNormal[i] === "number" || giftInfoNormal[i].star == 0) && giftInfoNormal[i].chestReward == false) {
                    normalBox = true || normalBox;
                }
            }
            var eliteList = instanceData.area_elite;
            var instanceListElite = [];
            for (var i = 0; i < eliteList.length; i++) {
                var vv = eliteList[i];
                var eliteData = zj.Game.PlayerInstanceSystem.EliteInstance(vv);
                instanceListElite.push(eliteData.chapter_pack[eliteData.chapter_pack.length - 1]);
            }
            var giftInfoElite = zj.Table.DeepCopy(instanceListElite);
            for (var i = 0; i < instanceListElite.length; i++) {
                var vv = instanceListElite[i];
                var mobInfos = zj.Game.PlayerInstanceSystem.mobInfos;
                var instance = null;
                for (var j = 0; j < mobInfos.length; j++) {
                    if (mobInfos[j].mobId == vv) {
                        instance = mobInfos[j];
                        break;
                    }
                }
                if (instance != null && instance.star != 0) {
                    giftInfoElite[i] = instance;
                }
                if (typeof giftInfoElite[i] === "number" || giftInfoElite[i].star == 0) {
                }
                else if (giftInfoElite[i].chestReward == false) {
                    eliteBox = true || eliteBox;
                }
                else {
                }
            }
            return normalBox || eliteBox;
        };
        Tips.getTipsOfMail = function (mailType) {
            var cond = false;
            if (zj.Game.PlayerMailSystem.mailboxInfo[mailType - 1] != null) {
                cond = false || zj.Game.PlayerMailSystem.mailboxInfo[mailType - 1].unReadCount > 0 || zj.Game.PlayerMailSystem.mailboxInfo[mailType - 1].unReward > 0;
            }
            Tips.SetTipsOfId(Tips.TAG.MAIL, 1);
            return cond;
        };
        Tips.GetIntValue = function (key, defaultValue) {
            if (defaultValue === void 0) { defaultValue = 0; }
            if (key == null)
                return defaultValue;
            key = Tips.TIP_FORMART_SAVE + "_" + key;
            var value = zj.Game.Controller.getRoleStorageItem(key);
            if (value.length == 0)
                return defaultValue;
            var t = parseInt(value);
            if (isNaN(t))
                return defaultValue;
            return t;
        };
        Tips.SetIntValue = function (key, v) {
            if (key == null)
                return;
            key = Tips.TIP_FORMART_SAVE + "_" + key;
            zj.Game.Controller.setRoleStorageItem(key, v.toString());
        };
        // VIP星耀
        Tips.GetSaveBoolForVip = function (index, bool) {
            if (zj.Game.PlayerInfoSystem.BaseInfo.id == 0 || index == undefined) {
                return false;
            }
            return Tips.GetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + this.TIP_FORMART_ACT + "_" + index, bool ? bool : true);
        };
        Tips.SetSaveBoolForVip = function (index, bool) {
            if (zj.Game.PlayerInfoSystem.BaseInfo.id == 0 || index == undefined) {
                return;
            }
            Tips.SetSaveBoolInfo(zj.Game.PlayerInfoSystem.BaseInfo.id + this.TIP_FORMART_ACT + "_" + index, bool ? bool : false);
        };
        // 一次重置
        Tips.tips_onetime_set = function (index, time) {
            var serverTime = zj.Game.Controller.serverNow();
            if (index == null || serverTime.valueOf() == null) {
                console.error("tips_onetime_set error index == nil");
                return;
            }
            if (typeof time === "number" && serverTime.valueOf() > 0) {
                var saveTime = Tips.GetSaveTime(index);
                if (saveTime == 0) {
                    Tips.SetSaveBool(index, false);
                    Tips.SetSaveTime(index, time + serverTime.valueOf());
                }
                else if (saveTime < serverTime.valueOf()) {
                    Tips.SetSaveBool(index, true);
                    Tips.SetSaveTime(index, 0);
                }
            }
            else if (typeof time === "boolean") {
                Tips.SetSaveBool(index, true);
            }
        };
        // 一次重置
        Tips.tips_onetime_get = function (index) {
            return Tips.GetSaveBool(index, false) == false;
        };
        // 每天重置一次
        Tips.tips_oneday_set = function (index, day) {
            if (typeof day === "number") {
                var saveDay = Tips.GetSaveTime(index);
                if (-1 == day) {
                }
                else if (saveDay == day) {
                }
                else if (saveDay != day) {
                    Tips.SetSaveBool(index, true);
                    Tips.SetSaveTime(index, zj.Game.Controller.serverNow().getDay() + 1);
                }
            }
            else if (typeof day === "boolean") {
                // 红点消失
                Tips.SetSaveTime(index, zj.Game.Controller.serverNow().getDay() + 1);
                Tips.SetSaveBool(index, false);
            }
            return Tips.GetSaveBool(index);
        };
        Tips.tips_oneday_get = function (index) {
            return Tips.GetSaveBool(index);
        };
        // 使用一次
        Tips.tips_useTime_set = function (index) {
            if (Tips.GetSaveBool(index) == true) {
                Tips.SetSaveBool(index, false);
            }
        };
        Tips.tips_useTime_get = function (index) {
            return Tips.GetSaveBool(index);
        };
        // 使用一次,专用活动
        Tips.tips_activity_set = function (type, index) {
            if (Tips.GetSaveBoolForActivity(type, index) == true) {
                Tips.SetSaveBoolForActivity(type, index, false);
            }
        };
        Tips.tips_activity_get = function (type, index) {
            return Tips.GetSaveBoolForActivity(type, index);
        };
        // 使用一次，攻略
        Tips.tips_Highhand_set = function (index) {
            if (Tips.GetSaveBoolForHighHand(index) == true) {
                Tips.SetSaveBoolForHighHand(index, false);
            }
        };
        Tips.tips_Highhand_get = function (index) {
            return Tips.GetSaveBoolForHighHand(index);
        };
        // 使用一次，突破
        Tips.tips_HunterBreak_set = function (index) {
            if (Tips.GetSaveBoolForHunterBreak(index) == true) {
                Tips.SetSaveBoolForHunterBreak(index, false);
            }
        };
        Tips.tips_HunterBreak_get = function (index) {
            return Tips.GetSaveBoolForHunterBreak(index);
        };
        // 使用一次，Vip星耀
        Tips.tips_Vip_set = function (index) {
            if (Tips.GetSaveBoolForVip(index) == true) {
                Tips.SetSaveBoolForVip(index, false);
            }
        };
        Tips.tips_Vip_get = function (index) {
            return Tips.GetSaveBoolForVip(index);
        };
        // 使用一次，Vip星耀属性
        Tips.tips_VipAttri_set = function (index) {
            if (Tips.GetSaveBoolForVip_attri(index) == true) {
                Tips.SetSaveBoolForVip_attri(index, false);
            }
        };
        Tips.tips_VipAttri_get = function (index) {
            return Tips.GetSaveBoolForVip_attri(index);
        };
        // 使用一次，lowVip
        Tips.tips_LowVip_set = function (index) {
            if (Tips.GetSaveBoolForlowVip(index) == true) {
                Tips.SetSaveBoolForlowVip(index, false);
            }
        };
        Tips.tips_LowVip_get = function (index) {
            return Tips.GetSaveBoolForlowVip(index);
        };
        Tips.tips_Random_set = function (index) {
            if (Tips.GetSaveBoolForRandom(index) == true) {
                Tips.SetSaveBoolForRandom(index, false);
            }
        };
        Tips.tips_Random_get = function (index) {
            return Tips.GetSaveBoolForRandom(index);
        };
        Tips.getMondayTime = function () {
            var curTime = zj.Game.Controller.serverNow();
            var timeS = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            // 到第二天4点的秒数 + 第二天4点到下周一4点的秒数 (4*3600 + 28*3600 - timeS) + (7-curTime.wday)%7 * 24*3600
            // curTime.getDay() 0表示星期天
            var lastTime = 100800 - timeS + (8 - zj.PlayerLeagueSystem.GetDay()) % 7 * 86400;
            return lastTime;
        };
        Tips.getMondayTenTime = function () {
            var curTime = zj.Game.Controller.serverNow();
            var timeS = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            // 到第二天10点的秒数 + 第二天10点到下周一10点的秒数 (10*3600 + 24*3600 - timeS) + (7-curTime.wday)%7 * 24*3600
            var lastTime = 122400 - timeS + (7 - curTime.getDay()) % 7 * 86400;
            return lastTime;
        };
        // 帮会
        Tips.Tips_1_1 = function () {
            var cond = false;
            if (zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0 &&
                zj.Game.PlayerLeagueSystem.LeagueInfo != null &&
                zj.Game.PlayerLeagueSystem.Member.is_donate != null &&
                zj.CommonConfig.league_donate_daily_times - zj.Game.PlayerLeagueSystem.Member.is_donate > 0) {
                cond = true;
            }
            return cond;
        };
        Tips.tips_1_2_get = function () {
            return Tips.tips_onetime_get(Tips.SAVE.LEAGUE_MALL);
        };
        Tips.tips_1_2_set = function () {
            Tips.tips_onetime_set(Tips.SAVE.LEAGUE_MALL, Tips.getMondayTime());
        };
        Tips.Tips_1_2 = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE) && zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0 && zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LEAGUE].leftTime == 0) {
                Tips.tips_1_2_set();
                return Tips.tips_onetime_get(Tips.SAVE.LEAGUE_MALL);
            }
            else {
                return false;
            }
        };
        Tips.Tips_1_3 = function () {
            var cond = false;
            if (zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0 &&
                zj.Game.PlayerLeagueSystem.LeagueInfo != null &&
                zj.Game.PlayerLeagueSystem.Member.officialId != message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL &&
                zj.Game.PlayerLeagueSystem.LeagueInfo.info != null &&
                zj.Game.PlayerLeagueSystem.LeagueInfo.applicants.length > 0) {
                cond = true;
            }
            return cond;
        };
        Tips.Tips_1_4 = function () {
            var bOpen = zj.PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE);
            var bLeague = zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0;
            if (!bOpen || !bLeague)
                return false;
            if (zj.Game.PlayerLeagueSystem.LeagueInfo != null && zj.Game.PlayerLeagueSystem.LeagueInfo.instances != null) {
                if (zj.Game.PlayerLeagueSystem.Member.instance_buy_time + zj.CommonConfig.league_instance_day_time > zj.Game.PlayerLeagueSystem.Member.instance_time) {
                    for (var _i = 0, _a = zj.Game.PlayerLeagueSystem.LeagueInfo.instances; _i < _a.length; _i++) {
                        var vv = _a[_i];
                        for (var _b = 0, _c = vv.stageInfos; _b < _c.length; _b++) {
                            var v = _c[_b];
                            if (!v.is_win)
                                return true;
                        }
                    }
                }
                var _loop_1 = function (vv) {
                    var mv = zj.Table.FindR(zj.Game.PlayerLeagueSystem.Member.mobsReward, function (rk, rv) {
                        if (rv.instanceId == vv.instance_id)
                            return true;
                    })[0];
                    for (var k in vv.stageInfos) {
                        var v = vv.stageInfos[k];
                        var isWin = v.is_win;
                        var isRew = false;
                        if (mv != null) {
                            isRew = zj.Table.FindK(mv.mobsReward, Number(k) - 1) != -1;
                        }
                        var bReward = isWin && !isRew;
                        if (bReward)
                            return { value: true };
                    }
                };
                for (var _d = 0, _e = zj.Game.PlayerLeagueSystem.LeagueInfo.instances; _d < _e.length; _d++) {
                    var vv = _e[_d];
                    var state_1 = _loop_1(vv);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            return false;
        };
        Tips.Tips_1_5 = function () {
            var bOpen = zj.PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE);
            var bLeague = zj.Game.PlayerInfoSystem.BaseInfo.leagueId != 0;
            var cond_nor = false;
            var cond_add = false;
            var can_fight = false;
            if (zj.Game.PlayerLeagueSystem.LeagueInfo != null && zj.Game.PlayerLeagueSystem.LeagueInfo.info != null) {
                var _a = zj.Table.FindR(zj.Game.PlayerLeagueSystem.LeagueInfo.info.processes, function (_k, _v) {
                    if (_v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY)
                        return true;
                }), processes = _a[0], _ = _a[1];
                if (processes != null && processes.leftTime > 0) {
                    if (zj.Game.PlayerLeagueSystem.Member.party_time == 0) {
                        cond_nor = true;
                    }
                    if (processes.info != 0 && zj.Game.PlayerLeagueSystem.Member.party_time_add == 0) {
                        cond_add = true;
                    }
                }
                var _b = zj.Table.FindR(zj.Game.PlayerLeagueSystem.LeagueInfo.info.processes, function (_k, _v) {
                    if (_v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_BOSS && _v.leftTime > 0)
                        return true;
                }), tip = _b[0], __ = _b[1];
                if (tip) {
                    can_fight = zj.CommonConfig.league_boss_battle_number > zj.Game.PlayerLeagueSystem.Member.boss_time;
                }
            }
            return bOpen && bLeague && ((cond_nor || cond_add) || can_fight);
        };
        Tips.Tips_1_6 = function () {
            var bOpen = zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE);
            var bLeague = zj.Game.PlayerInfoSystem.LeagueId != 0;
            if (!bLeague || zj.Game.PlayerLeagueSystem.LeagueInfo == null) {
                return false;
            }
            var noTeams = true;
            var emptyTeam = true;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.Game.PlayerFormationSystem.formatsMatchDefine); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                noTeams = false;
                var _c = zj.Table.FindR(v.generals, function (_k, _v) {
                    return _v != 0;
                }), findGenerals = _c[0], _ = _c[1];
                if (findGenerals)
                    emptyTeam = false;
            }
            return bOpen && bLeague && (noTeams || emptyTeam);
        };
        // 公会战 入口
        Tips.Tips_1_7 = function () {
            var bleague = (zj.Game.PlayerInfoSystem.LeagueId != 0);
            if (!bleague)
                return false;
            if (zj.Game.PlayerLeagueSystem.unionBattleInfo.UnionStatus == zj.TableEnum.Enum.UnionBattleStatus.Battle) {
                return (zj.CommonConfig.league_match_member_attack_times - zj.Game.PlayerLeagueSystem.Member.dailyMatchBattleWinTime > 0);
            }
            else {
                return false;
            }
        };
        Tips.tips_1_8_set = function () {
            Tips.tips_onetime_set(Tips.SAVE.MATCH_MALL, Tips.getMondayTime());
        };
        Tips.tips_1_8_get = function () {
            return Tips.tips_onetime_get(Tips.SAVE.MATCH_MALL);
        };
        Tips.Tips_1_8 = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE) &&
                zj.Game.PlayerInfoSystem.LeagueId != 0 &&
                zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE].leftTime == 0) {
                Tips.tips_1_8_set();
                return Tips.tips_onetime_get(Tips.SAVE.MATCH_MALL);
            }
            else {
                return false;
            }
        };
        Tips.Tips_1_9 = function () {
            if (zj.Game.PlayerInfoSystem.LeagueId != 0 &&
                zj.Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_ELDER ||
                zj.Game.PlayerLeagueSystem.Member.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_LEADER) {
                if (zj.Game.PlayerLeagueSystem.LeagueInfo.info.curNum >= zj.CommonConfig.league_match_limit_members &&
                    zj.Game.PlayerLeagueSystem.LeagueInfo.info.enliven_all >= zj.CommonConfig.league_match_sign_consume_enliven &&
                    zj.Game.PlayerLeagueSystem.LeagueInfo.info.level >= zj.CommonConfig.league_match_join_limit_level) {
                    return !zj.Game.PlayerLeagueSystem.LeagueInfo.info.match_join;
                }
            }
            return false;
        };
        // 竞技场
        Tips.tips_2_1 = function () {
            return false;
        };
        Tips.tips_2_2_set = function () {
            Tips.tips_onetime_set(Tips.SAVE.ARENA_MALL, Tips.getMondayTime());
        };
        Tips.tips_2_2 = function () {
            var open = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ARENA);
            var progressInfo = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LADDER];
            if (open && progressInfo.leftTime == 0) {
                Tips.tips_2_2_set();
                return Tips.tips_onetime_get(Tips.SAVE.ARENA_MALL);
            }
            else {
                return false;
            }
        };
        Tips.tips_2_3 = function () {
            var progressInfo = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_LADDER];
            if (progressInfo != null && progressInfo.leftTime != 0)
                return false;
            var vipInfo = zj.Game.PlayerVIPSystem.vipInfo;
            var condition = vipInfo.buyPvpPower + zj.CommonConfig.ladder_challenge_time > vipInfo.pvpPower;
            return condition;
        };
        Tips.tips_2_4 = function () {
            // discard
            return false;
        };
        Tips.tips_2_5 = function () {
            return true;
        };
        Tips.tips_2_6 = function () {
            var info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
            if (info != null && info.info % 10 != message.CraftStateType.CRAFT_STATE_TYPE_FIGHTING)
                return false;
            var open = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.SINGLE);
            var progressInfo = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_HONOR];
            if (open && progressInfo.leftTime == 0) {
                Tips.tips_onetime_set(Tips.SAVE.SINGLE, Tips.getMondayTenTime());
                return Tips.tips_onetime_get(Tips.SAVE.SINGLE);
            }
            return false;
        };
        Tips.tips_2_7 = function () {
            var info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
            if (info != null && info.info % 10 != message.CraftStateType.CRAFT_STATE_TYPE_FIGHTING)
                return false;
            var open = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.SINGLE);
            var condition = false;
            if (open) {
                var vipInfo = zj.Game.PlayerVIPSystem.vipInfo;
                var currentNumber = vipInfo.craft_buy * zj.CommonConfig.singlecraft_buy_time + zj.CommonConfig.singlecraft_buy_time - vipInfo.craft_time;
                condition = currentNumber > 0;
            }
            return condition;
        };
        // 矿洞
        Tips.tips_3_1 = function () {
            return false;
        };
        Tips.tips_3_2 = function () {
            return false;
        };
        Tips.tips_3_3 = function () {
            return false;
        };
        Tips.tips_3_4 = function () {
            return false;
        };
        // 仙境
        Tips.tips_4_1 = function () {
            var cond = false;
            if (zj.Game.PlayerInfoSystem.BaseInfo.goldPlate >= 3)
                cond = true;
            var warInfo = zj.TableWonderland.Item(3);
            var open = zj.Game.PlayerInfoSystem.BaseInfo.level >= warInfo.mix_level && zj.Game.PlayerInfoSystem.BaseInfo.level <= warInfo.max_level;
            return cond && open;
        };
        Tips.tips_4_2 = function () {
            var bTimes = false;
            var level = zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel;
            var runesTime = zj.TableLicence.Item(level).gain_runes_time;
            if (zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != null) {
                bTimes = zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time < runesTime && true || false;
            }
            var rewardGet = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0;
            var cond = bTimes || rewardGet;
            return cond;
        };
        Tips.tips_4_3 = function () {
            // 钓鱼
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo == null)
                return false;
            var cnt = zj.PlayerVIPSystem.Level().league_fishing - zj.Game.PlayerVIPSystem.vipInfo.league_fishing;
            // 钓鱼中
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime - Math.floor(egret.getTimer() / 1000) > 0)
                return false;
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses != null && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.goodses.length > 0)
                return true;
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
                if (cnt > 0)
                    return true;
                else if (cnt == 0)
                    return false;
            }
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0)
                return true;
            return false;
        };
        Tips.tips_4_4 = function () {
            return false;
        };
        Tips.tips_4_5 = function () {
            var peaceInfo = zj.TableWonderland.Item(2);
            var open = (zj.Game.PlayerInfoSystem.BaseInfo.level >= peaceInfo.mix_level && zj.Game.PlayerInfoSystem.BaseInfo.level <= peaceInfo.max_level);
            var canPick = false;
            for (var _i = 0, _a = peaceInfo.tree_pos; _i < _a.length; _i++) {
                var v = _a[_i];
                canPick = canPick; //||  otherdb.inPeaceWonderlandNotPick(v[0]);
            }
            var cond = false;
            if (zj.Game.PlayerInfoSystem.BaseInfo.goldPlate >= 3)
                cond = true;
            return open && canPick && cond;
        };
        Tips.tips_4_6 = function () {
            var cur = zj.Game.Controller.serverNow();
            var sec = cur.getHours() * 3600 + cur.getMinutes() * 60 + cur.getSeconds();
            if (4 * 3600 <= sec && sec < zj.CommonConfig.double_fruit_bet_time[0] && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.redFruit == 0)
                return true;
            else
                return false;
        };
        Tips.tips_4_7 = function () {
            var bOpen = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.BOSS);
            var bFresh = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info != 0;
            var cond = bFresh && bOpen;
            return cond;
        };
        Tips.tips_4_8 = function () {
            return false;
        };
        Tips.tips_4_9 = function () {
            var open = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.GROUPFIGHT);
            if (!open) {
                return false;
            }
            var tbl = zj.TableBaseGeneral.Table();
            for (var k in tbl) {
                if (tbl[k].fashion_id[0] != 0 && tbl[k].fashion_id[1] != null && zj.PlayerFashionSystem.FashionWithId(tbl[k].general_id) != null) {
                    if (zj.PlayerFashionSystem.GetHunterFashionTips(tbl[k].general_id)) {
                        return true;
                    }
                }
            }
            return false;
        };
        Tips.tips_4_10_set = function (day) {
            Tips.tips_oneday_set(Tips.SAVE.PORTFIRST, day);
        };
        Tips.tips_4_10 = function () {
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DARKLAND) && zj.PlayerDarkSystem.PortOpenTime())
                return Tips.tips_oneday_get(Tips.SAVE.PORTFIRST);
            else
                return false;
        };
        // 无极塔
        Tips.tips_5_1 = function () {
            var cond = false;
            if (zj.Game.PlayerTowerSystem.towerInfo.towerCur == null || zj.Game.PlayerTowerSystem.towerInfo.towerMax == null)
                return false;
            if (zj.Game.PlayerTowerSystem.towerInfo.towerCur < zj.Game.PlayerTowerSystem.towerInfo.towerMax)
                cond = true;
            return cond;
        };
        // 伏牛寨
        Tips.tips_6_1 = function () {
            return false;
        };
        // 通缉令
        Tips.tips_7_1 = function () {
            if (zj.Game.PlayerWantedSystem.wantedInfo == null)
                return false;
            if (zj.Game.PlayerWantedSystem.wantedInfo.typeLevel == {} || zj.Game.PlayerWantedSystem.wantedInfo.typeLevel == null)
                return false;
            if (zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[0] == null)
                return false;
            var consume = zj.PlayerWantedSystem.Instance(zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[0].value).battle_consume;
            return zj.Game.PlayerInfoSystem.BaseInfo.level >= zj.PlayerWantedSystem.GetLimitLevel(1) && zj.Game.PlayerInfoSystem.BaseInfo.wantedCoin > 0;
        };
        Tips.tips_7_2 = function () {
            if (zj.Game.PlayerWantedSystem.wantedInfo == null)
                return false;
            if (zj.Game.PlayerWantedSystem.wantedInfo.typeLevel == {} || zj.Game.PlayerWantedSystem.wantedInfo.typeLevel == null)
                return false;
            if (zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[1] == null)
                return false;
            var consume = zj.PlayerWantedSystem.Instance(zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[1].value).battle_consume;
            return zj.Game.PlayerInfoSystem.BaseInfo.level >= zj.PlayerWantedSystem.GetLimitLevel(2) && zj.Game.PlayerInfoSystem.BaseInfo.wantedCoin > 0;
        };
        Tips.tips_7_3 = function () {
            return false;
        };
        Tips.tips_7_4 = function () {
            return false;
        };
        Tips.tips_7_5 = function () {
            return false;
        };
        Tips.tips_7_6 = function () {
            return false;
        };
        Tips.tips_8_1 = function () {
            return false;
        };
        // 商城
        Tips.tips_9_1 = function () {
            var cond = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_NORMAL].leftTime == 0;
            return cond;
        };
        Tips.tips_9_2 = function () {
            return true;
        };
        // 神秘商店红点
        Tips.tips_9_2_red_set = function (time) {
            Tips.tips_onetime_set(Tips.SAVE.SERECT_MALL, time);
        };
        Tips.tips_9_2_red_get = function () {
            return Tips.tips_onetime_get(Tips.SAVE.SERECT_MALL);
        };
        // 神秘商店弹窗
        Tips.tips_9_2_tip_set = function (time) {
            Tips.tips_onetime_set(Tips.SAVE.SERECT_TIPS, time);
        };
        Tips.tips_9_2_tip_get = function () {
            return Tips.tips_onetime_get(Tips.SAVE.SERECT_TIPS);
        };
        Tips.tips_9_3 = function () {
            var cond1 = Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL);
            var cond2 = Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_MALL);
            var cond3 = Tips.GetTipsOfId(Tips.TAG.CONTEND, Tips.TAG.CONTEND_MALL);
            var cond4 = Tips.GetTipsOfId(Tips.TAG.TREAUSER, Tips.TAG.TREAUSER_MALL);
            var cond5 = Tips.GetTipsOfId(Tips.TAG.ZORK, Tips.TAG.ZORK_MALL);
            var cond6 = Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.PK_MALL);
            var cond7 = Tips.GetTipsOfId(Tips.TAG.TREAUSER, Tips.TAG.TREAUSER_MALL);
            var cond = cond1 || cond2 || cond3 || cond4 && cond5 && cond6 && cond7;
            return cond;
        };
        // 教学
        Tips.tips_10_1 = function () {
            var cond = false;
            if (zj.Teach.isTeach(null) != -1) {
                cond = true;
            }
            return cond;
        };
        // 玉石
        Tips.tips_11_1 = function () {
            return false;
        };
        Tips.tips_11_2 = function () {
            return false;
        };
        Tips.tips_11_3 = function () {
            return false;
        };
        // 副本
        Tips.tips_20_1 = function () {
            var tblArea = zj.TableInstanceArea.Table();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tblArea); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                if (Tips.tips_instance_1(vv.area_id))
                    return true;
            }
            return false;
        };
        Tips.tips_20_2 = function () {
            var statusList = zj.Game.PlayerInstanceSystem.GetAreaSearchStatus();
            for (var _i = 0, statusList_1 = statusList; _i < statusList_1.length; _i++) {
                var vv = statusList_1[_i];
                if (vv)
                    return true;
            }
            return false;
        };
        // 宝箱
        Tips.tips_21_1 = function () {
            return false;
        };
        Tips.tips_21_2 = function () {
            var info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LOTTERY];
            if (info.leftTime == 0)
                return Tips.tips_onetime_get(Tips.SAVE.LOTTERY);
            else
                return false;
        };
        // 日常
        Tips.tips_22_1 = function () {
            var MAX_SCORE = 100;
            var MAX_POINT = 5;
            var _not_get_daily1 = function () {
                var score = zj.Game.PlayerMissionSystem.missionActive.activeScore < MAX_SCORE ? zj.Game.PlayerMissionSystem.missionActive.activeScore : MAX_SCORE;
                var index = Math.floor(score / MAX_SCORE * MAX_POINT);
                var count = zj.Game.PlayerMissionSystem.missionActive.activeIndex.length;
                return index != count;
            };
            var cond = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DAILY) && _not_get_daily1();
            return cond;
        };
        Tips.tips_22_2 = function () {
            var _not_get_daily2 = function () {
                return zj.Table.FindF(zj.Game.PlayerMissionSystem.missionMap, function (k, v) {
                    return v.type == message.MissionType.MISSION_TYPE_DAILY && zj.Game.PlayerMissionSystem.itemCompleteForLive(k);
                });
            };
            var cond = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DAILY) && _not_get_daily2();
            return cond;
        };
        Tips.tips_22_3 = function () {
            var _not_get_daily3 = function () {
                return zj.Table.FindF(zj.Game.PlayerMissionSystem.missionMap, function (k, v) {
                    return v.type == message.MissionType.MISSION_TYPE_ACHIEVE && zj.Game.PlayerMissionSystem.itemCompleteForAchieve(k);
                });
            };
            var cond = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DAILY) && _not_get_daily3();
            return cond;
        };
        // 领奖
        Tips.tips_23_1 = function () {
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday == null)
                return false;
            var bSign = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday;
            return !bSign;
        };
        Tips.tips_23_2 = function () {
            return false;
        };
        Tips.tips_23_3 = function () {
            return false;
        };
        Tips.tips_23_4 = function () {
            // 没开启测试
            // let cond1 = !Device.isTestSwitch;
            // // 购买后是否领取
            // let cond2 = Table.FindF(Game.Playerm, function(k, v) {
            //     return v.isToday == false;
            // });
            // // 是否结束
            // let cond3 = table.findfTable.FindF(Player.monthInfo, function(k, v) {
            //     return v.monthDays > 0;
            // });
            // //非评审版
            // let cond4 = !Device.isReviewSwitch;
            // let cond = cond1 && cond2 && cond3 && cond4;
            return false;
        };
        Tips.tips_23_5_set = function (day) {
            Tips.tips_oneday_set(Tips.SAVE.AWARD_FUND, day);
        };
        Tips.tips_23_5_get = function () {
            return Tips.tips_oneday_get(Tips.SAVE.AWARD_FUND);
        };
        // 基金:1可购买;2可领奖
        Tips.tips_23_5 = function () {
            var _BUY_LEVEL = 40;
            var _BUY_VIP = 3;
            // 没有购买 and 未到40级 and 未到vip3级 and 今日没点击
            var cond1 = !zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.buy_fund
                && zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel < _BUY_VIP
                && zj.Game.PlayerInfoSystem.BaseInfo.level < _BUY_LEVEL
                && Tips.tips_23_5_get();
            // 没有购买 and 达到vip3级
            var cond2 = !zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.buy_fund
                && zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel >= _BUY_VIP
                && zj.Game.PlayerInfoSystem.BaseInfo.level < _BUY_LEVEL;
            // 购买后，可以领取
            var cond3 = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.buy_fund && zj.Otherdb.FundReward();
            // 非评审版
            // let cond4 = !Device.isReviewSwitch;
            var cond = cond1 || cond2 || cond3; // && cond4;
            return cond;
        };
        Tips.tips_23_6 = function () {
            return false;
        };
        // 充值
        Tips.tips_24_1 = function () {
            return false;
        };
        Tips.tips_25_set = function (day) {
            Tips.tips_oneday_set(Tips.SAVE.ACTIVITY_ALL, day);
        };
        Tips.tips_25_get = function () {
            return Tips.tips_oneday_get(Tips.SAVE.ACTIVITY_ALL);
        };
        // 活动
        Tips.tips_25_1 = function () {
            // 活动是否更新/未点击
            var cond1 = Tips.tips_25_get();
            // 内部活动是否开始(除真情回馈 ) and 内部红点 or 点击
            var cond2 = zj.Table.FindF(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return true
                    && zj.Game.Controller.curServerTime > 0
                    && v.openTime <= zj.Game.Controller.curServerTime
                    && v.closeTime > zj.Game.Controller.curServerTime
                    && v.type != message.ActivityType.ACT_TYPE_CHARGE_BACK
                    && v.type != message.ActivityType.ACT_TYPE_WISHTREE
                    && (Tips.GetTipsOfActivity(v.type, v.index) || (zj.Otherdb.GetActivityInShow(v.type, v.index) && Tips.tips_activity_get(v.type, v.index)));
            });
            var cond = cond1 || cond2;
            return cond;
        };
        Tips.tips_25_2 = function () {
            return false;
        };
        Tips.tips_25_3 = function () {
            var bTips1 = Tips.tips_useTime_get(Tips.SAVE.DOUBLE_TOKEN_ACTIVITY);
            var selectTransferId = 100213;
            var bTips2 = false;
            var _a = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (_k, _v) {
                return _v.gift_index == selectTransferId;
            }), findGift = _a[0], _ = _a[1];
            var gift_info = zj.PlayerGiftSystem.Instance_item(selectTransferId);
            if (findGift != null) {
                if (findGift.buy_times < gift_info.buy_times) {
                    bTips2 = Tips.tips_useTime_get(Tips.SAVE.GIFT_BAG_ACTIVITY);
                }
            }
            return bTips1 || bTips2;
        };
        Tips.SetTipsOfActivity = function () {
            var _loop_2 = function (k) {
                var info = zj.Game.PlayerActivitySystem.Activities[k];
                Tips.Activity[info.type][info.index] = false;
                if (0 < zj.Game.Controller.curServerTime && info.openTime < zj.Game.Controller.curServerTime && zj.Game.Controller.curServerTime < info.closeTime) {
                    // 七天登陆活动
                    if (info.type == message.ActivityType.ACT_TYPE_CONTINUELOGIN) {
                        Tips.Activity[info.type][info.index] = !info.todayReward && info.daysIndex <= info.rewardZone.length;
                    }
                    else if (info.type == message.ActivityType.ACT_TYPE_CHARGEADD) {
                        // for (let k in info.rewardZone) {
                        for (var i = 0; i < info.rewardZone.length; i++) {
                            if (info.rewardIndex.length != info.rewardZone.length) {
                                var bIsGet = true; //= Table.VIn(info.rewardIndex, i); // 已领取
                                for (var j = 0; j < info.rewardIndex.length; j++) {
                                    if (info.rewardIndex[j] == i) {
                                        bIsGet = true;
                                    }
                                    else {
                                        bIsGet = false;
                                    }
                                }
                                Tips.Activity[info.type][info.index] = ((info.itemCount >= info.rewardZone[i]) && bIsGet); // 可领取
                                if ((info.itemCount >= info.rewardZone[i] && bIsGet))
                                    break;
                            }
                        }
                    }
                    else if (info.type == message.ActivityType.ACT_TYPE_CONSUME) {
                        for (var kk in info.rewardZone) {
                            var bIsGet = zj.Table.VIn(info.rewardIndex, Number(kk) + 1); //已领取
                            var bNotGet = info.itemCount >= info.rewardZone[kk] && !bIsGet; // 可领取
                            Tips.Activity[info.type][info.index] = bNotGet;
                            if (bNotGet)
                                break;
                        }
                    }
                    else if (info.type == message.ActivityType.ACT_TYPE_COLLECT) {
                        var _loop_3 = function (v) {
                            var canGet = false;
                            var itemSet01 = zj.PlayerItemSystem.Set(v.exchangeInfo[0].goodsId);
                            var item01_num = v.exchangeInfo[0].count;
                            var item01_get = zj.yuan3(itemSet01.Count == 0, 1, itemSet01.Count);
                            if (v.exchangeInfo[1] != null) {
                                var itemSet02 = zj.PlayerItemSystem.Set(v.exchangeInfo[1].goodsId);
                                var item02_num = v.exchangeInfo[1].count;
                                var item02_get = zj.yuan3(itemSet02.Count == "", 1, itemSet02.Count);
                                canGet = item01_get >= item01_num && item02_get >= item02_num;
                            }
                            else {
                                canGet = item01_get >= item01_num;
                            }
                            // 已兑换完
                            var bIsGet = zj.Table.FindF(info.kvInfos, function (k, vv) {
                                return vv.key == v.index && vv.value >= v.exchangeCount;
                            });
                            var bNotGet = canGet && !bIsGet; // 可领取
                            Tips.Activity[info.type][info.index] = bNotGet;
                            if (bNotGet)
                                return "break";
                        };
                        for (var _i = 0, _a = info.exchanges; _i < _a.length; _i++) {
                            var v = _a[_i];
                            var state_2 = _loop_3(v);
                            if (state_2 === "break")
                                break;
                        }
                    }
                    else if (info.type == message.ActivityType.ACT_TYPE_CHARGEDAILY) {
                        var canGet = info.itemCount >= info.chargeDaily;
                        var bNotGet = !info.todayReward && canGet; // 可领取
                        Tips.Activity[info.type][info.index] = bNotGet;
                    }
                    else if (info.type == message.ActivityType.ACT_TYPE_DAILYADD) {
                        var _info_1 = info.dailyAddItems[info.daysIndex] || info.dailyAddItems[0];
                        var bReward = zj.Table.FindF(_info_1.rewardZone, function (k, v) {
                            var bZone = _info_1.chargeCount >= _info_1.rewardZone[k];
                            var bGet = zj.Table.FindF(_info_1.rewardIndex, function (kk, vv) {
                                return vv == k;
                            });
                            return bZone && !bGet;
                        });
                        Tips.Activity[info.type][info.index] = bReward;
                    }
                    else if (info.type == message.ActivityType.ACT_TYPE_END) {
                        var count = zj.Game.PlayerVIPSystem.vipInfo.lottery_beer_time + zj.Game.PlayerVIPSystem.vipInfo.lottery_redwine_time + zj.Game.PlayerVIPSystem.vipInfo.lottery_champagne_time;
                        var count1 = zj.Table.FindZ(info.rewardZone, count);
                        var count2 = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lotteryRewards.length;
                        var bReward = count1 != count2;
                        Tips.Activity[info.type][info.index] = bReward;
                    }
                    else if (info.type == message.ActivityType.ACT_TYPE_CHARGE_BACK) {
                        var _b = zj.Table.FindR(info.rewardZone, function (k, v) {
                            return true && info.itemCount >= v && !zj.Table.VIn(info.rewardIndex, k);
                        }), bGet = _b[0], _ = _b[1];
                        Tips.Activity[info.type][info.index] = bGet;
                    }
                    else if (info.type == message.ActivityType.ACT_TYPE_MISSION) {
                        for (var _c = 0, _d = info.missions; _c < _d.length; _c++) {
                            var v = _d[_c];
                            var _alnum = 0;
                            for (var _e = 0, _f = info.kvInfos; _e < _f.length; _e++) {
                                var vv = _f[_e];
                                if (vv.key == v.mission_type) {
                                    _alnum = vv.value;
                                }
                            }
                            var bIsGet = zj.Table.VIn(info.rewardIndex, v.mission_type); // 已领取
                            var bNotGet = (_alnum >= v.mission_condition || v.mission_type == message.ActivityMissionType.ACTIVITY_MISSION_LOGIN) && !bIsGet; // 可领取
                            Tips.Activity[info.type][info.index] = bNotGet;
                            if (bNotGet)
                                break;
                        }
                    }
                    else if (info.type == message.ActivityType.ACT_TYPE_MONTHFIT) {
                        // 双月卡购买完成并且未领取奖励
                        var Junior_Id_1 = zj.CommonConfig.month_card_fit[0]; // 初级月卡
                        var Advanced_Id_1 = zj.CommonConfig.month_card_fit[1]; // 高级月卡
                        var Junior_Tbl = zj.PlayerGiftSystem.Instance_item(Junior_Id_1);
                        var Advanced_Tbl = zj.PlayerGiftSystem.Instance_item(Advanced_Id_1);
                        var _g = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (_k, _v) {
                            return _v.gift_index == Junior_Id_1;
                        }), Junior_Info = _g[0], _ = _g[1];
                        var _h = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (_k, _v) {
                            return _v.gift_index == Advanced_Id_1;
                        }), Advanced_Info = _h[0], __ = _h[1];
                        if (Junior_Info == null || Advanced_Info == null) {
                            Tips.Activity[info.type][info.index] = false;
                        }
                        else {
                            // 月卡是否购买
                            var b_jun_bought = Junior_Info.buy_times >= Junior_Tbl.buy_times;
                            var b_adv_bought = Advanced_Info.buy_times >= Advanced_Tbl.buy_times;
                            // 是否领取过
                            // 月卡领取奖励单项
                            var reward_has_get = zj.Table.FindF(info.rewardIndex, function (_k, _v) {
                                return _v == 1;
                            });
                            if (b_jun_bought && b_adv_bought && !reward_has_get)
                                Tips.Activity[info.type][info.index] = true;
                            else
                                Tips.Activity[info.type][info.index] = false;
                        }
                    }
                    else {
                        Tips.Activity[info.type][info.index] = false;
                    }
                }
            };
            for (var k in zj.Game.PlayerActivitySystem.Activities) {
                _loop_2(k);
            }
        };
        // 武将提示
        Tips.GetTipsOfHero = function (generalId, id) {
            if (generalId != null && id != null && Tips.Hero[generalId] != null && Tips.Hero[generalId][id] != null) {
                return Tips.Hero[generalId][id];
            }
            else if (generalId != null && id == null) {
                return false ||
                    Tips.Hero[generalId][2] ||
                    Tips.Hero[generalId][3] ||
                    Tips.Hero[generalId][4] ||
                    Tips.Hero[generalId][5] ||
                    Tips.Hero[generalId][6] ||
                    Tips.Hero[generalId][7] ||
                    Tips.Hero[generalId][8] ||
                    Tips.Hero[generalId][9];
            }
        };
        // 武将红点
        Tips.SetTipsOfHero = function (generalId, id) {
            if (Tips.Hero[generalId] == null) {
                Tips.Hero[generalId] = [];
                for (var i = 1; i <= 10; i++) {
                    Tips.Hero[generalId][i] = false;
                }
            }
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(generalId);
            var funcHero = [
                Tips.tips_hero_1(),
                Tips.tips_hero_2(generalId, hunterInfo),
                Tips.tips_hero_3(generalId, hunterInfo, baseGeneralInfo),
                Tips.tips_hero_4(generalId, hunterInfo, baseGeneralInfo),
                Tips.tips_hero_5(generalId, hunterInfo, baseGeneralInfo),
                Tips.tips_hero_6(),
                Tips.tips_hero_7(),
                Tips.tips_hero_8(),
                Tips.tips_hero_9(generalId, hunterInfo, baseGeneralInfo),
                Tips.tips_hero_10(generalId, hunterInfo, baseGeneralInfo),
            ];
            if (generalId && !id) {
                for (var i = 0; i < funcHero.length; i++) {
                    var v = funcHero[i];
                    Tips.Hero[generalId][i + 1] = v;
                }
            }
            else if (generalId && id) {
                Tips.Hero[generalId][id] = funcHero[id];
            }
            Tips.SetTipsOfId(Tips.TAG.GENERAL);
        };
        // 有可召唤的猎人
        Tips.tips_hero_1 = function () {
            return false;
        };
        // 猎人可进阶
        Tips.tips_hero_2 = function (generalId, hunterInfo) {
            var allActived = true;
            for (var i = 1; i <= 4; i++) {
                var partnerLv = zj.PlayerHunterSystem.GetPartnerLv(generalId, i);
                if (hunterInfo.step >= partnerLv || hunterInfo.step == zj.CommonConfig.general_max_quality) {
                    allActived = false;
                    break;
                }
            }
            var moneyEnough = zj.PlayerHunterSystem.GetStep(generalId).consume_money <= zj.Game.PlayerInfoSystem.BaseInfo.money;
            return allActived && moneyEnough;
        };
        // 可激活羁绊卡
        Tips.tips_hero_3 = function (generalId, hunterInfo, baseGeneralInfo) {
            for (var i = 1; i <= 4; i++) {
                var partner = zj.PlayerHunterSystem.GetPartner(generalId, i);
                var partnerLevel = zj.PlayerHunterSystem.GetPartnerLv(generalId, i);
                var holeLevel = zj.PlayerHunterSystem.GetHoleLevel(generalId, i);
                var holeInfo = zj.PlayerHunterSystem.GetHole(generalId, i);
                if (partner == null || holeInfo == null)
                    break;
                var bActive = (hunterInfo.step < partnerLevel);
                var bLevel = (hunterInfo.level >= holeLevel);
                var bCount = (zj.PlayerItemSystem.Count(partner.id) >= holeInfo.activate_num);
                if (!bActive && bCount && bLevel)
                    return true;
            }
            return false;
        };
        // 有技能点可以升级技能了
        Tips.tips_hero_4 = function (generalId, hunterInfo, baseGeneralInfo) {
            return hunterInfo.skill_num > 0;
        };
        // 有卡片可以安装
        Tips.tips_hero_5 = function (generalId, hunterInfo, baseGeneralInfo) {
            var func = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO);
            if (!func)
                return false;
            if (baseGeneralInfo.is_open == 0)
                return false;
            var cardMap = zj.Game.PlayerCardSystem.getHunterCardMap(generalId);
            var level = zj.Game.PlayerInfoSystem.Level;
            for (var i = 1; i <= 9; i++) {
                if (baseGeneralInfo.card_level[i - 1] <= level) {
                    if (cardMap[i] == null) {
                        var type = baseGeneralInfo.card_type[i - 1];
                        if (zj.PlayerCardSystem.GetHaveCardByType(type) == true) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        // 武将可升星
        Tips.tips_hero_6 = function () {
            return false;
        };
        // 武将觉醒
        Tips.tips_hero_7 = function () {
            // wtf!!!
            return false;
        };
        // 念力
        Tips.tips_hero_8 = function () {
            return false;
        };
        // 装备
        Tips.tips_hero_9 = function (generalId, hunterInfo, baseGeneralInfo) {
            var not_get_hero_1 = function () {
                var equipInfo = baseGeneralInfo.equip_info;
                return zj.Table.FindF(equipInfo, function (k, v) {
                    var have = zj.Table.FindF(zj.Game.PlayerHunterSystem.queryHunter(generalId).equipInfo, function (kk, vv) {
                        return vv.equipId == v;
                    });
                    return v != 0 &&
                        ((Number(k) != 3 && zj.PlayerHunterSystem.equipCanActive(generalId, equipInfo, v)) ||
                            (Number(k) == 3 && zj.PlayerHunterSystem.equipCanCompound(generalId, equipInfo)) ||
                            (have && zj.PlayerHunterSystem.equipCanUpStep(generalId, v)) ||
                            (have && zj.PlayerHunterSystem.equipCanStrengthen(generalId, v)));
                });
            };
            return zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.EQUIP) && not_get_hero_1();
        };
        // 升级
        Tips.tips_hero_10 = function (generalId, hunterInfo, baseGeneralInfo) {
            var canUpLevel = function () {
                var canUpMaxLevel = 0;
                if (hunterInfo.break_level != 0 && hunterInfo.level >= 60) {
                    var _a = zj.PlayerHunterSystem.GetBreakHunterLevel(hunterInfo.break_level), _1 = _a[0], levelNext = _a[1], __ = _a[2];
                    canUpMaxLevel = 60 + levelNext;
                }
                else {
                    canUpMaxLevel = zj.PlayerHunterSystem.GetStep(generalId).max_level;
                }
                var needsIsEnough = function (exp) {
                    var _PROP_INDEX = [30001, 30002, 30003, 30004];
                    var metGivenExp = 0;
                    for (var _i = 0, _PROP_INDEX_1 = _PROP_INDEX; _i < _PROP_INDEX_1.length; _i++) {
                        var v = _PROP_INDEX_1[_i];
                        if (zj.Game.PlayerCardSystem.getGoodsById(v) != null) {
                            metGivenExp = metGivenExp + zj.Game.PlayerCardSystem.getGoodsById(v).count * Number(zj.TableItemProp.Item(v).general_exp);
                        }
                    }
                    return metGivenExp >= exp;
                };
                var _b = zj.PlayerHunterSystem.Exp(generalId), ExpNow = _b[0], ExpNext = _b[1], _ = _b[2];
                var needEnough = needsIsEnough(ExpNext - ExpNow);
                return canUpMaxLevel > hunterInfo.level && needEnough;
            };
            return zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.HEROLEVEL) && canUpLevel();
        };
        Tips.tips_27_1 = function () {
            var allGen = zj.Game.PlayerFormationSystem.GetAllFormatGeneralByType(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
            return zj.Table.FindF(allGen, function (kk, vv) {
                if (Tips.Hero[vv]) {
                    return zj.Table.FindF(Tips.Hero[vv], function (k, v) {
                        return v;
                    });
                }
            });
        };
        // 装备
        Tips.tips_39_1 = function () {
            // 列表中排前七名的武将头像上有红点
            var _get_hero_equip = function () {
                var hero_seven = zj.Game.PlayerHunterSystem.getSortGeneral();
                var cond1 = zj.Table.FindF(hero_seven, function (k, v) {
                    return 0 <= Number(k) && Number(k) <= 6 && Tips.Hero[v.general_id][9];
                });
                return cond1;
            };
            var cond = _get_hero_equip();
            return cond;
        };
        // 念兽
        Tips.tips_28_1 = function () {
            var _not_get_pet_1 = function () {
                var tbl = zj.TableBaseAdviser.Table();
                return zj.Table.FindF(tbl, function (k, v) {
                    return zj.PlayerAdviserSystem.CompletedHave(v.adviser_id);
                });
            };
            var cond = (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER) || zj.PlayerAdviserSystem.Open()) && _not_get_pet_1();
            return cond;
        };
        Tips.tips_28_2 = function () {
            var _not_get_pet_2 = function () {
                var tbl = zj.TableBaseAdviser.Table();
                return zj.Table.FindF(tbl, function (k, v) {
                    return zj.PlayerAdviserSystem.CompletedMax(v.adviser_id, zj.Game.PlayerAdviserSystem.advisersMap[v.adviser_id].level);
                });
            };
            var cond = (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER) || zj.PlayerAdviserSystem.Open()) && _not_get_pet_2();
            return cond;
        };
        Tips.tips_28_3 = function () {
            var _not_get_pet_3 = function () {
                var tbl = zj.Game.PlayerAdviserSystem.adviser;
                return zj.Table.FindF(tbl, function (k, v) {
                    return (v.adviserId == 12 && v.reward_count != 0) || (v.adviserId == 11 && v.reward_count != 0);
                });
            };
            var cond = (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER) || zj.PlayerAdviserSystem.Open()) && _not_get_pet_3();
            return cond;
        };
        Tips.tips_28_4 = function () {
            var _not_get_pet_4 = function () {
                var tbl = zj.TableBasePet.Table();
                return zj.Table.FindF(tbl, function (k, v) {
                    return zj.PlayerAdviserSystem.PetGetTips(v.pet_id);
                });
            };
            var cond = (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER) || zj.PlayerAdviserSystem.Open()) && _not_get_pet_4();
            return cond;
        };
        Tips.tips_28_5 = function () {
            var _not_get_pet_5 = function () {
                var tbl = zj.Game.PlayerAdviserSystem.petInfo;
                return zj.Table.FindF(tbl, function (k, v) {
                    return zj.PlayerAdviserSystem.PetUpStar(v.pet_id, zj.Game.PlayerAdviserSystem.petMap[v.pet_id].star);
                });
            };
            var cond = (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER) || zj.PlayerAdviserSystem.Open()) && _not_get_pet_5();
            return cond;
        };
        Tips.tips_28_6 = function () {
            var _not_get_pet_6 = function () {
                var tbl = zj.Game.PlayerAdviserSystem.petInfo;
                return zj.Table.FindF(tbl, function (k, v) {
                    return zj.PlayerAdviserSystem.PetStep(v.pet_id);
                });
            };
            var cond = (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER) || zj.PlayerAdviserSystem.Open()) && _not_get_pet_6();
            return cond;
        };
        // 好友
        Tips.tips_29_1 = function () {
            var cond = false;
            var bTag = false;
            for (var k in zj.Game.PlayerRelateSystem.relateResp.relations) {
                var v = zj.Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.type == message.ERelationType.RELATION_TYPE_FRIEND && v.canReward && v.isReward == false) {
                    bTag = true;
                    break;
                }
            }
            if (zj.Game.PlayerVIPSystem.vipInfo.rewardPower != null && zj.Game.PlayerVIPSystem.vipInfo.rewardPower < zj.PlayerVIPSystem.ItemNew().reward_power && bTag == true) {
                cond = true;
            }
            return cond;
        };
        Tips.tips_29_2 = function () {
            var cond = false;
            if (zj.Game.PlayerRelateSystem.relateResp.applys.length > 0) {
                cond = true;
            }
            return cond;
        };
        // 排行
        Tips.tips_30_1 = function () {
            return false;
        };
        // 背包
        Tips.tips_31_1 = function () {
            var bFind = zj.Table.FindF(zj.Game.PlayerItemSystem.mapGoodsInfo, function (k, v) {
                var info = zj.PlayerItemSystem.ItemConfig(v.goodsId);
                return info != null && info["red_tips"] != null && info["red_tips"] != 0;
            });
            return bFind;
        };
        // 邮件
        Tips.tips_33_1 = function () {
            var _check_type = [
                message.MailType.MAIL_TYPE_SYSTEM,
                message.MailType.MAIL_TYPE_NORMAL,
                message.MailType.MAIL_TYPE_PVP,
            ];
            var cond = zj.Table.FindF(zj.Game.PlayerMailSystem.mailboxInfo, function (k, v) {
                var pkRed = (Number(k) + 1 == message.MailType.MAIL_TYPE_PVP) && Tips.GetSaveBool(Tips.SAVE.MAIL_PK, false);
                return zj.Table.VIn(_check_type, Number(k) + 1) && (v.unReadCount + v.unReward > 0) && !pkRed;
            });
            return cond;
        };
        // 新手
        Tips.tips_34_1 = function () {
            return false;
        };
        // 首冲
        Tips.tips_35_1 = function () {
            return false;
        };
        Tips.tips_35_2 = function () {
            var info = zj.Game.PlayerGiftSystem.firstCharge();
            var bAllGet = zj.Table.alltrue(info, function (k, v) {
                var bFull = zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= v.token;
                var bGet = zj.Table.VIn(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward, Number(k) + 1);
                return (bFull && bGet) || !bFull;
            });
            var cond = !bAllGet && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.old_chargeToken == 0;
            return cond;
        };
        // 七天
        Tips.tips_36_1 = function () {
            var bOpen = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0;
            var bReward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, function (kk, vv) {
                return vv == 0;
            });
            return bOpen && bReward;
        };
        Tips.tips_36_2 = function () {
            var mixUnitInfo = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo;
            if (mixUnitInfo.newGiftSeven.length < mixUnitInfo.sevenLoginReward.length && mixUnitInfo.sevenLoginReward.length <= 7)
                return true;
            else
                return false;
        };
        // 新手狂欢
        Tips.tips_37_1 = function () {
            var cond = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0
                && (zj.Game.PlayerMissionSystem.NoviceCanReward(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL) || zj.Game.PlayerMissionSystem.NoviceCanRewardEnd(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL));
            return cond;
        };
        Tips.tips_38_1 = function () {
            return false;
        };
        // 更多
        Tips.tips_42_1 = function () {
            var cond = Tips.GetTipsOfId(Tips.TAG.PACKAGE) || Tips.GetTipsOfId(Tips.TAG.FRIEND) || Tips.GetTipsOfId(Tips.TAG.RANK);
            return cond;
        };
        // 真情回馈
        Tips.tips_43_set = function (day) {
            Tips.tips_oneday_set(Tips.SAVE.ACTIVITY_BACK, day);
        };
        Tips.tips_43_get = function () {
            return Tips.tips_oneday_get(Tips.SAVE.ACTIVITY_BACK);
        };
        Tips.tips_43_1 = function () {
            // 活动是否更新/未点击
            var cond1 = Tips.tips_43_get();
            // 内部活动是否开始 and 内部红点 or 点击
            var cond2 = zj.Table.FindF(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return true
                    && v.type == message.ActivityType.ACT_TYPE_CHARGE_BACK
                    && zj.Game.Controller.curServerTime > 0
                    && v.openTime <= zj.Game.Controller.curServerTime
                    && v.closeTime > zj.Game.Controller.curServerTime
                    && Tips.Activity[v.type][v.index];
            });
            var cond = cond1 || cond2;
            return cond;
        };
        Tips.tips_44_1 = function () {
            return true;
        };
        // 回收
        Tips.tips_46_1 = function () {
            return false;
        };
        // 宝物
        Tips.tips_47_1 = function () {
            var cardBags = zj.PlayerCardSystem.GetAllCardBag();
            return cardBags.length != 0 && zj.PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_POTATO);
        };
        Tips.tips_47_2 = function () {
            return false;
        };
        Tips.tips_47_3 = function () {
            var tbl = zj.PlayerCardSystem.GetComposeTbl();
            var bTip = zj.Table.FindF(tbl, function (_k, _v) {
                return _v.can_compose == 1;
            });
            var bOpen = zj.PlayerMissionSystem.FunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_POTATO);
            return bTip && bOpen;
        };
        // 设置邮件提示
        Tips.SetTipsOfMail = function () {
            Tips.SetTipsOfId(Tips.TAG.MAIL, 1);
        };
        // 获取邮件提示
        Tips.GetTipsOfMail = function (mailType) {
            var cond = false;
            if (zj.Game.PlayerMailSystem.mailboxInfo != null && zj.Game.PlayerMailSystem.mailboxInfo[mailType - 1] != null) {
                cond = false || zj.Game.PlayerMailSystem.mailboxInfo[mailType - 1].unReadCount > 0 || zj.Game.PlayerMailSystem.mailboxInfo[mailType - 1].unReward > 0;
            }
            Tips.SetTipsOfMail();
            return cond;
        };
        Tips.SetTipsOfTime = function () {
            // 活动一次性红点
            Tips.tips_25_set(zj.Game.PlayerMissionSystem.GetDay());
            // 回馈一次性红点
            Tips.tips_43_set(zj.Game.PlayerMissionSystem.GetDay());
            // 基金一次性红点
            Tips.tips_23_5_set(zj.Game.PlayerMissionSystem.GetDay());
            // 酒馆活动红点
            Tips.tips_oneday_set(Tips.SAVE.TAVERN_ACTIVITY, zj.Game.PlayerMissionSystem.GetDay());
            // 伏牛
            Tips.SetTipsOfId(Tips.TAG.BASTILLE);
            // 冲榜
            Tips.SetTipsOfId(Tips.TAG.CHARGE);
            // 魔域祭祀
            Tips.SetTipsOfId(Tips.TAG.ZORK, Tips.TAG.ZORK_Runes);
            // 邮件
            Tips.SetTipsOfId(Tips.TAG.MAIL);
            // 联盟战
            // Tips.SetTipsOfId(Tips.TAG.LEAGUE, 6)
            // 魔域Boss
            Tips.SetTipsOfId(Tips.TAG.ZORK, Tips.TAG.ZORK_Boss);
        };
        Tips.SetTipsOfAllHero = function () {
            // 武将提示
            Tips.SetTipsOfId(Tips.TAG.GENERAL);
            // 图鉴
            //Tips.SetTipsOfId(Tips.TAG.Pokedex);
        };
        Tips.SetTipsOfAllActivity = function () {
            // 活动红点数据
            Tips.SetTipsOfActivity();
            // 活动红点
            Tips.SetTipsOfId(Tips.TAG.ACTIVITY);
            // 回馈红点
            Tips.SetTipsOfId(Tips.TAG.FEEDBACK);
        };
        Tips.tips_45_1_setread = function (read) {
            Tips.tips_onetime_set(Tips.SAVE.WONDERLAND_BOSS_TIPS, read);
        };
        Tips.tips_45_1 = function () {
            return false;
        };
        Tips.tips_45_2 = function () {
            var bOpen = false;
            var bFresh = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info != 0;
            var cond = bFresh && bOpen;
            return cond;
        };
        Tips.tips_45_3 = function () {
            if (zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel == null)
                return false;
            var bOpen = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.RUNES);
            var bTimes = false;
            var level = zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel;
            var tbl = zj.TableLicence.Table();
            var runesTime = tbl[level].gain_runes_time;
            if (zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time != null) {
                bTimes = zj.Game.PlayerVIPSystem.vipInfo.gain_runes_time < runesTime && true || false;
            }
            var rewardGet = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0;
            var cond = bOpen && bTimes || rewardGet;
            return cond;
        };
        Tips.tips_45_4 = function () {
            // hhh  convertdb.Tips?
            // let bOpen = PlayerMissionSystem.FunOpenTo(FUNC.RUNES);
            // let bOther = playerc convertdb.Tips(message.EExchangeMallType.EXCHANGEMALL_TYPE_DEMON)
            // let cond = bOpen && bOther;
            // return cond;
            return false;
        };
        // 冲榜
        Tips.tips_48_1 = function () {
            var cond = false;
            for (var _i = 0, _a = zj.Game.PlayerActivitySystem.Activities; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.type == message.ActivityType.ACT_TYPE_CHARGERANK) {
                    var time = v.stopTime - zj.Game.Controller.curServerTime;
                    if (time > 0) {
                        cond = true;
                    }
                }
            }
            return cond;
        };
        Tips.tips_48_2 = function () {
            var show_count = 3;
            var rewardGet = false;
            var index = 0;
            var can_get = false;
            for (var _i = 0, _a = zj.Game.PlayerActivitySystem.Activities; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.type == message.ActivityType.ACT_TYPE_CHARGERANK) {
                    can_get = v.stopTime - zj.Game.Controller.curServerTime > 0;
                    for (var kk in v.rewardZone) {
                        var vv = v.rewardZone[kk];
                        if (v.itemCount >= vv) {
                            index = Number(kk) > show_count ? show_count : Number(kk);
                        }
                    }
                    if (index != v.rewardIndex.length && index != 0) {
                        rewardGet = true;
                    }
                }
            }
            return rewardGet && can_get;
        };
        // 执照
        Tips.tips_49_1 = function () {
            var _not_get_License_1 = function () {
                var tbl = zj.TableMissionType.Table();
                return zj.Table.FindF(tbl, function (k, v) {
                    return v.type == message.MissionType.MISSION_TYPE_LICENCE && zj.Game.PlayerMissionSystem.itemCompleteForLicense(k) && zj.Game.PlayerInfoSystem.baseInfo_pre.level >= 10;
                });
            };
            return _not_get_License_1();
        };
        // 礼包
        Tips.tips_50_1 = function () {
            // 首冲
            return false;
        };
        Tips.tips_50_2 = function () {
            // 绝版
            return zj.PlayerGiftSystem.findOpTips();
        };
        Tips.tips_50_3 = function () {
            // 超值
            return zj.PlayerGiftSystem.findTips();
        };
        Tips.tips_50_4 = function () {
            // 充值
            return zj.PlayerGiftSystem.findTipsCharge();
        };
        Tips.tips_51_1 = function () {
            // 首次免费
            if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info == 0)
                return false;
            return !zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_isFree;
        };
        Tips.tips_51_2 = function () {
            return false;
        };
        Tips.tips_51_3 = function () {
            return zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info != 0 && zj.Game.PlayerInfoSystem.BaseInfo.dollCoin != 0;
        };
        // 福利活动
        // 签到
        Tips.tips_52_1 = function () {
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo == null)
                return false;
            return !zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.is_signToday;
        };
        // 是否领奖
        Tips.tips_52_2 = function () {
            var tbl = zj.TableUplevelReward.Table();
            var info = [];
            var newTbl = {};
            for (var key in tbl) {
                if (tbl.hasOwnProperty(key)) {
                    var element = tbl[key];
                    if (element.index > 1000)
                        continue;
                    newTbl[key] = element;
                }
            }
            var ret = zj.Table.copy(newTbl);
            ret.sort(function (a, b) {
                return a.index - b.index;
            });
            for (var k in ret) {
                var vv = ret[k];
                if (vv.level <= zj.Game.PlayerInfoSystem.BaseInfo.level) {
                    info.push(vv);
                }
            }
            var isGet = zj.Table.FindF(info, function (kk, vv) {
                var level = info[kk].level;
                // 是否够买了月卡
                var BuyCard = zj.PlayerGiftSystem.AdvanceMonthBeBought();
                var mixUnitInfo = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo;
                // 等级奖励是否领取
                var levelReward = zj.Table.FindF(mixUnitInfo.levelReward, function (k, v) {
                    return v == Number(kk) + 1;
                });
                // 月卡奖励是否领取
                var monthReward = zj.Table.FindF(mixUnitInfo.monthReward, function (k, v) {
                    return mixUnitInfo.monthReward.length != 0 && v == vv.index;
                });
                // 月卡没购买（满足等级条件，等级奖励未领取）
                var tips1 = BuyCard == false && zj.Game.PlayerInfoSystem.BaseInfo.level >= level && !(info.length == mixUnitInfo.levelReward.length);
                var tips2 = BuyCard == true && zj.Game.PlayerInfoSystem.BaseInfo.level >= level && !levelReward;
                var tips3 = BuyCard == true && zj.Game.PlayerInfoSystem.BaseInfo.level >= level && levelReward && !monthReward;
                var tips4 = BuyCard && !monthReward;
                var cond = tips1 || tips2 || tips3 || tips4;
                return cond;
            });
            return isGet;
            // let info: message.GiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
            //     return v.gift_index == 100203;
            // })[0];
            // let info1: message.GiftInfo = Table.FindR(Game.PlayerGiftSystem.giftInfos, (k, v) => {
            //     return v.gift_index == 100204;
            // })[0];
            // if (info == null && info1 == null) {
            //     return false;
            // } else if (info != null && info1 == null) {
            //     if ((info.buy_times != 0 && info.mark == 0)) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // } else if (info == null && info1 != null) {
            //     if ((info1.buy_times != 0 && info1.mark == 0)) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // } else {
            //     if ((info.buy_times != 0 && info.mark == 0) || (info1.buy_times != 0 && info1.mark == 0)) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // }
        };
        Tips.tips_52_3 = function () {
            return false;
        };
        // 点击一次消失
        Tips.tips_52_4 = function () {
            Tips.tips_52_4_set();
            return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_WORLD);
        };
        Tips.tips_52_4_set = function () {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_WORLD);
        };
        Tips.tips_52_5 = function () {
            Tips.tips_52_5_set();
            return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_WORDERLAND);
        };
        Tips.tips_52_5_set = function () {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_WORDERLAND);
        };
        Tips.tips_52_6 = function () {
            Tips.tips_52_6_set();
            return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_SKY);
        };
        Tips.tips_52_6_set = function () {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_SKY);
        };
        Tips.tips_52_7 = function () {
            Tips.tips_52_7_set();
            return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_WANTED);
        };
        Tips.tips_52_7_set = function () {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_WANTED);
        };
        Tips.tips_52_8 = function () {
            if (zj.Game.PlayerInfoSystem.BaseInfo.bind_phone == message.EBindPhone.BIND_PHONE_NOT_BIND) {
                Tips.tips_52_8_set();
                return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_BIND_PHONE);
            }
        };
        Tips.tips_52_8_set = function () {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_BIND_PHONE);
        };
        Tips.tips_52_9 = function () {
            if (Tips.tips_useTime_get(Tips.SAVE.SPECIAL_SHARE)) {
                Tips.tips_52_9_set();
                return Tips.tips_useTime_get(Tips.SAVE.SPECIAL_SHARE);
            }
            var mixUnitInfo = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo;
            var shareCount = (_a = {},
                _a[message.ShareTaskType.SHARE_TASK_TYPE_CREATE_ROLE] = mixUnitInfo.share_role_create_count,
                _a[message.ShareTaskType.SHARE_TASK_TYPE_SIX_STAR] = mixUnitInfo.share_role_six_star_count,
                _a[message.ShareTaskType.SHARE_TASK_TYPE_FIRST_CHARGE] = mixUnitInfo.share_role_first_charge_count,
                _a);
            var shareReceive = (_b = {},
                _b[message.ShareTaskType.SHARE_TASK_TYPE_CREATE_ROLE] = mixUnitInfo.share_role_create_gift,
                _b[message.ShareTaskType.SHARE_TASK_TYPE_SIX_STAR] = mixUnitInfo.share_role_six_star_gift,
                _b[message.ShareTaskType.SHARE_TASK_TYPE_FIRST_CHARGE] = mixUnitInfo.share_role_first_charge_gift,
                _b);
            // hhh shareInfo?
            for (var _i = 0, _c = zj.HelpUtil.GetKV(shareCount); _i < _c.length; _i++) {
                var _d = _c[_i], k = _d[0], v = _d[1];
                // for (let [kk, vv] of )
            }
            return false;
            var _a, _b;
        };
        Tips.tips_52_9_set = function () {
            Tips.tips_useTime_set(Tips.SAVE.SPECIAL_SHARE);
        };
        Tips.tips_52_10 = function () {
            var reward_progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INSTANCE_POWER];
            var canGet = zj.CommonConfig.recieve_instance_power_info;
            var list = [];
            if (reward_progress) {
                for (var _i = 0, canGet_1 = canGet; _i < canGet_1.length; _i++) {
                    var vv = canGet_1[_i];
                    if (vv <= reward_progress.info) {
                        list.push(vv);
                    }
                }
            }
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.instancePower.length < list.length)
                return true;
            else
                return false;
        };
        // 图鉴
        Tips.tips_53_1 = function () {
            // let tag = false;
            // for (const k in Game.PlayerHunterHistorySystem.getGeneralHistoryIds()) {
            //     const v = Game.PlayerHunterHistorySystem.getGeneralHistoryIds()[k];
            //     let item: any = v;
            //     let ins = PlayerHunterSystem.Table(item.generalId);
            //     if (ins != null && ins.is_open != 0 && Gmgr.Instance.pokedexTipsTbl[item.generalId] != null && Gmgr.Instance.pokedexTipsTbl[item.generalId] != 1) {
            //         tag = true;
            //         break;
            //     }
            // }
            // return tag;
            return false;
        };
        // 与时间赛跑
        // 当日红点
        Tips.tips_54_1 = function () {
            return zj.PlayerRaceSystem.GetTipsShow();
        };
        // 宝箱红点
        Tips.tips_54_2 = function () {
            return false;
        };
        // Vip系统
        Tips.tips_55_1 = function () {
            var tbl = zj.TableLicenceWeal.Table(); // StringConfig_Table.vipWeal
            var chargeList = [];
            for (var _i = 0, _a = Object.keys(tbl); _i < _a.length; _i++) {
                var v = _a[_i];
                if (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken >= tbl[v].sum) {
                    chargeList.push(tbl[v]);
                }
            }
            var levelCur = chargeList.length - 1;
            var cond = false;
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.vipReward.length < levelCur) {
                cond = true;
            }
            return cond;
        };
        Tips.tips_55_2 = function () {
            // return PlayerGiftSystem.findOpTipsVip();
            return false;
        };
        Tips.tips_55_3 = function () {
            // if (Game.PlayerInfoSystem.BaseInfo.chargeToken < PlayerVIPSystem.WealItem(0)["charge"]) {
            //     return false;
            // }
            // if (Game.PlayerPaySystem.customerInfo.customerWeb != "" && Device.customerWeb == "") {
            //     return true;
            // }
            return false;
        };
        // 宝石收藏（任务达人）
        Tips.tips_56_1 = function () {
            var mIndex = zj.PlayerJewelSystem.GetActivityIndex();
            if (mIndex == null) {
                return false;
            }
            var isOver1 = function () {
                var id = zj.PlayerJewelSystem.GetJewelDailyMission(mIndex);
                var tbl = zj.Game.PlayerMissionSystem.itemMain(id);
                var index = zj.Game.PlayerMissionSystem.itemIndex(tbl.type, tbl.sub_type);
                if (zj.Game.PlayerMissionSystem.missionMap[index] == null) {
                    return false;
                }
                var _a = zj.Game.PlayerMissionSystem.itemComplete(index), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4], isCanGet = _a[5];
                return isCanGet && !isOver;
            };
            var isOver2 = function () {
                var id = zj.PlayerJewelSystem.GetJewelFinalMission(mIndex);
                var tbl = zj.Game.PlayerMissionSystem.itemMain(id);
                var index = zj.Game.PlayerMissionSystem.itemIndex(tbl.type, tbl.sub_type);
                if (zj.Game.PlayerMissionSystem.missionMap[index] == null) {
                    return false;
                }
                var _a = zj.Game.PlayerMissionSystem.itemComplete(index), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4], isCanGet = _a[5];
                return isCanGet && !isOver;
            };
            return isOver1() || isOver2();
        };
        // 宝石收藏（宝石商店  兑换奖励） 
        Tips.tips_56_2 = function () {
            var index = zj.PlayerJewelSystem.GetActivityIndex();
            if (index == null) {
                return false;
            }
            var aData = zj.PlayerJewelSystem.GetJewelMallData(index);
            for (var i = 0; i < aData.length; i++) {
                if (zj.Game.PlayerMissionSystem.missionActive.jewelHave > aData[i].consume && aData[i].leftTimes > 0) {
                    return true;
                }
            }
            return false;
        };
        Tips.tips_58_1 = function () {
            // let bSeven = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0;
            // let _data = PlayerHunterSystem.Activity_Hero();
            // let count = Table.Count(_data, function (k, v) {
            //     return Table.FindK(Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), _data[k].general_id) != -1 ? 1 : 0;
            // });
            // let bTipsUp = count != Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.length;
            // return bTipsUp && bSeven;
            var _a = [0, 0, 0, 0], heroCount1 = _a[0], heroCount2 = _a[1], heroCount3 = _a[2], heroCount4 = _a[3];
            var _b = [0, 0, 0, 0], own_count1 = _b[0], own_count2 = _b[1], own_count3 = _b[2], own_count4 = _b[3];
            var heroData = zj.TableSpgeneralInformation.Table();
            var rewardData = zj.TableSpgeneralReward.Table();
            for (var key in rewardData) {
                if (rewardData.hasOwnProperty(key)) {
                    var element = rewardData[key];
                    if (element.index.toString().substr(0, 1) == "1") {
                        if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(rewardData[Number(key)].index) != -1) {
                            own_count1++;
                        }
                    }
                    if (element.index.toString().substr(0, 1) == "2") {
                        if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(rewardData[Number(key)].index) != -1) {
                            own_count2++;
                        }
                    }
                    if (element.index.toString().substr(0, 1) == "3") {
                        if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(rewardData[Number(key)].index) != -1) {
                            own_count3++;
                        }
                    }
                    if (element.index.toString().substr(0, 1) == "4") {
                        if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.spgeneralReward.indexOf(rewardData[Number(key)].index) != -1) {
                            own_count4++;
                        }
                    }
                }
            }
            for (var key in heroData) {
                if (heroData.hasOwnProperty(key)) {
                    var element = heroData[key];
                    if (element.task_type == 1) {
                        if (zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[Number(key)].general_id) != -1) {
                            heroCount1++;
                        }
                    }
                    if (element.task_type == 2) {
                        if (zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[Number(key)].general_id) != -1) {
                            heroCount2++;
                        }
                    }
                    if (element.task_type == 3) {
                        if (zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[Number(key)].general_id) != -1) {
                            heroCount3++;
                        }
                    }
                    if (element.task_type == 4) {
                        if (zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds().indexOf(heroData[Number(key)].general_id) != -1) {
                            heroCount4++;
                        }
                    }
                }
            }
            var isShowTip = function (hero, count) {
                if (hero == 8)
                    return !(count == 3);
                if (hero >= 5)
                    return !(count == 2);
                if (hero >= 3)
                    return !(count == 1);
            };
            return isShowTip(heroCount1, own_count1) || isShowTip(heroCount2, own_count2) || isShowTip(heroCount3, own_count3) || isShowTip(heroCount4, own_count4);
        };
        // 许愿屋
        Tips.tips_59_1 = function () {
            if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info == 0)
                return false;
            return zj.PlayerVIPSystem.ItemNew().xuyuan_free > zj.Game.PlayerVIPSystem.vipInfo.xuyuan_free;
        };
        Tips.tips_59_2 = function () {
            var infoXuYuan = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN];
            if (infoXuYuan.info == 0 || infoXuYuan.leftTime == 0)
                return false;
            var xuyuanTbl = zj.TableXuyuan.Table();
            var index = infoXuYuan.info % zj.Table.tableLength(xuyuanTbl);
            index = index == 0 ? zj.Table.tableLength(xuyuanTbl) : index;
            var cur_topic = zj.TableXuyuan.Item(index);
            var can_get_num = 0;
            for (var _i = 0, _a = cur_topic.step_score; _i < _a.length; _i++) {
                var v = _a[_i];
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore >= v) {
                    can_get_num = can_get_num + 1;
                }
            }
            return !(can_get_num == zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone.length);
        };
        Tips.tips_61_1 = function () {
            var cond = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_ONE].leftTime > 0
                && (zj.Game.PlayerMissionSystem.NoviceCanReward(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE) || zj.Game.PlayerMissionSystem.NoviceCanRewardEnd(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE));
            return cond;
        };
        // 黑暗大陆
        Tips.tips_62_1 = function () {
            var cond = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_RELIC].leftTime == 0;
            var bOpen = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DARKLAND2);
            return cond && bOpen;
        };
        Tips.tips_62_2 = function () {
            var bOpen = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.DARKLAND2);
            var canFight = false;
            var relicTbl = zj.TableInstanceRelic.Table();
            for (var i = 0; i < Object.keys(relicTbl).length; i++) {
                if (zj.PlayerDarkSystem.LastChallengeTime(i + 1) > 0) {
                    canFight = true;
                }
            }
            var canOpenChest = false;
            for (var _i = 0, _a = zj.Game.PlayerInstanceSystem.RelicChest; _i < _a.length; _i++) {
                var v = _a[_i];
                if (zj.PlayerDarkSystem.CanOpenByChestId(v.key)) {
                    canOpenChest = true;
                }
            }
            return bOpen && (canFight || canOpenChest);
        };
        Tips.tips_62_3 = function () {
            var bOpen = zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.GROUPFIGHT);
            if (!bOpen)
                return false;
            var _a = zj.Table.FindR(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleTime, function (_k, _v) {
                return _k == 0;
            }), useTime = _a[0], _ = _a[1];
            if (useTime == null)
                useTime = 0;
            else
                useTime = useTime.value;
            var allTime = zj.CommonConfig.group_battle_limit_times[0];
            if (useTime < allTime)
                return true;
        };
        Tips.tips_63_1 = function () {
            var cond = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_TWO].leftTime > 0
                && (zj.Game.PlayerMissionSystem.NoviceCanReward(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_TWO) || zj.Game.PlayerMissionSystem.NoviceCanRewardEnd(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_TWO));
            return cond;
        };
        Tips.tips_64_1 = function () {
            var cond = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_MAQI].leftTime > 0
                && (zj.Game.PlayerMissionSystem.NoviceCanReward(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_MAQI) || zj.Game.PlayerMissionSystem.NoviceCanRewardEnd(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_MAQI));
            return cond;
        };
        Tips.tips_65_1 = function () {
            var cond = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_KUBI].leftTime > 0
                && (zj.Game.PlayerMissionSystem.NoviceCanReward(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_KUBI) || zj.Game.PlayerMissionSystem.NoviceCanRewardEnd(zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_KUBI));
            return cond;
        };
        Tips.tips_66_1 = function () {
            if (zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex == 0 || !zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.MISSIONWEEK, false) || zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_WEEK].leftTime != 0) {
                return false;
            }
            var leftTime = zj.Game.PlayerMissionSystem.missionActive.missionWeekStart + zj.Game.PlayerMissionSystem.itemMissionWeek(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex).duration * 3600 * 24 - zj.Game.Controller.curServerTime;
            if (leftTime > 0) {
                var free = zj.Game.PlayerMissionSystem.getWeekAwardPay(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex, 1);
                return zj.Game.PlayerMissionSystem.WeekMissionCanReward(zj.Game.PlayerMissionSystem.itemMissionWeek(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex).mission_types) || free[0].buyTimes < free[0].canBuyTimes;
            }
            return false;
        };
        Tips.tips_60_1 = function () {
            var bGetCur = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, function (k, v) {
                return v == zj.Game.PlayerInfoSystem.BaseInfo.vipLevel;
            });
            var have = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal.length - 1 < zj.Game.PlayerInfoSystem.BaseInfo.vipLevel;
            var cond = have; //(Player.lowVipLevel  and Tips.tips_LowVip_get(Player.lowVipLevelNum) and not bGetCur) or
            return cond;
        };
        Tips.tips_67_1 = function () {
            var maxTimes = zj.CommonConfig.activity_instance_battle_time + zj.Game.PlayerVIPSystem.vipInfo.buy_activity_time * zj.CommonConfig.activity_instance_buy_battle_time_add;
            var restTimes = maxTimes - zj.Game.PlayerVIPSystem.vipInfo.activity_time;
            if (zj.otherdb.getActivityBattle().length != 0 && restTimes > 0) {
                return true;
            }
            else {
                return false;
            }
        };
        Tips.tips_67_2 = function () {
            var transformTab = zj.TableGeneralTransfer.Table();
            for (var kk in zj.Game.PlayerHunterSystem.allHuntersMap()) {
                var vv = zj.Game.PlayerHunterSystem.allHuntersMap()[kk];
                if (vv == null) {
                    console.log("未找到");
                    continue;
                }
                var baseGeneralInfo = zj.PlayerHunterSystem.Table(vv.general_id);
                if (vv.general_id && transformTab[baseGeneralInfo.general_id] && vv.level >= transformTab[baseGeneralInfo.general_id].general_level && transformTab[baseGeneralInfo.general_id].general_add != 0 && vv.transfer_level < 1 && vv.star >= transformTab[baseGeneralInfo.general_id].general_star) {
                    var isEnough1 = false;
                    var isEnough2 = false;
                    for (var i = 0; i < 2; i++) {
                        var itemSetCount = zj.PlayerItemSystem.Count(transformTab[baseGeneralInfo.general_id].consume_goods[i][0]);
                        var needCount = transformTab[baseGeneralInfo.general_id].consume_goods[i][1];
                        if (itemSetCount >= needCount) {
                            if (i == 0) {
                                isEnough1 = true;
                            }
                            else {
                                isEnough2 = true;
                            }
                        }
                    }
                    if (isEnough1 && isEnough2) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**
         * @description 通行证
         */
        Tips.tips_68_1 = function () {
            var season = Math.floor((zj.Set.TimeFormatBeijing().getMonth()) + 1);
            var tblInfo = zj.TablePermitReward.Table();
            var rewardList = [];
            zj.Table.Sort(tblInfo, function (a, b) { return a.level < b.level; });
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tblInfo); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.season == season && v.level <= zj.Game.PlayerInfoSystem.BaseInfo.level)
                    rewardList.push(v);
            }
            var cond = false;
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && rewardList.length == zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length && rewardList.length == zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length) {
                cond = false;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && rewardList.length == zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) {
                cond = false;
            }
            else {
                cond = true;
            }
        };
        Tips.tips_68_2 = function () {
            var tbl = zj.TablePermitMission.Table();
            var isGet = false;
            var cond = false;
            var _loop_4 = function (kk, vv) {
                isGet = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permitMissionReward, function (k, v) {
                    return v == kk;
                });
                if (vv.type == message.PermitMissionType.PERMIT_MISSION_TYPE_LOGIN && !isGet
                    || vv.type == message.PermitMissionType.PERMIT_MISSION_TYPE_PAY && !isGet && zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1
                    || vv.type == message.PermitMissionType.PERMIT_MISSION_TYPE_ACTIVE && !isGet && zj.Game.PlayerMissionSystem.missionActive.activeScore >= vv.value) {
                    cond = true;
                    return "break";
                }
                else {
                    cond = false;
                }
            };
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                var state_3 = _loop_4(kk, vv);
                if (state_3 === "break")
                    break;
            }
            return cond;
        };
        Tips.TIP_FORMART_SAVE = "_save_";
        Tips.TIP_FORMART_TIME = "_time_";
        Tips.TIP_FORMART_ACT = "_act_";
        // 主城红点Tag
        Tips.TAG = {
            // 主城上的tag
            LEAGUE: 1,
            LADDER: 2,
            MINE: 3,
            WONDERLAND: 4,
            TOWER: 5,
            BASTILLE: 6,
            WANTED: 7,
            TAVERN: 8,
            MALL: 9,
            JADE: 11,
            // 副本界面的tag
            TEACH: 10,
            // 界面上的tag
            MIN: 20,
            INSTANCE: 20,
            TREAUSER: 21,
            DAILY: 22,
            AWARD: 23,
            CHANGE: 24,
            ACTIVITY: 25,
            NOTHING1: 26,
            GENERAL: 27,
            ADVISER: 28,
            FRIEND: 29,
            RANK: 30,
            PACKAGE: 31,
            TASK: 32,
            MAIL: 33,
            TRAIN: 34,
            FIRST: 35,
            SEVEN: 36,
            NOVICE: 37,
            CHAT: 38,
            EQUIP: 39,
            NOTHING2: 40,
            ARTIFACT: 41,
            MORE: 42,
            FEEDBACK: 43,
            CONTEND: 44,
            ZORK: 45,
            RECOVERY: 46,
            POTATO: 47,
            CHARGE: 48,
            LICENSE: 49,
            NEWGIFT: 50,
            EGG: 51,
            SPECIAL: 52,
            Pokedex: 53,
            RACE: 54,
            VIPX: 55,
            Jewel: 56,
            WebPay: 57,
            Biography: 58,
            XUYUAN: 59,
            NEWLOWGift: 60,
            NOVICE1: 61,
            DarkLand: 62,
            NOVICE2: 63,
            NOVICEMAQI: 64,
            NOVICEKUBI: 65,
            WEEKMISSION: 66,
            ActivityBattle: 67,
            PassBattle: 68,
            MAX: 69,
            // 公会
            LEAGUE_DONATE: 1,
            LEAGUE_MALL: 2,
            LEAGUE_APPLY: 3,
            LEAGUE_INSTANCE: 4,
            LEAGUE_CELEBRATE: 5,
            LEAGUE_DEFENCE_FORMATE: 6,
            LEAGUE_ENTRANCE: 7,
            MATCH_MALL: 8,
            LEAGUE_SIGNIN: 9,
            // 演武堂
            LADDER_MAIL: 1,
            LADDER_MALL: 2,
            LADDER_FIGHT: 3,
            CONTEND_AWARD: 4,
            CONTEND_COUNT: 5,
            PK_MALL: 6,
            CHARGE_CHALLENGE: 7,
            CONTEND_MALL: 1,
            // 如意商铺
            TREAUSER_KEY: 1,
            TREAUSER_MALL: 2,
            // 魔域商铺
            ZORK_MALL: 1,
            ZORK_Boss: 2,
            ZORK_Runes: 3,
            ZORK_Convert: 4,
            // 日常
            DAILY_GIFT: 1,
            DAILY_ACTIVE: 2,
            DAILY_ACHIEVE: 3,
            // DAILY_TASK : 4,
            FIGHT: 1,
            RUNES: 2,
            FISH: 3,
            EXCHANGE: 4,
            COLLECT: 5,
            DOUBLE: 6,
            ZORK_BOSS: 7,
            GROUPFIGHT: 8,
            FASHION: 9,
            PORT: 10,
            AWARD_SIGN: 1,
            AWARD_POWER: 2,
            AWARD_GIFT: 3,
            AWARD_MONTH: 4,
            AWARD_FUND: 5,
            AWARD_MONTHNEW: 6,
            SEVEN_Reward: 1,
            SEVEN_Gift: 2,
            VipX_Right: 1,
            VipXGift: 2,
            VipX_WebPay: 3,
            INST_GIFT: 1,
            INST_SEARCH: 2,
            MALL_MALL: 1,
            MALL_SECRET: 2,
            MALL_OTHER: 3,
            RELIC_MALL: 1,
            RELIC_INSTANCE: 2,
            GROUPDARKFIGHT: 3,
            TOWER_FLOOR: 1,
            BASTILLE_NUM: 1,
            WANTED_1: 1,
            WANTED_2: 2,
            WANTED_3: 3,
            TAVERN_FREE: 1,
            JADE_DIVIDE: 1,
            JADE_COMPOSE: 2,
            ADE_CONVERT: 3,
            GENERAL_NEW: 1,
            GENERAL_GRADE: 2,
            GENERAL_GRADE_STEP: 3,
            GENERAL_SKILL: 4,
            GENERAL_Card: 5,
            GENERAL_UPSTAR: 6,
            GENERAL_AWAKEN: 7,
            GENERAL_PSYCHIC: 8,
            GENERAL_EQUIP: 9,
            GENERAL_UPLEVEL: 10,
            EQUIP_TIPS: 1,
            ADVISER_GET: 1,
            ADVISER_UP: 2,
            ADVISER_AWARD: 3,
            PET_GET: 4,
            PET_UPSTAR: 5,
            PET_STEP: 6,
            FIRST_UNCHARGE: 1,
            FIRST_UNREWARD: 2,
            CHAT_ALLY: 1,
            CHARGE_OPEN: 1,
            CHARGE_GETREWARD: 2,
            LICENSE_REWARD: 1,
            NEWGIFT_FIRST: 1,
            NEWGIFT_OP: 2,
            NEWGIFT_GIFT: 3,
            NEWGIFT_CHARGE: 4,
            EGG_FIRST: 1,
            EGG_AWARD: 2,
            EGG_COIN: 3,
            SPECIAL_SIGN: 1,
            SPECIAL_GATAWARD: 2,
            SPECIAL_UpStar: 3,
            SPECIAL_WORLD: 4,
            SPECIAL_WORDERLAND: 5,
            SPECIAL_SKY: 6,
            SPECIAL_WANTED: 7,
            SPECIAL_BIND_PHONE: 8,
            SPECIAL_SHARE: 9,
            SPECIAL_GETPOWER: 10,
            RACEDAY: 1,
            RACEBOX: 2,
            Jewel_Mission: 1,
            Jewel_Mall: 2,
            XUYUAN_FIRST: 1,
            XUYUAN_AWARD: 2,
            ActivityBattle_ACTIVITY: 1,
            ActivityBattle_TRANSFORM: 2,
            PASS_AWARD: 1,
            PASS_MISSION: 2,
        };
        // 进程更新时检测的红点Tag
        Tips.PROGRESS = (_a = {},
            // 商铺
            _a[1] = message.EProcessType.PROCESS_TYPE_MALL_NORMAL,
            _a[2] = message.EProcessType.PROCESS_TYPE_MALL_LEAGUE,
            _a[3] = message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE,
            _a[4] = message.EProcessType.PROCESS_TYPE_MALL_LADDER,
            _a[5] = message.EProcessType.PROCESS_TYPE_MALL_LOTTERY,
            // [6]: message.EProcessType.PROCESS_TYPE_MALL_DARKLAND,
            _a[7] = message.EProcessType.PROCESS_TYPE_MALL_RELIC,
            _a[8] = message.EProcessType.PROCESS_TYPE_MALL_HONOR,
            // 体力
            _a[9] = message.EProcessType.PROCESS_TYPE_OPEN_POWER,
            _a[10] = message.EProcessType.PROCESS_TYPE_REWARD_POWER,
            // 玉石
            _a[11] = message.EProcessType.PROCESS_TYPE_GAMBLE_NORMAL,
            _a[12] = message.EProcessType.PROCESS_TYPE_GAMBLE_SENIOR,
            // 酒馆
            // [13]: message.EProcessType.PROCESS_TYPE_NORMAL_LOTTERY,
            // 钓鱼
            _a[14] = message.EProcessType.PROCESS_TYPE_LEAGUE_FISHING,
            // 宴会
            _a[15] = message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY,
            // 魔域boss
            _a[16] = message.EProcessType.PROCESS_TYPE_SCENE_BOSS,
            _a[17] = message.EProcessType.PROCESS_TYPE_INSTANCE_POWER,
            _a);
        // 保存的一次性红点Tag
        Tips.SAVE = {
            SERECT_MALL: 1,
            SERECT_TIPS: 2,
            NORMAL_MALL: 3,
            LEAGUE_MALL: 4,
            WORSHIP_MALL: 5,
            ARENA_MALL: 6,
            MINE_DEFIND: 7,
            ACTIVITY_ALL: 8,
            LEAGUE_WAR_ENROL: 9,
            LEAGUE_WAR_MATCHING: 10,
            LEAGUE_WAR_ENROL_BEFORE: 11,
            AWARD_FUND: 12,
            ACTIVITY_BACK: 13,
            LEAGUE_WAR_TIPS: 14,
            LEAGUE_WAR_TIPS_CITY: 15,
            LEAGUE_WAR_ENROLL_TIPS: 16,
            WONDERLAND_BOSS_TIPS: 17,
            WANTED_CAVE: 18,
            WANTED_GOBI: 19,
            WANTED_NEVE: 20,
            SINGLE: 21,
            LOTTERY: 22,
            GIFT_BAG_ACTIVITY: 23,
            DOUBLE_TOKEN_ACTIVITY: 24,
            SPECIAL_WORLD: 25,
            SPECIAL_WORDERLAND: 26,
            SPECIAL_SKY: 27,
            SPECIAL_WANTED: 28,
            MAIL_PK: 29,
            PUSH_FIRST: 30,
            PUSH_SELF_SELECTION: 31,
            SPECIAL_BIND_PHONE: 32,
            TAVERN_ACTIVITY: 33,
            MATCH_MALL: 34,
            LEAGUE_CHAT: 35,
            PORTFIRST: 36,
            RELIC_MALL: 37,
            SPECIAL_SHARE: 38,
        };
        Tips.HUNTERTAG = {
            GENERAL_NEW: 0,
            GENERAL_GRADE: 1,
            GENERAL_GRADE_STEP: 2,
            GENERAL_SKILL: 3,
            GENERAL_Card: 4,
            GENERAL_UPSTAR: 5,
            GENERAL_AWAKEN: 6,
            GENERAL_PSYCHIC: 7,
            GENERAL_EQUIP: 8,
            GENERAL_UPLEVEL: 9
        };
        Tips.FUNC = (_b = {},
            _b[Tips.TAG.LEAGUE] = (_c = {},
                _c[1] = Tips.Tips_1_1,
                _c[2] = Tips.Tips_1_2,
                _c[3] = Tips.Tips_1_3,
                _c[4] = Tips.Tips_1_4,
                _c[5] = Tips.Tips_1_5,
                _c[6] = Tips.Tips_1_6,
                _c[7] = Tips.Tips_1_7,
                _c[8] = Tips.Tips_1_8,
                _c[9] = Tips.Tips_1_9,
                _c),
            _b[Tips.TAG.LADDER] = (_d = {},
                _d[1] = Tips.tips_2_1,
                _d[2] = Tips.tips_2_2,
                _d[3] = Tips.tips_2_3,
                _d[4] = Tips.tips_2_4,
                _d[5] = Tips.tips_2_5,
                _d[6] = Tips.tips_2_6,
                _d[7] = Tips.tips_2_7,
                _d),
            _b[Tips.TAG.MINE] = (_e = {},
                _e[1] = Tips.tips_3_1,
                _e[2] = Tips.tips_3_2,
                _e[3] = Tips.tips_3_3,
                _e[4] = Tips.tips_3_4,
                _e),
            _b[Tips.TAG.WONDERLAND] = (_f = {},
                _f[1] = Tips.tips_4_1,
                _f[2] = Tips.tips_4_2,
                _f[3] = Tips.tips_4_3,
                _f[4] = Tips.tips_4_4,
                _f[5] = Tips.tips_4_5,
                _f[6] = Tips.tips_4_6,
                _f[7] = Tips.tips_4_7,
                _f[8] = Tips.tips_4_8,
                _f[9] = Tips.tips_4_9,
                _f[10] = Tips.tips_4_10,
                _f),
            _b[Tips.TAG.TOWER] = (_g = {},
                _g[1] = Tips.tips_5_1,
                _g),
            _b[Tips.TAG.BASTILLE] = (_h = {},
                _h[1] = Tips.tips_6_1,
                _h),
            _b[Tips.TAG.WANTED] = (_j = {},
                _j[1] = Tips.tips_7_1,
                _j[2] = Tips.tips_7_2,
                _j[3] = Tips.tips_7_3,
                _j),
            _b[Tips.TAG.TAVERN] = (_l = {},
                _l[1] = Tips.tips_8_1,
                _l),
            _b[Tips.TAG.MALL] = (_m = {},
                _m[1] = Tips.tips_9_1,
                _m[2] = Tips.tips_9_2,
                _m[3] = Tips.tips_9_3,
                _m),
            _b[Tips.TAG.TEACH] = (_o = {},
                _o[1] = Tips.tips_10_1,
                _o),
            _b[Tips.TAG.JADE] = (_p = {},
                _p[1] = Tips.tips_11_1,
                _p[2] = Tips.tips_11_2,
                _p[3] = Tips.tips_11_3,
                _p),
            _b[Tips.TAG.INSTANCE] = (_q = {},
                _q[1] = Tips.tips_20_1,
                _q[2] = Tips.tips_20_2,
                _q),
            _b[Tips.TAG.TREAUSER] = (_r = {},
                _r[1] = Tips.tips_21_1,
                _r[2] = Tips.tips_21_2,
                _r),
            _b[Tips.TAG.DAILY] = (_s = {},
                _s[1] = Tips.tips_22_1,
                _s[2] = Tips.tips_22_2,
                _s[3] = Tips.tips_22_3,
                _s),
            _b[Tips.TAG.AWARD] = (_t = {},
                _t[1] = Tips.tips_23_1,
                _t[2] = Tips.tips_23_2,
                _t[3] = Tips.tips_23_3,
                _t[4] = Tips.tips_23_4,
                _t[5] = Tips.tips_23_5,
                _t[6] = Tips.tips_23_6,
                _t),
            _b[Tips.TAG.CHANGE] = (_u = {},
                _u[1] = Tips.tips_24_1,
                _u),
            _b[Tips.TAG.ACTIVITY] = (_w = {},
                _w[1] = Tips.tips_25_1,
                _w[2] = Tips.tips_25_2,
                _w[3] = Tips.tips_25_3,
                _w),
            _b[Tips.TAG.GENERAL] = (_x = {},
                _x[1] = Tips.tips_27_1,
                _x),
            _b[Tips.TAG.ADVISER] = (_y = {},
                _y[1] = Tips.tips_28_1,
                _y[2] = Tips.tips_28_2,
                _y[3] = Tips.tips_28_3,
                _y[4] = Tips.tips_28_4,
                _y[5] = Tips.tips_28_5,
                _y[6] = Tips.tips_28_6,
                _y),
            _b[Tips.TAG.FRIEND] = (_z = {},
                _z[1] = Tips.tips_29_1,
                _z[2] = Tips.tips_29_2,
                _z),
            _b[Tips.TAG.RANK] = (_0 = {},
                _0[1] = Tips.tips_30_1,
                _0),
            _b[Tips.TAG.PACKAGE] = (_2 = {},
                _2[1] = Tips.tips_31_1,
                _2),
            _b[Tips.TAG.MAIL] = (_3 = {},
                _3[1] = Tips.tips_33_1,
                _3),
            _b[Tips.TAG.TRAIN] = (_4 = {},
                _4[1] = Tips.tips_34_1,
                _4),
            _b[Tips.TAG.FIRST] = (_5 = {},
                _5[1] = Tips.tips_35_1,
                _5[2] = Tips.tips_35_2,
                _5),
            _b[Tips.TAG.SEVEN] = (_6 = {},
                _6[1] = Tips.tips_36_1,
                _6[2] = Tips.tips_36_2,
                _6),
            _b[Tips.TAG.NOVICE] = (_7 = {},
                _7[1] = Tips.tips_37_1,
                _7),
            _b[Tips.TAG.CHAT] = (_8 = {},
                _8[1] = Tips.tips_38_1,
                _8),
            _b[Tips.TAG.EQUIP] = (_9 = {},
                _9[1] = Tips.tips_39_1,
                _9),
            _b[Tips.TAG.MORE] = (_10 = {},
                _10[1] = Tips.tips_42_1,
                _10),
            _b[Tips.TAG.FEEDBACK] = (_11 = {},
                _11[1] = Tips.tips_43_1,
                _11),
            _b[Tips.TAG.CONTEND] = (_12 = {},
                _12[1] = Tips.tips_44_1,
                _12),
            _b[Tips.TAG.ZORK] = (_13 = {},
                _13[1] = Tips.tips_45_1,
                _13[2] = Tips.tips_45_2,
                _13[3] = Tips.tips_45_3,
                _13[4] = Tips.tips_45_4,
                _13),
            _b[Tips.TAG.RECOVERY] = (_14 = {},
                _14[1] = Tips.tips_46_1,
                _14),
            _b[Tips.TAG.POTATO] = (_15 = {},
                _15[1] = Tips.tips_47_1,
                _15[2] = Tips.tips_47_2,
                _15[3] = Tips.tips_47_3,
                _15),
            _b[Tips.TAG.CHARGE] = (_16 = {},
                _16[1] = Tips.tips_48_1,
                _16[2] = Tips.tips_48_2,
                _16),
            _b[Tips.TAG.LICENSE] = (_17 = {},
                _17[1] = Tips.tips_49_1,
                _17),
            _b[Tips.TAG.NEWGIFT] = (_18 = {},
                _18[1] = Tips.tips_50_1,
                _18[2] = Tips.tips_50_2,
                _18[3] = Tips.tips_50_3,
                _18[4] = Tips.tips_50_4,
                _18),
            _b[Tips.TAG.EGG] = (_19 = {},
                _19[1] = Tips.tips_51_1,
                _19[2] = Tips.tips_51_2,
                _19[3] = Tips.tips_51_3,
                _19),
            _b[Tips.TAG.SPECIAL] = (_20 = {},
                _20[1] = Tips.tips_52_1,
                _20[2] = Tips.tips_52_2,
                _20[3] = Tips.tips_52_3,
                _20[4] = Tips.tips_52_4,
                _20[5] = Tips.tips_52_5,
                _20[6] = Tips.tips_52_6,
                _20[7] = Tips.tips_52_7,
                _20[8] = Tips.tips_52_8,
                _20[9] = Tips.tips_52_9,
                _20[10] = Tips.tips_52_10,
                _20),
            _b[Tips.TAG.Pokedex] = (_21 = {},
                _21[1] = Tips.tips_53_1,
                _21),
            _b[Tips.TAG.RACE] = (_22 = {},
                _22[1] = Tips.tips_54_1,
                _22[2] = Tips.tips_54_2,
                _22),
            _b[Tips.TAG.VIPX] = (_23 = {},
                _23[1] = Tips.tips_55_1,
                _23[2] = Tips.tips_55_2,
                _23[3] = Tips.tips_55_3,
                _23),
            _b[Tips.TAG.Jewel] = (_24 = {},
                _24[1] = Tips.tips_56_1,
                _24[2] = Tips.tips_56_2,
                _24),
            _b[Tips.TAG.Biography] = (_25 = {},
                _25[1] = Tips.tips_58_1,
                _25),
            _b[Tips.TAG.XUYUAN] = (_26 = {},
                _26[1] = Tips.tips_59_1,
                _26[2] = Tips.tips_59_2,
                _26),
            _b[Tips.TAG.NOVICE1] = (_27 = {},
                _27[1] = Tips.tips_61_1,
                _27),
            _b[Tips.TAG.DarkLand] = (_28 = {},
                _28[1] = Tips.tips_62_1,
                _28[2] = Tips.tips_62_2,
                _28[3] = Tips.tips_62_3,
                _28),
            _b[Tips.TAG.NOVICE2] = (_29 = {},
                _29[1] = Tips.tips_63_1,
                _29),
            _b[Tips.TAG.NOVICEMAQI] = (_30 = {},
                _30[1] = Tips.tips_64_1,
                _30),
            _b[Tips.TAG.NOVICEKUBI] = (_31 = {},
                _31[1] = Tips.tips_65_1,
                _31),
            _b[Tips.TAG.WEEKMISSION] = (_32 = {},
                _32[1] = Tips.tips_66_1,
                _32),
            _b[Tips.TAG.NEWLOWGift] = (_33 = {},
                _33[1] = function () {
                    var bGetCur = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, function (k, v) {
                        return v == zj.Game.PlayerInfoSystem.BaseInfo.vipLevel;
                    });
                    var have = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal.length - 1 < zj.Game.PlayerInfoSystem.BaseInfo.vipLevel;
                    var cond = have; //(Player.lowVipLevel  and Tips.tips_LowVip_get(Player.lowVipLevelNum) and not bGetCur) or
                    return cond;
                } // Tips.tips_63_1,   //1 有新的礼包了已领取
            ,
                _33),
            _b[Tips.TAG.ActivityBattle] = (_34 = {},
                _34[1] = Tips.tips_67_1,
                _34[2] = Tips.tips_67_2,
                _34),
            _b[Tips.TAG.PassBattle] = (_35 = {},
                _35[1] = Tips.tips_68_1,
                _35[2] = Tips.tips_68_2,
                _35),
            _b);
        Tips.Battle = 0;
        Tips.Value = {};
        Tips.Hero = {};
        Tips.Activity = {};
        Tips.ArenaValue = {};
        return Tips;
    }());
    zj.Tips = Tips;
    __reflect(Tips.prototype, "zj.Tips");
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _l, _m, _o, _p, _q, _r, _s, _t, _u, _w, _x, _y, _z, _0, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35;
})(zj || (zj = {}));
//# sourceMappingURL=Tips.js.map