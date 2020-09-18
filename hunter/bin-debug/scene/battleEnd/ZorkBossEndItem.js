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
     * @class 贪婪之岛世界Boos结算子项
     */
    var ZorkBossEndItem = (function (_super) {
        __extends(ZorkBossEndItem, _super);
        function ZorkBossEndItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battleEnd/ZorkBossEndItemSkin.exml";
            _this.imgPer.mask = _this.imgPerBg;
            return _this;
        }
        ZorkBossEndItem.prototype.dataChanged = function () {
            var data = this.data;
            this.labelHeroName.text = (data.info.baseInfo.name);
            this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank, data.info.rank);
            this.imgHeroIcon.source = zj.PlayerItemSystem.ItemPath(data.info.baseInfo.picId);
            this.imgHeroFrame.source = zj.PlayerItemSystem.ItemPath(data.info.baseInfo.picFrameId);
            this.labelHeroMyAtk.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.role_level, data.info.baseInfo.level);
            var percent = data.info.value / data.blood * 100;
            if (percent >= 100) {
                percent = 100;
            }
            this.imgPerBg.width = percent * this.imgPer.width / 100;
            this.labelPer.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.perDemage, zj.Set.NumberUnit4(data.info.value), percent.toFixed(2));
        };
        return ZorkBossEndItem;
    }(eui.ItemRenderer));
    zj.ZorkBossEndItem = ZorkBossEndItem;
    __reflect(ZorkBossEndItem.prototype, "zj.ZorkBossEndItem");
    var ZorkBossEndItemData = (function () {
        function ZorkBossEndItemData() {
        }
        return ZorkBossEndItemData;
    }());
    zj.ZorkBossEndItemData = ZorkBossEndItemData;
    __reflect(ZorkBossEndItemData.prototype, "zj.ZorkBossEndItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ZorkBossEndItem.js.map