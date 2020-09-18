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
     * @author chen xi
     *
     * @date 2019-2-26
     *
     * @class 查看猎人详情-猎人信息子项
     */
    var HeroDetailMainItem = (function (_super) {
        __extends(HeroDetailMainItem, _super);
        function HeroDetailMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/HeroDetailMainItemSkin.exml";
            return _this;
        }
        HeroDetailMainItem.prototype.dataChanged = function () {
            var _a = this.data, name = _a[0], value = _a[1];
            this.labelName.text = name;
            this.labelValue.text = value;
        };
        return HeroDetailMainItem;
    }(eui.ItemRenderer));
    zj.HeroDetailMainItem = HeroDetailMainItem;
    __reflect(HeroDetailMainItem.prototype, "zj.HeroDetailMainItem");
})(zj || (zj = {}));
//# sourceMappingURL=HeroDetailMainItem.js.map