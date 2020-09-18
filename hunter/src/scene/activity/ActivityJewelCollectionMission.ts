namespace zj {
// 宝石收藏 -- 任务达人
// wangshenzhuo
// 20019/05/07
export class ActivityJewelCollectionMission extends Dialog {

    private buttonClose : eui.Button;
    private imageName1 : eui.Image;
    private labelMission1 : eui.Label;
    private imageFrame1 : eui.Image;
    private imageAward1 : eui.Image;
    private labelTexrNum1 : eui.BitmapLabel;
    private imageExpNull1 : eui.Image;
    private imageExp1 : eui.Image;
    private labelDone1 : eui.Label;
    private buttonGetLeft1 : eui.Button;
    private imageComplete1 : eui.Image;
    private imageGet1 : eui.Image;
    private imageName2 : eui.Image;
    private labelMission2 : eui.Label;
    private imageFrame2 : eui.Image;
    private imageAward2 : eui.Image;
    private labelTextNum2 : eui.BitmapLabel;
    private imageExpNull2 : eui.Image;
    private imageExp2 : eui.Image;
    private labelDone2 : eui.Label;
    private buttonGetLeft2 : eui.Button;
    private imageGet2 : eui.Image;
    private imageComplete2 : eui.Image;
    private imageRect1 : eui.Image;
    private imageRect2 : eui.Image;

    private actIndex : number = 0;

    private dailyIndex : number = 0;
    private finalIndex : number = 0;
    private father : ActivityJewelCollectionSence;

    public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityJewelCollectionMissionSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclose, this);
        this.buttonGetLeft1.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonLeft1 , this);
        this.buttonGetLeft2.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonLeft2 , this);
        this.Init();
    }

    private Init() {
        this.actIndex = PlayerJewelSystem.GetActivityIndex();
        this.SetInfo();
        this.imageFrame1.visible = false;
        this.imageFrame2.visible = false;
    }

    public SetFather(father : ActivityJewelCollectionSence) {
        this.father = father;
    }

    private SetInfo() {
        this.SetInfo_Daily();
        this.SetInfo_Final();
    }

    //每周任务
    private SetInfo_Daily() {
        let id = PlayerJewelSystem.GetJewelDailyMission(this.actIndex);
        let tbl = Game.PlayerMissionSystem.itemMain(id);
        let index = Game.PlayerMissionSystem.itemIndex(tbl.type , tbl.sub_type);
        let[isdo, todo, isLock, isOver, percent, isCanGet] = Game.PlayerMissionSystem.itemComplete(index);
        let itemSet = PlayerItemSystem.Set(tbl.reward_goods[0][0] , null , tbl.reward_goods[0][1]);
        this.dailyIndex = index;

        this.labelMission1.text = tbl.name;    // 任务内容
        this.imageComplete1.visible = isOver;  // 已完成
        this.imageFrame2.source = cachekey(itemSet.Frame, this);   // 奖励
        this.imageAward1.source = cachekey(itemSet.Clip, this);
        this.labelTexrNum1.text = String(tbl.reward_goods[0][1]);
        this.labelDone1.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.collection , isdo , todo);  //完成度
        this.buttonGetLeft1.visible = !isOver;   // 领取按钮
        this.buttonGetLeft1.enabled = (!isOver && isCanGet );
        this.imageGet1.visible = isOver; // 已领取

        this.imageExp1.mask = this.imageRect1;
        this.imageRect1.width = this.imageRect1.width*(isdo/todo);
    }

    //终极任务
    private SetInfo_Final() {
        let id = PlayerJewelSystem.GetJewelFinalMission(this.actIndex);
        let tbl = Game.PlayerMissionSystem.itemMain(id);
        let index = Game.PlayerMissionSystem.itemIndex(tbl.type , tbl.sub_type);
        let [isdo, todo, isLock, isOver, percent, isCanGet] = Game.PlayerMissionSystem.itemComplete(index);
        let itemSet = PlayerItemSystem.Set(tbl.reward_goods[0][0] , null , tbl.reward_goods[0][1]);
        this.finalIndex = index;

        this.labelMission2.text = tbl.name;   // 任务内容
        this.imageComplete2.visible = isOver;  // 已完成
        this.imageFrame2.source = cachekey(itemSet.Frame, this);  //奖励
        this.imageAward2.source = cachekey(itemSet.Clip, this);
        this.labelTextNum2.text = String(tbl.reward_goods[0][1]);
        this.labelDone2.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.Jewel.degree_complete , isdo , todo);  //完成度
        this.buttonGetLeft2.visible = !isOver;
        this.buttonGetLeft2.enabled = (!isOver && isCanGet);
        this.imageGet2.visible = isOver;   //  已领取

        this.imageExp2.mask = this.imageRect2;
        this.imageRect2.width = this.imageRect2.width*(isdo/todo);
    }

    //每日任务领取
    private onButtonLeft1() {
        let mission = Game.PlayerMissionSystem.missionMap[this.dailyIndex];
         PlayerJewelSystem.ReqReward(mission.type , mission.subType).then((data: message.MissionRewardResponse) => {
            setTimeout(() => {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(data.body.gameInfo.getGoods);
                            dialog.setCB(()=>{this.SetInfo()});
							dialog.show();
						});
				}, 300)
        }).catch(reason => { });
    }

    //终极任务领取
    private onButtonLeft2() {   
        let mission = Game.PlayerMissionSystem.missionMap[this.finalIndex];
        PlayerJewelSystem.ReqReward(mission.type , mission.subType).then((data: message.MissionRewardResponse) => {
            setTimeout(() => {
					loadUI(CommonGetDialog)
						.then((dialog: CommonGetDialog) => {
							dialog.init(data.body.gameInfo.getGoods);
                             dialog.setCB(()=>{this.SetInfo()});
							dialog.show();
						});
				}, 300)
        }).catch(reason => { });
    }

    //关闭按钮
    public onBtnclose() {
        this.father.SetInfo();
		this.close(UI.HIDE_TO_TOP);
	}
}
}