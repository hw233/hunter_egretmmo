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
    // 
    // lizhengqiang
    // 20181221
    var LeagueHomeDesLive = (function (_super) {
        __extends(LeagueHomeDesLive, _super);
        function LeagueHomeDesLive() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueHomeDesLiveSkin.exml";
            _this.init();
            return _this;
        }
        LeagueHomeDesLive.prototype.init = function () {
            this.lbLeagueActive.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.home_pop_active, zj.Game.PlayerLeagueSystem.BaseInfo.enliven_all) + "/" + zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_enliven_all;
            this.lbMineActive.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.home_pop_mine_active, zj.Game.PlayerLeagueSystem.Member.enliven_day, zj.CommonConfig.league_active_day_max);
            this.lbTody.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.home_pop_today, zj.Game.PlayerLeagueSystem.BaseInfo.enliven_day, zj.TableLevel.Item(zj.Game.PlayerLeagueSystem.BaseInfo.level).league_enliven);
        };
        return LeagueHomeDesLive;
    }(zj.UI));
    zj.LeagueHomeDesLive = LeagueHomeDesLive;
    __reflect(LeagueHomeDesLive.prototype, "zj.LeagueHomeDesLive");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueHomeDesLive.js.map