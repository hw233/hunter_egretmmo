namespace zj {
// HXH_GoldPop
// wang shen zhuo
// 2019/1/3
export class HelpGoldPop extends Dialog {
    public labelTime:eui.BitmapLabel;
    public labelNum:eui.BitmapLabel;

    private groupClose :eui.Group;

    private groupAnimate :eui.Group;


    public constructor() {
        super();
        this.skinName = "resource/skins/help/GoldPopSkin.exml";
        this.groupClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

        // this.addAnimatoin("ui_tongyong_daojuguang","armatureName", null, 0);
        this.addAnimatoin("ui_tongyong_beijingguang","armatureName", "003_beijingguang_04", 0);
        
        
    }

    public SetInfo(money,multiple,father){
        Game.SoundManager.playEffect(this.SoundOpen(30021));
        this.labelTime.text = multiple; 
        this.labelNum.text = Set.NumberUnit3(money);
    }

    public onBtnClose() {
        this.close();
    }

     //添加龙骨动画
    public addAnimatoin(dbName, armatureName, animationName, playTimes) {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = this.groupAnimate.explicitWidth / 2
                //display.y =this.height*0.25;
                display.y = this.groupAnimate.explicitHeight / 2;
                this.groupAnimate.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

     public SoundOpen(id) {
        let sound = TableClientSoundResource.Item(id);
        let textDrop = sound.sound_path;
        let strs = new Array()
        strs = textDrop.split("/");
        let soundtext = strs[2];
        soundtext = soundtext.replace('.', '_');
        return soundtext;
    }

}

}