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
     * @date 2018-11-30
     *
     * @class 猎人仓库界面
     */
    var HunterStorage = (function (_super) {
        __extends(HunterStorage, _super);
        function HunterStorage() {
            var _this = _super.call(this) || this;
            _this.ownHunterListData = new eui.ArrayCollection();
            /** Selected id from own hunter list. */
            _this.ownHunterSelectedArray = [];
            /** Current role own's hunter id. */
            _this.ownHunters = [];
            _this.storageHunterListData = new eui.ArrayCollection();
            /** Selected id from the storage list. */
            _this.storageHunterSelectedArray = [];
            /** Current role's hunter id in the storage. */
            _this.storageHunters = [];
            _this.sortOpen = false;
            _this.animationEnd = true;
            _this.skinName = "resource/skins/hunter/HunterStorageSkin.exml";
            _this.init();
            return _this;
        }
        HunterStorage.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnSort.addEventListener(tap, this.onBtnSort, this);
            this.btnTypeSort.addEventListener(tap, this.onBtnTypeSort, this);
            this.btnStarSort.addEventListener(tap, this.onBtnStarSort, this);
            this.btnLevelSort.addEventListener(tap, this.onBtnLevelSort, this);
            this.btnDeposit.addEventListener(tap, this.onBtnDeposit, this);
            this.btnTakeOut.addEventListener(tap, this.onBtnTakeOut, this);
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.hunterSortType = zj.Tips.GetIntValue("hunter-storage-type", zj.TableEnum.Enum.HXHHunterEnum.Level);
            this.nodeSort.visible = false;
            this.nodeSort.scaleY = 0.2;
            this.ownHunterList.allowMultipleSelection = true;
            this.ownHunterList.itemRenderer = zj.HunterStorageItem;
            this.ownHunterList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onOwnHunterTap, this);
            this.storageHunterList.allowMultipleSelection = true;
            this.storageHunterList.itemRenderer = zj.HunterStorageItem;
            this.storageHunterList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onStorageHunterTap, this);
        };
        HunterStorage.prototype.setInfo = function (cb) {
            this.callback = cb;
            this.loadOwnHunterList(true, false);
            this.loadStorageHunterList(true, false);
            this.setButtonState();
        };
        /**
         * 加载当前拥有的猎人list
         * @param bSort 是否需要排序， 初始化加载，点击排序按钮之后，需要排序； 发送网络协议之后，不需要排序
         * @param onlyRefreshData 第一次加载的时候，设置list相关属性
         */
        HunterStorage.prototype.loadOwnHunterList = function (bSort, onlyRefreshData) {
            if (bSort === void 0) { bSort = false; }
            if (onlyRefreshData === void 0) { onlyRefreshData = true; }
            if (bSort == true) {
                this.ownHunters = zj.PlayerHunterSystem.GetWareHunterList(this.hunterSortType, false);
            }
            // set own hunter label
            var stringColor = (this.ownHunters.length < zj.CommonConfig.general_add_max_num) ? zj.TextsConfig.TextsConfig_Activity.greenstr_light : zj.TextsConfig.TextsConfig_Activity.redstr_light;
            // this.labelHunterNum.textColor = Helper.RGBToHex(stringColor);
            this.labelHunterNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(stringColor, (this.ownHunters.length.toString() + "/" + zj.CommonConfig.general_add_max_num.toString())));
            // set own hunter list
            var lc_tbl = this.ownHunters.slice();
            var fix = zj.PlayerItemSystem.FixCount(this.ownHunters.length, 20, 4);
            for (var i = 0; i < fix; i++) {
                lc_tbl.push(0);
            }
            this.ownHunterListData.removeAll();
            for (var i = 0; i < lc_tbl.length; i++) {
                var v = lc_tbl[i];
                var itemData = new zj.HunterBaseItemData();
                itemData.generalId = v;
                itemData.isLongPress = true;
                itemData.isSelected = false;
                this.ownHunterListData.addItem(itemData);
            }
            this.ownHunterList.dataProvider = this.ownHunterListData;
        };
        HunterStorage.prototype.onOwnHunterTap = function (e) {
            var item = this.ownHunterList.getElementAt(e.itemIndex);
            var data = this.ownHunterListData.getItemAt(e.itemIndex);
            // check generalId
            var generalId = data.generalId;
            if (generalId == null || generalId == 0) {
                return;
            }
            // check longPress
            if (item != null && item.isInLongPress == true) {
                item.resumeLongPressState();
                return;
            }
            if (data.isSelected == false) {
                var storageLast = this.ownHunters.length > (this.ownHunterSelectedArray.length + 1);
                if (storageLast == false) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.storage_last_general);
                    return;
                }
            }
            // refresh item's data
            data.isSelected = !data.isSelected;
            this.ownHunterListData.replaceItemAt(data, e.itemIndex);
            if (data.isSelected) {
                this.ownHunterSelectedArray.push(generalId);
            }
            else {
                var index = this.ownHunterSelectedArray.indexOf(generalId);
                if (index > -1) {
                    this.ownHunterSelectedArray.splice(index, 1);
                }
            }
            this.setButtonState();
        };
        /**
         * 加载当前仓库中的猎人list
         * @param bSort 是否需要排序， 初始化加载，点击排序按钮之后，需要排序； 发送网络协议之后，不需要排序
         * @param onlyRefreshData 第一次加载的时候，设置list相关属性
         */
        HunterStorage.prototype.loadStorageHunterList = function (bSort, onlyRefreshData) {
            if (bSort === void 0) { bSort = false; }
            if (onlyRefreshData === void 0) { onlyRefreshData = true; }
            if (bSort) {
                this.storageHunters = zj.PlayerHunterSystem.GetWareHunterList(this.hunterSortType, true);
            }
            // set storage hunter label
            var vipLevel = zj.Game.PlayerInfoSystem.VipLevel;
            var add = zj.TableVipinfo.Item(vipLevel).package_add;
            var maxLevel = zj.CommonConfig.general_ware_max_num + add;
            var stringColor = (this.storageHunters.length < maxLevel) ? zj.TextsConfig.TextsConfig_Activity.greenstr_light : zj.TextsConfig.TextsConfig_Activity.redstr_light;
            // this.labelHunterStorageNum.textColor = Helper.RGBToHex(stringColor);
            this.labelHunterStorageNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(stringColor, (String(this.storageHunters.length) + "/" + String(maxLevel))));
            // set storage hunter list
            var lc_tbl = this.storageHunters.slice();
            var fix = zj.PlayerItemSystem.FixCount(lc_tbl.length, 20, 4);
            for (var i = 0; i < fix; i++) {
                lc_tbl.push(0);
            }
            this.storageHunterListData.removeAll();
            for (var i = 0; i < lc_tbl.length; i++) {
                var v = lc_tbl[i];
                var itemData = new zj.HunterBaseItemData();
                itemData.generalId = v;
                itemData.isLongPress = false;
                itemData.isSelected = false;
                this.storageHunterListData.addItem(itemData);
            }
            this.storageHunterList.dataProvider = this.storageHunterListData;
        };
        HunterStorage.prototype.onStorageHunterTap = function (e) {
            var data = this.storageHunterListData.getItemAt(e.itemIndex);
            if (data == null)
                return;
            var generalId = data.generalId;
            if (generalId == null || generalId == 0)
                return;
            data.isSelected = !data.isSelected;
            this.storageHunterListData.replaceItemAt(data, e.itemIndex);
            if (data.isSelected) {
                this.storageHunterSelectedArray.push(generalId);
            }
            else {
                var index = this.storageHunterSelectedArray.indexOf(generalId);
                if (index > -1) {
                    this.storageHunterSelectedArray.splice(index, 1);
                }
            }
            this.setButtonState();
        };
        HunterStorage.prototype.setButtonState = function () {
            this.btnDeposit.enabled = (this.ownHunterSelectedArray.length > 0);
            this.btnTakeOut.enabled = (this.storageHunterSelectedArray.length > 0);
        };
        HunterStorage.prototype.onTouchEnd = function () {
            if (this.sortOpen) {
                this.onBtnSort();
            }
        };
        HunterStorage.prototype.onBtnSort = function () {
            if (!this.animationEnd)
                return;
            if (this.sortOpen) {
                this.sortAnimationClose();
            }
            else {
                this.sortAnimationOpen();
            }
            this.sortOpen = !this.sortOpen;
        };
        HunterStorage.prototype.sortAnimationOpen = function () {
            var _this = this;
            this.animationEnd = false;
            egret.Tween.get(this.nodeSort)
                .call(function () {
                _this.nodeSort.visible = true;
            }, this)
                .to({ scaleY: 1.0 }, 350, egret.Ease.backOut).call(function () {
                _this.animationEnd = true;
            });
        };
        HunterStorage.prototype.sortAnimationClose = function () {
            var _this = this;
            this.animationEnd = false;
            egret.Tween.get(this.nodeSort)
                .to({ scaleY: 0.2 }, 350, egret.Ease.backIn)
                .call(function () {
                _this.nodeSort.visible = false;
            }, this).call(function () {
                _this.animationEnd = true;
            });
        };
        HunterStorage.prototype.onBtnTypeSort = function () {
            this.hunterSortType = zj.TableEnum.Enum.HXHHunterEnum.Quality;
            zj.Tips.SetIntValue("hunter-storage-type", this.hunterSortType);
            this.onBtnSort();
            this.loadOwnHunterList(true);
            this.loadStorageHunterList(true);
        };
        HunterStorage.prototype.onBtnStarSort = function () {
            this.hunterSortType = zj.TableEnum.Enum.HXHHunterEnum.Star;
            zj.Tips.SetIntValue("hunter-storage-type", this.hunterSortType);
            this.onBtnSort();
            this.loadOwnHunterList(true);
            this.loadStorageHunterList(true);
        };
        HunterStorage.prototype.onBtnLevelSort = function () {
            this.hunterSortType = zj.TableEnum.Enum.HXHHunterEnum.Level;
            zj.Tips.SetIntValue("hunter-storage-type", this.hunterSortType);
            this.onBtnSort();
            this.loadOwnHunterList(true);
            this.loadStorageHunterList(true);
        };
        HunterStorage.prototype.onBtnDeposit = function () {
            var _this = this;
            // 入库猎人数量
            var inStorageHunterNum = 0;
            for (var i = 0; i < this.storageHunterListData.length; i++) {
                var v = this.storageHunterListData.getItemAt(i);
                if (v.generalId != 0) {
                    inStorageHunterNum += 1;
                }
            }
            var vipLevel = zj.Game.PlayerInfoSystem.VipLevel;
            var add = zj.TableVipinfo.Item(vipLevel).package_add;
            var maxLevel = zj.CommonConfig.general_ware_max_num + add;
            if (maxLevel >= this.ownHunterSelectedArray.length + inStorageHunterNum) {
                var p = zj.Game.PlayerHunterSystem.generalWareHouse(this.ownHunterSelectedArray, true);
                p.then(function () {
                    _this.onRequestSuccess();
                }).catch(function () {
                    _this.ownHunterSelectedArray = [];
                    _this.refresh();
                });
            }
            else {
                var show_1 = true;
                var number_1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.storageTips.In[1], this.ownHunterSelectedArray.length);
                var add_1 = zj.TableVipinfo.Item(zj.Game.PlayerInfoSystem.VipLevel).package_add;
                var big_1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.storageTips.In[2], inStorageHunterNum, zj.CommonConfig.general_ware_max_num + add_1);
                zj.loadUI(zj.HunterStorageExceed).then(function (dialog) {
                    dialog.setInfo(show_1, number_1, big_1, function () {
                        _this.ownHunterSelectedArray = [];
                        _this.refresh();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        HunterStorage.prototype.onBtnTakeOut = function () {
            var _this = this;
            // 猎人出仓库
            var ownHunterNum = 0;
            for (var i = 0; i < this.ownHunterListData.length; i++) {
                var v = this.ownHunterListData.getItemAt(i);
                if (v.generalId != 0) {
                    ownHunterNum += 1;
                }
            }
            if (zj.CommonConfig.general_add_max_num >= (ownHunterNum + this.storageHunterSelectedArray.length)) {
                var p = zj.Game.PlayerHunterSystem.generalWareHouse(this.storageHunterSelectedArray, false);
                p.then(function () {
                    _this.onRequestSuccess(false);
                }).catch(function () {
                    _this.storageHunterSelectedArray = [];
                    _this.refresh();
                });
            }
            else {
                var show_2 = false;
                var number_2 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.storageTips.Out[1], this.storageHunterSelectedArray.length);
                var big_2 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.storageTips.Out[2], ownHunterNum, zj.CommonConfig.general_add_max_num);
                zj.loadUI(zj.HunterStorageExceed).then(function (dialog) {
                    dialog.setInfo(show_2, number_2, big_2, function () {
                        _this.storageHunterSelectedArray = [];
                        _this.refresh();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        // 处理猎人出库、入库成功之后的操作
        HunterStorage.prototype.onRequestSuccess = function (isInStorage) {
            if (isInStorage === void 0) { isInStorage = true; }
            if (isInStorage) {
                var _loop_1 = function (i) {
                    var v = this_1.ownHunterSelectedArray[i];
                    // 客户端设置是否在仓库
                    var _a = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (_, _v) {
                        return _v.general_id == v;
                    }), _ = _a[0], findGeneralIndex = _a[1];
                    if (findGeneralIndex != null) {
                        zj.Game.PlayerHunterSystem.queryAllHunters()[findGeneralIndex].is_ware = true;
                    }
                    if (zj.Game.PlayerHunterSystem.queryHunter(v) != null) {
                        zj.Game.PlayerHunterSystem.queryHunter(v).is_ware = true;
                    }
                    // 选中猎人从拥有数组移除，添加到仓库猎人数组
                    var index = zj.Table.FindK(this_1.ownHunters, v);
                    if (index >= 0) {
                        this_1.ownHunters.splice(index, 1);
                    }
                    this_1.storageHunters.push(v);
                };
                var this_1 = this;
                for (var i = 0; i < this.ownHunterSelectedArray.length; i++) {
                    _loop_1(i);
                }
                this.ownHunterSelectedArray = [];
            }
            else {
                var _loop_2 = function (i) {
                    var v = this_2.storageHunterSelectedArray[i];
                    // 客户端设置是否在仓库
                    var _a = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (_, _v) {
                        return _v.general_id == v;
                    }), _ = _a[0], findGeneralIndex = _a[1];
                    if (findGeneralIndex != null) {
                        zj.Game.PlayerHunterSystem.queryAllHunters()[findGeneralIndex].is_ware = false;
                    }
                    if (zj.Game.PlayerHunterSystem.queryHunter(v) != null) {
                        zj.Game.PlayerHunterSystem.queryHunter(v).is_ware = false;
                    }
                    // 选中猎人从仓库数组移除，添加到拥有猎人数组
                    var index = zj.Table.FindK(this_2.storageHunters, v);
                    if (index >= 0) {
                        this_2.storageHunters.splice(index, 1);
                    }
                    this_2.ownHunters.push(v);
                };
                var this_2 = this;
                for (var i = 0; i < this.storageHunterSelectedArray.length; i++) {
                    _loop_2(i);
                }
                this.storageHunterSelectedArray = [];
            }
            var msg = isInStorage ? zj.TextsConfig.TextsConfig_Hunter.storage_In_succeseful : zj.TextsConfig.TextsConfig_Hunter.storage_Out_succeseful;
            zj.toast_warning(msg);
            if (this.callback)
                this.callback();
            this.refresh();
        };
        HunterStorage.prototype.refresh = function () {
            this.loadOwnHunterList();
            this.loadStorageHunterList();
            this.setButtonState();
        };
        HunterStorage.prototype.onBtnClose = function () {
            this.animationEnd = true;
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterStorage;
    }(zj.Dialog));
    zj.HunterStorage = HunterStorage;
    __reflect(HunterStorage.prototype, "zj.HunterStorage");
})(zj || (zj = {}));
//# sourceMappingURL=HunterStorage.js.map