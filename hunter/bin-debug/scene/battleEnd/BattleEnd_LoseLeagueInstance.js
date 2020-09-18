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
    var BattleEnd_LoseLeagueInstance = (function (_super) {
        __extends(BattleEnd_LoseLeagueInstance, _super);
        function BattleEnd_LoseLeagueInstance() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_LoseLeagueInstanceSkin.exml";
            _this.ui_name = "BattleEnd_LoseLeagueInstance";
            return _this;
        }
        BattleEnd_LoseLeagueInstance.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
            var damageValue = this.scene.getTotalDamageValue();
            this.LabelHurt.text = Math.floor(damageValue).toString();
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        };
        BattleEnd_LoseLeagueInstance.prototype.Load = function () {
            _super.prototype.Load.call(this);
            // this.LabelHurt.text = Math.floor(this.total)
        };
        BattleEnd_LoseLeagueInstance.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
        };
        BattleEnd_LoseLeagueInstance.prototype.UpdateLeagueBoss = function (tick) {
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
                this.bRankCome = true;
                this.FadeInGet();
            }
        };
        BattleEnd_LoseLeagueInstance.prototype.onButtonGoOn = function () {
            this.close();
            zj.StageSceneManager.Instance.clearScene();
            // Game.UIManager.popAllScenesAndDialogs();
            egret.clearInterval(this.update);
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            // loadUI(LeagueHomeScene)
            // 	.then((scene: LeagueHomeScene) => {
            // 		scene.show(UI.SHOW_FROM_TOP);
            // 		scene.init();
            // 		scene.onGroupInstance();
            // 	});
        };
        BattleEnd_LoseLeagueInstance.prototype.FadeInGet = function () {
        };
        return BattleEnd_LoseLeagueInstance;
    }(zj.BattleSettleLose));
    zj.BattleEnd_LoseLeagueInstance = BattleEnd_LoseLeagueInstance;
    __reflect(BattleEnd_LoseLeagueInstance.prototype, "zj.BattleEnd_LoseLeagueInstance");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_LoseLeagueInstance.js.map