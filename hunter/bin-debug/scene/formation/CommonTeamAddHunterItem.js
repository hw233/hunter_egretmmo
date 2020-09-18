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
    var CommonTeamAddHunterItem = (function (_super) {
        __extends(CommonTeamAddHunterItem, _super);
        function CommonTeamAddHunterItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/formation/CommonTeamAddHunterItemSkin.exml";
            zj.cachekeys(zj.UIResource["CommonTeamAddHunterItem"], null);
            return _this;
        }
        CommonTeamAddHunterItem.prototype.dataChanged = function () {
            var generalId = this.data.generalId;
            var isShowAdd = this.data.isShowAdd;
            if (generalId == null || generalId == 0) {
                var showAdd = isShowAdd == null ? true : false;
                this.imgHeroFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[0], this);
                this.imgHeroHead.visible = false;
                this.btnAddTeam.visible = showAdd;
                this.btnAddTeam.touchEnabled = false;
            }
            else {
                this.imgHeroFrame.visible = true;
                this.btnAddTeam.visible = false;
                this.btnAddTeam.touchEnabled = false;
                this.imgHeroHead.source = zj.cachekey(zj.PlayerHunterSystem.Head(generalId), this);
                this.imgHeroFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[zj.Game.PlayerHunterSystem.queryHunter(generalId).step], this);
            }
        };
        return CommonTeamAddHunterItem;
    }(eui.ItemRenderer));
    zj.CommonTeamAddHunterItem = CommonTeamAddHunterItem;
    __reflect(CommonTeamAddHunterItem.prototype, "zj.CommonTeamAddHunterItem");
})(zj || (zj = {}));
//# sourceMappingURL=CommonTeamAddHunterItem.js.map