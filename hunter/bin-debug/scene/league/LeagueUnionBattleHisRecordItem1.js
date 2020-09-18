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
    //历史战绩-贡献排名
    //yuqingchao
    var LeagueUnionBattleHisRecordItem1 = (function (_super) {
        __extends(LeagueUnionBattleHisRecordItem1, _super);
        function LeagueUnionBattleHisRecordItem1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionBattleHisRecordItemSkin1.exml";
            zj.cachekeys(zj.UIResource["LeagueUnionBattleHisRecordItem1"], null);
            return _this;
        }
        LeagueUnionBattleHisRecordItem1.prototype.dataChanged = function () {
            var info = this.data.info;
            this.ibRank.text = this.data.id;
            this.imgFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(info.frame_id).path, this);
            this.imgPlayerIcon.source = zj.cachekey(zj.TableItemPic.Item(info.pic_id).path, this);
            this.lbUnionName.text = info.memberName;
            this.lbAtkTime.text = info.weekMatchBattleWinTime.toString();
            this.lbContribution.text = info.weekMatchBattleScore.toString();
        };
        return LeagueUnionBattleHisRecordItem1;
    }(eui.ItemRenderer));
    zj.LeagueUnionBattleHisRecordItem1 = LeagueUnionBattleHisRecordItem1;
    __reflect(LeagueUnionBattleHisRecordItem1.prototype, "zj.LeagueUnionBattleHisRecordItem1");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionBattleHisRecordItem1.js.map