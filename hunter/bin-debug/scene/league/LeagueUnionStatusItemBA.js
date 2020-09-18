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
    var LeagueUnionStatusItemBA = (function (_super) {
        __extends(LeagueUnionStatusItemBA, _super);
        function LeagueUnionStatusItemBA() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionStatusItem2Skin.exml";
            return _this;
        }
        LeagueUnionStatusItemBA.prototype.dataChanged = function () {
            var info = this.data.info;
            if (info.isBreak) {
                var str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Match.union_status[8], info.name, info.formationIndex);
                this.lbTeamStatus.textFlow = zj.Util.RichText(str);
            }
            else {
                var str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Match.union_status[7], info.name, info.formationIndex);
                this.lbTeamStatus.text = str;
            }
            var formation = info.simpleFormation.generals;
            for (var k in formation) {
                var v = formation[k];
                if (v.general_id != 0) {
                    this["imgIcon" + k].source = zj.cachekey(zj.PlayerHunterSystem.Head(v.general_id), this);
                    this["imgHeroFrame" + k].source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[v.step], this);
                }
            }
        };
        return LeagueUnionStatusItemBA;
    }(eui.ItemRenderer));
    zj.LeagueUnionStatusItemBA = LeagueUnionStatusItemBA;
    __reflect(LeagueUnionStatusItemBA.prototype, "zj.LeagueUnionStatusItemBA");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueUnionStatusItemBA.js.map