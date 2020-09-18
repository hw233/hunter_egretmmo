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
    //钻石商城双倍狂欢
    //yuqingchao
    //2019.03.23
    var ActivityDoublGemstone = (function (_super) {
        __extends(ActivityDoublGemstone, _super);
        function ActivityDoublGemstone() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityDoublGemstoneSkin.exml";
            _this.btnBuyGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuyGemstone, _this);
            zj.cachekeys(zj.UIResource["ActivityDoublGemstone"], null);
            return _this;
        }
        ActivityDoublGemstone.prototype.setInfo = function (info, father) {
            this.info = info;
            this.setInfoTime();
            this.lbInfo.text = zj.TextsConfig.TextsConfig_Activity.doubleDemDes;
        };
        //时间戳转换为字符串格式
        ActivityDoublGemstone.prototype.time = function (timestamp) {
            var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityDoublGemstone.prototype.setInfoTime = function () {
            var str = "";
            var wDay = zj.PlayerLeagueSystem.GetDay();
            var tim = Date.parse(zj.Game.Controller.serverNow().toString());
            var curTime = this.time(Date.parse(zj.Game.Controller.serverNow().toString()));
            if (wDay == 1 && (curTime.h * 3600 + curTime.m * 60 + curTime.s) < 4 * 3600) {
                var nextWeekStartTime = Date.parse(zj.Game.Controller.serverNow().toString()) - (curTime.h * 3600 + curTime.m * 60 + curTime.s) + 4 * 3600;
                var start_time = (nextWeekStartTime / 1000 - 7 * 86400) * 1000;
                var end_time = nextWeekStartTime - 1;
                var beginTimeC = this.time(start_time);
                var timeOpen = beginTimeC.Y + "." + beginTimeC.M + "." + beginTimeC.D + "  " + "4:00";
                var endTimec = this.time(end_time);
                var timeColse = endTimec.Y + "." + endTimec.M + "-" + endTimec.D + "  " + "3:59";
                this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
            }
            else {
                var start_time = Date.parse(zj.Game.Controller.serverNow().toString()) - (curTime.h * 3600 + curTime.m * 60 + curTime.s + (wDay - 1) * 86400) + 4 * 3600;
                var end_time = start_time + 7 * 86400 - 1;
                var beginTimeC = this.time(start_time);
                var timeOpen = beginTimeC.Y + "." + beginTimeC.M + "." + beginTimeC.D + "  " + "4:00";
                var endTimec = this.time(end_time);
                var timeColse = endTimec.Y + "." + endTimec.M + "-" + endTimec.D + "  " + "3:59";
                this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
            }
        };
        ActivityDoublGemstone.prototype.onBtnBuyGemstone = function () {
            setTimeout(function () {
                zj.loadUI(zj.PayMallScene)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    dialog.init();
                });
            }, 500);
        };
        return ActivityDoublGemstone;
    }(zj.UI));
    zj.ActivityDoublGemstone = ActivityDoublGemstone;
    __reflect(ActivityDoublGemstone.prototype, "zj.ActivityDoublGemstone");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityDoublGemstone.js.map