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
     * @author xingliwei
     *
     * @date 2019-5-9
     *
     * @class 跨服战斗结算胜利
     */
    var BattleEnd_WinStarcraftB = (function (_super) {
        __extends(BattleEnd_WinStarcraftB, _super);
        function BattleEnd_WinStarcraftB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_WinStarcraftBSkin.exml";
            _this.ui_name = "BattleEnd_WinStarcraftB";
            return _this;
        }
        BattleEnd_WinStarcraftB.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.loadSinleItem();
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoOn, this);
        };
        BattleEnd_WinStarcraftB.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
        };
        BattleEnd_WinStarcraftB.prototype.SetUI = function (info) {
            this.SingleInfo = info;
        };
        BattleEnd_WinStarcraftB.prototype.FadeInGet = function () {
        };
        BattleEnd_WinStarcraftB.prototype.Load = function () {
            _super.prototype.Load.call(this);
        };
        BattleEnd_WinStarcraftB.prototype.onBtnGoOn = function () {
            this.close();
            zj.StageSceneManager.Instance.clearScene();
            if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                zj.Game.PlayerArenaSystem.craftQureyList(false)
                    .then(function () {
                    zj.loadUI(zj.ArenaWhole)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
            else {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                // Game.UIManager.popAllScenesAndDialogs();
            }
            egret.clearInterval(this.update);
        };
        return BattleEnd_WinStarcraftB;
    }(zj.BattleSettleWinDrop));
    zj.BattleEnd_WinStarcraftB = BattleEnd_WinStarcraftB;
    __reflect(BattleEnd_WinStarcraftB.prototype, "zj.BattleEnd_WinStarcraftB");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_WinStarcraftB.js.map