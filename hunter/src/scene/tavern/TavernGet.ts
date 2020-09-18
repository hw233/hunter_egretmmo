namespace zj {
//TavernGet
//hexiaowei
// 2018/11/15
export class TavernGet extends Dialog {
    private group1: eui.Group;
    private group2: eui.Group;
    private group3: eui.Group;
    private imageFrame: eui.Image;
    private imageHunter: eui.Image;
    private labelHuntername: eui.Label;
    private label10Integral: eui.Label;
    private labelIntegral: eui.Label;
    private btnClose: eui.Button;
    private tavern: TavernScene;
    private imageCongratulations: eui.Image;
    private imageCongratulationsB: eui.Image;
    private groupIntegrate3: eui.Group;
    private groupIntegrate2: eui.Group;
    private groupBackdrop: eui.Group;
    private groupMain : eui.Group;
    private imageDouble2 : eui.Image;
    private imageDouble3 : eui.Image;
    public isShow : boolean;

    private goodsId: number = 0;
    private goodsId2: number = 0;
    private goodsConut : number = 0;
    private group2Center :number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/tavern/TavernGetSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;


        this.group1.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnGroupNode1End, this);
        this.group1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGroupNode1Begin, this);
        this.group2.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnGroupNode2End, this);
        this.group2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGroupNode2Begin, this);
        this.group3.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnGroupNode3End, this);
        this.group3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGroupNode3Begin, this);

        this.addBackdropAnimatoin("ui_tongyong_beijingguang", "001_beijignguang_02", 0, this.groupBackdrop);
        this.addEventListener(egret.TouchEvent.TOUCH_END , this.removeTouchEnd , this);

    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    //添加龙骨动画背景发光
    public addBackdropAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2
                display.y = group.explicitHeight;
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    public init(tavern) {
        this.tavern = tavern;
        this.group1.visible = false;
        this.group2.visible = false;
        this.group3.visible = false;
        this.isShow = false;
        this.imageDouble2.visible = false;
        this.imageDouble3.visible = false;
        
        //酒馆积分
        for (let k in Game.PlayerActivitySystem.Activities) {
			let v = Game.PlayerActivitySystem.Activities[k];
			if (v.stopTime > Date.parse(Game.Controller.serverNow().toString()) / 1000) {
                if (v.type == message.ActivityType.ACT_TYPE_LOTTERY_DOUBLING ) { 
                    this.isShow = true;
                }              
            }
        }
    }
    

    public setInfo(i: number, goodid?: number, type?, num?) {
        Helper.PlayEff(TableClientSoundResource.Item(30018).sound_path);
        this.goodsId = goodid;
        this.goodsId2 = 20014;
        if (i == 1) {
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupIntegrate3);
            this.group3.visible = true;
            
            let num10 = 100;
            if(this.isShow) {
                num10 = num10*2;
                this.imageDouble3.visible = this.isShow;
                this.imageDouble2.visible = !this.isShow;
            }

            this.label10Integral.text = num10.toString();
        }
        else {
            let general_roleId = PlayerHunterSystem.Table(goodid).general_roleId;
            let aptitude = PlayerHunterSystem.Table(goodid).aptitude;
            if (aptitude == 11) {
                this.imageFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[1] , this) ;
            } else if (aptitude == 12) {
                this.imageFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[3] , this) ;
            }
            else if (aptitude == 13) {
                this.imageFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[6] , this) ;
            }
            else if (aptitude == 14) {
                this.imageFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[9] , this) ;
            }
            else if (aptitude == 15) {
                this.imageFrame.source = cachekey(UIConfig.UIConfig_Role.heroFrame[13] , this) ;
            };
            let head_path = PlayerHunterSystem.MapInstance(general_roleId).head_path;
             if(Device.isReviewSwitch && Util.isWxMiniGame()) {
                 this.imageHunter.source = cachekey("wx_" + head_path , this) ;
             }else{
                 this.imageHunter.source = cachekey(head_path , this) ;
             }
            
            this.labelHuntername.text = PlayerHunterSystem.Table(goodid).general_name;
            this.group2Center = 0;
            if (type == 1) {
                this.group2.visible = true;
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupIntegrate2);
                this.labelIntegral.text = (num * 10).toString();
                this.goodsConut = num * 10;
            } else if (type == 4) {
                this.group1.horizontalCenter = 0;
                this.group2Center = 65;
                //this.labelIntegral.text = (num * 1).toString();
            } else if (type == 2) {
                this.group2.visible = true;
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupIntegrate2);
                this.labelIntegral.text = (num * 20).toString();
                this.goodsConut = num * 20;
            } else if (type == 3) {
                this.group2.visible = true;
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupIntegrate2);
                this.labelIntegral.text = (num * 30).toString();
                this.goodsConut = num * 30;
            }
            if(this.isShow) {
                this.labelIntegral.text = (this.goodsConut * 2).toString();
                this.goodsConut = (this.goodsConut * 2);  
                this.imageDouble2.visible = this.isShow;
                this.imageDouble3.visible = !this.isShow;
            }

            this.group1.visible = true;
            
        }
    }

    public setInfoAni() {

        egret.Tween.get(this.imageCongratulations)
            .to({ scaleY: 10, scaleX: 10, alpha: 0.75, fillAlpha: 0.75 }, 0)
            .to({ fillAlpha: 0.75 }, 0)
            .to({ alpha: 1 }, 0)
            .to({ scaleY: 0.85, scaleX: 0.85 }, 230, egret.Ease.quadIn)
            .call(() => {
                egret.Tween.get(this.imageCongratulationsB)
                    .to({ scaleY: 0.85, scaleX: 0.85, fillAlpha: 0.75 })
                    .to({ alpha: 0.75 }, 0)
                    .to({ scaleY: 2.5, scaleX: 2.5, fillAlpha: 0, alpha: 0 }, 1000, egret.Ease.sineInOut)

            })
            .to({ scaleY: 1.04, scaleX: 1.04 }, 130, egret.Ease.quadInOut)
            .to({ scaleY: 1, scaleX: 1 }, 300, egret.Ease.sineInOut);

    }

    public onBtnGroupNode1Begin() {
        let pop = <CommonDesGeneral>newUI(CommonDesGeneral);
        pop.name = "pop";
        pop.x = this.groupMain.width/2 - 260 + this.group2Center;
        pop.y = -this.groupMain.height / 2 + 20 ;
        pop.setInfo(this.goodsId, 1);
        this.groupMain.addChild(pop);
    }

    public onBtnGroupNode1End() {
        this.removeTouchEnd();
    }

    public onBtnGroupNode2Begin() {
        let commondesres = <Common_DesRes>newUI(Common_DesRes);
        commondesres.name = "commondesres";
        commondesres.x = this.groupMain.width/2 - 150;
        commondesres.y = -this.groupMain.height / 2 - 20;
        commondesres.setInfo(this.goodsId2, this.goodsConut);
        this.groupMain.addChild(commondesres);
    }

    public onBtnGroupNode2End() {
        this.removeTouchEnd();
    }

    public onBtnGroupNode3Begin() {
        let commondesres1 = <Common_DesRes>newUI(Common_DesRes);
        commondesres1.name = "commondesres1";
        commondesres1.x = this.groupMain.width/2 - 210;
        commondesres1.y = -this.groupMain.height / 2 - 20 ;
        commondesres1.setInfo(this.goodsId2, this.goodsConut);
        this.groupMain.addChild(commondesres1);
    }

    public onBtnGroupNode3End() {
        this.removeTouchEnd();
    }

    public removeTouchEnd() {
        let pop = this.groupMain.getChildByName("pop");
        let commondesres = this.groupMain.getChildByName("commondesres");
        let commondesres1 = this.groupMain.getChildByName("commondesres1");
        if (pop) {
            this.groupMain.removeChild(pop);
        }
        if (commondesres) {
            this.groupMain.removeChild(commondesres);
        }
        if (commondesres1) {
            this.groupMain.removeChild(commondesres1);
        }
    }

    public onBtnClose() {
        this.tavern.removeEvent();
        this.tavern = null;
        this.close();
        console.log("——————————————————————————" + "新手引导： 酒馆恭喜获得关闭" + "——————————————————————————");
    }
}

}