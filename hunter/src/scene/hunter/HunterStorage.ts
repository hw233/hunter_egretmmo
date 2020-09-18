namespace zj {
/**
 * @author chen xi
 * 
 * @date 2018-11-30
 * 
 * @class 猎人仓库界面
 */
export class HunterStorage extends Dialog {
    private labelHunterNum: eui.Label;
    private btnSort: eui.Button;
    private ownHunterList: eui.List;
    private nodeSort: eui.Group;
    private btnTypeSort: eui.Button;
    private btnStarSort: eui.Button;
    private btnLevelSort: eui.Button;
    private btnDeposit: eui.Button;
    private btnTakeOut: eui.Button;
    private labelHunterStorageNum: eui.Label;
    private btnClose: eui.Button;
    private storageHunterList: eui.List;

    private ownHunterListData = new eui.ArrayCollection();
    /** Selected id from own hunter list. */
    private ownHunterSelectedArray: Array<number> = [];
    /** Current role own's hunter id. */
    private ownHunters: Array<number> = [];

    private storageHunterListData = new eui.ArrayCollection();
    /** Selected id from the storage list. */
    private storageHunterSelectedArray: Array<number> = [];
    /** Current role's hunter id in the storage. */
    private storageHunters: Array<number> = [];

    private callback: Function;
    private hunterSortType: number;
    private sortOpen = false;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterStorageSkin.exml";

        this.init();
    }

    private init() {
        let tap = egret.TouchEvent.TOUCH_TAP;
        this.btnSort.addEventListener(tap, this.onBtnSort, this);
        this.btnTypeSort.addEventListener(tap, this.onBtnTypeSort, this);
        this.btnStarSort.addEventListener(tap, this.onBtnStarSort, this);
        this.btnLevelSort.addEventListener(tap, this.onBtnLevelSort, this);
        this.btnDeposit.addEventListener(tap, this.onBtnDeposit, this);
        this.btnTakeOut.addEventListener(tap, this.onBtnTakeOut, this);
        this.btnClose.addEventListener(tap, this.onBtnClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        this.hunterSortType = Tips.GetIntValue("hunter-storage-type", TableEnum.Enum.HXHHunterEnum.Level);
        this.nodeSort.visible = false;
        this.nodeSort.scaleY = 0.2;

        this.ownHunterList.allowMultipleSelection = true;
        this.ownHunterList.itemRenderer = HunterStorageItem;
        this.ownHunterList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onOwnHunterTap, this);

        this.storageHunterList.allowMultipleSelection = true;
        this.storageHunterList.itemRenderer = HunterStorageItem;
        this.storageHunterList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onStorageHunterTap, this);
    }

    public setInfo(cb: Function) {
        this.callback = cb;

        this.loadOwnHunterList(true, false);
        this.loadStorageHunterList(true, false);

        this.setButtonState();
    }

    /**
     * 加载当前拥有的猎人list
     * @param bSort 是否需要排序， 初始化加载，点击排序按钮之后，需要排序； 发送网络协议之后，不需要排序
     * @param onlyRefreshData 第一次加载的时候，设置list相关属性
     */
    private loadOwnHunterList(bSort = false, onlyRefreshData = true) {
        if (bSort == true) {
            this.ownHunters = PlayerHunterSystem.GetWareHunterList(this.hunterSortType, false);
        }

        // set own hunter label
        let stringColor = (this.ownHunters.length < CommonConfig.general_add_max_num) ? TextsConfig.TextsConfig_Activity.greenstr_light : TextsConfig.TextsConfig_Activity.redstr_light;
        // this.labelHunterNum.textColor = Helper.RGBToHex(stringColor);
        this.labelHunterNum.textFlow = Util.RichText(Helper.StringFormat(stringColor, (this.ownHunters.length.toString() + "/" + CommonConfig.general_add_max_num.toString())));

        // set own hunter list
        let lc_tbl = [...this.ownHunters];
        let fix = PlayerItemSystem.FixCount(this.ownHunters.length, 20, 4);
        for (let i = 0; i < fix; i++) {
            lc_tbl.push(0);
        }

        this.ownHunterListData.removeAll();
        for (let i = 0; i < lc_tbl.length; i++) {
            let v = lc_tbl[i];
            let itemData = new HunterBaseItemData();
            itemData.generalId = v;
            itemData.isLongPress = true;
            itemData.isSelected = false;
            this.ownHunterListData.addItem(itemData);
        }

        this.ownHunterList.dataProvider = this.ownHunterListData;
    }

    private onOwnHunterTap(e: eui.ItemTapEvent) {
        let item = this.ownHunterList.getElementAt(e.itemIndex) as HunterStorageItem;
        let data = this.ownHunterListData.getItemAt(e.itemIndex) as HunterBaseItemData;

        // check generalId
        let generalId = data.generalId;
        if (generalId == null || generalId == 0) {
            return;
        }

        // check longPress
        if (item != null && item.isInLongPress == true) {
            item.resumeLongPressState();
            return;
        }

        if (data.isSelected == false) {// remain at last one hunter.
            let storageLast = this.ownHunters.length > (this.ownHunterSelectedArray.length + 1);
            if (storageLast == false) {
                toast_warning(TextsConfig.TextsConfig_Hunter.storage_last_general);
                return;
            }
        }

        // refresh item's data
        data.isSelected = !data.isSelected;
        this.ownHunterListData.replaceItemAt(data, e.itemIndex);

        if (data.isSelected) {
            this.ownHunterSelectedArray.push(generalId);
        } else {
            let index = this.ownHunterSelectedArray.indexOf(generalId);
            if (index > -1) {
                this.ownHunterSelectedArray.splice(index, 1);
            }
        }

        this.setButtonState();
    }

    /**
     * 加载当前仓库中的猎人list
     * @param bSort 是否需要排序， 初始化加载，点击排序按钮之后，需要排序； 发送网络协议之后，不需要排序
     * @param onlyRefreshData 第一次加载的时候，设置list相关属性
     */
    private loadStorageHunterList(bSort = false, onlyRefreshData = true) {
        if (bSort) {
            this.storageHunters = PlayerHunterSystem.GetWareHunterList(this.hunterSortType, true);
        }

        // set storage hunter label
        let vipLevel = Game.PlayerInfoSystem.VipLevel;
        let add = TableVipinfo.Item(vipLevel).package_add;
        let maxLevel = CommonConfig.general_ware_max_num + add;
        let stringColor = (this.storageHunters.length < maxLevel) ? TextsConfig.TextsConfig_Activity.greenstr_light : TextsConfig.TextsConfig_Activity.redstr_light;
        // this.labelHunterStorageNum.textColor = Helper.RGBToHex(stringColor);
        this.labelHunterStorageNum.textFlow = Util.RichText(Helper.StringFormat(stringColor, (String(this.storageHunters.length) + "/" + String(maxLevel))));

        // set storage hunter list
        let lc_tbl = [...this.storageHunters];
        let fix = PlayerItemSystem.FixCount(lc_tbl.length, 20, 4);
        for (let i = 0; i < fix; i++) {
            lc_tbl.push(0);
        }

        this.storageHunterListData.removeAll();
        for (let i = 0; i < lc_tbl.length; i++) {
            let v = lc_tbl[i];
            let itemData = new HunterBaseItemData();
            itemData.generalId = v;
            itemData.isLongPress = false;
            itemData.isSelected = false;
            this.storageHunterListData.addItem(itemData);
        }

        this.storageHunterList.dataProvider = this.storageHunterListData;
    }

    private onStorageHunterTap(e: eui.ItemTapEvent) {
        let data = this.storageHunterListData.getItemAt(e.itemIndex) as HunterBaseItemData;
        if (data == null) return;
        let generalId = data.generalId;
        if (generalId == null || generalId == 0) return;

        data.isSelected = !data.isSelected;
        this.storageHunterListData.replaceItemAt(data, e.itemIndex);
        if (data.isSelected) {
            this.storageHunterSelectedArray.push(generalId);
        } else {
            let index = this.storageHunterSelectedArray.indexOf(generalId);
            if (index > -1) {
                this.storageHunterSelectedArray.splice(index, 1);
            }
        }

        this.setButtonState();
    }

    private setButtonState() {
        this.btnDeposit.enabled = (this.ownHunterSelectedArray.length > 0);
        this.btnTakeOut.enabled = (this.storageHunterSelectedArray.length > 0);
    }

    private onTouchEnd() {
        if (this.sortOpen) {
            this.onBtnSort();
        }
    }
    private animationEnd: boolean = true;
    private onBtnSort() {
        if (!this.animationEnd) return;

        if (this.sortOpen) {
            this.sortAnimationClose();
        } else {
            this.sortAnimationOpen();
        }
        this.sortOpen = !this.sortOpen;
    }

    private sortAnimationOpen() {
        this.animationEnd = false;
        egret.Tween.get(this.nodeSort)
            .call(() => {
                this.nodeSort.visible = true;
            }, this)
            .to({ scaleY: 1.0 }, 350, egret.Ease.backOut).call(() => {
                this.animationEnd = true;
            });

    }

    private sortAnimationClose() {
        this.animationEnd = false;
        egret.Tween.get(this.nodeSort)
            .to({ scaleY: 0.2 }, 350, egret.Ease.backIn)
            .call(() => {
                this.nodeSort.visible = false;
            }, this).call(() => {
                this.animationEnd = true;
            });
    }

    private onBtnTypeSort() {
        this.hunterSortType = TableEnum.Enum.HXHHunterEnum.Quality;
        Tips.SetIntValue("hunter-storage-type", this.hunterSortType);
        this.onBtnSort();

        this.loadOwnHunterList(true);
        this.loadStorageHunterList(true);
    }

    private onBtnStarSort() {
        this.hunterSortType = TableEnum.Enum.HXHHunterEnum.Star;
        Tips.SetIntValue("hunter-storage-type", this.hunterSortType);
        this.onBtnSort();

        this.loadOwnHunterList(true);
        this.loadStorageHunterList(true);
    }

    private onBtnLevelSort() {
        this.hunterSortType = TableEnum.Enum.HXHHunterEnum.Level;
        Tips.SetIntValue("hunter-storage-type", this.hunterSortType);
        this.onBtnSort();

        this.loadOwnHunterList(true);
        this.loadStorageHunterList(true);
    }

    private onBtnDeposit() {
        // 入库猎人数量
        let inStorageHunterNum = 0;
        for (let i = 0; i < this.storageHunterListData.length; i++) {
            let v = this.storageHunterListData.getItemAt(i) as HunterBaseItemData;
            if (v.generalId != 0) {
                inStorageHunterNum += 1;
            }
        }
        let vipLevel = Game.PlayerInfoSystem.VipLevel;
        let add = TableVipinfo.Item(vipLevel).package_add;
        let maxLevel = CommonConfig.general_ware_max_num + add;
        if (maxLevel >= this.ownHunterSelectedArray.length + inStorageHunterNum) {
            let p = Game.PlayerHunterSystem.generalWareHouse(this.ownHunterSelectedArray, true);
            p.then(() => {
                this.onRequestSuccess();
            }).catch(() => {
                this.ownHunterSelectedArray = [];
                this.refresh();
            });
        } else {
            let show = true;
            let number = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.storageTips.In[1], this.ownHunterSelectedArray.length);
            let add = TableVipinfo.Item(Game.PlayerInfoSystem.VipLevel).package_add;
            let big = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.storageTips.In[2], inStorageHunterNum, CommonConfig.general_ware_max_num + add);

            loadUI(HunterStorageExceed).then((dialog: HunterStorageExceed) => {
                dialog.setInfo(show, number, big, () => {
                    this.ownHunterSelectedArray = [];
                    this.refresh();
                });

                dialog.show(UI.SHOW_FROM_TOP);
            });
        }
    }

    private onBtnTakeOut() {
        // 猎人出仓库
        let ownHunterNum = 0;
        for (let i = 0; i < this.ownHunterListData.length; i++) {
            const v = this.ownHunterListData.getItemAt(i) as HunterBaseItemData;
            if (v.generalId != 0) {
                ownHunterNum += 1;
            }
        }

        if (CommonConfig.general_add_max_num >= (ownHunterNum + this.storageHunterSelectedArray.length)) {

            let p = Game.PlayerHunterSystem.generalWareHouse(this.storageHunterSelectedArray, false);
            p.then(() => {
                this.onRequestSuccess(false);
            }).catch(() => {
                this.storageHunterSelectedArray = [];
                this.refresh();
            });

        } else {
            let show = false;
            let number = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.storageTips.Out[1], this.storageHunterSelectedArray.length);
            let big = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.storageTips.Out[2], ownHunterNum, CommonConfig.general_add_max_num);

            loadUI(HunterStorageExceed).then((dialog: HunterStorageExceed) => {
                dialog.setInfo(show, number, big, () => {
                    this.storageHunterSelectedArray = [];
                    this.refresh();
                });

                dialog.show(UI.SHOW_FROM_TOP);
            });
        }
    }

    // 处理猎人出库、入库成功之后的操作
    private onRequestSuccess(isInStorage: boolean = true) {
        if (isInStorage) { // 进入仓库
            for (let i = 0; i < this.ownHunterSelectedArray.length; i++) {
                let v = this.ownHunterSelectedArray[i];

                // 客户端设置是否在仓库
                let [_, findGeneralIndex] = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), (_, _v: message.GeneralInfo) => {
                    return _v.general_id == v;
                });
                if (findGeneralIndex != null) {
                    Game.PlayerHunterSystem.queryAllHunters()[findGeneralIndex].is_ware = true;
                }
                if (Game.PlayerHunterSystem.queryHunter(v) != null) {
                    Game.PlayerHunterSystem.queryHunter(v).is_ware = true;
                }

                // 选中猎人从拥有数组移除，添加到仓库猎人数组
                let index = Table.FindK(this.ownHunters, v);
                if (index >= 0) {
                    this.ownHunters.splice(index, 1);
                }
                this.storageHunters.push(v);

            }

            this.ownHunterSelectedArray = [];

        } else { // 离开仓库
            for (let i = 0; i < this.storageHunterSelectedArray.length; i++) {
                let v = this.storageHunterSelectedArray[i];

                // 客户端设置是否在仓库
                let [_, findGeneralIndex] = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), (_, _v: message.GeneralInfo) => {
                    return _v.general_id == v;
                });
                if (findGeneralIndex != null) {
                    Game.PlayerHunterSystem.queryAllHunters()[findGeneralIndex].is_ware = false;
                }
                if (Game.PlayerHunterSystem.queryHunter(v) != null) {
                    Game.PlayerHunterSystem.queryHunter(v).is_ware = false;
                }

                // 选中猎人从仓库数组移除，添加到拥有猎人数组
                let index = Table.FindK(this.storageHunters, v);
                if (index >= 0) {
                    this.storageHunters.splice(index, 1);
                }
                this.ownHunters.push(v);
            }

            this.storageHunterSelectedArray = [];
        }

        let msg = isInStorage ? TextsConfig.TextsConfig_Hunter.storage_In_succeseful : TextsConfig.TextsConfig_Hunter.storage_Out_succeseful;
        toast_warning(msg);

        if (this.callback) this.callback();

        this.refresh();
    }

    private refresh() {
        this.loadOwnHunterList();
        this.loadStorageHunterList();
        this.setButtonState();
    }

    private onBtnClose() {
        this.animationEnd = true;
        this.close(UI.HIDE_TO_TOP);
    }
}

}