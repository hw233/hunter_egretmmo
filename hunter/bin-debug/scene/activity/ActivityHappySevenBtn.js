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
     * @class 开服七天乐天数奖励按钮
     *
     * @author LianLei
     *
     * @date 2019-12-04
     */
    var ActivityHappySevenBtn = (function (_super) {
        __extends(ActivityHappySevenBtn, _super);
        function ActivityHappySevenBtn() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityHappySevenBtnSkin.exml";
            return _this;
        }
        ActivityHappySevenBtn.prototype.setInfo = function (info, bReward, isAwardList, isHaveGot) {
            // let days = Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
            var days = Math.min(7, zj.Helper.getDayIdx(zj.Game.PlayerInfoSystem.BaseInfo.createTime * 1000, zj.Game.Controller.curServerTime * 1000));
            this.imgBoard.source = info.dayIndex <= days ? zj.cachekey("ui_acitivity_serverseven_fangkuai1_png", this) : zj.cachekey("ui_acitivity_serverseven_fangkuai_png", this);
            this.labelDay.text = "第" + info.dayIndex + "天";
            this.awardDay.setData(info.reward_goods[0], info.reward_count[0], info.show_type[0], bReward, isAwardList, isHaveGot);
        };
        return ActivityHappySevenBtn;
    }(eui.Button));
    zj.ActivityHappySevenBtn = ActivityHappySevenBtn;
    __reflect(ActivityHappySevenBtn.prototype, "zj.ActivityHappySevenBtn");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityHappySevenBtn.js.map