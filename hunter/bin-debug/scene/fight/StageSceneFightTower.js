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
    /**爬塔副本场景类 */
    var StageSceneFightTower = (function (_super) {
        __extends(StageSceneFightTower, _super);
        function StageSceneFightTower() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(zj.Game.PlayerInstanceSystem.curInstanceType);
            zj.Gmgr.Instance.setFightTalentType(zj.Game.PlayerInstanceSystem.curInstanceType);
            _this.battleType = zj.Gmgr.Instance.fightType;
            return _this;
        }
        StageSceneFightTower.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightTower.prototype.initSection_Mine = function () {
            this.formationType = zj.Game.PlayerInstanceSystem.curInstanceType;
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightTower.prototype.initSection_Opp = function () {
            this.initMonster(true);
        };
        StageSceneFightTower.prototype.loadAuto = function () {
            if (zj.Gmgr.Instance.bContinueBattle) {
                zj.Gmgr.Instance.bFightAuto = true;
                this.bHideAuto = false;
                this.bLockAuto = false;
                this.bHideLimit = true;
            }
            else {
                zj.Gmgr.Instance.bFightAuto = zj.Gmgr.Instance.backupAutoTbl[zj.Gmgr.Instance.fightType];
                this.bHideAuto = false;
                if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.AUTO)) {
                    this.bLockAuto = false;
                    this.bHideLimit = true;
                }
                else {
                    this.bLockAuto = true;
                    this.bHideLimit = false;
                }
            }
            this.bLockKey = false;
        };
        StageSceneFightTower.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.InitOther();
        };
        StageSceneFightTower.prototype.initStage = function () {
            var date = zj.Game.PlayerTowerSystem.towerInfo;
            // this.instanceId = Game.PlayerInstanceSystem.curInstanceType == message.EInstanceType.TOWER &&  date.towerCur || date.high_tower_cur;
            this.instanceId = date.towerCur;
            zj.Gmgr.Instance.towerCell = this.instanceId;
        };
        StageSceneFightTower.prototype.initMap = function () {
            this.loadMapId();
            this.LoadMap(this.mapId);
        };
        StageSceneFightTower.prototype.InitOther = function () {
            this.UpdateMap((this.mapWidth - zj.UIManager.StageWidth) / 2, 0);
            this.InitBattleSqueue();
        };
        StageSceneFightTower.prototype.GetTowerTable = function () {
            return zj.TableTower.Table();
        };
        StageSceneFightTower.prototype.loadMapId = function () {
            var tableTower = this.GetTowerTable();
            this.mapId = tableTower[this.instanceId].battle_bg;
        };
        StageSceneFightTower.prototype.loadStageId = function () {
            var tableTower = this.GetTowerTable();
            var towerPack = null;
            // if (Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_HIGH_TOWER) {
            // 	towerPack = tableTower[this.instanceId].tower_pack[Game.PlayerInstanceSystem.InstanceInfo.monsterTowerIndex % 2];
            // } else {
            // 	// towerPack = tableTower[this.instanceId].tower_pack[Game.PlayerInstanceSystem.InstanceInfo.high_monsterTowerIndex%2];
            // }
            towerPack = tableTower[this.instanceId].tower_pack[zj.Game.PlayerInstanceSystem.InstanceInfo.monsterTowerIndex % 2];
            var tbl = [towerPack];
            this.stageNumMax = tbl.length;
            this.stageId = tbl[this.monsterStage - 1];
        };
        StageSceneFightTower.prototype.procSenceAppear = function (tick) {
            this.procSenceAppear_3(tick);
        };
        StageSceneFightTower.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateTower(cheatDt);
        };
        StageSceneFightTower.prototype.updateTower = function (tick) {
            if (this.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            if (this.isWin() == true) {
                this.goBalance();
            }
            else if (this.isTimeUp() == true) {
                this.goFightTimeUp();
            }
            else if (this.isLoseGoBalance() == true) {
                this.goBalance();
            }
        };
        StageSceneFightTower.prototype.doFightFilling = function (role) {
            if (role.bEnemy == false) {
                return this.fillMyGeneral(role.getTeamNum() + 1);
            }
            else if (role.bEnemy == true) {
                if (this.bBossDead == true || this.isWeekSteping == true || this.checkAllFriendDead() == true) {
                    return false;
                }
                return this.fillMonster(role.getTeamNum() + 1);
            }
        };
        StageSceneFightTower.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && this.bBossRemove == true) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightTower.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightTower.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        return StageSceneFightTower;
    }(zj.StageSceneInstance));
    zj.StageSceneFightTower = StageSceneFightTower;
    __reflect(StageSceneFightTower.prototype, "zj.StageSceneFightTower");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightTower.js.map