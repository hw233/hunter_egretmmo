namespace zj {


    let battleSpeedTbl = [1.0, 1.5, 2]

    export class Gmgr {

        public static Instance = new Gmgr();

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
        public upY = 0;			// 适配后地面整体上移位置
        public floor = 0; 			// 地面高度
        public ground = 0;		    // for test
        public offsetX = 0;		// 适配偏移x
        public offsetY = 0;		// 适配偏移y
        public spineX_scale = 1.0;
        public spineX_rpg_scale = 0.5;
        public battleFormulaValue = 16500;

        // gameInfo
        public layerId = 0;		// 当前所在场景
        public preLayerId = 0;     // 先前所在场景
        public fightType = 0;		// 战斗类型
        public fightTalentType = 0;// 天赋战斗类型
        public replaySkipType = TableEnum.TableEnumReportSkipType.REPORT_SKIP_NONE;
        public atomicCode = 0;     // 战斗识别码

        public arenaRoleId = -1;       // 竞技场当前角色id(协议专用)
        public arenaRank = -1;         // 竞技场排名(我方计算专用)
        public arenaBestRank = -1;     // 竞技场最佳排名(我方计算专用)

        //当前正在播放的背景音乐
        public curSoundId = 0;
        public hitSoundEffectNum = 0;	// 每帧命中音效限制


        public bPause = false;         // 非暂停状态
        public bFightAuto = false;     // 是否是自动打怪状态 
        public bReplay = false;        // 战斗重播状态
        public bTeachBattle = false;   // 战斗教学剧情状态  
        public bQuickFight = false;    // 是否快捷战斗开启
        public bQuickReplay = false;   // 快捷回放 
        public bLoginByName = false;   // 是否名字登陆

        public generalId = 0;          // 界面当前武将
        public hero_main = null;        // 武将界面


        // pk
        public pkRoleId = -1;          // 切磋角色id
        public pkRoleGroupId = -1;     // 切磋角色区id
        public pkBattleType = -1;      // 切磋类型

        // mine
        public mineRoleId = -1;        // 抢矿当前角色id(协议专用)

        // tower
        public towerCell = -1;         // 爬塔当前进行的层级

        public bDisconnectNet = false;
        public bInLoading = false;
        public bEntryWorldBoss = false;
        public bReEntryWorldBoss = false;
        public bEntryUnionBoss = false;
        public bReEntryUnionBoss = false;
        public bGoLogin = false;
        public bWillGoRpg = false;

        // teach
        public bTeachSkillEnd_1_5 = false;
        public bTeachHelp_1_7 = false;
        public bTeachHelp_1_10 = false;
        public fakeSupportIds = [];

        // adviser
        public leftAdviserId = -1;
        public rightAdviserId = -1;
        public adviserLeftInfos = null;
        public adviserRightInfos = null;
        public strategyLeftInfo = null;
        public strategyRightInfo = null;
        public strategyComposeLeftTbl = [];
        public strategyComposeRightTbl = [];
        public strategyWordTbl = [];

        public strategySkills = [];
        public adviserSkills = {};
        public adviserLeftAttriTbl = [];
        public adviserRightAttriTbl = [];

        public leagueSkill = {};
        public pokedexSkill = {};
        public petSkill = {};
        public titleSkill = {}
        public skinSkill = {};

        // buffs
        public buffLeftAttriTbl = [];
        public buffRightAttriTbl = [];
        public myUseBuffs = [];

        // artifact
        public artifactLeftTbl = [];
        public artifactRightTbl = [];

        // rand    
        public lcgrandcnt = 0;

        // atuo
        public backupAutoTbl = [];
        public backupSpeedTbl = [];

        // generalLife
        public generalLifeTalent = [];

        // battlespeed
        public battleSpeed = 1.0;
        public bakeSpeedIndex = 1.0;

        public firstTouchSpeed = false;

        // starcraft
        public starcraftIndex = -1;
        public starcraftMax = -1;
        public bakeupContendCoin = 0;
        public bakeupContendScore = 0;

        public singleRank = 0; //  跨服战排名
        public singleScore = 0;//  跨服战积分
        public singleHonor = 0;//  荣誉币

        // wonderland
        public rpgObjectId = 0;

        // debug
        public debugLocalFight = false;

        // cache skill
        public relatedAsynDataId = [];

        // boss info
        public pveBossinfo = null;

        // talent info
        public everybodyTalent = {};
        public personalTalent = {};

        // pokedex
        public pokedexTipsTbl = [];

        // battle continue
        public bContinueBattle = false;
        public bStopContinueFromBattle = false;
        public currContinueBattleSum = 0;
        public maxContinueBattleSum = 0;

        // aiSpeed
        public aiSpeedList = []

        // other
        public offsety = 0
        public up_y = 0

        public formatRightWholeGels = [];
        public skillOnlyId = -1;
        public bInSceneFight = false;
        public matchHard;

        public matchEnemyName = "";
        public matchMyScore: number;
        public preStar: number;
        public seed = 0;

        constructor() {

        }
        public isKeepContinueUI() {
            if (this.bContinueBattle) {
                return true;
            }
            return false;
        }
        public setFightType(eType) {
            this.fightType = eType;
        }
        public setBattleSpeed(speedIndex) {
            this.battleSpeed = ConstantConfig_BattleTbl.BATTLE_AUTO_SPEED[speedIndex]
        }
        public setFightTalentType(eType) {
            this.fightTalentType = eType;
        }
        public setLayerId(eId) {
            this.layerId = eId;
        }
        public getLayerId() {
            return this.layerId;
        }
        public InitInfo() {
            // body
            this.offsetX = 0
            this.offsety = 0
            this.up_y = this.offsety / 2
            this.floor = Math.floor((this.up_y + 230) / (UIManager.StageWidth / 960))
            this.ground = this.floor
        }
        public atomicVary() {
            this.atomicCode = this.atomicCode + 1;
        }
        public getAtomic() {
            return this.atomicCode;
        }
        //是否是教学的结算界面
        public isTeachBattleEnd() {
            let tag = false;
            if (Game.TeachSystem.curPart != -1 && (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE)) {
                tag = true;
            }
            return tag;
        }
        public bInAIFightType() {
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
                    || this.fightType == message.EFormationType.FORMATION_TYPE_GENERAL_LIFE_STAT
                ) {
                    return 4;
                } else if (this.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_REAL_PK) {
                    return 1;
                }
                else if (this.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_WORLD_BOSS) {
                    return 2;
                }
                else if (this.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_UNION_BOSS) {
                    return 3;
                }
                else if (this.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH) {
                    return 5;
                }
            }

        }
        public checkContinueBattleSettle(bWin, mobId) {
            let isPowerEnough = true;
            if (mobId != null && Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_WANTED) {
                let floor_info = TableWanted.Item(mobId);
                if (Game.PlayerInfoSystem.Power < floor_info.battle_consume) {
                    isPowerEnough = false;
                }
            }
            if ((!isPowerEnough && Gmgr.Instance.bContinueBattle) || (bWin && ((Gmgr.Instance.bContinueBattle && this.isContinueNumMax()) || Gmgr.Instance.bStopContinueFromBattle))
                || (!bWin && Gmgr.Instance.bContinueBattle)) {
                //PushUI("HXH_SuccessionBattleDrop");
                this.bContinueBattle = false;
                this.bStopContinueFromBattle = false;
                return true
            }
            return false;
        }
        public isContinueNumMax() {
            if (this.currContinueBattleSum >= this.maxContinueBattleSum) {
                return true
            }
            return false;
        }
        public isKeepContinueBattle() {
            if (this.bContinueBattle && !this.isContinueNumMax() && !this.bStopContinueFromBattle) {
                return true;
            }
            return false;
        }
        public autoContinueBattleNum() {
            if (Gmgr.Instance.bContinueBattle) {
                this.currContinueBattleSum = this.currContinueBattleSum + 1;
                return true;
            }
            return false;
        }
        /**
         * 上阵连续挑战
         */
        public clearContinueBattleData() {
            Game.PlayerFormationSystem.continueBattleDropItems = [];
            Game.PlayerFormationSystem.continueBattleDropPotatos = [];
            this.currContinueBattleSum = 0;
        }

        public etReplaySkipType(eType) {
            this.replaySkipType = eType;
        }
    }



}