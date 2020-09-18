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
     * @date 2019-1-12
     */
    var HunterPsychicGroupIllustrateTitleItem = (function (_super) {
        __extends(HunterPsychicGroupIllustrateTitleItem, _super);
        function HunterPsychicGroupIllustrateTitleItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterPsychicGroupIllustrateTitleItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterPsychicGroupIllustrateTitleItem"], null);
            return _this;
        }
        HunterPsychicGroupIllustrateTitleItem.prototype.dataChanged = function () {
            var num = this.data;
            var chNum = zj.Helper.GetNumCH(num.toString());
            this.labelTitle.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_psychic.psychic_title_str, chNum, chNum);
        };
        return HunterPsychicGroupIllustrateTitleItem;
    }(eui.ItemRenderer));
    zj.HunterPsychicGroupIllustrateTitleItem = HunterPsychicGroupIllustrateTitleItem;
    __reflect(HunterPsychicGroupIllustrateTitleItem.prototype, "zj.HunterPsychicGroupIllustrateTitleItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicGroupIllustrateTitleItem.js.map