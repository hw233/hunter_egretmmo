namespace zj {
    /** 
     * @author chen xi
     * 
     * @date 2018-11-15
     * 
     * @class 猎人场景 - 列表界面
     */

    /** 回调事件 */
    export const enum HunterHeroListCallbackEvent {
        HunterListSelected = 0, /** 选中类人 */
        FragmentListSelected = 1, /** 选中碎片 */
        HeroButtonTap = 2, /** 点击猎人 */
        FragmentButtonTap = 3, /** 点击碎片 */
        SellSuccess = 4
    }

    export const enum HunterHeroListType {
        Hero = 0,
        Fragment = 1
    }

    export class HunterHeroList extends UI {
        public mainNode: eui.Group;
        // public generalId: number = null;

        private btnHero: eui.Button;
        private btnFragment: eui.Button;
        private btnCompound: eui.Button;
        private btnOpenSell: eui.Button;
        private btnHeroStorage: eui.Button;
        private btnSort: eui.Button;
        private btnTypeSort: eui.Button;
        private btnStarSort: eui.Button;
        private btnLevelSort: eui.Button;
        private imgSortShaDow: eui.Image;
        private imgFragmentRedDot: eui.Image;
        private imgCompoundRedDot: eui.Image;

        private gSort: eui.Group;
        private sortOpen: boolean = false;
        private gSortX: number;
        private gSortY: number;

        /** 列表类型 */
        private currentListType: HunterHeroListType = HunterHeroListType.Hero;
        /** 猎人排序类型 */
        private hunterSortType: number;
        private quantityLabel: eui.Label;

        private listHero: eui.List;
        private lastSelectedHunterId: number = null;
        private listHeroData: eui.ArrayCollection = new eui.ArrayCollection();

        private listFragment: eui.List;
        private lastSelectedFragmentId = null;
        private listFragmentData: eui.ArrayCollection = new eui.ArrayCollection();

        private callback: (type: HunterHeroListCallbackEvent, data?: any) => void;
        private callback_this: any;
        public newHunter;
        public constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterHeroListSkin.exml";
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            this.listHero.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                this.callback_this = null;
            }, this);

            this.init();
            if (Device.isReviewSwitch) {
                this.btnCompound.visible = false;
            }
        }

        private init() {
            let tap = egret.TouchEvent.TOUCH_TAP;
            this.btnHero.addEventListener(tap, this.onBtnHero, this);
            this.btnFragment.addEventListener(tap, this.onBtnFragment, this);
            this.btnCompound.addEventListener(tap, this.onCompound, this);
            this.btnOpenSell.addEventListener(tap, this.onBtnOpenSell, this);
            this.btnHeroStorage.addEventListener(tap, this.onBtnHeroStorage, this);
            this.btnSort.addEventListener(tap, this.onBtnSort, this);
            this.btnTypeSort.addEventListener(tap, this.onBtnTypeSort, this);
            this.btnStarSort.addEventListener(tap, this.onBtnStarSort, this);
            this.btnLevelSort.addEventListener(tap, this.onBtnLevelSort, this);

            this.gSortX = this.gSort.x;
            this.gSortY = this.gSort.y;
            this.gSort.scaleY = 0.2;
            this.gSort.visible = false;

            this.hunterSortType = Tips.GetSaveTimeForGeneralSort(TableEnum.Enum.HXHHunterEnum.Level);

            this.imgCompoundRedDot.visible = false;

            this.listHero.itemRenderer = HunterHeroItem;
            this.listHero.allowMultipleSelection = false;
            this.listHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onHeroListTap, this);

            this.listFragment.itemRenderer = HunterHeroItem;
            this.listFragment.allowMultipleSelection = false;
            this.listFragment.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFragmentListTap, this);
        }

        public get sortType(): number {
            return this.hunterSortType;
        }

        public setCallback(cb: (type: HunterHeroListCallbackEvent, data?: any) => void, callback_this?: any) {
            this.callback = cb;
            this.callback_this = callback_this;
        }

        // invoke this function when the hero bottom list selected a new hunter
        public heroBottomListSelectedGeneral(id: number) {
            let lastSelectedIndex = this.hunterIndexFromId(this.lastSelectedHunterId);
            if (lastSelectedIndex >= 0) {
                let lastData = this.listHeroData.getItemAt(lastSelectedIndex);
                if (lastData) {
                    lastData.isSelected = false;
                    this.listHeroData.replaceItemAt(lastData, lastSelectedIndex);
                }
            } else {
                this.lastSelectedHunterId = null;
            }

            let currentSelectedIndex = this.hunterIndexFromId(id);
            if (currentSelectedIndex >= 0) {
                let data = this.listHeroData.getItemAt(currentSelectedIndex);
                if (data) {
                    data.isSelected = true;
                    this.listHeroData.replaceItemAt(data, currentSelectedIndex);
                }
                this.lastSelectedHunterId = id;
            }

            this.scrollList(id);
        }

        public loadList(isLoadHunter: boolean = true) {

            this.getData();

            this.listHero.visible = isLoadHunter;
            this.listFragment.visible = !isLoadHunter;

            if (isLoadHunter == true) {
                if (this.listHeroData.length < 1) {
                    toast_warning(LANG("找不到猎人"));
                    return;
                }

                this.currentListType = HunterHeroListType.Hero;

                this.listHero.dataProvider = this.listHeroData;
                this.setSelected(this.lastSelectedHunterId);
                this.scrollList(this.lastSelectedHunterId);
            } else {
                if (this.listFragmentData.length < 1) {
                    toast_warning(LANG("找不到碎片"));
                    return;
                }

                this.currentListType = HunterHeroListType.Fragment;
                Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });

                this.listFragment.dataProvider = this.listFragmentData;
                this.setSelected(this.lastSelectedFragmentId);
            }

            this.refreshRedDot();
        }

        private getData() {
            if (this.currentListType == HunterHeroListType.Hero) {
                let hunterList = PlayerHunterSystem.GetHunterList(this.hunterSortType);
                this.newHunter = hunterList;
                this.quantityLabel.text = String(hunterList.length) + "/" + String(CommonConfig.general_add_max_num);

                if (hunterList.length < 1) {
                    this.lastSelectedHunterId = null;
                    return;
                };

                // 设置选中
                let selectedIndex = 0; // default selected the first element
                if (this.lastSelectedHunterId != null && this.lastSelectedHunterId != 0) {
                    let findIndex = hunterList.indexOf(this.lastSelectedHunterId);
                    selectedIndex = findIndex >= 0 ? findIndex : 0;
                }

                this.listHeroData.removeAll();
                let fix = PlayerItemSystem.FixCount(hunterList.length, 25, 5);
                for (let i = 0; i < fix; i++) {
                    hunterList.push(0);
                }

                for (let i = 0; i < hunterList.length; i++) {
                    let v = hunterList[i];
                    let data = new HeroItemData();
                    data.generalId = v;
                    data.type = HeroItemTypeEnum.Hunter;
                    if (i == selectedIndex) {
                        data.isSelected = true;
                        this.lastSelectedHunterId = v;
                    } else {
                        data.isSelected = false;
                    }
                    this.listHeroData.addItem(data);
                }


            } else if (this.currentListType == HunterHeroListType.Fragment) {
                let fragmentList = PlayerHunterSystem.GetHunterSoulList();
                if (fragmentList.length < 1) {
                    this.lastSelectedFragmentId = null;
                    return;
                };

                // 设置选中
                let selectedIndex = 0; // default selected the first element
                if (this.lastSelectedFragmentId != null && this.lastSelectedFragmentId != 0) {
                    let findIndex = fragmentList.indexOf(this.lastSelectedFragmentId);
                    selectedIndex = findIndex >= 0 ? findIndex : 0;
                }

                this.listFragmentData.removeAll();
                let fix = PlayerItemSystem.FixCount(fragmentList.length, 25, 5);
                for (let i = 0; i < fix; i++) {
                    fragmentList.push(0);
                }

                for (let i = 0; i < fragmentList.length; i++) {
                    let v = fragmentList[i];
                    let data = new HeroItemData();
                    data.soulId = v;
                    data.type = HeroItemTypeEnum.Fragment;
                    if (i == selectedIndex) {
                        data.isSelected = true;
                        this.lastSelectedFragmentId = v;
                    } else {
                        data.isSelected = false;
                    }
                    this.listFragmentData.addItem(data);
                }
            }
        }

        private hunterIndexFromId(generalId: number): number {
            let index = -1;
            if (generalId == null || generalId == 0) {
                return index;
            }
            for (let i = 0; i < this.listHeroData.length; i++) {
                let data = this.listHeroData.getItemAt(i) as HeroItemData;
                if (data.generalId == generalId) {
                    index = i;
                    break;
                }
            }
            return index;
        }

        private fragmentIndexFromId(soulId: number): number {
            let index = -1;
            if (soulId == null || soulId == 0) {
                return index;
            }
            for (let i = 0; i < this.listFragmentData.length; i++) {
                let data = this.listFragmentData.getItemAt(i) as HeroItemData;
                if (data.soulId == soulId) {
                    index = i;
                    break;
                }
            }
            return index;
        }

        private onHeroListTap(e: eui.ItemTapEvent) {
            let itemData = this.listHeroData.getItemAt(e.itemIndex) as HeroItemData;
            if (itemData == null || itemData.generalId == null || itemData.generalId == 0) {
                return;
            }
            Tips.SetTipsOfHero(itemData.generalId);
            let baseGeneralInfo = PlayerHunterSystem.Table(itemData.generalId);
            if (baseGeneralInfo.is_open == 0) {
                toast(TextsConfig.TextsConfig_Error.wait);
                return;
            }

            if (itemData.generalId == this.lastSelectedHunterId) {
                return;
            }

            if (this.currentListType != HunterHeroListType.Hero) {
                this.currentListType = HunterHeroListType.Hero;
            }

            let lastSelectedIndex = this.hunterIndexFromId(this.lastSelectedHunterId);
            if (lastSelectedIndex >= 0) {
                let lastData: HeroItemData = this.listHeroData.getItemAt(lastSelectedIndex);
                lastData.isSelected = false;
                this.listHeroData.replaceItemAt(lastData, lastSelectedIndex);
            }

            itemData.isSelected = true;
            this.listHeroData.replaceItemAt(itemData, e.itemIndex);

            this.setSelected(itemData.generalId, true);
        }

        private onFragmentListTap(e: eui.ItemTapEvent, id?) {
            let index;
            if (e == null) {
                index = id;
            } else {
                index = e.itemIndex
            }
            let itemData = this.listFragmentData.getItemAt(index) as HeroItemData;
            if (itemData == null || itemData.soulId == null || itemData.soulId == 0) {
                return;
            }

            let generalId = PlayerHunterSystem.SoulIdFindGeneral(itemData.soulId).general_id;
            let baseGeneralInfo = PlayerHunterSystem.Table(generalId);
            if (baseGeneralInfo.is_open == 0) {
                toast_warning(TextsConfig.TextsConfig_Error.wait);
                return;
            }

            if (itemData.soulId == this.lastSelectedFragmentId) {
                return;
            }

            if (this.currentListType != HunterHeroListType.Fragment) {
                this.currentListType = HunterHeroListType.Fragment;
                Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }

            let lastSelectedIndex = this.fragmentIndexFromId(this.lastSelectedFragmentId);
            if (lastSelectedIndex >= 0) {
                let lastData: HeroItemData = this.listFragmentData.getItemAt(lastSelectedIndex);
                lastData.isSelected = false;
                this.listFragmentData.replaceItemAt(lastData, lastSelectedIndex);
            }

            itemData.isSelected = true;
            this.listFragmentData.replaceItemAt(itemData, index);

            this.setSelected(itemData.soulId);
        }

        private setSelected(id: number, isTeach: boolean = false) {
            if (id === null || id === undefined || id === 0) return;

            if (this.currentListType == HunterHeroListType.Hero) {
                this.lastSelectedHunterId = id;
                if (this.callback) {
                    this.callback.call(this.callback_this, HunterHeroListCallbackEvent.HunterListSelected, id);
                }
            } else if (this.currentListType == HunterHeroListType.Fragment) {
                this.lastSelectedFragmentId = id;
                let index = this.fragmentIndexFromId(id);
                let data = this.listFragmentData.getItemAt(index) as HeroItemData;
                let [, , percent] = PlayerHunterSystem.SoulCount(data.soulId);
                let generalId = PlayerHunterSystem.SoulIdFindGeneral(data.soulId).general_id;
                let baseGeneralInfo = PlayerHunterSystem.Table(generalId);
                let canEquip = (percent >= 1 && baseGeneralInfo.is_open == 1)

                if (this.callback) {
                    this.callback.call(this.callback_this, HunterHeroListCallbackEvent.FragmentListSelected, [id, canEquip]);
                }
            }
            if (isTeach) Teach.addTeaching();
        }

        private scrollList(id: number) {
            let item = new HunterHeroItem();
            if (this.currentListType == HunterHeroListType.Hero) {
                let index = this.hunterIndexFromId(id);
                let row = Math.floor(index / 5);
                let maxRow = Math.floor(this.listHeroData.length / 5);
                if (maxRow - row <= 5) {
                    row = maxRow - 5;
                }
                let gap = (this.listHero.layout as eui.TileLayout).verticalGap;
                let scrollHeight = (item.height + gap) * row;

                egret.Tween.get(this.listHero)
                    .to({ scrollV: scrollHeight }, 350, egret.Ease.backIn);
            } else if (this.currentListType == HunterHeroListType.Fragment) {
                let index = this.fragmentIndexFromId(id);
                let row = Math.floor(index / 5);
                let maxRow = Math.floor(this.listFragmentData.length / 5);
                if (maxRow - row <= 5) {
                    row = maxRow - 5;
                }
                let gap = (this.listFragment.layout as eui.TileLayout).verticalGap;
                let scrollHeight = (item.height + gap) * row;

                egret.Tween.get(this.listFragment)
                    .to({ scrollV: scrollHeight }, 350, egret.Ease.backIn);
            }
        }

        // 1. click current interface's hero button
        // 2. fragment call hunter success invoke this method
        public onBtnHero(generalId?: number) {
            this.imgSortShaDow.visible = true;
            this.btnHero.enabled = false;
            this.btnFragment.enabled = true;
            this.currentListType = HunterHeroListType.Hero;

            this.btnOpenSell.visible = true;
            this.btnHeroStorage.visible = true;
            this.btnSort.visible = true;

            if (generalId && typeof generalId === "number") {
                this.lastSelectedHunterId = generalId;
            }

            this.loadList();

            if (this.callback) {
                this.callback.call(this.callback_this, HunterHeroListCallbackEvent.HeroButtonTap);
            }
        }

        private onBtnFragment() {
            if (this.sortOpen) {
                this.onBtnSort();
                return;
            }
            this.btnHero.enabled = true;
            this.btnFragment.enabled = false;
            this.imgSortShaDow.visible = false;
            this.currentListType = HunterHeroListType.Fragment;
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });

            this.btnOpenSell.visible = false;
            this.btnHeroStorage.visible = false;
            this.btnSort.visible = false;

            if (this.callback) {
                this.callback.call(this.callback_this, HunterHeroListCallbackEvent.FragmentButtonTap);
            }

            this.loadList(false);
        }

        private onCompound() {
            this.imgSortShaDow.visible = false;
            if (PlayerMissionSystem.FunOpenTo(FUNC.COMPOUND, true) == false) return;

            loadUI(HunterCompound)
                .then((dialog: HunterCompound) => {
                    dialog.CB(() => {
                        if (this.btnFragment.enabled == true) {
                            this.loadList()
                        }
                    })
                    dialog.show(UI.SHOW_FROM_TOP);
                })
        }

        private onBtnOpenSell() {
            if (PlayerMissionSystem.FunOpenTo(FUNC.SELLGENERAL, true) == false) return;

            loadUI(HunterHeroSell)
                .then((dialog: HunterHeroSell) => {
                    dialog.setCallback(() => {
                        if (this.callback) {
                            this.callback.call(this.callback_this, HunterHeroListCallbackEvent.SellSuccess);
                        }
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnHeroStorage() {
            loadUI(HunterStorage)
                .then((dialog: HunterStorage) => {
                    dialog.setInfo(() => {
                        this.refreshList();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private refreshRedDot() {
            let canGetHunter = false;
            let soulTable = TableItemGeneralSoul.Table();
            for (let k in soulTable) {
                if (soulTable.hasOwnProperty(k)) {
                    let v = soulTable[k];
                    if (v && v.id > 0) {
                        let count = Game.PlayerItemSystem.itemCount(v.id);
                        let baseGeneralInfo = PlayerHunterSystem.SoulIdFindGeneral(v.id);
                        if (count >= baseGeneralInfo.soul_count) {
                            canGetHunter = true;
                            break;
                        }
                    }
                }
            }
            this.imgFragmentRedDot.visible = canGetHunter;
        }

        private onBtnTypeSort() {
            this.hunterSortType = TableEnum.Enum.HXHHunterEnum.Quality;
            Tips.SetSaveTimeForGeneralSort(this.hunterSortType);
            this.onBtnSort();
            this.refreshList();
        }

        private onBtnStarSort() {
            this.hunterSortType = TableEnum.Enum.HXHHunterEnum.Star;
            Tips.SetSaveTimeForGeneralSort(this.hunterSortType);
            this.onBtnSort();
            this.refreshList();
        }

        private onBtnLevelSort() {
            this.hunterSortType = TableEnum.Enum.HXHHunterEnum.Level;
            Tips.SetSaveTimeForGeneralSort(this.hunterSortType);
            this.onBtnSort();
            this.refreshList();
        }

        private refreshList() {
            if (this.currentListType == HunterHeroListType.Hero) {
                this.loadList(true);
            } else {
                this.loadList(false);
            }
        }

        public onTouchEnd() {
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

            egret.Tween.get(this.gSort)
                .call(() => { this.gSort.visible = true; }, this)
                .to({ x: this.gSortX, y: this.gSortY }, 45, egret.Ease.backOut)
                .to({ scaleY: 1 }, 500, egret.Ease.backOut).call(() => {
                    this.animationEnd = true;
                });
        }

        private sortAniClose() {
            this.animationEnd = false;

            egret.Tween.get(this.gSort)
                .to({ x: this.gSortX, y: this.gSortY }, 350, egret.Ease.backIn)
                .to({ scaleY: 0.2 }, 450, egret.Ease.backIn)
                .call(() => { this.gSort.visible = false; }).call(() => {
                    this.animationEnd = true;
                });
        }

        private itemList: Array<HunterHeroItem> = [];
        private getItemList() {
            this.itemList = [];
            let fragmentList = PlayerHunterSystem.GetHunterSoulList();
            for (let i = 0; i < fragmentList.length; i++) {
                let item = this.listFragment.getElementAt(i) as HunterHeroItem;
                this.itemList.push(item);
            }
        }

        private itemListHero: Array<HunterHeroItem> = [];
        private getItemListHero() {
            this.itemList = [];
            let fragmentList = PlayerHunterSystem.GetHunterList(this.hunterSortType);
            for (let i = 0; i < fragmentList.length; i++) {
                let item = this.listHero.getElementAt(i) as HunterHeroItem;
                this.itemList.push(item);
            }
        }

        public FocusHunter(generalId: number) {
            for (let k in this.newHunter) {
                if (this.newHunter.hasOwnProperty(k)) {
                    let v = this.newHunter[k];
                    if (v == generalId) {
                        this.onFragmentListTap(null, Number(k));
                        this.listHero.selectedIndex = Number(k);
                        return this.listHero.getElementAt(Number(k));
                    }
                }
            }
        }
    }

}