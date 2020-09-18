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
    //公会战-公会排行-本服排行
    //yuqingchao
    //2019.02.21
    var LeagueUnionBattleRankItemIR = (function (_super) {
        __extends(LeagueUnionBattleRankItemIR, _super);
        function LeagueUnionBattleRankItemIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionBattleRankItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueUnionBattleRankItemIR"], null);
            _this.lbSegment.visible = false;
            return _this;
        }
        LeagueUnionBattleRankItemIR.prototype.dataChanged = function () {
            var info = this.data.info;
            this.lbMyRank.text = info.rank;
            this.imgMySegment.source = zj.cachekey(zj.PlayerLeagueSystem.GetSegment(info.score)[4], this);
            this.lbMyUnionName.text = info.leagueName;
            this.lbMyRankScore.text = info.score;
            this.SetRowColor(info.rank);
        };
        LeagueUnionBattleRankItemIR.prototype.SetRowColor = function (rank) {
            var color = zj.ConstantConfig_Common.Color.ub_rank_color;
            var tcolor;
            if (rank < 4) {
                tcolor = color[rank - 1];
            }
            else if (rank >= 4 && rank <= 20) {
                tcolor = color[3];
            }
            this.lbMyRank.textColor = tcolor;
            this.lbMyUnionName.textColor = tcolor;
            this.lbMyRankScore.textColor = tcolor;
        };
        return LeagueUnionBattleRankItemIR;
    }(eui.ItemRenderer));
    zj.LeagueUnionBattleRankItemIR = LeagueUnionBattleRankItemIR;
    __reflect(LeagueUnionBattleRankItemIR.prototype, "zj.LeagueUnionBattleRankItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionBattleRankItemIR.js.map