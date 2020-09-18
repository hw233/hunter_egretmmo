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
    //RelicFinaChest (遗迹探索)结算宝箱
    //hexiaowei
    // 2019/03/12
    var RelicFinaChest = (function (_super) {
        __extends(RelicFinaChest, _super);
        function RelicFinaChest() {
            var _this = _super.call(this) || this;
            _this.selectedIndex = 0;
            _this.skinName = "resource/skins/darkLand/RelicFinaChestSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            return _this;
        }
        RelicFinaChest.prototype.Init = function (open_chest, cb) {
            this.openchest = open_chest;
            this.cb = cb;
            this.setInfoList();
        };
        RelicFinaChest.prototype.setInfoList = function () {
            this.listTableView.selectedIndex = 0; // 默认选中
            this.listTableView.itemRenderer = zj.RelicFinaChestItem; //
            this.selectedItem = new eui.ArrayCollection();
            for (var k in this.openchest) {
                var v = this.openchest[k];
                var data = new zj.RelicFinaChestItemData();
                data.father = this;
                data.chest = v;
                this.selectedItem.addItem(data);
            }
            this.listTableView.dataProvider = this.selectedItem;
            this.selectedIndex = this.listTableView.selectedIndex;
        };
        RelicFinaChest.prototype.onButtonClose = function () {
            if (this.cb != null) {
                this.cb();
            }
            this.close();
        };
        return RelicFinaChest;
    }(zj.Dialog));
    zj.RelicFinaChest = RelicFinaChest;
    __reflect(RelicFinaChest.prototype, "zj.RelicFinaChest");
})(zj || (zj = {}));
//# sourceMappingURL=RelicFinaChest.js.map