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
    //公会战排位奖励表
    //yuqingchao
    var LeagueUnionRewarPreviewItem1 = (function (_super) {
        __extends(LeagueUnionRewarPreviewItem1, _super);
        function LeagueUnionRewarPreviewItem1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemSkin1.exml";
            return _this;
        }
        LeagueUnionRewarPreviewItem1.prototype.dataChanged = function () {
            var i = this.data.i + 1;
            var father0 = this.data.father;
            var tbRank = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueMatchRank + ".json"); //公会战段位奖励表
            if (tbRank[i].rank_max - tbRank[i].rank_min == 1)
                this.lbRank.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Contend.mineRank, tbRank[i].rank_max);
            else
                this.lbRank.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Contend.mineRank, tbRank[i].rank_min + 1 + "-" + tbRank[i].rank_max);
            this.loadList(i, father0);
        };
        LeagueUnionRewarPreviewItem1.prototype.loadList = function (i, father) {
            var tbRank = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueMatchRank + ".json");
            this.arrCollection = new eui.ArrayCollection();
            for (var j = 0; j < Object.keys(tbRank[i].local_rank_reward).length; j++) {
                this.arrCollection.addItem({
                    i: i,
                    reward: tbRank[i].local_rank_reward,
                    j: j,
                    father: father
                });
            }
            this.lstItem0.itemRenderer = zj.LeagueUnionRewarPreviewItemItem;
            this.lstItem0.dataProvider = this.arrCollection;
        };
        return LeagueUnionRewarPreviewItem1;
    }(eui.ItemRenderer));
    zj.LeagueUnionRewarPreviewItem1 = LeagueUnionRewarPreviewItem1;
    __reflect(LeagueUnionRewarPreviewItem1.prototype, "zj.LeagueUnionRewarPreviewItem1");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionRewarPreviewItem1.js.map