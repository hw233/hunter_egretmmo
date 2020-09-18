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
    //  wangshenzhuo
    //  2019-7-16
    //  HXH_HunterTransformMain
    var HunterTransformMainSence = (function (_super) {
        __extends(HunterTransformMainSence, _super);
        function HunterTransformMainSence() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/HunterTransformMainSenceSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonTransForm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonTransForm, _this);
            _this.buttonStory.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonStory, _this);
            _this.setTipsShow();
            return _this;
        }
        HunterTransformMainSence.prototype.setTipsShow = function () {
            if (zj.Tips.GetTipsOfId(zj.Tips.TAG.ActivityBattle, zj.Tips.TAG.ActivityBattle_ACTIVITY)) {
                this.imageTipStory.visible = true;
            }
            else {
                this.imageTipStory.visible = false;
            }
            if (zj.Tips.GetTipsOfId(zj.Tips.TAG.ActivityBattle, zj.Tips.TAG.ActivityBattle_TRANSFORM)) {
                this.imageTipTransform.visible = true;
            }
            else {
                this.imageTipTransform.visible = false;
            }
        };
        HunterTransformMainSence.prototype.onButtonClose = function () {
            this.close();
            // Game.UIManager.popAllScenesAndDialogs();
        };
        HunterTransformMainSence.prototype.onButtonTransForm = function () {
            zj.loadUI(zj.HunterTransformChoose)
                .then(function (scene) {
                scene.setInfo();
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterTransformMainSence.prototype.onButtonStory = function () {
            if (zj.otherdb.getActivityBattle().length > 0) {
                zj.loadUI(zj.StoryInstanceMainScene)
                    .then(function (scene) {
                    scene.Init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_Trans.transformNoCopy);
            }
        };
        return HunterTransformMainSence;
    }(zj.Scene));
    zj.HunterTransformMainSence = HunterTransformMainSence;
    __reflect(HunterTransformMainSence.prototype, "zj.HunterTransformMainSence");
})(zj || (zj = {}));
//# sourceMappingURL=HunterTransformMainSence.js.map