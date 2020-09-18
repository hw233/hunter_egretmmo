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
     * @date 2019-1-11
     *
     * @class 猎人念力子项
     */
    var HunterPsychicItem = (function (_super) {
        __extends(HunterPsychicItem, _super);
        function HunterPsychicItem() {
            var _this = _super.call(this) || this;
            _this.effect_act = null;
            _this.effect = null;
            _this.skinName = "resource/skins/hunter/HunterPsychicItemSkin.exml";
            _this.labelName.textColor = zj.Helper.RGBToHex("r:212,g:224,b:238");
            _this.isShowName = true;
            _this.isShowProperty = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOpen, _this);
            _this.initPsychicEffect();
            return _this;
        }
        HunterPsychicItem.prototype.initPsychicEffect = function () {
            var _this = this;
            this.groupAni.visible = false;
            zj.Game.DragonBonesManager.playAnimation(this, "nianli2_eff", "armatureName", "008_xuanzhong", 0)
                .then(function (display) {
                _this.groupAni.addChild(display);
            }).catch(function (reason) {
            });
        };
        HunterPsychicItem.prototype.SetItemName = function () {
            if (!this.isShowName) {
                return;
            }
            this.groupName.visible = false;
            this.groupProperty.visible = false;
            if (this.father.showName) {
                this.groupName.visible = true;
                this.groupProperty.visible = false;
                this.labelName.text = this.generalPsy.name;
            }
            if (this.father.showProp) {
                var useLable = null;
                if (this.father.showName) {
                    this.groupProperty.visible = true;
                    useLable = this.labelProperty;
                }
                else {
                    this.groupName.visible = true;
                    this.groupProperty.visible = false;
                    useLable = this.labelName;
                }
                var attriType = this.generalPsy.attri_type;
                var attriTypeName = zj.TextsConfig.TextsConfig_Hunter_psychic.attri_type[attriType];
                var attriTypeType = zj.TextsConfig.TextsConfig_Hunter_psychic.attri_type_type[attriType];
                useLable.text = (attriTypeName + "+" + this.value + attriTypeType);
            }
            this.labelName.textColor = zj.ConstantConfig_Common.Color.psy_quality_color[this.quality];
            this.labelProperty.textColor = zj.ConstantConfig_Common.Color.psy_quality_color[this.quality];
        };
        HunterPsychicItem.prototype.setInfo = function (father, index, vis) {
            this.father = father;
            this.index = index;
            // this.effActivationBefIndx = 804100
            // this.effActivationIndx = 804101
            this.isShowName = false;
            // this.isAct = false
            var noEnable = (vis || false) == false;
            // this.labelPsychicName.tex(cc.c3b(212, 224, 238))
            // this.imgSelect.visible = (false)
            this.groupAni.visible = false;
            // this.btnOpen.ex :setEnabled(_noEnable)
        };
        HunterPsychicItem.prototype.SetSelectVisible = function (isVisible) {
            this.groupAni.visible = isVisible;
        };
        HunterPsychicItem.prototype.SetMainItemUI = function (generalPsy, psyInfo, isEff, isAct, cb) {
            this.generalPsy = generalPsy;
            this.psyInfo = psyInfo;
            this.isEff = isEff;
            this.isAct = isAct;
            this.cbFunc = cb || null;
            this.SetCommonItemUI();
        };
        HunterPsychicItem.prototype.SetCommonItemUI = function () {
            if (this.psyInfo instanceof Object) {
                this.level = this.psyInfo.level;
                this.value = this.generalPsy.attri_value[this.level - 1];
                this.quality = Math.floor((this.level + 1) / 2);
                this.SetActivationBeforeEffect(false);
                this.SetPsyItemAndEffect();
            }
            else {
                this.groupLock.visible = false;
                this.SetActivationBeforeEffect(true);
                this.PlayItemEffect(zj.UIConfig.UIConfig_Psychic.psyPath[this.index]);
                this.SetShowTips();
            }
        };
        HunterPsychicItem.prototype.SetActivationBeforeEffect = function (enable) {
            this.groupEffectOpen.visible = enable;
            if (enable && this.effectOpen == null) {
                var thisOne_1 = this;
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli_eff", null, [], [])
                    .then(function (armatureDisplay) {
                    // this.remove(armatureDisplay);
                    thisOne_1.effectOpen = armatureDisplay;
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        armatureDisplay.animation.stop();
                    }, thisOne_1);
                    thisOne_1.effectOpen.animation.play("006_kejihuo", 0);
                    thisOne_1.groupEffectOpen.addChild(thisOne_1.effectOpen);
                });
            }
            else if (enable) {
                this.effectOpen.animation.play("006_kejihuo", 0);
            }
        };
        // private remove(armatureDisplay) {
        //     armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
        //         armatureDisplay.animation.stop();
        //         armatureDisplay.animation.reset();
        //         armatureDisplay.armature.dispose();
        //         armatureDisplay.dbClear();
        //         armatureDisplay.dispose(true);
        //         if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
        //     }, null);
        // }
        HunterPsychicItem.prototype.SetShowTips = function () {
            this.isShowName = false;
            this.groupName.visible = false;
            this.groupProperty.visible = false;
        };
        HunterPsychicItem.prototype.SetPsyItemAndEffect = function () {
            if (this.isAct) {
                this.setPsyEffect();
            }
            else {
                this.setPsyItem();
            }
        };
        HunterPsychicItem.prototype.setPsyItem = function () {
            var path = this.generalPsy.path;
            path = path.slice(0, Object.keys(path).length - 5);
            path += this.quality + "_png";
            this.groupLock.visible = true;
            this.imgLevelFloor.source = zj.cachekey(zj.UIConfig.UIConfig_Psychic.level[this.quality + 1], this);
            this.labelLevelNum.text = this.level.toString();
            this.PlayItemEffect(path);
            this.SetShowName();
            this.SetItemName();
        };
        HunterPsychicItem.prototype.setPsyEffect = function () {
            var _this = this;
            this.isAct = false;
            var frameEvt_cb = function () {
                // if (evt == "next") {
                _this.setPsyItem();
                if (_this.cbFunc != null) {
                    _this.cbFunc();
                }
                // }
            };
            var animation_cb = function () {
                // if (movementType == ccs.MovementEventType.start) {
                zj.Teach.addTeaching();
                // }
            };
            var thisOne = this;
            if (this.effect_act == null) {
                zj.Game.DragonBonesManager.playAnimation(this, "nianli2_eff", "armatureName", "001_jihuo", 1)
                    .then(function (display) {
                    egret.Tween.get(thisOne).wait(150).call(function () {
                        frameEvt_cb();
                        animation_cb();
                    });
                    thisOne.effect_act = display;
                    thisOne.groupEffectAct.addChild(_this.effect_act);
                }).catch(function (reason) {
                });
            }
            else {
                this.effect_act.animation.play("001_jihuo", 1);
                egret.Tween.get(thisOne).wait(150).call(function () {
                    frameEvt_cb();
                    animation_cb();
                });
            }
        };
        HunterPsychicItem.prototype.PlayItemEffect = function (path) {
            var _this = this;
            var bone = ["002_huizhang_diguang", "002_huizhang2"];
            var thisOne = this;
            this.imgPsychicPicture.source = zj.cachekey(path, this);
            this.imgPsychicPicture1.source = path;
            this.groupPsychicEffect.visible = true;
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli_eff", null, [new eui.Image(), this.imgPsychicPicture], bone)
                .then(function (armatureDisplay) {
                // this.remove(armatureDisplay);
                _this.effect = armatureDisplay;
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.stop();
                }, thisOne);
                thisOne.effect.animation.play("000_daiji", 0);
                thisOne.groupPsychicEffect.addChild(thisOne.effect);
            });
        };
        HunterPsychicItem.prototype.onBtnOpen = function () {
            if (this.father.reloadSelecte instanceof Function && this.index != null) {
                this.father.reloadSelecte(this.index);
            }
        };
        HunterPsychicItem.prototype.SetShowName = function () {
            this.isShowName = true;
            this.groupName.visible = true;
            this.groupProperty.visible = true;
        };
        return HunterPsychicItem;
    }(zj.UI));
    zj.HunterPsychicItem = HunterPsychicItem;
    __reflect(HunterPsychicItem.prototype, "zj.HunterPsychicItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicItem.js.map