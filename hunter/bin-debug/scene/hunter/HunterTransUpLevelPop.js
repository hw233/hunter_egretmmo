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
     * @author xingliwei
     *
     * @date 2019-7-29
     *
     * @class 猎人技能
     */
    var HunterTransUpLevelPop = (function (_super) {
        __extends(HunterTransUpLevelPop, _super);
        function HunterTransUpLevelPop() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterTransUpLevelPopSkin.exml";
            return _this;
        }
        HunterTransUpLevelPop.prototype.SetInfo = function (skillId, level, father, cb) {
            var _this = this;
            this.imgIcon1.source = zj.TableGeneralTalent.Item(skillId).path;
            this.imgIcon2.source = zj.TableGeneralTalent.Item(skillId).path;
            this.imgTransformLvNum1.source = zj.UIConfig.UIConfig_Activity_Battle.skill_level[level - 1];
            this.imgTransformLvNum2.source = zj.UIConfig.UIConfig_Activity_Battle.skill_level[level];
            var paths = [
                this.groupHunter1,
                this.groupHunter2,
            ];
            var bones = [
                "001_daoju",
                "001_daoju_gaoguang",
            ];
            var thisOne = this;
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "bianshen_eff", null, paths, bones)
                .then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    if (armatureDisplay.parent)
                        armatureDisplay.parent.removeChild(armatureDisplay);
                }, thisOne);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, thisOne);
                armatureDisplay.animation.play("000_qianghua", 1);
                thisOne.groupAni.addChild(armatureDisplay);
            });
            egret.Tween.get(this).wait(1500).call(function () {
                _this.close(zj.UI.HIDE_TO_TOP);
                egret.Tween.get(_this).wait(300).call(function () {
                    cb();
                    father.FreshGeneral();
                });
            });
        };
        return HunterTransUpLevelPop;
    }(zj.Dialog));
    zj.HunterTransUpLevelPop = HunterTransUpLevelPop;
    __reflect(HunterTransUpLevelPop.prototype, "zj.HunterTransUpLevelPop");
})(zj || (zj = {}));
//# sourceMappingURL=HunterTransUpLevelPop.js.map