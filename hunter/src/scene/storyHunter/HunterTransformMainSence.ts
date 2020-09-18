namespace zj {
//  wangshenzhuo
//  2019-7-16
//  HXH_HunterTransformMain
export class HunterTransformMainSence extends Scene {

    public buttonClose: eui.Button;
    public groupTransform: eui.Group;
    public buttonTransForm: eui.Button;
    public imageTipTransform: eui.Image;
    public groupStory: eui.Group;
    public buttonStory: eui.Button;
    public imageTipStory: eui.Image;


    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/HunterTransformMainSenceSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonTransForm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTransForm, this);
        this.buttonStory.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonStory, this);
        this.setTipsShow();
    }

    public setTipsShow() {
        if (Tips.GetTipsOfId(Tips.TAG.ActivityBattle, Tips.TAG.ActivityBattle_ACTIVITY)) {
            this.imageTipStory.visible = true;
        } else {
            this.imageTipStory.visible = false;
        }
        if (Tips.GetTipsOfId(Tips.TAG.ActivityBattle, Tips.TAG.ActivityBattle_TRANSFORM)) {
            this.imageTipTransform.visible = true;
        } else {
            this.imageTipTransform.visible = false;
        }
    }

    private onButtonClose() {
        this.close();
        // Game.UIManager.popAllScenesAndDialogs();
    }

    private onButtonTransForm() {
        loadUI(HunterTransformChoose)
            .then((scene: HunterTransformChoose) => {
                scene.setInfo();
                scene.show(UI.SHOW_FROM_TOP);
            });
    }

    private onButtonStory() {
        if(otherdb.getActivityBattle().length > 0) {
            loadUI(StoryInstanceMainScene)
                .then((scene: StoryInstanceMainScene) => {
                    scene.Init();
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }else{
            toast_warning(TextsConfig.TextsConfig_Hunter_Trans.transformNoCopy);
        }
        
    }
}
}