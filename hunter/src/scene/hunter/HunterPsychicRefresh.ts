namespace zj {
    /**
 * @author chen xi.
 * 
 * @date 2019-1-12
 * 
 * @class 猎人念力修炼
 */
    export class HunterPsychicRefresh extends Dialog {
        // private btnClose: eui.Button;
        // private labelOwnNumber: eui.Label;
        // private btnAdd: eui.Button;
        // private groupRefresh: eui.Group;
        // private groupPropertyChange: eui.Group;
        // private listProperty: eui.List;
        // private groupChoose: eui.Group;
        // private groupShowName: eui.Group;
        // private labelShowName: eui.Label;
        // private imgShowNameBigon: eui.Image;
        // private groupShowProperty: eui.Group;
        // private labelShowProperty: eui.Label;
        // private imgShowPropertyBigon: eui.Image;
        // private groupShowAnimation: eui.Group;
        // private labelShowAnimation: eui.Label;
        // private imgShowAnimationBigon: eui.Image;
        // private groupBefore: eui.Group;
        // private listPsychicBefore: eui.List;
        // private groupSave: eui.Group;
        // private btnSave: eui.Button;
        // private btnCancel: eui.Button;
        // private groupCost: eui.Group;
        // private btnRefresh: eui.Button;
        // private labelBaseCostNumber: eui.Label;
        // private labelLockCostNumber: eui.Label;
        // private labelTotalCostNumber: eui.Label;
        // private groupAfter: eui.Group;
        // private listPsychicAfter: eui.List;
        // private btnIllustrate: eui.Button;

        // private generalId: number;
        // private callback: Function;
        // private isShowName: boolean = true;
        // private isShowProperty: boolean = true;
        // private isShowAnimation: boolean = true;
        // private isAnimationEnd: boolean = true;
        // private isSelecteResult: boolean = true;
        // private psychicItemsBefore: Array<HunterPsychicItem> = [];
        // private psychicItemsAfter: Array<HunterPsychicItem> = [];
        // private listPsychicBeforeData: eui.ArrayCollection = new eui.ArrayCollection();
        // private listPsychicAfterData: eui.ArrayCollection = new eui.ArrayCollection();
        // private lockPosition: Array<number> = []; // default is 0

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterPsychicRefreshSkin.exml";
            // this.width = UIManager.StageWidth;
            // this.height = UIManager.StageHeight;

            // this.init();
    }

        // private init() {
        //     let tap = egret.TouchEvent.TOUCH_TAP;
        //     this.btnClose.addEventListener(tap, this.onBtnClose, this);
        //     this.btnAdd.addEventListener(tap, this.onBtnAdd, this);
        //     this.groupShowName.addEventListener(tap, this.onBtnShowName, this);
        //     this.groupShowProperty.addEventListener(tap, this.onBtnShowProperty, this);
        //     this.groupShowAnimation.addEventListener(tap, this.onBtnShowAnimation, this);
        //     this.btnRefresh.addEventListener(tap, this.onBtnRefresh, this);
        //     this.btnSave.addEventListener(tap, this.onBtnSave, this);
        //     this.btnCancel.addEventListener(tap, this.onBtnCancel, this);
        //     this.btnIllustrate.addEventListener(tap, this.onBtnIllustrate, this);

        //     for (let i = 1; i <= 6; i++) {
        //         let groupBefore = this[`groupLeftPsychic${i}`] as eui.Group;
        //         let itemBefore = new HunterPsychicItem();
        //         itemBefore.horizontalCenter = 0;
        //         itemBefore.verticalCenter = 0;
        //         groupBefore.addChild(itemBefore);

        //         itemBefore.setType(TableEnum.Enum.PsychicItemType.UpdateItem, i, (index: number, lock: boolean) => {
        //             this.setLockByIndex(index, lock);
        //         });
        //         this.psychicItemsBefore.push(itemBefore);

        //         let groupAfter = this[`groupRightPsychic${i}`] as eui.Group;
        //         let itemAfter = new HunterPsychicItem();
        //         itemAfter.horizontalCenter = 0;
        //         itemAfter.verticalCenter = 0;
        //         groupAfter.addChild(itemAfter);
        //         itemAfter.setType(TableEnum.Enum.PsychicItemType.UpdateItem, i, (index: number, lock: boolean) => {
        //             this.setLockByIndex(index, lock);
        //         });
        //         this.psychicItemsAfter.push(itemAfter);

        //         this.lockPosition.push(0);
        //     }
        // }

        // public setInfo(generalId: number, cb: Function) {
        //     this.generalId = generalId;
        //     this.callback = cb;

        //     this.groupSave.visible = false;
        //     this.groupCost.visible = true;

        //     this.refresh();
        // }

        // private refresh() {
        //     this.setPsychicRefreshInfo();

        //     this.setConsumeInfo();

        //     this.setChangeAttriList();

        //     this.setRefreshInfo();
        // }

        // private setRefreshInfo() {
        //     this.listPsychicBeforeData.removeAll();
        //     let groupData = PlayerHunterSystem.getGeneralPsychicCurGroup(this.generalId);
        //     for (let i = 0; i < Game.PlayerMissionSystem.tableLength(groupData); i++) {
        //         let data = new HunterPsychicGroupItemData();
        //         data.index = i;
        //         data.info = groupData[i];
        //         // data.
        //         Set.ButtonBackgroud
        //         let v = groupData[i];
        //         this.listPsychicBeforeData.addItem(v);
        //     }
        //     this.listPsychicBefore.dataProvider = this.listPsychicBeforeData;
        //     this.listPsychicBefore.itemRenderer = HunterPsychicGroupItem;

        //     this.listPsychicAfterData.removeAll();
        //     let groupNextData = PlayerHunterSystem.getGeneralPsychicCurGroup(this.generalId);
        //     for (let i = 0; i < Game.PlayerMissionSystem.tableLength(groupNextData); i++) {
        //         let v = groupNextData[i];
        //         this.listPsychicAfterData.addItem(v);
        //     }
        //     this.listPsychicAfter.dataProvider = this.listPsychicAfterData;
        //     this.listPsychicAfter.itemRenderer = HunterPsychicGroupItem;
        // }

        // private setChangeAttriList() {
        //     let [listMap, lastMap] = PlayerHunterSystem.GetNextPsychicAttriChange(this.generalId);
        //     let changeList = [];
        //     for (let k in lastMap) {
        //         if (lastMap.hasOwnProperty(k)) {
        //             let v = lastMap[k];
        //             changeList.push([k, v, listMap[k]]);
        //         }
        //     }
        //     let data = new eui.ArrayCollection(changeList);
        //     this.listProperty.dataProvider = data;
        //     this.listProperty.itemRenderer = HunterPsychicChangeItem;
        // }

        // private setPsychicRefreshInfo() {
        //     let psychicData = PlayerHunterSystem.GetGeneralPsychicData(this.generalId);
        //     for (let i = 0; i < this.psychicItemsBefore.length; i++) {
        //         let v = this.psychicItemsBefore[i];
        //         v.setupCurrentInfo(psychicData[i], this.lockPosition[i]);
        //     }

        //     let haveNext = PlayerHunterSystem.GeneralPsychicHaveNext(this.generalId);
        //     if (haveNext) {
        //         for (let i = 0; i < this.psychicItemsAfter.length; i++) {
        //             let v = this.psychicItemsAfter[i];
        //             v.setupNextInfo(psychicData[i], this.lockPosition[i]);
        //         }
        //     } else {
        //         for (let i = 0; i < this.psychicItemsAfter.length; i++) {
        //             let v = this.psychicItemsAfter[i];
        //             v.setupNoNextInfo(psychicData[i], this.lockPosition[i]);
        //         }
        //     }
        // }

        // private setConsumeInfo() {
        //     let own = PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_PSYCHIC);
        //     this.labelOwnNumber.text = own;

        //     let costMin = CommonConfig.psychic_refresh_consume(0);
        //     let cost = CommonConfig.psychic_refresh_consume(this.getLockLength());
        //     this.labelBaseCostNumber.text = costMin.toString();
        //     this.labelLockCostNumber.text = (cost - costMin).toString();
        //     this.labelTotalCostNumber.text = cost.toString();
        // }

        // private getLockLength(): number {
        //     let len = 0;
        //     for (let i = 0; i < this.lockPosition.length; i++) {
        //         let v = this.lockPosition[i];
        //         if (v != 0) len += 1;
        //     }
        //     return len;
        // }

        // private setLockByIndex(index: number, lock: boolean) {

        //     if (this.isSelecteResult == false) {
        //         toast_warning(TextsConfig.TextsConfig_Hunter_psychic.psychic_lockSaveTips);
        //         // show animation
        //     } else if (this.getLockLength() == CommonConfig.general_psychic_lock_max_num && this.lockPosition[index - 1] == 0) {
        //         let msg = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_psychic.psychic_lockTips, CommonConfig.general_psychic_lock_max_num);
        //         toast_warning(msg);
        //     } else {
        //         this.lockPosition[index - 1] = lock ? index : 0;

        //         this.setConsumeInfo();

        //         this.setPsychicRefreshInfo();
        //     }
        // }

        // private onBtnAdd() {
        //     loadUI(Common_OutPutDialog).then((dialog: Common_OutPutDialog) => {

        //         dialog.show(UI.SHOW_FROM_TOP);
        //     })
        // }

        // private onBtnShowName() {
        //     this.isShowName = !this.isShowName;
        //     this.imgShowNameBigon.visible = this.isShowName;

        //     for (let i = 0; i < this.psychicItemsBefore.length; i++) {
        //         let v1 = this.psychicItemsBefore[i];
        //         v1.showName(this.isShowName);

        //         let v2 = this.psychicItemsAfter[i];
        //         v2.showName(this.isShowName)
        //     }
        // }

        // private onBtnShowProperty() {
        //     this.isShowProperty = !this.isShowProperty;
        //     this.imgShowPropertyBigon.visible = this.isShowProperty;

        //     for (let i = 0; i < this.psychicItemsBefore.length; i++) {
        //         let v1 = this.psychicItemsBefore[i];
        //         v1.showProperty(this.isShowProperty);

        //         let v2 = this.psychicItemsAfter[i];
        //         v2.showProperty(this.isShowProperty);
        //     }
        // }

        // private onBtnShowAnimation() {
        //     this.isShowAnimation = !this.isShowAnimation;
        //     this.imgShowAnimationBigon.visible = this.isShowAnimation;
        //     // 
        // }

        // private onBtnRefresh() {

        // }

        // private onBtnSave() {

        // }

        // private onBtnCancel() {

        // }

        // private onBtnIllustrate() {
        //     loadUI(HunterPsychicGroupIllustrateDialog).then((dialog: HunterPsychicGroupIllustrateDialog) => {
        //         dialog.show(UI.SHOW_FROM_TOP);
        //     });
        // }

        // private onBtnClose() {
        //     this.close(UI.HIDE_TO_TOP);
        // }
    }

}