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
    // PetEvolutionSucceed(宠物进化)
    // wangshenzhuo
    // 2019/1/19
    var PetEvolutionSucceed = (function (_super) {
        __extends(PetEvolutionSucceed, _super);
        function PetEvolutionSucceed() {
            var _this = _super.call(this) || this;
            _this.id = 0;
            _this.skinName = "resource/skins/monster/PetEvolutionSucceedSkin.exml";
            _this.groupWhole0.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        PetEvolutionSucceed.prototype.SetInfo = function (id) {
            this.id = id;
            var talentId = zj.PlayerAdviserSystem.PetBase(this.id).skill_normal[zj.Game.PlayerAdviserSystem.petMap[this.id].step];
            this.labelTalent.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.PlayerTalentSystem.Des(talentId, 1)));
            var skillId = zj.PlayerAdviserSystem.PetBase(this.id).skill_island[zj.Game.PlayerAdviserSystem.petMap[this.id].step];
            var attri = null;
            var str = null;
            var des = null;
            if (zj.TablePetSkill.Item(skillId).type != 1) {
                if (zj.TablePetSkill.Item(skillId).type == 2) {
                    des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_passive[zj.TablePetSkill.Item(skillId).type], zj.TablePetSkill.Item(skillId).rand[0]);
                }
                else {
                    des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_passive[zj.TablePetSkill.Item(skillId).type], zj.TablePetSkill.Item(skillId).value);
                }
            }
            else {
                attri = zj.TablePetSkill.Item(skillId).attri_add;
                str = zj.TextsConfig.TextsConfig_Potato.AttriStr[attri[0] - 1];
                des = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.darkland, str, attri[1]);
            }
            this.labelTalent2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(des));
        };
        PetEvolutionSucceed.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return PetEvolutionSucceed;
    }(zj.Dialog));
    zj.PetEvolutionSucceed = PetEvolutionSucceed;
    __reflect(PetEvolutionSucceed.prototype, "zj.PetEvolutionSucceed");
})(zj || (zj = {}));
//# sourceMappingURL=PetEvolutionSucceed.js.map