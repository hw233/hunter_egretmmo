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
    //公会战-公会排行-世界排行
    //yuqingchao
    //2019.02.21
    var LeagueUnionBattleRankItem3IR = (function (_super) {
        __extends(LeagueUnionBattleRankItem3IR, _super);
        function LeagueUnionBattleRankItem3IR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionBattleRankItem3Skin.exml";
            return _this;
        }
        LeagueUnionBattleRankItem3IR.prototype.dataChanged = function () {
            var info = this.data.info;
            this.lbSeverName.text = info["server"];
            this.lbUnion1.text = info["union1"];
            this.lbUnion2.text = info["union2"];
            this.lbUnion3.text = info["union3"];
        };
        return LeagueUnionBattleRankItem3IR;
    }(eui.ItemRenderer));
    zj.LeagueUnionBattleRankItem3IR = LeagueUnionBattleRankItem3IR;
    __reflect(LeagueUnionBattleRankItem3IR.prototype, "zj.LeagueUnionBattleRankItem3IR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionBattleRankItem3IR.js.map