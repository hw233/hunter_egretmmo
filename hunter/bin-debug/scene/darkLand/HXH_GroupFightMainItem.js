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
    // HXH_GroupFightMainItem
    // wangshenzhuo
    // 2019/03/06
    var HXH_GroupFightMainItem = (function (_super) {
        __extends(HXH_GroupFightMainItem, _super);
        function HXH_GroupFightMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/darkLand/HXH_GroupFightMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_GroupFightMainItem"], null);
            return _this;
        }
        HXH_GroupFightMainItem.prototype.dataChanged = function () {
            var open = this.data.id < zj.PlayerGroupFightSystem.GetMaxCustomsByIndex(zj.PlayerGroupFightSystem.fightGroupExt);
            this.buttonLevel.touchEnabled = false;
            this.imageSelected.visible = false;
            if (open) {
                zj.Set.ButtonBackgroud(this.buttonLevel, zj.UIConfig.UIConfig_Hunter_GroupFight.chooseOpen[1]);
                this.buttonLevel.touchEnabled = true;
                if (this.selected) {
                    zj.Set.ButtonBackgroud(this.buttonLevel, zj.UIConfig.UIConfig_Hunter_GroupFight.chooseOpen[1]);
                }
                else {
                    zj.Set.ButtonBackgroud(this.buttonLevel, zj.UIConfig.UIConfig_Hunter_GroupFight.chooseOpen[0]);
                }
            }
            else {
                zj.Set.ButtonBackgroud(this.buttonLevel, zj.UIConfig.UIConfig_Hunter_GroupFight.chooseUnOpen[0]);
                this.buttonLevel.touchEnabled = false;
            }
            this.imageLock.visible = !open;
            this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.hard, this.data.index % 10000);
            this.SetInfoSelect(this.data.index == this.data.father.hardIndex % 10000);
        };
        HXH_GroupFightMainItem.prototype.SetInfoSelect = function (select) {
        };
        return HXH_GroupFightMainItem;
    }(eui.ItemRenderer));
    zj.HXH_GroupFightMainItem = HXH_GroupFightMainItem;
    __reflect(HXH_GroupFightMainItem.prototype, "zj.HXH_GroupFightMainItem");
    //子项数据源
    var HXH_GroupFightMainItemData = (function () {
        function HXH_GroupFightMainItemData() {
        }
        return HXH_GroupFightMainItemData;
    }());
    zj.HXH_GroupFightMainItemData = HXH_GroupFightMainItemData;
    __reflect(HXH_GroupFightMainItemData.prototype, "zj.HXH_GroupFightMainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GroupFightMainItem.js.map