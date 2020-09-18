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
    var BattleEnd_WinArenaServer = (function (_super) {
        __extends(BattleEnd_WinArenaServer, _super);
        function BattleEnd_WinArenaServer() {
            var _this = _super.call(this) || this;
            _this.bRankCome = false;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_WinArenaServerSkin.exml";
            _this.ui_name = "BattleEnd_WinArenaServer";
            if (zj.Device.isReviewSwitch) {
                _this.ranking.visible = false;
                _this.SpriteMoney.x = 40;
                _this.SpriteMoney.y = 40;
            }
            return _this;
        }
        BattleEnd_WinArenaServer.prototype.Init = function () {
            // ArenaMainScene.roleFormationInfo = null;
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
            // Game.PlayerArenaSystem.ladderList(true).then((data: any) => {
            // 	ArenaMainScene.roleFormationInfo = data;
            // });
            _super.prototype.Init.call(this);
        };
        BattleEnd_WinArenaServer.prototype.setInfo = function (father) {
            this.father = father;
        };
        BattleEnd_WinArenaServer.prototype.FadeInCur = function () {
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                this.LabelOldRanl.visible = false;
                this.LabelCurRank.visible = false;
                this.LabelCurRaise.visible = false;
                this.SpriteNoDropTip.visible = false;
            }
            else {
                this.LabelOldRanl.visible = true;
                this.LabelCurRank.visible = true;
                this.LabelCurRaise.visible = true;
                this.SpriteNoDropTip.visible = true;
            }
            this.LabelOldRanl.text = zj.Gmgr.Instance.arenaRank.toString();
            if (zj.Gmgr.Instance.arenaRank != zj.Game.PlayerInfoSystem.BaseInfo.ladderRank || zj.Game.PlayerInfoSystem.BaseInfo.ladderRank == 1) {
                this.bRankCome = true;
            }
            var cur = zj.yuan3(zj.Gmgr.Instance.arenaRank - zj.Game.PlayerInfoSystem.BaseInfo.ladderMax < 0, zj.Gmgr.Instance.arenaRank, zj.Game.PlayerInfoSystem.BaseInfo.ladderMax);
            this.LabelCurRank.text = cur;
            var raise = zj.yuan3(zj.Gmgr.Instance.arenaRank - zj.Game.PlayerInfoSystem.BaseInfo.ladderMax < 0, 0, zj.Gmgr.Instance.arenaRank - zj.Game.PlayerInfoSystem.BaseInfo.ladderMax);
            this.LabelCurRaise.text = raise;
        };
        BattleEnd_WinArenaServer.prototype.FadeInGet = function () {
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                this.LabelMoney.visible = false;
                this.LabelArena.visible = false;
                this.SpriteMoney.visible = false;
                this.SpriteGet.visible = false;
                this.SpriteArena.visible = false;
            }
            else {
                this.LabelMoney.visible = true;
                this.LabelArena.visible = true;
                this.SpriteMoney.visible = true;
                this.SpriteGet.visible = true;
                this.SpriteArena.visible = true;
            }
            this.LabelMoney.text = this.scene.getItemInfo.coin;
            this.LabelArena.text = this.scene.getItemInfo.arena;
        };
        BattleEnd_WinArenaServer.prototype.Load = function () {
            _super.prototype.Load.call(this);
        };
        BattleEnd_WinArenaServer.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.updateArena();
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                this.ButtonShare.visible = false;
            }
        };
        BattleEnd_WinArenaServer.prototype.onButtonGoOn = function () {
            egret.clearInterval(this.update);
            this.close();
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            if (zj.Gmgr.Instance.fightType != message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                var tmp = function () {
                    // Game.UIManager.popAllScenesAndDialogs();
                    //关闭战斗
                    zj.loadUI(zj.ArenaLadder).then(function (dialog) {
                        zj.Game.PlayerArenaSystem.ladderList(false).then(function (data) {
                            zj.ArenaMainScene.roleFormationInfo = data;
                            dialog.setInfo(data, function () {
                            });
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                };
                zj.StageSceneManager.Instance.clearScene();
                zj.SceneManager.instance.EnterMainCityNew(tmp);
            }
            else {
                zj.Game.UIManager.popAllScenesAndDialogs();
            }
        };
        BattleEnd_WinArenaServer.prototype.updateArena = function () {
            if (this.bRankCome == false) {
                this.FadeInCur();
                this.FadeInGet();
            }
        };
        BattleEnd_WinArenaServer.prototype.SetSettleCb = function (cb) {
            _super.prototype.SetSettleCb.call(this, cb);
        };
        return BattleEnd_WinArenaServer;
    }(zj.BattleSettleWinDrop));
    zj.BattleEnd_WinArenaServer = BattleEnd_WinArenaServer;
    __reflect(BattleEnd_WinArenaServer.prototype, "zj.BattleEnd_WinArenaServer");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_WinArenaServer.js.map