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
     * @class 猎人收藏强化弹窗
     */
    var HunterCollectionStrength = (function (_super) {
        __extends(HunterCollectionStrength, _super);
        function HunterCollectionStrength() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterCollectionStrengthSkin.exml";
            _this.init();
            return _this;
        }
        HunterCollectionStrength.prototype.init = function () {
            var _this = this;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.groupMaterialsLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupMaterialsLeft, this);
            this.groupFragRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupFragRight, this);
            this.btnIntensify.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnIntensify, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, this);
        };
        HunterCollectionStrength.prototype.setInfo = function (index, generalId, cb) {
            this.callback = cb;
            this.index = index;
            this.generalId = generalId;
            this._id = 0;
            this.refresh();
        };
        HunterCollectionStrength.prototype.refresh = function () {
            this.equipId = zj.PlayerHunterSystem.Table(this.generalId).equip_info[this.index];
            var equipInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
            var step = 0;
            var level = 0;
            for (var i = 0; i < equipInfo.length; i++) {
                this._id = i;
                if (equipInfo[i].equipId == this.equipId) {
                    step = equipInfo[i].step;
                    level = equipInfo[i].level;
                }
            }
            this.loadIconInfo(level, step);
            this.loadAttributeInfo(level, step);
            if (level != zj.CommonConfig.general_equip_max_level) {
                this.loadExpendInfo(level);
            }
        };
        HunterCollectionStrength.prototype.loadIconInfo = function (level, step) {
            var frameBoard = zj.UIConfig.UIConfig_Hunter_Equip.frameBoard[zj.PlayerHunterSystem.equipGetStarNumber(step) - 1];
            this.imgStarFloorLeft.source = zj.cachekey(frameBoard, this);
            this.imgStarFloorMax.source = zj.cachekey(frameBoard, this);
            this.imgStarFloorRight.source = zj.cachekey(frameBoard, this);
            var spriteStar = zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1];
            this.imgStepStarLeft.source = zj.cachekey(spriteStar, this);
            this.imgStepStarMax.source = zj.cachekey(spriteStar, this);
            ;
            this.imgStepStarRigth.source = zj.cachekey(spriteStar, this);
            ;
            var equipIcon = zj.TableGeneralEquip.Item(this.equipId).equip_icon;
            this.labelLevelLeft.text = String(level);
            this.labelLevelMax.text = String(level);
            this.labelLevelRight.text = String(level + 1);
            this.imgIconLeft.source = zj.cachekey(equipIcon, this);
            this.imgIconMax.source = zj.cachekey(equipIcon, this);
            ;
            this.imgIconRight.source = zj.cachekey(equipIcon, this);
            ;
        };
        HunterCollectionStrength.prototype.loadAttributeInfo = function (level, step) {
            var mainAttri = zj.TableGeneralEquip.Item(this.equipId).main_attri;
            var attriId1 = zj.TableGeneralEquipAttri.Item(mainAttri);
            var attri1 = zj.PlayerHunterSystem.GetLevelAttri(attriId1.attri_id, level);
            this.lableAttLeftDown.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.Attri[attriId1.attri_type - 1], attri1));
            this.imgTableDown.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.collection[attriId1.attri_type - 1], this);
            //判断等级最大与非最大时该显示的部分
            var layout = level == zj.CommonConfig.general_equip_max_level ? false : true;
            this.groupTeach.visible = layout;
            this.groupConsumablesInfoDown.visible = layout;
            this.groupAwakenLevelMax.visible = !layout;
            this.imgAttAddNextUp.visible = layout;
            this.lableAttCenterUp.visible = layout;
            this.imgAttAddNextDown.visible = layout;
            this.lableAttCenterDown.visible = layout;
            this.imgAttAddDown.visible = layout;
            this.lableAttRightDown.visible = layout;
            var skillLevel = zj.TableGeneralEquip.Item(this.equipId).skillLevel[step - 1];
            var skillLevelNumber = step < 5 ? 1 : Math.floor((step - 1) / 5) + 1;
            var frame = zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame;
            if (this.index == 2) {
                frame = zj.UIConfig.UIConfig_Hunter_Equip.Speical_Frame;
            }
            /**this.index != 2 */
            var panIndex = this.index != 2;
            var max = panIndex ? frame[skillLevelNumber] : frame[skillLevel];
            this.imgBoardMax.source = zj.cachekey(max, this);
            this.lableAttLeftUp.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.strengthLv, level));
            if (level == zj.CommonConfig.general_equip_max_level) {
                this.lableAttLeftUp.left = 150;
                this.groupIntensifyInfoDown.horizontalCenter = 95;
                this.imgIconMax.source = zj.cachekey(zj.TableGeneralEquip.Item(this.equipId).equip_icon, this);
                this.labelLevelMax.text = String(level);
            }
            else {
                var Left = panIndex ? frame[skillLevelNumber] : frame[skillLevel];
                var Right = panIndex ? frame[skillLevelNumber] : frame[skillLevel];
                this.imgBoardLeft.source = zj.cachekey(Left, this);
                this.imgBoardRight.source = zj.cachekey(Right, this);
                this.lableAttCenterUp.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Equip.strengthLv, level + 1));
                var attri1Next = zj.PlayerHunterSystem.GetLevelAttri(attriId1.attri_id, level + 1);
                this.lableAttCenterDown.text = String(attri1Next);
                this.lableAttRightDown.text = String(attri1Next - attri1);
            }
        };
        HunterCollectionStrength.prototype.loadExpendInfo = function (level) {
            var equipInfo = zj.TableGeneralEquip.Item(this.equipId);
            var goods = equipInfo.uplevel_goods[level];
            var count = equipInfo.uplevel_count[level];
            var money = equipInfo.uplevel_money[level];
            var itemSet1 = zj.PlayerItemSystem.Set(goods[0]);
            this.imgFrameMaterials.source = zj.cachekey(itemSet1.Frame, this);
            this.imgIconMaterials.source = zj.cachekey(itemSet1.Path, this);
            this.labelNumberMaterials.text = itemSet1.Count + "/" + count[0];
            this.imgAddMaterials.visible = itemSet1.Count >= count[0] ? false : true;
            zj.Set.LabelNumberGreenAndRed(this.labelNumberMaterials, itemSet1.Count, count[0]);
            /**数组长度判断 */
            var goodslength = goods.length == 2 ? true : false;
            this.groupFragRight.visible = goodslength;
            this.imgAdd.visible = goodslength;
            this.groupMaterialsLeft.left = goodslength ? 56 : 100;
            if (goods.length == 2) {
                var itemSet2 = zj.PlayerItemSystem.Set(goods[1]);
                this.imgFrameSkillFrag.source = zj.cachekey(itemSet2.Frame, this);
                this.imgIconSkillFrag.source = zj.cachekey(itemSet2.Path, this);
                this.labelNumberSkillFrag.text = itemSet2.Count + "/" + count[1];
                zj.Set.LabelNumberGreenAndRed(this.labelNumberSkillFrag, itemSet2.Count, count[1]);
                this.imgAddSkillFrag.visible = itemSet2.Count >= count[0] ? false : true;
            }
            this.lableGoldNum.text = String(money);
        };
        /**点击第一个道具随便 */
        HunterCollectionStrength.prototype.onBtnGroupMaterialsLeft = function () {
            var _this = this;
            var level = 0;
            var equipInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
            for (var kk in equipInfo) {
                if (equipInfo.hasOwnProperty(kk)) {
                    var vv = equipInfo[Number(kk)];
                    level = vv.equipId == this.equipId ? vv.level : 0;
                }
            }
            var goods = zj.TableGeneralEquip.Item(this.equipId).uplevel_goods[level + 1];
            var itemSet1 = zj.PlayerItemSystem.Set(goods[0], null, null);
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(itemSet1.Info.id, _this, function () {
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**点击第二个道具随便 */
        HunterCollectionStrength.prototype.onBtnGroupFragRight = function () {
            var _this = this;
            var level = 0;
            var equipInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
            for (var kk in equipInfo) {
                if (equipInfo.hasOwnProperty(kk)) {
                    var vv = equipInfo[Number(kk)];
                    if (vv.equipId == this.equipId) {
                        level = vv.level;
                    }
                }
            }
            var goods = zj.TableGeneralEquip.Item(this.equipId).uplevel_goods[level + 1];
            var itemSet1 = zj.PlayerItemSystem.Set(goods[1], null, null);
            zj.loadUI(zj.CommonOutExchangeDialog)
                .then(function (dialog) {
                dialog.setInfo(itemSet1.Info.id, function () {
                    _this.refresh();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterCollectionStrength.prototype.onBtnIntensify = function () {
            var _this = this;
            this.oldBattleValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            zj.Game.PlayerHunterSystem.generalUpLevelEquip(this.generalId, this.index + 1)
                .then(function () {
                // toast("");
                ///加龙骨动画
                _this.keel();
                // this.refresh();
                // if (this.callback) this.callback();
            }).catch(function (reason) {
                // toast(reason);
            });
        };
        HunterCollectionStrength.prototype.keel = function () {
            var _this = this;
            if (this.groupAwakenLevelMax.visible == true) {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [this.groupCollectMax], ["001_tubiao"]).then(function (armatureDisplay) {
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
                    armatureDisplay.x = _this.groupTeach.width * 0.5;
                    armatureDisplay.y = _this.groupTeach.height * 0.5;
                    _this.groupTeach.addChild(armatureDisplay);
                });
            }
            else {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_tisheng", null, [this.groupCollectRight], ["001_tubiao"]).then(function (armatureDisplay) {
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
                    armatureDisplay.x = 335;
                    armatureDisplay.y = _this.groupTeach.height / 2;
                    _this.groupTeach.addChild(armatureDisplay);
                });
            }
            egret.Tween.get(this).wait(500).call(function () {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "baowu_tisheng", null, [], ["000_jiantou"]).then(function (armatureDisplay) {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        _this.refresh();
                        if (_this.callback)
                            _this.callback();
                        if (armatureDisplay.parent)
                            armatureDisplay.parent.removeChild(armatureDisplay);
                        _this.promptBattleValue();
                        _this.promptActive();
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
                    armatureDisplay.x = _this.groupIntensifyInfoUp.width * 0.5;
                    armatureDisplay.y = _this.groupIntensifyInfoUp.height * 0.5;
                    _this.groupIntensifyInfoUp.addChild(armatureDisplay);
                });
                zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "baowu_tisheng", null, [], ["000_jiantou"]).then(function (armatureDisplay) {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        _this.refresh();
                        if (_this.callback)
                            _this.callback();
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
                    armatureDisplay.x = _this.groupIntensifyInfoDown.width * 0.5;
                    armatureDisplay.y = _this.groupIntensifyInfoDown.height * 0.5;
                    _this.groupIntensifyInfoDown.addChild(armatureDisplay);
                });
            });
        };
        HunterCollectionStrength.prototype.promptBattleValue = function () {
            // 当前武将战斗力
            var oldValue = this.oldBattleValue;
            var newValue = zj.Game.PlayerHunterSystem.queryHunter(this.generalId).battleValue;
            zj.CommonTipBmfont.promptBattleValue(oldValue, newValue);
        };
        /**提示强化成功 */
        HunterCollectionStrength.prototype.promptActive = function () {
            var _this = this;
            var source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.common_hint[4], this);
            var image = new eui.Image(source);
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi", null, [image], ["000_tishi"]).then(function (armatureDisplay) {
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
                armatureDisplay.x = _this.groupTeach.width * 0.5 - 104;
                armatureDisplay.y = _this.groupTeach.height * 0.5 - 32.5;
                if (_this.groupTeach.visible != true) {
                    _this.groupAwakenLevelMax.addChild(armatureDisplay);
                }
                else {
                    _this.groupTeach.addChild(armatureDisplay);
                }
                _this.refresh();
                if (_this.callback)
                    _this.callback();
            });
        };
        /**关闭弹窗 */
        HunterCollectionStrength.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterCollectionStrength;
    }(zj.Dialog));
    zj.HunterCollectionStrength = HunterCollectionStrength;
    __reflect(HunterCollectionStrength.prototype, "zj.HunterCollectionStrength");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCollectionStrength.js.map