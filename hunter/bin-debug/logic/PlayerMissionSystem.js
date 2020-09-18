var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * @author chen xi.
     *
     * @date 2019-1-9
     *
     * @class 任务系统.
     *
     * @description modified by Lian Lei
     *
     * @date 2019-3-13
     */
    var PlayerMissionSystem = (function () {
        function PlayerMissionSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 私有变量
            /**
             * 任务基础信息
             */
            this.MissionInfo = null;
            /**
             * 每日活跃度信息
             */
            this.MissionActive = new message.MissionActive();
            /**
             * 任务列表
             */
            this._missionMap = null;
            /**
             * BattleStartReqBody的额外参数，抢矿表示；是否从敌人列表中筛选，通缉令表示：难度
             */
            this._fightExt = 0;
            this.missionInfo_pre = null;
            this.BASE = 1000;
            this.MISSION = 10000;
            this.MISSION_BASE = 100000;
            this.MISSION_ID = 760004;
            this.ID = 60;
            this.firstOpen = 0;
            //时间赛跑天数
            this.TimeNumber = 0;
            this._licenseCurPos = -1;
        }
        Object.defineProperty(PlayerMissionSystem.prototype, "missionInfo", {
            /**任务基础信息 */
            get: function () {
                return this.MissionInfo;
            },
            set: function (v) {
                this.missionInfo = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerMissionSystem.prototype, "missionActive", {
            /**每日活跃度信息 */
            get: function () {
                return this.MissionActive;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerMissionSystem.prototype, "activities", {
            /**所有活动信息 */
            get: function () {
                return this.Activities;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerMissionSystem.prototype, "missionMap", {
            // private _missionMap: Array<message.MissionInfo> = [];
            /**任务列表*/
            get: function () {
                return this._missionMap;
            },
            set: function (v) {
                this._missionMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerMissionSystem.prototype, "fightExt", {
            /**BattleStartReqBody的额外参数，抢矿表示；是否从敌人列表中筛选，通缉令表示：难度 这里是0开始 其他的不是 */
            get: function () {
                return this._fightExt;
            },
            set: function (v) {
                this._fightExt = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerMissionSystem.prototype, "licenseCurPos", {
            /**执照当前怪索引 */
            get: function () {
                return this._licenseCurPos;
            },
            set: function (v) {
                this._licenseCurPos = v;
            },
            enumerable: true,
            configurable: true
        });
        ///////////////////////////////////////////////////////////////////////////
        // 静态方法
        /**
         * 功能开启
         *
         * from db_level.lua
         * */
        PlayerMissionSystem.FunOpenTo = function (funcType, bShowTip) {
            var itemInfo = zj.TableFunctionOpen.Item(funcType);
            if (itemInfo == null)
                return false;
            var _getOpenResult = function (item) {
                // --军师阵法特殊处理
                if (funcType == zj.FUNC.STRATEGY) {
                    return true;
                }
                // --神兵单独处理，可以合成的时候直接开启
                if (funcType == zj.FUNC.ARTIFACT) {
                    return true;
                }
                if (typeof item.condition === "number" &&
                    item.condition != 0 &&
                    zj.Game.PlayerInfoSystem.BaseInfo != null
                    && zj.Game.PlayerInfoSystem.Level >= item.condition) {
                    return true;
                }
                if (typeof item.condition_instance === "number" &&
                    item.condition_instance != 0 &&
                    zj.PlayerInstanceSystem.CheckPassed(item.condition_instance) == true) {
                    return true;
                }
                return false;
            };
            var bOpen = _getOpenResult(itemInfo);
            if (bOpen == false && bShowTip == true) {
                zj.toast_warning(itemInfo.unopen_tip);
            }
            return bOpen;
        };
        /**等级开启的功能 */
        PlayerMissionSystem.prototype.FunOpen = function (level1) {
            var tbl = zj.TableFunctionOpen.Table();
            var level = level1 || zj.Game.PlayerInfoSystem.BaseInfo.level;
            var open = [];
            for (var k in tbl) {
                if (tbl.hasOwnProperty(k)) {
                    var v = tbl[k];
                    if (v.condition != 0 && v.condition == level && v.show == 1) {
                        open.push(v);
                    }
                }
            }
            return open;
        };
        ///////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerMissionSystem.prototype.init = function () {
            this.InitMissionInfo();
            this.curServerWeek = this.GetDay();
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_MISSION_INFO_CHANGE, this.onMissionChange, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_MISSION_ACTIVE_CHANGE, this.onMissActiveChange, this);
            // Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED , this.ShareReward , this);
        };
        PlayerMissionSystem.prototype.uninit = function () {
            this.MissionInfo = null;
            this.MissionActive = new message.MissionActive();
            this.Activities = [];
            this._missionMap = null;
            this._fightExt = 0;
            this.missionInfo_pre = null;
            this.curServerWeek = 0;
            this._licenseCurPos = -1;
        };
        PlayerMissionSystem.prototype.InitMissionInfo = function () {
            this._missionMap = {};
            for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.TableMissionType.Table()); _i < _a.length; _i++) {
                var _b = _a[_i], v = _b[0], k = _b[1];
                var msg = new message.MissionInfo;
                msg.type = k.type;
                msg.subType = k.sub_type;
                msg.missionId = k.start_id;
                msg.isFinish = false;
                this._missionMap[k.index] = msg;
            }
            for (var _c = 0, _d = zj.HelpUtil.GetKV(zj.TableMissionMain.Table()); _c < _d.length; _c++) {
                var _e = _d[_c], v = _e[0], k = _e[1];
                if (k.type == message.MissionType.MISSION_TYPE_RACE) {
                    var msg = new message.MissionInfo;
                    msg.type = k.type;
                    msg.subType = k.sub_type;
                    msg.missionId = k.id;
                    msg.isFinish = false;
                    this._missionMap[k.id] = msg;
                }
            }
        };
        PlayerMissionSystem.prototype.onMissionChange = function (ev) {
            if (this._missionMap == null) {
                // this.init();
                this.InitMissionInfo();
            }
            // if (this.MissionInfo == null) {
            this.MissionInfo = ev.data;
            //console.log(ev.data);
            // } else {
            //     let missionInfo = <Array<message.MissionInfo>>ev.data;
            //     for (const v of missionInfo) {
            //         for (let vv of this.MissionInfo) {
            //             if (v.missionId == vv.missionId) {
            //                 vv = v;
            //                 break;
            //             }
            //         }
            //     }
            // }
            for (var _i = 0, _a = this.missionInfo; _i < _a.length; _i++) {
                var v = _a[_i];
                for (var k in this._missionMap) {
                    if (this._missionMap[k].type == v.type && this._missionMap[k].subType == v.subType) {
                        this._missionMap[k] = v;
                    }
                }
            }
            for (var _b = 0, _c = zj.HelpUtil.GetKV(this.missionInfo); _b < _c.length; _b++) {
                var _d = _c[_b], v = _d[0], k = _d[1];
                var index = zj.Game.PlayerMissionSystem.itemIndex(k.type, k.subType);
                this._missionMap[index] = k;
                if (k.type == message.MissionType.MISSION_TYPE_RACE) {
                    var index_1 = k.missionId;
                    var times = k.missionId.toString();
                    this.TimeNumber = Number(times.charAt(times.length - 3));
                    this._missionMap[index_1] = k;
                }
            }
            zj.Game.EventManager.event(zj.GameEvent.REFRESH_MAINCITY_BUBBLE);
        };
        PlayerMissionSystem.prototype.onMissActiveChange = function (ev) {
            this.MissionActive = ev.data;
            if (this.MissionActive == null)
                this.MissionActive = new message.MissionActive();
        };
        PlayerMissionSystem.prototype.GetLimitLevel = function (index) {
            var id = 10000 * index + 1;
            return zj.TableWanted.Item(id).limit_level;
        };
        /**
         * 获取星期几 1-7
         */
        PlayerMissionSystem.prototype.GetDay = function () {
            var wDay = zj.Game.Controller.serverNow().getDay();
            if (wDay == 0)
                wDay = 7;
            return wDay;
        };
        PlayerMissionSystem.prototype.Open = function (fromId) {
            var ret = false;
            if (fromId == 0) {
                ret = true;
                // 普通副本
            }
            else if (fromId == 1) {
                ret = true;
                //挑战副本
            }
            else if (fromId == 2) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.ELITE);
                // 探索副本
            }
            else if (fromId == 3) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.ELITE);
                // 普通商铺
            }
            else if (fromId == 4) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.MALL);
                // 格斗商铺
            }
            else if (fromId == 5) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.ARENA);
                // 荣誉商铺
            }
            else if (fromId == 6) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.SINGLE);
                // 公会商铺
            }
            else if (fromId == 7) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.LEAGUE);
                // 酒馆商铺
            }
            else if (fromId == 8) {
                ret = true;
                // 酒馆
            }
            else if (fromId == 9) {
                ret = true;
                // 流星街1
            }
            else if (fromId == 10) {
                ret = zj.Game.PlayerInfoSystem.Level >= this.GetLimitLevel(1);
                // 流星街2
            }
            else if (fromId == 11) {
                ret = zj.Game.PlayerInfoSystem.Level >= this.GetLimitLevel(2);
                // 流星街3
            }
            else if (fromId == 12) {
                ret = zj.Game.PlayerInfoSystem.Level >= this.GetLimitLevel(3);
                // 流星街4
            }
            else if (fromId == 13 || fromId == 42) {
                ret = zj.Game.PlayerInfoSystem.Level >= this.GetLimitLevel(4);
                // 流星街5
            }
            else if (fromId == 14 || fromId == 43) {
                ret = zj.Game.PlayerInfoSystem.Level >= this.GetLimitLevel(5);
                // 流星街6
            }
            else if (fromId == 15 || fromId == 44) {
                ret = zj.Game.PlayerInfoSystem.Level >= this.GetLimitLevel(6);
                // 流星街
            }
            else if (fromId == 16) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.ARREST);
                // 贪婪之岛 - 兑换，钓鱼，猜拳，双色球，采集
            }
            else if ((fromId == 17) || (fromId == 18) || (fromId == 19) || (fromId == 20) || (fromId == 21)) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.WONDERLAND);
            }
            else if (fromId == 22) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.TOWER);
                // 首充
            }
            else if (fromId == 23) {
                ret = true;
            }
            else if (fromId == 24 || fromId == 62) {
                ret = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info != 0;
            }
            else if (fromId == 28) {
                ret = true;
            }
            else if (fromId == 30) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.WONDERLAND);
            }
            else if (fromId == 31) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.WONDERLAND);
            }
            else if (fromId == 32) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.COMPOUND);
            }
            else if (fromId == 33) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.GROUPFIGHT);
            }
            else if (fromId == 34) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.LEAGUE) && zj.Game.PlayerInfoSystem.LeagueId != 0;
            }
            else if (fromId == 35) {
                ret = true;
            }
            else if (fromId == 36) {
                ret = true;
            }
            else if (fromId == 37) {
                ret = true;
            }
            else if (fromId == 38) {
                ret = true;
            }
            else if (fromId == 39) {
                ret = true;
            }
            else if (fromId == 40) {
                var level = this.GetLimitLevel(message.EWantedType.WANTED_TYPE_SEVEN);
                ret = zj.Table.FindK(zj.Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, level) != -1;
            }
            else if (fromId == 45 || fromId == 46) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO);
            }
            else if (fromId == 47) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.DARKLAND2);
            }
            else if (fromId == 48) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.EQUIP);
            }
            else if (fromId == 49) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.DARKLAND2);
            }
            else if (fromId == 50) {
                ret = true;
            }
            else if (fromId == 51) {
                ret = true;
            }
            else if (fromId == 52) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.DARKLAND);
            }
            else if (fromId == 58) {
                ret = zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[5].value % 100 >= 21;
            }
            else if (fromId == 60) {
                ret = true;
            }
            else if (fromId == 61) {
                ret = true;
            }
            else if (fromId == 64) {
                ret = PlayerMissionSystem.FunOpenTo(zj.FUNC.TRANSFORM);
            }
            return ret;
        };
        PlayerMissionSystem.prototype.jump = function (fromId) {
            if (fromId == 1) {
                // loadUI(Adventurems)
                //     .then((dialog: Adventurems) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
                zj.SceneManager.instance.EnterAdventure(1);
            }
            else if (fromId == 2) {
                // loadUI(Adventurems)
                //     .then((dialog: Adventurems) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
                zj.SceneManager.instance.EnterAdventure(2);
            }
            else if (fromId == 3) {
                // loadUI(Adventurems)
                //     .then((dialog: Adventurems) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
            else if (fromId == 4) {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(1);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 5) {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(2);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 6) {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(4);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 7) {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(3);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 8) {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(5);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 9) {
                zj.loadUI(zj.TavernScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FILL_OUT);
                    scene.nPCDialog();
                });
            }
            else if (fromId == 10) {
                var index = 1;
                var limit_level = zj.TableWanted.Item(10000 * index + 1).limit_level;
                if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    zj.Game.PlayerMissionSystem.fightExt = index;
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        //接口
                        scene.Init(1);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
                // loadUI(Tavern)
                //     .then((dialog: Tavern) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
            else if (fromId == 11) {
                var index = 2;
                var limit_level = zj.TableWanted.Item(10000 * index + 1).limit_level;
                if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    zj.Game.PlayerMissionSystem.fightExt = index;
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        //接口
                        scene.Init(2);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            }
            else if (fromId == 12) {
                var index = 3;
                var limit_level = zj.TableWanted.Item(10000 * index + 1).limit_level;
                if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    zj.Game.PlayerMissionSystem.fightExt = index;
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        //接口
                        scene.Init(3);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            }
            else if (fromId == 13 || fromId == 42) {
                var index = 4;
                var limit_level = zj.TableWanted.Item(10000 * index + 1).limit_level;
                if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    zj.Game.PlayerMissionSystem.fightExt = index;
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        //接口
                        scene.Init(4);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            }
            else if (fromId == 14 || fromId == 43) {
                var index = 5;
                var limit_level = zj.TableWanted.Item(10000 * index + 1).limit_level;
                if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    zj.Game.PlayerMissionSystem.fightExt = index;
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        //接口
                        scene.Init(5);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            }
            else if (fromId == 15 || fromId == 44) {
                var index = 1;
                var limit_level = zj.TableWanted.Item(10000 * index + 1).limit_level;
                if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    zj.Game.PlayerMissionSystem.fightExt = index;
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        //接口
                        scene.Init(1);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            }
            else if (fromId == 16) {
                if (PlayerMissionSystem.FunOpenTo(zj.FUNC.ARREST)) {
                    zj.loadUI(zj.WantedSecondMeteorstanceScene)
                        .then(function (scene) {
                        scene.Init(1);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (fromId == 17 || fromId == 18 || fromId == 19 || fromId == 20 || fromId == 21 || fromId == 30 || fromId == 31) {
                zj.SceneManager.instance.EnterSceneZorkBoss();
            }
            else if (fromId == 22) {
                zj.loadUI(zj.SkyAreanMainScene)
                    .then(function (scene) {
                    scene.Init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 23) {
                var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.firstcharge + ".json");
                var bFirst = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward.length != tbl.length;
                var noCharge = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.old_chargeToken == 0;
                var info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
                var haveTime = (info.info == 0) || (info.leftTime > 0);
                if (bFirst && noCharge && haveTime) {
                    zj.loadUI(zj.HXH_FirstChargeMainNew)
                        .then(function (scene) {
                        // scene.init();
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (fromId == 24 || fromId == 62) {
                if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info != 0) {
                    zj.loadUI(zj.Activity_RandomBoomSence)
                        .then(function (scene) {
                        scene.Init();
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (fromId == 25) {
            }
            else if (fromId == 26) {
            }
            else if (fromId == 27) {
            }
            else if (fromId == 28) {
                zj.loadUI(zj.PayMallScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.init(true);
                });
            }
            else if (fromId == 32) {
                zj.loadUI(zj.HunterCompound)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 33) {
                // loadUI(FirstChargeMainNew)
                //     .then((scene: FirstChargeMainNew) => {
                //         scene.show(UI.SHOW_FROM_TOP);
                //     });
            }
            else if (fromId == 34) {
                zj.loadUI(zj.LeagueMatchMallMain)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 35) {
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curAreaID = 1;
                // loadUI(Adventurems)
                //     .then((scene: Adventurems) => {
                //         scene.show(UI.SHOW_FROM_TOP);
                //     });
                zj.SceneManager.instance.EnterAdventure();
            }
            else if (fromId == 36) {
                zj.loadUI(zj.ActivityHappySeven)
                    .then(function (scene) {
                    // scene.init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 37) {
                zj.loadUI(zj.ActivityMain)
                    .then(function (scene) {
                    scene.init(18);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 38) {
                zj.SceneManager.instance.EnterMainCityBack();
            }
            else if (fromId == 39) {
                zj.SceneManager.instance.EnterMainCityBack();
            }
            else if (fromId == 40) {
                zj.Game.PlayerMissionSystem.fightExt = 7;
                zj.loadUI(zj.WantedSecondMeteorstanceScene)
                    .then(function (scene) {
                    //接口
                    scene.Init(7);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 47) {
                zj.loadUI(zj.DarkLandHomeScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FILL_OUT);
                });
                zj.loadUI(zj.RelicMain)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 48) {
                zj.loadUI(zj.ActivityXuyuanBoom)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.Init();
                });
            }
            else if (fromId == 49) {
                zj.loadUI(zj.RelicMall_Main)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 50) {
                zj.loadUI(zj.VipLowGift)
                    .then(function (scene) {
                    scene.init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 51) {
                zj.loadUI(zj.VipLowGift)
                    .then(function (scene) {
                    scene.init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 52) {
                zj.SceneManager.instance.EnterSceneZorkBoss();
            }
            else if (fromId == 60) {
                zj.loadUI(zj.VipLowGift)
                    .then(function (scene) {
                    scene.init(525);
                    // scene.load(5);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 61) {
                zj.loadUI(zj.VipLowGift)
                    .then(function (scene) {
                    scene.init(945);
                    // scene.load(9);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else if (fromId == 64) {
                zj.loadUI(zj.HunterTransformMainSence)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        /**
         * 返回任务大类型
         * @param missionType 任务类型
         * @param missionSubType 任务子类型
         */
        PlayerMissionSystem.prototype.itemType = function (missionType, missionSubType) {
            var infoAll = zj.TableMissionType.Table();
            var info = [];
            for (var k in infoAll) {
                if (infoAll.hasOwnProperty(k)) {
                    var v = infoAll[k];
                    info.push(v);
                }
            }
            var infoType = zj.Table.FindR(info, function (k, v) {
                return (v.type == missionType && v.sub_type == missionSubType);
            })[0];
            return infoType;
        };
        /**
         * 返回任务index
         * @param type 任务类型
         * @param id 任务子类型
         */
        PlayerMissionSystem.prototype.itemIndex = function (type, id) {
            return type * 10000 + id;
        };
        /**
         * 任务类型表
         * @param missionId 索引
         */
        PlayerMissionSystem.prototype.itemSubType = function (missionId) {
            return zj.TableMissionType.Item(missionId);
        };
        /**
         * 返回任务类型
         * @param missionId 索引
         */
        PlayerMissionSystem.prototype.itemInfo = function (missionId) {
            return zj.TableMissionItem.Item(missionId);
        };
        /**
         * 返回执照类型
         * @param id 索引
         */
        PlayerMissionSystem.prototype.itemLicense = function (id) {
            return zj.TableMissionLicence.Item(id);
        };
        /**
         * 返回主线类型
         * @param id 索引
         */
        PlayerMissionSystem.prototype.itemMain = function (id) {
            return zj.TableMissionMain.Item(id);
        };
        PlayerMissionSystem.GetActivityUI = function () {
            var data = [];
            for (var k in message.ActivityInfo) {
                var v = message.ActivityInfo[k];
                if (v.stopTime == Date.parse(zj.Game.Controller.serverNow().toString())) {
                    if (v.type == message.ActivityType.ACT_TYPE_UPLEVEL //冲级
                        || v.type == message.ActivityType.ACT_TYPE_CONTINUELOGIN //连续七天登陆
                        || v.type == message.ActivityType.ACT_TYPE_BUFFS //BUFF
                        || v.type == message.ActivityType.ACT_TYPE_OTHER //线下活动
                        || v.type == message.ActivityType.ACT_TYPE_ADVERTISEMENT //广告
                        || v.type == message.ActivityType.ACT_TYPE_LOTTERY_DOUBLING //酒馆积分
                        || v.type == message.ActivityType.ACT_TYPE_CHARGEDAILY) {
                        data.push(v);
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_MISSION) {
                        if (v.rewardIndex.length != v.missions.length) {
                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_CHARGEADD) {
                        if (v.rewardIndex.length != v.rewardZone.length) {
                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_COLLECT) {
                        var _loop_1 = function (kk) {
                            var vv = v.exchanges;
                            var bIsGet = zj.Table.FindF(v.kvInfos, function (key, vvv) {
                                //已兑换完
                                return vvv.key == vv.index && vvv.value >= vv.exchangeCount;
                            });
                            if (!bIsGet) {
                                data.push(v);
                            }
                        };
                        for (var kk in v.exchanges) {
                            _loop_1(kk);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_MONTHFIT) {
                        var reward_has_get = zj.Table.FindF(v.rewardIndex, function (_k, _v) {
                            return _v == 1;
                        });
                        if (!reward_has_get) {
                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_CONSUME) {
                        if (v.rewardIndex.length != v.rewardZone.length) {
                            data.push[v];
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_END) {
                        if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lotteryRewards.length != v.rewardZone.length) {
                            data.push[v];
                        }
                    }
                }
            }
            return data;
        };
        /**
         * 返回成就任务
         */
        PlayerMissionSystem.prototype.listForAchieve = function () {
            var _this = this;
            var list = [[], [], [], []]; // [[可领取], [未完成], [已完成], [未开锁]]
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.missionMap); _i < _a.length; _i++) {
                var _b = _a[_i], v = _b[0], k = _b[1];
                if (k.type == message.MissionType.MISSION_TYPE_ACHIEVE) {
                    var _c = this.itemComplete(v), isdo = _c[0], todo = _c[1], isLock = _c[2];
                    if (isdo >= todo && (!k.isFinish) && (!isLock)) {
                        list[0].push(v);
                    }
                    else if (isdo < todo && (!k.isFinish) && (!isLock)) {
                        list[1].push(v);
                    }
                    else if (k.isFinish && !isLock) {
                        list[2].push(v);
                    }
                    else if (isLock) {
                        list[3].push(v);
                    }
                }
            }
            list[0].sort(function (a, b) {
                var typeInfoA = _this.itemSubType(a).sort == "" && 0 || Number(_this.itemSubType(a).sort);
                var typeInfoB = _this.itemSubType(b).sort == "" && 0 || Number(_this.itemSubType(b).sort);
                return typeInfoA - typeInfoB;
            });
            list[2].sort(function (a, b) {
                var typeInfoA = _this.itemSubType(a).sort == "" && 0 || Number(_this.itemSubType(a).sort);
                var typeInfoB = _this.itemSubType(b).sort == "" && 0 || Number(_this.itemSubType(b).sort);
                return typeInfoA - typeInfoB;
            });
            list[1].sort(function (a, b) {
                var _a = _this.itemComplete(a), isdo_a = _a[0], todo_a = _a[1];
                var _b = _this.itemComplete(a), isdo_b = _b[0], todo_b = _b[1];
                var typeInfoA = _this.itemSubType(a).sort == "" && 0 || Number(_this.itemSubType(a).sort);
                var typeInfoB = _this.itemSubType(b).sort == "" && 0 || Number(_this.itemSubType(b).sort);
                if ((isdo_a / todo_a) == (isdo_b / todo_b)) {
                    return typeInfoA - typeInfoB;
                }
                else {
                    return (isdo_b / todo_b) - (isdo_a / todo_a);
                }
            });
            list[3].sort(function (a, b) {
                var missionA = _this.missionMap[a];
                var tblTypeA = _this.itemType(missionA.type, missionA.subType);
                var missionB = _this.missionMap[b];
                var tblTypeB = _this.itemType(missionB.type, missionB.subType);
                var typeInfoA = _this.itemSubType(a).sort == "" && 0 || Number(_this.itemSubType(a).sort);
                var typeInfoB = _this.itemSubType(b).sort == "" && 0 || Number(_this.itemSubType(b).sort);
                if (tblTypeA.open_level == tblTypeB.open_level) {
                    return typeInfoA - typeInfoB;
                }
                else {
                    return tblTypeA.open_level - tblTypeB.open_level;
                }
            });
            var mission = [];
            for (var _d = 0, _e = zj.HelpUtil.GetKV(list); _d < _e.length; _d++) {
                var _f = _e[_d], _ = _f[0], k = _f[1];
                for (var _g = 0, _h = zj.HelpUtil.GetKV(k); _g < _h.length; _g++) {
                    var _j = _h[_g], _1 = _j[0], kk = _j[1];
                    mission.push(kk);
                }
            }
            return mission;
        };
        /**
         * 返回日常任务
         */
        PlayerMissionSystem.prototype.listForLive = function () {
            var _this = this;
            var list = [[], [], [], []];
            var mission = [];
            // 未完成 已完成
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.missionMap); _i < _a.length; _i++) {
                var _b = _a[_i], v = _b[0], k = _b[1];
                if (k.type == message.MissionType.MISSION_TYPE_DAILY) {
                    if ((k.subType != message.MissionSubType.MISSION_SUB_TYPE_PRAISE &&
                        // k.subType != message.MissionSubType.MISSION_SUB_TYPE_VIP_DAILY_REWARD && 
                        k.subType != message.MissionSubType.MISSION_SUB_TYPE_NORMAL_MONTH &&
                        k.subType != message.MissionSubType.MISSION_SUB_TYPE_SENIOR_MONTH) || !zj.Device.isReviewSwitch) {
                        var index = this.itemIndex(k.type, k.subType);
                        if (this.itemComplete(index) == zj.TableEnum.EnumDailyLive.finished) {
                            list[0].push(index);
                        }
                        else if (this.itemComplete(index) == zj.TableEnum.EnumDailyLive.unfinished) {
                            list[1].push(index);
                        }
                        else if (this.itemComplete(index) == zj.TableEnum.EnumDailyLive.unOpened) {
                            list[2].push(index);
                        }
                    }
                }
            }
            var _get_start_id = function (index) {
                return _this.itemType(_this.missionMap[index].type, _this.missionMap[index].subType).start_id;
            };
            var _get_level = function (index) {
                return _this.itemType(_this.missionMap[index].type, _this.missionMap[index].subType).open_level;
            };
            list[1].sort(function (a, b) {
                return _get_start_id(a) - _get_start_id(b);
            });
            list[2].sort(function (a, b) {
                return _get_level(a) - _get_level(b);
            });
            for (var _c = 0, _d = zj.HelpUtil.GetKV(list); _c < _d.length; _c++) {
                var _e = _d[_c], _ = _e[0], k = _e[1];
                for (var _f = 0, _g = zj.HelpUtil.GetKV(k); _f < _g.length; _f++) {
                    var _h = _g[_f], _2 = _h[0], kk = _h[1];
                    mission.push(kk);
                }
            }
            return mission;
        };
        /**
         * 返回主线任务
         */
        PlayerMissionSystem.prototype.listForTask = function () {
            var tb = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.missionMap); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.type == message.MissionType.MISSION_TYPE_MAIN) {
                    tb.push(v);
                }
            }
            var result = null;
            for (var _c = 0, _d = zj.HelpUtil.GetKV(tb); _c < _d.length; _c++) {
                var _e = _d[_c], k = _e[0], v = _e[1];
                if (result == null) {
                    result = v;
                }
                else {
                    result = zj.yuan3(v.missionId > result.missionId, v, result);
                }
            }
            return result;
        };
        PlayerMissionSystem.prototype.listSpecial = function () {
            var tbl = zj.TableUplevelReward.Table();
            var tbls = [];
            var list = [[], []];
            var mission = [];
            var _loop_2 = function (v, k) {
                if (k.index > 1000)
                    return "continue";
                var monthReward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.monthReward, function (kk, vv) {
                    return vv == k.index;
                });
                if (monthReward) {
                    list[1].push(k);
                }
                else {
                    list[0].push(k);
                }
            };
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl); _i < _a.length; _i++) {
                var _b = _a[_i], v = _b[0], k = _b[1];
                _loop_2(v, k);
            }
            list[1].sort(function (a, b) {
                return a.index - b.index;
            });
            list[0].sort(function (a, b) {
                return a.index - b.index;
            });
            for (var _c = 0, _d = zj.HelpUtil.GetKV(list); _c < _d.length; _c++) {
                var _e = _d[_c], _ = _e[0], k = _e[1];
                for (var _f = 0, _g = zj.HelpUtil.GetKV(k); _f < _g.length; _f++) {
                    var _h = _g[_f], _3 = _h[0], kk = _h[1];
                    mission.push(kk);
                }
            }
            return mission;
        };
        /**
         * 返回任务完成情况
         */
        PlayerMissionSystem.prototype.itemComplete = function (index) {
            var mission = this.missionMap[index];
            var tbl = this.itemInfo(mission.missionId);
            var tbl_next = this.itemInfo(Number(mission.missionId) + 1);
            var isLock;
            if (mission.type == message.MissionType.MISSION_TYPE_MAIN ||
                mission.type == message.MissionType.MISSION_TYPE_JEWEL) {
                tbl = this.itemMain(mission.missionId);
                tbl_next = tbl.next_id;
            }
            var tblType = null;
            if (mission.type != message.MissionType.MISSION_TYPE_MAIN &&
                mission.type != message.MissionType.MISSION_TYPE_JEWEL) {
                tblType = this.itemType(mission.type, mission.subType);
                if (tblType == null) {
                    zj.toast_warning("mission_table is error~~~ " + "type = " + mission.type + ", subType = " + mission.subType);
                    return;
                }
                if (tblType == null || tblType.open_level == null) {
                    isLock = false;
                }
                else {
                    isLock = tblType.open_level > zj.Game.PlayerInfoSystem.BaseInfo.level;
                }
            }
            var isdo = mission.value;
            var todo = tbl.condition;
            var isOver = (mission.isFinish && (!tbl_next || tbl_next == ""));
            if (mission.type == message.MissionType.MISSION_TYPE_ACHIEVE) {
                if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_UPLEVEL) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE) {
                    if (isdo >= todo) {
                        isdo = 5;
                    }
                    else {
                        isdo = isdo % 100000 % 5;
                    }
                    todo = 5;
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE) {
                    var max = 0;
                    for (var _i = 0, _a = zj.HelpUtil.GetKV(mission.valueEx); _i < _a.length; _i++) {
                        var _b = _a[_i], kk = _b[0], vv = _b[1];
                        if (vv > max) {
                            max = vv;
                        }
                    }
                    isdo = max;
                    isdo = zj.yuan3(isdo >= todo, 1, 0);
                    todo = 1;
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_VISITOR) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_CNT) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPLEVEL) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPSTAR) {
                    isdo = isdo;
                    todo = todo;
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR) {
                    for (var _c = 0, _d = zj.HelpUtil.GetKV(mission.valueEx); _c < _d.length; _c++) {
                        var _e = _d[_c], v = _e[0], k = _e[1];
                        if (Math.floor(k / 10000) == Math.floor(todo / 10000)) {
                            isdo = k % 10000;
                        }
                    }
                    todo = todo % 10000;
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_APT_NUM) {
                    for (var _f = 0, _g = zj.HelpUtil.GetKV(mission.valueEx); _f < _g.length; _f++) {
                        var _h = _g[_f], v = _h[0], k = _h[1];
                        if (Math.floor(k / 10000) == Math.floor(todo / 10000)) {
                            isdo = k % 10000;
                        }
                    }
                    todo = todo % 10000;
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_FREIND) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_ENEMY) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_USE_LEAGUECOIN) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TOWER) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_JOIN) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_DONATE) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_CHAT_WORLD) {
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SOUL ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_ARREST ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_HUNT) {
                    todo = todo % 10000;
                    isdo = isdo % 10000;
                    if (isdo > todo) {
                        isdo = todo;
                    }
                }
            }
            else if (mission.type == message.MissionType.MISSION_TYPE_DAILY) {
                var state = null;
                if ((tblType.open_level != 0 && tblType.open_level > zj.Game.PlayerInfoSystem.BaseInfo.level)
                    || (tblType.open_level == 0 && tblType.open_instance != 0 && !zj.Game.PlayerInstanceSystem.Set(tblType.open_instance).Clear)) {
                    state = zj.TableEnum.EnumDailyLive.unOpened;
                }
                else if (tbl.condition > mission.value && !mission.isFinish) {
                    state = zj.TableEnum.EnumDailyLive.unfinished;
                }
                else if (tbl.condition <= mission.value && !mission.isFinish) {
                    state = zj.TableEnum.EnumDailyLive.finished;
                }
                else if (tbl.condition <= mission.value && mission.isFinish) {
                    state = zj.TableEnum.EnumDailyLive.rewarded;
                }
                if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_MONTH
                    || mission.subType == message.MissionSubType.MISSION_SUB_TYPE_SENIOR_MONTH) {
                    // if (Bit._rshift(mission.value, 31) == 0) {
                    //     state = TableEnum.EnumDailyLive.unfinished;
                    // }
                    if ((mission.value >> 31) == 0) {
                        state = zj.TableEnum.EnumDailyLive.unfinished;
                    }
                }
                return state;
            }
            else if (mission.type == message.MissionType.MISSION_TYPE_MAIN ||
                mission.type == message.MissionType.MISSION_TYPE_JEWEL) {
                if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPLEVEL ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPSTAR ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TOWER ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SOUL ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_STAR ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_UPLEVEL ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_ARREST ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_HUNT) {
                    isdo = zj.yuan3(isdo >= todo, 1, 0);
                    todo = 1;
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE) {
                    var max = 0;
                    for (var _j = 0, _l = zj.HelpUtil.GetKV(mission.valueEx); _j < _l.length; _j++) {
                        var _m = _l[_j], kk = _m[0], vv = _m[1];
                        if (vv > max) {
                            max = vv;
                        }
                    }
                    isdo = max;
                    isdo = zj.yuan3(isdo >= todo, 1, 0);
                    todo = 1;
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR) {
                    for (var _o = 0, _p = zj.HelpUtil.GetKV(mission.valueEx); _o < _p.length; _o++) {
                        var _q = _p[_o], v = _q[0], k = _q[1];
                        if (Math.floor(k / 10000) == Math.floor(todo / 10000)) {
                            isdo = k % 10000;
                        }
                    }
                    todo = todo % 10000;
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_LEVEL_NUM ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_TIMES ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY_NUM) {
                    todo = Math.floor(todo / 100000);
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR_USEBUFF ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE_USEBUFF ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE_NUMBER ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX_USEBUFF) {
                    todo = 1;
                }
            }
            else if (mission.type == message.MissionType.MISSION_TYPE_LICENCE) {
                var subId = mission.subType;
                var info = this.missionMap[index];
                var missionId = info.missionId;
                var state = null;
                var star_list = this.GetItemMissionId(index);
                var condition = this.itemInfo(missionId).condition;
                var max = 0;
                var value = void 0;
                for (var _r = 0, _s = zj.HelpUtil.GetKV(star_list); _r < _s.length; _r++) {
                    var _t = _s[_r], kk = _t[0], vv = _t[1];
                    if (subId == 25 || subId == 2) {
                        value = mission.value;
                    }
                    else if (subId == 55) {
                        value = mission.value % this.MISSION;
                        condition = condition;
                    }
                    else {
                        for (var _u = 0, _w = zj.HelpUtil.GetKV(mission.valueEx); _u < _w.length; _u++) {
                            var _x = _w[_u], kk_1 = _x[0], vv_1 = _x[1];
                            if (vv_1 > max) {
                                max = vv_1;
                            }
                        }
                        value = max;
                    }
                }
                for (var _y = 0, _z = zj.HelpUtil.GetKV(star_list); _y < _z.length; _y++) {
                    var _0 = _z[_y], kk = _0[0], vv = _0[1];
                    if (condition <= value && !mission.isFinish) {
                        state = zj.TableEnum.EnumDailyLive.finished;
                    }
                    else if (condition > value && !mission.isFinish) {
                        state = zj.TableEnum.EnumDailyLive.unfinished;
                    }
                    else if (mission.isFinish) {
                        state = zj.TableEnum.EnumDailyLive.rewarded;
                    }
                }
                return state;
            }
            if (isdo >= todo) {
                isdo = todo;
            }
            var isCanGet = (isdo == todo && !mission.isFinish);
            var percent = isdo / todo;
            return [isdo, todo, isLock, isOver, percent, isCanGet];
        };
        /**
         * 返回通行证任务完成情况
         */
        PlayerMissionSystem.prototype.battlePassComplete = function (missionType, id) {
            var mission = this.missionMap[missionType.index];
            var tbl = this.itemInfo(id);
            var isLock;
            var _a = [mission.value, tbl.condition, false], isdo = _a[0], todo = _a[1], isOver = _a[2];
            if (missionType.type == message.MissionType.MISSION_TYPE_WEEK_REFRESH || missionType.type == message.MissionType.MISSION_TYPE_MONTH_REFRESH) {
                if (missionType == null) {
                    zj.toast_warning("mission_table is error~~~ " + "type = " + missionType.type + ", subType = " + mission.subType);
                    return;
                }
                if (missionType == null || missionType.open_level == null) {
                    isLock = false;
                }
                else {
                    isLock = missionType.open_level > zj.Game.PlayerInfoSystem.BaseInfo.level;
                }
            }
            if (missionType.sub_type == message.MissionSubType.MISSION_SUB_TYPE_USE_POWER) {
                isdo = mission.value;
                todo = tbl.condition;
                isOver = isdo >= todo;
                // (mission.isFinish && (!tbl_next || tbl_next == ""));
            }
            if (missionType.sub_type == message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM
                || missionType.sub_type == message.MissionSubType.MISSION_SUB_TYPE_HUNTER_UPSTARTIME
                || missionType.sub_type == message.MissionSubType.MISSION_SUB_TYPE_END
                || missionType.sub_type == message.MissionSubType.MISSION_SUB_TYPE_TYPE_SEARCH) {
                for (var _i = 0, _b = zj.HelpUtil.GetKV(mission.valueEx); _i < _b.length; _i++) {
                    var _c = _b[_i], v = _c[0], k = _c[1];
                    if (Math.floor(k / 10000) == Math.floor(todo / 10000))
                        isdo = k % 10000;
                }
                todo = todo % 10000;
            }
            if (isdo >= todo) {
                isdo = todo;
            }
            var isCanGet = (isdo >= todo && (id >= mission.missionId) && !mission.isFinish);
            var percent = isdo / todo;
            return [isdo, todo, isLock, isOver, percent, isCanGet];
        };
        PlayerMissionSystem.prototype.itemCompleteForBattlePass = function (mission, id) {
            var _a = zj.Game.PlayerMissionSystem.battlePassComplete(mission, id), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4], isCanGet = _a[5];
            var info = { isDo: isdo, toDo: todo, finish: isCanGet, };
            return info;
        };
        PlayerMissionSystem.prototype.itemCompleteForLive = function (index) {
            var state = this.itemComplete(index);
            return state == zj.TableEnum.EnumDailyLive.finished;
        };
        PlayerMissionSystem.prototype.itemCompleteForAchieve = function (index) {
            var _a = this.itemComplete(index) == null ? [false, false, false, false, false, false] : this.itemComplete(index), isdo = _a[0], todo = _a[1], isLock = _a[2], isOver = _a[3], percent = _a[4], bCanGet = _a[5];
            return bCanGet;
        };
        /**
         * 主线
         */
        PlayerMissionSystem.prototype.itemCompleteForMain = function (index) {
            var _a = zj.Game.PlayerMissionSystem.itemComplete(index), isdo = _a[0], todo = _a[1], aa = _a[2], isOver = _a[3], bb = _a[4], isCanGet = _a[5];
            var info = {
                isDo: isdo,
                toDo: todo,
                finish: isCanGet,
            };
            return info;
        };
        /**
         * 跳转
         */
        PlayerMissionSystem.prototype.getMission = function (mainType, subType) {
            var _INDEX_FUNC = (_a = {},
                _a[1] = this.goto_instance_normal,
                _a[2] = this.goto_instance_normal,
                _a[3] = this.goto_instance_elite,
                _a[4] = this.goto_other_tavern,
                _a[5] = this.goto_hunter_strength,
                _a[6] = this.goto_other_tavern,
                _a[7] = this.goto_hero_grade,
                _a[8] = this.goto_hero_grade,
                _a[9] = this.goto_hero_grade,
                _a[10] = this.goto_hero_grade,
                _a[11] = this.goto_other_charge,
                _a[12] = this.goto_other_charge,
                _a[13] = this.goto_hero_grade,
                _a[14] = this.goto_hero_talent,
                _a[15] = this.goto_hero_talent,
                _a[16] = this.goto_do_nothing,
                _a[17] = this.goto_scene_wonder,
                _a[18] = this.goto_do_nothing,
                _a[19] = this.goto_arena_mall,
                _a[20] = this.goto_instance_arena,
                _a[21] = this.goto_friend,
                _a[22] = this.goto_nothing,
                _a[23] = this.goto_league_mall,
                _a[24] = this.goto_nothing,
                _a[25] = this.goto_instance_tower,
                _a[26] = this.goto_scene_league,
                _a[27] = this.goto_scene_league,
                _a[28] = this.goto_nothing,
                _a[29] = this.goto_star_street_4,
                _a[30] = this.goto_star_street_5,
                _a[31] = this.goto_instance_normal,
                _a[32] = this.goto_instance_elite,
                _a[33] = this.goto_star_street_6,
                _a[34] = this.goto_instance_tower,
                _a[35] = this.goto_instance_arena,
                _a[36] = this.goto_hero_skill,
                _a[37] = this.goto_other_money,
                _a[38] = this.goto_instance_normal,
                _a[39] = this.goto_scene_wanted,
                _a[40] = this.goto_nothing,
                _a[41] = this.goto_scene_mine,
                _a[42] = this.goto_scene_mine,
                _a[43] = this.goto_scene_mine,
                _a[44] = this.goto_nothing,
                _a[45] = this.goto_scene_wonder,
                _a[46] = this.goto_scene_wonder,
                _a[47] = this.goto_hero_adviser,
                _a[48] = this.goto_other_charge,
                _a[49] = this.goto_hero_grade,
                _a[50] = this.goto_do_nothing,
                _a[51] = this.goto_scene_league,
                _a[52] = this.goto_card,
                _a[53] = this.goto_star_street_num,
                _a[54] = this.goto_scene_league,
                _a[55] = this.goto_star_street_1,
                _a[56] = this.goto_star_street_2,
                _a[57] = this.goto_star_street_3,
                _a[58] = this.goto_scene_wonder,
                _a[59] = this.goto_scene_wanted,
                // [60] : this.goto_scene_wanted,            //通缉令
                _a[61] = this.goto_card,
                _a[60] = this.goto_instance_arena,
                _a[62] = this.goto_explore,
                _a[64] = this.goto_card,
                _a[65] = this.goto_card,
                _a[66] = this.goto_opend_card,
                _a[67] = this.goto_friend,
                _a[68] = this.goto_card,
                _a[69] = this.goto_star_street_4,
                _a[70] = this.goto_star_street_5,
                _a[71] = this.goto_star_street_6,
                _a[72] = this.goto_general_upstar,
                _a[73] = this.goto_group_fight,
                _a[74] = this.goto_do_nothing,
                _a[79] = this.goto_card,
                _a[96] = this.goto_instance_tower,
                _a[95] = this.goto_hero_grade,
                _a[97] = this.goto_relice,
                _a[99] = this.goto_work,
                _a);
            // if (!Table.VIn(message.MissionType, mainType) || !Table.VIn(message.MissionSubType, subType)) {
            //     return _INDEX_FUNC[subType];
            // }
            // else {
            //     return this.goto_nothing;
            // }
            var aa = false;
            var bb = false;
            for (var key in message.MissionType) {
                if (Number(message.MissionType[key]) == mainType) {
                    aa = true;
                }
            }
            for (var key in message.MissionSubType) {
                if (Number(message.MissionSubType[key]) == mainType) {
                    bb = true;
                }
            }
            if (aa && bb) {
                return _INDEX_FUNC[subType];
            }
            else {
                return this.goto_nothing;
            }
            var _a;
        };
        /**
         * 与时间赛跑完成
         * @param index 索引
         */
        PlayerMissionSystem.prototype.raceItemComplete = function (index) {
            var mission = this.missionMap[index];
            var tbl = this.MissionItem(mission.missionId);
            var isLock;
            var tblType = this.itemType(mission.type, mission.subType);
            if (tblType == null || tblType.open_level == null) {
                isLock = false;
            }
            else {
                isLock = tblType.open_level > zj.Game.PlayerInfoSystem.BaseInfo.level;
            }
            var isdo = mission.value;
            var todo = tbl.condition;
            var isOver = mission.isFinish;
            if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPLEVEL ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPSTAR ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TOWER ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SOUL ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_STAR ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_UPLEVEL) {
                isdo = zj.yuan3(isdo >= todo, 1, 0);
                todo = 1;
            }
            else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE) {
                var max = 0;
                for (var _i = 0, _a = zj.HelpUtil.GetKV(mission.valueEx); _i < _a.length; _i++) {
                    var _b = _a[_i], kk = _b[0], vv = _b[1];
                    if (vv > max) {
                        max = vv;
                    }
                }
                isdo = max;
                isdo = zj.yuan3(isdo >= todo, 1, 0);
                todo = 1;
            }
            else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR) {
                for (var v in mission.valueEx) {
                    var k = mission.valueEx[v];
                    if (Math.floor(k / 10000) == Math.floor(todo / 10000)) {
                        isdo = k % 10000;
                    }
                }
                todo = todo % 10000;
            }
            else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_LEVEL_NUM ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_TIMES ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY_NUM) {
                todo = Math.floor(todo / 100000);
            }
            else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR_USEBUFF ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE_USEBUFF ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE_NUMBER ||
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX_USEBUFF) {
                todo = 1;
            }
            if (isdo >= todo) {
                isdo = todo;
            }
            var isCanGet = (isdo == todo && !mission.isFinish);
            var percent = isdo / todo;
            return [isdo, todo, isLock, isOver, percent, isCanGet];
        };
        PlayerMissionSystem.prototype.NoviceCanReward = function (type) {
            var _this = this;
            var newThis = this;
            var a = [];
            var dayIdx = Math.min(7, zj.Helper.day());
            for (var i = 1; i <= dayIdx; i++) {
                for (var k in zj.TableEnum.Enum.NoviceMissionType[type][i]) {
                    var v = zj.TableEnum.Enum.NoviceMissionType[type][i][k];
                    a.push(v);
                }
            }
            var bFind = zj.Table.FindF(a, function (k, subType) {
                var id = newThis.itemIndex(zj.TableEnum.Enum.TableNoviceMissionType[type - 1], subType);
                var mission = newThis.missionMap[id];
                var info = newThis.itemInfo(mission.missionId);
                if (subType == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_USE_POWER ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_TOWER ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_EGG_TIMES ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_DONATE ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPSTARTIME ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_LADDER_NUMBER ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_HUNT ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_INSTANCE_SEARCH ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_AWAKEN ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_BUY_POWER ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_INSTANCE ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_WONDERLAND_COLLECTION ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_GET_RUNES ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_BREAK ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_CARD_HONG ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_ZI ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_HONG ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_CARD_ZI ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_CARD_CHENG ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_CHENG) {
                    return mission.value >= info.condition && !mission.isFinish;
                }
                else if (subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX) {
                    return mission.value % 10000 >= info.condition && !mission.isFinish;
                }
                else if (subType == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
                    return mission.value <= info.condition && !mission.isFinish;
                }
                else {
                    if (mission.valueEx.length != 0) {
                        var mk = zj.Helper.MissionProgress(mission.valueEx, Math.floor(info.condition / 10000));
                        return mk >= info.condition % 10000 && !mission.isFinish;
                    }
                    else {
                        return false;
                    }
                }
            });
            var vis = function () {
                var dayIdx = Math.min(7, zj.Helper.day());
                for (var i = 1; i <= dayIdx; i++) {
                    if (_this.sad(i)) {
                        i = 8;
                        return true;
                    }
                    ;
                }
                return false;
            };
            return bFind || vis();
        };
        PlayerMissionSystem.prototype.NoviceCanRewardEnd = function (type) {
            var newThis = this;
            var a = [];
            for (var i = 1; i <= zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length; i++) {
                for (var k in zj.TableEnum.Enum.NoviceMissionType[type][i]) {
                    var v = zj.TableEnum.Enum.NoviceMissionType[type][i][k];
                    a.push(v);
                }
            }
            var bOver = this.alltrue(a, function (k, subType) {
                var id = newThis.itemIndex(zj.TableEnum.Enum.TableNoviceMissionType[type - 1], subType);
                var mission = newThis.missionMap[id];
                var _type = newThis.itemType(mission.type, mission.subType);
                // 计算任务数量
                var ROW_ITEM = _type.end_id - _type.start_id + 1;
                return mission.missionId % 10 == ROW_ITEM && mission.isFinish == true;
            });
            var bReward = null;
            if (type == zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL) {
                bReward = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward;
            }
            else {
                bReward = zj.Table.FindK(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, zj.TableEnum.Enum.TableNoviceMissionType[type - 1]) != -1;
            }
            var count = bOver && !bReward;
            return count;
        };
        PlayerMissionSystem.prototype.sad = function (index) {
            var missionGift = [];
            for (var i = 1; i <= 7; i++) {
                var a = [];
                for (var j = 1; j <= 4; j++) {
                    a.push(zj.TableMissionGift.Table()[(j + "0" + i)]);
                }
                missionGift.push(a);
            }
            var vis1 = false;
            var _loop_3 = function (i) {
                var vis = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, function (k, v) {
                    return v == missionGift[index - 1][i].index;
                });
                if (i == 0) {
                    if (!vis) {
                        vis1 = true;
                        i = 4;
                    }
                }
                else if (i == 3) {
                    if (!vis && (zj.Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 > missionGift[index - 1][3].charge_token / 10)) {
                        vis1 = true;
                        i = 4;
                    }
                }
                out_i_1 = i;
            };
            var out_i_1;
            for (var i = 0; i < missionGift[index - 1].length; i++) {
                _loop_3(i);
                i = out_i_1;
            }
            return vis1;
        };
        PlayerMissionSystem.prototype.WeekMissionCanReward = function (mission_types) {
            var _this = this;
            var mk = 0;
            var bFind = zj.Table.FindF(mission_types, function (k, id) {
                var mission = _this.missionMap[id];
                var info = _this.itemInfo(mission.missionId);
                if (_this.itemMissionWeekValNormalType(id)) {
                    return mission.value >= info.condition && !mission.isFinish;
                }
                else {
                    if (mission.valueEx.length != 0) {
                        mk = zj.Helper.MissionProgress(mission.valueEx, Math.floor(info.condition / 10000));
                        return mk >= info.condition % 10000 && !mission.isFinish;
                    }
                    else {
                        return false;
                    }
                }
            });
            return bFind;
        };
        //////////////////////////跳转副本类型/////////////////////////////
        PlayerMissionSystem.prototype.goto_instance_normal = function () {
            // loadUI(Adventurems)
            //     .then((dialog: Adventurems) => {
            //         dialog.LoadFromBattleNormal(true);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
            zj.SceneManager.instance.EnterAdventure(1);
        };
        PlayerMissionSystem.prototype.goto_instance_elite = function () {
            // loadUI(Adventurems)
            //     .then((dialog: Adventurems) => {
            //         dialog.LoadFromBattleElite(true);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
            zj.SceneManager.instance.EnterAdventure(2);
        };
        PlayerMissionSystem.prototype.goto_explore = function () {
            zj.loadUI(zj.WorkSendMain).then(function (scene) {
                scene.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        PlayerMissionSystem.prototype.goto_instance_exp = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.BASTILLEEXP, true)) {
                // loadUI(Bastille_Main)
                //     .then((dialog: Bastille_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        };
        PlayerMissionSystem.prototype.goto_instance_money = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.BASTILLE, true)) {
                // loadUI(Bastille_Main)
                //     .then((dialog: Bastille_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        };
        PlayerMissionSystem.prototype.goto_instance_tower = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.TOWER, true)) {
                zj.loadUI(zj.SkyAreanMainScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.Init();
                });
            }
        };
        PlayerMissionSystem.prototype.goto_instance_arena = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.ARENA, true)) {
                zj.loadUI(zj.ArenaMainScene)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        //////////////////////////跳转场景类型/////////////////////////////
        PlayerMissionSystem.prototype.goto_scene_wonder = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.WONDERLAND, true)) {
                zj.SceneManager.instance.EnterSceneZorkBoss();
            }
        };
        PlayerMissionSystem.prototype.goto_scene_league = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.LEAGUE, true)) {
                zj.Game.PlayerMissionSystem.ReqLeague()
                    .then(function (value) {
                    if (zj.Game.PlayerInfoSystem.BaseInfo.leagueId == 0) {
                        zj.loadUI(zj.LeagueChooseScene)
                            .then(function (dialog) {
                            dialog.init();
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                    }
                    else {
                        zj.loadUI(zj.LeagueHomeScene)
                            .then(function (dialog) {
                            dialog.init();
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                    }
                })
                    .catch(function (reason) {
                    zj.toast(zj.Helper.GetErrorString(reason));
                });
            }
        };
        //////////////////////////跳转商铺类型/////////////////////////////
        PlayerMissionSystem.prototype.goto_normal_mall = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.MALL, true)) {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(zj.TableEnum.Enum.Mall.NORMAL);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_arena_mall = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.ARENA, true)) {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(zj.TableEnum.Enum.Mall.ARENA);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_league_mall = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.LEAGUE, true) && zj.PlayerHunterSystem.LevelDBOpenLeague(true) && zj.Game.PlayerInfoSystem.LeagueId != 0) {
                zj.loadUI(zj.ShopMallDialog)
                    .then(function (dialog) {
                    dialog.load(zj.TableEnum.Enum.Mall.LEAGUE);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        //////////////////////////跳转主城类型/////////////////////////////
        PlayerMissionSystem.prototype.goto_scene_wanted = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.ARREST, true)) {
                zj.loadUI(zj.WantedSecondMeteorstanceScene)
                    .then(function (dialog) {
                    dialog.Init(1);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_scene_mine = function () {
            // if (PlayerMissionSystem.FunOpenTo(FUNC.MINE, true)) {
            // }
        };
        PlayerMissionSystem.prototype.goto_hero_grade = function () {
            zj.loadUI(zj.HunterMainScene)
                .then(function (Scene) {
                Scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        PlayerMissionSystem.prototype.goto_hero_fate = function () {
            zj.loadUI(zj.HunterMainScene)
                .then(function (Scene) {
                Scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        PlayerMissionSystem.prototype.goto_hero_skill = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.SKILL, true)) {
                zj.loadUI(zj.HunterMainScene)
                    .then(function (Scene) {
                    Scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_hero_talent = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.TALENT, true)) {
                zj.loadUI(zj.HunterMainScene)
                    .then(function (Scene) {
                    Scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_hero_stren = function () {
            // if (PlayerMissionSystem.FunOpenTo(FUNC.STRENGTH, true)) {
            // }
        };
        PlayerMissionSystem.prototype.goto_hero_forge = function () {
            // if (PlayerMissionSystem.FunOpenTo(FUNC.FORGE, true)) {
            // }
        };
        PlayerMissionSystem.prototype.goto_hero_carve = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.CARVE, true)) {
                zj.loadUI(zj.HunterMainScene)
                    .then(function (Scene) {
                    Scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_hero_adviser = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER, true)) {
                // loadUI(AdviserMain_Main)
                //     .then((dialog: AdviserMain_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        };
        PlayerMissionSystem.prototype.goto_hero_artifact = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.ARTIFACT, true)) {
                // loadUI(Adviser_Main)
                //     .then((dialog: Adviser_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        };
        PlayerMissionSystem.prototype.goto_hunter_strength = function () {
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (Scene) {
                Scene.SetInfo();
                Scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        PlayerMissionSystem.prototype.goto_other_money = function () {
            // loadUI(Money_Main)
            //     .then((dialog: Money_Main) => {
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
        };
        PlayerMissionSystem.prototype.goto_other_charge = function () {
            // PushUI("HXH_PayMall","commonEffect"):LoadFrom(uiFather,Enum.HXHChargeType.Charge,cb)
            // loadUI(HXH_PayMall)
            //     .then((dialog: HXH_PayMall) => {
            //         dialog.LoadFrom(uiFather,Enum.HXHChargeType.Charge,cb);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
        };
        PlayerMissionSystem.prototype.goto_star_street_1 = function () {
            var index = 1;
            var limit_level = zj.PlayerWantedSystem.GetLimitLevel(index);
            if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                zj.loadUI(zj.WantedSecondMeteorstanceScene)
                    .then(function (scene) {
                    //接口
                    scene.Init(1);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        };
        PlayerMissionSystem.prototype.goto_star_street_2 = function () {
            var index = 2;
            var limit_level = zj.PlayerWantedSystem.GetLimitLevel(index);
            if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                zj.loadUI(zj.WantedSecondMeteorstanceScene)
                    .then(function (scene) {
                    //接口
                    scene.Init(2);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        };
        PlayerMissionSystem.prototype.goto_star_street_3 = function () {
            var index = 3;
            var limit_level = zj.PlayerWantedSystem.GetLimitLevel(index);
            if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                zj.loadUI(zj.WantedSecondMeteorstanceScene)
                    .then(function (scene) {
                    //接口
                    scene.Init(3);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        };
        PlayerMissionSystem.prototype.goto_star_street_4 = function () {
            var index = 4;
            var limit_level = zj.PlayerWantedSystem.GetLimitLevel(index);
            if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                zj.loadUI(zj.WantedSecondMeteorstanceScene)
                    .then(function (scene) {
                    //接口
                    scene.Init(4);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        };
        PlayerMissionSystem.prototype.goto_star_street_5 = function () {
            var index = 5;
            var limit_level = zj.PlayerWantedSystem.GetLimitLevel(index);
            if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                zj.loadUI(zj.WantedSecondMeteorstanceScene)
                    .then(function (scene) {
                    //接口
                    scene.Init(5);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        };
        PlayerMissionSystem.prototype.goto_star_street_6 = function () {
            var index = 6;
            var limit_level = zj.PlayerWantedSystem.GetLimitLevel(index);
            if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                zj.loadUI(zj.WantedSecondMeteorstanceScene)
                    .then(function (scene) {
                    //接口
                    scene.Init(6);
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.openLevel, limit_level, zj.TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        };
        PlayerMissionSystem.prototype.goto_general_upstar = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.HEROSTAR, true)) {
                zj.loadUI(zj.HunterMainScene)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_group_fight = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.GROUPFIGHT, true)) {
                zj.loadUI(zj.HXH_GroupFightMain)
                    .then(function (dialog) {
                    dialog.Init();
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_relice = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.DARKLAND2, true)) {
                zj.loadUI(zj.DarkLandHomeScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FILL_OUT);
                    zj.loadUI(zj.RelicMain)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                });
            }
        };
        PlayerMissionSystem.prototype.goto_work = function () {
            zj.loadUI(zj.WorkSendMain).then(function (scene) {
                scene.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        PlayerMissionSystem.prototype.goto_other_month = function () {
        };
        PlayerMissionSystem.prototype.goto_other_rank = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.RANK, true)) {
                // loadUI(Rank_Main)
                //     .then((dialog: Rank_Main) => {
                //         dialog.LoadFrom(this, TableEnum.Enum.Rank.ALL);
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        };
        PlayerMissionSystem.prototype.goto_star_street_num = function (condition) {
            var id = condition % 100000;
            var index = zj.PlayerWantedSystem.Instance(id).type;
            this.fightExt = index;
            zj.loadUI(zj.WantedSecondMeteorstanceScene)
                .then(function (scene) {
                //接口
                scene.Init(index);
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        PlayerMissionSystem.prototype.goto_card = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO, true)) {
                zj.loadUI(zj.CardMainScene)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_other_tavern = function () {
            zj.loadUI(zj.TavernScene)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        PlayerMissionSystem.prototype.goto_other_treasure = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.TREASURE, true)) {
                // loadUI(Treasure_Main)
                //     .then((dialog: Treasure_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        };
        PlayerMissionSystem.prototype.goto_jade = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.JADE, true)) {
                // loadUI(Jade_Main)
                //     .then((dialog: Jade_Main) => {
                //         dialog.load();
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        };
        PlayerMissionSystem.prototype.goto_zork = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.ZORK, true)) {
                // StageSceneManager.Instance.ChangeScene(StageSceneZork);
            }
        };
        PlayerMissionSystem.prototype.goto_opend_card = function () {
            if (PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO, true)) {
                zj.loadUI(zj.CardMainScene)
                    .then(function (dialog) {
                    dialog.addUI(1);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        PlayerMissionSystem.prototype.goto_friend = function () {
            zj.Game.PlayerMissionSystem.ReqRelation()
                .then(function (value) {
                zj.loadUI(zj.Friend_MainFriendSence)
                    .then(function (dialog) {
                    dialog.init();
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            })
                .catch(function (reason) {
                zj.toast(zj.Helper.GetErrorString(reason));
            });
        };
        PlayerMissionSystem.prototype.goto_nothing = function () {
            zj.toast_warning(zj.TextsConfig.TextsConfig_Error.debug_task);
        };
        PlayerMissionSystem.prototype.goto_do_nothing = function () {
        };
        ////////////////////////////////////////////////////////////////
        PlayerMissionSystem.prototype.tableLength = function (table) {
            var len = 0;
            for (var k in table) {
                len++;
            }
            return len;
        };
        PlayerMissionSystem.prototype.beHide = function (fromId) {
            var ret = false;
            if (fromId == 23) {
                var bFirst = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward.length != this.tableLength(zj.TableFirstCharge.Table());
                var noCharge = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.old_chargeToken == 0;
                var info = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
                var haveTime = info.info;
                ret = !(bFirst && noCharge && haveTime);
            }
            else if (fromId == 35) {
                ret = false;
            }
            else if (fromId == 36) {
                ret = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime <= 0;
            }
            else if (fromId == 37) {
                var _a = zj.Table.FindR(this.activities, function (_k, _v) {
                    return _v.type == message.ActivityType.ACT_TYPE_MONTHFIT;
                }), _ = _a[0], index = _a[1];
                ret = index == null;
            }
            else if (fromId == 38) {
                ret = true;
                var find_gift = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (_k, _v) {
                    return _v.gift_index == 100213;
                })[0];
                var gift_info = zj.PlayerGiftSystem.Instance_item(100213);
                if (find_gift != null) {
                    if (find_gift.buy_times < gift_info.buy_times) {
                        ret = false;
                    }
                }
            }
            else if (fromId == 39) {
                var _b = zj.Table.FindR(this.activities, function (_k, _v) {
                    return _v.type == message.ActivityType.ACT_TYPE_CHARGEADD && _v.picId == 2;
                }), _ = _b[0], index = _b[1];
                ret = index == null;
            }
            return ret;
        };
        ///////////////////////////////执照相关////////////////////////////////
        /**
         * 返回执照任务
         */
        PlayerMissionSystem.prototype.listForLicence = function () {
            var info = zj.TableMissionType.Table();
            var list = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(info); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                if (vv.type == message.MissionType.MISSION_TYPE_LICENCE) {
                    list.push(vv);
                }
            }
            var ret = zj.Table.DeepCopy(list);
            ret.sort(function (a, b) {
                return a.index - b.index;
            });
            return ret;
        };
        /**返回高级执照任务 */
        PlayerMissionSystem.prototype.listForHighLicence = function () {
            var info = zj.TableMissionType.Table();
            var list = [];
            for (var k in info) {
                if (info.hasOwnProperty(k)) {
                    var v = info[k];
                    if (v.type == message.MissionType.MISSION_TYPE_HIGH_LICENCE) {
                        list.push(v);
                    }
                }
            }
            var ret = zj.Table.copy(list);
            ret.sort(function (a, b) {
                return a.sort - b.sort;
            });
            return ret;
        };
        /**
         * 执照任务包含的所有子任务
         * @param missionIndex 索引
         */
        PlayerMissionSystem.prototype.GetItemMissionId = function (missionIndex) {
            var mission = this.missionMap[missionIndex];
            var starId = this.itemSubType(missionIndex).start_id;
            var endId = this.itemSubType(missionIndex).end_id;
            var info = zj.TableMissionItem.Table();
            var list = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(info); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                if (vv.id >= starId && vv.id <= endId) {
                    list.push(vv);
                }
            }
            var ret = zj.Table.DeepCopy(list);
            ret.sort(function (a, b) {
                return a.id - b.id;
            });
            return ret;
        };
        PlayerMissionSystem.prototype.GetBattlePassWeekMission = function () {
            var info = zj.TableMissionItem.Table();
            var ret = [];
            for (var key in zj.TableMissionType.Table()) {
                if (zj.TableMissionType.Table().hasOwnProperty(key)) {
                    var element = zj.TableMissionType.Table()[key];
                    if (element.type == message.MissionType.MISSION_TYPE_WEEK_REFRESH) {
                        var _a = [element.start_id, element.end_id], starId = _a[0], endId = _a[1];
                        for (var k in zj.TableMissionItem.Table()) {
                            if (zj.TableMissionItem.Table().hasOwnProperty(k)) {
                                var element1 = zj.TableMissionItem.Table()[k];
                                if (element1.id >= starId && element1.id <= endId) {
                                    ret.push(element1);
                                }
                            }
                        }
                    }
                }
            }
            ret.sort(function (a, b) { return a.id - b.id; });
            return ret;
        };
        PlayerMissionSystem.prototype.GetBattlePassMonthMission = function () {
            var info = zj.TableMissionItem.Table();
            var ret = [];
            for (var key in zj.TableMissionType.Table()) {
                if (zj.TableMissionType.Table().hasOwnProperty(key)) {
                    var element = zj.TableMissionType.Table()[key];
                    if (element.type == message.MissionType.MISSION_TYPE_MONTH_REFRESH) {
                        var _a = [element.start_id, element.end_id], starId = _a[0], endId = _a[1];
                        for (var k in zj.TableMissionItem.Table()) {
                            if (zj.TableMissionItem.Table().hasOwnProperty(k)) {
                                var element1 = zj.TableMissionItem.Table()[k];
                                if (element1.id >= starId && element1.id <= endId) {
                                    ret.push(element1);
                                }
                            }
                        }
                    }
                }
            }
            ret.sort(function (a, b) { return a.id - b.id; });
            return ret;
        };
        /**
         * 获取执照科目对应已完成子任务
         * @param missionIndex 索引
         */
        PlayerMissionSystem.prototype.GetMaxCondition = function (missionIndex) {
            var list = this.GetItemMissionId(missionIndex); // 包含的子任务
            var mission = this.missionMap[missionIndex]; // 服务器传的任务信息
            var subId = this.itemSubType(missionIndex).sub_type; // 任务子类型
            var startId = this.itemSubType(missionIndex).start_id; // 开始任务Id
            var conditionItem = this.itemInfo(startId).condition; // 完成条件
            var max = 1;
            var min = 10000000;
            var list_1 = [];
            var list_2 = [];
            var list_star = [];
            var value;
            // 每个子任务进度
            if (subId == 25 || subId == 2 || subId == 97 || subId == 96) {
                value = mission.value;
            }
            else if (subId == 55 || subId == 69) {
                value = mission.value % this.MISSION;
            }
            else {
                for (var _i = 0, _a = zj.HelpUtil.GetKV(mission.valueEx); _i < _a.length; _i++) {
                    var _b = _a[_i], kk = _b[0], vv = _b[1];
                    if (vv > max) {
                        max = vv;
                    }
                }
                value = max;
            }
            var _loop_4 = function (kk, vv) {
                if (subId == 3) {
                    var isMiss = zj.Table.FindF(mission.valueEx, function (k, v) {
                        return vv.condition == v;
                    });
                    if ((value >= vv.condition && isMiss == true) || (value >= vv.condition || isMiss == null)) {
                        list_2.push(vv);
                        for (var _i = 0, _a = zj.HelpUtil.GetKV(list_2); _i < _a.length; _i++) {
                            var _b = _a[_i], k = _b[0], v = _b[1];
                            if (v.id > max) {
                                max = v.id;
                                if (list_2.length == 1) {
                                    list_star = [];
                                }
                                else if (list_2.length == v.id % this_1.MISSION_BASE % this_1.MISSION) {
                                    list_star = zj.Table.DeepCopy(list_2);
                                }
                                else {
                                    list_star = [];
                                }
                            }
                        }
                    }
                    else if (isMiss == false) {
                        list_1.push(vv);
                        for (var _c = 0, _d = zj.HelpUtil.GetKV(list_1); _c < _d.length; _c++) {
                            var _e = _d[_c], _kk = _e[0], _vv = _e[1];
                            for (var _f = 0, _g = zj.HelpUtil.GetKV(list); _f < _g.length; _f++) {
                                var _h = _g[_f], _k = _h[0], _v = _h[1];
                                if (_vv.id < min) {
                                    min = vv.id;
                                    if (min > _v.id) {
                                        list_star.push(_v);
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    if (value >= vv.condition && value != 0) {
                        list_star.push(vv);
                    }
                }
            };
            var this_1 = this;
            // 每个子任务完成的所有任务信息
            for (var _c = 0, _d = zj.HelpUtil.GetKV(list); _c < _d.length; _c++) {
                var _e = _d[_c], kk = _e[0], vv = _e[1];
                _loop_4(kk, vv);
            }
            return list_star;
        };
        /**
         * 执照科目当前星级
         * @param missionIndex 索引
         */
        PlayerMissionSystem.prototype.GetMaxStar = function (missionIndex) {
            var star_list = this.GetMaxCondition(missionIndex);
            var subId = this.itemSubType(missionIndex).sub_type;
            var mission = this.missionMap[missionIndex];
            var startId = this.itemSubType(missionIndex).start_id;
            var conditionItem = this.itemInfo(startId).condition;
            var maxCondition = 0;
            var maxStar = 0;
            var value;
            if (subId == 25 || subId == 2 || subId == 97 || subId == 96) {
                value = mission.value;
            }
            else if (subId == 55 || subId == 69) {
                value = mission.value % this.MISSION;
            }
            else {
                var max = 1;
                for (var _i = 0, _a = zj.HelpUtil.GetKV(mission.valueEx); _i < _a.length; _i++) {
                    var _b = _a[_i], kk = _b[0], vv = _b[1];
                    if (vv > max) {
                        max = vv;
                    }
                }
                value = max;
            }
            if (star_list == null) {
                maxStar = 0;
            }
            if (subId == 55 || subId == 25 || subId == 69 || subId == 97 || subId == 96) {
                if (mission.value < conditionItem) {
                    maxStar = 0;
                }
            }
            else {
                if (value % this.MISSION_BASE < 1) {
                    maxStar = 0;
                }
            }
            for (var _c = 0, _d = zj.HelpUtil.GetKV(star_list); _c < _d.length; _c++) {
                var _e = _d[_c], kk = _e[0], vv = _e[1];
                if (vv.condition > maxCondition) {
                    maxCondition = vv.condition;
                    maxStar = vv.star;
                }
            }
            return maxStar;
        };
        /**
         * 满足猎人执照考试条件的任务索引
         * @param focusCur 索引
         */
        PlayerMissionSystem.prototype.SetExamination = function (focusCur) {
            var list = this.listForLicence();
            var index_List = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(list); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                var maxStar = this.GetMaxStar(vv.index);
                var mission = this.missionMap[vv.index];
                if ((maxStar >= focusCur && mission.missionId % this.MISSION_BASE % this.MISSION > focusCur && focusCur != 7)
                    || (maxStar >= focusCur && mission.missionId % this.MISSION_BASE % this.MISSION >= focusCur && focusCur == 7 && mission.isFinish)) {
                    index_List.push(kk);
                }
            }
            return index_List;
        };
        /**满足猎人执照考试条件的任务索引（高级执照） */
        PlayerMissionSystem.prototype.SetExaminationHigh = function (focusCur) {
            var _List = this.listForHighLicence();
            var index_List = [];
            for (var k in _List) {
                if (_List.hasOwnProperty(k)) {
                    var v = _List[k];
                    var MaxStar = this.GetMaxStar(v.index) - zj.CommonConfig.licence_max_level;
                    var mission = this.missionMap[v.index];
                    if ((MaxStar >= focusCur && mission.missionId % 100000 % 100 > focusCur && focusCur != zj.CommonConfig.high_licence_max_level)
                        || (MaxStar >= focusCur && mission.missionId % 100000 % 100 >= focusCur && focusCur == zj.CommonConfig.high_licence_max_level && mission.isFinish)) {
                        index_List.push(Number(k));
                    }
                }
            }
            return index_List;
        };
        /**
         * 满足科目可领奖条件的任务索引
         * @param focusCur 索引
         */
        PlayerMissionSystem.prototype.SetGetAward = function (focusCur) {
            var _list = this.listForLicence();
            var index_List = [];
            var list_ins = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(_list); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                var list = this.GetMaxCondition(vv.index);
                for (var _c = 0, _d = zj.HelpUtil.GetKV(list); _c < _d.length; _c++) {
                    var _e = _d[_c], k = _e[0], v = _e[1];
                    if (v.star == focusCur) {
                        index_List.push(v);
                    }
                }
            }
            for (var _f = 0, _g = zj.HelpUtil.GetKV(index_List); _f < _g.length; _f++) {
                var _h = _g[_f], kk = _h[0], vv = _h[1];
                if (vv.id == 720001) {
                    list_ins.push(vv);
                }
            }
            if (list_ins.length == 2) {
                return index_List.length - 1;
            }
            else {
                return index_List.length;
            }
        };
        /**
         * 执照当前星级对应的ID
         * @param missionIndex 索引
         */
        PlayerMissionSystem.prototype.SetCondition = function (missionIndex) {
            var star_list = this.GetMaxCondition(missionIndex);
            var subId = this.itemSubType(missionIndex).sub_type;
            var startId = this.itemSubType(missionIndex).start_id;
            var maxCondition = 1;
            var minCondition = this.itemInfo(startId).condition + 1;
            var maxId = null;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(star_list); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                if (vv[5] > maxCondition) {
                    maxCondition = vv[5];
                    maxId = vv.id;
                }
            }
            return maxId;
        };
        /**
         * 执照完成的所有 子任务 判断是都弹出科目升星提示
         */
        PlayerMissionSystem.prototype.Completed = function () {
            var list_cmd = [[], [], [], []];
            var list = this.listForLicence(); // 执照任务
            for (var _i = 0, _a = zj.HelpUtil.GetKV(list); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                list_cmd[kk] = this.GetMaxCondition(vv.index);
            }
            var mission = [];
            for (var _c = 0, _d = zj.HelpUtil.GetKV(list_cmd); _c < _d.length; _c++) {
                var _e = _d[_c], _ = _e[0], k = _e[1];
                for (var _f = 0, _g = zj.HelpUtil.GetKV(k); _f < _g.length; _f++) {
                    var _h = _g[_f], _4 = _h[0], kk = _h[1];
                    mission.push(kk);
                }
            }
            if (this.missionInfo_pre == null) {
                this.missionInfo_pre = mission;
                return;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.level >= 10) {
                var lists = mission;
                var list_pre = this.missionInfo_pre;
                var list_next = [];
                var max = 0;
                for (var _j = 0, _l = zj.HelpUtil.GetKV(lists); _j < _l.length; _j++) {
                    var _m = _l[_j], kk = _m[0], vv = _m[1];
                    if (vv[1] == 720001) {
                        list_next.push(kk);
                        if (list_next.length == 2) {
                            if (kk > max) {
                                max = kk;
                                lists.splice(max, 1);
                            }
                        }
                    }
                }
                var _loop_5 = function (kk, vv) {
                    var isHave = zj.Table.FindF(this_2.missionInfo_pre, function (k, v) {
                        return v == vv;
                    });
                    if (isHave == false) {
                        // loadUI(BattleEnd_LicenseUpStar)
                        // .then((dialog: BattleEnd_LicenseUpStar) => {
                        //     dialog.SetInfo(vv[1], vv.star);
                        //     dialog.show(UI.SHOW_FROM_TOP);
                        // });
                    }
                };
                var this_2 = this;
                for (var _o = 0, _p = zj.HelpUtil.GetKV(lists); _o < _p.length; _o++) {
                    var _q = _p[_o], kk = _q[0], vv = _q[1];
                    _loop_5(kk, vv);
                }
                this.missionInfo_pre = mission;
            }
        };
        /**
         * 执照红点相关(根据所有科目完成状态判断是否显示红点)
         * @param missionIndex 索引
         */
        PlayerMissionSystem.prototype.itemCompleteForLicense = function (missionIndex) {
            var state = this.itemComplete(missionIndex);
            return state == zj.TableEnum.EnumDailyLive.finished;
        };
        PlayerMissionSystem.prototype.LicenseGetAward = function (id) {
            var info = zj.TableMissionLicence.Table();
            var licence = this.missionActive.licence;
            var bGet;
            if (this.missionActive.licenceReward.length != 0) {
                bGet = zj.Table.FindF(this.missionActive, function (k, v) {
                    return v == id;
                });
            }
            if (bGet == null) {
                bGet = true;
            }
            return !bGet && id <= licence && licence != 0;
        };
        /**
         * 判断新手是否可以进行第一次领取执照
         */
        PlayerMissionSystem.prototype.TeachGetLicense = function () {
            var tbl = zj.TableMissionLicence.Table();
            var licence = zj.Game.PlayerMissionSystem.missionActive.licence;
            var list = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                list = zj.Game.PlayerMissionSystem.SetExamination(Number(kk));
                // let bGet = Table.FindF(Game.PlayerMissionSystem.missionActive.licenceReward, function (k, v) {
                //     return v == kk;
                // });
                var bGet = false;
                for (var _c = 0, _d = zj.HelpUtil.GetKV(zj.Game.PlayerMissionSystem.missionActive.licenceReward); _c < _d.length; _c++) {
                    var _e = _d[_c], k = _e[0], v = _e[1];
                    if (v == kk) {
                        bGet = true;
                        break;
                    }
                    else {
                        bGet = false;
                    }
                }
                if (list.length == 4 && bGet && zj.Game.PlayerMissionSystem.missionActive.licence == (Number(kk) - 1)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 判断新手是否可以进行第一次考试
         */
        PlayerMissionSystem.prototype.TeachCanExam = function () {
            var tbl = zj.TableMissionLicence.Table();
            var licence = this.missionActive.licence;
            var list;
            var _loop_6 = function (kk, vv) {
                list = this_3.SetGetAward(Number(kk));
                var bGet = zj.Table.FindF(this_3.missionActive, function (k, v) {
                    return v == kk;
                });
                if (list == 4) {
                    return { value: true };
                }
            };
            var this_3 = this;
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                var state_1 = _loop_6(kk, vv);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return false;
        };
        /**
         * 判断新手是否可以地图探索第一次领奖
         */
        PlayerMissionSystem.prototype.TeachMapGetFirstAward = function () {
            var missionId = 710001;
            var missionType = 50001;
            var missionTbl = zj.TableMissionItem.Item(missionId);
            if (missionTbl == null) {
                return false;
            }
            else {
                return true;
            }
        };
        PlayerMissionSystem.prototype.itemMissionWeek = function (id) {
            return zj.TableMissionWeek.Item(id);
        };
        PlayerMissionSystem.prototype.itemMissionWeekValNormalType = function (id) {
            var type = id % 10000;
            if (type == message.MissionSubType.MISSION_SUB_TYPE_USE_GOODS ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_APT_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_LEVEL ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_LEVEL ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR ||
                type == message.MissionSubType.MISSION_SUB_TYPE_HUNTER_UPSTARTIME) {
                return false;
            }
            else {
                return true;
            }
        };
        PlayerMissionSystem.prototype.itemMissionWeekJump = function (id) {
            var _this = this;
            var type = id % 10000;
            var call = null;
            if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR ||
                type == message.MissionSubType.MISSION_SUB_TYPE_HUNTER_UPSTARTIME) {
                call = function () {
                    zj.loadUI(zj.HunterMainScene).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY) {
                call = function () {
                    // Game.PlayerHunterSystem.Start(null, TableEnum.Enum.Hero.GRADE);
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER) {
                call = function () {
                    zj.loadUI(zj.TavernScene).then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_WANTED) {
                call = function () {
                    zj.loadUI(zj.WantedSecondMeteorstanceScene).then(function (scene) {
                        scene.Init(1);
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME) {
                call = function () {
                    zj.loadUI(zj.HunterMainScene).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_NUM) {
                call = function () {
                    zj.loadUI(zj.CardMainScene).then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_USE_POWER) {
                call = function () {
                    _this.goto_instance_normal();
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_BUY_POWER) {
                call = function () {
                    zj.loadUI(zj.HXH_HunterUserStrength)
                        .then(function (dialog) {
                        dialog.SetInfo();
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_INSTANCE_SEARCH) {
                call = function () {
                    _this.goto_explore();
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_WONDERLAND_COLLECTION) {
                call = function () {
                    _this.goto_scene_wonder();
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_BUYMONEY) {
                call = function () {
                    zj.loadUI(zj.HelpGoldDialog)
                        .then(function (dialog) {
                        dialog.SetInfoList(true);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_BEER_EGG) {
                call = function () {
                    zj.loadUI(zj.TavernScene).then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_RELIC_COIN) {
                call = function () {
                    zj.loadUI(zj.RelicMall_Main).then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_EQUIP_UPLEVEL) {
                call = function () {
                    zj.loadUI(zj.HunterMainScene).then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_AWAKEN) {
                call = function () {
                    zj.loadUI(zj.HunterMainScene).then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_FISH_ZI) {
                call = function () {
                    _this.goto_scene_wonder();
                };
            }
            return call;
        };
        PlayerMissionSystem.prototype.getWeekAwardPay = function (id1, index) {
            var tbl = this.itemMissionWeek(id1);
            var ret1 = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tbl.day_refresh); _i < _a.length; _i++) {
                var _b = _a[_i], i = _b[0], v = _b[1];
                if (v == index) {
                    var itemGoods = [];
                    for (var _c = 0, _d = zj.HelpUtil.GetKV(tbl.mall_goods[i]); _c < _d.length; _c++) {
                        var _e = _d[_c], ii = _e[0], vv = _e[1];
                        var Info = { id: 0, count: 0 };
                        Info.id = vv;
                        Info.count = tbl.mall_count[i][ii];
                        itemGoods.push(Info);
                    }
                    var buyTime = 0;
                    for (var _f = 0, _g = zj.HelpUtil.GetKV(this.missionActive.missionWeekReward); _f < _g.length; _f++) {
                        var _h = _g[_f], k = _h[0], j = _h[1];
                        if (j.key == Number(i) + 1) {
                            buyTime = j.value;
                        }
                    }
                    var ret = { goods: [], canBuyTimes: 0, token: 0, buyTimes: 0, id: 0, };
                    ret.goods = itemGoods;
                    ret.canBuyTimes = tbl.buy_time[i]; // times
                    ret.token = tbl.price_token[i]; //price
                    ret.buyTimes = buyTime; // buy_time
                    ret.id = Number(i) + 1;
                    ret1.push(ret);
                }
            }
            return ret1;
        };
        PlayerMissionSystem.prototype.MissionItem = function (id) {
            return zj.TableMissionMain.Item(id);
        };
        PlayerMissionSystem.prototype.alltrue = function (t, f) {
            var tablecountture = function (t, f) {
                var count = 0;
                for (var k in t) {
                    if (t.hasOwnProperty(k)) {
                        var v = t[k];
                        count += (f(k, v) ? 1 : 0);
                    }
                }
                return count;
            };
            var num1 = tablecountture(t, f);
            var num2 = zj.Table.tableLength(t);
            return num1 == num2;
        };
        //////////////////////////发协议//////////////////////////////
        /**
         * 我的联盟请求
         */
        PlayerMissionSystem.prototype.ReqLeague = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueInfoRequest();
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
        /**
         * 获取我的关系列表请求
         */
        PlayerMissionSystem.prototype.ReqRelation = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationInfoRequest();
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
        /**
         * 任务列表请求
         */
        PlayerMissionSystem.prototype.ReqMission = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionListRequest();
                request.body.type = message.MissionType.MISSION_TYPE_NONE;
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
        /**
         * 领取活跃度奖励请求
         */
        PlayerMissionSystem.prototype.ReqActive = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionActiveRequest();
                request.body.index = index;
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
         * 领取任务奖励请求
         */
        PlayerMissionSystem.prototype.ReqReward = function (type, subType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionRewardRequest();
                request.body.type = type;
                request.body.subType = subType;
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
                }, _this, false, true);
                return;
            });
        };
        /**
         * 执照领取
         */
        PlayerMissionSystem.prototype.MissionRewardLicence = function (focusCur) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionRewardLicenceRequest();
                request.body.licenceId = focusCur;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        /**
         * 执照领取开始考试请求
         */
        PlayerMissionSystem.prototype.MobsInfo = function (type, level) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
                request.body.battleType = type;
                request.body.mobsId = level;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.stageInfo);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        /**
        * 执照领取开始考试请求
        */
        PlayerMissionSystem.prototype.missionReward = function (type, subType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionRewardRequest();
                request.body.type = type;
                request.body.subType = subType;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        // private ShareReward(){
        //     this.ShareRewardInfo().then((date)=>{
        //         let a = date;
        //     }).catch((res) => {
        // 			toast_success(res);
        // 		})
        // }
        /**
         * 兑换码   分享请求
         */
        PlayerMissionSystem.prototype.ShareRewardInfo = function (share_type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ShareRewardRequest();
                request.body.share_type = share_type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo.mixUnitInfo);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        return PlayerMissionSystem;
    }());
    zj.PlayerMissionSystem = PlayerMissionSystem;
    __reflect(PlayerMissionSystem.prototype, "zj.PlayerMissionSystem");
    /** 功能 */
    zj.FUNC = {
        /**帮会开启 */
        LEAGUE: message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE,
        /**演武堂开启 */
        ARENA: message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER,
        /**仙境开启 */
        WONDERLAND: message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND,
        /**无极塔开启 */
        TOWER: message.FunctionOpen.FUNCTION_OPEN_TYPE_TOWER,
        /**伏牛寨开启 */
        BASTILLE: message.FunctionOpen.FUNCTION_OPEN_TYPE_VILLAGE_MONEY,
        /**通缉令开启 */
        ARREST: message.FunctionOpen.FUNCTION_OPEN_TYPE_WANTED,
        /**技能升级开启 */
        SKILL: message.FunctionOpen.FUNCTION_OPEN_TYPE_SKILLUP,
        /**周常任务 */
        MISSIONWEEK: message.FunctionOpen.FUNCTION_OPEN_TYPE_MISSIONWEEK,
        /**天赋开启 */
        TALENT: message.FunctionOpen.FUNCTION_OPEN_TYPE_TALENT,
        /**装备刻印开启 */
        CARVE: message.FunctionOpen.FUNCTION_OPEN_TYPE_EQUIP_CARVE,
        /**军师开启 */
        ADVISER: message.FunctionOpen.FUNCTION_OPEN_TYPE_ADVISER,
        /**精英副本开启 */
        ELITE: message.FunctionOpen.FUNCTION_OPEN_TYPE_ELITE,
        /**特训开启 */
        TRAIN: message.FunctionOpen.FUNCTION_OPEN_TYPE_TRAINING,
        /**基金关闭 */
        FUND: message.FunctionOpen.FUNCTION_OPEN_TYPE_FUND,
        /**军师法阵开启 */
        STRATEGY: message.FunctionOpen.FUNCTION_OPEN_TYPE_ADVISER_FORMATION,
        /**援护位开启 */
        SUPPORT: message.FunctionOpen.FUNCTION_OPEN_TYPE_SUPPORT,
        /**战斗托管开启 */
        AUTO: message.FunctionOpen.FUNCTION_OPEN_TYPE_BATTLE_TRUST,
        /**开服7日开启 */
        SEVEN: message.FunctionOpen.FUNCTION_OPEN_TYPE_SEVEN_DAY,
        /**武将升级开启 */
        HEROLEVEL: message.FunctionOpen.FUNCTION_OPEN_TYPE_GENERAL_UP,
        /**武将升星开启 */
        HEROSTAR: message.FunctionOpen.FUNCTION_OPEN_TYPE_GENERAL_STAR,
        /**武将进阶开启 */
        HEROGRADE: message.FunctionOpen.FUNCTION_OPEN_TYPE_GENERAL_QUALITY,
        /**日常开启 */
        DAILY: message.FunctionOpen.FUNCTION_OPEN_TYPE_DAYLY,
        /**商铺开启 */
        MALL: message.FunctionOpen.FUNCTION_OPEN_TYPE_MALL,
        /**宝箱开启 */
        TREASURE: message.FunctionOpen.FUNCTION_OPEN_TYPE_CHEST,
        /**伏牛寨经验 */
        BASTILLEEXP: message.FunctionOpen.FUNCTION_OPEN_TYPE_VILLAGE_EXP,
        /**武将缘分 */
        FATE: message.FunctionOpen.FUNCTION_OPEN_TYPE_GENERAL_FATE,
        /**神兵 */
        ARTIFACT: message.FunctionOpen.FUNCTION_OPEN_TYPE_ARTIFACT,
        /**神兵洗练 */
        ARTIWASH: message.FunctionOpen.FUNCTION_OPEN_TYPE_ARTIFACT_WASH,
        /**神兵宝石镶嵌 */
        ARTIJADE: message.FunctionOpen.FUNCTION_OPEN_TYPE_ARTIFACT_MOUNT,
        /**访仙（如意商铺） */
        IMMORTAL: message.FunctionOpen.FUNCTION_OPEN_TYPE_IMMORTAL,
        /**聊天（服务器用） */
        CHAT: message.FunctionOpen.FUNCTION_OPEN_TYPE_CHAT,
        /**排行 */
        RANK: message.FunctionOpen.FUNCTION_OPEN_TYPE_RANK,
        /**仙境2 */
        WONDERLAND2: message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_2,
        /**仙境3 */
        WONDERLAND3: message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3,
        /**宝石 */
        JADE: message.FunctionOpen.FUNCTION_OPEN_TYPE_GAMBLE_JADE,
        /**伏牛寨扫荡 */
        BASTILLEWIPE: message.FunctionOpen.FUNCTION_OPEN_TYPE_VILLAGE_SWEEP,
        /**演武堂快速战斗 */
        LADDERQUICK: message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER_QUICK,
        /**天下第一 */
        PK: message.FunctionOpen.FUNCTION_OPEN_TYPE_WORLD_FIRST,
        /**魔域 */
        ZORK: message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON,
        /**回收 */
        RECOVERY: message.FunctionOpen.FUNCTION_OPEN_TYPE_RECOVERY,
        /**宝物 */
        POTATO: message.FunctionOpen.FUNCTION_OPEN_TYPE_POTATO,
        /**魔坛boss */
        BOSS: message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS,
        /**魔域祭坛 */
        RUNES: message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_RUNES,
        /**武将重生 */
        GENERAL_REBIRTH: message.FunctionOpen.FUNCTION_OPEN_TYPE_RECOVERY_GEN,
        /**装备重生 */
        EQUIP_REBIRTH: message.FunctionOpen.FUNCTION_OPEN_TYPE_RECOVERY_EQU,
        /**巨石洞穴 */
        ENEMY: message.FunctionOpen.FUNCTION_OPEN_TYPE_ENEMY_CAMP_CAVE,
        /**戈壁荒丘 */
        ENEMY2: message.FunctionOpen.FUNCTION_OPEN_TYPE_ENEMY_CAMP_GOBI,
        /**冰原匪窟 */
        ENEMY3: message.FunctionOpen.FUNCTION_OPEN_TYPE_ENEMY_CAMP_NEVE,
        /**跨服战 */
        SINGLE: message.FunctionOpen.FUNCTION_OPEN_TYPE_SINGLE_CRAFT,
        /**出售武将 */
        SELLGENERAL: message.FunctionOpen.FUNCTION_OPEN_TYPE_SELL_GENERAL,
        /**执照 */
        LICENSE: message.FunctionOpen.FUNCTION_OPEN_TYPE_MISSION_LICENCE,
        /**觉醒 */
        AWAKEN: message.FunctionOpen.FUNCTION_OPEN_TYPE_AWAKEN,
        /**武将合成 */
        COMPOUND: message.FunctionOpen.FUNCTION_OPEN_TYPE_GENERAL_MAKE,
        /**单队切磋 */
        ONEBATTEL: message.FunctionOpen.FUNCTION_OPEN_TYPE_PVP_SINGLE,
        /**三队切磋 */
        THREEBATLEE: message.FunctionOpen.FUNCTION_OPEN_TYPE_PVP_THIRD,
        /**山贼讨伐 */
        GROUPFIGHT: message.FunctionOpen.FUNCTION_OPEN_TYPE_GROUP_FIGHT,
        /**念力 */
        PSYCHIC: message.FunctionOpen.FUNCTION_OPEN_TYPE_GENERAL_PSYCHIC,
        /**突破 */
        HUNTERBREAK: message.FunctionOpen.FUNCTION_OPEN_TYPE_GENERAL_BREAK,
        /**港口 */
        DARKLAND: message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND,
        /**黑暗大陆 */
        DARKLAND2: message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2,
        /**装备 */
        EQUIP: message.FunctionOpen.FUNCTION_OPEN_TYPE_EQUIP,
        /**卡片强化 */
        POTATO_UPLEVEL: message.FunctionOpen.FUNCTION_OPEN_TYPE_POTATO_UPLEVEL,
        /**卡片升星 */
        POTATO_UPSTAR: message.FunctionOpen.FUNCTION_OPEN_TYPE_POTATO_UPSTAR,
        /**变身 */
        TRANSFORM: message.FunctionOpen.FUNCTION_OPEN_TYPE_ACTIVITY_BATTLE,
        /**活动boss */
        ACTIVITYBOSS: message.FunctionOpen.FUNCTION_OPEN_TYPE_ACTIVITY_BOSS,
    };
})(zj || (zj = {}));
//# sourceMappingURL=PlayerMissionSystem.js.map