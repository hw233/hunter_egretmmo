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
    var StageSceneFightBGroupFight = (function (_super) {
        __extends(StageSceneFightBGroupFight, _super);
        function StageSceneFightBGroupFight() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT);
            _this.battleType = zj.Gmgr.Instance.fightType;
            _this.friendIndex = _this.getFriendAppearIndex();
            return _this;
        }
        StageSceneFightBGroupFight.prototype.loadFightStart = function () {
            this.loadSingleFightStart();
        };
        StageSceneFightBGroupFight.prototype.getCurDetailFormationGels = function () {
            return [this.myDetailInfo.generals, this.myDetailInfo.reserves, this.myDetailInfo.supports];
        };
        StageSceneFightBGroupFight.prototype.loadCurFormation = function () {
            // let aaaaa = PlayerGroupFightSystem.groupFightDetailsInfo;
            this.myDetailInfo = zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[zj.Gmgr.Instance.starcraftIndex - 1];
            this.curFormation = this.myDetailInfo;
            this.myRoleBriefInfo = zj.Helper.baseToBriefInfo(zj.Game.PlayerInfoSystem.BaseInfo); //(Gmgr.Instance.starcraftIndex == this.friendIndex) && PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo ||
        };
        StageSceneFightBGroupFight.prototype.loadAuto = function () {
            zj.Gmgr.Instance.bFightAuto = zj.Gmgr.Instance.backupAutoTbl[zj.Gmgr.Instance.fightType];
            this.bHideAuto = false;
            this.bLockAuto = false;
            this.bHideLimit = true;
            this.bLockKey = false;
        };
        StageSceneFightBGroupFight.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.InitOther();
        };
        StageSceneFightBGroupFight.prototype.initSection_Mine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals();
            this.initSupports();
        };
        StageSceneFightBGroupFight.prototype.initSection_Opp = function () {
            this.initMonster(true);
        };
        StageSceneFightBGroupFight.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightBGroupFight.prototype.initMap = function () {
            this.loadMapId();
            this.LoadMap(this.mapId);
        };
        StageSceneFightBGroupFight.prototype.InitOther = function () {
            this.UpdateMap((this.mapWidth - zj.UIManager.StageWidth) / 2, 0);
            this.InitBattleSqueue();
        };
        StageSceneFightBGroupFight.prototype.initStage = function () {
            this.instanceId = zj.PlayerGroupFightSystem.groupFightDetailsInfo.instanceId;
        };
        StageSceneFightBGroupFight.prototype.loadMapId = function () {
            this.mapId = 29;
        };
        StageSceneFightBGroupFight.prototype.loadStageId = function () {
            this.stageNumMax = 1;
            var retTbl = zj.TableInstanceGroup.Item(this.instanceId);
            this.stageId = retTbl.monster_stages[zj.Gmgr.Instance.starcraftIndex - 1];
        };
        StageSceneFightBGroupFight.prototype.procSenceAppear = function (tick) {
            this.procSenceAppear_3(tick);
        };
        StageSceneFightBGroupFight.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateGroupFight(cheatDt);
        };
        StageSceneFightBGroupFight.prototype.updateGroupFight = function (tick) {
            if (this.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            if (this.isWin() == true) {
                this.goBalance();
            }
            else if (this.isTimeUp() == true) {
                this.goBalance();
            }
            else if (this.isLoseGoBalance() == true) {
                this.goBalance();
            }
        };
        StageSceneFightBGroupFight.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && this.bBossRemove == true) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightBGroupFight.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightBGroupFight.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightBGroupFight.prototype.nextGroupFight = function () {
            zj.StageSceneManager.Instance.ChangeScene(StageSceneFightBGroupFight);
        };
        StageSceneFightBGroupFight.prototype.saveLeftGeneralInfos = function () {
            function _fillGel(t, type, thisobj) {
                for (var i = 0; i < t.length; i++) {
                    if (t[i].general_id != 0) {
                        var battleGeneral = new message.BattleGeneralInfo();
                        battleGeneral.type = type;
                        var roleInfo = t[i];
                        var result = zj.PlayerHunterSystem.CalcBattleGelAttr(null, roleInfo);
                        roleInfo.attri = zj.Helper.tblConvertAttri(result);
                        battleGeneral.generalInfo = roleInfo;
                        thisobj.replayBattleInfo.leftReplayInfo.generals.push(battleGeneral);
                    }
                }
            }
            _fillGel(this.myDetailInfo.generals, 1, this);
            _fillGel(this.myDetailInfo.reserves, 2, this);
            _fillGel(this.myDetailInfo.supports, 3, this);
        };
        StageSceneFightBGroupFight.prototype.initGeneralTalents = function () {
            var generals = this.myDetailInfo.generals;
            for (var k in generals) {
                var v = generals[k];
                if (v.general_id != 0) {
                    var _a = zj.Talentdb.createPersonTalent(v), _every = _a[0], _personal = _a[1];
                    zj.Gmgr.Instance.everybodyTalent[zj.TableEnum.TablePositionType.POSITION_LEFT].push(_every);
                    zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_LEFT][v.general_id] = _personal;
                }
            }
            var supports = this.myDetailInfo.supports;
            for (var k in supports) {
                var v = supports[k];
                if (v.general_id != 0) {
                    var _b = zj.Talentdb.createPersonTalent(v), _every = _b[0], _personal = _b[1];
                    zj.Gmgr.Instance.personalTalent[zj.TableEnum.TablePositionType.POSITION_LEFT][v.general_id] = _personal;
                }
            }
        };
        StageSceneFightBGroupFight.prototype.initGenerals = function () {
            this.initGeneralTalents();
            var test = [0, 1, 2, 3];
            var _a = [this.myDetailInfo.generals, this.myDetailInfo.reserves, this.myDetailInfo.supports], generals = _a[0], reserves = _a[1], supports = _a[2];
            this.setDetailReserveRec(reserves, this.tableAllysReserveRec);
            for (var i = 0; i < test.length; i++) {
                var generalInfo = generals[test[i]];
                if (generalInfo != null && generalInfo.general_id > 0) {
                    var general = this._createMyGel(test[i], generalInfo);
                    this.takeBtlGeneralInfo(this.replayBattleInfo.leftReplayInfo.generals, general, 1, true, null, null, null, null);
                }
            }
        };
        StageSceneFightBGroupFight.prototype.playerToBriefInfo = function () {
            if (this.myRoleBriefInfo) {
                this.replayBattleInfo.leftReplayInfo.roleInfo = this.myRoleBriefInfo;
            }
            else {
                this.replayBattleInfo.leftReplayInfo.roleInfo = new message.RoleBriefInfo();
            }
        };
        StageSceneFightBGroupFight.prototype.saveLeftAdviser = function () {
            for (var k in this.myDetailInfo.advisers) {
                var v = this.myDetailInfo.advisers[k];
                this.replayBattleInfo.leftReplayInfo.advisers.push(v);
            }
        };
        StageSceneFightBGroupFight.prototype.saveLeftArtifact = function () {
            for (var k in this.myDetailInfo.artifacts) {
                var v = this.myDetailInfo.artifacts[k];
                this.replayBattleInfo.leftReplayInfo.artifacts.push(v);
            }
        };
        StageSceneFightBGroupFight.prototype.saveLeftFormat = function () {
            this.replayBattleInfo.leftReplayInfo.formation = zj.Helper.detailCovertFormat(this.myDetailInfo);
        };
        StageSceneFightBGroupFight.prototype.initAdviser = function () {
            zj.Gmgr.Instance.leftAdviserId = this.myDetailInfo.adviserId;
            zj.Gmgr.Instance.adviserLeftInfos = this.myDetailInfo.advisers;
            zj.Gmgr.Instance.adviserLeftAttriTbl = zj.Adviserlvdb.GetAllAdviserValueTbl(this.myDetailInfo.advisers, this.myRoleBriefInfo);
            this.initAdviserSkills();
            this.initPokedexSkills();
            this.initPetSkills();
            this.initTitleSkills();
            this.initLeagueSkills();
            this.initSkinSkills();
        };
        StageSceneFightBGroupFight.prototype.initAdviserSkills = function () {
            zj.Gmgr.Instance.adviserSkills[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.Adviserlvdb.GetAdviserSkills(this.myDetailInfo.advisers, this.myRoleBriefInfo);
        };
        StageSceneFightBGroupFight.prototype.initPokedexSkills = function () {
            zj.Gmgr.Instance.pokedexSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.Talentdb.GetPokedexSkills(this.myDetailInfo.historyGenerals);
        };
        StageSceneFightBGroupFight.prototype.initPetSkills = function () {
            zj.Gmgr.Instance.petSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.Adviserdb.GetPetFightSkill(this.myDetailInfo.pets);
        };
        StageSceneFightBGroupFight.prototype.initTitleSkills = function () {
            zj.Gmgr.Instance.titleSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = zj.Otherdb.GetTitleFightSkill(this.myRoleBriefInfo.titleId);
        };
        StageSceneFightBGroupFight.prototype.initLeagueSkills = function () {
            zj.Gmgr.Instance.leagueSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = null; // TODO 工会技能信息 Game.PlayerLeagueSystem.getSkillList();
        };
        StageSceneFightBGroupFight.prototype.initSkinSkills = function () {
            zj.Gmgr.Instance.skinSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = null; //TableItemFashion.Table();
        };
        StageSceneFightBGroupFight.prototype.getFriendAppearIndex = function () {
            return zj.Table.FindK(zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos, 3) + 1;
        };
        StageSceneFightBGroupFight.prototype.oppToBriefInfo = function () {
            this.replayBattleInfo.rightReplayInfo.roleInfo = zj.Helper.instanceToBriefInfo(zj.Gmgr.Instance.fightType, this.stageId, zj.Gmgr.Instance.pveBossinfo);
        };
        return StageSceneFightBGroupFight;
    }(zj.StageSceneInstance));
    zj.StageSceneFightBGroupFight = StageSceneFightBGroupFight;
    __reflect(StageSceneFightBGroupFight.prototype, "zj.StageSceneFightBGroupFight");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightBGroupFight.js.map