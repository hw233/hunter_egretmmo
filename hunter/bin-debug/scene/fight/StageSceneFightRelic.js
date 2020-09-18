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
    /**遗迹副本场景类 */
    var StageSceneFightRelic = (function (_super) {
        __extends(StageSceneFightRelic, _super);
        function StageSceneFightRelic() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(zj.Game.PlayerInstanceSystem.curInstanceType);
            zj.Gmgr.Instance.setFightTalentType(zj.Game.PlayerInstanceSystem.curInstanceType);
            _this.battleType = zj.Gmgr.Instance.fightType;
            _this.weekTime = 60 * 1000;
            return _this;
        }
        StageSceneFightRelic.prototype.loadCurFormation = function () {
            this.curFormation = zj.Game.PlayerFormationSystem.formatsRelic[zj.Game.PlayerMissionSystem.fightExt];
        };
        StageSceneFightRelic.prototype.getCurFormationGels = function () {
            var generals = zj.Game.PlayerFormationSystem.formatsRelic[zj.Game.PlayerMissionSystem.fightExt].generals;
            var reserves = zj.Game.PlayerFormationSystem.formatsRelic[zj.Game.PlayerMissionSystem.fightExt].reserves;
            var supports = zj.Game.PlayerFormationSystem.formatsRelic[zj.Game.PlayerMissionSystem.fightExt].supports;
            return [generals, reserves, supports];
        };
        StageSceneFightRelic.prototype.initSection_Other = function () {
            this.initStage();
            this.initMap();
            this.initFightNumber();
        };
        StageSceneFightRelic.prototype.initSection_Mine = function () {
            this.formationType = zj.Game.PlayerInstanceSystem.curInstanceType;
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightRelic.prototype.initSection_Opp = function () {
            this.initMonster(true);
        };
        StageSceneFightRelic.prototype.loadAuto = function () {
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
        StageSceneFightRelic.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.InitOther();
        };
        StageSceneFightRelic.prototype.initStage = function () {
            this.instanceId = zj.Game.PlayerMissionSystem.fightExt + 1;
        };
        StageSceneFightRelic.prototype.initMap = function () {
            this.loadMapId();
            this.LoadMap(this.mapId);
        };
        StageSceneFightRelic.prototype.InitOther = function () {
            //this.UpdateMap( (this.mapWidth - UIManager.StageWidth )/2, 0);
            this.InitBattleSqueue();
            this.initRelicResultTbl();
        };
        StageSceneFightRelic.prototype.loadMapId = function () {
            this.mapId = zj.TableInstanceRelic.Item(zj.Game.PlayerMissionSystem.fightExt + 1).mapBg;
        };
        StageSceneFightRelic.prototype.initRelicResultTbl = function () {
            var tableInstance = zj.TableInstanceRelic.Table();
            var instancePack = tableInstance[this.instanceId].monster_stage;
            for (var i = 0; i < instancePack.length; i++) {
                this.chapResultTbl[i] = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            }
            this.maxChapStep = instancePack.length;
            this.stageNumMax = this.maxChapStep;
        };
        StageSceneFightRelic.prototype.loadStageId = function () {
            var tableInstance = zj.TableInstanceRelic.Table();
            var instancePack = tableInstance[this.instanceId].monster_stage;
            this.stageId = instancePack[this.currChapStep - 1];
            this.weekTime = tableInstance[this.instanceId].week_time[this.currChapStep] * 1000;
        };
        StageSceneFightRelic.prototype.procSenceAppear = function (tick) {
            this.procSenceAppear_3(tick);
        };
        StageSceneFightRelic.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateRelic(cheatDt);
        };
        StageSceneFightRelic.prototype.updateRelic = function (tick) {
            if (this.sceneState != zj.TableEnum.TableSceneState.SCENE_STATE_FIGHT) {
                return;
            }
            if (this.isWin() == true) {
                this.goBalance(true);
            }
            else if (this.isTimeUp() == true) {
                this.goFightTimeUp();
            }
            else if (this.isLoseGoBalance() == true) {
                this.goBalance(false);
            }
        };
        StageSceneFightRelic.prototype.doFightFilling = function (role) {
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
        StageSceneFightRelic.prototype.isWin = function () {
            var bTag = false;
            if (this.isFinalStage() == true && this.bBossRemove == true) {
                this.nFinalCnt = this.getFinalGelCount();
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightRelic.prototype.isLose = function () {
            var bTag = false;
            if (this.battleTime <= 0 || (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty")) {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightRelic.prototype.isLoseGoBalance = function () {
            var bTag = false;
            if (this.checkAllFriendEmpty() == true && this.tableAllysReserveRec[0] == "empty") {
                bTag = true;
            }
            return bTag;
        };
        StageSceneFightRelic.prototype.goBalance = function (bWin) {
            if (bWin == false) {
                this.chapResultTbl[this.currChapStep] = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            }
            else {
                this.chapResultTbl[this.currChapStep] = message.BattleResultState.BATTLE_RESULT_STATE_WIN;
            }
            this.lockPause();
            this.commonBalance();
            if (this.mainmenu != null) {
                this.mainmenu.EndCurrChap();
            }
        };
        StageSceneFightRelic.prototype.goTimeUp = function () {
            this.chapResultTbl[this.currChapStep] = message.BattleResultState.BATTLE_RESULT_STATE_FAIL;
            this.lockPause();
            this.commonBalance();
        };
        StageSceneFightRelic.prototype.endTimeUp = function () {
            if (this.mainmenu != null) {
                this.mainmenu.EndCurrChap();
            }
        };
        return StageSceneFightRelic;
    }(zj.StageSceneInstance));
    zj.StageSceneFightRelic = StageSceneFightRelic;
    __reflect(StageSceneFightRelic.prototype, "zj.StageSceneFightRelic");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightRelic.js.map