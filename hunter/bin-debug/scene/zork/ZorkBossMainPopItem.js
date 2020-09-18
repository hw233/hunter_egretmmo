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
    //贪婪之岛-寿富拉比-伤害奖励列表Item
    //yuqingchao
    //2019.03.15
    var ZorkBossMainPopItem = (function (_super) {
        __extends(ZorkBossMainPopItem, _super);
        function ZorkBossMainPopItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/zork/ZorkBossMainPopItemSkin.exml";
            return _this;
        }
        ZorkBossMainPopItem.prototype.dataChanged = function () {
            this.info = this.data.info;
            this.boold = this.data.boold;
            var father = this.data.father;
            if (this.boold) {
                if (this.info[0] == this.info[1]) {
                    this.lbRank.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank1, this.info[0]);
                }
                else {
                    this.lbRank.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank2, this.info[0], this.info[1]);
                }
            }
            else {
                this.lbRank.text = zj.TextsConfig.TextsConfig_WonderlandBoss.killer;
            }
            this.setList();
        };
        ZorkBossMainPopItem.prototype.setList = function () {
            if (this.boold) {
                if (this.info[2].length <= 4) { }
                this.arrayCollection1 = new eui.ArrayCollection();
                for (var i = 0; i < this.info[2].length; i++) {
                    this.arrayCollection1.addItem({
                        i: i,
                        info: this.info[2][i],
                        boold: this.boold,
                        father: this.data.father
                    });
                }
                this.lstItem.itemRenderer = zj.ZorkBossMainAwardItem;
                this.lstItem.dataProvider = this.arrayCollection1;
            }
            else {
                this.arrayCollection1 = new eui.ArrayCollection();
                for (var i = 0; i < this.info.length; i++) {
                    this.arrayCollection1.addItem({
                        i: i,
                        info: this.info[i],
                        boold: this.boold,
                        father: this.data.father
                    });
                }
                this.lstItem.itemRenderer = zj.ZorkBossMainAwardItem;
                this.lstItem.dataProvider = this.arrayCollection1;
            }
        };
        return ZorkBossMainPopItem;
    }(eui.ItemRenderer));
    zj.ZorkBossMainPopItem = ZorkBossMainPopItem;
    __reflect(ZorkBossMainPopItem.prototype, "zj.ZorkBossMainPopItem");
})(zj || (zj = {}));
//# sourceMappingURL=ZorkBossMainPopItem.js.map