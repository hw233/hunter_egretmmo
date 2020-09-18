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
    var HunterPsychicGroupIllustrateItem = (function (_super) {
        __extends(HunterPsychicGroupIllustrateItem, _super);
        function HunterPsychicGroupIllustrateItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterPsychicGroupIllustrateItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterPsychicGroupIllustrateItem"], null);
            return _this;
        }
        HunterPsychicGroupIllustrateItem.prototype.dataChanged = function () {
            var info = this.data;
            this.imgIcon.source = zj.cachekey(info.path, this);
            this.labelName.text = info.name;
            var des = zj.PlayerHunterSystem.GetPassiveSkillDes(info.group_talent, 1)[0];
            this.labelGroup.textFlow = zj.Util.RichText(des);
            var _a = zj.PlayerHunterSystem.GetPsychicGroupAttriType(info.psychic_id), str = _a[1];
            this.labelIncludes.text = str;
        };
        return HunterPsychicGroupIllustrateItem;
    }(eui.ItemRenderer));
    zj.HunterPsychicGroupIllustrateItem = HunterPsychicGroupIllustrateItem;
    __reflect(HunterPsychicGroupIllustrateItem.prototype, "zj.HunterPsychicGroupIllustrateItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicGroupIllustrateItem.js.map