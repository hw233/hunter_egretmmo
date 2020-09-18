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
    var StageSceneFightMob = (function (_super) {
        __extends(StageSceneFightMob, _super);
        function StageSceneFightMob(node, order) {
            var _this = _super.call(this, node, order) || this;
            _this.setPlayerState(zj.EnumPlayerState.PLAYER_STATE_FIGHT_OTHER);
            return _this;
        }
        StageSceneFightMob.prototype.createWonderlandMob = function (scenePosInfo, floor, x, y, dir, moveDis, verDis) {
            this.setPlayerInfo(scenePosInfo.roleBase);
            this.commonCreate(floor, x, y, dir, moveDis, verDis);
            this.dealSceneNotice(scenePosInfo);
        };
        StageSceneFightMob.prototype.init = function () {
            this.parseInfo();
            this.loadDB();
            this.loadNormalSpx();
            this.loadBody();
            this.loadLedAni();
            this.loadBloodBar();
            this.loadLvTitle();
            this.loadNameTitle();
            this.loadSpeed();
            this.loadScale();
        };
        StageSceneFightMob.prototype.loadBloodBar = function () {
            this.loadBloodBarBoard();
            this.loadBloodBarProgress(zj.UIConfig.UIConfig_LeagueWarScene.roleBloodEnemyBar);
        };
        StageSceneFightMob.prototype.getNameColor = function () {
            return zj.ConstantConfig_Common.Color.red;
        };
        StageSceneFightMob.prototype.parseInfo = function () {
            this.mapRoleId = this.playerInfo.picId;
            var lang = zj.Game.LanguageManager.getLang();
            if (zj.TableLanguage.Item(this.playerInfo.name)) {
                this.name = zj.TableLanguage.Item(this.playerInfo.name)[lang];
            }
        };
        StageSceneFightMob.prototype.procDieProtect = function (tick) {
        };
        StageSceneFightMob.prototype.procOtherDie = function (tick) {
            _super.prototype.procOtherDie.call(this, tick);
            this.procStay(tick);
            return false;
        };
        StageSceneFightMob.prototype.procStay = function (tick) {
            var rt = tick * 1000;
            if (this.dieStayMs > 0) {
                this.dieStayMs = this.dieStayMs - rt;
                if (this.dieStayMs <= 0) {
                    this.setCanRemove();
                }
            }
        };
        StageSceneFightMob.prototype.isAgreeEnter = function () {
            return true;
        };
        return StageSceneFightMob;
    }(zj.StageSceneFightInLeauge));
    zj.StageSceneFightMob = StageSceneFightMob;
    __reflect(StageSceneFightMob.prototype, "zj.StageSceneFightMob");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneFightMob.js.map