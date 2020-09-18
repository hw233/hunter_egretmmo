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
    // 神秘商店item HXH_PublicGiftItem
    // lizhengqiang
    // 20190420
    var PublicGiftItem = (function (_super) {
        __extends(PublicGiftItem, _super);
        function PublicGiftItem() {
            var _this = _super.call(this) || this;
            _this.index = null;
            _this.info = null;
            _this.father = null;
            _this.payTbl = null;
            _this.TOKEN = message.EResourceType.RESOURCE_TOKEN;
            _this.skinName = "resource/skins/gift/PublicGiftItemSkin.exml";
            zj.cachekeys(zj.UIResource["PublicGiftItem"], null);
            _this.btnGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGiftBuy, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        PublicGiftItem.prototype.dataChanged = function () {
            this.index = null;
            this.info = null;
            this.father = null;
            this.payTbl = null;
            this.setInfo();
        };
        PublicGiftItem.prototype.setInfo = function () {
            this.index = this.data.index;
            this.info = this.data.info;
            this.father = this.data.father;
            this.setInfoPayTbl();
            this.setInfoAward();
            this.setInfoItem();
        };
        PublicGiftItem.prototype.setInfoPayTbl = function () {
            if (this.info["buy_type"] == 1) {
                for (var _i = 0, _a = this.father.allProducts; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.cp_product_id == this.info["pay_index"]) {
                        this.payTbl = zj.Table.DeepCopy(v);
                        break;
                    }
                }
            }
        };
        PublicGiftItem.prototype.setInfoItem = function () {
            this.lbNameType.text = this.info["tribute_name"];
            // board
            var boardIndx = Number(this.info["reference"]) % zj.UIConfig.UIConfig_Gift.secretMallBoard.length + 1;
            var boardPath = zj.UIConfig.UIConfig_Gift.secretMallBoard[boardIndx - 1];
            this.imgFloor.source = zj.cachekey(boardPath, this);
            // buy
            this.btnGiftBuy.enabled = (this.info["bBought"] == 0);
            this.imgShadow.visible = (this.info["bBought"] == 1);
            this.imgSoldOut.visible = (this.info["bBought"] == 1);
            // price
            if (this.info["buy_type"] == 1 && this.payTbl != null) {
                var strUnit = zj.Set.CashUnit(this.payTbl["currency"]);
                var strMoney = this.payTbl["amount"];
                var prePrice = Math.floor(Number(this.payTbl["amount"]) * (Number(this.info["discount"]) / 100 + 1)).toString();
                this.lbGetNum.text = strMoney;
                this.lbGetNum2.text = prePrice;
                this.imgGestoneIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[1 - 1], this);
            }
            else {
                var prePrice = Math.floor(Number(this.info["pay_index"]) * (Number(this.info["discount"]) / 100 + 1)).toString();
                this.lbGetNum.text = this.info["pay_index"];
                this.lbGetNum2.text = prePrice;
                this.imgGestoneIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[2 - 1], this);
            }
            this.groupSale.visible = (Number(this.info["discount"]) > 0);
            this.lbDiscount.text = "-" + this.info["discount"] + "%";
        };
        PublicGiftItem.prototype.setInfoAward = function () {
            var arrCollection = new eui.ArrayCollection();
            for (var _i = 0, _a = this.info["goodses"]; _i < _a.length; _i++) {
                var v = _a[_i];
                arrCollection.addItem(v);
            }
            this.lstBuyAward.dataProvider = arrCollection;
            this.lstBuyAward.itemRenderer = zj.GiftCommonAwardItem;
        };
        PublicGiftItem.prototype.onBtnGiftBuy = function () {
            this.btnGiftBuy.enabled = false;
            this.father.reqActivity(this.index);
        };
        return PublicGiftItem;
    }(eui.ItemRenderer));
    zj.PublicGiftItem = PublicGiftItem;
    __reflect(PublicGiftItem.prototype, "zj.PublicGiftItem");
})(zj || (zj = {}));
//# sourceMappingURL=PublicGiftItem.js.map