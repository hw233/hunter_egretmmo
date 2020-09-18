namespace zj {
    /**
     * @augments chen xi
     * 
     * @date 2018-11-27
     * 
     * @class 阵营系统
     */
    export class PlayerFormationSystem {
        public static GetInstance(id = null) {
        }
        // 联赛使用
        public curFormationIndex: number = 1;
        public formats = [];
        public itemlist: Array<FormatChooseHeroItem> = [];
        public siteIndex: number = 0;
        // 新手引导阵型
        public bootCamp: Array<PosState> = [];
        // 新手引导武将id
        public blowGuide: number = 0;
        // 新手限制
        public newRestrictions: boolean = true;
        // 连续战斗获取物品数据
        public continueBattleDropItems = [];
        // 连续战斗获取宝物数据
        public continueBattleDropPotatos = [];

        public _blowGuideFormations: Array<guidance> = [];
        public get blowGuideFormations() {
            return this._blowGuideFormations;
        }

        /** 阵容方案--本服 */
        private _squadPlan: Array<message.FormationInfo> = [];
        public get squadPlan() {
            return this._squadPlan;
        }
        public set squadPlan(v: Array<message.FormationInfo>) {
            this._squadPlan = v;
        }
        /** 阵容方案阵型信息--本服 */
        private _squadPlanMap: Array<message.CustomFormationInfo> = [];
        public get squadPlanMap() {
            return this._squadPlanMap;
        }
        public set squadPlanMap(v: Array<message.CustomFormationInfo>) {
            this._squadPlanMap = v;
        }

        /** 阵容方案--跨服 */
        private _crossBeam: Array<message.FormationInfo> = [];
        public get crossBeam() {
            return this._crossBeam;
        }
        public set crossBeam(v: Array<message.FormationInfo>) {
            this._crossBeam = v;
        }
        /** 阵容方案阵型信息--跨服 */
        private _crossBeamMap: Array<message.CustomFormationInfo> = [];
        public get crossBeamMap() {
            return this._crossBeamMap;
        }
        public set crossBeamMap(v: Array<message.CustomFormationInfo>) {
            this._crossBeamMap = v;
        }

        /** 阵容方案--好友单队切磋 */
        private _friendsTeams: Array<message.FormationInfo> = [];
        public get friendsTeams() {
            return this._friendsTeams;
        }
        public set friendsTeams(v: Array<message.FormationInfo>) {
            this._friendsTeams = v;
        }
        /** 阵容方案阵型信息----好友单队切磋 */
        private _friendsTeamsMap: Array<message.CustomFormationInfo> = [];
        public get friendsTeamsMap() {
            return this._friendsTeamsMap;
        }
        public set friendsTeamsMap(v: Array<message.CustomFormationInfo>) {
            this._friendsTeamsMap = v;
        }

        /** 阵容方案--好友多队切磋 */
        private _moreTeam: Array<message.FormationInfo> = [];
        public get moreTeam() {
            return this._moreTeam;
        }
        public set moreTeam(v: Array<message.FormationInfo>) {
            this._moreTeam = v;
        }
        /** 阵容方案阵型信息----好友多队切磋 */
        private _moreTeamMap: Array<message.CustomFormationInfo> = [];
        public get moreTeamMap() {
            return this._moreTeamMap;
        }
        public set moreTeamMap(v: Array<message.CustomFormationInfo>) {
            this._moreTeamMap = v;
        }

        /** 进入副本前保存信息 */
        private _saveFrom: Array<message.FormationInfo> = [];
        public get saveFrom() {
            return this._saveFrom;
        }
        public set saveFrom(v: Array<message.FormationInfo>) {
            this._saveFrom = v;
        }

        /** 客户端阵型信息 */
        private _curFormations: Array<message.FormationInfo> = [];
        public get curFormations(): Array<message.FormationInfo> {
            return this._curFormations;
        }
        public set curFormations(v: Array<message.FormationInfo>) {
            this._curFormations = v;
        }

        /** 客户端阵型信息 */
        private _curFormationMap: Array<message.CustomFormationInfo> = [];
        public get curFormationMap() {
            return this._curFormationMap;
        }
        public set curFormationMap(v: Array<message.CustomFormationInfo>) {
            this._curFormationMap = v;
        }

        /** 流星街保存阵型 */
        private _formatsWant: Array<message.FormationInfo> = [];
        public get formatsWant() {
            return this._formatsWant;
        }
        public set formatsWant(v: Array<message.FormationInfo>) {
            this._formatsWant = v;
        }

        /** 流星街阵型信息 */
        private _StreetFormationMap: Array<message.CustomFormationInfo> = [];
        public get StreetFormationMap() {
            return this._StreetFormationMap;
        }
        public set StreetFormationMap(v: Array<message.CustomFormationInfo>) {
            this._StreetFormationMap = v;
        }

        /** 遗迹保存阵型 */
        private _formatsRelic: Array<message.FormationInfo> = [];
        public get formatsRelic() {
            return this._formatsRelic;
        }
        public set formatsRelic(v: Array<message.FormationInfo>) {
            this._formatsRelic = v;
        }

        /** 遗迹阵型信息 */
        private _RelicFormationMap: Array<message.CustomFormationInfo> = [];
        public get RelicFormationMap() {
            return this._RelicFormationMap;
        }
        public set RelicFormationMap(v: Array<message.CustomFormationInfo>) {
            this._RelicFormationMap = v;
        }

        /** 好友--三队切磋 */
        private _friendsThreeTeamsPlayMap: Array<message.CustomSingleFormationInfo> = [];
        public get friendsThreeTeamsPlayMap() {
            return this._friendsThreeTeamsPlayMap;
        }
        public set friendsThreeTeamsPlayMap(v: Array<message.CustomSingleFormationInfo>) {
            this._friendsThreeTeamsPlayMap = v;
        }

        /** 好友--三对敌对阵型 */
        private _threeBattleInfo: Array<any> = [];
        public get threeBattleInfo() {
            return this._threeBattleInfo;
        }
        public set threeBattleInfo(v: Array<any>) {
            this._threeBattleInfo = v;
        }

        /**  自定义阵型（index索引）(暂时跨服战攻击使用) / 好友--三队切磋 */
        private _formatsSingleAttack: { [id: number]: message.FormationInfo } = {};
        public get formatsSingleAttack() {
            return this._formatsSingleAttack;
        }
        public set formatsSingleAttack(v: { [id: number]: message.FormationInfo }) {
            this._formatsSingleAttack = v;
        }

        /** 跨服格斗场信息 */
        private _CrossRealmFormationMap: Array<message.CustomSingleFormationInfo> = [];
        public get CrossRealmFormationMap() {
            return this._CrossRealmFormationMap;
        }
        public set CrossRealmFormationMap(v: Array<message.CustomSingleFormationInfo>) {
            this._CrossRealmFormationMap = v;
        }

        /** 客户端现有符文信息 */
        private _curCharmInfos = [];
        public get curCharmInfos() {
            return this._curCharmInfos;
        }
        public set curCharmInfos(v) {
            this._curCharmInfos = v;
        }

        private _curCharmInfosMap = [];
        public get curCharmInfosMap() {
            return this._curCharmInfosMap;
        }
        public set curCharmInfosMap(v) {
            this._curCharmInfosMap = v;
        }

        /** 自定义阵型（index索引）(暂时跨服战防守使用) */
        private _formatsSingleDefine: { [id: number]: message.FormationInfo } = {};
        public get formatsSingleDefine() {
            return this._formatsSingleDefine;
        }
        public set formatsSingleDefine(v: { [id: number]: message.FormationInfo }) {
            this._formatsSingleDefine = v;
        }

        /** 组队战阵型 */
        private _formatsGroupFight: { [id: number]: message.FormationInfo } = {};
        public get formatsGroupFight() {
            return this._formatsGroupFight;
        }
        public set formatsGroupFight(v: { [id: number]: message.FormationInfo }) {
            this._formatsGroupFight = v;
        }

        /** 自定义阵型（index索引）(暂时联赛防守使用) */
        private _formatsMatchDefine: { [id: number]: message.FormationInfo } = {};
        public get formatsMatchDefine() {
            return this._formatsMatchDefine;
        }
        public set formatsMatchDefine(v: { [id: number]: message.FormationInfo }) {
            this._formatsMatchDefine = v;
        }

        /** 服务器存储的阵型（类型索引） */
        private _formatsServer: { [id: number]: message.FormationInfo } = {};
        public get formatsServer() {
            return this._formatsServer;
        }
        public set formatsServer(v: { [id: number]: message.FormationInfo }) {
            this._formatsServer = v;
        }

        public init() {
            this.InitFormationInfo();// 其他副本阵容初始化
            this.InitSingleFormation();// 跨服格斗场阵容初始化 / 好友--三队切磋阵容初始化
            this.InitWantFormation();// 通缉令阵容初始化
            this.InitRelicFormation();// 遗迹阵容初始化
            this.InitsquadPlan();// 阵容方案本服初始化
            this.InitcrossBeam();// 阵容方案跨服初始化
            this.InitfriendsTeams();// 阵容方案好友单队切磋初始化      
            this.InitmoreTeam();// 阵容方案好友多队切磋初始化   
            this.InitCharmInfo();// 猜拳阵容初始化   
            Game.EventManager.on(GameEvent.PLAYER_FORMATION_INFO_CHANGE, this.onFormationInfoChange, this);// 服务器保存阵容加载
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.loadFormationMap, this);// 其他副本阵容加载
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadSingleFormation, this);// 跨服格斗场阵容加载
            //Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadfriendsThreeTeamsPlay, this);// 好友--三队切磋阵容加载 
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadWantFormation, this);// 通缉令阵容加载
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadRelicFormation, this);// 遗迹阵容加载
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadsquadPlan, this);// 阵容方案本服加载 
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadcrossBeam, this);// 阵容方案跨服加载 
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadfriendsTeams, this);// 阵容方案好友单队切磋加载      
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadmoreTeam, this);// 阵容方案好友多队切磋加载  
            Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadInitCharmInfoMap, this);// 猜拳阵容加载
        }

        public uninit() {
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
            Gmgr.Instance.backupAutoTbl = [];
            Gmgr.Instance.backupSpeedTbl = [];
            Game.PlayerBattleSystem.pid = -1;
        }

        // 工会战请求
        public LeagueMatchFortressTeam(leagueid: number, type: number, index: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchFortressTeamRequest();
                request.body.league_id = leagueid;
                request.body.type = type;
                request.body.index = index;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchFortressTeamResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.datailRoleFormation);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        /**
         *  其他副本阵容初始化
         */
        public InitFormationInfo() {
            // -- 重排消息,增加下表索引
            this.curFormations = [];
            for (let index = 0; index < message.EFormationType.FORMATION_TYPE_CNT; index++) {
                if (index != message.EFormationType.FORMATION_TYPE_NONO && index != message.EFormationType.FORMATION_TYPE_CNT) {
                    let fromation = new message.FormationInfo();
                    fromation.formationType = index;
                    this.curFormations.push(fromation);
                }
            }
            let tableFormat = TableFormations.Table();
            for (const k in tableFormat) {
                if (tableFormat.hasOwnProperty(k)) {
                    const v = tableFormat[k];

                    let format_add_generals = v.generals_limit_number;
                    let format_add_generals_Length = format_add_generals.length;
                    let gens_size_generals = v.generals + format_add_generals[format_add_generals.length - 1];
                    this.curFormations[Number(k) - 1].generals = [];
                    for (let index = 0; index < gens_size_generals; index++) {
                        this.curFormations[Number(k) - 1].generals.push(0);
                    }

                    let format_add_supports = v.supports_limit_number;
                    let gens_size_supports = v.supports + format_add_supports[format_add_supports.length - 1];
                    this.curFormations[Number(k) - 1].supports = [];
                    for (let index = 0; index < gens_size_supports; index++) {
                        this.curFormations[Number(k) - 1].supports.push(0);
                    }
                }
            }
        }

        /**
         * 跨服格斗场阵型初始化
         */
        public InitSingleFormation() {
            this.formatsSingleAttack = [];
            for (let i = 0; i < 3; i++) {
                this.formats.push(new message.FormationInfo());
            }
            let buttonNames = ["generals", "reserves", "supports"];
            for (let fk in this.formats) {
                let fv = this.formats[fk];
                fv.def = null;
                for (let kk in buttonNames) {
                    let vv = buttonNames[kk];
                    for (let i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                //this.formats[fk].formationType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
                this.formats[fk].formationIndex = Number(fk);
            }
            this.formatsSingleAttack = this.formats;
        }

        /**
         * 流星街阵型初始化
         */
        public InitWantFormation() {
            this.formatsWant = [];
            let formats = [];
            for (let i = message.EWantedType.WANTED_TYPE_NONO; i < message.EWantedType.WANTED_TYPE_END; i++) {
                formats.push(new message.FormationInfo());
            }
            let buttonNames = ["generals", "reserves", "supports"];
            for (let fk in formats) {
                let fv = formats[fk];
                fv.def = null;
                for (let kk in buttonNames) {
                    let vv = buttonNames[kk];
                    for (let i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationType = message.EFormationType.FORMATION_TYPE_WANTED;
                formats[fk].formationIndex = Number(fk);
            }
            this.formatsWant = formats;
        }

        /**
         * 遗迹阵型初始化
         */
        public InitRelicFormation() {
            this.formatsRelic = [];
            let formats = [];
            let relicTbl = TableInstanceRelic.Table();
            for (let i = 0; i < Helper.getObjLen(relicTbl); i++) {
                formats.push(new message.FormationInfo());
            }
            let buttonNames = ["generals", "reserves", "supports"];
            for (let fk in formats) {
                let fv = formats[fk];
                fv.def = null;
                for (let kk in buttonNames) {
                    let vv = buttonNames[kk];
                    for (let i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationType = message.EFormationType.FORMATION_TYPE_RELIC;
                formats[fk].formationIndex = Number(fk);
            }
            this.formatsRelic = formats;
        }

        /**
         * 阵容方案本服初始化
         */
        public InitsquadPlan() {
            this.squadPlan = [];
            let formats = [];
            for (let i = 0; i < 5; i++) {
                formats.push(new message.FormationInfo());
            }
            let buttonNames = ["generals", "reserves", "supports"];
            for (let fk in formats) {
                let fv = formats[fk];
                fv.def = null;
                for (let kk in buttonNames) {
                    let vv = buttonNames[kk];
                    for (let i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationIndex = Number(fk);
            }
            this.squadPlan = formats;
        }

        /**
         * 阵容方案跨服初始化
         */
        public InitcrossBeam() {
            this.crossBeam = [];
            let formats = [];
            for (let i = 0; i < 5; i++) {
                formats.push(new message.FormationInfo());
            }
            let buttonNames = ["generals", "reserves", "supports"];
            for (let fk in formats) {
                let fv = formats[fk];
                fv.def = null;
                for (let kk in buttonNames) {
                    let vv = buttonNames[kk];
                    for (let i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationIndex = Number(fk);
            }
            this.crossBeam = formats;
        }

        /**
         * 阵容方案好友单队切磋初始化
         */
        public InitfriendsTeams() {
            this.friendsTeams = [];
            let formats = [];
            for (let i = 0; i < 5; i++) {
                formats.push(new message.FormationInfo());
            }
            let buttonNames = ["generals", "reserves", "supports"];
            for (let fk in formats) {
                let fv = formats[fk];
                fv.def = null;
                for (let kk in buttonNames) {
                    let vv = buttonNames[kk];
                    for (let i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationIndex = Number(fk);
            }
            this.friendsTeams = formats;
        }

        /**
       * 阵容方案好友多队初始化
       */
        public InitmoreTeam() {
            this.moreTeam = [];
            let formats = [];
            for (let i = 0; i < 5; i++) {
                formats.push(new message.FormationInfo());
            }
            let buttonNames = ["generals", "reserves", "supports"];
            for (let fk in formats) {
                let fv = formats[fk];
                fv.def = null;
                for (let kk in buttonNames) {
                    let vv = buttonNames[kk];
                    for (let i = 0; i < 4; i++) {
                        if (fv[vv][i] == null) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                formats[fk].formationIndex = Number(fk);
            }
            this.moreTeam = formats;
        }


        /**
         * 猜拳结果初始化
         */
        public InitCharmInfo() {
            this.curCharmInfos = [];
            let formats = [];
            for (let i = 0; i < CommonConfig.gain_runes_number; i++) {
                formats.push(0);
            }
            this.curCharmInfos = formats;
        }

        /**
         * 服务器保存阵容加载
         */
        private onFormationInfoChange(ev: egret.Event) {
            let formations = <Array<message.FormationInfo>>ev.data;
            for (let i = 0; i < this.curFormations.length; i++) {
                for (let j = 0; j < formations.length; j++) {
                    if (this.curFormations[i].formationType == formations[j].formationType) {
                        this.curFormations[i] = formations[j];
                    }
                }
            }
            this.loadFormationMap();
            for (let i = 0; i < formations.length; i++) {
                if (!formations[i]) {
                    continue;
                }
                let data = this.eliminateRepeatGeneral(formations[i]);

                if (data.formationType == message.EFormationType.FORMATION_TYPE_CRAFT) { // 跨服战阵型
                    let bFind = false;
                    for (const k in this._formatsSingleDefine) {
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
                } else if (data.formationType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) { // 组队战进攻类型
                    let bFind = false;
                    for (const k in this._formatsGroupFight) {
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
                } else if (data.formationType == message.EFormationType.FORMATION_TYPE_MATCH_DEFENSE) { // 联赛防守类型
                    let bFind = false;
                    for (const k in this._formatsMatchDefine) {
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
                } else { // 服务器保存的阵型
                    let bFind = false;
                    for (const k in this.formatsServer) {
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
        }

        public description() {
            console.log("\n--- PlayerFormationSystem, curFormations = ", this.curFormations, "\ncurFormationMap = ", this.curFormationMap,
                "\nformatsSingleDefine = ", this.formatsSingleDefine,
                "\nformatsGroupFight = ", this.formatsGroupFight,
                "\nformatsMatchDefine = ", this.formatsMatchDefine,
                "\nformatsServer = ", this.formatsServer);
        }

        /**
         * 同步formatsServer到curFormations阵型中
         */
        private syncFormatServer() {
            let tblIndex = ["generals", "reserves", "supports"];
            for (const k in this.formatsServer) {
                if (this.formatsServer.hasOwnProperty(k)) {
                    let v = this.formatsServer[k];
                    for (let kk = 0; kk < this.curFormations.length; kk++) {
                        // 只赋值对应位置的值,服务器初始化时,无武将的位置是不传值的,不覆盖客户端的阵型值,避免出现阵型人数不对的情况
                        if (kk == Number(k)) {
                            for (let i = 0; i < tblIndex.length; i++) {
                                let idx = tblIndex[i];
                                for (let j = 0; j < v[idx].length; j++) {
                                    for (let a = 0; a < this.curFormations.length; a++) {
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
        }

        /**
         * 其他副本加载阵容
         */
        public loadFormationMap() {
            this.init();
            //this.saveFormations();
            let msg = Game.Controller.getRoleStorageItem("formats");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);
            let mapp: Array<message.FormationInfo> = [];

            for (let i = 0; i < map[0].formations.length; i++) {
                let a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (let k in a) {
                    for (let kk in map[0].formations[i]) {
                        let vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }

            let msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.curFormationMap.push(msga);

            let roleID = Game.Controller.roleID();
            let groupID = Game.Controller.groupOwnerID();
            let suffixs = ["generals", "reserves", "supports"];
            for (let index = 0; index < this.curFormationMap.length; index++) {
                let v = this.curFormationMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    this.characterFormationSavedInit(v, suffixs);
                    this.syncFormatServer();
                    break;
                }
            }
        }

        /**
         * 其他副本阵型保存初始化
         */
        public characterFormationSavedInit(v, suffixs) {//new message.FormationInfo()
            this.restsContrarySerialize();// 其他副本反序列化
            for (let i = 0; i < v.formations.length; i++) {
                // 防止阵型表删除行之后，根据表初始化信息和本地文件读出的数据不一致的问题
                // 仙境和联盟战以服务器为准--没有联盟战vv.formationType != EFormationType.FORMATION_TYPE_LEAGUE_WAR
                if (this.curFormations[i] != null) {//&& v.formations[i].formationType != message.EFormationType.FORMATION_TYPE_WONDERLAND
                    // 根据表格初始化的阵型
                    let _formate_init = this.curFormations[i];
                    // 阵型中的武将判断
                    let _formation: message.FormationInfo = v.formations[i];// v.formations[i].parse_bytes(encoder2.buffer);
                    // 缺少的武将不加入阵型中
                    for (let j = 0; j < suffixs.length; j++) {
                        const _suffix = suffixs[j];
                        // 根据初始化的阵型信息遍历，防止本地文件中没有值的情况下出错
                        for (let k = 0; k < _formate_init[_suffix].length; k++) {
                            let _general_id = _formation[_suffix][Number(k)];
                            if ((_general_id == null) || (_general_id != null && PlayerHunterSystem.GetHasGeneral(_general_id) != true)) {
                                _formation[_suffix][Number(k)] = 0;
                            }
                        }
                    }
                    this.curFormations[v.formations[i].formationType - 1] = _formation;
                }
            }
        }

        /**
         * 跨服格斗场阵容加载
         */
        public LoadSingleFormation() {

            let msg = Game.Controller.getRoleStorageItem("singleFormation");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);
            let mapp: Array<message.FormationInfo> = [];

            for (let i = 0; i < map[0].formations.length; i++) {
                let a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (let k in a) {
                    for (let kk in map[0].formations[i]) {
                        let vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }

            let roleID = Game.Controller.roleID();
            let groupID = Game.Controller.groupOwnerID();
            let msga = new message.CustomSingleFormationInfo();
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            msga.formations = mapp;
            this.CrossRealmFormationMap.push(msga);
            for (let index = 0; index < this.CrossRealmFormationMap.length; index++) {
                let v = this.CrossRealmFormationMap[index];
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (let i = 0; i < v.formations.length; i++) {
                        this.crossrealmContrarySerialize();// 跨服反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.formatsSingleAttack[i] = v.formations[i];
                    }
                }
            }
        }

        /**
         *  好友--三队切磋阵容加载
         */
        public LoadfriendsThreeTeamsPlay() {
            let msg = Game.Controller.getRoleStorageItem("friendsThreeTeamsPlay");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);
            let mapp: Array<message.FormationInfo> = [];

            for (let i = 0; i < map[0].formations.length; i++) {
                let a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (let k in a) {
                    for (let kk in map[0].formations[i]) {
                        let vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }

            let roleID = Game.Controller.roleID();
            let groupID = Game.Controller.groupOwnerID();
            let msga = new message.CustomSingleFormationInfo();
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            msga.formations = mapp;
            this.friendsThreeTeamsPlayMap.push(msga);
            for (let index = 0; index < this.friendsThreeTeamsPlayMap.length; index++) {
                let v = this.friendsThreeTeamsPlayMap[index];
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (let i = 0; i < v.formations.length; i++) {
                        this.crossrealmContrarySerialize();// 跨服反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.formatsSingleAttack[i] = v.formations[i];
                    }
                }
            }
        }

        public EliminateRepeatGel(tbl) {
            let exitMap = [];
            for (let k in tbl["generals"]) {
                let v = tbl["generals"][k];
                let generalId = v;
                let tmpId = PlayerHunterSystem.GetGeneralId(generalId);
                if (v != 0 && exitMap[tmpId] != null && exitMap[tmpId] != generalId) {
                    generalId = 0;
                    tbl["generals"][k] = 0;
                }
                if (generalId != 0) {
                    exitMap[tmpId] = generalId
                }
            }
            for (let k in tbl["supports"]) {
                let v = tbl["supports"][k];
                let generalId = v;
                let tmpId = PlayerHunterSystem.GetGeneralId(generalId);
                if (v != 0 && exitMap[tmpId] != null && exitMap[tmpId] != generalId) {
                    generalId = 0;
                    tbl["supports"][k] = 0;
                }
                if (generalId != 0) {
                    exitMap[tmpId] = generalId
                }
            }
        }

        /**
         * 流星街阵容加载
         */
        public LoadWantFormation() {

            let msg = Game.Controller.getRoleStorageItem("wantFormation");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);
            let mapp: Array<message.FormationInfo> = [];

            for (let i = 0; i < map[0].formations.length; i++) {
                let a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (let k in a) {
                    for (let kk in map[0].formations[i]) {
                        let vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }

            let msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.StreetFormationMap.push(msga);

            let roleID = Game.Controller.roleID();
            let groupID = Game.Controller.groupOwnerID();
            for (let index = 0; index < this.StreetFormationMap.length; index++) {
                let v = this.StreetFormationMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (let i = 0; i < v.formations.length; i++) {
                        this.streetContrarySerialize();//  流星街反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.formatsWant[i] = v.formations[i];
                    }
                }
            }
        }

        /**
         * 遗迹阵容加载
         */
        public LoadRelicFormation() {

            let msg = Game.Controller.getRoleStorageItem("RelicFormation");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);
            let mapp: Array<message.FormationInfo> = [];

            for (let i = 0; i < map[0].formations.length; i++) {
                let a = new message.FormationInfo();
                // for (let j = 0; j < Object.keys(a).length; j++) {
                //     a[j] = map[0].formations[i][j];
                // }
                for (let k in a) {
                    for (let kk in map[0].formations[i]) {
                        let vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }

            let msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.RelicFormationMap.push(msga);

            let roleID = Game.Controller.roleID();
            let groupID = Game.Controller.groupOwnerID();
            for (let index = 0; index < this.RelicFormationMap.length; index++) {
                let v = this.RelicFormationMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (let i = 0; i < v.formations.length; i++) {
                        this.relicContrarySerialize();//  流星街反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.formatsRelic[i] = v.formations[i];
                    }
                }
            }
        }

        /**
         * 阵容方案本服加载
         */
        public LoadsquadPlan() {

            let msg = Game.Controller.getRoleStorageItem("SquadPlan");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);
            let mapp: Array<message.FormationInfo> = [];

            for (let i = 0; i < map[0].formations.length; i++) {
                let a = new message.FormationInfo();
                for (let k in a) {
                    for (let kk in map[0].formations[i]) {
                        let vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }

            let msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.squadPlanMap.push(msga);

            let roleID = Game.Controller.roleID();
            let groupID = Game.Controller.groupOwnerID();
            for (let index = 0; index < this.squadPlanMap.length; index++) {
                let v = this.squadPlanMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (let i = 0; i < v.formations.length; i++) {
                        this.streetContrarySquadPlan();//  阵容方案反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.squadPlan[i] = v.formations[i];
                    }
                }
            }
        }

        /**
         * 阵容方案跨服加载
         */
        public LoadcrossBeam() {

            let msg = Game.Controller.getRoleStorageItem("CrossBeam");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);
            let mapp: Array<message.FormationInfo> = [];

            for (let i = 0; i < map[0].formations.length; i++) {
                let a = new message.FormationInfo();
                for (let k in a) {
                    for (let kk in map[0].formations[i]) {
                        let vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }

            let msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.crossBeamMap.push(msga);

            let roleID = Game.Controller.roleID();
            let groupID = Game.Controller.groupOwnerID();
            for (let index = 0; index < this.crossBeamMap.length; index++) {
                let v = this.crossBeamMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (let i = 0; i < v.formations.length; i++) {
                        this.streetContraryCrossBeam();//  阵容方案反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.crossBeam[i] = v.formations[i];
                    }
                }
            }
        }

        /**
         * 阵容方案好友单队切磋加载
         */
        public LoadfriendsTeams() {

            let msg = Game.Controller.getRoleStorageItem("friendsTeams");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);
            let mapp: Array<message.FormationInfo> = [];

            for (let i = 0; i < map[0].formations.length; i++) {
                let a = new message.FormationInfo();
                for (let k in a) {
                    for (let kk in map[0].formations[i]) {
                        let vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }

            let msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.friendsTeamsMap.push(msga);

            let roleID = Game.Controller.roleID();
            let groupID = Game.Controller.groupOwnerID();
            for (let index = 0; index < this.friendsTeamsMap.length; index++) {
                let v = this.friendsTeamsMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (let i = 0; i < v.formations.length; i++) {
                        this.streetContraryFriendsTeams();//  阵容方案好友单队切磋反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.friendsTeams[i] = v.formations[i];
                    }
                }
            }
        }

        /**
        * 阵容方案好友多队切磋加载
        */
        public LoadmoreTeam() {

            let msg = Game.Controller.getRoleStorageItem("moreTeam");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);
            let mapp: Array<message.FormationInfo> = [];

            for (let i = 0; i < map[0].formations.length; i++) {
                let a = new message.FormationInfo();
                for (let k in a) {
                    for (let kk in map[0].formations[i]) {
                        let vv = map[0].formations[i][kk];
                        if (k == kk) {
                            a[k] = vv;
                        }
                    }
                }
                mapp.push(a);
            }

            let msga = new message.CustomFormationInfo();
            msga.formations = mapp;
            msga.ID = map[0].ID;
            msga.OwnerGroupID = map[0].OwnerGroupID;
            this.moreTeamMap.push(msga);

            let roleID = Game.Controller.roleID();
            let groupID = Game.Controller.groupOwnerID();
            for (let index = 0; index < this.moreTeamMap.length; index++) {
                let v = this.moreTeamMap[index];
                // 加载账号对应的本地阵型信息
                if (v.ID === String(roleID) && v.OwnerGroupID === String(groupID)) {
                    for (let i = 0; i < v.formations.length; i++) {
                        this.streetContraryMoreTeam();//  阵容方案好友多队切磋反序列化
                        this.EliminateRepeatGel(v.formations[i]);
                        this.moreTeam[i] = v.formations[i];
                    }
                }
            }
        }

        /**
         * 猜拳结果加载
         */
        public LoadInitCharmInfoMap() {
            let msg = Game.Controller.getRoleStorageItem("charms");
            if (msg == null || msg == undefined || msg.length < 1) {
                return;
            }

            let map = JSON.parse(msg);

            // let msga = new message.CustomFormationInfo();
            // msga.formations = map;
            let maplength = map.length;
            for (let i = 0; i < 6; i++) {
                let msga = map[maplength - 1][i];
                this.curCharmInfosMap.push(msga);
            }

            // this.curCharmInfosMap.push(map[0]);
            this.curCharmInfos = Table.DeepCopy(this.curCharmInfosMap);
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

        }

        /**
         * 其他副本阵容保存 
         */
        public saveFormations() {
            let formatInfo = this.getFormationInfo();
            this.curFormationMap = [];
            this.curFormationMap.push(formatInfo);
            let msg = JSON.stringify(this.curFormationMap);
            Game.Controller.setRoleStorageItem("formats", msg);
            // 序列化
            this.restsFrontSerialize(formatInfo);
        }

        private getFormationInfo(): message.CustomFormationInfo {
            let formats: Array<message.FormationInfo> = [];
            for (let k = 0; k < this.curFormations.length; k++) {
                const v = this.curFormations[k];
                formats.push(v);
            }
            let msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(Game.Controller.groupOwnerID());
            return msg;
        }

        /**
         * 其他副本序列化
         */
        public restsFrontSerialize(formatInfo: message.CustomFormationInfo) {
            let encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            let buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            let saveStr = egret.Base64Util.encode(buf);
            Game.Controller.setRoleStorageItem("restsSerialize", saveStr);
        }

        /**
         * 其他副本反序列化
         */
        public restsContrarySerialize() {
            let saveStr = Game.Controller.getRoleStorageItem("restsSerialize");
            if (saveStr && saveStr.length > 0) {
                let buf = egret.Base64Util.decode(saveStr);
                let msg = new message.CustomFormationInfo();
                let decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        }

        /**
         *  跨服保存阵容    
         */
        public SaveSingleFormation() {
            let formatInfo = this.getFormationCrossRealmInfo();
            this.CrossRealmFormationMap = [];
            let msg;
            if (Game.PlayerInstanceSystem.curInstanceType == 16) {
                this.CrossRealmFormationMap.push(formatInfo);
                msg = JSON.stringify(this.CrossRealmFormationMap);
                Game.Controller.setRoleStorageItem("singleFormation", msg);
            } else if (Game.PlayerInstanceSystem.curInstanceType == 22) {
                this.friendsThreeTeamsPlayMap.push(formatInfo);
                msg = JSON.stringify(this.friendsThreeTeamsPlayMap);
                Game.Controller.setRoleStorageItem("friendsThreeTeamsPlay", msg);
            }
            this.crossrealmFrontSerialize(formatInfo);// 跨服序列化
        }

        private getFormationCrossRealmInfo(): message.CustomSingleFormationInfo {
            let formats = [];
            for (let kk in this.formatsSingleAttack) {
                let v = this.formatsSingleAttack[kk];
                formats.push(v);
            }
            let msg = new message.CustomSingleFormationInfo();
            msg.formations = formats;
            msg.ID = String(Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(Game.Controller.groupOwnerID());
            return msg;
        }

        /**
         * 跨服序列化
         */
        public crossrealmFrontSerialize(formatInfo: message.CustomFormationInfo) {
            let encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            let buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            let saveStr = egret.Base64Util.encode(buf);
            Game.Controller.setRoleStorageItem("crossrealmSerialize", saveStr);
        }

        /**
         * 跨服反序列化
         */
        public crossrealmContrarySerialize() {
            let saveStr = Game.Controller.getRoleStorageItem("crossrealmSerialize");
            if (saveStr && saveStr.length > 0) {
                let buf = egret.Base64Util.decode(saveStr);
                let msg = new message.CustomFormationInfo();
                let decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        }

        /**
         * 流星街保存阵容信息
         */
        public SaveWantFormation() {
            let formatInfo = this.getFormationInfoStreet();
            this.StreetFormationMap = [];
            this.StreetFormationMap.push(formatInfo);
            let msg = JSON.stringify(this.StreetFormationMap);
            Game.Controller.setRoleStorageItem("wantFormation", msg);
            this.streetFrontSerialize(formatInfo);// 流星街序列化
        }

        private getFormationInfoStreet(): message.CustomFormationInfo {
            let formats = [];
            for (let k = 0; k < this.formatsWant.length; k++) {
                const v = this.formatsWant[k];
                formats.push(v);
            }
            let msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(Game.Controller.groupOwnerID());
            return msg;
        }

        /**
         * 流星街序列化
         */
        public streetFrontSerialize(formatInfo: message.CustomFormationInfo) {
            let encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            let buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            let saveStr = egret.Base64Util.encode(buf);
            Game.Controller.setRoleStorageItem("streetSerialize", saveStr);
        }

        /**
         * 流星街反序列化
         */
        public streetContrarySerialize() {
            let saveStr = Game.Controller.getRoleStorageItem("streetSerialize");
            if (saveStr && saveStr.length > 0) {
                let buf = egret.Base64Util.decode(saveStr);
                let msg = new message.CustomFormationInfo();
                let decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        }

        /**
         * 遗迹保存阵容信息
         */
        public SaveRelicFormation() {
            let formatInfo = this.getRelicFormationInfoStreet();
            this.RelicFormationMap = [];
            this.RelicFormationMap.push(formatInfo);
            let msg = JSON.stringify(this.RelicFormationMap);
            Game.Controller.setRoleStorageItem("RelicFormation", msg);
            this.relicFrontSerialize(formatInfo);// 流星街序列化
        }

        private getRelicFormationInfoStreet(): message.CustomFormationInfo {
            let formats = [];
            for (let k = 0; k < this.formatsRelic.length; k++) {
                const v = this.formatsRelic[k];
                formats.push(v);
            }
            let msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(Game.Controller.groupOwnerID());
            return msg;
        }

        /**
         * 遗迹序列化
         */
        public relicFrontSerialize(formatInfo: message.CustomFormationInfo) {
            let encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            let buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            let saveStr = egret.Base64Util.encode(buf);
            Game.Controller.setRoleStorageItem("streetSerialize", saveStr);
        }

        /**
         * 遗迹反序列化
         */
        public relicContrarySerialize() {
            let saveStr = Game.Controller.getRoleStorageItem("streetSerialize");
            if (saveStr && saveStr.length > 0) {
                let buf = egret.Base64Util.decode(saveStr);
                let msg = new message.CustomFormationInfo();
                let decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        }

        /**
         * 阵容方案保存--本服
         */
        public SaveSquadPlan() {
            let formatInfo = this.getSquadPlan();
            this.squadPlanMap = [];
            this.squadPlanMap.push(formatInfo);
            let msg = JSON.stringify(this.squadPlanMap);
            Game.Controller.setRoleStorageItem("SquadPlan", msg);
            this.streetFrontSquadPlan(formatInfo);
        }

        private getSquadPlan(): message.CustomFormationInfo {
            let formats = [];
            for (let k = 0; k < this.squadPlan.length; k++) {
                const v = this.squadPlan[k];
                formats.push(v);
            }
            let msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(Game.Controller.groupOwnerID());
            return msg;
        }

        /**
         * 阵容方案序列化--本服
         */
        public streetFrontSquadPlan(formatInfo: message.CustomFormationInfo) {
            let encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            let buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            let saveStr = egret.Base64Util.encode(buf);
            Game.Controller.setRoleStorageItem("SquadPlanSerialize", saveStr);
        }

        /**
         * 阵容方案反序列化--本服
         */
        public streetContrarySquadPlan() {
            let saveStr = Game.Controller.getRoleStorageItem("SquadPlanSerialize");
            if (saveStr && saveStr.length > 0) {
                let buf = egret.Base64Util.decode(saveStr);
                let msg = new message.CustomFormationInfo();
                let decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        }

        /**
         * 阵容方案保存--跨服
         */
        public SaveCrossBeam() {
            let formatInfo = this.getCrossBeam();
            this.crossBeamMap = [];
            this.crossBeamMap.push(formatInfo);
            let msg = JSON.stringify(this.crossBeamMap);
            Game.Controller.setRoleStorageItem("CrossBeam", msg);
            this.streetFrontCrossBeam(formatInfo);
        }

        private getCrossBeam(): message.CustomFormationInfo {
            let formats = [];
            for (let k = 0; k < this.crossBeam.length; k++) {
                const v = this.crossBeam[k];
                formats.push(v);
            }
            let msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(Game.Controller.groupOwnerID());
            return msg;
        }

        /**
         * 阵容方案序列化--跨服
         */
        public streetFrontCrossBeam(formatInfo: message.CustomFormationInfo) {
            let encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            let buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            let saveStr = egret.Base64Util.encode(buf);
            Game.Controller.setRoleStorageItem("CrossBeamSerialize", saveStr);
        }

        /**
         * 阵容方案反序列化--跨服
         */
        public streetContraryCrossBeam() {
            let saveStr = Game.Controller.getRoleStorageItem("CrossBeamSerialize");
            if (saveStr && saveStr.length > 0) {
                let buf = egret.Base64Util.decode(saveStr);
                let msg = new message.CustomFormationInfo();
                let decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        }

        /**
         * 阵容方案保存--好友单队切磋
         */
        public SaveFriendsTeams() {
            let formatInfo = this.getFriendsTeams();
            this.friendsTeamsMap = [];
            this.friendsTeamsMap.push(formatInfo);
            let msg = JSON.stringify(this.friendsTeamsMap);
            Game.Controller.setRoleStorageItem("friendsTeams", msg);
            this.streetFrontFriendsTeams(formatInfo);
        }

        private getFriendsTeams(): message.CustomFormationInfo {
            let formats = [];
            for (let k = 0; k < this.friendsTeams.length; k++) {
                const v = this.friendsTeams[k];
                formats.push(v);
            }
            let msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(Game.Controller.groupOwnerID());
            return msg;
        }

        /**
         * 阵容方案序列化--好友单队切磋
         */
        public streetFrontFriendsTeams(formatInfo: message.CustomFormationInfo) {
            let encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            let buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            let saveStr = egret.Base64Util.encode(buf);
            Game.Controller.setRoleStorageItem("FriendsTeamsSerialize", saveStr);
        }

        /**
         * 阵容方案反序列化--好友单队切磋
         */
        public streetContraryFriendsTeams() {
            let saveStr = Game.Controller.getRoleStorageItem("FriendsTeamsSerialize");
            if (saveStr && saveStr.length > 0) {
                let buf = egret.Base64Util.decode(saveStr);
                let msg = new message.CustomFormationInfo();
                let decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        }

        /**
         * 阵容方案保存--好友多队切磋
         */
        public SaveMoreTeam() {
            let formatInfo = this.getMoreTeam();
            this.moreTeamMap = [];
            this.moreTeamMap.push(formatInfo);
            let msg = JSON.stringify(this.moreTeamMap);
            Game.Controller.setRoleStorageItem("moreTeam", msg);
            this.streetFrontmoreTeam(formatInfo);
        }

        private getMoreTeam(): message.CustomFormationInfo {
            let formats = [];
            for (let k = 0; k < this.moreTeam.length; k++) {
                const v = this.moreTeam[k];
                formats.push(v);
            }
            let msg = new message.CustomFormationInfo();
            msg.formations = formats;
            msg.ID = String(Game.PlayerInfoSystem.RoleID);
            msg.OwnerGroupID = String(Game.Controller.groupOwnerID());
            return msg;
        }

        /**
         * 阵容方案序列化--好友多队切磋
         */
        public streetFrontmoreTeam(formatInfo: message.CustomFormationInfo) {
            let encoder = new aone.BinaryEncoder();
            formatInfo.to_bytes(encoder);
            let buf = new Uint8Array(encoder.buffer, 0, encoder.length);
            let saveStr = egret.Base64Util.encode(buf);
            Game.Controller.setRoleStorageItem("MoreTeamSerialize", saveStr);
        }

        /**
         * 阵容方案反序列化--好友多队切磋
         */
        public streetContraryMoreTeam() {
            let saveStr = Game.Controller.getRoleStorageItem("MoreTeamSerialize");
            if (saveStr && saveStr.length > 0) {
                let buf = egret.Base64Util.decode(saveStr);
                let msg = new message.CustomFormationInfo();
                let decoder = new aone.BinaryDecoder(new Uint8Array(buf));
                msg.parse_bytes(decoder);
            }
        }

        public InitInstanceInfo() {
            Game.PlayerInstanceSystem.curInstances = [];
            for (let k in message.EFormationType) {
                let v = message.EFormationType[k];
                let instance = new message.CustomInstanceInfo();
                instance.instanceType = Number(v);
                Game.PlayerInstanceSystem.curInstances[Number(v)] = instance;
            }
        }

        // 阵上是否有空武将位置
        public HaveMoreGeneral(ui, suffixs, minSize) {
            let formatdb = [];
            if (suffixs == null) {
                suffixs = ["generals", "reserves", "supports"];
            }
            let ret = false;
            //阵型是否有空位
            let formatTbl = [];
            let bLeftPos = false;
            let bBreak = false;
            let suffixRet = "";
            let empty_num = 0;
            let format_item = Instance();
            for (let i = 0; i < suffixs.length; i++) {
                if (suffixs[i] != "reserves") {
                    let _suffix = suffixs[i];
                    if (this.itemlist != null) {
                        let tblData = [];
                        if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {
                            tblData = Game.PlayerFormationSystem.formatsWant[0][_suffix]
                        } else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_RELIC) {
                            tblData = this.formatsRelic[0][_suffix]
                        } else {
                            tblData = this.curFormations[Game.PlayerInstanceSystem.curInstanceType][_suffix]
                        }
                        let level = yuan3(i == 0, Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID, Game.PlayerInfoSystem.BaseInfo.level)
                        let [_t, cntReal] = CurrFormation(i + 1, tblData, level);
                        for (let j = 0; j < cntReal; j++) {
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
            let bLeftGeneral = false;
            let generals = Game.PlayerHunterSystem.getSortGeneralFormat();// 返回现有武将排序

            //不上阵武将
            let general_limit_use_ids = [10057, 10058, 10059, 10074];
            for (let k = 0; k < generals.length; k++) {
                if (!SameGeneralInFormate(generals[k].general_id, this.curFormationMap)) {
                    let typeIn = this.bUsed(generals[k].general_id);
                    // 有可能老账号，有的上阵类型隐藏了
                    if (typeIn == 0
                        || suffixs[typeIn] == null
                        || (ui.itemsAnimateMap[generals[k].general_id] == null && typeIn == 1)
                        && !(Table.VIn(general_limit_use_ids, PlayerHunterSystem.GetGeneralId(generals[k].general_id)))
                    ) {
                        bLeftGeneral = true;
                        break;
                    }

                    if (typeIn == 3) {
                        bLeftGeneral = true;
                        for (let kk in ui.itemsAnimateMap) {
                            let vv = ui.itemsAnimateMap[kk];
                            if (vv.supportID % 100000 == generals[k].general_id % 100000) {
                                bLeftGeneral = false
                                break;
                            }
                        }
                    }
                }
            }

            let bMinSize = true;
            if (minSize != null) {
                bMinSize = generals.length >= minSize
            }
            ret = bLeftPos && bLeftGeneral && bMinSize;
            return [ret, suffixRet, empty_num];
        }

        public InitFormatsData() {
            for (let i = 0; i < 3; i++) {
                this.formats.push(new message.FormationInfo());
            }
            // this.formats.push(this.create_msg(message.FormationInfo));
            // this.formats.push(this.create_msg(message.FormationInfo));
            // this.formats.push(this.create_msg(message.FormationInfo));
            let buttonNames = ["generals", "reserves", "supports"];
            for (let kk in this._formatsSingleAttack) {
                let vv = this._formatsSingleAttack[kk];
                if (vv.formationIndex <= 3) {
                    this.formats[vv.formationIndex] = vv;
                }
            }
            for (let fk in this.formats) {
                let fv = this.formats[fk];
                for (let kk in buttonNames) {
                    let vv = buttonNames[kk];
                    for (let i = 1; i < 4; i++) {
                        if (fv[vv][i] == null || fv[vv][i] == 0) {
                            fv[vv][i] = 0;
                        }
                    }
                }
                this.formats[fk].formationType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
                this.formats[fk].formationIndex = fk;
            }
            this.formatsSingleAttack = this.formats;
        }

        public create_msg(def) {
            let msg = [];
            let attribsDef = def["attribs"];
            if (attribsDef == null) {
                msg["def"] = def;
                return msg;
            }
            for (const i in attribsDef) {
                const attr = attribsDef[i];
                let attrName = attr[1]
                let attrType = attr[2]
                if (attr[3] == "repeat") {
                    msg[attrName] = [];
                } else if (attrType == "string") {
                    msg[attrName] = "";
                } else if (attrType == "bool") {
                    msg[attrName] = false;
                } else {
                    msg[attrName] = 0
                }
            }
            msg["def"] = def;
            return msg;
        }

        /**
         * 判断每个队列至少上一个武将(非援护)
         */
        public JudgeGeneral() {
            let result = 0;
            for (const k in this.formatsSingleAttack) {
                const v = this.formatsSingleAttack[k];
                let num = 0;
                for (const kk in v.generals) {
                    const vv = v.generals[kk];
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
        }

        /** 武将信息去重*/
        private eliminateRepeatGeneral(data: message.FormationInfo): message.FormationInfo {
            let tbl = data;
            let exitMap = {};
            // 检查武将信息
            for (let index = 0; index < tbl.generals.length; index++) {
                let generalId = tbl.generals[index];
                let tmpId = PlayerHunterSystem.GetGeneralId(generalId);
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
            for (let index = 0; index < tbl.supports.length; index++) {
                let generalId = tbl.supports[index];
                let tmpId = PlayerHunterSystem.GetGeneralId(generalId);
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
        }
        //返回当前允许的最大阵型位置信息
        public maxFormat() {
            let ret = {};
            let format_item = TableFormations.Item(Game.PlayerInstanceSystem.curInstanceType);
            let tblIndex = ["generals", "reserves", "supports"];
            for (let i = 0; i < tblIndex.length; i++) {
                if (i != 1) {
                    let suffix = tblIndex[i];
                    let format_add = this.addTbl(false, i);
                    ret[suffix] = format_item[suffix];
                    if (format_add != null) {
                        ret[suffix] = ret[suffix] + format_add;
                    }
                }
            }
            return ret;
        }
        //下一次阵型位置增加的阵型信息
        public addTbl(bNext, tagType) {
            let format_item = TableFormations.Item(Game.PlayerInstanceSystem.curInstanceType);
            let format_add_idx = this.addIndex(bNext, tagType);
            let lv_key = StringConfig_TagString.formatChoose[tagType + 1] + "_limit_number";
            return format_item[lv_key][format_add_idx];
        }
        //下次阵型位置增加的等级
        public addIndex(bNext, tagType) {
            function compare_func(srcVar, tagType) {
                let dstVar = Game.PlayerInfoSystem.Level;
                if (tagType == 1) {
                    dstVar = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
                }
                return srcVar > dstVar
            }
            if (bNext == null) {
                bNext = false;
            }
            let lv_key = StringConfig_TagString.formatChoose[tagType] + "_limit_level";
            let tbl_item: { [key: string]: TableFormations } = TableFormations.Table();
            let ret = 1;
            //当前级别默认返回最低的，下一级别默认返回最高的
            ret = Helper.getObjLen(tbl_item[lv_key]);
            for (let i = 0; i < Helper.getObjLen(tbl_item[lv_key]); i++) {
                if (compare_func(tbl_item[lv_key][i], tagType)) {
                    if (bNext) {
                        ret = i;
                    } else {
                        if (tbl_item[lv_key][i - 1] != null) {
                            ret = i - 1;
                        }
                    }
                    continue;
                }
            }
            return ret;
        }
        public main = [];
        public format = [];
        public analyseResult(fType) {
            this.main = Helper.writeMainFormat(this.curFormations[fType - 1]);
            this.format = Helper.writeSimpleFormat(this.curFormations[fType - 1]);
            let format = this.maxFormat();
            let formatPosNum = (format["generals"] + format["supports"]);
            let current = this.format.length;
            let own = Game.PlayerHunterSystem.queryAllHunters().length;
            let max = Helper.getObjLen(TableBaseGeneral.Table());

            let tblResult = [];
            let visitTag = false;
            if (current < own && current < formatPosNum) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_FORMAT;
                info["general_id"] = null;
                tblResult.push(info);
            } else if (own < formatPosNum && own < max && current < formatPosNum) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_VISIT
                info["general_id"] = null;
                tblResult.push(info);
                visitTag = true;
            }
            let key = this.cardNum();
            if (key != null && !Device.isReviewSwitch && PlayerMissionSystem.FunOpenTo(FUNC.POTATO)) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_CARD_NUM;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.cardLevel();
            if (key != null && !Device.isReviewSwitch && PlayerMissionSystem.FunOpenTo(FUNC.POTATO)) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_CARD_LEVEL;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.generalLevel();
            if (key != null) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_LEVEL;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.generalStep();
            if (key != null) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STEP;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.generalStar();
            if (key != null) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_UPGRADE_GENERAL_STAR;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.skillLevel();
            if (key != null && PlayerMissionSystem.FunOpenTo(FUNC.SKILL)) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_UPGRADE_SKILLS;
                info["general_id"] = key;
                tblResult.push(info);
            }
            key = this.adviserLevel();
            if (key != null && !Device.isReviewSwitch && PlayerMissionSystem.FunOpenTo(FUNC.ADVISER)) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_UPGRADE_ADVISER;
                info["general_id"] = key;
                tblResult.push(info);
            }
            if (visitTag == false && tblResult.length <= 1 && own < max) {
                let info = {};
                info["type"] = TableEnum.EnumAnalyseResult.RESULT_VISIT;
                info["general_id"] = null;
                tblResult.push(info);
            }
            return tblResult;
        }
        public skillLevel() {
            let skill_level = TableClientPowerLevel.Table()[Game.PlayerInfoSystem.Level].skill_level;
            for (let i = 0; i < this.main.length; i++) {
                let key = this.main[i];
                let generalsMap: Object = Game.PlayerHunterSystem.allHuntersMap();
                let general = generalsMap[key];
                if (general != null) {
                    for (let j = 0; j < general.skills.length; j++) {
                        if (general.skills[j].level < skill_level) {
                            return key;
                        }
                    }
                    for (let j = 0; j < general.passives.length; j++) {
                        if (general.passives[j].level < skill_level) {
                            return key;
                        }
                    }
                }
            }
            return null;
        }
        public generalStar() {
            let general_star = TableClientPowerLevel.Table()[Game.PlayerInfoSystem.Level].general_star;
            for (let i = 0; i < this.main.length; i++) {
                let key = this.main[i];
                let generalsMap: Object = Game.PlayerHunterSystem.allHuntersMap();
                let general = generalsMap[key];
                if (general.star < general_star) {
                    return key;
                }
            }
            return null;
        }
        public generalStep() {
            let general_step = TableClientPowerLevel.Table()[Game.PlayerInfoSystem.Level].general_step;
            for (let i = 0; i < this.main.length; i++) {
                let key = this.main[i];
                let generalsMap: Object = Game.PlayerHunterSystem.allHuntersMap();
                let general = generalsMap[key];
                if (general.step < general_step) {
                    return key;
                }
            }
            return null;
        }
        public adviserLevel() {
            let adviser_level = TableClientPowerLevel.Table()[Game.PlayerInfoSystem.Level].animal_level;
            if (Game.PlayerAdviserSystem.adviser.length == 0) {
                return 1;
            } else {
                let tbl = Table.DeepCopy(Game.PlayerAdviserSystem.adviser);
                tbl.sort((a, b) => {
                    return b.level - a.level;
                });
                if (tbl[0].level < adviser_level) {
                    return 1;
                }
            }
            return null;
        }
        public generalLevel() {
            let general_level = TableClientPowerLevel.Table()[Game.PlayerInfoSystem.Level].general_level;
            for (let i = 0; i < this.main.length; i++) {
                let key = this.main[i];
                let generalsMap: Object = Game.PlayerHunterSystem.allHuntersMap();
                let general = generalsMap[key];
                if (general.level < general_level) {
                    return key;
                }
            }
            return null;
        }
        public cardNum() {
            for (let i = 0; i < this.main.length; i++) {
                let key = this.main[i];
                let generalsMap: Object = Game.PlayerHunterSystem.allHuntersMap();
                let general = generalsMap[key];
                let num = Game.PlayerCardSystem.cardOpenNum(general.general_id, Game.PlayerInfoSystem.Level);
                if (general.potatoInfo.length < num) {
                    return key;
                }
            }
            return null;
        }
        public cardLevel() {
            for (let i = 0; i < this.main.length; i++) {
                let key = this.main[i];
                let generalsMap: Object = Game.PlayerHunterSystem.allHuntersMap();
                let general = generalsMap[key];
                for (let j = 0; j < general.potatoInfo.length; j++) {
                    let max_level = CommonConfig.card_star_max_level[general.potatoInfo[j].star];
                    if (max_level != null) {
                        if (general.potatoInfo[j].level < max_level) {
                            return key;
                        }
                    }
                }
            }
            return null;
        }

        //判断武将是否上阵，返回上阵类型，主队/替补/援护
        public bUsed(generalID, formationType?) {
            let getCurrAllFormat = (formationType) => {
                if (formationType == null || formationType == undefined) {
                    formationType = Game.PlayerInstanceSystem.curInstanceType
                }
                let format = [];
                if (formationType == message.EFormationType.FORMATION_TYPE_WANTED) {
                    format = [this.formatsWant[0]];
                } else if (formationType == message.EFormationType.FORMATION_TYPE_RELIC) {
                    format = [this.formatsRelic[0]];
                }
                // else if (formationType == message.EFormationType.FORMATION_TYPE_CONTEND) {// 没有
                //     format = this.formatsDefine;
                // } 
                else if (formationType == message.EFormationType.FORMATION_TYPE_CRAFT) {
                    format.push(this.formatsSingleDefine);
                } else if (formationType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK || formationType == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                    format.push(this.formatsSingleAttack);
                } else if (formationType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT) {
                    format.push(this.formatsGroupFight);
                } else if (formationType == message.EFormationType.FORMATION_TYPE_MATCH_DEFENSE) {
                    format.push(this.formatsMatchDefine);
                } else {
                    format.push(this.curFormations[Game.PlayerInstanceSystem.curInstanceType - 1]);
                }
                return format;
            }

            let format = getCurrAllFormat(formationType);
            // todo，后序可以用genID构造一个上阵索引表，提高效率
            if (format == null) {
                return 0;
            }

            let suffixs = ["generals", "reserves", "supports"];
            for (let [fk, fv] of HelpUtil.GetKV(format)) {
                for (let [k, v] of HelpUtil.GetKV(suffixs)) {
                    for (let j = 0; j < Game.PlayerMissionSystem.tableLength(fv[v]); j++) {
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
        }

        public GetAllFormatGeneralByType(type) {
            let ret = [];
            let tbl = this.curFormations[type - 1];
            if (tbl == null || tbl == undefined) {
                return [];
            }
            for (let k in tbl["generals"]) {
                let v = tbl["generals"][k];
                ret.push(v);
            }
            for (let k in tbl["supports"]) {
                let v = tbl["supports"][k];
                ret.push(v);
            }
            return ret;
        }

        public checkGeneralInFormat(formateType, generalId): boolean {
            let tbl = this.curFormations[formateType - 1];
            for (let v of tbl["generals"]) {
                if (v == generalId)
                    return true;
            }
            for (let v of tbl["supports"]) {
                if (v == generalId)
                    return true;
            }

            return false;
        }
    }


    function CurrFormation(tagType, maxNumber, currLv) {
        let format_item = TableFormations.Item(Game.PlayerInstanceSystem.curInstanceType);

        let init_number_key = StringConfig_TagString.formatChoose[tagType]
        let limit_lv_key = StringConfig_TagString.formatChoose[tagType] + "_limit_level";
        let limit_number_key = StringConfig_TagString.formatChoose[tagType] + "_limit_number";

        let init_number = format_item[init_number_key];
        let lv_add_tbl = format_item[limit_lv_key];
        let number_add_tbl = format_item[limit_number_key];

        let add_number = 0;
        let index = 0;
        for (let i = lv_add_tbl.length - 1; i >= 0; i--) {
            if (currLv >= lv_add_tbl[i]) {
                add_number = yuan3(number_add_tbl[i] != null, number_add_tbl[i], 0);
                index = i
                break
            }
        }
        let real_number = init_number + add_number;

        let result = [];
        for (let i = 0; i < maxNumber.length; i++) {
            let info = { bLock: null, openDes: null };
            if (i < real_number) {
                info.bLock = false
                info.openDes = "";
            } else {
                info.bLock = true;
                if (tagType == 1) {
                    // info.openDes = yuan3(format_item.unopen_des[index + 1] != null, format_item.unopen_des[index + 1], "");
                    info.openDes = format_item.unopen_des;
                } else {
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
            return false
        }
        for (let k in formation) {
            let v = formation[k];
            if (PlayerHunterSystem.GetGeneralId(generalId) == PlayerHunterSystem.GetGeneralId(Number(k))) {
                return true;
            }
        }
        return false
    }

    function Instance(id?) {
        if (id == null) {
            id = Game.PlayerInstanceSystem.curInstanceType;
        }
        if (ckid(id)) {
            return null;
        }
        return TableFormations.Item(id);
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
    export class CustomFormationMap {
        units: Array<message.CustomFormationInfo> = [];
    }

    /**
     * 跨服格斗场存储
     */
    export class CrossRealmFormationMap {
        units: Array<message.CustomSingleFormationInfo> = [];
    }

    /**
     * 好友三队切磋存储
     */
    export class friendsThreeTeamsPlayMap {
        units: Array<message.CustomSingleFormationInfo> = [];
    }

    /**
     * 流星街阵营存储
     */
    export class StreetFormationMap {
        units: Array<message.CustomFormationInfo> = [];
    }

    /**
     * 遗迹阵营存储
     */
    export class RelicFormationMap {
        units: Array<message.CustomFormationInfo> = [];
    }

    /**
     * 阵容方案本服阵营存储
     */
    export class squadPlanMap {
        units: Array<message.CustomFormationInfo> = [];
    }

    /**
     * 阵容方案跨服阵营存储
     */
    export class crossBeamMap {
        units: Array<message.CustomFormationInfo> = [];
    }

    /**
     * 阵容方案好友单队切磋阵营存储
     */
    export class friendsTeamsMap {
        units: Array<message.CustomFormationInfo> = [];
    }

    /**
     * 阵容方案好友多队切磋阵营存储
     */
    export class moreTeamMap {
        units: Array<message.CustomFormationInfo> = [];
    }
}