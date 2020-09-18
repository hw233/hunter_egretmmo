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
    //道具兑换
    //yuqingchao
    // 2019.04.24
    var ActivityExchangeActivity = (function (_super) {
        __extends(ActivityExchangeActivity, _super);
        function ActivityExchangeActivity() {
            var _this = _super.call(this) || this;
            _this.rewardZoneList = [];
            _this.saveStart = false;
            _this.skinName = "resource/skins/activity/ActivityExchangeActivitySkin.exml";
            zj.cachekeys(zj.UIResource["ActivityExchangeActivity"], null);
            return _this;
        }
        ActivityExchangeActivity.prototype.setInfo = function (info, father) {
            this.info = info;
            // this.rewardZoneList = null;
            this.setInfoText();
            this.setInfoAward();
        };
        ActivityExchangeActivity.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityExchangeActivity.prototype.setInfoText = function () {
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
            this.lbInfo.text = zj.singLecraft.decodeGroupName(this.info.des, "&", false);
            var bStart = this.info.openTime < Date.parse(zj.Game.Controller.serverNow().toString());
            this.saveStart = bStart;
            var picId = this.info.picId;
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.pic + ".json"); //读表
            var pathinfo = tbl[picId];
            if (pathinfo != null) {
                if (pathinfo.path != null) {
                    this.imgTip.source = zj.cachekey(pathinfo.path, this);
                }
                if (pathinfo.path2 != null) {
                    this.imgHunter.source = zj.cachekey(pathinfo.path2, this);
                }
            }
        };
        ActivityExchangeActivity.prototype.setInfoAward = function () {
            if (this.rewardZoneList.length == 0) {
                this.item = new eui.ArrayCollection();
                this.itemB = new eui.ArrayCollection();
                var itemNum = 0;
                for (var i = 0; i < this.info.exchanges.length; i++) {
                    if (this.info.exchanges[i].exchangeInfo[1] == null) {
                        itemNum = 0;
                        this.itemB.addItem({
                            i: i,
                            info: this.info,
                            father: this,
                        });
                    }
                    else {
                        itemNum = 1;
                        this.item.addItem({
                            i: i,
                            info: this.info,
                            father: this,
                        });
                    }
                }
                if (itemNum == 0) {
                    this.lstView.dataProvider = this.itemB;
                    this.lstView.itemRenderer = zj.ActivityExchangeActivityItemB;
                }
                else if (itemNum == 1) {
                    this.lstView.dataProvider = this.item;
                    this.lstView.itemRenderer = zj.ActivityExchangeActivityItem;
                }
            }
        };
        ActivityExchangeActivity.prototype.getInfoStart = function () {
            return this.saveStart;
        };
        return ActivityExchangeActivity;
    }(zj.UI));
    zj.ActivityExchangeActivity = ActivityExchangeActivity;
    __reflect(ActivityExchangeActivity.prototype, "zj.ActivityExchangeActivity");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityExchangeActivity.js.map