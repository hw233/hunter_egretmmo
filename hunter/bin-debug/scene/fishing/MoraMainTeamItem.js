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
    // wang shen zhuo
    // HXH_MoraMainTeamItem
    // 2019.05.24
    var MoraMainTeamItem = (function (_super) {
        __extends(MoraMainTeamItem, _super);
        function MoraMainTeamItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/MoraMainTeamItemSkin.exml";
            zj.cachekeys(zj.UIResource["MoraMainTeamItem"], null);
            return _this;
        }
        MoraMainTeamItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            var path_head = zj.PlayerHunterSystem.Head(this.data.info);
            this.imageIcon.source = zj.cachekey(path_head, this);
            this.imagePlayerId.source = zj.cachekey(zj.UIConfig.UIConfig_WonderRunes.numberPath[this.data.index], this);
            zj.setCache(this.groupCache);
        };
        return MoraMainTeamItem;
    }(eui.ItemRenderer));
    zj.MoraMainTeamItem = MoraMainTeamItem;
    __reflect(MoraMainTeamItem.prototype, "zj.MoraMainTeamItem");
    var MoraMainTeamItemData = (function () {
        function MoraMainTeamItemData() {
        }
        return MoraMainTeamItemData;
    }());
    zj.MoraMainTeamItemData = MoraMainTeamItemData;
    __reflect(MoraMainTeamItemData.prototype, "zj.MoraMainTeamItemData");
})(zj || (zj = {}));
//# sourceMappingURL=MoraMainTeamItem.js.map