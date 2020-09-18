namespace zj {
    // 公会系统
    // lizhengqiang
    // 20181212

    export class PlayerLeagueSystem {
        ///////////////////////////////////////////////////////////////////////////
        // 静态函数

        private static Decompress(data: number[]) {
            let para = {}
            para["index"] = 4
            let inflate = new Zlib.Inflate(data, para);
            return inflate.decompress();
        }

        // 解压LeagueInfo信息
        private static DecompressLeagueInfo(data: number[]): message.LeagueInfo {
            if (data.length == 0) return null;
            let plain = PlayerLeagueSystem.Decompress(data);
            let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
            let leagueInfo = new message.LeagueInfo()
            if (!leagueInfo.parse_bytes(decoder)) {
                console.log("decompress fail");
                return null;
            }
            return leagueInfo;
        }

        // 解压SimpleMemberFormationZip信息
        private static DecompressSimpleMemberFormationZip(data: number[]): message.SimpleMemberFormationZip {
            if (data.length == 0) return null;
            let plain = PlayerLeagueSystem.Decompress(data);
            let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
            let simpleMemberFormationZip = new message.SimpleMemberFormationZip()
            if (!simpleMemberFormationZip.parse_bytes(decoder)) {
                console.log("decompress fail");
                return null;
            }
            return simpleMemberFormationZip;
        }

        private static DecompressLeagueInstanceStageInfo(data: number[]): message.LeagueInstanceStageInfo {
            if (data.length == 0) return null;
            let plain = PlayerLeagueSystem.Decompress(data);
            let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
            let leagueInstanceStageInfo = new message.LeagueInstanceStageInfo()
            if (!leagueInstanceStageInfo.parse_bytes(decoder)) {
                console.log("decompress fail");
                return null;
            }
            return leagueInstanceStageInfo;
        }

        // 获取段位 return[段位string,logo,textlogo,star]
        public static GetSegment(score: number) {
            let tbl = TableLeagueMatchScore.Table();
            let length = Object.keys(tbl).length;
            for (let i = 1; i < length; i++) {
                if (score >= tbl[i].score_min && score < tbl[i + 1].score_min) {
                    return {
                        [1]: tbl[i].name,
                        [2]: UIConfig.UIConfig_Union.segmentLogo[i - 1],
                        [3]: UIConfig.UIConfig_Union.segmentLogoText[i - 1],
                        [4]: UIConfig.UIConfig_Union.segmentStar[i - 1]
                    };
                }
            }
            return {
                [1]: tbl[length].name,
                [2]: UIConfig.UIConfig_Union.segmentLogo[length - 1],
                [3]: UIConfig.UIConfig_Union.segmentLogoText[length - 1],
                [4]: UIConfig.UIConfig_Union.segmentStar[length - 1]
            };
        }

        // 获取星期几
        public static GetDay(): number {
            let wDay = Game.Controller.serverNow().getDay();
            if (wDay == 0) wDay = 7;
            return wDay;
        }

        // 
        public static GetCurSecond(bool: boolean = false): number {
            let curTime = Game.Controller.serverNow();
            let curSecond: number = curTime.getHours() * 3600 + (curTime.getMinutes() - 1) * 60 + curTime.getSeconds();
            if (bool) {
                curSecond = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            }
            return curSecond;
        }


        // 返回当前公会战状态
        public static getStatus(): number {
            if (PlayerLeagueSystem.GetDay() == 7) {
                if (Game.PlayerLeagueSystem.BaseInfo.match_join) { // 是否已报名
                    return TableEnum.Enum.UnionBattleStatus.LadderRegistered; // 排位赛准备状态
                } else {
                    return TableEnum.Enum.UnionBattleStatus.LadderNotRegistered; // 排位赛未报名状态
                }
            }

            if (Game.PlayerLeagueSystem.BaseInfo.match_join) { // 是否已报名
                if (PlayerLeagueSystem.IsTimeInBattle()) { // 是否在战斗期间
                    if (Game.PlayerLeagueSystem.unionBattleInfo.isEmpty || Game.PlayerLeagueSystem.unionBattleInfo.EnemyUnionInfo == null) {
                        return TableEnum.Enum.UnionBattleStatus.LadderRegistered; // 排位赛准备状态
                    } else {
                        return TableEnum.Enum.UnionBattleStatus.Battle; // 战斗状态
                    }
                } else {
                    return TableEnum.Enum.UnionBattleStatus.LadderRegistered; // 排位赛准备状态
                }
            } else {
                return TableEnum.Enum.UnionBattleStatus.LadderNotRegistered; // 排位赛未报名状态
            }
        }

        // 是否在战斗时间
        public static IsTimeInBattle(): boolean {
            let curSecond = PlayerLeagueSystem.GetCurSecond();
            return (curSecond > CommonConfig.league_match_start_close_time[0] + CommonConfig.league_match_match_opponent_time && curSecond < CommonConfig.league_match_start_close_time[1]);
        }

        // 是否需要弹出结算界面
        public static PushLastSettle(): boolean {
            let curTime = Game.Controller.serverNow();
            let curSecond: number = curTime.getHours() * 3600 + (curTime.getMinutes() - 1) * 60 + curTime.getSeconds();

            let dayStr = PlayerLeagueSystem.GetLastSettleData();
            if (Game.PlayerLeagueSystem.unionBattleInfo.UnionStatus != TableEnum.Enum.UnionBattleStatus.Battle
                && !(curTime.getDay() == 1 && curSecond > CommonConfig.league_match_start_close_time[0])
                && !(curTime.getDay() == 2 && curSecond < CommonConfig.league_match_start_close_time[0])) {
                let push: boolean = (Number(dayStr) != Tips.GetSaveUnionBattlePushRecord());
                return push;
            }

            return false;
        }

        // 获取上场结算日期
        public static GetLastSettleData(): string {
            let curTime = Game.Controller.serverNow();
            let curSecond: number = curTime.getHours() * 3600 + (curTime.getMinutes() - 1) * 60 + curTime.getSeconds();
            let dayStr = "";
            if (curSecond > CommonConfig.league_match_start_close_time[1]) {
                dayStr = curTime.getFullYear().toString() + (curTime.getMonth() + 1).toString() + curTime.getDate().toString();
            } else {
                dayStr = curTime.getFullYear().toString() + (curTime.getMonth() + 1).toString() + (curTime.getDate() - 1).toString();
            }
            return dayStr;
        }

        public static GetTimeStr(secTotal: number, noHour?: boolean): string {
            let s = secTotal % 60;
            let m = Math.floor(secTotal % 3600 / 60);
            let h = Math.floor(secTotal % (3600 * 24) / 3600);
            if (secTotal > 3600 * 24) h = 24 + h;

            let str: string = "";
            if (noHour) {
                str = (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
                return str;
            } else {
                str = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
                return str;
            }
        }

        // 获取时间差显示
        public static GetTimeDiffShow(state: number): [string, number, string] {
            let curSecond = PlayerLeagueSystem.GetCurSecond();
            let startTime = CommonConfig.league_match_start_close_time[0];
            let endTime = CommonConfig.league_match_start_close_time[1];

            if (state == TableEnum.Enum.UnionBattleStatus.LadderRegistered) {
                if (curSecond < startTime && PlayerLeagueSystem.GetDay() != 7) { // 周六改为排位战  周日休息
                    let secDiff = startTime - curSecond;
                    return [Helper.StringFormat(TextsConfig.TextsConfig_Match.timeDiff[0], PlayerLeagueSystem.GetTimeStr(secDiff)), curSecond, PlayerLeagueSystem.GetTimeStr(secDiff)];
                } else {
                    let secDiff = 24 * 3600 - curSecond + startTime;
                    if (PlayerLeagueSystem.GetDay() == 6 && curSecond >= endTime) { // 周六晚上23点 至 周日凌晨之前
                        secDiff = secDiff + 24 * 3600;
                    }
                    return [Helper.StringFormat(TextsConfig.TextsConfig_Match.timeDiff[0], PlayerLeagueSystem.GetTimeStr(secDiff)), curSecond, PlayerLeagueSystem.GetTimeStr(secDiff)];
                }
            } else if (state == TableEnum.Enum.UnionBattleStatus.Battle) {
                let secDiff = endTime - curSecond;
                return [Helper.StringFormat(TextsConfig.TextsConfig_Match.timeDiff[1], PlayerLeagueSystem.GetTimeStr(secDiff)), curSecond, PlayerLeagueSystem.GetTimeStr(secDiff)];
            } else {
                return ["", 0, "00:00"];
            }
        }

        public static GetMatchOpponentTime() {
            let curSecond = PlayerLeagueSystem.GetCurSecond();
            let overTime = CommonConfig.league_match_start_close_time[0] + CommonConfig.league_match_match_opponent_time;
            let diffTime = overTime - curSecond;
            return PlayerLeagueSystem.GetTimeStr(diffTime);
        }

        public static GetServerName(str: string): string {
            if (str.indexOf("{") == -1) return str;
            let json = JSON.parse(str);
            if (!json) return "";
            let lang = Game.LanguageManager.getLang().replace("-", "").toLowerCase();
            if (json[lang] == null || json[lang] == undefined) return "";
            let arr = json[lang].split("&");
            if (arr && arr.length >= 2) return arr[1];
            return "";
        }

        // 获取总分数
        // @param index  具体某一飞艇总分数  可以为空
        public static GetMaxScore(index?: number): number {
            let score: number = 0;
            if (index == undefined) {
                for (let i = 0; i < CommonConfig.league_match_fortress_team_num.length; i++) {
                    score = score + CommonConfig.league_match_fortress_star_socre[i][2] * CommonConfig.league_match_fortress_team_num[i] + CommonConfig.league_match_fortress_extra_socre[i];
                }
            } else {
                score = score + CommonConfig.league_match_fortress_star_socre[index - 1][2] * CommonConfig.league_match_fortress_team_num[index - 1] + CommonConfig.league_match_fortress_extra_socre[index - 1];
            }

            return score;
        }

        // 分数计算
        public static ScoreCalculation(scoreData: Array<Array<number>>): number {
            let score: number = 0;
            for (let i = 0; i < scoreData.length; i++) {
                let ft = scoreData[i];
                for (let v of ft) {
                    score = score + CommonConfig.league_match_fortress_star_socre[i][v - 1];
                }

                if (ft.length == CommonConfig.league_match_fortress_team_num[i]) {
                    score = score + CommonConfig.league_match_fortress_extra_socre[i];
                }
            }
            return score;
        }

        // 阵容是否显示加号
        public static FormationShowAdd(formation): {} {
            let tbl = {};
            for (let k in formation) {
                if (Number(k) == 1 && formation[k].general_id == 0) {
                    tbl[k] = true;
                } else {
                    tbl[k] = false;
                }
            }
            return tbl;
        }

        ///////////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////////////////
        // 私有变量
        private info: message.LeagueInfo = null; // 公会数据

        ///////////////////////////////////////////////////////////////////////////
        // 公有变量
        public recruitTime: number = 0;

        public unionBattleInfo = {
            isEmpty: false,
            UnionStatus: null,
            EnemyUnionInfo: null,
            isSignInAfternoon: false // 报名时是否是下午
        };

        public leagueBoss = {
            bStart: false,
            bSuccess: false,
            bossInfo: new message.ArmyStage(),
            Inspires: [],
            RankList: [],
            KillName: null
        };

        public leagueInstance = {
            curInstanceId: 0,
            leagueInstanceStageInfo: {},
        };

        ///////////////////////////////////////////////////////////////////////////
        // 成员方法

        public init() {
            Game.EventManager.on(GameEvent.PLAYER_LEAGUE_INFO_CHANGE, this.onLeagueInfoChange, this);
            Game.EventManager.on(GameEvent.PLAYER_MEMBER_INFO_CHANGE, this.onMemberInfoChange, this);

            Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_APPLY, this.onNoticeLeagueApply, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, this.onNoticeLeagueMember, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_INSTANCE, this.onNoticeLeagueInstance, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_BOSS, this.onNoticeLeagueBoss, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_BOSS_RANK, this.onNoticeLeagueBossRank, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_BOSS_PARTY, this.onNoticeLeagueBossParty, this);

            Game.EventManager.on(GameEvent.LEAGUEBOSSBATTLE, this.onLeagueBossBattle, this);
        }

        public uninit() {
            this.info = null;
            this.recruitTime = 0;
            this.unionBattleInfo = {
                isEmpty: false,
                UnionStatus: null,
                EnemyUnionInfo: null,
                isSignInAfternoon: false // 报名时是否是下午
            };
            this.leagueBoss = {
                bStart: false,
                bSuccess: false,
                bossInfo: new message.ArmyStage(),
                Inspires: [],
                RankList: [],
                KillName: null
            };
            this.leagueInstance = {
                curInstanceId: 0,
                leagueInstanceStageInfo: {},
            };
        }

        private setProcesses() {
            if (!this.info || !this.info.info) return;

            let time: number = Math.floor(egret.getTimer() / 1000);
            for (let v of this.info.info.processes) {
                v.leftTime = v.leftTime + time;
            }
        }

        private onLeagueInfoChange(ev: egret.Event) {
            this.info = <message.LeagueInfo>ev.data;
            if (!this.info) return;

            this.setProcesses();
        }

        private onMemberInfoChange(ev: egret.Event) {
            if (!this.info) return;
            let member = <message.MemberInfo>ev.data;
            if (member == undefined || member == null) return;
            for (let i = 0; i < this.info.members.length; i++) {
                if (Game.PlayerInfoSystem.RoleID == this.info.members[i].monarchbase.id) {
                    this.info.members[i] = member;
                }
            }
        }

        private onNoticeLeagueApply(ev: egret.Event) {
            if (!this.info) return;
            let body = (<message.LeagueApplyNoticeRequest>ev.data).body;
            if (!body) return;
            let applyInfo = body.applyInfo[0];
            if (!applyInfo) return;
            this.info.applicants.push(applyInfo);

            Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_APPLY);
        }

        private onNoticeLeagueMember(ev: egret.Event) {
            let update = () => {
                if (!this.info) return;
                let body = (<message.LeagueMemberNoticeRequest>ev.data).body;
                if (!body) return;
                if (body.memberCount < this.info.members.length) {
                    for (let i = 0; i < this.info.members.length; i++) {
                        if (this.info.members[i].monarchbase.id == body.value) {
                            this.info.members.splice(i, 1);
                            break;
                        }
                    }
                } else if (body.memberCount > this.info.members.length) {
                    for (const v of body.members) {
                        this.info.members.push(v);
                    }
                }
            };

            if (!this.info) {
                this.leagueInfo().then((leagueInfo: message.LeagueInfo) => {
                    update();

                    Game.PlayerInfoSystem.LeagueId = this.info.info.leagueId;
                });
            } else {
                update();
            }
        }

        private onNoticeLeagueInstance(ev: egret.Event) {
            if (!this.info) return;
            let body = (<message.LeagueInstanceNoticeRequest>ev.data).body;
            if (!body) return;
            let flag: boolean = false;
            for (let i = 0; i < this.info.instances.length; i++) {
                if (this.info.instances[i].instance_id == body.instances[0].instance_id) {
                    this.info.instances[i] = body.instances[0];
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.info.instances.push(body.instances[0]);
            }

            Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_INSTANCE);
        }

        private onNoticeLeagueBoss(ev: egret.Event) {
            if (!this.info) return;
            let body = (<message.LeagueBossNoticeRequest>ev.data).body;
            if (!body) return;

            this.leagueBoss.bStart = false;
            this.leagueBoss.bSuccess = body.is_win;
            this.leagueBoss.RankList = body.rankItems;
            this.leagueBoss.KillName = body.kill_name;
            for (const v of body.progresses) {
                for (let i = 0; i < this.info.info.processes.length; i++) {
                    if (v.type == this.info.info.processes[i].type) {
                        this.info.info.processes[i] = v;
                        break;
                    }
                }
            }
            this.setProcesses();
            if (this.leagueBoss.bossInfo.monster_pos3.length > 0) {
                this.leagueBoss.bossInfo.monster_pos3[0].curInfo.cur_hp = body.value;
            }
        }
        private onNoticeLeagueBossParty(ev: egret.Event) {
            if (!this.info) return;
            let body = (<message.LeagueBossPartyNoticeRequest>ev.data).body;
            if (!body) return;
            for (const v of body.progresses) {
                for (let i = 0; i < this.info.info.processes.length; i++) {
                    if (v.type == this.info.info.processes[i].type) {
                        this.info.info.processes[i] = v;
                        break;
                    }
                }
            }
            this.setProcesses();
        }


        private onNoticeLeagueBossRank(ev: egret.Event) {
            if (!this.info) return;
            let body = (<message.LeagueBossRankNoticeRequest>ev.data).body;
            if (!body) return;

            this.leagueBoss.RankList = body.rankItems;
        }

        private onLeagueBossBattle(ev: egret.Event) {
            if (!this.info) return;
            let body = <message.LeagueBossBattleRespBody>ev.data;
            if (!body) return;
            for (const v of body.members) {
                for (let i = 0; i < this.info.members.length; i++) {
                    if (v.monarchbase.id == this.info.members[i].monarchbase.id) {
                        this.info.members[i] = v;
                        break;
                    }
                }
            }

            for (const v of body.progresses) {
                for (let i = 0; i < this.info.info.processes.length; i++) {
                    if (v.type == this.info.info.processes[i].type) {
                        this.info.info.processes[i] = v;
                        break;
                    }
                }
            }
            // this.BaseInfo();

            this.setProcesses();
        }

        // 更新数据
        public updateLeagueInfo(leagueInfo: message.LeagueInfo) {
            this.info = leagueInfo;

            this.setProcesses();
            return;
        }

        public updateLeagueBase(leagueBase: message.LeagueBase) {
            if (!this.info) return;
            this.info.info = leagueBase;

            this.setProcesses();
            return;
        }

        public updateLeagueMembers(leagueMembers: Array<message.MemberInfo>) {
            if (!this.info) return;
            for (const v of leagueMembers) {
                for (let i = 0; i < this.info.members.length; i++) {
                    if (v.monarchbase.id == this.info.members[i].monarchbase.id) {
                        this.info.members[i] = v;
                        break;
                    }
                }
            }
            return;
        }

        public updateLeagueInstances(instances: Array<message.LeagueInstanceSimple>) {
            if (!this.info) return;
            this.info.instances = instances;
            return;
        }

        public updataLeagueProcesses(processes: Array<message.ProgressInfo>) {
            if (!this.info || !this.info.info) return;
            this.info.info.processes = processes;

            this.setProcesses();
        }

        // 公会信息
        public get LeagueInfo(): message.LeagueInfo {
            if (!this.info) return null;
            return this.info;
        }

        // 公会基本信息
        public get BaseInfo(): message.LeagueBase {
            if (!this.info) return null;
            return this.info.info;
        }

        // 公会所有成员
        public get Members(): Array<message.MemberInfo> {
            if (!this.info) return null;
            return this.info.members;
        }

        // 我的公会信息
        public get Member(): message.MemberInfo {
            if (!this.info) return null;
            for (let v of this.info.members) {
                if (Game.PlayerInfoSystem.RoleID == v.monarchbase.id) {
                    return v;
                }
            }
            return null;
        }

        // 获取猎人类型所附加的属性值列表
        private skillTypeList: number[][] = [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18]];
        public getSkillValueType(features: number) {// 1-攻击，2-防御，3-辅助
            return this.skillTypeList[features - 1];
        }
        /**
         * 工会技能数值是否除100
         * attType 属性类型 TableEnum.EnumGelAttrib
         */
        public isSkillPercent(attType: number) {
            return attType == TableEnum.EnumGelAttrib.ATTR_HP
                || attType == TableEnum.EnumGelAttrib.ATTR_PHY_ATK
                || attType == TableEnum.EnumGelAttrib.ATTR_PHY_DEF;
        }
        /**
         *  获取工会技能附加值
         *  id 工会技能数据（message.IIKVPairs）里的key
         *  level 工会技能数据（message.IIKVPairs）里的value
         */
        public getSkillValue(id: number, level: number): [number, number] {
            if (level > 0) {
                let table = TableLeagueSkill.Item(id);
                let value = 0;
                for (let i = Math.min(level, table.attri_value.length) - 1; i >= 0; --i) {
                    value += table.attri_value[i];
                }
                return [table.attri_type, value];
            }
            return [0, 0];
        }
        /**
         * 获取所有工会技能列表
         */
        public getSkillList() {
            if (this.Member && this.Member.skillLevel && this.Member.skillLevel.length > 0) {
                return this.Member.skillLevel;
            }
            return null;
        }

        // 公会副本信息
        public get Instances(): Array<message.LeagueInstanceSimple> {
            if (!this.info) return null;
            return this.info.instances;
        }

        // 公会申请列表
        public get Applicants(): Array<message.MemberApply> {
            if (!this.info) return null;
            return this.info.applicants;
        }

        // 获取在线人数
        public getLineNum(): number {
            if (!this.info) return 0;
            let count = 0;
            for (let v of this.info.members) {
                if (v.monarchbase.is_online) count = count + 1;
            }
            return count;
        }

        // 获取公告
        public getNotice(notice: string): string {
            if (notice.indexOf("{") == -1) return notice;
            let json = JSON.parse(notice);
            if (typeof json != "object") return "";
            if (Game.LanguageManager.getLang() in json) return json[Game.LanguageManager.getLang()];
            if ('zhcn' in json) return json['zhcn'];
            if ('en' in json) return json['en'];
            for (let k in json) {
                return json[k];
            }
            return "";
        }

        // 获取所有公会副本
        public getAllInstance(): { [key: string]: TableLeagueInstance } {
            return TableLeagueInstance.Table();
        }

        public updateLeagueBossHp(value) {
            if (this.leagueBoss.bossInfo.monster_pos3.length > 0) {
                this.leagueBoss.bossInfo.monster_pos3[0].curInfo.cur_hp = value;
            }
        }

        ///////////////////////////////////////////////////////////////////////////
        // 网络协议请求

        // 我的公会
        public leagueInfo(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueInfoRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueInfoResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    let leagueInfo = PlayerLeagueSystem.DecompressLeagueInfo(response.body.info);
                    if (leagueInfo != null) {
                        this.updateLeagueInfo(leagueInfo);
                    }

                    Tips.SetTipsOfId(Tips.TAG.LEAGUE);

                    resolve(leagueInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 公会搜索
        public leagueSearch(leagueid: number, key: string, start: number, num: number, is_batch: boolean): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueSearchRequest();
                request.body.leagueId = leagueid;
                request.body.key = key;
                request.body.start = start;
                request.body.num = num;
                request.body.is_batch = is_batch;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueSearchResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.info);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 快速入会
        public leagueApplyQuick(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueApplyQuickRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueApplyQuickResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    let leagueInfo = PlayerLeagueSystem.DecompressLeagueInfo(response.body.info);
                    if (leagueInfo != null) {
                        this.updateLeagueInfo(leagueInfo);
                    }

                    Tips.SetTipsOfId(Tips.TAG.LEAGUE);

                    resolve(leagueInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 加入公会
        public leagueApply(leagueid: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueApplyRequest();
                request.body.leagueid = leagueid;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueApplyResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    if (response.body.info.length == 0) {
                        resolve({ "status": 1 }); // 申请中
                    } else {
                        let leagueInfo = PlayerLeagueSystem.DecompressLeagueInfo(response.body.info);
                        if (leagueInfo != null) {
                            this.updateLeagueInfo(leagueInfo);
                        }

                        resolve({ "status": 0 });
                    }
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, true);
            });
        }

        // 公会创建
        public leagueCreate(name: string): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueCreateRequest();
                request.body.name = name;
                request.body.introduce = TextsConfig.TextConfig_League.joinDefault;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueCreateResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    this.updateLeagueInfo(response.body.info);
                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, true);
            });
        }

        // 公会捐献
        public leagueDonate(type: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueDonateRequest();
                request.body.type = type;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueDonateResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.info.info = response.body.baseInfo;
                    this.updateLeagueMembers(response.body.members);
                    for (let v of this.info.members) {
                        if (Game.PlayerInfoSystem.RoleID == v.monarchbase.id) {
                            v = response.body.members[0];
                        }
                    }

                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, 1);

                    resolve(response);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, true);
            });
        }

        // 工会排行信息查询
        public leagueRankInfo(type: number, start: number, num: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueRankInfoRequest();
                request.body.rank_type = type;
                request.body.start = start;
                request.body.num = num;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueRankInfoResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 公会日志
        public leagueLog(type: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueLogRequest();
                request.body.type = type;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueLogResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.records);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 解散公会
        public leagueDisband(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueDisbandRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueDisbandResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 踢出公会
        public leagueKickOut(roleId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueKickOutRequest();
                request.body.roleId = roleId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueKickOutResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    for (let k in this.info.members) {
                        if (this.info.members[k].monarchbase.id == roleId) {
                            this.info.members.splice(Number(k), 1);
                            break;
                        }
                    }
                    for (let k in this.info.members) {
                        if (this.info.members[k].monarchbase.id == roleId) {
                            this.info.members.splice(Number(k), 1);
                            break;
                        }
                    }
                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 退出公会
        public leagueQuit(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueQuitRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueQuitResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 禅让会长
        public leagueTransfer(roleId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueTransferRequest();
                request.body.roleId = roleId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueTransferResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    this.updateLeagueBase(response.body.info);
                    this.updateLeagueMembers(response.body.members);
                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 更改公会名称
        public leagueModifyName(name: string): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueModifyNameRequest();
                request.body.name = name;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueModifyNameResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    this.updateLeagueBase(response.body.info);
                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 更改公会头像
        public leaguePic(picId: number, picFrame: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeaguePicRequest();
                request.body.picId = picId;
                request.body.picFrame = picFrame;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeaguePicResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    this.info.info.picFrameId = picFrame;
                    this.info.info.picId = picId;
                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 公会设置加入条件
        public leagueJoinCondition(condition: number, level: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueJoinConditionRequest();
                request.body.join_condition = condition; // 加入条件
                request.body.join_level = level; // 加入等级

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueJoinConditionResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.info.info.join_condition = condition;
                    this.info.info.join_level = level;

                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 修改公会公告
        public leagueNotice(notice: string): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueNoticeRequest();
                request.body.notice = notice; // 加入条件

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueNoticeResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.info.info.notice = notice;

                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 修改公会简介
        public leagueIntroduce(introduce: string): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueIntroduceRequest();
                request.body.introduce = introduce; // 简介

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueIntroduceResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.info.info.introduce = introduce;

                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 调整公会成员官职
        public leagueOfficial(roleId: number, official: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueOfficialRequest();
                request.body.roleId = roleId; // 角色ID
                request.body.official = official; // 新职位

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueOfficialResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.updateLeagueMembers(response.body.members);

                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 工会发布招募信息
        public leagueRecruitInfo(recruitInfo: string): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueRecruitInfoRequest();
                request.body.recruitInfo = recruitInfo; // 招募信息

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueRecruitInfoResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.updateLeagueBase(response.body.info);

                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 公会副本信息
        public leagueInstanceInfo(instanceId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueInstanceInfoRequest();
                request.body.instanceId = instanceId; // 副本Id

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueInstanceInfoResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.updateLeagueInstances(response.body.instances);

                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_INSTANCE);

                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        public leagueInstanceList(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueInstanceListRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueInstanceListResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.updateLeagueInstances(response.body.instances);

                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 公会申请处理
        public leagueApplyDeal(roleId: Array<number>, pass: boolean): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueApplyDealRequest();
                request.body.roleId = roleId;
                request.body.pass = pass;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueApplyDealResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    let leagueInfo = PlayerLeagueSystem.DecompressLeagueInfo(response.body.info);
                    if (leagueInfo != null) {
                        this.updateLeagueInfo(leagueInfo);
                    }

                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, 3);

                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        //  公会战斗日志
        public leagueMatchFortressRecord(isSelf: boolean, selfType: number, leagueId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchFortressRecordRequest();
                request.body.is_self = isSelf;
                request.body.self_type = selfType; // 34战斗日志35历史记录
                request.body.league_id = leagueId; // 对方联盟

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchFortressRecordResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response.body.records);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 成员统计
        public leagueMemberStatic(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMemberStaticRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMemberStaticResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response.body.members);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 联赛查看据点
        public leagueMatchFortress(type: number, isGet: boolean): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchFortressRequest();
                request.body.type = type;
                request.body.get_member = isGet;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchFortressResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve({ leagueFortress: response.body.leagueFortress, member_formations: PlayerLeagueSystem.DecompressSimpleMemberFormationZip(response.body.member_formations) });
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 联赛拉取战斗结果
        public leagueMatchBattleResult(battleId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchBattleResultRequest();
                request.body.battle_id = battleId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchBattleResultResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 联赛报名
        public leagueMatchSign(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchSignRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchSignResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.updateLeagueBase(response.body.info);

                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 联赛拉取对手
        public leagueMatchOpponentInfo(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchOpponentInfoRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchOpponentInfoResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve({ opponentInfo: response.body.opponentInfo, is_air: response.body.is_air });
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, true);
            });
        }

        // 联赛拉取对手飞艇
        public leagueMatchOpponentFortress(leagueId: number, type: number, getSelf: boolean = false): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchOpponentFortressRequest();
                request.body.league_id = leagueId;
                request.body.type = type;
                request.body.get_self = getSelf;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchOpponentFortressResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve({ matchInfo: response.body.matchInfo, battleInfo: response.body.battleInfo, selfInfo: response.body.selfInfo, leagueBattles: response.body.leagueBattles });
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 联赛设置据点
        public leagueMatchSetFortress(type: number, member_id: number[], formationIndex: number[], index: number[]): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchSetFortressRequest();
                request.body.type = type;
                request.body.member_id = member_id;
                request.body.formationIndex = formationIndex;
                request.body.index = index;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchSetFortressResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve({});
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 
        public leagueOpenBoss(animalId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueOpenBossRequest();
                request.body.animalId = animalId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueOpenBossResponse>resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    // update leagueBoss
                    this.leagueBoss.bStart = true;
                    this.leagueBoss.bossInfo = response.body.bossInfo;

                    this.updataLeagueProcesses(response.body.processes);

                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 
        public leagueBossScene(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueBossSceneRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueBossSceneResponse>resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }

                    // update leagueBoss
                    this.leagueBoss.bossInfo = response.body.bossInfo;
                    this.leagueBoss.Inspires = response.body.buffIds;
                    this.leagueBoss.RankList = response.body.rankItems;

                    resolve(response.body);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 联盟boss激励
        public leagueBossInspire(inspireType: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueBossInspireRequest();
                request.body.inspireType = inspireType;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueBossInspireResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    // update leagueBoss
                    this.leagueBoss.Inspires = response.body.buffIds;

                    resolve()
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 加入庆功宴场景
        public leaguePartyScene(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeaguePartySceneRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeaguePartySceneResponse>resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    this.updateLeagueMembers(response.body.members);
                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        //庆功宴
        public leagueParty(is_add: boolean): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeaguePartyRequest();
                request.body.is_add = is_add;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeaguePartyResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    this.updateLeagueMembers(response.body.members);

                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        //庆功宴加菜
        public leaguePartyAdd(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeaguePartyAddRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeaguePartyAddResponse>resp;
                    if (response.header.result != 0) {
                        return;
                    }

                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 联赛拉取排行
        public leagueMatchQueryRank(type: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchQueryRankRequest();
                request.body.type = type;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchQueryRankResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response.body.ranks);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 拉取副本怪物
        public leagueInstanceStageInfo(instanceId: number, pos: number = 0): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueInstanceStageInfoRequest();
                request.body.instanceId = instanceId;
                request.body.pos = pos;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueInstanceStageInfoResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    let stageInfo = PlayerLeagueSystem.DecompressLeagueInstanceStageInfo(response.body.stageInfos);
                    this.leagueInstance.leagueInstanceStageInfo[1] = stageInfo;

                    resolve(stageInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 购买挑战次数
        public leagueInstanceBuyTime(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueInstanceBuyTimeRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueInstanceBuyTimeResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    // this.updateLeagueBase(response.body.info);

                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_INSTANCE);

                    resolve(response.body.gameInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 
        public leagueMatchQueryFormation(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueMatchQueryFormationRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueMatchQueryFormationResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve(response.body.formationIndex);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        public leagueInstanceMobReward(instanceId: number, pos: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueInstanceMobRewardRequest();
                request.body.instanceId = instanceId;
                request.body.pos = pos;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueInstanceMobRewardResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_INSTANCE);

                    resolve(response.body.gameInfo);
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 
        public setFormation(formations: Array<message.FormationInfo>): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.SetFormationRequest();
                request.body.formations = formations;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.SetFormationResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_DEFENCE_FORMATE);

                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

        // 添加关系
        public relationAdd(type: number, roleId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.RelationAddRequest();
                request.body.type = type;
                request.body.roleId = roleId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationAddResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }

    }
}