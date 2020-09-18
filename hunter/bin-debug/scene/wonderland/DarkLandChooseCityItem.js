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
     * @author xingliwei
     *
     * @date 2019-6-14
     *
     * @class 贪婪之岛港口线路list子项
     */
    var DarkLandChooseCityItem = (function (_super) {
        __extends(DarkLandChooseCityItem, _super);
        function DarkLandChooseCityItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/DarkLandChooseCityItemSkin.exml";
            return _this;
        }
        DarkLandChooseCityItem.prototype.dataChanged = function () {
            var data = this.data;
            var str = "S" + zj.singLecraft.decodeGroupName(data.info, "&", false) + " " + zj.singLecraft.decodeGroupName(data.info, "&", true);
            this.labelServer.text = str;
        };
        return DarkLandChooseCityItem;
    }(eui.ItemRenderer));
    zj.DarkLandChooseCityItem = DarkLandChooseCityItem;
    __reflect(DarkLandChooseCityItem.prototype, "zj.DarkLandChooseCityItem");
    var DarkLandChooseCityItemData = (function () {
        function DarkLandChooseCityItemData() {
        }
        return DarkLandChooseCityItemData;
    }());
    zj.DarkLandChooseCityItemData = DarkLandChooseCityItemData;
    __reflect(DarkLandChooseCityItemData.prototype, "zj.DarkLandChooseCityItemData");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLandChooseCityItem.js.map