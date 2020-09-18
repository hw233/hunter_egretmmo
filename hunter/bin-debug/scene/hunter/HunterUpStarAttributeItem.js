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
     * @date 2018-12-11
     *
     * @class 猎人升星界面显示内容
     */
    var HunterUpStarAttributeItem = (function (_super) {
        __extends(HunterUpStarAttributeItem, _super);
        function HunterUpStarAttributeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterUpStarAttributeItemSkin.exml";
            return _this;
        }
        /**
         * 设置基本信息
         *
         * @param name 属性
         * @param value 当前值
         * @param nextValue 下一级别的值
         */
        HunterUpStarAttributeItem.prototype.setInfo = function (name, value, nextValue) {
            this.labelName.text = name;
            this.labelValue.text = value;
            this.labelValueRight.text = nextValue;
        };
        return HunterUpStarAttributeItem;
    }(zj.UI));
    zj.HunterUpStarAttributeItem = HunterUpStarAttributeItem;
    __reflect(HunterUpStarAttributeItem.prototype, "zj.HunterUpStarAttributeItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterUpStarAttributeItem.js.map