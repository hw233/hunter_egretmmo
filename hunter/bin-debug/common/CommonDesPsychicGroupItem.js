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
     * @time 2019-7-30
     *
     * @class 猎人念力组合效果长按详情界面list子项
     */
    var CommonDesPsychicGroupItem = (function (_super) {
        __extends(CommonDesPsychicGroupItem, _super);
        function CommonDesPsychicGroupItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonDesPsychicGroupItemSkin.exml";
            return _this;
        }
        CommonDesPsychicGroupItem.prototype.dataChanged = function () {
            var data = this.data;
            this.labelPropertyChange.textFlow = zj.Util.RichText(data.describeStr);
            if (!data.bGetEffect) {
                this.labelPropertyChange.alpha = 0.8;
            }
            else {
                this.labelPropertyChange.alpha = 1;
            }
        };
        return CommonDesPsychicGroupItem;
    }(eui.ItemRenderer));
    zj.CommonDesPsychicGroupItem = CommonDesPsychicGroupItem;
    __reflect(CommonDesPsychicGroupItem.prototype, "zj.CommonDesPsychicGroupItem");
    var CommonDesPsychicGroupItemData = (function () {
        function CommonDesPsychicGroupItemData() {
        }
        return CommonDesPsychicGroupItemData;
    }());
    zj.CommonDesPsychicGroupItemData = CommonDesPsychicGroupItemData;
    __reflect(CommonDesPsychicGroupItemData.prototype, "zj.CommonDesPsychicGroupItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CommonDesPsychicGroupItem.js.map