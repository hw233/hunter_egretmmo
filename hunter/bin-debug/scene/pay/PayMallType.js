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
    // 商城type
    // lizhengiang
    // 20190326
    var PayMallType = (function (_super) {
        __extends(PayMallType, _super);
        function PayMallType() {
            var _this = _super.call(this) || this;
            _this.index = null;
            _this.father = null;
            _this.skinName = "resource/skins/pay/PayMallTypeSkin.exml";
            zj.cachekeys(zj.UIResource["PayMallType"], null);
            _this.btnType.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnType, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
                _this.father = null;
            }, null);
            _this.timer = new egret.Timer(999, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.setInfoTips, _this);
            _this.timer.start();
            return _this;
        }
        PayMallType.prototype.dataChanged = function () {
            this.index = this.data.index;
            this.father = this.data.father;
            this.setInfo();
            this.setInfoTips();
        };
        PayMallType.prototype.setInfo = function () {
            zj.Set.ButtonBackgroud(this.btnType, zj.UIConfig.UIConfig_VIP.chargeType[this.index][1], zj.UIConfig.UIConfig_VIP.chargeType[this.index][2]);
            this.btnType.currentState = "up";
            if (this.selected) {
                this.btnType.currentState = "down";
            }
        };
        PayMallType.prototype.onBtnType = function () {
            if (this.father.type == zj.TableEnum.Enum.HXHChargeType.Gift) {
                var tbl = zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos);
                for (var _i = 0, tbl_1 = tbl; _i < tbl_1.length; _i++) {
                    var v = tbl_1[_i];
                    var num = Number(v.gift_index + v.index);
                    if (zj.Tips.tips_oneday_get(num)) {
                        zj.Tips.tips_oneday_set(num, true);
                    }
                }
            }
            else if (this.father.type == zj.TableEnum.Enum.HXHChargeType.Op) {
                var tbl = zj.PlayerGiftSystem.SortOp(zj.Game.PlayerGiftSystem.giftInfos);
                for (var _a = 0, tbl_2 = tbl; _a < tbl_2.length; _a++) {
                    var v = tbl_2[_a];
                    var num = Number(v.gift_index + v.index);
                    if (zj.Tips.tips_oneday_get(num)) {
                        zj.Tips.tips_oneday_set(num, true);
                    }
                }
            }
            else if (this.father.type == zj.TableEnum.Enum.HXHChargeType.Vip) {
                var tbl = zj.PlayerGiftSystem.SortOp(zj.Game.PlayerGiftSystem.giftInfos);
                for (var _b = 0, tbl_3 = tbl; _b < tbl_3.length; _b++) {
                    var v = tbl_3[_b];
                    var num = Number(v.gift_index + v.index);
                    if (zj.Tips.tips_oneday_get(num)) {
                        zj.Tips.tips_oneday_set(num, true);
                    }
                }
            }
            else if (this.father.type == zj.TableEnum.Enum.HXHChargeType.Charge) {
                var tbl = zj.PlayerGiftSystem.SortCharge(zj.Game.PlayerGiftSystem.giftInfos);
                for (var _c = 0, tbl_4 = tbl; _c < tbl_4.length; _c++) {
                    var v = tbl_4[_c];
                    var num = Number(v.gift_index + v.index);
                    if (zj.Tips.tips_oneday_get(num)) {
                        zj.Tips.tips_oneday_set(num, true);
                    }
                }
            }
            this.father.type = this.index;
            this.father.setInfoTypeList();
        };
        PayMallType.prototype.setInfoTips = function () {
            if (this.index == zj.TableEnum.Enum.HXHChargeType.Charge) {
                var tips = zj.PlayerGiftSystem.findTipsCharge();
                this.imgTips.visible = tips;
            }
            else if (this.index == zj.TableEnum.Enum.HXHChargeType.Gift) {
                var tips = zj.PlayerGiftSystem.findTips();
                this.imgTips.visible = tips;
            }
            else if (this.index == zj.TableEnum.Enum.HXHChargeType.Op) {
                var tips = zj.PlayerGiftSystem.findOpTips();
                this.imgTips.visible = tips;
            }
            else if (this.index == zj.TableEnum.Enum.HXHChargeType.First) {
                this.imgTips.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.FIRST);
            }
            else if (this.index == zj.TableEnum.Enum.HXHChargeType.Vip) {
                var tips = zj.PlayerGiftSystem.findTips();
                this.imgTips.visible = tips;
            }
        };
        return PayMallType;
    }(eui.ItemRenderer));
    zj.PayMallType = PayMallType;
    __reflect(PayMallType.prototype, "zj.PayMallType");
})(zj || (zj = {}));
//# sourceMappingURL=PayMallType.js.map