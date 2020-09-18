namespace zj {
//  wangshenzhuo
//  2019/7/22
//  HXH_StoryInstanceSelectStage  猎人故事 冒险

export class StoryInstanceSelectStage extends Scene {

    public imageBG: eui.Image;
    public labelStarNumNormal: eui.Label;
    public listStarAwardNormal: eui.List;
    public buttonMall: eui.Button;
    public groupAdd: eui.Group;
    public groupNormal: eui.Group;
    public buttonNormal: eui.Button;
    public imageLockNormal: eui.Image;
    public groupHard: eui.Group;
    public buttonHard: eui.Button;
    public imageLockHard: eui.Image;
    public buttonClose: eui.Button;
    public labelTimesTitle: eui.Label;
    public labelTimes: eui.Label;
    public buttonAddTimes: eui.Button;
    public imageIcon: eui.Image;
    public labelHavaNum: eui.Label;
    public lbGemstone: eui.Label;
    public jewel: eui.Image;
    public btnAddGemstone: eui.Button;


    public subWin: StoryInstanceAdventure;
    public cur_info: message.ActivityInfo;
    public cur_table: TableActivityBattle;
    private max_star: number;
    private cur_star: number;
    private curType: number;
    public activity_info;
    private Timers: egret.Timer;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/StoryInstanceSelectStageSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMall, this);
        this.Timers = new egret.Timer(999, 0);
        this.Timers.addEventListener(egret.TimerEvent.TIMER, this.updateInfo, this);
        this.Timers.start();
        this.buttonNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonNormal, this);
        this.buttonHard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHard, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
        this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
        this.buttonAddTimes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAddTimes, this);
    }

    public Init() {
        this.curType = TableEnum.Enum.ActivityInstance.Normal;
        this.buttonNormal.enabled = false;
        this.imageLockNormal.visible = false;
        this.buttonAddTimes.enabled = true;

        this.subWin = new StoryInstanceAdventure();
        this.subWin.Father(this);
        this.groupAdd.addChild(this.subWin);
    }

    public Load(activity_info) {
        this.activity_info = activity_info;
        this.cur_info = otherdb.getActivityByTypeAndIndex(activity_info.type, activity_info.index);
        this.cur_table = TableActivityBattle.Item(this.cur_info.buffValue);
        this.imageBG.source = cachekey(this.cur_table.instance_bg, this);
        this.max_star = this.cur_table.instance_pack.length * 3;
        this.cur_star = otherdb.ActivityBattleGetCurStar(this.cur_info);
        this.labelStarNumNormal.text = this.cur_star + "/" + this.max_star;

        this.imageLockHard.visible = true;
        let maxMob = this.cur_info.itemCount;
        if (maxMob + 1 >= this.cur_table.instance_elite[0]) {
            this.imageLockHard.visible = false;
            this.curType = TableEnum.Enum.ActivityInstance.Hard;
            this.buttonHard.enabled = false;
            this.buttonNormal.enabled = true;
        }
        this.imageIcon.source = cachekey(PlayerItemSystem.ItemPath(this.cur_table.act_coin), this);

        this.updateInfo();
        this.loadList();
        this.SetStarGetList();
        this.updateUIStates();
    }

    private updateUIStates() {
        if (Game.PlayerInfoSystem.Token > 100000) {
            if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
            } else {
                this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
        } else {
            this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
        }
        if (this.lbGemstone.text.length > 6) {
            this.lbGemstone.size = 12;
        } else {
            this.lbGemstone.size = 16;
        }
    }

    private loadList() {
        let mob = this.cur_info.itemCount + 1;
        if (this.cur_info.itemCount == 0) {
            mob = this.cur_table.instance_normal[0];
        }

        if (this.curType == TableEnum.Enum.ActivityInstance.Normal) {
            this.subWin.LoadList(this.cur_table.instance_normal, mob, this.cur_info);
        } else {
            this.subWin.LoadList(this.cur_table.instance_elite, mob, this.cur_info);
        }
    }

    private SetStarGetList() {
        this.listStarAwardNormal.itemRenderer = StoryInstanceSelectStageItem;
        let listStarAwardNormalItem = new eui.ArrayCollection();
        for (let i = 0; i < this.cur_table.star_zone.length; i++) {
            let data = new StoryInstanceSelectStageItemData();
            data.index = i;
            data.table = this.cur_table;
            data.star = this.cur_star;
            data.info = this.cur_info;
            data.father = this;
            listStarAwardNormalItem.addItem(data);
        }
        this.listStarAwardNormal.dataProvider = listStarAwardNormalItem;
    }

    private updateInfo() {
        let maxTimes = CommonConfig.activity_instance_battle_time + Game.PlayerVIPSystem.vipInfo.buy_activity_time * CommonConfig.activity_instance_buy_battle_time_add
        this.labelTimes.text = (maxTimes - Game.PlayerVIPSystem.vipInfo.activity_time + "/" + maxTimes);
        this.labelHavaNum.text = otherdb.getActivityByTypeAndIndex(this.activity_info.type, this.activity_info.index).daysIndex.toString();
    }

    //长按详情
    private showGoodsProperty(ev: egret.Event) {
        let a = ev.data;
        if (Game.UIManager.dialogCount() == 0) {
            let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "firstGoods";
            this.addChild(show);
        }
    }

    // 长按抬起
    private removeShow() {
        let show = this.getChildByName("firstGoods");
        if (show) {
            this.removeChild(show);
        }
    }

    private onButtonMall() {
        loadUI(StoryInstanceMall)
            .then((scene: StoryInstanceMall) => {
                scene.Load(this.cur_info);
                scene.show(UI.SHOW_FROM_TOP);
            });
    }

    private onButtonNormal() {
        this.curType = TableEnum.Enum.ActivityInstance.Normal;
        this.buttonNormal.enabled = false;
        this.buttonHard.enabled = true;
        this.loadList();
    }

    //  钻石
    private onBtnAddGemstone() {
        loadUI(PayMallScene)
            .then((scene: PayMallScene) => {
                scene.show(UI.SHOW_FROM_TOP);
                scene.init();
            });
    }

    private onButtonHard() {
        let maxMob = this.cur_info.itemCount;
        if (maxMob + 1 >= this.cur_table.instance_elite[0]) {
            this.curType = TableEnum.Enum.ActivityInstance.Hard;
            this.buttonHard.enabled = false;
            this.buttonNormal.enabled = true;
            this.loadList();
        } else {
            toast_warning(TextsConfig.TextsConfig_Activity.mastWinNor);
        }
    }

    private onButtonAddTimes() {
        let a = CommonConfig.activity_instance_buy_consume_token(Game.PlayerVIPSystem.vipInfo.buy_activity_time);
        let b = CommonConfig.activity_instance_buy_battle_time_add;
        let c = CommonConfig.activity_instance_buy_time_limit - Game.PlayerVIPSystem.vipInfo.buy_activity_time;
        let d = CommonConfig.activity_instance_buy_time_limit;
        let numMsg = Helper.StringFormat(TextsConfig.TextsConfig_Activity.battleNumTip, a, b, c, d);
        loadUI(ConfirmCancelDialog)
            .then((dialog: ConfirmCancelDialog) => {
                dialog.show(UI.SHOW_FROM_TOP);
                dialog.setInfo(numMsg);
                dialog.setCB((() => {
                    this.BuyNumReq();
                }));
            });
    }

    public BuyNumReq() {
        if (CommonConfig.activity_instance_buy_time_limit - Game.PlayerVIPSystem.vipInfo.buy_activity_time <= 0) {
            setTimeout(() => {
                loadUI(ConfirmCancelDialog)
                    .then((dialog: ConfirmCancelDialog) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(TextsConfig.TextsConfig_User.notime);
                    });
            }, 300)

        } else {
            this.ActivityInstanceBuyTimeReq().then((data: message.ActivityInstanceBuyTimeResponse) => {
                toast_warning(TextsConfig.TextsConfig_Activity.buyBattleNumSuccessTip);
                let maxTimes = CommonConfig.activity_instance_battle_time + Game.PlayerVIPSystem.vipInfo.buy_activity_time * CommonConfig.activity_instance_buy_battle_time_add;
                this.labelTimes.text = maxTimes - Game.PlayerVIPSystem.vipInfo.activity_time + "/" + maxTimes;
            }).catch(reason => { });
        }

    }

    public ActivityInstanceBuyTimeReq() {
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

    private onButtonClose() {
        this.Timers.stop();
        this.close(UI.HIDE_TO_TOP);
    }
}
}