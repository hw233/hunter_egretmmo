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
    //DoubleColorViewAwardItem
    //yuqingchao
    //2019.05.28
    var DoubleColorViewAwardItem = (function (_super) {
        __extends(DoubleColorViewAwardItem, _super);
        function DoubleColorViewAwardItem() {
            var _this = _super.call(this) || this;
            _this.id = 0;
            _this.skinName = "resource/skins/fishing/DoubleColorViewAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["DoubleColorViewAwardItem"], null);
            return _this;
        }
        DoubleColorViewAwardItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            this.imgRank.visible = true;
            this.info = this.data.info;
            this.id = this.data.i;
            this.imgRank.source = zj.cachekey(this.info.pic, this);
            var double = this.id != 0 && this.id != 4;
            this.groupDouble.visible = double;
            this.lstFirst.visible = !double;
            this.setInfo(double);
            zj.setCache(this.groupCache);
        };
        DoubleColorViewAwardItem.prototype.setInfo = function (double) {
            var num = this.info.all_balls;
            this.imgOr.visible = double;
            var list_a = [];
            var list_b = [];
            var list = [];
            if (double) {
                for (var i = 1; i <= num + 1; i++) {
                    if (i < num) {
                        list_a.push(2);
                    }
                    else if (i == num) {
                        list_a.push(0);
                    }
                    else if (i == num + 1) {
                        list_a.push(1);
                    }
                }
                for (var i = 1; i <= num + 1; i++) {
                    list_b.push(2);
                }
            }
            else {
                for (var i = 1; i <= num + 1; i++) {
                    if (i < num) {
                        list.push(2);
                    }
                    else if (i == num && num != 1) {
                        list.push(0);
                    }
                    else if (i == num + 1) {
                        list.push(1);
                    }
                }
            }
            this.lstaArr = new eui.ArrayCollection();
            for (var i = 0; i < list_a.length; i++) {
                this.lstaArr.addItem({
                    num: list_a[i]
                });
            }
            this.lstA.dataProvider = this.lstaArr;
            this.lstA.itemRenderer = zj.DoubleColorViewAwardGroupItem;
            this.lstbArr = new eui.ArrayCollection;
            for (var i = 0; i < list_b.length; i++) {
                this.lstbArr.addItem({
                    num: list_b[i]
                });
            }
            this.lstB.dataProvider = this.lstbArr;
            this.lstB.itemRenderer = zj.DoubleColorViewAwardGroupItem;
            this.lstFirstArr = new eui.ArrayCollection();
            for (var i = 0; i < list.length; i++) {
                this.lstFirstArr.addItem({
                    num: list[i]
                });
            }
            this.lstFirst.dataProvider = this.lstFirstArr;
            this.lstFirst.itemRenderer = zj.DoubleColorViewAwardGroupItem;
            var goods = [];
            for (var k in this.info.reward_goods) {
                var v = this.info.reward_goods[k];
                var good = new message.GoodsInfo();
                good.goodsId = v;
                good.count = this.info.reward_count[k];
                goods.push(good);
            }
            this.awardArr = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                this.awardArr.addItem({
                    info: goods[i],
                });
            }
            this.lstAward.dataProvider = this.awardArr;
            this.lstAward.itemRenderer = zj.DoubleColorViewAwardAwardItem;
        };
        return DoubleColorViewAwardItem;
    }(eui.ItemRenderer));
    zj.DoubleColorViewAwardItem = DoubleColorViewAwardItem;
    __reflect(DoubleColorViewAwardItem.prototype, "zj.DoubleColorViewAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorViewAwardItem.js.map