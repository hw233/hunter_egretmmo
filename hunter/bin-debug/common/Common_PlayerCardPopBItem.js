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
     * @author wang  shen  zhuo
     *
     * @date 2019-1-3
     */
    var Common_PlayerCardPopBItem = (function (_super) {
        __extends(Common_PlayerCardPopBItem, _super);
        function Common_PlayerCardPopBItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/Common_PlayerCardPopBItemSkin.exml";
            zj.cachekeys(zj.UIResource["Common_PlayerCardPopBItem"], null);
            return _this;
            // this.groupAttri
        }
        Common_PlayerCardPopBItem.prototype.dataChanged = function () {
            // this.groupAttri
            this.updateView(this.data);
            this.width = this.data.width;
        };
        Common_PlayerCardPopBItem.prototype.updateView = function (data) {
            this.labelAttri;
            this.labelAttri.textFlow = zj.Util.RichText(data.description);
            var color = zj.Helper.RGBToHex("r:30,g:30,b:30");
            if (data.cardInfo.star == 6) {
                color = zj.Helper.RGBToHex("r:120,g:120,b:120");
            }
            this.labelAttri.textColor = color;
            // this.imageAttri.y = data.index
        };
        return Common_PlayerCardPopBItem;
    }(eui.ItemRenderer));
    zj.Common_PlayerCardPopBItem = Common_PlayerCardPopBItem;
    __reflect(Common_PlayerCardPopBItem.prototype, "zj.Common_PlayerCardPopBItem");
    var Common_PlayerCardPopBItemData = (function () {
        function Common_PlayerCardPopBItemData() {
        }
        return Common_PlayerCardPopBItemData;
    }());
    zj.Common_PlayerCardPopBItemData = Common_PlayerCardPopBItemData;
    __reflect(Common_PlayerCardPopBItemData.prototype, "zj.Common_PlayerCardPopBItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Common_PlayerCardPopBItem.js.map