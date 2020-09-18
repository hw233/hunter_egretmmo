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
    //公会BOSS-击杀成功
    //yuqingchao
    //2019.03.11
    var LeagueBossSccessful = (function (_super) {
        __extends(LeagueBossSccessful, _super);
        function LeagueBossSccessful() {
            var _this = _super.call(this) || this;
            _this.leagueBossRank = null;
            _this.skinName = "resource/skins/league/LeagueBossSccessfulSkin.exml";
            _this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGo, _this);
            _this.btnGoCele.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGoCele, _this);
            var nm = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.animal_killName, zj.Game.PlayerLeagueSystem.leagueBoss.KillName);
            var arr = zj.Game.PlayerLeagueSystem.leagueBoss.RankList;
            _this.lbKillName.textFlow = zj.Util.RichText(nm);
            _this.leagueBossRank = new zj.LeagueBossRank();
            _this.groupAdd.addChild(_this.leagueBossRank);
            _this.leagueBossRank.refreash();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.leagueBossRank = null;
            }, null);
            return _this;
        }
        LeagueBossSccessful.prototype.onBtnGo = function () {
            this.close(zj.UI.SHOW_FROM_BOTTON);
        };
        LeagueBossSccessful.prototype.onBtnGoCele = function () {
            var _this = this;
            var a = zj.Game.PlayerLeagueSystem.Member.is_boss_join;
            if (zj.Game.PlayerLeagueSystem.Member.is_party_join) {
                this.close();
                zj.Game.PlayerLeagueSystem.leaguePartyScene().then(function () {
                    zj.loadUI(zj.LeagueBossCelebrate)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                });
            }
            else {
                if (zj.Game.PlayerLeagueSystem.Member.is_boss_join) {
                    this.close();
                    zj.Game.PlayerLeagueSystem.leaguePartyScene().then(function () {
                        zj.loadUI(zj.LeagueBossCelebrate)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                        });
                    });
                }
                else {
                    var des = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.animal_goCele, zj.CommonConfig.league_party_consume);
                    zj.TipManager.ShowConfirmCancel(des, function () {
                        zj.Game.PlayerLeagueSystem.leaguePartyScene().then(function () {
                            zj.loadUI(zj.LeagueBossCelebrate)
                                .then(function (dialog) {
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                            });
                        });
                        _this.close();
                    });
                }
            }
        };
        return LeagueBossSccessful;
    }(zj.Dialog));
    zj.LeagueBossSccessful = LeagueBossSccessful;
    __reflect(LeagueBossSccessful.prototype, "zj.LeagueBossSccessful");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossSccessful.js.map