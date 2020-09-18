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
     * @date 2018-12-3
     *
     * @class 列表部分基类，封装了长按事件
     *
     */
    var HunterBaseItem = (function (_super) {
        __extends(HunterBaseItem, _super);
        function HunterBaseItem() {
            var _this = _super.call(this) || this;
            _this.touchBeginTime = 0;
            _this.touchTimeInterval = 1000; // 长按间隔1秒
            /** 是否处于长按状态中 */
            _this.isInLongPress = false;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.isInLongPress = false;
                _this.touchBeginTime = egret.setTimeout(_this.onLongPress, _this, _this.touchTimeInterval, _this.data);
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, function () {
                egret.clearTimeout(_this.touchBeginTime);
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                egret.clearTimeout(_this.touchBeginTime);
            }, _this);
            return _this;
        }
        return HunterBaseItem;
    }(eui.ItemRenderer));
    zj.HunterBaseItem = HunterBaseItem;
    __reflect(HunterBaseItem.prototype, "zj.HunterBaseItem");
    /** 猎人列表数据基类 */
    var HunterBaseItemData = (function () {
        function HunterBaseItemData() {
            /** 是否是选中状态 */
            this.isSelected = false;
            /** 是否相应长按手势 */
            this.isLongPress = true;
        }
        return HunterBaseItemData;
    }());
    zj.HunterBaseItemData = HunterBaseItemData;
    __reflect(HunterBaseItemData.prototype, "zj.HunterBaseItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBaseItem.js.map