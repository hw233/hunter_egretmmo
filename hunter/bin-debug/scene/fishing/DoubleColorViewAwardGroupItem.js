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
    //DoubleColorViewAwardGroupItem
    //yuqingchao
    //2019.05.29
    var DoubleColorViewAwardGroupItem = (function (_super) {
        __extends(DoubleColorViewAwardGroupItem, _super);
        function DoubleColorViewAwardGroupItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/DoubleColorViewAwardGroupItemSkin.exml";
            return _this;
            // cachekeys(<string[]>UIResource["DoubleColorViewAwardGroupItem"], null);
        }
        DoubleColorViewAwardGroupItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupAll);
            var num = this.data.num;
            this.groupClose.visible = num != 0;
            this.imgAdd.visible = num == 0;
            if (num != 0) {
                this.imgFrame.visible = true;
                this.imgFrame.scaleX = this.imgFrame.scaleY = 0.4;
                this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[num - 1], this);
            }
            zj.setCache(this.groupAll);
        };
        return DoubleColorViewAwardGroupItem;
    }(eui.ItemRenderer));
    zj.DoubleColorViewAwardGroupItem = DoubleColorViewAwardGroupItem;
    __reflect(DoubleColorViewAwardGroupItem.prototype, "zj.DoubleColorViewAwardGroupItem");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorViewAwardGroupItem.js.map