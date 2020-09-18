namespace zj {
//PetDontGetB
//hexiaowei  
//2019/01/16
export class PetDontGetB extends UI {
    public labelCurrentAtt1: eui.Label;
    public labelPetSkillName: eui.Label;
    public imgSkillFrame: eui.Image;
    public imgSkillIcon: eui.Image;
    public imgSkillFrame1: eui.Image;
    public imgSkillIcon1: eui.Image;
    public imgSpriteFrame: eui.Image;
    public imgSpriteIcon: eui.Image;
    public imgSpriteMask: eui.Image;
    public btnAddPetSoul: eui.Button;
    public labelNeedFragment: eui.Label;
    public btnAddFragment: eui.Button;
    public imgSpriteTipAdd: eui.Image;

    private index: number = 0;
    private father: PetMainScene;

    private groupAnimate: eui.Group;
    private imgMask: eui.Image;

    public despettalent: Common_DesPetTalent;
    private btnType: number;



    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetDontGetBSkin.exml";

        this.btnAddFragment.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddFragment, this);
        this.imgSkillIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSkillIcon, this);
        this.imgSkillIcon1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSkillIcon1, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeSkill, this);
        Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.updateInfo, this);
        this.btnAddPetSoul.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnAddPetSoul, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);


        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul , this) ;
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.imgMask.scaleX = 0.7;
        this.imgMask.scaleY = 0.7;
        this.groupAnimate.addChild(this.imgMask);
        this.imgMask.visible = true;

        this.despettalent = new Common_DesPetTalent();
        this.addChild(this.despettalent);
        this.despettalent.visible = false;
    }

    public SetInfo(index, father: PetMainScene , btnType) {
        this.index = index;
        this.father = father;
        this.btnType = btnType;
        this.setConsumeInfo();
    }

    public updateInfo() {
        if(this.btnType == 2) {
            this.setConsumeInfo();
        }
    } 

    private setConsumeInfo() {

        let petInfo = PlayerAdviserSystem.PetBase(this.index);
        let itemId = petInfo.compose_goods;
        let cur = PlayerItemSystem.Count(itemId);
        let des = petInfo.compose_count;
        let itemSet = PlayerItemSystem.Set(itemId);

        if (cur > des && PlayerAdviserSystem.GetPet(this.index) == false) {
            this.imgSpriteTipAdd.visible = true;
            this.labelNeedFragment.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.needFragment, cur, des));
            this.btnAddPetSoul.visible = false;
        } else {
            this.imgSpriteTipAdd.visible = false;
            this.labelNeedFragment.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.needFragment, cur, des));
            this.btnAddPetSoul.visible = true;
        }

        this.imgSpriteFrame.source = cachekey(UIConfig.UIConfig_Role.pieceFrame[petInfo.quality + 1] , this) ;
        this.imgSpriteIcon.source = cachekey(PlayerAdviserSystem.PetBase(this.index).frame_path , this) ;
        this.imgSpriteIcon.mask = this.imgMask;

        let [attri1, title1] = PlayerAdviserSystem.AttriAdd(this.index, 1);
        let [attri2, title2] = PlayerAdviserSystem.AttriAdd(this.index, CommonConfig.pet_star_max);

        this.labelCurrentAtt1.textFlow = Util.RichText(Helper.StringFormat((TextsConfig.TextsConfig_Adviser.pet_start + TextsConfig.TextsConfig_Adviser.pet_attri_dont[title1]), attri1));
        this.labelPetSkillName.textFlow = Util.RichText(Helper.StringFormat((TextsConfig.TextsConfig_Adviser.pet_Max + TextsConfig.TextsConfig_Adviser.pet_attri_dont[title2]), attri2));

        this.imgSkillIcon.source = cachekey(petInfo.skill_Icon[1] , this) ;
        this.imgSkillIcon1.source = cachekey(petInfo.skill_Icon[2] , this) ;

    }
    //宠物天赋
    private onSkillIcon() {
        this.father.onGroupSkill1();
    }

    private onSkillIcon1() {
        this.father.onGroupSkill2();
    }

    private removeSkill() {
        this.father.onGroupSkill();
    }

    //跳转 “获取途径 ” 界面
    private onBtnAddPetSoul() {
        let star = Game.PlayerAdviserSystem.petMap[this.index].star;
        let itemId = PlayerAdviserSystem.PetBase(this.index).up_goods[star][0];
        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.setInfo(itemId, this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    //召唤
    private onBtnAddFragment() {
        let itemId = PlayerAdviserSystem.PetBase(this.index).compose_goods;
        let cur = PlayerItemSystem.Count(itemId);
        let des = PlayerAdviserSystem.PetBase(this.index).compose_count;
        if (cur >= des && PlayerAdviserSystem.GetPet(this.index) == false) {
            PlayerAdviserSystem.PetGet_Req(this.index)
                .then((data: any) => {
                    loadUI(PetPop)
                        .then((dialog: PetPop) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.SetInfoPet(this.index);
                        });

                    //列表下拉位置
                    let petInfo = PlayerAdviserSystem.SortPet();
                    let petkey: number;
                    for (const k in petInfo) {
                        const v = petInfo[k];
                        if (v.pet_id == this.index) {
                            petkey = Number(k);
                        }
                    }

                    let location = Helper.getObjLen(petInfo) * 110 - 470;
                    if (petkey * 110 > location) {
                        this.father.moveLocation = location
                    } else {
                        this.father.moveLocation = petkey * 110;
                    }
                    if(this.father.petMainKeelAnimation.parent) {
                        this.father.groupAdviser.removeChild(this.father.petMainKeelAnimation);
                    }
                    this.father.inIt(this.father.btnType);

                });
        } else {
            toast_warning(TextsConfig.TextsConfig_Adviser.goods);
        }
    }


}

}