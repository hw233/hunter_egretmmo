namespace zj {
// wang shen zhuo
// Activity_TimeRaseDaysItem
// 2019.05.11   
export class ActivityTimeRaceMissionItem extends eui.ItemRenderer {

    public lbMissionDes: eui.Label;
    public listViewAward: eui.List;
    public lbRaceNum: eui.BitmapLabel;
    public imgFrame: eui.Image;
    public imgIcon: eui.Image;
    public btnGo: eui.Button;
    public btnCharge: eui.Button;
    public btnReward: eui.Button;
    public imgShadow: eui.Image;
    public imgLock: eui.Image;
    public lbLevel: eui.Label;
    public imageDone: eui.Image
    public groupMain: eui.Group;
    public groupIcon: eui.Group;
    public groupContent: eui.Group;
    public groupLock: eui.Group;

    private listDaysItem: eui.ArrayCollection;
    private listDaysIndex: number = 0;

    private index: number;
    private missions: any;
    private father: ActivityTimeRaceMain;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityTimeRaceMissionItemSkin.exml";
        cachekeys(<string[]>UIResource["ActivityTimeRaceMissionItem"], null);
        this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGo, this);
        this.btnReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonReward, this);
    }

    protected dataChanged() {
        this.imgIcon.source = cachekey("ui_acitivity_timerace_IconRace_png" , this);
        this.index = this.data.index;
        this.missions = this.data.info;
        this.father = this.data.father;

        this.InitBase();
        this.SetInfoUI();
    }

    private InitBase() {
        this.btnGo.visible = false;
        this.imageDone.visible = false;
        this.btnReward.visible = false;
        this.btnReward.enabled = true;
        this.btnCharge.visible = false;
        this.groupLock.visible = false;
    }

    private SetInfoUI() {
        let moveMetre = this.missions.info.race_km;
        let desStr = this.missions.des;
        let openStr = this.missions.openStr;
        let bOpen = this.missions.bOpen;
        let bShowGo = !(this.missions.info.mission_type == message.MissionSubType.MISSION_SUB_TYPE_ADD_CHARGE);
        let rewardTbl = [];
        for (const k in this.missions.info.reward_goods) {
            const v = this.missions.info.reward_goods[k];
            let goods = new message.GoodsInfo();
            goods.goodsId = v[0];
            goods.count = v[1];
            rewardTbl.push(goods);
        }
        if (bOpen) {
            if (this.missions.state == 0) {
                //已领取
                this.imageDone.visible = true;
                this.btnReward.visible = false;
                this.btnReward.enabled = false;
            } else if (this.missions.state == 1) {
                //不可领取
                this.btnGo.visible = bShowGo;
            } else if (this.missions.state == 2) {
                this.btnReward.visible = true;
            }
        } else {
            this.groupLock.visible = true;
        }

        this.lbRaceNum.text = moveMetre;
        this.lbMissionDes.textFlow = Util.RichText(desStr);
        this.lbLevel.text = openStr;

        this.listViewAward.selectedIndex = -1; // 默认选中
        this.listViewAward.itemRenderer = SkyAreanDropInfoItemAward;//
        this.listDaysItem = new eui.ArrayCollection();
        for (let i = 0; i < rewardTbl.length; i++) {
            let data = new SkyAreanDropInfoItemAwardData();
            data.index = i;
            data.isshow = 1;
            data.father = this;
            data.reward_good_count = rewardTbl[i].count;
            data.reward_good_id = rewardTbl[i].goodsId;
            data.reward_good_show_type = rewardTbl[i].show_type;
            this.listDaysItem.addItem(data);
        }

        this.listViewAward.dataProvider = this.listDaysItem;
        this.listDaysIndex = this.listViewAward.selectedIndex;
    }

    private onButtonGo() {
        this.btnGo.enabled = false;
        this.father.ButtonCloseAndGo(1, this.missions.info.sub_type);
    }

    private onButtonReward() {
        // if(this.father.runAni == false) {
        this.ReqReward();
        // }
    }

    private ReqReward() {
        let sub_type = this.missions.info.sub_type;
        PlayerRaceSystem.ReqReward_Visit(sub_type).then((data: message.MissionRewardResponse) => {
            setTimeout(() => {
                this.father.allKM = PlayerRaceSystem.GetAllKM();
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.init(data.body.gameInfo.getGoods);
                        dialog.show();
                        dialog.setCB(() => { this.SetInfoGet() })
                    })
            }, 500);

        }).catch(reason => { });
    }

    private SetInfoGet() {
        let levelUp = () => {
            if (Game.PlayerInfoSystem.BaseInfo.level > Game.PlayerInfoSystem.baseInfo_pre.level) {
                TipManager.LevelUp();
                Game.PlayerInfoSystem.baseInfo_pre = Game.PlayerInfoSystem.BaseInfo;
            }
        }

        let cb = () => {
            this.father.allKM = PlayerRaceSystem.GetAllKM();
            this.father.SetALlCoresInfo();
            this.father.SetDaysList();
            this.father.SetInfo();
            this.father.SetMissionList();
            this.father.CircleMoveAni(this.father.lastCore, this.father.allKM)
            this.father.Imagemask();
        }

        egret.Tween.get(this.groupContent)
            .to({ x: 0 }, 0)
            .to({ y: 0 }, 0)
            .to({ x: 1000 }, 200);
        setTimeout(() => {
            levelUp();
            cb();
        }, 600)

    }
}

export class ActivityTimeRaceMissionItemData {
    father: ActivityTimeRaceMain;
    index: number;
    info: any;
}
}