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
    //公会战-公会排行-主界面
    //yuqingchao
    //2019.02.21
    var LeagueUnionBattleRank = (function (_super) {
        __extends(LeagueUnionBattleRank, _super);
        function LeagueUnionBattleRank() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionBattleRankSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnThisSerRank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnThisSerRank, _this);
            _this.btnStrongWorld.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnStrongWorld, _this);
            _this.init();
            return _this;
        }
        LeagueUnionBattleRank.prototype.init = function () {
            this.onBtnThisSerRank();
            this.setMyInfo();
        };
        LeagueUnionBattleRank.prototype.applyRankInfo = function (tyep) {
        };
        //设置所在公会信息
        LeagueUnionBattleRank.prototype.setMyInfo = function () {
            var leagueBase = zj.Game.PlayerLeagueSystem.BaseInfo;
            this.lbMyRank.text = leagueBase.match_rank.toString();
            this.imgMySegment.source = zj.cachekey(zj.PlayerLeagueSystem.GetSegment(leagueBase.match_score)[4], this);
            this.lbMyUnionName.text = leagueBase.name;
            this.lbMyRankScore.text = leagueBase.match_score.toString();
        };
        LeagueUnionBattleRank.prototype.onBtnThisSerRank = function () {
            var _this = this;
            this.btnThisSerRank.currentState = "down";
            this.btnStrongWorld.currentState = "up";
            this.groupHead1.visible = true;
            this.groupHead3.visible = false;
            this.groupMyInfo.visible = true;
            this.lstViewRankThis.visible = false;
            this.lstViewRank.visible = true;
            zj.Game.PlayerLeagueSystem.leagueMatchQueryRank(1)
                .then(function (arr) {
                _this.SetInfoMall(arr);
            });
        };
        LeagueUnionBattleRank.prototype.onBtnStrongWorld = function () {
            var _this = this;
            this.btnThisSerRank.currentState = "up";
            this.btnStrongWorld.currentState = "down";
            this.groupHead1.visible = false;
            this.groupHead3.visible = true;
            this.groupMyInfo.visible = false;
            this.lstViewRank.visible = false;
            this.lstViewRankThis.visible = true;
            zj.Game.PlayerLeagueSystem.leagueMatchQueryRank(4)
                .then(function (arr) {
                _this.SetInfoMall1(arr);
            });
        };
        LeagueUnionBattleRank.prototype.SetInfoMall = function (arr) {
            this.array = new eui.ArrayCollection();
            for (var i = 0; i < arr.length; i++) {
                this.array.addItem({
                    info: arr[i]
                });
            }
            this.lstViewRank.dataProvider = this.array;
            this.lstViewRank.itemRenderer = zj.LeagueUnionBattleRankItemIR;
        };
        LeagueUnionBattleRank.prototype.SetInfoMall1 = function (arr) {
            this.array1 = new eui.ArrayCollection();
            var tempTab = [];
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var v = arr_1[_i];
                var server = zj.PlayerLeagueSystem.GetServerName(v.group_name);
                var has = false;
                if (tempTab.length != 0) {
                    for (var kk in tempTab) {
                        if (tempTab[kk]["serverName"] == server) {
                            tempTab[kk][v.rank] = v.leagueName;
                            has = true;
                        }
                    }
                }
                if (!has) {
                    var t = {};
                    t["serverName"] = server;
                    t[v.rank] = v.leagueName;
                    tempTab.push(t);
                }
            }
            for (var _a = 0, tempTab_1 = tempTab; _a < tempTab_1.length; _a++) {
                var v = tempTab_1[_a];
                var aData = {};
                aData["server"] = v["serverName"];
                aData["union1"] = v[1];
                aData["union2"] = v[2];
                aData["union3"] = v[3];
                this.array1.addItem({
                    info: aData
                });
            }
            // for (let i = 0; i < arr.length; i++) {
            // }
            this.lstViewRankThis.dataProvider = this.array1;
            this.lstViewRankThis.itemRenderer = zj.LeagueUnionBattleRankItem3IR;
        };
        LeagueUnionBattleRank.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueUnionBattleRank;
    }(zj.Dialog));
    zj.LeagueUnionBattleRank = LeagueUnionBattleRank;
    __reflect(LeagueUnionBattleRank.prototype, "zj.LeagueUnionBattleRank");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionBattleRank.js.map