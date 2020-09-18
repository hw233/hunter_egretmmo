namespace zj {
//  宠物天赋
//  wangshenzhuo
//  2019/1/16
export class Common_DesPetTalent extends UI {
    public static ID = "Common_DesPetTalent";

    public imgSpriteFrame : eui.Image;
    public imgSpriteIcon : eui.Image;
    public labelTextName : eui.Label;
    public labelTextType : eui.Label;
    public listDes : eui.List;
    private arrCollectionItem: eui.ArrayCollection;
    
    public constructor() {
        super();
        this.skinName = "resource/skins/common/Common_DesPetTalentSkin.exml";
    }

    public Load(petId , stat , step  , talentIndex){
        this.imgSpriteIcon.source = cachekey(PlayerAdviserSystem.PetBase(petId).skill_Icon[talentIndex + 1] , this) ;
        this.labelTextName.text = PlayerAdviserSystem.PetBase(petId).skill_name[talentIndex + 1];

        if(talentIndex == 1){
            let talentId = PlayerAdviserSystem.PetBase(petId).skill_normal[step + 1];
            let info = TableGeneralTalent.Item(talentId);
            let tbl = PlayerAdviserSystem.PetBase(petId).skill_normal;
            this.listDes.itemRenderer = Common_DesPetTalentItem;

            this.arrCollectionItem = new eui.ArrayCollection();
            for (let i = 0; i < tbl.length; i++) {
                let skill = new PetInfoskill();
                skill.id = i;
                skill.skill = tbl[i];
                skill.petid = petId;
                skill.talentIndex = talentIndex;
                this.arrCollectionItem.addItem(skill);
            }
            this.listDes.dataProvider = this.arrCollectionItem;
        }else{
            let tbl = PlayerAdviserSystem.PetBase(petId).skill_island;

            this.listDes.itemRenderer = Common_DesPetTalentItem;
            this.arrCollectionItem = new eui.ArrayCollection();
           for (let i = 0; i < tbl.length; i++) {
                let skill = new PetInfoskill();
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

    }

    public UICloseAndUp(){
        
       
    }

}

}