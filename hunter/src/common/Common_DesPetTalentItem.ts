namespace zj {
//  宠物天赋
//  2019/1/16
//  wangshenzhuo
export class Common_DesPetTalentItem extends eui.ItemRenderer {

    public labelPropetyChange:eui.Label;
    private rectLabel : eui.Rect;

    constructor() {
        super();
        this.skinName = "resource/skins/common/Common_DesPetTalentItemSkin.exml";
        cachekeys(<string[]>UIResource["Common_DesPetTalentItem"], null);
    }

    protected dataChanged() {
         let id = this.data.id;
         let petID = this.data.petid;
         let talentIndex = this.data.talentIndex;
        //  let des = PlayerTalentSystem.Des(this.data.skill,1);

         if(talentIndex == 1){
            let des = PlayerTalentSystem.Des(this.data.skill , 1);
            if(id == 0 && PlayerAdviserSystem.GetPet(petID)){
                this.rectLabel.visible = false;
                this.labelPropetyChange.textFlow = Util.RichText(des + TextsConfig.TextsConfig_Adviser.attri_talent_get); 
            }else if(id == 0 && !PlayerAdviserSystem.GetPet(petID)){
                this.labelPropetyChange.textFlow = Util.RichText(des + TextsConfig.TextsConfig_Adviser.attri_talent_don_get); 
            }else if(id > Game.PlayerAdviserSystem.petMap[petID].step ){
                this.labelPropetyChange.textFlow = Util.RichText(Helper.StringFormat(des + TextsConfig.TextsConfig_Adviser.attri_talent , id)); 
            }else if(id <= Game.PlayerAdviserSystem.petMap[petID].step ){
                this.rectLabel.visible = false;
                this.labelPropetyChange.textFlow = Util.RichText(des + TextsConfig.TextsConfig_Adviser.attri_talent_get); 
            }
        }else{
            let attri = null;
            let str = null;
            let des = null;

            if(TablePetSkill.Item(this.data.skill).type != 1){
                if(TablePetSkill.Item(this.data.skill).type == 2){
                    des = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_passive[TablePetSkill.Item(this.data.skill).type] , TablePetSkill.Item(this.data.skill).rand[0]);
                }else{
                    des = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_passive[TablePetSkill.Item(this.data.skill).type] , TablePetSkill.Item(this.data.skill).value);
                }
            }else{
                attri = TablePetSkill.Item(this.data.skill).attri_add;
                str = TextsConfig.TextsConfig_Potato.AttriStr[attri[0] - 1];
                des = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.darkland , str , attri[1]); 
            }
            
            if(id == 0 && PlayerAdviserSystem.GetPet(petID)){
                this.rectLabel.visible = false;
                this.labelPropetyChange.textFlow = Util.RichText(des + TextsConfig.TextsConfig_Adviser.attri_talent_get); 
            }else if(id == 0 && !PlayerAdviserSystem.GetPet(petID)){
                this.labelPropetyChange.textFlow = Util.RichText(des + TextsConfig.TextsConfig_Adviser.attri_talent_don_get); 
            }else if(id > Game.PlayerAdviserSystem.petMap[petID].step ){
                this.labelPropetyChange.textFlow = Util.RichText(Helper.StringFormat(des + TextsConfig.TextsConfig_Adviser.attri_talent , id )); 
            }else if(id <= Game.PlayerAdviserSystem.petMap[petID].step ){
                this.rectLabel.visible = false;
                this.labelPropetyChange.textFlow = Util.RichText(des + TextsConfig.TextsConfig_Adviser.attri_talent_get); 
            }
        }

        this.rectLabel.height =  this.labelPropetyChange.height;
    }
}

//子项数据源
export class PetInfoskill {
    id : number;
    petid : number;
    //数据源
    skill : number;
    talentIndex : number;


}


}