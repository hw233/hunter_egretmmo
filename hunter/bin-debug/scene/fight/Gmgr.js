var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var battleSpeedTbl = [1.0, 1.5, 2];
    var Gmgr = (function () {
        function Gmgr() {
            //public static upY = 0;			// 适配后地面整体上移位置
            //public static layerId : number = 0;
            //public static floor : number = 0;
            //public static ground : number = 0;
            //public static spineX_scale : number = 1.0
            //public static fightType: number = 0; // 战斗类型
            //public static bReplay = false; // 战斗重拨状态
            // battlespeed
            //public static battleSpeed = 1.0;
            // adjust
            this.upY = 0; // 适配后地面整体上移位置
            this.floor = 0; // 地面高度
            this.ground = 0; // for test
            this.offsetX = 0; // 适配偏移x
            this.offsetY = 0; // 适配偏移y
            this.spineX_scale = 1.0;
            this.spineX_rpg_scale = 0.5;
            this.battleFormulaValue = 16500;
            // gameInfo
            this.layerId = 0; // 当前所在场景
            this.preLayerId = 0; // 先前所在场景
            this.fightType = 0; // 战斗类型
            this.fightTalentType = 0; // 天赋战斗类型
            this.replaySkipType = zj.TableEnum.TableEnumReportSkipType.REPORT_SKIP_NONE;
            this.atomicCode = 0; // 战斗识别码
            this.arenaRoleId = -1; // 竞技场当前角色id(协议专用)
            this.arenaRank = -1; // 竞技场排名(我方计算专用)
            this.arenaBestRank = -1; // 竞技场最佳排名(我方计算专用)
            //当前正在播放的背景音乐
            this.curSoundId = 0;
            this.hitSoundEffectNum = 0; // 每帧命中音效限制
            this.bPause = false; // 非暂停状态
            this.bFightAuto = false; // 是否是自动打怪状态 
            this.bReplay = false; // 战斗重播状态
            this.bTeachBattle = false; // 战斗教学剧情状态  
            this.bQuickFight = false; // 是否快捷战斗开启
            this.bQuickReplay = false; // 快捷回放 
            this.bLoginByName = false; // 是否名字登陆
            this.generalId = 0; // 界面当前武将
            this.hero_main = null; // 武将界面
            // pk
            this.pkRoleId = -1; // 切磋角色id
            this.pkRoleGroupId = -1; // 切磋角色区id
            this.pkBattleType = -1; // 切磋类型
            // mine
            this.mineRoleId = -1; // 抢矿当前角色id(协议专用)
            // tower
            this.towerCell = -1; // 爬塔当前进行的层级
            this.bDisconnectNet = false;
            this.bInLoading = false;
            this.bEntryWorldBoss = false;
            this.bReEntryWorldBoss = false;
            this.bEntryUnionBoss = false;
            this.bReEntryUnionBoss = false;
            this.bGoLogin = false;
            this.bWillGoRpg = false;
            // teach
            this.bTeachSkillEnd_1_5 = false;
            this.bTeachHelp_1_7 = false;
            this.bTeachHelp_1_10 = false;
            this.fakeSupportIds = [];
            // adviser
            this.leftAdviserId = -1;
            this.rightAdviserId = -1;
            this.adviserLeftInfos = null;
            this.adviserRightInfos = null;
            this.strategyLeftInfo = null;
            this.strategyRightInfo = null;
            this.strategyComposeLeftTbl = [];
            this.strategyComposeRightTbl = [];
            this.strategyWordTbl = [];
            this.strategySkills = [];
            this.adviserSkills = {};
            this.adviserLeftAttriTbl = [];
            this.adviserRightAttriTbl = [];
            this.leagueSkill = {};
            this.pokedexSkill = {};
            this.petSkill = {};
            this.titleSkill = {};
            this.skinSkill = {};
            // buffs
            this.buffLeftAttriTbl = [];
            this.buffRightAttriTbl = [];
            this.myUseBuffs = [];
            // artifact
            this.artifactLeftTbl = [];
            this.artifactRightTbl = [];
            // rand    
            this.lcgrandcnt = 0;
            // atuo
            this.backupAutoTbl = [];
            this.backupSpeedTbl = [];
            // generalLife
            this.generalLifeTalent = [];
            // battlespeed
            this.battleSpeed = 1.0;
            this.bakeSpeedIndex = 1.0;
            this.firstTouchSpeed = false;
            // starcraft
            this.starcraftIndex = -1;
            this.starcraftMax = -1;
            this.bakeupContendCoin = 0;
            this.bakeupContendScore = 0;
            this.singleRank = 0; //  跨服战排名
            this.singleScore = 0; //  跨服战积分
            this.singleHonor = 0; //  荣誉币
            // wonderland
            this.rpgObjectId = 0;
            // debug
            this.debugLocalFight = false;
            // cache skill
            this.relatedAsynDataId = [];
            // boss info
            this.pveBossinfo = null;
            // talent info
            this.everybodyTalent = {};
            this.personalTalent = {};
            // pokedex
            this.pokedexTipsTbl = [];
            // battle continue
            this.bContinueBattle = false;
            this.bStopContinueFromBattle = false;
            this.currContinueBattleSum = 0;
            this.maxContinueBattleSum = 0;
            // aiSpeed
            this.aiSpeedList = [];
            // other
            this.offsety = 0;
            this.up_y = 0;
            this.formatRightWholeGels = [];
            this.skillOnlyId = -1;
            this.bInSceneFight = false;
            this.matchEnemyName = "";
            this.seed = 0;
        }
        Gmgr.prototype.isKeepContinueUI = function () {
            if (this.bContinueBattle) {
                return true;
            }
            return false;
        };
        Gmgr.prototype.setFightType = function (eType) {
            this.fightType = eType;
        };
        Gmgr.prototype.setBattleSpeed = function (speedIndex) {
            this.battleSpeed = zj.ConstantConfig_BattleTbl.BATTLE_AUTO_SPEED[speedIndex];
        };
        Gmgr.prototype.setFightTalentType = function (eType) {
            this.fightTalentType = eType;
        };
        Gmgr.prototype.setLayerId = function (eId) {
            this.layerId = eId;
        };
        Gmgr.prototype.getLayerId = function () {
            return this.layerId;
        };
        Gmgr.prototype.InitInfo = function () {
            // body
            this.offsetX = 0;
            this.offsety = 0;
            this.up_y = this.offsety / 2;
            this.floor = Math.floor((this.up_y + 230) / (zj.UIManager.StageWidth / 960));
            this.ground = this.floor;
        };
        Gmgr.prototype.atomicVary = function () {
            this.atomicCode = this.atomicCode + 1;
        };
        Gmgr.prototype.getAtomic = function () {
            return this.atomicCode;
        };
        //是否是教学的结算界面
        Gmgr.prototype.isTeachBattleEnd = function () {
            var tag = false;
            if (zj.Game.TeachSystem.curPart != -1 && (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE)) {
                tag = true;
            }
            return tag;
        };
        Gmgr.prototype.bInAIFightType = function () {
            if (Gmgr.Instance.bEntryUnionBoss == true) {
                return 3;
            }
            if (Gmgr.Instance.bEntryWorldBoss == true) {
                return 2;
            }
            if (Gmgr.Instance.bInSceneFight == true) {
                if (this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL
                    || this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE
                    || this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY
                    || this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP
                    || this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER
                    || this.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER
                    || this.fightType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK
                    || this.fightType == message.EFormationType.FORMATION_TYPE_WANTED
                    || this.fightType == message.EFormationType.FORMATION_TYPE_TRAINING
                    || this.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS
                    || this.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE
                    || this.fightType == message.EFormationType.FORMATION_TYPE_WONDERLAND
                    || this.fightType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
                    || this.fightType == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK
                    || this.fightType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT
                    || this.fightType == message.EFormationType.FORMATION_TYPE_ZORK
                    || this.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS
                    || this.fightType == message.EFormationType.FORMATION_TYPE_WANTED_ENEMY_CAMP
                    || this.fightType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE
                    || this.fightType == message.EFormationType.FORMATION_TYPE_GENERAL_LIFE_STAT) {
                    return 4;
                }
                else if (this.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_REAL_PK) {
                    return 1;
                }
                else if (this.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_WORLD_BOSS) {
                    return 2;
                }
                else if (this.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_UNION_BOSS) {
                    return 3;
                }
                else if (this.fightType == zj.TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                    return 5;
                }
            }
        };
        Gmgr.prototype.checkContinueBattleSettle = function (bWin, mobId) {
            var isPowerEnough = true;
            if (mobId != null && Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                var floor_info = zj.TableWanted.Item(mobId);
                if (zj.Game.PlayerInfoSystem.Power < floor_info.battle_consume) {
                    isPowerEnough = false;
                }
            }
            if ((!isPowerEnough && Gmgr.Instance.bContinueBattle) || (bWin && ((Gmgr.Instance.bContinueBattle && this.isContinueNumMax()) || Gmgr.Instance.bStopContinueFromBattle))
                || (!bWin && Gmgr.Instance.bContinueBattle)) {
                //PushUI("HXH_SuccessionBattleDrop");
                this.bContinueBattle = false;
                this.bStopContinueFromBattle = false;
                return true;
            }
            return false;
        };
        Gmgr.prototype.isContinueNumMax = function () {
            if (this.currContinueBattleSum >= this.maxContinueBattleSum) {
                return true;
            }
            return false;
        };
        Gmgr.prototype.isKeepContinueBattle = function () {
            if (this.bContinueBattle && !this.isContinueNumMax() && !this.bStopContinueFromBattle) {
                return true;
            }
            return false;
        };
        Gmgr.prototype.autoContinueBattleNum = function () {
            if (Gmgr.Instance.bContinueBattle) {
                this.currContinueBattleSum = this.currContinueBattleSum + 1;
                return true;
            }
            return false;
        };
        /**
         * 上阵连续挑战
         */
        Gmgr.prototype.clearContinueBattleData = function () {
            zj.Game.PlayerFormationSystem.continueBattleDropItems = [];
            zj.Game.PlayerFormationSystem.continueBattleDropPotatos = [];
            this.currContinueBattleSum = 0;
        };
        Gmgr.prototype.etReplaySkipType = function (eType) {
            this.replaySkipType = eType;
        };
        Gmgr.Instance = new Gmgr();
        return Gmgr;
    }());
    zj.Gmgr = Gmgr;
    __reflect(Gmgr.prototype, "zj.Gmgr");
})(zj || (zj = {}));
//# sourceMappingURL=Gmgr.js.map