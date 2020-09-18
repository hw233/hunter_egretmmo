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
    var HunterCollectPopStep = (function (_super) {
        __extends(HunterCollectPopStep, _super);
        function HunterCollectPopStep() {
            var _this = _super.call(this) || this;
            _this.visbale = false;
            _this.skinName = "resource/skins/hunter/HunterCollectPopStepSkin.exml";
            _this.init();
            return _this;
        }
        HunterCollectPopStep.prototype.init = function () {
            var _this = this;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.removeEventListener(egret.Event.ENTER_FRAME, _this.enter, _this);
                _this.father = null;
                egret.Tween.removeTweens(_this);
            }, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enter, this);
        };
        HunterCollectPopStep.prototype.enter = function () {
            if (this.spineState) {
                var fr = this.spineState.animationData.frameCount * (this.spineState.currentTime / this.spineState.totalTime);
                if (Math.floor(fr) > 60 && this.visbale == true) {
                    var slot = this.dragdisplay.armature.getSlot("001_daoju");
                    var display = this.father2;
                    if (slot && display) {
                        if (display.parent)
                            display.parent.removeChild(display);
                        slot.setDisplay(display);
                    }
                    this.visbale = false;
                }
            }
        };
        HunterCollectPopStep.prototype.setInfo = function (id, index, generalId, father, cb) {
            var _this = this;
            this.callback = cb;
            this.id = id;
            this.index = index;
            this.generalId = generalId;
            this.fatherfather = father;
            this.imgIcon.source = zj.cachekey(zj.TableGeneralEquip.Item(this.id).equip_icon, this);
            var step = 0;
            var equipInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo;
            for (var kk_1 in equipInfo) {
                if (equipInfo.hasOwnProperty(kk_1)) {
                    var vv_1 = equipInfo[kk_1];
                    if (vv_1.equipId == id) {
                        step = vv_1.step;
                    }
                }
            }
            this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1], this);
            var paths = null;
            var bones = null;
            paths = [
                zj.TableGeneralEquip.Item(this.id).equip_icon,
                zj.TableGeneralEquip.Item(this.id).equip_icon,
                zj.TableGeneralEquip.Item(this.id).equip_icon,
            ];
            bones = [
                "001_daoju_gaoguang",
                "001_daoju_heise",
                "001_daoju",
            ];
            zj.cachekeys([paths[0], paths[1], paths[2]], this);
            var image = new eui.Image(paths[0]);
            image.width = image.height = 120;
            image.anchorOffsetX = image.width / 2;
            image.anchorOffsetY = image.height / 2;
            var image1 = new eui.Image(paths[0]);
            image1.width = image1.height = 100;
            zj.Helper.SetImageFilterColor(image1, "black");
            image1.anchorOffsetX = image1.width / 2;
            image1.anchorOffsetY = image1.height / 2;
            var image2 = new eui.Image(paths[0]);
            image2.width = image2.height = 150;
            image2.anchorOffsetX = image2.width / 2;
            image2.anchorOffsetY = image2.height / 2;
            if (index == 1) {
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_eff", null, [image, image1, image2], ["001_daoju_gaoguang", "001_daoju_heise", "001_daoju"])
                    .then(function (armatureDisplay) {
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        if (armatureDisplay.parent)
                            armatureDisplay.parent.removeChild(armatureDisplay);
                    }, _this);
                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    // 	armatureDisplay.animation.stop();
                    // 	armatureDisplay.animation.reset();
                    // 	armatureDisplay.armature.dispose();
                    // 	armatureDisplay.dbClear();
                    // 	armatureDisplay.dispose(true);
                    // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    armatureDisplay.animation.play("000_jihuo", 1);
                    armatureDisplay.x = _this.width * 0.5;
                    armatureDisplay.y = _this.height * 0.5;
                    _this.addChild(armatureDisplay);
                });
                egret.Tween.get(this).wait(1500).call(function () {
                    _this.removeEventListener(egret.Event.ENTER_FRAME, _this.enter, _this);
                    _this.close(zj.UI.HIDE_TO_TOP);
                    egret.Tween.get(_this).wait(300).call(function () {
                        _this.callback();
                    });
                });
            }
            else {
                this.father.visible = false;
                this.father0.visible = true;
                this.father1.visible = true;
                this.imgStepStar0.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 2], this);
                this.imgStepStar1.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1], this);
                this.imgStepStar2.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.spriteStar[step - 1], this);
                this.imgStarBackground0.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.frameBoard[Math.floor((step - 1) / 5)], this);
                this.imgStarBackground1.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.frameBoard[Math.floor((step - 1) / 5)], this);
                this.imgStarBackground2.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.frameBoard[Math.floor((step - 1) / 5)], this);
                var stepone = 0;
                for (var kk in zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo) {
                    if (zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo.hasOwnProperty(kk)) {
                        var vv = zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId].equipInfo[kk];
                        if (vv.equipId == id) {
                            stepone = vv.step;
                        }
                    }
                }
                var skillLevelNumber = void 0;
                if (this.fatherfather.index != 3) {
                    if (step < 5) {
                        skillLevelNumber = 1;
                    }
                    else {
                        skillLevelNumber = Math.floor((step - 1) / 5) + 1;
                    }
                }
                this.imgIcon0.source = zj.cachekey(zj.TableGeneralEquip.Item(this.id).equip_icon, this);
                if (step < 5) {
                    skillLevelNumber = 1;
                }
                else {
                    skillLevelNumber = Math.floor((step - 2) / 5) + 1;
                }
                if (this.fatherfather.index == 2) {
                    this.imgFrame0.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.Speical_Frame[skillLevelNumber], this);
                }
                else {
                    this.imgFrame0.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber], this);
                }
                this.imgIcon1.source = zj.cachekey(zj.TableGeneralEquip.Item(this.id).equip_icon, this);
                this.imgIcon2.source = zj.cachekey(zj.TableGeneralEquip.Item(this.id).equip_icon, this);
                if (step < 5) {
                    skillLevelNumber = 1;
                }
                else {
                    skillLevelNumber = Math.floor((step - 1) / 5) + 1;
                }
                if (this.fatherfather.index == 2) {
                    this.imgFrame1.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.Speical_Frame[skillLevelNumber], this);
                    this.imgFrame2.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.Speical_Frame[skillLevelNumber], this);
                }
                else {
                    this.imgFrame1.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber], this);
                    this.imgFrame2.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Equip.Normal_Frame[skillLevelNumber], this);
                }
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "baowu_eff", null, [this.father0, this.father1], ["001_daoju", "001_daoju_gaoguang"])
                    .then(function (armatureDisplay) {
                    _this.visbale = true;
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        if (armatureDisplay.parent)
                            armatureDisplay.parent.removeChild(armatureDisplay);
                    }, _this);
                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    // 	armatureDisplay.animation.stop();
                    // 	armatureDisplay.animation.reset();
                    // 	armatureDisplay.armature.dispose();
                    // 	armatureDisplay.dbClear();
                    // 	armatureDisplay.dispose(true);
                    // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    _this.dragdisplay = armatureDisplay;
                    _this.spineState = armatureDisplay.animation.play("000_qianghua", 2);
                    armatureDisplay.x = _this.width * 0.5;
                    armatureDisplay.y = _this.height * 0.5;
                    _this.addChild(armatureDisplay);
                });
                egret.Tween.get(this).wait(1500).call(function () {
                    _this.removeEventListener(egret.Event.ENTER_FRAME, _this.enter, _this);
                    _this.close(zj.UI.HIDE_TO_TOP);
                    egret.Tween.get(_this).wait(300).call(function () {
                        _this.callback();
                    });
                });
            }
        };
        return HunterCollectPopStep;
    }(zj.Dialog));
    zj.HunterCollectPopStep = HunterCollectPopStep;
    __reflect(HunterCollectPopStep.prototype, "zj.HunterCollectPopStep");
})(zj || (zj = {}));
//# sourceMappingURL=HunterCollectPopStep.js.map