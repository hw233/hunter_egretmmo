namespace zj {
//PetEvolutioView
//hexiaowei  
//2019/01/18
export class PetEvolutioView extends Dialog {
    private btnclose: eui.Button;
    private imgSpriteNow0: eui.Image;
    private lableUnLock0: eui.Label;
    private groupNodePet0: eui.Group;
    private imgSpriteNow1: eui.Image;
    private lableUnLock1: eui.Label;
    private groupNodePet1: eui.Group;
    private imgSpriteNow2: eui.Image;
    private lableUnLock2: eui.Label;
    private groupNodePet2: eui.Group;

    private index: number;
    private father: PetMainScene;

    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetEvolutioViewSkin.exml";
        this.btnclose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclose, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);
    }

    //龙骨动画宠物
    public addAnimatoinPet(groupAdviser: eui.Group, scale: number, dbName: string, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, null, 0)
            .then(display => {
                display.x = groupAdviser.width / 2;
                display.y = groupAdviser.height / 1.2;
                display.scaleX = scale;
                display.scaleY = scale;
                //this.groupAnimation.addChild(display);
                groupAdviser.addChild(display);
                //this.petMainKeelAnimation = display;
            })
            .catch(reason => {
                toast(reason);
            });
    }

    public setInfo(index, father) {

        this.index = index;
        this.father = father;

        let evolution = 0;
        if (Game.PlayerAdviserSystem.petMap[this.index].step < PlayerAdviserSystem.PetBase(this.index).unlock_step[1]) {
            evolution = 1;
        } else if (Game.PlayerAdviserSystem.petMap[this.index].step >= PlayerAdviserSystem.PetBase(this.index).unlock_step[1]
            && Game.PlayerAdviserSystem.petMap[this.index].step < PlayerAdviserSystem.PetBase(this.index).unlock_step[2]) {
            evolution = 2;
        } else {
            evolution = 3;
        }

        let petInfo = PlayerAdviserSystem.PetBase(this.index);
        let spine1 = petInfo.spine_id[0];
        let aniSpine1 = TableClientAniSpineSource.Item(spine1);
        this.addAnimatoinPet(this.groupNodePet0, 0.7, aniSpine1.json);

        let spine2 = petInfo.spine_id[1];
        let aniSpine2 = TableClientAniSpineSource.Item(spine2);
        this.addAnimatoinPet(this.groupNodePet1, 0.8, aniSpine2.json);

        let spine3 = petInfo.spine_id[2];
        let aniSpine3 = TableClientAniSpineSource.Item(spine3);
        this.addAnimatoinPet(this.groupNodePet2, 0.7, aniSpine3.json);

        if (evolution == 1) {

            this.lableUnLock0.visible = false;
            this.imgSpriteNow0.visible = true;
            this.lableUnLock1.visible = true;
            this.imgSpriteNow1.visible = false;
            this.lableUnLock2.visible = true;
            this.imgSpriteNow2.visible = false;

        } else if (evolution == 2) {

            this.lableUnLock0.visible = false;
            this.imgSpriteNow0.visible = false;
            this.lableUnLock1.visible = false;
            this.imgSpriteNow1.visible = true;
            this.lableUnLock2.visible = true;
            this.imgSpriteNow2.visible = false;

        } else {

            this.lableUnLock0.visible = false;
            this.imgSpriteNow0.visible = false;
            this.lableUnLock1.visible = false;
            this.imgSpriteNow1.visible = false;
            this.lableUnLock2.visible = false;
            this.imgSpriteNow2.visible = true;

        }

        this.lableUnLock0.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[0]));
        this.lableUnLock1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[1]));
        this.lableUnLock2.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[2]));

    }

    private onBtnclose() {
        this.close(UI.HIDE_TO_TOP);
    }

}

}