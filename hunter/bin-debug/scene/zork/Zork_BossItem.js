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
     * @class 世界boss伤害排行信息Item
     *
     * @author LianLei
     *
     * 2019.06.17
     */
    var Zork_BossItem = (function (_super) {
        __extends(Zork_BossItem, _super);
        function Zork_BossItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/zork/Zork_BossItemSkin.exml";
            return _this;
        }
        Zork_BossItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Zork_BossItem.prototype.updateView = function (data) {
            this.imgRank.visible = false;
            this.labelName.text = data.info.baseInfo.name;
            this.labelText.text = data.info.rank;
            var persent = (data.info.value / data.blood * 100).toFixed(2);
            this.labelValue.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.perDemage, zj.Set.numberUnit4(data.info.value), persent);
        };
        return Zork_BossItem;
    }(eui.ItemRenderer));
    zj.Zork_BossItem = Zork_BossItem;
    __reflect(Zork_BossItem.prototype, "zj.Zork_BossItem");
    var Zork_BossItemData = (function () {
        function Zork_BossItemData() {
        }
        return Zork_BossItemData;
    }());
    zj.Zork_BossItemData = Zork_BossItemData;
    __reflect(Zork_BossItemData.prototype, "zj.Zork_BossItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Zork_BossItem.js.map