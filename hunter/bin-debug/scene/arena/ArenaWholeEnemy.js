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
     * @author
     *
     * @date 2019-1-29
     *
     * @class 对手防守阵容界面
     */
    var ArenaWholeEnemy = (function (_super) {
        __extends(ArenaWholeEnemy, _super);
        function ArenaWholeEnemy() {
            var _this = _super.call(this) || this;
            _this.enemyItems = new eui.ArrayCollection();
            _this.id = 0;
            _this.playerInfo = [];
            _this.num = 0;
            _this.skinName = "resource/skins/arena/ArenaWholeEnemySkin.exml";
            _this.init();
            return _this;
        }
        ArenaWholeEnemy.prototype.setInfo = function (info, enemyInfo, name, type, playerInfo, father, flag) {
            this.nameChat = name;
            this.typeChat = type;
            this.playerInfo = playerInfo;
            this.info = info;
            this.enemyInfo = enemyInfo;
            if (father != null) {
                this.fatner = father;
            }
            this.flag = flag;
            this.checkEnemInfo();
            if (!this.flag) {
                this.setInfoList();
            }
        };
        ArenaWholeEnemy.prototype.EFormationType = function (num) {
            this.num = num;
        };
        ArenaWholeEnemy.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnFight.addEventListener(tap, this.onBtnFight, this);
        };
        ArenaWholeEnemy.prototype.checkEnemInfo = function () {
            for (var i = 0; i < 3; i++) {
                if (this.enemyInfo[i] == null) {
                    var tbl = new message.CraftFormationInfo();
                    tbl.simpleInfo = null;
                    tbl.index = i;
                    var formats = new message.SimpleFormationInfo();
                    var buttonName = ["generals", "supports"];
                    for (var j = 0; j < buttonName.length; j++) {
                        for (var k = 1; k <= 3; k++) {
                            if (buttonName[j] == "supports" && k >= 2) {
                                break;
                            }
                            var generalInfo = new message.GeneralSimpleInfo();
                            formats[buttonName[j]].push(generalInfo);
                        }
                    }
                    tbl.simpleInfo = formats;
                    this.enemyInfo.push(tbl);
                }
            }
        };
        ArenaWholeEnemy.prototype.onBtnFight = function () {
            var _this = this;
            var thisOne = this;
            if (this.flag != true) {
                var curTime = zj.PlayerVIPSystem.Level().singlecraft_free + (zj.Game.PlayerVIPSystem.vipInfo.craft_buy * zj.CommonConfig.singlecraft_buy_time) - zj.Game.PlayerVIPSystem.vipInfo.craft_time;
                if (curTime > 0) {
                    if (this.num == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                        if (this.typeChat == 100) {
                            zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
                            zj.loadUI(zj.CommonFormatePveMain)
                                .then(function (dialog) {
                                zj.Game.EventManager.event(zj.GameEvent.MSGINFOP_DATA, { msgInfoName: _this.info.name, msgInfoLevel: _this.info.level, msgInfoArea: _this.nameChat });
                                //Game.EventManager.event(GameEvent.MANY_TEAMS, { manyTeamsFormations: this.enemyInfo, manyTeamsInfo: this.info });
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(thisOne.id);
                            });
                        }
                        else {
                            zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
                            zj.loadUI(zj.CommonFormatePveMain)
                                .then(function (dialog) {
                                zj.Game.EventManager.event(zj.GameEvent.MANY_TEAMS, { manyTeamsFormations: _this.enemyInfo, manyTeamsInfo: _this.info });
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                                dialog.setInfo(thisOne.id);
                            });
                        }
                    }
                    else {
                        zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK;
                        zj.loadUI(zj.CommonFormatePveMain)
                            .then(function (dialog) {
                            zj.Game.EventManager.event(zj.GameEvent.CROSS_SERVER_COMBAT_ITEM, { playerInfo: thisOne.playerInfo, crossRealminfo: thisOne.info, father: thisOne });
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.setInfo(thisOne.id);
                        });
                    }
                }
                else {
                    var challengeTableNumber = zj.TableLicence.Item(zj.Game.PlayerInfoSystem.LecenceLevel).singlecraft_buy;
                    var lowVip = zj.TableVipinfo.Item(zj.Game.PlayerInfoSystem.BaseInfo.vipLevel);
                    var a = zj.CommonConfig.singlecraft_buy_time_consume(zj.Game.PlayerVIPSystem.vipInfo.craft_buy);
                    var b = zj.CommonConfig.singlecraft_buy_time;
                    var c = challengeTableNumber + lowVip.craft_buy_time - zj.Game.PlayerVIPSystem.vipInfo.craft_buy;
                    var d = challengeTableNumber + lowVip.craft_buy_time;
                    var NumberMsg = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.buyNumTip, a, b, c, d);
                    zj.TipManager.ShowConfirmCancel(NumberMsg, function () {
                        _this.buyNumberReq();
                    }, null);
                }
            }
            else {
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
                zj.loadUI(zj.CommonFormatePveMain)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.id);
                });
            }
        };
        /**确认增加条件次数时发协议 */
        ArenaWholeEnemy.prototype.buyNumberReq = function () {
            zj.Game.PlayerArenaSystem.craftBuyTime()
                .then(function (roles) {
                zj.toast_success(zj.TextsConfig.TextsConfig_Pk.buyChallengeNumSuccessTip);
            })
                .catch(function (reason) {
                if (reason == "钻石不足") {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                        return;
                    });
                }
                else {
                    zj.toast_warning(reason);
                }
            });
        };
        ArenaWholeEnemy.prototype.setInfoList = function () {
            this.enemyItems.removeAll();
            for (var i = 0; i < this.enemyInfo.length; i++) {
                var data = new zj.ArenaWholeEnemyItemData();
                data.index = i;
                data.enemyInfo = this.enemyInfo[i];
                this.enemyItems.addItem(data);
            }
            this.listHeopTeam.dataProvider = this.enemyItems;
            this.listHeopTeam.itemRenderer = zj.ArenaWholeEnemyItem;
        };
        /**关闭弹窗*/
        ArenaWholeEnemy.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ArenaWholeEnemy;
    }(zj.Dialog));
    zj.ArenaWholeEnemy = ArenaWholeEnemy;
    __reflect(ArenaWholeEnemy.prototype, "zj.ArenaWholeEnemy");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeEnemy.js.map