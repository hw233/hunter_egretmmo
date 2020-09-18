namespace zj {
//RelicMainItem
//hexiaowei
// 2019/03/05
export class RelicMainItem extends eui.ItemRenderer {

    private imageBossPic: eui.Image;
    private imageRelicName: eui.Image;
    private groupStar: eui.Group;
    private imageLevel: eui.Image;
    private buttonAward: eui.Button;
    private buttonChest: eui.Button;
    private buttonFight: eui.Button;
    private labelOpenTime: eui.Label;
    private imageClose: eui.Image;
    private buttonRank: eui.Button;
    private labelChallenge: eui.Label;
    private labelDes: eui.Label;
    private groupCount: eui.Group;
    private groupAll: eui.Group;
    public bOpen: boolean;

    private instanceInfo: any;
    private id: number;
    private open_chest: Array<number>;


    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicMainItemSkin.exml";
        cachekeys(<string[]>UIResource["RelicMainItem"], null);
        this.buttonAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAward, this);
        this.buttonRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonRank, this);
        this.buttonChest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonChest, this);
        this.buttonFight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonFight, this);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
        }, this);
    }

    protected dataChanged() {

        let off1 = 50;
        let off2 = 15;
        let hightoff1 = Math.pow(-1, this.data.index + 1) * off1;
        let hightoff2 = Math.pow(-1, this.data.index) * (off1 + off2);
        let hightoff3 = Math.pow(-1, this.data.index + 1) * off2;
        let delayTime = 70 * this.data.index + 180;

        egret.Tween.get(this.groupAll)
            .to({ y: hightoff1 }, 0)
            .wait(delayTime)
            .to({ y: hightoff2 }, 100, egret.Ease.sineInOut)
            .to({ y: 0 }, 50, egret.Ease.sineIn);

        this.id = this.data.item.id;
        this.open_chest = this.data.item.open_chest;
        let thisid = this.id;
        let instanceInfo: any = Table.FindR(Game.PlayerInstanceSystem.RelicInfo, function (k, v) {
            return v.id == thisid;
        });
        if (instanceInfo[0] == null) {
            instanceInfo = new message.InstanceRelic();
            instanceInfo.def = null;
            instanceInfo.id = this.data.item.id;
        } else {
            instanceInfo = instanceInfo[0];
        }

        this.instanceInfo = instanceInfo;
        let relicStar = instanceInfo.star;
        let hurtLevel = PlayerDarkSystem.GetLevelByHurt(this.data.item.id, instanceInfo.damage_max);

        this.imageBossPic.source = cachekey(this.data.item.boss_head_client, this);
        this.imageRelicName.source = cachekey(this.data.item.relic_pic, this);
        this.labelDes.text = this.data.item.award_des;
        this.imageLevel.source = cachekey(UIConfig.UIConfig_DarkLand.relicHurtLevel[hurtLevel], this);
        Helper.NodeStarByAlignLeft(this.groupStar, relicStar, 5, 0.6, true, UIConfig.UIConfig_DarkLand.relicSmallStar[0], UIConfig.UIConfig_DarkLand.relicSmallStar[1]);

        let strOpen = "";
        let bOpen = false;
        let date: Date = Game.Controller.serverNow();
        // let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 20, date.getMinutes(), date.getSeconds()));  
        let humanDate = new Date();
        // let bb = humanDate.toLocaleString();
        let wDay = humanDate.getDay()
        // var timestamp = (new Date()).getTime() - 72000;

        if (wDay == 0) {
            wDay = 7;
        } else {
            wDay = wDay;
        }

        let num = PlayerDarkSystem.LastChallengeTime(instanceInfo.id);
        this.labelChallenge.text = num.toString();

        for (var i = 0; i < this.data.item.open_day.length; i++) {
            if (this.data.item.open_day[i] == 7) {
                strOpen = strOpen + TextsConfig.TextsConfig_Common.ri;
            } else {
                strOpen = strOpen + Helper.GetNumCH(this.data.item.open_day[i], false);
            }
            if (i != this.data.item.open_day.length - 1) {
                strOpen = strOpen + "、";
            }
            if (wDay == this.data.item.open_day[i]) {
                bOpen = true;
            } 
        }

        this.labelOpenTime.text = Helper.StringFormat(TextsConfig.TextsConfig_DarkLand.relic.openTime, strOpen);

        this.bOpen = bOpen;
        this.data.father.b_open = this.bOpen;
        if (this.bOpen) {
            this.data.father.teachOpenIndex = this.data.index - 2;
            this.labelChallenge.text = num.toString();
        } else {
            this.labelChallenge.text = "0";
        }
        this.buttonFight.visible = bOpen;
        this.imageClose.visible = !bOpen;
        this.groupCount.visible = bOpen;

        // this.buttonFight.visible = true;
        // this.imageClose.visible = false;

        // let num = PlayerDarkSystem.LastChallengeTime(instanceInfo.id);
        // if(num <= 0) {
        //     num = 0;
        // }
        // this.labelChallenge.text = PlayerDarkSystem.LastChallengeTime(instanceInfo.id).toString();
        // this.labelChallenge.text = num.toString();
        if (PlayerDarkSystem.LastChallengeTime(instanceInfo.id) > 0) {
            this.labelChallenge.textColor = Helper.RGBToHex("r:60,g:255,b:0");
        } else {
            this.labelChallenge.textColor = Helper.RGBToHex("r:255,g:38,b:0");
        }

        this.setShowAward(this.data.item.id, bOpen);


    }

    private setShowAward(id, bOpen) {
        let canOpenChest = PlayerDarkSystem.CanOpenByRelicId(id);
        if (canOpenChest.length > 0) {
            this.buttonFight.visible = false;
            this.buttonChest.visible = true;
        } else {

            this.buttonFight.visible = bOpen == true ? true : false;

            this.buttonChest.visible = false;
        }
    }

    private onButtonAward() {

        loadUI(RelicAwardMain)
            .then((dialog: RelicAwardMain) => {
                dialog.setRelicId(this.instanceInfo.id);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }


    private onButtonRank() {

        loadUI(RelicRank)
            .then((dialog: RelicRank) => {
                dialog.setInfo(this.id);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onButtonChest() {
        loadUI(RelicFinaChest)
            .then((dialog: RelicFinaChest) => {
                dialog.Init(this.open_chest, () => {
                    this.dataChanged();
                });
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onButtonFight() {
        //次數足夠
        if (PlayerDarkSystem.LastChallengeTime(this.instanceInfo.id) <= 0 && !Device.isDebug) {
            toast_warning(TextsConfig.TextConfig_Instance.errorCountWanted);
            return;
        }
        Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_RELIC;
        Game.PlayerMissionSystem.fightExt = this.data.item.id - 1;
        this.ReqGetMobsInfo();
    }

    private ReqGetMobsInfo() {
        this.ReqGetMobsInfo_Visit()
            .then((data: any) => {
                Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_RELIC;
                Game.PlayerFormationSystem.siteIndex = Game.PlayerMissionSystem.fightExt;
                loadUI(CommonFormatePveMain)
                    .then((dialog: CommonFormatePveMain) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(Game.PlayerMissionSystem.fightExt);
                    });
            }).catch(reason => { });
    }

    public ReqGetMobsInfo_Visit() {
        return new Promise((resolve, reject) => {
            let request = new message.MobsInfoRequest();
            request.body.battleType = message.EFormationType.FORMATION_TYPE_RELIC;
            request.body.mobsId = Game.PlayerMissionSystem.fightExt + 1;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.MobsInfoResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    return;
                }
                resolve(response);
                Game.PlayerRelateSystem.relationInfo();
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

}

//子项数据源
export class RelicMainItemData {
    index: number;
    //数据源
    item: TableInstanceRelic;
    father: RelicMain;
}


}