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
    //公会BOSS挑战成功或失败后结算
    //yuqingchao
    //2019.03.06
    var LeagueBossRank = (function (_super) {
        __extends(LeagueBossRank, _super);
        function LeagueBossRank() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueBossRankSkin.exml";
            return _this;
        }
        LeagueBossRank.prototype.refreash = function () {
            this.setInfo(zj.Game.PlayerLeagueSystem.leagueBoss.RankList);
        };
        LeagueBossRank.prototype.setInfo = function (msg) {
            var arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < msg.length; i++) {
                arrayCollection.addItem({
                    i: i,
                    info: msg[i]
                });
            }
            this.lstView.dataProvider = arrayCollection;
            this.lstView.itemRenderer = zj.LeagueBossRankItem;
        };
        return LeagueBossRank;
    }(zj.Dialog));
    zj.LeagueBossRank = LeagueBossRank;
    __reflect(LeagueBossRank.prototype, "zj.LeagueBossRank");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossRank.js.map