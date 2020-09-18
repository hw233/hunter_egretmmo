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
    var StageSceneFightServer = (function (_super) {
        __extends(StageSceneFightServer, _super);
        function StageSceneFightServer() {
            return _super.call(this) || this;
        }
        StageSceneFightServer.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.InitOther();
        };
        StageSceneFightServer.prototype.initMap = function () {
            this.loadMapId();
            this.LoadMap(this.mapId);
        };
        StageSceneFightServer.prototype.initSection_Other = function () {
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightServer.prototype.initSection_Mine = function () {
            this.LoadMine();
        };
        StageSceneFightServer.prototype.initSection_Opp = function () {
            this.LoadOpp();
        };
        StageSceneFightServer.prototype.initOppAdviser = function () {
            zj.Gmgr.Instance.rightAdviserId = this.oppDetailInfo.adviserId;
            zj.Gmgr.Instance.adviserRightInfos = this.oppDetailInfo.advisers;
            zj.Gmgr.Instance.adviserRightAttriTbl = zj.Adviserlvdb.GetAllAdviserValueTbl(this.oppDetailInfo.advisers, zj.Game.PlayerBattleSystem.pvpOppBriefInfo);
            this.initOppAdviserSkills();
            this.initOppPokedexSkills();
            this.initOppPetSkills();
            this.initOppTitleSkills();
            this.initLeagueSkills();
            this.initSkinSkills();
        };
        StageSceneFightServer.prototype.initOppAdviserSkills = function () {
            zj.Gmgr.Instance.adviserSkills[zj.TableEnum.TablePositionType.POSITION_RIGHT] = zj.Adviserlvdb.GetAdviserSkills(this.oppDetailInfo.advisers, zj.Game.PlayerBattleSystem.pvpOppBriefInfo);
        };
        StageSceneFightServer.prototype.initOppPokedexSkills = function () {
            zj.Gmgr.Instance.pokedexSkill[zj.TableEnum.TablePositionType.POSITION_RIGHT] = zj.Talentdb.GetPokedexSkills(this.oppDetailInfo.historyGenerals);
        };
        StageSceneFightServer.prototype.initOppPetSkills = function () {
            zj.Gmgr.Instance.petSkill[zj.TableEnum.TablePositionType.POSITION_RIGHT] = zj.Adviserdb.GetPetFightSkill(this.oppDetailInfo.pets);
        };
        StageSceneFightServer.prototype.initOppTitleSkills = function () {
            var aa = zj.Game.PlayerBattleSystem.pvpOppBriefInfo;
            zj.Gmgr.Instance.titleSkill[zj.TableEnum.TablePositionType.POSITION_RIGHT] = zj.Otherdb.GetTitleFightSkill(zj.Game.PlayerBattleSystem.pvpOppBriefInfo.titleId);
        };
        StageSceneFightServer.prototype.initLeagueSkills = function () {
            zj.Gmgr.Instance.leagueSkill[zj.TableEnum.TablePositionType.POSITION_RIGHT] = null; // TODO 工会技能信息 message.DetailFormationInfo
        };
        StageSceneFightServer.prototype.initSkinSkills = function () {
            zj.Gmgr.Instance.skinSkill[zj.TableEnum.TablePositionType.POSITION_LEFT] = null; //TableItemFashion.Table();
        };
        StageSceneFightServer.prototype.initOppArtifact = function () {
            for (var k in this.oppDetailInfo.artifacts) {
                var v = this.oppDetailInfo.artifacts[k];
                var key = v.artifactId % 1000;
                zj.Gmgr.Instance.artifactRightTbl[key] = v;
            }
        };
        StageSceneFightServer.prototype.saveRightAdviser = function () {
            for (var k in this.oppDetailInfo.advisers) {
                var v = this.oppDetailInfo.advisers[k];
                this.replayBattleInfo.rightReplayInfo.advisers.push(v);
            }
        };
        StageSceneFightServer.prototype.saveRightArtifact = function () {
            for (var k in this.oppDetailInfo.artifacts) {
                var v = this.oppDetailInfo.artifacts[k];
                this.replayBattleInfo.rightReplayInfo.artifacts.push(v);
            }
        };
        StageSceneFightServer.prototype.doFightFilling = function (role) {
            if (role.bEnemy == false) {
                return this.fillMyGeneral(role.getTeamNum() + 1);
            }
            else if (role.bEnemy == true) {
                this.fillOppGeneral(role.getTeamNum() + 1);
            }
        };
        StageSceneFightServer.prototype.procSenceAppear = function (tick) {
            this.procSenceAppear_2(tick);
        };
        StageSceneFightServer.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.procAi();
        };
        StageSceneFightServer.prototype.procAi = function () {
            if ((this.tableEnemysReserveRec[0] == "empty" && this.checkAllEnemyDead() == true)) {
                this.staticFight();
            }
            else if ((this.tableAllysReserveRec[0] == "empty" && this.checkAllFriendDead() == true)) {
                this.staticFight();
            }
        };
        StageSceneFightServer.prototype.isWin = function () {
            var bTag = false;
            if (this.checkEnemyEmpty() == true && this.tableEnemysReserveRec[0] == "empty") {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightServer.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightServer.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightServer.prototype.getAdvanceMonId = function (pos) {
            var reserves = this.oppDetailInfo.reserves;
            var info = this.getReserveInfo(reserves, this.tableEnemysReserveRec, false, this.tableMonsterPosRecord);
            if (info != null) {
                return info.general_id;
            }
            else {
                return -1;
            }
        };
        // public isAllMonsterAppear(){
        // 	//this.isAllReserveAppear();
        // }
        StageSceneFightServer.prototype.saveRightFormat = function () {
            this.replayBattleInfo.rightReplayInfo.formation = zj.Helper.detailCovertFormat(this.oppDetailInfo);
        };
        StageSceneFightServer.prototype.saveRightGeneralInfos = function () {
            this.fillGel(this.oppDetailInfo.generals, 1);
            this.fillGel(this.oppDetailInfo.reserves, 2);
            this.fillGel(this.oppDetailInfo.supports, 3);
        };
        StageSceneFightServer.prototype.fillGel = function (t, type) {
            for (var i = 0; i < t.length; i++) {
                if (t[i].general_id != 0) {
                    var battleGeneral = new message.BattleGeneralInfo;
                    battleGeneral.type = type;
                    var roleInfo = t[i];
                    var result = zj.PlayerHunterSystem.CalcBattleGelAttr(null, roleInfo);
                    roleInfo.attri = zj.Helper.tblConvertAttri(result);
                    battleGeneral.generalInfo = roleInfo;
                    this.replayBattleInfo.rightReplayInfo.generals.push(battleGeneral);
                }
            }
        };
        return StageSceneFightServer;
    }(zj.StageSceneFight));
    zj.StageSceneFightServer = StageSceneFightServer;
    __reflect(StageSceneFightServer.prototype, "zj.StageSceneFightServer");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightServer.js.map