namespace zj {
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
    export class PlayerMissionSystem {
        ///////////////////////////////////////////////////////////////////////////
        // 私有变量

        /**
         * 任务基础信息
         */
        private MissionInfo: Array<message.MissionInfo> = null;

        /**任务基础信息 */
        public get missionInfo(): Array<message.MissionInfo> {
            return this.MissionInfo;
        }
        public set missionInfo(v: Array<message.MissionInfo>) {
            this.missionInfo = v;
        }

        /**
         * 每日活跃度信息
         */
        private MissionActive: message.MissionActive = new message.MissionActive();

        /**每日活跃度信息 */
        public get missionActive(): message.MissionActive {
            return this.MissionActive;
        }

        /**
         * 所有活动信息
         */
        private Activities: Array<message.ActivityInfo>;

        /**所有活动信息 */
        public get activities(): Array<message.ActivityInfo> {
            return this.Activities;
        }

        /**
         * 任务列表
         */
        private _missionMap: { [key: number]: message.MissionInfo } = null;
        // private _missionMap: Array<message.MissionInfo> = [];

        /**任务列表*/
        public get missionMap() {
            return this._missionMap;
        }

        public set missionMap(v: { [key: number]: message.MissionInfo }) {
            this._missionMap = v;
        }

        /**
         * BattleStartReqBody的额外参数，抢矿表示；是否从敌人列表中筛选，通缉令表示：难度
         */
        private _fightExt: number = 0;

        /**BattleStartReqBody的额外参数，抢矿表示；是否从敌人列表中筛选，通缉令表示：难度 这里是0开始 其他的不是 */
        public get fightExt(): number {
            return this._fightExt;
        }

        public set fightExt(v: number) {
            this._fightExt = v;
        }

        public missionInfo_pre = null;

        private BASE: number = 1000;
        private MISSION: number = 10000;
        private MISSION_BASE: number = 100000;
        private MISSION_ID: number = 760004;
        private ID: number = 60;

        public firstOpen: number = 0;

        //时间赛跑天数
        public TimeNumber: number = 0;


        /**服务器星期几 */
        public curServerWeek: number;

        private _licenseCurPos: number = -1;

        /**执照当前怪索引 */
        public get licenseCurPos(): number {
            return this._licenseCurPos;
        }

        public set licenseCurPos(v: number) {
            this._licenseCurPos = v;
        }


        ///////////////////////////////////////////////////////////////////////////
        // 静态方法

        /** 
         * 功能开启 
         * 
         * from db_level.lua
         * */
        public static FunOpenTo(funcType: number, bShowTip?: boolean): boolean {
            let itemInfo = TableFunctionOpen.Item(funcType);
            if (itemInfo == null) return false;

            let _getOpenResult = function (item: TableFunctionOpen): boolean {
                // --军师阵法特殊处理
                if (funcType == FUNC.STRATEGY
                    // Game.PlayerMissionSystem.mixUnitInfo.open_formation == true 
                ) {
                    return true;
                }

                // --神兵单独处理，可以合成的时候直接开启
                if (funcType == FUNC.ARTIFACT
                    // && artifactdb.IsOpen()
                ) {
                    return true;
                }

                if (typeof item.condition === "number" &&
                    item.condition != 0 &&
                    Game.PlayerInfoSystem.BaseInfo != null
                    && Game.PlayerInfoSystem.Level >= item.condition) {
                    return true;
                }

                if (typeof item.condition_instance === "number" &&
                    item.condition_instance != 0 &&
                    PlayerInstanceSystem.CheckPassed(item.condition_instance) == true) {
                    return true;
                }
                return false;
            };

            let bOpen = _getOpenResult(itemInfo);
            if (bOpen == false && bShowTip == true) {
                toast_warning(itemInfo.unopen_tip);
            }
            return bOpen;
        }

        /**等级开启的功能 */
        public FunOpen(level1?: number) {
            let tbl = TableFunctionOpen.Table();
            let level = level1 || Game.PlayerInfoSystem.BaseInfo.level;
            let open = [];
            for (let k in tbl) {
                if (tbl.hasOwnProperty(k)) {
                    let v = tbl[k];
                    if (v.condition != 0 && v.condition == level && v.show == 1) {
                        open.push(v);
                    }
                }
            }
            return open;
        }

        ///////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        public init() {
            this.InitMissionInfo();
            this.curServerWeek = this.GetDay();
            Game.EventManager.on(GameEvent.PLAYER_MISSION_INFO_CHANGE, this.onMissionChange, this);
            Game.EventManager.on(GameEvent.PLAYER_MISSION_ACTIVE_CHANGE, this.onMissActiveChange, this);
            // Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED , this.ShareReward , this);
        }

        public uninit() {
            this.MissionInfo = null;
            this.MissionActive = new message.MissionActive();
            this.Activities = [];
            this._missionMap = null;
            this._fightExt = 0;
            this.missionInfo_pre = null;
            this.curServerWeek = 0;
            this._licenseCurPos = -1;
        }

        private InitMissionInfo() {
            this._missionMap = {};
            for (let [v, k] of HelpUtil.GetKV(TableMissionType.Table())) { // 日常任务
                let msg = new message.MissionInfo;
                msg.type = k.type;
                msg.subType = k.sub_type;
                msg.missionId = k.start_id;
                msg.isFinish = false;
                this._missionMap[k.index] = msg;
            }

            for (let [v, k] of HelpUtil.GetKV(TableMissionMain.Table())) { // 与时间赛跑
                if (k.type == message.MissionType.MISSION_TYPE_RACE) {
                    let msg = new message.MissionInfo;
                    msg.type = k.type;
                    msg.subType = k.sub_type;
                    msg.missionId = k.id;
                    msg.isFinish = false;
                    this._missionMap[k.id] = msg;
                }
            }
        }

        private onMissionChange(ev: egret.Event) {
            if (this._missionMap == null) {
                // this.init();
                this.InitMissionInfo();
            }
            // if (this.MissionInfo == null) {
            this.MissionInfo = <Array<message.MissionInfo>>ev.data;
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


            for (let v of this.missionInfo) {
                for (let k in this._missionMap) {
                    if (this._missionMap[k].type == v.type && this._missionMap[k].subType == v.subType) {
                        this._missionMap[k] = v;
                    }
                }
            }

            for (let [v, k] of HelpUtil.GetKV(this.missionInfo)) {
                let index = Game.PlayerMissionSystem.itemIndex(k.type, k.subType);
                this._missionMap[index] = k;

                if (k.type == message.MissionType.MISSION_TYPE_RACE) {
                    let index = k.missionId;
                    let times: string = k.missionId.toString();
                    this.TimeNumber = Number(times.charAt(times.length - 3));
                    this._missionMap[index] = k;
                }
            }

            Game.EventManager.event(GameEvent.REFRESH_MAINCITY_BUBBLE);
        }

        private onMissActiveChange(ev: egret.Event) {
            this.MissionActive = <message.MissionActive>ev.data;
            if (this.MissionActive == null) this.MissionActive = new message.MissionActive();
        }

        public GetLimitLevel(index: number) {
            let id = 10000 * index + 1;
            return TableWanted.Item(id).limit_level;
        }

        /**
         * 获取星期几 1-7
         */
        public GetDay(): number {
            let wDay = Game.Controller.serverNow().getDay();
            if (wDay == 0) wDay = 7;
            return wDay;
        }


        public Open(fromId: number): boolean {
            let ret = false;

            if (fromId == 0) {
                ret = true;
                // 普通副本
            } else if (fromId == 1) {
                ret = true;
                //挑战副本
            } else if (fromId == 2) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.ELITE);
                // 探索副本
            } else if (fromId == 3) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.ELITE);
                // 普通商铺
            } else if (fromId == 4) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.MALL);
                // 格斗商铺
            } else if (fromId == 5) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.ARENA);
                // 荣誉商铺
            } else if (fromId == 6) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.SINGLE);
                // 公会商铺
            } else if (fromId == 7) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.LEAGUE);
                // 酒馆商铺
            } else if (fromId == 8) {
                ret = true;
                // 酒馆
            } else if (fromId == 9) {
                ret = true;
                // 流星街1
            } else if (fromId == 10) {
                ret = Game.PlayerInfoSystem.Level >= this.GetLimitLevel(1);
                // 流星街2
            } else if (fromId == 11) {
                ret = Game.PlayerInfoSystem.Level >= this.GetLimitLevel(2);
                // 流星街3
            } else if (fromId == 12) {
                ret = Game.PlayerInfoSystem.Level >= this.GetLimitLevel(3);
                // 流星街4
            } else if (fromId == 13 || fromId == 42) {
                ret = Game.PlayerInfoSystem.Level >= this.GetLimitLevel(4);
                // 流星街5
            } else if (fromId == 14 || fromId == 43) {
                ret = Game.PlayerInfoSystem.Level >= this.GetLimitLevel(5);
                // 流星街6
            } else if (fromId == 15 || fromId == 44) {
                ret = Game.PlayerInfoSystem.Level >= this.GetLimitLevel(6);
                // 流星街
            } else if (fromId == 16) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.ARREST);
                // 贪婪之岛 - 兑换，钓鱼，猜拳，双色球，采集
            } else if ((fromId == 17) || (fromId == 18) || (fromId == 19) || (fromId == 20) || (fromId == 21)) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.WONDERLAND);
            } else if (fromId == 22) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.TOWER);
                // 首充
            } else if (fromId == 23) {
                ret = true;
            } else if (fromId == 24 || fromId == 62) {
                ret = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info != 0;
            } else if (fromId == 28) {
                ret = true;
            } else if (fromId == 30) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.WONDERLAND);
            } else if (fromId == 31) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.WONDERLAND);
            } else if (fromId == 32) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.COMPOUND);
            } else if (fromId == 33) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.GROUPFIGHT);
            } else if (fromId == 34) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.LEAGUE) && Game.PlayerInfoSystem.LeagueId != 0;
            } else if (fromId == 35) {
                ret = true;
            } else if (fromId == 36) {
                ret = true;
            } else if (fromId == 37) {
                ret = true;
            } else if (fromId == 38) {
                ret = true;
            } else if (fromId == 39) {
                ret = true;
            } else if (fromId == 40) {
                let level = this.GetLimitLevel(message.EWantedType.WANTED_TYPE_SEVEN)
                ret = Table.FindK(Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, level) != -1;
            } else if (fromId == 45 || fromId == 46) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.POTATO);
            } else if (fromId == 47) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.DARKLAND2);
            } else if (fromId == 48) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.EQUIP);
            } else if (fromId == 49) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.DARKLAND2);
            } else if (fromId == 50) {
                ret = true;
            } else if (fromId == 51) {
                ret = true;
            } else if (fromId == 52) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.DARKLAND);
            } else if (fromId == 58) {
                ret = Game.PlayerWantedSystem.wantedInfo.typeLevel[5].value % 100 >= 21;
            } else if (fromId == 60) {
                ret = true;
            } else if (fromId == 61) {
                ret = true;
            } else if (fromId == 64) {
                ret = PlayerMissionSystem.FunOpenTo(FUNC.TRANSFORM);
            }
            return ret;
        }



        public jump(fromId) {
            if (fromId == 1) {//普通副本
                // loadUI(Adventurems)
                //     .then((dialog: Adventurems) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
                SceneManager.instance.EnterAdventure(1);
            } else if (fromId == 2) {//精英副本
                // loadUI(Adventurems)
                //     .then((dialog: Adventurems) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
                SceneManager.instance.EnterAdventure(2);
            } else if (fromId == 3) {//探索副本
                // loadUI(Adventurems)
                //     .then((dialog: Adventurems) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            } else if (fromId == 4) {//普通商铺
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(1);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 5) {//格斗商铺
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(2);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 6) {//荣誉商店
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(4);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 7) {//公会商铺
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(3);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 8) {//酒馆商铺
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(5);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 9) {//酒馆
                loadUI(TavernScene)
                    .then((scene: TavernScene) => {
                        scene.show(UI.SHOW_FILL_OUT);
                        scene.nPCDialog();
                    });
            } else if (fromId == 10) {//通缉令1
                let index = 1;
                let limit_level = TableWanted.Item(10000 * index + 1).limit_level;
                if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    Game.PlayerMissionSystem.fightExt = index;
                    loadUI(WantedSecondMeteorstanceScene)
                        .then((scene: WantedSecondMeteorstanceScene) => {
                            //接口
                            scene.Init(1);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                } else {
                    toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }


                // loadUI(Tavern)
                //     .then((dialog: Tavern) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            } else if (fromId == 11) {//通缉令2
                let index = 2;
                let limit_level = TableWanted.Item(10000 * index + 1).limit_level;
                if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    Game.PlayerMissionSystem.fightExt = index;
                    loadUI(WantedSecondMeteorstanceScene)
                        .then((scene: WantedSecondMeteorstanceScene) => {
                            //接口
                            scene.Init(2);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                } else {
                    toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            } else if (fromId == 12) {//通缉令3
                let index = 3;
                let limit_level = TableWanted.Item(10000 * index + 1).limit_level;
                if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    Game.PlayerMissionSystem.fightExt = index;
                    loadUI(WantedSecondMeteorstanceScene)
                        .then((scene: WantedSecondMeteorstanceScene) => {
                            //接口
                            scene.Init(3);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                } else {
                    toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            } else if (fromId == 13 || fromId == 42) {//通缉令4
                let index = 4;
                let limit_level = TableWanted.Item(10000 * index + 1).limit_level;
                if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    Game.PlayerMissionSystem.fightExt = index;
                    loadUI(WantedSecondMeteorstanceScene)
                        .then((scene: WantedSecondMeteorstanceScene) => {
                            //接口
                            scene.Init(4);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                } else {
                    toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            } else if (fromId == 14 || fromId == 43) {//通缉令5
                let index = 5;
                let limit_level = TableWanted.Item(10000 * index + 1).limit_level;
                if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    Game.PlayerMissionSystem.fightExt = index;
                    loadUI(WantedSecondMeteorstanceScene)
                        .then((scene: WantedSecondMeteorstanceScene) => {
                            //接口
                            scene.Init(5);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                } else {
                    toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            } else if (fromId == 15 || fromId == 44) {//通缉令6
                let index = 1;
                let limit_level = TableWanted.Item(10000 * index + 1).limit_level;
                if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                    Game.PlayerMissionSystem.fightExt = index;
                    loadUI(WantedSecondMeteorstanceScene)
                        .then((scene: WantedSecondMeteorstanceScene) => {
                            //接口
                            scene.Init(1);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                } else {
                    toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
                }
            } else if (fromId == 16) {//流星街
                if (PlayerMissionSystem.FunOpenTo(FUNC.ARREST)) {
                    loadUI(WantedSecondMeteorstanceScene)
                        .then((scene: WantedSecondMeteorstanceScene) => {
                            scene.Init(1);
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                }
            } else if (fromId == 17 || fromId == 18 || fromId == 19 || fromId == 20 || fromId == 21 || fromId == 30 || fromId == 31) {//贪婪之岛相关
                SceneManager.instance.EnterSceneZorkBoss();
            } else if (fromId == 22) {//天空竞技场
                loadUI(SkyAreanMainScene)
                    .then((scene: SkyAreanMainScene) => {
                        scene.Init();
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 23) {
                let tbl = Game.ConfigManager.getTable(StringConfig_Table.firstcharge + ".json") as any;
                let bFirst = Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward.length != tbl.length;
                let noCharge = Game.PlayerMixUnitInfoSystem.mixunitinfo.old_chargeToken == 0;
                let info = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
                let haveTime = (info.info == 0) || (info.leftTime > 0);
                if (bFirst && noCharge && haveTime) {  //首充活动`
                    loadUI(HXH_FirstChargeMainNew)
                        .then((scene: HXH_FirstChargeMainNew) => {
                            // scene.init();
                            scene.show(UI.SHOW_FROM_TOP);
                        })
                }
            } else if (fromId == 24 || fromId == 62) { // 抓娃娃恢复
                if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info != 0) {
                    loadUI(Activity_RandomBoomSence)
                        .then((scene: Activity_RandomBoomSence) => {
                            scene.Init();
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                }
            } else if (fromId == 25) { //关注活动

            } else if (fromId == 26) { //日常任务

            } else if (fromId == 27) { //定时恢复

            } else if (fromId == 28) { //超值礼包
                loadUI(PayMallScene)
                    .then((scene: PayMallScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.init(true);
                    });
            } else if (fromId == 32) { //猎人合成
                loadUI(HunterCompound)
                    .then((scene: HunterCompound) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 33) { //山贼讨伐
                // loadUI(FirstChargeMainNew)
                //     .then((scene: FirstChargeMainNew) => {
                //         scene.show(UI.SHOW_FROM_TOP);
                //     });
            } else if (fromId == 34) { // 战功商店
                loadUI(LeagueMatchMallMain)
                    .then((scene: LeagueMatchMallMain) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 35) {
                Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curAreaID = 1;
                // loadUI(Adventurems)
                //     .then((scene: Adventurems) => {
                //         scene.show(UI.SHOW_FROM_TOP);
                //     });
                SceneManager.instance.EnterAdventure();
            } else if (fromId == 36) { // 7日活动
                loadUI(ActivityHappySeven)
                    .then((scene: ActivityHappySeven) => {
                        // scene.init();
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 37) {//双月卡活动
                loadUI(ActivityMain)
                    .then((scene: ActivityMain) => {
                        scene.init(18)
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 38) {//198自选礼包
                SceneManager.instance.EnterMainCityBack();
            } else if (fromId == 39) {//开服累计充值
                SceneManager.instance.EnterMainCityBack();
            } else if (fromId == 40) {//科特流星街副本
                Game.PlayerMissionSystem.fightExt = 7;
                loadUI(WantedSecondMeteorstanceScene)
                    .then((scene: WantedSecondMeteorstanceScene) => {
                        //接口
                        scene.Init(7);
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 47) {//遗迹
                loadUI(DarkLandHomeScene)
                    .then((scene: DarkLandHomeScene) => {
                        scene.show(UI.SHOW_FILL_OUT);
                    });
                loadUI(RelicMain)
                    .then((scene: RelicMain) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 48) {//许愿屋
                loadUI(ActivityXuyuanBoom)
                    .then((scene: ActivityXuyuanBoom) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.Init();
                    });
            } else if (fromId == 49) {//遗迹商店
                loadUI(RelicMall_Main)
                    .then((dialog: RelicMall_Main) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 50) {
                loadUI(VipLowGift)
                    .then((scene: VipLowGift) => {
                        scene.init();
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 51) {
                loadUI(VipLowGift)
                    .then((scene: VipLowGift) => {
                        scene.init();
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 52) {
                SceneManager.instance.EnterSceneZorkBoss();
            } else if (fromId == 60) { // VIP礼包1
                loadUI(VipLowGift)
                    .then((scene: VipLowGift) => {
                        scene.init(525);
                        // scene.load(5);
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 61) {// VIP礼包2
                loadUI(VipLowGift)
                    .then((scene: VipLowGift) => {
                        scene.init(945);
                        // scene.load(9);
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else if (fromId == 64) { // 变身
                loadUI(HunterTransformMainSence)
                    .then((scene: HunterTransformMainSence) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            }

        }

        /**
         * 返回任务大类型
         * @param missionType 任务类型
         * @param missionSubType 任务子类型
         */

        public itemType(missionType: number, missionSubType: number): TableMissionType {
            let infoAll: { [key: string]: TableMissionType } = TableMissionType.Table();
            let info = [];
            for (let k in infoAll) {
                if (infoAll.hasOwnProperty(k)) {
                    let v = infoAll[k];
                    info.push(v);
                }
            }
            let [infoType,] = Table.FindR(info, (k, v) => {
                return (v.type == missionType && v.sub_type == missionSubType);
            });
            return infoType;
        }

        /**
         * 返回任务index
         * @param type 任务类型
         * @param id 任务子类型
         */

        public itemIndex(type: number, id: number): number {
            return type * 10000 + id;
        }

        /**
         * 任务类型表
         * @param missionId 索引
         */
        public itemSubType(missionId: number): TableMissionType {
            return TableMissionType.Item(missionId);
        }

        /**
         * 返回任务类型
         * @param missionId 索引
         */
        public itemInfo(missionId: number): TableMissionItem {
            return TableMissionItem.Item(missionId);
        }

        /**
         * 返回执照类型
         * @param id 索引
         */
        public itemLicense(id: number): TableMissionLicence {
            return TableMissionLicence.Item(id);
        }

        /**
         * 返回主线类型
         * @param id 索引
         */
        public itemMain(id: number): TableMissionMain {
            return TableMissionMain.Item(id);
        }


        public static GetActivityUI() {
            let data = [];
            for (const k in message.ActivityInfo) {
                const v = message.ActivityInfo[k];
                if (v.stopTime == Date.parse(Game.Controller.serverNow().toString())) {
                    if (v.type == message.ActivityType.ACT_TYPE_UPLEVEL                             //冲级
                        || v.type == message.ActivityType.ACT_TYPE_CONTINUELOGIN                    //连续七天登陆
                        || v.type == message.ActivityType.ACT_TYPE_BUFFS                            //BUFF
                        || v.type == message.ActivityType.ACT_TYPE_OTHER                            //线下活动
                        || v.type == message.ActivityType.ACT_TYPE_ADVERTISEMENT                    //广告
                        || v.type == message.ActivityType.ACT_TYPE_LOTTERY_DOUBLING                 //酒馆积分
                        || v.type == message.ActivityType.ACT_TYPE_CHARGEDAILY) {                   //每日充值  
                        data.push(v);
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_MISSION) {                     //专题
                        if (v.rewardIndex.length != v.missions.length) {

                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_CHARGEADD) {                   //累计充值
                        if (v.rewardIndex.length != v.rewardZone.length) {
                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_COLLECT) {                      //搜集道具
                        for (const kk in v.exchanges) {
                            const vv = v.exchanges;
                            let bIsGet = Table.FindF(v.kvInfos, function (key, vvv) {
                                //已兑换完
                                return vvv.key == vv.index && vvv.value >= vv.exchangeCount
                            })
                            if (!bIsGet) {
                                data.push(v);
                            }
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_MONTHFIT) {                    //月卡福利
                        let reward_has_get = Table.FindF(v.rewardIndex, function (_k, _v) {
                            return _v == 1
                        })
                        if (!reward_has_get) {

                            data.push(v);
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_CONSUME) {                     //累计消耗
                        if (v.rewardIndex.length != v.rewardZone.length) {
                            data.push[v];
                        }
                    }
                    else if (v.type == message.ActivityType.ACT_TYPE_END) {                         //开服活动
                        if (Game.PlayerMixUnitInfoSystem.mixunitinfo.lotteryRewards.length != v.rewardZone.length) {
                            data.push[v];
                        }
                    }
                }
            }
            return data;
        }


        /**
         * 返回成就任务
         */
        public listForAchieve() {
            let list = [[], [], [], []]; // [[可领取], [未完成], [已完成], [未开锁]]
            for (let [v, k] of HelpUtil.GetKV(this.missionMap)) {
                if (k.type == message.MissionType.MISSION_TYPE_ACHIEVE) {
                    let [isdo, todo, isLock] = this.itemComplete(v);
                    if (isdo >= todo && (!k.isFinish) && (!isLock)) {
                        list[0].push(v);
                    } else if (isdo < todo && (!k.isFinish) && (!isLock)) {
                        list[1].push(v);
                    } else if (k.isFinish && !isLock) {
                        list[2].push(v);
                    } else if (isLock) {
                        list[3].push(v);
                    }
                }
            }

            list[0].sort((a: number, b: number) => {
                let typeInfoA = this.itemSubType(a).sort == "" && 0 || Number(this.itemSubType(a).sort);
                let typeInfoB = this.itemSubType(b).sort == "" && 0 || Number(this.itemSubType(b).sort);
                return typeInfoA - typeInfoB;
            });

            list[2].sort((a: number, b: number) => {
                let typeInfoA = this.itemSubType(a).sort == "" && 0 || Number(this.itemSubType(a).sort);
                let typeInfoB = this.itemSubType(b).sort == "" && 0 || Number(this.itemSubType(b).sort);
                return typeInfoA - typeInfoB;
            });

            list[1].sort((a: number, b: number) => {
                let [isdo_a, todo_a] = this.itemComplete(a);
                let [isdo_b, todo_b] = this.itemComplete(a);

                let typeInfoA = this.itemSubType(a).sort == "" && 0 || Number(this.itemSubType(a).sort);
                let typeInfoB = this.itemSubType(b).sort == "" && 0 || Number(this.itemSubType(b).sort);

                if ((isdo_a / todo_a) == (isdo_b / todo_b)) {
                    return typeInfoA - typeInfoB;
                } else {
                    return (isdo_b / todo_b) - (isdo_a / todo_a);
                }
            });

            list[3].sort((a: number, b: number) => {
                let missionA = this.missionMap[a];
                let tblTypeA = this.itemType(missionA.type, missionA.subType);
                let missionB = this.missionMap[b];
                let tblTypeB = this.itemType(missionB.type, missionB.subType);

                let typeInfoA = this.itemSubType(a).sort == "" && 0 || Number(this.itemSubType(a).sort);
                let typeInfoB = this.itemSubType(b).sort == "" && 0 || Number(this.itemSubType(b).sort);

                if (tblTypeA.open_level == tblTypeB.open_level) {
                    return typeInfoA - typeInfoB;
                } else {
                    return tblTypeA.open_level - tblTypeB.open_level;
                }
            });

            let mission = [];
            for (let [_, k] of HelpUtil.GetKV(list)) {
                for (let [_, kk] of HelpUtil.GetKV(k)) {
                    mission.push(kk);
                }
            }
            return mission;
        }

        /**
         * 返回日常任务
         */
        public listForLive(): Array<number> {
            let list: Array<Array<number>> = [[], [], [], []];
            let mission: Array<number> = [];
            // 未完成 已完成
            for (let [v, k] of HelpUtil.GetKV(this.missionMap)) {
                if (k.type == message.MissionType.MISSION_TYPE_DAILY) {
                    if ((/*Device.isReviewSwitch &&*/
                        k.subType != message.MissionSubType.MISSION_SUB_TYPE_PRAISE &&
                        // k.subType != message.MissionSubType.MISSION_SUB_TYPE_VIP_DAILY_REWARD && 
                        k.subType != message.MissionSubType.MISSION_SUB_TYPE_NORMAL_MONTH &&
                        k.subType != message.MissionSubType.MISSION_SUB_TYPE_SENIOR_MONTH
                    ) || !Device.isReviewSwitch) {
                        let index: number = this.itemIndex(k.type, k.subType);
                        if (this.itemComplete(index) == TableEnum.EnumDailyLive.finished) {
                            list[0].push(index);
                        } else if (this.itemComplete(index) == TableEnum.EnumDailyLive.unfinished) {
                            list[1].push(index);
                        } else if (this.itemComplete(index) == TableEnum.EnumDailyLive.unOpened) {
                            list[2].push(index);
                        }
                    }
                }
            }

            let _get_start_id = (index: number) => {
                return this.itemType(this.missionMap[index].type, this.missionMap[index].subType).start_id;
            }

            let _get_level = (index: number) => {
                return this.itemType(this.missionMap[index].type, this.missionMap[index].subType).open_level;
            }

            list[1].sort((a, b) => {
                return _get_start_id(a) - _get_start_id(b);
            })
            list[2].sort((a, b) => {
                return _get_level(a) - _get_level(b);
            })

            for (let [_, k] of HelpUtil.GetKV(list)) {
                for (let [_, kk] of HelpUtil.GetKV(k)) {
                    mission.push(kk);
                }
            }
            return mission;
        }

        /**
         * 返回主线任务
         */
        public listForTask() {
            let tb = [];

            for (let [k, v] of HelpUtil.GetKV(this.missionMap)) {
                if (v.type == message.MissionType.MISSION_TYPE_MAIN) {
                    tb.push(v);
                }
            }

            let result = null;
            for (let [k, v] of HelpUtil.GetKV(tb)) {
                if (result == null) {
                    result = v;
                } else {
                    result = yuan3(v.missionId > result.missionId, v, result);
                }
            }
            return result;
        }

        public listSpecial() {
            let tbl = TableUplevelReward.Table();
            let tbls = [];
            let list = [[], []];
            let mission = [];

            for (let [v, k] of HelpUtil.GetKV(tbl)) {
                if (k.index > 1000) continue;
                let monthReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.monthReward, (kk, vv) => {
                    return vv == k.index;
                });

                if (monthReward) {
                    list[1].push(k);
                } else {
                    list[0].push(k);
                }
            }

            list[1].sort((a, b) => {
                return a.index - b.index;
            });

            list[0].sort((a, b) => {
                return a.index - b.index;
            });

            for (let [_, k] of HelpUtil.GetKV(list)) {
                for (let [_, kk] of HelpUtil.GetKV(k)) {
                    mission.push(kk);
                }
            }
            return mission;
        }

        /**
         * 返回任务完成情况
         */
        public itemComplete(index: number) {
            let mission = this.missionMap[index];
            let tbl: TableMissionItem | TableMissionMain = this.itemInfo(mission.missionId);
            let tbl_next: TableMissionItem | string = this.itemInfo(Number(mission.missionId) + 1);
            let isLock;
            if (mission.type == message.MissionType.MISSION_TYPE_MAIN ||
                mission.type == message.MissionType.MISSION_TYPE_JEWEL) {

                tbl = this.itemMain(mission.missionId);
                tbl_next = tbl.next_id;
            }

            let tblType = null
            if (mission.type != message.MissionType.MISSION_TYPE_MAIN &&
                mission.type != message.MissionType.MISSION_TYPE_JEWEL) {

                tblType = this.itemType(mission.type, mission.subType);
                if (tblType == null) {
                    toast_warning("mission_table is error~~~ " + "type = " + mission.type + ", subType = " + mission.subType);
                    return;
                }
                if (tblType == null || tblType.open_level == null) {
                    isLock = false;
                } else {
                    isLock = tblType.open_level > Game.PlayerInfoSystem.BaseInfo.level;
                }
            }

            let isdo = mission.value;
            let todo = tbl.condition;
            let isOver = (mission.isFinish && (!tbl_next || tbl_next == ""));


            if (mission.type == message.MissionType.MISSION_TYPE_ACHIEVE) { //成就任务
                if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_UPLEVEL) {        //提升等级
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE) {   //通关副本
                    if (isdo >= todo) {
                        isdo = 5;
                    } else {
                        isdo = isdo % 100000 % 5;
                    }
                    todo = 5;
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE) {   //精英副本
                    let max = 0;
                    for (let [kk, vv] of HelpUtil.GetKV(mission.valueEx)) {
                        if (vv > max) {
                            max = vv;
                        }
                    }
                    isdo = max;

                    isdo = zj.yuan3(isdo >= todo, 1, 0);
                    todo = 1;
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_VISITOR) {   //酒馆寻访
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_CNT) {   //武将数量
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPLEVEL) {   //武将升级
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY) {   //武将品阶
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPSTAR) {   //武将升星
                    isdo = isdo;
                    todo = todo;
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR) {  //几星武将数量 x000x
                    for (let [v, k] of HelpUtil.GetKV(mission.valueEx)) {
                        if (Math.floor(k / 10000) == Math.floor(todo / 10000)) {
                            isdo = k % 10000;
                        }
                    }
                    todo = todo % 10000;
                }
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_APT_NUM) {
                    for (let [v, k] of HelpUtil.GetKV(mission.valueEx)) {
                        if (Math.floor(k / 10000) == Math.floor(todo / 10000)) {
                            isdo = k % 10000
                        }
                    }
                    todo = todo % 10000
                }
                /**
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_EQUIP_UPLEVEL) {   //强化
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_EQUIP_FORGE) {   //锻造
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_EQUIP_CARVE) {   //刻印
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TALENT_STUDY) {   //天赋学习
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TALENT_UPLEVEL) {   //天赋升级
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TALENT_COMPOSE) {   //合成
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TALENT_QUALITY) {   //高级天赋
                    isdo = 0
                    todo = 1
                    for (let [v, k] of Object.entries(mission.valueEx)) {
                        if (k == tbl.condition) {
                            isdo = 1
                            break
                        }
                    }
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_IMMORTAL_MALL) {  //天宫商城
                    isdo = 0
                    todo = 1
                    for (let [v, k] of Object.entries(mission.valueEx)) {
                        if (k == tbl.condition) {
                            isdo = 1
                            break
                        }
                    }
                } 
                */
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {   //演武堂
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_FREIND) {   //好友
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_ENEMY) {   //敌人
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_USE_LEAGUECOIN) {   //消耗公会币
                }
                // else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_VIP) {   //我是土豪
                // } 
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TOWER) {   //爬塔
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_JOIN) {   //加入帮会
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_LEAGUE_DONATE) {   //帮会捐献
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_CHAT_WORLD) {   //世界喊话
                }
                // else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_CHEST) {   //普通宝箱
                // } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_ELITE_CHEST) {   //高级宝箱
                // } 
                else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SOUL ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_ARREST ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_HUNT) {   //通缉令通关到某一关
                    todo = todo % 10000;
                    isdo = isdo % 10000;
                    if (isdo > todo) {
                        isdo = todo;
                    }
                }

            } else if (mission.type == message.MissionType.MISSION_TYPE_DAILY) { //成就任务 ) { --每日任务 -- 与时间赛跑

                let state = null;

                if ((tblType.open_level != 0 && tblType.open_level > Game.PlayerInfoSystem.BaseInfo.level)
                    || (tblType.open_level == 0 && tblType.open_instance != 0 && !Game.PlayerInstanceSystem.Set(tblType.open_instance).Clear)
                ) {
                    state = TableEnum.EnumDailyLive.unOpened;
                } else if (tbl.condition > mission.value && !mission.isFinish) {
                    state = TableEnum.EnumDailyLive.unfinished;
                } else if (tbl.condition <= mission.value && !mission.isFinish) {
                    state = TableEnum.EnumDailyLive.finished;
                } else if (tbl.condition <= mission.value && mission.isFinish) {
                    state = TableEnum.EnumDailyLive.rewarded;
                }

                if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_MONTH
                    || mission.subType == message.MissionSubType.MISSION_SUB_TYPE_SENIOR_MONTH
                ) {
                    // if (Bit._rshift(mission.value, 31) == 0) {
                    //     state = TableEnum.EnumDailyLive.unfinished;
                    // }
                    if ((mission.value >> 31) == 0) {
                        state = TableEnum.EnumDailyLive.unfinished;
                    }
                }

                return state;

            } else if (mission.type == message.MissionType.MISSION_TYPE_MAIN ||  //主线任务
                mission.type == message.MissionType.MISSION_TYPE_JEWEL) {   // 宝石任务

                if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE ||       // 通关副本 2
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPLEVEL ||       // 武将最大等级 7
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||       // 武将最大品质 8
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPSTAR ||        // 武将最大星级 9
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TOWER ||                 // 普通爬塔最高层 25
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SOUL ||           // 流星街第一个副本最大层 55
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||           // 流星街第四个副本最大层 69
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||           // 流星街第五个副本最大层 70
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX ||            // 流星街第六个副本最大层 71
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_STAR ||           // 卡片升到几星（不支持执照） 68
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_UPLEVEL ||        // 卡片升到几级 64
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_ARREST ||
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_HUNT) {
                    isdo = yuan3(isdo >= todo, 1, 0);
                    todo = 1;
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE) {    //// 精英副本 3 
                    let max = 0;
                    for (let [kk, vv] of HelpUtil.GetKV(mission.valueEx)) {
                        if (vv > max) {
                            max = vv;
                        }
                    }
                    isdo = max;
                    isdo = yuan3(isdo >= todo, 1, 0);
                    todo = 1;
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR) {  //// 获得几星以上武将数量 10
                    for (let [v, k] of HelpUtil.GetKV(mission.valueEx)) {
                        if (Math.floor(k / 10000) == Math.floor(todo / 10000)) {
                            isdo = k % 10000;
                        }
                    }
                    todo = todo % 10000;
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_LEVEL_NUM ||  //// 获得几级以上武将数量 13
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_TIMES ||  //// 通关流星街第几个关卡几次 53
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY_NUM) { //// 获得几阶以上武将数量 15
                    todo = Math.floor(todo / 100000);
                } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR_USEBUFF ||  //// 获得几级以上武将数量 29      
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE_USEBUFF ||  //// 获得几级以上武将数量 30      
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE_NUMBER ||  //// 获得几级以上武将数量 31  
                    mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX_USEBUFF) {  //// 通过第六个流星街副本使用了什么buff 33  
                    todo = 1;
                }

            } else if (mission.type == message.MissionType.MISSION_TYPE_LICENCE) {  //执照任务

                let subId = mission.subType;
                let info = this.missionMap[index];
                let missionId = info.missionId;
                let state = null;
                let star_list = this.GetItemMissionId(index);
                let condition = this.itemInfo(missionId).condition;
                let max = 0;
                let value;
                for (let [kk, vv] of HelpUtil.GetKV(star_list)) {

                    if (subId == 25 || subId == 2) {
                        value = mission.value;
                    } else if (subId == 55) {
                        value = mission.value % this.MISSION
                        condition = condition;
                    } else {
                        for (let [kk, vv] of HelpUtil.GetKV(mission.valueEx)) {
                            if (vv > max) {
                                max = vv;
                            }
                        }
                        value = max;
                    }
                }


                for (let [kk, vv] of HelpUtil.GetKV(star_list)) {

                    if (condition <= value && !mission.isFinish) {
                        state = TableEnum.EnumDailyLive.finished;
                    } else if (condition > value && !mission.isFinish) {
                        state = TableEnum.EnumDailyLive.unfinished;
                    } else if (mission.isFinish) {
                        state = TableEnum.EnumDailyLive.rewarded;
                    }
                }
                return state;
            }


            if (isdo >= todo) {
                isdo = todo;
            }


            let isCanGet = (isdo == todo && !mission.isFinish);
            let percent = isdo / todo;

            return [isdo, todo, isLock, isOver, percent, isCanGet];
        }

        /**
         * 返回通行证任务完成情况
         */
        public battlePassComplete(missionType: TableMissionType, id: number) {
            let mission = this.missionMap[missionType.index];
            let tbl: TableMissionItem = this.itemInfo(id);
            let isLock: boolean;
            let [isdo, todo, isOver] = [mission.value, tbl.condition, false];

            if (missionType.type == message.MissionType.MISSION_TYPE_WEEK_REFRESH || missionType.type == message.MissionType.MISSION_TYPE_MONTH_REFRESH) {
                if (missionType == null) {
                    toast_warning("mission_table is error~~~ " + "type = " + missionType.type + ", subType = " + mission.subType);
                    return;
                }
                if (missionType == null || missionType.open_level == null) {
                    isLock = false;
                } else {
                    isLock = missionType.open_level > Game.PlayerInfoSystem.BaseInfo.level;
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
                for (let [v, k] of HelpUtil.GetKV(mission.valueEx)) {
                    if (Math.floor(k / 10000) == Math.floor(todo / 10000)) isdo = k % 10000;
                }
                todo = todo % 10000;
            }

            if (isdo >= todo) {
                isdo = todo;
            }

            let isCanGet = (isdo >= todo && (id >= mission.missionId) && !mission.isFinish);
            let percent = isdo / todo;

            return [isdo, todo, isLock, isOver, percent, isCanGet];
        }

        public itemCompleteForBattlePass(mission: TableMissionType, id: number) {
            let [isdo, todo, isLock, isOver, percent, isCanGet] = Game.PlayerMissionSystem.battlePassComplete(mission, id);
            let info = { isDo: isdo, toDo: todo, finish: isCanGet, }
            return info;
        }

        public itemCompleteForLive(index: number): boolean {
            let state = this.itemComplete(index);
            return state == TableEnum.EnumDailyLive.finished;
        }

        public itemCompleteForAchieve(index: number) {
            let [isdo, todo, isLock, isOver, percent, bCanGet] = this.itemComplete(index) == null ? [false, false, false, false, false, false] : this.itemComplete(index);
            return bCanGet;
        }


        /**
         * 主线
         */
        public itemCompleteForMain(index) {
            let [isdo, todo, aa, isOver, bb, isCanGet] = Game.PlayerMissionSystem.itemComplete(index);
            let info = {
                isDo: isdo,
                toDo: todo,
                finish: isCanGet,
            }
            return info;
        }

        /**
         * 跳转
         */

        public getMission(mainType: number, subType: number): (data?) => void {
            let _INDEX_FUNC = {
                [1]: this.goto_instance_normal,              //队伍升级
                [2]: this.goto_instance_normal,              //普通副本
                [3]: this.goto_instance_elite,               //精英副本
                [4]: this.goto_other_tavern,                 //酒馆寻访
                [5]: this.goto_hunter_strength,              //购买体力
                [6]: this.goto_other_tavern,                 //武将数量
                [7]: this.goto_hero_grade,                   //武将升级
                [8]: this.goto_hero_grade,                   //武将品质
                [9]: this.goto_hero_grade,                   //武将升星
                [10]: this.goto_hero_grade,                  //高星武将
                [11]: this.goto_other_charge,                //普通月卡
                [12]: this.goto_other_charge,                //高级月卡
                [13]: this.goto_hero_grade,                  //武将升级
                [14]: this.goto_hero_talent,                 //学习天赋
                [15]: this.goto_hero_talent,                 //天赋升级
                [16]: this.goto_do_nothing,                  //累计消费
                [17]: this.goto_scene_wonder,                //采集果子
                [18]: this.goto_do_nothing,                  //消耗金币
                [19]: this.goto_arena_mall,                  //消耗格斗币
                [20]: this.goto_instance_arena,              //演武堂
                [21]: this.goto_friend,                      //好友
                [22]: this.goto_nothing,                     //仇敌
                [23]: this.goto_league_mall,                 //帮会商店
                [24]: this.goto_nothing,                     //我是土豪
                [25]: this.goto_instance_tower,              //爬塔
                [26]: this.goto_scene_league,                //加入帮会
                [27]: this.goto_scene_league,                //帮会捐献
                [28]: this.goto_nothing,                     //世界喊话
                [29]: this.goto_star_street_4,               //第四个流星街副本
                [30]: this.goto_star_street_5,               //第五个流星街副本
                [31]: this.goto_instance_normal,             //挑战普通副本10次
                [32]: this.goto_instance_elite,              //挑战精英副本5次
                [33]: this.goto_star_street_6,               //第六个流星街副本
                [34]: this.goto_instance_tower,              //爬塔1次
                [35]: this.goto_instance_arena,              //竞技场挑战10次
                [36]: this.goto_hero_skill,                  //升级技能5次
                [37]: this.goto_other_money,                 //摇钱树2次
                [38]: this.goto_instance_normal,             //消耗体力
                [39]: this.goto_scene_wanted,                //通缉令次数
                [40]: this.goto_nothing,                     //军师升级
                [41]: this.goto_scene_mine,                  //挖矿次数
                [42]: this.goto_scene_mine,                  //护矿次数
                [43]: this.goto_scene_mine,                  //抢矿次数
                [44]: this.goto_nothing,                     //最高六人战力
                [45]: this.goto_scene_wonder,                //兑换
                [46]: this.goto_scene_wonder,                //钓鱼
                [47]: this.goto_hero_adviser,                //观星次数
                [48]: this.goto_other_charge,                //vip工资
                [49]: this.goto_hero_grade,                  //武将品阶
                [50]: this.goto_do_nothing,                  //累计消费另外一个
                [51]: this.goto_scene_league,                //帮会副本1次
                [52]: this.goto_card,                        //卡片升星
                [53]: this.goto_star_street_num,             //通过流星街多少次
                [54]: this.goto_scene_league,                //群雄争霸次数
                [55]: this.goto_star_street_1,               //流星街第一个副本
                [56]: this.goto_star_street_2,               //流星街第二个副本
                [57]: this.goto_star_street_3,               //流星街第三个副本
                [58]: this.goto_scene_wonder,                //猜拳
                [59]: this.goto_scene_wanted,                //通缉令
                // [60] : this.goto_scene_wanted,            //通缉令
                [61]: this.goto_card,                        //卡片升星
                [60]: this.goto_instance_arena,              //跨服格斗
                [62]: this.goto_explore,                     //探索
                [64]: this.goto_card,                        //卡片升级
                [65]: this.goto_card,                        //卡片升级
                [66]: this.goto_opend_card,                  //开卡包
                [67]: this.goto_friend,                      //好友
                [68]: this.goto_card,                        //卡片升星
                [69]: this.goto_star_street_4,               //第四个流星街副本
                [70]: this.goto_star_street_5,               //第五个流星街副本
                [71]: this.goto_star_street_6,               //第六个流星街副本
                [72]: this.goto_general_upstar,              //武将升星次数
                [73]: this.goto_group_fight,                 //组队战
                [74]: this.goto_do_nothing,                  //切磋
                [79]: this.goto_card,                        //切磋
                [96]: this.goto_instance_tower,
                [95]: this.goto_hero_grade,                        // 卡片
                [97]: this.goto_relice,
                [99]: this.goto_work,                        // 工作派遣
            }

            // if (!Table.VIn(message.MissionType, mainType) || !Table.VIn(message.MissionSubType, subType)) {
            //     return _INDEX_FUNC[subType];
            // }
            // else {
            //     return this.goto_nothing;
            // }

            let aa: boolean = false;
            let bb: boolean = false;

            for (let key in message.MissionType) {
                if (Number(message.MissionType[key]) == mainType) {
                    aa = true;
                }
            }
            for (let key in message.MissionSubType) {
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
        }

        /**
         * 与时间赛跑完成
         * @param index 索引
         */
        public raceItemComplete(index: number) {
            let mission = this.missionMap[index];
            let tbl = this.MissionItem(mission.missionId);
            let isLock: boolean;
            let tblType: TableMissionType = this.itemType(mission.type, mission.subType);
            if (tblType == null || tblType.open_level == null) {
                isLock = false;
            } else {
                isLock = tblType.open_level > Game.PlayerInfoSystem.BaseInfo.level;
            }

            let isdo = mission.value;
            let todo: number = tbl.condition;
            let isOver = mission.isFinish;


            if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE ||      //// 通关副本 2
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPLEVEL ||      //// 武将最大等级 7
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY ||      //// 武将最大品质 8
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_UPSTAR ||      //// 武将最大星级 9
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_TOWER ||      //// 普通爬塔最高层 25
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SOUL ||      //// 流星街第一个副本最大层 55
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||      //// 流星街第四个副本最大层 69
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||      //// 流星街第五个副本最大层 70
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX ||      //// 流星街第六个副本最大层 71
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_STAR ||      //// 卡片升到几星（不支持执照） 68
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_POTATO_UPLEVEL) {    //// 卡片升到几级 64
                isdo = yuan3(isdo >= todo, 1, 0);
                todo = 1;
            } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_ELITE_INSTANCE) {    //// 精英副本 3 
                let max = 0;
                for (let [kk, vv] of HelpUtil.GetKV(mission.valueEx)) {
                    if (vv > max) {
                        max = vv;
                    }
                }
                isdo = max;
                isdo = yuan3(isdo >= todo, 1, 0);
                todo = 1;
            } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR) {  //// 获得几星以上武将数量 10
                for (const v in mission.valueEx) {
                    const k = mission.valueEx[v];
                    if (Math.floor(k / 10000) == Math.floor(todo / 10000)) {
                        isdo = k % 10000;
                    }
                }
                todo = todo % 10000;
            } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_LEVEL_NUM ||  //// 获得几级以上武将数量 13
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_TIMES ||  //// 通关流星街第几个关卡几次 53
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY_NUM) {  //// 获得几阶以上武将数量 15
                todo = Math.floor(todo / 100000);
            } else if (mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR_USEBUFF ||  //// 获得几级以上武将数量 29      
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE_USEBUFF ||  //// 获得几级以上武将数量 30      
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_NORMAL_INSTANCE_NUMBER ||  //// 获得几级以上武将数量 31  
                mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX_USEBUFF) {  //// 通过第六个流星街副本使用了什么buff 33  
                todo = 1;
            }
            if (isdo >= todo) {
                isdo = todo;
            }
            let isCanGet = (isdo == todo && !mission.isFinish);
            let percent = isdo / todo;

            return [isdo, todo, isLock, isOver, percent, isCanGet];
        }

        public NoviceCanReward(type: number) {
            let newThis = this;
            let a = [];
            let dayIdx = Math.min(7, Helper.day());
            for (let i = 1; i <= dayIdx; i++) {
                for (let k in TableEnum.Enum.NoviceMissionType[type][i]) {
                    let v = TableEnum.Enum.NoviceMissionType[type][i][k];
                    a.push(v);
                }
            }
            let bFind = Table.FindF(a, (k, subType) => {
                let id = newThis.itemIndex(TableEnum.Enum.TableNoviceMissionType[type - 1], subType)
                let mission = newThis.missionMap[id]
                let info = newThis.itemInfo(mission.missionId)
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
                    subType == message.MissionSubType.MISSION_SUB_TYPE_SEARCH_CHENG
                ) {
                    return mission.value >= info.condition && !mission.isFinish
                } else if (subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FOUR ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_FIVE ||
                    subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_SIX
                ) {
                    return mission.value % 10000 >= info.condition && !mission.isFinish
                } else if (subType == message.MissionSubType.MISSION_SUB_TYPE_LADDER) {
                    return mission.value <= info.condition && !mission.isFinish
                } else {
                    if (mission.valueEx.length != 0) {
                        let mk = Helper.MissionProgress(mission.valueEx, Math.floor(info.condition / 10000))
                        return mk >= info.condition % 10000 && !mission.isFinish
                    } else {
                        return false;
                    }
                }
            })

            let vis = () => {
                let dayIdx = Math.min(7, Helper.day());
                for (let i = 1; i <= dayIdx; i++) {
                    if (this.sad(i)) {
                        i = 8;
                        return true;
                    };
                }
                return false;
            }
            return bFind || vis();
        }

        public NoviceCanRewardEnd(type: number): boolean {
            let newThis = this;
            let a = [];
            for (let i = 1; i <= Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length; i++) {
                for (let k in TableEnum.Enum.NoviceMissionType[type][i]) {
                    let v = TableEnum.Enum.NoviceMissionType[type][i][k];
                    a.push(v);
                }
            }
            let bOver = this.alltrue(a, function (k, subType) {
                let id = newThis.itemIndex(TableEnum.Enum.TableNoviceMissionType[type - 1], subType);
                let mission = newThis.missionMap[id];

                let _type = newThis.itemType(mission.type, mission.subType);
                // 计算任务数量
                let ROW_ITEM = _type.end_id - _type.start_id + 1;
                return mission.missionId % 10 == ROW_ITEM && mission.isFinish == true;
            });

            let bReward = null;
            if (type == TableEnum.Enum.TableEnumNoviceIndex.NOVICE_NORMAL) {
                bReward = Game.PlayerMixUnitInfoSystem.mixunitinfo.isMissionnewReward;
            } else {
                bReward = Table.FindK(Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, TableEnum.Enum.TableNoviceMissionType[type - 1]) != -1;
            }
            let count = bOver && !bReward;
            return count;
        }

        public sad(index) {
            let missionGift = [];
            for (let i = 1; i <= 7; i++) {
                let a = [];
                for (let j = 1; j <= 4; j++) {
                    a.push(TableMissionGift.Table()[(j + "0" + i)]);
                }
                missionGift.push(a);
            }
            let vis1: boolean = false;
            for (let i = 0; i < missionGift[index - 1].length; i++) {
                let vis = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.mission_gift, (k, v: number) => {
                    return v == missionGift[index - 1][i].index;
                });
                if (i == 0) {
                    if (!vis) {
                        vis1 = true;
                        i = 4;
                    }
                } else if (i == 3) {
                    if (!vis && (Game.PlayerInfoSystem.BaseInfo.chargeToken / 10 > missionGift[index - 1][3].charge_token / 10)) {
                        vis1 = true;
                        i = 4;
                    }
                }
            }
            return vis1;
        }

        public WeekMissionCanReward(mission_types) {
            let mk = 0
            let bFind = Table.FindF(mission_types, (k, id) => {
                let mission = this.missionMap[id]
                let info = this.itemInfo(mission.missionId);
                if (this.itemMissionWeekValNormalType(id)) {
                    return mission.value >= info.condition && !mission.isFinish
                } else {
                    if (mission.valueEx.length != 0) {
                        mk = Helper.MissionProgress(mission.valueEx, Math.floor(info.condition / 10000));
                        return mk >= info.condition % 10000 && !mission.isFinish;
                    } else {
                        return false
                    }
                }
            });
            return bFind
        }



        //////////////////////////跳转副本类型/////////////////////////////
        private goto_instance_normal() { // 冒险副本
            // loadUI(Adventurems)
            //     .then((dialog: Adventurems) => {
            //         dialog.LoadFromBattleNormal(true);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
            SceneManager.instance.EnterAdventure(1);
        }

        private goto_instance_elite() { // 挑战副本
            // loadUI(Adventurems)
            //     .then((dialog: Adventurems) => {
            //         dialog.LoadFromBattleElite(true);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
            SceneManager.instance.EnterAdventure(2);
        }

        private goto_explore() { // 探索副本
            loadUI(WorkSendMain).then((scene: WorkSendMain) => {
                scene.show(UI.SHOW_FILL_OUT);
            });
        }

        private goto_instance_exp() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.BASTILLEEXP, true)) {
                // loadUI(Bastille_Main)
                //     .then((dialog: Bastille_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        }

        private goto_instance_money() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.BASTILLE, true)) {
                // loadUI(Bastille_Main)
                //     .then((dialog: Bastille_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        }

        private goto_instance_tower() { // 天空竞技场
            if (PlayerMissionSystem.FunOpenTo(FUNC.TOWER, true)) {
                loadUI(SkyAreanMainScene)
                    .then((scene: SkyAreanMainScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.Init();
                    });
            }
        }

        private goto_instance_arena() { // 格斗场
            if (PlayerMissionSystem.FunOpenTo(FUNC.ARENA, true)) {
                loadUI(ArenaMainScene)
                    .then((dialog: ArenaMainScene) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        //////////////////////////跳转场景类型/////////////////////////////
        private goto_scene_wonder() { // 贪婪之岛
            if (PlayerMissionSystem.FunOpenTo(FUNC.WONDERLAND, true)) {
                SceneManager.instance.EnterSceneZorkBoss();
            }
        }

        private goto_scene_league() { // 公会
            if (PlayerMissionSystem.FunOpenTo(FUNC.LEAGUE, true)) {
                Game.PlayerMissionSystem.ReqLeague()
                    .then((value: {}) => {
                        if (Game.PlayerInfoSystem.BaseInfo.leagueId == 0) {
                            loadUI(LeagueChooseScene)
                                .then((dialog: LeagueChooseScene) => {
                                    dialog.init();
                                    dialog.show(UI.SHOW_FROM_TOP);
                                });
                        } else {
                            loadUI(LeagueHomeScene)
                                .then((dialog: LeagueHomeScene) => {
                                    dialog.init();
                                    dialog.show(UI.SHOW_FROM_TOP);
                                });
                        }
                    })
                    .catch((reason) => {
                        toast(Helper.GetErrorString(reason));
                    });
            }
        }

        //////////////////////////跳转商铺类型/////////////////////////////
        private goto_normal_mall() { // 普通商店
            if (PlayerMissionSystem.FunOpenTo(FUNC.MALL, true)) {
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(TableEnum.Enum.Mall.NORMAL);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_arena_mall() { // 格斗商店
            if (PlayerMissionSystem.FunOpenTo(FUNC.ARENA, true)) {
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(TableEnum.Enum.Mall.ARENA);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_league_mall() { // 公会商店
            if (PlayerMissionSystem.FunOpenTo(FUNC.LEAGUE, true) && PlayerHunterSystem.LevelDBOpenLeague(true) && Game.PlayerInfoSystem.LeagueId != 0) {
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(TableEnum.Enum.Mall.LEAGUE);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        //////////////////////////跳转主城类型/////////////////////////////
        private goto_scene_wanted() { // 流星街
            if (PlayerMissionSystem.FunOpenTo(FUNC.ARREST, true)) {
                loadUI(WantedSecondMeteorstanceScene)
                    .then((dialog: WantedSecondMeteorstanceScene) => {
                        dialog.Init(1);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_scene_mine() {
            // if (PlayerMissionSystem.FunOpenTo(FUNC.MINE, true)) {

            // }
        }

        private goto_hero_grade() { //武将升级
            loadUI(HunterMainScene)
                .then((Scene: HunterMainScene) => {
                    Scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private goto_hero_fate() {
            loadUI(HunterMainScene)
                .then((Scene: HunterMainScene) => {
                    Scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private goto_hero_skill() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.SKILL, true)) {
                loadUI(HunterMainScene)
                    .then((Scene: HunterMainScene) => {
                        Scene.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_hero_talent() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.TALENT, true)) {
                loadUI(HunterMainScene)
                    .then((Scene: HunterMainScene) => {
                        Scene.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_hero_stren() {
            // if (PlayerMissionSystem.FunOpenTo(FUNC.STRENGTH, true)) {

            // }
        }

        private goto_hero_forge() {
            // if (PlayerMissionSystem.FunOpenTo(FUNC.FORGE, true)) {

            // }
        }


        private goto_hero_carve() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.CARVE, true)) {
                loadUI(HunterMainScene)
                    .then((Scene: HunterMainScene) => {
                        Scene.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_hero_adviser() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.ADVISER, true)) {
                // loadUI(AdviserMain_Main)
                //     .then((dialog: AdviserMain_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        }

        private goto_hero_artifact() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.ARTIFACT, true)) {
                // loadUI(Adviser_Main)
                //     .then((dialog: Adviser_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        }

        private goto_hunter_strength() { // 购买体力
            loadUI(HXH_HunterUserStrength)
                .then((Scene: HXH_HunterUserStrength) => {
                    Scene.SetInfo();
                    Scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private goto_other_money() {
            // loadUI(Money_Main)
            //     .then((dialog: Money_Main) => {
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
        }

        private goto_other_charge() { // 跳转充值
            // PushUI("HXH_PayMall","commonEffect"):LoadFrom(uiFather,Enum.HXHChargeType.Charge,cb)
            // loadUI(HXH_PayMall)
            //     .then((dialog: HXH_PayMall) => {
            //         dialog.LoadFrom(uiFather,Enum.HXHChargeType.Charge,cb);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
        }

        private goto_star_street_1() {
            let index = 1;
            let limit_level = PlayerWantedSystem.GetLimitLevel(index);
            if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                loadUI(WantedSecondMeteorstanceScene)
                    .then((scene: WantedSecondMeteorstanceScene) => {
                        //接口
                        scene.Init(1);
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        }

        private goto_star_street_2() {
            let index = 2;
            let limit_level = PlayerWantedSystem.GetLimitLevel(index);
            if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                loadUI(WantedSecondMeteorstanceScene)
                    .then((scene: WantedSecondMeteorstanceScene) => {
                        //接口
                        scene.Init(2);
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        }

        private goto_star_street_3() {
            let index = 3;
            let limit_level = PlayerWantedSystem.GetLimitLevel(index);
            if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                loadUI(WantedSecondMeteorstanceScene)
                    .then((scene: WantedSecondMeteorstanceScene) => {
                        //接口
                        scene.Init(3);
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        }

        private goto_star_street_4() {
            let index = 4;
            let limit_level = PlayerWantedSystem.GetLimitLevel(index);
            if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                loadUI(WantedSecondMeteorstanceScene)
                    .then((scene: WantedSecondMeteorstanceScene) => {
                        //接口
                        scene.Init(4);
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        }

        private goto_star_street_5() {
            let index = 5;
            let limit_level = PlayerWantedSystem.GetLimitLevel(index);
            if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                loadUI(WantedSecondMeteorstanceScene)
                    .then((scene: WantedSecondMeteorstanceScene) => {
                        //接口
                        scene.Init(5)
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        }

        private goto_star_street_6() {
            let index = 6;
            let limit_level = PlayerWantedSystem.GetLimitLevel(index);
            if (Game.PlayerInfoSystem.BaseInfo.level >= limit_level) {
                this.fightExt = index;
                loadUI(WantedSecondMeteorstanceScene)
                    .then((scene: WantedSecondMeteorstanceScene) => {
                        //接口
                        scene.Init(6);
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[index]));
            }
        }

        private goto_general_upstar() { // 猎人升星
            if (PlayerMissionSystem.FunOpenTo(FUNC.HEROSTAR, true)) {
                loadUI(HunterMainScene)
                    .then((dialog: HunterMainScene) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_group_fight() { // 飞龙营地
            if (PlayerMissionSystem.FunOpenTo(FUNC.GROUPFIGHT, true)) {
                loadUI(HXH_GroupFightMain)
                    .then((dialog: HXH_GroupFightMain) => {
                        dialog.Init();
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_relice() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.DARKLAND2, true)) {
                loadUI(DarkLandHomeScene)
                    .then((scene: DarkLandHomeScene) => {
                        scene.show(UI.SHOW_FILL_OUT);
                        loadUI(RelicMain)
                            .then((scene: RelicMain) => {
                                scene.show(UI.SHOW_FROM_TOP);
                            });
                    });
            }
        }

        private goto_work() {
            loadUI(WorkSendMain).then((scene: WorkSendMain) => {
                scene.show(UI.SHOW_FILL_OUT);
            });
        }

        private goto_other_month() {

        }

        private goto_other_rank() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.RANK, true)) {
                // loadUI(Rank_Main)
                //     .then((dialog: Rank_Main) => {
                //         dialog.LoadFrom(this, TableEnum.Enum.Rank.ALL);
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        }

        private goto_star_street_num(condition) {
            let id = condition % 100000;
            let index = PlayerWantedSystem.Instance(id).type;
            this.fightExt = index;
            loadUI(WantedSecondMeteorstanceScene)
                .then((scene: WantedSecondMeteorstanceScene) => {
                    //接口
                    scene.Init(index);
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

        private goto_card() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.POTATO, true)) {
                loadUI(CardMainScene)
                    .then((dialog: CardMainScene) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_other_tavern() {
            loadUI(TavernScene)
                .then((dialog: TavernScene) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private goto_other_treasure() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.TREASURE, true)) {
                // loadUI(Treasure_Main)
                //     .then((dialog: Treasure_Main) => {
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        }

        private goto_jade() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.JADE, true)) {
                // loadUI(Jade_Main)
                //     .then((dialog: Jade_Main) => {
                //         dialog.load();
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
            }
        }

        private goto_zork() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.ZORK, true)) {
                // StageSceneManager.Instance.ChangeScene(StageSceneZork);
            }
        }

        private goto_opend_card() { // 开卡包
            if (PlayerMissionSystem.FunOpenTo(FUNC.POTATO, true)) {
                loadUI(CardMainScene)
                    .then((dialog: CardMainScene) => {
                        dialog.addUI(1);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
        }

        private goto_friend() { // 好友界面
            Game.PlayerMissionSystem.ReqRelation()
                .then((value: {}) => {
                    loadUI(Friend_MainFriendSence)
                        .then((dialog: Friend_MainFriendSence) => {
                            dialog.init();
                            dialog.show(UI.SHOW_FROM_TOP);
                        });
                })
                .catch((reason) => {
                    toast(Helper.GetErrorString(reason));
                });
        }

        private goto_nothing() {
            toast_warning(TextsConfig.TextsConfig_Error.debug_task);
        }

        private goto_do_nothing() {

        }

        ////////////////////////////////////////////////////////////////

        public tableLength(table: Object): number {
            let len = 0;
            for (let k in table) {
                len++;
            }
            return len;
        }
        public beHide(fromId: number) {
            let ret: boolean = false;
            if (fromId == 23) {
                let bFirst: boolean = Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward.length != this.tableLength(TableFirstCharge.Table());
                let noCharge: boolean = Game.PlayerMixUnitInfoSystem.mixunitinfo.old_chargeToken == 0;
                let info: message.ProgressInfo = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
                let haveTime = info.info;
                ret = !(bFirst && noCharge && haveTime);
            }
            else if (fromId == 35) { // 通关副本第一章
                ret = false;
            }
            else if (fromId == 36) { // 7日活动
                ret = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime <= 0;
            }
            else if (fromId == 37) { // 双月卡活动
                let [_, index] = Table.FindR(this.activities, function (_k, _v) {
                    return _v.type == message.ActivityType.ACT_TYPE_MONTHFIT;
                });
                ret = index == null;
            }
            else if (fromId == 38) { //198自选礼包
                ret = true
                let find_gift = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (_k, _v) {
                    return _v.gift_index == 100213;
                })[0];

                let gift_info = PlayerGiftSystem.Instance_item(100213);

                if (find_gift != null) {
                    if (find_gift.buy_times < gift_info.buy_times) {
                        ret = false
                    }
                }
            }
            else if (fromId == 39) { // 开服累计充值
                let [_, index] = Table.FindR(this.activities, function (_k, _v) {
                    return _v.type == message.ActivityType.ACT_TYPE_CHARGEADD && _v.picId == 2;
                });

                ret = index == null;
            }
            return ret;
        }


        ///////////////////////////////执照相关////////////////////////////////
        /**
         * 返回执照任务
         */
        public listForLicence(): Array<TableMissionType> {
            let info: { [key: string]: TableMissionType } = TableMissionType.Table();
            let list: Array<TableMissionType> = [];
            for (let [kk, vv] of HelpUtil.GetKV(info)) {
                if (vv.type == message.MissionType.MISSION_TYPE_LICENCE) {
                    list.push(vv);
                }
            }

            let ret = Table.DeepCopy(list);
            ret.sort((a, b) => {
                return a.index - b.index;
            });
            return ret;
        }
        /**返回高级执照任务 */
        public listForHighLicence() {
            let info = TableMissionType.Table();
            let list = [];
            for (var k in info) {
                if (info.hasOwnProperty(k)) {
                    var v = info[k];
                    if (v.type == message.MissionType.MISSION_TYPE_HIGH_LICENCE) {
                        list.push(v)
                    }
                }
            }
            let ret = Table.copy(list)
            ret.sort((a, b) => {
                return a.sort - b.sort;
            });
            return ret
        }

        /**
         * 执照任务包含的所有子任务
         * @param missionIndex 索引
         */
        public GetItemMissionId(missionIndex): Array<TableMissionItem> {
            let mission: message.MissionInfo = this.missionMap[missionIndex]
            let starId: number = this.itemSubType(missionIndex).start_id
            let endId: number = this.itemSubType(missionIndex).end_id
            let info: { [key: string]: TableMissionItem } = TableMissionItem.Table();

            let list: Array<TableMissionItem> = [];
            for (let [kk, vv] of HelpUtil.GetKV(info)) {
                if (vv.id >= starId && vv.id <= endId) {
                    list.push(vv);
                }
            }

            let ret: Array<TableMissionItem> = Table.DeepCopy(list);
            ret.sort((a, b) => {
                return a.id - b.id;
            })

            return ret;
        }

        public GetBattlePassWeekMission(): Array<TableMissionItem> {
            let info: { [key: string]: TableMissionItem } = TableMissionItem.Table();
            let ret: Array<TableMissionItem> = [];
            for (const key in TableMissionType.Table()) {
                if (TableMissionType.Table().hasOwnProperty(key)) {
                    const element = TableMissionType.Table()[key];
                    if (element.type == message.MissionType.MISSION_TYPE_WEEK_REFRESH) {
                        let [starId, endId] = [element.start_id, element.end_id]
                        for (const k in TableMissionItem.Table()) {
                            if (TableMissionItem.Table().hasOwnProperty(k)) {
                                const element1 = TableMissionItem.Table()[k];
                                if (element1.id >= starId && element1.id <= endId) {
                                    ret.push(element1);
                                }
                            }
                        }
                    }
                }
            }

            ret.sort((a, b) => { return a.id - b.id; })
            return ret;
        }

        public GetBattlePassMonthMission() {
            let info: { [key: string]: TableMissionItem } = TableMissionItem.Table();
            let ret: Array<TableMissionItem> = [];
            for (const key in TableMissionType.Table()) {
                if (TableMissionType.Table().hasOwnProperty(key)) {
                    const element = TableMissionType.Table()[key];
                    if (element.type == message.MissionType.MISSION_TYPE_MONTH_REFRESH) {
                        let [starId, endId] = [element.start_id, element.end_id];
                        for (const k in TableMissionItem.Table()) {
                            if (TableMissionItem.Table().hasOwnProperty(k)) {
                                const element1 = TableMissionItem.Table()[k];
                                if (element1.id >= starId && element1.id <= endId) {
                                    ret.push(element1);
                                }
                            }
                        }
                    }
                }
            }
            ret.sort((a, b) => { return a.id - b.id });
            return ret;
        }

        /**
         * 获取执照科目对应已完成子任务
         * @param missionIndex 索引
         */
        public GetMaxCondition(missionIndex) {
            let list: Array<TableMissionItem> = this.GetItemMissionId(missionIndex); // 包含的子任务
            let mission: message.MissionInfo = this.missionMap[missionIndex]; // 服务器传的任务信息
            let subId: number = this.itemSubType(missionIndex).sub_type; // 任务子类型
            let startId: number = this.itemSubType(missionIndex).start_id; // 开始任务Id
            let conditionItem: number = this.itemInfo(startId).condition; // 完成条件
            let max: number = 1;
            let min: number = 10000000;
            let list_1 = [];
            let list_2 = [];
            let list_star = [];
            let value: number;

            // 每个子任务进度
            if (subId == 25 || subId == 2 || subId == 97 || subId == 96) {
                value = mission.value;
            } else if (subId == 55 || subId == 69) {
                value = mission.value % this.MISSION;
            } else {
                for (let [kk, vv] of HelpUtil.GetKV(mission.valueEx)) {
                    if (vv > max) {
                        max = vv;
                    }
                }
                value = max;
            }
            // 每个子任务完成的所有任务信息
            for (let [kk, vv] of HelpUtil.GetKV(list)) {
                if (subId == 3) {
                    let isMiss = Table.FindF(mission.valueEx, function (k, v) {
                        return vv.condition == v;
                    });
                    if ((value >= vv.condition && isMiss == true) || (value >= vv.condition || isMiss == null)) {
                        list_2.push(vv);
                        for (let [k, v] of HelpUtil.GetKV(list_2)) {
                            if (v.id > max) {
                                max = v.id;
                                if (list_2.length == 1) {
                                    list_star = [];
                                } else if (list_2.length == v.id % this.MISSION_BASE % this.MISSION) {
                                    list_star = Table.DeepCopy(list_2);
                                } else {
                                    list_star = [];
                                }
                            }
                        }
                    } else if (isMiss == false) {
                        list_1.push(vv);
                        for (let [_kk, _vv] of HelpUtil.GetKV(list_1)) {
                            for (let [_k, _v] of HelpUtil.GetKV(list)) {
                                if (_vv.id < min) {
                                    min = vv.id;
                                    if (min > _v.id) {
                                        list_star.push(_v);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (value >= vv.condition && value != 0) {
                        list_star.push(vv)
                    }
                }
            }
            return list_star;
        }

        /**
         * 执照科目当前星级
         * @param missionIndex 索引
         */
        public GetMaxStar(missionIndex: number) {
            let star_list = this.GetMaxCondition(missionIndex);
            let subId: number = this.itemSubType(missionIndex).sub_type;
            let mission: message.MissionInfo = this.missionMap[missionIndex];
            let startId: number = this.itemSubType(missionIndex).start_id;
            let conditionItem: number = this.itemInfo(startId).condition;
            let maxCondition: number = 0;
            let maxStar: number = 0;
            let value: number;

            if (subId == 25 || subId == 2 || subId == 97 || subId == 96) {
                value = mission.value;
            } else if (subId == 55 || subId == 69) {
                value = mission.value % this.MISSION;
            } else {
                let max = 1;
                for (let [kk, vv] of HelpUtil.GetKV(mission.valueEx)) {
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
            } else {
                if (value % this.MISSION_BASE < 1) {
                    maxStar = 0;
                }
            }

            for (let [kk, vv] of HelpUtil.GetKV(star_list)) {
                if (vv.condition > maxCondition) {
                    maxCondition = vv.condition
                    maxStar = vv.star;
                }
            }
            return maxStar;
        }

        /**
         * 满足猎人执照考试条件的任务索引
         * @param focusCur 索引
         */
        public SetExamination(focusCur: number): Array<number> {
            let list: Array<TableMissionType> = this.listForLicence();
            let index_List: Array<number> = [];
            for (let [kk, vv] of HelpUtil.GetKV(list)) {
                let maxStar = this.GetMaxStar(vv.index);
                let mission: message.MissionInfo = this.missionMap[vv.index];
                if ((maxStar >= focusCur && mission.missionId % this.MISSION_BASE % this.MISSION > focusCur && focusCur != 7)
                    || (maxStar >= focusCur && mission.missionId % this.MISSION_BASE % this.MISSION >= focusCur && focusCur == 7 && mission.isFinish)) {
                    index_List.push(kk);
                }
            }
            return index_List;
        }

        /**满足猎人执照考试条件的任务索引（高级执照） */
        public SetExaminationHigh(focusCur) {
            let _List = this.listForHighLicence()
            let index_List = [];
            for (var k in _List) {
                if (_List.hasOwnProperty(k)) {
                    var v = _List[k];
                    let MaxStar = this.GetMaxStar(v.index) - CommonConfig.licence_max_level;
                    let mission = this.missionMap[v.index];
                    if ((MaxStar >= focusCur && mission.missionId % 100000 % 100 > focusCur && focusCur != CommonConfig.high_licence_max_level)
                        || (MaxStar >= focusCur && mission.missionId % 100000 % 100 >= focusCur && focusCur == CommonConfig.high_licence_max_level && mission.isFinish)) {
                        index_List.push(Number(k));
                    }
                }
            }
            return index_List
        }

        /**
         * 满足科目可领奖条件的任务索引
         * @param focusCur 索引
         */
        public SetGetAward(focusCur: number): number {
            let _list: Array<TableMissionType> = this.listForLicence();
            let index_List: Array<number> = [];
            let list_ins: Array<number> = [];
            for (let [kk, vv] of HelpUtil.GetKV(_list)) {
                let list = this.GetMaxCondition(vv.index);
                for (let [k, v] of HelpUtil.GetKV(list)) {
                    if (v.star == focusCur) {
                        index_List.push(v);
                    }
                }
            }

            for (let [kk, vv] of HelpUtil.GetKV(index_List)) {
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
        }

        /**
         * 执照当前星级对应的ID
         * @param missionIndex 索引
         */
        public SetCondition(missionIndex: number): number {
            let star_list = this.GetMaxCondition(missionIndex);
            let subId: number = this.itemSubType(missionIndex).sub_type;
            let startId: number = this.itemSubType(missionIndex).start_id;
            let maxCondition: number = 1;
            let minCondition: number = this.itemInfo(startId).condition + 1;
            let maxId: number = null;

            for (let [kk, vv] of HelpUtil.GetKV(star_list)) {
                if (vv[5] > maxCondition) {
                    maxCondition = vv[5];
                    maxId = vv.id;
                }
            }
            return maxId;
        }

        /**
         * 执照完成的所有 子任务 判断是都弹出科目升星提示
         */
        public Completed() {
            let list_cmd = [[], [], [], []];
            let list = this.listForLicence(); // 执照任务
            for (let [kk, vv] of HelpUtil.GetKV(list)) {
                list_cmd[kk] = this.GetMaxCondition(vv.index);
            }

            let mission = [];
            for (let [_, k] of HelpUtil.GetKV(list_cmd)) {
                for (let [_, kk] of HelpUtil.GetKV(k)) {
                    mission.push(kk);
                }
            }

            if (this.missionInfo_pre == null) {
                this.missionInfo_pre = mission;
                return;
            }
            else if (Game.PlayerInfoSystem.BaseInfo.level >= 10) {
                let lists = mission;
                let list_pre = this.missionInfo_pre;

                let list_next = [];
                let max: number = 0;
                for (let [kk, vv] of HelpUtil.GetKV(lists)) {
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

                for (let [kk, vv] of HelpUtil.GetKV(lists)) {
                    let isHave = Table.FindF(this.missionInfo_pre, function (k, v) {
                        return v == vv;
                    });

                    if (isHave == false) {
                        // loadUI(BattleEnd_LicenseUpStar)
                        // .then((dialog: BattleEnd_LicenseUpStar) => {
                        //     dialog.SetInfo(vv[1], vv.star);
                        //     dialog.show(UI.SHOW_FROM_TOP);
                        // });
                    }
                }
                this.missionInfo_pre = mission;
            }
        }

        /**
         * 执照红点相关(根据所有科目完成状态判断是否显示红点)
         * @param missionIndex 索引
         */
        public itemCompleteForLicense(missionIndex: number): boolean {
            let state = this.itemComplete(missionIndex);
            return state == TableEnum.EnumDailyLive.finished;
        }

        public LicenseGetAward(id: number): boolean {
            let info: { [key: string]: TableMissionLicence } = TableMissionLicence.Table();
            let licence: number = this.missionActive.licence;
            let bGet: boolean;

            if (this.missionActive.licenceReward.length != 0) {
                bGet = Table.FindF(this.missionActive, function (k, v) {
                    return v == id;
                });
            }
            if (bGet == null) {
                bGet = true;
            }
            return !bGet && id <= licence && licence != 0;
        }

        /**
         * 判断新手是否可以进行第一次领取执照
         */
        public TeachGetLicense(): boolean {
            let tbl: { [key: string]: TableMissionLicence } = TableMissionLicence.Table();
            let licence = Game.PlayerMissionSystem.missionActive.licence;
            let list = [];
            for (let [kk, vv] of HelpUtil.GetKV(tbl)) {
                list = Game.PlayerMissionSystem.SetExamination(Number(kk));
                // let bGet = Table.FindF(Game.PlayerMissionSystem.missionActive.licenceReward, function (k, v) {
                //     return v == kk;
                // });
                let bGet: boolean = false;
                for (let [k, v] of HelpUtil.GetKV(Game.PlayerMissionSystem.missionActive.licenceReward)) {
                    if (v == kk) {
                        bGet = true;
                        break;
                    }
                    else {
                        bGet = false;
                    }
                }

                if (list.length == 4 && bGet && Game.PlayerMissionSystem.missionActive.licence == (Number(kk) - 1)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 判断新手是否可以进行第一次考试
         */
        public TeachCanExam(): boolean {
            let tbl: { [key: string]: TableMissionLicence } = TableMissionLicence.Table();
            let licence: number = this.missionActive.licence;
            let list: number;
            for (let [kk, vv] of HelpUtil.GetKV(tbl)) {
                list = this.SetGetAward(Number(kk));
                let bGet = Table.FindF(this.missionActive, function (k, v) {
                    return v == kk;
                });

                if (list == 4) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 判断新手是否可以地图探索第一次领奖
         */
        public TeachMapGetFirstAward() {
            let missionId = 710001;
            let missionType = 50001;
            let missionTbl: TableMissionItem = TableMissionItem.Item(missionId);
            if (missionTbl == null) {
                return false;
            }
            else {
                return true;
            }
        }

        public itemMissionWeek(id: number) {
            return TableMissionWeek.Item(id);
        }

        public itemMissionWeekValNormalType(id: number): boolean {
            let type = id % 10000
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
        }

        public itemMissionWeekJump(id: number) {
            let type: number = id % 10000;
            let call: () => void = null;
            if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_STAR ||
                type == message.MissionSubType.MISSION_SUB_TYPE_HUNTER_UPSTARTIME) { // 升星
                call = () => {
                    loadUI(HunterMainScene).then((dialog: HunterMainScene) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_QUALITY) { // 品阶
                call = () => {
                    // Game.PlayerHunterSystem.Start(null, TableEnum.Enum.Hero.GRADE);
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_LOTTERY_BEER) { // 畅饮
                call = () => {
                    loadUI(TavernScene).then((scene: TavernScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_WANTED) { // 通关某一关流星街
                call = () => {
                    loadUI(WantedSecondMeteorstanceScene).then((scene: WantedSecondMeteorstanceScene) => {
                        scene.Init(1);
                        scene.show(UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_AWAKEN_TIME) { // 觉醒什么级别猎人（级别*10000+数量）
                call = () => {
                    loadUI(HunterMainScene).then((dialog: HunterMainScene) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_CARD_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_FA_NUM ||
                type == message.MissionSubType.MISSION_SUB_TYPE_CARD_JIAN_NUM) { // 获得什么颜色的卡片数量（颜色*10000+数量）
                call = () => {
                    loadUI(CardMainScene).then((dialog: CardMainScene) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_USE_POWER) { // 消耗体力
                call = () => {
                    this.goto_instance_normal();
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_BUY_POWER) { // 购买体力次数
                call = () => {
                    loadUI(HXH_HunterUserStrength)
                        .then((dialog: HXH_HunterUserStrength) => {
                            dialog.SetInfo();
                            dialog.show(UI.SHOW_FROM_TOP);
                        });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_INSTANCE_SEARCH) { // 探索副本成功次数  
                call = () => {
                    this.goto_explore();
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_WONDERLAND_COLLECTION) { // 采集果子
                call = () => {
                    this.goto_scene_wonder();
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_BUYMONEY) { // 购买金币次数
                call = () => {
                    loadUI(HelpGoldDialog)
                        .then((dialog: HelpGoldDialog) => {
                            dialog.SetInfoList(true);
                            dialog.show(UI.SHOW_FROM_TOP);
                        });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_BEER_EGG) { // 啤酒或娃娃机抽奖
                call = () => {
                    loadUI(TavernScene).then((scene: TavernScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_RELIC_COIN) { // 消耗晶石数量
                call = () => {
                    loadUI(RelicMall_Main).then((scene: RelicMall_Main) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_EQUIP_UPLEVEL) { // 升级收藏N次
                call = () => {
                    loadUI(HunterMainScene).then((scene: HunterMainScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_GENERAL_AWAKEN) { // 武将觉醒次数
                call = () => {
                    loadUI(HunterMainScene).then((scene: HunterMainScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
                }
            }
            else if (type == message.MissionSubType.MISSION_SUB_TYPE_FISH_ZI) { // 钓紫色的鱼
                call = () => {
                    this.goto_scene_wonder();
                }
            }
            return call;
        }

        public getWeekAwardPay(id1: number, index: number) {//lua方法为getWeekAwardPay的话index是0，方法为getWeekAwardFree的话index是1
            let tbl: TableMissionWeek = this.itemMissionWeek(id1)
            let ret1: { goods: Array<{ id: number, count: number }>, canBuyTimes: number, token: number, buyTimes: number, id: number, }[] = [];
            for (let [i, v] of HelpUtil.GetKV(tbl.day_refresh)) {
                if (v == index) {
                    let itemGoods: { id: number, count: number }[] = [];
                    for (let [ii, vv] of HelpUtil.GetKV(tbl.mall_goods[i])) {
                        let Info: { id: number, count: number } = { id: 0, count: 0 };
                        Info.id = vv;
                        Info.count = tbl.mall_count[i][ii];
                        itemGoods.push(Info);
                    }
                    let buyTime = 0;
                    for (let [k, j] of HelpUtil.GetKV(this.missionActive.missionWeekReward)) {
                        if (j.key == Number(i) + 1) {
                            buyTime = j.value;
                        }
                    }
                    let ret: { goods: Array<{ id: number, count: number }>, canBuyTimes: number, token: number, buyTimes: number, id: number, } = { goods: [], canBuyTimes: 0, token: 0, buyTimes: 0, id: 0, };
                    ret.goods = itemGoods;
                    ret.canBuyTimes = tbl.buy_time[i]; // times
                    ret.token = tbl.price_token[i]; //price
                    ret.buyTimes = buyTime; // buy_time
                    ret.id = Number(i) + 1;
                    ret1.push(ret);
                }
            }
            return ret1;
        }

        public MissionItem(id: number) {
            return TableMissionMain.Item(id);
        }

        public alltrue(t: Array<any>, f: (a: any, b: any) => any): boolean {
            let tablecountture = (t, f) => {
                let count = 0;
                for (let k in t) {
                    if (t.hasOwnProperty(k)) {
                        const v = t[k];
                        count += (f(k, v) ? 1 : 0);
                    }
                }
                return count;
            }

            let num1 = tablecountture(t, f)
            let num2 = Table.tableLength(t);

            return num1 == num2;
        }


        //////////////////////////发协议//////////////////////////////
        /**
         * 我的联盟请求
         */
        public ReqLeague() {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueInfoRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueInfoResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve({});
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        /**
         * 获取我的关系列表请求
         */
        public ReqRelation() {
            return new Promise((resolve, reject) => {
                let request = new message.RelationInfoRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationInfoResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve({});
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        /**
         * 任务列表请求
         */
        public ReqMission() {
            return new Promise((resolve, reject) => {
                let request = new message.MissionListRequest();
                request.body.type = message.MissionType.MISSION_TYPE_NONE;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MissionListResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve({});
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        /**
         * 领取活跃度奖励请求
         */
        public ReqActive(index: number) {
            return new Promise((resolve, reject) => {
                let request = new message.MissionActiveRequest();
                request.body.index = index;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MissionActiveResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

        /**
         * 领取任务奖励请求
         */
        public ReqReward(type: number, subType: number) {
            return new Promise((resolve, reject) => {
                let request = new message.MissionRewardRequest();
                request.body.type = type;
                request.body.subType = subType;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MissionRewardResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

        /**
         * 执照领取
         */
        public MissionRewardLicence(focusCur: number) {
            return new Promise((resolve, reject) => {
                let request = new message.MissionRewardLicenceRequest();
                request.body.licenceId = focusCur;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MissionRewardLicenceResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve(response.body.gameInfo);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }
        /**
         * 执照领取开始考试请求
         */
        public MobsInfo(type: number, level: number) {
            return new Promise((resolve, reject) => {
                let request = new message.MobsInfoRequest();
                request.body.battleType = type;
                request.body.mobsId = level;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MobsInfoResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.stageInfo);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        /**
        * 执照领取开始考试请求
        */
        public missionReward(type: number, subType: number) {
            return new Promise((resolve, reject) => {
                let request = new message.MissionRewardRequest();
                request.body.type = type;
                request.body.subType = subType;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MissionRewardResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

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
        public ShareRewardInfo(share_type: number) {
            return new Promise((resolve, reject) => {
                let request = new message.ShareRewardRequest();
                request.body.share_type = share_type;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.ShareRewardResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo.mixUnitInfo);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }


    }

    /** 功能 */
    export const FUNC = {
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
    }
}