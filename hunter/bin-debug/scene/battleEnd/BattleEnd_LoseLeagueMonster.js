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
     * @date 2019-4-2
     *
     * @class 格斗场战斗结算界面
     */
    var BattleEnd_LoseLeagueMonster = (function (_super) {
        __extends(BattleEnd_LoseLeagueMonster, _super);
        function BattleEnd_LoseLeagueMonster() {
            var _this = _super.call(this) || this;
            _this.bRankCome = false;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_LoseLeagueMonsterSkin.exml";
            _this.ui_name = "BattleEnd_LoseLeagueMonster";
            return _this;
        }
        BattleEnd_LoseLeagueMonster.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
        };
        BattleEnd_LoseLeagueMonster.prototype.Load = function () {
            _super.prototype.Load.call(this);
        };
        BattleEnd_LoseLeagueMonster.prototype.loadLabel = function (father) {
            this.LabelHurt.text = Math.floor(father.totalSum).toString();
        };
        BattleEnd_LoseLeagueMonster.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
        };
        BattleEnd_LoseLeagueMonster.prototype.UpdateLeagueBoss = function (tick) {
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
                this.bRankCome = true;
                this.FadeInGet();
            }
        };
        BattleEnd_LoseLeagueMonster.prototype.onButtonGoOn = function () {
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
                    scene.onGroupAnimal();
                });
            });
        };
        BattleEnd_LoseLeagueMonster.prototype.FadeInGet = function () {
        };
        return BattleEnd_LoseLeagueMonster;
    }(zj.BattleSettleLose));
    zj.BattleEnd_LoseLeagueMonster = BattleEnd_LoseLeagueMonster;
    __reflect(BattleEnd_LoseLeagueMonster.prototype, "zj.BattleEnd_LoseLeagueMonster");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_LoseLeagueMonster.js.map