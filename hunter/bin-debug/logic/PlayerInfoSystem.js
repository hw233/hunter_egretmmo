var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 玩家游戏基本信息系统
    // guoshanhe 创建于2018.11.13
    var PlayerInfoSystem = (function () {
        function PlayerInfoSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            ///////////////////////////////////////////////////////////////////////////
            // 私有变量
            this.baseInfo = new message.RoleBaseInfo(); // 角色基本数据
            this.playAnnouce = true; //是否播放顶层动画tips
            this.isLookOtherPlayer = true; // 其他玩家是否可见
        }
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerInfoSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_BASE_INFO_CHANGE, this.onBaseInfoChange, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, this.onServerNoticeRoleInfo, this);
        };
        PlayerInfoSystem.prototype.uninit = function () {
            this.baseInfo = new message.RoleBaseInfo();
            zj.SceneManager.adventurePos = null;
        };
        PlayerInfoSystem.prototype.onBaseInfoChange = function (ev) {
            var baseInfo = ev.data;
            this.baseInfo_pre = this.baseInfo;
            var ladderRank = this.baseInfo ? this.baseInfo.ladderRank : 0;
            var ladderMax = this.baseInfo ? this.baseInfo.ladderMax : 0;
            this.baseInfo = baseInfo;
            if (this.baseInfo.ladderRank == 0) {
                this.baseInfo.ladderRank = ladderRank;
            }
            if (this.baseInfo.ladderMax == 0) {
                this.baseInfo.ladderMax = ladderMax;
            }
            if ((this.baseInfo_pre.level != 0) && (baseInfo.level > this.baseInfo_pre.level)) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_LEVEL_UP, baseInfo.level);
                zj.AoneTracker.track("roleUp"); // 埋点
                if (!zj.Device.isTeachOpen && baseInfo.level >= 3) {
                    this.checkAgreeEnter();
                }
            }
            if (baseInfo.money != this.baseInfo_pre.money) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_COIN_CHANGE, baseInfo.money);
            }
            if (baseInfo.token != this.baseInfo_pre.token) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_TOKEN_CHANGE, baseInfo.token);
            }
            if (baseInfo.power != this.baseInfo_pre.power) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_POWER_CHANGE, baseInfo.power);
            }
            if (baseInfo.permitPay != this.baseInfo_pre.permitPay) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_PERMITPAY_CHANGE);
            }
            if (baseInfo.permitLevel != this.baseInfo_pre.permitLevel) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_PERMITLEVEL_CHANGE, baseInfo.permitLevel);
            }
            if (baseInfo.vipLevel != this.baseInfo_pre.vipLevel) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_VIPLEVEL_CHANGE);
            }
            if (baseInfo.licenceLevel != this.baseInfo_pre.licenceLevel) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_LICENCELEVEL_CHANGE);
            }
            this.initLookOtherPlayer();
        };
        PlayerInfoSystem.prototype.checkAgreeEnter = function () {
            var _this = this;
            if (!this.IsAgreeEnter) {
                var baseInfo_1 = this.baseInfo;
                return new Promise(function (resolve, reject) {
                    var req = new message.SetAgreeEnterRequest();
                    req.body.agree_enter = true;
                    zj.Game.Controller.send(req, function (req, resp) {
                        var response = resp;
                        if (response.header.result != 0) {
                            return;
                        }
                        baseInfo_1.agree_enter = true;
                        // Game.EventManager.event(GameEvent.MAIN_CITY_MEMBER_LIST);
                        resolve(response);
                        return;
                    }, function (req) {
                        reject();
                    }, _this, false);
                    return;
                });
            }
            else {
                return null;
            }
        };
        PlayerInfoSystem.prototype.onServerNoticeRoleInfo = function (ev) {
            var request = ev.data;
            if (request.body.gameInfo.baseInfo.length == 0)
                return;
            var baseInfo = request.body.gameInfo.baseInfo[0];
            var token = this.baseInfo.token;
            var power = this.baseInfo.power;
            var level = this.baseInfo.level;
            var money = this.baseInfo.money;
            var permitPay = this.baseInfo.permitPay;
            var permitLevel = this.baseInfo.permitLevel;
            this.baseInfo = baseInfo;
            if ((level != 0) && (baseInfo.level > level)) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_LEVEL_UP, baseInfo.level);
            }
            if (baseInfo.money != money) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_COIN_CHANGE, baseInfo.money);
            }
            if (baseInfo.token != token) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_TOKEN_CHANGE, baseInfo.token);
            }
            if (baseInfo.power != power) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_POWER_CHANGE, baseInfo.power);
            }
            if (baseInfo.permitPay != permitPay) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_PERMITPAY_CHANGE);
            }
            if (baseInfo.permitLevel != permitLevel) {
                zj.Game.EventManager.event(zj.GameEvent.PLAYER_PERMITLEVEL_CHANGE, baseInfo.permitLevel);
            }
            zj.Game.EventManager.event(zj.GameEvent.SYSTEM_SETUP);
        };
        Object.defineProperty(PlayerInfoSystem.prototype, "RoleID", {
            // 角色ID
            get: function () {
                return this.baseInfo.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "RoleName", {
            // 角色名字
            get: function () {
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
                    return zj.TextsConfig.TextsConfig_Common.nameDefault;
                }
                return this.baseInfo.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "Beer", {
            //啤酒
            get: function () {
                return this.baseInfo.beer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "RedWine", {
            // 红酒
            get: function () {
                return this.baseInfo.redWine;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "Champagne", {
            // 香槟
            get: function () {
                return this.baseInfo.champagne;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "Soda", {
            // 苏打水
            get: function () {
                return this.baseInfo.soda;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "Rum", {
            /**朗姆酒 */
            get: function () {
                return this.baseInfo.rum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "LotteryScore", {
            // 酒馆积分
            get: function () {
                return this.baseInfo.lotteryScore;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "Token", {
            // 代币（钻石）
            get: function () {
                return this.baseInfo.token;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "Coin", {
            // 铜钱（金币）
            get: function () {
                return this.baseInfo.money;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "Power", {
            // 体力
            get: function () {
                return this.baseInfo.power;
            },
            set: function (power) {
                this.baseInfo.power = power;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "PowerMax", {
            get: function () {
                var Table = zj.TableLevel.Item(this.Level);
                if (Table) {
                    return Table.role_power + zj.PlayerVIPSystem.LowLevel().power_add;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "VipLevel", {
            // vip 等级
            get: function () {
                return this.baseInfo.vipLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "IsAgreeEnter", {
            // 是否进入地图
            get: function () {
                return this.baseInfo.agree_enter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "Level", {
            get: function () {
                return this.baseInfo.level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "LecenceLevel", {
            get: function () {
                return this.baseInfo.licenceLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "leagueName", {
            get: function () {
                return this.baseInfo.leagueName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "LeagueId", {
            // 公会 ID
            get: function () {
                return this.baseInfo.leagueId;
            },
            set: function (id) {
                if (this.baseInfo.leagueId != 0)
                    return;
                this.baseInfo.leagueId = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerInfoSystem.prototype, "BaseInfo", {
            get: function () {
                return this.baseInfo;
            },
            enumerable: true,
            configurable: true
        });
        //啤酒朗姆酒购买
        PlayerInfoSystem.buyBeer = function (item_id, item_num) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.QuickMallRequest();
                request.body.item_id = item_id;
                request.body.item_num = item_num;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(response.header.result);
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
        //酒馆抽猎人
        PlayerInfoSystem.compose = function (type, num) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var req = new message.NormalLotteryRequest();
                req.body.lottery_type = type;
                req.body.soda_num = num;
                zj.Game.Controller.send(req, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //酒馆朗姆酒抽猎人
        PlayerInfoSystem.ActivityLotterPond = function (type, num) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var req = new message.ActivityLotterPondRequest();
                req.body.activityIndex = type;
                req.body.soda_num = num;
                zj.Game.Controller.send(req, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerInfoSystem.prototype.queryRoleInfo = function (roleId, groupId, battleType) {
            var _this = this;
            if (battleType === void 0) { battleType = 0; }
            return new Promise(function (resolve, reject) {
                var request = new message.QueryRoleInfoRequest();
                request.body.roleId = roleId;
                request.body.group_id = groupId;
                request.body.battle_type = battleType;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // RoleInfoZip
                    var para = {};
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(response.body.roleInfo, para);
                    var plain = inflate.decompress();
                    var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var info = new message.RoleInfoZip();
                    if (!info.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return;
                    }
                    resolve(info);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        /** 检测下次心跳之前，是否有回复体力，有则加定时器检测回复 */
        PlayerInfoSystem.prototype.checkPowerAdd = function (serverTime, powerTime) {
            var _this = this;
            var time = 5 * 60 - (serverTime - powerTime);
            if (time < zj.Game.Controller.keepliveInterval) {
                egret.setTimeout(function () {
                    if (_this.baseInfo.power < _this.PowerMax) {
                        _this.baseInfo.power++;
                        zj.Game.EventManager.event(zj.GameEvent.PLAYER_POWER_CHANGE, _this.baseInfo.power);
                    }
                }, this, time * 1000);
            }
        };
        PlayerInfoSystem.prototype.initLookOtherPlayer = function () {
            var str = zj.Game.Controller.getRoleStorageItem("lookOtherPlayer");
            if (str == "0") {
                this.isLookOtherPlayer = false;
            }
        };
        PlayerInfoSystem.prototype.saveLookOtherPlayer = function () {
            zj.Game.Controller.setRoleStorageItem("lookOtherPlayer", this.isLookOtherPlayer ? "1" : "0");
        };
        PlayerInfoSystem.prototype.setLookOther = function (isCanLook) {
            if (this.isLookOtherPlayer != isCanLook) {
                this.isLookOtherPlayer = isCanLook;
                this.saveLookOtherPlayer();
                zj.Game.EventManager.event(zj.GameEvent.LOOK_OTHER_PLAYER);
            }
        };
        PlayerInfoSystem.prototype.getIsLookOtherPlayer = function () {
            return this.isLookOtherPlayer;
        };
        return PlayerInfoSystem;
    }());
    zj.PlayerInfoSystem = PlayerInfoSystem;
    __reflect(PlayerInfoSystem.prototype, "zj.PlayerInfoSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerInfoSystem.js.map