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
     * @class 奖励说明list的List子项
     */
    var ArenaWholeAwardItemB = (function (_super) {
        __extends(ArenaWholeAwardItemB, _super);
        function ArenaWholeAwardItemB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaWholeAwardItemBSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaWholeAwardItemB"], null);
            return _this;
        }
        ArenaWholeAwardItemB.prototype.dataChanged = function () {
            var data = this.data;
            if (data.info.min == data.info.max) {
                this.labelRankNumber.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank_interval[1], data.info.min);
            }
            else {
                this.labelRankNumber.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.rank_interval[2], data.info.min, data.info.max);
            }
            var canMove = data.info.good.length > 5;
            var array = new eui.ArrayCollection();
            for (var i = 0; i < data.info.good.length; i++) {
                var data1 = new zj.ArenaWholeAwardItemItemData();
                data1.father = this;
                data1.info = data.info.good[i];
                data.index = i;
                array.addItem(data1);
            }
            this.listAward.dataProvider = array;
            this.listAward.itemRenderer = zj.ArenaWholeAwardItemItem;
        };
        return ArenaWholeAwardItemB;
    }(eui.ItemRenderer));
    zj.ArenaWholeAwardItemB = ArenaWholeAwardItemB;
    __reflect(ArenaWholeAwardItemB.prototype, "zj.ArenaWholeAwardItemB");
    var ArenaWholeAwardItemBData = (function () {
        function ArenaWholeAwardItemBData() {
        }
        return ArenaWholeAwardItemBData;
    }());
    zj.ArenaWholeAwardItemBData = ArenaWholeAwardItemBData;
    __reflect(ArenaWholeAwardItemBData.prototype, "zj.ArenaWholeAwardItemBData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeAwardItemB.js.map