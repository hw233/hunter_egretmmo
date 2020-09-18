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
    //工会状态——玩家信息
    //yuqingchao
    //2019.02.27
    var LeagueUnionStatusItem = (function (_super) {
        __extends(LeagueUnionStatusItem, _super);
        function LeagueUnionStatusItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionStatusItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueUnionStatusItem"], null);
            return _this;
        }
        LeagueUnionStatusItem.prototype.dataChanged = function () {
            var info = this.data.info;
            this.imgFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(info.frame_id).path, this);
            this.imgPlayerIcon.source = zj.cachekey(zj.TableItemPic.Item(info.pic_id).path, this);
            this.lbUnionName.text = info.memberName;
            this.ibRank.text = this.data.id;
            this.lbContribution.text = info.dailyMatchBattleScore.toString();
            this.lbAtkTime.text = (zj.CommonConfig.league_match_member_attack_times - info.dailyMatchBattleWinTime).toString();
        };
        return LeagueUnionStatusItem;
    }(eui.ItemRenderer));
    zj.LeagueUnionStatusItem = LeagueUnionStatusItem;
    __reflect(LeagueUnionStatusItem.prototype, "zj.LeagueUnionStatusItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionStatusItem.js.map