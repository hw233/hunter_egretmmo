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
    var BattleEnd_LoseArenaServer = (function (_super) {
        __extends(BattleEnd_LoseArenaServer, _super);
        function BattleEnd_LoseArenaServer() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_LoseArenaServerSkin.exml";
            _this.ui_name = "BattleEnd_LoseArenaServer";
            return _this;
        }
        BattleEnd_LoseArenaServer.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoOn, this);
        };
        BattleEnd_LoseArenaServer.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            // this.updateArena();
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                this.ButtonShare.visible = false;
            }
        };
        BattleEnd_LoseArenaServer.prototype.Load = function () {
            _super.prototype.Load.call(this);
        };
        BattleEnd_LoseArenaServer.prototype.onBtnGoOn = function () {
            this.close();
            zj.StageSceneManager.Instance.clearScene();
            if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                zj.loadUI(zj.ArenaLadder).then(function (dialog) {
                    if (zj.ArenaMainScene.roleFormationInfo) {
                        dialog.setInfo(zj.ArenaMainScene.roleFormationInfo, function () {
                        });
                    }
                    else {
                        zj.Game.PlayerArenaSystem.ladderList(false).then(function (data) {
                            zj.ArenaMainScene.roleFormationInfo = data;
                            dialog.setInfo(data, function () {
                            });
                        });
                    }
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.Gmgr.Instance.bPause = false;
                zj.Gmgr.Instance.bReplay = false;
                zj.Game.UIManager.popAllScenesAndDialogs();
            }
            egret.clearInterval(this.update);
        };
        return BattleEnd_LoseArenaServer;
    }(zj.BattleSettleLose));
    zj.BattleEnd_LoseArenaServer = BattleEnd_LoseArenaServer;
    __reflect(BattleEnd_LoseArenaServer.prototype, "zj.BattleEnd_LoseArenaServer");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_LoseArenaServer.js.map