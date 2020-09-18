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
     * @date 2018-12-23
     *
     * @class 猎人技能
     */
    var HunterSkill = (function (_super) {
        __extends(HunterSkill, _super);
        function HunterSkill() {
            var _this = _super.call(this) || this;
            _this.listSkillData = new eui.ArrayCollection();
            _this.listLevelInfoData = new eui.ArrayCollection();
            _this.lastSelectedSkillIndex = null;
            _this.itemList = [];
            _this.skinName = "resource/skins/hunter/HunterSkillSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            _this.init();
            if (zj.Device.isReviewSwitch) {
                _this.btnHelp.visible = false;
            }
            return _this;
        }
        HunterSkill.prototype.init = function () {
            this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHelp, this);
            this.btnRefreshSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRefreshSkill, this);
            this.btnAddSkillPoint.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddSkillPoint, this);
            this.btnUpLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpLevel, this);
            this.btnGoAwaken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoAwaken, this);
            this.btnTransform.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTransform, this);
            this.groupCost1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtngroupCost1, this);
        };
        HunterSkill.prototype.reloadGeneral = function () {
            var _this = this;
            if (this.generalId == null || this.generalId == 0)
                return;
            if (this.lastSelectedSkillIndex == null) {
                this.lastSelectedSkillIndex = 0;
            }
            this.lastSkillIndex = this.lastSelectedSkillIndex;
            this.loadSkillList();
            this.loadLevelInfoList();
            this.father.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            egret.Tween.get(this).wait(200).call(function () {
                _this.SelectSkill(_this.lastSelectedSkillIndex, true);
            });
        };
        HunterSkill.prototype.FreshGeneral = function (smooth) {
            var _this = this;
            this.listSkillData.removeAll();
            this.skillInfoList = zj.PlayerHunterSystem.GetSkillEachLvList(this.generalId);
            this.loadSkillList();
            egret.Tween.get(this).wait(200).call(function () {
                _this.SelectSkill(_this.lastSelectedSkillIndex, smooth);
            });
        };
        HunterSkill.prototype.SelectSkill = function (index, smooth) {
            this.lastSelectedSkillIndex = index;
            if (this.listSkillData.length == 1) {
                if (this.lastSkillIndex >= 2 || this.lastSelectedSkillIndex >= 3) {
                    this.lastSkillIndex = 1;
                    this.lastSelectedSkillIndex = 1;
                }
            }
            var data = this.listSkillData.getItemAt(this.lastSelectedSkillIndex);
            this.listSkillData.replaceItemAt(data, this.lastSelectedSkillIndex);
            if (this.subitem != null) {
                this.subitem.SetSelect(true);
            }
            if (this.subitem != null && this.lastSkillIndex != null && this.lastSkillIndex != this.lastSelectedSkillIndex) {
                this.subitem.SetSelect(false);
            }
            this.lastSkillIndex = this.lastSelectedSkillIndex;
            this.loadLevelInfoList();
            this.loadSkillList();
        };
        HunterSkill.prototype.loadSkillList = function () {
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            this.listSkillData.removeAll();
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            //table_general_transfer 猎人变身表
            var transferTbl = zj.TableGeneralTransfer.Item(this.generalId % zj.CommonConfig.general_id_to_index_multiple);
            if (hunterInfo.transfer_level != 0 && transferTbl.transfer_skill != 0) {
                this.scrollerSkill.scaleX = 0.8;
                this.scrollerSkill.scaleY = 0.8;
                this.scrollerSkill.width = 600;
            }
            else {
                this.scrollerSkill.scaleX = 1;
                this.scrollerSkill.scaleY = 1;
                this.scrollerSkill.width = 500;
            }
            for (var i = 0; i < baseGeneralInfo.skill_ids.length; i++) {
                var v = baseGeneralInfo.skill_ids[i];
                var data_1 = new zj.HunterSkillItemData();
                data_1.index = i;
                data_1.generalId = this.generalId;
                data_1.skillId = v;
                data_1.father = this;
                this.listSkillData.addItem(data_1);
            }
            if (baseGeneralInfo.init_passive.length > 0 && baseGeneralInfo.init_passive[0] != 0) {
                var data_2 = new zj.HunterSkillItemData();
                data_2.index = 2;
                data_2.generalId = this.generalId;
                data_2.skillId = baseGeneralInfo.init_passive[0];
                data_2.father = this;
                this.listSkillData.addItem(data_2);
            }
            if (baseGeneralInfo.awake_passive != 0) {
                var data_3 = new zj.HunterSkillItemData();
                data_3.index = 3;
                data_3.generalId = this.generalId;
                data_3.skillId = baseGeneralInfo.awake_passive;
                data_3.father = this;
                this.listSkillData.addItem(data_3);
            }
            if (hunterInfo.transfer_level != 0 && transferTbl.transfer_skill != 0) {
                var data_4 = new zj.HunterSkillItemData();
                data_4.index = 4;
                data_4.generalId = this.generalId;
                data_4.skillId = transferTbl.transfer_skill;
                data_4.father = this;
                this.listSkillData.addItem(data_4);
            }
            if (this.lastSelectedSkillIndex >= this.listSkillData.length) {
                this.lastSelectedSkillIndex = 0;
            }
            var data = this.listSkillData.getItemAt(this.lastSelectedSkillIndex);
            data.isSelected = true;
            this.listSkillData.replaceItemAt(data, this.lastSelectedSkillIndex);
            this.listSkill.dataProvider = this.listSkillData;
            this.listSkill.itemRenderer = zj.HunterSkillItem;
            this.listSkill.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSkillListTap, this);
        };
        HunterSkill.prototype.onSkillListTap = function (e) {
            zj.Game.SoundManager.playEffect("ui_dianji_anniu_mp3");
            if (e.itemIndex == this.lastSelectedSkillIndex)
                return;
            this.listLevelInfo.scrollV = 0;
            var lastData = this.listSkillData.getItemAt(this.lastSelectedSkillIndex);
            if (lastData) {
                lastData.isSelected = false;
                this.listSkillData.replaceItemAt(lastData, this.lastSelectedSkillIndex);
            }
            var data = this.listSkillData.getItemAt(e.itemIndex);
            data.isSelected = !data.isSelected;
            this.listSkillData.replaceItemAt(data, e.itemIndex);
            this.lastSelectedSkillIndex = e.itemIndex;
            this.loadLevelInfoList();
            this.scroller.viewport.contentHeight = 0;
        };
        HunterSkill.prototype.loadLevelInfoList = function () {
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null)
                return;
            var transferTbl = zj.TableGeneralTransfer.Item(this.generalId % zj.CommonConfig.general_id_to_index_multiple);
            var currentSkilllLevel = 0;
            var skillType = "";
            if (this.lastSelectedSkillIndex == 2) {
                currentSkilllLevel = hunterInfo.passives[0].level;
                skillType = zj.TextsConfig.TextsConfig_Hunter.passive_skill;
            }
            else if (this.lastSelectedSkillIndex == 3) {
                currentSkilllLevel = hunterInfo.awakePassive.level;
                skillType = zj.TextsConfig.TextsConfig_Hunter.pledge_skill;
            }
            else if (this.lastSelectedSkillIndex == 0) {
                currentSkilllLevel = hunterInfo.skills[this.lastSelectedSkillIndex].level;
                skillType = zj.TextsConfig.TextsConfig_Hunter.auto_skill;
            }
            else if (this.lastSelectedSkillIndex == 4) {
                currentSkilllLevel = hunterInfo.transfer_level;
                skillType = zj.TextsConfig.TextsConfig_Hunter.change_skill;
            }
            else {
                currentSkilllLevel = hunterInfo.skills[this.lastSelectedSkillIndex].level;
                skillType = zj.TextsConfig.TextsConfig_Hunter.active_skill;
            }
            // if (currentSkilllLevel != 0) {
            //     this.labelLevel.text = "Lv " + currentSkilllLevel.toString();   
            // } else {
            //     this.labelLevel.text = "";
            // }
            this.labelSkillType.text = skillType;
            this.skillInfoList = zj.PlayerHunterSystem.GetSkillEachLvList(this.generalId);
            var name = this.skillInfoList[this.lastSelectedSkillIndex].name;
            if (currentSkilllLevel != 0) {
                name += "   Lv " + currentSkilllLevel.toString();
            }
            this.labelName.text = name;
            this.labelSkillInfo.textFlow = zj.Util.RichText(this.skillInfoList[this.lastSelectedSkillIndex].des);
            var list = [];
            if (this.lastSelectedSkillIndex == 3) {
                for (var i = 0; i < (this.skillInfoList[this.lastSelectedSkillIndex].upList).length; i++) {
                    var v = this.skillInfoList[this.lastSelectedSkillIndex].upList[i];
                    if (i <= 4) {
                        list.push(v);
                    }
                }
            }
            else if (this.lastSelectedSkillIndex == 4) {
                for (var i = 0; i < (this.skillInfoList[this.lastSelectedSkillIndex].upList).length; i++) {
                    var v = this.skillInfoList[this.lastSelectedSkillIndex].upList[i];
                    if (i < zj.CommonConfig.general_max_transfer_level) {
                        list.push(v);
                    }
                }
            }
            else {
                list = zj.Table.DeepCopy(this.skillInfoList[this.lastSelectedSkillIndex].upList);
            }
            var maxLevel = 0;
            if (this.lastSelectedSkillIndex == 3 || this.lastSelectedSkillIndex == 4) {
                maxLevel = list.length;
            }
            else {
                maxLevel = zj.PlayerHunterSystem.GetMaxLevel(this.generalId);
            }
            this.listLevelInfoData.removeAll();
            for (var i = 0; i < maxLevel; i++) {
                var data = new zj.HunterSkillInfoItemData();
                data.level = i + 1;
                data.generalId = this.generalId;
                data.info = list[i];
                data.isFade = (currentSkilllLevel > i);
                this.listLevelInfoData.addItem(data);
            }
            if ((maxLevel) < list.length) {
                var data = new zj.HunterSkillInfoItemData();
                if (zj.Game.PlayerHunterSystem.queryHunter(this.generalId).star == zj.CommonConfig.general_max_star) {
                    data.vis = true;
                }
                else {
                    data.vis = false;
                }
                this.listLevelInfoData.addItem(data);
            }
            this.listLevelInfo.dataProvider = this.listLevelInfoData;
            this.listLevelInfo.itemRenderer = zj.HunterSkillInfoItem;
            var focIndex = 1;
            if (currentSkilllLevel > 2) {
                this.listLevelInfo.selectedIndex = 1;
            }
            this.groupUpLevel.visible = (this.lastSelectedSkillIndex != 3);
            this.groupAwakenMax.visible = (this.lastSelectedSkillIndex == 3);
            this.groupTransform.visible = (this.lastSelectedSkillIndex == 4);
            if (this.lastSelectedSkillIndex == 3) {
                var path = "";
                if (hunterInfo.awakePassive.level == 0) {
                    path = zj.UIConfig.UIConfig_Hunter.awakenSkill[0];
                }
                else {
                    this.btnGoAwaken.visible = (hunterInfo.awakePassive.level != 5);
                    if (hunterInfo.awakePassive.level == 5) {
                        this.imgAwakenSkillTip.horizontalCenter = 0;
                        path = zj.UIConfig.UIConfig_Hunter.awakenSkill[2];
                    }
                    else {
                        this.imgAwakenSkillTip.horizontalCenter = NaN;
                        this.imgAwakenSkillTip.left = 20;
                        path = zj.UIConfig.UIConfig_Hunter.awakenSkill[1];
                    }
                }
                this.imgAwakenSkillTip.source = zj.cachekey(path, this);
            }
            else if (this.lastSelectedSkillIndex == 4) {
                this.groupUpLevel.visible = false;
                this.groupAwakenMax.visible = false;
                if (hunterInfo.transfer_level != zj.CommonConfig.general_max_transfer_level) {
                    this.imgTransFormMax.visible = false;
                    this.groupCost2.visible = true;
                    this.groupCost1.visible = true;
                    this.btnTransform.visible = true;
                    this.imgConsume.visible = true;
                    var itemSet1 = zj.PlayerItemSystem.Set(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][0]);
                    this.labelNumMeterials.text = (zj.PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][0]) + "/" + transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0]);
                    zj.Set.LabelNumberGreenAndRed(this.labelNumMeterials, zj.PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][0]), transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0]);
                    this.imgiconMeterials.source = itemSet1.Path;
                    this.imgAddSkillMeterials.visible = (zj.PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][0]) < transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0]);
                    if (transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1] != null) {
                        this.groupCost2.visible = true;
                        this.groupCost1.x = 80;
                        var itemSet2 = zj.PlayerItemSystem.Set(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1]);
                        this.labelNumSkillFrag.text = (zj.PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1]) + "/" + transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][1]);
                        zj.Set.LabelNumberGreenAndRed(this.labelNumSkillFrag, zj.PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1]), transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0]);
                        this.imgIconSkillFrag.source = itemSet2.Path;
                        this.imgAddSkillFragMent.visible = (zj.PlayerItemSystem.Count(transferTbl.uplevel_consume[hunterInfo.transfer_level - 1][1]) < transferTbl.uplevel_consume_count[hunterInfo.transfer_level - 1][0]);
                    }
                    else {
                        this.groupCost2.visible = false;
                        this.groupCost1.x = 140;
                    }
                }
                else {
                    this.imgTransFormMax.visible = (true);
                    this.groupCost2.visible = (false);
                    this.groupCost1.visible = (false);
                    this.btnTransform.visible = (false);
                    this.imgConsume.visible = (false);
                }
            }
            else {
                this.labelSkillPoint.text = hunterInfo.skill_num.toString();
                zj.Set.LabelNumberGreenAndRed(this.labelSkillPoint, hunterInfo.skill_num, 1);
            }
        };
        HunterSkill.prototype.onItemTap = function (isTouchBegin, data) {
            var _this = this;
            var dialog = this.groupMain.getChildByName("hunter-skill-description");
            if (dialog)
                this.groupMain.removeChild(dialog);
            if (isTouchBegin) {
                zj.loadUI(zj.Common_DesSkill).then(function (dialog) {
                    var item = _this.listSkill.getElementAt(data.index);
                    if (item) {
                        dialog.x = _this.listSkill.parent.x + item.x + item.width * 0.5 - dialog.width * 0.5;
                        dialog.y = _this.listSkill.parent.y + item.y + item.height;
                    }
                    dialog.name = "hunter-skill-description";
                    var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(_this.generalId);
                    if (data.index == 2 || data.index == 3) {
                        dialog.setInfoLevelSkill(data.skillId, _this.generalId, data.index);
                    }
                    else {
                        dialog.setInfoSkill(data.skillId, data.index, hunterInfo.skills[data.index].level);
                    }
                    _this.groupMain.addChild(dialog);
                });
            }
        };
        /**抬起移除技能详情对话框 */
        HunterSkill.prototype.up = function () {
            var dialog = this.groupMain.getChildByName("hunter-skill-description");
            if (dialog)
                this.groupMain.removeChild(dialog);
        };
        HunterSkill.prototype.onBtnHelp = function () {
            zj.loadUI(zj.HelpDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.loadBySmallType(305);
            });
        };
        HunterSkill.prototype.onBtnRefreshSkill = function () {
            var _this = this;
            var msg = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.skill_recycle_tips, zj.CommonConfig.general_reset_skill_token);
            zj.TipManager.ShowConfirmCancel(msg, function () {
                zj.Game.PlayerHunterSystem.skillReset(_this.generalId)
                    .then(function () {
                    zj.toast(zj.Helper.convertStringWithColor(zj.TextsConfig.TextsConfig_Hunter.recycle_success, "green"));
                    _this.reloadGeneral();
                }).catch(function () {
                });
            });
        };
        HunterSkill.prototype.onBtnAddSkillPoint = function () {
            var _this = this;
            if (this.lastSelectedSkillIndex == 3)
                return;
            zj.loadUI(zj.HunterSkillAddDialog).then(function (dialog) {
                dialog.setInfo(_this.generalId, function () {
                    _this.reloadGeneral();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterSkill.prototype.onBtnUpLevel = function () {
            var _this = this;
            if (this.lastSelectedSkillIndex == 2) {
                zj.Game.PlayerHunterSystem.passiveUpLevel(this.generalId).then(function () {
                    _this.onSkillUpLevelSuccess();
                }).catch(function () {
                });
            }
            else {
                zj.Game.PlayerHunterSystem.skillUpLevel(this.generalId, this.lastSelectedSkillIndex + 1).then(function () {
                    _this.onSkillUpLevelSuccess();
                }).catch(function () {
                });
            }
        };
        HunterSkill.prototype.onSkillUpLevelSuccess = function () {
            var currentBattleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            if (currentBattleValue > this.father.battleValue) {
                zj.CommonTipBmfont.promptBattleValue(this.father.battleValue, currentBattleValue);
                this.father.battleValue = currentBattleValue;
            }
            this.reloadGeneral();
        };
        HunterSkill.prototype.onBtnGoAwaken = function () {
            this.father.onSubUIEvent(zj.HunterSubUIEvent.GoAwaken);
        };
        HunterSkill.prototype.getItemList = function () {
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            for (var i = 0; i < baseGeneralInfo.skill_ids.length; i++) {
                var item = this.listSkill.getElementAt(i);
                this.itemList.push(item);
            }
        };
        HunterSkill.prototype.onBtnTransform = function () {
            var _this = this;
            zj.PlayerHunterSystem.GeneralTransferSkillUp(this.generalId).then(function () {
                var transferTbl = zj.TableGeneralTransfer.Item(_this.generalId % zj.CommonConfig.general_id_to_index_multiple);
                var transfer_level = zj.Game.PlayerHunterSystem.queryHunter(_this.generalId).transfer_level;
                zj.loadUI(zj.HunterTransUpLevelPop).then(function (dialog) {
                    dialog.SetInfo(transferTbl.transfer_skill, transfer_level, _this, function () {
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }).catch(function () {
            });
        };
        HunterSkill.prototype.onBtngroupCost1 = function () {
            var _this = this;
            var genInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var transferTbl = zj.TableGeneralTransfer.Item(this.generalId % zj.CommonConfig.general_id_to_index_multiple);
            var goodId = transferTbl.uplevel_consume[genInfo.transfer_level - 1][0];
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(goodId, _this, function () {
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return HunterSkill;
    }(zj.HunterSubUI));
    zj.HunterSkill = HunterSkill;
    __reflect(HunterSkill.prototype, "zj.HunterSkill");
})(zj || (zj = {}));
//# sourceMappingURL=HunterSkill.js.map