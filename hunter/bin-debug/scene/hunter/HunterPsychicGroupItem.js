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
     * @date 2019-1-12
     *
     * @class 猎人念力组合效果item.
     */
    var HunterPsychicGroupItem = (function (_super) {
        __extends(HunterPsychicGroupItem, _super);
        function HunterPsychicGroupItem() {
            var _this = _super.call(this) || this;
            _this.effect = null;
            _this.update = 0;
            _this.effBGAni = null;
            _this.effBGIndex = [4, 5, 6, 7, 3];
            _this.skinName = "resource/skins/hunter/HunterPsychicGroupItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterPsychicGroupItem"], null);
            _this.init();
            return _this;
        }
        HunterPsychicGroupItem.prototype.init = function () {
            var _this = this;
            var thisOne = this;
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli2_eff", null, [], [])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                thisOne.effBGAni = armatureDisplay;
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.stop();
                }, thisOne);
                thisOne.effBGAni.animation.play("005_taozhuang_lan", 0);
                thisOne.groupAniEffect.addChild(thisOne.effBGAni);
            });
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEND, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onEND, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () { _this.father = null; }, this);
        };
        HunterPsychicGroupItem.prototype.onBegin = function () {
            var _this = this;
            this.update = egret.setInterval(function () {
                _this.father.lodeUI(_this.info);
                egret.clearInterval(_this.update);
            }, this, 300);
        };
        HunterPsychicGroupItem.prototype.onEND = function () {
            egret.clearInterval(this.update);
        };
        HunterPsychicGroupItem.prototype.SetEmptyItem = function () {
            this.imgVoid.visible = true;
            this.imgGroupPic.visible = false;
            this.imgGroupPicBack.visible = false;
            this.groupAni.visible = false;
            this.groupAniEffect.visible = false;
            this.imgLevelFloor.visible = false;
            this.labelLevelNum.visible = false;
        };
        HunterPsychicGroupItem.prototype.SetGroupItem = function () {
            this.imgVoid.visible = false;
            this.imgGroupPic.visible = true;
            this.imgGroupPicBack.visible = true;
            this.groupAniEffect.visible = true;
            this.imgLevelFloor.visible = true;
            this.labelLevelNum.visible = true;
            var str = this.info.path;
            str = str.slice(0, Object.keys(this.info.path).length - 5);
            str += Math.floor((this.info.psychic.level + 1) / 2) + "_png";
            this.imgGroupPic.source = zj.cachekey(str, this);
            this.imgGroupPicBack.source = str;
            this.imgLevelFloor.source = zj.cachekey(zj.UIConfig.UIConfig_Psychic.level[Math.floor((this.info.psychic.level + 1) / 2) + 1], this);
            this.labelLevelNum.text = this.info.psychic.level;
        };
        HunterPsychicGroupItem.prototype.SetInfo = function (index, info, father, isUp, isAct) {
            this.index = index;
            this.info = info;
            this.father = father;
            this.isUp = isUp || false;
            this.isAct = isAct || false;
            if (this.info == 0) {
                this.SetEmptyItem();
            }
            else {
                if (this.isUp) {
                    this.SetGroupItemAni();
                }
                else {
                    this.SetGroupItem();
                }
                if (this.isAct) {
                    this.SetGroupBGAni();
                }
            }
        };
        HunterPsychicGroupItem.prototype.SetGroupItemAni = function () {
            var _this = this;
            this.groupAni.visible = true;
            if (this.effect == null) {
                var thisOne_1 = this;
                zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "nianli2_eff", null, [], [])
                    .then(function (armatureDisplay) {
                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     armatureDisplay.animation.stop();
                    //     armatureDisplay.animation.reset();
                    //     armatureDisplay.armature.dispose();
                    //     armatureDisplay.dbClear();
                    //     armatureDisplay.dispose(true);
                    //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    thisOne_1.effect = armatureDisplay;
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        armatureDisplay.animation.stop();
                        _this.SetGroupItem();
                    }, thisOne_1);
                    thisOne_1.effect.animation.play("002_jihuo_taozhuang", 1);
                    thisOne_1.groupAni.addChild(thisOne_1.effect);
                });
            }
            else {
                this.effect.animation.play("002_jihuo_taozhuang", 1);
            }
        };
        HunterPsychicGroupItem.prototype.SetGroupBGAni = function () {
            var quality = Math.floor((this.info.psychic.level + 1) / 2);
            if (this.effBGIndex[quality - 1] == 3) {
                this.effBGAni.animation.play("003_taozhuang_bai", 0);
            }
            else if (this.effBGIndex[quality - 1] == 4) {
                this.effBGAni.animation.play("004_taozhuang_lv", 0);
            }
            else if (this.effBGIndex[quality - 1] == 5) {
                this.effBGAni.animation.play("005_taozhuang_lan", 0);
            }
            else if (this.effBGIndex[quality - 1] == 6) {
                this.effBGAni.animation.play("006_taozhuang_zi", 0);
            }
            else if (this.effBGIndex[quality - 1] == 7) {
                this.effBGAni.animation.play("007_taozhuang_cheng", 0);
            }
        };
        return HunterPsychicGroupItem;
    }(zj.UI));
    zj.HunterPsychicGroupItem = HunterPsychicGroupItem;
    __reflect(HunterPsychicGroupItem.prototype, "zj.HunterPsychicGroupItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicGroupItem.js.map