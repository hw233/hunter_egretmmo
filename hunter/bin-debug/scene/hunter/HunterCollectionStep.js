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
     * @date 2018-1-3
     *
     * @class 猎人收藏升品弹窗
     */
    var HunterCollectionStep = (function (_super) {
        __extends(HunterCollectionStep, _super);
        function HunterCollectionStep() {
            var _this = _super.call(this) || this;
            /**装备信息索引 */
            _this.equipInfoIndex = 0;
            /**判断是否提示升品成功 */
            _this.vis = false;
            _this.skinName = "resource/skins/hunter/HunterCollectionStepSkin.exml";
            _this.init();
            return _this;
        }
        HunterCollectionStep.prototype.init = function () {
            var _this = this;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.groupMaterialsLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupMaterialsLeft, this);
            this.groupFragRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupFragRight, this);
            this.btnliftQuality.addEventListener(egret.TouchEvent.TOUCH_TAP, this.BtnLiftQuality, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, this);
        };
        HunterCollectionStep.prototype.setInfo = function (index, generalId, cb) {
            this.callback = cb;
            this.index = index;
            this.generalId = generalId;
            this.refresh();
        };
        HunterCollectionStep.prototype.refresh = function () {
            this.equipId = zj.PlayerHunterSystem.Table(this.generalId).equip_info[this.index];
            var equipInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
            for (var i = 0; i < equipInfo.length; i++) {
                if (equipInfo[i].equipId == this.equipId) {
                    this.equipInfoIndex = i;
                }
            }
            var equidInfo = zj.TableGeneralEquip.Item(this.equipId);
            var step = equipInfo[this.equipInfoIndex].step;
            this.loadIconInfo(equidInfo, step);
            this.loadAttributeInfo(equidInfo, step);
            if (step != zj.CommonConfig.general_equip_max_step) {
                this.loadExpendInfo(equidInfo, step);
            }
        };
        HunterCollectionStep.prototype.loadIconInfo = function (equidInfo, step) {
            //根据等级判断顶部icon是两边显示还是中间显示
            var iconVisible = (step != zj.CommonConfig.general_equip_max_step && step % 5 == 0);
            this.groupCollectLeft.visible = (iconVisible == true ? true : false);
            this.groupCollectCenter.visible = (iconVisible == true ? false : true);
            this.groupCollectRight.visible = (iconVisible == true ? true : false);
            //顶部icon组底部图片
            var skillLevelNumber = 1;
            var skillLevelNumber1 = 1;
            if (step >= 5) {
                skillLevelNumber = Math.floor((step - 1) / 5) + 1;
                skillLevelNumber1 = Math.floor((step) / 5) + 1;
            }
            var frame = zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame;
            if (this.index == 2) {
                frame = zj.UIConfig.UIConfig_Hunter_Equip.Speical_Frame;
            }
            this.imgIconBackLeft.source = zj.cachekey(frame[skillLevelNumber], this);
            this.imgIconBackCenter.source = zj.cachekey(frame[skillLevelNumber], this);
            this.imgIconBackRight.source = zj.cachekey(frame[skillLevelNumber1], this);
            var path = equidInfo.equip_icon;
            this.imgIconCenter.source = zj.cachekey(path, this);
            this.imgIconLeft.source = zj.cachekey(path, this);
            if (step != zj.CommonConfig.general_equip_max_step) {
                this.imgIconRight.source = zj.cachekey(path, this);
            }
            zj.cachekey(path, this);
        };
        HunterCollectionStep.prototype.loadAttributeInfo = function (equidInfo, step) {
            var attriId1 = zj.TableGeneralEquipAttri.Item(equidInfo.add_attri_one);
            var attriId2 = zj.TableGeneralEquipAttri.Item(equidInfo.add_attri_two);
            var attri1 = zj.PlayerHunterSystem.equipGetStepAttribute(Number(attriId1.attri_id), step);
            var attri2 = 0;
            this.imgInfoIconUp.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1], this);
            /**TextsConfig.TextsConfig_Hunter_Break.Attri1 */
            var configAttri = zj.TextsConfig.TextsConfig_Hunter_Break.Attri1;
            if (attriId2 != null) {
                this.imgSkillIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.collection[attriId2.attri_type - 1], this);
                attri2 = zj.PlayerHunterSystem.equipGetStepAttribute(Number(attriId2.attri_id), step);
                this.lableAttLeftUp.textFlow = zj.Util.RichText(zj.Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                this.lableAttLeftDown.textFlow = zj.Util.RichText(zj.Helper.StringFormat(configAttri[attriId2.attri_type - 1], attri2));
            }
            if (step == zj.CommonConfig.general_equip_max_step) {
                this.groupDownInfo.visible = false;
                this.imgPromoteMax.visible = true;
                this.lableAttLeftUp.visible = true;
                this.imgStepStarBefore.visible = false;
                this.imgStepStarAfter.visible = false;
                this.imgAttAddNextUp.visible = false;
                this.lableAttCenterUp.visible = false;
                this.imgAttAddUp.visible = false;
                this.lableAttRightUp.visible = false;
                if (this.index == 2) {
                    this.groupAttributeInfo.visible = true;
                    this.groupInfoDown.visible = false;
                    this.lableAttLeftUp.textFlow = zj.Util.RichText(zj.Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                    var skillLevel = equidInfo.skillLevel[step - 1];
                    var talentId = equidInfo.skillId[0];
                    var talentId2 = equidInfo.skillId[1];
                    var skill = zj.TableGeneralTalent.Item(talentId).path;
                    this.imgSkill.source = zj.cachekey(skill, this);
                    this.lableSkillLevel.text = String(skillLevel);
                    this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.itemFrame[skillLevel - 1], this);
                    this.lableSkillName.text = zj.TableGeneralTalent.Item(talentId).talent_name;
                    var des = null;
                    if (talentId2 != null) {
                        des = zj.PlayerHunterSystem.GetPassiveSkillDes(talentId, skillLevel - 1);
                        var des1 = zj.PlayerHunterSystem.GetPassiveSkillDes(talentId2, skillLevel - 1);
                        this.lablePlayerInfo.textFlow = zj.Util.RichText(des[0] + "/" + des1[0]);
                    }
                    else {
                        des = zj.PlayerHunterSystem.GetPassiveSkillDes(talentId, skillLevel);
                        this.lablePlayerInfo.textFlow = zj.Util.RichText(des[0]);
                    }
                }
                else {
                    this.groupAttributeInfo.visible = false;
                    this.groupInfoDown.visible = true;
                    this.imgAttAddNextDown.visible = false;
                    this.lableAttCenterDown.visible = false;
                    this.imgAttAddDown.visible = false;
                    this.lableAttRightDown.visible = false;
                    this.groupInfoUp.horizontalCenter = 130;
                    this.groupInfoDown.horizontalCenter = 130;
                }
                return;
            }
            if (this.index == 2) {
                /**布局显示 */
                var layoutVisible = step % 5 != 0 ? true : false;
                this.lableAttCenterUp.visible = !layoutVisible;
                this.imgAttAddUp.visible = !layoutVisible;
                this.lableAttRightUp.visible = !layoutVisible;
                this.imgAttAddNextDown.visible = layoutVisible;
                this.lableAttCenterDown.visible = layoutVisible;
                this.imgAttAddDown.visible = layoutVisible;
                this.lableAttRightDown.visible = layoutVisible;
                this.groupAttributeInfo.visible = !layoutVisible;
                this.lableAttLeftDown.visible = layoutVisible;
                this.imgStepStarBefore.visible = layoutVisible;
                this.imgStepStarAfter.visible = layoutVisible;
                this.lableAttLeftUp.visible = !layoutVisible;
                this.lableAttLeftUp.textFlow = zj.Util.RichText(zj.Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                var attri1Next = zj.PlayerHunterSystem.equipGetStepAttribute(attriId1.attri_id, step + 1);
                this.lableAttCenterUp.text = attri1Next + "%";
                this.lableAttRightUp.text = (attri1Next - attri1) + "%";
                var skillLevel = equidInfo.skillLevel[step - 1];
                var skillLevelNext = equidInfo.skillLevel[step];
                var talentId = equidInfo.skillId;
                var skill = zj.TableGeneralTalent.Item(talentId[0]).path;
                this.imgSkill.source = zj.cachekey(skill, this);
                this.lableSkillLevel.text = String(skillLevel);
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.itemFrame[skillLevel - 1], this);
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.itemFrame[skillLevel - 1], this);
                if (step % 5 != 0) {
                    this.imgInfoIconUp.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.collection[3], this);
                    this.imgSkillIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1], this);
                    this.imgStepStarBefore.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1], this);
                    this.imgStepStarAfter.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step], this);
                    this.lableAttCenterDown.text = attri1Next + "%";
                    this.lableAttRightDown.text = (attri1Next - attri1) + "%";
                    this.lableAttLeftDown.textFlow = zj.Util.RichText(zj.Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                }
                var _a = [null, null, null, null, null, null, null, null, null, null, null, null], str1 = _a[0], attriNum1 = _a[1], str2 = _a[2], attriNum2 = _a[3], attriNum1Next = _a[4], attriNum2Next = _a[5], strAttri1 = _a[6], strAttri2 = _a[7], des1 = _a[8], des2 = _a[9], strAttri11 = _a[10], strAttri22 = _a[11];
                if (talentId.length == 2 && (step % 5 == 0)) {
                    this.lableAttLeftUp.visible = true;
                    _b = zj.PlayerHunterSystem.GetPassiveSkillDes(talentId[0], skillLevel), str1 = _b[0], attriNum1 = _b[1];
                    _c = zj.PlayerHunterSystem.GetPassiveSkillDes(talentId[1], skillLevel), str2 = _c[0], attriNum2 = _c[1];
                    _d = zj.PlayerHunterSystem.GetPassiveSkillDes(talentId[0], skillLevelNext), attriNum1Next = _d[1];
                    _e = zj.PlayerHunterSystem.GetPassiveSkillDes(talentId[1], skillLevelNext), attriNum2Next = _e[1];
                    strAttri1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[0], (attriNum1Next[0] - attriNum1[0]));
                    strAttri2 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum2[0], (attriNum2Next[0] - attriNum2[0]));
                    strAttri11 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[1], (attriNum1Next[1] - attriNum1[1]));
                    strAttri22 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum2[1], (attriNum2Next[1] - attriNum2[1]));
                    if (attriNum1.length == 2) {
                        if (attriNum2.length == 2) {
                            des2 = zj.Helper.StringFormat(str2, strAttri2, strAttri22);
                        }
                        else {
                            des2 = zj.Helper.StringFormat(str2, strAttri2);
                        }
                        des1 = zj.Helper.StringFormat(str1, strAttri1, strAttri11);
                    }
                    else {
                        if (attriNum1.length == 2) {
                            des2 = zj.Helper.StringFormat(str2, strAttri2, strAttri22);
                        }
                        else {
                            des2 = zj.Helper.StringFormat(str2, strAttri2);
                        }
                        des1 = zj.Helper.StringFormat(str1, strAttri1);
                    }
                    this.lableSkillName.text = zj.TableGeneralTalent.Item(talentId[0]).talent_name;
                    this.lablePlayerInfo.textFlow = zj.Util.RichText(des1 + des2);
                }
                else if (talentId.length == 1 && (step % 5 == 0)) {
                    this.lableAttLeftUp.visible = true;
                    _f = zj.PlayerHunterSystem.GetPassiveSkillEquipDes(talentId[0], skillLevel), str1 = _f[0], attriNum1 = _f[1];
                    _g = zj.PlayerHunterSystem.GetPassiveSkillEquipDes(talentId[0], skillLevelNext), attriNum1Next = _g[1];
                    if (attriNum1.length == 2) {
                        strAttri1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[0], (attriNum1Next[0] - attriNum1[0]));
                        strAttri2 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[1], (attriNum1Next[1] - attriNum1[1]));
                        des1 = zj.Helper.StringFormat(str1, strAttri1, strAttri2);
                    }
                    else {
                        strAttri1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.EquipDes, attriNum1[0], (attriNum1Next[0] - attriNum1[0]));
                        des1 = zj.Helper.StringFormat(str1, strAttri1);
                    }
                    this.lableSkillName.text = zj.TableGeneralTalent.Item(talentId[0]).talent_name;
                    this.lablePlayerInfo.textFlow = zj.Util.RichText(des1);
                }
            }
            else if (this.index != 2) {
                this.groupInfoDown.visible = true;
                this.groupAttributeInfo.visible = false;
                var stepvis = step % 5 == 0 ? true : false;
                this.lableAttCenterUp.visible = stepvis;
                this.imgAttAddUp.visible = stepvis;
                this.lableAttRightUp.visible = stepvis;
                this.lableAttLeftUp.visible = stepvis;
                this.imgStepStarBefore.visible = !stepvis;
                this.imgStepStarAfter.visible = !stepvis;
                this.lableAttLeftUp.textFlow = zj.Util.RichText(zj.Helper.StringFormat(configAttri[attriId1.attri_type - 1], attri1));
                this.lableAttLeftDown.textFlow = stepvis ? zj.Util.RichText(zj.Helper.StringFormat(configAttri[attriId2.attri_type - 1], attri2)) : zj.Util.RichText(zj.Helper.StringFormat(configAttri[(attriId2.attri_type - 1) - 1], attri1));
                var attri1Next = zj.PlayerHunterSystem.equipGetStepAttribute(attriId1.attri_id, step + 1);
                this.lableAttCenterUp.text = attri1Next + "%";
                this.lableAttRightUp.text = (attri1Next - attri1) + "%";
                var attri2Next = zj.PlayerHunterSystem.equipGetStepAttribute(attriId2.attri_id, step + 1);
                this.lableAttCenterDown.text = stepvis ? attri2Next + "%" : attri1Next + "%";
                this.lableAttRightDown.text = stepvis ? (attri2Next - attri2) + "%" : (attri1Next - attri1) + "%";
                var iconup = !stepvis ? zj.UIConfig.UIConfig_Hunter_Equip.collection[3] : zj.UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1];
                var icon = !stepvis ? zj.UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1] : zj.UIConfig.UIConfig_Hunter_Equip.collection[attriId2.attri_type - 1];
                var before = !stepvis ? zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1] : null;
                var after = !stepvis ? zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step] : null;
                this.imgInfoIconUp.source = zj.cachekey(iconup, this);
                this.imgSkillIcon.source = zj.cachekey(icon, this);
                this.imgStepStarBefore.source = zj.cachekey(before, this);
                this.imgStepStarAfter.source = zj.cachekey(after, this);
            }
            var _b, _c, _d, _e, _f, _g;
        };
        ;
        HunterCollectionStep.prototype.loadExpendInfo = function (equidInfo, step) {
            //消耗
            var goods = equidInfo.upstep_goods[step];
            var count = equidInfo.upstep_count[step];
            var money = equidInfo.upstep_money[step];
            var itemSet1 = zj.PlayerItemSystem.Set(goods[0], null, null);
            this.imgFrameMaterials.source = zj.cachekey(itemSet1.Frame, this);
            this.imgIconMaterials.source = zj.cachekey(itemSet1.Path, this);
            this.labelNumberMaterials.text = itemSet1.Count + "/" + count[0];
            zj.Set.LabelNumberGreenAndRed(this.labelNumberMaterials, itemSet1.Count, count[0]);
            var goodsLength = goods.length == 2 ? true : false;
            if (goodsLength) {
                var itemSet2 = zj.PlayerItemSystem.Set(goods[1], null, null);
                this.imgFrameSkillFrag.source = zj.cachekey(itemSet2.Frame, this);
                this.imgIconSkillFrag.source = zj.cachekey(itemSet2.Path, this);
                this.labelNumberSkillFrag.text = itemSet2.Count + "/" + count[1];
                zj.Set.LabelNumberGreenAndRed(this.labelNumberSkillFrag, itemSet2.Count, count[1]);
                this.imgAddSkillFrag.visible = itemSet2.Count >= count[1] ? false : true;
            }
            this.imgAddMaterials.visible = itemSet1.Count >= count[0] ? false : true;
            this.groupMaterialsLeft.left = goodsLength ? 55 : 100;
            this.groupFragRight.visible = goodsLength;
            this.imgAdd.visible = goodsLength;
            this.lableGoldNumber.text = String(money);
        };
        /**点击第一个道具碎片 */
        HunterCollectionStep.prototype.onBtnGroupMaterialsLeft = function () {
            var _this = this;
            var step = zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo[this.equipInfoIndex].step;
            var goods = zj.TableGeneralEquip.Item(this.equipId).upstep_goods[step];
            var itemSet1 = zj.PlayerItemSystem.Set(goods[0], null, null);
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(itemSet1.Info.id, _this, function () {
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击第二个道具碎片 */
        HunterCollectionStep.prototype.onBtnGroupFragRight = function () {
            var _this = this;
            var step = zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo[this.equipInfoIndex].step;
            var goods = zj.TableGeneralEquip.Item(this.equipId).upstep_goods[step];
            var itemSet1 = zj.PlayerItemSystem.Set(goods[1], null, null);
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(itemSet1.Info.id, _this, function () {
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击升品 */
        HunterCollectionStep.prototype.BtnLiftQuality = function () {
            var _this = this;
            this.oldBattleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            zj.Game.PlayerHunterSystem.generalUpStepEquip(this.generalId, this.index + 1).then(function () {
                zj.loadUI(zj.HunterCollectPopStep)
                    .then(function (dialog) {
                    dialog.setInfo(zj.PlayerHunterSystem.Table(_this.generalId).equip_info[_this.index], 2, _this.generalId, _this, function () {
                        _this.keel();
                        var equipInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[_this.generalId].equipInfo;
                        var step = equipInfo[_this.equipInfoIndex].step;
                        if ((step - 1) % 5 == 0) {
                            _this.vis = true;
                        }
                    });
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }).catch(function (reason) {
                // toast(reason);
            });
        };
        HunterCollectionStep.prototype.keel = function () {
            var _this = this;
            if (this.groupCollectCenter.visible == true) {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [this.groupCollectCenter], ["001_tubiao"])
                    .then(function (armatureDisplay) {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    }, _this);
                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     armatureDisplay.animation.stop();
                    //     armatureDisplay.animation.reset();
                    //     armatureDisplay.armature.dispose();
                    //     armatureDisplay.dbClear();
                    //     armatureDisplay.dispose(true);
                    //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    armatureDisplay.animation.play("001_tubiao", 1);
                    armatureDisplay.x = _this.groupTeach.width / 2; //; + this.groupCollectCenter.width / 2;
                    armatureDisplay.y = _this.groupTeach.height / 2; // + this.groupCollectCenter.height / 2;
                    _this.groupTeach.addChild(armatureDisplay);
                });
            }
            else {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [this.groupCollectRight], ["001_tubiao"])
                    .then(function (armatureDisplay) {
                    // armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                    // }, this)
                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     armatureDisplay.animation.stop();
                    //     armatureDisplay.animation.reset();
                    //     armatureDisplay.armature.dispose();
                    //     armatureDisplay.dbClear();
                    //     armatureDisplay.dispose(true);
                    //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    armatureDisplay.animation.play("001_tubiao", 1);
                    armatureDisplay.x = 396; // + this.groupCollectRight.width / 2;
                    armatureDisplay.y = _this.groupTeach.height / 2; // + this.groupCollectRight.height / 2;
                    _this.groupTeach.addChild(armatureDisplay);
                });
            }
            egret.Tween.get(this).wait(500).call(function () {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "baowu_tisheng", null, [], [])
                    .then(function (armatureDisplay) {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        _this.promptActive();
                        _this.promptBattleValue();
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
                    armatureDisplay.animation.play("000_jiantou", 1);
                    armatureDisplay.x = _this.groupInfoUp.width * 0.5;
                    armatureDisplay.y = _this.groupInfoUp.height * 0.5;
                    _this.groupInfoUp.addChild(armatureDisplay);
                });
                zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "baowu_tisheng", null, [], [])
                    .then(function (armatureDisplay) {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        // this.promptActive();
                        // this.promptBattleValue();
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
                    armatureDisplay.animation.play("000_jiantou", 1);
                    armatureDisplay.x = _this.groupInfoDown.width * 0.5;
                    armatureDisplay.y = _this.groupInfoDown.height * 0.5;
                    _this.groupInfoDown.addChild(armatureDisplay);
                });
            });
        };
        /**提示升品成功 */
        HunterCollectionStep.prototype.promptActive = function () {
            var _this = this;
            var source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.common_hint[3], this);
            var image = new eui.Image(source);
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    if (armatureDisplay.parent)
                        armatureDisplay.parent.removeChild(armatureDisplay);
                    if (_this.vis == true) {
                        zj.toast_success("技能提升成功");
                        _this.vis = false;
                    }
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
                armatureDisplay.x = _this.groupTeach.width * 0.3;
                armatureDisplay.y = _this.groupTeach.height * 0.35;
                _this.groupTeach.addChild(armatureDisplay);
                _this.refresh();
                if (_this.callback)
                    _this.callback();
            });
        };
        HunterCollectionStep.prototype.promptBattleValue = function () {
            // 当前武将战斗力
            var oldValue = this.oldBattleValue;
            var newValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            zj.CommonTipBmfont.promptBattleValue(oldValue, newValue);
        };
        /**关闭弹窗 */
        HunterCollectionStep.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterCollectionStep;
    }(zj.Dialog));
    zj.HunterCollectionStep = HunterCollectionStep;
    __reflect(HunterCollectionStep.prototype, "zj.HunterCollectionStep");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCollectionStep.js.map