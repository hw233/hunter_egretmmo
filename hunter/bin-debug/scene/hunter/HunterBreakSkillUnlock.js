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
     * @date 2019-1-23
     *
     * @class 猎人突破解锁动画
     */
    var HunterBreakSkillUnlock = (function (_super) {
        __extends(HunterBreakSkillUnlock, _super);
        function HunterBreakSkillUnlock() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterBreakSkillUnlockSkin.exml";
            _this.labelClose.visible = false;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelClose); // 因为是循环播放，需要特别处理
            }, null);
            return _this;
        }
        HunterBreakSkillUnlock.prototype.setInfo = function (generalId, cb) {
            var _this = this;
            this.callback = cb;
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var breakLevel = hunterInfo.break_level;
            this.labelSucceed.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.breakSuccess, breakLevel);
            if (breakLevel == 1) {
                this.imgSkill.source = zj.cachekey("ui_hunter_break_ButtonSkill1Nor_png", this);
            }
            else if (breakLevel == 2) {
                this.imgSkill.source = zj.cachekey("ui_hunter_break_ButtonSkill2Nor_png", this);
            }
            else if (breakLevel == 3) {
                this.imgSkill.source = zj.cachekey("ui_hunter_break_ButtonSkill3Nor_png", this);
            }
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(generalId);
            var hunterSkill = baseGeneralInfo.break_skill[breakLevel - 1];
            for (var i = 0; i < hunterSkill.length; i++) {
                var v = hunterSkill[i];
                var talentInfo = zj.TableGeneralTalent.Item(v);
                var framePath = zj.UIConfig.UIConfig_Role.itemFrame[talentInfo.talent_quality];
                var iconPath = talentInfo.path;
                this["imgFrame" + (i + 1)].source = zj.cachekey(framePath, this);
                this["imgIcon" + (i + 1)].source = zj.cachekey(iconPath, this);
                this["labelLevel" + (i + 1)].text = 1;
            }
            var path = [this.groupSkill, this.groupSkill1, this.groupSkill2, this.groupSkill3, this.labelInclude];
            var bones = ["001_jiesuo_tubiao2", "001_jiesuo_jineng1", "001_jiesuo_jineng2", "001_jiesuo_jineng3", "001_jiesuo_wenzi"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "tupo_eff", null, path, bones).then(function (display) {
                display.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    _this.playTipsAnimation();
                }, _this);
                // display.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                //     display.animation.stop();
                //     display.animation.reset();
                //     display.armature.dispose();
                //     display.dbClear();
                //     display.dispose(true);
                //     if (display.parent) display.parent.removeChild(display);
                // }, null);
                display.x = _this.groupAnimation.width * 0.5;
                display.y = _this.groupAnimation.height * 0.5;
                _this.groupAnimation.addChild(display);
                display.animation.play("004_jineng_jiesuo", 1);
            });
        };
        HunterBreakSkillUnlock.prototype.playTipsAnimation = function () {
            this.labelClose.visible = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEnd, this);
            egret.Tween.get(this.labelClose, { loop: true }).to({ alpha: 1 }, 1000).to({ alpha: 0 }, 1000);
        };
        HunterBreakSkillUnlock.prototype.onTouchEnd = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            if (this.callback)
                this.callback();
        };
        return HunterBreakSkillUnlock;
    }(zj.Dialog));
    zj.HunterBreakSkillUnlock = HunterBreakSkillUnlock;
    __reflect(HunterBreakSkillUnlock.prototype, "zj.HunterBreakSkillUnlock");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBreakSkillUnlock.js.map