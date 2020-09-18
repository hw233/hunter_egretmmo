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
 * @date 2018-12-23
 *
 * @class 猎人技能item
 */
    var HunterSkillItem = (function (_super) {
        __extends(HunterSkillItem, _super);
        function HunterSkillItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterSkillItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterSkillItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                // (this.data as HunterSkillItemData).father.onItemTap(true, this.data);
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                // (this.data as HunterSkillItemData).father.onItemTap(false, this.data);
            }, _this);
            return _this;
        }
        HunterSkillItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HunterSkillItem.prototype.SetSelect = function (sel) {
            var data = this.data;
            this.imgBoard.visible = sel;
            this.imgSelected.visible = sel;
            if (sel && data.index != 3) {
                this.imgAwake.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.frameSkillSel, this);
            }
            else if (!sel && data.index != 3) {
                this.imgAwake.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.frameSkillNor, this);
            }
        };
        HunterSkillItem.prototype.updateView = function (data) {
            data.father.subitem = this;
            this.imgBoard.visible = false;
            this.imgActivity.visible = false;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(data.generalId);
            this.labelLevel.visible = true;
            var iconPath = "";
            var framePath = "ui_frame_FrameSkill_png";
            this.imgSelected.source = zj.cachekey(zj.UIConfig.UIConfig_Activity_Battle.spriteframe[2], this);
            if (data.index == 2) {
                this.labelLevel.text = hunterInfo.passives[0].level.toString();
                iconPath = zj.TableGeneralTalent.Item(data.skillId).path;
                this.imgIocnAwaken.visible = false;
                this.imgTransformLvNum.visible = false;
            }
            else if (data.index == 3) {
                this.labelLevel.visible = (hunterInfo.awakePassive.level != 0);
                this.labelLevel.text = hunterInfo.awakePassive.level.toString();
                this.imgActivity.visible = (hunterInfo.awakePassive.level == 0);
                iconPath = zj.TableGeneralTalent.Item(data.skillId).path;
                this.imgTransformLvNum.visible = false;
                this.imgIocnAwaken.visible = false;
            }
            else if (data.index == 4) {
                this.labelLevel.visible = false;
                this.imgTransformLvNum.visible = (true);
                this.imgTransformLvNum.source = zj.cachekey(zj.UIConfig.UIConfig_Activity_Battle.skill_level[hunterInfo.transfer_level], this);
                iconPath = (zj.TableGeneralTalent.Item(data.skillId).path); //table_general_talent
                // this.level = genInfo.transfer_level
                // this.imgFrame:setZOrder(4)
                this.imgSelected.source = zj.cachekey(zj.UIConfig.UIConfig_Activity_Battle.spriteframe[1], this);
                this.imgIocnAwaken.visible = (false);
                framePath = zj.UIConfig.UIConfig_Activity_Battle.skillFrame;
            }
            else {
                this.labelLevel.text = hunterInfo.skills[data.index].level.toString();
                iconPath = zj.TableGeneralSkill.Item(data.skillId).path;
                this.imgTransformLvNum.visible = false;
                this.imgIocnAwaken.visible = false;
            }
            if (data.index == 3 && hunterInfo.awakePassive.level == 0) {
                zj.Helper.SetImageFilterColor(this.imgIcon, 'gray');
            }
            else {
                zj.Helper.SetImageFilterColor(this.imgIcon);
            }
            var typePath = zj.UIConfig.UIConfig_General.hunter_skillType[data.index];
            this.imgIcon.source = zj.cachekey(iconPath, this);
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgTypeIcon.source = zj.cachekey(typePath, this);
            this.imgSelected.visible = data.isSelected;
            this.imgAwake.visible = (data.index == 3);
            this.imgTypeIcon.visible = (data.index != 0);
        };
        return HunterSkillItem;
    }(eui.ItemRenderer));
    zj.HunterSkillItem = HunterSkillItem;
    __reflect(HunterSkillItem.prototype, "zj.HunterSkillItem");
    var HunterSkillItemData = (function () {
        function HunterSkillItemData() {
            this.index = null;
            this.generalId = null;
            this.skillId = null;
            this.isSelected = false;
        }
        return HunterSkillItemData;
    }());
    zj.HunterSkillItemData = HunterSkillItemData;
    __reflect(HunterSkillItemData.prototype, "zj.HunterSkillItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterSkillItem.js.map