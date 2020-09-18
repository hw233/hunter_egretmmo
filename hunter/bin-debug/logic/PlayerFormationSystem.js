var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * @augments chen xi
     *
     * @date 2018-11-27
     *
     * @class 阵营系统
     */
    var PlayerFormationSystem = (function () {
        function PlayerFormationSystem() {
            // 联赛使用
            this.curFormationIndex = 1;
            this.formats = [];
            this.itemlist = [];
            this.siteIndex = 0;
            // 新手引导阵型
            this.bootCamp = [];
            // 新手引导武将id
            this.blowGuide = 0;
            // 新手限制
            this.newRestrictions = true;
            // 连续战斗获取物品数据
            this.continueBattleDropItems = [];
            // 连续战斗获取宝物数据
            this.continueBattleDropPotatos = [];
            this._blowGuideFormations = [];
            /** 阵容方案--本服 */
            this._squadPlan = [];
            /** 阵容方案阵型信息--本服 */
            this._squadPlanMap = [];
            /** 阵容方案--跨服 */
            this._crossBeam = [];
            /** 阵容方案阵型信息--跨服 */
            this._crossBeamMap = [];
            /** 阵容方案--好友单队切磋 */
            this._friendsTeams = [];
            /** 阵容方案阵型信息----好友单队切磋 */
            this._friendsTeamsMap = [];
            /** 阵容方案--好友多队切磋 */
            this._moreTeam = [];
            /** 阵容方案阵型信息----好友多队切磋 */
            this._moreTeamMap = [];
            /** 进入副本前保存信息 */
            this._saveFrom = [];
            /** 客户端阵型信息 */
            this._curFormations = [];
            /** 客户端阵型信息 */
            this._curFormationMap = [];
            /** 流星街保存阵型 */
            this._formatsWant = [];
            /** 流星街阵型信息 */
            this._StreetFormationMap = [];
            /** 遗迹保存阵型 */
            this._formatsRelic = [];
            /** 遗迹阵型信息 */
            this._RelicFormationMap = [];
            /** 好友--三队切磋 */
            this._friendsThreeTeamsPlayMap = [];
            /** 好友--三对敌对阵型 */
            this._threeBattleInfo = [];
            /**  自定义阵型（index索引）(暂时跨服战攻击使用) / 好友--三队切磋 */
            this._formatsSingleAttack = {};
            /** 跨服格斗场信息 */
            this._CrossRealmFormationMap = [];
            /** 客户端现有符文信息 */
            this._curCharmInfos = [];
            this._curCharmInfosMap = [];
            /** 自定义阵型（index索引）(暂时跨服战防守使用) */
            this._formatsSingleDefine = {};
            /** 组队战阵型 */
            this._formatsGroupFight = {};
            /** 自定义阵型（index索引）(暂时联赛防守使用) */
            this._formatsMatchDefine = {};
            /** 服务器存储的阵型（类型索引） */
            this._formatsServer = {};
            this.main = [];
            this.format = [];
        }
        PlayerFormationSystem.GetInstance = function (id) {
            if (id === void 0) { id = null; }
        };
        Object.defineProperty(PlayerFormationSystem.prototype, "blowGuideFormations", {
            get: function () {
                return this._blowGuideFormations;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "squadPlan", {
            get: function () {
                return this._squadPlan;
            },
            set: function (v) {
                this._squadPlan = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "squadPlanMap", {
            get: function () {
                return this._squadPlanMap;
            },
            set: function (v) {
                this._squadPlanMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "crossBeam", {
            get: function () {
                return this._crossBeam;
            },
            set: function (v) {
                this._crossBeam = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "crossBeamMap", {
            get: function () {
                return this._crossBeamMap;
            },
            set: function (v) {
                this._crossBeamMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "friendsTeams", {
            get: function () {
                return this._friendsTeams;
            },
            set: function (v) {
                this._friendsTeams = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "friendsTeamsMap", {
            get: function () {
                return this._friendsTeamsMap;
            },
            set: function (v) {
                this._friendsTeamsMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "moreTeam", {
            get: function () {
                return this._moreTeam;
            },
            set: function (v) {
                this._moreTeam = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "moreTeamMap", {
            get: function () {
                return this._moreTeamMap;
            },
            set: function (v) {
                this._moreTeamMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "saveFrom", {
            get: function () {
                return this._saveFrom;
            },
            set: function (v) {
                this._saveFrom = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "curFormations", {
            get: function () {
                return this._curFormations;
            },
            set: function (v) {
                this._curFormations = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "curFormationMap", {
            get: function () {
                return this._curFormationMap;
            },
            set: function (v) {
                this._curFormationMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "formatsWant", {
            get: function () {
                return this._formatsWant;
            },
            set: function (v) {
                this._formatsWant = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "StreetFormationMap", {
            get: function () {
                return this._StreetFormationMap;
            },
            set: function (v) {
                this._StreetFormationMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "formatsRelic", {
            get: function () {
                return this._formatsRelic;
            },
            set: function (v) {
                this._formatsRelic = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "RelicFormationMap", {
            get: function () {
                return this._RelicFormationMap;
            },
            set: function (v) {
                this._RelicFormationMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "friendsThreeTeamsPlayMap", {
            get: function () {
                return this._friendsThreeTeamsPlayMap;
            },
            set: function (v) {
                this._friendsThreeTeamsPlayMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "threeBattleInfo", {
            get: function () {
                return this._threeBattleInfo;
            },
            set: function (v) {
                this._threeBattleInfo = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "formatsSingleAttack", {
            get: function () {
                return this._formatsSingleAttack;
            },
            set: function (v) {
                this._formatsSingleAttack = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "CrossRealmFormationMap", {
            get: function () {
                return this._CrossRealmFormationMap;
            },
            set: function (v) {
                this._CrossRealmFormationMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "curCharmInfos", {
            get: function () {
                return this._curCharmInfos;
            },
            set: function (v) {
                this._curCharmInfos = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "curCharmInfosMap", {
            get: function () {
                return this._curCharmInfosMap;
            },
            set: function (v) {
                this._curCharmInfosMap = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "formatsSingleDefine", {
            get: function () {
                return this._formatsSingleDefine;
            },
            set: function (v) {
                this._formatsSingleDefine = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "formatsGroupFight", {
            get: function () {
                return this._formatsGroupFight;
            },
            set: function (v) {
                this._formatsGroupFight = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "formatsMatchDefine", {
            get: function () {
                return this._formatsMatchDefine;
            },
            set: function (v) {
                this._formatsMatchDefine = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerFormationSystem.prototype, "formatsServer", {
            get: function () {
                return this._formatsServer;
            },
            set: function (v) {
                this._formatsServer = v;
            },
            enumerable: true,
            configurable: true
        });
        PlayerFormationSystem.prototype.init = function () {
            this.InitFormationInfo(); // 其他副本阵容初始化
            this.InitSingleFormation(); // 跨服格斗场阵容初始化 / 好友--三队切磋阵容初始化
            this.InitWantFormation(); // 通缉令阵容初始化
            this.InitRelicFormation(); // 遗迹阵容初始化
            this.InitsquadPlan(); // 阵容方案本服初始化
            this.InitcrossBeam(); // 阵容方案跨服初始化
            this.InitfriendsTeams(); // 阵容方案好友单队切磋初始化      
            this.InitmoreTeam(); // 阵容方案好友多队切磋初始化   
            this.InitCharmInfo(); // 猜拳阵容初始化   
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_FORMATION_INFO_CHANGE, this.onFormationInfoChange, this); // 服务器保存阵容加载
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.loadFormationMap, this); // 其他副本阵容加载
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.LoadSingleFormation, this); // 跨服格斗场阵容加载
            //Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadfriendsThreeTeamsPlay, this);// 好友--三队切磋阵容加载 
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.LoadWantFormation, this); // 通缉令阵容加载
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.LoadRelicFormation, this); // 遗迹阵容加载
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.LoadsquadPlan, this); // 阵容方案本服加载 
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.LoadcrossBeam, this); // 阵容方案跨服加载 
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.LoadfriendsTeams, this); // 阵容方案好友单队切磋加载      
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.LoadmoreTeam, this); // 阵容方案好友多队切磋加载  
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, this.LoadInitCharmInfoMap, this); // 猜拳阵容加载
        };
        PlayerFormationSystem.prototype.uninit = function () {
            this.curFormationIndex = 1;
            this.formats = [];
            this.itemlist = [];
            this.siteIndex = 0;
            this.bootCamp = [];
            this.blowGuide = 0;
            this.newRestrictions = true;
            this.continueBattleDropItems = [];
            this.continueBattleDropPotatos = [];
            this._blowGuideFormations = [];
            this._squadPlan = [];
            this._squadPlanMap = [];
            this._saveFrom = [];
            this._curFormations = [];
            this._curFormationMap = [];
            this._formatsWant = [];
            this._StreetFormationMap = [];
            this._formatsRelic = [];
            this._RelicFormationMap = [];
            this._friendsThreeTeamsPlayMap = [];
            this._threeBattleInfo = [];
            this._formatsSingleAttack = {};
            this._CrossRealmFormationMap = [];
            this._curCharmInfos = [];
            this._formatsSingleDefine = {};
            this._formatsGroupFight = {};
            this._formatsMatchDefine = {};
            this._formatsServer = {};
            zj.Gmgr.Instance.backupAutoTbl = [];
            zj.Gmgr.Instance.backupSpeedTbl = [];
            zj.Game.PlayerBattleSystem.pid = -1;
        };
        // 工会战请求
        PlayerFormationSystem.prototype.LeagueMatchFortressTeam = function (leagueid, type, index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchFortressTeamRequest();
                request.body.league_id = leagueid;
                request.body.type = type;
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.datailRoleFormation);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        /**
         *  其他副本阵容初始化
         */
        PlayerFormationSystem.prototype.InitFormationInfo = function () {
            // -- 重排消息,增加下表索引
            this.curFormations = [];
            for (var index = 0; index < message.EFormationType.FORMATION_TYPE_CNT; index++) {
                if (index != message.EFormationType.FORMATION_TYPE_NONO && index != message.EFormationType.FORMATION_TYPE_CNT) {
                    var fromation = new message.FormationInfo();
                    fromation.formationType = index;
                    this.curFormations.push(fromation);
                }
            }
            var tableFormat = zj.TableFormations.Table();
            for (var k in tableFormat) {
                if (tableFormat.hasOwnProperty(k)) {
                    var v = tableFormat[k];
                    var format_add_generals = v.generals_limit_number;
                    var format_add_generals_Length = format_add_generals.length;
                    var gens_size_generals = v.generals + format_add_generals[format_add_generals.length - 1];
                    this.curFormations[Number(k) - 1].generals = [];
                    for (var index = 0; index < gens_size_generals; index++) {
                        this.curFormations[Number(k) - 1].generals.push(0);
                    }
                    var format_add_supports = v.supports_limit_number;
                    var gens_size_supports = v.supports + format_add_supports[format_add_supports.length - 1];
                    this.curFormations[Number(k) - 1].supports = [];
                    for (var index = 0; index < gens_size_supports; index++) {
                        this.curFormations[Number(k) - 1].supports.push(0);
                    }
                }
            }
        };
        /**
         * 跨服格斗场阵型初始化
         */
        PlayerFormationSystem.prototype.InitSingleFormation = function () {
            this.formatsSingleAttack = [];
            for (var i = 0; i < 3; i++) {
                this.formats.push(new message.FormationInfo());
            }
            var buttonNames = ["generals", "reserves", "supports"];
            for (var fk in this.formats) {
                var fv = this.formats[fk];
                fv.def = null;
                for (var kk in buttonNames) {
                    var vv = buttonNames[kk];
                    for (var i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                //this.formats[fk].formationType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
                this.formats[fk].formationIndex = Number(fk);
            }
            this.formatsSingleAttack = this.formats;
        };
        /**
         * 流星街阵型初始化
         */
        PlayerFormationSystem.prototype.InitWantFormation = function () {
            this.formatsWant = [];
            var formats = [];
            for (var i = message.EWantedType.WANTED_TYPE_NONO; i < message.EWantedType.WANTED_TYPE_END; i++) {
                formats.push(new message.FormationInfo());
            }
            var buttonNames = ["generals", "reserves", "supports"];
            for (var fk in formats) {
                var fv = formats[fk];
                fv.def = null;
                for (var kk in buttonNames) {
                    var vv = buttonNames[kk];
                    for (var i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationType = message.EFormationType.FORMATION_TYPE_WANTED;
                formats[fk].formationIndex = Number(fk);
            }
            this.formatsWant = formats;
        };
        /**
         * 遗迹阵型初始化
         */
        PlayerFormationSystem.prototype.InitRelicFormation = function () {
            this.formatsRelic = [];
            var formats = [];
            var relicTbl = zj.TableInstanceRelic.Table();
            for (var i = 0; i < zj.Helper.getObjLen(relicTbl); i++) {
                formats.push(new message.FormationInfo());
            }
            var buttonNames = ["generals", "reserves", "supports"];
            for (var fk in formats) {
                var fv = formats[fk];
                fv.def = null;
                for (var kk in buttonNames) {
                    var vv = buttonNames[kk];
                    for (var i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationType = message.EFormationType.FORMATION_TYPE_RELIC;
                formats[fk].formationIndex = Number(fk);
            }
            this.formatsRelic = formats;
        };
        /**
         * 阵容方案本服初始化
         */
        PlayerFormationSystem.prototype.InitsquadPlan = function () {
            this.squadPlan = [];
            var formats = [];
            for (var i = 0; i < 5; i++) {
                formats.push(new message.FormationInfo());
            }
            var buttonNames = ["generals", "reserves", "supports"];
            for (var fk in formats) {
                var fv = formats[fk];
                fv.def = null;
                for (var kk in buttonNames) {
                    var vv = buttonNames[kk];
                    for (var i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationIndex = Number(fk);
            }
            this.squadPlan = formats;
        };
        /**
         * 阵容方案跨服初始化
         */
        PlayerFormationSystem.prototype.InitcrossBeam = function () {
            this.crossBeam = [];
            var formats = [];
            for (var i = 0; i < 5; i++) {
                formats.push(new message.FormationInfo());
            }
            var buttonNames = ["generals", "reserves", "supports"];
            for (var fk in formats) {
                var fv = formats[fk];
                fv.def = null;
                for (var kk in buttonNames) {
                    var vv = buttonNames[kk];
                    for (var i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationIndex = Number(fk);
            }
            this.crossBeam = formats;
        };
        /**
         * 阵容方案好友单队切磋初始化
         */
        PlayerFormationSystem.prototype.InitfriendsTeams = function () {
            this.friendsTeams = [];
            var formats = [];
            for (var i = 0; i < 5; i++) {
                formats.push(new message.FormationInfo());
            }
            var buttonNames = ["generals", "reserves", "supports"];
            for (var fk in formats) {
                var fv = formats[fk];
                fv.def = null;
                for (var kk in buttonNames) {
                    var vv = buttonNames[kk];
                    for (var i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationIndex = Number(fk);
            }
            this.friendsTeams = formats;
        };
        /**
       * 阵容方案好友多队初始化
       */
        PlayerFormationSystem.prototype.InitmoreTeam = function () {
            this.moreTeam = [];
            var formats = [];
            for (var i = 0; i < 5; i++) {
                formats.push(new message.FormationInfo());
            }
            var buttonNames = ["generals", "reserves", "supports"];
            for (var fk in formats) {
                var fv = formats[fk];
                fv.def = null;
                for (var kk in buttonNames) {
                    var vv = buttonNames[kk];
                    for (var i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationIndex = Number(fk);
            }
            this.moreTeam = formats;
        };
        /**
         * 猜拳结果初始化
         */
        PlayerFormationSystem.prototype.InitCharmInfo = function () {
            this.curCharmInfos = [];
            var formats = [];
            for (var i = 0; i < zj.CommonConfig.gain_runes_number; i++) {
                formats.push(0);
            }
            this.curCharmInfos = formats;
        };
        /**
         * 服务器保存阵容加载
         */
        PlayerFormationSystem.prototype.onFormationInfoChange = function (ev) {
            var formations = ev.data;
            for (var i = 0; i < this.curFormations.length; i++) {
                for (var j = 0; j < formations.length; j++) {
                    if (this.curFormations[i].formationType == formations[j].formationType) {
                        this.curFormations[i] = formations[j];
                    }
                }
            }
            this.loadFormationMap();
            for (var i = 0; i < formations.length; i++) {
                if (!formations[i]) {
                    continue;
                }
                var data = this.eliminateRepeatGeneral(formations[i]);
                if (data.formationType == message.EFormationType.FORMATION_TYPE_CRAFT) {
                    var bFind = false;
                    for (var k in this._formatsSingleDefine) {
                        if (this._formatsSingleDefine.hasOwnProperty(k)) {
                            if (Number(k) == data.formationIndex && !bFind) {
                                bFind = true;
                                this._formatsSingleDefine[Number(k)] = data;
                            }
                        }
                    }
                    if (!bFind) {
                        this._formatsSingleDefine[data.formationIndex] = data;
                    }
                }
                else if (data.formationType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                    var bFind = false;
                    for (var k in this._formatsGroupFight) {
                        if (this._formatsGroupFight.hasOwnProperty(k)) {
                            if (Number(k) == data.formationIndex && !bFind) {
                                bFind = true;
                                this._formatsGroupFight[Number(k)] = data;
                            }
                        }
                    }
                    if (!bFind) {
                        this._formatsGroupFight[data.formationIndex] = data;
                    }
                }
                else if (data.formationType == message.EFormationType.FORMATION_TYPE_MATCH_DEFENSE) {
                    var bFind = false;
                    for (var k in this._formatsMatchDefine) {
                        if (this._formatsMatchDefine.hasOwnProperty(k)) {
                            if (Number(k) == data.formationIndex && !bFind) {
                                bFind = true;
                                this._formatsMatchDefine[Number(k)] = data;
                            }
                        }
                    }
                    if (!bFind) {
                        this._formatsMatchDefine[data.formationIndex] = data;
                    }
                }
                else {
                    var bFind = false;
                    for (var k in this.formatsServer) {
                        if (this.formatsServer.hasOwnProperty(k)) {
                            if (Number(k) == data.formationType && !bFind) {
                                bFind = true;
                                this.formatsServer[Number(k)] = data;
                            }
                        }
                    }
                    if (!bFind) {
                        this.formatsServer[data.formationType] = data;
                    }
                }
            }
            this.syncFormatServer();
        };
        PlayerFormationSystem.prototype.description = function () {
            console.log("\n--- PlayerFormationSystem, curFormations = ", this.curFormations, "\ncurFormationMap = ", this.curFormationMap, "\nformatsSingleDefine = ", this.formatsSingleDefine, "\nformatsGroupFight = ", this.formatsGroupFight, "\nformatsMatchDefine = ", this.formatsMatchDefine, "\nformatsServer = ", this.formatsServer);
        };
        /**
         * 同步formatsServer到curFormations阵型中
         */
        PlayerFormationSystem.prototype.syncFormatServer = function () {
            var tblIndex = ["generals", "reserves", "supports"];
            for (var k in this.formatsServer) {
                if (this.formatsServer.hasOwnProperty(k)) {
                    var v = this.formatsServer[k];
                    for (var kk = 0; kk < this.curFormations.length; kk++) {
                        // 只赋值对应位置的值,服务器初始化时,无武将的位置是不传值的,不覆盖客户端的阵型值,避免出现阵型人数不对的情况
                        if (kk == Number(k)) {
                            for (var i = 0; i < tblIndex.length; i++) {
                                var idx = tblIndex[i];
                                for (var j = 0; j < v[idx].length; j++) {
                                    for (var a = 0; a < this.curFormations.length; a++) {
                                        if (this.curFormations[a].formationType == Number(k)) {
                                            this.curFormations[a][idx][j] = v[idx][j];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        /**
         * 其他副本加载阵容
         */
        PlayerFormationSystem.prototype.loadFormationMap = function () {
            this.init();
            //this.saveFormations();
            var msg = zj.Game.Controller.getRoleStorageItem("formats");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            var mapp = [];
            for (var i = 0; i < map[0].formations.length; i++) {
                var a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (var k in a) {
                    for (var kk in map[0].formations[i]) {
                        var vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }
            var msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.curFormationMap.push(msga);
            var roleID = zj.Game.Controller.roleID();
            var groupID = zj.Game.Controller.groupOwnerID();
            var suffixs = ["generals", "reserves", "supports"];
            for (var index = 0; index < this.curFormationMap.length; index++) {
                var v = this.curFormationMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    this.characterFormationSavedInit(v, suffixs);
                    this.syncFormatServer();
                    break;
                }
            }
        };
        /**
         * 其他副本阵型保存初始化
         */
        PlayerFormationSystem.prototype.characterFormationSavedInit = function (v, suffixs) {
            this.restsContrarySerialize(); // 其他副本反序列化
            for (var i = 0; i < v.formations.length; i++) {
                // 防止阵型表删除行之后，根据表初始化信息和本地文件读出的数据不一致的问题
                // 仙境和联盟战以服务器为准--没有联盟战vv.formationType != EFormationType.FORMATION_TYPE_LEAGUE_WAR
                if (this.curFormations[i] != null) {
                    // 根据表格初始化的阵型
                    var _formate_init = this.curFormations[i];
                    // 阵型中的武将判断
                    var _formation = v.formations[i]; // v.formations[i].parse_bytes(encoder2.buffer);
                    // 缺少的武将不加入阵型中
                    for (var j = 0; j < suffixs.length; j++) {
                        var _suffix = suffixs[j];
                        // 根据初始化的阵型信息遍历，防止本地文件中没有值的情况下出错
                        for (var k = 0; k < _formate_init[_suffix].length; k++) {
                            var _general_id = _formation[_suffix][Number(k)];
                            if ((_general_id == null) || (_general_id != null && zj.PlayerHunterSystem.GetHasGeneral(_general_id) != true)) {
                                _formation[_suffix][Number(k)] = 0;
                            }
                        }
                    }
                    this.curFormations[v.formations[i].formationType - 1] = _formation;
                }
            }
        };
        /**
         * 跨服格斗场阵容加载
         */
        PlayerFormationSystem.prototype.LoadSingleFormation = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("singleFormation");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            var mapp = [];
            for (var i = 0; i < map[0].formations.length; i++) {
                var a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (var k in a) {
                    for (var kk in map[0].formations[i]) {
                        var vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }
            var roleID = zj.Game.Controller.roleID();
            var groupID = zj.Game.Controller.groupOwnerID();
            var msga = new message.CustomSingleFormationInfo();
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            msga.formations = mapp;
            this.CrossRealmFormationMap.push(msga);
            for (var index = 0; index < this.CrossRealmFormationMap.length; index++) {
                var v = this.CrossRealmFormationMap[index];
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (var i = 0; i < v.formations.length; i++) {
                        this.crossrealmContrarySerialize(); // 跨服反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.formatsSingleAttack[i] = v.formations[i];
                    }
                }
            }
        };
        /**
         *  好友--三队切磋阵容加载
         */
        PlayerFormationSystem.prototype.LoadfriendsThreeTeamsPlay = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("friendsThreeTeamsPlay");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            var mapp = [];
            for (var i = 0; i < map[0].formations.length; i++) {
                var a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (var k in a) {
                    for (var kk in map[0].formations[i]) {
                        var vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }
            var roleID = zj.Game.Controller.roleID();
            var groupID = zj.Game.Controller.groupOwnerID();
            var msga = new message.CustomSingleFormationInfo();
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            msga.formations = mapp;
            this.friendsThreeTeamsPlayMap.push(msga);
            for (var index = 0; index < this.friendsThreeTeamsPlayMap.length; index++) {
                var v = this.friendsThreeTeamsPlayMap[index];
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (var i = 0; i < v.formations.length; i++) {
                        this.crossrealmContrarySerialize(); // 跨服反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.formatsSingleAttack[i] = v.formations[i];
                    }
                }
            }
        };
        PlayerFormationSystem.prototype.EliminateRepeatGel = function (tbl) {
            var exitMap = [];
            for (var k in tbl["generals"]) {
                var v = tbl["generals"][k];
                var generalId = v;
                var tmpId = zj.PlayerHunterSystem.GetGeneralId(generalId);
                if (v != 0 && exitMap[tmpId] != null && exitMap[tmpId] != generalId) {
                    generalId = 0;
                    tbl["generals"][k] = 0;
                }
                if (generalId != 0) {
                    exitMap[tmpId] = generalId;
                }
            }
            for (var k in tbl["supports"]) {
                var v = tbl["supports"][k];
                var generalId = v;
                var tmpId = zj.PlayerHunterSystem.GetGeneralId(generalId);
                if (v != 0 && exitMap[tmpId] != null && exitMap[tmpId] != generalId) {
                    generalId = 0;
                    tbl["supports"][k] = 0;
                }
                if (generalId != 0) {
                    exitMap[tmpId] = generalId;
                }
            }
        };
        /**
         * 流星街阵容加载
         */
        PlayerFormationSystem.prototype.LoadWantFormation = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("wantFormation");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            var mapp = [];
            for (var i = 0; i < map[0].formations.length; i++) {
                var a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (var k in a) {
                    for (var kk in map[0].formations[i]) {
                        var vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }
            var msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.StreetFormationMap.push(msga);
            var roleID = zj.Game.Controller.roleID();
            var groupID = zj.Game.Controller.groupOwnerID();
            for (var index = 0; index < this.StreetFormationMap.length; index++) {
                var v = this.StreetFormationMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (var i = 0; i < v.formations.length; i++) {
                        this.streetContrarySerialize(); //  流星街反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.formatsWant[i] = v.formations[i];
                    }
                }
            }
        };
        /**
         * 遗迹阵容加载
         */
        PlayerFormationSystem.prototype.LoadRelicFormation = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("RelicFormation");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            var mapp = [];
            for (var i = 0; i < map[0].formations.length; i++) {
                var a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (var k in a) {
                    for (var kk in map[0].formations[i]) {
                        var vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }
            var msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.RelicFormationMap.push(msga);
            var roleID = zj.Game.Controller.roleID();
            var groupID = zj.Game.Controller.groupOwnerID();
            for (var index = 0; index < this.RelicFormationMap.length; index++) {
                var v = this.RelicFormationMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (var i = 0; i < v.formations.length; i++) {
                        this.relicContrarySerialize(); //  流星街反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.formatsRelic[i] = v.formations[i];
                    }
                }
            }
        };
        /**
         * 阵容方案本服加载
         */
        PlayerFormationSystem.prototype.LoadsquadPlan = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("SquadPlan");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            var mapp = [];
            for (var i = 0; i < map[0].formations.length; i++) {
                var a = new message.FormationInfo();
                for (var k in a) {
                    for (var kk in map[0].formations[i]) {
                        var vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }
            var msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.squadPlanMap.push(msga);
            var roleID = zj.Game.Controller.roleID();
            var groupID = zj.Game.Controller.groupOwnerID();
            for (var index = 0; index < this.squadPlanMap.length; index++) {
                var v = this.squadPlanMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (var i = 0; i < v.formations.length; i++) {
                        this.streetContrarySquadPlan(); //  阵容方案反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.squadPlan[i] = v.formations[i];
                    }
                }
            }
        };
        /**
         * 阵容方案跨服加载
         */
        PlayerFormationSystem.prototype.LoadcrossBeam = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("CrossBeam");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            var mapp = [];
            for (var i = 0; i < map[0].formations.length; i++) {
                var a = new message.FormationInfo();
                for (var k in a) {
                    for (var kk in map[0].formations[i]) {
                        var vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }
            var msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.crossBeamMap.push(msga);
            var roleID = zj.Game.Controller.roleID();
            var groupID = zj.Game.Controller.groupOwnerID();
            for (var index = 0; index < this.crossBeamMap.length; index++) {
                var v = this.crossBeamMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (var i = 0; i < v.formations.length; i++) {
                        this.streetContraryCrossBeam(); //  阵容方案反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.crossBeam[i] = v.formations[i];
                    }
                }
            }
        };
        /**
         * 阵容方案好友单队切磋加载
         */
        PlayerFormationSystem.prototype.LoadfriendsTeams = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("friendsTeams");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            var mapp = [];
            for (var i = 0; i < map[0].formations.length; i++) {
                var a = new message.FormationInfo();
                for (var k in a) {
                    for (var kk in map[0].formations[i]) {
                        var vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }
            var msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.friendsTeamsMap.push(msga);
            var roleID = zj.Game.Controller.roleID();
            var groupID = zj.Game.Controller.groupOwnerID();
            for (var index = 0; index < this.friendsTeamsMap.length; index++) {
                var v = this.friendsTeamsMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (var i = 0; i < v.formations.length; i++) {
                        this.streetContraryFriendsTeams(); //  阵容方案好友单队切磋反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.friendsTeams[i] = v.formations[i];
                    }
                }
            }
        };
        /**
        * 阵容方案好友多队切磋加载
        */
        PlayerFormationSystem.prototype.LoadmoreTeam = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("moreTeam");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            var mapp = [];
            for (var i = 0; i < map[0].formations.length; i++) {
                var a = new message.FormationInfo();
                for (var k in a) {
                    for (var kk in map[0].formations[i]) {
                        var vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }
            var msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.moreTeamMap.push(msga);
            var roleID = zj.Game.Controller.roleID();
            var groupID = zj.Game.Controller.groupOwnerID();
            for (var index = 0; index < this.moreTeamMap.length; index++) {
                var v = this.moreTeamMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (var i = 0; i < v.formations.length; i++) {
                        this.streetContraryMoreTeam(); //  阵容方案好友多队切磋反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.moreTeam[i] = v.formations[i];
                    }
                }
            }
        };
        /**
         * 猜拳结果加载
         */
        PlayerFormationSystem.prototype.LoadInitCharmInfoMap = function () {
            var msg = zj.Game.Controller.getRoleStorageItem("charms");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }
            var map = JSON.parse(msg);
            // let msga = new message.CustomFormationInfo();
            // msga.formations = map;
            var maplength = map.length;
            for (var i = 0; i < 6; i++) {
                var msga = map[maplength - 1][i];
                this.curCharmInfosMap.push(msga);
            }
            // this.curCharmInfosMap.push(map[0]);
            this.curCharmInfos = zj.Table.DeepCopy(this.curCharmInfosMap);
            // let roleID = Game.Controller.roleID();
            // let groupID = Game.Controller.groupOwnerID();
            // for (let index = 0; index < this.curCharmInfosMap.length; index++) {
            //     let v = this.curCharmInfosMap[index];
            //     // 加载账号对应的本地阵型信息
            //     if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
            //         for (let i = 0; i < v.formations.length; i++) {
            //             //this.EliminateRepeatGel(v.formations[i]);
            //             this.curCharmInfos[i] = v.formations[i];
            //         }
            //     } else {//账户id不同
            //         for (let i = 0; i < v.formations.length; i++) {
            //            // this.EliminateRepeatGel(v.formations[i]);
            //             this.curCharmInfos[i] = v.formations[i];
            //         }
            //     }
            // }
        };
        /**
         * 其他副本阵容保存
         */
        PlayerFormationSystem.prototype.saveFormations = function () {
            var formatInfo = this.getFormationInfo();
            this.curFormationMap = [];
            this.curFormationMap.push(formatInfo);
            var msg = JSON.stringify(this.curFormationMap);
            zj.Game.Controller.setRoleStorageItem("formats", msg);
            // 序列化
            this.restsFrontSerialize(formatInfo);
        };
        PlayerFormationSystem.prototype.getFormationInfo = function () {
            var formats = [];
            for (var k = 0; k < this.curFormations.length; k++) {
                var v = this.curFormations[k];
                formats.push(v);
            }
            var msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(zj.Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(zj.Game.Controller.groupOwnerID());
            return msg;
        };
        /**
         * 其他副本序列化
         */
        PlayerFormationSystem.prototype.restsFrontSerialize = function (formatInfo) {
            var encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            var buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            var saveStr = egret.Base64Util.encode(buf);
            zj.Game.Controller.setRoleStorageItem("restsSerialize", saveStr);
        };
        /**
         * 其他副本反序列化
         */
        PlayerFormationSystem.prototype.restsContrarySerialize = function () {
            var saveStr = zj.Game.Controller.getRoleStorageItem("restsSerialize");
            if (saveStr && saveStr.length > 0) {
                var buf = egret.Base64Util.decode(saveStr);
                var msg = new message.CustomFormationInfo();
                var decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        };
        /**
         *  跨服保存阵容
         */
        PlayerFormationSystem.prototype.SaveSingleFormation = function () {
            var formatInfo = this.getFormationCrossRealmInfo();
            this.CrossRealmFormationMap = [];
            var msg;
            if (zj.Game.PlayerInstanceSystem.curInstanceType == 16) {
                this.CrossRealmFormationMap.push(formatInfo);
                msg = JSON.stringify(this.CrossRealmFormationMap);
                zj.Game.Controller.setRoleStorageItem("singleFormation", msg);
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == 22) {
                this.friendsThreeTeamsPlayMap.push(formatInfo);
                msg = JSON.stringify(this.friendsThreeTeamsPlayMap);
                zj.Game.Controller.setRoleStorageItem("friendsThreeTeamsPlay", msg);
            }
            this.crossrealmFrontSerialize(formatInfo); // 跨服序列化
        };
        PlayerFormationSystem.prototype.getFormationCrossRealmInfo = function () {
            var formats = [];
            for (var kk in this.formatsSingleAttack) {
                var v = this.formatsSingleAttack[kk];
                formats.push(v);
            }
            var msg = new message.CustomSingleFormationInfo();
            msg.formations = formats;
            msg.ID = String(zj.Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(zj.Game.Controller.groupOwnerID());
            return msg;
        };
        /**
         * 跨服序列化
         */
        PlayerFormationSystem.prototype.crossrealmFrontSerialize = function (formatInfo) {
            var encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            var buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            var saveStr = egret.Base64Util.encode(buf);
            zj.Game.Controller.setRoleStorageItem("crossrealmSerialize", saveStr);
        };
        /**
         * 跨服反序列化
         */
        PlayerFormationSystem.prototype.crossrealmContrarySerialize = function () {
            var saveStr = zj.Game.Controller.getRoleStorageItem("crossrealmSerialize");
            if (saveStr && saveStr.length > 0) {
                var buf = egret.Base64Util.decode(saveStr);
                var msg = new message.CustomFormationInfo();
                var decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        };
        /**
         * 流星街保存阵容信息
         */
        PlayerFormationSystem.prototype.SaveWantFormation = function () {
            var formatInfo = this.getFormationInfoStreet();
            this.StreetFormationMap = [];
            this.StreetFormationMap.push(formatInfo);
            var msg = JSON.stringify(this.StreetFormationMap);
            zj.Game.Controller.setRoleStorageItem("wantFormation", msg);
            this.streetFrontSerialize(formatInfo); // 流星街序列化
        };
        PlayerFormationSystem.prototype.getFormationInfoStreet = function () {
            var formats = [];
            for (var k = 0; k < this.formatsWant.length; k++) {
                var v = this.formatsWant[k];
                formats.push(v);
            }
            var msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(zj.Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(zj.Game.Controller.groupOwnerID());
            return msg;
        };
        /**
         * 流星街序列化
         */
        PlayerFormationSystem.prototype.streetFrontSerialize = function (formatInfo) {
            var encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            var buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            var saveStr = egret.Base64Util.encode(buf);
            zj.Game.Controller.setRoleStorageItem("streetSerialize", saveStr);
        };
        /**
         * 流星街反序列化
         */
        PlayerFormationSystem.prototype.streetContrarySerialize = function () {
            var saveStr = zj.Game.Controller.getRoleStorageItem("streetSerialize");
            if (saveStr && saveStr.length > 0) {
                var buf = egret.Base64Util.decode(saveStr);
                var msg = new message.CustomFormationInfo();
                var decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        };
        /**
         * 遗迹保存阵容信息
         */
        PlayerFormationSystem.prototype.SaveRelicFormation = function () {
            var formatInfo = this.getRelicFormationInfoStreet();
            this.RelicFormationMap = [];
            this.RelicFormationMap.push(formatInfo);
            var msg = JSON.stringify(this.RelicFormationMap);
            zj.Game.Controller.setRoleStorageItem("RelicFormation", msg);
            this.relicFrontSerialize(formatInfo); // 流星街序列化
        };
        PlayerFormationSystem.prototype.getRelicFormationInfoStreet = function () {
            var formats = [];
            for (var k = 0; k < this.formatsRelic.length; k++) {
                var v = this.formatsRelic[k];
                formats.push(v);
            }
            var msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(zj.Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(zj.Game.Controller.groupOwnerID());
            return msg;
        };
        /**
         * 遗迹序列化
         */
        PlayerFormationSystem.prototype.relicFrontSerialize = function (formatInfo) {
            var encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            var buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            var saveStr = egret.Base64Util.encode(buf);
            zj.Game.Controller.setRoleStorageItem("streetSerialize", saveStr);
        };
        /**
         * 遗迹反序列化
         */
        PlayerFormationSystem.prototype.relicContrarySerialize = function () {
            var saveStr = zj.Game.Controller.getRoleStorageItem("streetSerialize");
            if (saveStr && saveStr.length > 0) {
                var buf = egret.Base64Util.decode(saveStr);
                var msg = new message.CustomFormationInfo();
                var decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        };
        /**
         * 阵容方案保存--本服
         */
        PlayerFormationSystem.prototype.SaveSquadPlan = function () {
            var formatInfo = this.getSquadPlan();
            this.squadPlanMap = [];
            this.squadPlanMap.push(formatInfo);
            var msg = JSON.stringify(this.squadPlanMap);
            zj.Game.Controller.setRoleStorageItem("SquadPlan", msg);
            this.streetFrontSquadPlan(formatInfo);
        };
        PlayerFormationSystem.prototype.getSquadPlan = function () {
            var formats = [];
            for (var k = 0; k < this.squadPlan.length; k++) {
                var v = this.squadPlan[k];
                formats.push(v);
            }
            var msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(zj.Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(zj.Game.Controller.groupOwnerID());
            return msg;
        };
        /**
         * 阵容方案序列化--本服
         */
        PlayerFormationSystem.prototype.streetFrontSquadPlan = function (formatInfo) {
            var encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            var buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            var saveStr = egret.Base64Util.encode(buf);
            zj.Game.Controller.setRoleStorageItem("SquadPlanSerialize", saveStr);
        };
        /**
         * 阵容方案反序列化--本服
         */
        PlayerFormationSystem.prototype.streetContrarySquadPlan = function () {
            var saveStr = zj.Game.Controller.getRoleStorageItem("SquadPlanSerialize");
            if (saveStr && saveStr.length > 0) {
                var buf = egret.Base64Util.decode(saveStr);
                var msg = new message.CustomFormationInfo();
                var decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        };
        /**
         * 阵容方案保存--跨服
         */
        PlayerFormationSystem.prototype.SaveCrossBeam = function () {
            var formatInfo = this.getCrossBeam();
            this.crossBeamMap = [];
            this.crossBeamMap.push(formatInfo);
            var msg = JSON.stringify(this.crossBeamMap);
            zj.Game.Controller.setRoleStorageItem("CrossBeam", msg);
            this.streetFrontCrossBeam(formatInfo);
        };
        PlayerFormationSystem.prototype.getCrossBeam = function () {
            var formats = [];
            for (var k = 0; k < this.crossBeam.length; k++) {
                var v = this.crossBeam[k];
                formats.push(v);
            }
            var msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(zj.Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(zj.Game.Controller.groupOwnerID());
            return msg;
        };
        /**
         * 阵容方案序列化--跨服
         */
        PlayerFormationSystem.prototype.streetFrontCrossBeam = function (formatInfo) {
            var encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            var buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            var saveStr = egret.Base64Util.encode(buf);
            zj.Game.Controller.setRoleStorageItem("CrossBeamSerialize", saveStr);
        };
        /**
         * 阵容方案反序列化--跨服
         */
        PlayerFormationSystem.prototype.streetContraryCrossBeam = function () {
            var saveStr = zj.Game.Controller.getRoleStorageItem("CrossBeamSerialize");
            if (saveStr && saveStr.length > 0) {
                var buf = egret.Base64Util.decode(saveStr);
                var msg = new message.CustomFormationInfo();
                var decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        };
        /**
         * 阵容方案保存--好友单队切磋
         */
        PlayerFormationSystem.prototype.SaveFriendsTeams = function () {
            var formatInfo = this.getFriendsTeams();
            this.friendsTeamsMap = [];
            this.friendsTeamsMap.push(formatInfo);
            var msg = JSON.stringify(this.friendsTeamsMap);
            zj.Game.Controller.setRoleStorageItem("friendsTeams", msg);
            this.streetFrontFriendsTeams(formatInfo);
        };
        PlayerFormationSystem.prototype.getFriendsTeams = function () {
            var formats = [];
            for (var k = 0; k < this.friendsTeams.length; k++) {
                var v = this.friendsTeams[k];
                formats.push(v);
            }
            var msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(zj.Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(zj.Game.Controller.groupOwnerID());
            return msg;
        };
        /**
         * 阵容方案序列化--好友单队切磋
         */
        PlayerFormationSystem.prototype.streetFrontFriendsTeams = function (formatInfo) {
            var encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            var buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            var saveStr = egret.Base64Util.encode(buf);
            zj.Game.Controller.setRoleStorageItem("FriendsTeamsSerialize", saveStr);
        };
        /**
         * 阵容方案反序列化--好友单队切磋
         */
        PlayerFormationSystem.prototype.streetContraryFriendsTeams = function () {
            var saveStr = zj.Game.Controller.getRoleStorageItem("FriendsTeamsSerialize");
            if (saveStr && saveStr.length > 0) {
                var buf = egret.Base64Util.decode(saveStr);
                var msg = new message.CustomFormationInfo();
                var decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        };
        /**
         * 阵容方案保存--好友多队切磋
         */
        PlayerFormationSystem.prototype.SaveMoreTeam = function () {
            var formatInfo = this.getMoreTeam();
            this.moreTeamMap = [];
            this.moreTeamMap.push(formatInfo);
            var msg = JSON.stringify(this.moreTeamMap);
            zj.Game.Controller.setRoleStorageItem("moreTeam", msg);
            this.streetFrontmoreTeam(formatInfo);
        };
        PlayerFormationSystem.prototype.getMoreTeam = function () {
            var formats = [];
            for (var k = 0; k < this.moreTeam.length; k++) {
                var v = this.moreTeam[k];
                formats.push(v);
            }
            var msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(zj.Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(zj.Game.Controller.groupOwnerID());
            return msg;
        };
        /**
         * 阵容方案序列化--好友多队切磋
         */
        PlayerFormationSystem.prototype.streetFrontmoreTeam = function (formatInfo) {
            var encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            var buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            var saveStr = egret.Base64Util.encode(buf);
            zj.Game.Controller.setRoleStorageItem("MoreTeamSerialize", saveStr);
        };
        /**
         * 阵容方案反序列化--好友多队切磋
         */
        PlayerFormationSystem.prototype.streetContraryMoreTeam = function () {
            var saveStr = zj.Game.Controller.getRoleStorageItem("MoreTeamSerialize");
            if (saveStr && saveStr.length > 0) {
                var buf = egret.Base64Util.decode(saveStr);
                var msg = new message.CustomFormationInfo();
                var decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        };
        PlayerFormationSystem.prototype.InitInstanceInfo = function () {
            zj.Game.PlayerInstanceSystem.curInstances = [];
            for (var k in message.EFormationType) {
                var v = message.EFormationType[k];
                var instance = new message.CustomInstanceInfo();
                instance.instanceType = Number(v);
                zj.Game.PlayerInstanceSystem.curInstances[Number(v)] = instance;
            }
        };
        // 阵上是否有空武将位置
        PlayerFormationSystem.prototype.HaveMoreGeneral = function (ui, suffixs, minSize) {
            var formatdb = [];
            if (suffixs == null) {
                suffixs = ["generals", "reserves", "supports"];
            }
            var ret = false;
            //阵型是否有空位
            var formatTbl = [];
            var bLeftPos = false;
            var bBreak = false;
            var suffixRet = "";
            var empty_num = 0;
            var format_item = Instance();
            for (var i = 0; i < suffixs.length; i++) {
                if (suffixs[i] != "reserves") {
                    var _suffix = suffixs[i];
                    if (this.itemlist != null) {
                        var tblData = [];
                        if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {
                            tblData = zj.Game.PlayerFormationSystem.formatsWant[0][_suffix];
                        }
                        else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_RELIC) {
                            tblData = this.formatsRelic[0][_suffix];
                        }
                        else {
                            tblData = this.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType][_suffix];
                        }
                        var level = zj.yuan3(i == 0, zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID, zj.Game.PlayerInfoSystem.BaseInfo.level);
                        var _a = CurrFormation(i + 1, tblData, level), _t = _a[0], cntReal = _a[1];
                        for (var j = 0; j < cntReal; j++) {
                            if (tblData[j] == 0) {
                                bBreak = true || bBreak;
                                bLeftPos = true || bLeftPos;
                                suffixRet = _suffix;
                                empty_num = empty_num + 1;
                            }
                        }
                    }
                }
            }
            // 是否有未上阵武将
            var bLeftGeneral = false;
            var generals = zj.Game.PlayerHunterSystem.getSortGeneralFormat(); // 返回现有武将排序
            //不上阵武将
            var general_limit_use_ids = [10057, 10058, 10059, 10074];
            for (var k = 0; k < generals.length; k++) {
                if (!SameGeneralInFormate(generals[k].general_id, this.curFormationMap)) {
                    var typeIn = this.bUsed(generals[k].general_id);
                    // 有可能老账号，有的上阵类型隐藏了
                    if (typeIn == 0
                        || suffixs[typeIn] == null
                        || (ui.itemsAnimateMap[generals[k].general_id] == null && typeIn == 1)
                            && !(zj.Table.VIn(general_limit_use_ids, zj.PlayerHunterSystem.GetGeneralId(generals[k].general_id)))) {
                        bLeftGeneral = true;
                        break;
                    }
                    if (typeIn == 3) {
                        bLeftGeneral = true;
                        for (var kk in ui.itemsAnimateMap) {
                            var vv = ui.itemsAnimateMap[kk];
                            if (vv.supportID % 100000 == generals[k].general_id % 100000) {
                                bLeftGeneral = false;
                                break;
                            }
                        }
                    }
                }
            }
            var bMinSize = true;
            if (minSize != null) {
                bMinSize = generals.length >= minSize;
            }
            ret = bLeftPos && bLeftGeneral && bMinSize;
            return [ret, suffixRet, empty_num];
        };
        PlayerFormationSystem.prototype.InitFormatsData = function () {
            for (var i = 0; i < 3; i++) {
                this.formats.push(new message.FormationInfo());
            }
            // this.formats.push(this.create_msg(message.FormationInfo));
            // this.formats.push(this.create_msg(message.FormationInfo));
            // this.formats.push(this.create_msg(message.FormationInfo));
            var buttonNames = ["generals", "reserves", "supports"];
            for (var kk in this._formatsSingleAttack) {
                var vv = this._formatsSingleAttack[kk];
                if (vv.formationIndex <= 3) {
                    this.formats[vv.formationIndex] = vv;
                }
            }
            for (var fk in this.formats) {
                var fv = this.formats[fk];
                for (var kk in buttonNames) {
                    var vv = buttonNames[kk];
                    for (var i = 1; i < 4; i++) {
                        if (fv[vv][i] == null || fv[vv][i] == 0) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                this.formats[fk].formationType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
                this.formats[fk].formationIndex = fk;
            }
            this.formatsSingleAttack = this.formats;
        };
        PlayerFormationSystem.prototype.create_msg = function (def) {
            var msg = [];
            var attribsDef = def["attribs"];
            if (attribsDef == null) {
                msg["def"] = def;
                return msg;
            }
            for (var i in attribsDef) {
                var attr = attribsDef[i];
                var attrName = attr[1];
                var attrType = attr[2];
                if (attr[3] == "repeat") {
                    msg[attrName] = [];
                }
                else if (attrType == "string") {
                    msg[attrName] = "";
                }
                else if (attrType == "bool") {
                    msg[attrName] = false;
                }
                else {
                    msg[attrName] = 0;
                }
            }
            msg["def"] = def;
            return msg;
        };
        /**
         * 判断每个队列至少上一个武将(非援护)
         */
        PlayerFormationSystem.prototype.JudgeGeneral = function () {
            var result = 0;
            for (var k in this.formatsSingleAttack) {
                var v = this.formatsSingleAttack[k];
                var num = 0;
                for (var kk in v.generals) {
                    var vv = v.generals[kk];
                    if (vv != 0) {
                        num = num + 1;
                    }
                }
                if (num == 0) {
                    result = Number(k);
                    return result;
                }
            }
            return result;
        };
        /** 武将信息去重*/
        PlayerFormationSystem.prototype.eliminateRepeatGeneral = function (data) {
            var tbl = data;
            var exitMap = {};
            // 检查武将信息
            for (var index = 0; index < tbl.generals.length; index++) {
                var generalId = tbl.generals[index];
                var tmpId = zj.PlayerHunterSystem.GetGeneralId(generalId);
                if (generalId != 0 && exitMap[tmpId] != null && exitMap[tmpId] != generalId) {
                    generalId = 0;
                    tbl.generals[index] = 0;
                    console.log("--- eliminateRepeatGeneral, general id = ", tmpId);
                }
                if (generalId != 0) {
                    exitMap[tmpId] = generalId;
                }
            }
            // 检查圆柱信息
            for (var index = 0; index < tbl.supports.length; index++) {
                var generalId = tbl.supports[index];
                var tmpId = zj.PlayerHunterSystem.GetGeneralId(generalId);
                if (generalId != 0 && exitMap[tmpId] != null && exitMap[tmpId] != generalId) {
                    generalId = 0;
                    tbl.supports[index] = 0;
                    console.log("--- eliminateRepeatGeneral, supports id = ", tmpId);
                }
                if (generalId != 0) {
                    exitMap[tmpId] = generalId;
                }
            }
            return tbl;
        };
        //返回当前允许的最大阵型位置信息
        PlayerFormationSystem.prototype.maxFormat = function () {
            var ret = {};
            var format_item = zj.TableFormations.Item(zj.Game.PlayerInstanceSystem.curInstanceType);
            var tblIndex = ["generals", "reserves", "supports"];
            for (var i = 0; i < tblIndex.length; i++) {
                if (i != 1) {
                    var suffix = tblIndex[i];
                    var format_add = this.addTbl(false, i);
                    ret[suffix] = format_item[suffix];
                    if (format_add != null) {
                        ret[suffix] = ret[suffix] + format_add;
                    }
                }
            }
            return ret;
        };
        //下一次阵型位置增加的阵型信息
        PlayerFormationSystem.prototype.addTbl = function (bNext, tagType) {
            var format_item = zj.TableFormations.Item(zj.Game.PlayerInstanceSystem.curInstanceType);
            var format_add_idx = this.addIndex(bNext, tagType);
            var lv_key = zj.StringConfig_TagString.formatChoose[tagType + 1] + "_limit_number";
            return format_item[lv_key][format_add_idx];
        };
        //下次阵型位置增加的等级
        PlayerFormationSystem.prototype.addIndex = function (bNext, tagType) {
            function compare_func(srcVar, tagType) {
                var dstVar = zj.Game.PlayerInfoSystem.Level;
                if (tagType == 1) {
                    dstVar = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
                }
                return srcVar > dstVar;
            }
            if (bNext == null) {
                bNext = false;
            }
            var lv_key = zj.StringConfig_TagString.formatChoose[tagType] + "_limit_level";
            var tbl_item = zj.TableFormations.Table();
            var ret = 1;
            //当前级别默认返回最低的，下一级别默认返回最高的
            ret = zj.Helper.getObjLen(tbl_item[lv_key]);
            for (var i = 0; i < zj.Helper.getObjLen(tbl_item[lv_key]); i++) {
                if (compare_func(tbl_item[lv_key][i], tagType)) {
                    if (bNext) {
                        ret = i;
                    }
                    else {
                        if (tbl_item[lv_key][i - 1] != null) {
                            ret = i - 1;
                        }
                    }
                    continue;
                }
            }
            return ret;
        };
        PlayerFormationSystem.prototype.analyseResult = function (fType) {
            this.main = zj.Helper.writeMainFormat(this.curFormations[fType - 1]);
            this.format = zj.Helper.writeSimpleFormat(this.curFormations[fType - 1]);
            var format = this.maxFormat();
            var formatPosNum = (format["generals"] + format["supports"]);
            var current = this.format.length;
            var own = zj.Game.PlayerHunterSystem.queryAllHunters().length;
            var max = zj.Helper.getObjLen(zj.TableBaseGeneral.Table());
            var tblResult = [];
            var visitTag = false;
            if (current < own && current < formatPosNum) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_FORMAT;
                info["general_id"] = null;
                tblResult.push(info);
            }
            else if (own < formatPosNum && own < max && current < formatPosNum) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_VISIT;
                info["general_id"] = null;
                tblResult.push(info);
                visitTag = true;
            }
            var key = this.cardNum();
            if (key != null && !zj.Device.isReviewSwitch && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO)) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_CARD_NUM;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.cardLevel();
            if (key != null && !zj.Device.isReviewSwitch && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.POTATO)) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_CARD_LEVEL;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.generalLevel();
            if (key != null) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_LEVEL;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.generalStep();
            if (key != null) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STEP;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.generalStar();
            if (key != null) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STAR;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.skillLevel();
            if (key != null && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.SKILL)) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_SKILLS;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.adviserLevel();
            if (key != null && !zj.Device.isReviewSwitch && zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.ADVISER)) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_UPGRADE_ADVISER;
                info["general_id"] = key;
                tblResult.push(info);
            }
            if (visitTag == false && tblResult.length <= 1 && own < max) {
                var info = {};
                info["type"] = zj.TableEnum.EnumAnalyseResult.RESULT_VISIT;
                info["general_id"] = null;
                tblResult.push(info);
            }
            return tblResult;
        };
        PlayerFormationSystem.prototype.skillLevel = function () {
            var skill_level = zj.TableClientPowerLevel.Table()[zj.Game.PlayerInfoSystem.Level].skill_level;
            for (var i = 0; i < this.main.length; i++) {
                var key = this.main[i];
                var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                var general = generalsMap[key];
                if (general != null) {
                    for (var j = 0; j < general.skills.length; j++) {
                        if (general.skills[j].level < skill_level) {
                            return key;
                        }
                    }
                    for (var j = 0; j < general.passives.length; j++) {
                        if (general.passives[j].level < skill_level) {
                            return key;
                        }
                    }
                }
            }
            return null;
        };
        PlayerFormationSystem.prototype.generalStar = function () {
            var general_star = zj.TableClientPowerLevel.Table()[zj.Game.PlayerInfoSystem.Level].general_star;
            for (var i = 0; i < this.main.length; i++) {
                var key = this.main[i];
                var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                var general = generalsMap[key];
                if (general.star < general_star) {
                    return key;
                }
            }
            return null;
        };
        PlayerFormationSystem.prototype.generalStep = function () {
            var general_step = zj.TableClientPowerLevel.Table()[zj.Game.PlayerInfoSystem.Level].general_step;
            for (var i = 0; i < this.main.length; i++) {
                var key = this.main[i];
                var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                var general = generalsMap[key];
                if (general.step < general_step) {
                    return key;
                }
            }
            return null;
        };
        PlayerFormationSystem.prototype.adviserLevel = function () {
            var adviser_level = zj.TableClientPowerLevel.Table()[zj.Game.PlayerInfoSystem.Level].animal_level;
            if (zj.Game.PlayerAdviserSystem.adviser.length == 0) {
                return 1;
            }
            else {
                var tbl = zj.Table.DeepCopy(zj.Game.PlayerAdviserSystem.adviser);
                tbl.sort(function (a, b) {
                    return b.level - a.level;
                });
                if (tbl[0].level < adviser_level) {
                    return 1;
                }
            }
            return null;
        };
        PlayerFormationSystem.prototype.generalLevel = function () {
            var general_level = zj.TableClientPowerLevel.Table()[zj.Game.PlayerInfoSystem.Level].general_level;
            for (var i = 0; i < this.main.length; i++) {
                var key = this.main[i];
                var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                var general = generalsMap[key];
                if (general.level < general_level) {
                    return key;
                }
            }
            return null;
        };
        PlayerFormationSystem.prototype.cardNum = function () {
            for (var i = 0; i < this.main.length; i++) {
                var key = this.main[i];
                var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                var general = generalsMap[key];
                var num = zj.Game.PlayerCardSystem.cardOpenNum(general.general_id, zj.Game.PlayerInfoSystem.Level);
                if (general.potatoInfo.length < num) {
                    return key;
                }
            }
            return null;
        };
        PlayerFormationSystem.prototype.cardLevel = function () {
            for (var i = 0; i < this.main.length; i++) {
                var key = this.main[i];
                var generalsMap = zj.Game.PlayerHunterSystem.allHuntersMap();
                var general = generalsMap[key];
                for (var j = 0; j < general.potatoInfo.length; j++) {
                    var max_level = zj.CommonConfig.card_star_max_level[general.potatoInfo[j].star];
                    if (max_level != null) {
                        if (general.potatoInfo[j].level < max_level) {
                            return key;
                        }
                    }
                }
            }
            return null;
        };
        //判断武将是否上阵，返回上阵类型，主队/替补/援护
        PlayerFormationSystem.prototype.bUsed = function (generalID, formationType) {
            var _this = this;
            var getCurrAllFormat = function (formationType) {
                if (formationType == null || formationType == undefined) {
                    formationType = zj.Game.PlayerInstanceSystem.curInstanceType;
                }
                var format = [];
                if (formationType == message.EFormationType.FORMATION_TYPE_WANTED) {
                    format = [_this.formatsWant[0]];
                }
                else if (formationType == message.EFormationType.FORMATION_TYPE_RELIC) {
                    format = [_this.formatsRelic[0]];
                }
                else if (formationType == message.EFormationType.FORMATION_TYPE_CRAFT) {
                    format.push(_this.formatsSingleDefine);
                }
                else if (formationType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK || formationType == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                    format.push(_this.formatsSingleAttack);
                }
                else if (formationType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                    format.push(_this.formatsGroupFight);
                }
                else if (formationType == message.EFormationType.FORMATION_TYPE_MATCH_DEFENSE) {
                    format.push(_this.formatsMatchDefine);
                }
                else {
                    format.push(_this.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1]);
                }
                return format;
            };
            var format = getCurrAllFormat(formationType);
            // todo，后序可以用genID构造一个上阵索引表，提高效率
            if (format == null) {
                return 0;
            }
            var suffixs = ["generals", "reserves", "supports"];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(format); _i < _a.length; _i++) {
                var _b = _a[_i], fk = _b[0], fv = _b[1];
                for (var _c = 0, _d = zj.HelpUtil.GetKV(suffixs); _c < _d.length; _c++) {
                    var _e = _d[_c], k = _e[0], v = _e[1];
                    for (var j = 0; j < zj.Game.PlayerMissionSystem.tableLength(fv[v]); j++) {
                        if (fv[v][j] != 0) {
                            if (fv[v][j] % 100000 == generalID % 100000) {
                                return k;
                            }
                        }
                        else {
                            return -1;
                        }
                    }
                }
            }
            return -1;
        };
        PlayerFormationSystem.prototype.GetAllFormatGeneralByType = function (type) {
            var ret = [];
            var tbl = this.curFormations[type - 1];
            if (tbl == null || tbl == undefined) {
                return [];
            }
            for (var k in tbl["generals"]) {
                var v = tbl["generals"][k];
                ret.push(v);
            }
            for (var k in tbl["supports"]) {
                var v = tbl["supports"][k];
                ret.push(v);
            }
            return ret;
        };
        PlayerFormationSystem.prototype.checkGeneralInFormat = function (formateType, generalId) {
            var tbl = this.curFormations[formateType - 1];
            for (var _i = 0, _a = tbl["generals"]; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v == generalId)
                    return true;
            }
            for (var _b = 0, _c = tbl["supports"]; _b < _c.length; _b++) {
                var v = _c[_b];
                if (v == generalId)
                    return true;
            }
            return false;
        };
        return PlayerFormationSystem;
    }());
    zj.PlayerFormationSystem = PlayerFormationSystem;
    __reflect(PlayerFormationSystem.prototype, "zj.PlayerFormationSystem");
    function CurrFormation(tagType, maxNumber, currLv) {
        var format_item = zj.TableFormations.Item(zj.Game.PlayerInstanceSystem.curInstanceType);
        var init_number_key = zj.StringConfig_TagString.formatChoose[tagType];
        var limit_lv_key = zj.StringConfig_TagString.formatChoose[tagType] + "_limit_level";
        var limit_number_key = zj.StringConfig_TagString.formatChoose[tagType] + "_limit_number";
        var init_number = format_item[init_number_key];
        var lv_add_tbl = format_item[limit_lv_key];
        var number_add_tbl = format_item[limit_number_key];
        var add_number = 0;
        var index = 0;
        for (var i = lv_add_tbl.length - 1; i >= 0; i--) {
            if (currLv >= lv_add_tbl[i]) {
                add_number = zj.yuan3(number_add_tbl[i] != null, number_add_tbl[i], 0);
                index = i;
                break;
            }
        }
        var real_number = init_number + add_number;
        var result = [];
        for (var i = 0; i < maxNumber.length; i++) {
            var info = { bLock: null, openDes: null };
            if (i < real_number) {
                info.bLock = false;
                info.openDes = "";
            }
            else {
                info.bLock = true;
                if (tagType == 1) {
                    // info.openDes = yuan3(format_item.unopen_des[index + 1] != null, format_item.unopen_des[index + 1], "");
                    info.openDes = format_item.unopen_des;
                }
                else {
                    //TextsConfig.TextsConfig_Common.openAutoLv
                    // info.openDes = TextsConfig.TextsConfig_Common.openAutoLv = Helper.StringFormat(yuan3(lv_add_tbl[index + 1] != null, lv_add_tbl[index + 1], 99));
                    info.openDes = format_item.unopen_des;
                }
                index = index + 1;
            }
            result.push(info);
        }
        return [result, real_number];
    }
    function SameGeneralInFormate(generalId, formation) {
        if (formation == null) {
            return false;
        }
        for (var k in formation) {
            var v = formation[k];
            if (zj.PlayerHunterSystem.GetGeneralId(generalId) == zj.PlayerHunterSystem.GetGeneralId(Number(k))) {
                return true;
            }
        }
        return false;
    }
    function Instance(id) {
        if (id == null) {
            id = zj.Game.PlayerInstanceSystem.curInstanceType;
        }
        if (zj.ckid(id)) {
            return null;
        }
        return zj.TableFormations.Item(id);
    }
    /**
     * 其他副本数据
     */
    // export class message.CustomFormationInfo {
    //     formations: Array<message.FormationInfo> = [];
    //     ID: string = "";
    //     OwnerGroupID: string = "";
    //     public parse_bytes(decoder: aone.BinaryDecoder): boolean { return false; }
    //     public to_bytes(encoder: aone.BinaryEncoder): boolean { return false; }
    // }
    /**
     * 跨服格斗场数据
     */
    // export class message.CustomSingleFormationInfo {
    //     formations: Array<message.FormationInfo> = [];
    //     ID: string = null;
    //     OwnerGroupID: string = null;
    // }
    /**
     * 其他副本阵营存储
     */
    var CustomFormationMap = (function () {
        function CustomFormationMap() {
            this.units = [];
        }
        return CustomFormationMap;
    }());
    zj.CustomFormationMap = CustomFormationMap;
    __reflect(CustomFormationMap.prototype, "zj.CustomFormationMap");
    /**
     * 跨服格斗场存储
     */
    var CrossRealmFormationMap = (function () {
        function CrossRealmFormationMap() {
            this.units = [];
        }
        return CrossRealmFormationMap;
    }());
    zj.CrossRealmFormationMap = CrossRealmFormationMap;
    __reflect(CrossRealmFormationMap.prototype, "zj.CrossRealmFormationMap");
    /**
     * 好友三队切磋存储
     */
    var friendsThreeTeamsPlayMap = (function () {
        function friendsThreeTeamsPlayMap() {
            this.units = [];
        }
        return friendsThreeTeamsPlayMap;
    }());
    zj.friendsThreeTeamsPlayMap = friendsThreeTeamsPlayMap;
    __reflect(friendsThreeTeamsPlayMap.prototype, "zj.friendsThreeTeamsPlayMap");
    /**
     * 流星街阵营存储
     */
    var StreetFormationMap = (function () {
        function StreetFormationMap() {
            this.units = [];
        }
        return StreetFormationMap;
    }());
    zj.StreetFormationMap = StreetFormationMap;
    __reflect(StreetFormationMap.prototype, "zj.StreetFormationMap");
    /**
     * 遗迹阵营存储
     */
    var RelicFormationMap = (function () {
        function RelicFormationMap() {
            this.units = [];
        }
        return RelicFormationMap;
    }());
    zj.RelicFormationMap = RelicFormationMap;
    __reflect(RelicFormationMap.prototype, "zj.RelicFormationMap");
    /**
     * 阵容方案本服阵营存储
     */
    var squadPlanMap = (function () {
        function squadPlanMap() {
            this.units = [];
        }
        return squadPlanMap;
    }());
    zj.squadPlanMap = squadPlanMap;
    __reflect(squadPlanMap.prototype, "zj.squadPlanMap");
    /**
     * 阵容方案跨服阵营存储
     */
    var crossBeamMap = (function () {
        function crossBeamMap() {
            this.units = [];
        }
        return crossBeamMap;
    }());
    zj.crossBeamMap = crossBeamMap;
    __reflect(crossBeamMap.prototype, "zj.crossBeamMap");
    /**
     * 阵容方案好友单队切磋阵营存储
     */
    var friendsTeamsMap = (function () {
        function friendsTeamsMap() {
            this.units = [];
        }
        return friendsTeamsMap;
    }());
    zj.friendsTeamsMap = friendsTeamsMap;
    __reflect(friendsTeamsMap.prototype, "zj.friendsTeamsMap");
    /**
     * 阵容方案好友多队切磋阵营存储
     */
    var moreTeamMap = (function () {
        function moreTeamMap() {
            this.units = [];
        }
        return moreTeamMap;
    }());
    zj.moreTeamMap = moreTeamMap;
    __reflect(moreTeamMap.prototype, "zj.moreTeamMap");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerFormationSystem.js.map