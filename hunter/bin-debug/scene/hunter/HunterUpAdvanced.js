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
     * @date 2019-1-17
     *
     * @class 猎人进阶
     */
    var HunterUpAdvanced = (function (_super) {
        __extends(HunterUpAdvanced, _super);
        function HunterUpAdvanced() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterUpAdvancedSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelTip); // 因为是循环播放，需要特别处理
                egret.Tween.removeTweens(_this);
            }, _this);
            _this.mainGroup.scaleX = _this.mainGroup.scaleY = 0;
            return _this;
        }
        HunterUpAdvanced.prototype.setInfo = function (generalId, oldValue, cb) {
            var _this = this;
            this.generalId = generalId;
            this.oldValue = oldValue;
            this.callback = cb;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_diban", "armatureName", "007_diban4_xunhuan", 0)
                .then(function (display) {
                display.x = _this.groupAni.width / 2;
                display.y = _this.groupAni.height / 2;
                _this.groupAni.addChild(display);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "001_beijignguang_02", 0)
                .then(function (display) {
                display.scaleX = 0.9;
                display.scaleY = 0.9;
                display.x = _this.groupbg.width / 2;
                _this.groupbg.addChild(display);
            });
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_tishi_biaoti", null, [this.imgTips], ["003_wenzi"]).then(function (armatureDisplay) {
                armatureDisplay.animation.play("001_xunhuan", 0);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.x = _this.groupTips.width / 2;
                armatureDisplay.y = _this.groupTips.height / 2;
                _this.groupTips.addChild(armatureDisplay);
            });
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var lastFramePath = zj.UIConfig.UIConfig_Role.heroFrame[hunterInfo.step - 1];
            var currentFramePath = zj.UIConfig.UIConfig_Role.heroFrame[hunterInfo.step];
            var headPath = zj.PlayerHunterSystem.Head(this.generalId);
            this.imgFrameLast.source = zj.cachekey(lastFramePath, this);
            this.imgFrameCurrent.source = zj.cachekey(currentFramePath, this);
            this.imgHeadLast.source = zj.cachekey(headPath, this);
            this.imgHeadCurrent.source = zj.cachekey(headPath, this);
            zj.Helper.SetHeroAwakenStar(this.groupStarLast, hunterInfo.star, hunterInfo.awakePassive.level);
            zj.Helper.SetHeroAwakenStar(this.groupStarCurrent, hunterInfo.star, hunterInfo.awakePassive.level);
            var _a = zj.PlayerHunterSystem.Str_NameGr(this.generalId, hunterInfo.step - 1), lastName = _a[0], lastNameColor = _a[1];
            this.labelNameLast.text = lastName;
            this.labelNameLast.textColor = lastNameColor;
            var _b = zj.PlayerHunterSystem.Str_NameGr(this.generalId, hunterInfo.step), currentName = _b[0], currentNameColor = _b[1];
            this.labelNameCurrent.text = currentName;
            this.labelNameCurrent.textColor = currentNameColor;
            this.labelPowerLast.text = this.oldValue.toString();
            this.labelPowerCurrent.text = hunterInfo.battleValue.toString();
            this.setAttributesInfo();
            this.groupIcon.x = -this.groupIcon.width;
            this.groupIcon.visible = false;
            this.groupAttributes.x = -this.groupAttributes.width;
            this.groupAttributes.visible = false;
            this.showAnimation();
        };
        HunterUpAdvanced.prototype.setAttributesInfo = function () {
            var hunterInfoNext = zj.Table.DeepCopy(zj.Game.PlayerHunterSystem.queryHunter(this.generalId));
            var hunterInfoCurrent = zj.Table.DeepCopy(hunterInfoNext);
            hunterInfoCurrent.step -= 1;
            hunterInfoCurrent.partner = [1, 2, 3, 4];
            var _a = ["", "", ""], name = _a[0], current = _a[1], next = _a[2];
            var attrCurrent = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfoCurrent)[0];
            var attrNext = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfoNext)[0];
            var shows = zj.TableEnum.EnumHunterAttriShow2.slice();
            for (var i = 0; i < shows.length; i++) {
                var v = shows[i];
                name = zj.Helper.StringFormat("%s", zj.TextsConfig.TextsConfig_HeroMain.attr[v]);
                current = zj.Helper.StringFormat("+%d", Math.ceil(attrCurrent[v - 1]));
                next = zj.Helper.StringFormat("+%d", Math.ceil(attrNext[v - 1]));
                if (v == 8) {
                    current += "%";
                    next += "%";
                }
                this["labelAttributeName" + (i + 1)].text = name;
                this["labelAttributeCurrent" + (i + 1)].text = current;
                this["labelAttributeNext" + (i + 1)].text = next;
            }
        };
        HunterUpAdvanced.prototype.showAnimation = function () {
            var _this = this;
            this.slow();
            egret.Tween.get(this).wait(1500).call(function () {
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            });
        };
        HunterUpAdvanced.prototype.slow = function () {
            var _this = this;
            egret.Tween.get(this.mainGroup).to({ scaleX: 1, scaleY: 1 }, 500).wait(100).call(function () {
                var destX = (_this.groupIcon.parent.width - _this.groupIcon.width) * 0.5;
                egret.Tween.get(_this.groupIcon).call(function () {
                    _this.groupIcon.visible = true;
                }).to({ x: destX }, 500).call(function () {
                    var attributeX = (_this.groupAttributes.parent.width - _this.groupAttributes.width) * 0.5;
                    egret.Tween.get(_this.groupAttributes).call(function () {
                        _this.groupAttributes.visible = true;
                        zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                    }).to({ x: attributeX }, 500);
                });
            });
            egret.Tween.get(this.labelTip, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 500);
        };
        HunterUpAdvanced.prototype.onBtnClose = function () {
            if (this.callback) {
                this.callback();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterUpAdvanced;
    }(zj.Dialog));
    zj.HunterUpAdvanced = HunterUpAdvanced;
    __reflect(HunterUpAdvanced.prototype, "zj.HunterUpAdvanced");
})(zj || (zj = {}));
//# sourceMappingURL=HunterUpAdvanced.js.map