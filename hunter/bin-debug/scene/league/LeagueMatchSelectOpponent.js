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
    var LeagueMatchSelectOpponent = (function (_super) {
        __extends(LeagueMatchSelectOpponent, _super);
        function LeagueMatchSelectOpponent() {
            var _this = _super.call(this) || this;
            _this.rightInfo = [];
            _this.skinName = "resource/skins/league/LeagueMatchSelectOpponentSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        LeagueMatchSelectOpponent.prototype.setInfo = function (type, leagueInfo, myScore, enemyScore) {
            this.type = type;
            this.legueInfo = leagueInfo;
            this.myScore = myScore;
            zj.Gmgr.Instance.matchMyScore = myScore;
            this.enemyScore = enemyScore;
            this.setInfoTitle();
            this.getDoubleInfo();
        };
        LeagueMatchSelectOpponent.prototype.setInfoTitle = function () {
            this.imgFlyTitle.source = zj.cachekey(zj.UIConfig.UIConfig_Union.airShipTitle[this.type - 1], this);
            this.lbLastTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.donateLast, zj.CommonConfig.league_match_member_attack_times - zj.Game.PlayerLeagueSystem.Member.dailyMatchBattleWinTime, zj.CommonConfig.league_match_member_attack_times);
            this.lb1.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.winAndScore[0], zj.CommonConfig.league_match_fortress_star_socre[this.type - 1][0]);
            this.lb2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.winAndScore[1], zj.CommonConfig.league_match_fortress_star_socre[this.type - 1][1]);
            this.lb3.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.winAndScore[2], zj.CommonConfig.league_match_fortress_star_socre[this.type - 1][2]);
            this.lb4.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.otherScore, zj.CommonConfig.league_match_fortress_extra_socre[this.type - 1]);
        };
        LeagueMatchSelectOpponent.prototype.getDoubleInfo = function () {
            var _this = this;
            zj.Game.PlayerLeagueSystem.leagueMatchOpponentFortress(this.legueInfo.leagueId, this.type, false).then(function (resp) {
                var _loop_1 = function (i) {
                    if (_this.rightInfo[i] == null) {
                        var info_1 = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0, star: null, attackInfo: [0, null] };
                        info_1.name = "";
                        info_1.member_id = 0;
                        info_1.formationIndex = 0;
                        info_1.index = _this.type * 100 + (i + 1);
                        var starInfo = zj.Table.FindR(resp.battleInfo.fortressStar, function (k, v) {
                            return v.key == info_1.index;
                        });
                        if (starInfo[1] == null)
                            starInfo = null;
                        var attackInfo = zj.Table.FindR(resp.leagueBattles, function (k, v) {
                            return v.index == info_1.index;
                        });
                        if (attackInfo[1] == null)
                            attackInfo = null;
                        info_1.star = (starInfo == null ? 0 : starInfo[0]["value"]);
                        info_1.attackInfo = attackInfo;
                        _this.rightInfo.push(info_1);
                    }
                };
                for (var i = 0; i < zj.CommonConfig.league_match_fortress_team_num[_this.type - 1]; i++) {
                    _loop_1(i);
                }
                var _loop_2 = function (v) {
                    var info = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0, star: null, attackInfo: [0, null] };
                    info.formations = v.simpleFormation;
                    info.member_id = v.memberId;
                    info.name = v.name;
                    info.formationIndex = v.formationIndex;
                    info.index = v.index;
                    var starInfo = zj.Table.FindR(resp.battleInfo.fortressStar, function (k, v) {
                        return v.key == info.index;
                    });
                    if (starInfo[1] == null)
                        starInfo = null;
                    var attackInfo = zj.Table.FindR(resp.leagueBattles, function (k, v) {
                        return v.index == info.index;
                    });
                    if (attackInfo[1] == null)
                        attackInfo = null;
                    info.star = (starInfo == null ? 0 : starInfo[0]["value"]);
                    info.attackInfo = attackInfo;
                    var currentId = info.index % 10;
                    if (currentId > zj.CommonConfig.league_match_fortress_team_num[_this.type - 1])
                        return "continue";
                    _this.rightInfo[currentId - 1] = info;
                };
                for (var _i = 0, _a = resp.matchInfo.leagueFortress; _i < _a.length; _i++) {
                    var v = _a[_i];
                    _loop_2(v);
                }
                _this.rightInfo.sort(function (a, b) {
                    return a.index - b.index;
                });
                _this.setInfoList();
                _this.setInfoTitle2();
            });
        };
        LeagueMatchSelectOpponent.prototype.setInfoList = function () {
            var arrCollection = new eui.ArrayCollection();
            for (var k in this.rightInfo) {
                arrCollection.addItem({ i: Number(k) + 1, info: this.rightInfo[k], myScore: this.myScore, leagueInfo: this.legueInfo, type: this.type });
            }
            this.lstViewRight.itemRenderer = zj.LeagueMatchSelectOpponentItemIR;
            this.lstViewRight.dataProvider = arrCollection;
        };
        LeagueMatchSelectOpponent.prototype.setInfoTitle2 = function () {
            var maxHp = zj.PlayerLeagueSystem.GetMaxScore(this.type);
            var curHp = 0;
            var hurt = 0;
            var allBe3 = true;
            for (var _i = 0, _a = this.rightInfo; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.star != 0) {
                    hurt = hurt + zj.CommonConfig.league_match_fortress_star_socre[this.type - 1][v.star - 1];
                }
                else {
                    allBe3 = false;
                }
            }
            hurt = allBe3 ? maxHp : hurt;
            curHp = maxHp - hurt > 0 ? maxHp - hurt : 0;
            var percent = (curHp / maxHp) * 100;
            this.lbName.textColor = zj.Helper.RGBToHex("r:255,g:255,b:255");
            this.lbName.text = curHp + "/" + maxHp;
            this.lbName.stroke = 2;
            this.lbName.strokeColor = zj.Helper.RGBToHex("r:42,g:42,b:42");
            var progress = new eui.Image(zj.UIConfig.UIConfig_League.leaguMatchProgress2);
            progress.percentWidth = percent;
            this.groupProgress.addChild(progress);
        };
        LeagueMatchSelectOpponent.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueMatchSelectOpponent;
    }(zj.Dialog));
    zj.LeagueMatchSelectOpponent = LeagueMatchSelectOpponent;
    __reflect(LeagueMatchSelectOpponent.prototype, "zj.LeagueMatchSelectOpponent");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchSelectOpponent.js.map