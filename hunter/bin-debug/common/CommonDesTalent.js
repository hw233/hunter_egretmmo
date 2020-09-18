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
     * @date 2019-1-24
     *
     * @class 天赋效果描述
     */
    var CommonDesTalent = (function (_super) {
        __extends(CommonDesTalent, _super);
        function CommonDesTalent() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonDesTalentSkin.exml";
            return _this;
        }
        CommonDesTalent.prototype.setInfoByBreak = function (id, level) {
            var talentInfo = zj.TableGeneralTalent.Item(id);
            if (!talentInfo)
                return;
            var framePath = zj.UIConfig.UIConfig_Role.itemFrame[talentInfo.talent_quality];
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgIcon.source = zj.cachekey(talentInfo.path, this);
            this.labelName.text = talentInfo.talent_name;
            for (var i = 1; i <= 3; i++) {
                var des = zj.PlayerHunterSystem.GetPassiveSkillDes(id, i)[0];
                this["labelType" + i].textFlow = zj.Util.RichText("Lv." + i + " " + des);
                if (i > level) {
                    this["labelType" + i].textColor = 0x9E9E9E;
                }
            }
        };
        return CommonDesTalent;
    }(zj.UI));
    zj.CommonDesTalent = CommonDesTalent;
    __reflect(CommonDesTalent.prototype, "zj.CommonDesTalent");
})(zj || (zj = {}));
//# sourceMappingURL=CommonDesTalent.js.map