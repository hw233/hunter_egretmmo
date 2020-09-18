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
     * @author xing li wei
     *
     * @date 2018-12-30
     *
     * @class 猎人收藏
     */
    var HunterCollection = (function (_super) {
        __extends(HunterCollection, _super);
        function HunterCollection() {
            var _this = _super.call(this) || this;
            _this.listAttributeData = new eui.ArrayCollection();
            _this.currentSelectedIndex = 0;
            _this.skinName = "resource/skins/hunter/HunterCollectionSkin.exml";
            _this.init();
            return _this;
            // this.groupIcon.cacheAsBitmap = true;
        }
        HunterCollection.prototype.init = function () {
            this.btnIntensify.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnIntensify, this);
            this.btnUpQuality.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpQuality, this);
            this.groupCollectLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupCollectLeft, this);
            this.groupCollectCenter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupCollectCenter, this);
            this.groupCollectRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupCollectRight, this);
            this.btnActivation.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnActivation, this);
            this.btnCompound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCompound, this);
            this.groupiconCompound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupiconCompound, this);
        };
        HunterCollection.prototype.reloadGeneral = function () {
            this.currentSelectedIndex = 0;
            this.playSelectedAnimation(this.groupCollectLeft0);
            this.refresh();
        };
        HunterCollection.prototype.refresh = function () {
            this.setCollectionInfo();
            this.setAttributeInfo();
            this.setBottomInfo();
        };
        HunterCollection.prototype.setCollectionInfo = function () {
            var baseEquipInfo = zj.PlayerHunterSystem.Table(this.generalId).equip_info;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (baseEquipInfo == null || hunterInfo == null) {
                throw Error("equip info or hunter info can't be null.");
            }
            /** 是否能够显示专属藏品 */
            var canShowSpecial = (baseEquipInfo.length >= 3 && baseEquipInfo[2] != 0);
            var equipInfo = hunterInfo.equipInfo;
            var leftFramePath = zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame[0];
            var leftIconPath = zj.TableGeneralEquip.Item(baseEquipInfo[0]).equip_icon;
            var centerFramePath = zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame[0];
            var centerIconPath = zj.TableGeneralEquip.Item(baseEquipInfo[1]).equip_icon;
            this.groupCollectRight.visible = canShowSpecial;
            var rightFramePath, rightIconPath;
            if (canShowSpecial) {
                rightFramePath = zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame[0];
                rightIconPath = zj.TableGeneralEquip.Item(baseEquipInfo[2]).equip_icon;
            }
            // 等级; icon背景
            var _a = [null, null, null], letfEquipInfo = _a[0], centerEquipInfo = _a[1], rightEquipInfo = _a[2];
            for (var i = 0; i < baseEquipInfo.length; i++) {
                var v = baseEquipInfo[i];
                for (var j = 0; j < equipInfo.length; j++) {
                    var currentEquipInfo = equipInfo[j];
                    // 本地装备id和猎人装备ID一致，表示激活过
                    if (v != 0 && currentEquipInfo != null && v === currentEquipInfo.equipId) {
                        if (i == 0) {
                            letfEquipInfo = currentEquipInfo;
                            var skillLevelNumber = (currentEquipInfo.step < 5) ? 1 : (Math.floor((currentEquipInfo.step - 1) / 5) + 1);
                            leftFramePath = zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber];
                        }
                        else if (i == 1) {
                            centerEquipInfo = currentEquipInfo;
                            var skillLevelNumber = (currentEquipInfo.step < 5) ? 1 : (Math.floor((currentEquipInfo.step - 1) / 5) + 1);
                            centerFramePath = zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber];
                        }
                        else if (i == 2) {
                            rightEquipInfo = currentEquipInfo;
                            var itemInfo = zj.TableGeneralEquip.Item(currentEquipInfo.equipId);
                            rightFramePath = zj.UIConfig.UIConfig_Hunter_Equip.Speical_Frame[itemInfo.skillLevel[currentEquipInfo.step - 1]];
                        }
                    }
                }
            }
            this.imgFrameLeft.source = zj.cachekey(leftFramePath, this);
            this.imgIconLeft.source = zj.cachekey(leftIconPath, this);
            this.imgFrameCenter.source = zj.cachekey(centerFramePath, this);
            this.imgIconCenter.source = zj.cachekey(centerIconPath, this);
            if (rightFramePath)
                this.imgFrameRight.source = zj.cachekey(rightFramePath, this);
            if (rightIconPath)
                this.imgIconRight.source = zj.cachekey(rightIconPath, this);
            var isLeftActived = (letfEquipInfo != null);
            this.labelLevelLeft.visible = isLeftActived;
            this.imgLevelFloorLeft.visible = isLeftActived;
            if (isLeftActived)
                this.labelLevelLeft.text = letfEquipInfo.level.toString();
            var isCenterActived = (centerEquipInfo != null);
            this.labelLevelCenter.visible = isCenterActived;
            this.imgLevelFloorCenter.visible = isCenterActived;
            if (isCenterActived)
                this.labelLevelCenter.text = centerEquipInfo.level.toString();
            var isRightActived = (canShowSpecial && rightEquipInfo != null);
            this.labelLevelRight.visible = isRightActived;
            this.imgLevelFloorRight.visible = isRightActived;
            if (isRightActived)
                this.labelLevelRight.text = rightEquipInfo.level.toString();
            // icon 滤镜
            zj.Helper.SetImageFilterColor(this.imgIconLeft, isLeftActived ? null : "gray");
            zj.Helper.SetImageFilterColor(this.imgIconCenter, isCenterActived ? null : "gray");
            zj.Helper.SetImageFilterColor(this.imgIconRight, isRightActived ? null : "gray");
            // 星星, 背景
            this.imgStepStarLeft.visible = isLeftActived;
            this.imgStarBackgroundLeft.visible = isLeftActived;
            if (isLeftActived) {
                var step = letfEquipInfo.step;
                var leftStarPath = zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1];
                var leftStarBgPath = zj.UIConfig.UIConfig_Hunter_Equip.frameBoard[zj.PlayerHunterSystem.equipGetStarNumber(step) - 1];
                this.imgStepStarLeft.source = zj.cachekey(leftStarPath, this);
                this.imgStarBackgroundLeft.source = zj.cachekey(leftStarBgPath, this);
            }
            this.imgStepStarCenter.visible = isCenterActived;
            this.imgStarBackgroundCenter.visible = isCenterActived;
            if (isCenterActived) {
                var step = centerEquipInfo.step;
                var centerStarPath = zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1];
                var centerStarBgPath = zj.UIConfig.UIConfig_Hunter_Equip.frameBoard[zj.PlayerHunterSystem.equipGetStarNumber(step) - 1];
                this.imgStepStarCenter.source = zj.cachekey(centerStarPath, this);
                this.imgStarBackgroundCenter.source = zj.cachekey(centerStarBgPath, this);
            }
            this.imgStepStarRight.visible = isRightActived;
            this.imgStarBackgroundRight.visible = isRightActived;
            if (isRightActived) {
                var step = rightEquipInfo.step;
                var rightStarPath = zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1];
                var rightStarBgPath = zj.UIConfig.UIConfig_Hunter_Equip.frameBoard[zj.PlayerHunterSystem.equipGetStarNumber(step) - 1];
                this.imgStepStarRight.source = zj.cachekey(rightStarPath, this);
                this.imgStarBackgroundRight.source = zj.cachekey(rightStarBgPath, this);
            }
            var hunterEquip = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var equipinfo = hunterEquip.equipInfo;
            var have1 = zj.Table.FindF(equipinfo, function (_, v) {
                return v.equipId == baseEquipInfo[0];
            });
            var have2 = zj.Table.FindF(equipinfo, function (_, v) {
                return v.equipId == baseEquipInfo[1];
            });
            var have3 = zj.Table.FindF(equipinfo, function (_, v) {
                return v.equipId == baseEquipInfo[2];
            });
            // 红点
            this.imgRedLeft.visible = zj.PlayerHunterSystem.equipCanActive(this.generalId, baseEquipInfo, baseEquipInfo[0]);
            this.imgRedCenter.visible = zj.PlayerHunterSystem.equipCanActive(this.generalId, baseEquipInfo, baseEquipInfo[1]);
            this.imgRedRight.visible = zj.PlayerHunterSystem.equipCanCompound(this.generalId, baseEquipInfo);
            //装备可升品
            var step1 = zj.PlayerHunterSystem.equipCanUpStep(this.generalId, baseEquipInfo[0]);
            var step2 = zj.PlayerHunterSystem.equipCanUpStep(this.generalId, baseEquipInfo[1]);
            var step3 = null;
            if (baseEquipInfo[2] != 0) {
                step3 = zj.PlayerHunterSystem.equipCanUpStep(this.generalId, baseEquipInfo[2]);
            }
            //装备可强化
            var strength1 = zj.PlayerHunterSystem.equipCanStrengthen(this.generalId, baseEquipInfo[0]);
            var strength2 = zj.PlayerHunterSystem.equipCanStrengthen(this.generalId, baseEquipInfo[1]);
            var strength3 = null;
            if (baseEquipInfo[2] != 0) {
                strength3 = zj.PlayerHunterSystem.equipCanStrengthen(this.generalId, baseEquipInfo[2]);
            }
            if (this.imgRedLeft.visible == false) {
                this.imgRedLeft.visible = have1 && (step1 || strength1);
            }
            if (this.imgRedCenter.visible == false) {
                this.imgRedCenter.visible = have2 && (step2 || strength2);
            }
            if (baseEquipInfo[2] != 0) {
                if (this.imgRedRight.visible == false) {
                    this.imgRedRight.visible = have3 && (step3 || strength3);
                }
            }
            if (this.currentSelectedIndex == 0) {
                this.imgRedDotIntensify.visible = strength1;
                this.imgRedDotliftQuality.visible = step1;
            }
            else if (this.currentSelectedIndex == 1) {
                this.imgRedDotIntensify.visible = strength2;
                this.imgRedDotliftQuality.visible = step2;
            }
            else if (this.currentSelectedIndex == 2) {
                this.imgRedDotIntensify.visible = strength3;
                this.imgRedDotliftQuality.visible = step3;
            }
        };
        HunterCollection.prototype.setAttributeInfo = function () {
            var baseEquipInfo = zj.PlayerHunterSystem.Table(this.generalId).equip_info;
            var equipId = baseEquipInfo[this.currentSelectedIndex];
            if (equipId == 0)
                return;
            var itemInfo = zj.TableGeneralEquip.Item(equipId);
            this.labelName.text = itemInfo.equip_type_name;
            this.labelType.text = itemInfo.equip_type_des;
            this.labelSkillParticulars.text = itemInfo.equip_des;
            var canShowSpecial = (baseEquipInfo.length >= 3 && baseEquipInfo[2] != 0);
            if (canShowSpecial && this.currentSelectedIndex == 2) {
                this.labelExclusiveType.visible = true;
                this.labelExclusiveType.text = itemInfo.equip_type;
            }
            else {
                this.labelExclusiveType.visible = false;
            }
            this.listAttributeData.removeAll();
            for (var i = 0; i < 3; i++) {
                var data = new zj.HunterCollectionItemData();
                data.index = i;
                data.fatherIndex = this.currentSelectedIndex;
                data.equipId = equipId;
                data.generalId = this.generalId;
                // data.father = this;
                this.listAttributeData.addItem(data);
            }
            this.listAttribute.dataProvider = this.listAttributeData;
            this.listAttribute.itemRenderer = zj.HunterCollectionItem;
        };
        HunterCollection.prototype.setBottomInfo = function () {
            var _this = this;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var baseEquipInfo = zj.PlayerHunterSystem.Table(this.generalId).equip_info;
            var canShowSpecial = (baseEquipInfo.length >= 3 && baseEquipInfo[2] != 0);
            var equipInfo = hunterInfo.equipInfo;
            var activedList = [];
            for (var i = 0; i < baseEquipInfo.length; i++) {
                var v = baseEquipInfo[i];
                for (var j = 0; j < equipInfo.length; j++) {
                    var vv = equipInfo[j];
                    if (v != 0 && vv != null && vv.equipId == v) {
                        activedList.push(i);
                    }
                }
            }
            // whether curren selected is actived or not.
            var isActived = zj.Table.FindF(activedList, function (_, v) {
                return v == _this.currentSelectedIndex;
            });
            if (this.currentSelectedIndex == 2) {
                this.groupButton.visible = isActived;
                this.groupCompound.visible = !isActived;
                this.groupActivation.visible = false;
                this.groupLevelRestrict.visible = false;
            }
            else {
                this.groupButton.visible = isActived;
                this.groupCompound.visible = false;
                if (isActived) {
                    this.groupActivation.visible = false;
                    this.groupLevelRestrict.visible = false;
                }
                else {
                    if (this.currentSelectedIndex == 0) {
                        var isLevelEnough = (hunterInfo.level >= zj.CommonConfig.general_equip_one_openlevel);
                        this.groupActivation.visible = isLevelEnough;
                        this.groupLevelRestrict.visible = !isLevelEnough;
                        if (!isLevelEnough) {
                            var path = zj.UIConfig.UIConfig_Hunter_Equip.collectLevel1;
                            this.imgLevelNumber.source = zj.cachekey(path, this);
                        }
                    }
                    else {
                        var isLevelEnough = (hunterInfo.level >= zj.CommonConfig.general_equip_two_openlevel);
                        this.groupActivation.visible = isLevelEnough;
                        this.groupLevelRestrict.visible = !isLevelEnough;
                        if (!isLevelEnough) {
                            var path = zj.UIConfig.UIConfig_Hunter_Equip.collectLevel2;
                            this.imgLevelNumber.source = zj.cachekey(path, this);
                        }
                    }
                }
            }
            //合成组激活组信息
            if (this.currentSelectedIndex == 2 && canShowSpecial) {
                var generalEquipInfo = zj.TableGeneralEquip.Item(baseEquipInfo[2]);
                var goods = generalEquipInfo.compose_goods;
                var enough = generalEquipInfo.compose_count;
                var itemSet = zj.PlayerItemSystem.Set(Number(goods), null, null);
                var iconPath = itemSet.Path;
                var framePath = itemSet.Frame;
                this.imgFrameSkillFrag.source = zj.cachekey(framePath, this);
                this.imgIconSkillFrag.source = zj.cachekey(iconPath, this);
                var currentCount = itemSet.Count;
                this.labelNumberMaterials.text = String(currentCount) + "/" + enough;
                zj.Set.LabelNumberGreenAndRed(this.labelNumberMaterials, currentCount, Number(enough));
                this.imgAdd.visible = currentCount < Number(enough);
            }
            else if ((this.currentSelectedIndex == 0 || this.currentSelectedIndex == 1) &&
                isActived == false) {
                var enough = zj.TableGeneralEquip.Item(baseEquipInfo[this.currentSelectedIndex]).compose_money;
                var itemSet = zj.PlayerItemSystem.Set(20001, null, null);
                var framePath = itemSet.Frame;
                var iconPath = itemSet.Path;
                this.imgIconSkillActivation.source = zj.cachekey(itemSet.Path, this);
                this.imgFrameSkillActivation.source = zj.cachekey(itemSet.Frame, this);
                var currentCount = itemSet.Count;
                this.labelActivationMaterials.text = String(currentCount) + "/" + enough;
                zj.Set.LabelNumberGreenAndRed(this.labelActivationMaterials, currentCount, Number(enough));
                this.imgAddActivation.visible = currentCount < Number(enough);
            }
            if (this.currentSelectedIndex == 0 && isActived == false) {
                this.groupCollectLeft.addChild(this.imgRedLeft);
            }
            if (this.currentSelectedIndex == 1 && isActived == false) {
                this.groupCollectCenter.addChild(this.imgRedCenter);
            }
            if (this.currentSelectedIndex == 2 && isActived == false) {
                this.groupCollectRight.addChild(this.imgRedRight);
            }
        };
        HunterCollection.prototype.onBtnGroupCollectLeft = function () {
            this.currentSelectedIndex = 0;
            this.playSelectedAnimation(this.groupCollectLeft0);
        };
        HunterCollection.prototype.onBtnGroupCollectCenter = function () {
            this.currentSelectedIndex = 1;
            this.playSelectedAnimation(this.groupCollectCenter0);
        };
        HunterCollection.prototype.onBtnGroupCollectRight = function () {
            var baseEquipInfo = zj.PlayerHunterSystem.Table(this.generalId).equip_info;
            if (baseEquipInfo.length >= 3 && baseEquipInfo[2] != 0) {
                this.currentSelectedIndex = 2;
                this.playSelectedAnimation(this.groupCollectRight0);
            }
        };
        HunterCollection.prototype.playSelectedAnimation = function (group) {
            var _this = this;
            this.removeAnimation();
            zj.Game.DragonBonesManager.playAnimation(this, "zhuangbei_xuanzhong", "armatureName", null, 0)
                .then(function (display) {
                if (!_this.getChildByName("dzGF")) {
                    display.x = group.width / 2;
                    display.y = group.height / 2 - 10;
                    display.name = "dzGF";
                    group.addChild(display);
                    _this.groupCollectRight.addChild(_this.imgIconTitleRight);
                    _this.refresh();
                }
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        HunterCollection.prototype.removeAnimation = function () {
            var obj0 = this.groupCollectLeft0.getChildByName("dzGF");
            if (obj0) {
                this.groupCollectLeft0.removeChild(obj0);
            }
            var obj1 = this.groupCollectCenter0.getChildByName("dzGF");
            if (obj1) {
                this.groupCollectCenter0.removeChild(obj1);
            }
            var obj2 = this.groupCollectRight0.getChildByName("dzGF");
            if (obj2) {
                this.groupCollectRight0.removeChild(obj2);
            }
        };
        /**激活*/
        HunterCollection.prototype.onBtnActivation = function () {
            var _this = this;
            var p = zj.Game.PlayerHunterSystem.generalSelectEquip(this.generalId, this.currentSelectedIndex + 1);
            this.oldBattleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            p.then(function () {
                zj.loadUI(zj.HunterCollectPopStep)
                    .then(function (dialog) {
                    dialog.setInfo(zj.PlayerHunterSystem.Table(_this.generalId).equip_info[_this.currentSelectedIndex], 1, _this.generalId, _this, function () {
                        var source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.common_hint[1], _this);
                        var image = new eui.Image(source);
                        zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then(function (armatureDisplay) {
                            armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                                if (armatureDisplay.parent)
                                    armatureDisplay.parent.removeChild(armatureDisplay);
                            }, _this);
                            // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                            //     armatureDisplay.animation.stop();
                            //     armatureDisplay.animation.reset();
                            //     armatureDisplay.armature.dispose();
                            //     armatureDisplay.dbClear();
                            //     armatureDisplay.dispose(true);
                            //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                            // }, null);
                            armatureDisplay.animation.play("000_tishi", 1);
                            armatureDisplay.x = _this.groupIcon.width * 0.22;
                            armatureDisplay.y = _this.groupIcon.height * 0.5;
                            _this.groupIcon1.addChild(armatureDisplay);
                            _this.promptBattleValue();
                            _this.refresh();
                        });
                        _this.refresh();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            });
            p.catch(function (reason) {
                // toast(reason);
            });
        };
        /**合成 */
        HunterCollection.prototype.onBtnCompound = function () {
            var _this = this;
            var p = zj.Game.PlayerHunterSystem.generalSelectEquip(this.generalId, this.currentSelectedIndex + 1);
            this.oldBattleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            p.then(function () {
                zj.loadUI(zj.HunterCollectPopStep)
                    .then(function (dialog) {
                    dialog.setInfo(zj.PlayerHunterSystem.Table(_this.generalId).equip_info[_this.currentSelectedIndex], 1, _this.generalId, _this, function () {
                        var source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.common_hint[2], _this);
                        var image = new eui.Image(source);
                        zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then(function (armatureDisplay) {
                            armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                                if (armatureDisplay.parent)
                                    armatureDisplay.parent.removeChild(armatureDisplay);
                            }, _this);
                            // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                            //     armatureDisplay.animation.stop();
                            //     armatureDisplay.animation.reset();
                            //     armatureDisplay.armature.dispose();
                            //     armatureDisplay.dbClear();
                            //     armatureDisplay.dispose(true);
                            //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                            // }, null);
                            armatureDisplay.animation.play("000_tishi", 1);
                            armatureDisplay.x = _this.groupIcon.width * 0.22;
                            armatureDisplay.y = _this.groupIcon.height * 0.5;
                            _this.groupIcon1.addChild(armatureDisplay);
                            _this.promptBattleValue();
                            _this.refresh();
                        });
                        _this.refresh();
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            });
            p.catch(function (reason) {
                // toast(reason);
            });
        };
        HunterCollection.prototype.promptBattleValue = function () {
            // 当前武将战斗力
            var oldValue = this.oldBattleValue;
            var newValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            zj.CommonTipBmfont.promptBattleValue(oldValue, newValue);
        };
        HunterCollection.prototype.onBtnGroupiconCompound = function () {
            var _this = this;
            var baseEquipInfo = zj.PlayerHunterSystem.Table(this.generalId).equip_info;
            var generalEquipInfo = zj.TableGeneralEquip.Item(baseEquipInfo[2]);
            var goods = generalEquipInfo.compose_goods;
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(Number(goods), _this, function () {
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击强化 */
        HunterCollection.prototype.onBtnIntensify = function () {
            var _this = this;
            zj.loadUI(zj.HunterCollectionStrength)
                .then(function (dialog) {
                dialog.setInfo(_this.currentSelectedIndex, _this.generalId, function () {
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击升品 */
        HunterCollection.prototype.onBtnUpQuality = function () {
            var _this = this;
            zj.loadUI(zj.HunterCollectionStep)
                .then(function (dialog) {
                dialog.setInfo(_this.currentSelectedIndex, _this.generalId, function () {
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return HunterCollection;
    }(zj.HunterSubUI));
    zj.HunterCollection = HunterCollection;
    __reflect(HunterCollection.prototype, "zj.HunterCollection");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCollection.js.map