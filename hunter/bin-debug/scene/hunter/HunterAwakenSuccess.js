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
     * @date 2019-1-10
     *
     * @class 猎人觉醒成功之后，显示升星动画界面
     */
    var HunterAwakenSuccess = (function (_super) {
        __extends(HunterAwakenSuccess, _super);
        function HunterAwakenSuccess() {
            var _this = _super.call(this) || this;
            _this.attributes = [];
            _this.generalId = null;
            _this.callback = null;
            _this.animationEnd = false;
            _this.skinName = "resource/skins/hunter/HunterAwakenSuccessSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchClose, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelTip); // 因为是循环播放，需要特别处理
            }, null);
            return _this;
        }
        HunterAwakenSuccess.prototype.isFullScreen = function () {
            return true;
        };
        HunterAwakenSuccess.prototype.touchClose = function () {
            if (this.animationEnd == false)
                return;
            this.close();
            this.callback();
        };
        HunterAwakenSuccess.prototype.setInfo = function (generalId, callback) {
            var _this = this;
            this.generalId = generalId;
            this.callback = callback;
            this.animationEnd = false;
            this.setHeroInfo(function () {
                _this.playAnimation(function () {
                    _this.animationEnd = true;
                    _this.mainGroup.setChildIndex(_this.labelTip, _this.mainGroup.numChildren - 1);
                    _this.playTipAnimation();
                });
            });
        };
        HunterAwakenSuccess.prototype.setHeroInfo = function (cb) {
            var _this = this;
            var hunterInfo = zj.Table.DeepCopy(zj.Game.PlayerHunterSystem.queryHunter(this.generalId));
            var level = hunterInfo.awakePassive.level;
            var attriCurrent = zj.PlayerHunterSystem.AttriAdd(this.generalId, level == 1 ? level : level - 1)[0];
            var _a = zj.PlayerHunterSystem.AttriAdd(this.generalId, level), attriNext = _a[0], desNext = _a[1];
            for (var i = 0; i < 3; i++) {
                var group = this["groupAttribute" + (i + 1)];
                var labelName = group.getChildByName("labelName" + (i + 1));
                var labelAttributeCurrent = group.getChildByName("labelAttributeCurrent" + (i + 1));
                var labelAttributeNext = group.getChildByName("labelAttributeNext" + (i + 1));
                var arrow = group.getChildByName("imgArrow" + (i + 1));
                if (i < attriNext.length) {
                    var name_1 = zj.TextsConfig.TextsConfig_Hunter.AttriName[desNext[i]];
                    var _b = ["", ""], current = _b[0], next = _b[1];
                    var v = attriNext[i];
                    if (hunterInfo.awakePassive.level == 1) {
                        if (desNext[i] == 24 || desNext[i] == 25) {
                            current = "+0";
                            next = "+" + v;
                        }
                        else {
                            current = "+0%";
                            next = "+" + v + "%";
                        }
                    }
                    else {
                        if (attriCurrent[i] == null) {
                            attriCurrent[i] = 0;
                        }
                        if (desNext[i] == 24 || desNext[i] == 25) {
                            current = "+" + attriCurrent[i];
                            next = "+" + v;
                        }
                        else {
                            current = "+" + attriCurrent[i] + "%";
                            next = "+" + v + "%";
                        }
                    }
                    labelName.text = name_1;
                    labelAttributeCurrent.text = current;
                    labelAttributeNext.text = next;
                    arrow.visible = true;
                }
                else {
                    labelName.visible = false;
                    labelAttributeCurrent.visible = false;
                    labelAttributeNext.visible = false;
                    arrow.visible = false;
                }
                this.attributes.push(group);
                this.groupAttributes.removeChild(group);
            }
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var framePath = zj.UIConfig.UIConfig_Role.skill_awaken_frame[6];
            var headPath = zj.TableGeneralTalent.Item(baseGeneralInfo.awake_passive).path;
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgIcon.source = zj.cachekey(headPath, this);
            this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Comment.des_level, hunterInfo.awakePassive.level);
            this.groupSkill.parent.removeChild(this.groupSkill);
            if (hunterInfo.awakePassive.level == 1) {
                this.labelInfo.text = zj.TextsConfig.TextsConfig_Hunter.awakenStart;
            }
            else {
                this.labelInfo.text = zj.TextsConfig.TextsConfig_Hunter.awakenUpLevel;
            }
            this.labelInfo.parent.removeChild(this.labelInfo);
            zj.Helper.setUpstarImage(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level + 1);
            this.groupStar.parent.removeChild(this.groupStar);
            var battleValue = zj.Set.NumberUnit3(hunterInfo.battleValue);
            this.labelPlayerPower.text = battleValue;
            this.groupPower.parent.removeChild(this.groupPower);
            var roleInfo = zj.TableMapRole.Item(baseGeneralInfo.general_roleId);
            var id = roleInfo.body_spx_id;
            var info = zj.TableClientFightAniSpineSource.Item(id);
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, info.json, null)
                .then(function (armatureDisplay) {
                armatureDisplay.animation.play(info.ani_name, 0);
                armatureDisplay.x = _this.groupHunter.width * 0.5;
                armatureDisplay.y = _this.groupHunter.height * 0.5;
                _this.groupHunter.parent.removeChild(_this.groupHunter);
                zj.setDragonBonesRemove(armatureDisplay);
                _this.groupHunter.addChild(armatureDisplay);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                if (cb)
                    cb();
            }).catch(function () {
                if (cb)
                    cb();
            });
        };
        HunterAwakenSuccess.prototype.playTipAnimation = function () {
            egret.Tween.get(this.labelTip, { loop: true }).
                to({ alpha: 0 }, 1500).
                wait(100);
        };
        HunterAwakenSuccess.prototype.playAnimation = function (cb) {
            var _this = this;
            var dbName = "ui_juexing_eff";
            var animationName = "001_juexing";
            var displays = [this.groupPower, this.groupStar, this.groupHunter, this.groupSkill, this.labelInfo];
            var solts = ["005_zhanli", "002_xingxing01", "002_juese", "005_tubiao", "005_wenzi"];
            for (var i = 0; i < this.attributes.length; i++) {
                var display = this.attributes[i];
                var name_2 = "004_shuxing0" + (4 - i);
                if (display) {
                    displays.push(display);
                    solts.push(name_2);
                }
            }
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, dbName, null, displays, solts).then(function (armatureDisplay) {
                armatureDisplay.armature.addEventListener(dragonBones.EventObject.COMPLETE, function (e) {
                    if (cb)
                        cb();
                }, _this);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.animation.play(animationName, 1);
                armatureDisplay.x = _this.width / 2;
                armatureDisplay.y = _this.height / 2;
                _this.mainGroup.addChild(armatureDisplay);
            }).catch(function (msg) {
                if (cb)
                    cb();
            });
        };
        return HunterAwakenSuccess;
    }(zj.Dialog));
    zj.HunterAwakenSuccess = HunterAwakenSuccess;
    __reflect(HunterAwakenSuccess.prototype, "zj.HunterAwakenSuccess");
})(zj || (zj = {}));
//# sourceMappingURL=HunterAwakenSuccess.js.map