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
    // 背包-物品使用-礼盒
    // lizhengqiang
    // 2018/11/27
    var PackageMainPop = (function (_super) {
        __extends(PackageMainPop, _super);
        function PackageMainPop() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.max = 0;
            _this.count = 1;
            _this.goodsList = [];
            _this.isUpdate = false;
            _this.update = function () {
                _this.isUpdate = true;
                _this.max = zj.Game.PlayerItemSystem.itemCount(_this.itemId);
                if (_this.max == 0)
                    _this.onBtnClose();
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pakage.use, _this.config["name"], _this.max).replace(/[ \r\n\t\v]/g, "");
                _this.lbOwn.textFlow = zj.Util.RichText(str);
                _this.count = 1;
                _this.lbCount.text = _this.count.toString();
            };
            _this.skinName = "resource/skins/package/PackageMainPopSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.lstPop.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstSelectedItem, _this);
            _this.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMin, _this);
            _this.btnMinus.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMinus, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdd, _this);
            _this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMax, _this);
            _this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUse, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                _this.father = null;
            }, null);
            return _this;
        }
        PackageMainPop.prototype.init = function (father) {
            this.father = father;
            this.lstPop.selectedIndex = 0;
            this.itemId = this.father.itemId;
            this.config = zj.PlayerItemSystem.ItemConfig(this.itemId);
            this.max = zj.Game.PlayerItemSystem.itemCount(this.itemId);
            var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pakage.use, this.config["name"], this.max).replace(/[ \r\n\t\v]/g, "");
            this.lbOwn.textFlow = zj.Util.RichText(str);
            this.setInfoList();
            this.setInfoTip();
        };
        PackageMainPop.prototype.setInfoList = function () {
            for (var i = 0; i < zj.TableItemTransfer.Item(this.itemId).items_id.length; i++) {
                this.goodsList.push({
                    goodsId: zj.TableItemTransfer.Item(this.itemId).items_id[i],
                    count: zj.TableItemTransfer.Item(this.itemId).items_count[i],
                    showType: zj.TableItemTransfer.Item(this.itemId).show_type,
                    index: i
                });
            }
            this.arrayCollection = new eui.ArrayCollection(this.goodsList);
            this.lstPop.dataProvider = this.arrayCollection;
            this.lstPop.itemRenderer = zj.PackageMainPopItemIR;
            this.index = this.lstPop.selectedIndex;
        };
        PackageMainPop.prototype.setInfoTip = function () {
            var type = zj.PlayerItemSystem.Type2(this.goodsList[this.index].goodsId);
            if (type == message.EGoodsType.GOODS_TYPE_FASHION || type == message.EGoodsType.GOODS_TYPE_GENERAL || type == message.EGoodsType.GOODS_TYPE_POTATO) {
                this.group1.visible = false;
                this.lbSelect.visible = true;
                var config = zj.PlayerItemSystem.ItemConfig(this.goodsList[this.index].goodsId);
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pakage.selects, config["name"], this.goodsList[this.lstPop.selectedIndex]["count"]).replace(/[ \r\n\t\v]/g, "");
                this.lbSelect.textFlow = zj.Util.RichText(str);
            }
            else {
                this.group1.visible = true;
                this.lbSelect.visible = false;
                this.lbCount.text = this.count.toString();
            }
        };
        PackageMainPop.prototype.onLstSelectedItem = function (e) {
            if (this.index == this.lstPop.selectedIndex)
                return;
            this.arrayCollection.itemUpdated(this.arrayCollection.source[this.index]);
            this.arrayCollection.itemUpdated(this.arrayCollection.source[this.lstPop.selectedIndex]);
            this.index = this.lstPop.selectedIndex;
            this.setInfoTip();
        };
        PackageMainPop.prototype.onBtnMin = function () {
            this.count = 1;
            this.setInfoTip();
        };
        PackageMainPop.prototype.onBtnMinus = function () {
            if (this.count > 1) {
                this.count = this.count - 1;
                this.setInfoTip();
            }
        };
        PackageMainPop.prototype.onBtnAdd = function () {
            if (this.count < this.max) {
                this.count = this.count + 1;
                this.setInfoTip();
            }
        };
        PackageMainPop.prototype.onBtnMax = function () {
            this.count = this.max;
            this.setInfoTip();
        };
        PackageMainPop.prototype.onBtnUse = function () {
            var _this = this;
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.count = this.count;
            goodsInfo.goodsId = this.itemId;
            goodsInfo.index = this.index;
            goodsInfo.showType = this.goodsList[this.index].showType;
            var type = Math.floor(this.goodsList[this.index].goodsId / 10000);
            if (type == message.EGoodsType.GOODS_TYPE_FASHION || type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                goodsInfo.count = 1;
            }
            zj.Game.PlayerItemSystem.useProp([goodsInfo]).then(function (resp) {
                if (type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonGetGeneral).then(function (dialog) {
                        dialog.setInfo(resp.getGoods[0].goodsId, 0, _this.update);
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.show();
                        dialog.init(resp.getGoods);
                        dialog.setCB(_this.update);
                    });
                }
            });
        };
        PackageMainPop.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        PackageMainPop.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        PackageMainPop.prototype.onBtnClose = function () {
            var _this = this;
            this.close(zj.UI.HIDE_TO_TOP);
            egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300).call(function () { if (_this.isUpdate)
                _this.father.update(); });
        };
        return PackageMainPop;
    }(zj.Dialog));
    zj.PackageMainPop = PackageMainPop;
    __reflect(PackageMainPop.prototype, "zj.PackageMainPop");
})(zj || (zj = {}));
//# sourceMappingURL=PackageMainPop.js.map