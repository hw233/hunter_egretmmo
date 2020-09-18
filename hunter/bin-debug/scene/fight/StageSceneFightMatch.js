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
    var StageSceneFightMatch = (function (_super) {
        __extends(StageSceneFightMatch, _super);
        function StageSceneFightMatch() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_MATCH_ATTACK);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_MATCH_ATTACK);
            _this.battleType = zj.Gmgr.Instance.fightType;
            _this.oppDetailInfo = zj.Game.PlayerBattleSystem.battleDetailFormation;
            return _this;
        }
        StageSceneFightMatch.prototype.loadAuto = function () {
            if (zj.Gmgr.Instance.debugLocalFight == false) {
                zj.Gmgr.Instance.bFightAuto = true;
                this.bHideAuto = false;
                this.bLockAuto = false;
                this.bHideLimit = true;
                this.bLockKey = false;
            }
            else {
                zj.Gmgr.Instance.bFightAuto = true;
                this.bHideAuto = false;
                this.bLockAuto = false;
                this.bHideLimit = true;
                this.bLockKey = false;
            }
        };
        StageSceneFightMatch.prototype.LoadMine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_MATCH_ATTACK;
            this.stageMaxTime = zj.ConstantConfig_RoleBattle.PVP_CD_TIME * zj.yuan3(zj.Gmgr.Instance.debugLocalFight, 100, 1);
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightMatch.prototype.LoadOpp = function () {
            this.initOppAdviser();
            this.saveRightGeneralInfos();
            //替补。出场 远景
            this.initOppPvp(false, false, false);
            this.initOppSupports();
        };
        StageSceneFightMatch.prototype.InitOther = function () {
            this.UpdateMap((this.mapWidth - zj.UIManager.StageWidth) / 2, 0);
            this.InitBattleSqueue();
        };
        StageSceneFightMatch.prototype.loadMapId = function () {
            if (zj.Gmgr.Instance.debugLocalFight == false) {
                this.mapId = 39;
            }
            else {
                this.mapId = 39;
            }
        };
        StageSceneFightMatch.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.updateArena(cheatDt);
        };
        StageSceneFightMatch.prototype.updateArena = function (tick) {
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
        StageSceneFightMatch.prototype.oppToBriefInfo = function () {
            this.replayBattleInfo.rightReplayInfo.roleInfo = zj.Game.PlayerBattleSystem.pvpOppBriefInfo;
        };
        return StageSceneFightMatch;
    }(zj.StageSceneFightServer));
    zj.StageSceneFightMatch = StageSceneFightMatch;
    __reflect(StageSceneFightMatch.prototype, "zj.StageSceneFightMatch");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightMatch.js.map