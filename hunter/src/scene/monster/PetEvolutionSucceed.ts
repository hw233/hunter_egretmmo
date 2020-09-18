namespace zj {
// PetEvolutionSucceed(宠物进化)
// wangshenzhuo
// 2019/1/19
export class PetEvolutionSucceed extends Dialog {
    public groupWhole0: eui.Group;
    public labelTalent: eui.Label;
    public labelTalent2: eui.Label;

    public id: number = 0;


    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetEvolutionSucceedSkin.exml";
        this.groupWhole0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
    }


    public SetInfo(id) {
        this.id = id;

        let talentId = PlayerAdviserSystem.PetBase(this.id).skill_normal[Game.PlayerAdviserSystem.petMap[this.id].step];
        this.labelTalent.textFlow = Util.RichText(Helper.StringFormat(PlayerTalentSystem.Des(talentId, 1)));

        let skillId = PlayerAdviserSystem.PetBase(this.id).skill_island[Game.PlayerAdviserSystem.petMap[this.id].step];

        let attri = null;
        let str = null;
        let des = null;

        if (TablePetSkill.Item(skillId).type != 1) {
            if (TablePetSkill.Item(skillId).type == 2) {
                des = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_passive[TablePetSkill.Item(skillId).type], TablePetSkill.Item(skillId).rand[0]);
            } else {
                des = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_passive[TablePetSkill.Item(skillId).type], TablePetSkill.Item(skillId).value);
            }
        } else {
            attri = TablePetSkill.Item(skillId).attri_add;
            str = TextsConfig.TextsConfig_Potato.AttriStr[attri[0] - 1];
            des = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.darkland, str, attri[1]);
        }

        this.labelTalent2.textFlow = Util.RichText(Helper.StringFormat(des));
    }


    public onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }

}

}