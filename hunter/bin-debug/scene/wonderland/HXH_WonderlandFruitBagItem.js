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
    var HXH_WonderlandFruitBagItem = (function (_super) {
        __extends(HXH_WonderlandFruitBagItem, _super);
        // private index: number;
        // private info: message.GoodsInfo;
        // private father: HXH_WonderlandFruitBag;
        function HXH_WonderlandFruitBagItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/HXH_WonderlandFruitBagItemSkin.exml";
            return _this;
        }
        HXH_WonderlandFruitBagItem.prototype.dataChanged = function () {
            this.init();
            this.updateView(this.data);
        };
        HXH_WonderlandFruitBagItem.prototype.init = function () {
            this.groupClose.visible = true;
            this.imgBoard.visible = true;
            this.imgIcon.visible = true;
            this.labelNum.visible = true;
            this.labelNumID.visible = true;
            this.imgPoint.visible = false;
        };
        HXH_WonderlandFruitBagItem.prototype.updateView = function (data) {
            this.setInfoItem();
        };
        HXH_WonderlandFruitBagItem.prototype.setInfoItem = function () {
            if (this.data.info.goodsId == 0 || this.data.info.goodsId == null) {
                this.groupClose.visible = false;
                return;
            }
            var itemSet = zj.PlayerItemSystem.Set(this.data.info.goodsId, this.data.info.showType, this.data.info.count);
            this.labelNumID.text = itemSet.FruitID;
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.imgBoard.source = zj.cachekey(itemSet.Frame, this);
            this.labelNum.text = itemSet.Count;
            this.imgPoint.visible = false;
            this.SetSelect();
        };
        HXH_WonderlandFruitBagItem.prototype.SetSelect = function () {
            if (this.selected && !this.getChildByName("ani")) {
                this.addAnimation();
            }
            else {
                var last = this.getChildByName("ani");
                if (last)
                    this.removeChild(last);
            }
        };
        HXH_WonderlandFruitBagItem.prototype.addAnimation = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                .then(function (display) {
                display.x = _this.imgBoard.x + _this.imgBoard.width / 2;
                display.y = _this.imgBoard.y + _this.imgBoard.height / 2;
                display.name = "ani";
                _this.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        return HXH_WonderlandFruitBagItem;
    }(eui.ItemRenderer));
    zj.HXH_WonderlandFruitBagItem = HXH_WonderlandFruitBagItem;
    __reflect(HXH_WonderlandFruitBagItem.prototype, "zj.HXH_WonderlandFruitBagItem");
    var HXH_WonderlandFruitBagItemData = (function () {
        function HXH_WonderlandFruitBagItemData() {
        }
        return HXH_WonderlandFruitBagItemData;
    }());
    zj.HXH_WonderlandFruitBagItemData = HXH_WonderlandFruitBagItemData;
    __reflect(HXH_WonderlandFruitBagItemData.prototype, "zj.HXH_WonderlandFruitBagItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_WonderlandFruitBagItem.js.map