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
     * 聊天界面时间戳
     */
    var Chat_Time = (function (_super) {
        __extends(Chat_Time, _super);
        function Chat_Time(time, dataCur) {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/chat/Chat_TimeSkin.exml";
            var data = new Date(time * 1000);
            var year = data.getFullYear();
            var month = data.getMonth() + 1;
            var date = data.getDate();
            var hour = data.getHours();
            var minute = data.getMinutes(); // 分钟
            var curryear = dataCur.getFullYear();
            var currmonth = dataCur.getMonth() + 1;
            var currdate = dataCur.getDate();
            if (dataCur.getTime() > data.getTime() && dataCur.getTime() - data.getTime() < 24 * 60 * 60 * 1000) {
                if (date == currdate) {
                    _this.setCurrDate(hour, minute);
                }
                else {
                    _this.setTimeYesterday(hour, minute);
                }
            }
            else {
                _this.setTimeAll(year, month, date, hour, minute);
            }
            return _this;
        }
        Chat_Time.prototype.setTimeAll = function (year, month, date, hour, minute) {
            var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Time.timeStr, year, month, date)
                + " " + this.getTime(hour, minute);
            this.lbTime.text = str;
        };
        Chat_Time.prototype.setTimeYesterday = function (hour, minute) {
            this.lbTime.text = zj.TextsConfig.TextsConfig_Time.yesterday + " " + this.getTime(hour, minute);
        };
        Chat_Time.prototype.setCurrDate = function (hour, minute) {
            this.lbTime.text = this.getTime(hour, minute);
        };
        Chat_Time.prototype.getTime = function (hour, minute) {
            return (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute);
        };
        return Chat_Time;
    }(zj.UI));
    zj.Chat_Time = Chat_Time;
    __reflect(Chat_Time.prototype, "zj.Chat_Time");
})(zj || (zj = {}));
//# sourceMappingURL=Chat_Time.js.map