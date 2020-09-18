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
     * @date 2019-4-30
     *
     * @class 遗迹探索胜利中场界面
     */
    var Relic_SmallEnd = (function (_super) {
        __extends(Relic_SmallEnd, _super);
        function Relic_SmallEnd() {
            var _this = _super.call(this) || this;
            _this.hurtPer = 0;
            _this.curLevelPic = new eui.Image();
            _this.boxPath = new eui.Image();
            _this.ui_name = "Relic_SmallEnd";
            _this.skinName = "resource/skins/battleEnd/Relic_SmallEndSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            return _this;
        }
        Relic_SmallEnd.prototype.Init = function () {
        };
        Relic_SmallEnd.prototype.SetInfo = function (star) {
            this.star = star;
            var instanceInfo = zj.PlayerDarkSystem.RelicInstance(zj.Game.PlayerMissionSystem.fightExt + 1);
            this.boxPath.source = zj.cachekey(zj.PlayerDarkSystem.RelicInstanceChest(instanceInfo.open_chest[this.star - 1]).path[0], this);
            this.boxPath.anchorOffsetX = 134;
            this.boxPath.anchorOffsetY = 134;
            // let 
        };
        Relic_SmallEnd.prototype.SetCB = function (cb1, cb2, father) {
            var _this = this;
            this.cb1 = cb1;
            this.cb2 = cb2;
            this.father = father;
            egret.Tween.get(this).wait(400).call(function () {
                _this.SetInfoAni();
            });
            egret.Tween.get(this).wait(3000).call(function () {
                //this.Exit();
            });
        };
        Relic_SmallEnd.prototype.SetInfoAni = function () {
            var _this = this;
            var bones = ["000_baoxiang", "000_wenzi"];
            zj.cachekey(zj.UIConfig.UIConfig_DarkLand.relicLevelEnd[this.star - 1], this);
            var img = new eui.Image(zj.UIConfig.UIConfig_DarkLand.relicLevelEnd[this.star - 1]);
            var paths = [this.boxPath, img];
            var star = [];
            var thisOne = this;
            var _loop_1 = function (i) {
                if (i <= this_1.star - 1) {
                    bones.push("000_huixingxing" + i);
                    zj.cachekey(zj.UIConfig.UIConfig_DarkLand.relicBigStar[0], this_1);
                    var image = new eui.Image(zj.UIConfig.UIConfig_DarkLand.relicBigStar[0]);
                    image.anchorOffsetX = 47;
                    image.anchorOffsetY = 45;
                    paths.push(image);
                }
                var a;
                if (i == this_1.star) {
                    zj.Game.DragonBonesManager.getAnimationWithBindImages(this_1, "xiaojiesuan_heiandalu", null, [], [])
                        .then(function (armatureDisplay) {
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        // 	armatureDisplay.animation.stop();
                        // 	armatureDisplay.animation.reset();
                        // 	armatureDisplay.armature.dispose();
                        // 	armatureDisplay.dbClear();
                        // 	armatureDisplay.dispose(true);
                        // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            armatureDisplay.animation.stop();
                        }, thisOne);
                        a = armatureDisplay;
                        star.push(a);
                        armatureDisplay.x = (i - 1) * 100;
                        cb();
                    });
                }
            };
            var this_1 = this;
            for (var i = 1; i <= this.star; i++) {
                _loop_1(i);
            }
            var cb = function () {
                egret.Tween.get(_this).wait(100).call(function () {
                    zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "xiaojiesuan_heiandalu", null, paths, bones)
                        .then(function (armatureDisplay) {
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        // 	armatureDisplay.animation.stop();
                        // 	armatureDisplay.animation.reset();
                        // 	armatureDisplay.armature.dispose();
                        // 	armatureDisplay.dbClear();
                        // 	armatureDisplay.dispose(true);
                        // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                            _this.Exit();
                        }, thisOne);
                        for (var i = 0; i < star.length; i++) {
                            _this.NodeStar.addChild(star[i]);
                            star[i].animation.play("002_zaxingxing", 1);
                        }
                        armatureDisplay.animation.play("001_diban", 1);
                        thisOne.NodeAni.addChild(armatureDisplay);
                    });
                });
            };
        };
        Relic_SmallEnd.prototype.Exit = function () {
            this.close();
            if (this.cb1 != null) {
                this.cb1();
            }
            this.cb2(this.father);
        };
        return Relic_SmallEnd;
    }(zj.Dialog));
    zj.Relic_SmallEnd = Relic_SmallEnd;
    __reflect(Relic_SmallEnd.prototype, "zj.Relic_SmallEnd");
})(zj || (zj = {}));
//# sourceMappingURL=Relic_SmallEnd.js.map