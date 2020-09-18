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
    /**
     * @author xing li wei
     *
     * @date 2019-4-4
     *
     * @class 公会Boos
     */
    var BattleEnd_WinLeagueMonster = (function (_super) {
        __extends(BattleEnd_WinLeagueMonster, _super);
        function BattleEnd_WinLeagueMonster() {
            var _this = _super.call(this) || this;
            _this.bRankCome = false;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_WinLeagueMonsterSkin.exml";
            _this.ui_name = "BattleEnd_WinLeagueMonster";
            return _this;
        }
        BattleEnd_WinLeagueMonster.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        };
        BattleEnd_WinLeagueMonster.prototype.Load = function () {
            _super.prototype.Load.call(this);
        };
        BattleEnd_WinLeagueMonster.prototype.loadLabel = function (father) {
            this.LabelHurt.text = Math.floor(father.totalSum).toString();
        };
        BattleEnd_WinLeagueMonster.prototype.onButtonGoOn = function () {
            this.close();
            zj.StageSceneManager.Instance.clearScene();
            egret.clearInterval(this.update);
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.Game.PlayerLeagueSystem.leagueBoss.KillName = zj.Game.PlayerInfoSystem.BaseInfo.name;
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.LeagueHomeScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.init();
                    zj.loadUI(zj.LeagueBossSccessful)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                });
            });
        };
        BattleEnd_WinLeagueMonster.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.updateWanted();
        };
        BattleEnd_WinLeagueMonster.prototype.updateWanted = function () {
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
                this.bRankCome = true;
            }
        };
        return BattleEnd_WinLeagueMonster;
    }(zj.BattleSettleWinDrop));
    zj.BattleEnd_WinLeagueMonster = BattleEnd_WinLeagueMonster;
    __reflect(BattleEnd_WinLeagueMonster.prototype, "zj.BattleEnd_WinLeagueMonster");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_WinLeagueMonster.js.map