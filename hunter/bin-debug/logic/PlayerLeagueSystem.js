var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 公会系统
    // lizhengqiang
    // 20181212
    var PlayerLeagueSystem = (function () {
        function PlayerLeagueSystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            ///////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////
            // 私有变量
            this.info = null; // 公会数据
            ///////////////////////////////////////////////////////////////////////////
            // 公有变量
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
            // 获取猎人类型所附加的属性值列表
            this.skillTypeList = [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], [13, 14, 15, 16, 17, 18]];
        }
        PlayerLeagueSystem.Decompress = function (data) {
            var para = {};
            para["index"] = 4;
            var inflate = new Zlib.Inflate(data, para);
            return inflate.decompress();
        };
        // 解压LeagueInfo信息
        PlayerLeagueSystem.DecompressLeagueInfo = function (data) {
            if (data.length == 0)
                return null;
            var plain = PlayerLeagueSystem.Decompress(data);
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var leagueInfo = new message.LeagueInfo();
            if (!leagueInfo.parse_bytes(decoder)) {
                console.log("decompress fail");
                return null;
            }
            return leagueInfo;
        };
        // 解压SimpleMemberFormationZip信息
        PlayerLeagueSystem.DecompressSimpleMemberFormationZip = function (data) {
            if (data.length == 0)
                return null;
            var plain = PlayerLeagueSystem.Decompress(data);
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var simpleMemberFormationZip = new message.SimpleMemberFormationZip();
            if (!simpleMemberFormationZip.parse_bytes(decoder)) {
                console.log("decompress fail");
                return null;
            }
            return simpleMemberFormationZip;
        };
        PlayerLeagueSystem.DecompressLeagueInstanceStageInfo = function (data) {
            if (data.length == 0)
                return null;
            var plain = PlayerLeagueSystem.Decompress(data);
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var leagueInstanceStageInfo = new message.LeagueInstanceStageInfo();
            if (!leagueInstanceStageInfo.parse_bytes(decoder)) {
                console.log("decompress fail");
                return null;
            }
            return leagueInstanceStageInfo;
        };
        // 获取段位 return[段位string,logo,textlogo,star]
        PlayerLeagueSystem.GetSegment = function (score) {
            var tbl = zj.TableLeagueMatchScore.Table();
            var length = Object.keys(tbl).length;
            for (var i = 1; i < length; i++) {
                if (score >= tbl[i].score_min && score < tbl[i + 1].score_min) {
                    return _a = {},
                        _a[1] = tbl[i].name,
                        _a[2] = zj.UIConfig.UIConfig_Union.segmentLogo[i - 1],
                        _a[3] = zj.UIConfig.UIConfig_Union.segmentLogoText[i - 1],
                        _a[4] = zj.UIConfig.UIConfig_Union.segmentStar[i - 1],
                        _a;
                }
            }
            return _b = {},
                _b[1] = tbl[length].name,
                _b[2] = zj.UIConfig.UIConfig_Union.segmentLogo[length - 1],
                _b[3] = zj.UIConfig.UIConfig_Union.segmentLogoText[length - 1],
                _b[4] = zj.UIConfig.UIConfig_Union.segmentStar[length - 1],
                _b;
            var _a, _b;
        };
        // 获取星期几
        PlayerLeagueSystem.GetDay = function () {
            var wDay = zj.Game.Controller.serverNow().getDay();
            if (wDay == 0)
                wDay = 7;
            return wDay;
        };
        // 
        PlayerLeagueSystem.GetCurSecond = function (bool) {
            if (bool === void 0) { bool = false; }
            var curTime = zj.Game.Controller.serverNow();
            var curSecond = curTime.getHours() * 3600 + (curTime.getMinutes() - 1) * 60 + curTime.getSeconds();
            if (bool) {
                curSecond = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            }
            return curSecond;
        };
        // 返回当前公会战状态
        PlayerLeagueSystem.getStatus = function () {
            if (PlayerLeagueSystem.GetDay() == 7) {
                if (zj.Game.PlayerLeagueSystem.BaseInfo.match_join) {
                    return zj.TableEnum.Enum.UnionBattleStatus.LadderRegistered; // 排位赛准备状态
                }
                else {
                    return zj.TableEnum.Enum.UnionBattleStatus.LadderNotRegistered; // 排位赛未报名状态
                }
            }
            if (zj.Game.PlayerLeagueSystem.BaseInfo.match_join) {
                if (PlayerLeagueSystem.IsTimeInBattle()) {
                    if (zj.Game.PlayerLeagueSystem.unionBattleInfo.isEmpty || zj.Game.PlayerLeagueSystem.unionBattleInfo.EnemyUnionInfo == null) {
                        return zj.TableEnum.Enum.UnionBattleStatus.LadderRegistered; // 排位赛准备状态
                    }
                    else {
                        return zj.TableEnum.Enum.UnionBattleStatus.Battle; // 战斗状态
                    }
                }
                else {
                    return zj.TableEnum.Enum.UnionBattleStatus.LadderRegistered; // 排位赛准备状态
                }
            }
            else {
                return zj.TableEnum.Enum.UnionBattleStatus.LadderNotRegistered; // 排位赛未报名状态
            }
        };
        // 是否在战斗时间
        PlayerLeagueSystem.IsTimeInBattle = function () {
            var curSecond = PlayerLeagueSystem.GetCurSecond();
            return (curSecond > zj.CommonConfig.league_match_start_close_time[0] + zj.CommonConfig.league_match_match_opponent_time && curSecond < zj.CommonConfig.league_match_start_close_time[1]);
        };
        // 是否需要弹出结算界面
        PlayerLeagueSystem.PushLastSettle = function () {
            var curTime = zj.Game.Controller.serverNow();
            var curSecond = curTime.getHours() * 3600 + (curTime.getMinutes() - 1) * 60 + curTime.getSeconds();
            var dayStr = PlayerLeagueSystem.GetLastSettleData();
            if (zj.Game.PlayerLeagueSystem.unionBattleInfo.UnionStatus != zj.TableEnum.Enum.UnionBattleStatus.Battle
                && !(curTime.getDay() == 1 && curSecond > zj.CommonConfig.league_match_start_close_time[0])
                && !(curTime.getDay() == 2 && curSecond < zj.CommonConfig.league_match_start_close_time[0])) {
                var push = (Number(dayStr) != zj.Tips.GetSaveUnionBattlePushRecord());
                return push;
            }
            return false;
        };
        // 获取上场结算日期
        PlayerLeagueSystem.GetLastSettleData = function () {
            var curTime = zj.Game.Controller.serverNow();
            var curSecond = curTime.getHours() * 3600 + (curTime.getMinutes() - 1) * 60 + curTime.getSeconds();
            var dayStr = "";
            if (curSecond > zj.CommonConfig.league_match_start_close_time[1]) {
                dayStr = curTime.getFullYear().toString() + (curTime.getMonth() + 1).toString() + curTime.getDate().toString();
            }
            else {
                dayStr = curTime.getFullYear().toString() + (curTime.getMonth() + 1).toString() + (curTime.getDate() - 1).toString();
            }
            return dayStr;
        };
        PlayerLeagueSystem.GetTimeStr = function (secTotal, noHour) {
            var s = secTotal % 60;
            var m = Math.floor(secTotal % 3600 / 60);
            var h = Math.floor(secTotal % (3600 * 24) / 3600);
            if (secTotal > 3600 * 24)
                h = 24 + h;
            var str = "";
            if (noHour) {
                str = (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
                return str;
            }
            else {
                str = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
                return str;
            }
        };
        // 获取时间差显示
        PlayerLeagueSystem.GetTimeDiffShow = function (state) {
            var curSecond = PlayerLeagueSystem.GetCurSecond();
            var startTime = zj.CommonConfig.league_match_start_close_time[0];
            var endTime = zj.CommonConfig.league_match_start_close_time[1];
            if (state == zj.TableEnum.Enum.UnionBattleStatus.LadderRegistered) {
                if (curSecond < startTime && PlayerLeagueSystem.GetDay() != 7) {
                    var secDiff = startTime - curSecond;
                    return [zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.timeDiff[0], PlayerLeagueSystem.GetTimeStr(secDiff)), curSecond, PlayerLeagueSystem.GetTimeStr(secDiff)];
                }
                else {
                    var secDiff = 24 * 3600 - curSecond + startTime;
                    if (PlayerLeagueSystem.GetDay() == 6 && curSecond >= endTime) {
                        secDiff = secDiff + 24 * 3600;
                    }
                    return [zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.timeDiff[0], PlayerLeagueSystem.GetTimeStr(secDiff)), curSecond, PlayerLeagueSystem.GetTimeStr(secDiff)];
                }
            }
            else if (state == zj.TableEnum.Enum.UnionBattleStatus.Battle) {
                var secDiff = endTime - curSecond;
                return [zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.timeDiff[1], PlayerLeagueSystem.GetTimeStr(secDiff)), curSecond, PlayerLeagueSystem.GetTimeStr(secDiff)];
            }
            else {
                return ["", 0, "00:00"];
            }
        };
        PlayerLeagueSystem.GetMatchOpponentTime = function () {
            var curSecond = PlayerLeagueSystem.GetCurSecond();
            var overTime = zj.CommonConfig.league_match_start_close_time[0] + zj.CommonConfig.league_match_match_opponent_time;
            var diffTime = overTime - curSecond;
            return PlayerLeagueSystem.GetTimeStr(diffTime);
        };
        PlayerLeagueSystem.GetServerName = function (str) {
            if (str.indexOf("{") == -1)
                return str;
            var json = JSON.parse(str);
            if (!json)
                return "";
            var lang = zj.Game.LanguageManager.getLang().replace("-", "").toLowerCase();
            if (json[lang] == null || json[lang] == undefined)
                return "";
            var arr = json[lang].split("&");
            if (arr && arr.length >= 2)
                return arr[1];
            return "";
        };
        // 获取总分数
        // @param index  具体某一飞艇总分数  可以为空
        PlayerLeagueSystem.GetMaxScore = function (index) {
            var score = 0;
            if (index == undefined) {
                for (var i = 0; i < zj.CommonConfig.league_match_fortress_team_num.length; i++) {
                    score = score + zj.CommonConfig.league_match_fortress_star_socre[i][2] * zj.CommonConfig.league_match_fortress_team_num[i] + zj.CommonConfig.league_match_fortress_extra_socre[i];
                }
            }
            else {
                score = score + zj.CommonConfig.league_match_fortress_star_socre[index - 1][2] * zj.CommonConfig.league_match_fortress_team_num[index - 1] + zj.CommonConfig.league_match_fortress_extra_socre[index - 1];
            }
            return score;
        };
        // 分数计算
        PlayerLeagueSystem.ScoreCalculation = function (scoreData) {
            var score = 0;
            for (var i = 0; i < scoreData.length; i++) {
                var ft = scoreData[i];
                for (var _i = 0, ft_1 = ft; _i < ft_1.length; _i++) {
                    var v = ft_1[_i];
                    score = score + zj.CommonConfig.league_match_fortress_star_socre[i][v - 1];
                }
                if (ft.length == zj.CommonConfig.league_match_fortress_team_num[i]) {
                    score = score + zj.CommonConfig.league_match_fortress_extra_socre[i];
                }
            }
            return score;
        };
        // 阵容是否显示加号
        PlayerLeagueSystem.FormationShowAdd = function (formation) {
            var tbl = {};
            for (var k in formation) {
                if (Number(k) == 1 && formation[k].general_id == 0) {
                    tbl[k] = true;
                }
                else {
                    tbl[k] = false;
                }
            }
            return tbl;
        };
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerLeagueSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LEAGUE_INFO_CHANGE, this.onLeagueInfoChange, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_MEMBER_INFO_CHANGE, this.onMemberInfoChange, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_APPLY, this.onNoticeLeagueApply, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, this.onNoticeLeagueMember, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_INSTANCE, this.onNoticeLeagueInstance, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS, this.onNoticeLeagueBoss, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS_RANK, this.onNoticeLeagueBossRank, this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS_PARTY, this.onNoticeLeagueBossParty, this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUEBOSSBATTLE, this.onLeagueBossBattle, this);
        };
        PlayerLeagueSystem.prototype.uninit = function () {
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
        };
        PlayerLeagueSystem.prototype.setProcesses = function () {
            if (!this.info || !this.info.info)
                return;
            var time = Math.floor(egret.getTimer() / 1000);
            for (var _i = 0, _a = this.info.info.processes; _i < _a.length; _i++) {
                var v = _a[_i];
                v.leftTime = v.leftTime + time;
            }
        };
        PlayerLeagueSystem.prototype.onLeagueInfoChange = function (ev) {
            this.info = ev.data;
            if (!this.info)
                return;
            this.setProcesses();
        };
        PlayerLeagueSystem.prototype.onMemberInfoChange = function (ev) {
            if (!this.info)
                return;
            var member = ev.data;
            if (member == undefined || member == null)
                return;
            for (var i = 0; i < this.info.members.length; i++) {
                if (zj.Game.PlayerInfoSystem.RoleID == this.info.members[i].monarchbase.id) {
                    this.info.members[i] = member;
                }
            }
        };
        PlayerLeagueSystem.prototype.onNoticeLeagueApply = function (ev) {
            if (!this.info)
                return;
            var body = ev.data.body;
            if (!body)
                return;
            var applyInfo = body.applyInfo[0];
            if (!applyInfo)
                return;
            this.info.applicants.push(applyInfo);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_APPLY);
        };
        PlayerLeagueSystem.prototype.onNoticeLeagueMember = function (ev) {
            var _this = this;
            var update = function () {
                if (!_this.info)
                    return;
                var body = ev.data.body;
                if (!body)
                    return;
                if (body.memberCount < _this.info.members.length) {
                    for (var i = 0; i < _this.info.members.length; i++) {
                        if (_this.info.members[i].monarchbase.id == body.value) {
                            _this.info.members.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (body.memberCount > _this.info.members.length) {
                    for (var _i = 0, _a = body.members; _i < _a.length; _i++) {
                        var v = _a[_i];
                        _this.info.members.push(v);
                    }
                }
            };
            if (!this.info) {
                this.leagueInfo().then(function (leagueInfo) {
                    update();
                    zj.Game.PlayerInfoSystem.LeagueId = _this.info.info.leagueId;
                });
            }
            else {
                update();
            }
        };
        PlayerLeagueSystem.prototype.onNoticeLeagueInstance = function (ev) {
            if (!this.info)
                return;
            var body = ev.data.body;
            if (!body)
                return;
            var flag = false;
            for (var i = 0; i < this.info.instances.length; i++) {
                if (this.info.instances[i].instance_id == body.instances[0].instance_id) {
                    this.info.instances[i] = body.instances[0];
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                this.info.instances.push(body.instances[0]);
            }
            zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_INSTANCE);
        };
        PlayerLeagueSystem.prototype.onNoticeLeagueBoss = function (ev) {
            if (!this.info)
                return;
            var body = ev.data.body;
            if (!body)
                return;
            this.leagueBoss.bStart = false;
            this.leagueBoss.bSuccess = body.is_win;
            this.leagueBoss.RankList = body.rankItems;
            this.leagueBoss.KillName = body.kill_name;
            for (var _i = 0, _a = body.progresses; _i < _a.length; _i++) {
                var v = _a[_i];
                for (var i = 0; i < this.info.info.processes.length; i++) {
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
        };
        PlayerLeagueSystem.prototype.onNoticeLeagueBossParty = function (ev) {
            if (!this.info)
                return;
            var body = ev.data.body;
            if (!body)
                return;
            for (var _i = 0, _a = body.progresses; _i < _a.length; _i++) {
                var v = _a[_i];
                for (var i = 0; i < this.info.info.processes.length; i++) {
                    if (v.type == this.info.info.processes[i].type) {
                        this.info.info.processes[i] = v;
                        break;
                    }
                }
            }
            this.setProcesses();
        };
        PlayerLeagueSystem.prototype.onNoticeLeagueBossRank = function (ev) {
            if (!this.info)
                return;
            var body = ev.data.body;
            if (!body)
                return;
            this.leagueBoss.RankList = body.rankItems;
        };
        PlayerLeagueSystem.prototype.onLeagueBossBattle = function (ev) {
            if (!this.info)
                return;
            var body = ev.data;
            if (!body)
                return;
            for (var _i = 0, _a = body.members; _i < _a.length; _i++) {
                var v = _a[_i];
                for (var i = 0; i < this.info.members.length; i++) {
                    if (v.monarchbase.id == this.info.members[i].monarchbase.id) {
                        this.info.members[i] = v;
                        break;
                    }
                }
            }
            for (var _b = 0, _c = body.progresses; _b < _c.length; _b++) {
                var v = _c[_b];
                for (var i = 0; i < this.info.info.processes.length; i++) {
                    if (v.type == this.info.info.processes[i].type) {
                        this.info.info.processes[i] = v;
                        break;
                    }
                }
            }
            // this.BaseInfo();
            this.setProcesses();
        };
        // 更新数据
        PlayerLeagueSystem.prototype.updateLeagueInfo = function (leagueInfo) {
            this.info = leagueInfo;
            this.setProcesses();
            return;
        };
        PlayerLeagueSystem.prototype.updateLeagueBase = function (leagueBase) {
            if (!this.info)
                return;
            this.info.info = leagueBase;
            this.setProcesses();
            return;
        };
        PlayerLeagueSystem.prototype.updateLeagueMembers = function (leagueMembers) {
            if (!this.info)
                return;
            for (var _i = 0, leagueMembers_1 = leagueMembers; _i < leagueMembers_1.length; _i++) {
                var v = leagueMembers_1[_i];
                for (var i = 0; i < this.info.members.length; i++) {
                    if (v.monarchbase.id == this.info.members[i].monarchbase.id) {
                        this.info.members[i] = v;
                        break;
                    }
                }
            }
            return;
        };
        PlayerLeagueSystem.prototype.updateLeagueInstances = function (instances) {
            if (!this.info)
                return;
            this.info.instances = instances;
            return;
        };
        PlayerLeagueSystem.prototype.updataLeagueProcesses = function (processes) {
            if (!this.info || !this.info.info)
                return;
            this.info.info.processes = processes;
            this.setProcesses();
        };
        Object.defineProperty(PlayerLeagueSystem.prototype, "LeagueInfo", {
            // 公会信息
            get: function () {
                if (!this.info)
                    return null;
                return this.info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerLeagueSystem.prototype, "BaseInfo", {
            // 公会基本信息
            get: function () {
                if (!this.info)
                    return null;
                return this.info.info;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerLeagueSystem.prototype, "Members", {
            // 公会所有成员
            get: function () {
                if (!this.info)
                    return null;
                return this.info.members;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerLeagueSystem.prototype, "Member", {
            // 我的公会信息
            get: function () {
                if (!this.info)
                    return null;
                for (var _i = 0, _a = this.info.members; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (zj.Game.PlayerInfoSystem.RoleID == v.monarchbase.id) {
                        return v;
                    }
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        PlayerLeagueSystem.prototype.getSkillValueType = function (features) {
            return this.skillTypeList[features - 1];
        };
        /**
         * 工会技能数值是否除100
         * attType 属性类型 TableEnum.EnumGelAttrib
         */
        PlayerLeagueSystem.prototype.isSkillPercent = function (attType) {
            return attType == zj.TableEnum.EnumGelAttrib.ATTR_HP
                || attType == zj.TableEnum.EnumGelAttrib.ATTR_PHY_ATK
                || attType == zj.TableEnum.EnumGelAttrib.ATTR_PHY_DEF;
        };
        /**
         *  获取工会技能附加值
         *  id 工会技能数据（message.IIKVPairs）里的key
         *  level 工会技能数据（message.IIKVPairs）里的value
         */
        PlayerLeagueSystem.prototype.getSkillValue = function (id, level) {
            if (level > 0) {
                var table = zj.TableLeagueSkill.Item(id);
                var value = 0;
                for (var i = Math.min(level, table.attri_value.length) - 1; i >= 0; --i) {
                    value += table.attri_value[i];
                }
                return [table.attri_type, value];
            }
            return [0, 0];
        };
        /**
         * 获取所有工会技能列表
         */
        PlayerLeagueSystem.prototype.getSkillList = function () {
            if (this.Member && this.Member.skillLevel && this.Member.skillLevel.length > 0) {
                return this.Member.skillLevel;
            }
            return null;
        };
        Object.defineProperty(PlayerLeagueSystem.prototype, "Instances", {
            // 公会副本信息
            get: function () {
                if (!this.info)
                    return null;
                return this.info.instances;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerLeagueSystem.prototype, "Applicants", {
            // 公会申请列表
            get: function () {
                if (!this.info)
                    return null;
                return this.info.applicants;
            },
            enumerable: true,
            configurable: true
        });
        // 获取在线人数
        PlayerLeagueSystem.prototype.getLineNum = function () {
            if (!this.info)
                return 0;
            var count = 0;
            for (var _i = 0, _a = this.info.members; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.monarchbase.is_online)
                    count = count + 1;
            }
            return count;
        };
        // 获取公告
        PlayerLeagueSystem.prototype.getNotice = function (notice) {
            if (notice.indexOf("{") == -1)
                return notice;
            var json = JSON.parse(notice);
            if (typeof json != "object")
                return "";
            if (zj.Game.LanguageManager.getLang() in json)
                return json[zj.Game.LanguageManager.getLang()];
            if ('zhcn' in json)
                return json['zhcn'];
            if ('en' in json)
                return json['en'];
            for (var k in json) {
                return json[k];
            }
            return "";
        };
        // 获取所有公会副本
        PlayerLeagueSystem.prototype.getAllInstance = function () {
            return zj.TableLeagueInstance.Table();
        };
        PlayerLeagueSystem.prototype.updateLeagueBossHp = function (value) {
            if (this.leagueBoss.bossInfo.monster_pos3.length > 0) {
                this.leagueBoss.bossInfo.monster_pos3[0].curInfo.cur_hp = value;
            }
        };
        ///////////////////////////////////////////////////////////////////////////
        // 网络协议请求
        // 我的公会
        PlayerLeagueSystem.prototype.leagueInfo = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueInfoRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    var leagueInfo = PlayerLeagueSystem.DecompressLeagueInfo(response.body.info);
                    if (leagueInfo != null) {
                        _this.updateLeagueInfo(leagueInfo);
                    }
                    zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE);
                    resolve(leagueInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 公会搜索
        PlayerLeagueSystem.prototype.leagueSearch = function (leagueid, key, start, num, is_batch) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueSearchRequest();
                request.body.leagueId = leagueid;
                request.body.key = key;
                request.body.start = start;
                request.body.num = num;
                request.body.is_batch = is_batch;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.info);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 快速入会
        PlayerLeagueSystem.prototype.leagueApplyQuick = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueApplyQuickRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    var leagueInfo = PlayerLeagueSystem.DecompressLeagueInfo(response.body.info);
                    if (leagueInfo != null) {
                        _this.updateLeagueInfo(leagueInfo);
                    }
                    zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE);
                    resolve(leagueInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 加入公会
        PlayerLeagueSystem.prototype.leagueApply = function (leagueid) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueApplyRequest();
                request.body.leagueid = leagueid;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    if (response.body.info.length == 0) {
                        resolve({ "status": 1 }); // 申请中
                    }
                    else {
                        var leagueInfo = PlayerLeagueSystem.DecompressLeagueInfo(response.body.info);
                        if (leagueInfo != null) {
                            _this.updateLeagueInfo(leagueInfo);
                        }
                        resolve({ "status": 0 });
                    }
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, true);
            });
        };
        // 公会创建
        PlayerLeagueSystem.prototype.leagueCreate = function (name) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueCreateRequest();
                request.body.name = name;
                request.body.introduce = zj.TextsConfig.TextConfig_League.joinDefault;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueInfo(response.body.info);
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, true);
            });
        };
        // 公会捐献
        PlayerLeagueSystem.prototype.leagueDonate = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueDonateRequest();
                request.body.type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.info.info = response.body.baseInfo;
                    _this.updateLeagueMembers(response.body.members);
                    for (var _i = 0, _a = _this.info.members; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (zj.Game.PlayerInfoSystem.RoleID == v.monarchbase.id) {
                            v = response.body.members[0];
                        }
                    }
                    zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, 1);
                    resolve(response);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, true);
            });
        };
        // 工会排行信息查询
        PlayerLeagueSystem.prototype.leagueRankInfo = function (type, start, num) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueRankInfoRequest();
                request.body.rank_type = type;
                request.body.start = start;
                request.body.num = num;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 公会日志
        PlayerLeagueSystem.prototype.leagueLog = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueLogRequest();
                request.body.type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.records);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 解散公会
        PlayerLeagueSystem.prototype.leagueDisband = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueDisbandRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 踢出公会
        PlayerLeagueSystem.prototype.leagueKickOut = function (roleId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueKickOutRequest();
                request.body.roleId = roleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    for (var k in _this.info.members) {
                        if (_this.info.members[k].monarchbase.id == roleId) {
                            _this.info.members.splice(Number(k), 1);
                            break;
                        }
                    }
                    for (var k in _this.info.members) {
                        if (_this.info.members[k].monarchbase.id == roleId) {
                            _this.info.members.splice(Number(k), 1);
                            break;
                        }
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 退出公会
        PlayerLeagueSystem.prototype.leagueQuit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueQuitRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 禅让会长
        PlayerLeagueSystem.prototype.leagueTransfer = function (roleId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueTransferRequest();
                request.body.roleId = roleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueBase(response.body.info);
                    _this.updateLeagueMembers(response.body.members);
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 更改公会名称
        PlayerLeagueSystem.prototype.leagueModifyName = function (name) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueModifyNameRequest();
                request.body.name = name;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueBase(response.body.info);
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 更改公会头像
        PlayerLeagueSystem.prototype.leaguePic = function (picId, picFrame) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeaguePicRequest();
                request.body.picId = picId;
                request.body.picFrame = picFrame;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.info.info.picFrameId = picFrame;
                    _this.info.info.picId = picId;
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 公会设置加入条件
        PlayerLeagueSystem.prototype.leagueJoinCondition = function (condition, level) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueJoinConditionRequest();
                request.body.join_condition = condition; // 加入条件
                request.body.join_level = level; // 加入等级
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.info.info.join_condition = condition;
                    _this.info.info.join_level = level;
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 修改公会公告
        PlayerLeagueSystem.prototype.leagueNotice = function (notice) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueNoticeRequest();
                request.body.notice = notice; // 加入条件
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.info.info.notice = notice;
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 修改公会简介
        PlayerLeagueSystem.prototype.leagueIntroduce = function (introduce) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueIntroduceRequest();
                request.body.introduce = introduce; // 简介
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.info.info.introduce = introduce;
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 调整公会成员官职
        PlayerLeagueSystem.prototype.leagueOfficial = function (roleId, official) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueOfficialRequest();
                request.body.roleId = roleId; // 角色ID
                request.body.official = official; // 新职位
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueMembers(response.body.members);
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 工会发布招募信息
        PlayerLeagueSystem.prototype.leagueRecruitInfo = function (recruitInfo) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueRecruitInfoRequest();
                request.body.recruitInfo = recruitInfo; // 招募信息
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueBase(response.body.info);
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 公会副本信息
        PlayerLeagueSystem.prototype.leagueInstanceInfo = function (instanceId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueInstanceInfoRequest();
                request.body.instanceId = instanceId; // 副本Id
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueInstances(response.body.instances);
                    zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_INSTANCE);
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerLeagueSystem.prototype.leagueInstanceList = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueInstanceListRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueInstances(response.body.instances);
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 公会申请处理
        PlayerLeagueSystem.prototype.leagueApplyDeal = function (roleId, pass) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueApplyDealRequest();
                request.body.roleId = roleId;
                request.body.pass = pass;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    var leagueInfo = PlayerLeagueSystem.DecompressLeagueInfo(response.body.info);
                    if (leagueInfo != null) {
                        _this.updateLeagueInfo(leagueInfo);
                    }
                    zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, 3);
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        //  公会战斗日志
        PlayerLeagueSystem.prototype.leagueMatchFortressRecord = function (isSelf, selfType, leagueId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchFortressRecordRequest();
                request.body.is_self = isSelf;
                request.body.self_type = selfType; // 34战斗日志35历史记录
                request.body.league_id = leagueId; // 对方联盟
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.records);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 成员统计
        PlayerLeagueSystem.prototype.leagueMemberStatic = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMemberStaticRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.members);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 联赛查看据点
        PlayerLeagueSystem.prototype.leagueMatchFortress = function (type, isGet) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchFortressRequest();
                request.body.type = type;
                request.body.get_member = isGet;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve({ leagueFortress: response.body.leagueFortress, member_formations: PlayerLeagueSystem.DecompressSimpleMemberFormationZip(response.body.member_formations) });
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 联赛拉取战斗结果
        PlayerLeagueSystem.prototype.leagueMatchBattleResult = function (battleId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchBattleResultRequest();
                request.body.battle_id = battleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 联赛报名
        PlayerLeagueSystem.prototype.leagueMatchSign = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchSignRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueBase(response.body.info);
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 联赛拉取对手
        PlayerLeagueSystem.prototype.leagueMatchOpponentInfo = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchOpponentInfoRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve({ opponentInfo: response.body.opponentInfo, is_air: response.body.is_air });
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, true);
            });
        };
        // 联赛拉取对手飞艇
        PlayerLeagueSystem.prototype.leagueMatchOpponentFortress = function (leagueId, type, getSelf) {
            var _this = this;
            if (getSelf === void 0) { getSelf = false; }
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchOpponentFortressRequest();
                request.body.league_id = leagueId;
                request.body.type = type;
                request.body.get_self = getSelf;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve({ matchInfo: response.body.matchInfo, battleInfo: response.body.battleInfo, selfInfo: response.body.selfInfo, leagueBattles: response.body.leagueBattles });
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 联赛设置据点
        PlayerLeagueSystem.prototype.leagueMatchSetFortress = function (type, member_id, formationIndex, index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchSetFortressRequest();
                request.body.type = type;
                request.body.member_id = member_id;
                request.body.formationIndex = formationIndex;
                request.body.index = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve({});
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 
        PlayerLeagueSystem.prototype.leagueOpenBoss = function (animalId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueOpenBossRequest();
                request.body.animalId = animalId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    // update leagueBoss
                    _this.leagueBoss.bStart = true;
                    _this.leagueBoss.bossInfo = response.body.bossInfo;
                    _this.updataLeagueProcesses(response.body.processes);
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 
        PlayerLeagueSystem.prototype.leagueBossScene = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueBossSceneRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    // update leagueBoss
                    _this.leagueBoss.bossInfo = response.body.bossInfo;
                    _this.leagueBoss.Inspires = response.body.buffIds;
                    _this.leagueBoss.RankList = response.body.rankItems;
                    resolve(response.body);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 联盟boss激励
        PlayerLeagueSystem.prototype.leagueBossInspire = function (inspireType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueBossInspireRequest();
                request.body.inspireType = inspireType;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    // update leagueBoss
                    _this.leagueBoss.Inspires = response.body.buffIds;
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 加入庆功宴场景
        PlayerLeagueSystem.prototype.leaguePartyScene = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeaguePartySceneRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        // reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueMembers(response.body.members);
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        //庆功宴
        PlayerLeagueSystem.prototype.leagueParty = function (is_add) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeaguePartyRequest();
                request.body.is_add = is_add;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    _this.updateLeagueMembers(response.body.members);
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        //庆功宴加菜
        PlayerLeagueSystem.prototype.leaguePartyAdd = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeaguePartyAddRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 联赛拉取排行
        PlayerLeagueSystem.prototype.leagueMatchQueryRank = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchQueryRankRequest();
                request.body.type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.ranks);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 拉取副本怪物
        PlayerLeagueSystem.prototype.leagueInstanceStageInfo = function (instanceId, pos) {
            var _this = this;
            if (pos === void 0) { pos = 0; }
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueInstanceStageInfoRequest();
                request.body.instanceId = instanceId;
                request.body.pos = pos;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    var stageInfo = PlayerLeagueSystem.DecompressLeagueInstanceStageInfo(response.body.stageInfos);
                    _this.leagueInstance.leagueInstanceStageInfo[1] = stageInfo;
                    resolve(stageInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 购买挑战次数
        PlayerLeagueSystem.prototype.leagueInstanceBuyTime = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueInstanceBuyTimeRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    // this.updateLeagueBase(response.body.info);
                    zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_INSTANCE);
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 
        PlayerLeagueSystem.prototype.leagueMatchQueryFormation = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueMatchQueryFormationRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.formationIndex);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        PlayerLeagueSystem.prototype.leagueInstanceMobReward = function (instanceId, pos) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueInstanceMobRewardRequest();
                request.body.instanceId = instanceId;
                request.body.pos = pos;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_INSTANCE);
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 
        PlayerLeagueSystem.prototype.setFormation = function (formations) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.SetFormationRequest();
                request.body.formations = formations;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    zj.Tips.SetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_DEFENCE_FORMATE);
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        // 添加关系
        PlayerLeagueSystem.prototype.relationAdd = function (type, roleId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.RelationAddRequest();
                request.body.type = type;
                request.body.roleId = roleId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve();
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        return PlayerLeagueSystem;
    }());
    zj.PlayerLeagueSystem = PlayerLeagueSystem;
    __reflect(PlayerLeagueSystem.prototype, "zj.PlayerLeagueSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerLeagueSystem.js.map