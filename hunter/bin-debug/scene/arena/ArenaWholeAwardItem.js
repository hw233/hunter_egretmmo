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
     * @author
     *
     * @date 2019-1-28
     *
     * @class 跨服奖励list界面
     */
    var ArenaWholeAwardItem = (function (_super) {
        __extends(ArenaWholeAwardItem, _super);
        function ArenaWholeAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaWholeAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaWholeAwardItem"], null);
            _this.init();
            return _this;
        }
        ArenaWholeAwardItem.prototype.init = function () {
        };
        ArenaWholeAwardItem.prototype.dataChanged = function () {
            var data = this.data;
            if (data == null)
                return;
            this.imgGradeIcon.source = zj.cachekey(data.info.logo, this);
            this.imgGradeName.source = zj.cachekey(data.info.icon, this);
            this.labelJiFen.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.show_jifen, data.info.min);
            var array = new eui.ArrayCollection();
            for (var i = 0; i < data.info.good.length; i++) {
                var data1 = new zj.ArenaWholeAwardItemItemData();
                data1.info = data.info.good[i];
                data1.father = this;
                data.index = i;
                array.addItem(data1);
            }
            this.listAward.dataProvider = array;
            this.listAward.itemRenderer = zj.ArenaWholeAwardItemItem;
        };
        return ArenaWholeAwardItem;
    }(eui.ItemRenderer));
    zj.ArenaWholeAwardItem = ArenaWholeAwardItem;
    __reflect(ArenaWholeAwardItem.prototype, "zj.ArenaWholeAwardItem");
    var ArenaWholeAwardItemData = (function () {
        function ArenaWholeAwardItemData() {
        }
        return ArenaWholeAwardItemData;
    }());
    zj.ArenaWholeAwardItemData = ArenaWholeAwardItemData;
    __reflect(ArenaWholeAwardItemData.prototype, "zj.ArenaWholeAwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholeAwardItem.js.map