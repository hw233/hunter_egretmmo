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
    // 
    // lizhengqiang
    // 20190413
    var ActivityHappySevenDay = (function (_super) {
        __extends(ActivityHappySevenDay, _super);
        function ActivityHappySevenDay() {
            var _this = _super.call(this) || this;
            _this.day = null;
            _this.index = null;
            _this.TBL = [1, 2, 3, 4, 5, 6, 7];
            _this.skinName = "resource/skins/activity/ActivityHappySevenDaySkin.exml";
            _this.btnReward.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.btnReward.currentState = "down";
                _this.btnReward.scaleX = 1.2;
                _this.btnReward.scaleY = 1.2;
            }, _this);
            _this.btnReward.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.btnReward.currentState = "down";
                _this.btnReward.scaleX = 1;
                _this.btnReward.scaleY = 1;
                _this.onBtnReward();
            }, _this);
            _this.btnReward.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
                _this.btnReward.currentState = "up";
                _this.btnReward.scaleX = 1;
                _this.btnReward.scaleY = 1;
            }, _this);
            _this.btnGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.btnGift.currentState = "down";
                _this.btnGift.scaleX = 1.2;
                _this.btnGift.scaleY = 1.2;
            }, _this);
            _this.btnGift.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.btnGift.currentState = "down";
                _this.btnGift.scaleX = 1;
                _this.btnGift.scaleY = 1;
                _this.onBtnGift();
            }, _this);
            _this.btnGift.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
                _this.btnGift.currentState = "up";
                _this.btnGift.scaleX = 1;
                _this.btnGift.scaleY = 1;
            }, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.setInfoRefresh, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.setInfoRefresh, _this);
            }, null);
            return _this;
        }
        ActivityHappySevenDay.prototype.setInfo = function () {
            this.day = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
            var bReward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, function (k, v) {
                return v === true;
            });
            if (!bReward || zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newGiftSeven.length >= zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length) {
                this.groupReward.visible = true;
                this.groupGift.visible = false;
                this.setInfoItem();
                this.index = 1;
            }
            else {
                this.setInfoGiftItem();
                this.groupReward.visible = false;
                this.groupGift.visible = true;
                this.index = 2;
            }
            this.setButtonState();
            this.setInfoTips();
            this.setInfoTipReward();
        };
        ActivityHappySevenDay.prototype.setInfoReward = function () {
            this.setInfoItem();
        };
        ActivityHappySevenDay.prototype.setInfoRefresh = function () {
            this.day = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
            if (this.index == 1) {
                this.setInfoItem();
                this.setInfoTipReward();
                this.setInfoTips();
            }
            else {
                this.setInfoGiftItem();
                this.setInfoTipReward();
                this.setInfoTips();
            }
        };
        ActivityHappySevenDay.prototype.onBtnReward = function () {
            this.groupReward.visible = true;
            this.groupGift.visible = false;
            this.setInfoItem();
            this.index = 1;
            this.setButtonState();
        };
        ActivityHappySevenDay.prototype.onBtnGift = function () {
            this.groupReward.visible = false;
            this.groupGift.visible = true;
            this.setInfoGiftItem();
            this.index = 2;
            this.setButtonState();
        };
        ActivityHappySevenDay.prototype.setButtonState = function () {
            this.btnReward.enabled = (this.index != 1);
            this.btnGift.enabled = (this.index != 2);
            if (this.index == 1) {
                this.btnReward.currentState = "down";
                this.btnGift.currentState = "up";
            }
            if (this.index == 2) {
                this.btnReward.currentState = "up";
                this.btnGift.currentState = "down";
            }
        };
        ActivityHappySevenDay.prototype.setInfoTips = function () {
            this.imgTip.visible = (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newGiftSeven.length < this.day);
        };
        ActivityHappySevenDay.prototype.setInfoTipReward = function () {
            var bReward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, function (k, v) {
                return v == 0;
            });
            this.imgTip1.visible = bReward;
        };
        ActivityHappySevenDay.prototype.setInfoItem = function () {
            var info = zj.TableContinueLogin.Table(); // StringConfig_Table.continue_login
            var arrCollection = new eui.ArrayCollection();
            for (var k in info) {
                arrCollection.addItem({ day: Number(k), info: info[k], father: this });
            }
            this.lstViewDay.dataProvider = arrCollection;
            this.lstViewDay.itemRenderer = zj.ActivityHappySevenDayItem;
            var list = [];
            var min = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
            var tmp = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward;
            for (var k in tmp) {
                if (tmp[k] == 0) {
                    list.push(k);
                }
            }
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var v = list_1[_i];
                if (v < min) {
                    min = Number(v);
                }
            }
            this.scrollerViewDay.viewport = this.lstViewDay;
            this.scrollerViewDay.validateNow();
            if (this.scrollerViewDay.viewport.contentHeight > this.scrollerViewDay.viewport.height) {
                var moveDistance = 0;
                if (this.scrollerViewDay.viewport.contentHeight - min * 112 > this.scrollerViewDay.viewport.height) {
                    moveDistance = min * 112;
                }
                else {
                    moveDistance = this.scrollerViewDay.viewport.contentHeight - this.scrollerViewDay.viewport.height;
                }
                this.scrollerViewDay.viewport.scrollV = moveDistance;
            }
        };
        ActivityHappySevenDay.prototype.setInfoGiftItem = function () {
            var info = zj.TableNewgiftSeven.Table(); // StringConfig_Table.newGift_seven
            var arrCollection = new eui.ArrayCollection();
            for (var k in info) {
                arrCollection.addItem({ index: Number(k), info: info[k], father: this, day: this.day });
            }
            this.lstViewGift.dataProvider = arrCollection;
            this.lstViewGift.itemRenderer = zj.ActivitySevenGiftItem;
            var min = 8;
            var list = [];
            var _loop_1 = function (v) {
                var gift = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newGiftSeven, function (kk, vv) {
                    return vv == v;
                });
                if (!gift) {
                    list.push(v);
                }
            };
            for (var _i = 0, _a = this.TBL; _i < _a.length; _i++) {
                var v = _a[_i];
                _loop_1(v);
            }
            for (var _b = 0, list_2 = list; _b < list_2.length; _b++) {
                var v = list_2[_b];
                if (v < min) {
                    min = Number(v);
                }
            }
            min = min - 1 < 0 ? 0 : min - 1;
            this.scrollerViewGift.viewport = this.lstViewGift;
            this.scrollerViewGift.validateNow();
            if (this.scrollerViewGift.viewport.contentHeight > this.scrollerViewGift.viewport.height) {
                var moveDistance = 0;
                if (this.scrollerViewGift.viewport.contentHeight - min * 112 > this.scrollerViewGift.viewport.height) {
                    moveDistance = min * 112;
                }
                else {
                    moveDistance = this.scrollerViewGift.viewport.contentHeight - this.scrollerViewGift.viewport.height;
                }
                this.scrollerViewGift.viewport.scrollV = moveDistance;
            }
        };
        return ActivityHappySevenDay;
    }(zj.UI));
    zj.ActivityHappySevenDay = ActivityHappySevenDay;
    __reflect(ActivityHappySevenDay.prototype, "zj.ActivityHappySevenDay");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityHappySevenDay.js.map