namespace zj {
// HXH_StoryInstanceAdventureItem
// wangshenzhuo
// 2019-07-24
export class StoryInstanceAdventureItem extends eui.ItemRenderer {

    public groupMain: eui.Group;
    public groupDown: eui.Group;
    public imageBoardStageInfo: eui.Image;
    public imageIcon2: eui.Image;
    public buttonDekaron: eui.Button;
    public imageFrameButton2: eui.Image;
    public labelMission1: eui.Label;
    public imageMission1: eui.Image;
    public labelMission2: eui.Label;
    public imageMission2: eui.Image;
    public imageMission3: eui.Image;
    public labelMission3: eui.Label;
    public groupUp: eui.Group;
    public imageBoardStage: eui.Image;
    public labelName: eui.Label;
    public imageIcon1: eui.Image;
    public listViewDrops: eui.List;
    public groupLeftTimes: eui.Group;
    public labelTimeNum: eui.Label;
    public buttonTimeAdd: eui.Button;
    public groupFirstBloodAll: eui.Group;
    public groupAll: eui.Group;
    public imageFrameFirstBlood: eui.Image;
    public imageIconFirstBlood: eui.Image;
    public labelFirstBlood: eui.BitmapLabel;
    public groupFirstBlood: eui.Group;
    public imageGetFirstBlood: eui.Image;
    public imageMack: eui.Image;
    public imageFrameButton1: eui.Image;
    public imagePassStar: eui.Image;

    public index: number;
    public instanceId: number;
    public father: StoryInstanceAdventure;
    public activityInfo;
    public info: TableActivityBattleInstance;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/StoryInstanceAdventureItemSkin.exml";
        cachekeys(<string[]>UIResource["StoryInstanceAdventureItem"], null);
        this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowGoodProperty, this);
        this.buttonDekaron.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonDekaron, this);
        this.imageGetFirstBlood.visible = false;
        this.x = this.groupMain.x;
        this.y = this.groupMain.y;
        this.groupDown.scaleY = 0;
        this.groupMain.height -= this.groupDown.height;
        this.height -= this.groupDown.height;
    }

    protected dataChanged() {
        this.index = this.data.index;
        this.instanceId = this.data.instanceId;
        this.father = this.data.father;
        this.activityInfo = this.data.activityInfo;

        if (this.instanceId == null) {
            return;
        }
        if (this.index == this.father.itemShowIndex) {
            this.data.isShow = false;
            this.father.itemShowIndex = -1;
        }
        if (this.data.isShow) {
            this.moveUp();
        } else {
            this.moveDown();
        }

        this.info = TableActivityBattleInstance.Item(this.instanceId);
        this.SetUI();
        this.LoadList();
    }

    public SetUI() {
        this.labelName.text = this.info.name;
        this.imageIcon1.source = cachekey(this.info.instance_pic1, this);
        this.imageIcon2.source = cachekey(this.info.instance_pic2, this);

        let star = 0;

        let maxMob = this.father.mob;
        let curMob = this.info.instance_id;

        let cardInfo = TableItemPotato.Table();
        let reward = this.info.first_reward[0][0]
        let cardId = Table.FindF(cardInfo, function (k, v) {
            return v.id == reward;
        })

        if (curMob < maxMob) {
            let curStarInfo = Table.FindR(this.activityInfo.dailyAddItems, function (k, v) {
                if (v.index == curMob) {
                    return true;
                }
            })
            star = curStarInfo[0].rewardIndex.length;
            this.imagePassStar.visible = true;
            this.groupFirstBloodAll.visible = false;
        } else {
            this.groupFirstBloodAll.visible = true;
            this.imagePassStar.visible = false;
        }

        this.imagePassStar.source = cachekey(UIConfig.UIConfig_Instance.instanceStar[star], this);
        this.imageMack.visible = curMob > maxMob;
        this.data.isMack = curMob > maxMob;

        this.imageFrameButton1.visible = curMob == maxMob;
        this.imageFrameButton2.visible = curMob == maxMob;

        this.SetStarInfo();
    }

    private SetStarInfo() {
        let getDes = otherdb.ActivityBattleGetInstanceStarDes(this.instanceId);
        for (const k in getDes) {
            const v = getDes[k];
            this["labelMission" + (Number(k) + 1)].text = v;
        }
        let curStarInfo = otherdb.ActivityBattleGetCurStarById(this.activityInfo, this.instanceId);
        for (let i = 1; i < 4; i++) {
            if (Table.FindK(curStarInfo, i) == -1) {
                this["imageMission" + i].source = cachekey(UIConfig.UIConfig_Activity.StoryCheckPath[2], this);
                this["labelMission" + i].textColor = Helper.RGBToHex("r:170,g:170,b:170");
            } else {
                this["imageMission" + i].source = cachekey(UIConfig.UIConfig_Activity.StoryCheckPath[1], this);
                this["labelMission" + i].textColor = Helper.RGBToHex("r:0,g:249,b:0");
            }
        }
    }

    public LoadList() {
        this.listViewDrops.itemRenderer = StoryInstanceAdventureItemItem;
        let listItem = new eui.ArrayCollection();
        let a = this.info.rewards;
        for (let i = 0; i < this.info.rewards.length; i++) {
            let itemData = new StoryInstanceAdventureItemItemData();
            itemData.itemId = this.info.rewards[i][0];
            itemData.itemCount = this.info.rewards[i][1];
            itemData.father = this;
            listItem.addItem(itemData);
        }
        this.listViewDrops.dataProvider = listItem;

        let itemSet = PlayerItemSystem.Set(this.info.first_reward[0][0], 1, this.info.first_reward[0][1]);
        this.groupFirstBlood.removeChildren();
        this.imageFrameFirstBlood.source = cachekey(itemSet.Frame, this);
        this.imageIconFirstBlood.source = cachekey(itemSet.Clip, this);
        this.labelFirstBlood.text = "x" + Set.NumberUnit2(this.info.first_reward[0][1]);

        if (this.groupFirstBloodAll.visible == true) {
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirstBlood, "daojuguang");
        }
    }

    private onShowGoodProperty(e: egret.TouchEvent) {
        let goodsinfo = new message.GoodsInfo();
        goodsinfo.goodsId = this.info.first_reward[0][0];
        goodsinfo.count = this.info.first_reward[0][1];
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: goodsinfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY, isshow: false });
    }

    public moveDown() {
        if (this.data.isTween) {
            egret.Tween.get(this.groupDown).to({ scaleY: 1 }, 150, egret.Ease.sineInOut);
            egret.Tween.get(this.groupMain).to({ height: 299 }, 150, egret.Ease.sineInOut);
            egret.Tween.get(this).to({ height: 299 }, 150, egret.Ease.sineInOut);
            egret.Tween.get(this.skin).to({ height: 299 }, 150, egret.Ease.sineInOut).call(()=>{
                this.data.isTween = false;
            });
        } else {
            this.groupDown.scaleY = 1;
            this.groupMain.height = 299;
            this.height = 299;
            this.skin.height = 299;
        }
    }

    public moveUp() {
        if (this.data.isTween) {
            egret.Tween.get(this.groupDown).to({ scaleY: 0 }, 150, egret.Ease.sineInOut);
            egret.Tween.get(this.groupMain).to({ height: 119 }, 150, egret.Ease.sineInOut);
            egret.Tween.get(this).to({ height: 119 }, 150, egret.Ease.sineInOut);
            egret.Tween.get(this.skin).to({ height: 119 }, 150, egret.Ease.sineInOut).call(()=>{
                this.data.isTween = false;
            });
        } else {
            this.groupDown.scaleY = 0;
            this.groupMain.height = 119;
            this.height = 119;
            this.skin.height = 119;
        }
    }

    private onButtonDekaron() {
        let maxTimes = CommonConfig.activity_instance_battle_time + Game.PlayerVIPSystem.vipInfo.buy_activity_time * CommonConfig.activity_instance_buy_battle_time_add;
        if (maxTimes <= Game.PlayerVIPSystem.vipInfo.activity_time) {
            let a = CommonConfig.activity_instance_buy_consume_token(Game.PlayerVIPSystem.vipInfo.buy_activity_time);
            let b = CommonConfig.activity_instance_buy_battle_time_add;
            let c = CommonConfig.activity_instance_buy_time_limit - Game.PlayerVIPSystem.vipInfo.buy_activity_time;
            let d = CommonConfig.activity_instance_buy_time_limit;
            let numMsg = Helper.StringFormat(TextsConfig.TextsConfig_Activity.battleNumTip, a, b, c, d);
            loadUI(ConfirmCancelDialog)
                .then((dialog: ConfirmCancelDialog) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.setInfo(numMsg);
                    dialog.setCB(() => {
                        this.ActivityInstanceBuyTimeReq().then((data: any) => {
                            toast_warning(TextsConfig.TextsConfig_Activity.buyBattleNumSuccessTip);
                        }).catch(reason => { });
                    });
                });
        } else {
            Game.PlayerMissionSystem.MobsInfo(message.EFormationType.FORMATION_TYPE_ACTIVITY, this.instanceId).then(() => {
                Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_ACTIVITY;
                PlayerActivitySystem.activityBattleCurPos = this.instanceId;
                Game.PlayerInstanceSystem.activityBattleIndex = this.activityInfo.index;
                Game.PlayerInstanceSystem.activityBattleCachInfo = {
                    goodsId: this.info.rewards[0][0],
                    count: otherdb.getActivityByTypeAndIndex(this.father.father.cur_info.type, this.father.father.cur_info.index).daysIndex,
                    type: this.father.father.cur_info.type,
                    index: this.father.father.cur_info.index
                }
                let a = Game.PlayerInstanceSystem.activityBattleCachInfo;
                loadUI(CommonFormatePveMain)
                    .then((dialog: CommonFormatePveMain) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(1);
                    });
            }).catch(() => { })
        }
    }

    private ActivityInstanceBuyTimeReq() {
        return new Promise((resolve, reject) => {
            let request = new message.ActivityInstanceBuyTimeRequest();
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.ActivityInstanceBuyTimeResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);

                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

    private MobsInfoReq() {
        return new Promise((resolve, reject) => {
            let request = new message.MobsInfoRequest();
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.MobsInfoResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);

                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

    //添加龙骨动画
    private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, aniName: string) {
        Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animationName, playTimes)
            .then(display => {
                display.x = group.explicitWidth / 2 + 1;
                display.y = group.explicitHeight / 2;
                display.name = aniName;
                if (group.getChildByName(aniName) == null) {
                    group.addChild(display);
                }
                display.scaleX = 0.5;
                display.scaleY = 0.5;
            })
            .catch(reason => {
            });
    }
}


//子项数据源
export class StoryInstanceAdventureItemData {
    //数据源
    instanceId: number;
    activityInfo: any;
    index: number;
    father;
    isShow: boolean = true;
    isMack: boolean;
    isTween: boolean = false;
    // showIndex: number;


}


}