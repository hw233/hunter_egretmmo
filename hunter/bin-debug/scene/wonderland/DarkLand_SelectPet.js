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
     * @class 黑暗大陆更换宠物形象
     *
     * @author LianLei
     *
     * 2019.05.31
     */
    var DarkLand_SelectPet = (function (_super) {
        __extends(DarkLand_SelectPet, _super);
        function DarkLand_SelectPet() {
            var _this = _super.call(this) || this;
            _this.focusCur = -1;
            _this.focusCurBefore = 0;
            _this.listViewImageData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/wonderland/DarkLand_SelectPetSkin.exml";
            _this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOk, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.listViewImage.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onChangeList, _this);
            _this.SetInfoList();
            return _this;
        }
        DarkLand_SelectPet.prototype.SetInfoList = function () {
            this.petInfo = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(zj.Game.PlayerAdviserSystem.petMap); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (zj.PlayerAdviserSystem.PetBase(v.pet_id).is_open == 1) {
                    this.petInfo.push(v);
                }
            }
            this.petInfo.sort(function (a, b) {
                var a_value = a.step + a.star;
                var b_value = b.step + b.star;
                if (a.situtation == b.situtation) {
                    if (a_value == b_value) {
                        return a.pet_id - b.pet_id;
                    }
                    else {
                        return b_value - a_value;
                    }
                }
                else {
                    return b.situtation - a.situtation;
                }
            });
            this.listViewImageData.removeAll();
            for (var i = 0; i < this.petInfo.length; i++) {
                var itemData = new zj.DarkLand_SelectPetItemData();
                itemData.index = i;
                itemData.info = this.petInfo[i];
                itemData.father = this;
                this.listViewImageData.addItem(itemData);
            }
            this.listViewImage.itemRenderer = zj.DarkLand_SelectPetItem;
            this.listViewImage.dataProvider = this.listViewImageData;
            if (this.petInfo[0].situtation == message.EPetStatusType.PET_TYPE_IN_POSTION) {
                this.listViewImage.selectedIndex = 0;
                this.focusCur = 0;
            }
        };
        DarkLand_SelectPet.prototype.setCB = function (cb) {
            this.callBack = cb;
        };
        DarkLand_SelectPet.prototype.onBtnOk = function () {
            if (this.callBack != null && this.focusCur != null) {
                this.callBack(this.petInfo[this.focusCur]);
                zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
            }
            else if (this.callBack != null && this.focusCur == null) {
                this.callBack(null);
                zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        DarkLand_SelectPet.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        DarkLand_SelectPet.prototype.onChangeList = function (e) {
            var item = this.listViewImage.getElementAt(e.itemIndex);
            var data = this.listViewImageData.getItemAt(e.itemIndex);
            var dataBefore = this.listViewImageData.getItemAt(this.focusCurBefore);
            if (data.info.star == 0)
                return;
            if (e.itemIndex == this.focusCur) {
                if (this.listViewImage.selectedIndex == null) {
                    this.listViewImage.selectedIndex = e.itemIndex;
                    this.focusCur = e.itemIndex;
                }
                else {
                    this.listViewImage.selectedIndex = null;
                    this.focusCur = null;
                }
                this.listViewImageData.replaceItemAt(data, e.itemIndex);
                return;
            }
            this.listViewImage.selectedIndex = e.itemIndex;
            this.focusCur = this.listViewImage.selectedIndex;
            this.listViewImageData.replaceItemAt(data, e.itemIndex);
            this.listViewImageData.replaceItemAt(dataBefore, this.focusCurBefore);
            this.focusCurBefore = e.itemIndex;
        };
        return DarkLand_SelectPet;
    }(zj.Dialog));
    zj.DarkLand_SelectPet = DarkLand_SelectPet;
    __reflect(DarkLand_SelectPet.prototype, "zj.DarkLand_SelectPet");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLand_SelectPet.js.map