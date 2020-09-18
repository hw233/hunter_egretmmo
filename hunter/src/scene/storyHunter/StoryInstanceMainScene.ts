namespace zj {
//  wangshenzhuo
//  2019-7-17
//  HXH_StoryInstanceMain
export class StoryInstanceMainScene extends Scene {

    public groupAll: eui.Group;
    public imageBG: eui.Image;
    public imageRole: eui.Image;
    public groupRight: eui.Group;
    public groupRightItem1: eui.Group;
    public groupBurNormal: eui.Group;
    public imageBurNormal: eui.Image;
    public imageBurNormal2: eui.Image;
    public labelProgressNormal: eui.Label;
    public groupButHard: eui.Group;
    public imageBurHard: eui.Image;
    public labelProgressHard: eui.Label;
    public groupRghtItem2: eui.Group;
    public labelStoryInfo: eui.Label;
    public listBuffA: eui.List;
    public listBuffB: eui.List;
    public listHunterIconA: eui.List;
    public listHunterIconB: eui.List;
    public groupRightItem3: eui.Group;
    public labelStoryDuration: eui.Label;
    public labelTimeLeft: eui.Label;
    public buttonStart: eui.Button;
    public groupLeft: eui.Group;
    public listSelectInstance: eui.List;
    public buttonMall: eui.Button;
    public buttonClose: eui.Button;


    private data_list = [];
    private type_list = [];
    private cur_sel: number = 0;
    private cur_info = [];
    private cur_table: TableActivityBattle;
    private max_star: number;
    private cur_star: number;
    private listItem: eui.ArrayCollection;
    private listItemIndex: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/StoryInstanceMainSceneSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndRemoveShowSkill, this);
        this.listSelectInstance.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListInstance, this);
        this.buttonMall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMall, this);
        this.buttonStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonStart, this);
    }

    public Init() {
        this.SetInit();
        this.SetList();
        this.SetSelect(0);
    }

    public SelAndOpen() {
        for(let i = 0 ; i < this.data_list.length ; i ++){
            if(this.data_list[i].index == Game.PlayerInstanceSystem.activityBattleIndex) {
                this.SetSelect(i);
                this.onButtonStart();
            }
        }
    }

    private SetInit() {
        this.data_list = otherdb.getActivityBattle();
        this.type_list = [];
        let curTime = Game.Controller.serverNow();
        let curServerTime = Date.parse(curTime.toString()) / 1000;
        Table.Sort(this.data_list, function (a, b) {
            if (a.openTime < curServerTime && a.closeTime > curServerTime && b.openTime < curServerTime && b.closeTime > curServerTime) {
                if (a.openTime == b.openTime) {
                    return a.index - b.index;
                } else {
                    return b.index - a.index;
                }
            } else if (a.openTime < curServerTime && a.closeTime > curServerTime) {
                return true;
            } else if (b.openTime < curServerTime && b.closeTime > curServerTime) {
                return false;
            } else if (a.closeTime < curServerTime && a.stopTime > curServerTime && b.closeTime < curServerTime && b.stopTime > curServerTime) {
                if (a.closeTime == b.closeTime) {
                    return a.index - b.index;
                } else {
                    return b.closeTime - a.closeTime;
                }
            } else if (a.closeTime < curServerTime && a.stopTime > curServerTime) {
                return true;
            } else if (b.closeTime < curServerTime && b.stopTime > curServerTime) {
                return false;
            } else if (a.openTime > curServerTime && b.openTime > curServerTime) {
                if (a.openTime == b.openTime) {
                    return a.index - b.index;
                } else {
                    return b.openTime - a.openTime;
                }
            } else if (a.openTime > curServerTime) {
                return true;
            } else if (b.openTime > curServerTime) {
                return false;
            } else {
                return a.index - b.index;
            }
        })
    }

    private SetList() {
        this.listSelectInstance.itemRenderer = StoryInstanceMainItem;
        this.listSelectInstance.selectedIndex = 0;
        this.listItem = new eui.ArrayCollection();
        for (const k in this.data_list) {
            const v = this.data_list[k];
            let data = new StoryInstanceMainItemData();
            data.info = v;
            data.index = Number(k);
            data.father = this;
            this.listItem.addItem(data);
        }
        this.listSelectInstance.dataProvider = this.listItem;
        this.listItemIndex = this.listSelectInstance.selectedIndex;
    }

    private onListInstance(e: eui.ItemTapEvent) {
        if (this.listItemIndex == this.listSelectInstance.selectedIndex) {
            return;
        }
        if (this.listItemIndex != this.listSelectInstance.selectedIndex) {
            this.listItem.itemUpdated(this.listItem.source[this.listItemIndex]);
            this.listItem.itemUpdated(this.listItem.source[this.listSelectInstance.selectedIndex]);
            this.listItemIndex = this.listSelectInstance.selectedIndex;
        }
        this.SetRightInfo();
    }

    private SetSelect(sel: number) {
        this.cur_sel = sel;

        this.SetRightInfo();
    }

    private SetRightInfo() {
        this.cur_info = this.data_list[this.cur_sel];
        this.cur_table = TableActivityBattle.Item(this.cur_info["buffValue"]);
        this.max_star = this.cur_table.instance_pack.length * 3;
        this.cur_star = otherdb.ActivityBattleGetCurStar(this.cur_info);

        this.imageBG.source = cachekey(this.cur_table.instance_bg, this);
        this.imageRole.source = cachekey(this.cur_table.instance_half, this);

        this.labelProgressNormal.text = this.cur_star + "/" + this.max_star;
        let size_bar = this.cur_star / this.max_star;
        this.imageBurNormal2.scaleX = size_bar;
        this.imageBurNormal2.mask = this.imageBurNormal;

        this.listHunterIconA.itemRenderer = HXH_InstanceAwardItem;
        let listIconAItem = new eui.ArrayCollection();
        for (let i = 0; i < this.cur_table.extra_general[0].length; i++) {
            let data = new HXH_InstanceAwardItemData();
            data.info = this.cur_table.extra_general[0][i];
            data.father = this;
            data.scale = 0.8;
            listIconAItem.addItem(data);
        }
        this.listHunterIconA.dataProvider = listIconAItem;

        this.listHunterIconB.itemRenderer = HXH_InstanceAwardItem;
        let listIconBItem = new eui.ArrayCollection();
        for (let i = 0; i < this.cur_table.extra_general[1].length; i++) {
            let data = new HXH_InstanceAwardItemData();
            data.info = this.cur_table.extra_general[1][i];
            data.father = this;
            data.scale = 0.8;
            listIconBItem.addItem(data);
        }
        this.listHunterIconB.dataProvider = listIconBItem;

        this.listBuffA.itemRenderer = StoryInstanceMainBuff;
        let listbuffAItem = new eui.ArrayCollection();
        for (let i = 0; i < this.cur_table.extra_reward1.length; i++) {
            let data = new StoryInstanceMainBuffData();
            data.id = i;
            data.goodsId = this.cur_table.extra_reward1[i][0];
            data.father = this;
            data.per = this.cur_table.extra_reward1[i][1];
            listbuffAItem.addItem(data);
        }
        this.listBuffA.dataProvider = listbuffAItem;

        this.listBuffB.itemRenderer = StoryInstanceMainBuff;
        let listbuffBItem = new eui.ArrayCollection();
        for (let i = 0; i < this.cur_table.extra_reward2.length; i++) {
            let data = new StoryInstanceMainBuffData();
            data.id = i;
            data.goodsId = this.cur_table.extra_reward2[i][0];
            data.father = this;
            data.per = this.cur_table.extra_reward2[i][1];
            listbuffBItem.addItem(data);
        }
        this.listBuffB.dataProvider = listbuffBItem;

        let str_open = Set.TimeForMail(this.cur_info["openTime"]);;
        let str_close = Set.TimeForMail(this.cur_info["closeTime"]);;
        this.labelStoryDuration.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.timeOpenAndClose, str_open, str_close);
        this.labelTimeLeft.visible = false;
        let curTime = Game.Controller.serverNow();
        let curServerTime = Date.parse(curTime.toString()) / 1000;

        if ((this.cur_info["closeTime"] - curServerTime) > 0 && this.cur_info["openTime"] < curServerTime) {
            this.labelTimeLeft.visible = true;
            let timems = this.cur_info["closeTime"] - curServerTime;
            this.labelTimeLeft.text = TextsConfig.TextsConfig_Activity.battleLeftDes + Helper.FormatDaysTimeCh(timems);
        }
    }

    // 鼠标抬起移除技能详情
    private touchEndRemoveShowSkill() {
        let show = this.getChildByName("skill");
        if (show) this.removeChild(show);

        let award = this.getChildByName("award");
        if (award) this.removeChild(award);
    }

    private onButtonMall() {
        let curTime = Game.Controller.serverNow();
        let curServerTime = Date.parse(curTime.toString()) / 1000;
        if (this.cur_info["stopTime"] < curServerTime) {
            toast_warning(TextsConfig.TextsConfig_Activity.battleStop);
        } else if (this.cur_info["openTime"] > curServerTime) {
            toast_warning(TextsConfig.TextsConfig_Activity.battleNotStart);
        } else {
            loadUI(StoryInstanceMall)
                .then((scene: StoryInstanceMall) => {
                    scene.Load(this.cur_info);
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }
    }

    private onButtonStart() {
        let curTime = Game.Controller.serverNow();
        let curServerTime = Date.parse(curTime.toString()) / 1000;
        if (this.cur_info["closeTime"] < curServerTime) {
            toast_warning(TextsConfig.TextsConfig_Activity.battleStop);
        } else if (this.cur_info["openTime"] > curServerTime) {
            toast_warning(TextsConfig.TextsConfig_Activity.battleNotStart);
        } else {
            loadUI(StoryInstanceSelectStage)
                .then((scene: StoryInstanceSelectStage) => {
                    scene.Init();
                    scene.Load(this.cur_info);
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }
    }

    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }



}
}