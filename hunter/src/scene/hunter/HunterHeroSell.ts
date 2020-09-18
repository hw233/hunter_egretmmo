namespace zj {
/**
 * @author chen xi
 * 
 * @date 2018-11-27
 * 
 * @class 猎人出售
 */
export class HunterHeroSell extends Dialog {
    private labelHunterNum: eui.Label;
    private btnSort: eui.Button;
    private nodeSort: eui.Group;
    private btnTypeSort: eui.Button;
    private btnStarSort: eui.Button;
    private btnLevelSort: eui.Button;
    private btnClose: eui.Button;
    private labelSelectedNum: eui.Label;
    private labelGetGoldNum: eui.Label;
    private btnAllSell: eui.Button;
    private ownHunterList: eui.List;
    private sellHunterList: eui.List;

    private ownHunterListData: eui.ArrayCollection = new eui.ArrayCollection();
    private sellHunterListData: eui.ArrayCollection = new eui.ArrayCollection();
    public sellHunterArray: Array<number> = [];

    private sortOpen = false;
    private hunterSortType: number;
    private callback: () => void;

    constructor() {
        super();
        this.skinName = "resource/skins/hunter/HunterHeroSellSkin.exml";

        this.init();

        this.loadOwnHunterList();
        this.loadSellHunterList();
        this.setSellHunterInfo();
    }

    private init() {
        let tap = egret.TouchEvent.TOUCH_TAP;
        this.btnClose.addEventListener(tap, this.onBtnClose, this);
        this.btnSort.addEventListener(tap, this.onBtnSort, this);
        this.btnTypeSort.addEventListener(tap, this.onBtnTypeSort, this);
        this.btnStarSort.addEventListener(tap, this.onBtnStarSort, this);
        this.btnLevelSort.addEventListener(tap, this.onBtnLevelSort, this);
        this.btnAllSell.addEventListener(tap, this.onBtnAllSell, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

        this.hunterSortType = Tips.GetIntValue("hunter-hero-sell", TableEnum.Enum.HXHHunterEnum.Level);
        this.nodeSort.visible = false;
        this.nodeSort.scaleY = 0.2;

        this.ownHunterList.allowMultipleSelection = true;
        this.ownHunterList.itemRenderer = HunterHeroSellItem;
        this.ownHunterList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onOwnHunterListTap, this);

        this.sellHunterList.allowMultipleSelection = true;
        this.sellHunterList.itemRenderer = HunterHeroSellItem;
        this.sellHunterList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSellHunterListTap, this);
    }

    public setCallback(cb: () => void) {
        this.callback = cb;
    }

    // ====================================================
    //               拥有猎人
    // ====================================================
    private loadOwnHunterList() {
        let ownGenerals = PlayerHunterSystem.GetSellHunterList(this.hunterSortType);

        let stringColor = TextsConfig.TextsConfig_Activity.greenstr_light;
        if (ownGenerals.length >= CommonConfig.general_add_max_num) {
            stringColor = TextsConfig.TextsConfig_Activity.redstr_light;
        }
        // this.labelHunterNum.textColor = Helper.RGBToHex(stringColor);
        this.labelHunterNum.textFlow = Util.RichText(Helper.StringFormat(stringColor, (String(ownGenerals.length) + "/" + String(CommonConfig.general_add_max_num))));

        this.ownHunterListData.removeAll();
        let lc_tbl = ownGenerals;
        let fix = PlayerItemSystem.FixCount(lc_tbl.length, 25, 5);
        for (let i = 0; i < fix; i++) {
            lc_tbl.push(0);
        }
        for (let index = 0; index < lc_tbl.length; index++) {
            const v = lc_tbl[index];
            let data = new HunterBaseItemData();
            data.generalId = v;
            data.isSelected = false;
            data.father = this;
            if (this.sellHunterArray.length > 0) {
                let i = this.sellHunterArray.indexOf(v);
                if (i > -1) {
                    data.isSelected = true;
                }
            }
            this.ownHunterListData.addItem(data);
        }

        this.ownHunterList.dataProvider = this.ownHunterListData;
    }

    private onOwnHunterListTap(e: eui.ItemTapEvent) {


        let data = this.ownHunterListData.getItemAt(e.itemIndex) as HunterBaseItemData;
        if (data == null || data == undefined) return;
        let generalId = data.generalId;
        if (generalId == null || generalId == 0) return;

        // check long press
        // if (item != null && item.isInLongPress == true) {
        //     item.resumeLongPressState();
        //     return;
        // }

        if (this.sellHunterArray.length >= 16) {
            let index = this.sellHunterArray.indexOf(generalId);
            if (index < 0) {
                toast_warning(LANG("本次出售猎人已达上限"));
                return;
            }
        }
        let UI = this.ownHunterList.getElementAt(e.itemIndex) as HunterHeroSellItem;
        if (UI.ButtonClick()) {
            return;
        }

        // 设置左侧猎人
        data.isSelected = !data.isSelected;
        this.ownHunterListData.replaceItemAt(data, e.itemIndex);

        // 更新右侧猎人
        if (data.isSelected == true) {
            this.sellHunterArray.push(generalId);
        } else {
            let index = this.sellHunterArray.indexOf(generalId);
            this.sellHunterArray.splice(index, 1)
        }
        for (let i = 0; i < this.sellHunterListData.length; i++) {
            let itemData = <HunterBaseItemData>this.sellHunterListData.getItemAt(i);
            if (i < this.sellHunterArray.length) {
                let v = this.sellHunterArray[i];
                itemData.generalId = v;
            } else {
                itemData.generalId = 0;
            }
            itemData.father = this;
            this.sellHunterListData.replaceItemAt(itemData, i);
        }

        this.setSellHunterInfo();
    }

    private ownHunterListDeselected(generalId: number) {
        for (let i = 0; i < this.ownHunterListData.length; i++) {
            let data = this.ownHunterListData.getItemAt(i) as HunterBaseItemData;
            if (data != null && data.generalId == generalId) {
                data.isSelected = false;
                this.ownHunterListData.replaceItemAt(data, i);
                break;
            }
        }
    }

    // ====================================================
    //               出售猎人
    // ====================================================
    private loadSellHunterList() {
        this.sellHunterListData.removeAll();
        let fix = PlayerItemSystem.FixCount(this.sellHunterArray.length, 16, 4);
        for (let i = 0; i < fix; i++) {
            let data = new HunterBaseItemData();
            data.generalId = 0;
            data.isLongPress = false;
            this.sellHunterListData.addItem(data);
        }

        this.sellHunterList.dataProvider = this.sellHunterListData;
    }

    private onSellHunterListTap(e: eui.ItemTapEvent) {
        let data = this.sellHunterListData.getItemAt(e.itemIndex) as HunterBaseItemData;
        if (data == null || data == undefined) return;
        let generalId = data.generalId;
        if (generalId == null || generalId == 0) return;

        this.sellHunterListDeselected(generalId);
        this.ownHunterListDeselected(generalId);
        this.setSellHunterInfo();
    }

    private sellHunterListDeselected(generalId: number) {
        let index = this.sellHunterArray.indexOf(generalId);
        if (index > -1) {
            this.sellHunterArray.splice(index, 1);
        }

        for (let i = 0; i < this.sellHunterListData.length; i++) {
            let itemData = <HunterBaseItemData>this.sellHunterListData.getItemAt(i);
            if (i < this.sellHunterArray.length) {
                let v = this.sellHunterArray[i];
                itemData.generalId = v;
            } else {
                itemData.generalId = 0;
            }
            this.sellHunterListData.replaceItemAt(itemData, i);
        }
    }


    private setSellHunterInfo() {
        let price = 0;
        for (let i = 0; i < this.sellHunterArray.length; i++) {
            let generalId = this.sellHunterArray[i];
            price += PlayerHunterSystem.SellGeneralPrice(generalId);
        }

        this.labelSelectedNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.select_num, this.sellHunterArray.length);
        this.labelGetGoldNum.text = Set.NumberUnit3(price);
    }

    private onBtnClose() {
        this.animationEnd = true;
        this.close(UI.HIDE_TO_TOP);
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
            this.sortAniClose();
        } else {
            this.sortAniOpen();
        }
        this.sortOpen = !this.sortOpen;
    }

    private sortAniOpen() {
        this.animationEnd = false;

        egret.Tween.get(this.nodeSort)
            .call(() => {
                this.nodeSort.visible = true;
            }, this)
            .to({ scaleY: 1.0 }, 350, egret.Ease.backOut).call(() => {
                this.animationEnd = true;
            });

    }

    private sortAniClose() {
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
        Tips.SetIntValue("hunter-hero-sell", this.hunterSortType);
        this.onBtnSort();
        this.loadOwnHunterList();
    }

    private onBtnStarSort() {
        this.hunterSortType = TableEnum.Enum.HXHHunterEnum.Star;
        Tips.SetIntValue("hunter-hero-sell", this.hunterSortType);
        this.onBtnSort();
        this.loadOwnHunterList();
    }

    private onBtnLevelSort() {
        this.hunterSortType = TableEnum.Enum.HXHHunterEnum.Level;
        Tips.SetIntValue("hunter-hero-sell", this.hunterSortType);
        this.onBtnSort();
        this.loadOwnHunterList();
    }

    private onBtnAllSell() {
        if (this.sellHunterArray.length < 1) return;

        let p = Game.PlayerHunterSystem.sellGeneral(this.sellHunterArray);
        p.then(() => {
            // delete general
            for (let i = 0; i < this.sellHunterArray.length; i++) {
                let v = this.sellHunterArray[i];
                Game.PlayerHunterSystem.deleteHunterById(v);
            }
            this.sellHunterArray = [];
            this.loadOwnHunterList();
            this.loadSellHunterList();
            this.setSellHunterInfo();

            toast(TextsConfig.TextsConfig_Hunter.sell_succeseful);

            if (this.callback) this.callback();
        });
    }
}

}