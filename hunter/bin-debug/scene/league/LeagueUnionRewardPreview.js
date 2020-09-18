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
    //公会战奖励预览
    //YUQINGCHAO
    var LeagueUnionRewardPreview = (function (_super) {
        __extends(LeagueUnionRewardPreview, _super);
        function LeagueUnionRewardPreview() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionRewardPreviewSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnSegment.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSegment, _this);
            _this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRank, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.onBtnSegment();
            return _this;
        }
        //段位奖励  默认
        LeagueUnionRewardPreview.prototype.onBtnSegment = function () {
            this.btnSegment.currentState = "down";
            this.btnRank.currentState = "up";
            this.groupSegment.visible = true;
            this.groupRank.visible = false;
            this.imgMysegment.source = zj.cachekey(zj.PlayerLeagueSystem.GetSegment(zj.Game.PlayerLeagueSystem.BaseInfo.match_score)[4], this);
            this.lbDes.text = zj.TextsConfig.TextsConfig_Match.rank[7];
            this.setInfo();
        };
        //排位奖励
        LeagueUnionRewardPreview.prototype.onBtnRank = function () {
            this.btnSegment.currentState = "up";
            this.btnRank.currentState = "down";
            this.groupSegment.visible = false;
            this.groupRank.visible = true;
            this.lbDes.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Match.rank[8], zj.Game.PlayerLeagueSystem.Member.weekMatchBattleTime);
            this.setInfo1();
        };
        /************************段位奖励************************/
        LeagueUnionRewardPreview.prototype.setInfo = function () {
            var dee = zj.TextsConfig.TextsConfig_Match.rank[2];
            this.lbLins.textFlow = zj.Util.RichText(dee);
            this.lbMyScore.text = zj.Game.PlayerLeagueSystem.BaseInfo.match_score.toString();
            this.loadList();
        };
        LeagueUnionRewardPreview.prototype.loadList = function () {
            var tbScore = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueMatchScore + ".json"); //公会战段位奖励表
            this.arrCollection = new eui.ArrayCollection();
            for (var i = Object.keys(tbScore).length; i > 0; i--) {
                this.arrCollection.addItem({
                    i: i,
                    father: this
                });
            }
            this.lstAward.itemRenderer = zj.LeagueUnionRewarPreviewItem;
            this.lstAward.dataProvider = this.arrCollection;
        };
        /************************排位奖励************************/
        LeagueUnionRewardPreview.prototype.setInfo1 = function () {
            var dee = zj.TextsConfig.TextsConfig_Match.rank[3];
            this.lbLins0.textFlow = zj.Util.RichText(dee);
            this.lbMyRank.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Contend.mineRank, zj.Game.PlayerLeagueSystem.BaseInfo.match_rank);
            this.loadList1();
        };
        LeagueUnionRewardPreview.prototype.loadList1 = function () {
            var tbRank = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueMatchRank + ".json"); //公会战排位奖励表
            this.arrCollection1 = new eui.ArrayCollection();
            for (var i = 0; i < Object.keys(tbRank).length; i++) {
                this.arrCollection1.addItem({
                    i: i,
                    father: this
                });
            }
            this.lstAward0.itemRenderer = zj.LeagueUnionRewarPreviewItem1;
            this.lstAward0.dataProvider = this.arrCollection1;
        };
        LeagueUnionRewardPreview.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        //鼠标抬起，移除  掉落 材料说明
        LeagueUnionRewardPreview.prototype.onRemoveAward = function () {
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
        };
        return LeagueUnionRewardPreview;
    }(zj.Dialog));
    zj.LeagueUnionRewardPreview = LeagueUnionRewardPreview;
    __reflect(LeagueUnionRewardPreview.prototype, "zj.LeagueUnionRewardPreview");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionRewardPreview.js.map