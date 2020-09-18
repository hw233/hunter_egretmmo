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
    //累计充值送大礼(特效卡，累计充值)
    //yuqingchao
    //2019.03.23
    var ActivityTopUpActivity = (function (_super) {
        __extends(ActivityTopUpActivity, _super);
        function ActivityTopUpActivity() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.moveLocation = 0;
            _this.skinName = "resource/skins/activity/ActivityTopUpActivitySkin.exml";
            zj.cachekeys(zj.UIResource["ActivityTopUpActivity"], null);
            _this.btnGoCharge.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGoCharge, _this);
            _this.lstView.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLstView, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;
            }, null);
            return _this;
        }
        //时间戳转换为字符串格式
        ActivityTopUpActivity.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityTopUpActivity.prototype.setInfo = function (info, father) {
            this.info = info;
            this.father = father;
            this.setInfoText();
            this.setInfoAward();
        };
        ActivityTopUpActivity.prototype.upData = function () {
            this.setInfoAward();
        };
        ActivityTopUpActivity.prototype.setInfoText = function () {
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
            var curMoney = this.info.itemCount;
            var chargeDaily = this.info.chargeDaily;
            var bRes = this.info.consumeType == message.ConsumeType.CONSUME_TYPE_TOKEN
                || this.info.consumeType == message.ConsumeType.CONSUME_TYPE_POWER
                || this.info.consumeType == message.ConsumeType.CONSUME_TYPE_MONEY;
            var str_count = bRes
                && this.info.itemCount
                || this.info.itemCount;
            this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
            this.lbMoney.text = str_count;
            this.lbInfo.text = this.info.des;
            this.saveStart = this.info.openTime < Date.parse(zj.Game.Controller.serverNow().toString());
            //对应充值项送武将
            // let picId = this.info.picId
        };
        ActivityTopUpActivity.prototype.setInfoAward = function () {
            this.arrayCollection = new eui.ArrayCollection();
            if (this.info == "double token")
                return;
            for (var i = 0; i < this.info.rankRewards.length; i++) {
                this.arrayCollection.addItem({
                    i: i,
                    activities: this.info,
                    info: this.info.rankRewards[i],
                    father: this,
                    main: this.father,
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.ActivityTopUpActivityItem;
            this.scrollerInfo.viewport = this.lstView;
            this.scrollerInfo.validateNow();
            if (this.info.index == 1) {
                this.scrollerInfo.viewport.scrollV = this.moveLocation;
            }
            else {
                this.scrollerInfo.viewport.scrollV = 0;
            }
        };
        ActivityTopUpActivity.prototype.onLstView = function () {
            this.scrollerInfo.viewport = this.lstView;
            this.scrollerInfo.validateNow();
            this.moveLocation = this.scrollerInfo.viewport.scrollV;
            this.info = this.father.dataList[this.father.lstViewType.selectedIndex];
            this.setInfoAward();
            this.father.setInit(true);
        };
        //跳转充值
        ActivityTopUpActivity.prototype.onBtnGoCharge = function () {
            var _this = this;
            zj.loadUI(zj.PayMallScene)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.init();
                dialog.setCB(function () {
                    _this.onLstView();
                    _this.setInfoText();
                });
            });
        };
        ActivityTopUpActivity.prototype.getInfoStart = function () {
            return this.saveStart;
        };
        ActivityTopUpActivity.prototype.onRemoveAward = function () {
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
        };
        return ActivityTopUpActivity;
    }(zj.UI));
    zj.ActivityTopUpActivity = ActivityTopUpActivity;
    __reflect(ActivityTopUpActivity.prototype, "zj.ActivityTopUpActivity");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityTopUpActivity.js.map