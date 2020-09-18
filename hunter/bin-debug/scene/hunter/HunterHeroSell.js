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
     * @date 2018-11-27
     *
     * @class 猎人出售
     */
    var HunterHeroSell = (function (_super) {
        __extends(HunterHeroSell, _super);
        function HunterHeroSell() {
            var _this = _super.call(this) || this;
            _this.ownHunterListData = new eui.ArrayCollection();
            _this.sellHunterListData = new eui.ArrayCollection();
            _this.sellHunterArray = [];
            _this.sortOpen = false;
            _this.animationEnd = true;
            _this.skinName = "resource/skins/hunter/HunterHeroSellSkin.exml";
            _this.init();
            _this.loadOwnHunterList();
            _this.loadSellHunterList();
            _this.setSellHunterInfo();
            return _this;
        }
        HunterHeroSell.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnSort.addEventListener(tap, this.onBtnSort, this);
            this.btnTypeSort.addEventListener(tap, this.onBtnTypeSort, this);
            this.btnStarSort.addEventListener(tap, this.onBtnStarSort, this);
            this.btnLevelSort.addEventListener(tap, this.onBtnLevelSort, this);
            this.btnAllSell.addEventListener(tap, this.onBtnAllSell, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.hunterSortType = zj.Tips.GetIntValue("hunter-hero-sell", zj.TableEnum.Enum.HXHHunterEnum.Level);
            this.nodeSort.visible = false;
            this.nodeSort.scaleY = 0.2;
            this.ownHunterList.allowMultipleSelection = true;
            this.ownHunterList.itemRenderer = zj.HunterHeroSellItem;
            this.ownHunterList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onOwnHunterListTap, this);
            this.sellHunterList.allowMultipleSelection = true;
            this.sellHunterList.itemRenderer = zj.HunterHeroSellItem;
            this.sellHunterList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSellHunterListTap, this);
        };
        HunterHeroSell.prototype.setCallback = function (cb) {
            this.callback = cb;
        };
        // ====================================================
        //               拥有猎人
        // ====================================================
        HunterHeroSell.prototype.loadOwnHunterList = function () {
            var ownGenerals = zj.PlayerHunterSystem.GetSellHunterList(this.hunterSortType);
            var stringColor = zj.TextsConfig.TextsConfig_Activity.greenstr_light;
            if (ownGenerals.length >= zj.CommonConfig.general_add_max_num) {
                stringColor = zj.TextsConfig.TextsConfig_Activity.redstr_light;
            }
            // this.labelHunterNum.textColor = Helper.RGBToHex(stringColor);
            this.labelHunterNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(stringColor, (String(ownGenerals.length) + "/" + String(zj.CommonConfig.general_add_max_num))));
            this.ownHunterListData.removeAll();
            var lc_tbl = ownGenerals;
            var fix = zj.PlayerItemSystem.FixCount(lc_tbl.length, 25, 5);
            for (var i = 0; i < fix; i++) {
                lc_tbl.push(0);
            }
            for (var index = 0; index < lc_tbl.length; index++) {
                var v = lc_tbl[index];
                var data = new zj.HunterBaseItemData();
                data.generalId = v;
                data.isSelected = false;
                data.father = this;
                if (this.sellHunterArray.length > 0) {
                    var i = this.sellHunterArray.indexOf(v);
                    if (i > -1) {
                        data.isSelected = true;
                    }
                }
                this.ownHunterListData.addItem(data);
            }
            this.ownHunterList.dataProvider = this.ownHunterListData;
        };
        HunterHeroSell.prototype.onOwnHunterListTap = function (e) {
            var data = this.ownHunterListData.getItemAt(e.itemIndex);
            if (data == null || data == undefined)
                return;
            var generalId = data.generalId;
            if (generalId == null || generalId == 0)
                return;
            // check long press
            // if (item != null && item.isInLongPress == true) {
            //     item.resumeLongPressState();
            //     return;
            // }
            if (this.sellHunterArray.length >= 16) {
                var index = this.sellHunterArray.indexOf(generalId);
                if (index < 0) {
                    zj.toast_warning(zj.LANG("本次出售猎人已达上限"));
                    return;
                }
            }
            var UI = this.ownHunterList.getElementAt(e.itemIndex);
            if (UI.ButtonClick()) {
                return;
            }
            // 设置左侧猎人
            data.isSelected = !data.isSelected;
            this.ownHunterListData.replaceItemAt(data, e.itemIndex);
            // 更新右侧猎人
            if (data.isSelected == true) {
                this.sellHunterArray.push(generalId);
            }
            else {
                var index = this.sellHunterArray.indexOf(generalId);
                this.sellHunterArray.splice(index, 1);
            }
            for (var i = 0; i < this.sellHunterListData.length; i++) {
                var itemData = this.sellHunterListData.getItemAt(i);
                if (i < this.sellHunterArray.length) {
                    var v = this.sellHunterArray[i];
                    itemData.generalId = v;
                }
                else {
                    itemData.generalId = 0;
                }
                itemData.father = this;
                this.sellHunterListData.replaceItemAt(itemData, i);
            }
            this.setSellHunterInfo();
        };
        HunterHeroSell.prototype.ownHunterListDeselected = function (generalId) {
            for (var i = 0; i < this.ownHunterListData.length; i++) {
                var data = this.ownHunterListData.getItemAt(i);
                if (data != null && data.generalId == generalId) {
                    data.isSelected = false;
                    this.ownHunterListData.replaceItemAt(data, i);
                    break;
                }
            }
        };
        // ====================================================
        //               出售猎人
        // ====================================================
        HunterHeroSell.prototype.loadSellHunterList = function () {
            this.sellHunterListData.removeAll();
            var fix = zj.PlayerItemSystem.FixCount(this.sellHunterArray.length, 16, 4);
            for (var i = 0; i < fix; i++) {
                var data = new zj.HunterBaseItemData();
                data.generalId = 0;
                data.isLongPress = false;
                this.sellHunterListData.addItem(data);
            }
            this.sellHunterList.dataProvider = this.sellHunterListData;
        };
        HunterHeroSell.prototype.onSellHunterListTap = function (e) {
            var data = this.sellHunterListData.getItemAt(e.itemIndex);
            if (data == null || data == undefined)
                return;
            var generalId = data.generalId;
            if (generalId == null || generalId == 0)
                return;
            this.sellHunterListDeselected(generalId);
            this.ownHunterListDeselected(generalId);
            this.setSellHunterInfo();
        };
        HunterHeroSell.prototype.sellHunterListDeselected = function (generalId) {
            var index = this.sellHunterArray.indexOf(generalId);
            if (index > -1) {
                this.sellHunterArray.splice(index, 1);
            }
            for (var i = 0; i < this.sellHunterListData.length; i++) {
                var itemData = this.sellHunterListData.getItemAt(i);
                if (i < this.sellHunterArray.length) {
                    var v = this.sellHunterArray[i];
                    itemData.generalId = v;
                }
                else {
                    itemData.generalId = 0;
                }
                this.sellHunterListData.replaceItemAt(itemData, i);
            }
        };
        HunterHeroSell.prototype.setSellHunterInfo = function () {
            var price = 0;
            for (var i = 0; i < this.sellHunterArray.length; i++) {
                var generalId = this.sellHunterArray[i];
                price += zj.PlayerHunterSystem.SellGeneralPrice(generalId);
            }
            this.labelSelectedNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.select_num, this.sellHunterArray.length);
            this.labelGetGoldNum.text = zj.Set.NumberUnit3(price);
        };
        HunterHeroSell.prototype.onBtnClose = function () {
            this.animationEnd = true;
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HunterHeroSell.prototype.onTouchEnd = function () {
            if (this.sortOpen) {
                this.onBtnSort();
            }
        };
        HunterHeroSell.prototype.onBtnSort = function () {
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
        HunterHeroSell.prototype.sortAniOpen = function () {
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
        HunterHeroSell.prototype.sortAniClose = function () {
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
        HunterHeroSell.prototype.onBtnTypeSort = function () {
            this.hunterSortType = zj.TableEnum.Enum.HXHHunterEnum.Quality;
            zj.Tips.SetIntValue("hunter-hero-sell", this.hunterSortType);
            this.onBtnSort();
            this.loadOwnHunterList();
        };
        HunterHeroSell.prototype.onBtnStarSort = function () {
            this.hunterSortType = zj.TableEnum.Enum.HXHHunterEnum.Star;
            zj.Tips.SetIntValue("hunter-hero-sell", this.hunterSortType);
            this.onBtnSort();
            this.loadOwnHunterList();
        };
        HunterHeroSell.prototype.onBtnLevelSort = function () {
            this.hunterSortType = zj.TableEnum.Enum.HXHHunterEnum.Level;
            zj.Tips.SetIntValue("hunter-hero-sell", this.hunterSortType);
            this.onBtnSort();
            this.loadOwnHunterList();
        };
        HunterHeroSell.prototype.onBtnAllSell = function () {
            var _this = this;
            if (this.sellHunterArray.length < 1)
                return;
            var p = zj.Game.PlayerHunterSystem.sellGeneral(this.sellHunterArray);
            p.then(function () {
                // delete general
                for (var i = 0; i < _this.sellHunterArray.length; i++) {
                    var v = _this.sellHunterArray[i];
                    zj.Game.PlayerHunterSystem.deleteHunterById(v);
                }
                _this.sellHunterArray = [];
                _this.loadOwnHunterList();
                _this.loadSellHunterList();
                _this.setSellHunterInfo();
                zj.toast(zj.TextsConfig.TextsConfig_Hunter.sell_succeseful);
                if (_this.callback)
                    _this.callback();
            });
        };
        return HunterHeroSell;
    }(zj.Dialog));
    zj.HunterHeroSell = HunterHeroSell;
    __reflect(HunterHeroSell.prototype, "zj.HunterHeroSell");
})(zj || (zj = {}));
//# sourceMappingURL=HunterHeroSell.js.map