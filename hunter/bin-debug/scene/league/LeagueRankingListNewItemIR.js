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
    // lizhengqiang
    // 20181227
    var LeagueRankingListItemNewIR = (function (_super) {
        __extends(LeagueRankingListItemNewIR, _super);
        function LeagueRankingListItemNewIR() {
            var _this = _super.call(this) || this;
            _this.isFirst = true;
            _this.skinName = "resource/skins/league/LeagueRankingListNewItemIRSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueRankingListItemNewIR"], null);
            _this.lbLeaderName.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLbLeaderName, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        LeagueRankingListItemNewIR.prototype.dataChanged = function () {
            var _this = this;
            zj.closeCache(this.groupItem);
            this.father = this.data.father;
            var leagueBase = this.data.leagueBase;
            var rankNo = this.data.rankNo;
            if (leagueBase.leagueId == 0)
                return;
            // 排名
            this.lbLeagueNo.text = rankNo.toString();
            // 公会名称
            this.lbLeagueName.text = leagueBase.name;
            // 等级
            this.lbLeagueLevel.text = leagueBase.level.toString();
            // 人数
            this.lbMemberNum.text = leagueBase.curNum + "/" + zj.TableLevel.Item(leagueBase.level).league_people;
            this.lbMemberNum.textColor = zj.ConstantConfig_Common.Color.black;
            if (leagueBase.curNum >= zj.TableLevel.Item(leagueBase.level).league_people) {
                this.lbMemberNum.textColor = zj.ConstantConfig_Common.Color.red;
            }
            // 段位
            var starPath = zj.PlayerLeagueSystem.GetSegment(leagueBase.match_score)[4];
            if (starPath != "") {
                this.imgStar.source = zj.cachekey(starPath, this);
            }
            else {
                this.imgStar.visible = false;
            }
            // 总战力
            this.lbLeaderStrength.text = leagueBase.battle_value >= 10000 ? ((Math.floor(leagueBase.battle_value / 10000)).toString() + "万") : leagueBase.battle_value.toString();
            // 会长
            this.lbLeaderName.text = leagueBase.leaderName;
            zj.setCache(this.groupItem);
            if (this.isFirst && rankNo < 8) {
                var groupItemX = this.groupItem.x;
                this.groupItem.x = this.groupItem.width;
                egret.Tween.get(this.groupItem)
                    .wait(rankNo * 10)
                    .to({ x: groupItemX }, 260)
                    .call(function () {
                    _this.isFirst = false;
                });
            }
        };
        LeagueRankingListItemNewIR.prototype.onLbLeaderName = function () {
            var _this = this;
            // toast("会长信息");
            zj.Game.PlayerInfoSystem.queryRoleInfo(this.data.leagueBase.leaderId, zj.Game.Controller.lastLoginGroupID()).then(function (msg) {
                if (msg.baseInfo.id == zj.Game.PlayerInfoSystem.BaseInfo.id)
                    return;
                // "Chat_UserPopB"
                var point = _this.lbLeaderName.localToGlobal();
                point.x -= zj.Game.UIManager.x;
                _this.father.managePop(msg, point);
            });
        };
        return LeagueRankingListItemNewIR;
    }(eui.ItemRenderer));
    zj.LeagueRankingListItemNewIR = LeagueRankingListItemNewIR;
    __reflect(LeagueRankingListItemNewIR.prototype, "zj.LeagueRankingListItemNewIR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueRankingListNewItemIR.js.map