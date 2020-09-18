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
    // 20190212
    var LeagueMatchSelectDefenceFormationItemBIR = (function (_super) {
        __extends(LeagueMatchSelectDefenceFormationItemBIR, _super);
        function LeagueMatchSelectDefenceFormationItemBIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueMatchSelectDefenceFormationItemBSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueMatchSelectDefenceFormationItemBIR"], null);
            return _this;
        }
        LeagueMatchSelectDefenceFormationItemBIR.prototype.dataChanged = function () {
            this.generalInfo = this.data.generalInfo;
            this.bShowAdd = this.data.bShowAdd;
            this.setInfoBase();
            this.setINfoGeneral();
        };
        LeagueMatchSelectDefenceFormationItemBIR.prototype.setInfoBase = function () {
            this.imgAdd.visible = true;
            this.groupAll.visible = false;
            this.imgHeroFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[0], this);
        };
        LeagueMatchSelectDefenceFormationItemBIR.prototype.setINfoGeneral = function () {
            this.imgAdd.visible = this.bShowAdd;
            if (this.generalInfo == null || this.generalInfo.general_id == 0) {
                return;
            }
            this.groupAll.visible = true;
            this.imgHeroHead.source = zj.cachekey(zj.PlayerHunterSystem.Head(zj.PlayerHunterSystem.GetGeneralId(this.generalInfo.general_id)), this);
            this.imgHeroFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[this.generalInfo.step], this);
            this.lbLevel.text = this.generalInfo.level.toString();
            // star
            zj.Helper.SetHeroAwakenStar(this.groupStar, this.generalInfo.star, this.generalInfo.awaken_level);
        };
        return LeagueMatchSelectDefenceFormationItemBIR;
    }(eui.ItemRenderer));
    zj.LeagueMatchSelectDefenceFormationItemBIR = LeagueMatchSelectDefenceFormationItemBIR;
    __reflect(LeagueMatchSelectDefenceFormationItemBIR.prototype, "zj.LeagueMatchSelectDefenceFormationItemBIR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchSelectDefenceFormationItemBIR.js.map