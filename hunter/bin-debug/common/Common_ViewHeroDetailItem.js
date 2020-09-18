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
     *
     * @date 2018-12-1
     *
     * @class 长按详情Item
     */
    var Common_ViewHeroDetailItem = (function (_super) {
        __extends(Common_ViewHeroDetailItem, _super);
        function Common_ViewHeroDetailItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_ViewHeroDetailItemSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                _this.touchBegin(_this.data, e);
            }, _this);
            return _this;
        }
        Common_ViewHeroDetailItem.prototype.touchBegin = function (data, e) {
            data.father.showSkill(data, this.itemIndex, this.level, e.stageX);
        };
        Common_ViewHeroDetailItem.prototype.dataChanged = function () {
            this.spriteSel.visible = false;
            this.spriteAwake.visible = false;
            this.spriteIconAwaken.visible = false;
            this.spriteActivity.visible = false;
            this.spriteFrame.source = zj.cachekey("ui_frame_FrameSkill_png", this);
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.data.generalId);
            var iconPath = "";
            if (this.data.index == 3) {
                this.level = hunterInfo.passives[0].level;
                iconPath = zj.TableGeneralTalent.Item(this.data.skillId).path;
            }
            else if (this.data.index == 4) {
                this.level = hunterInfo.awakePassive.level;
                if (hunterInfo.awakePassive.level == 0) {
                    this.labelNum.visible = false;
                    this.spriteActivity.visible = true;
                }
                else {
                    this.labelNum.visible = true;
                    // to do
                }
                this.spriteAwake.visible = true;
                this.spriteIconAwaken.visible = false;
                iconPath = zj.TableGeneralTalent.Item(this.data.skillId).path;
            }
            else {
                this.level = hunterInfo.skills[this.data.index].level;
                iconPath = zj.TableGeneralSkill.Item(this.data.skillId).path;
            }
            this.spriteIcon.source = zj.cachekey(iconPath, this);
            this.labelNum.text = String(this.level);
        };
        return Common_ViewHeroDetailItem;
    }(eui.ItemRenderer));
    zj.Common_ViewHeroDetailItem = Common_ViewHeroDetailItem;
    __reflect(Common_ViewHeroDetailItem.prototype, "zj.Common_ViewHeroDetailItem");
    var Common_ViewHeroDetailItemData = (function () {
        function Common_ViewHeroDetailItemData() {
        }
        return Common_ViewHeroDetailItemData;
    }());
    zj.Common_ViewHeroDetailItemData = Common_ViewHeroDetailItemData;
    __reflect(Common_ViewHeroDetailItemData.prototype, "zj.Common_ViewHeroDetailItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ViewHeroDetailItem.js.map