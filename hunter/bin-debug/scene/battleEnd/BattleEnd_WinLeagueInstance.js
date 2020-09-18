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
    var BattleEnd_WinLeagueInstance = (function (_super) {
        __extends(BattleEnd_WinLeagueInstance, _super);
        function BattleEnd_WinLeagueInstance() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_WinLeagueInstanceSkin.exml";
            _this.ui_name = "BattleEnd_WinLeagueInstance";
            return _this;
        }
        BattleEnd_WinLeagueInstance.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        };
        ;
        BattleEnd_WinLeagueInstance.prototype.Load = function () {
            _super.prototype.Load.call(this);
            this.LabelHurt.text = Math.floor(this.scene.getTotalDamageValue()).toString();
        };
        BattleEnd_WinLeagueInstance.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
        };
        BattleEnd_WinLeagueInstance.prototype.UpdateLeagueBoss = function (tick) {
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
                this.bRankCome = true;
                this.FadeInGet();
            }
        };
        BattleEnd_WinLeagueInstance.prototype.onButtonGoOn = function () {
            this.close();
            zj.StageSceneManager.Instance.clearScene();
            egret.clearInterval(this.update);
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.LeagueHomeScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.init();
                    scene.onGroupInstance();
                });
            });
        };
        BattleEnd_WinLeagueInstance.prototype.FadeInGet = function () {
        };
        return BattleEnd_WinLeagueInstance;
    }(zj.BattleSettleWinDrop));
    zj.BattleEnd_WinLeagueInstance = BattleEnd_WinLeagueInstance;
    __reflect(BattleEnd_WinLeagueInstance.prototype, "zj.BattleEnd_WinLeagueInstance");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_WinLeagueInstance.js.map