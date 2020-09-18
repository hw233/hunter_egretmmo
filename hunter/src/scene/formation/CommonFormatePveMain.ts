namespace zj {

    export let resultsTmp = {}

    export function _getDes(id) {
        let instance = Game.PlayerMobSystem.Instance(id)
        if (instance != null) {
            let type = instance.role_type
            let mapRole = instance.monster_roleId
            if (type == TableEnum.TableEnumFromClassify.TYPE_ENEMY) {
                return ["soldier", TableEnum.TableEnumFromClassify.TYPE_ENEMY, mapRole]
            }
            else if (type == TableEnum.TableEnumFromClassify.TYPE_ELITE) {
                return ["elite", TableEnum.TableEnumFromClassify.TYPE_ELITE, mapRole]
            }
            else if (type == TableEnum.TableEnumFromClassify.TYPE_BOSS) {
                return ["boss", TableEnum.TableEnumFromClassify.TYPE_BOSS, mapRole]
            }
        }
        return ["unknown", TableEnum.TableEnumFromClassify.TYPE_NONE, 0]
    }

    export function _writeTbl(tbl) {
        for (let j = 0; j < tbl.length; j++) {
            if (tbl[j] > 0) {
                let item = {};
                item[`id`] = tbl[j];
                [item[`des`], item[`order`], item[`mapRoleId`]] = _getDes(item[`id`])
                item[`cnt`] = 1
                // 注意唯一区别，同模型同类型的怪只显示一次
                let key = item[`mapRoleId`] + item[`des`];
                if (resultsTmp[key] == null || resultsTmp[key] == undefined) {
                    resultsTmp[key] = item
                }
                else {
                    resultsTmp[key].cnt = resultsTmp[key].cnt + 1
                }
            }
        }
    }

    export function getEnemyFomation(stages) {
        resultsTmp = {}
        // 副本包含的关卡
        for (let i = 0; i < stages.length; i++) {
            let curStage = stages[i]
            _writeTbl(Game.PlayerStageSystem.monsterIDs(Game.PlayerStageSystem.Instance(curStage).monster_pos1))
            _writeTbl(Game.PlayerStageSystem.monsterIDs(Game.PlayerStageSystem.Instance(curStage).monster_pos2))
            _writeTbl(Game.PlayerStageSystem.monsterIDs(Game.PlayerStageSystem.Instance(curStage).monster_pos3))
            _writeTbl(Game.PlayerStageSystem.monsterIDs(Game.PlayerStageSystem.Instance(curStage).monster_pos4))
        }

        let results = []
        for (let [k, v] of HelpUtil.GetKV(resultsTmp)) {
            results.push(v);
        }
        let sortFunc = function (a, b) { return b.order - a.order }
        results.sort(sortFunc)
        return results
    }

    /**
     * 上阵界面子类
     */
    export class CommonFormatePveMain extends FormatChoose {
        public static ID = "CommonFormatePveMain"
        // 怪物特征
        public features = null;
        // 怪物信息
        public enemys = null;
        // boss战斗力
        public monsterPower: number;
        // boss信息
        public bossInfo = null;
        // 当前副本信息
        public curInfo = null;
        // boss名字
        public labelBossName: eui.Label;
        // boss技能
        public listBossSkill: eui.List;
        // 技能列表数据
        public listBottomData: eui.ArrayCollection = new eui.ArrayCollection();
        // 怪物战力值
        public labelMonsterPower: eui.Label;

        public indexId: number = 0;

        // 滚动框
        public scroller: eui.Scroller;
        // 右边boss信息技能列表挑战按钮box
        public groupRight: eui.Group;
        // 挑战按钮
        public ButtonFight: eui.Group;
        // 连续挑战按钮
        public ButtonSuccessionBattle: eui.Image;

        // 副本类型
        public type: number = Game.PlayerInstanceSystem.curInstanceType;
        // 当前副本类型
        public typeLua: number = 0;

        // 遮罩1
        public shade1: eui.Image;
        // 遮罩2
        public shade2: eui.Image;

        // boos数据box
        public bossMessage: eui.Group;
        // boss血量底图
        public bossHpBaseImage: eui.Image;
        // boss血量
        public bossHpImage: eui.Image;
        // 当前boss血量
        public bossHp: eui.Image;
        // 当前boss剩余血量数值
        public bossHpLabel: eui.BitmapLabel;
        public bossHpbg: eui.Image;
        public imgHpbg1: eui.Image;
        public bossHpBg: eui.Image;
        // boss技能底图
        public bossSkillBaseImage: eui.Image;
        // boss技能
        public bossSkillImage: eui.Image;
        // 连续战斗按钮
        public continuous: eui.Image;

        // 跨服格斗场数据
        public playerInfo: Array<number> = [];
        public crossRealminfo: message.CraftRoleInfo;
        // 跨服格斗场box
        public figureMessage: eui.Group;
        // 等级
        public black1: eui.Image;
        public blackLable1: eui.Label;
        // 区服
        public black2: eui.Image;
        public blackLable2: eui.Label;
        // 段位
        public black3: eui.Image;
        public blackLable3: eui.Label;
        public num0: number = 0;
        public num1: number = 0;
        public num2: number = 0;

        // 本服格斗场数据
        public info: Array<number> = [];
        public itemInfo = [];
        public imgLadder1: eui.Image;
        public imgLadder2: eui.Image;

        // 工会信息
        public leagueInfo: message.CraftLeagueInfo;
        // 关卡
        public infoIndex: number;
        // 队形
        public formations: message.DetailFormationInfo;
        // 结算数据
        public infoName: string;
        // 工会战战斗数据
        public enemyunionInfo: message.DetailRoleFormationInfo;
        //  结算--数据
        public infoDataaccount;
        // 公会战box
        public team: eui.Group;
        // 阵容
        public ButtonViewEnemyTeam: eui.Button;
        // 底色
        // public bottomColour: eui.Image;
        // 分区
        public subarea: eui.Label;
        // 推荐战力
        public recommend: eui.Image;

        // 执照数据
        public permitInfo: Array<number> = [];

        // 好友单队数据
        public frjundsInfo: any;
        public formationsData;
        // 好友多队数据
        public manyTeamsFormations: any;
        public manyTeamsInfo;
        public namedate;
        public leveldate;
        public msgInfoArea;

        // 遗迹探索
        // 左边点
        // public leftPoint: eui.Image;
        // // 右边点
        // public rightPoint: eui.Image;
        // 所有阶段按钮box
        public phaseBox: eui.Group;
        // 1阶段
        public phase1: eui.Button;
        // 2阶段
        public phase2: eui.Button;
        // 3阶段
        public phase3: eui.Button;
        // 4阶段
        public phase4: eui.Button;
        // 5阶段
        public phase5: eui.Button;

        // 其他副本阵营保存
        public _formationInfo: Array<message.FormationInfo> = Game.PlayerFormationSystem.curFormations;
        // 流星街阵营保存
        public _formatsWant: Array<message.FormationInfo> = Game.PlayerFormationSystem.formatsWant;
        // 流星连续战斗
        public wantContinuousNum: number;
        // 跨服格斗阵营保存
        public _formatsSingleAttack: { [id: number]: message.FormationInfo } = Game.PlayerFormationSystem.formatsSingleAttack;
        // 跨服格斗阵型临时数据保存
        public a1: Array<number> = [];
        public b1: Array<number> = [];
        public c1: Array<number> = [];
        // 遗迹探索阵营保存
        private _formatsRelic: Array<message.FormationInfo> = Game.PlayerFormationSystem.formatsRelic;

        // 新手引导上阵武将不能为空
        private beNull = false;
        // 新手引导id武将
        public blowGuide = Game.PlayerFormationSystem.blowGuide;
        public maxMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].maxMobID;
        public mobInfo = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].mobsMap[this.blowGuide];

        // 1-3队阵容
        public NodeYincang: eui.Group;
        // 1-3队阵容信息
        public enemyInfo;
        // 改变阵容按键颜色
        public battleArrayColor: boolean = false;

        // 工会战防守阵容
        public UnionDefense: eui.Group;

        public datainfo0: number;
        public datainfo1: number;

        // 武将不能为空
        public generalCannotempty: boolean = false;

        // 世界boss
        public curStageBoss = null;
        public curHpPrev = 0;

        constructor() {
            super("resource/skins/formation/CommonFormationPveMain.exml");
            this.InitScene();
            this.initData();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.listBossSkill.itemRenderer = CommonBossSkillItem;
            this.bossHp.mask = this.bossHpbg;
        }

        /**
         * 初始化数据
         */
        public initData() {
            this.ButtonSuccessionBattle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinuous, this);// 连续挑战按钮
            this.ButtonFight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonFight_CallBack, this);// 挑战按钮
            this.ButtonViewEnemyTeam.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonViewEnemyTeam, this);// 阵容按钮
            this.phase1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases1, this);// 1阶段按钮
            this.phase2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases2, this);// 2阶段按钮
            this.phase3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases3, this);// 3阶段按钮
            this.phase4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases4, this);// 4阶段按钮
            this.phase5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases5, this);// 5阶段按钮

            Game.EventManager.on(GameEvent.FORMATION_DATE, this.OnformationDate, this);// 其他阵型
            Game.EventManager.on(GameEvent.CROSS_BEAM_FIELD, this.OncrossBeamFieldData, this);// 跨服战阵型  
            Game.EventManager.on(GameEvent.TEAM_FIGHT_ITEM, this.teamBattle, this);// 工会战数据
            Game.EventManager.on(GameEvent.CROSS_SERVER_COMBAT_ITEM, this.CrossServerCombat, this);// 跨服格斗数据
            Game.EventManager.on(GameEvent.FIGHT_FIELD_ITEM, this.fightField, this);// 本服格斗数据
            Game.EventManager.on(GameEvent.LICENSE_ITEM, this.permit, this);// 执照数据    
            Game.EventManager.on(GameEvent.FRIUNDS_ITEM, this.frjundsData, this);// 好友单队数据   
            Game.EventManager.on(GameEvent.MANY_TEAMS, this.manyTeams, this);// 好友多队数据
            Game.EventManager.on(GameEvent.CONTINUE, this.onContinue, this);// 还有未上阵的武将是否上阵
            Game.EventManager.on(GameEvent.BUTTON_Get_AWARD, this.battleStart, this);// buttonGetAward  
            Game.EventManager.on(GameEvent.MSGINFOP_DATA, this.onMsginfopData, this);//    
            Game.EventManager.on(GameEvent.FIGHTING_CAPACITY, this.fightingCapacity, this);

            if (Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100008 && !Teach.isDone(teachBattle.teachPartID_Formation_BanZang)) {
                Teach.CheckAndSetTeach(teachBattle.teachPartID_Formation_BanZang);
            }
        }

        public onContinue(e) {
            this.datainfo0 = e.data[0];
            this.datainfo1 = e.data[1];
        }

        /**
         * 背景图
         */
        public InitScene() {
            let id = 7;
            if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {// 流星街
                let cell = Game.PlayerWantedSystem.wantedCurPos;
                id = TableWanted.Item(cell).battle_bg;
            } else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                let cell = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID
                let tableInstance = TableInstance.Table();
                id = tableInstance[cell].battle_bg;
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {// 天空之塔
                let cell = Game.PlayerTowerSystem.towerInfo.towerCur;
                let tableTower = TableTower.Table();
                id = tableTower[cell].battle_bg
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {// 高级塔类型
                // let cell = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
                let tableTower = TableTower.Table();
                // id = tableTower[cell].battle_bg;
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {// 工会boss
                let tblLeagueBoss = TableLeagueAnimals.Table();
                id = tblLeagueBoss[1].battle_bg;
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {// 执照
                let tblLicense = TableMissionLicence.Table();
                id = tblLicense[Game.PlayerMissionSystem.licenseCurPos].battle_bg;
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == 7 || Game.PlayerInstanceSystem.curInstanceType == 16) {//本服  跨服
                id = 17;
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {// 工会副本 11
                let cell = Game.PlayerLeagueSystem.leagueInstance.curInstanceId;
                let tblLeagueInstance = TableLeagueInstance.Table();
                id = tblLeagueInstance[cell].battle_bg;
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_ZORK) {// 世界boss 17
                let tblWorldBoss = TableClientWorldBoss.Table();
                id = tblWorldBoss[1].battle_bg;
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {// 年兽BOSS 12
                let tblWorldBoss = TableClientWorldBoss.Table();
                id = tblWorldBoss[8000000].battle_bg;
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_ACTIVITY) {// 猎人故事 29
                let tblLicense = TableActivityBattleInstance.Table();
                id = tblLicense[PlayerActivitySystem.activityBattleCurPos].battle_bg;
            }
            else if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {//鼠崽闹春
                let tblactivity = TableActivityRandInstance.Table();
                id = tblactivity[1].battle_bg;
            }
            this.LoadScene(id);
        }

        /**
         * generalId 0-3 1-4主将
         * supportId 4-7 1-4副将
         */
        public OnformationDate(e) {
            // 其他副本阵营
            this._formationInfo[this.type - 1].generals = [];
            this._formationInfo[this.type - 1].supports = [];
            for (let i = 0; i < e.data.length; i++) {
                if (i <= 3) {
                    this._formationInfo[this.type - 1].generals.push(e.data[i].generalId);//主将  
                } else {
                    this._formationInfo[this.type - 1].supports.push(e.data[i].generalId);//副将
                }
            }


            // 新手引导剧情人物
            if (Teach.m_bOpenTeach == true && this.mobInfo != undefined && this.mobInfo != null) {
                if (this.blowGuide > 100001 && this.blowGuide < 100008) {
                    if (this.blowGuide == 100004 || this.blowGuide == 100005) {// 奇犽  
                        if (this._formationInfo[this.type - 1].generals[0] == this._formationInfo[this.type - 1].supports[0]) {
                            this._formationInfo[this.type - 1].supports[0] = 0;
                        }
                        if (this._formationInfo[this.type - 1].supports[0] == 110001) {
                            this._formationInfo[this.type - 1].supports[0] = 0;
                        }
                    } else {// 凯特
                        if (this._formationInfo[this.type - 1].generals[0] == this._formationInfo[this.type - 1].supports[0]) {
                            this._formationInfo[this.type - 1].supports[0] = 0;
                        }
                        if (this._formationInfo[this.type - 1].supports[0] == 110005) {
                            this._formationInfo[this.type - 1].supports[0] = 0;
                        }
                    }
                }
            }


            // 流星街阵营
            let street: number = Game.PlayerWantedSystem.wantedBossDifficulty;
            for (let j = 0; j < 8; j++) {
                if (street == j) {
                    this._formatsWant[j].generals = [];
                    this._formatsWant[j].supports = [];
                    for (let i = 0; i < e.data.length; i++) {
                        if (i <= 3) {
                            this._formatsWant[j].generals.push(e.data[i].generalId);//主将  
                        } else {
                            this._formatsWant[j].supports.push(e.data[i].generalId);//副将
                        }
                    }
                }
            }

            // 遗迹探索阵营
            for (let k = 0; k < 3; k++) {
                if (this.indexId - 1 == k) {
                    this._formatsRelic[k].generals = [];
                    this._formatsRelic[k].supports = [];
                    for (let i = 0; i < e.data.length; i++) {
                        if (i <= 3) {
                            this._formatsRelic[k].generals.push(e.data[i].generalId);//主将  
                        } else {
                            this._formatsRelic[k].supports.push(e.data[i].generalId);//副将
                        }
                    }
                }
            }
            Teach.addTeachingFormation();
        }

        public troopsGather() {
            this._formationInfo[this.type - 1].generals = [];
            this._formationInfo[this.type - 1].supports = [];
            Game.PlayerFormationSystem.formats[0].generals = [];
            Game.PlayerFormationSystem.formats[0].supports = [];
            for (let i = 0; i < 3; i++) {
                Game.PlayerFormationSystem.formats[i].formationType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
                Game.PlayerFormationSystem.formats[i].formationIndex = i;
            }
        }

        /**
         * 跨服格斗场进攻保存阵营 
         */
        public OncrossBeamFieldData(e) {
            this.troopsGather();
            this.a1 = [];
            this.b1 = [];
            this.c1 = [];
            for (let a = 0; a < 8; a++) {
                this.a1.push(e.data[a].generalId);
            }
            for (let b = 0; b < 8; b++) {
                this.b1.push(e.data[b + 8].generalId);
            }
            for (let c = 0; c < 8; c++) {
                this.c1.push(e.data[c + 16].generalId);
            }

            if (this.type == 16) {// 跨服格斗场
                this.fowFight();
            } else if (this.type == 22) {// 好友--三队切磋
                this.fowFight();
            }

            for (let i = 0; i < 3; i++) {
                Game.PlayerFormationSystem.formats[i].formationType = this.type;
            }
            Game.PlayerFormationSystem.formatsSingleAttack = Game.PlayerFormationSystem.formats;
            let test = Game.PlayerFormationSystem.formatsSingleAttack;
        }

        /**
         * 跨服格斗场 / 好友--三队切磋 
         */
        public fowFight() {
            // 第1队
            for (let i = 0; i < 8; i++) {
                if (i <= 3) {
                    this._formationInfo[this.type - 1].generals.push(this.a1[i]);
                    Game.PlayerFormationSystem.formats[0].generals.push(this._formationInfo[this.type - 1].generals[i]);
                } else {
                    this._formationInfo[this.type - 1].supports.push(this.a1[i]);
                    Game.PlayerFormationSystem.formats[0].supports.push(this._formationInfo[this.type - 1].supports[i - 4]);
                }
            }

            // 第2队
            this._formationInfo[this.type - 1].generals = [];
            this._formationInfo[this.type - 1].supports = [];
            Game.PlayerFormationSystem.formats[1].generals = [];
            Game.PlayerFormationSystem.formats[1].supports = [];
            for (let i = 0; i < 8; i++) {
                if (i <= 3) {
                    this._formationInfo[this.type - 1].generals.push(this.b1[i]);
                    Game.PlayerFormationSystem.formats[1].generals.push(this._formationInfo[this.type - 1].generals[i]);
                } else {
                    this._formationInfo[this.type - 1].supports.push(this.b1[i]);
                    Game.PlayerFormationSystem.formats[1].supports.push(this._formationInfo[this.type - 1].supports[i - 4]);
                }
            }

            // 第3队
            this._formationInfo[this.type - 1].generals = [];
            this._formationInfo[this.type - 1].supports = [];
            Game.PlayerFormationSystem.formats[2].generals = [];
            Game.PlayerFormationSystem.formats[2].supports = [];
            for (let i = 0; i < 8; i++) {
                if (i <= 3) {
                    this._formationInfo[this.type - 1].generals.push(this.c1[i]);
                    Game.PlayerFormationSystem.formats[2].generals.push(this._formationInfo[this.type - 1].generals[i]);
                } else {
                    this._formationInfo[this.type - 1].supports.push(this.c1[i]);
                    Game.PlayerFormationSystem.formats[2].supports.push(this._formationInfo[this.type - 1].supports[i - 4]);
                }
            }
        }

        /**
         * 工会战数据
         */
        public teamBattle(e) {
            // 工会信息
            this.leagueInfo = e.data.leagueInfo;
            // 关卡
            this.infoIndex = e.data.infoIndex;
            // 队型
            this.formations = e.data.formations;
            // 结算数据
            this.infoName = e.data.infoName;
            // 结算--数据
            this.infoDataaccount = e.data.infoData;
        }

        /**
         * 跨服格斗数据
         */
        public CrossServerCombat(e) {
            this.playerInfo = e.data.playerInfo;
            this.crossRealminfo = e.data.crossRealminfo;
            this.namedate = e.data.crossRealminfo.name;
            this.leveldate = e.data.crossRealminfo.level;
            this.enemyInfo = e.data.father;
            Game.PlayerBattleSystem.singBattle = this.enemyInfo.enemyInfo;
        }

        /**
         * 本服格斗场
         */
        public fightField(e) {
            this.info = e.data.info;
            this.itemInfo = e.data.a;
        }

        /**
         * 执照数据
         */
        public permit(e) {
            this.permitInfo = e.data.licenseArray;
        }

        /**
         * 好友单队数据
         */
        public frjundsData(e) {
            this.formationsData = e.data.formationsData;
            this.frjundsInfo = e.data.info;
        }

        /**
         * 好友多队数据
         */
        public manyTeams(e) {
            this.manyTeamsFormations = e.data.manyTeamsFormations;
            this.manyTeamsInfo = e.data.manyTeamsInfo;
        }

        public onMsginfopData(e) {
            this.namedate = e.data.msgInfoName;// 名称
            this.leveldate = e.data.msgInfoLevel;// 等级
            this.msgInfoArea = e.data.msgInfoArea;// 区服
        }

        /**
         * 战斗力
         */
        public fightingCapacity(e) {
            let text = e.data.text;
            if (Number(text) >= Number(this.labelMonsterPower.text)) {
                this.labelMonsterPower.textColor = 0x4EFF00;
            } else {
                if (Number(this.labelMonsterPower.text) - Number(text) <= 2000) {
                    this.labelMonsterPower.textColor = 0xFF8300;
                } else {
                    this.labelMonsterPower.textColor = 0xFF0000;
                }
            }
        }

        /**
         * 连续战斗按钮
         */
        public onContinuous() {
            // 播放音效--点击“战斗”按钮
            Game.SoundManager.playEffect(SoundManager.SoundOpen(30058), 100);
            this.cannotIsNo();
            if (this.generalCannotempty == true) {
                toast_warning(LANG("阵型为空，请至少选择一名猎人上阵"));
            } else {
                Gmgr.Instance.maxContinueBattleSum = ConstantConfig_RoleBattle.CONTINUE_BATTLE_MAX_NUM_TEST;
                let continue_battle_content1;
                let continue_battle_content2;
                let continue_battle_content3;
                if (this.type == 5) {// 爬塔连续战斗99场结束 
                    continue_battle_content1 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content1, Gmgr.Instance.maxContinueBattleSum);
                    continue_battle_content2 = TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content2;
                    continue_battle_content3 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content3, Gmgr.Instance.maxContinueBattleSum);
                } else if (this.type == 8) {// 流星街连续战斗10场结束（未赋值Gmgr.Instance.maxContinueBattleSum）
                    continue_battle_content1 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content1, 10);
                    continue_battle_content2 = TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content2;
                    continue_battle_content3 = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content3, 10);
                }
                TipManager.SuccessionBattlePopTip(continue_battle_content1, continue_battle_content2, continue_battle_content3, () => {
                    this.battleStart();
                });
            }
        }

        public cannotIsNo() {
            if (this.type == 16 || this.type == 22) {// 跨服格斗场
                this.num0 = 0;
                this.num1 = 0;
                this.num2 = 0;
                for (let i = 0; i < 3; i++) {
                    let formatsSingleAttackIndo = Game.PlayerFormationSystem.formatsSingleAttack[i];
                    if (i == 0) {
                        for (let j = 0; j < 4; j++) {
                            if (formatsSingleAttackIndo.generals[j] == 0) {
                                this.num0 = this.num0 + 1;
                            }
                        }
                    } else if (i == 1) {
                        for (let j = 0; j < 4; j++) {
                            if (formatsSingleAttackIndo.generals[j] == 0) {
                                this.num1 = this.num1 + 1;
                            }
                        }
                    } else if (i == 2) {
                        for (let j = 0; j < 4; j++) {
                            if (formatsSingleAttackIndo.generals[j] == 0) {
                                this.num2 = this.num2 + 1;
                            }
                        }
                    }
                }
            } else if (this.type == 8) {// 流星街阵营  
                let street: number = Game.PlayerWantedSystem.wantedBossDifficulty;
                for (let j = 0; j < 8; j++) {
                    if (street == j) {

                        if (this._formatsWant[j].generals[0] == 0 &&
                            this._formatsWant[j].generals[1] == 0 &&
                            this._formatsWant[j].generals[2] == 0 &&
                            this._formatsWant[j].generals[3] == 0) {
                            this.generalCannotempty = true;
                        } else {
                            this.generalCannotempty = false;
                        }
                    }
                }
            } else if (this.type == 26) {// 遗迹探索
                let siteIndex = Game.PlayerFormationSystem.siteIndex;
                for (let i = 0; i < 3; i++) {
                    if (siteIndex == i) {
                        if (this._formatsRelic[siteIndex].generals[0] == 0 &&
                            this._formatsRelic[siteIndex].generals[1] == 0 &&
                            this._formatsRelic[siteIndex].generals[2] == 0 &&
                            this._formatsRelic[siteIndex].generals[3] == 0) {
                            this.generalCannotempty = true;
                        } else {
                            this.generalCannotempty = false;
                        }
                    }
                }
            } else {// 其他副本        
                if (this._formationInfo[this.type - 1].generals[0] == 0 &&
                    this._formationInfo[this.type - 1].generals[1] == 0 &&
                    this._formationInfo[this.type - 1].generals[2] == 0 &&
                    this._formationInfo[this.type - 1].generals[3] == 0) {
                    this.generalCannotempty = true;
                } else {
                    this.generalCannotempty = false;
                }
            }
        }

        /**
         * 挑战按钮
         */
        public ButtonFight_CallBack() {
            Game.PlayerInfoSystem.playAnnouce = false;
            // 播放音效--点击“战斗”按钮
            Game.SoundManager.playEffect(SoundManager.SoundOpen(30058), 100);
            if (this.type == 8) {
                let text = WantedSecondMeteorstanceScene.challenge;
                if (Game.PlayerWantedSystem.ChallengeNumber <= 0 && Game.PlayerWantedSystem.ChallengeNumber != null && text != "首杀不计次" && text != "无限制") {
                    toast_warning("挑战次数不足");
                    return;
                }
            }

            this.cannotIsNo();

            let maxMobID = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
            if (this.beNull == true) {
                // 进入战斗
                this.battleStart();
                //egret.setTimeout(this.onBtnReturn, this, 1000);
            } else {
                // 新手引导阶段
                if (Teach.m_bOpenTeach == true) {
                    if (maxMobID == 100001 || (maxMobID > 100001 && maxMobID < 100008)) {
                        if (this.generalCannotempty == true) {
                            toast_warning(LANG("阵型为空，请至少选择一名猎人上阵"));
                        } else {
                            if (this.datainfo0 == undefined && this.datainfo1 == undefined) {
                                if (this.datainfo0 > 5 && 3 <= this.datainfo1) {
                                    TipManager.ShowConfirmCancel(TextsConfig.TextConfig_Instance.errLeftPos, () => {
                                        this.beNull = true;
                                        this.battleStart();
                                    })
                                } else {
                                    this.battleStart();
                                    this.onBtnReturn();
                                }
                            } else {
                                if (this.datainfo0 > 5 && 3 <= this.datainfo1) {
                                    TipManager.ShowConfirmCancel(TextsConfig.TextConfig_Instance.errLeftPos, () => {
                                        this.beNull = true;
                                        this.battleStart();
                                    })
                                } else {
                                    this.battleStart();
                                    this.onBtnReturn();
                                }
                            }
                        }
                    } else {
                        this.onVacancy();
                    }
                } else {
                    if (this.type == 16 || this.type == 22) {
                        if (this.num0 != 4 && this.num1 != 4 && this.num2 != 4) {
                            this.battleStart();
                            this.onBtnReturn();
                        } else if (this.num0 == 4 && this.num1 == 4 && this.num2 == 4) {
                            toast_warning(LANG("每队至少需要上阵一名猎人"));
                            this.num0 = 0;
                            this.num1 = 0;
                            this.num2 = 0;
                        } else {
                            if (this.num0 == 4) {
                                toast_warning(LANG("第1队至少需要1人上阵"));
                                this.num0 = 0;
                            } else if (this.num1 == 4) {
                                toast_warning(LANG("第2队至少需要1人上阵"));
                                this.num1 = 0;
                            } else if (this.num2 == 4) {
                                toast_warning(LANG("第3队至少需要1人上阵"));
                                this.num2 = 0;
                            }
                        }
                    } else {
                        this.onVacancy();
                    }
                }
            }
            if (this.beNull == true) {
                // 返回
                this.onBtnReturn();
            }
        }

        /**
         * 猎人空位 + list选中猎人 = 判断条件
         */
        public onVacancy() {
            if (this.generalCannotempty == true) {
                toast_warning(LANG("阵型为空，请至少选择一名猎人上阵"));
            } else {
                if (this.datainfo0 == undefined && this.datainfo1 == undefined) {
                    if (this.datainfo0 > 4 && 3 <= this.datainfo1) {
                        TipManager.ShowConfirmCancel(TextsConfig.TextConfig_Instance.errLeftPos, () => {
                            this.beNull = true;
                            this.battleStart();
                        })
                    } else {
                        this.battleStart();
                    }
                } else {
                    if (this.datainfo0 > 4 && 3 <= this.datainfo1) {
                        TipManager.ShowConfirmCancel(TextsConfig.TextConfig_Instance.errLeftPos, () => {
                            this.beNull = true;
                            this.battleStart();
                        })
                    } else {
                        this.battleStart();
                    }
                }
            }
        }

        /**
         * 阵容
         */
        public onButtonViewEnemyTeam() {
            for (let i = 0; i < 12; i++) {
                this[`imgDownIcon${i}`].source = "";// 头像
                this[`imgDownNum${i}`].text = "";// 上阵数量
            }
            if (this.battleArrayColor == true) {
                this.NodeYincang.visible = false;
                this.UnionDefense.visible = false;
                // Set.ButtonBackgroud(this.ButtonViewEnemyTeam, "ui_arena_ButtonViewEnemyTeamNewNor_png");
                this.battleArrayColor = false;
            } else {
                if (this.typeLua == 16) {// 跨服格斗 
                    this.KFuttonDisplay();
                    let enemyInfo;
                    let general_id;
                    // 跨服格斗场防守阵容
                    for (let i = 0; i < 3; i++) {
                        enemyInfo = this.enemyInfo.enemyInfo[i];
                        if (i == 0) {
                            this.defense(enemyInfo, general_id, i);
                        } else if (i == 1) {
                            this.defense(enemyInfo, general_id, i);
                        } else if (i == 2) {
                            this.defense(enemyInfo, general_id, i);
                        }
                    }
                } else if (this.typeLua == 24) {// 工会战
                    this.GHZuttonDisplay();
                    for (let i = 0; i < 4; i++) {
                        this[`profilePhoto${i}`].visible = false;// 头像
                        this[`starNum${i}`].visible = false;// 星星数
                        this[`quantity${i}`].visible = false;// 数量
                    }
                    // 工会战防守阵容
                    for (let i = 0; i < 4; i++) {
                        if (i == 0) {
                            this.unionBattleDefensiveLineups(i + 3, i);
                        } else if (i == 1) {
                            this.unionBattleDefensiveLineups(i + 1, i);
                        } else if (i == 2) {
                            this.unionBattleDefensiveLineups(i - 1, i);
                        } else if (i == 3) {
                            this.unionBattleDefensiveLineups(i - 3, i);
                        }
                    }
                } else if (this.typeLua == 7) {// 本服格斗场
                    this.GHZuttonDisplay();
                    if (this.indexId == 0) {
                        this.thisSuitData(this.indexId);
                    } else if (this.indexId == 1) {
                        this.thisSuitData(this.indexId);
                    } else if (this.indexId == 2) {
                        this.thisSuitData(this.indexId);
                    } else if (this.indexId == 3) {
                        this.thisSuitData(this.indexId);
                    }
                } else if (this.typeLua == 21) {// 好友/工会--单队切磋
                    this.GHZuttonDisplay();
                    this.singleTeamPlayData(0);
                } else if (this.typeLua == 22) {// 好友/跨服--三队切磋
                    this.KFuttonDisplay();
                    let enemyInfo;
                    let general_id;
                    // 跨服格斗场防守阵容
                    for (let i = 0; i < 3; i++) {
                        enemyInfo = this.manyTeamsFormations[i].generals;
                        if (i == 0) {
                            this.manyTeamsData(enemyInfo, general_id, i);
                        } else if (i == 1) {
                            this.manyTeamsData(enemyInfo, general_id, i);
                        } else if (i == 2) {
                            this.manyTeamsData(enemyInfo, general_id, i);
                        }
                    }
                }
            }
        }

        /**
         * 跨服格斗场/好友/工会按钮显示
         */
        public KFuttonDisplay() {
            this.NodeYincang.visible = true;
            // Set.ButtonBackgroud(this.ButtonViewEnemyTeam, "ui_arena_ButtonConsealEnemyTeamNewNor_png");
            this.battleArrayColor = true;
        }

        /**
         * 工会战/好友/工会按钮显示
         */
        public GHZuttonDisplay() {
            this.UnionDefense.visible = true;
            // Set.ButtonBackgroud(this.ButtonViewEnemyTeam, "ui_arena_ButtonConsealEnemyTeamNewNor_png");
            this.battleArrayColor = true;
        }

        /**
         * 跨服格斗防守阵容数据
         */
        public defense(enemyInfo, general_id, i) {
            for (let j = 0; j < enemyInfo.simpleInfo.generals.length; j++) {
                if (enemyInfo.simpleInfo.generals[i].length == 3) {// 1 2 3 长度为3
                    general_id = enemyInfo.simpleInfo.generals[j];
                } else {// 4 长度为4
                    general_id = enemyInfo.simpleInfo.generals[j];
                    if (i == 0) {
                        if (j == 0) {
                            this.defensiveRotations(j + 3, general_id);
                        } else if (j == 1) {
                            this.defensiveRotations(j + 1, general_id);
                        } else if (j == 2) {
                            this.defensiveRotations(j - 1, general_id);
                        } else if (j == 3) {
                            this.defensiveRotations(j - 3, general_id);
                        }
                    } else if (i == 1) {
                        if (j == 0) {
                            this.defensiveRotations(j + 7, general_id);
                        } else if (j == 1) {
                            this.defensiveRotations(j + 5, general_id);
                        } else if (j == 2) {
                            this.defensiveRotations(j + 3, general_id);
                        } else if (j == 3) {
                            this.defensiveRotations(j + 1, general_id);
                        }
                    } else if (i == 2) {
                        if (j == 0) {
                            this.defensiveRotations(j + 11, general_id);
                        } else if (j == 1) {
                            this.defensiveRotations(j + 9, general_id);
                        } else if (j == 2) {
                            this.defensiveRotations(j + 7, general_id);
                        } else if (j == 3) {
                            this.defensiveRotations(j + 5, general_id);
                        }
                    }
                }
            }
        }

        /**
         * 跨服格斗
         */
        public defensiveRotations(j, general_id) {
            if (general_id.general_id == 0 || general_id.general_id == null || general_id.general_id == undefined) {
                return;
            } else {
                this[`imgDownFrame${j}`].source = cachekey(UIConfig.UIConfig_Role.heroFrame[general_id.step], this);// 框
                this[`imgDownIcon${j}`].source = cachekey(PlayerHunterSystem.Head(general_id), this);// 头像
                Helper.SetHeroAwakenStar(this[`groupDownStar${j}`], general_id.star,
                    general_id.level);// 几星武将
                this[`imgDownNum${j}`].text = general_id.level + "";// 上阵数量
            }
        }

        /**
         * 好友--多队切磋防守阵容数据
         */
        public manyTeamsData(enemyInfo, general_id, i) {
            for (let j = 0; j < enemyInfo.length; j++) {
                if (enemyInfo[i].length == 4) {// 1 2 3 长度为3
                    general_id = enemyInfo[j];
                } else {// 4 长度为4
                    general_id = enemyInfo[j];
                    if (i == 0) {
                        if (j == 0) {
                            this.manyTeamss(j + 3, general_id);
                        } else if (j == 1) {
                            this.manyTeamss(j + 1, general_id);
                        } else if (j == 2) {
                            this.manyTeamss(j - 1, general_id);
                        } else if (j == 3) {
                            this.manyTeamss(j - 3, general_id);
                        }
                    } else if (i == 1) {
                        if (j == 0) {
                            this.manyTeamss(j + 7, general_id);
                        } else if (j == 1) {
                            this.manyTeamss(j + 5, general_id);
                        } else if (j == 2) {
                            this.manyTeamss(j + 3, general_id);
                        } else if (j == 3) {
                            this.manyTeamss(j + 1, general_id);
                        }
                    } else if (i == 2) {
                        if (j == 0) {
                            this.manyTeamss(j + 11, general_id);
                        } else if (j == 1) {
                            this.manyTeamss(j + 9, general_id);
                        } else if (j == 2) {
                            this.manyTeamss(j + 7, general_id);
                        } else if (j == 3) {
                            this.manyTeamss(j + 5, general_id);
                        }
                    }
                }
            }
        }

        /**
         *  好友--多队切磋
         */
        public manyTeamss(j, general_id) {
            if (general_id.general_id == 0 || general_id.general_id == null || general_id.general_id == undefined) {
                return;
            } else {
                this[`imgDownFrame${j}`].source = cachekey(UIConfig.UIConfig_Role.heroFrame[general_id.step], this);// 框
                this[`imgDownIcon${j}`].source = cachekey(PlayerHunterSystem.Head(general_id), this);// 头像
                Helper.SetHeroAwakenStar(this[`groupDownStar${j}`], general_id.star,
                    general_id.level);// 几星武将
                this[`imgDownNum${j}`].text = general_id.level + "";// 上阵数量
            }
        }

        /**
         * 工会战防守阵容
         */
        public unionBattleDefensiveLineups(i, j) {
            // 主将
            if (this.formations.generals[j].general_id == 0 || this.formations.generals[j].general_id == undefined || this.formations.generals[j].general_id == null) {
                this[`headPortrait${i}`].visible = false;
                this[`star${i}`].visible = false;
                this[`numtext${i}`].visible = false;
                this[`pitchOn${i}`].visible = false;
            } else {
                this[`frame${i}`].source = cachekey(UIConfig.UIConfig_Role.heroFrame[this.formations.generals[j].step], this);// 框
                this[`headPortrait${i}`].source = cachekey(PlayerHunterSystem.Head(this.formations.generals[j].general_id), this);// 头像
                Helper.SetHeroAwakenStar(this[`star${i}`], this.formations.generals[j].star,
                    this.formations.generals[j].level);// 几星武将
                this[`numtext${i}`].text = this.formations.generals[j].level + "";// 上阵数量
                this[`pitchOn${i}`].visible = true;
                this[`without${i}`].visible = false;
            }
        }

        /**
         * 好友--单队切磋防守数据
         */
        public singleTeamPlayData(infoIndex) {
            // 主将
            if (this.formationsData[infoIndex].generals.length == 0 || this.formationsData[infoIndex].generals.length == undefined) {
                for (let i = 0; i < 4; i++) {
                    this[`headPortrait${i}`].visible = false;// 头像
                    this[`star${i}`].visible = false;// 星星数
                    this[`numtext${i}`].visible = false;// 数量
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    if (i == 0) {
                        this.friendsTeams(infoIndex, i + 3, i);
                    } else if (i == 1) {
                        this.friendsTeams(infoIndex, i + 1, i);
                    } else if (i == 2) {
                        this.friendsTeams(infoIndex, i - 1, i);
                    } else if (i == 3) {
                        this.friendsTeams(infoIndex, i - 3, i);
                    }
                }
            }
            // 副将
            if (this.formationsData[infoIndex].supports.length == 0 || this.formationsData[infoIndex].supports.length == undefined) {
                for (let i = 0; i < 4; i++) {
                    this[`profilePhoto${i}`].visible = false;// 头像
                    this[`starNum${i}`].visible = false;// 星星数
                    this[`quantity${i}`].visible = false;// 数量
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    if (i == 0) {
                        this.friendsTeams(infoIndex, i + 3, i);
                    } else if (i == 1) {
                        this.friendsTeams(infoIndex, i + 1, i);
                    } else if (i == 2) {
                        this.friendsTeams(infoIndex, i - 1, i);
                    } else if (i == 3) {
                        this.friendsTeams(infoIndex, i - 3, i);
                    }
                }
            }
        }


        /**
         * 好友--单队切磋
         */
        public friendsTeams(infoIndex, i, j) {
            // 主将
            if (this.formationsData[infoIndex].generals[j] == 0 || this.formationsData[infoIndex].generals[j] == undefined || this.formationsData[infoIndex].generals[j] == null) {
                this[`headPortrait${i}`].visible = false;// 头像
                this[`star${i}`].visible = false;// 星星
                this[`numtext${i}`].visible = false;// 数量
            } else {
                //Game.PlayerHunterSystem.queryHunter(this.itemInfo[infoIndex].formation.generals[j]).star;
                this[`frame${i}`].source = cachekey(UIConfig.UIConfig_Role.heroFrame[this.formationsData[infoIndex].generals[j].step], this);// 框
                this[`headPortrait${i}`].source = cachekey(PlayerHunterSystem.Head(this.formationsData[infoIndex].generals[j]), this);// 头像
                Helper.SetHeroAwakenStar(this[`star${i}`], this.formationsData[infoIndex].generals[j].star,
                    this.formationsData[infoIndex].generals[j].level);// 几星武将
                this[`numtext${i}`].text = this.formationsData[infoIndex].generals[j].level + "";// 上阵数量
                this[`pitchOn${i}`].visible = true;
                this[`without${i}`].visible = false;
            }
            // 副将
            if (this.formationsData[infoIndex].supports[j] == 0 || this.formationsData[infoIndex].supports[j] == undefined || this.formationsData[infoIndex].supports[j] == null) {
                this[`profilePhoto${i}`].visible = false;// 头像
                this[`starNum${i}`].visible = false;// 星星
                this[`quantity${i}`].visible = false;// 数量
            } else {
                this[`circumscribe${i}`].source = cachekey(UIConfig.UIConfig_Role.heroFrame[this.formationsData[infoIndex].supports[j].step], this);// 框
                this[`profilePhoto${i}`].source = cachekey(PlayerHunterSystem.Head(this.formationsData[infoIndex].supports[j]), this);// 头像
                Helper.SetHeroAwakenStar(this[`starNum${i}`], this.formationsData[infoIndex].supports[j].star,
                    this.formationsData[infoIndex].supports[j].level);// 几星武将
                this[`quantity${i}`].text = this.formationsData[infoIndex].supports[j].level + "";// 上阵数量
                this[`assistance${i}`].visible = false;
                this[`without${i}`].visible = false;
            }
        }

        /**
         * 本服防守数据
         */
        public thisSuitData(infoIndex) {
            // 主将
            if (this.itemInfo[infoIndex].formation.generals.length == 0 || this.itemInfo[infoIndex].formation.generals.length == undefined) {
                for (let i = 0; i < 4; i++) {
                    this[`headPortrait${i}`].visible = false;// 头像
                    this[`star${i}`].visible = false;// 星星数
                    this[`numtext${i}`].visible = false;// 数量
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    if (i == 0) {
                        this.thisSuit(infoIndex, i + 3, i);
                    } else if (i == 1) {
                        this.thisSuit(infoIndex, i + 1, i);
                    } else if (i == 2) {
                        this.thisSuit(infoIndex, i - 1, i);
                    } else if (i == 3) {
                        this.thisSuit(infoIndex, i - 3, i);
                    }
                }
            }
            // 副将
            if (this.itemInfo[infoIndex].formation.supports.length == 0 || this.itemInfo[infoIndex].formation.supports.length == undefined) {
                for (let i = 0; i < 4; i++) {
                    this[`profilePhoto${i}`].visible = false;// 头像
                    this[`starNum${i}`].visible = false;// 星星数
                    this[`quantity${i}`].visible = false;// 数量
                }
            } else {
                for (let i = 0; i < 4; i++) {
                    if (i == 0) {
                        this.thisSuit(infoIndex, i + 3, i);
                    } else if (i == 1) {
                        this.thisSuit(infoIndex, i + 1, i);
                    } else if (i == 2) {
                        this.thisSuit(infoIndex, i - 1, i);
                    } else if (i == 3) {
                        this.thisSuit(infoIndex, i - 3, i);
                    }
                }
            }
        }

        /**
         * 本服格斗场
         */
        public thisSuit(infoIndex, i, j) {
            // 主将
            if (this.itemInfo[infoIndex].formation.generals[j] == 0 || this.itemInfo[infoIndex].formation.generals[j] == null || this.itemInfo[infoIndex].formation.generals[j] == undefined) {
                this[`headPortrait${i}`].visible = false;// 头像
                this[`star${i}`].visible = false;// 星星
                this[`numtext${i}`].visible = false;// 数量 
            } else {
                //Game.PlayerHunterSystem.queryHunter(this.itemInfo[infoIndex].formation.generals[j]).star;
                this[`frame${i}`].source = cachekey(UIConfig.UIConfig_Role.heroFrame[this.itemInfo[infoIndex].formation.generals[j].step], this);// 框
                if (Device.isReviewSwitch && Util.isWxMiniGame) {
                    this[`headPortrait${i}`].source = cachekey("wx_" + PlayerHunterSystem.Head(this.itemInfo[infoIndex].formation.generals[j]), this);// 头像
                } else {
                    this[`headPortrait${i}`].source = cachekey(PlayerHunterSystem.Head(this.itemInfo[infoIndex].formation.generals[j]), this);// 头像
                }
                Helper.SetHeroAwakenStar(this[`star${i}`], this.itemInfo[infoIndex].formation.generals[j].star,
                    this.itemInfo[infoIndex].formation.generals[j].level);// 几星武将
                this[`numtext${i}`].text = this.itemInfo[infoIndex].formation.generals[j].level + "";// 上阵数量
                this[`pitchOn${i}`].visible = true;
                this[`without${i}`].visible = false;
            }
            // 副将
            if (this.itemInfo[infoIndex].formation.supports[j] == 0 || this.itemInfo[infoIndex].formation.supports[j] == undefined || this.itemInfo[infoIndex].formation.supports[j] == null) {
                this[`profilePhoto${i}`].visible = false;// 头像
                this[`starNum${i}`].visible = false;// 星星
                this[`quantity${i}`].visible = false;// 数量
            } else {
                this[`circumscribe${i}`].source = cachekey(UIConfig.UIConfig_Role.heroFrame[this.itemInfo[infoIndex].formation.supports[j].step], this);// 框
                if (Device.isReviewSwitch && Util.isWxMiniGame) {
                    this[`profilePhoto${i}`].source = cachekey("wx_" + PlayerHunterSystem.Head(this.itemInfo[infoIndex].formation.supports[j]), this);// 头像
                } else {
                    this[`profilePhoto${i}`].source = cachekey(PlayerHunterSystem.Head(this.itemInfo[infoIndex].formation.supports[j]), this);// 头像
                }
                Helper.SetHeroAwakenStar(this[`starNum${i}`], this.itemInfo[infoIndex].formation.supports[j].star,
                    this.itemInfo[infoIndex].formation.supports[j].level);// 几星武将
                this[`quantity${i}`].text = this.itemInfo[infoIndex].formation.supports[j].level + "";// 上阵数量
                this[`assistance${i}`].visible = false;
                this[`without${i}`].visible = false;
            }
        }

        /**
         * 1阶段
         */
        public phases1() {
            this.btnColour();
            Set.ButtonBackgroud(this.phase1, "ui_darkland_relic_ButtonStage1Sel_png");
            this.phaseSwitchover(0);
        }

        /**
         * 2阶段
         */
        public phases2() {
            this.btnColour();
            Set.ButtonBackgroud(this.phase2, "ui_darkland_relic_ButtonStage2Sel_png");
            this.phaseSwitchover(1);
        }

        /**
         * 3阶段
         */
        public phases3() {
            this.btnColour();
            Set.ButtonBackgroud(this.phase3, "ui_darkland_relic_ButtonStage3Sel_png");
            this.phaseSwitchover(2);
        }

        /**
         * 4阶段
         */
        public phases4() {
            this.btnColour();
            Set.ButtonBackgroud(this.phase4, "ui_darkland_relic_ButtonStage4Sel_png");
            this.phaseSwitchover(3);
        }

        /**
         * 5阶段
         */
        public phases5() {
            this.btnColour();
            Set.ButtonBackgroud(this.phase5, "ui_darkland_relic_ButtonStage5Sel_png");
            this.phaseSwitchover(4);
        }

        /** 
         * 将所有按钮颜色变暗 
         */
        private btnColour() {
            for (let i = 1; i < 6; i++) {
                let str: string = "ui_darkland_relic_ButtonStage" + i + "Nor_png";
                Set.ButtonBackgroud(this[`phase${i}`], str, );
            }
        }

        /**
         * 1-5阶段按钮切换
         */
        public phaseSwitchover(index) {
            this.listBottomData.removeAll();
            for (let i = 0; i < this.features[index].length; i++) {
                let data = new CommonBossSkillData();
                data.mobId = this.features[index][i];
                data.father = this;
                this.listBottomData.addItem(data);
            }
            this.listBossSkill.dataProvider = this.listBottomData;
        }

        public FightCB() {
            if (this.type == 16) {
                Game.PlayerFormationSystem.SaveSingleFormation();// 跨服格斗场保存阵容信息
            }
            else if (this.type == 8) {
                Game.PlayerFormationSystem.SaveWantFormation();// 流星街保存阵容信息
            }
            else if (this.type == 26) {
                Game.PlayerFormationSystem.SaveRelicFormation();// 遗迹保存阵容信息    
            }
            else if (this.type == 21) {
                Game.PlayerFormationSystem.saveFormations();//好友/工会--单队切磋
            }
            else if (this.type == 22) {
                Game.PlayerFormationSystem.SaveSingleFormation();// 跨服格斗场 / 好友--三队切磋
            }
            else {
                Game.PlayerFormationSystem.saveFormations();// 其他副本保存阵容信息
            }

            if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {// 普通副本
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = false;
                Helper.cacheSkillSpineId(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightNormal);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {// 精英副本
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE, this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightNormal);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {// 工会副本
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE, message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE, message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE), this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightLeagueInstance);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER || this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {// 普通/高级天空之塔副本
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                if (this.type == 5) {
                    Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER, message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER, message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER), this.enemys);
                    StageSceneManager.Instance.ChangeScene(StageSceneFightTower);
                } else if (this.type == 20) {
                    Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER, message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER, message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER), this.enemys);
                    StageSceneManager.Instance.ChangeScene(StageSceneFightTower);
                }
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {// 工会boss副本
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS, message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS, message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS), this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightBLeagueBoss);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_WANTED) {// 流星街副本
                Gmgr.Instance.autoContinueBattleNum();
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(this.type, this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightWanted);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {// 跨服格斗场
                Gmgr.Instance.starcraftIndex = 1;
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK, message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK, message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK), this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightBSingle);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {// 工会战
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK, message.EFormationType.FORMATION_TYPE_MATCH_ATTACK, message.EFormationType.FORMATION_TYPE_MATCH_ATTACK), this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightMatch);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {// 本服格斗场
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK, message.EFormationType.FORMATION_TYPE_LADDER_ATTACK, message.EFormationType.FORMATION_TYPE_LADDER_ATTACK), this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightArena);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {// 执照
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE, message.EFormationType.FORMATION_TYPE_MISSION_LICENCE, message.EFormationType.FORMATION_TYPE_MISSION_LICENCE), this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightLicense);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ZORK) {// 世界boss
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_ZORK, message.EFormationType.FORMATION_TYPE_ZORK, message.EFormationType.FORMATION_TYPE_ZORK), this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightBZorkBoss);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {// 年兽boss
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS, message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS, message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS), this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightActivityBoss);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY) {  // 猎人故事
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(yuan3(this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY, message.EFormationType.FORMATION_TYPE_ACTIVITY, message.EFormationType.FORMATION_TYPE_ACTIVITY), this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightActivity);     //接入战斗
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_RELIC) {// 遗迹探索
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(this.type, this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightRelic);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {// 好友/工会--单队切磋
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(this.type, this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightBOneBattle);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {// 好友/工会--三队切磋
                Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                Helper.cacheSkillSpineId(this.type, this.enemys);
                StageSceneManager.Instance.ChangeScene(StageSceneFightBThreeBattle);
            } else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {// 鼠崽闹春
                // Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                // Helper.cacheSkillSpineId(message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND, this.enemys);
                StageSceneFightRand.indexId = this.indexId;
                StageSceneManager.Instance.ChangeScene(StageSceneFightRand);
            }
        }

        // 副本挑战
        public battleStart() {
            let request = new message.BattleStartRequest();
            if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {// 普通冒险副本         
                request.body.id = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {// 精英冒险副本挑战  
                request.body.id = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].curMobID;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {// 工会副本挑战
                request.body.id = Game.PlayerLeagueSystem.leagueInstance.curInstanceId;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER || this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {// 普通/高级天空竞技场副本
                if (this.type == 5) {
                    request.body.id = Game.PlayerTowerSystem.towerInfo.towerCur;
                } else if (this.type == 20) {
                    // request.body.id = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
                }
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {// 工会boss副本
                request.body.id = Game.PlayerLeagueSystem.leagueBoss.bossInfo.stage_id;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_WANTED) {// 流星街副本
                request.body.id = this.indexId;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {// 跨服格斗场    
                request.body.id = this.crossRealminfo.role_id;
                let enemy_info = new message.RoleBriefInfo;
                enemy_info.id = this.crossRealminfo.role_id;
                enemy_info.name = this.crossRealminfo.role_name;
                enemy_info.level = this.crossRealminfo.role_level;
                enemy_info.leagueId = this.crossRealminfo.group_id;
                enemy_info.leagueName = this.crossRealminfo.group_name;
                enemy_info.ladderMax = this.crossRealminfo.craft_score;
                enemy_info.ladderRank = this.crossRealminfo.craft_rank;
                enemy_info.licenceLevel = this.crossRealminfo.licence_level;
                enemy_info.picId = this.crossRealminfo.pic;
                enemy_info.titleId = this.crossRealminfo.title_id;

                Game.PlayerBattleSystem.pvpOppBriefInfo = enemy_info;

                Gmgr.Instance.singleHonor = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_HONOR_COIN)
                Gmgr.Instance.singleScore = this.crossRealminfo.craft_score;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {// 工会战
                Game.PlayerBattleSystem.pvpOppBriefInfo = this.enemyunionInfo.baseInfo;

                request.body.id = Math.floor(this.infoIndex / 100);
                Gmgr.Instance.matchHard = this.infoIndex;

                Game.PlayerBattleSystem.battleDetailFormation = this.enemyunionInfo.formation;
                Gmgr.Instance.matchEnemyName = this.infoName + "&" + this.enemyunionInfo.baseInfo.picId + "&" + this.enemyunionInfo.baseInfo.picFrameId;
                Gmgr.Instance.preStar = this.infoDataaccount.star;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {// 本服格斗场
                let baseInfo = this.itemInfo[this.indexId].baseInfo;
                request.body.id = baseInfo.id;
                Game.PlayerBattleSystem.pvpOppBriefInfo = baseInfo;
                Gmgr.Instance.arenaRoleId = baseInfo.id;
                Gmgr.Instance.arenaRank = Game.PlayerInfoSystem.BaseInfo.ladderRank;
                Gmgr.Instance.arenaBestRank = Game.PlayerInfoSystem.BaseInfo.ladderMax;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {// 执照
                request.body.id = this.permitInfo[2];
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ZORK) {// 世界boss
                request.body.id = 0;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {//年兽BOSS
                request.body.id = Game.PlayerBossSystem.ActivityBoss.bossId;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY) {//猎人故事
                request.body.id = PlayerActivitySystem.activityBattleCurPos;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_RELIC) {// 遗迹探索
                request.body.id = this.indexId;
                Game.PlayerMissionSystem.fightExt = this.indexId - 1;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {// 好友/工会--单队切磋
                Game.PlayerBattleSystem.battleDetailFormation = this.formationsData[0];// 详细武将阵型
                Game.PlayerBattleSystem.pvpOppBriefInfo = this.frjundsInfo;// pvp对方君主简要信息
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {// 好友--三队切磋
                Gmgr.Instance.singleHonor = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_HONOR_COIN)
                Game.PlayerFormationSystem.threeBattleInfo = this.manyTeamsFormations;
                Game.PlayerBattleSystem.pvpOppBriefInfo = this.manyTeamsInfo;
                Gmgr.Instance.starcraftIndex = 1;
                Game.PlayerFormationSystem.curFormationIndex = 1;
                Game.PlayerBattleSystem.battleDetailFormation = Game.PlayerFormationSystem.threeBattleInfo[0];
                //Gmgr.Instance.singleScore = this.crossRealminfo.craft_score;          
            } else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) { //鼠崽闹春
                this.typeLua = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;

                request.body.id = this.indexId;
            }

            request.body.type = this.typeLua;
            if (this.type == 16 || this.type == 29) {
                request.body.ext = 1;
            } else if (this.type == 24) {
                request.body.ext = this.indexId;
            } else {
                request.body.ext = 0;
            }

            // if ((this.type == 2 && Game.PlayerCardSystem.getCardNumber() >= CommonConfig.potapo_max_number + Game.PlayerInfoSystem.BaseInfo.potato_buy_count) ||
            //     this.type == 8 && Game.PlayerCardSystem.getCardNumber() >= CommonConfig.potapo_max_number + Game.PlayerInfoSystem.BaseInfo.potato_buy_count && Game.PlayerWantedSystem.GetClientDropHaveCard(Game.PlayerWantedSystem.wantedCurPos)) {
            //     //toast_warning(TextsConfig.TextsConfig_Hunter_Instance.card_full_tips);
            //     FightLoading.getInstance().loadFightRes(this.type, this.FightCB, this);
            // } else 
            if (this.type == 21 || this.type == 22) {
                FightLoading.getInstance().loadFightRes(this.type, this.FightCB, this);
            } else {
                Game.PlayerBattleSystem.sendFight(request)
                    .then((value) => {
                        this.BattleStartInstance_Visit(value);
                        super.onBtnReturn();
                    })
                    .catch((reason) => {

                    });
            }
        }

        public BattleStartInstance_Visit(response) {
            if (response.header.result != 0) {
                return;
            }
            FightLoading.getInstance().loadFightRes(this.type, this.FightCB, this);
        }

        /**
         * 调用FormatChoose基类中onAddToStage函数
         */
        public onAddToStage() {
            super.onAddToStage();
        }

        /**
         * 所有副本初始化
         */
        public setInfo(index) {
            // 播放音效--进入选将界面时
            Game.SoundManager.playEffect(SoundManager.SoundOpen(30057), 100);
            if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {// 普通冒险副本
                this.typeLua = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
                Game.PlayerFormationSystem.blowGuide = index;
                this.LoadEnemys();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {// 精英冒险副本
                this.typeLua = message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
                Game.PlayerFormationSystem.blowGuide = index;
                this.Loadelite();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {// 工会副本
                this.typeLua = message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE;
                this.laborUnionEctype(index);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER || this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {// 普通/高级天空之塔副本
                if (this.type == 5) {
                    this.typeLua = 5;
                } else if (this.type == 20) {
                    this.typeLua = 20;
                }
                this.skyCity(index);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {// 工会boss副本
                this.typeLua = message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS;
                this.beastBoss();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_WANTED) {// 流星街副本
                this.indexId = index;
                this.typeLua = message.EFormationType.FORMATION_TYPE_WANTED;
                this.block(index);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {// 跨服格斗场
                this.typeLua = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
                this.crossBeam();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {// 工会战
                this.indexId = index;
                this.typeLua = message.EFormationType.FORMATION_TYPE_MATCH_ATTACK;
                Game.PlayerFormationSystem.LeagueMatchFortressTeam(this.leagueInfo.leagueId, Math.floor(this.infoIndex / 100), this.infoIndex)
                    .then((datailRoleFormation: message.DetailRoleFormationInfo) => {
                        this.enemyunionInfo = datailRoleFormation;
                        this.teamFight();
                    }).catch(() => {

                    });
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {// 本服格斗场
                this.typeLua = message.EFormationType.FORMATION_TYPE_LADDER_ATTACK;
                this.indexId = index;
                this.LocalFightingGround();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {// 好友--单队切磋
                this.typeLua = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
                this.aloneFight();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {// 好友--三队切磋
                this.typeLua = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
                this.multiplayerFight();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {// 执照
                this.typeLua = message.EFormationType.FORMATION_TYPE_MISSION_LICENCE;
                this.license(index);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ZORK) {// 世界boss
                this.typeLua = message.EFormationType.FORMATION_TYPE_ZORK;
                this.worldBoss();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_RELIC) {// 遗迹探索
                this.typeLua = message.EFormationType.FORMATION_TYPE_RELIC;
                this.indexId = index + 1;
                this.relic(this.indexId);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {//年兽BOSS
                this.typeLua = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
                this.activityBoss();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY) { //猎人故事
                this.typeLua = message.EFormationType.FORMATION_TYPE_ACTIVITY;
                this.storyInstance();
            } else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) { //鼠崽闹春
                this.typeLua = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;
                this.indexId = index;
                this.LoadRatpups(index);
            }
            //boss信息
            this.LoadBoss();
        }

        /**
         * 冒险副本数据信息
         */
        public LoadEnemys() {
            // this.shade1.y = 28;
            // this.shade1.height = 80;
            // 技能位置
            // this.scroller.x = 100;
            // 副本信息
            let tableInstance = TableInstance.Table();
            let mobId: number = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID;
            // 副本包含的关卡
            let stages = tableInstance[mobId].instance_pack;
            // 怪物特性
            this.features = tableInstance[mobId].feature;
            // 怪物信息
            this.enemys = getEnemyFomation(stages);
            // 推荐战力
            this.monsterPower = tableInstance[mobId].battle_value;
            this.labelMonsterPower.text = Set.NumberUnit3(this.monsterPower);
        }

        /**
         * 冒险鼠崽闹春数据信息
         */
        public LoadRatpups(index) {
            // 副本信息
            let tableInstance = TableActivityRandInstance.Table();
            // 副本包含的关卡
            // let stages = tableInstance[mobId].instance_pack;
            // 怪物特性
            this.features = tableInstance[index].feature;
            // 怪物信息
            // this.enemys = getEnemyFomation(stages);
            this.labelBossName.visible = true;
            this.labelBossName.text = tableInstance[index].name;
            // 推荐战力
            this.monsterPower = tableInstance[index].battle_value;
            this.labelMonsterPower.text = Set.NumberUnit3(this.monsterPower);
        }

        /**
         * 精英副本数据信息
         */
        public Loadelite() {
            // this.shade1.y = 28;
            // this.shade1.height = 85;
            // 技能位置
            // this.scroller.x = 100;
            // 推荐战斗力 数值 底色 隐藏
            // this.bottomColour.visible = false;
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;
            // 副本信息
            let tableInstance = TableInstance.Table();
            let mobId: number = Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].curMobID;
            // 副本包含的关卡
            let stages = tableInstance[mobId].instance_pack;
            // 怪物特性
            this.features = tableInstance[mobId].feature;
            // 怪物信息
            this.enemys = getEnemyFomation(stages);
            // 推荐战力
            this.monsterPower = tableInstance[mobId].battle_value;
            this.labelMonsterPower.text = Set.NumberUnit3(this.monsterPower);
        }

        /**
         * 工会副本数据信息
         */
        public laborUnionEctype(index) {
            //显示当前boss血量数据
            // this.bossHpBaseImage.visible = true;
            this.bossHpImage.visible = true;
            this.bossHp.visible = true;
            this.imgHpbg1.visible = true;
            this.bossHpBg.visible = true;
            this.bossHpLabel.visible = true;

            //boss技能列表下移
            // this.bossSkillBaseImage.y = 80;
            // this.bossSkillImage.y = 85;
            // this.scroller.x = 100;
            // this.scroller.y = 70;

            // 联盟副本简单信息
            let instances: Array<message.LeagueInstanceSimple> = Game.PlayerLeagueSystem.Instances;
            // 工会信息--获取联盟副本表
            let tbInstance: { [key: string]: TableLeagueInstance } = Game.PlayerLeagueSystem.getAllInstance();
            // 所有关卡信息
            let stage = Game.PlayerLeagueSystem.leagueInstance.leagueInstanceStageInfo[1].stageInfo;
            this.enemys = getEnemyFomation([stage.stage_id]);
            // 怪物特性
            this.features = tbInstance[index].feature;
            // 推荐战斗力
            this.monsterPower = tbInstance[index].recommend_power;
            this.labelMonsterPower.text = Set.NumberUnit3(this.monsterPower);
            // 当前boss剩余血量数值
            let perect = instances[index - 1].stageInfos[0].curHp;
            if (perect > 1) perect = 1;
            // "100.0%"
            this.bossHpbg.width = (perect) * 201;
            this.bossHpLabel.text = (perect * 100).toFixed(0) + "%";
        }

        /**
         * 工会boss副本数据信息
         */
        public beastBoss() {
            // this.bottomColour.visible = false;
            // 获取工会boss表
            let tblLeagueBoss = TableLeagueAnimals.Table();
            // 关卡信息
            let stage = Game.PlayerLeagueSystem.leagueBoss.bossInfo;
            // boss特性
            this.features = tblLeagueBoss[1].feature;
            // 怪物信息
            this.enemys = getEnemyFomation([stage.stage_id]);
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;
        }

        /**
         * 流星街副本数据信息
         */
        public block(index) {
            this.wantContinuousNum = index;
            if (this.wantContinuousNum > 20001) {
                this.ButtonFight.x = 25;
                this.scroller.x = 100;
                // this.ButtonSuccessionBattle.visible = true;
            } else {
                // this.ButtonSuccessionBattle.visible = false;
            }
            // 推荐战斗力 数值 底色 隐藏
            // this.bottomColour.visible = false;
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;
            // 关卡信息
            let stages = TableWanted.Item(index).instance_pack;
            // boss特性
            this.features = TableWanted.Item(index).feature;
            // 怪物信息
            this.enemys = getEnemyFomation(stages);
            // boss战斗力
            this.monsterPower = TableWanted.Item(index).battle_value;
            this.labelMonsterPower.text = Set.NumberUnit3(this.monsterPower);
        }

        /**
         * 跨服格斗场副本数据信息
         */
        public crossBeam() {
            // 阵容显示
            this.ButtonViewEnemyTeam.visible = true;
            this.ButtonViewEnemyTeam.y = 125;
            this.bossMessage.visible = false;
            this.figureMessage.visible = true;

            // 等级
            this.blackLable1.text = this.playerInfo[0] + "";
            // 区服
            this.blackLable2.text = "区服" + " " + this.playerInfo[1] + "";
            // 段位
            this.blackLable3.text = this.playerInfo[2] + "";
            
            this.groupRight.right = -80;
            this.groupRD.left = 50;
        }

        /**
         * 工会战副本数据信息
         */
        public teamFight() {
            // 阵容显示
            this.ButtonViewEnemyTeam.visible = true;
            this.ButtonViewEnemyTeam.y = 80;
            this.team.visible = false;
            // this.bottomColour.visible = true;
            // this.bottomColour.y = 28;
            // 当前区信息
            this.subarea.visible = true;
            // this.subarea.y = 35;
            this.shade2.visible = true;

            // 工会名称
            this.labelBossName.text = this.leagueInfo.leagueName + "";
            //json解析
            let json = JSON.parse(this.leagueInfo.group_name);
            let arr = json[Game.LanguageManager.getLang()].split("&");
            // 当前区
            this.subarea.text = arr[0] + "区" + "  " + arr[1];
            this.subarea.size = 16;
        }

        /**
         * 本服格斗场副本数据信息
         */
        public LocalFightingGround() {
            this.ButtonViewEnemyTeam.visible = true;
            this.team.visible = false;
            // this.bottomColour.visible = true;
            // this.bottomColour.y = 28;
            // 当前区信息
            this.subarea.visible = true;
            // this.subarea.y = 35;
            // this.shade1.height = 30;
            this.imgLadder1.visible = true;
            this.imgLadder2.visible = true;
            this.labelBossName.visible = true;
            // 玩家名称
            if (Device.isReviewSwitch && Util.isWxMiniGame) {
                this.labelBossName.text = "";
            } else {
                this.labelBossName.text = this.info[0] + "";
            }
            // 玩家等级
            this.subarea.text = this.info[1] + "";
            this.subarea.size = 16;
            this.groupRight.right = -80;
            this.groupRD.left = 50;
        }

        /**
         * 好友--单队切磋副本数据信息
         */
        public aloneFight() {
            this.ButtonViewEnemyTeam.visible = true;
            this.team.visible = false;
            // this.bottomColour.visible = true;
            // this.bottomColour.y = 28;
            // 当前区信息
            this.subarea.visible = true;
            this.subarea.y = 35;
            // this.shade1.height = 30;

            //Game.PlayerFormationSystem.curFormationMap[0].formations[6];
            //Player.battleDetailFormation =msg.formations[1]

            Game.PlayerBattleSystem.pvpOppBriefInfo = this.frjundsInfo;

            // 服务器名称(本服/跨服)
            this.labelBossName.text = Game.PlayerRelateSystem.serverName + ""; //本服";
            // 玩家等级/名称
            this.subarea.text = "Lv" + this.frjundsInfo.level + " " + this.frjundsInfo.name + "";
            this.subarea.size = 16;
            this.groupRight.right = -80;
            this.groupRD.left = 50;
        }

        /**
         * 好友--三队切磋副本数据信息
         */
        public multiplayerFight() {
            // 阵容显示
            this.ButtonViewEnemyTeam.visible = true;
            this.ButtonViewEnemyTeam.y = 125;
            this.bossMessage.visible = false; 
            this.figureMessage.visible = true;

            this.black3.visible = false;
            this.blackLable3.visible = false;

            Game.PlayerBattleSystem.pvpOppBriefInfo = this.frjundsInfo;

            // 玩家等级/名称
            //this.blackLable1.text = "Lv" + this.leveldate + " " + this.namedate + "";
            this.blackLable1.text = "Lv" + this.manyTeamsInfo.level + " " + this.manyTeamsInfo.name + "";
            this.blackLable1.size = 16;
            // 服务器名称(本服/跨服) 
            //this.blackLable2.text = this.msgInfoArea + "";
            this.blackLable2.text = "本服";
            this.groupRight.right = -80;
            this.groupRD.left = 50;
        }

        /**
         * 天空之塔副本数据信息
         */
        public skyCity(index) {
            // 显示连续战斗按钮
            if (this.type == 5) {
                this.ButtonFight.x = 25;
                this.scroller.x = 100;
                // this.ButtonSuccessionBattle.visible = true;
            } else if (this.type == 20) {
                // this.ButtonSuccessionBattle.visible = false;
            }

            // 获取天空竞技场副本表
            let tblTower: { [key: string]: TableTower } = Game.PlayerTowerSystem.getTableTower();
            let message = Game.PlayerInstanceSystem.MonsterTowerIndex;
            // 关卡信息
            let stages = tblTower[index].tower_pack[message];
            // 怪物特性
            this.features = tblTower[index].feature[message];
            // 怪物信息
            this.enemys = getEnemyFomation([stages]);
            // boss战斗力
            this.monsterPower = tblTower[index].better_power;
            if (this.monsterPower == 0) {
                // this.bottomColour.visible = false;
                this.recommend.visible = false;
                this.labelMonsterPower.visible = false;
            } else {
                this.labelMonsterPower.text = Set.NumberUnit3(this.monsterPower);
            }
        }

        /**
         * 执照副本数据信息
         */
        public license(index) {
            // 技能位置
            // this.scroller.x = 100;
            // 名称
            this.labelBossName.text = this.permitInfo[0] + "";
            let tblLicense = TableMissionLicence.Table();
            let stages = tblLicense[index].battle_id;
            this.features = tblLicense[index].feature;
            this.enemys = getEnemyFomation([stages]);
            this.labelMonsterPower.text = Set.NumberUnit3(tblLicense[index].battle_value);
        }

        /**
         * 世界boss副本数据信息
         */
        public worldBoss() {
            //显示当前boss血量数据
            // this.bossHpBaseImage.visible = true;
            this.bossHpImage.visible = true;
            this.bossHp.visible = true;
            this.imgHpbg1.visible = true;
            this.bossHpBg.visible = true;
            this.bossHpbg.visible = true;
            this.bossHpLabel.visible = true;

            // this.bottomColour.visible = false;
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;

            //boss技能列表下移
            // this.bossSkillBaseImage.y = 80;
            // this.bossSkillImage.y = 85;
            // this.scroller.x = 100;
            // this.scroller.y = 70;

            // boss信息
            this.bossInfo = Game.PlayerZorkSystem.zorkBoss.bossInfo;
            Game.PlayerStageSystem.insert(this.bossInfo.bossInfo);

            // 获取世界boss表
            let tblWorldBoss = TableClientWorldBoss.Table();
            let armystage = this.bossInfo.bossInfo;
            // boss特性
            this.features = tblWorldBoss[1].feature;
            // 怪物信息
            this.enemys = getEnemyFomation([armystage.stage_id]);
            this.bossHpbg.width = (Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre) * 201;
            this.bossHpLabel.text = (Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre * 100).toFixed(0) + "%";


            // if (this.curStageBoss == null) {
            //     return;
            // }
            // if (this.curStageBoss.getCurHp() != this.curHpPrev) {
            //     this.curHpPrev = this.curStageBoss.getCurHp();
            //     let percent = this.curStageBoss.getCurHp() * 100 / this.curStageBoss.getMaxHp();
            //     let str_rate = Helper.StringFormat("%d%%", percent);
            // }

            // let instances: Array<message.LeagueInstanceSimple> = Game.PlayerLeagueSystem.Instances;
            // // 当前boss剩余血量数值
            // let perect = instances[index - 1].stageInfos[0].curHp;
            // if (perect > 1) perect = 1;
            // // "100.0%"
            // this.bossHpLabel.text = (perect * 100).toFixed(0) + "%";
        }

        /**
         * 年兽BOSS信息
         */
        public activityBoss() {
            //显示当前boss血量数据
            this.bossHpBaseImage.visible = true;
            this.bossHpImage.visible = true;
            this.bossHp.visible = true;
            this.imgHpbg1.visible = true;
            this.bossHpBg.visible = true;
            this.bossHpLabel.visible = true;

            // this.bottomColour.visible = false;
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;

            //boss技能列表下移
            // this.bossSkillBaseImage.y = 80;
            // this.bossSkillImage.y = 85;
            // this.scroller.x = 100;
            // this.scroller.y = 70;

            let tblWorldBoss = TableClientWorldBoss.Table();
            this.features = tblWorldBoss[Game.PlayerBossSystem.ActivityBoss.bossId].feature;
            this.enemys = getEnemyFomation([Game.PlayerBossSystem.ActivityBoss.bossId]);

            this.bossHpLabel.text = "100%";
        }

        /**
         * 猎人故事数据信息
         */
        public storyInstance() {
            // 技能位置
            // this.scroller.x = 75;

            let tblLicense = TableActivityBattleInstance.Table();
            let stages = tblLicense[PlayerActivitySystem.activityBattleCurPos].instance_stage;
            this.features = tblLicense[PlayerActivitySystem.activityBattleCurPos].feature;
            this.enemys = getEnemyFomation(stages);

            // this.bottomColour.visible = false;
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;
        }
        /**
         * 遗迹探索副本数据信息
         */
        public relic(index) {// RelicMainItem
            let cell = index;
            // 遗迹探索表
            let tblRelic = TableInstanceRelic.Table();
            // 关卡
            let stages = tblRelic[cell].monster_stage;
            // boss特性
            this.features = tblRelic[cell].feature;
            // 怪物信息
            this.enemys = getEnemyFomation(stages);
            // 没有推荐战斗力
            this.phaseBox.visible = true;
            this.shade1.scaleY = 1.7;
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;
            // this.bossSkillBaseImage.y = 60;
            // this.bossSkillImage.y = 70;
            // this.scroller.y = 100;
            // this.bottomColour.visible = false;
            // this.leftPoint.x = 45;
            // this.rightPoint.x = 220;
            // this.shade1.x = 10;
            // this.shade1.y = 25;
            // this.shade1.width = 110;
            // this.shade1.height = 120;
        }

        /**
         * boss信息
         */
        public LoadBoss() {
            if (this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK ||
                this.type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE ||
                this.type == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {// 工会战  好友--单队切磋  好友--三队切磋
                let boneName = TableClientFightAniSpineSource.Item(1032).json;
                this.LoadModel(boneName);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {// 跨服格斗场
                let picTable = TableItemPic.Table();
                let picMapRoleId = picTable[this.playerInfo[3]].mapRole_id;
                let instance = TableMapRole.Item(picMapRoleId);
                let boneName = TableClientFightAniSpineSource.Item(instance.body_spx_id).json;
                this.LoadModel(boneName);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {// 本服格斗场
                // 本服数据
                let hhsad = this.itemInfo[this.indexId].baseInfo;
                // 物品头像表
                let picTable = TableItemPic.Table();
                // 根据头像找到模型id
                let picMapRoleId = picTable[hhsad.picId].mapRole_id;
                // 获取模型id
                let id = TableMapRole.Item(picMapRoleId);
                // 异步播放龙骨--加载boss模型资源
                let boneName = TableClientFightAniSpineSource.Item(id.body_spx_id).json;
                // 加载模型方法
                this.LoadModel(boneName);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {// 鼠崽闹春
                let info = TableActivityRandInstance.Item(this.indexId);
                // 获取模型id
                let id = TableMapRole.Item(info.boss_roleId);
                // 异步播放龙骨--加载boss模型资源
                let boneName = TableClientFightAniSpineSource.Item(id.body_spx_id).json;
                // 加载模型方法
                this.LoadModel(boneName);
                this.bossInfo = info;
                // this.SetBossInfo(this.bossInfo, this.features);
                this.labelBossName.text = info.name;
                this.listBottomData.removeAll();
                for (let i = 0; i < info.feature.length; i++) {
                    let data = new CommonBossSkillData();
                    data.mobId = info.feature[i];
                    data.father = this;
                    this.listBottomData.addItem(data);
                }
                this.listBossSkill.dataProvider = this.listBottomData;
            }
            else {
                // boss信息
                this.bossInfo = Game.PlayerMobSystem.Instance(this.enemys[0].id)
                // 当前副本信息
                this.curInfo = Game.PlayerMobSystem.GetCurInfo(this.enemys[0].id)
                Gmgr.Instance.pveBossinfo = this.bossInfo;
                if (this.bossInfo == null) return;
                this.LoadBossAni();
                this.SetBossInfo(this.bossInfo, this.features);
            }
        }

        /**
         * 加载模型
         */
        public LoadModel(boneName) {
            Game.DragonBonesManager.playAnimation(this, boneName, "armatureName", 1, 0)
                .then(display => {
                    display.x = 0;
                    display.y = 0;
                    this[`groupAni`].addChild(display);
                    display.scaleX = -1;
                    display.scaleY = 1;
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        /**
         * boss模型
         */
        public LoadBossAni() {
            // boss编号
            let instance = TableMapRole.Item(this.bossInfo.monster_roleId);
            // 异步播放龙骨--加载boss模型资源
            let boneName = TableClientFightAniSpineSource.Item(instance.body_spx_id).json;
            Game.DragonBonesManager.playAnimation(this, boneName, "armatureName", 1, 0)
                .then(display => {
                    display.x = 0;
                    display.y = 0;
                    this[`groupAni`].addChild(display);
                    display.scaleX = -instance.spine_instance_scale;
                    display.scaleY = instance.spine_instance_scale;
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        /**
         * boss描述
         */
        public SetBossInfo(info, features) {
            if (this.type == 17) {
                let scene = StageSceneManager.Instance.GetCurScene();
                this.curStageBoss = scene.getLiveBoss();
            }
            // boss特征
            this.features = features;
            // boss名称
            let item = TableLanguage.Item(info.monster_name);
            this.labelBossName.text = item ? item["ch"] : "";
            this.LoadFeatureList();
        }

        /**
         * boss技能列表
         */
        public LoadFeatureList() {
            if (this.type == 26) {// 遗迹探索技能列表不同
                this.btnColour();
                Set.ButtonBackgroud(this.phase1, "ui_darkland_relic_ButtonStage1Sel_png");
                this.listBottomData.removeAll();
                for (let i = 0; i < this.features[0].length; i++) {
                    let data = new CommonBossSkillData();
                    data.mobId = this.features[0][i];
                    data.father = this;
                    this.listBottomData.addItem(data);
                }
                this.listBossSkill.dataProvider = this.listBottomData;
            } else {
                // 删除列表中的所有项目
                this.listBottomData.removeAll();
                for (let i = 0; i < this.features.length; i++) {
                    let data = new CommonBossSkillData();
                    data.mobId = this.features[i];
                    data.father = this;
                    this.listBottomData.addItem(data);
                }
                // dataProvider列表数据源
                this.listBossSkill.dataProvider = this.listBottomData;
            }
        }

        public onBtnReturn() {
            // Game.UIManager.topScene().visible = true;
            super.onBtnReturn();
        }

        public onEntryTopDialog() {
            // Game.UIManager.topScene().visible = false;
        }
    }
}