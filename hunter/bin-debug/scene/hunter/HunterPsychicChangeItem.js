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
     * @author chen xi.
     *
     * @date 2019-1-14
     *
     * @class 念力修炼属性变化子项
     */
    var HunterPsychicChangeItem = (function (_super) {
        __extends(HunterPsychicChangeItem, _super);
        function HunterPsychicChangeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterPsychicChangeItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterPsychicChangeItem"], null);
            return _this;
        }
        HunterPsychicChangeItem.prototype.dataChanged = function () {
            var info = this.data;
            var firstValue = Number(info[0]);
            var name = zj.TextsConfig.TextsConfig_Hunter_psychic.attri_type[firstValue];
            var type = zj.TextsConfig.TextsConfig_Hunter_psychic.attri_type_type[firstValue];
            var str = "";
            var secondValue = info[1];
            var lastValue = info[2];
            if (lastValue == null || lastValue == undefined || lastValue == 0) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_psychic.psychic_no_change, name, secondValue + type);
            }
            else if (lastValue > 0) {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_psychic.psychic_add, name, secondValue + type, lastValue + type);
            }
            else {
                str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_psychic.psychic_sub, name, secondValue + type, lastValue + type);
            }
            this.labelInfo.textFlow = zj.Util.RichText(str);
        };
        return HunterPsychicChangeItem;
    }(eui.ItemRenderer));
    zj.HunterPsychicChangeItem = HunterPsychicChangeItem;
    __reflect(HunterPsychicChangeItem.prototype, "zj.HunterPsychicChangeItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicChangeItem.js.map