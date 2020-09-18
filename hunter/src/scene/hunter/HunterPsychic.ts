namespace zj {
/**
 * @author chen xi
 * 
 * @date 2019-1-11
 * 
 * @class 猎人念力
 */
export class HunterPsychic extends HunterSubUI {
    public groupMain: eui.Group;
    public groupPsychic1: eui.Group;
    public groupPsychic2: eui.Group;
    public groupPsychic3: eui.Group;
    public groupPsychic4: eui.Group;
    public groupPsychic5: eui.Group;
    public groupPsychic6: eui.Group;
    public btnGet: eui.Button;
    public btnRefresh: eui.Button;
    public groupName: eui.Group;
    public imgBigonName: eui.Image;
    public groupProperty: eui.Group;
    public imgBingoProperty: eui.Image;
    public groupPlan: eui.Group;
    public btnLevel: eui.Button;
    public groupEffect: eui.Group;
    public groupBigEffect: eui.Group;
    public listGroup: eui.List;
    public group1: eui.Group;
    public group2: eui.Group;


    private psychicItems: Array<HunterPsychicItem> = [];
    private listGroupData: eui.ArrayCollection = new eui.ArrayCollection();
    public showName: boolean = true;

    private max_psy = 6;
    private max_group = 2;
    private actIndex = 0;
    private teach_ani_end = false;
    public showProp = true;
    private isAct = false;
    private psy_items = [];
    private group_items = [];
    private show: boolean;
    private genInfo;
    private groupDataCur;
    private generalPsys;
    private curPsychicData;
    private effect;

    public constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterPsychicSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.init();
    }

    private init() {
        // this.groupEffect.addChild(resdb.UI(101106))
        this.groupEffect.visible = false;

        this.SetShowNameType();
        this.InitPsychicUI();

        let tap = egret.TouchEvent.TOUCH_TAP;
        this.btnLevel.addEventListener(tap, this.onBtnPlan, this);
        this.groupName.addEventListener(tap, this.onBtnName, this);
        this.groupProperty.addEventListener(tap, this.onBtnProperty, this);
        this.btnRefresh.addEventListener(tap, this.onBtnRefresh, this);
        this.btnGet.addEventListener(tap, this.onBtnGet, this);
        this.addEventListener(tap, this.onUp, this);
    }

    private InitPsychicUI() {
        for (let i = 1; i <= this.max_psy; i++) {
            let item = newUI(HunterPsychicItem) as HunterPsychicItem;
            this["groupPsychic" + i].addChild(item);
            this.psy_items.push(item);
            item.setInfo(this, i, null);
        }
        for (let i = 1; i <= this.max_group; i++) {
            let item = newUI(HunterPsychicGroupItem) as HunterPsychicGroupItem;

            this["group" + i].addChild(item);
            this.group_items.push(item);
            }
        this.groupBigEffect.visible = false;

        }

    private SetShowNameType() {
        this.imgBigonName.visible = this.showName
        this.imgBingoProperty.visible = this.showProp;
    }

    protected reloadGeneral(isAct?) {
        this.SetData(isAct)
        this.SetPsychicView()
        this.SetPsychicUI()
        this.setPlayEffect()
    }

    private SetData(isAct) {
        this.isAct = isAct || false;
        this.show = false;
        this.genInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);

        this.groupDataCur = PlayerHunterSystem.getGeneralPsychicCurGroup(this.generalId);
        this.generalPsys = Game.PlayerHunterSystem.getGeneralPsychicAttri(this.generalId);
        this.curPsychicData = PlayerHunterSystem.GetGeneralPsychicData(this.generalId);
    }

    private SetPsychicView() {
        // this.groupYinCang.visible = false
        let isOpen = this.genInfo.psychicInfo != null && this.genInfo.psychicInfo.length > 0;
        this.btnRefresh.visible = isOpen
        this.btnGet.visible = !isOpen
        this.groupEffect.visible = !isOpen && this.genInfo.star >= 6
        }

    private SetPsychicUI() {
        if (this.isAct) {
            this.actIndex = this.actIndex + 1;
            if (this.actIndex > this.max_psy) {
                this.actIndex = 0;
                this.setGroupList();
            } else {
                this.setPsychicItem();
    }
        } else {
            this.setPsychicItem();
            this.setGroupList();
        }
    }

    private setPsychicItem() {
        if (this.isAct) {
            this.psy_items[this.actIndex - 1].SetMainItemUI(this.generalPsys[this.actIndex - 1], this.curPsychicData[this.actIndex - 1], this.genInfo.star > 5, true, () => { this.SetPsychicUI() })//ccbk(self, self.SetPsychicUI)
            } else {
            for (let i = 0; i < this.max_psy; i++) {
                this.psy_items[i].SetMainItemUI(this.generalPsys[i], this.curPsychicData[i], this.genInfo.star > 5, false)
            }
        }
    }

    private setGroupList() {
        let setGroupItem = () => {
            for (let i = 0; i < this.max_group; i++) {
                this.group_items[i].SetInfo(i, this.groupDataCur[i + 1], this, this.isAct, true);
        }
    }

        let cbFunc = () => {
            this.isAct = false;
            this.teach_ani_end = true;
        }

        if (this.isAct) {
            setGroupItem();
            TipManager.GetPsychicGroup(this, this.groupDataCur, cbFunc);
        } else {
            setGroupItem();
        }

    }

    private setPlayEffect() {
        if (this.isAct) {
            Game.DragonBonesManager.playAnimation(this, "nianli_eff", "armatureName", "001_jihuo_yuanpan01", 1)
                .then(display => {
                    display.addEventListener(dragonBones.EventObject.COMPLETE, () => {

                    }, this)
                    this.groupBigEffect.addChild(display);
                }).catch(reason => {
                    toast(reason);
                });
            this.groupBigEffect.visible = true;
        }
    }

    private onBtnPlan() {
        loadUI(Common_RuleDialog)
            .then((dialog: Common_RuleDialog) => {
                dialog.init(RuleConfig.psychic);
            dialog.show(UI.SHOW_FROM_TOP);
        });
    }

    private onBtnName() {
        this.showName = !this.showName;
        this.RefreshNameType();
            }

    private onBtnProperty() {
        this.showProp = !this.showProp;
        this.RefreshNameType();
    }

    private RefreshNameType() {
        this.SetShowNameType()
        for (let i = 0; i < this.max_psy; i++) {
            this.psy_items[i].SetItemName()
        }
        }

    private onBtnGet() {
        this.teach_ani_end = false;
        this.GeneralPsychicActivateReq();
        Teach.addTeaching()
    }

    private onBtnRefresh() {
        loadUI(HunterPsychicRefreshNew).then((dialog: HunterPsychicRefreshNew) => {
            dialog.setInfo(this, () => {
                this.reloadGeneral();
            });
            dialog.show(UI.SHOW_FROM_TOP);
        });
    }

    private GeneralPsychicActivateReq() {
        Game.PlayerHunterSystem.psychicActivate(this.generalId)
            .then(() => {
                this.reloadGeneral(true);
            }).catch(() => {

            })
    }

    public lodeUI(groupInfo) {
        if (groupInfo == 0) {
            return;
        }
        let commonDes = <CommonDesPsychicGroup>newUI(CommonDesPsychicGroup);
        commonDes.SetInfo(groupInfo);
        commonDes.anchorOffsetX = commonDes.width / 2;
        commonDes.anchorOffsetY = commonDes.height / 2;
        commonDes.x = this.father.width / 2;
        commonDes.y = this.father.height / 2;
        commonDes.name = "commonDes";
        this.addChild(commonDes);
    }

    private onUp() {
        let ui = this.getChildByName("commonDes") as CommonDesPsychicGroup;
        if (ui) {
            this.removeChild(ui);
            ui.close();
        }
    }
}
}