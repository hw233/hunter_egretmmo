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
     *
     *  2019-5-29
     * @class 贪婪之岛 阵容  详情 Item
     */
    var Wonderland_PropertyViewItem = (function (_super) {
        __extends(Wonderland_PropertyViewItem, _super);
        function Wonderland_PropertyViewItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/Wonderland_PropertyViewItemSkin.exml";
            return _this;
        }
        Wonderland_PropertyViewItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Wonderland_PropertyViewItem.prototype.updateView = function (data) {
            var attrName, attrNum, text;
            if (data.info.key <= Object.keys(zj.TextsConfig.TextsConfig_HeroMain.attr).length) {
                attrName = zj.TextsConfig.TextsConfig_HeroMain.attr[Number(data.info.key) + 1];
                attrNum = data.info.value;
                text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_DarkLand.allAddAttr, attrName, attrNum);
            }
            else {
                var key = data.info.key - 1000;
                text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_passive_des[key + 1], data.info.value);
            }
            this.labelTextServer.text = text;
            this.imgFloor.visible = (data.index + 1) % 2 == 1;
            this.imgFloor1.visible = (data.index + 1) % 2 == 0;
        };
        return Wonderland_PropertyViewItem;
    }(eui.ItemRenderer));
    zj.Wonderland_PropertyViewItem = Wonderland_PropertyViewItem;
    __reflect(Wonderland_PropertyViewItem.prototype, "zj.Wonderland_PropertyViewItem");
    var Wonderland_PropertyViewItemData = (function () {
        function Wonderland_PropertyViewItemData() {
        }
        return Wonderland_PropertyViewItemData;
    }());
    zj.Wonderland_PropertyViewItemData = Wonderland_PropertyViewItemData;
    __reflect(Wonderland_PropertyViewItemData.prototype, "zj.Wonderland_PropertyViewItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Wonderland_PropertyViewItem.js.map