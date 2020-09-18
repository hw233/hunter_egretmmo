namespace zj {
    // 支付渠道选择页
    // guoshanhe 创建于2018.11.14

    export class AonePayDialog extends Dialog {
        public rect_OK:eui.Rect;
        public rect_rate:eui.Rect;
        public lb_zfb:eui.Label;
        public lb_wx:eui.Label;
        public lb_btn_text:eui.Label;
        public lb_product_name:eui.Label;
        public lb_real_cost:eui.Label;
        public lb_price:eui.Label;
        public lb_rate:eui.Label;
        public img_close:eui.Image;
        public img_icon_zfb:eui.Image;
        public img_icon_wx:eui.Image;
        public img_alipay:eui.Image;
        public img_wxpay:eui.Image;
        public rect_zfb:eui.Rect;
        public rect_wx:eui.Rect;

        private resolve: (value: string) => void;
        private reject: (reason?: any) => void
        private select_channel: string = "12"; // 默认微信, 12支付宝，13微信

        public constructor() {
            super();
            this.skinName = "resource/skins/aone/AonePayDialogSkin.exml";

            this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturn, this);
            this.rect_OK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);
            this.rect_wx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectWxpay, this);
            this.rect_zfb.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectAlipay, this);

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

        public model(productID: string): Promise<string> {
            let product = Game.PlayerPaySystem.queryProduct(productID);
            if (product == null) {
                toast_warning("未找到商品信息");
                return Promise.reject("cancel");
            }

            let json = JSON.parse(product.name);
            let discount = parseInt(product.discount);
            if (!discount || discount <= 0 || discount > 100) discount = 100;

            this.lb_product_name.text = json.zhcn;
            if (discount == 100) {
                this.lb_real_cost.text = product.amount + "元";
                this.lb_btn_text.text = "立即购买 " + this.lb_real_cost.text;
                this.lb_rate.visible = false;
                this.lb_price.visible = false;
                this.rect_rate.visible = false;
            } else {
                this.lb_real_cost.text = (product.amount * discount / 100) + "元";
                this.lb_btn_text.text = "立即购买 " + this.lb_real_cost.text;
                this.lb_rate.text = (discount / 10) + "折";
                this.lb_price.text = product.amount + "元";
                this.rect_rate.visible = true; 
                this.lb_rate.visible = true;
                this.lb_price.visible = true;
            }

            this.show();
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                if (Util.isWeixin()) {
                    resolve("13");
                    return;
                }
            });
        }

        private onBtnReturn() {
            this.close();
            this.reject("user cancel");
            return;
        }

        private onBtnOK() {
            this.close();
            this.resolve(this.select_channel);
        }

        private onSelectWxpay() {
            this.select_channel = "13";
            this.img_wxpay.source = cachekey("aone_aggregate_radiobutton_choice_png", this);
            this.img_alipay.source = cachekey("aone_aggregate_radiobutton_normal_png", this);
        }

        private onSelectAlipay() {
            this.select_channel = "12";
            this.img_alipay.source = cachekey("aone_aggregate_radiobutton_choice_png", this);
            this.img_wxpay.source = cachekey("aone_aggregate_radiobutton_normal_png", this);
        }
    }

}