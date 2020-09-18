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
     * @date 2019-4-3
     *
     * @class 工会战战斗结算界面
     */
    var BattleEnd_LoseMatchServer = (function (_super) {
        __extends(BattleEnd_LoseMatchServer, _super);
        function BattleEnd_LoseMatchServer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_LoseMatchServerSkin.exml";
            _this.ui_name = "BattleEnd_LoseMatchServer";
            return _this;
        }
        BattleEnd_LoseMatchServer.prototype.Init = function () {
            _super.prototype.Init.call(this);
            // this.loadSinleItem();
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoOn, this);
        };
        BattleEnd_LoseMatchServer.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.ButtonShare.visible = false;
        };
        BattleEnd_LoseMatchServer.prototype.FadeInGet = function () {
        };
        BattleEnd_LoseMatchServer.prototype.Load = function () {
            _super.prototype.Load.call(this);
        };
        BattleEnd_LoseMatchServer.prototype.onBtnGoOn = function () {
            this.close();
            egret.clearInterval(this.update);
            zj.StageSceneManager.Instance.clearScene();
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.LeagueHomeScene)
                    .then(function (scene) {
                    scene.init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.onGroupUnionBattle();
                });
            });
        };
        return BattleEnd_LoseMatchServer;
    }(zj.BattleSettleLose));
    zj.BattleEnd_LoseMatchServer = BattleEnd_LoseMatchServer;
    __reflect(BattleEnd_LoseMatchServer.prototype, "zj.BattleEnd_LoseMatchServer");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_LoseMatchServer.js.map