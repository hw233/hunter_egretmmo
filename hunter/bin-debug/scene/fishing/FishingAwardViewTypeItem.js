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
    //FishingAwardViewTypeItem
    //yuqingchao
    //2019.05.15
    var FishingAwardViewTypeItem = (function (_super) {
        __extends(FishingAwardViewTypeItem, _super);
        function FishingAwardViewTypeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fishing/FishingAwardViewTypeItemSkin.exml";
            zj.cachekeys(zj.UIResource["FishingAwardViewTypeItem"], null);
            return _this;
        }
        FishingAwardViewTypeItem.prototype.dataChanged = function () {
            var info = this.data.info;
            var index = this.data.id;
            this.imgFish.source = zj.cachekey(info.fish_image, this);
            this.imgTitle.source = zj.cachekey(info.image_title, this);
            this.imgFrame.visible = this.selected;
        };
        return FishingAwardViewTypeItem;
    }(eui.ItemRenderer));
    zj.FishingAwardViewTypeItem = FishingAwardViewTypeItem;
    __reflect(FishingAwardViewTypeItem.prototype, "zj.FishingAwardViewTypeItem");
})(zj || (zj = {}));
//# sourceMappingURL=FishingAwardViewTypeItem.js.map