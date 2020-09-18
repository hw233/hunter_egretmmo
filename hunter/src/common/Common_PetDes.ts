namespace zj {
// （宠物/念兽）信息
//  wangshenzhuo
//  2019/1/16
export class Common_PetDes extends UI {
    public static ID = "Common_PetDes";

    public labelTalent:eui.Label;

    
    public constructor() {
        super();
        this.skinName = "resource/skins/common/Common_PetDesSkin.exml";
    }

    public Load(text){
        this.labelTalent.text = text;
    }

    public UICloseAndUp(){
        
    }

}

}