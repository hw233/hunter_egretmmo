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
     * @author xing li wei
     *
     * @date 2019-5-6
     *
     * @class 美食猎人特训
     */
    var ActivityWeekMissionOne = (function (_super) {
        __extends(ActivityWeekMissionOne, _super);
        function ActivityWeekMissionOne() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityWeekMissionOneSkin.exml";
            return _this;
        }
        ActivityWeekMissionOne.prototype.init = function () {
            // super.SetType();
        };
        ActivityWeekMissionOne.prototype.SetType = function (index) {
            this.SpriteTitleGift.visible = false;
            this.ButtonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClose, this);
            this.ButtonGetFree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGetFree, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            _super.prototype.SetType.call(this, index);
        };
        return ActivityWeekMissionOne;
    }(zj.weekActBase));
    zj.ActivityWeekMissionOne = ActivityWeekMissionOne;
    __reflect(ActivityWeekMissionOne.prototype, "zj.ActivityWeekMissionOne");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityWeekMissionOne.js.map