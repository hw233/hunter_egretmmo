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
     * @author chen xi.
     *
     * @date 2019-1-7
     */
    var HunterAwakenSelectDialog = (function (_super) {
        __extends(HunterAwakenSelectDialog, _super);
        function HunterAwakenSelectDialog() {
            var _this = _super.call(this) || this;
            _this.listMaterialData = new eui.ArrayCollection();
            _this.selectedHunterId = [];
            _this.selectedDollIndex = [];
            _this.skinName = "resource/skins/hunter/HunterAwakenSelectDialogSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConfirm, _this);
            return _this;
        }
        /**
         * 设置基本信息
         *
         * @param generalId 猎人ID
         * @param consumeNumber 消耗数量
         * @param selectedHunterId 选中的猎人ID
         * @param selectedDollIndex 选中的人偶下标
         * @param callback 回调函数，上层界面再该回调函数中需要再次刷新界面, 透传回 `选中的猎人ID` 和 `选中的人偶下标`
         */
        HunterAwakenSelectDialog.prototype.setInfo = function (generalId, consumeNumber, selectedHunterId, selectedDollIndex, callback) {
            this.generalId = generalId;
            this.consumeNumber = consumeNumber;
            this.selectedHunterId = selectedHunterId;
            this.selectedDollIndex = selectedDollIndex;
            this.callback = callback;
            this.refresh();
        };
        HunterAwakenSelectDialog.prototype.refresh = function () {
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var isShowGetButton = false;
            if (baseGeneralInfo.aptitude == 14 || baseGeneralInfo.aptitude == 13) {
                this.labelTip.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter.awaken);
                isShowGetButton = true; // A 和 S 级猎人显示获取按钮 
            }
            else {
                this.labelTip.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Hunter.awaken_next);
            }
            var consumeList = zj.PlayerHunterSystem.SkillConsume(this.generalId);
            if (isShowGetButton)
                consumeList.push(-1);
            var fix = zj.PlayerItemSystem.FixCount(consumeList.length, 16, 4);
            for (var i = 0; i < fix; i++) {
                consumeList.push(0);
            }
            this.setLabelInfo();
            this.listMaterialData.removeAll();
            for (var i = 0; i < consumeList.length; i++) {
                var v = consumeList[i];
                var data = new zj.HunterAwakenSelectDialogItemData();
                data.index = i;
                data.info = v;
                data.isSelected = false;
                data.generalId = this.generalId;
                data.consume = this.consumeNumber;
                data.isSelected = this.materialIsSelected(data);
                this.listMaterialData.addItem(data);
            }
            this.listMaterial.dataProvider = this.listMaterialData;
            this.listMaterial.itemRenderer = zj.HunterAwakenSelectDialogItem;
            this.listMaterial.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListMaterialTap, this);
        };
        HunterAwakenSelectDialog.prototype.materialIsSelected = function (data) {
            if (this.selectedHunterId.length < 1 && this.selectedDollIndex.length < 1) {
                return false;
            }
            if (typeof data.info === "number") {
                return false;
            }
            if (data.info instanceof message.GeneralInfo) {
                var index = this.selectedHunterId.indexOf(data.info.general_id);
                return index > -1;
            }
            else if (data.info instanceof Object) {
                var index = this.selectedDollIndex.indexOf(data.index);
                return index > -1;
            }
        };
        HunterAwakenSelectDialog.prototype.setLabelInfo = function () {
            var length = this.selectedHunterId.length + this.selectedDollIndex.length;
            if (length != this.consumeNumber) {
                this.labelSelectedNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.awaken_select, length, this.consumeNumber));
            }
            else {
                this.labelSelectedNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.awaken_select_next, length, this.consumeNumber));
            }
        };
        HunterAwakenSelectDialog.prototype.onListMaterialTap = function (e) {
            var _this = this;
            var data = this.listMaterialData.getItemAt(e.itemIndex);
            if (data == null || data == undefined || data.info == 0)
                return;
            if (data.isSelected == false) {
                if (this.selectedHunterId.length + this.selectedDollIndex.length >= this.consumeNumber) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter.selectAwaken);
                    return;
                }
            }
            var defenceTbl = zj.PlayerHunterSystem.GeneralsIdInDefence();
            var isDefence = zj.Table.FindF(defenceTbl, function (_, _v) {
                return _v[0] == data.info.general_id;
            });
            var findv = zj.Table.FindR(defenceTbl, function (_, _v) {
                return _v[0] == data.info.general_id;
            })[0];
            if (isDefence && findv != null) {
                var defenceType = findv[1];
                var str = "";
                if (defenceType == 1) {
                    str = zj.TextsConfig.TextsConfig_Hunter.errorAwaken1;
                }
                else if (defenceType == 2) {
                    str = zj.TextsConfig.TextsConfig_Hunter.errorAwaken2;
                }
                else if (defenceType == 3) {
                    str = zj.TextsConfig.TextsConfig_Hunter.errorAwaken3;
                }
                else if (defenceType == 4) {
                    str = zj.TextsConfig.TextsConfig_Hunter.errorAwaken4;
                }
                zj.toast(str);
                return;
            }
            if (typeof data.info === "number") {
                if (data.info == -1) {
                    var baseGeneralInfo = zj.PlayerHunterSystem.Table(data.generalId);
                    var itemId_1 = zj.CommonConfig.same_aptitude_doll[baseGeneralInfo.aptitude - 13];
                    zj.loadUI(zj.CommonOutExchangeDialog).then(function (dialog) {
                        dialog.setInfo(itemId_1, function () {
                            _this.refresh();
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                return;
            }
            data.isSelected = !data.isSelected;
            this.listMaterialData.replaceItemAt(data, e.itemIndex);
            if (data.isSelected) {
                if (data.info instanceof message.GeneralInfo) {
                    this.selectedHunterId.push(data.info.general_id);
                }
                else if (data.info instanceof Object) {
                    this.selectedDollIndex.push(data.index);
                }
            }
            else {
                if (data.info instanceof message.GeneralInfo) {
                    var index = this.selectedHunterId.indexOf(data.info.general_id);
                    if (index > -1) {
                        this.selectedHunterId.splice(index, 1);
                    }
                }
                else if (data.info instanceof Object) {
                    var index = this.selectedDollIndex.indexOf(data.index);
                    if (index > -1) {
                        this.selectedDollIndex.splice(index, 1);
                    }
                }
            }
            this.setLabelInfo();
        };
        HunterAwakenSelectDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HunterAwakenSelectDialog.prototype.onBtnConfirm = function () {
            this.onBtnClose();
            if (this.callback) {
                this.callback(this.selectedHunterId, this.selectedDollIndex);
            }
        };
        return HunterAwakenSelectDialog;
    }(zj.Dialog));
    zj.HunterAwakenSelectDialog = HunterAwakenSelectDialog;
    __reflect(HunterAwakenSelectDialog.prototype, "zj.HunterAwakenSelectDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HunterAwakenSelectDialog.js.map