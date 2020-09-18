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
    //VipLowGiftItem
    //yuqingchao
    //2019.04.12
    var VipLowGiftItem = (function (_super) {
        __extends(VipLowGiftItem, _super);
        function VipLowGiftItem() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.onBtnPay = function () {
                setTimeout(function () {
                    if (_this.father == null)
                        return;
                    else {
                        var father = _this.father;
                        father.onBtnClose();
                    }
                }, 1000);
                setTimeout(function () {
                    zj.loadUI(zj.PayMallScene)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                        dialog.init(true);
                    });
                }, 1500);
            };
            _this.skinName = "resource/skins/vip/VipLowGiftItemSkin.exml";
            zj.cachekeys(zj.UIResource["VipLowGiftItem"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
                _this.data.father = null;
            }, null);
            return _this;
        }
        VipLowGiftItem.prototype.init = function () {
            this.scroller.mask = this.imgMask;
            this.imgDay.visible = true;
            this.imgGet.visible = true;
            this.imgIcon.visible = true;
            this.imgTips.visible = true;
            this.groupGet.visible = true;
            this.imgGet.visible = false;
        };
        VipLowGiftItem.prototype.dataChanged = function () {
            this.init();
            this.index = this.data.i;
            this.info = this.data.info;
            this.father = this.data.father;
            this.imgDay.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_vip_title_new[this.index], this);
            var goods = zj.PlayerVIPSystem.LowWealItem(this.index).goods_content;
            var count = zj.PlayerVIPSystem.LowWealItem(this.index).goods_count;
            var getList = [];
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                this.arrayCollection.addItem({
                    i: i,
                    good: goods[i],
                    count: count[i],
                    father: this.father,
                });
            }
            this.lstViewAward.dataProvider = this.arrayCollection;
            this.lstViewAward.itemRenderer = zj.VipLowItemB;
            this.setButtonInfo();
        };
        VipLowGiftItem.prototype.setButtonInfo = function () {
            var _this = this;
            var isHave = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, function (k, v) {
                return (v == _this.index);
            });
            if (isHave) {
                this.imgGet.visible = true;
                this.groupGet.visible = false;
            }
            else {
                this.imgGet.visible = false;
                this.groupGet.visible = true;
            }
            this.lbToken.text = zj.PlayerVIPSystem.LowWealItem(this.index).consume_token.toString();
            this.labelyuanjia.text = zj.PlayerVIPSystem.LowWealItem(this.index).primer.toString();
            this.imgTips.visible = this.index <= zj.Game.PlayerInfoSystem.VipLevel && !isHave;
        };
        VipLowGiftItem.prototype.onBtnGet = function () {
            var _this = this;
            if (this.index <= zj.Game.PlayerInfoSystem.VipLevel) {
                zj.Game.PlayerVIPSystem.lowVipBuyWealReward(this.index).then(function (resp) {
                    _this.setButtonInfo();
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(resp.getGoods);
                        dialog.show();
                    });
                });
            }
            else {
                zj.loadUI(zj.ConfirmCancelDialog).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Vip.vip_gift_go, _this.index, zj.Helper.GetNumCH(_this.index.toString(), false)));
                    dialog.setCB(_this.onBtnPay);
                });
            }
        };
        return VipLowGiftItem;
    }(eui.ItemRenderer));
    zj.VipLowGiftItem = VipLowGiftItem;
    __reflect(VipLowGiftItem.prototype, "zj.VipLowGiftItem");
})(zj || (zj = {}));
//# sourceMappingURL=VipLowGiftItem.js.map