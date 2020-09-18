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
    //ActivityXuyuanAwardItem
    //yuqingchao
    //2019.05.07
    var ActivityXuyuanAwardItem = (function (_super) {
        __extends(ActivityXuyuanAwardItem, _super);
        function ActivityXuyuanAwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityXuyuanAwardItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityXuyuanAwardItem"], null);
            return _this;
        }
        ActivityXuyuanAwardItem.prototype.dataChanged = function () {
            var i = this.data.i;
            var info = this.data.info;
            var pic = this.data.pic;
            var height = this.data.height;
            var cellHight = this.data.cellHight;
            this.height = height;
            this.imgFloor.height = height;
            this.scrollerView.height = height - 10;
            this.imgPic.source = zj.cachekey(pic[0], this);
            this.imgFloor.source = zj.cachekey(pic[1], this);
            var goodsMap = [];
            for (var i_1 = 0; i_1 < info.length; i_1++) {
                var goods = new message.GoodsInfo();
                goods.goodsId = info[i_1];
                goods.showType = zj.PlayerItemSystem.ItemQuality(goods.goodsId) >= 5 && 1 || 0;
                goodsMap.push(goods);
            }
            this.arrayCollection = new eui.ArrayCollection();
            for (var i_2 = 0; i_2 < goodsMap.length; i_2++) {
                this.arrayCollection.addItem({
                    i: i_2,
                    info: goodsMap[i_2],
                    bln: false,
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.ActivityXuyuanAwardItemB;
        };
        return ActivityXuyuanAwardItem;
    }(eui.ItemRenderer));
    zj.ActivityXuyuanAwardItem = ActivityXuyuanAwardItem;
    __reflect(ActivityXuyuanAwardItem.prototype, "zj.ActivityXuyuanAwardItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityXuyuanAwardItem.js.map