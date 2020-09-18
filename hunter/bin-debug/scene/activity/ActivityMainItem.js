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
    //活动主界面左列表Item
    //yuqingchao
    //2019.03.23
    var ActivityMainItem = (function (_super) {
        __extends(ActivityMainItem, _super);
        function ActivityMainItem() {
            var _this = _super.call(this) || this;
            _this.str = "";
            _this.index = 0;
            _this.double = null;
            _this.skinName = "resource/skins/activity/ActivityMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityMainItem"], null);
            _this.imgIcon.visible = false;
            _this.imgTag.visible = true;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
            }, null);
            return _this;
        }
        ActivityMainItem.prototype.dataChanged = function () {
            this.imgTrue.visible = false;
            this.index = this.data.k;
            this.info = this.data.info;
            if (this.info == "double token") {
                this.dealDoubleTokenInfo();
                if (this.double) {
                    this.lbTime.textFlow = zj.Util.RichText(this.str);
                }
                else {
                    this.lbTime.text = this.str;
                    this.lbTime.textColor = this.color;
                }
                this.imgTrue.visible = this.selected;
            }
            else if (this.info == "gift bag") {
            }
            else {
                if (this.info.type == message.ActivityType.ACT_TYPE_COLLECT && this.info.bClient) {
                    this.lbName.text = zj.TextsConfig.TextsConfig_Activity.collectClientTitle;
                }
                else {
                    this.lbName.text = this.info.name;
                }
                this.getLoginTime(this.info.openTime, this.info.closeTime);
                this.lbTime.textColor = this.color;
                this.lbTime.text = this.str;
                this.imgTrue.visible = this.selected;
            }
            this.setInfoType();
            this.setinfoTip();
        };
        //钻石双倍
        ActivityMainItem.prototype.dealDoubleTokenInfo = function () {
            this.imgIcon.visible = false;
            this.lbName.text = zj.TextsConfig.TextsConfig_Activity.doubleTokenName;
            var curTime = this.time(Date.parse(zj.Game.Controller.serverNow().toString()) / 1000);
            var wDay = zj.PlayerLeagueSystem.GetDay();
            var start_time = null;
            var end_time = null;
            if (wDay == 1 && (curTime.h * 3600 + curTime.m * 60 + curTime.s) < 4 * 3600) {
                var nextWeekStartTime = Date.parse(zj.Game.Controller.serverNow().toString()) / 1000 - (curTime.h * 3600 + curTime.m * 60 + curTime.s) + 4 * 3600;
                start_time = nextWeekStartTime - 7 * 86400;
                end_time = start_time - 1;
            }
            else {
                start_time = Date.parse(zj.Game.Controller.serverNow().toString()) / 1000 - (curTime.h * 3600 + curTime.m * 60 + curTime.s + (wDay - 1) * 86400) + 4 * 3600;
                end_time = start_time + 7 * 86400 - 1;
            }
            this.getLoginTime(start_time, end_time);
        };
        //时间戳转换为字符串格式
        ActivityMainItem.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityMainItem.prototype.getLoginTime = function (open, close) {
            var time = Date.parse(zj.Game.Controller.serverNow().toString());
            var start = open - Date.parse(zj.Game.Controller.serverNow().toString()) / 1000;
            var stop = close - Date.parse(zj.Game.Controller.serverNow().toString()) / 1000;
            if (start > 0) {
                this.color = zj.ConstantConfig_Common.Color.red;
            }
            else {
                this.color = zj.ConstantConfig_Common.Color.green;
            }
            if (3600 * 24 < start) {
                this.str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.openDay, Math.floor(start / 3600 / 24));
                this.double = false;
            }
            else if (3600 < start && start <= 3600 * 24) {
                this.str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.openHour, Math.floor(start / 3600));
                this.double = false;
            }
            else if (60 < start && start <= 3600) {
                this.str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.openMin, Math.floor(start / 60));
                this.double = false;
            }
            else if (0 < start && start <= 60) {
                this.str = zj.TextsConfig.TextsConfig_Time.openNow;
                this.double = false;
            }
            else if (3600 * 24 < stop) {
                this.str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.closeDay, Math.floor(stop / 3600 / 24));
                this.double = false;
            }
            else if (3600 < stop && stop <= 3600 * 24) {
                this.str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.closeHour, Math.floor(stop / 3600));
                this.double = false;
            }
            else if (0 < stop && stop <= 3600) {
                this.str = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.closeMin, Math.floor(stop / 60));
                this.double = false;
            }
            else if (0 < stop && stop <= 60) {
                this.str = zj.TextsConfig.TextsConfig_Time.closeNow;
                this.double = false;
            }
            else if (start < 0 && stop <= 0) {
                this.str = zj.TextsConfig.TextsConfig_Time.closed;
                this.double = true;
            }
        };
        ActivityMainItem.prototype.setInfoType = function () {
            this.imgLogo.visible = false;
            if (this.info.noticeType == 1) {
                if (this.info.openTime > Date.parse(zj.Game.Controller.serverNow().toString()) / 1000) {
                    this.imgLogo.visible = true;
                    this.imgLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.notice[0], this);
                }
                else if (this.info.closeTime < Date.parse(zj.Game.Controller.serverNow().toString()) / 1000) {
                    this.imgLogo.visible = true;
                    this.imgLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.notice[2], this);
                }
                else {
                    this.imgLogo.visible = false;
                }
            }
            else if (this.info.noticeType == 2 || this.info.noticeType == 3) {
                if (this.info.openTime > Date.parse(zj.Game.Controller.serverNow().toString()) / 1000) { }
                else if (this.info.openTime < Date.parse(zj.Game.Controller.serverNow().toString()) / 1000) {
                    this.imgLogo.visible = true;
                    this.imgLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.notice[2], this);
                }
                else {
                    this.imgLogo.visible = true;
                    this.imgLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.notice[this.info.noticeType], this);
                }
            }
        };
        //设置红点
        ActivityMainItem.prototype.setinfoTip = function () {
            var a = this.info;
            var activity_index = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return a.index == v.index && a.type == v.type;
            })[1];
            if (activity_index == null) {
                if (this.index == 0) {
                    this.imgTip.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.AWARD, 1); //可签到，领奖
                }
                else {
                    if (this.info == "double token") {
                        //双倍钻石
                        var bTips = zj.Tips.tips_useTime_get(zj.Tips.SAVE.DOUBLE_TOKEN_ACTIVITY);
                        this.imgTip.visible = bTips;
                    }
                    else if (this.info == "gift bag") {
                    }
                }
            }
            else if (this.info.type == message.ActivityType.ACT_TYPE_COLLECT && this.info.bClient) {
                var tip_index = this.info.openTime;
                this.imgTip.visible = zj.Tips.tips_oneday_get(tip_index);
            }
            else {
                var any = activity_index;
                var info = zj.Game.PlayerActivitySystem.Activities[activity_index];
                //活动本身红点
                var bTips1 = zj.Tips.GetTipsOfActivity(info.type, info.index);
                //活动是否开启和点击
                var bTips2 = zj.Tips.tips_activity_get(info.type, info.index);
                //活动期间
                var timeNow = Date.parse(zj.Game.Controller.serverNow().toString()) / 1000;
                var bDuring = info.openTime < timeNow && info.closeTime > timeNow;
                var bTips = (bTips1 ? bTips1 : bTips2) && bDuring;
                this.imgTip.visible = bTips;
            }
        };
        return ActivityMainItem;
    }(eui.ItemRenderer));
    zj.ActivityMainItem = ActivityMainItem;
    __reflect(ActivityMainItem.prototype, "zj.ActivityMainItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityMainItem.js.map