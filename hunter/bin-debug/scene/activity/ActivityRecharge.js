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
     * 2019.12.3
     * xingliwei
     * @class 累天充值
     */
    var ActivityRecharge = (function (_super) {
        __extends(ActivityRecharge, _super);
        function ActivityRecharge() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityRechargeSkin.exml";
            return _this;
        }
        ActivityRecharge.prototype.init = function () {
            zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            var array = new eui.ArrayCollection();
            var table = zj.TableContinuePay.Table();
            for (var i = 1; i <= Object.keys(table).length; i++) {
                var data = new zj.ActivityRechargeItemData();
                data.index = i;
                data.info = zj.TableContinuePay.Item(i);
                data.father = this;
                array.addItem(data);
            }
            var array1 = new eui.ArrayCollection();
            var b = [];
            var _loop_1 = function (i) {
                var a = array.source[i];
                var find = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.pay_reward, function (k, v) {
                    return v >= array.source[i].info.id;
                });
                if (find) {
                    b.push(a);
                }
                else {
                    array1.addItem(a);
                }
            };
            for (var i = 0; i < array.length; i++) {
                _loop_1(i);
            }
            for (var k = 0; k < b.length; k++) {
                array1.addItem(b[k]);
            }
            this.lstAward.dataProvider = array1;
            this.lstAward.itemRenderer = zj.ActivityRechargeItem;
            this.labelday.text = zj.Game.PlayerInfoSystem.BaseInfo.pay_day + "/" + Object.keys(table).length;
        };
        return ActivityRecharge;
    }(zj.UI));
    zj.ActivityRecharge = ActivityRecharge;
    __reflect(ActivityRecharge.prototype, "zj.ActivityRecharge");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityRecharge.js.map