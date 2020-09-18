namespace zj {
    // 玩家游戏基本信息系统
    // guoshanhe 创建于2018.11.13

    export class PlayerInfoSystem {

        ///////////////////////////////////////////////////////////////////////////
        // 静态函数


        ///////////////////////////////////////////////////////////////////////////
        // 私有变量
        private baseInfo: message.RoleBaseInfo = new message.RoleBaseInfo(); // 角色基本数据

        ///////////////////////////////////////////////////////////////////////////
        // 成员方法

        public init() {
            Game.EventManager.on(GameEvent.PLAYER_BASE_INFO_CHANGE, this.onBaseInfoChange, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.onServerNoticeRoleInfo, this);
        }

        public uninit() {
            this.baseInfo = new message.RoleBaseInfo();
            SceneManager.adventurePos = null;
        }

        private onBaseInfoChange(ev: egret.Event) {
            let baseInfo = <message.RoleBaseInfo>ev.data;
            this.baseInfo_pre = this.baseInfo;

            let ladderRank = this.baseInfo ? this.baseInfo.ladderRank : 0;
            let ladderMax = this.baseInfo ? this.baseInfo.ladderMax : 0;
            this.baseInfo = baseInfo;
            if (this.baseInfo.ladderRank == 0) {
                this.baseInfo.ladderRank = ladderRank;
            }
            if (this.baseInfo.ladderMax == 0) {
                this.baseInfo.ladderMax = ladderMax;
            }

            if ((this.baseInfo_pre.level != 0) && (baseInfo.level > this.baseInfo_pre.level)) {
                Game.EventManager.event(GameEvent.PLAYER_LEVEL_UP, baseInfo.level);
                AoneTracker.track("roleUp"); // 埋点
                if (!Device.isTeachOpen && baseInfo.level >= 3) {
                    this.checkAgreeEnter();
                }
            }
            if (baseInfo.money != this.baseInfo_pre.money) {
                Game.EventManager.event(GameEvent.PLAYER_COIN_CHANGE, baseInfo.money);
            }
            if (baseInfo.token != this.baseInfo_pre.token) {
                Game.EventManager.event(GameEvent.PLAYER_TOKEN_CHANGE, baseInfo.token);
            }
            if (baseInfo.power != this.baseInfo_pre.power) {
                Game.EventManager.event(GameEvent.PLAYER_POWER_CHANGE, baseInfo.power);
            }
            if (baseInfo.permitPay != this.baseInfo_pre.permitPay) {
                Game.EventManager.event(GameEvent.PLAYER_PERMITPAY_CHANGE);
            }
            if (baseInfo.permitLevel != this.baseInfo_pre.permitLevel) {
                Game.EventManager.event(GameEvent.PLAYER_PERMITLEVEL_CHANGE, baseInfo.permitLevel);
            }
            if (baseInfo.vipLevel != this.baseInfo_pre.vipLevel) {
                Game.EventManager.event(GameEvent.PLAYER_VIPLEVEL_CHANGE);
            }
            if (baseInfo.licenceLevel != this.baseInfo_pre.licenceLevel) {
                Game.EventManager.event(GameEvent.PLAYER_LICENCELEVEL_CHANGE);
            }

            this.initLookOtherPlayer();
        }
        public checkAgreeEnter() {
            if (!this.IsAgreeEnter) {
                let baseInfo = this.baseInfo;
                return new Promise((resolve, reject) => {
                    let req = new message.SetAgreeEnterRequest();
                    req.body.agree_enter = true;
                    Game.Controller.send(req, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                        let response = <message.SetFormationResponse>resp;
                        if (response.header.result != 0) {
                            return;
                        }
                        baseInfo.agree_enter = true;
                        // Game.EventManager.event(GameEvent.MAIN_CITY_MEMBER_LIST);
                        resolve(response);
                        return;
                    }, (req: aone.AoneRequest): void => {
                        reject();
                    }, this, false);
                    return;
                });
            } else {
                return null;
            }
        }

        private onServerNoticeRoleInfo(ev: egret.Event) {
            let request = <message.RoleInfoNoticeRequest>ev.data;
            if (request.body.gameInfo.baseInfo.length == 0) return;
            let baseInfo = request.body.gameInfo.baseInfo[0];
            let token = this.baseInfo.token;
            let power = this.baseInfo.power;
            let level = this.baseInfo.level;
            let money = this.baseInfo.money;
            let permitPay = this.baseInfo.permitPay;
            let permitLevel = this.baseInfo.permitLevel;

            this.baseInfo = baseInfo;
            if ((level != 0) && (baseInfo.level > level)) {
                Game.EventManager.event(GameEvent.PLAYER_LEVEL_UP, baseInfo.level);
            }
            if (baseInfo.money != money) {
                Game.EventManager.event(GameEvent.PLAYER_COIN_CHANGE, baseInfo.money);
            }
            if (baseInfo.token != token) {
                Game.EventManager.event(GameEvent.PLAYER_TOKEN_CHANGE, baseInfo.token);
            }
            if (baseInfo.power != power) {
                Game.EventManager.event(GameEvent.PLAYER_POWER_CHANGE, baseInfo.power);
            }
            if (baseInfo.permitPay != permitPay) {
                Game.EventManager.event(GameEvent.PLAYER_PERMITPAY_CHANGE);
            }
            if (baseInfo.permitLevel != permitLevel) {
                Game.EventManager.event(GameEvent.PLAYER_PERMITLEVEL_CHANGE, baseInfo.permitLevel);
            }

            Game.EventManager.event(GameEvent.SYSTEM_SETUP)
        }

        // 角色ID
        public get RoleID(): number {
            return this.baseInfo.id;
        }

        // 角色名字
        public get RoleName(): string {
            if (Game.PlayerMixUnitInfoSystem.mixunitinfo.modifyName == 0) {
                return TextsConfig.TextsConfig_Common.nameDefault;
            }
            return this.baseInfo.name;
        }
        //啤酒
        public get Beer(): number {
            return this.baseInfo.beer;
        }
        // 红酒
        public get RedWine(): number {
            return this.baseInfo.redWine;
        }
        // 香槟
        public get Champagne(): number {
            return this.baseInfo.champagne;
        }
        // 苏打水
        public get Soda(): number {
            return this.baseInfo.soda;
        }
        /**朗姆酒 */
        public get Rum(): number {
            return this.baseInfo.rum;
        }
        // 酒馆积分
        public get LotteryScore(): number {
            return this.baseInfo.lotteryScore;
        }

        // 代币（钻石）
        public get Token(): number {
            return this.baseInfo.token;
        }
        // 铜钱（金币）
        public get Coin(): number {
            return this.baseInfo.money;
        }
        // 体力
        public get Power(): number {
            return this.baseInfo.power;
        }
        public set Power(power: number) {
            this.baseInfo.power = power;
        }
        public get PowerMax(): number {
            let Table = TableLevel.Item(this.Level);
            if (Table) {
                return Table.role_power + PlayerVIPSystem.LowLevel().power_add;
            }
            return 0;
        }
        // vip 等级
        public get VipLevel(): number {
            return this.baseInfo.vipLevel;
        }
        // 是否进入地图
        public get IsAgreeEnter(): boolean {
            return this.baseInfo.agree_enter;
        }

        playAnnouce = true; //是否播放顶层动画tips

        public get Level(): number {
            return this.baseInfo.level;
        }

        public get LecenceLevel(): number {
            return this.baseInfo.licenceLevel;
        }

        public get leagueName(): string {
            return this.baseInfo.leagueName;
        }

        // 公会 ID
        public get LeagueId(): number {
            return this.baseInfo.leagueId;
        }

        public set LeagueId(id: number) {
            if (this.baseInfo.leagueId != 0) return;
            this.baseInfo.leagueId = id;
        }

        public get BaseInfo(): message.RoleBaseInfo {
            return this.baseInfo;
        }

        public baseInfo_pre: message.RoleBaseInfo; //之前的角色基础数据，用来处理需要比较的情况

        //啤酒朗姆酒购买
        public static buyBeer(item_id: number, item_num: number) {
            return new Promise((resolve, reject) => {
                let request = new message.QuickMallRequest();
                request.body.item_id = item_id;
                request.body.item_num = item_num;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.QuickMallResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false, true);
                return;
            });
        }

        //酒馆抽猎人
        public static compose(type: number, num: number) {
            return new Promise((resolve, reject) => {
                let req = new message.NormalLotteryRequest();
                req.body.lottery_type = type
                req.body.soda_num = num
                Game.Controller.send(req, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.NormalLotteryResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        //酒馆朗姆酒抽猎人
        public static ActivityLotterPond(type: number, num: number) {
            return new Promise((resolve, reject) => {
                let req = new message.ActivityLotterPondRequest();
                req.body.activityIndex = type
                req.body.soda_num = num
                Game.Controller.send(req, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.ActivityLotterPondResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        public queryRoleInfo(roleId: number, groupId: number, battleType: number = 0): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.QueryRoleInfoRequest();
                request.body.roleId = roleId;
                request.body.group_id = groupId;
                request.body.battle_type = battleType;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.QueryRoleInfoResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // RoleInfoZip
                    let para = {}
                    para["index"] = 4
                    let inflate = new Zlib.Inflate(response.body.roleInfo, para);
                    let plain = inflate.decompress();
                    let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                    let info = new message.RoleInfoZip()
                    if (!info.parse_bytes(decoder)) {
                        toast(LANG("游戏数据解析失败"));
                        return;
                    }

                    resolve(info);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }
        /** 检测下次心跳之前，是否有回复体力，有则加定时器检测回复 */
        public checkPowerAdd(serverTime: number, powerTime: number) {
            let time = 5 * 60 - (serverTime - powerTime);
            if (time < Game.Controller.keepliveInterval) {
                egret.setTimeout(() => {
                    if (this.baseInfo.power < this.PowerMax) {
                        this.baseInfo.power++;
                        Game.EventManager.event(GameEvent.PLAYER_POWER_CHANGE, this.baseInfo.power);
                    }
                }, this, time * 1000);
            }
        }

        private isLookOtherPlayer: boolean = true;// 其他玩家是否可见
        public initLookOtherPlayer() {
            let str = Game.Controller.getRoleStorageItem("lookOtherPlayer");
            if (str == "0") {
                this.isLookOtherPlayer = false;
            }
        }

        private saveLookOtherPlayer() {
            Game.Controller.setRoleStorageItem("lookOtherPlayer", this.isLookOtherPlayer ? "1" : "0");
        }

        public setLookOther(isCanLook: boolean) {
            if (this.isLookOtherPlayer != isCanLook) {
                this.isLookOtherPlayer = isCanLook;
                this.saveLookOtherPlayer();
                Game.EventManager.event(GameEvent.LOOK_OTHER_PLAYER);
            }
        }

        public getIsLookOtherPlayer(): boolean {
            return this.isLookOtherPlayer;
        }
    }
}