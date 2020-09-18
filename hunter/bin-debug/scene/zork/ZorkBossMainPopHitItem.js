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
    //贪婪之岛-寿富拉比-伤害列表Item
    //yuqingchao
    //2019.03.15
    var ZorkBossMainPopHitItem = (function (_super) {
        __extends(ZorkBossMainPopHitItem, _super);
        function ZorkBossMainPopHitItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/zork/ZorkBossMainPopHitItemSkin.exml";
            return _this;
        }
        ZorkBossMainPopHitItem.prototype.dataChanged = function () {
            var info = this.data.info;
            var blood = this.data.hp;
            this.lbName.text = info.baseInfo.name;
            this.lbRank.text = info.rank;
            // toFixed
            var propres = info.value / blood * 100;
            var persent = propres.toFixed(2) + "%";
            // let persent = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, info.value / blood * 100)
            // this.lbHit.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.perDemage, info.value, persent);
            this.lbHit.text = info.value + " (" + persent + ")";
        };
        return ZorkBossMainPopHitItem;
    }(eui.ItemRenderer));
    zj.ZorkBossMainPopHitItem = ZorkBossMainPopHitItem;
    __reflect(ZorkBossMainPopHitItem.prototype, "zj.ZorkBossMainPopHitItem");
})(zj || (zj = {}));
//# sourceMappingURL=ZorkBossMainPopHitItem.js.map