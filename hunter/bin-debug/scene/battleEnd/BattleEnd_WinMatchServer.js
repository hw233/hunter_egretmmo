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
    var BattleEnd_WinMatchServer = (function (_super) {
        __extends(BattleEnd_WinMatchServer, _super);
        function BattleEnd_WinMatchServer() {
            var _this = _super.call(this) || this;
            _this.bRankCome = false;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_WinMatchServerSkin.exml";
            _this.ui_name = "BattleEnd_WinMatchServer";
            _this.Init();
            return _this;
        }
        BattleEnd_WinMatchServer.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoOn, this);
        };
        BattleEnd_WinMatchServer.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.updateArena();
            this.ButtonShare.visible = false;
        };
        BattleEnd_WinMatchServer.prototype.Load = function () {
            _super.prototype.Load.call(this);
        };
        BattleEnd_WinMatchServer.prototype.onBtnGoOn = function () {
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
                    scene.onGroupUnionBattle();
                });
            });
        };
        BattleEnd_WinMatchServer.prototype.FadeInGet = function () {
            this.LabelMoney.text = this.scene.getItemInfo.league;
        };
        BattleEnd_WinMatchServer.prototype.updateArena = function () {
            if (this.bRankCome == false) {
                this.bRankCome = true;
                this.FadeInGet();
            }
        };
        BattleEnd_WinMatchServer.prototype.SetSettleCb = function (cb) {
            _super.prototype.SetSettleCb.call(this, cb);
        };
        return BattleEnd_WinMatchServer;
    }(zj.BattleSettleWinDrop));
    zj.BattleEnd_WinMatchServer = BattleEnd_WinMatchServer;
    __reflect(BattleEnd_WinMatchServer.prototype, "zj.BattleEnd_WinMatchServer");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_WinMatchServer.js.map