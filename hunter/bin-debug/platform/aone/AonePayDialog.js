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
    // 支付渠道选择页
    // guoshanhe 创建于2018.11.14
    var AonePayDialog = (function (_super) {
        __extends(AonePayDialog, _super);
        function AonePayDialog() {
            var _this = _super.call(this) || this;
            _this.select_channel = "12"; // 默认微信, 12支付宝，13微信
            _this.skinName = "resource/skins/aone/AonePayDialogSkin.exml";
            _this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReturn, _this);
            _this.rect_OK.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOK, _this);
            _this.rect_wx.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSelectWxpay, _this);
            _this.rect_zfb.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSelectAlipay, _this);
            return _this;
            // if (navigator) {
            //     if (navigator["standalone"] == true || navigator["standalone"] == false) {
            //         if (!Util.isWeixin() && (ActivityCollection.myBrowser() == "Safari") && (egret.Capabilities.os == "iOS") && navigator["standalone"] == true) {
            //             this.img_icon_wx.visible = false;
            //             this.img_wxpay.visible = false;
            //             this.lb_wx.visible = false;
            //         }
            //     }
            // }
        }
        AonePayDialog.prototype.model = function (productID) {
            var _this = this;
            var product = zj.Game.PlayerPaySystem.queryProduct(productID);
            if (product == null) {
                zj.toast_warning("未找到商品信息");
                return Promise.reject("cancel");
            }
            var json = JSON.parse(product.name);
            var discount = parseInt(product.discount);
            if (!discount || discount <= 0 || discount > 100)
                discount = 100;
            this.lb_product_name.text = json.zhcn;
            if (discount == 100) {
                this.lb_real_cost.text = product.amount + "元";
                this.lb_btn_text.text = "立即购买 " + this.lb_real_cost.text;
                this.lb_rate.visible = false;
                this.lb_price.visible = false;
                this.rect_rate.visible = false;
            }
            else {
                this.lb_real_cost.text = (product.amount * discount / 100) + "元";
                this.lb_btn_text.text = "立即购买 " + this.lb_real_cost.text;
                this.lb_rate.text = (discount / 10) + "折";
                this.lb_price.text = product.amount + "元";
                this.rect_rate.visible = true;
                this.lb_rate.visible = true;
                this.lb_price.visible = true;
            }
            this.show();
            return new Promise(function (resolve, reject) {
                _this.resolve = resolve;
                _this.reject = reject;
                if (zj.Util.isWeixin()) {
                    resolve("13");
                    return;
                }
            });
        };
        AonePayDialog.prototype.onBtnReturn = function () {
            this.close();
            this.reject("user cancel");
            return;
        };
        AonePayDialog.prototype.onBtnOK = function () {
            this.close();
            this.resolve(this.select_channel);
        };
        AonePayDialog.prototype.onSelectWxpay = function () {
            this.select_channel = "13";
            this.img_wxpay.source = zj.cachekey("aone_aggregate_radiobutton_choice_png", this);
            this.img_alipay.source = zj.cachekey("aone_aggregate_radiobutton_normal_png", this);
        };
        AonePayDialog.prototype.onSelectAlipay = function () {
            this.select_channel = "12";
            this.img_alipay.source = zj.cachekey("aone_aggregate_radiobutton_choice_png", this);
            this.img_wxpay.source = zj.cachekey("aone_aggregate_radiobutton_normal_png", this);
        };
        return AonePayDialog;
    }(zj.Dialog));
    zj.AonePayDialog = AonePayDialog;
    __reflect(AonePayDialog.prototype, "zj.AonePayDialog");
})(zj || (zj = {}));
//# sourceMappingURL=AonePayDialog.js.map