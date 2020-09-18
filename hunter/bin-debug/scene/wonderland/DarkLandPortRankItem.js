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
    /**
     * @author xingliwei
     *
     * @date 2019-6-17
     *
     * @class 贪婪之岛港口积分排行子项
     */
    var DarkLandPortRankItem = (function (_super) {
        __extends(DarkLandPortRankItem, _super);
        function DarkLandPortRankItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/DarkLandPortRankItemSkin.exml";
            return _this;
        }
        DarkLandPortRankItem.prototype.dataChanged = function () {
            var data = this.data;
            this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank1, data.info.rank);
            this.labelName.text = data.info.roleName;
            this.labelServer.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, zj.singLecraft.decodeGroupName(data.info.groupName, "&", false), zj.singLecraft.decodeGroupName(data.info.groupName, "&", true));
            this.labelValue.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Egg_Random.score, data.info.score);
        };
        return DarkLandPortRankItem;
    }(eui.ItemRenderer));
    zj.DarkLandPortRankItem = DarkLandPortRankItem;
    __reflect(DarkLandPortRankItem.prototype, "zj.DarkLandPortRankItem");
    var DarkLandPortRankItemData = (function () {
        function DarkLandPortRankItemData() {
        }
        return DarkLandPortRankItemData;
    }());
    zj.DarkLandPortRankItemData = DarkLandPortRankItemData;
    __reflect(DarkLandPortRankItemData.prototype, "zj.DarkLandPortRankItemData");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLandPortRankItem.js.map