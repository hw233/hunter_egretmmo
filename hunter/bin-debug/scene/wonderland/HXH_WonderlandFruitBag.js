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
     * 果实背包
     * created by Lianlei
     * 2019.05.21
     */
    var HXH_WonderlandFruitBag = (function (_super) {
        __extends(HXH_WonderlandFruitBag, _super);
        function HXH_WonderlandFruitBag() {
            var _this = _super.call(this) || this;
            _this.button = [];
            _this.infos = [];
            _this.listFruitBagData = new eui.ArrayCollection();
            _this.itemList = [];
            _this.itemIndex = 0;
            _this.skinName = "resource/skins/wonderland/HXH_WonderlandFruitBagSkin.exml";
            _this.btnWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnWhole, _this);
            _this.btnRed.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRed, _this);
            _this.btnBlue.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBlue, _this);
            _this.btnPurple.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPurple, _this);
            _this.btnSell.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSell, _this);
            _this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUse, _this);
            _this.btnCloseB.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.listFruitBag.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onListChangeTap, _this);
            _this.init();
            return _this;
        }
        HXH_WonderlandFruitBag.prototype.init = function () {
            this.button = [
                this.btnWhole,
                this.btnRed,
                this.btnBlue,
                this.btnPurple
            ];
            this.type = 0;
            this.index = 0;
            this.info = null;
            this.btnUse.visible = false;
            this.btnSell.visible = false;
            this.setInfo();
        };
        HXH_WonderlandFruitBag.prototype.setInfo = function () {
            this.setButton();
            this.setInfoList();
            this.setInfoDown();
        };
        HXH_WonderlandFruitBag.prototype.setIndex = function (type, index) {
            this.type = type;
            this.index = index;
            this.setInfo();
        };
        HXH_WonderlandFruitBag.prototype.setButton = function () {
            for (var i = 0; i < this.button.length; i++) {
                if (i == this.type) {
                    this.button[i].enabled = false;
                }
                else {
                    this.button[i].enabled = true;
                }
            }
        };
        HXH_WonderlandFruitBag.prototype.setInfoList = function () {
            this.itemIndex = 0;
            this.infos = zj.Game.PlayerItemSystem.GetWonderlandFruitByType(this.type - 1);
            this.info = null;
            if (this.infos[this.index] != null) {
                this.info = this.infos[this.index];
            }
            var count = zj.PlayerItemSystem.FixCount(this.infos.length, 18, 6);
            var goods = this.infos;
            var good = new message.GoodsInfo();
            for (var i = 0; i < count; i++) {
                if (goods[i] == null) {
                    goods[i] = good;
                }
            }
            this.listFruitBagData = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                var itemData = new zj.HXH_WonderlandFruitBagItemData();
                itemData.index = i;
                itemData.info = goods[i];
                itemData.father = this;
                this.listFruitBagData.addItem(itemData);
            }
            this.listFruitBag.selectedIndex = 0;
            this.listFruitBag.dataProvider = this.listFruitBagData;
            this.listFruitBag.itemRenderer = zj.HXH_WonderlandFruitBagItem;
        };
        HXH_WonderlandFruitBag.prototype.setInfoDown = function () {
            // if (this.info != null) {
            if (this.info != null && this.info.goodsId != 0) {
                this.groupDown.visible = true;
                var itemSet = zj.PlayerItemSystem.Set(this.info.goodsId, this.info.showType, this.info.count);
                var bUse = itemSet.Use;
                var bSell = itemSet.Info.price != 0;
                this.btnUse.enabled = bUse;
                this.btnSell.enabled = bSell;
                this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                this.imgBoard.source = zj.cachekey(itemSet.Frame, this);
                zj.cachekeys([itemSet.Path, itemSet.Frame], this);
                this.labelFruitNum.text = this.info.count.toString();
                this.labelNumID.text = itemSet.FruitID;
                this.labelFruitName.text = itemSet.Info.name;
                this.labelFruitValue.text = itemSet.Info.price;
                this.labelFruitInfo.text = itemSet.Info.des;
            }
            else {
                this.groupDown.visible = false;
            }
        };
        HXH_WonderlandFruitBag.prototype.onBtnWhole = function () {
            this.setIndex(0, 0);
        };
        HXH_WonderlandFruitBag.prototype.onBtnRed = function () {
            this.setIndex(1, 0);
        };
        HXH_WonderlandFruitBag.prototype.onBtnBlue = function () {
            this.setIndex(2, 0);
        };
        HXH_WonderlandFruitBag.prototype.onBtnPurple = function () {
            this.setIndex(3, 0);
        };
        HXH_WonderlandFruitBag.prototype.SetInfoSell = function () {
            var count = zj.PlayerItemSystem.Count(this.info.goodsId);
            if (count > 0) {
                var item = this.listFruitBag.getElementAt(this.index);
                item.setInfoItem();
                this.setInfoList();
                this.setInfoDown();
            }
            else {
                var count_1 = zj.Table.Count(this.infos, function (k, v) {
                    return v.goodsId > 0 ? 1 : 0;
                });
                if (count_1 > 1 && count_1 == this.index) {
                    this.index = this.index - 1;
                }
                this.setInfoList();
                this.setInfoDown();
            }
        };
        HXH_WonderlandFruitBag.prototype.onBtnSell = function () {
            var _this = this;
            this.itemId = this.info.goodsId;
            zj.loadUI(zj.PackagePopSell)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(_this);
            });
        };
        HXH_WonderlandFruitBag.prototype.onBtnUse = function () {
            var _this = this;
            this.itemId = this.info.goodsId;
            zj.loadUI(zj.PackagePopUse)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(_this);
            });
        };
        HXH_WonderlandFruitBag.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HXH_WonderlandFruitBag.prototype.onListChangeTap = function (e) {
            if (e.itemIndex == this.itemIndex)
                return;
            var item = this.listFruitBag.getElementAt(e.itemIndex);
            var data = this.listFruitBagData.getItemAt(e.itemIndex);
            this.index = data.index;
            this.info = this.infos[this.index];
            this.setInfoDown();
            // this.listFruitBagData.replaceItemAt(data, e.itemIndex);
            // this.listFruitBagData.replaceItemAt(data, this.itemIndex);
            this.listFruitBagData.itemUpdated(this.listFruitBagData.source[e.itemIndex]);
            this.listFruitBagData.itemUpdated(this.listFruitBagData.source[this.itemIndex]);
            this.itemIndex = e.itemIndex;
        };
        return HXH_WonderlandFruitBag;
    }(zj.Dialog));
    zj.HXH_WonderlandFruitBag = HXH_WonderlandFruitBag;
    __reflect(HXH_WonderlandFruitBag.prototype, "zj.HXH_WonderlandFruitBag");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_WonderlandFruitBag.js.map