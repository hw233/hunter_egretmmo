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
    //  wangshenzhuo
    //  2019/1/16
    var Common_DesPetTalent = (function (_super) {
        __extends(Common_DesPetTalent, _super);
        function Common_DesPetTalent() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_DesPetTalentSkin.exml";
            return _this;
        }
        Common_DesPetTalent.prototype.Load = function (petId, stat, step, talentIndex) {
            this.imgSpriteIcon.source = zj.cachekey(zj.PlayerAdviserSystem.PetBase(petId).skill_Icon[talentIndex + 1], this);
            this.labelTextName.text = zj.PlayerAdviserSystem.PetBase(petId).skill_name[talentIndex + 1];
            if (talentIndex == 1) {
                var talentId = zj.PlayerAdviserSystem.PetBase(petId).skill_normal[step + 1];
                var info = zj.TableGeneralTalent.Item(talentId);
                var tbl = zj.PlayerAdviserSystem.PetBase(petId).skill_normal;
                this.listDes.itemRenderer = zj.Common_DesPetTalentItem;
                this.arrCollectionItem = new eui.ArrayCollection();
                for (var i = 0; i < tbl.length; i++) {
                    var skill = new zj.PetInfoskill();
                    skill.id = i;
                    skill.skill = tbl[i];
                    skill.petid = petId;
                    skill.talentIndex = talentIndex;
                    this.arrCollectionItem.addItem(skill);
                }
                this.listDes.dataProvider = this.arrCollectionItem;
            }
            else {
                var tbl = zj.PlayerAdviserSystem.PetBase(petId).skill_island;
                this.listDes.itemRenderer = zj.Common_DesPetTalentItem;
                this.arrCollectionItem = new eui.ArrayCollection();
                for (var i = 0; i < tbl.length; i++) {
                    var skill = new zj.PetInfoskill();
                    skill.id = i;
                    skill.skill = tbl[i];
                    skill.petid = petId;
                    skill.talentIndex = talentIndex;
                    this.arrCollectionItem.addItem(skill);
                }
                this.listDes.dataProvider = this.arrCollectionItem;
            }
            // let petItem = new Common_DesPetTalentItem();
            // petItem.SetInfo(id,talentId,petID,talentIndex);
        };
        Common_DesPetTalent.prototype.UICloseAndUp = function () {
        };
        Common_DesPetTalent.ID = "Common_DesPetTalent";
        return Common_DesPetTalent;
    }(zj.UI));
    zj.Common_DesPetTalent = Common_DesPetTalent;
    __reflect(Common_DesPetTalent.prototype, "zj.Common_DesPetTalent");
})(zj || (zj = {}));
//# sourceMappingURL=Common_DesPetTalent.js.map