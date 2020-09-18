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
    //累计消耗
    //yuqingchao
    //2019.04.04
    var ActivityConsumptionActivity = (function (_super) {
        __extends(ActivityConsumptionActivity, _super);
        function ActivityConsumptionActivity() {
            var _this = _super.call(this) || this;
            _this.saveStart = false;
            _this.moveLocation = 0;
            _this.skinName = "resource/skins/activity/ActivityConsumptionActivitySkin.exml";
            zj.cachekeys(zj.UIResource["ActivityConsumptionActivity"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.lstView.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLstView, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        ActivityConsumptionActivity.prototype.setInfo = function (info, father) {
            this.info = info;
            this.father = father;
            this.setInfoText();
            this.setInfoAward();
        };
        ActivityConsumptionActivity.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityConsumptionActivity.prototype.setInfoText = function () {
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
            this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
            this.lbInfo.text = this.info.des;
            var bRes = this.info.consumeType == message.ConsumeType.CONSUME_TYPE_TOKEN
                || this.info.consumeType == message.ConsumeType.CONSUME_TYPE_POWER
                || this.info.consumeType == message.ConsumeType.CONSUME_TYPE_MONEY;
            var strCount = bRes && this.info.itemCount;
            var tblConsume = zj.Game.ConfigManager.getTable("client_table_consume.json");
            var tbl = tblConsume[this.info.consumeType];
            var pathTitle = tbl.path;
            var pathCount = tbl.path_count;
            if (tbl.resource == -1) {
                this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Common.nothing, this);
            }
            this.saveStart = this.info.openTime < Date.parse(zj.Game.Controller.serverNow().toString());
            this.saveInfo = tbl;
            this.imgTitle.source = zj.cachekey(pathTitle, this);
            this.lbMoney.text = zj.HelpUtil.textConfigFormat(tbl.count, strCount);
        };
        ActivityConsumptionActivity.prototype.setInfoAward = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 1; i <= this.info.rewardZone.length; i++) {
                this.arrayCollection.addItem({
                    i: i,
                    info: this.info,
                    father: this,
                    main: this.father,
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.ActivityConsumptionActivityItem;
            this.scrollerInfo.viewport = this.lstView;
            this.scrollerInfo.validateNow();
            this.scrollerInfo.viewport.scrollV = this.moveLocation;
        };
        ActivityConsumptionActivity.prototype.onLstView = function () {
            this.scrollerInfo.viewport = this.lstView;
            this.scrollerInfo.validateNow();
            this.moveLocation = this.scrollerInfo.viewport.scrollV;
            this.info = this.father.dataList[this.father.lstViewType.selectedIndex];
            this.setInfoAward();
            this.father.setInit(true);
        };
        ActivityConsumptionActivity.prototype.getInfoStart = function () {
            return this.saveStart;
        };
        ActivityConsumptionActivity.prototype.onRemoveAward = function () {
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
        };
        return ActivityConsumptionActivity;
    }(zj.UI));
    zj.ActivityConsumptionActivity = ActivityConsumptionActivity;
    __reflect(ActivityConsumptionActivity.prototype, "zj.ActivityConsumptionActivity");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityConsumptionActivity.js.map