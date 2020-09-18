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
    // wang shen zhuo
    // Activity_TimeRaseDaysItem
    // 2019.05.10
    var ActivityTimeRaseDaysItem = (function (_super) {
        __extends(ActivityTimeRaseDaysItem, _super);
        function ActivityTimeRaseDaysItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityTimeRaseDaysItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityTimeRaseDaysItem"], null);
            return _this;
        }
        ActivityTimeRaseDaysItem.prototype.dataChanged = function () {
            this.Index = this.data.index;
            this.father = this.data.father;
            this.SetInfoOthers();
        };
        ActivityTimeRaseDaysItem.prototype.SetInfoOthers = function () {
            this.lbDays.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Award.day, this.Index);
            this.SetInfoButtonAndLockState();
            this.SetInfoTipsAndKM();
        };
        ActivityTimeRaseDaysItem.prototype.SetInfoButtonAndLockState = function () {
            if (this.father.awardTodayIndex == null) {
                return;
            }
            var daysPath = [
                "ui_acitivity_timerace_WordsDay%sDis_png",
                "ui_acitivity_timerace_WordsDay%sNor_png",
                "ui_acitivity_timerace_WordsDay%sSel_png",
            ];
            var path = null;
            if (this.Index < this.father.awardTodayIndex) {
                path = zj.Helper.StringFormat(daysPath[0], this.Index);
                this.btnClick.enabled = false;
                this.imgClock.visible = false;
            }
            else {
                this.btnClick.touchEnabled = false;
                if (this.Index > this.father.awardTodayIndex) {
                    path = zj.Helper.StringFormat(daysPath[1], this.Index);
                    this.imgClock.visible = true;
                }
                else {
                    path = zj.Helper.StringFormat(daysPath[2], this.Index);
                    // this.btnClick.
                    this.imgClock.visible = false;
                }
            }
            this.imgDays.source = zj.cachekey(path, this);
        };
        ActivityTimeRaseDaysItem.prototype.SetInfoTipsAndKM = function () {
            if (this.Index == this.father.awardTodayIndex) {
                var bTips = zj.PlayerRaceSystem.GetTipsShow();
                this.imgTip.visible = bTips;
            }
            if (this.Index <= this.father.awardTodayIndex) {
                var strKM = zj.Game.PlayerMissionSystem.missionActive.raceKM[this.Index - 1] || 0;
                this.lbRaceNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.completeKM, strKM);
                if (this.Index < this.father.awardTodayIndex) {
                    this.lbRaceNum.textColor = zj.Helper.RGBToHex("r:155,g:155,b:155");
                    this.lbRaceNum.stroke = 2;
                    this.lbRaceNum.strokeColor = zj.Helper.RGBToHex("r:42,g:42,b:42");
                }
                else {
                    this.lbRaceNum.stroke = 2;
                    this.lbRaceNum.strokeColor = zj.Helper.RGBToHex("r:1,g:120,b:150");
                }
            }
            else {
                var numKM = 0;
                for (var k in this.father.awardTbl.daily_missions[this.father.awardTodayIndex]) {
                    var v = this.father.awardTbl.daily_missions[this.father.awardTodayIndex][k];
                    var missionInfo = zj.PlayerRaceSystem.MissionItem(v);
                    numKM = numKM + Number(missionInfo.race_km);
                }
                this.lbRaceNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.estimateKM, numKM);
                this.lbRaceNum.textColor = zj.Helper.RGBToHex("r:80,g:163,b:195");
                this.lbRaceNum.stroke = 2;
                this.lbRaceNum.strokeColor = zj.Helper.RGBToHex("r:5,g:69,b:96");
            }
        };
        return ActivityTimeRaseDaysItem;
    }(eui.ItemRenderer));
    zj.ActivityTimeRaseDaysItem = ActivityTimeRaseDaysItem;
    __reflect(ActivityTimeRaseDaysItem.prototype, "zj.ActivityTimeRaseDaysItem");
    var ActivityTimeRaseDaysItemData = (function () {
        function ActivityTimeRaseDaysItemData() {
        }
        return ActivityTimeRaseDaysItemData;
    }());
    zj.ActivityTimeRaseDaysItemData = ActivityTimeRaseDaysItemData;
    __reflect(ActivityTimeRaseDaysItemData.prototype, "zj.ActivityTimeRaseDaysItemData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityTimeRaseDaysItem.js.map