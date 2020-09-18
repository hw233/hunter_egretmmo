var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    /**
     * @author chen xi
     *
     * @date 2018-11-15
     *
     * @class 猎人场景 - 列表界面
     */
    var HunterHeroList = (function (_super) {
        __extends(HunterHeroList, _super);
        function HunterHeroList() {
            var _this = _super.call(this) || this;
            _this.sortOpen = false;
            /** 列表类型 */
            _this.currentListType = 0 /* Hero */;
            _this.lastSelectedHunterId = null;
            _this.listHeroData = new eui.ArrayCollection();
            _this.lastSelectedFragmentId = null;
            _this.listFragmentData = new eui.ArrayCollection();
            _this.animationEnd = true;
            _this.itemList = [];
            _this.itemListHero = [];
            _this.skinName = "resource/skins/hunter/HunterHeroListSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.listHero.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.callback_this = null;
            }, _this);
            _this.init();
            if (zj.Device.isReviewSwitch) {
                _this.btnCompound.visible = false;
            }
            return _this;
        }
        HunterHeroList.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
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
            this.hunterSortType = zj.Tips.GetSaveTimeForGeneralSort(zj.TableEnum.Enum.HXHHunterEnum.Level);
            this.imgCompoundRedDot.visible = false;
            this.listHero.itemRenderer = zj.HunterHeroItem;
            this.listHero.allowMultipleSelection = false;
            this.listHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onHeroListTap, this);
            this.listFragment.itemRenderer = zj.HunterHeroItem;
            this.listFragment.allowMultipleSelection = false;
            this.listFragment.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onFragmentListTap, this);
        };
        Object.defineProperty(HunterHeroList.prototype, "sortType", {
            get: function () {
                return this.hunterSortType;
            },
            enumerable: true,
            configurable: true
        });
        HunterHeroList.prototype.setCallback = function (cb, callback_this) {
            this.callback = cb;
            this.callback_this = callback_this;
        };
        // invoke this function when the hero bottom list selected a new hunter
        HunterHeroList.prototype.heroBottomListSelectedGeneral = function (id) {
            var lastSelectedIndex = this.hunterIndexFromId(this.lastSelectedHunterId);
            if (lastSelectedIndex >= 0) {
                var lastData = this.listHeroData.getItemAt(lastSelectedIndex);
                if (lastData) {
                    lastData.isSelected = false;
                    this.listHeroData.replaceItemAt(lastData, lastSelectedIndex);
                }
            }
            else {
                this.lastSelectedHunterId = null;
            }
            var currentSelectedIndex = this.hunterIndexFromId(id);
            if (currentSelectedIndex >= 0) {
                var data = this.listHeroData.getItemAt(currentSelectedIndex);
                if (data) {
                    data.isSelected = true;
                    this.listHeroData.replaceItemAt(data, currentSelectedIndex);
                }
                this.lastSelectedHunterId = id;
            }
            this.scrollList(id);
        };
        HunterHeroList.prototype.loadList = function (isLoadHunter) {
            if (isLoadHunter === void 0) { isLoadHunter = true; }
            this.getData();
            this.listHero.visible = isLoadHunter;
            this.listFragment.visible = !isLoadHunter;
            if (isLoadHunter == true) {
                if (this.listHeroData.length < 1) {
                    zj.toast_warning(zj.LANG("找不到猎人"));
                    return;
                }
                this.currentListType = 0 /* Hero */;
                this.listHero.dataProvider = this.listHeroData;
                this.setSelected(this.lastSelectedHunterId);
                this.scrollList(this.lastSelectedHunterId);
            }
            else {
                if (this.listFragmentData.length < 1) {
                    zj.toast_warning(zj.LANG("找不到碎片"));
                    return;
                }
                this.currentListType = 1 /* Fragment */;
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                this.listFragment.dataProvider = this.listFragmentData;
                this.setSelected(this.lastSelectedFragmentId);
            }
            this.refreshRedDot();
        };
        HunterHeroList.prototype.getData = function () {
            if (this.currentListType == 0 /* Hero */) {
                var hunterList = zj.PlayerHunterSystem.GetHunterList(this.hunterSortType);
                this.newHunter = hunterList;
                this.quantityLabel.text = String(hunterList.length) + "/" + String(zj.CommonConfig.general_add_max_num);
                if (hunterList.length < 1) {
                    this.lastSelectedHunterId = null;
                    return;
                }
                ;
                // 设置选中
                var selectedIndex = 0; // default selected the first element
                if (this.lastSelectedHunterId != null && this.lastSelectedHunterId != 0) {
                    var findIndex = hunterList.indexOf(this.lastSelectedHunterId);
                    selectedIndex = findIndex >= 0 ? findIndex : 0;
                }
                this.listHeroData.removeAll();
                var fix = zj.PlayerItemSystem.FixCount(hunterList.length, 25, 5);
                for (var i = 0; i < fix; i++) {
                    hunterList.push(0);
                }
                for (var i = 0; i < hunterList.length; i++) {
                    var v = hunterList[i];
                    var data = new zj.HeroItemData();
                    data.generalId = v;
                    data.type = 0 /* Hunter */;
                    if (i == selectedIndex) {
                        data.isSelected = true;
                        this.lastSelectedHunterId = v;
                    }
                    else {
                        data.isSelected = false;
                    }
                    this.listHeroData.addItem(data);
                }
            }
            else if (this.currentListType == 1 /* Fragment */) {
                var fragmentList = zj.PlayerHunterSystem.GetHunterSoulList();
                if (fragmentList.length < 1) {
                    this.lastSelectedFragmentId = null;
                    return;
                }
                ;
                // 设置选中
                var selectedIndex = 0; // default selected the first element
                if (this.lastSelectedFragmentId != null && this.lastSelectedFragmentId != 0) {
                    var findIndex = fragmentList.indexOf(this.lastSelectedFragmentId);
                    selectedIndex = findIndex >= 0 ? findIndex : 0;
                }
                this.listFragmentData.removeAll();
                var fix = zj.PlayerItemSystem.FixCount(fragmentList.length, 25, 5);
                for (var i = 0; i < fix; i++) {
                    fragmentList.push(0);
                }
                for (var i = 0; i < fragmentList.length; i++) {
                    var v = fragmentList[i];
                    var data = new zj.HeroItemData();
                    data.soulId = v;
                    data.type = 1 /* Fragment */;
                    if (i == selectedIndex) {
                        data.isSelected = true;
                        this.lastSelectedFragmentId = v;
                    }
                    else {
                        data.isSelected = false;
                    }
                    this.listFragmentData.addItem(data);
                }
            }
        };
        HunterHeroList.prototype.hunterIndexFromId = function (generalId) {
            var index = -1;
            if (generalId == null || generalId == 0) {
                return index;
            }
            for (var i = 0; i < this.listHeroData.length; i++) {
                var data = this.listHeroData.getItemAt(i);
                if (data.generalId == generalId) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        HunterHeroList.prototype.fragmentIndexFromId = function (soulId) {
            var index = -1;
            if (soulId == null || soulId == 0) {
                return index;
            }
            for (var i = 0; i < this.listFragmentData.length; i++) {
                var data = this.listFragmentData.getItemAt(i);
                if (data.soulId == soulId) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        HunterHeroList.prototype.onHeroListTap = function (e) {
            var itemData = this.listHeroData.getItemAt(e.itemIndex);
            if (itemData == null || itemData.generalId == null || itemData.generalId == 0) {
                return;
            }
            zj.Tips.SetTipsOfHero(itemData.generalId);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(itemData.generalId);
            if (baseGeneralInfo.is_open == 0) {
                zj.toast(zj.TextsConfig.TextsConfig_Error.wait);
                return;
            }
            if (itemData.generalId == this.lastSelectedHunterId) {
                return;
            }
            if (this.currentListType != 0 /* Hero */) {
                this.currentListType = 0 /* Hero */;
            }
            var lastSelectedIndex = this.hunterIndexFromId(this.lastSelectedHunterId);
            if (lastSelectedIndex >= 0) {
                var lastData = this.listHeroData.getItemAt(lastSelectedIndex);
                lastData.isSelected = false;
                this.listHeroData.replaceItemAt(lastData, lastSelectedIndex);
            }
            itemData.isSelected = true;
            this.listHeroData.replaceItemAt(itemData, e.itemIndex);
            this.setSelected(itemData.generalId, true);
        };
        HunterHeroList.prototype.onFragmentListTap = function (e, id) {
            var index;
            if (e == null) {
                index = id;
            }
            else {
                index = e.itemIndex;
            }
            var itemData = this.listFragmentData.getItemAt(index);
            if (itemData == null || itemData.soulId == null || itemData.soulId == 0) {
                return;
            }
            var generalId = zj.PlayerHunterSystem.SoulIdFindGeneral(itemData.soulId).general_id;
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(generalId);
            if (baseGeneralInfo.is_open == 0) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.wait);
                return;
            }
            if (itemData.soulId == this.lastSelectedFragmentId) {
                return;
            }
            if (this.currentListType != 1 /* Fragment */) {
                this.currentListType = 1 /* Fragment */;
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }
            var lastSelectedIndex = this.fragmentIndexFromId(this.lastSelectedFragmentId);
            if (lastSelectedIndex >= 0) {
                var lastData = this.listFragmentData.getItemAt(lastSelectedIndex);
                lastData.isSelected = false;
                this.listFragmentData.replaceItemAt(lastData, lastSelectedIndex);
            }
            itemData.isSelected = true;
            this.listFragmentData.replaceItemAt(itemData, index);
            this.setSelected(itemData.soulId);
        };
        HunterHeroList.prototype.setSelected = function (id, isTeach) {
            if (isTeach === void 0) { isTeach = false; }
            if (id === null || id === undefined || id === 0)
                return;
            if (this.currentListType == 0 /* Hero */) {
                this.lastSelectedHunterId = id;
                if (this.callback) {
                    this.callback.call(this.callback_this, 0 /* HunterListSelected */, id);
                }
            }
            else if (this.currentListType == 1 /* Fragment */) {
                this.lastSelectedFragmentId = id;
                var index = this.fragmentIndexFromId(id);
                var data = this.listFragmentData.getItemAt(index);
                var _a = zj.PlayerHunterSystem.SoulCount(data.soulId), percent = _a[2];
                var generalId = zj.PlayerHunterSystem.SoulIdFindGeneral(data.soulId).general_id;
                var baseGeneralInfo = zj.PlayerHunterSystem.Table(generalId);
                var canEquip = (percent >= 1 && baseGeneralInfo.is_open == 1);
                if (this.callback) {
                    this.callback.call(this.callback_this, 1 /* FragmentListSelected */, [id, canEquip]);
                }
            }
            if (isTeach)
                zj.Teach.addTeaching();
        };
        HunterHeroList.prototype.scrollList = function (id) {
            var item = new zj.HunterHeroItem();
            if (this.currentListType == 0 /* Hero */) {
                var index = this.hunterIndexFromId(id);
                var row = Math.floor(index / 5);
                var maxRow = Math.floor(this.listHeroData.length / 5);
                if (maxRow - row <= 5) {
                    row = maxRow - 5;
                }
                var gap = this.listHero.layout.verticalGap;
                var scrollHeight = (item.height + gap) * row;
                egret.Tween.get(this.listHero)
                    .to({ scrollV: scrollHeight }, 350, egret.Ease.backIn);
            }
            else if (this.currentListType == 1 /* Fragment */) {
                var index = this.fragmentIndexFromId(id);
                var row = Math.floor(index / 5);
                var maxRow = Math.floor(this.listFragmentData.length / 5);
                if (maxRow - row <= 5) {
                    row = maxRow - 5;
                }
                var gap = this.listFragment.layout.verticalGap;
                var scrollHeight = (item.height + gap) * row;
                egret.Tween.get(this.listFragment)
                    .to({ scrollV: scrollHeight }, 350, egret.Ease.backIn);
            }
        };
        // 1. click current interface's hero button
        // 2. fragment call hunter success invoke this method
        HunterHeroList.prototype.onBtnHero = function (generalId) {
            this.imgSortShaDow.visible = true;
            this.btnHero.enabled = false;
            this.btnFragment.enabled = true;
            this.currentListType = 0 /* Hero */;
            this.btnOpenSell.visible = true;
            this.btnHeroStorage.visible = true;
            this.btnSort.visible = true;
            if (generalId && typeof generalId === "number") {
                this.lastSelectedHunterId = generalId;
            }
            this.loadList();
            if (this.callback) {
                this.callback.call(this.callback_this, 2 /* HeroButtonTap */);
            }
        };
        HunterHeroList.prototype.onBtnFragment = function () {
            if (this.sortOpen) {
                this.onBtnSort();
                return;
            }
            this.btnHero.enabled = true;
            this.btnFragment.enabled = false;
            this.imgSortShaDow.visible = false;
            this.currentListType = 1 /* Fragment */;
            zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            this.btnOpenSell.visible = false;
            this.btnHeroStorage.visible = false;
            this.btnSort.visible = false;
            if (this.callback) {
                this.callback.call(this.callback_this, 3 /* FragmentButtonTap */);
            }
            this.loadList(false);
        };
        HunterHeroList.prototype.onCompound = function () {
            var _this = this;
            this.imgSortShaDow.visible = false;
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.COMPOUND, true) == false)
                return;
            zj.loadUI(zj.HunterCompound)
                .then(function (dialog) {
                dialog.CB(function () {
                    if (_this.btnFragment.enabled == true) {
                        _this.loadList();
                    }
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterHeroList.prototype.onBtnOpenSell = function () {
            var _this = this;
            if (zj.PlayerMissionSystem.FunOpenTo(zj.FUNC.SELLGENERAL, true) == false)
                return;
            zj.loadUI(zj.HunterHeroSell)
                .then(function (dialog) {
                dialog.setCallback(function () {
                    if (_this.callback) {
                        _this.callback.call(_this.callback_this, 4 /* SellSuccess */);
                    }
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterHeroList.prototype.onBtnHeroStorage = function () {
            var _this = this;
            zj.loadUI(zj.HunterStorage)
                .then(function (dialog) {
                dialog.setInfo(function () {
                    _this.refreshList();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterHeroList.prototype.refreshRedDot = function () {
            var canGetHunter = false;
            var soulTable = zj.TableItemGeneralSoul.Table();
            for (var k in soulTable) {
                if (soulTable.hasOwnProperty(k)) {
                    var v = soulTable[k];
                    if (v && v.id > 0) {
                        var count = zj.Game.PlayerItemSystem.itemCount(v.id);
                        var baseGeneralInfo = zj.PlayerHunterSystem.SoulIdFindGeneral(v.id);
                        if (count >= baseGeneralInfo.soul_count) {
                            canGetHunter = true;
                            break;
                        }
                    }
                }
            }
            this.imgFragmentRedDot.visible = canGetHunter;
        };
        HunterHeroList.prototype.onBtnTypeSort = function () {
            this.hunterSortType = zj.TableEnum.Enum.HXHHunterEnum.Quality;
            zj.Tips.SetSaveTimeForGeneralSort(this.hunterSortType);
            this.onBtnSort();
            this.refreshList();
        };
        HunterHeroList.prototype.onBtnStarSort = function () {
            this.hunterSortType = zj.TableEnum.Enum.HXHHunterEnum.Star;
            zj.Tips.SetSaveTimeForGeneralSort(this.hunterSortType);
            this.onBtnSort();
            this.refreshList();
        };
        HunterHeroList.prototype.onBtnLevelSort = function () {
            this.hunterSortType = zj.TableEnum.Enum.HXHHunterEnum.Level;
            zj.Tips.SetSaveTimeForGeneralSort(this.hunterSortType);
            this.onBtnSort();
            this.refreshList();
        };
        HunterHeroList.prototype.refreshList = function () {
            if (this.currentListType == 0 /* Hero */) {
                this.loadList(true);
            }
            else {
                this.loadList(false);
            }
        };
        HunterHeroList.prototype.onTouchEnd = function () {
            if (this.sortOpen) {
                this.onBtnSort();
            }
        };
        HunterHeroList.prototype.onBtnSort = function () {
            if (!this.animationEnd)
                return;
            if (this.sortOpen) {
                this.sortAniClose();
            }
            else {
                this.sortAniOpen();
            }
            this.sortOpen = !this.sortOpen;
        };
        HunterHeroList.prototype.sortAniOpen = function () {
            var _this = this;
            this.animationEnd = false;
            egret.Tween.get(this.gSort)
                .call(function () { _this.gSort.visible = true; }, this)
                .to({ x: this.gSortX, y: this.gSortY }, 45, egret.Ease.backOut)
                .to({ scaleY: 1 }, 500, egret.Ease.backOut).call(function () {
                _this.animationEnd = true;
            });
        };
        HunterHeroList.prototype.sortAniClose = function () {
            var _this = this;
            this.animationEnd = false;
            egret.Tween.get(this.gSort)
                .to({ x: this.gSortX, y: this.gSortY }, 350, egret.Ease.backIn)
                .to({ scaleY: 0.2 }, 450, egret.Ease.backIn)
                .call(function () { _this.gSort.visible = false; }).call(function () {
                _this.animationEnd = true;
            });
        };
        HunterHeroList.prototype.getItemList = function () {
            this.itemList = [];
            var fragmentList = zj.PlayerHunterSystem.GetHunterSoulList();
            for (var i = 0; i < fragmentList.length; i++) {
                var item = this.listFragment.getElementAt(i);
                this.itemList.push(item);
            }
        };
        HunterHeroList.prototype.getItemListHero = function () {
            this.itemList = [];
            var fragmentList = zj.PlayerHunterSystem.GetHunterList(this.hunterSortType);
            for (var i = 0; i < fragmentList.length; i++) {
                var item = this.listHero.getElementAt(i);
                this.itemList.push(item);
            }
        };
        HunterHeroList.prototype.FocusHunter = function (generalId) {
            for (var k in this.newHunter) {
                if (this.newHunter.hasOwnProperty(k)) {
                    var v = this.newHunter[k];
                    if (v == generalId) {
                        this.onFragmentListTap(null, Number(k));
                        this.listHero.selectedIndex = Number(k);
                        return this.listHero.getElementAt(Number(k));
                    }
                }
            }
        };
        return HunterHeroList;
    }(zj.UI));
    zj.HunterHeroList = HunterHeroList;
    __reflect(HunterHeroList.prototype, "zj.HunterHeroList");
})(zj || (zj = {}));
//# sourceMappingURL=HunterHeroList.js.map