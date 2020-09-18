namespace zj {
// PetPop
// wangshenzhuo /hexiaowei
// 2019/1/12
export class PetPop extends Dialog {
    private BASE_ID: number = 10000;
    private index: number;

    private groupMap: eui.Group;
    public imgSpriteBackShadow: eui.Image;
    public labelPetName: eui.Label;
    public labelAtt1: eui.Label;
    public imgSpriteIconBoard: eui.Image;
    public imgSpriteIconGrade: eui.Image;
    public imgSpriteBack: eui.Image;
    private groupAttl: eui.Group;
    private groupBackShadow: eui.Group;
    private groupImage : eui.Group;

    public groupWhole: eui.Group;
    public groupAdviser: eui.Group;
    public petMainKeelAnimation: dragonBones.EgretArmatureDisplay;//	念兽、宠物动画


    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetPopSkin.exml";
        this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
    }

    //念兽信息
    public SetInfo(index) {
        this.index = index;

        let dat_tbl = PlayerAdviserSystem.Instance(this.index);
        let adviserId = PlayerAdviserSystem.Instance(this.index).adviser_id;
        let level = Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;

        let attr_des = "";
        let attr_tbl: any = PlayerAdviserSystem.AdviserlvdbAttrTbl(adviserId, level);
        for (let i = 0; i < attr_tbl.length; i++) {
            let des = PlayerAdviserSystem.AdviserLvdbAttrDes(adviserId, level, i);
            attr_des = attr_des + des + TextsConfig.TextsConfig_Adviser.attr_space;
        }

        let skill_id = PlayerAdviserSystem.Instance(this.index).skill_id;
        let skill_level = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
        let des = PlayerAdviserSystem.Instance(this.index).des;
        let name = PlayerAdviserSystem.Instance(this.index).adviser_name;
        let quality = PlayerAdviserSystem.Instance(this.index).quality + 10;

        this.labelPetName.text = name;
        //  let des = PlayerAdviserSystem.Instance(this.index).des;
        //  set.textInView(des, this.labelAtt1, this.LayerSkill, this.Stencil)
        this.labelAtt1.text = des;
        //this.labelAtt1.visible = true;
        //this.imgSpriteBack.visible = true;
        this.imgSpriteIconGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[quality] , this) ;
        //this.imgSpriteBackShadow.visible = true;

        let ids = PlayerAdviserSystem.Instance(this.index).spine_id;
        let spine_scale = PlayerAdviserSystem.Instance(this.index).spine_scale;
        let infoItem = PlayerAdviserSystem.Instance(this.index);
        let aniSpine = TableClientAniSpineSource.Item(infoItem.spine_id);

        Game.DragonBonesManager.playAnimation(this, aniSpine.json, null, null, 0)
            .then(display => {
                display.x = this.groupAdviser.width / 2;
                display.y = this.groupAdviser.height * 1.05;
                display.scaleX = spine_scale;
                display.scaleY = spine_scale;
                this.groupAdviser.addChild(display);
            })
            .catch(reason => {
                toast(reason);
        });

        //this.addAnimatoin(aniSpine.json);
        this.addAnimatoin("jg_zhaohuan", 1);

    }

    //宠物信息
    public SetInfoPet(index) {
        this.index = index;

        let name = PlayerAdviserSystem.PetBase(this.index).pet_name;
        let quality = PlayerAdviserSystem.PetBase(this.index).quality + 10;

        this.labelPetName.text = name;
        this.imgSpriteIconGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[quality] , this) ;

        let steps = 0;
        if (Game.PlayerAdviserSystem.petMap[this.index].step < PlayerAdviserSystem.PetBase(this.index).unlock_step[1]) {
            steps = 0;
        } else if (Game.PlayerAdviserSystem.petMap[this.index].step >= PlayerAdviserSystem.PetBase(this.index).unlock_step[1]
            && Game.PlayerAdviserSystem.petMap[this.index].step < PlayerAdviserSystem.PetBase(this.index).unlock_step[2]
        ) {
            steps = 1;
        } else {
            steps = 2;
        }

        let infoItem = PlayerAdviserSystem.PetBase(this.index);
        let aniSpine = TableClientAniSpineSource.Item(infoItem.spine_id[steps]);

        Game.DragonBonesManager.playAnimation(this, aniSpine.json, null, null, 0)
            .then(display => {
                display.x = this.groupAdviser.width / 2;
                display.y = this.groupAdviser.height * 1.05;
                //this.groupAnimation.addChild(display);
                this.groupAdviser.addChild(display);
                this.petMainKeelAnimation = display;
            })
            .catch(reason => {
                toast(reason);
            });

        this.addAnimatoin("jg_zhaohuan", 2);

        this.imgSpriteBackShadow.visible = false;
        this.labelAtt1.visible = false;
    }

    public onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
        // this.groupAdviser.removeChild(this.petMainKeelAnimation);
    }

    //龙骨动画念兽
    public addAnimatoin(dbName: string, type: number, armatureName: string = "armatureName") {
        let displays = [];
        let solts = [];
        if (type == 1) {
            displays = [this.groupImage, this.labelPetName, this.groupAttl];
            solts = ["002_juese", "005_mingzi", "006_shuxing"];
        } else {
            displays = [this.groupImage, this.labelPetName, this.groupAttl, this.groupBackShadow];
            solts = ["002_juese", "005_mingzi", "006_shuxing", "003_wenzidiban"];
        }
        Game.DragonBonesManager.getAnimationWithBindImages(this, "jg_zhaohuan", null, displays, solts)
            .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                // this.addEventListener(egret.Event.REMOVED_FROM_STAGE ,()=>{
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // } , null);
                armatureDisplay.animation.play("001_xunhuan", 0);

                armatureDisplay.x = this.groupMap.width / 2;
                armatureDisplay.y = this.groupMap.height * 0.88;
                this.groupMap.addChild(armatureDisplay);
            });


    }

}

}