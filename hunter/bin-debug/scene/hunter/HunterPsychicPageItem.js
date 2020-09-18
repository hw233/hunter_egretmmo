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
     *
     * @class 猎人念力方案
     */
    var HunterPsychicPageItem = (function (_super) {
        __extends(HunterPsychicPageItem, _super);
        function HunterPsychicPageItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterPsychicPageItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterPsychicPageItem"], null);
            return _this;
        }
        HunterPsychicPageItem.prototype.dataChanged = function () {
            var generalId = this.data;
            this.imgPlan.source = zj.cachekey(zj.UIConfig.UIConfig_Psychic.plan[this.itemIndex + 1], this);
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            // let unLock = Table.FindF(hunterInfo.psychic_pages, (_, _v: message.IIKVPairs) => {
            //     return _v.key == this.itemIndex;
            // });
            // if (this.itemIndex == 0) {
            //     this.imgLock.visible = false;
            // } else {
            //     this.imgLock.visible = !unLock;
            // }
            // this.btnLevel.enabled = unLock;
        };
        return HunterPsychicPageItem;
    }(eui.ItemRenderer));
    zj.HunterPsychicPageItem = HunterPsychicPageItem;
    __reflect(HunterPsychicPageItem.prototype, "zj.HunterPsychicPageItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicPageItem.js.map