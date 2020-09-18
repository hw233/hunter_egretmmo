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
     * @class 赏金特训按钮list子项
     */
    var ActivityWeekMissionTag = (function (_super) {
        __extends(ActivityWeekMissionTag, _super);
        function ActivityWeekMissionTag() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityWeekMissionTagSkin.exml";
            _this.ButtonTag.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTag, _this);
            zj.cachekeys(zj.UIResource["ActivityWeekMissionTag"], null);
            return _this;
        }
        ActivityWeekMissionTag.prototype.dataChanged = function () {
            var data = this.data;
            if (data.index == 3) {
                this.SpriteUnopen.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.WeekBuy, this);
                this.SpriteRedIcon.visible = false;
            }
            else {
                this.SpriteUnopen.source = zj.cachekey(data.father.data[data.index].typeInfo.week_path, this);
            }
            var uiType = zj.Game.PlayerMissionSystem.itemMissionWeek(zj.Game.PlayerMissionSystem.missionActive.missionWeekIndex).week_mission_type;
            zj.Set.ButtonBackgroud(this.ButtonTag, zj.UIConfig.UIConfig_Activity.WeekTypeButton[uiType][0], zj.UIConfig.UIConfig_Activity.WeekTypeButton[uiType][1], zj.UIConfig.UIConfig_Activity.WeekTypeButton[uiType][2]);
        };
        ActivityWeekMissionTag.prototype.setInfoTag = function (id) {
            if (this.data.index == 3) {
                return;
            }
            this.setInfoTips();
        };
        ActivityWeekMissionTag.prototype.setSelect = function (vis) {
            this.ButtonTag.enabled = !vis;
        };
        ActivityWeekMissionTag.prototype.onBtnTag = function () {
            var data = this.data;
            data.father.SetInfoButton(data.index);
        };
        ActivityWeekMissionTag.prototype.setInfoTips = function () {
            var data = this.data;
            var bTips = zj.Table.FindF(data.father.data[data.index].state, function (k, v) {
                return v == zj.TableEnum.Enum.NoviceState.REWARD && !data.father.data[data.index].lock;
            });
            this.SpriteRedIcon.visible = bTips;
        };
        return ActivityWeekMissionTag;
    }(eui.ItemRenderer));
    zj.ActivityWeekMissionTag = ActivityWeekMissionTag;
    __reflect(ActivityWeekMissionTag.prototype, "zj.ActivityWeekMissionTag");
    var ActivityWeekMissionTagData = (function () {
        function ActivityWeekMissionTagData() {
        }
        return ActivityWeekMissionTagData;
    }());
    zj.ActivityWeekMissionTagData = ActivityWeekMissionTagData;
    __reflect(ActivityWeekMissionTagData.prototype, "zj.ActivityWeekMissionTagData");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityWeekMissionTag.js.map