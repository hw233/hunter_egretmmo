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
    /**PVP竞技场类 */
    var StageSceneFightArena = (function (_super) {
        __extends(StageSceneFightArena, _super);
        function StageSceneFightArena() {
            var _this = _super.call(this) || this;
            zj.Gmgr.Instance.setFightType(message.EFormationType.FORMATION_TYPE_LADDER_ATTACK);
            zj.Gmgr.Instance.setFightTalentType(message.EFormationType.FORMATION_TYPE_LADDER_ATTACK);
            _this.battleType = zj.Gmgr.Instance.fightType;
            // Game.PlayerBattleSystem.pvpOppBriefInfo = Game.PlayerInfoSystem.BaseInfo;
            _this.oppDetailInfo = zj.Game.PlayerBattleSystem.battleDetailFormation;
            return _this;
        }
        StageSceneFightArena.prototype.loadAuto = function () {
            if (zj.Gmgr.Instance.debugLocalFight == false) {
                zj.Gmgr.Instance.bFightAuto = true;
                this.bHideAuto = false;
                this.bLockAuto = true;
                this.bHideLimit = true;
                this.bLockKey = true;
            }
            else {
                zj.Gmgr.Instance.bFightAuto = true;
                this.bHideAuto = false;
                this.bLockAuto = false;
                this.bHideLimit = true;
                this.bLockKey = false;
            }
        };
        StageSceneFightArena.prototype.LoadMine = function () {
            this.formationType = message.EFormationType.FORMATION_TYPE_LADDER_ATTACK;
            this.stageMaxTime = zj.ConstantConfig_RoleBattle.PVP_CD_TIME * zj.yuan3(zj.Gmgr.Instance.debugLocalFight, 100, 1);
            this.initAdviser();
            this.saveLeftGeneralInfos();
            this.initGenerals(false);
            this.initSupports();
            this.nGeneralCount = this.getBeforeGelCount();
        };
        StageSceneFightArena.prototype.LoadOpp = function () {
            this.initOppAdviser();
            this.saveRightGeneralInfos();
            // 替补。出场 远景
            this.initOppPvp(false, false, false);
            this.initOppSupports();
        };
        StageSceneFightArena.prototype.InitOther = function () {
            this.UpdateMap((this.mapWidth - zj.UIManager.StageWidth) / 2, 0);
            this.InitBattleSqueue();
        };
        StageSceneFightArena.prototype.loadMapId = function () {
            if (zj.Gmgr.Instance.debugLocalFight == false) {
                this.mapId = 17;
            }
            else {
                this.mapId = 17;
            }
        };
        StageSceneFightArena.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            var cheatDt = 1.0 / zj.ConstantConfig_RoleBattle.DEFAULTFPS;
            this.tableEnemys;
            this.updateArena(cheatDt);
        };
        StageSceneFightArena.prototype.updateArena = function (tick) {
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
        StageSceneFightArena.prototype.oppToBriefInfo = function () {
            this.replayBattleInfo.rightReplayInfo.roleInfo = zj.Game.PlayerBattleSystem.pvpOppBriefInfo;
        };
        return StageSceneFightArena;
    }(zj.StageSceneFightServer));
    zj.StageSceneFightArena = StageSceneFightArena;
    __reflect(StageSceneFightArena.prototype, "zj.StageSceneFightArena");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightArena.js.map