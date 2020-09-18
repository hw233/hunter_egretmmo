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
     * @class 飞龙营地胜利结算
     */
    var BattleEnd_WinGroupFight = (function (_super) {
        __extends(BattleEnd_WinGroupFight, _super);
        function BattleEnd_WinGroupFight() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/BattleEndWinGroupFightSkin.exml";
            _this.ui_name = "BattleEnd_WinGroupFight";
            return _this;
            // this.init();
        }
        BattleEnd_WinGroupFight.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.labelRoleInfo = [this.LabelTeamName1, this.LabelTeamName2, this.LabelTeamName3];
            this.spriteIsWin = [this.SpriteResult1, this.SpriteResult2, this.SpriteResult3];
            this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        };
        ;
        BattleEnd_WinGroupFight.prototype.Load = function () {
            _super.prototype.Load.call(this);
            this.SetFormationInfos();
        };
        BattleEnd_WinGroupFight.prototype.SetFormationInfos = function () {
            for (var k in this.labelRoleInfo) {
                if (this.labelRoleInfo.hasOwnProperty(k)) {
                    var v = this.labelRoleInfo[k];
                    var str = "";
                    var index = zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos[Number(k)];
                    if (index == 3) {
                        if (zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo && Object.keys(zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo).length != 0) {
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
            var win_num = 0;
            for (var k in zj.Game.PlayerBattleSystem.battleSingleInfo) {
                if (zj.Game.PlayerBattleSystem.battleSingleInfo.hasOwnProperty(k)) {
                    var v = zj.Game.PlayerBattleSystem.battleSingleInfo[k];
                    if (v.battleResult == 1) {
                        win_num += 1;
                    }
                }
            }
            var bLast = zj.TableInstanceGroup.Item(zj.PlayerGroupFightSystem.groupFightDetailsInfo.instanceId + 1) == null; //  StringConfig_Table.groupFight
            if (zj.PlayerGroupFightSystem.groupFightDetailsInfo.starBeforeBattle == 3 || bLast) {
                //战斗通关或者最后一关
                this.LabelTips.visible = false;
                // this.Spri
            }
            else {
                var str = "";
                var nextId = (zj.PlayerGroupFightSystem.groupFightDetailsInfo.instanceId + 1) % 10000;
                if (win_num == 2) {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.win2, nextId);
                }
                else if (win_num == 3) {
                    str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.win3, nextId);
                }
                this.LabelTips.text = str;
            }
            for (var k in this.spriteIsWin) {
                if (this.spriteIsWin.hasOwnProperty(k)) {
                    var v = this.spriteIsWin[k];
                    var result = zj.Game.PlayerBattleSystem.battleSingleInfo[Number(k) + 1].battleResult;
                    if (result == 0 || result == null) {
                        v.visible = false;
                    }
                    else {
                        v.source = zj.cachekey(zj.UIConfig.UIConfig_Mail.win2[result - 1], this);
                    }
                }
            }
        };
        BattleEnd_WinGroupFight.prototype.onButtonGoOn = function () {
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
        return BattleEnd_WinGroupFight;
    }(zj.BattleSettleWinDrop));
    zj.BattleEnd_WinGroupFight = BattleEnd_WinGroupFight;
    __reflect(BattleEnd_WinGroupFight.prototype, "zj.BattleEnd_WinGroupFight");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_WinGroupFight.js.map