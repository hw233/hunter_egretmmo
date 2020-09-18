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
     * 冒险---挑战列表掉落弹窗Item
     * created by Lian Lei
     * 2019.1.25
     */
    var HXH_InstanceEliteDropInfoItem = (function (_super) {
        __extends(HXH_InstanceEliteDropInfoItem, _super);
        function HXH_InstanceEliteDropInfoItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/adventureMap/HXH_InstanceEliteDropInfoItemSkin.exml";
            _this.groupRes.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnTouchBeginIcon, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnTouchEndIcon, _this);
            zj.cachekeys(zj.UIResource["HXH_InstanceEliteDropInfoItem"], null);
            return _this;
        }
        HXH_InstanceEliteDropInfoItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HXH_InstanceEliteDropInfoItem.prototype.updateView = function (data) {
            this.goodsId = data.goodsId;
            var itemSet = zj.PlayerItemSystem.Set(data.goodsId);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.labelNum.text = itemSet.Count;
            this.labelNum.visible = false;
            // this.labelTextInfo.text = data.des;
            if (itemSet.Info.client_star != null) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, itemSet.Info.client_star, 6, null, false, zj.UIConfig.UIConfig_Role.heroAwakenStar[1]);
                ;
            }
        };
        HXH_InstanceEliteDropInfoItem.prototype.onBtnTouchBeginIcon = function (e) {
            var newThis = this;
            var _type = zj.PlayerItemSystem.ItemType(this.data.goodsId);
            var touchX = e.stageX;
            var groupY;
            var type = 0; // type == 1 点击位置大于父类高度的一半
            if (e.stageY >= newThis.data.father.height / 2) {
                groupY = e.stageY - e.localY;
                type = 1;
            }
            else {
                groupY = e.stageY + 10;
            }
            if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                    dialog.name = "Drop";
                    dialog.x = newThis.data.father.x + dialog.width / 2 - 10;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.setInfo(newThis.goodsId, null);
                    newThis.data.father.addChild(dialog);
                });
            }
            else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                    dialog.name = "Drop";
                    dialog.x = newThis.data.father.x + dialog.width / 2 - 10;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.setInfo(newThis.goodsId, null);
                    newThis.data.father.addChild(dialog);
                });
            }
            else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                    dialog.name = "Drop";
                    dialog.x = newThis.data.father.x + dialog.width / 2 - 10;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.setInfo(newThis.goodsId, null);
                    newThis.data.father.addChild(dialog);
                });
            }
            else {
                zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                    dialog.name = "Drop";
                    dialog.x = newThis.data.father.x + dialog.width / 2 - 10;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.init(newThis.goodsId, null);
                    newThis.data.father.addChild(dialog);
                });
            }
        };
        HXH_InstanceEliteDropInfoItem.prototype.onBtnTouchEndIcon = function () {
            this.data.father.onRemoveDialog();
        };
        return HXH_InstanceEliteDropInfoItem;
    }(eui.ItemRenderer));
    zj.HXH_InstanceEliteDropInfoItem = HXH_InstanceEliteDropInfoItem;
    __reflect(HXH_InstanceEliteDropInfoItem.prototype, "zj.HXH_InstanceEliteDropInfoItem");
    var HXH_InstanceEliteDropInfoItemData = (function () {
        function HXH_InstanceEliteDropInfoItemData() {
        }
        return HXH_InstanceEliteDropInfoItemData;
    }());
    zj.HXH_InstanceEliteDropInfoItemData = HXH_InstanceEliteDropInfoItemData;
    __reflect(HXH_InstanceEliteDropInfoItemData.prototype, "zj.HXH_InstanceEliteDropInfoItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstanceEliteDropInfoItem.js.map