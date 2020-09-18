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
    // HXH_MoraMainAwardItem
    // 2019.05.24
    var MoraMainAwardItem = (function (_super) {
        __extends(MoraMainAwardItem, _super);
        function MoraMainAwardItem() {
            var _this = _super.call(this) || this;
            _this.id = 0;
            _this.reward = [];
            _this.skinName = "resource/skins/fishing/MoraMainAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["MoraMainAwardItem"], null);
            _this.reward = zj.PlayerZorkSystem.RunesAllGoods();
            return _this;
        }
        MoraMainAwardItem.prototype.dataChanged = function () {
            this.father = this.data.father;
            this.id = this.data.index;
            this.SetInfoList(this.data.info);
        };
        MoraMainAwardItem.prototype.SetInfoList = function (info) {
            zj.closeCache(this.groupCache);
            var star_num = zj.CommonConfig.gain_runes_number + 1 - this.id;
            this.labelTextName.text = info.name;
            this.labelTextDes.text = info.des;
            zj.setCache(this.groupCache);
            this.SetInfoReward(this.reward[this.id]);
        };
        MoraMainAwardItem.prototype.SetInfoReward = function (goods) {
            this.listViewTable.itemRenderer = zj.MoraMainAwardItemItem;
            this.listMyItem = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                var data = new zj.MoraMainAwardItemItemData();
                data.father = this;
                data.good = goods[i];
                data.index = i + 1;
                this.listMyItem.addItem(data);
            }
            this.listViewTable.dataProvider = this.listMyItem;
        };
        return MoraMainAwardItem;
    }(eui.ItemRenderer));
    zj.MoraMainAwardItem = MoraMainAwardItem;
    __reflect(MoraMainAwardItem.prototype, "zj.MoraMainAwardItem");
    var MoraMainAwardItemData = (function () {
        function MoraMainAwardItemData() {
        }
        return MoraMainAwardItemData;
    }());
    zj.MoraMainAwardItemData = MoraMainAwardItemData;
    __reflect(MoraMainAwardItemData.prototype, "zj.MoraMainAwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=MoraMainAwardItem.js.map