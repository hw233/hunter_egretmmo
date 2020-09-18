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
     * @date 2018-12-7
     *
     * @class 添加技能dialog
     *
     * @description 猎人突破->碎片， 猎人突破->技能->升级， 均需要显示对话框
     */
    var HunterBreakPopDialog = (function (_super) {
        __extends(HunterBreakPopDialog, _super);
        function HunterBreakPopDialog() {
            var _this = _super.call(this) || this;
            _this.listData = new eui.ArrayCollection();
            _this.cb = null;
            _this.thisObj = null;
            _this.type = null;
            /**0:任意1：同名 */
            _this.type1 = 0;
            _this.selectInfos = [];
            //虚假值用于判断进入页面和离开页面时页面上是否有修改
            _this.pushGeberalId = null;
            _this.generalId = 0;
            _this.lieInfo = []; //暂存道具使用量用于点击关闭按钮时将数据还原
            _this.lieText = []; //判断是否是防守阵营中的将自身移除掉，加载时保证自身不被移除。
            _this.skinName = "resource/skins/hunter/HunterBreakPopDialogSkin.exml";
            _this.init();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            return _this;
        }
        HunterBreakPopDialog.prototype.init = function () {
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnConfirm.addEventListener(tap, this.onBtnConfirm, this);
        };
        /**
         * 设置猎人突破信息
         *
         * @param generalId 武将ID
         * @param skillLevel X 阶技能 0 - 3
         * @param callback 回调函数
         * @param break1 所需突破数
         * @param type 0:任意猎人 1：同名猎人
         * @param thisObj 回调函数this对象
         */
        HunterBreakPopDialog.prototype.setHunterBreak = function (generalId, skillLevel, star, break1, callback, type, thisObj) {
            this.cb = callback;
            this.thisObj = thisObj;
            this.type = 0 /* HunterBreak */;
            this.type1 = type;
            var hunterInfos = zj.PlayerHunterSystem.GetCanBreakHunter(star, generalId, break1);
            this.setInfo(generalId, hunterInfos, skillLevel);
        };
        /**
         * 设置猎人技能升级信息
         *
         * @param generalId 武将ID
         * @param skillLevel 技能等级 1- 3
         * @param id 表`table_break_skill_uplevel.json`内索引ID， 范围(100011 - 100743), 组成形式武将id*10 + 技能等级(1-3)
         * @param callback 回调函数
         * @param thisObj 回调函数this对象
         */
        HunterBreakPopDialog.prototype.setHunberBreakSkillUpInfo = function (generalId, skillLevel, id, callback, thisObj) {
            this.cb = callback;
            this.thisObj = thisObj;
            this.type = 1 /* SkillUpLevel */;
            var hunterInfos = zj.PlayerHunterSystem.GetBreakUpSkillHunter(id, skillLevel, generalId);
            this.setInfo(generalId, hunterInfos, skillLevel, id);
        };
        /**
         *
         * @param id
         * @param level
         * @param star
         * @param awaken
         * @param aptitude
         * @param callback
         * @param thisObj
         */
        HunterBreakPopDialog.prototype.setHunterCompoundInfo = function (data, callback, thisObj) {
            this.cb = callback;
            this.thisObj = thisObj;
            this.type = 2 /* HunterCompound */;
            this.index = data.index;
            this.selectInfos[0] = data.id;
            this.selectInfos[1] = data.level;
            this.selectInfos[2] = data.star;
            this.selectInfos[3] = data.awaken;
            this.selectInfos[4] = data.aptitude;
            //在剔除列表中将自身选中项去掉
            this.lieText = zj.Table.DeepCopy(this.thisObj.data.father.composeTable);
            this.lieText[data.index] = null;
            //应该显示的列表信息
            var hunterInfos = zj.PlayerHunterSystem.GetComposeHunter(this.lieText, this.selectInfos, false);
            this.lieInfo = zj.Table.DeepCopy(this.thisObj.data.father.composeTable);
            this.setInfo(data.id, hunterInfos);
        };
        /**
         * 设置信息
         *
         * @param generalId 武将id
         * @param hunterInfos 猎人信息
         * @param level 突破等级、技能等级
         */
        HunterBreakPopDialog.prototype.setInfo = function (generalId, hunterInfos, level, id) {
            if (this.type == 0 /* HunterBreak */) {
                this.imgTitle.source = zj.cachekey("ui_hunter_break_WordsChoseHunter_png", this);
            }
            else if (this.type == 1 /* SkillUpLevel */) {
                this.imgTitle.source = zj.cachekey("ui_hunter_break_WordsUpChoseHunter_png", this);
            }
            else if (this.type == 2 /* HunterCompound */) {
                this.imgTitle.source = zj.cachekey("ui_hunter_BoardCompoundItemTip_png", this);
            }
            this.listData.removeAll();
            if (this.type == 2 /* HunterCompound */) {
                //用于判断进入页面后是否有操作
                if (this.thisObj.data.father.composeTable.length == 0) {
                    this.pushGeberalId = 0;
                    this.generalId = 0;
                }
                else {
                    this.pushGeberalId = this.thisObj.data.father.composeTable[this.index];
                    this.generalId = this.thisObj.data.father.composeTable[this.index];
                }
            }
            var _loop_1 = function (i) {
                var v = hunterInfos[i];
                var itemData_1 = new zj.HunterBreakPopDialogItemData();
                itemData_1.generalId = v.general_id;
                itemData_1.index = i + 1;
                if (this_1.type == 0 /* HunterBreak */) {
                    itemData_1.breakLevel = level;
                }
                else if (this_1.type == 1 /* SkillUpLevel */) {
                    itemData_1.skillLevel = level;
                    itemData_1.id = id;
                }
                else if (this_1.type == 2 /* HunterCompound */) {
                    itemData_1.skillLevel = level;
                    itemData_1.father = this_1;
                }
                var haveBreak = void 0;
                if (this_1.type1 == 1) {
                    // 判断是是否已经选中
                    haveBreak = zj.Table.FindF(zj.PlayerHunterSystem.breakSelectedGenerals1, function (_, v) {
                        return v === itemData_1.generalId;
                    });
                }
                else {
                    // 判断是是否已经选中
                    haveBreak = zj.Table.FindF(zj.PlayerHunterSystem.breakSelectedGenerals, function (_, v) {
                        return v === itemData_1.generalId;
                    });
                }
                if (this_1.type == 2 /* HunterCompound */) {
                    haveBreak = zj.Table.FindF(this_1.thisObj.data.father.composeTable, function (_, v) {
                        return v == itemData_1.generalId;
                    });
                }
                itemData_1.isSelected = haveBreak;
                itemData_1.type = this_1.type;
                itemData_1.father = this_1;
                this_1.listData.addItem(itemData_1);
            };
            var this_1 = this;
            for (var i = 0; i < hunterInfos.length; i++) {
                _loop_1(i);
            }
            // 第一个数据特殊处理
            var itemData = new zj.HunterBreakPopDialogItemData();
            itemData.generalId = generalId;
            itemData.index = 0;
            if (this.type == 0 /* HunterBreak */) {
                itemData.breakLevel = level;
            }
            else if (this.type == 1 /* SkillUpLevel */) {
                itemData.skillLevel = level;
                itemData.id = id;
            }
            else if (this.type == 2 /* HunterCompound */) {
                itemData.father = this;
            }
            itemData.father = this;
            itemData.type = this.type;
            this.listData.addItemAt(itemData, 0);
            this.listHunter.dataProvider = this.listData;
            this.listHunter.itemRenderer = zj.HunterBreakPopDialogItem;
            this.listHunter.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTap, this);
            this.imgNone.visible = (this.listData.length < 2);
        };
        HunterBreakPopDialog.prototype.onListTap = function (e) {
            var data = this.listData.getItemAt(e.itemIndex);
            // 第一项不相应点击
            if (data == null || data.index == 0 || data.generalId == null || data.generalId == 0) {
                return;
            }
            var item = this.listHunter.getElementAt(e.itemIndex);
            if (item == null)
                return;
            // 判断是否是防守阵营
            if (item.defenceType != 0) {
                zj.toast(zj.TextsConfig.TextsConfig_Hunter_Break.break_defence_general[item.defenceType]);
                return;
            }
            // 判断是否已经选中
            var isSelected;
            if (this.type1 == 1) {
                isSelected = zj.Table.FindF(zj.PlayerHunterSystem.breakSelectedGenerals1, function (_, v) {
                    return v == data.generalId;
                });
            }
            else {
                isSelected = zj.Table.FindF(zj.PlayerHunterSystem.breakSelectedGenerals, function (_, v) {
                    return v == data.generalId;
                });
            }
            if (data.type == 2 /* HunterCompound */) {
                isSelected = zj.Table.FindF(this.thisObj.data.father.composeTable, function (_, v) {
                    return v == data.generalId;
                });
            }
            if (data.type == 0 /* HunterBreak */) {
                this.onBreakTap(e.itemIndex, isSelected);
            }
            else if (data.type == 1 /* SkillUpLevel */) {
                this.onSkillUpTap(e.itemIndex, isSelected);
            }
            else if (data.type == 2 /* HunterCompound */) {
                this.onCompoundTap(e.itemIndex, isSelected);
            }
        };
        // 猎人突破点击
        HunterBreakPopDialog.prototype.onBreakTap = function (index, isSelected) {
            var data = this.listData.getItemAt(index);
            var breakInfo = zj.PlayerHunterSystem.HunterBreak(data.breakLevel);
            if (breakInfo == null)
                return;
            var a = function () {
                var aa = [];
                for (var i = 0; i < breakInfo.exchange_generals.length; i++) {
                    if (breakInfo.exchange_generals[i] == 0) {
                        aa.push(breakInfo.exchange_generals[i]);
                    }
                }
                return aa;
            };
            var b = function () {
                var aa = [];
                for (var i = 0; i < breakInfo.exchange_generals.length; i++) {
                    if (breakInfo.exchange_generals[i] == 1) {
                        aa.push(breakInfo.exchange_generals[i]);
                    }
                }
                return aa;
            };
            if (this.type1 == 1) {
                if (zj.PlayerHunterSystem.breakSelectedGenerals1.length >= b().length && isSelected == false && b().length != 0) {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter_Break.selectBreak);
                    return;
                }
            }
            else {
                if (zj.PlayerHunterSystem.breakSelectedGenerals.length >= a().length && isSelected == false && a().length != 0) {
                    zj.toast(zj.TextsConfig.TextsConfig_Hunter_Break.selectBreak);
                    return;
                }
            }
            data.isSelected = !data.isSelected;
            if (data.isSelected) {
                if (this.type1 == 1) {
                    zj.PlayerHunterSystem.breakSelectedGenerals1.push(data.generalId);
                }
                else {
                    zj.PlayerHunterSystem.breakSelectedGenerals.push(data.generalId);
                }
            }
            else {
                if (this.type1 == 1) {
                    var index_1 = zj.PlayerHunterSystem.breakSelectedGenerals1.indexOf(data.generalId);
                    zj.PlayerHunterSystem.breakSelectedGenerals1.splice(index_1, 1);
                }
                else {
                    var index_2 = zj.PlayerHunterSystem.breakSelectedGenerals.indexOf(data.generalId);
                    zj.PlayerHunterSystem.breakSelectedGenerals.splice(index_2, 1);
                }
            }
            this.listData.replaceItemAt(data, index);
        };
        // 技能升级点击
        HunterBreakPopDialog.prototype.onSkillUpTap = function (index, isSelected) {
            var data = this.listData.getItemAt(index);
            var upLevelInfo = zj.TableBreakSkillUplevel.Item(data.id);
            if (upLevelInfo == null)
                return;
            if (zj.PlayerHunterSystem.breakSelectedGenerals.length >= upLevelInfo.exchange_ids[data.skillLevel - 1].length && isSelected == false) {
                zj.toast(zj.TextsConfig.TextsConfig_Hunter_Break.selectBreak);
                return;
            }
            data.isSelected = !data.isSelected;
            if (data.isSelected) {
                zj.PlayerHunterSystem.breakSelectedGenerals.push(data.generalId);
            }
            else {
                var index_3 = zj.PlayerHunterSystem.breakSelectedGenerals.indexOf(data.generalId);
                zj.PlayerHunterSystem.breakSelectedGenerals.splice(index_3, 1);
            }
            this.listData.replaceItemAt(data, index);
            // this.thisObj.data.father.listMaterialData.refresh();
        };
        // 合成点击
        HunterBreakPopDialog.prototype.onCompoundTap = function (index, isSelected) {
            //将非点击到自身的列表项对勾去掉
            for (var i = 0; i < this.listData.length; i++) {
                if (this.listData.getItemAt(i) != this.listData.getItemAt(index)) {
                    this.listData.getItemAt(i).isSelected = false;
                    this.listData.replaceItemAt(this.listData.getItemAt(i), i);
                }
            }
            var data = this.listData.getItemAt(index);
            var upLevelInfo = zj.TableGeneralMake.Item(data.index);
            if (upLevelInfo == null)
                return;
            if (this.thisObj.data.father.composeTable.length >= upLevelInfo.exchange_ids[data.skillLevel - 1] && isSelected == false) {
                zj.toast(zj.TextsConfig.TextsConfig_Hunter_Break.selectBreak);
                return;
            }
            data.isSelected = !data.isSelected; //将是否选中置为非
            if (data.isSelected) {
                this.thisObj.data.father.composeTable[this.thisObj.data.index] = (data.generalId);
            }
            else {
                var index_4 = this.thisObj.data.father.composeTable.indexOf(data.generalId);
                this.thisObj.data.father.composeTable[this.thisObj.data.index] = null;
            }
            this.generalId = this.thisObj.data.father.composeTable;
            this.listData.replaceItemAt(data, index);
        };
        HunterBreakPopDialog.prototype.onBtnClose = function () {
            var _this = this;
            if (this.type == 2 /* HunterCompound */) {
                if (this.pushGeberalId != this.generalId) {
                    var msg = zj.TextsConfig.TextsConfig_Hunter_Compound.closeNotSave;
                    zj.TipManager.ShowConfirmCancel(msg, function () {
                        _this.thisObj.data.father.composeTable = _this.lieInfo;
                        if (_this.cb) {
                            _this.cb.call(_this.thisObj, true);
                        }
                        _this.delay();
                    });
                }
                else {
                    this.thisObj.data.father.composeTable = this.lieInfo;
                    if (this.cb) {
                        this.cb.call(this.thisObj, true);
                    }
                    this.close(zj.UI.HIDE_TO_TOP);
                }
                return;
            }
            if (this.cb) {
                this.cb.call(this.thisObj, true);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /**延迟调用关闭窗口的方法 */
        HunterBreakPopDialog.prototype.delay = function () {
            var _this = this;
            egret.Tween.get(this).wait(1000).call(function () { _this.close(zj.UI.HIDE_TO_TOP); });
        };
        /** 使用按钮 */
        HunterBreakPopDialog.prototype.onBtnConfirm = function () {
            if (this.cb) {
                this.cb();
                // this.cb.call(this.thisObj, false);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterBreakPopDialog;
    }(zj.Dialog));
    zj.HunterBreakPopDialog = HunterBreakPopDialog;
    __reflect(HunterBreakPopDialog.prototype, "zj.HunterBreakPopDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBreakPopDialog.js.map