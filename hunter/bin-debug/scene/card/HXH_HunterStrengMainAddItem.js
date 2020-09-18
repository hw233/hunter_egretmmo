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
     * @class 卡片注入念力 注入方式Item
     *
     * @author LianLei
     *
     * @date
     */
    var HXH_HunterStrengMainAddItem = (function (_super) {
        __extends(HXH_HunterStrengMainAddItem, _super);
        function HXH_HunterStrengMainAddItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/card/HXH_HunterStrengMainAddItemSkin.exml";
            _this.imgAddSkillMeterials.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddMeterials, _this);
            zj.cachekeys(zj.UIResource["HXH_HunterStrengMainAddItem"], null);
            _this.imgSelect.visible = false;
            return _this;
        }
        HXH_HunterStrengMainAddItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HXH_HunterStrengMainAddItem.prototype.updateView = function (data) {
            this.goodsId = data.goodsId;
            this.count = data.count;
            if (data.goodsId != 0) {
                var itemSet = zj.PlayerItemSystem.Set(data.goodsId);
                var curCount = zj.Game.PlayerItemSystem.itemCount(data.goodsId);
                this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
                this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                if (curCount >= data.count) {
                    this.labelName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_up_have, curCount, data.count));
                    this.imgAddSkillMeterials.visible = false;
                }
                else {
                    this.labelName.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Card.card_up_no, curCount, data.count));
                    this.imgAddSkillMeterials.visible = true;
                }
                // this.groupMeterials.visible = curCount < data.count;
            }
            this.imgFloor.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_Enchant_board[data.id], this);
            this.imgMark.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_Enchant_name[data.id], this);
            this.imgSelect.visible = this.selected;
            this.imgBigonName.visible = this.selected;
        };
        HXH_HunterStrengMainAddItem.prototype.onBtnAddMeterials = function () {
            var _this = this;
            if (this.goodsId != 0) {
                var itemSet = zj.PlayerItemSystem.Set(this.goodsId);
                var curCount = zj.Game.PlayerItemSystem.itemCount(this.goodsId);
                if (curCount < this.count) {
                    zj.loadUI(zj.Common_OutPutDialog).then(function (dialog) {
                        dialog.setInfo(_this.goodsId, _this);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
        };
        return HXH_HunterStrengMainAddItem;
    }(eui.ItemRenderer));
    zj.HXH_HunterStrengMainAddItem = HXH_HunterStrengMainAddItem;
    __reflect(HXH_HunterStrengMainAddItem.prototype, "zj.HXH_HunterStrengMainAddItem");
    var HXH_HunterStrengMainAddItemData = (function () {
        function HXH_HunterStrengMainAddItemData() {
        }
        return HXH_HunterStrengMainAddItemData;
    }());
    zj.HXH_HunterStrengMainAddItemData = HXH_HunterStrengMainAddItemData;
    __reflect(HXH_HunterStrengMainAddItemData.prototype, "zj.HXH_HunterStrengMainAddItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_HunterStrengMainAddItem.js.map