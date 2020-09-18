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
     * @class 遗迹猎人特训
     */
    var ActivityWeekMission = (function (_super) {
        __extends(ActivityWeekMission, _super);
        function ActivityWeekMission() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityWeekMissionSkin.exml";
            return _this;
        }
        ActivityWeekMission.prototype.SetType = function (index) {
            this.SpriteTitleGift.visible = false;
            this.ButtonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClose, this);
            this.ButtonGetFree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnGetFree, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            _super.prototype.SetType.call(this, index);
        };
        return ActivityWeekMission;
    }(zj.weekActBase));
    zj.ActivityWeekMission = ActivityWeekMission;
    __reflect(ActivityWeekMission.prototype, "zj.ActivityWeekMission");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityWeekMission.js.map