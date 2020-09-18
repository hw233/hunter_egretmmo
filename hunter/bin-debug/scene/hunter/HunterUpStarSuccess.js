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
     * @date 2018-12-14
     *
     * @class 猎人升星成功界面
     */
    var HunterUpStarSuccess = (function (_super) {
        __extends(HunterUpStarSuccess, _super);
        function HunterUpStarSuccess() {
            var _this = _super.call(this) || this;
            _this.attributes = [];
            _this.generalId = null;
            _this.callback = null;
            _this.thisObj = null;
            _this.animationEnd = false;
            _this.skinName = "resource/skins/hunter/HunterUpStarSuccessSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchClose, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelTip); // 因为是循环播放，需要特别处理
            }, null);
            return _this;
        }
        HunterUpStarSuccess.prototype.isFullScreen = function () {
            return true;
        };
        HunterUpStarSuccess.prototype.setInfo = function (id, cb, thisObj) {
            var _this = this;
            this.generalId = id;
            this.callback = cb;
            this.thisObj = thisObj;
            this.animationEnd = false;
            this.setHeroInfo(function () {
                _this.playAnimation(function () {
                    _this.animationEnd = true;
                    zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                    _this.mainGroup.setChildIndex(_this.labelTip, _this.mainGroup.numChildren - 1);
                    _this.playTipAnimation();
                });
            });
        };
        HunterUpStarSuccess.prototype.setHeroInfo = function (cb) {
            var _this = this;
            var hunterInfoNext = zj.Table.DeepCopy(zj.Game.PlayerHunterSystem.queryHunter(this.generalId));
            var hunterInfoCurrent = zj.Table.DeepCopy(hunterInfoNext);
            hunterInfoCurrent.star -= 1;
            zj.Helper.setUpstarImage(this.groupStar, hunterInfoCurrent.star + 1, hunterInfoCurrent.awakePassive.level + 1);
            var upLevel = zj.Game.PlayerHunterSystem.Table(this.generalId).up_star_add_skillLevel[hunterInfoCurrent.star - 1];
            if (upLevel != 0) {
                var _a = ["", "", ""], str1 = _a[0], str2 = _a[1], str3 = _a[2];
                str1 = zj.TextsConfig.TextsConfig_Hunter.level_max;
                str2 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.skill_level, zj.PlayerHunterSystem.GetMaxLevel(this.generalId) - upLevel);
                str3 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.skill_level, zj.PlayerHunterSystem.GetMaxLevel(this.generalId));
                var group = this["groupAttribute5"];
                var labelName = group.getChildByName("labelName5");
                labelName.text = str1 + "" + str2;
                var labelAttributeCurrent = group.getChildByName("labelAttributeCurrent5");
                labelAttributeCurrent.text = "";
                var labelAttributeNext = group.getChildByName("labelAttributeNext5");
                labelAttributeNext.text = str3;
            }
            else {
                var group = this["groupAttribute5"];
                group.visible = false;
            }
            this.attributes.push(this["groupAttribute5"]);
            var attrCurrent = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfoCurrent)[0];
            var attrNext = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfoNext)[0];
            var attriShow = zj.TableEnum.EnumHunterAttriShow2.slice();
            for (var i = 0; i < attriShow.length; i++) {
                var v = attriShow[i];
                var name_1 = zj.Helper.StringFormat("%s", zj.TextsConfig.TextsConfig_HeroMain.attr[v]);
                var current = zj.Helper.StringFormat("+%d", Math.ceil(attrCurrent[v - 1]));
                var next = zj.Helper.StringFormat("+%d", Math.ceil(attrNext[v - 1]));
                if (v == zj.TableEnum.EnumGelAttrib.ATTR_PHY_CRIT ||
                    v == zj.TableEnum.EnumGelAttrib.ATTR_CRIT_EXTRA) {
                    current += "%";
                    next += "%";
                }
                var group = this["groupAttribute" + (i + 1)];
                var labelName = group.getChildByName("labelName" + (i + 1));
                labelName.text = name_1;
                var labelAttributeCurrent = group.getChildByName("labelAttributeCurrent" + (i + 1));
                labelAttributeCurrent.text = current;
                var labelAttributeNext = group.getChildByName("labelAttributeNext" + (i + 1));
                labelAttributeNext.text = next;
                this.attributes.push(group);
                this.groupAttributes.removeChild(group);
            }
            // let uplevel = TableBaseGeneral.Item(this.generalId % CommonConfig.general_id_to_index_multiple).up_star_add_skillLevel[hunterInfoNext.star - 1];
            // if (uplevel != 0) {
            //     let item = new HunterUpStarAttributeItem();
            //     let name: string, value: string, nextValue: string;
            //     name = TextsConfig.TextsConfig_Hunter.level_max
            //     value = Helper.StringFormat("          " + TextsConfig.TextsConfig_Hunter.skill_level, PlayerHunterSystem.GetMaxLevel(this.generalId))
            //     nextValue = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.skill_level, PlayerHunterSystem.GetMaxLevel(this.generalId) + uplevel)
            //     this["labelName5"].text = name
            //     this["labelAttributeCurrent5"].text = value
            //     this["labelAttributeNext5"].text = nextValue;
            //     let group = this[`groupAttribute${5}`] as eui.Group;
            //     this.attributes.push(group);
            // }
            var battleValue = zj.Set.NumberUnit3(hunterInfoNext.battleValue);
            this.labelPlayerPower.text = battleValue;
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var roleInfo = zj.TableMapRole.Item(baseGeneralInfo.general_roleId);
            var id = roleInfo.body_spx_id;
            // let scale = roleInfo.body_scale ? roleInfo.body_scale : 1.0;
            var info = zj.TableClientFightAniSpineSource.Item(id);
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(this, info.json, null)
                .then(function (armatureDisplay) {
                armatureDisplay.animation.play(info.ani_name, 0);
                armatureDisplay.x = _this.groupHunter.width * 0.5;
                armatureDisplay.y = _this.groupHunter.height * 0.5;
                _this.groupHunter.parent.removeChild(_this.groupHunter);
                zj.setDragonBonesRemove(armatureDisplay);
                _this.groupHunter.addChild(armatureDisplay);
                // 
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
        HunterUpStarSuccess.prototype.playAnimation = function (cb) {
            var _this = this;
            var dbName = "ui_juexing_eff";
            var animationName = "000_shengxing";
            var displays = this.attributes.concat([this.groupPower, this.groupStar, this.groupHunter]);
            var solts = ["004_shuxing00", "004_shuxing04", "004_shuxing03", "004_shuxing02", "004_shuxing01", "005_zhanli", "002_xingxing01", "002_juese"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, dbName, null, displays, solts).then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.armature.addEventListener(dragonBones.EventObject.COMPLETE, function (e) {
                    if (cb)
                        cb();
                }, _this);
                armatureDisplay.animation.play(animationName, 1);
                armatureDisplay.x = _this.width / 2;
                armatureDisplay.y = _this.height / 2;
                _this.mainGroup.addChild(armatureDisplay);
            }).catch(function (msg) {
                if (cb)
                    cb();
            });
        };
        HunterUpStarSuccess.prototype.playTipAnimation = function () {
            egret.Tween.get(this.labelTip, { loop: true }).
                to({ alpha: 0 }, 1500).
                wait(100);
        };
        HunterUpStarSuccess.prototype.touchClose = function () {
            if (this.animationEnd == false)
                return;
            this.close();
            this.callback.call(this.thisObj);
        };
        return HunterUpStarSuccess;
    }(zj.Dialog));
    zj.HunterUpStarSuccess = HunterUpStarSuccess;
    __reflect(HunterUpStarSuccess.prototype, "zj.HunterUpStarSuccess");
})(zj || (zj = {}));
//# sourceMappingURL=HunterUpStarSuccess.js.map