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
    //公会战段位奖励表
    //yuqingchao
    var LeagueUnionRewarPreviewItem = (function (_super) {
        __extends(LeagueUnionRewarPreviewItem, _super);
        function LeagueUnionRewarPreviewItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueUnionRewarPreviewItem"], null);
            _this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.listItem, _this);
            return _this;
        }
        LeagueUnionRewarPreviewItem.prototype.dataChanged = function () {
            var i = this.data.i;
            var father0 = this.data.father;
            var tbScore = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueMatchScore + ".json"); //公会战段位奖励表
            this.lbLimit.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Contend.matchScore, tbScore[i].score_min) + "以上";
            this.imgSegment.source = zj.cachekey(zj.UIConfig.UIConfig_Union.segmentLogo[i - 1], this);
            this.loadList(i, father0);
        };
        LeagueUnionRewarPreviewItem.prototype.loadList = function (i, father) {
            var tbScore = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueMatchScore + ".json");
            this.arrCollection = new eui.ArrayCollection();
            for (var j = 0; j < Object.keys(tbScore[i].daily_reward).length; j++) {
                this.arrCollection.addItem({
                    i: i,
                    reward: tbScore[i].daily_reward,
                    j: j,
                    father: father
                });
            }
            this.lstItem.itemRenderer = zj.LeagueUnionRewarPreviewItemItem;
            this.lstItem.dataProvider = this.arrCollection;
        };
        LeagueUnionRewarPreviewItem.prototype.listItem = function () {
        };
        return LeagueUnionRewarPreviewItem;
    }(eui.ItemRenderer));
    zj.LeagueUnionRewarPreviewItem = LeagueUnionRewarPreviewItem;
    __reflect(LeagueUnionRewarPreviewItem.prototype, "zj.LeagueUnionRewarPreviewItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionRewarPreviewItem.js.map