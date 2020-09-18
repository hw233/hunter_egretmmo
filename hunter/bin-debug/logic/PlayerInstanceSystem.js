var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * 副本系统
     * created by Lian Lei
     * 2018.12.26
     */
    var PlayerInstanceSystem = (function () {
        function PlayerInstanceSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 私有变量
            this.instanceInfo = new message.InstanceInfo(); // 副本基本数据
            /**副本信息 */
            this._curInstances = {};
            this.RandInfo = null;
            /**探索上阵信息 */
            this.searchFormation = {};
            // /**探索阵容 */
            // private searchTeam: {[areaId: number]: Array<Object>} = {};
            // /**
            //  * 存放探索设置阵容
            //  * @param areaId 当前副本ID
            //  * @param index 列表中第几项
            //  * @param value 上阵信息 {第几项: 武将ID}
            //  */
            // public setSearchTeam(areaId:number, index: number, value:Object){
            // 	this.searchTeam[areaId][index] = value;
            // }
            // /**
            //  * 读取探索设置阵容
            //  * @param areaId 当前副本ID
            //  * @param index 列表中第几项
            //  */
            // public getSearchTeam(areaId: number, index: number){
            // 	let v = this.searchTeam[areaId];
            // 	return v ? v[index] :null;
            // }
            this.curServerTime = 0;
            this.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
            this._mobInfos = [];
            this.canSyncLevel = true;
            this.preInstanceInfo = {};
            this.isJumpToInstance = false; // 是否为跳转到副本界面
            this._activityBattleIndex = -1; // 活动副本当前索引
            this.activityBattleCachInfo = {};
            this.instances = ["", "NORMAL", "ELITE", "MONEY", "EXP"];
        }
        Object.defineProperty(PlayerInstanceSystem.prototype, "InstanceInfo", {
            /**副本其他信息 */
            get: function () {
                return this.instanceInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Instance_money", {
            /**游戏币副本次数 */
            get: function () {
                return this.instanceInfo.instance_money;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Instance_money_time", {
            /**游戏币副本cd剩余时间 */
            get: function () {
                return this.instanceInfo.instance_money_time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Instance_exp", {
            /**经验副本次数 */
            get: function () {
                return this.instanceInfo.instance_exp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Instance_exp_Time", {
            /**经验副本cd剩余时间 */
            get: function () {
                return this.instanceInfo.instance_exp_time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Instance_money_max", {
            /**游戏币副本最高伤害 */
            get: function () {
                return this.instanceInfo.instance_money_max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Instance_exp_max", {
            /**经验副本最高连击 */
            get: function () {
                return this.instanceInfo.instance_exp_max;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Instance_money_last", {
            /**游戏币副本上次伤害 */
            get: function () {
                return this.instanceInfo.instance_money_last;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Instance_exp_last", {
            /**经验副本上次连击 */
            get: function () {
                return this.instanceInfo.instance_exp_last;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "NormalReward", {
            /**普通副本领取状态 */
            get: function () {
                return this.instanceInfo.normalReward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "EliteReward", {
            /**精英副本领取状态 */
            get: function () {
                return this.instanceInfo.eliteReward;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Training", {
            /**特训关卡信息 */
            get: function () {
                return this.instanceInfo.training;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "SearchInfo", {
            /**探索副本信息 */
            get: function () {
                return this.instanceInfo.searchInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "LastTowerRefreshTime", {
            /**上次爬塔刷新时间 */
            get: function () {
                return this.instanceInfo.lastTowerRefreshTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "MonsterTowerIndex", {
            /**本周爬塔怪物索引 */
            get: function () {
                return this.instanceInfo.monsterTowerIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "Is_JumpTower", {
            /**是否跳层 */
            get: function () {
                return null; // this.instanceInfo.is_jumpTower;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "SearchTimes", {
            /**探索副本次数 */
            get: function () {
                return null; // this.instanceInfo.searchTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "High_lastTowerRefreshTIme", {
            /**上次高级塔塔怪刷新时间 */
            get: function () {
                return null; // this.instanceInfo.high_lastTowerRefreshTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "High_monsterTowerIndex", {
            /**本周高级塔塔怪物索引 */
            get: function () {
                return null; // this.instanceInfo.high_monsterTowerIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "High_is_jumpTower", {
            /**高级塔是否跳层 */
            get: function () {
                return null; // this.instanceInfo.high_is_jumpTower;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "RelicInfo", {
            /**遗迹副本信息 */
            get: function () {
                return this.instanceInfo.relicInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "RelicChest", {
            /**获得宝箱(k.id;v.times) */
            get: function () {
                return this.instanceInfo.relicChest;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "RelicBattleTimes", {
            /**遗迹挑战次数(k.id;v.times) */
            get: function () {
                return this.instanceInfo.relicBattleTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "curInstances", {
            get: function () {
                return this._curInstances;
            },
            /***
             * 索引从1开始 normal也是1
             */
            set: function (v) {
                this._curInstances = v;
            },
            enumerable: true,
            configurable: true
        });
        PlayerInstanceSystem.prototype.checkCurInstances = function (type) {
            var curInstances = this.curInstances[type];
            var instance = zj.TableInstance.Item(curInstances.curMobID);
            if (!instance) {
                curInstances.curMobID = curInstances.maxMobID;
            }
        };
        /**
         * 获取当前达到的最高等级的小岛（判断角色等级限制）
         */
        PlayerInstanceSystem.prototype.getmaxAreaID = function (type) {
            var maxAreaId = Math.min(this.curInstances[type].maxAreaID, zj.SceneManager.adventureOpenMax);
            if (maxAreaId == 0) {
                maxAreaId = 1;
            }
            if (maxAreaId > 0) {
                var table = zj.TableInstanceArea.Item(maxAreaId);
                if (table) {
                    var level = zj.Game.PlayerInfoSystem.Level;
                    if (level < table.open_level) {
                        for (var i = maxAreaId - 1; i >= 1; --i) {
                            table = zj.TableInstanceArea.Item(i);
                            if (level >= table.open_level) {
                                return i;
                            }
                        }
                    }
                }
            }
            return maxAreaId;
        };
        PlayerInstanceSystem.prototype.getSearchFormation = function (key) {
            return this.searchFormation[key];
        };
        PlayerInstanceSystem.prototype.setSearchFormation = function (key, value) {
            this.searchFormation[key] = value;
        };
        Object.defineProperty(PlayerInstanceSystem.prototype, "mobInfos", {
            get: function () {
                return this._mobInfos;
            },
            set: function (v) {
                this._mobInfos = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInstanceSystem.prototype, "activityBattleIndex", {
            get: function () {
                return this._activityBattleIndex;
            },
            set: function (v) {
                this._activityBattleIndex = v;
            },
            enumerable: true,
            configurable: true
        });
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerInstanceSystem.prototype.init = function () {
            this.InitInstanceInfo();
            this.initLastInstance();
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_BASE_INFO_CHANGE, this.onBaseInfoChange, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_MOB_INFO_CHANGE, this.onMobInfoChange, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_INSTANCE_INFO_CHANGE, this.onInstanceInfoChange, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LEVEL_UP, this.onLevelUp, this);
        };
        PlayerInstanceSystem.prototype.uninit = function () {
            this.instanceInfo = new message.InstanceInfo();
            ;
            this.searchFormation = {};
            this.curServerTime = 0;
            this.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
            this._mobInfos = [];
            this.canSyncLevel = true;
            this.preInstanceInfo = {};
            this.isJumpToInstance = false;
        };
        PlayerInstanceSystem.prototype.onBaseInfoChange = function (ev) {
            this.freshData();
        };
        PlayerInstanceSystem.prototype.onMobInfoChange = function (ev) {
            var changeMobInfos = ev.data;
            if (this.mobInfos.length < 1) {
                this.mobInfos = changeMobInfos;
            }
            else {
                for (var i = 0; i < changeMobInfos.length; i++) {
                    var changeMobInfo = changeMobInfos[i];
                    var push = true;
                    for (var j = 0; j < this.mobInfos.length; j++) {
                        var mobInfo = this.mobInfos[j];
                        if (changeMobInfo.mobId == mobInfo.mobId) {
                            this.mobInfos[j] = changeMobInfo;
                            push = false;
                        }
                    }
                    if (push)
                        this.mobInfos.push(changeMobInfo);
                }
            }
            this.freshData();
        };
        PlayerInstanceSystem.prototype.onInstanceInfoChange = function (ev) {
            this.InitInstanceInfo();
            this.instanceInfo = ev.data;
            if (this.instanceInfo.activityRandMobs && this.instanceInfo.activityRandMobs.length != 0) {
                if (this.instanceInfo.activityRandMobs != this.RandInfo) {
                    this.RandInfo = this.instanceInfo.activityRandMobs;
                    PlayerInstanceSystem.RandInfoVis = true;
                }
            }
            this.freshData();
        };
        PlayerInstanceSystem.prototype.onLevelUp = function (e) {
            this.freshData();
        };
        PlayerInstanceSystem.prototype.InitInstanceInfo = function () {
            this._curInstances = {};
            for (var _i = 0, _a = zj.HelpUtil.GetKV(message.EFormationType); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                var instancce = new CustomInstanceInfo;
                instancce.instanceType = Number(k);
                this._curInstances[instancce.instanceType] = instancce;
            }
        };
        /**
        * 刷新副本数据，升级的时候没有怪信息传递，所以ExecutePro里面不会刷新副本信息
        * 而普通副本是通过等级来限制的，所以在升级的时候需要主动刷新一下
        */
        PlayerInstanceSystem.prototype.freshData = function () {
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.mobInfos); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                var suffix = Math.floor(v.mobId / 100000);
                var instances = ["NORMAL", "ELITE", "MONEY", "EXP"];
                this.curInstances[suffix].mobsMap[v.mobId] = v;
                if (v.mobId > this.curInstances[suffix].maxMobID) {
                    this.curInstances[suffix].maxMobID = v.mobId;
                }
            }
            this.binaryQuery(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL);
            this.binaryQuery(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE);
            this.getMaxAreaNORMAL();
            this.getMaxAreaELITE();
        };
        PlayerInstanceSystem.prototype.tableLength = function (table) {
            var len = 0;
            for (var k in table) {
                len++;
            }
            return len;
        };
        /**
         * 得到怪物最大id
         */
        PlayerInstanceSystem.prototype.getMaxMobID = function (eType) {
            var tableInstance = zj.TableInstance.Table();
            var ret = 0;
            for (var k in tableInstance) {
                var v = tableInstance[k];
                var kk = parseInt(k);
                if (kk < (eType + 1) * 100000 && kk > eType * 100000 && ret < kk) {
                    ret = kk;
                }
            }
            return ret;
        };
        PlayerInstanceSystem.prototype.getMaxAvailableMobID = function (eType) {
            var ret = this.curInstances[eType].maxMobID;
            while (zj.Game.PlayerInstanceSystem.InstanceFun(ret - 1) != null && zj.Game.PlayerInstanceSystem.CheckAvailable(ret) == false) {
                ret = ret - 1;
            }
            return ret;
        };
        /**
         * 用来设置 maxChapterID
         */
        PlayerInstanceSystem.prototype.binaryQuery = function (eType) {
            var suffix = this.instances[eType];
            var tableName = zj.StringConfig_Table["chapter" + suffix];
            var tableChapter = zj.Game.ConfigManager.getTable(tableName + ".json");
            //CSV:GetTable(tableName);
            if (this.curInstances[eType].maxMobID > this.getMaxMobID(eType)) {
                this.curInstances[eType].bClear = true;
                this.curInstances[eType].maxChapterID = zj.Game.PlayerInstanceSystem.getLength(tableChapter);
                //为什么 maxChapterID 不设置呢????
            }
            else {
                this.curInstances[eType].bClear = false;
                var low = 1;
                var mid = 1;
                var high = this.getLength(tableChapter);
                while (low <= high) {
                    mid = Math.floor((low + high) / 2);
                    // let cpl = tableChapter[mid].chapter_pack["length"] - 1;
                    if (tableChapter[mid].chapter_pack[this.tableLength(tableChapter[mid].chapter_pack) - 1] < this.getMaxAvailableMobID(eType)) {
                        low = mid + 1;
                    }
                    else if (tableChapter[mid].chapter_pack[0] > this.getMaxAvailableMobID(eType)) {
                        high = mid - 1;
                    }
                    else {
                        this.curInstances[eType].maxChapterID = mid;
                        break;
                    }
                }
            }
        };
        PlayerInstanceSystem.prototype.getLength = function (obj) {
            var i = 0;
            for (var k in obj) {
                i++;
            }
            return i;
        };
        PlayerInstanceSystem.prototype.initLastInstance = function () {
            this.areaLastInstance = {};
            this.areaLastElite = {};
            var areas = zj.TableInstanceArea.Table();
            for (var key in areas) {
                var area = areas[key];
                var chapter = zj.TableChapterNormal.Item(area.area_normal[0]);
                var instanceId = chapter.chapter_pack[chapter.chapter_pack.length - 1];
                this.areaLastInstance[key] = instanceId;
                var elite = zj.TableChapterElite.Item(area.area_elite[0]);
                var eInstanceId = elite.chapter_pack[elite.chapter_pack.length - 1];
                this.areaLastElite[key] = eInstanceId;
            }
        };
        // 根据小岛id，获取小岛的最后一关的关卡id
        PlayerInstanceSystem.prototype.getLastInstance = function (areaId) {
            return this.areaLastInstance[areaId + ""];
        };
        // 根据小岛id，获取小岛挑战关卡最后一关id
        PlayerInstanceSystem.prototype.getLastElite = function (areaId) {
            return this.areaLastElite[areaId + ""];
        };
        // 根据最后一关的关卡ID，获取关卡所在的小岛
        PlayerInstanceSystem.prototype.getAreaIdByLastMobId = function (mobId, type) {
            if (type === void 0) { type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL; }
            var map = type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL ? this.areaLastInstance : this.areaLastElite;
            for (var key in map) {
                if (map[key] == mobId) {
                    return key;
                }
            }
            return -1;
        };
        // 判断是否为最后一关
        PlayerInstanceSystem.prototype.isLastMob = function (type) {
            return this.getAreaIdByLastMobId(this.curInstances[type].curMobID, type) >= 0;
        };
        /**
         * 这个方法用来设置 maxAreaID
         */
        PlayerInstanceSystem.prototype.getMaxAreaNORMAL = function () {
            var tableChapter = zj.TableInstanceArea.Table();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tableChapter); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                for (var _c = 0, _d = zj.HelpUtil.GetKV(vv.area_normal); _c < _d.length; _c++) {
                    var _e = _d[_c], ak = _e[0], av = _e[1];
                    if (av < this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxChapterID) {
                        this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID = Number(kk);
                    }
                    else if (av == this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxChapterID) {
                        this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID = Number(kk);
                        return;
                    }
                    else {
                        return;
                    }
                }
            }
        };
        PlayerInstanceSystem.prototype.getMaxAreaELITE = function () {
            var tableChapter = zj.TableInstanceArea.Table();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tableChapter); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                for (var _c = 0, _d = zj.HelpUtil.GetKV(vv.area_elite); _c < _d.length; _c++) {
                    var _e = _d[_c], ak = _e[0], av = _e[1];
                    if (av < this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxChapterID) {
                        this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxAreaID = Number(kk);
                    }
                    else if (av == this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxChapterID) {
                        this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxAreaID = Number(kk);
                        return;
                    }
                    else {
                        return;
                    }
                }
            }
        };
        PlayerInstanceSystem.prototype.ckid = function (id) {
            return id == null || id == -1;
        };
        PlayerInstanceSystem.prototype.AreaInstance = function (id) {
            if (this.ckid(id)) {
                return null;
            }
            return zj.TableInstanceArea.Item(id);
        };
        PlayerInstanceSystem.prototype.EliteInstance = function (id) {
            if (this.ckid(id)) {
                return null;
            }
            return zj.TableChapterElite.Item(id);
        };
        /**
         * 副本宝箱表格信息
         */
        PlayerInstanceSystem.prototype.ChestItem = function (mobsId) {
            if (this.ckid(mobsId)) {
                return null;
            }
            return zj.TableInstanceChest.Item(mobsId);
        };
        PlayerInstanceSystem.prototype.ChapterInstance = function (id) {
            if (this.ckid(id)) {
                return null;
            }
            return zj.TableChapterNormal.Item(id);
        };
        PlayerInstanceSystem.prototype.SearchInstance = function (id) {
            if (this.ckid(id)) {
                return null;
            }
            return zj.TableInstanceSearch.Item(id);
        };
        PlayerInstanceSystem.prototype.Mob = function (id) {
            var mobId = id || this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID;
            return this.curInstances[this.Type(mobId)].mobsMap[mobId];
        };
        PlayerInstanceSystem.prototype.InstanceFun = function (id) {
            var mobId = id || this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID;
            if (this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                return zj.TableInstance.Item(mobId);
            }
            else if (this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
                return zj.TableInstanceVillage.Item(mobId);
            }
        };
        PlayerInstanceSystem.prototype.Type = function (instanceId) {
            return Math.floor(instanceId / 100000);
        };
        PlayerInstanceSystem.prototype.ChapterIdx = function (id) {
            var chapterNormal = zj.TableChapterNormal.Table(); //CSV:GetTable(StringConfig_Table.chapterNORMAL)
            var chapterElite = zj.TableChapterElite.Table();
            if (this.ckid(id)) {
                return null;
            }
            var tbl = null;
            if (zj.Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                tbl = chapterNormal;
            }
            else if (zj.Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                tbl = chapterElite;
            }
            else if (zj.Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
                return null;
            }
            else if (zj.Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
                return null;
            }
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                for (var _c = 0, _d = zj.HelpUtil.GetKV(v.chapter_pack); _c < _d.length; _c++) {
                    var _e = _d[_c], kk = _e[0], vv = _e[1];
                    if (id == vv) {
                        return [k, kk];
                    }
                }
            }
            return null;
        };
        PlayerInstanceSystem.prototype.Chapter = function (id) {
            var chapterNormal = zj.TableChapterNormal.Table();
            var chapterElite = zj.TableChapterElite.Table();
            var tbl = null;
            if (zj.Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                tbl = chapterNormal;
            }
            else if (zj.Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                tbl = chapterElite;
            }
            else if (zj.Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
                return null;
            }
            else if (zj.Game.PlayerInstanceSystem.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
                return null;
            }
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl); _i < _a.length; _i++) {
                var _b = _a[_i], v = _b[0], k = _b[1];
                for (var _c = 0, _d = zj.HelpUtil.GetKV(k.chapter_pack); _c < _d.length; _c++) {
                    var _e = _d[_c], vv = _e[0], kk = _e[1];
                    if (id == kk) {
                        return k;
                    }
                }
            }
            return null;
        };
        PlayerInstanceSystem.prototype.CheckCount = function (id) {
            var mobId = id || zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            var ret = false;
            if (zj.TableInstance.Item(mobId).challenge_num == 0) {
                ret = true;
            }
            else {
                var cur = this.Mob(mobId).dayTime;
                var total = zj.TableInstance.Item(mobId).challenge_num * (1 + this.Mob(mobId).buyTime);
                if (cur < total) {
                    ret = true;
                }
                else {
                    ret = false;
                }
            }
            return ret;
        };
        PlayerInstanceSystem.prototype.CheckPower = function (id, count) {
            var mobId = id || this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID;
            var mobCnt = count || 1;
            var ret = false;
            var powerCost = (zj.TableInstance.Item(mobId).challenge_win + zj.TableInstance.Item(mobId).challenge_start) * mobCnt;
            if (powerCost <= zj.Game.PlayerInfoSystem.BaseInfo.power) {
                ret = true;
            }
            else {
                ret = false;
            }
            return ret;
        };
        PlayerInstanceSystem.prototype.isOpenAreaById = function (areaId) {
            var area = zj.TableInstanceArea.Item(areaId);
            if (area) {
                return zj.Game.PlayerInfoSystem.Level >= area.open_level;
            }
            return false;
        };
        PlayerInstanceSystem.prototype.isOpenInstanceById = function (instanceId) {
            var _a = this.getChapterByInstanceId(instanceId), chatper = _a[0], idx = _a[1];
            if (chatper) {
                return this.isOpenAreaById(chatper.chapter_id);
            }
            return false;
        };
        PlayerInstanceSystem.prototype.getChapterByInstanceId = function (instanceId) {
            var type = zj.Game.PlayerInstanceSystem.Type(instanceId);
            var chapterMap;
            if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                chapterMap = zj.TableChapterElite.Table();
            }
            else if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                chapterMap = zj.TableChapterNormal.Table();
            }
            for (var key in chapterMap) {
                var chapter = chapterMap[key];
                var idx = chapter.chapter_pack.indexOf(instanceId);
                if (idx >= 0) {
                    return [chapter, idx];
                }
            }
            return [null, 0];
        };
        /**
         * 副本id列表
         *
         * @param id 物品ID
         *
         * from db_instance.lua
         */
        PlayerInstanceSystem.prototype.GetPartner = function (id) {
            var tbl = zj.TableInstance.Table();
            var instance = [];
            for (var k in tbl) {
                if (tbl.hasOwnProperty(k)) {
                    var v = tbl[k];
                    for (var i = 0; i < v.challenge_goods.length; i++) {
                        var vv = v.challenge_goods[i]; // 掉落物品
                        if (vv == id) {
                            instance.push(v.instance_id);
                        }
                    }
                }
            }
            return instance;
        };
        /**
         * 副本属性信息
         *
         * @param id 物品ID
         *
         * from db_instance.lua
         */
        PlayerInstanceSystem.prototype.GetProp = function (propId) {
            var tbl = zj.TableInstance.Table();
            var instance = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl); _i < _a.length; _i++) {
                var _b = _a[_i], v = _b[0], k = _b[1];
                for (var _c = 0, _d = zj.HelpUtil.GetKV(k.challenge_goods); _c < _d.length; _c++) {
                    var _e = _d[_c], vv = _e[0], kk = _e[1];
                    if (kk == propId) {
                        instance.push(k.instance_id);
                    }
                }
            }
            return instance;
        };
        /**
         * 是否打过了指定的副本
         *
         * from db_instance.lua
         */
        PlayerInstanceSystem.CheckPassed = function (instanceId) {
            var ret = false;
            var id = Math.floor(instanceId / 100000);
            if ((id == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID > instanceId) ||
                (id == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE && zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID > instanceId)) {
                ret = true;
            }
            return ret;
        };
        // public ChapterBossInstanceID() {
        // 	return this.ChapterItem().chapter_pack[Helper.getObjLen(this.ChapterItem().chapter_pack) - 1];
        // }
        PlayerInstanceSystem.prototype.ChapterItem = function (curChapterIdx) {
            if (curChapterIdx == null) {
                curChapterIdx = this.curInstances[this.curInstanceType].curChapterID;
            }
            if (curChapterIdx == null || curChapterIdx == -1) {
                console.log("curChapterIdx: " + curChapterIdx);
                return null;
            }
            var _a = this.ChapterTable(), tbl = _a[0], tblName = _a[1];
            return tbl[curChapterIdx];
        };
        PlayerInstanceSystem.prototype.ChapterTable = function () {
            var _chapter_normal = zj.TableChapterNormal.Table();
            var _chapter_elite = zj.TableChapterElite.Table();
            var type = this.curInstanceType;
            if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                return [_chapter_normal, zj.StringConfig_Table.chapterNORMAL];
            }
            else if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                return [_chapter_elite, zj.StringConfig_Table.chapterELITE];
            }
            else {
            }
        };
        PlayerInstanceSystem.prototype.CheckAvailable = function (id) {
            var mobId = id || this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
            var ret = false;
            if (this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL && !this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].bClear) {
                //普通副本，受等级限制
                var ins = this.InstanceFun(mobId);
                if (ins != null) {
                    if (ins.challenge_level >= 0 && ins.challenge_level <= zj.CommonConfig.role_max_level) {
                        if (ins.challenge_level <= zj.Game.PlayerInfoSystem.BaseInfo.level) {
                            ret = true;
                        }
                    }
                    else if (this.Type(ins.challenge_level) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                        var maxMobID = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID;
                        if (maxMobID > ins.challenge_level) {
                            ret = true;
                        }
                    }
                }
            }
            else if (this.Type(mobId) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE && !this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].bClear) {
                //精英副本，受普通副本开启限制
                if (this.InstanceFun(mobId) != null && this.InstanceFun(mobId).challenge_level <= this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID - 1) {
                    ret = true;
                }
            }
            else {
                ret = true;
            }
            return ret;
        };
        PlayerInstanceSystem.prototype.getInfo = function () {
            return this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL];
        };
        PlayerInstanceSystem.prototype.GetAreaComplete = function (areaId) {
            var maxAreaId = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID;
            if (areaId < maxAreaId) {
                return true;
            }
            else {
                var maxMob = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
                var chapterList = this.AreaInstance(areaId).area_normal;
                var maxChapter = chapterList[chapterList.length - 1];
                var chapterTbl = zj.TableChapterNormal.Item(maxChapter);
                if (chapterTbl != null && maxMob > chapterTbl.chapter_pack[chapterTbl.chapter_pack.length - 1]) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        /**
         * 是否可以打本区域挑战副本
         */
        PlayerInstanceSystem.prototype.ElitePackCanChallenge = function (areaId) {
            var code = 0;
            if (areaId < this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxAreaID) {
                return [true, code];
            }
            else {
                var chapterList = this.AreaInstance(areaId).area_elite;
                var firChapter = chapterList[0];
                if (firChapter == null) {
                    return false;
                }
                var chapterTbl_1 = zj.TableChapterElite.Item(firChapter);
                var first_chapter_info = zj.TableInstance.Item(chapterTbl_1.chapter_pack[0]);
                //服务器认定是否可打
                // let chapterList = this.AreaInstance(areaId).area_elite
                // let firChapter = chapterList[0]
                // let chapterTbl = TableChapterElite.Item(firChapter);
                var instance = zj.Table.FindR(this.mobInfos, function (k, v) {
                    if (v.mobId == chapterTbl_1.chapter_pack[0]) {
                        return true;
                    }
                })[0];
                if (this.Type(first_chapter_info.challenge_level) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                    var maxMob = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
                    if (chapterTbl_1 != null && maxMob > first_chapter_info.challenge_level) {
                        if ((chapterTbl_1 != null) && (instance != null)) {
                            return [true, code];
                        }
                        else {
                            //未通关上一精英副本
                            return [false, 2];
                        }
                    }
                    else {
                        //普通副本关卡
                        return [false, first_chapter_info.challenge_level];
                    }
                }
                else if (this.Type(first_chapter_info.challenge_level) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                    var maxMob = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID;
                    if (chapterTbl_1 != null && maxMob > first_chapter_info.challenge_level) {
                        if ((chapterTbl_1 != null) && (instance != null)) {
                            return [true, code];
                        }
                        else {
                            //未通关上一精英副本
                            return [false, 2];
                        }
                    }
                    else {
                        //精英副本关卡
                        return [false, first_chapter_info.challenge_level];
                    }
                }
            }
        };
        /**
         * 判断当前区域是否已经开启(只判断NORMAL)
         */
        PlayerInstanceSystem.prototype.GetAreaIsLock = function (areaId) {
            if (areaId <= this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID) {
                return false;
            }
            else if (areaId == this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID + 1) {
                var maxMob = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
                var chapterList = this.AreaInstance(this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID).area_normal;
                var maxChapter = chapterList[chapterList.length - 1];
                var chapterTbl = zj.TableChapterNormal.Item(maxChapter);
                var curAreaChapterList = this.AreaInstance(areaId).area_normal;
                if (curAreaChapterList[0] == null) {
                    return -1;
                }
                else if (maxMob > chapterTbl.chapter_pack[chapterTbl.chapter_pack.length - 1]) {
                    var instanceTbl = this.InstanceFun(maxMob);
                    return instanceTbl.challenge_level;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }
        };
        //当前关卡探索副本是否完成
        PlayerInstanceSystem.prototype.IsCompleteCurSearch = function (chapter) {
            if (this.instanceInfo.searchInfo == null) {
                return false;
            }
            for (var k = void 0; k < this.instanceInfo.searchInfo.length; k++) {
                var v = this.instanceInfo.searchInfo[k];
                // if (v.type == chapter) {
                // 	let searchInfo = this.SearchInstance(v.index);
                // 	if (Game.Controller.serverNow().getTime() >= (v.start_time + searchInfo.time)) {
                // 		return true;
                // 	}
                // }
            }
            return false;
        };
        PlayerInstanceSystem.prototype.GetAreaSearchStatus = function () {
            var ret = [];
            var searchInfoMap = {};
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.InstanceInfo.searchInfo); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                searchInfoMap[vv.index] = vv;
            }
            var tblArea = {};
            tblArea = zj.TableInstanceArea.Table();
            for (var _c = 0, _d = zj.HelpUtil.GetKV(tblArea); _c < _d.length; _c++) {
                var _e = _d[_c], kk = _e[0], vv = _e[1];
                var areaSearchList = vv.area_search;
                for (var i = 0; i < areaSearchList.length; i++) {
                    var v = areaSearchList[i];
                    if (searchInfoMap[v] != null) {
                        ret[vv.area_id - 1] = this.CalcSearchStatue(searchInfoMap[v]);
                        break;
                    }
                }
            }
            return ret;
        };
        PlayerInstanceSystem.prototype.CalcSearchStatue = function (info) {
            var tblInfo = this.SearchInstance(info.index);
            // let time = Game.Controller.serverNow().getTime() - info.start_time;
            var date = zj.Game.Controller.serverNow();
            var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
            var time = (humanDate.getTime() / 1000 - 8 * 60 * 60) - info.start_time;
            if (time >= tblInfo.time) {
                return true;
            }
            else {
                return false;
            }
        };
        PlayerInstanceSystem.prototype.GetHunterBeInSearch = function (generalId) {
            var generalList = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.SearchInfo); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                for (var _c = 0, _d = zj.HelpUtil.GetKV(v.generalId); _c < _d.length; _c++) {
                    var _e = _d[_c], kk = _e[0], vv = _e[1];
                    generalList.push(vv);
                }
            }
            return zj.Table.FindK(generalList, generalId);
        };
        /**
         * 存放探索设置阵容
         * @param index 当前副本ID
         * @param format 猎人ID数组 初始为["0", "0", "0", "0"]
         */
        PlayerInstanceSystem.prototype.SearchInstanceSaveFormat = function (index, format) {
            var str = "";
            for (var i = 0; i < format.length; i++) {
                var vv = format[i];
                if ((i + 1) == format.length) {
                    str = str + vv;
                }
                else {
                    str = str + vv + "|";
                }
            }
            this.setSearchFormation(zj.Game.PlayerInfoSystem.BaseInfo.id + "_SearchInstance_" + index, str);
        };
        /**
         * 读取探索设置阵容
         * @param index 当前副本ID
         */
        PlayerInstanceSystem.prototype.SearchInstanceGetFormat = function (index) {
            var ret = ["0", "0", "0", "0"];
            var str = this.getSearchFormation(zj.Game.PlayerInfoSystem.BaseInfo.id + "_SearchInstance_" + index);
            // let str = "110001"+"|"+"110002"+"|"+"110003"+"|"+"110004";
            if (str != undefined || str != null) {
                ret = str.split("|");
            }
            return ret;
        };
        /**
         * 获得所有满足条件的猎人ID
         * @param level 猎人等级
         * @param star 猎人星级
         * @param type 猎人类型
         */
        PlayerInstanceSystem.prototype.GetSearchGeneralCanFormat = function (level, star, type) {
            var ret = [];
            var allHunter = zj.Game.PlayerHunterSystem.queryAllHunters();
            for (var i = 0; i < allHunter.length; i++) {
                var hunter = allHunter[i];
                if (hunter != null) {
                    if ((hunter.level >= level || level == 0) && (hunter.star >= star || star == 0)) {
                        var genTbl = zj.PlayerHunterSystem.Table(hunter.general_id);
                        if ((genTbl.type == type || type == 0) && hunter.is_ware == false) {
                            ret.push(hunter.general_id);
                        }
                    }
                }
            }
            return ret;
        };
        /**
         * 本地缓存已选探索阵容
         * @param index 当前副本ID
         * @param formation 存放已选探索阵容的猎人ID
         */
        PlayerInstanceSystem.prototype.SetSaveFormation = function (index, formation) {
            // formation.join();
            var hunterIdArr = JSON.stringify(formation);
            var key = "SearchInstance_" + index;
            return zj.Game.Controller.setRoleStorageItem(key, hunterIdArr);
        };
        /**
         * 读取本地存储已选探索阵容
         * @param index 当前副本ID
         */
        PlayerInstanceSystem.prototype.GetSaveFormation = function (index) {
            var baseId = zj.Game.PlayerInfoSystem.BaseInfo.id;
            if (baseId == null || index == null)
                return ["0", "0", "0", "0"];
            var key = "SearchInstance_" + index;
            var value = zj.Game.Controller.getRoleStorageItem(key);
            if (!value || value == "")
                return ["0", "0", "0", "0"];
            var formation = JSON.parse(value);
            return formation;
        };
        PlayerInstanceSystem.prototype.Set = function (mobId) {
            var ins = this.InstanceFun(mobId);
            var chp = this.Chapter(mobId);
            var _a = this.ChapterIdx(mobId), var1 = _a[0], var2 = _a[1];
            var mob = {
                Type: this.Type(mobId),
                Boss: this.fromInstance(mobId).head_path,
                Name: zj.Helper.StringFormat("%d_%d %s", var1, (parseInt(var2) + 1).toString(), ins.instance_name),
                Stage: zj.Helper.StringFormat("%d-%d", var1, parseInt(var2) + 1),
                Open: false,
                Clear: false,
                Info: "",
                Color: zj.Helper.RGBToHex("r:241,g:34,b:0")
            };
            if (mob.Type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL && this.curInstances[mob.Type].maxMobID >= mobId) {
                if (this.InstanceFun(mobId).challenge_level >= 0 && this.InstanceFun(mobId).challenge_level <= zj.CommonConfig.role_max_level) {
                    if (this.InstanceFun(mobId).challenge_level <= zj.Game.PlayerInfoSystem.BaseInfo.level) {
                        mob.Open = true;
                        mob.Clear = this.curInstances[mob.Type].maxMobID > mobId;
                    }
                }
                else if (this.Type(this.InstanceFun(mobId).challenge_level) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                    var maxMobId = this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].maxMobID;
                    if (maxMobId > ins.challenge_level) {
                        mob.Open = true;
                        mob.Clear = this.curInstances[mob.Type].maxMobID > mobId;
                    }
                }
            }
            else if (mob.Type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE &&
                this.curInstances[mob.Type].maxMobID >= mobId &&
                this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID > ins.challenge_level &&
                this.InstanceFun(mobId).challenge_level <= this.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID - 1) {
                mob.Open = true;
                mob.Clear = this.curInstances[mob.Type].maxMobID >= mobId;
            }
            if (mob.Type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                if (mob.Open) {
                    mob.Info = zj.Helper.StringFormat("%s%s", zj.TextsConfig.TextsConfig_HeroMain.instance_normal, zj.TextsConfig.TextsConfig_HeroMain.instance_count);
                    mob.Color = zj.Helper.RGBToHex("r:28,g:90,b:0");
                }
                else {
                    mob.Info = zj.Helper.StringFormat("%s(%s)", zj.TextsConfig.TextsConfig_HeroMain.instance_normal, zj.TextsConfig.TextsConfig_HeroMain.instance_lock);
                    mob.Color = zj.Helper.RGBToHex("r:241,g:34,b:0");
                }
            }
            else if (mob.Type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                if (mob.Open) {
                    var left = (this.Mob(mobId).buyTime + 1) * ins.challenge_num - this.Mob(mobId).dayTime;
                    var all = ins.challenge_num;
                    mob.Info = zj.Helper.StringFormat("%s(%d/%d)", zj.TextsConfig.TextsConfig_HeroMain.instance_elit, left, all);
                    if (left > 0) {
                        mob.Color = zj.Helper.RGBToHex("r:18,g:90,b:0");
                    }
                    else {
                        zj.Helper.RGBToHex("r:241,g:34,b:0");
                    }
                }
                else {
                    mob.Info = zj.Helper.StringFormat("%s(%s)", zj.TextsConfig.TextsConfig_HeroMain.instance_elit, zj.TextsConfig.TextsConfig_HeroMain.instance_lock);
                    mob.Color = zj.Helper.RGBToHex("r:241,g:34,b:0");
                }
            }
            if (mob.Open) {
                var _b = this.getChapterByInstanceId(mobId), chatper = _b[0], idx = _b[1];
                if (chatper) {
                    var area = zj.TableInstanceArea.Item(chatper.chapter_id);
                    if (zj.Game.PlayerInfoSystem.Level < area.open_level) {
                        mob.Open = false;
                        mob.Info = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.instanceLockLevel, area.open_level);
                        mob.Color = zj.Helper.RGBToHex("r:241,g:34,b:0");
                    }
                }
            }
            return mob;
        };
        PlayerInstanceSystem.prototype.fromInstance = function (id) {
            if (this.ckid(id))
                return null;
            var mprId = null;
            if (this.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || this.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                mprId = zj.TableInstance.Item(id).boss_roleId;
            }
            else if (this.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY || this.Type(id) == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
                mprId = zj.TableInstanceVillage.Item(id).boss_roleId;
            }
            if (this.ckid(mprId))
                return null;
            return zj.TableMapRole.Item(mprId);
        };
        PlayerInstanceSystem.prototype.GetAreaIDByChapterID = function (id) {
            var tableChapter = zj.TableInstanceArea.Table();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tableChapter); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                for (var _c = 0, _d = zj.HelpUtil.GetKV(vv.area_normal); _c < _d.length; _c++) {
                    var _e = _d[_c], ak = _e[0], av = _e[1];
                    if (av == id) {
                        return kk;
                    }
                }
            }
        };
        /**
     * 猎人获取徽章跳转到普通副本
         * @param mobId 怪物Id
         * @param itemId 物品id
         * @param  itemCount 物品数量
         * @param father 父类
         */
        PlayerInstanceSystem.prototype.StartFast = function (mobId, itemId, itemCount, father, cb) {
            this.preInstanceInfo = zj.Table.DeepCopy(this.curInstances[this.curInstanceType]);
            if (this.preInstanceInfo == null) {
                zj.toast_warning("wrong preInstanceInfo while instanceType is : " + this.curInstanceType);
            }
            this.curInstanceType = this.Type(mobId);
            this.curInstances[this.curInstanceType].curMobID = mobId;
            this.curInstances[this.curInstanceType].curChapterID = this.Chapter(mobId).chapter_id;
            this.curInstances[this.curInstanceType].curAreaID = this.GetAreaIDByChapterID(this.curInstances[this.curInstanceType].curChapterID);
            zj.loadUI(zj.HXH_InstanceFast)
                .then(function (dialog) {
                dialog.setOutPut(mobId, itemCount, itemId, cb);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**
         * 猎人获取徽章跳转到高级副本
         * @param mobId 怪物Id
         * @param itemId 物品id
         * @param itemCount 物品数量
         * @param father 父类
         */
        PlayerInstanceSystem.prototype.Start2 = function (mobId, itemId, itemCount, father, cb) {
            this.preInstanceInfo = zj.Table.DeepCopy(this.curInstances[this.curInstanceType]);
            if (this.preInstanceInfo == null) {
                zj.toast_warning("wrong preInstanceInfo while instanceType is : " + this.curInstanceType);
            }
            this.curInstanceType = this.Type(mobId);
            this.curInstances[this.curInstanceType].curMobID = mobId;
            this.curInstances[this.curInstanceType].curChapterID = this.Chapter(mobId).chapter_id;
            this.curInstances[this.curInstanceType].curAreaID = this.GetAreaIDByChapterID(this.curInstances[this.curInstanceType].curChapterID);
            // loadUI(Adventurems).then((scene: Adventurems) => {
            // 	scene.getMobIdAndIsJump(mobId, true);
            // 	scene.LoadFromBattleNormal(true);
            // 	scene.show(UI.SHOW_FROM_TOP);
            // });
            zj.SceneManager.instance.EnterAdventure(-1, mobId);
        };
        PlayerInstanceSystem.prototype.TeachNoNextButton = function () {
            var ids = [100001, 100002, 100004, 100006, 100007, 100009, 100013, 100014, 100028];
            var find = zj.Table.FindF(ids, function (k, v) {
                return zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID == v;
            });
            return find;
        };
        PlayerInstanceSystem.prototype.TeachSearchFormateIndex = function (generalIds) {
            var upNums = 3;
            var upIndexs = {};
            var upPos = {};
            var downPos = {};
            for (var i = 0; i < upNums; i++) {
                zj.Table.Init(upNums, function (i) {
                    return i;
                });
            }
            for (var _i = 0, _a = zj.HelpUtil.GetKV(generalIds); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (!zj.Table.VIn(zj.CommonConfig.general_limit_use_ids, zj.PlayerHunterSystem.GetGeneralId(v))) {
                    upPos[k] = [k, v];
                }
                else {
                    downPos[k] = [k, v];
                }
            }
            for (var i = 0; i < upNums; i++) {
                if (upPos[i] != null) {
                    upIndexs[i] = Number(upPos[i][0]);
                }
                else if (downPos[i - zj.Game.PlayerMissionSystem.tableLength(upPos)] != null) {
                    upIndexs[i] = downPos[i - zj.Game.PlayerMissionSystem.tableLength(upPos)][0];
                }
            }
            return upIndexs;
        };
        /**
         * 是否通关普通副本本章节
         * @param {number} chapter 章节ID
         */
        PlayerInstanceSystem.prototype.IsPassCurChapter = function (chapter) {
            var chapterTbl = zj.TableChapterNormal.Table()[chapter];
            var lastMobs = chapterTbl.chapter_pack[chapterTbl.chapter_pack.length - 1];
            return zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].mobsMap[lastMobs + 1] != null || zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].bClear;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 发协议
        PlayerInstanceSystem.prototype.MobsInfo_Req = function (instanceId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
                request.body.battleType = message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
                request.body.mobsId = instanceId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //扫荡发协议
        PlayerInstanceSystem.prototype.SweepMobsReq = function (times, is_down, curMobInfo) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SweepMobsRequest();
                request.body.mobsId = curMobInfo.mobId;
                request.body.sweepCount = times;
                request.body.is_down = is_down;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // let gameInfo = response.body.gameInfo;
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        // 购买体力发协议
        PlayerInstanceSystem.prototype.BuyMobsTime_Req = function (instanceId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BuyMobsTimeRequest();
                request.body.mobsId = instanceId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve({});
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        /**
         * 探索完成领取奖励协议
         * @param id 任务id
         */
        PlayerInstanceSystem.prototype.RewardSearchingReq = function (id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RewardSearchingRequest();
                request.body.id = id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        /**
         * 开始探索协议
         * @param id 任务Id
         * @param formationIds 上阵猎人id
         */
        PlayerInstanceSystem.prototype.StartSearchingReq = function (id, formationIds) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.StartSearchingRequest();
                request.body.id = id;
                request.body.generals = formationIds;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        /**
         * 刷新探索请求
         *
         * @param ids {Array<number>} 要刷新的id
         */
        PlayerInstanceSystem.prototype.RefreshSearchingReq = function (ids) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RefreshSearchingRequest();
                request.body.id = ids;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        /**
         * 加速探索请求
         * @param id {number} 任务id
         */
        PlayerInstanceSystem.prototype.SpeedSearchingReqBody = function (id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SpeedSearchingRequest();
                request.body.id = id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        // 取消探索
        PlayerInstanceSystem.prototype.EndSearchingReq = function (instanceId) {
            // return new Promise((resolve, reject) => {
            // 	let request = new message.EndSearchingRequest();
            // 	request.body.index = instanceId;
            // 	Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            // 		let response = <message.EndSearchingResponse>resp;
            // 		if (response.header.result != 0) {
            // 			reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
            // 			return;
            // 		}
            // 		resolve({});
            // 		return;
            // 	}, (req: aone.AoneRequest): void => {
            // 		reject(LANG("请求超时"));
            // 		return;
            // 	}, this, false);
            // 	return;
            // });
        };
        /**领取副本宝箱请求
         * @param mobsId 怪物Id
         */
        PlayerInstanceSystem.prototype.InstanceChestReq = function (mobsId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.InstanceChestRequest();
                request.body.mobsId = mobsId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        PlayerInstanceSystem.prototype.BuyPower_Req = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BuyPowerRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        /**
         * @description 锁定探索副本请求
         * @param id {number} 探索副本id
         * @param islock {boolean} 锁定状态
         */
        PlayerInstanceSystem.prototype.LockSearchingReq = function (id, islock) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LockSearchingRequest();
                request.body.id = id;
                request.body.is_lock = islock;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
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
        /**随机副本是否开启 */
        PlayerInstanceSystem.RandInfoVis = false;
        return PlayerInstanceSystem;
    }());
    zj.PlayerInstanceSystem = PlayerInstanceSystem;
    __reflect(PlayerInstanceSystem.prototype, "zj.PlayerInstanceSystem");
    var CustomInstanceInfo = (function () {
        function CustomInstanceInfo() {
            this.mobsMap = [];
            this.curAreaID = 0;
            this.maxAreaID = 0;
            this.curChapterID = 0;
            this.maxChapterID = 0;
            this.curMobID = 0;
            this.maxMobID = 0;
            this.bClear = false;
            this.bReview = false;
            this.instanceType = 0;
        }
        return CustomInstanceInfo;
    }());
    zj.CustomInstanceInfo = CustomInstanceInfo;
    __reflect(CustomInstanceInfo.prototype, "zj.CustomInstanceInfo");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerInstanceSystem.js.map