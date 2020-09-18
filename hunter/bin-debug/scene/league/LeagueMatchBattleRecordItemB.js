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
    //战斗记录——贡献排名
    //yuqingchao
    //2019.02.27
    var LeagueMatchBattleRecordItemB = (function (_super) {
        __extends(LeagueMatchBattleRecordItemB, _super);
        function LeagueMatchBattleRecordItemB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueMatchBattleRecordItemBSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueMatchBattleRecordItemB"], null);
            return _this;
        }
        LeagueMatchBattleRecordItemB.prototype.dataChanged = function () {
            var info = this.data.info;
            this.ibRank.text = this.data.id;
            this.imgFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(info.frame_id).path, this);
            this.imgPlayerIcon.source = zj.cachekey(zj.TableItemPic.Item(info.pic_id).path, this);
            this.lbUnionName.text = info.memberName;
            this.lbAtkTime.text = info.dailyMatchBattleWinTime.toString();
            this.lbContribution.text = info.dailyMatchBattleScore.toString();
        };
        return LeagueMatchBattleRecordItemB;
    }(eui.ItemRenderer));
    zj.LeagueMatchBattleRecordItemB = LeagueMatchBattleRecordItemB;
    __reflect(LeagueMatchBattleRecordItemB.prototype, "zj.LeagueMatchBattleRecordItemB");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchBattleRecordItemB.js.map