namespace zj {
    // 天空竞技场系统
    // wangshenzhuo 创建于2019.02.22
    // 对应db_tower.ts

    export class PlayerTowerSystem {

        public towerInfo: message.TowerInfo = null; // 爬塔
        public towerType: number = 0;  // -- 天空jjc 类型（1低级塔，2高级塔）

        // 天空竞技场副本
        public getTableTower(): { [key: string]: TableTower } {
            return TableTower.Table();
        }

        public init() {
            Game.EventManager.on(GameEvent.PLAYER_TOWER_INFO_CHANGE, this.onTowerInfoChange, this);
        }

        public uninit() {
            this.towerInfo = null;
            this.towerType = 0;
        }

        private onTowerInfoChange(ev: egret.Event) {
            this.towerInfo = <message.TowerInfo>ev.data;
        }

        public static Item(id) {
            let towerId = id || Game.PlayerTowerSystem.towerInfo.towerCur;
            if (id == 0 || id == -1) return null;
            return TableTower.Item(id);
        }


        //是否达到顶层
        public static isTopFloor(id) {
            let maxCell = null;
            if (maxCell == null) {
                let towerInfo = PlayerTowerSystem.floorInfo();
                let curTowerInfo = {};
                if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                    curTowerInfo = towerInfo[0];
                } else {
                    curTowerInfo = towerInfo[1];
                }
                maxCell = Table.LengthDisorder(curTowerInfo);
            }
            if (id >= maxCell) {
                return true;
            }
            return false;
        }

        public static floorInfo() {
            let floorInfos = [[], []];
            let tbl = TableTower.Table();
            for (const k in tbl) {
                const v = tbl[k];
                if (v.id >= CommonConfig.high_tower_first_id) {
                    floorInfos[1][v.id - 1] = v;
                } else {
                    floorInfos[0][v.id - 1] = v;
                }
            }
            return floorInfos;
        }

        //高级塔顺序索引
        public static floorHighByIndexInfo() {
            let tbl = PlayerTowerSystem.floorInfo();
            let newTbl = [];
            for (const k in tbl[1]) {
                const v = tbl[1][k];
                newTbl.push(v);
            }

            Table.Sort(newTbl, function (a, b) {
                return a.id - b.id;
            })
            return newTbl;
        }

        public static jump_floor() {
            let floor = 1;
            let can_jump = false;

            if (Game.PlayerTowerSystem.towerInfo.towerMax > 0) {
                floor = Game.PlayerTowerSystem.towerInfo.towerMax;
            }

            if (Game.PlayerTowerSystem.towerInfo.towerCur < floor - 1 && !Game.PlayerInstanceSystem.Is_JumpTower && floor != 1) {
                can_jump = true;
            }
            return [can_jump, floor];
        }

        public static jumpHigh_floor() {
            let floor = 1;
            let can_jump = false;
            // if (Game.PlayerTowerSystem.towerInfo.high_tower_max != null) {
            //     if (Game.PlayerTowerSystem.towerInfo.high_tower_max > 0) {
            //         floor = Game.PlayerTowerSystem.towerInfo.high_tower_max;
            //     }

            //     if (Game.PlayerTowerSystem.towerInfo.high_tower_cur < floor - 1 && !Game.PlayerInstanceSystem.High_is_jumpTower && floor != 1) {
            //         can_jump = true;
            //     }
            // }
            return [can_jump, floor];
        }

        public static dealSweapTime(hard) {
            if (hard == 1) {
                let curServerTime = Date.parse(Game.Controller.serverNow().toString()) / 1000;

                //wday  [星期，从星期日算起，范围为1-7]
                let week: any = new Date(Game.PlayerInstanceSystem.LastTowerRefreshTime)
                let wday = (week.getDay()) + 1 == 2;

                let reset_time = null;
                if (wday) {
                    reset_time = Game.PlayerInstanceSystem.LastTowerRefreshTime + CommonConfig.tower_refresh_day * 3600 * 24 - curServerTime;
                } else {
                    let time = Math.floor((Game.PlayerInstanceSystem.LastTowerRefreshTime) / (CommonConfig.tower_refresh_day * 3600 * 24));
                    time = time * (CommonConfig.tower_refresh_day * 3600 * 24);
                    reset_time = time - curServerTime + 3 * 3600 * 24 + 20 * 3600;
                    if (reset_time < 0) {
                        reset_time = (reset_time + 5 * CommonConfig.tower_refresh_day * 3600 * 24) % (CommonConfig.tower_refresh_day * 3600 * 24);
                    }
                }
                let areset_time = Game.PlayerInstanceSystem.LastTowerRefreshTime + CommonConfig.tower_refresh_day * 3600 * 24 - curServerTime;
                return areset_time;
            } else if (hard == 2) {
                let reset_time = null;

                //wday  [星期，从星期日算起，范围为1-7]
                let week: any = new Date(Game.PlayerInstanceSystem.High_lastTowerRefreshTIme)
                let wday = (week.getDay()) + 1 == 2;

                let curServerTime = Date.parse(Game.Controller.serverNow().toString()) / 1000;
                if (wday) {
                    reset_time = Game.PlayerInstanceSystem.High_lastTowerRefreshTIme + CommonConfig.high_refresh_day * 3600 * 24 - curServerTime;
                } else {
                    let time = Math.floor((Game.PlayerInstanceSystem.High_lastTowerRefreshTIme) / (CommonConfig.high_refresh_day * 3600 * 24));
                    time = time * (CommonConfig.high_refresh_day * 3600 * 24);
                    reset_time = time - curServerTime + 3 * 3600 * 24 + 20 * 3600;
                    if (reset_time < 0) {
                        reset_time = (reset_time + 5 * CommonConfig.high_refresh_day * 3600 * 24) % (CommonConfig.high_refresh_day * 3600 * 24);
                    }
                }
                return reset_time;
            }
        }

        // 中文时间
        private static formatMsTimeCh(ms: number) {
            let a: number = Math.floor(ms / 3600);
            let tmp: number = Math.floor(ms % 3600);
            let b: number = Math.floor(tmp / 60);
            let c: number = Math.floor(tmp % 60);

            let hour = a;
            let min = b;
            let sec = c;

            if (b != 0 && c == 0) {
                return hour + TextsConfig.TextsConfig_Time.hour + min + TextsConfig.TextsConfig_Time.min;
            }
            else if (b == 0 && c == 0) {
                return hour + TextsConfig.TextsConfig_Time.hour;
            }
            return hour + TextsConfig.TextsConfig_Time.hour + min + TextsConfig.TextsConfig_Time.min + sec + TextsConfig.TextsConfig_Time.sec;
        }

        //是否通关低级塔
        public static IsPassLowTower() {
            return null// (Game.PlayerTowerSystem.towerInfo.high_tower_cur != null) && (Game.PlayerTowerSystem.towerInfo.towerMax >= CommonConfig.open_high_condition);
        }

        //直达
        public static TowerJumpReqBody_Visit(towerState, TowerHigh) {
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
        }

    }
}