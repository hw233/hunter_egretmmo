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
    // Common_DesAward
    // wangshenzhuo
    // 2019.05.13
    var Common_DesAward = (function (_super) {
        __extends(Common_DesAward, _super);
        function Common_DesAward() {
            var _this = _super.call(this) || this;
            _this.selectedIndex = 0;
            _this.skinName = "resource/skins/common/Common_DesAwardSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            return _this;
        }
        Common_DesAward.prototype.setInfoActivity = function (goods) {
            this.listViewAward.selectedIndex = 0; // 默认选中
            this.listViewAward.itemRenderer = zj.Common_AwardItem; //
            this.selectedItem = new eui.ArrayCollection();
            for (var k in goods) {
                var v = goods[k];
                var data = new zj.Common_AwardItemData();
                data.index = Number(k);
                data.goodInfo = v;
                data.father = this;
                data.typeIndex = 1;
                this.selectedItem.addItem(data);
            }
            this.listViewAward.dataProvider = this.selectedItem;
            this.selectedIndex = this.listViewAward.selectedIndex;
        };
        // 鼠标点击 物品详情
        Common_DesAward.prototype.onChooseItemTap = function (isTouchBegin, data) {
            var _this = this;
            var _type = zj.PlayerItemSystem.ItemType(data.goodInfo.goodsId);
            var dialog = this.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupMain.removeChild(dialog);
            var posY = 80;
            var posX;
            var index = data.index;
            posX = -75 + index * 125;
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goodInfo.goodsId, data.goodInfo.count);
                        _this.groupMain.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goodInfo.goodsId, data.goodInfo.count);
                        _this.groupMain.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goodInfo.goodsId, data.goodInfo.count);
                        _this.groupMain.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.init(data.goodInfo.goodsId, data.goodInfo.count);
                        _this.groupMain.addChild(dialog);
                    });
                }
            }
        };
        //鼠标抬起，移除 物品详情
        Common_DesAward.prototype.onRemoveAward = function () {
            var dialog = this.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupMain.removeChild(dialog);
        };
        Common_DesAward.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return Common_DesAward;
    }(zj.Dialog));
    zj.Common_DesAward = Common_DesAward;
    __reflect(Common_DesAward.prototype, "zj.Common_DesAward");
})(zj || (zj = {}));
//# sourceMappingURL=Common_DesAward.js.map