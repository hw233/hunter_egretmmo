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
    //周末登陆活动
    //yuqingchao
    //2019.03.23
    var ActivityStarSever = (function (_super) {
        __extends(ActivityStarSever, _super);
        function ActivityStarSever() {
            var _this = _super.call(this) || this;
            _this.moveLocation = 0;
            _this.skinName = "resource/skins/activity/ActivityStarSeverSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityStarSever"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.lstView.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLstView, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;		
            }, null);
            return _this;
        }
        ActivityStarSever.prototype.setInfo = function (info, father) {
            this.info = info;
            this.father = father;
            this.setInfoText();
            this.setInfoAward();
        };
        ActivityStarSever.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityStarSever.prototype.setInfoText = function () {
            var strOpen = this.time(this.info.openTime);
            var timeOpen;
            if (strOpen.m < 10) {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + "0" + strOpen.m;
            }
            else {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + strOpen.m;
            }
            var strColse = this.time(this.info.closeTime);
            var timeColse;
            if (strColse.m < 10) {
                timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + "0" + strColse.m;
            }
            else {
                timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + strColse.m;
            }
            var bStart = this.info.openTime < Date.parse(zj.Game.Controller.serverNow().toString());
            this.saveStart = bStart;
            this.lbTimeOpen.text = timeOpen;
            this.lbTimeClose.text = timeColse;
            this.lbInfo.text = this.info.des;
        };
        ActivityStarSever.prototype.setInfoAward = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.info.rewardZone.length; i++) {
                this.arrayCollection.addItem({
                    i: i,
                    activities: this.info,
                    info: this.info.rewards[i].goodsInfo,
                    father: this,
                    main: this.father,
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.ActivityStarSeverItem;
            this.scrollerInfo.viewport = this.lstView;
            this.scrollerInfo.validateNow();
            this.scrollerInfo.viewport.scrollV = this.moveLocation;
        };
        ActivityStarSever.prototype.onLstView = function () {
            this.scrollerInfo.viewport = this.lstView;
            this.scrollerInfo.validateNow();
            this.moveLocation = this.scrollerInfo.viewport.scrollV;
            this.info = this.father.dataList[this.father.lstViewType.selectedIndex];
            this.setInfoAward();
            this.getInfoToday();
            this.father.setInit(true);
        };
        ActivityStarSever.prototype.getInfoStart = function () {
            return this.saveStart;
        };
        ActivityStarSever.prototype.getInfoToday = function () {
            var info = zj.Game.PlayerActivitySystem.Activities;
            var reward = this.info.todayReward;
            var today = this.info.daysIndex;
            today = zj.yuan3(reward, today, today + 1);
            return [today, reward];
        };
        ActivityStarSever.prototype.onRemoveAward = function () {
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
        };
        return ActivityStarSever;
    }(zj.UI));
    zj.ActivityStarSever = ActivityStarSever;
    __reflect(ActivityStarSever.prototype, "zj.ActivityStarSever");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityStarSever.js.map