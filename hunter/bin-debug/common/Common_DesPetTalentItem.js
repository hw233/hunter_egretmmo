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
    //  宠物天赋
    //  2019/1/16
    //  wangshenzhuo
    var Common_DesPetTalentItem = (function (_super) {
        __extends(Common_DesPetTalentItem, _super);
        function Common_DesPetTalentItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_DesPetTalentItemSkin.exml";
            zj.cachekeys(zj.UIResource["Common_DesPetTalentItem"], null);
            return _this;
        }
        Common_DesPetTalentItem.prototype.dataChanged = function () {
            var id = this.data.id;
            var petID = this.data.petid;
            var talentIndex = this.data.talentIndex;
            //  let des = PlayerTalentSystem.Des(this.data.skill,1);
            if (talentIndex == 1) {
                var des = zj.PlayerTalentSystem.Des(this.data.skill, 1);
                if (id == 0 && zj.PlayerAdviserSystem.GetPet(petID)) {
                    this.rectLabel.visible = false;
                    this.labelPropetyChange.textFlow = zj.Util.RichText(des + zj.TextsConfig.TextsConfig_Adviser.attri_talent_get);
                }
                else if (id == 0 && !zj.PlayerAdviserSystem.GetPet(petID)) {
                    this.labelPropetyChange.textFlow = zj.Util.RichText(des + zj.TextsConfig.TextsConfig_Adviser.attri_talent_don_get);
                }
                else if (id > zj.Game.PlayerAdviserSystem.petMap[petID].step) {
                    this.labelPropetyChange.textFlow = zj.Util.RichText(zj.Helper.StringFormat(des + zj.TextsConfig.TextsConfig_Adviser.attri_talent, id));
                }
                else if (id <= zj.Game.PlayerAdviserSystem.petMap[petID].step) {
                    this.rectLabel.visible = false;
                    this.labelPropetyChange.textFlow = zj.Util.RichText(des + zj.TextsConfig.TextsConfig_Adviser.attri_talent_get);
                }
            }
            else {
                var attri = null;
                var str = null;
                var des = null;
                if (zj.TablePetSkill.Item(this.data.skill).type != 1) {
                    if (zj.TablePetSkill.Item(this.data.skill).type == 2) {
                        des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_passive[zj.TablePetSkill.Item(this.data.skill).type], zj.TablePetSkill.Item(this.data.skill).rand[0]);
                    }
                    else {
                        des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_passive[zj.TablePetSkill.Item(this.data.skill).type], zj.TablePetSkill.Item(this.data.skill).value);
                    }
                }
                else {
                    attri = zj.TablePetSkill.Item(this.data.skill).attri_add;
                    str = zj.TextsConfig.TextsConfig_Potato.AttriStr[attri[0] - 1];
                    des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.darkland, str, attri[1]);
                }
                if (id == 0 && zj.PlayerAdviserSystem.GetPet(petID)) {
                    this.rectLabel.visible = false;
                    this.labelPropetyChange.textFlow = zj.Util.RichText(des + zj.TextsConfig.TextsConfig_Adviser.attri_talent_get);
                }
                else if (id == 0 && !zj.PlayerAdviserSystem.GetPet(petID)) {
                    this.labelPropetyChange.textFlow = zj.Util.RichText(des + zj.TextsConfig.TextsConfig_Adviser.attri_talent_don_get);
                }
                else if (id > zj.Game.PlayerAdviserSystem.petMap[petID].step) {
                    this.labelPropetyChange.textFlow = zj.Util.RichText(zj.Helper.StringFormat(des + zj.TextsConfig.TextsConfig_Adviser.attri_talent, id));
                }
                else if (id <= zj.Game.PlayerAdviserSystem.petMap[petID].step) {
                    this.rectLabel.visible = false;
                    this.labelPropetyChange.textFlow = zj.Util.RichText(des + zj.TextsConfig.TextsConfig_Adviser.attri_talent_get);
                }
            }
            this.rectLabel.height = this.labelPropetyChange.height;
        };
        return Common_DesPetTalentItem;
    }(eui.ItemRenderer));
    zj.Common_DesPetTalentItem = Common_DesPetTalentItem;
    __reflect(Common_DesPetTalentItem.prototype, "zj.Common_DesPetTalentItem");
    //子项数据源
    var PetInfoskill = (function () {
        function PetInfoskill() {
        }
        return PetInfoskill;
    }());
    zj.PetInfoskill = PetInfoskill;
    __reflect(PetInfoskill.prototype, "zj.PetInfoskill");
})(zj || (zj = {}));
//# sourceMappingURL=Common_DesPetTalentItem.js.map