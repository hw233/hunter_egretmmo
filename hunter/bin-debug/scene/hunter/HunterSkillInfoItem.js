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
         * @author chen xi
         * @date 2018-12-23
         * @class 猎人技能等级描述
         */
    var HunterSkillInfoItem = (function (_super) {
        __extends(HunterSkillInfoItem, _super);
        function HunterSkillInfoItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterSkillInfoItemSkin.exml";
            _this.labelLevel.lineSpacing = 4;
            zj.cachekeys(zj.UIResource["HunterSkillInfoItem"], null);
            return _this;
        }
        HunterSkillInfoItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HunterSkillInfoItem.prototype.updateView = function (data) {
            if (data.vis != null && data.vis == true) {
                this.SetBreakMax();
            }
            else if (data.vis != null && data.vis == false) {
                this.SetStarMax();
            }
            else {
                this.labelLevel.visible = true;
                this.labelLevel.text = "Lv." + data.level.toString();
                this.labelDes.textFlow = zj.Util.RichText(data.info);
                this.labelLevel.alpha = (data.isFade) ? 1.0 : 100 / 255;
                this.labelDes.alpha = (data.isFade) ? 1.0 : 100 / 255;
                this.height = this.labelDes.textHeight + 10;
            }
        };
        HunterSkillInfoItem.prototype.SetBreakMax = function () {
            this.labelLevel.visible = false;
            this.labelDes.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter.level_break_max);
            this.labelDes.alpha = 1;
        };
        HunterSkillInfoItem.prototype.SetStarMax = function () {
            this.labelLevel.visible = false;
            this.labelDes.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter.level_star_max);
            this.labelDes.alpha = 1;
        };
        return HunterSkillInfoItem;
    }(eui.ItemRenderer));
    zj.HunterSkillInfoItem = HunterSkillInfoItem;
    __reflect(HunterSkillInfoItem.prototype, "zj.HunterSkillInfoItem");
    var HunterSkillInfoItemData = (function () {
        function HunterSkillInfoItemData() {
            this.isFade = false;
        }
        return HunterSkillInfoItemData;
    }());
    zj.HunterSkillInfoItemData = HunterSkillInfoItemData;
    __reflect(HunterSkillInfoItemData.prototype, "zj.HunterSkillInfoItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterSkillInfoItem.js.map