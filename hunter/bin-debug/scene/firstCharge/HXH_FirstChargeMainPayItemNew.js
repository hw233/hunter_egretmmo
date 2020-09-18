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
    //HXH_FirstChargeMainPayItemNew
    //wangshenzhuo
    // 2019/03/30
    var HXH_FirstChargeMainPayItemNew = (function (_super) {
        __extends(HXH_FirstChargeMainPayItemNew, _super);
        function HXH_FirstChargeMainPayItemNew() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/firstCharge/HXH_FirstChargeMainPayItemNewSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_FirstChargeMainPayItemNew"], null);
            return _this;
        }
        HXH_FirstChargeMainPayItemNew.prototype.dataChanged = function () {
            if (this.selected) {
                this.buttonPay.touchEnabled = false;
                this.imagePay.visible = true;
            }
            else {
                this.buttonPay.touchEnabled = true;
                this.imagePay.visible = false;
            }
            var a = this.data.index + 1;
            var bCharge = zj.Game.PlayerInfoSystem.BaseInfo.chargeToken < this.data.father.first_data[this.data.index].token;
            var bAward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward, function (k, v) {
                return v == a;
            });
            var bShowAward = !bCharge && bAward;
            //是否领取
            this.imageGet.visible = bShowAward;
            this.imagePayNum.source = zj.cachekey(this.data.info.button_pic, this);
        };
        return HXH_FirstChargeMainPayItemNew;
    }(eui.ItemRenderer));
    zj.HXH_FirstChargeMainPayItemNew = HXH_FirstChargeMainPayItemNew;
    __reflect(HXH_FirstChargeMainPayItemNew.prototype, "zj.HXH_FirstChargeMainPayItemNew");
    //子项数据源
    var HXH_FirstChargeMainPayItemNewData = (function () {
        function HXH_FirstChargeMainPayItemNewData() {
        }
        return HXH_FirstChargeMainPayItemNewData;
    }());
    zj.HXH_FirstChargeMainPayItemNewData = HXH_FirstChargeMainPayItemNewData;
    __reflect(HXH_FirstChargeMainPayItemNewData.prototype, "zj.HXH_FirstChargeMainPayItemNewData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_FirstChargeMainPayItemNew.js.map