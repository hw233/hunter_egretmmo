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
     * @author xing li wei
     *
     * @date 2018-1-3
     *
     * @class 猎人收藏List子项
     */
    var HunterCollectionItem = (function (_super) {
        __extends(HunterCollectionItem, _super);
        function HunterCollectionItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterCollectionItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterCollectionItem"], null);
            return _this;
        }
        /** 数据源刷新被动执行 */
        HunterCollectionItem.prototype.dataChanged = function () {
            var data = this.data;
            /** 专属主题最后一项 */
            var isSpecial = (data.fatherIndex == 2 && data.index == 2);
            this.imgDashed.source = zj.cachekey("ui_darkland_relic_Line1_png", this);
            this.groupIcon.visible = isSpecial;
            this.labelSkillName.visible = isSpecial;
            this.labelInfo.visible = isSpecial;
            this.imgProperty.visible = !isSpecial;
            this.labelPlayerInfo.visible = !isSpecial;
            var level = 0;
            var step = 0;
            var equipInfo = zj.Game.PlayerHunterSystem.queryHunter(data.generalId).equipInfo;
            for (var i = 0; i < equipInfo.length; i++) {
                var v = equipInfo[i];
                if (v.equipId == data.equipId) {
                    level = (v.level == 0 || v.level == null) ? 1 : v.level;
                    step = (v.step == 0 || v.step == null) ? 1 : v.step;
                }
            }
            if (level == 0 || level == null) {
                level = 1;
            }
            if (step == 0 || step == null) {
                step = 1;
            }
            var baseEquipInfo = zj.TableGeneralEquip.Item(data.equipId);
            var baseEquipAttriMain = zj.TableGeneralEquipAttri.Item(baseEquipInfo.main_attri);
            var baseEquipAttri1 = zj.TableGeneralEquipAttri.Item(baseEquipInfo.add_attri_one);
            var baseEquipAttri2 = zj.TableGeneralEquipAttri.Item(baseEquipInfo.add_attri_two);
            var attriMainNumber = zj.PlayerHunterSystem.equipGetLevelAttribute(baseEquipAttriMain.attri_id, level);
            var attri1Number = zj.PlayerHunterSystem.equipGetStepAttribute(baseEquipAttri1.attri_id, step);
            var attri2Number = null;
            if (baseEquipAttri2 != null) {
                attri2Number = zj.PlayerHunterSystem.equipGetStepAttribute(baseEquipAttri2.attri_id, step);
            }
            if (isSpecial == false) {
                var _a = [0, null], attriType = _a[0], text = _a[1];
                if (data.index == 0) {
                    attriType = baseEquipAttriMain.attri_type - 1;
                    text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.Attri[attriType], attriMainNumber);
                }
                else if (data.index == 1) {
                    attriType = baseEquipAttri1.attri_type - 1;
                    text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.Attri1[attriType], attri1Number);
                }
                else if (data.index == 2) {
                    attriType = baseEquipAttri2.attri_type - 1;
                    text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.Attri1[attriType], attri2Number);
                }
                this.labelPlayerInfo.textFlow = zj.Util.RichText(text);
                var path = zj.UIConfig.UIConfig_Hunter_Equip.collection[attriType];
                this.imgProperty.source = zj.cachekey(path, this);
            }
            else {
                var skillId = baseEquipInfo.skillId;
                var skillLevel = baseEquipInfo.skillLevel[step - 1];
                var talentDes1 = zj.PlayerHunterSystem.GetPassiveSkillDes(skillId[0], skillLevel - 1)[0];
                var talentDes2 = (skillId.length == 2 ? zj.PlayerHunterSystem.GetPassiveSkillDes(skillId[1], skillLevel - 1) : [null])[0];
                this.labelInfo.textFlow = skillId.length == 2 ? zj.Util.RichText(talentDes1 + talentDes2) : zj.Util.RichText(talentDes1);
                var framePath = zj.UIConfig.UIConfig_Hunter_Equip.itemFrame[skillLevel - 1];
                var baseTalentInfo = zj.TableGeneralTalent.Item(skillId[0]);
                var skillPath = baseTalentInfo.path;
                this.imgFrame.source = zj.cachekey(framePath, this);
                this.imgSkill.source = zj.cachekey(skillPath, this);
                this.labelSkillLevel.text = skillLevel.toString();
                this.labelSkillName.text = baseTalentInfo.talent_name;
            }
        };
        return HunterCollectionItem;
    }(eui.ItemRenderer));
    zj.HunterCollectionItem = HunterCollectionItem;
    __reflect(HunterCollectionItem.prototype, "zj.HunterCollectionItem");
    var HunterCollectionItemData = (function () {
        function HunterCollectionItemData() {
        }
        return HunterCollectionItemData;
    }());
    zj.HunterCollectionItemData = HunterCollectionItemData;
    __reflect(HunterCollectionItemData.prototype, "zj.HunterCollectionItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCollectionItem.js.map