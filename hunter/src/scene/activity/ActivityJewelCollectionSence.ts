namespace zj {
// wangshenzhuo
// 2019.05.06
// 宝石收藏
export class ActivityJewelCollectionSence extends Scene {

    private groupAddBack: eui.Group;
    private groupTitle: eui.Group;
    private groupBgAni: eui.Group;
    private groupAin: eui.Group;
    private groupName: eui.Group;
    private buttonClose: eui.Button;
    private labelTime: eui.Label;
    private labelDes: eui.Label;
    private buttonMission: eui.Button;
    private imageTipMission: eui.Image;
    private labelHaveJewel: eui.Label;
    private buttonMall: eui.Button;
    private imageTipMall: eui.Image;
    private labelDailyJewel: eui.Label;
    private labelDailyJewelMax: eui.Label;
    private imageMissionPic1: eui.Image;
    private imageMissionName1: eui.Image;
    private imageMissionPic2: eui.Image;
    private imageMissionName2: eui.Image;
    private imageMissionPic3: eui.Image;
    private imageMissionName3: eui.Image;
    private labelMission11: eui.Label;
    private labelMission21: eui.Label;
    private labelItemName1: eui.Label;
    private labelItemName2: eui.Label;
    private labelMission22: eui.Label;
    private labelMission23: eui.Label;
    private labelMission12: eui.Label;
    private labelMission13: eui.Label;
    private labelGetJewel11: eui.Label;
    private labelGetJewel21: eui.Label;
    private labelGetJewel22: eui.Label;
    private labelGetJewel23: eui.Label;
    private labelGetJewel31: eui.Label;
    private labelGetJewel32: eui.Label;
    private labelGetJewel12: eui.Label;
    private labelGetJewel13: eui.Label;
    private groupItem1: eui.Group;
    private imageFrame1: eui.Image;
    private imageclip1: eui.Image;
    private labelNum1: eui.BitmapLabel;
    private groupItem2: eui.Group;
    private imageFrame2: eui.Image;
    private imageclip2: eui.Image;
    private labelNum2: eui.BitmapLabel;
    private imageTop: eui.Image;


    public actIndex: number = 0;
    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityJewelCollectionSenceSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclose, this);
        this.buttonMission.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMission, this);
        this.buttonMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMall, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE , ()=>{
            egret.Tween.removeTweens(this.imageTop);  //因为是循环播放  特殊处理
        } , null);
        this.Init();
    }

    public Init() {
        Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", "000_diban1", 0)
            .then((display: dragonBones.EgretArmatureDisplay) => {
                display.x = 55;
                display.y = display.height / 2 - 3;
                this.groupBgAni.addChild(display);
            });
        egret.Tween.get(this.imageTop, { loop: true })
            .to({ y: 38.48 }, 0)
            .to({ y: 33 }, 1000)
            .to({ y: 38.48 }, 1000);
        // this.imageclip1.visible = false;
        // this.imageclip2.visible = false;
        this.labelNum1.visible = false;
        this.labelNum2.visible = false;
        this.SetInfo();
    }

    public SetInfo() {
        this.actIndex = PlayerJewelSystem.GetActivityIndex();
        this.TimeOrContent();
        this.Condition1();
        this.Condition2();
        this.Condition3();
        this.JewelExchange();
        this.tips();
    }

    // 活动时间和内容描述 
    private TimeOrContent() {
        this.labelTime.text = PlayerJewelSystem.GetActivityTime(this.actIndex);
        this.labelDes.text = TextsConfig.TextsConfig_Activity.Jewel.activityContent;

        let missionType = PlayerJewelSystem.GetMissionType(this.actIndex);
        if (missionType == PlayerJewelSystemMission_Type.CARD) {
            this.imageMissionName1.source = cachekey(UIConfig.UIConfig_Jewel.Card.text1, this);
            this.imageMissionPic1.source = cachekey(UIConfig.UIConfig_Jewel.Card.img1, this);
            this.imageMissionName2.source = cachekey(UIConfig.UIConfig_Jewel.Card.text2, this);
            this.imageMissionPic2.source = cachekey(UIConfig.UIConfig_Jewel.Card.img2, this);
        } else if (missionType == PlayerJewelSystemMission_Type.HUNTER) {
            this.imageMissionName1.source = cachekey(UIConfig.UIConfig_Jewel.Hunter.text1, this);
            this.imageMissionPic1.source = cachekey(UIConfig.UIConfig_Jewel.Hunter.img1, this);
            this.imageMissionName2.source = cachekey(UIConfig.UIConfig_Jewel.Hunter.text2, this);
            this.imageMissionPic2.source = cachekey(UIConfig.UIConfig_Jewel.Hunter.img2, this);
        }
        this.imageMissionName3.source = cachekey(UIConfig.UIConfig_Jewel.Item.text1, this);
        this.imageMissionPic3.source = cachekey(UIConfig.UIConfig_Jewel.Item.img1, this);
    }

    //宝石获取途径(条件一)
    private Condition1() {
        let condition1 = PlayerJewelSystem.GetCondition_1(this.actIndex);
        for (let i = 0; i < 3; i++) {
            this["labelMission1" + (i + 1)].text = condition1[i][0];
            this["labelGetJewel1" + (i + 1)].text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.X, condition1[i][1]);
        }
    }

    //条件二
    private Condition2() {
        let condition2 = PlayerJewelSystem.GetCondition_2(this.actIndex);
        for (let i = 0; i < 3; i++) {
            this["labelMission2" + (i + 1)].text = condition2[i][0];
            this["labelGetJewel2" + (i + 1)].text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.X, condition2[i][1]);
        }
    }

    //条件三
    private Condition3() {
        let condition3 = PlayerJewelSystem.GetCondition_3(this.actIndex);
        for (let i = 0; i < condition3.length; i++) {
            let itemSet = PlayerItemSystem.Set(condition3[i][0]);
            this["imageFrame" + (i + 1)].source = cachekey(itemSet.Frame, this);
            this["imageclip" + (i + 1)].source = cachekey(itemSet.Clip, this);
            this["labelItemName" + (i + 1)].text = itemSet.Info["name"];
            this["labelGetJewel3" + (i + 1)].text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.X, condition3[i][1])
        }
    }

    //宝石兑换
    private JewelExchange() {
        let tbl = PlayerJewelSystem.JewelItem(this.actIndex);
        this.labelDailyJewelMax.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.jewel_limit, tbl.daily_limit);
        this.labelDailyJewel.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.jewel_Daily, Game.PlayerMissionSystem.missionActive.jewelToday, tbl.daily_limit);
        this.labelHaveJewel.text = Game.PlayerMissionSystem.missionActive.jewelHave.toString();
    }

    //红点
    public tips() {
        this.imageTipMission.visible = Tips.GetTipsOfId(Tips.TAG.Jewel, 1);
        this.imageTipMall.visible = Tips.GetTipsOfId(Tips.TAG.Jewel, 2);
    }

    //任务达人按钮
    private onButtonMission() {
        loadUI(ActivityJewelCollectionMission)
            .then((dialog: ActivityJewelCollectionMission) => {
                dialog.SetFather(this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    //宝石商店按钮
    private onButtonMall() {
        loadUI(ActivityJewelCollectionMall)
            .then((dialog: ActivityJewelCollectionMall) => {
                dialog.SetFather(this);
                dialog.SetInfo();
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    //关闭按钮
    public onBtnclose() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}