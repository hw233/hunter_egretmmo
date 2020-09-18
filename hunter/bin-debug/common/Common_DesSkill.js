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
     * @date 2018-12-4
     *
     * @class 长按列表item点击显示技能详情界面
     */
    var Common_DesSkill = (function (_super) {
        __extends(Common_DesSkill, _super);
        function Common_DesSkill() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_DesSkillSkin.exml";
            return _this;
        }
        /**
         * 设置技能信息 （自动技能，手动技能）
         * @param skillId 技能ID
         * @param index 索引下标 0 - 1
         * @param level 技能等级
         */
        Common_DesSkill.prototype.setInfoSkill = function (skillId, index, level) {
            var skillInfo = zj.TableGeneralSkill.Item(skillId);
            this.labelTextName.text = skillInfo.skill_name;
            this.labelTextInfo.text = skillInfo.skill_des;
            var framePath = zj.UIConfig.UIConfig_Role.itemFrame[skillInfo.quality - 1];
            var iconPath = skillInfo.path;
            this.spriteFrame.source = zj.cachekey(framePath, this);
            this.spriteIcon.source = zj.cachekey(iconPath, this);
            if (level == null || level == 0) {
                this.labelTextLevel.text = "";
            }
            else {
                this.labelTextLevel.text = level.toString();
            }
            if (index != null) {
                this.labelTextType.text = zj.TextsConfig.TextsConfig_Hunter.skill_type[index];
            }
            else {
                this.labelTextType.text = "";
            }
        };
        /**
         * 设置技能信息 （被动技能，觉醒技能）
         * @param talentId 天赋表ID
         * @param generalId 武将ID
         * @param index 索引 （2-3）
         * @param level 技能等级
         */
        Common_DesSkill.prototype.setInfoLevelSkill = function (talentId, generalId, index, level, biograyShow) {
            if (level === void 0) { level = 0; }
            var info = zj.TableGeneralTalent.Item(talentId);
            if (biograyShow) {
                level = 0;
            }
            else {
                if (level == 0) {
                    var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
                    if (hunterInfo == null)
                        return;
                    if (index == 2) {
                        level = hunterInfo.passives[0].level;
                    }
                    else if (index == 3) {
                        level = hunterInfo.awakePassive.level;
                    }
                }
            }
            this.labelTextName.text = info.talent_name;
            var framePath = zj.UIConfig.UIConfig_Role.itemFrame[info.talent_quality];
            var iconPath = info.path;
            this.spriteFrame.source = zj.cachekey(framePath, this);
            this.spriteIcon.source = zj.cachekey(iconPath, this);
            if (index != null) {
                this.labelTextType.text = zj.TextsConfig.TextsConfig_Hunter.skill_type[index];
            }
            else {
                this.labelTextType.text = "";
            }
            if (level != null && level != 0) {
                var skillInfoList = zj.PlayerHunterSystem.GetSkillEachLvList(generalId, biograyShow);
                var levelDes = skillInfoList[index].upList[level - 1];
                this.labelTextInfo.textFlow = zj.Util.RichText(levelDes);
                this.labelTextLevel.text = String(level);
            }
            else {
                this.labelTextInfo.textFlow = zj.Util.RichText(info.skill_des);
                this.labelTextLevel.text = "1";
            }
        };
        Common_DesSkill.prototype.setInfoRes = function (goodsId, count) {
            var itemSet = zj.PlayerItemSystem.Set(goodsId, 1, count);
            var framePath = itemSet.Frame;
            var iconPath = itemSet.Clip;
            this.spriteFrame.source = zj.cachekey(framePath, this);
            this.spriteIcon.source = zj.cachekey(iconPath, this);
            this.labelTextName.text = itemSet.Info.name;
            this.labelTextType.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.fruit_cnt_label, count);
        };
        /**
         * 设置技能信息 （被动技能，觉醒技能）
         * @param talentId 天赋表ID
         * @param index 索引 （2-3）
         */
        Common_DesSkill.prototype.setInfoTalent = function (talentId, index) {
            var info = zj.TableGeneralTalent.Item(talentId);
            var framePath = zj.PlayerItemSystem.QualityFrame(info.talent_quality);
            var iconPath = info.path;
            var name = info.talent_name;
            var des = zj.PlayerHunterSystem.GetPassiveSkillDesByType(talentId);
            this.spriteFrame.source = zj.cachekey(framePath, this);
            this.spriteIcon.source = zj.cachekey(iconPath, this);
            this.labelTextName.text = name;
            this.labelTextInfo.text = des;
            if (index == 2 || index == 3) {
                this.labelTextType.text = zj.TextsConfig.TextsConfig_Hunter.skill_type[index];
            }
            else {
                this.labelTextType.text = "";
            }
            this.labelTextLevel.text = "1";
        };
        Common_DesSkill.ID = "Common_DesSkill";
        return Common_DesSkill;
    }(zj.UI));
    zj.Common_DesSkill = Common_DesSkill;
    __reflect(Common_DesSkill.prototype, "zj.Common_DesSkill");
})(zj || (zj = {}));
//# sourceMappingURL=Common_DesSkill.js.map