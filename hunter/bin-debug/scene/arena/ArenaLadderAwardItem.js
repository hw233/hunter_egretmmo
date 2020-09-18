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
     * @author xing li wei
     *
     * @date 2019-1-25
     *
     * @class 奖励说明list界面
     */
    var ArenaLadderAwardItem = (function (_super) {
        __extends(ArenaLadderAwardItem, _super);
        function ArenaLadderAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemSkin1.exml";
            zj.cachekeys(zj.UIResource["ArenaLadderAwardItem"], null);
            return _this;
        }
        ArenaLadderAwardItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            var data1 = this.data;
            var min = data1.info.rank_min;
            var max = data1.info.rank_max;
            if (min == max - 1) {
                this.lbRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank_interval[1], max);
            }
            else {
                this.lbRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank_interval[2], min + 1, max);
            }
            var array = new eui.ArrayCollection();
            for (var i = 0; i < data1.info.reward_goods.length; i++) {
                var data = new zj.ArenaLadderAwardItemBData();
                data.goodsId = data1.info.reward_goods[i];
                data.count = data1.info.reward_count[i];
                data.index = i;
                data.father = this;
                array.addItem(data);
            }
            this.lstItem0.dataProvider = array;
            this.lstItem0.itemRenderer = zj.ArenaLadderAwardItemB;
            zj.setCache(this.groupCache);
        };
        return ArenaLadderAwardItem;
    }(eui.ItemRenderer));
    zj.ArenaLadderAwardItem = ArenaLadderAwardItem;
    __reflect(ArenaLadderAwardItem.prototype, "zj.ArenaLadderAwardItem");
    var ArenaLadderAwardItemData = (function () {
        function ArenaLadderAwardItemData() {
        }
        return ArenaLadderAwardItemData;
    }());
    zj.ArenaLadderAwardItemData = ArenaLadderAwardItemData;
    __reflect(ArenaLadderAwardItemData.prototype, "zj.ArenaLadderAwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaLadderAwardItem.js.map