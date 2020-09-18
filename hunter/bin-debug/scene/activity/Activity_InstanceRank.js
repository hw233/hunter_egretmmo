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
     * @class 随机副本
     *
     * @author LianLei
     *
     * @date 2020-01-08
     */
    var Activity_InstanceRank = (function (_super) {
        __extends(Activity_InstanceRank, _super);
        function Activity_InstanceRank() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_InstanceRankSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_redPackage"], null);
            return _this;
        }
        Activity_InstanceRank.prototype.setInfo = function (info, father) {
            this.info = info;
            this.setInfoText();
        };
        Activity_InstanceRank.prototype.getActivityTime = function (sec) {
            var time = sec;
            if (time == null || time == undefined)
                return;
            var date = new Date(time * 1000);
            return zj.Helper.StringFormat("%s-%s-%s  %s:%s", date.getFullYear(), date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : date.getMonth() + 1, date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate(), date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours(), date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes());
        };
        Activity_InstanceRank.prototype.setInfoText = function () {
            var dateStart = this.getActivityTime(this.info.openTime);
            var dateClose = this.getActivityTime(this.info.closeTime);
            this.labelTime.text = dateStart + " 至 " + dateClose;
            this.labelDes.text = this.info.des;
        };
        return Activity_InstanceRank;
    }(zj.UI));
    zj.Activity_InstanceRank = Activity_InstanceRank;
    __reflect(Activity_InstanceRank.prototype, "zj.Activity_InstanceRank");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_InstanceRank.js.map