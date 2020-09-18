var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 天空竞技场系统
    // wangshenzhuo 创建于2019.02.22
    // 对应db_tower.ts
    var PlayerTowerSystem = (function () {
        function PlayerTowerSystem() {
            this.towerInfo = null; // 爬塔
            this.towerType = 0; // -- 天空jjc 类型（1低级塔，2高级塔）
        }
        // 天空竞技场副本
        PlayerTowerSystem.prototype.getTableTower = function () {
            return zj.TableTower.Table();
        };
        PlayerTowerSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOWER_INFO_CHANGE, this.onTowerInfoChange, this);
        };
        PlayerTowerSystem.prototype.uninit = function () {
            this.towerInfo = null;
            this.towerType = 0;
        };
        PlayerTowerSystem.prototype.onTowerInfoChange = function (ev) {
            this.towerInfo = ev.data;
        };
        PlayerTowerSystem.Item = function (id) {
            var towerId = id || zj.Game.PlayerTowerSystem.towerInfo.towerCur;
            if (id == 0 || id == -1)
                return null;
            return zj.TableTower.Item(id);
        };
        //是否达到顶层
        PlayerTowerSystem.isTopFloor = function (id) {
            var maxCell = null;
            if (maxCell == null) {
                var towerInfo = PlayerTowerSystem.floorInfo();
                var curTowerInfo = {};
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                    curTowerInfo = towerInfo[0];
                }
                else {
                    curTowerInfo = towerInfo[1];
                }
                maxCell = zj.Table.LengthDisorder(curTowerInfo);
            }
            if (id >= maxCell) {
                return true;
            }
            return false;
        };
        PlayerTowerSystem.floorInfo = function () {
            var floorInfos = [[], []];
            var tbl = zj.TableTower.Table();
            for (var k in tbl) {
                var v = tbl[k];
                if (v.id >= zj.CommonConfig.high_tower_first_id) {
                    floorInfos[1][v.id - 1] = v;
                }
                else {
                    floorInfos[0][v.id - 1] = v;
                }
            }
            return floorInfos;
        };
        //高级塔顺序索引
        PlayerTowerSystem.floorHighByIndexInfo = function () {
            var tbl = PlayerTowerSystem.floorInfo();
            var newTbl = [];
            for (var k in tbl[1]) {
                var v = tbl[1][k];
                newTbl.push(v);
            }
            zj.Table.Sort(newTbl, function (a, b) {
                return a.id - b.id;
            });
            return newTbl;
        };
        PlayerTowerSystem.jump_floor = function () {
            var floor = 1;
            var can_jump = false;
            if (zj.Game.PlayerTowerSystem.towerInfo.towerMax > 0) {
                floor = zj.Game.PlayerTowerSystem.towerInfo.towerMax;
            }
            if (zj.Game.PlayerTowerSystem.towerInfo.towerCur < floor - 1 && !zj.Game.PlayerInstanceSystem.Is_JumpTower && floor != 1) {
                can_jump = true;
            }
            return [can_jump, floor];
        };
        PlayerTowerSystem.jumpHigh_floor = function () {
            var floor = 1;
            var can_jump = false;
            // if (Game.PlayerTowerSystem.towerInfo.high_tower_max != null) {
            //     if (Game.PlayerTowerSystem.towerInfo.high_tower_max > 0) {
            //         floor = Game.PlayerTowerSystem.towerInfo.high_tower_max;
            //     }
            //     if (Game.PlayerTowerSystem.towerInfo.high_tower_cur < floor - 1 && !Game.PlayerInstanceSystem.High_is_jumpTower && floor != 1) {
            //         can_jump = true;
            //     }
            // }
            return [can_jump, floor];
        };
        PlayerTowerSystem.dealSweapTime = function (hard) {
            if (hard == 1) {
                var curServerTime = Date.parse(zj.Game.Controller.serverNow().toString()) / 1000;
                //wday  [星期，从星期日算起，范围为1-7]
                var week = new Date(zj.Game.PlayerInstanceSystem.LastTowerRefreshTime);
                var wday = (week.getDay()) + 1 == 2;
                var reset_time = null;
                if (wday) {
                    reset_time = zj.Game.PlayerInstanceSystem.LastTowerRefreshTime + zj.CommonConfig.tower_refresh_day * 3600 * 24 - curServerTime;
                }
                else {
                    var time = Math.floor((zj.Game.PlayerInstanceSystem.LastTowerRefreshTime) / (zj.CommonConfig.tower_refresh_day * 3600 * 24));
                    time = time * (zj.CommonConfig.tower_refresh_day * 3600 * 24);
                    reset_time = time - curServerTime + 3 * 3600 * 24 + 20 * 3600;
                    if (reset_time < 0) {
                        reset_time = (reset_time + 5 * zj.CommonConfig.tower_refresh_day * 3600 * 24) % (zj.CommonConfig.tower_refresh_day * 3600 * 24);
                    }
                }
                var areset_time = zj.Game.PlayerInstanceSystem.LastTowerRefreshTime + zj.CommonConfig.tower_refresh_day * 3600 * 24 - curServerTime;
                return areset_time;
            }
            else if (hard == 2) {
                var reset_time = null;
                //wday  [星期，从星期日算起，范围为1-7]
                var week = new Date(zj.Game.PlayerInstanceSystem.High_lastTowerRefreshTIme);
                var wday = (week.getDay()) + 1 == 2;
                var curServerTime = Date.parse(zj.Game.Controller.serverNow().toString()) / 1000;
                if (wday) {
                    reset_time = zj.Game.PlayerInstanceSystem.High_lastTowerRefreshTIme + zj.CommonConfig.high_refresh_day * 3600 * 24 - curServerTime;
                }
                else {
                    var time = Math.floor((zj.Game.PlayerInstanceSystem.High_lastTowerRefreshTIme) / (zj.CommonConfig.high_refresh_day * 3600 * 24));
                    time = time * (zj.CommonConfig.high_refresh_day * 3600 * 24);
                    reset_time = time - curServerTime + 3 * 3600 * 24 + 20 * 3600;
                    if (reset_time < 0) {
                        reset_time = (reset_time + 5 * zj.CommonConfig.high_refresh_day * 3600 * 24) % (zj.CommonConfig.high_refresh_day * 3600 * 24);
                    }
                }
                return reset_time;
            }
        };
        // 中文时间
        PlayerTowerSystem.formatMsTimeCh = function (ms) {
            var a = Math.floor(ms / 3600);
            var tmp = Math.floor(ms % 3600);
            var b = Math.floor(tmp / 60);
            var c = Math.floor(tmp % 60);
            var hour = a;
            var min = b;
            var sec = c;
            if (b != 0 && c == 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hour + min + zj.TextsConfig.TextsConfig_Time.min;
            }
            else if (b == 0 && c == 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hour;
            }
            return hour + zj.TextsConfig.TextsConfig_Time.hour + min + zj.TextsConfig.TextsConfig_Time.min + sec + zj.TextsConfig.TextsConfig_Time.sec;
        };
        //是否通关低级塔
        PlayerTowerSystem.IsPassLowTower = function () {
            return null; // (Game.PlayerTowerSystem.towerInfo.high_tower_cur != null) && (Game.PlayerTowerSystem.towerInfo.towerMax >= CommonConfig.open_high_condition);
        };
        //直达
        PlayerTowerSystem.TowerJumpReqBody_Visit = function (towerState, TowerHigh) {
            // return new Promise((resolve, reject) => {
            //     let request = new message.TowerJumpRequest();
            //     request.body.is_high = towerState == TowerHigh;
            //     Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            //         let response = <message.TowerJumpResponse>resp;
            //         console.log(response);
            //         if (response.header.result != 0) {
            //             reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
            //             return;
            //         }
            //         resolve(response);
            //         return;
            //     }, (req: aone.AoneRequest): void => {
            //         reject(LANG("请求超时"));
            //         return;
            //     }, this, false);
            //     return;
            // });
        };
        return PlayerTowerSystem;
    }());
    zj.PlayerTowerSystem = PlayerTowerSystem;
    __reflect(PlayerTowerSystem.prototype, "zj.PlayerTowerSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerTowerSystem.js.map