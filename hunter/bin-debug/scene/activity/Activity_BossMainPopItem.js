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
    //Activity_BossMainPopItem
    //yuqingchao
    // 2019.07.16
    var Activity_BossMainPopItem = (function (_super) {
        __extends(Activity_BossMainPopItem, _super);
        function Activity_BossMainPopItem() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.info = null;
            _this.num = 0;
            _this.skinName = "resource/skins/activity/Activity_BossMainPopItemSkin.exml";
            return _this;
        }
        Activity_BossMainPopItem.prototype.dataChanged = function () {
            this.index = this.data.i;
            this.info = this.data.info;
            this.num = this.data.lth;
            if (this.info.rankZone[1] - this.info.rankZone[0] == 1) {
                this.lbRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank1, this.info.rankZone[1]);
            }
            else if (this.index == this.num) {
                this.lbRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank3, this.info.rankZone[0]);
            }
            else {
                this.lbRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank2, this.info.rankZone[0] + 1, this.info.rankZone[1]);
            }
            this.SetList();
        };
        Activity_BossMainPopItem.prototype.SetList = function () {
            if (this.info.goodsInfo.length <= 4) {
                this.scrollerReward.scrollPolicyH = "off";
            }
            this.arrReward = new eui.ArrayCollection();
            for (var i = 0; i < this.info.goodsInfo.length; i++) {
                this.arrReward.addItem({
                    info: this.info.goodsInfo[i],
                    boold: false,
                });
            }
            this.lstViewReward.dataProvider = this.arrReward;
            this.lstViewReward.itemRenderer = zj.ZorkBossMainAwardItem;
        };
        return Activity_BossMainPopItem;
    }(eui.ItemRenderer));
    zj.Activity_BossMainPopItem = Activity_BossMainPopItem;
    __reflect(Activity_BossMainPopItem.prototype, "zj.Activity_BossMainPopItem");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_BossMainPopItem.js.map