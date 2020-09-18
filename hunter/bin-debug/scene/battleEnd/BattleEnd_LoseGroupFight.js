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
     * @date 2019-4-5
     *
     * @class 飞龙营地失败结算
     */
    var BattleEnd_LoseGroupFight = (function (_super) {
        __extends(BattleEnd_LoseGroupFight, _super);
        function BattleEnd_LoseGroupFight() {
            var _this = _super.call(this) || this;
            _this.bRankCome = false;
            _this.skinName = "resource/skins/battleEnd/BattleEndLoseGroupFightSkin.exml";
            _this.ui_name = "BattleEnd_LoseGroupFight";
            return _this;
        }
        BattleEnd_LoseGroupFight.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.labelRoleInfo = (_a = {},
                _a[0] = this.LabelTeamName1,
                _a[1] = this.LabelTeamName2,
                _a[2] = this.LabelTeamName3,
                _a);
            this.spriteIsWin = (_b = {},
                _b[0] = this.SpriteResult1,
                _b[1] = this.SpriteResult2,
                _b[2] = this.SpriteResult3,
                _b);
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
            var _a, _b;
        };
        ;
        BattleEnd_LoseGroupFight.prototype.FadeInGet = function () {
        };
        BattleEnd_LoseGroupFight.prototype.Load = function () {
            _super.prototype.Load.call(this);
            this.SetFormationInfos();
        };
        BattleEnd_LoseGroupFight.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.UpdateZorkBoss();
        };
        BattleEnd_LoseGroupFight.prototype.UpdateZorkBoss = function () {
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
                this.bRankCome = true;
                this.FadeInGet();
            }
        };
        BattleEnd_LoseGroupFight.prototype.onButtonGoOn = function () {
            zj.Gmgr.Instance.bPause = false;
            zj.Gmgr.Instance.bReplay = false;
            zj.StageSceneManager.Instance.clearScene();
            this.close();
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.HXH_GroupFightMain)
                    .then(function (scene) {
                    scene.Init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            });
        };
        BattleEnd_LoseGroupFight.prototype.SetFormationInfos = function () {
            for (var k in this.labelRoleInfo) {
                if (this.labelRoleInfo.hasOwnProperty(k)) {
                    var v = this.labelRoleInfo[k];
                    var str = "";
                    var index = zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos[Number(k)];
                    if (index == 3) {
                        if (zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.name || Object.keys(zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo).length != 0) {
                            str = "Lv." + zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.level + " " + zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.teamName, zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo.name);
                        }
                        else {
                            str = zj.TextsConfig.TextsConfig_GroupFight.noFriend;
                        }
                    }
                    else {
                        str = "Lv." + zj.Game.PlayerInfoSystem.BaseInfo.level + " " + zj.TextsConfig.TextsConfig_GroupFight.myTeamName[index - 1];
                    }
                    v.text = str;
                }
            }
            for (var k in this.spriteIsWin) {
                if (this.spriteIsWin.hasOwnProperty(k)) {
                    var v = this.spriteIsWin[k];
                    var result = zj.Game.PlayerBattleSystem.battleSingleInfo[Number(k) + 1].battleResult;
                    if (result == 0 || result == null) {
                        v.visible = false;
                    }
                    else {
                        v.source = zj.cachekey(zj.UIConfig.UIConfig_Mail.win[result - 1], this);
                    }
                }
            }
        };
        ;
        return BattleEnd_LoseGroupFight;
    }(zj.BattleSettleLose));
    zj.BattleEnd_LoseGroupFight = BattleEnd_LoseGroupFight;
    __reflect(BattleEnd_LoseGroupFight.prototype, "zj.BattleEnd_LoseGroupFight");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_LoseGroupFight.js.map