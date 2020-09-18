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
    //周末大挑战，周一开工，猎人任务，猎人养成计划，升星挑战，开服献礼
    //yuqingchao
    //2019.03.23
    var ActivityThemeGift = (function (_super) {
        __extends(ActivityThemeGift, _super);
        function ActivityThemeGift() {
            var _this = _super.call(this) || this;
            _this.moveLocation = 0; //列表下拉移动位置
            _this.skinName = "resource/skins/activity/ActivityThemeGiftSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityThemeGift"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;
            }, null);
            return _this;
        }
        //时间戳转换为字符串格式
        ActivityThemeGift.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityThemeGift.prototype.setInfo = function (info, father) {
            this.info = info;
            this.father = father;
            this.setInfoText();
            this.itemSort();
            this.setInfoAward();
        };
        ActivityThemeGift.prototype.setInfoText = function () {
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
        };
        ActivityThemeGift.prototype.itemSort = function () {
            for (var k in this.info.missions) {
                var v = this.info.missions[k];
                var alnum = 0;
                for (var kk in this.info.kvInfos) {
                    var vv = this.info.kvInfos[kk];
                    if (vv.key == v.mission_type)
                        alnum = vv.value;
                }
                var bIsGet = zj.Table.VIn(this.info.rewardIndex, v.mission_type);
                if (bIsGet) {
                    v.sort = -1;
                }
                else {
                    if (alnum / v.mission_condition >= 1) {
                        v.sort = 1;
                    }
                    else {
                        v.sort = alnum / v.mission_condition;
                    }
                }
            }
            var sortByValue = function (a, b) {
                if (a.sort == b.sort) {
                    return a.mission_type - b.mission_type;
                }
                else {
                    return b.sort - a.sort;
                }
            };
            this.info.missions.sort(sortByValue);
        };
        ActivityThemeGift.prototype.setInfoAward = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.info.missions.length; i++) {
                this.arrayCollection.addItem({
                    i: i,
                    activities: this.info,
                    info: this.info.missions[i],
                    father: this,
                    main: this.father
                });
            }
            this.LstView.dataProvider = this.arrayCollection;
            this.LstView.itemRenderer = zj.ActivityThemeGiftItem;
            this.scrollerInfo.viewport = this.LstView;
            this.scrollerInfo.validateNow();
            this.scrollerInfo.viewport.scrollV = this.moveLocation;
        };
        ActivityThemeGift.prototype.onLstView = function () {
            this.scrollerInfo.viewport = this.LstView;
            this.scrollerInfo.validateNow();
            this.moveLocation = this.scrollerInfo.viewport.scrollV;
            this.info = this.father.dataList[this.father.lstViewType.selectedIndex];
            this.itemSort();
            this.setInfoAward();
            this.father.setInit(true);
        };
        ActivityThemeGift.prototype.getInfoStart = function () {
            return this.saveStart;
        };
        ActivityThemeGift.prototype.onRemoveAward = function () {
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
        };
        return ActivityThemeGift;
    }(zj.UI));
    zj.ActivityThemeGift = ActivityThemeGift;
    __reflect(ActivityThemeGift.prototype, "zj.ActivityThemeGift");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityThemeGift.js.map