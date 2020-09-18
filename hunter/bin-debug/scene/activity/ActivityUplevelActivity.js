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
    //开服冲级赢大奖
    //yuqingchao
    //2019.03.23
    var ActivityUplevelActivity = (function (_super) {
        __extends(ActivityUplevelActivity, _super);
        function ActivityUplevelActivity() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityUplevelActivitySkin.exml";
            zj.cachekeys(zj.UIResource["ActivityUplevelActivity"], null);
            _this.btnInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnInfo, _this);
            return _this;
        }
        ActivityUplevelActivity.prototype.setInfo = function (info, father) {
            this.info = info;
            this.setInfoText();
            this.setInfoAward();
        };
        //时间戳转换为字符串格式
        ActivityUplevelActivity.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityUplevelActivity.prototype.setInfoText = function () {
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
            var curLevel = "LV" + zj.Game.PlayerInfoSystem.Level;
            this.saveStart = bStart;
            this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
            this.lbInfo.text = this.info.des;
            this.lbLevel.text = curLevel;
        };
        ActivityUplevelActivity.prototype.setInfoAward = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.info.uplevelItems.length; i++) {
                this.arrayCollection.addItem({
                    i: i,
                    activities: this.info,
                    info: this.info.uplevelItems[i],
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.ActivityUplevelActivityItem;
        };
        ActivityUplevelActivity.prototype.onBtnInfo = function () {
            var _this = this;
            zj.loadUI(zj.ACtivityUplevelActivityPop)
                .then(function (scene) {
                scene.init(_this.info.index, _this.info.uplevelItems, _this.info.uplevel);
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return ActivityUplevelActivity;
    }(zj.UI));
    zj.ActivityUplevelActivity = ActivityUplevelActivity;
    __reflect(ActivityUplevelActivity.prototype, "zj.ActivityUplevelActivity");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityUplevelActivity.js.map