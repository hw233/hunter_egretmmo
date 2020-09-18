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
    // 福利-天空竞技场
    // lizhengqiang
    // 20190323
    var ActivitySpecialSkyArena = (function (_super) {
        __extends(ActivitySpecialSkyArena, _super);
        function ActivitySpecialSkyArena() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivitySpecialSkyArenaSkin.exml";
            _this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGo, _this);
            _this.groupViewAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupViewAward, _this);
            return _this;
        }
        ActivitySpecialSkyArena.prototype.init = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_chakanjiangli", "armatureName", null, 0).then(function (display) {
                _this.groupViewAward.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
        };
        // 查看奖励
        ActivitySpecialSkyArena.prototype.onGroupViewAward = function () {
            zj.loadUI(zj.SkeArenaDropInfoDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ActivitySpecialSkyArena.prototype.onBtnGo = function () {
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_TOWER, true)) {
                zj.loadUI(zj.SkyAreanMainScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FROM_TOP);
                    scene.Init();
                });
            }
        };
        return ActivitySpecialSkyArena;
    }(zj.UI));
    zj.ActivitySpecialSkyArena = ActivitySpecialSkyArena;
    __reflect(ActivitySpecialSkyArena.prototype, "zj.ActivitySpecialSkyArena");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialSkyArena.js.map