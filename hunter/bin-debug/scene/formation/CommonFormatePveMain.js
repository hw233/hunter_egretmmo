var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    zj.resultsTmp = {};
    function _getDes(id) {
        var instance = zj.Game.PlayerMobSystem.Instance(id);
        if (instance != null) {
            var type = instance.role_type;
            var mapRole = instance.monster_roleId;
            if (type == zj.TableEnum.TableEnumFromClassify.TYPE_ENEMY) {
                return ["soldier", zj.TableEnum.TableEnumFromClassify.TYPE_ENEMY, mapRole];
            }
            else if (type == zj.TableEnum.TableEnumFromClassify.TYPE_ELITE) {
                return ["elite", zj.TableEnum.TableEnumFromClassify.TYPE_ELITE, mapRole];
            }
            else if (type == zj.TableEnum.TableEnumFromClassify.TYPE_BOSS) {
                return ["boss", zj.TableEnum.TableEnumFromClassify.TYPE_BOSS, mapRole];
            }
        }
        return ["unknown", zj.TableEnum.TableEnumFromClassify.TYPE_NONE, 0];
    }
    zj._getDes = _getDes;
    function _writeTbl(tbl) {
        for (var j = 0; j < tbl.length; j++) {
            if (tbl[j] > 0) {
                var item = {};
                item["id"] = tbl[j];
                _a = _getDes(item["id"]), item["des"] = _a[0], item["order"] = _a[1], item["mapRoleId"] = _a[2];
                item["cnt"] = 1;
                // 注意唯一区别，同模型同类型的怪只显示一次
                var key = item["mapRoleId"] + item["des"];
                if (zj.resultsTmp[key] == null || zj.resultsTmp[key] == undefined) {
                    zj.resultsTmp[key] = item;
                }
                else {
                    zj.resultsTmp[key].cnt = zj.resultsTmp[key].cnt + 1;
                }
            }
        }
        var _a;
    }
    zj._writeTbl = _writeTbl;
    function getEnemyFomation(stages) {
        zj.resultsTmp = {};
        // 副本包含的关卡
        for (var i = 0; i < stages.length; i++) {
            var curStage = stages[i];
            _writeTbl(zj.Game.PlayerStageSystem.monsterIDs(zj.Game.PlayerStageSystem.Instance(curStage).monster_pos1));
            _writeTbl(zj.Game.PlayerStageSystem.monsterIDs(zj.Game.PlayerStageSystem.Instance(curStage).monster_pos2));
            _writeTbl(zj.Game.PlayerStageSystem.monsterIDs(zj.Game.PlayerStageSystem.Instance(curStage).monster_pos3));
            _writeTbl(zj.Game.PlayerStageSystem.monsterIDs(zj.Game.PlayerStageSystem.Instance(curStage).monster_pos4));
        }
        var results = [];
        for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.resultsTmp); _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            results.push(v);
        }
        var sortFunc = function (a, b) { return b.order - a.order; };
        results.sort(sortFunc);
        return results;
    }
    zj.getEnemyFomation = getEnemyFomation;
    /**
     * 上阵界面子类
     */
    var CommonFormatePveMain = (function (_super) {
        __extends(CommonFormatePveMain, _super);
        function CommonFormatePveMain() {
            var _this = _super.call(this, "resource/skins/formation/CommonFormationPveMain.exml") || this;
            // 怪物特征
            _this.features = null;
            // 怪物信息
            _this.enemys = null;
            // boss信息
            _this.bossInfo = null;
            // 当前副本信息
            _this.curInfo = null;
            // 技能列表数据
            _this.listBottomData = new eui.ArrayCollection();
            _this.indexId = 0;
            // 副本类型
            _this.type = zj.Game.PlayerInstanceSystem.curInstanceType;
            // 当前副本类型
            _this.typeLua = 0;
            // 跨服格斗场数据
            _this.playerInfo = [];
            _this.num0 = 0;
            _this.num1 = 0;
            _this.num2 = 0;
            // 本服格斗场数据
            _this.info = [];
            _this.itemInfo = [];
            // 执照数据
            _this.permitInfo = [];
            // 其他副本阵营保存
            _this._formationInfo = zj.Game.PlayerFormationSystem.curFormations;
            // 流星街阵营保存
            _this._formatsWant = zj.Game.PlayerFormationSystem.formatsWant;
            // 跨服格斗阵营保存
            _this._formatsSingleAttack = zj.Game.PlayerFormationSystem.formatsSingleAttack;
            // 跨服格斗阵型临时数据保存
            _this.a1 = [];
            _this.b1 = [];
            _this.c1 = [];
            // 遗迹探索阵营保存
            _this._formatsRelic = zj.Game.PlayerFormationSystem.formatsRelic;
            // 新手引导上阵武将不能为空
            _this.beNull = false;
            // 新手引导id武将
            _this.blowGuide = zj.Game.PlayerFormationSystem.blowGuide;
            _this.maxMobID = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].maxMobID;
            _this.mobInfo = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].mobsMap[_this.blowGuide];
            // 改变阵容按键颜色
            _this.battleArrayColor = false;
            // 武将不能为空
            _this.generalCannotempty = false;
            // 世界boss
            _this.curStageBoss = null;
            _this.curHpPrev = 0;
            _this.InitScene();
            _this.initData();
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this.listBossSkill.itemRenderer = zj.CommonBossSkillItem;
            _this.bossHp.mask = _this.bossHpbg;
            return _this;
        }
        /**
         * 初始化数据
         */
        CommonFormatePveMain.prototype.initData = function () {
            this.ButtonSuccessionBattle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinuous, this); // 连续挑战按钮
            this.ButtonFight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonFight_CallBack, this); // 挑战按钮
            this.ButtonViewEnemyTeam.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonViewEnemyTeam, this); // 阵容按钮
            this.phase1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases1, this); // 1阶段按钮
            this.phase2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases2, this); // 2阶段按钮
            this.phase3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases3, this); // 3阶段按钮
            this.phase4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases4, this); // 4阶段按钮
            this.phase5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.phases5, this); // 5阶段按钮
            zj.Game.EventManager.on(zj.GameEvent.FORMATION_DATE, this.OnformationDate, this); // 其他阵型
            zj.Game.EventManager.on(zj.GameEvent.CROSS_BEAM_FIELD, this.OncrossBeamFieldData, this); // 跨服战阵型  
            zj.Game.EventManager.on(zj.GameEvent.TEAM_FIGHT_ITEM, this.teamBattle, this); // 工会战数据
            zj.Game.EventManager.on(zj.GameEvent.CROSS_SERVER_COMBAT_ITEM, this.CrossServerCombat, this); // 跨服格斗数据
            zj.Game.EventManager.on(zj.GameEvent.FIGHT_FIELD_ITEM, this.fightField, this); // 本服格斗数据
            zj.Game.EventManager.on(zj.GameEvent.LICENSE_ITEM, this.permit, this); // 执照数据    
            zj.Game.EventManager.on(zj.GameEvent.FRIUNDS_ITEM, this.frjundsData, this); // 好友单队数据   
            zj.Game.EventManager.on(zj.GameEvent.MANY_TEAMS, this.manyTeams, this); // 好友多队数据
            zj.Game.EventManager.on(zj.GameEvent.CONTINUE, this.onContinue, this); // 还有未上阵的武将是否上阵
            zj.Game.EventManager.on(zj.GameEvent.BUTTON_Get_AWARD, this.battleStart, this); // buttonGetAward  
            zj.Game.EventManager.on(zj.GameEvent.MSGINFOP_DATA, this.onMsginfopData, this); //    
            zj.Game.EventManager.on(zj.GameEvent.FIGHTING_CAPACITY, this.fightingCapacity, this);
            if (zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID == 100008 && !zj.Teach.isDone(zj.teachBattle.teachPartID_Formation_BanZang)) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_Formation_BanZang);
            }
        };
        CommonFormatePveMain.prototype.onContinue = function (e) {
            this.datainfo0 = e.data[0];
            this.datainfo1 = e.data[1];
        };
        /**
         * 背景图
         */
        CommonFormatePveMain.prototype.InitScene = function () {
            var id = 7;
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_WANTED) {
                var cell = zj.Game.PlayerWantedSystem.wantedCurPos;
                id = zj.TableWanted.Item(cell).battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL || zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                var cell = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
                var tableInstance = zj.TableInstance.Table();
                id = tableInstance[cell].battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER) {
                var cell = zj.Game.PlayerTowerSystem.towerInfo.towerCur;
                var tableTower = zj.TableTower.Table();
                id = tableTower[cell].battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                // let cell = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
                var tableTower = zj.TableTower.Table();
                // id = tableTower[cell].battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                var tblLeagueBoss = zj.TableLeagueAnimals.Table();
                id = tblLeagueBoss[1].battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                var tblLicense = zj.TableMissionLicence.Table();
                id = tblLicense[zj.Game.PlayerMissionSystem.licenseCurPos].battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == 7 || zj.Game.PlayerInstanceSystem.curInstanceType == 16) {
                id = 17;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                var cell = zj.Game.PlayerLeagueSystem.leagueInstance.curInstanceId;
                var tblLeagueInstance = zj.TableLeagueInstance.Table();
                id = tblLeagueInstance[cell].battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_ZORK) {
                var tblWorldBoss = zj.TableClientWorldBoss.Table();
                id = tblWorldBoss[1].battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                var tblWorldBoss = zj.TableClientWorldBoss.Table();
                id = tblWorldBoss[8000000].battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_ACTIVITY) {
                var tblLicense = zj.TableActivityBattleInstance.Table();
                id = tblLicense[zj.PlayerActivitySystem.activityBattleCurPos].battle_bg;
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
                var tblactivity = zj.TableActivityRandInstance.Table();
                id = tblactivity[1].battle_bg;
            }
            this.LoadScene(id);
        };
        /**
         * generalId 0-3 1-4主将
         * supportId 4-7 1-4副将
         */
        CommonFormatePveMain.prototype.OnformationDate = function (e) {
            // 其他副本阵营
            this._formationInfo[this.type - 1].generals = [];
            this._formationInfo[this.type - 1].supports = [];
            for (var i = 0; i < e.data.length; i++) {
                if (i <= 3) {
                    this._formationInfo[this.type - 1].generals.push(e.data[i].generalId); //主将  
                }
                else {
                    this._formationInfo[this.type - 1].supports.push(e.data[i].generalId); //副将
                }
            }
            // 新手引导剧情人物
            if (zj.Teach.m_bOpenTeach == true && this.mobInfo != undefined && this.mobInfo != null) {
                if (this.blowGuide > 100001 && this.blowGuide < 100008) {
                    if (this.blowGuide == 100004 || this.blowGuide == 100005) {
                        if (this._formationInfo[this.type - 1].generals[0] == this._formationInfo[this.type - 1].supports[0]) {
                            this._formationInfo[this.type - 1].supports[0] = 0;
                        }
                        if (this._formationInfo[this.type - 1].supports[0] == 110001) {
                            this._formationInfo[this.type - 1].supports[0] = 0;
                        }
                    }
                    else {
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
            var street = zj.Game.PlayerWantedSystem.wantedBossDifficulty;
            for (var j = 0; j < 8; j++) {
                if (street == j) {
                    this._formatsWant[j].generals = [];
                    this._formatsWant[j].supports = [];
                    for (var i = 0; i < e.data.length; i++) {
                        if (i <= 3) {
                            this._formatsWant[j].generals.push(e.data[i].generalId); //主将  
                        }
                        else {
                            this._formatsWant[j].supports.push(e.data[i].generalId); //副将
                        }
                    }
                }
            }
            // 遗迹探索阵营
            for (var k = 0; k < 3; k++) {
                if (this.indexId - 1 == k) {
                    this._formatsRelic[k].generals = [];
                    this._formatsRelic[k].supports = [];
                    for (var i = 0; i < e.data.length; i++) {
                        if (i <= 3) {
                            this._formatsRelic[k].generals.push(e.data[i].generalId); //主将  
                        }
                        else {
                            this._formatsRelic[k].supports.push(e.data[i].generalId); //副将
                        }
                    }
                }
            }
            zj.Teach.addTeachingFormation();
        };
        CommonFormatePveMain.prototype.troopsGather = function () {
            this._formationInfo[this.type - 1].generals = [];
            this._formationInfo[this.type - 1].supports = [];
            zj.Game.PlayerFormationSystem.formats[0].generals = [];
            zj.Game.PlayerFormationSystem.formats[0].supports = [];
            for (var i = 0; i < 3; i++) {
                zj.Game.PlayerFormationSystem.formats[i].formationType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
                zj.Game.PlayerFormationSystem.formats[i].formationIndex = i;
            }
        };
        /**
         * 跨服格斗场进攻保存阵营
         */
        CommonFormatePveMain.prototype.OncrossBeamFieldData = function (e) {
            this.troopsGather();
            this.a1 = [];
            this.b1 = [];
            this.c1 = [];
            for (var a = 0; a < 8; a++) {
                this.a1.push(e.data[a].generalId);
            }
            for (var b = 0; b < 8; b++) {
                this.b1.push(e.data[b + 8].generalId);
            }
            for (var c = 0; c < 8; c++) {
                this.c1.push(e.data[c + 16].generalId);
            }
            if (this.type == 16) {
                this.fowFight();
            }
            else if (this.type == 22) {
                this.fowFight();
            }
            for (var i = 0; i < 3; i++) {
                zj.Game.PlayerFormationSystem.formats[i].formationType = this.type;
            }
            zj.Game.PlayerFormationSystem.formatsSingleAttack = zj.Game.PlayerFormationSystem.formats;
            var test = zj.Game.PlayerFormationSystem.formatsSingleAttack;
        };
        /**
         * 跨服格斗场 / 好友--三队切磋
         */
        CommonFormatePveMain.prototype.fowFight = function () {
            // 第1队
            for (var i = 0; i < 8; i++) {
                if (i <= 3) {
                    this._formationInfo[this.type - 1].generals.push(this.a1[i]);
                    zj.Game.PlayerFormationSystem.formats[0].generals.push(this._formationInfo[this.type - 1].generals[i]);
                }
                else {
                    this._formationInfo[this.type - 1].supports.push(this.a1[i]);
                    zj.Game.PlayerFormationSystem.formats[0].supports.push(this._formationInfo[this.type - 1].supports[i - 4]);
                }
            }
            // 第2队
            this._formationInfo[this.type - 1].generals = [];
            this._formationInfo[this.type - 1].supports = [];
            zj.Game.PlayerFormationSystem.formats[1].generals = [];
            zj.Game.PlayerFormationSystem.formats[1].supports = [];
            for (var i = 0; i < 8; i++) {
                if (i <= 3) {
                    this._formationInfo[this.type - 1].generals.push(this.b1[i]);
                    zj.Game.PlayerFormationSystem.formats[1].generals.push(this._formationInfo[this.type - 1].generals[i]);
                }
                else {
                    this._formationInfo[this.type - 1].supports.push(this.b1[i]);
                    zj.Game.PlayerFormationSystem.formats[1].supports.push(this._formationInfo[this.type - 1].supports[i - 4]);
                }
            }
            // 第3队
            this._formationInfo[this.type - 1].generals = [];
            this._formationInfo[this.type - 1].supports = [];
            zj.Game.PlayerFormationSystem.formats[2].generals = [];
            zj.Game.PlayerFormationSystem.formats[2].supports = [];
            for (var i = 0; i < 8; i++) {
                if (i <= 3) {
                    this._formationInfo[this.type - 1].generals.push(this.c1[i]);
                    zj.Game.PlayerFormationSystem.formats[2].generals.push(this._formationInfo[this.type - 1].generals[i]);
                }
                else {
                    this._formationInfo[this.type - 1].supports.push(this.c1[i]);
                    zj.Game.PlayerFormationSystem.formats[2].supports.push(this._formationInfo[this.type - 1].supports[i - 4]);
                }
            }
        };
        /**
         * 工会战数据
         */
        CommonFormatePveMain.prototype.teamBattle = function (e) {
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
        };
        /**
         * 跨服格斗数据
         */
        CommonFormatePveMain.prototype.CrossServerCombat = function (e) {
            this.playerInfo = e.data.playerInfo;
            this.crossRealminfo = e.data.crossRealminfo;
            this.namedate = e.data.crossRealminfo.name;
            this.leveldate = e.data.crossRealminfo.level;
            this.enemyInfo = e.data.father;
            zj.Game.PlayerBattleSystem.singBattle = this.enemyInfo.enemyInfo;
        };
        /**
         * 本服格斗场
         */
        CommonFormatePveMain.prototype.fightField = function (e) {
            this.info = e.data.info;
            this.itemInfo = e.data.a;
        };
        /**
         * 执照数据
         */
        CommonFormatePveMain.prototype.permit = function (e) {
            this.permitInfo = e.data.licenseArray;
        };
        /**
         * 好友单队数据
         */
        CommonFormatePveMain.prototype.frjundsData = function (e) {
            this.formationsData = e.data.formationsData;
            this.frjundsInfo = e.data.info;
        };
        /**
         * 好友多队数据
         */
        CommonFormatePveMain.prototype.manyTeams = function (e) {
            this.manyTeamsFormations = e.data.manyTeamsFormations;
            this.manyTeamsInfo = e.data.manyTeamsInfo;
        };
        CommonFormatePveMain.prototype.onMsginfopData = function (e) {
            this.namedate = e.data.msgInfoName; // 名称
            this.leveldate = e.data.msgInfoLevel; // 等级
            this.msgInfoArea = e.data.msgInfoArea; // 区服
        };
        /**
         * 战斗力
         */
        CommonFormatePveMain.prototype.fightingCapacity = function (e) {
            var text = e.data.text;
            if (Number(text) >= Number(this.labelMonsterPower.text)) {
                this.labelMonsterPower.textColor = 0x4EFF00;
            }
            else {
                if (Number(this.labelMonsterPower.text) - Number(text) <= 2000) {
                    this.labelMonsterPower.textColor = 0xFF8300;
                }
                else {
                    this.labelMonsterPower.textColor = 0xFF0000;
                }
            }
        };
        /**
         * 连续战斗按钮
         */
        CommonFormatePveMain.prototype.onContinuous = function () {
            var _this = this;
            // 播放音效--点击“战斗”按钮
            zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30058), 100);
            this.cannotIsNo();
            if (this.generalCannotempty == true) {
                zj.toast_warning(zj.LANG("阵型为空，请至少选择一名猎人上阵"));
            }
            else {
                zj.Gmgr.Instance.maxContinueBattleSum = zj.ConstantConfig_RoleBattle.CONTINUE_BATTLE_MAX_NUM_TEST;
                var continue_battle_content1 = void 0;
                var continue_battle_content2 = void 0;
                var continue_battle_content3 = void 0;
                if (this.type == 5) {
                    continue_battle_content1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content1, zj.Gmgr.Instance.maxContinueBattleSum);
                    continue_battle_content2 = zj.TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content2;
                    continue_battle_content3 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content3, zj.Gmgr.Instance.maxContinueBattleSum);
                }
                else if (this.type == 8) {
                    continue_battle_content1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content1, 10);
                    continue_battle_content2 = zj.TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content2;
                    continue_battle_content3 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content3, 10);
                }
                zj.TipManager.SuccessionBattlePopTip(continue_battle_content1, continue_battle_content2, continue_battle_content3, function () {
                    _this.battleStart();
                });
            }
        };
        CommonFormatePveMain.prototype.cannotIsNo = function () {
            if (this.type == 16 || this.type == 22) {
                this.num0 = 0;
                this.num1 = 0;
                this.num2 = 0;
                for (var i = 0; i < 3; i++) {
                    var formatsSingleAttackIndo = zj.Game.PlayerFormationSystem.formatsSingleAttack[i];
                    if (i == 0) {
                        for (var j = 0; j < 4; j++) {
                            if (formatsSingleAttackIndo.generals[j] == 0) {
                                this.num0 = this.num0 + 1;
                            }
                        }
                    }
                    else if (i == 1) {
                        for (var j = 0; j < 4; j++) {
                            if (formatsSingleAttackIndo.generals[j] == 0) {
                                this.num1 = this.num1 + 1;
                            }
                        }
                    }
                    else if (i == 2) {
                        for (var j = 0; j < 4; j++) {
                            if (formatsSingleAttackIndo.generals[j] == 0) {
                                this.num2 = this.num2 + 1;
                            }
                        }
                    }
                }
            }
            else if (this.type == 8) {
                var street = zj.Game.PlayerWantedSystem.wantedBossDifficulty;
                for (var j = 0; j < 8; j++) {
                    if (street == j) {
                        if (this._formatsWant[j].generals[0] == 0 &&
                            this._formatsWant[j].generals[1] == 0 &&
                            this._formatsWant[j].generals[2] == 0 &&
                            this._formatsWant[j].generals[3] == 0) {
                            this.generalCannotempty = true;
                        }
                        else {
                            this.generalCannotempty = false;
                        }
                    }
                }
            }
            else if (this.type == 26) {
                var siteIndex = zj.Game.PlayerFormationSystem.siteIndex;
                for (var i = 0; i < 3; i++) {
                    if (siteIndex == i) {
                        if (this._formatsRelic[siteIndex].generals[0] == 0 &&
                            this._formatsRelic[siteIndex].generals[1] == 0 &&
                            this._formatsRelic[siteIndex].generals[2] == 0 &&
                            this._formatsRelic[siteIndex].generals[3] == 0) {
                            this.generalCannotempty = true;
                        }
                        else {
                            this.generalCannotempty = false;
                        }
                    }
                }
            }
            else {
                if (this._formationInfo[this.type - 1].generals[0] == 0 &&
                    this._formationInfo[this.type - 1].generals[1] == 0 &&
                    this._formationInfo[this.type - 1].generals[2] == 0 &&
                    this._formationInfo[this.type - 1].generals[3] == 0) {
                    this.generalCannotempty = true;
                }
                else {
                    this.generalCannotempty = false;
                }
            }
        };
        /**
         * 挑战按钮
         */
        CommonFormatePveMain.prototype.ButtonFight_CallBack = function () {
            var _this = this;
            zj.Game.PlayerInfoSystem.playAnnouce = false;
            // 播放音效--点击“战斗”按钮
            zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30058), 100);
            if (this.type == 8) {
                var text = zj.WantedSecondMeteorstanceScene.challenge;
                if (zj.Game.PlayerWantedSystem.ChallengeNumber <= 0 && zj.Game.PlayerWantedSystem.ChallengeNumber != null && text != "首杀不计次" && text != "无限制") {
                    zj.toast_warning("挑战次数不足");
                    return;
                }
            }
            this.cannotIsNo();
            var maxMobID = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxMobID;
            if (this.beNull == true) {
                // 进入战斗
                this.battleStart();
                //egret.setTimeout(this.onBtnReturn, this, 1000);
            }
            else {
                // 新手引导阶段
                if (zj.Teach.m_bOpenTeach == true) {
                    if (maxMobID == 100001 || (maxMobID > 100001 && maxMobID < 100008)) {
                        if (this.generalCannotempty == true) {
                            zj.toast_warning(zj.LANG("阵型为空，请至少选择一名猎人上阵"));
                        }
                        else {
                            if (this.datainfo0 == undefined && this.datainfo1 == undefined) {
                                if (this.datainfo0 > 5 && 3 <= this.datainfo1) {
                                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextConfig_Instance.errLeftPos, function () {
                                        _this.beNull = true;
                                        _this.battleStart();
                                    });
                                }
                                else {
                                    this.battleStart();
                                    this.onBtnReturn();
                                }
                            }
                            else {
                                if (this.datainfo0 > 5 && 3 <= this.datainfo1) {
                                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextConfig_Instance.errLeftPos, function () {
                                        _this.beNull = true;
                                        _this.battleStart();
                                    });
                                }
                                else {
                                    this.battleStart();
                                    this.onBtnReturn();
                                }
                            }
                        }
                    }
                    else {
                        this.onVacancy();
                    }
                }
                else {
                    if (this.type == 16 || this.type == 22) {
                        if (this.num0 != 4 && this.num1 != 4 && this.num2 != 4) {
                            this.battleStart();
                            this.onBtnReturn();
                        }
                        else if (this.num0 == 4 && this.num1 == 4 && this.num2 == 4) {
                            zj.toast_warning(zj.LANG("每队至少需要上阵一名猎人"));
                            this.num0 = 0;
                            this.num1 = 0;
                            this.num2 = 0;
                        }
                        else {
                            if (this.num0 == 4) {
                                zj.toast_warning(zj.LANG("第1队至少需要1人上阵"));
                                this.num0 = 0;
                            }
                            else if (this.num1 == 4) {
                                zj.toast_warning(zj.LANG("第2队至少需要1人上阵"));
                                this.num1 = 0;
                            }
                            else if (this.num2 == 4) {
                                zj.toast_warning(zj.LANG("第3队至少需要1人上阵"));
                                this.num2 = 0;
                            }
                        }
                    }
                    else {
                        this.onVacancy();
                    }
                }
            }
            if (this.beNull == true) {
                // 返回
                this.onBtnReturn();
            }
        };
        /**
         * 猎人空位 + list选中猎人 = 判断条件
         */
        CommonFormatePveMain.prototype.onVacancy = function () {
            var _this = this;
            if (this.generalCannotempty == true) {
                zj.toast_warning(zj.LANG("阵型为空，请至少选择一名猎人上阵"));
            }
            else {
                if (this.datainfo0 == undefined && this.datainfo1 == undefined) {
                    if (this.datainfo0 > 4 && 3 <= this.datainfo1) {
                        zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextConfig_Instance.errLeftPos, function () {
                            _this.beNull = true;
                            _this.battleStart();
                        });
                    }
                    else {
                        this.battleStart();
                    }
                }
                else {
                    if (this.datainfo0 > 4 && 3 <= this.datainfo1) {
                        zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextConfig_Instance.errLeftPos, function () {
                            _this.beNull = true;
                            _this.battleStart();
                        });
                    }
                    else {
                        this.battleStart();
                    }
                }
            }
        };
        /**
         * 阵容
         */
        CommonFormatePveMain.prototype.onButtonViewEnemyTeam = function () {
            for (var i = 0; i < 12; i++) {
                this["imgDownIcon" + i].source = ""; // 头像
                this["imgDownNum" + i].text = ""; // 上阵数量
            }
            if (this.battleArrayColor == true) {
                this.NodeYincang.visible = false;
                this.UnionDefense.visible = false;
                // Set.ButtonBackgroud(this.ButtonViewEnemyTeam, "ui_arena_ButtonViewEnemyTeamNewNor_png");
                this.battleArrayColor = false;
            }
            else {
                if (this.typeLua == 16) {
                    this.KFuttonDisplay();
                    var enemyInfo = void 0;
                    var general_id = void 0;
                    // 跨服格斗场防守阵容
                    for (var i = 0; i < 3; i++) {
                        enemyInfo = this.enemyInfo.enemyInfo[i];
                        if (i == 0) {
                            this.defense(enemyInfo, general_id, i);
                        }
                        else if (i == 1) {
                            this.defense(enemyInfo, general_id, i);
                        }
                        else if (i == 2) {
                            this.defense(enemyInfo, general_id, i);
                        }
                    }
                }
                else if (this.typeLua == 24) {
                    this.GHZuttonDisplay();
                    for (var i = 0; i < 4; i++) {
                        this["profilePhoto" + i].visible = false; // 头像
                        this["starNum" + i].visible = false; // 星星数
                        this["quantity" + i].visible = false; // 数量
                    }
                    // 工会战防守阵容
                    for (var i = 0; i < 4; i++) {
                        if (i == 0) {
                            this.unionBattleDefensiveLineups(i + 3, i);
                        }
                        else if (i == 1) {
                            this.unionBattleDefensiveLineups(i + 1, i);
                        }
                        else if (i == 2) {
                            this.unionBattleDefensiveLineups(i - 1, i);
                        }
                        else if (i == 3) {
                            this.unionBattleDefensiveLineups(i - 3, i);
                        }
                    }
                }
                else if (this.typeLua == 7) {
                    this.GHZuttonDisplay();
                    if (this.indexId == 0) {
                        this.thisSuitData(this.indexId);
                    }
                    else if (this.indexId == 1) {
                        this.thisSuitData(this.indexId);
                    }
                    else if (this.indexId == 2) {
                        this.thisSuitData(this.indexId);
                    }
                    else if (this.indexId == 3) {
                        this.thisSuitData(this.indexId);
                    }
                }
                else if (this.typeLua == 21) {
                    this.GHZuttonDisplay();
                    this.singleTeamPlayData(0);
                }
                else if (this.typeLua == 22) {
                    this.KFuttonDisplay();
                    var enemyInfo = void 0;
                    var general_id = void 0;
                    // 跨服格斗场防守阵容
                    for (var i = 0; i < 3; i++) {
                        enemyInfo = this.manyTeamsFormations[i].generals;
                        if (i == 0) {
                            this.manyTeamsData(enemyInfo, general_id, i);
                        }
                        else if (i == 1) {
                            this.manyTeamsData(enemyInfo, general_id, i);
                        }
                        else if (i == 2) {
                            this.manyTeamsData(enemyInfo, general_id, i);
                        }
                    }
                }
            }
        };
        /**
         * 跨服格斗场/好友/工会按钮显示
         */
        CommonFormatePveMain.prototype.KFuttonDisplay = function () {
            this.NodeYincang.visible = true;
            // Set.ButtonBackgroud(this.ButtonViewEnemyTeam, "ui_arena_ButtonConsealEnemyTeamNewNor_png");
            this.battleArrayColor = true;
        };
        /**
         * 工会战/好友/工会按钮显示
         */
        CommonFormatePveMain.prototype.GHZuttonDisplay = function () {
            this.UnionDefense.visible = true;
            // Set.ButtonBackgroud(this.ButtonViewEnemyTeam, "ui_arena_ButtonConsealEnemyTeamNewNor_png");
            this.battleArrayColor = true;
        };
        /**
         * 跨服格斗防守阵容数据
         */
        CommonFormatePveMain.prototype.defense = function (enemyInfo, general_id, i) {
            for (var j = 0; j < enemyInfo.simpleInfo.generals.length; j++) {
                if (enemyInfo.simpleInfo.generals[i].length == 3) {
                    general_id = enemyInfo.simpleInfo.generals[j];
                }
                else {
                    general_id = enemyInfo.simpleInfo.generals[j];
                    if (i == 0) {
                        if (j == 0) {
                            this.defensiveRotations(j + 3, general_id);
                        }
                        else if (j == 1) {
                            this.defensiveRotations(j + 1, general_id);
                        }
                        else if (j == 2) {
                            this.defensiveRotations(j - 1, general_id);
                        }
                        else if (j == 3) {
                            this.defensiveRotations(j - 3, general_id);
                        }
                    }
                    else if (i == 1) {
                        if (j == 0) {
                            this.defensiveRotations(j + 7, general_id);
                        }
                        else if (j == 1) {
                            this.defensiveRotations(j + 5, general_id);
                        }
                        else if (j == 2) {
                            this.defensiveRotations(j + 3, general_id);
                        }
                        else if (j == 3) {
                            this.defensiveRotations(j + 1, general_id);
                        }
                    }
                    else if (i == 2) {
                        if (j == 0) {
                            this.defensiveRotations(j + 11, general_id);
                        }
                        else if (j == 1) {
                            this.defensiveRotations(j + 9, general_id);
                        }
                        else if (j == 2) {
                            this.defensiveRotations(j + 7, general_id);
                        }
                        else if (j == 3) {
                            this.defensiveRotations(j + 5, general_id);
                        }
                    }
                }
            }
        };
        /**
         * 跨服格斗
         */
        CommonFormatePveMain.prototype.defensiveRotations = function (j, general_id) {
            if (general_id.general_id == 0 || general_id.general_id == null || general_id.general_id == undefined) {
                return;
            }
            else {
                this["imgDownFrame" + j].source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[general_id.step], this); // 框
                this["imgDownIcon" + j].source = zj.cachekey(zj.PlayerHunterSystem.Head(general_id), this); // 头像
                zj.Helper.SetHeroAwakenStar(this["groupDownStar" + j], general_id.star, general_id.level); // 几星武将
                this["imgDownNum" + j].text = general_id.level + ""; // 上阵数量
            }
        };
        /**
         * 好友--多队切磋防守阵容数据
         */
        CommonFormatePveMain.prototype.manyTeamsData = function (enemyInfo, general_id, i) {
            for (var j = 0; j < enemyInfo.length; j++) {
                if (enemyInfo[i].length == 4) {
                    general_id = enemyInfo[j];
                }
                else {
                    general_id = enemyInfo[j];
                    if (i == 0) {
                        if (j == 0) {
                            this.manyTeamss(j + 3, general_id);
                        }
                        else if (j == 1) {
                            this.manyTeamss(j + 1, general_id);
                        }
                        else if (j == 2) {
                            this.manyTeamss(j - 1, general_id);
                        }
                        else if (j == 3) {
                            this.manyTeamss(j - 3, general_id);
                        }
                    }
                    else if (i == 1) {
                        if (j == 0) {
                            this.manyTeamss(j + 7, general_id);
                        }
                        else if (j == 1) {
                            this.manyTeamss(j + 5, general_id);
                        }
                        else if (j == 2) {
                            this.manyTeamss(j + 3, general_id);
                        }
                        else if (j == 3) {
                            this.manyTeamss(j + 1, general_id);
                        }
                    }
                    else if (i == 2) {
                        if (j == 0) {
                            this.manyTeamss(j + 11, general_id);
                        }
                        else if (j == 1) {
                            this.manyTeamss(j + 9, general_id);
                        }
                        else if (j == 2) {
                            this.manyTeamss(j + 7, general_id);
                        }
                        else if (j == 3) {
                            this.manyTeamss(j + 5, general_id);
                        }
                    }
                }
            }
        };
        /**
         *  好友--多队切磋
         */
        CommonFormatePveMain.prototype.manyTeamss = function (j, general_id) {
            if (general_id.general_id == 0 || general_id.general_id == null || general_id.general_id == undefined) {
                return;
            }
            else {
                this["imgDownFrame" + j].source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[general_id.step], this); // 框
                this["imgDownIcon" + j].source = zj.cachekey(zj.PlayerHunterSystem.Head(general_id), this); // 头像
                zj.Helper.SetHeroAwakenStar(this["groupDownStar" + j], general_id.star, general_id.level); // 几星武将
                this["imgDownNum" + j].text = general_id.level + ""; // 上阵数量
            }
        };
        /**
         * 工会战防守阵容
         */
        CommonFormatePveMain.prototype.unionBattleDefensiveLineups = function (i, j) {
            // 主将
            if (this.formations.generals[j].general_id == 0 || this.formations.generals[j].general_id == undefined || this.formations.generals[j].general_id == null) {
                this["headPortrait" + i].visible = false;
                this["star" + i].visible = false;
                this["numtext" + i].visible = false;
                this["pitchOn" + i].visible = false;
            }
            else {
                this["frame" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[this.formations.generals[j].step], this); // 框
                this["headPortrait" + i].source = zj.cachekey(zj.PlayerHunterSystem.Head(this.formations.generals[j].general_id), this); // 头像
                zj.Helper.SetHeroAwakenStar(this["star" + i], this.formations.generals[j].star, this.formations.generals[j].level); // 几星武将
                this["numtext" + i].text = this.formations.generals[j].level + ""; // 上阵数量
                this["pitchOn" + i].visible = true;
                this["without" + i].visible = false;
            }
        };
        /**
         * 好友--单队切磋防守数据
         */
        CommonFormatePveMain.prototype.singleTeamPlayData = function (infoIndex) {
            // 主将
            if (this.formationsData[infoIndex].generals.length == 0 || this.formationsData[infoIndex].generals.length == undefined) {
                for (var i = 0; i < 4; i++) {
                    this["headPortrait" + i].visible = false; // 头像
                    this["star" + i].visible = false; // 星星数
                    this["numtext" + i].visible = false; // 数量
                }
            }
            else {
                for (var i = 0; i < 4; i++) {
                    if (i == 0) {
                        this.friendsTeams(infoIndex, i + 3, i);
                    }
                    else if (i == 1) {
                        this.friendsTeams(infoIndex, i + 1, i);
                    }
                    else if (i == 2) {
                        this.friendsTeams(infoIndex, i - 1, i);
                    }
                    else if (i == 3) {
                        this.friendsTeams(infoIndex, i - 3, i);
                    }
                }
            }
            // 副将
            if (this.formationsData[infoIndex].supports.length == 0 || this.formationsData[infoIndex].supports.length == undefined) {
                for (var i = 0; i < 4; i++) {
                    this["profilePhoto" + i].visible = false; // 头像
                    this["starNum" + i].visible = false; // 星星数
                    this["quantity" + i].visible = false; // 数量
                }
            }
            else {
                for (var i = 0; i < 4; i++) {
                    if (i == 0) {
                        this.friendsTeams(infoIndex, i + 3, i);
                    }
                    else if (i == 1) {
                        this.friendsTeams(infoIndex, i + 1, i);
                    }
                    else if (i == 2) {
                        this.friendsTeams(infoIndex, i - 1, i);
                    }
                    else if (i == 3) {
                        this.friendsTeams(infoIndex, i - 3, i);
                    }
                }
            }
        };
        /**
         * 好友--单队切磋
         */
        CommonFormatePveMain.prototype.friendsTeams = function (infoIndex, i, j) {
            // 主将
            if (this.formationsData[infoIndex].generals[j] == 0 || this.formationsData[infoIndex].generals[j] == undefined || this.formationsData[infoIndex].generals[j] == null) {
                this["headPortrait" + i].visible = false; // 头像
                this["star" + i].visible = false; // 星星
                this["numtext" + i].visible = false; // 数量
            }
            else {
                //Game.PlayerHunterSystem.queryHunter(this.itemInfo[infoIndex].formation.generals[j]).star;
                this["frame" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[this.formationsData[infoIndex].generals[j].step], this); // 框
                this["headPortrait" + i].source = zj.cachekey(zj.PlayerHunterSystem.Head(this.formationsData[infoIndex].generals[j]), this); // 头像
                zj.Helper.SetHeroAwakenStar(this["star" + i], this.formationsData[infoIndex].generals[j].star, this.formationsData[infoIndex].generals[j].level); // 几星武将
                this["numtext" + i].text = this.formationsData[infoIndex].generals[j].level + ""; // 上阵数量
                this["pitchOn" + i].visible = true;
                this["without" + i].visible = false;
            }
            // 副将
            if (this.formationsData[infoIndex].supports[j] == 0 || this.formationsData[infoIndex].supports[j] == undefined || this.formationsData[infoIndex].supports[j] == null) {
                this["profilePhoto" + i].visible = false; // 头像
                this["starNum" + i].visible = false; // 星星
                this["quantity" + i].visible = false; // 数量
            }
            else {
                this["circumscribe" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[this.formationsData[infoIndex].supports[j].step], this); // 框
                this["profilePhoto" + i].source = zj.cachekey(zj.PlayerHunterSystem.Head(this.formationsData[infoIndex].supports[j]), this); // 头像
                zj.Helper.SetHeroAwakenStar(this["starNum" + i], this.formationsData[infoIndex].supports[j].star, this.formationsData[infoIndex].supports[j].level); // 几星武将
                this["quantity" + i].text = this.formationsData[infoIndex].supports[j].level + ""; // 上阵数量
                this["assistance" + i].visible = false;
                this["without" + i].visible = false;
            }
        };
        /**
         * 本服防守数据
         */
        CommonFormatePveMain.prototype.thisSuitData = function (infoIndex) {
            // 主将
            if (this.itemInfo[infoIndex].formation.generals.length == 0 || this.itemInfo[infoIndex].formation.generals.length == undefined) {
                for (var i = 0; i < 4; i++) {
                    this["headPortrait" + i].visible = false; // 头像
                    this["star" + i].visible = false; // 星星数
                    this["numtext" + i].visible = false; // 数量
                }
            }
            else {
                for (var i = 0; i < 4; i++) {
                    if (i == 0) {
                        this.thisSuit(infoIndex, i + 3, i);
                    }
                    else if (i == 1) {
                        this.thisSuit(infoIndex, i + 1, i);
                    }
                    else if (i == 2) {
                        this.thisSuit(infoIndex, i - 1, i);
                    }
                    else if (i == 3) {
                        this.thisSuit(infoIndex, i - 3, i);
                    }
                }
            }
            // 副将
            if (this.itemInfo[infoIndex].formation.supports.length == 0 || this.itemInfo[infoIndex].formation.supports.length == undefined) {
                for (var i = 0; i < 4; i++) {
                    this["profilePhoto" + i].visible = false; // 头像
                    this["starNum" + i].visible = false; // 星星数
                    this["quantity" + i].visible = false; // 数量
                }
            }
            else {
                for (var i = 0; i < 4; i++) {
                    if (i == 0) {
                        this.thisSuit(infoIndex, i + 3, i);
                    }
                    else if (i == 1) {
                        this.thisSuit(infoIndex, i + 1, i);
                    }
                    else if (i == 2) {
                        this.thisSuit(infoIndex, i - 1, i);
                    }
                    else if (i == 3) {
                        this.thisSuit(infoIndex, i - 3, i);
                    }
                }
            }
        };
        /**
         * 本服格斗场
         */
        CommonFormatePveMain.prototype.thisSuit = function (infoIndex, i, j) {
            // 主将
            if (this.itemInfo[infoIndex].formation.generals[j] == 0 || this.itemInfo[infoIndex].formation.generals[j] == null || this.itemInfo[infoIndex].formation.generals[j] == undefined) {
                this["headPortrait" + i].visible = false; // 头像
                this["star" + i].visible = false; // 星星
                this["numtext" + i].visible = false; // 数量 
            }
            else {
                //Game.PlayerHunterSystem.queryHunter(this.itemInfo[infoIndex].formation.generals[j]).star;
                this["frame" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[this.itemInfo[infoIndex].formation.generals[j].step], this); // 框
                if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                    this["headPortrait" + i].source = zj.cachekey("wx_" + zj.PlayerHunterSystem.Head(this.itemInfo[infoIndex].formation.generals[j]), this); // 头像
                }
                else {
                    this["headPortrait" + i].source = zj.cachekey(zj.PlayerHunterSystem.Head(this.itemInfo[infoIndex].formation.generals[j]), this); // 头像
                }
                zj.Helper.SetHeroAwakenStar(this["star" + i], this.itemInfo[infoIndex].formation.generals[j].star, this.itemInfo[infoIndex].formation.generals[j].level); // 几星武将
                this["numtext" + i].text = this.itemInfo[infoIndex].formation.generals[j].level + ""; // 上阵数量
                this["pitchOn" + i].visible = true;
                this["without" + i].visible = false;
            }
            // 副将
            if (this.itemInfo[infoIndex].formation.supports[j] == 0 || this.itemInfo[infoIndex].formation.supports[j] == undefined || this.itemInfo[infoIndex].formation.supports[j] == null) {
                this["profilePhoto" + i].visible = false; // 头像
                this["starNum" + i].visible = false; // 星星
                this["quantity" + i].visible = false; // 数量
            }
            else {
                this["circumscribe" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[this.itemInfo[infoIndex].formation.supports[j].step], this); // 框
                if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                    this["profilePhoto" + i].source = zj.cachekey("wx_" + zj.PlayerHunterSystem.Head(this.itemInfo[infoIndex].formation.supports[j]), this); // 头像
                }
                else {
                    this["profilePhoto" + i].source = zj.cachekey(zj.PlayerHunterSystem.Head(this.itemInfo[infoIndex].formation.supports[j]), this); // 头像
                }
                zj.Helper.SetHeroAwakenStar(this["starNum" + i], this.itemInfo[infoIndex].formation.supports[j].star, this.itemInfo[infoIndex].formation.supports[j].level); // 几星武将
                this["quantity" + i].text = this.itemInfo[infoIndex].formation.supports[j].level + ""; // 上阵数量
                this["assistance" + i].visible = false;
                this["without" + i].visible = false;
            }
        };
        /**
         * 1阶段
         */
        CommonFormatePveMain.prototype.phases1 = function () {
            this.btnColour();
            zj.Set.ButtonBackgroud(this.phase1, "ui_darkland_relic_ButtonStage1Sel_png");
            this.phaseSwitchover(0);
        };
        /**
         * 2阶段
         */
        CommonFormatePveMain.prototype.phases2 = function () {
            this.btnColour();
            zj.Set.ButtonBackgroud(this.phase2, "ui_darkland_relic_ButtonStage2Sel_png");
            this.phaseSwitchover(1);
        };
        /**
         * 3阶段
         */
        CommonFormatePveMain.prototype.phases3 = function () {
            this.btnColour();
            zj.Set.ButtonBackgroud(this.phase3, "ui_darkland_relic_ButtonStage3Sel_png");
            this.phaseSwitchover(2);
        };
        /**
         * 4阶段
         */
        CommonFormatePveMain.prototype.phases4 = function () {
            this.btnColour();
            zj.Set.ButtonBackgroud(this.phase4, "ui_darkland_relic_ButtonStage4Sel_png");
            this.phaseSwitchover(3);
        };
        /**
         * 5阶段
         */
        CommonFormatePveMain.prototype.phases5 = function () {
            this.btnColour();
            zj.Set.ButtonBackgroud(this.phase5, "ui_darkland_relic_ButtonStage5Sel_png");
            this.phaseSwitchover(4);
        };
        /**
         * 将所有按钮颜色变暗
         */
        CommonFormatePveMain.prototype.btnColour = function () {
            for (var i = 1; i < 6; i++) {
                var str = "ui_darkland_relic_ButtonStage" + i + "Nor_png";
                zj.Set.ButtonBackgroud(this["phase" + i], str);
            }
        };
        /**
         * 1-5阶段按钮切换
         */
        CommonFormatePveMain.prototype.phaseSwitchover = function (index) {
            this.listBottomData.removeAll();
            for (var i = 0; i < this.features[index].length; i++) {
                var data = new zj.CommonBossSkillData();
                data.mobId = this.features[index][i];
                data.father = this;
                this.listBottomData.addItem(data);
            }
            this.listBossSkill.dataProvider = this.listBottomData;
        };
        CommonFormatePveMain.prototype.FightCB = function () {
            if (this.type == 16) {
                zj.Game.PlayerFormationSystem.SaveSingleFormation(); // 跨服格斗场保存阵容信息
            }
            else if (this.type == 8) {
                zj.Game.PlayerFormationSystem.SaveWantFormation(); // 流星街保存阵容信息
            }
            else if (this.type == 26) {
                zj.Game.PlayerFormationSystem.SaveRelicFormation(); // 遗迹保存阵容信息    
            }
            else if (this.type == 21) {
                zj.Game.PlayerFormationSystem.saveFormations(); //好友/工会--单队切磋
            }
            else if (this.type == 22) {
                zj.Game.PlayerFormationSystem.SaveSingleFormation(); // 跨服格斗场 / 好友--三队切磋
            }
            else {
                zj.Game.PlayerFormationSystem.saveFormations(); // 其他副本保存阵容信息
            }
            if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = false;
                zj.Helper.cacheSkillSpineId(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightNormal);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE, this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightNormal);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE, message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE, message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE), this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightLeagueInstance);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER || this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                if (this.type == 5) {
                    zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER, message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER, message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER), this.enemys);
                    zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightTower);
                }
                else if (this.type == 20) {
                    zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER, message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER, message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER), this.enemys);
                    zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightTower);
                }
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS, message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS, message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS), this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightBLeagueBoss);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_WANTED) {
                zj.Gmgr.Instance.autoContinueBattleNum();
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(this.type, this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightWanted);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
                zj.Gmgr.Instance.starcraftIndex = 1;
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK, message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK, message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK), this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightBSingle);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK, message.EFormationType.FORMATION_TYPE_MATCH_ATTACK, message.EFormationType.FORMATION_TYPE_MATCH_ATTACK), this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightMatch);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK, message.EFormationType.FORMATION_TYPE_LADDER_ATTACK, message.EFormationType.FORMATION_TYPE_LADDER_ATTACK), this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightArena);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE, message.EFormationType.FORMATION_TYPE_MISSION_LICENCE, message.EFormationType.FORMATION_TYPE_MISSION_LICENCE), this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightLicense);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ZORK) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_ZORK, message.EFormationType.FORMATION_TYPE_ZORK, message.EFormationType.FORMATION_TYPE_ZORK), this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightBZorkBoss);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS, message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS, message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS), this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightActivityBoss);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(zj.yuan3(this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY, message.EFormationType.FORMATION_TYPE_ACTIVITY, message.EFormationType.FORMATION_TYPE_ACTIVITY), this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightActivity); //接入战斗
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_RELIC) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(this.type, this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightRelic);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(this.type, this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightBOneBattle);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                zj.Helper.cacheSkillSpineId(this.type, this.enemys);
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightBThreeBattle);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
                // Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].bReview = true;
                // Helper.cacheSkillSpineId(message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND, this.enemys);
                zj.StageSceneFightRand.indexId = this.indexId;
                zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightRand);
            }
        };
        // 副本挑战
        CommonFormatePveMain.prototype.battleStart = function () {
            var _this = this;
            var request = new message.BattleStartRequest();
            if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                request.body.id = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                request.body.id = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                request.body.id = zj.Game.PlayerLeagueSystem.leagueInstance.curInstanceId;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER || this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                if (this.type == 5) {
                    request.body.id = zj.Game.PlayerTowerSystem.towerInfo.towerCur;
                }
                else if (this.type == 20) {
                    // request.body.id = Game.PlayerTowerSystem.towerInfo.high_tower_cur;
                }
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                request.body.id = zj.Game.PlayerLeagueSystem.leagueBoss.bossInfo.stage_id;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_WANTED) {
                request.body.id = this.indexId;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
                request.body.id = this.crossRealminfo.role_id;
                var enemy_info = new message.RoleBriefInfo;
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
                zj.Game.PlayerBattleSystem.pvpOppBriefInfo = enemy_info;
                zj.Gmgr.Instance.singleHonor = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_HONOR_COIN);
                zj.Gmgr.Instance.singleScore = this.crossRealminfo.craft_score;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {
                zj.Game.PlayerBattleSystem.pvpOppBriefInfo = this.enemyunionInfo.baseInfo;
                request.body.id = Math.floor(this.infoIndex / 100);
                zj.Gmgr.Instance.matchHard = this.infoIndex;
                zj.Game.PlayerBattleSystem.battleDetailFormation = this.enemyunionInfo.formation;
                zj.Gmgr.Instance.matchEnemyName = this.infoName + "&" + this.enemyunionInfo.baseInfo.picId + "&" + this.enemyunionInfo.baseInfo.picFrameId;
                zj.Gmgr.Instance.preStar = this.infoDataaccount.star;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                var baseInfo = this.itemInfo[this.indexId].baseInfo;
                request.body.id = baseInfo.id;
                zj.Game.PlayerBattleSystem.pvpOppBriefInfo = baseInfo;
                zj.Gmgr.Instance.arenaRoleId = baseInfo.id;
                zj.Gmgr.Instance.arenaRank = zj.Game.PlayerInfoSystem.BaseInfo.ladderRank;
                zj.Gmgr.Instance.arenaBestRank = zj.Game.PlayerInfoSystem.BaseInfo.ladderMax;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                request.body.id = this.permitInfo[2];
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ZORK) {
                request.body.id = 0;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                request.body.id = zj.Game.PlayerBossSystem.ActivityBoss.bossId;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY) {
                request.body.id = zj.PlayerActivitySystem.activityBattleCurPos;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_RELIC) {
                request.body.id = this.indexId;
                zj.Game.PlayerMissionSystem.fightExt = this.indexId - 1;
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                zj.Game.PlayerBattleSystem.battleDetailFormation = this.formationsData[0]; // 详细武将阵型
                zj.Game.PlayerBattleSystem.pvpOppBriefInfo = this.frjundsInfo; // pvp对方君主简要信息
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                zj.Gmgr.Instance.singleHonor = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_HONOR_COIN);
                zj.Game.PlayerFormationSystem.threeBattleInfo = this.manyTeamsFormations;
                zj.Game.PlayerBattleSystem.pvpOppBriefInfo = this.manyTeamsInfo;
                zj.Gmgr.Instance.starcraftIndex = 1;
                zj.Game.PlayerFormationSystem.curFormationIndex = 1;
                zj.Game.PlayerBattleSystem.battleDetailFormation = zj.Game.PlayerFormationSystem.threeBattleInfo[0];
                //Gmgr.Instance.singleScore = this.crossRealminfo.craft_score;          
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;
                request.body.id = this.indexId;
            }
            request.body.type = this.typeLua;
            if (this.type == 16 || this.type == 29) {
                request.body.ext = 1;
            }
            else if (this.type == 24) {
                request.body.ext = this.indexId;
            }
            else {
                request.body.ext = 0;
            }
            // if ((this.type == 2 && Game.PlayerCardSystem.getCardNumber() >= CommonConfig.potapo_max_number + Game.PlayerInfoSystem.BaseInfo.potato_buy_count) ||
            //     this.type == 8 && Game.PlayerCardSystem.getCardNumber() >= CommonConfig.potapo_max_number + Game.PlayerInfoSystem.BaseInfo.potato_buy_count && Game.PlayerWantedSystem.GetClientDropHaveCard(Game.PlayerWantedSystem.wantedCurPos)) {
            //     //toast_warning(TextsConfig.TextsConfig_Hunter_Instance.card_full_tips);
            //     FightLoading.getInstance().loadFightRes(this.type, this.FightCB, this);
            // } else 
            if (this.type == 21 || this.type == 22) {
                zj.FightLoading.getInstance().loadFightRes(this.type, this.FightCB, this);
            }
            else {
                zj.Game.PlayerBattleSystem.sendFight(request)
                    .then(function (value) {
                    _this.BattleStartInstance_Visit(value);
                    _super.prototype.onBtnReturn.call(_this);
                })
                    .catch(function (reason) {
                });
            }
        };
        CommonFormatePveMain.prototype.BattleStartInstance_Visit = function (response) {
            if (response.header.result != 0) {
                return;
            }
            zj.FightLoading.getInstance().loadFightRes(this.type, this.FightCB, this);
        };
        /**
         * 调用FormatChoose基类中onAddToStage函数
         */
        CommonFormatePveMain.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
        };
        /**
         * 所有副本初始化
         */
        CommonFormatePveMain.prototype.setInfo = function (index) {
            var _this = this;
            // 播放音效--进入选将界面时
            zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30057), 100);
            if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
                zj.Game.PlayerFormationSystem.blowGuide = index;
                this.LoadEnemys();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
                zj.Game.PlayerFormationSystem.blowGuide = index;
                this.Loadelite();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE;
                this.laborUnionEctype(index);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_TOWER || this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
                if (this.type == 5) {
                    this.typeLua = 5;
                }
                else if (this.type == 20) {
                    this.typeLua = 20;
                }
                this.skyCity(index);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS;
                this.beastBoss();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_WANTED) {
                this.indexId = index;
                this.typeLua = message.EFormationType.FORMATION_TYPE_WANTED;
                this.block(index);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
                this.crossBeam();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK) {
                this.indexId = index;
                this.typeLua = message.EFormationType.FORMATION_TYPE_MATCH_ATTACK;
                zj.Game.PlayerFormationSystem.LeagueMatchFortressTeam(this.leagueInfo.leagueId, Math.floor(this.infoIndex / 100), this.infoIndex)
                    .then(function (datailRoleFormation) {
                    _this.enemyunionInfo = datailRoleFormation;
                    _this.teamFight();
                }).catch(function () {
                });
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_LADDER_ATTACK;
                this.indexId = index;
                this.LocalFightingGround();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
                this.aloneFight();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
                this.multiplayerFight();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_MISSION_LICENCE) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_MISSION_LICENCE;
                this.license(index);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ZORK) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_ZORK;
                this.worldBoss();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_RELIC) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_RELIC;
                this.indexId = index + 1;
                this.relic(this.indexId);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS;
                this.activityBoss();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_ACTIVITY;
                this.storyInstance();
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
                this.typeLua = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;
                this.indexId = index;
                this.LoadRatpups(index);
            }
            //boss信息
            this.LoadBoss();
        };
        /**
         * 冒险副本数据信息
         */
        CommonFormatePveMain.prototype.LoadEnemys = function () {
            // this.shade1.y = 28;
            // this.shade1.height = 80;
            // 技能位置
            // this.scroller.x = 100;
            // 副本信息
            var tableInstance = zj.TableInstance.Table();
            var mobId = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].curMobID;
            // 副本包含的关卡
            var stages = tableInstance[mobId].instance_pack;
            // 怪物特性
            this.features = tableInstance[mobId].feature;
            // 怪物信息
            this.enemys = getEnemyFomation(stages);
            // 推荐战力
            this.monsterPower = tableInstance[mobId].battle_value;
            this.labelMonsterPower.text = zj.Set.NumberUnit3(this.monsterPower);
        };
        /**
         * 冒险鼠崽闹春数据信息
         */
        CommonFormatePveMain.prototype.LoadRatpups = function (index) {
            // 副本信息
            var tableInstance = zj.TableActivityRandInstance.Table();
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
            this.labelMonsterPower.text = zj.Set.NumberUnit3(this.monsterPower);
        };
        /**
         * 精英副本数据信息
         */
        CommonFormatePveMain.prototype.Loadelite = function () {
            // this.shade1.y = 28;
            // this.shade1.height = 85;
            // 技能位置
            // this.scroller.x = 100;
            // 推荐战斗力 数值 底色 隐藏
            // this.bottomColour.visible = false;
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;
            // 副本信息
            var tableInstance = zj.TableInstance.Table();
            var mobId = zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE].curMobID;
            // 副本包含的关卡
            var stages = tableInstance[mobId].instance_pack;
            // 怪物特性
            this.features = tableInstance[mobId].feature;
            // 怪物信息
            this.enemys = getEnemyFomation(stages);
            // 推荐战力
            this.monsterPower = tableInstance[mobId].battle_value;
            this.labelMonsterPower.text = zj.Set.NumberUnit3(this.monsterPower);
        };
        /**
         * 工会副本数据信息
         */
        CommonFormatePveMain.prototype.laborUnionEctype = function (index) {
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
            var instances = zj.Game.PlayerLeagueSystem.Instances;
            // 工会信息--获取联盟副本表
            var tbInstance = zj.Game.PlayerLeagueSystem.getAllInstance();
            // 所有关卡信息
            var stage = zj.Game.PlayerLeagueSystem.leagueInstance.leagueInstanceStageInfo[1].stageInfo;
            this.enemys = getEnemyFomation([stage.stage_id]);
            // 怪物特性
            this.features = tbInstance[index].feature;
            // 推荐战斗力
            this.monsterPower = tbInstance[index].recommend_power;
            this.labelMonsterPower.text = zj.Set.NumberUnit3(this.monsterPower);
            // 当前boss剩余血量数值
            var perect = instances[index - 1].stageInfos[0].curHp;
            if (perect > 1)
                perect = 1;
            // "100.0%"
            this.bossHpbg.width = (perect) * 201;
            this.bossHpLabel.text = (perect * 100).toFixed(0) + "%";
        };
        /**
         * 工会boss副本数据信息
         */
        CommonFormatePveMain.prototype.beastBoss = function () {
            // this.bottomColour.visible = false;
            // 获取工会boss表
            var tblLeagueBoss = zj.TableLeagueAnimals.Table();
            // 关卡信息
            var stage = zj.Game.PlayerLeagueSystem.leagueBoss.bossInfo;
            // boss特性
            this.features = tblLeagueBoss[1].feature;
            // 怪物信息
            this.enemys = getEnemyFomation([stage.stage_id]);
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;
        };
        /**
         * 流星街副本数据信息
         */
        CommonFormatePveMain.prototype.block = function (index) {
            this.wantContinuousNum = index;
            if (this.wantContinuousNum > 20001) {
                this.ButtonFight.x = 25;
                this.scroller.x = 100;
                // this.ButtonSuccessionBattle.visible = true;
            }
            else {
                // this.ButtonSuccessionBattle.visible = false;
            }
            // 推荐战斗力 数值 底色 隐藏
            // this.bottomColour.visible = false;
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;
            // 关卡信息
            var stages = zj.TableWanted.Item(index).instance_pack;
            // boss特性
            this.features = zj.TableWanted.Item(index).feature;
            // 怪物信息
            this.enemys = getEnemyFomation(stages);
            // boss战斗力
            this.monsterPower = zj.TableWanted.Item(index).battle_value;
            this.labelMonsterPower.text = zj.Set.NumberUnit3(this.monsterPower);
        };
        /**
         * 跨服格斗场副本数据信息
         */
        CommonFormatePveMain.prototype.crossBeam = function () {
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
        };
        /**
         * 工会战副本数据信息
         */
        CommonFormatePveMain.prototype.teamFight = function () {
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
            var json = JSON.parse(this.leagueInfo.group_name);
            var arr = json[zj.Game.LanguageManager.getLang()].split("&");
            // 当前区
            this.subarea.text = arr[0] + "区" + "  " + arr[1];
            this.subarea.size = 16;
        };
        /**
         * 本服格斗场副本数据信息
         */
        CommonFormatePveMain.prototype.LocalFightingGround = function () {
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
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                this.labelBossName.text = "";
            }
            else {
                this.labelBossName.text = this.info[0] + "";
            }
            // 玩家等级
            this.subarea.text = this.info[1] + "";
            this.subarea.size = 16;
            this.groupRight.right = -80;
            this.groupRD.left = 50;
        };
        /**
         * 好友--单队切磋副本数据信息
         */
        CommonFormatePveMain.prototype.aloneFight = function () {
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
            zj.Game.PlayerBattleSystem.pvpOppBriefInfo = this.frjundsInfo;
            // 服务器名称(本服/跨服)
            this.labelBossName.text = zj.Game.PlayerRelateSystem.serverName + ""; //本服";
            // 玩家等级/名称
            this.subarea.text = "Lv" + this.frjundsInfo.level + " " + this.frjundsInfo.name + "";
            this.subarea.size = 16;
            this.groupRight.right = -80;
            this.groupRD.left = 50;
        };
        /**
         * 好友--三队切磋副本数据信息
         */
        CommonFormatePveMain.prototype.multiplayerFight = function () {
            // 阵容显示
            this.ButtonViewEnemyTeam.visible = true;
            this.ButtonViewEnemyTeam.y = 125;
            this.bossMessage.visible = false;
            this.figureMessage.visible = true;
            this.black3.visible = false;
            this.blackLable3.visible = false;
            zj.Game.PlayerBattleSystem.pvpOppBriefInfo = this.frjundsInfo;
            // 玩家等级/名称
            //this.blackLable1.text = "Lv" + this.leveldate + " " + this.namedate + "";
            this.blackLable1.text = "Lv" + this.manyTeamsInfo.level + " " + this.manyTeamsInfo.name + "";
            this.blackLable1.size = 16;
            // 服务器名称(本服/跨服) 
            //this.blackLable2.text = this.msgInfoArea + "";
            this.blackLable2.text = "本服";
            this.groupRight.right = -80;
            this.groupRD.left = 50;
        };
        /**
         * 天空之塔副本数据信息
         */
        CommonFormatePveMain.prototype.skyCity = function (index) {
            // 显示连续战斗按钮
            if (this.type == 5) {
                this.ButtonFight.x = 25;
                this.scroller.x = 100;
                // this.ButtonSuccessionBattle.visible = true;
            }
            else if (this.type == 20) {
                // this.ButtonSuccessionBattle.visible = false;
            }
            // 获取天空竞技场副本表
            var tblTower = zj.Game.PlayerTowerSystem.getTableTower();
            var message = zj.Game.PlayerInstanceSystem.MonsterTowerIndex;
            // 关卡信息
            var stages = tblTower[index].tower_pack[message];
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
            }
            else {
                this.labelMonsterPower.text = zj.Set.NumberUnit3(this.monsterPower);
            }
        };
        /**
         * 执照副本数据信息
         */
        CommonFormatePveMain.prototype.license = function (index) {
            // 技能位置
            // this.scroller.x = 100;
            // 名称
            this.labelBossName.text = this.permitInfo[0] + "";
            var tblLicense = zj.TableMissionLicence.Table();
            var stages = tblLicense[index].battle_id;
            this.features = tblLicense[index].feature;
            this.enemys = getEnemyFomation([stages]);
            this.labelMonsterPower.text = zj.Set.NumberUnit3(tblLicense[index].battle_value);
        };
        /**
         * 世界boss副本数据信息
         */
        CommonFormatePveMain.prototype.worldBoss = function () {
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
            this.bossInfo = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo;
            zj.Game.PlayerStageSystem.insert(this.bossInfo.bossInfo);
            // 获取世界boss表
            var tblWorldBoss = zj.TableClientWorldBoss.Table();
            var armystage = this.bossInfo.bossInfo;
            // boss特性
            this.features = tblWorldBoss[1].feature;
            // 怪物信息
            this.enemys = getEnemyFomation([armystage.stage_id]);
            this.bossHpbg.width = (zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre) * 201;
            this.bossHpLabel.text = (zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre * 100).toFixed(0) + "%";
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
        };
        /**
         * 年兽BOSS信息
         */
        CommonFormatePveMain.prototype.activityBoss = function () {
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
            var tblWorldBoss = zj.TableClientWorldBoss.Table();
            this.features = tblWorldBoss[zj.Game.PlayerBossSystem.ActivityBoss.bossId].feature;
            this.enemys = getEnemyFomation([zj.Game.PlayerBossSystem.ActivityBoss.bossId]);
            this.bossHpLabel.text = "100%";
        };
        /**
         * 猎人故事数据信息
         */
        CommonFormatePveMain.prototype.storyInstance = function () {
            // 技能位置
            // this.scroller.x = 75;
            var tblLicense = zj.TableActivityBattleInstance.Table();
            var stages = tblLicense[zj.PlayerActivitySystem.activityBattleCurPos].instance_stage;
            this.features = tblLicense[zj.PlayerActivitySystem.activityBattleCurPos].feature;
            this.enemys = getEnemyFomation(stages);
            // this.bottomColour.visible = false;
            this.recommend.visible = false;
            this.labelMonsterPower.visible = false;
        };
        /**
         * 遗迹探索副本数据信息
         */
        CommonFormatePveMain.prototype.relic = function (index) {
            var cell = index;
            // 遗迹探索表
            var tblRelic = zj.TableInstanceRelic.Table();
            // 关卡
            var stages = tblRelic[cell].monster_stage;
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
        };
        /**
         * boss信息
         */
        CommonFormatePveMain.prototype.LoadBoss = function () {
            if (this.type == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK ||
                this.type == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE ||
                this.type == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                var boneName = zj.TableClientFightAniSpineSource.Item(1032).json;
                this.LoadModel(boneName);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK) {
                var picTable = zj.TableItemPic.Table();
                var picMapRoleId = picTable[this.playerInfo[3]].mapRole_id;
                var instance = zj.TableMapRole.Item(picMapRoleId);
                var boneName = zj.TableClientFightAniSpineSource.Item(instance.body_spx_id).json;
                this.LoadModel(boneName);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK) {
                // 本服数据
                var hhsad = this.itemInfo[this.indexId].baseInfo;
                // 物品头像表
                var picTable = zj.TableItemPic.Table();
                // 根据头像找到模型id
                var picMapRoleId = picTable[hhsad.picId].mapRole_id;
                // 获取模型id
                var id = zj.TableMapRole.Item(picMapRoleId);
                // 异步播放龙骨--加载boss模型资源
                var boneName = zj.TableClientFightAniSpineSource.Item(id.body_spx_id).json;
                // 加载模型方法
                this.LoadModel(boneName);
            }
            else if (this.type == message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND) {
                var info = zj.TableActivityRandInstance.Item(this.indexId);
                // 获取模型id
                var id = zj.TableMapRole.Item(info.boss_roleId);
                // 异步播放龙骨--加载boss模型资源
                var boneName = zj.TableClientFightAniSpineSource.Item(id.body_spx_id).json;
                // 加载模型方法
                this.LoadModel(boneName);
                this.bossInfo = info;
                // this.SetBossInfo(this.bossInfo, this.features);
                this.labelBossName.text = info.name;
                this.listBottomData.removeAll();
                for (var i = 0; i < info.feature.length; i++) {
                    var data = new zj.CommonBossSkillData();
                    data.mobId = info.feature[i];
                    data.father = this;
                    this.listBottomData.addItem(data);
                }
                this.listBossSkill.dataProvider = this.listBottomData;
            }
            else {
                // boss信息
                this.bossInfo = zj.Game.PlayerMobSystem.Instance(this.enemys[0].id);
                // 当前副本信息
                this.curInfo = zj.Game.PlayerMobSystem.GetCurInfo(this.enemys[0].id);
                zj.Gmgr.Instance.pveBossinfo = this.bossInfo;
                if (this.bossInfo == null)
                    return;
                this.LoadBossAni();
                this.SetBossInfo(this.bossInfo, this.features);
            }
        };
        /**
         * 加载模型
         */
        CommonFormatePveMain.prototype.LoadModel = function (boneName) {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, boneName, "armatureName", 1, 0)
                .then(function (display) {
                display.x = 0;
                display.y = 0;
                _this["groupAni"].addChild(display);
                display.scaleX = -1;
                display.scaleY = 1;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        /**
         * boss模型
         */
        CommonFormatePveMain.prototype.LoadBossAni = function () {
            var _this = this;
            // boss编号
            var instance = zj.TableMapRole.Item(this.bossInfo.monster_roleId);
            // 异步播放龙骨--加载boss模型资源
            var boneName = zj.TableClientFightAniSpineSource.Item(instance.body_spx_id).json;
            zj.Game.DragonBonesManager.playAnimation(this, boneName, "armatureName", 1, 0)
                .then(function (display) {
                display.x = 0;
                display.y = 0;
                _this["groupAni"].addChild(display);
                display.scaleX = -instance.spine_instance_scale;
                display.scaleY = instance.spine_instance_scale;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        /**
         * boss描述
         */
        CommonFormatePveMain.prototype.SetBossInfo = function (info, features) {
            if (this.type == 17) {
                var scene = zj.StageSceneManager.Instance.GetCurScene();
                this.curStageBoss = scene.getLiveBoss();
            }
            // boss特征
            this.features = features;
            // boss名称
            var item = zj.TableLanguage.Item(info.monster_name);
            this.labelBossName.text = item ? item["ch"] : "";
            this.LoadFeatureList();
        };
        /**
         * boss技能列表
         */
        CommonFormatePveMain.prototype.LoadFeatureList = function () {
            if (this.type == 26) {
                this.btnColour();
                zj.Set.ButtonBackgroud(this.phase1, "ui_darkland_relic_ButtonStage1Sel_png");
                this.listBottomData.removeAll();
                for (var i = 0; i < this.features[0].length; i++) {
                    var data = new zj.CommonBossSkillData();
                    data.mobId = this.features[0][i];
                    data.father = this;
                    this.listBottomData.addItem(data);
                }
                this.listBossSkill.dataProvider = this.listBottomData;
            }
            else {
                // 删除列表中的所有项目
                this.listBottomData.removeAll();
                for (var i = 0; i < this.features.length; i++) {
                    var data = new zj.CommonBossSkillData();
                    data.mobId = this.features[i];
                    data.father = this;
                    this.listBottomData.addItem(data);
                }
                // dataProvider列表数据源
                this.listBossSkill.dataProvider = this.listBottomData;
            }
        };
        CommonFormatePveMain.prototype.onBtnReturn = function () {
            // Game.UIManager.topScene().visible = true;
            _super.prototype.onBtnReturn.call(this);
        };
        CommonFormatePveMain.prototype.onEntryTopDialog = function () {
            // Game.UIManager.topScene().visible = false;
        };
        CommonFormatePveMain.ID = "CommonFormatePveMain";
        return CommonFormatePveMain;
    }(zj.FormatChoose));
    zj.CommonFormatePveMain = CommonFormatePveMain;
    __reflect(CommonFormatePveMain.prototype, "zj.CommonFormatePveMain");
})(zj || (zj = {}));
//# sourceMappingURL=CommonFormatePveMain.js.map