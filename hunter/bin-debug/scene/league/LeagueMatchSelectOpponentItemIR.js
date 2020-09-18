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
    // lizhengqiang
    var oppoState = {
        "bAttack": 4,
        "cAttack": 1,
        "nAttack": 2,
        "cCatch": 3,
    };
    var LeagueMatchSelectOpponentItemIR = (function (_super) {
        __extends(LeagueMatchSelectOpponentItemIR, _super);
        function LeagueMatchSelectOpponentItemIR() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.skinName = "resource/skins/league/LeagueMatchSelectOpponentItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueMatchSelectOpponentItemIR"], null);
            _this.btnClickB.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClickB, _this);
            return _this;
        }
        LeagueMatchSelectOpponentItemIR.prototype.dataChanged = function () {
            this.id = this.data.i;
            this.info = this.data.info;
            this.myScore = this.data.myScore;
            this.index = this.data.type;
            this.setInfoList();
            this.setInfoOther();
        };
        LeagueMatchSelectOpponentItemIR.prototype.setInfoOther = function () {
            var hGeneral = (zj.Table.FindR(this.info.formations.generals, function (k, v) {
                return v.general_id != 0;
            })[1] != null);
            this.imgNoPerson.visible = !hGeneral;
            if (hGeneral) {
                this.lbName.text = this.info.name;
            }
            else {
                this.lbName.text = zj.TextsConfig.TextsConfig_Match.no;
            }
            this.lbNumber.text = this.id.toString();
            var star = this.info.star;
            for (var i = 1; i <= 3; i++) {
                if (i <= star) {
                    switch (i) {
                        case 1:
                            this.imgStar1.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                            break;
                        case 2:
                            this.imgStar2.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                            break;
                        case 3:
                            this.imgStar3.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                            break;
                    }
                }
                else {
                    switch (i) {
                        case 1:
                            this.imgStar1.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[1], this);
                            break;
                        case 2:
                            this.imgStar2.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[1], this);
                            break;
                        case 3:
                            this.imgStar3.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[1], this);
                            break;
                    }
                }
            }
            this.groupFull.visible = (star == 3);
            if (this.info.attackInfo != null) {
                this.curState = oppoState.bAttack;
                this.imgAttack.visible = false;
                this.imgCatch.visible = false;
                this.lbBAttack.visible = true;
                this.lbBAttack.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.bAttackNoPk, this.info.attackInfo[0]["name"]);
            }
            else if (zj.PlayerLeagueSystem.GetMaxScore() <= this.myScore && hGeneral) {
                this.curState = oppoState.cCatch;
                this.imgAttack.visible = false;
                this.imgCatch.visible = true;
                this.lbBAttack.visible = false;
            }
            else if (star != 3) {
                this.curState = oppoState.cAttack;
                this.imgAttack.visible = true;
                this.imgCatch.visible = false;
                this.lbBAttack.visible = false;
            }
            else {
                this.curState = oppoState.nAttack;
                this.imgAttack.visible = false;
                this.imgCatch.visible = false;
                this.lbBAttack.visible = false;
            }
        };
        LeagueMatchSelectOpponentItemIR.prototype.setInfoList = function () {
            var formation = {};
            for (var i = 1; i <= 4; i++) {
                if (this.info.formations.generals[i - 1] == null) {
                    var generalInfo = new message.GeneralSimpleInfo();
                    formation[i] = generalInfo;
                }
                else {
                    formation[i] = this.info.formations.generals[i - 1];
                }
            }
            var bShowAdd = zj.PlayerLeagueSystem.FormationShowAdd(formation);
            var isNoPerson = true;
            for (var k in formation) {
                if (formation[k].general_id != 0) {
                    isNoPerson = false;
                    break;
                }
            }
            this.imgNoPerson.visible = false;
            this.lstFormateB.visible = true;
            if (isNoPerson) {
                this.imgNoPerson.visible = true;
                this.lstFormateB.visible = false;
                return;
            }
            var arrCollection = new eui.ArrayCollection();
            for (var v in formation) {
                arrCollection.addItem({ generalInfo: formation[v], bShowAdd: bShowAdd[v] });
            }
            this.lstFormateB.itemRenderer = zj.LeagueMatchSelectDefenceFormationItemBIR;
            this.lstFormateB.dataProvider = arrCollection;
        };
        LeagueMatchSelectOpponentItemIR.prototype.onBtnClickB = function () {
            var _this = this;
            var attackFunc = function () {
                // "HXH_CommonFormationPvpGoMatch"
                var leagueInfo = _this.data.leagueInfo;
                var formations = _this.info.formations;
                //加载阵型界面
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_MATCH_ATTACK;
                zj.loadUI(zj.CommonFormatePveMain)
                    .then(function (dialog) {
                    zj.Game.EventManager.event(zj.GameEvent.TEAM_FIGHT_ITEM, { leagueInfo: leagueInfo, infoIndex: _this.info.index, formations: formations, infoName: _this.info.name, infoData: _this.info });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this.index);
                });
            };
            if (this.curState == oppoState.nAttack) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Match.pass));
            }
            else if (zj.CommonConfig.league_match_member_attack_times == zj.Game.PlayerLeagueSystem.Member.dailyMatchBattleWinTime) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_GroupFight.timeNotEnough));
            }
            else if (this.curState == oppoState.cCatch) {
                // "HXH_MatchConfirmCancel"
            }
            else if (this.curState == oppoState.bAttack) {
                zj.toast_warning(zj.LANG(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.bAttackNoPk, this.info.attackInfo[0]["name"])));
            }
            else if (this.curState == oppoState.cAttack) {
                attackFunc();
            }
        };
        return LeagueMatchSelectOpponentItemIR;
    }(eui.ItemRenderer));
    zj.LeagueMatchSelectOpponentItemIR = LeagueMatchSelectOpponentItemIR;
    __reflect(LeagueMatchSelectOpponentItemIR.prototype, "zj.LeagueMatchSelectOpponentItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchSelectOpponentItemIR.js.map