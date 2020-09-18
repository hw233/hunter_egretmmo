namespace zj {
// PetUpStar
// hexiaowei
// 2019/1/12
export class PetUpStar extends Dialog {
    public groupWhole: eui.Group;
    public labelAttName1: eui.Label;
    public labelAttCurrency1: eui.Label;
    public labelTip: eui.Label;
    public labelLock: eui.Label;
    public imgSpriteHunter: eui.Image;
    public imgSpriteHunterType: eui.Image;
    private groupHunter: eui.Group;
    private groupHunterName: eui.Group;
    private imageBackground: eui.Group;
    private groupBackground: eui.Group;
    private groupNodeStar: eui.Group;
    private groupNodeStar2: eui.Group;
    public labelTalent1: eui.Label;
    public labelTalent2: eui.Label;
    private groupProperty: eui.Group; //念兽、宠物升星属性
    private groupEvolve: eui.Group; //宠物进化属性
    private imgPetType: eui.Image;
    private groupPetForm: eui.Group;
    private groupMain : eui.Group;
    private groupUpStar : eui.Group;

    public petMainKeelAnimation: dragonBones.EgretArmatureDisplay;//	念兽、宠物动画

    private BASE_ID: number = 10000;
    private pop_time: number = 0;

    private id: number = 0;
    private father;

    private ani_end: boolean;
    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetUpStarSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);

        //this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.pop_time = 0;
        this.groupProperty.visible = false;
        this.groupEvolve.visible = false;
    }

    public SetInfo(id, father, types: number) {
        this.id = id;
        this.father = father;

        this.ani_end = false;
        if (types == 1) {
            //念兽升星
            this.SetInfoHero();
        } else if (types == 2) {
            //宠物升星
            this.setInfoPet();
        } else {
            //宠物进化
            this.setInfoPetEvolution();
        }
        //  this.SetInfoAni();

    }

    //念兽升星
    private SetInfoHero() {
        this.addAnimatoin("ui_zhizhao_shengxing", 1);
        let level = Game.PlayerAdviserSystem.advisersMap[this.id].level;
        let skill_id = PlayerAdviserSystem.Instance(this.id).skill_id;
        let skill_level = PlayerAdviserSystem.AdviserlvdbInstance(this.id * this.BASE_ID + level).skill_level;
        let base_skill = PlayerAdviserSystem.Instance(this.id).base_skill;
        let max = PlayerAdviserSystem.AdviserLvdbMinLevel(this.id);

        let skill = PlayerAdviserSystem.AdviserLvdbGetLevel(this.BASE_ID * this.id + level, this.id);
        //基础技
        let str_talent1 = PlayerTalentSystem.Des(base_skill[0], level);
        //念力技
        let str_talent2 = PlayerTalentSystem.Des(skill_id[0], skill_level);

        this.labelAttName1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.attri_star[1], str_talent1));
        this.labelAttCurrency1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.attri_star[2], str_talent2));
        this.imgSpriteHunter.source = cachekey(PlayerAdviserSystem.Instance(this.id).name_down_path , this) ;
        this.imgSpriteHunterType.source = cachekey(UIConfig.UIConfig_Pet.Grade[PlayerAdviserSystem.Instance(this.id).quality + 10] , this) ;

        if (level < 26 && skill - level == 5) {
            this.labelTip.text = TextsConfig.TextsConfig_Adviser.add_star_next;
        } else {
            this.labelTip.visible = false;
        }

        PetMainScene.GetNodeStarByPet(this.groupNodeStar, 5, 5, 1, level, 0);
        PetMainScene.GetNodeStarByPet(this.groupNodeStar2, 5, 5, 1, level - 1, 0);

        let id = PlayerAdviserSystem.Instance(this.id).spine_id;
        let aniSpine = TableClientAniSpineSource.Item(id);
        Game.DragonBonesManager.getArmatureDisplayAsync(this, aniSpine.json,  null)
            .then(display => {
                display.x = this.groupHunter.width / 2;
                display.y = this.groupHunter.height;
                display.scaleX = 1.1;
                display.scaleY = 1.1;
                setDragonBonesRemove(display);
                //this.groupAnimation.addChild(display);
                this.groupHunter.addChild(display); 
                display.animation.play(null, 0);
                this.petMainKeelAnimation = display;
            })
            .catch(reason => {
                toast(reason);
            });

    }

    public addAnimatoin(dbName: string, type: number, armatureName: string = "armatureName") {

        let displays = [this.groupHunter, this.groupHunterName, this.groupBackground, this.groupNodeStar];
        let solts = ["002_juese", "003_mingzi", "000_juexing_bg", "002_xingxing01"];
        Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_zhizhao_shengxing", null, displays, solts)
            .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {

                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    this.groupProperty.visible = true;
                    // armatureDisplay.animation.stop();
                    // armatureDisplay.animation.reset();
                    // armatureDisplay.armature.dispose();
                    // armatureDisplay.dbClear();
                    // armatureDisplay.dispose(true);
                    this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                    if(armatureDisplay.parent){
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    }
                }, this)
                let c = UIManager.StageWidth;
                let d = UIManager.StageHeight;
                let e = 0;
                if(d > 640){
                    e = (d-30)/640;
                }else{
                    e = 1;
                }
                armatureDisplay.animation.play("000_nianshou_shengxing", 1);
                
                this.groupUpStar.x = c * 0.48;
                armatureDisplay.x = c * 0.5;
                armatureDisplay.y = d / 2;
                armatureDisplay.scaleX = e;
                armatureDisplay.scaleY = e;
                this.groupWhole.addChild(armatureDisplay);

                let slotuser = armatureDisplay.armature.getBone("002_juese");
                //slotuser.offset.x -= 20;

                let slot = armatureDisplay.armature.getBone("003_mingzi");
                slot.offset.scaleX = 0.8*e;
                slot.offset.scaleY = 0.8*e;


                let slotxing = armatureDisplay.armature.getBone("002_xingxing01");
                slotxing.offset.scaleX = 0.6*e;
                slotxing.offset.scaleY = 0.6*e;
                slotxing.offset.y += 80;
                slotxing.offset.x -= 20;
            });
    }
   
    //宠物升星
    private setInfoPet() {
        let petmap = Game.PlayerAdviserSystem.petMap[this.id];
        let level = petmap.star;
        this.imgSpriteHunter.source = cachekey(PlayerAdviserSystem.PetBase(this.id).name_down_path , this) ;
        this.labelTip.visible = false;

        if (petmap.star % 5 == 0) {
            this.labelLock.visible = true;
            this.labelLock.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.unlock_root, petmap.star / 5));
        } else {
            this.labelLock.visible = false;
        }
       
        let step = 0;
        if (Game.PlayerAdviserSystem.petMap[this.id].step < PlayerAdviserSystem.PetBase(this.id).unlock_step[1]) {
            step = 0;
        } else if (Game.PlayerAdviserSystem.petMap[this.id].step >= PlayerAdviserSystem.PetBase(this.id).unlock_step[1]
            && Game.PlayerAdviserSystem.petMap[this.id].step < PlayerAdviserSystem.PetBase(this.id).unlock_step[2]) {
            step = 1;
        } else {
            step = 2;
        }

        let [attri1, title1] = PlayerAdviserSystem.AttriAdd(this.id, level);
        this.labelAttName1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_attri_dont[title1], attri1));
        this.labelAttCurrency1.visible = false;

        PetMainScene.GetNodeStarByPet(this.groupNodeStar, 5, 5, 1, level, 0);
        PetMainScene.GetNodeStarByPet(this.groupNodeStar2, 5, 5, 1, level - 1, 0);

        let id = PlayerAdviserSystem.PetBase(this.id).spine_id[step];
        let aniSpine = TableClientAniSpineSource.Item(id);

        Game.DragonBonesManager.getArmatureDisplayAsync(this, aniSpine.json,null)
            .then(display => {
                display.x = this.groupHunter.width / 2;
                display.y = this.groupHunter.height;
                display.scaleX = 1.1;
                display.scaleY = 1.1;
                setDragonBonesRemove(display);
                //this.groupAnimation.addChild(display);
                this.groupHunter.addChild(display);
                display.animation.play(null, 0);
                this.petMainKeelAnimation = display;
            })
            .catch(reason => {
                toast(reason);
            });

        this.addAnimatoinPet("ui_chongwu_juexing_eff", 1);


    }

    public addAnimatoinPet(dbName: string, type: number, armatureName: string = "armatureName") {

        let displays = [this.groupHunter, this.groupNodeStar];
        let solts = ["002_juese", "002_xingxing01"];
        Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_chongwu_juexing_eff", null, displays, solts)
            .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {

                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    this.groupProperty.visible = true;
                    // armatureDisplay.animation.stop();
                    // armatureDisplay.animation.reset();
                    // armatureDisplay.armature.dispose();
                    // armatureDisplay.dbClear();
                    // armatureDisplay.dispose(true);
                    this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                    if(armatureDisplay.parent){
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    }
                }, this)

                let c = UIManager.StageWidth;
                let d = UIManager.StageHeight;

                let e = 0;
                if(d > 640){
                    e = (d-30)/640;
                }else{
                    e = 1;
                }
                this.groupUpStar.x = c * 0.48;
                armatureDisplay.animation.play("000_shengxing", 1);
                armatureDisplay.x = c * 0.5;
                armatureDisplay.y = d / 2;
                armatureDisplay.scaleX = e;
                armatureDisplay.scaleY = e;
                this.groupWhole.addChild(armatureDisplay);


                let slotjuese = armatureDisplay.armature.getBone("002_juese");
                slotjuese.offset.y -= 35;

                let slotxing = armatureDisplay.armature.getBone("002_xingxing01");
                slotxing.offset.scaleX = 0.6 * e;
                slotxing.offset.scaleY = 0.6 * e;
            });
    }

    // 宠物进化
    private setInfoPetEvolution() {
        let talentId = PlayerAdviserSystem.PetBase(this.id).skill_normal[Game.PlayerAdviserSystem.petMap[this.id].step];
        this.labelTalent1.textFlow = Util.RichText(Helper.StringFormat(PlayerTalentSystem.Des(talentId, 1)));

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

        let step = 0;
        if (Game.PlayerAdviserSystem.petMap[this.id].step < PlayerAdviserSystem.PetBase(this.id).unlock_step[1]) {
            step = 0;
        } else if (Game.PlayerAdviserSystem.petMap[this.id].step >= PlayerAdviserSystem.PetBase(this.id).unlock_step[1]
            && Game.PlayerAdviserSystem.petMap[this.id].step < PlayerAdviserSystem.PetBase(this.id).unlock_step[2]) {
            step = 1;
        } else {
            step = 2;
        }


        let id = PlayerAdviserSystem.PetBase(this.id).spine_id[step];
        let aniSpine = TableClientAniSpineSource.Item(id).json;

        Game.DragonBonesManager.getArmatureDisplayAsync(this, aniSpine, null)
            .then(display => {
                display.x = this.groupHunter.width / 2;
                display.y = this.groupHunter.height;
                display.scaleX = 1.1;
                display.scaleY = 1.1;
                setDragonBonesRemove(display);
                //this.groupAnimation.addChild(display);
                this.groupHunter.addChild(display);
                display.animation.play(null, 0);
                this.petMainKeelAnimation = display;
            })
            .catch(reason => {
                toast(reason);
            });

            this.addAnimatoinPetEvolution("ui_chongwu_juexing_eff", 1, step);
        

    }

    public addAnimatoinPetEvolution(dbName: string, type: number, step: number, armatureName: string = "armatureName") {
        let stepnew;
        if (step == 0) {
            stepnew = "step1";
        } else if (step == 1) { 
            stepnew = "step2";
        } else {
            stepnew = "step3";
        }
        let imgsource = UIConfig.UIConfig_Adviser.pet_unlock_step[stepnew];
        this.imgPetType.source = cachekey(imgsource , this) ;
        let image1 = new eui.Image(imgsource);
        image1.anchorOffsetX = 50;
        image1.anchorOffsetY = 14;
        let displays = [this.groupHunter, image1];
        let solts = ["002_juese", "002_xingxing01"];
        Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_chongwu_juexing_eff", null, displays, solts)
            .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {

                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    this.groupEvolve.visible = true;
                    // armatureDisplay.animation.stop();
                    // armatureDisplay.animation.reset();
                    // armatureDisplay.armature.dispose();
                    // armatureDisplay.dbClear();
                    // armatureDisplay.dispose(true);
                    this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
                    if(armatureDisplay.parent){
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    }
                }, this)

                let c = UIManager.StageWidth;
                let d = UIManager.StageHeight;
                this.groupUpStar.x = c * 0.48;
                let e = 0;
                if(d > 640){
                    e = (d-30)/640;
                }else{
                    e = 1;
                }
                armatureDisplay.animation.play("000_shengxing", 1);
                armatureDisplay.x = c * 0.5;
                armatureDisplay.y = d / 2;
                armatureDisplay.scaleX = e;
                armatureDisplay.scaleY = e;
                this.groupWhole.addChild(armatureDisplay);

                let slotimg = armatureDisplay.armature.getBone("002_juese");
                slotimg.offset.y -= 35;

            });


    }

    public onBtnClose() {
        this.close();
        if (this.petMainKeelAnimation) {
            this.petMainKeelAnimation.animation.stop();
            this.petMainKeelAnimation.animation.reset();
            this.petMainKeelAnimation.armature.dispose();
            this.petMainKeelAnimation.dbClear();
            this.petMainKeelAnimation.dispose(true);
            this.petMainKeelAnimation.parent.removeChild(this.petMainKeelAnimation);
        }
    }
}

}