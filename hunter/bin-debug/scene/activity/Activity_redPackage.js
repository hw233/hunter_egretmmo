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
     * @class 红包活动(活动界面)
     *
     * @author LianLei
     *
     * @date 2020-01-08
     */
    var Activity_redPackage = (function (_super) {
        __extends(Activity_redPackage, _super);
        function Activity_redPackage() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_redWarsSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_redPackage"], null);
            return _this;
        }
        Activity_redPackage.prototype.setInfo = function (info, father) {
            this.info = info;
            this.setInfoText();
        };
        Activity_redPackage.prototype.getActivityTime = function (sec) {
            var time = sec;
            if (time == null || time == undefined)
                return;
            var date = new Date(time * 1000);
            return zj.Helper.StringFormat("%s.%s.%s  %s:%s", date.getFullYear(), date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1, date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate(), date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours(), date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes());
        };
        Activity_redPackage.prototype.setInfoText = function () {
            var dateStart = this.getActivityTime(this.info.openTime);
            var dateClose = this.getActivityTime(this.info.closeTime);
            this.labelTime.text = dateStart + " - " + dateClose;
            this.labelDes.text = this.info.des;
        };
        return Activity_redPackage;
    }(zj.UI));
    zj.Activity_redPackage = Activity_redPackage;
    __reflect(Activity_redPackage.prototype, "zj.Activity_redPackage");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_redPackage.js.map