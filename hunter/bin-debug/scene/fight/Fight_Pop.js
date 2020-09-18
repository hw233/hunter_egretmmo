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
    var Fight_Pop = (function (_super) {
        __extends(Fight_Pop, _super);
        function Fight_Pop() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fight/FightPopSkin.exml";
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            _this.init();
            return _this;
        }
        Fight_Pop.prototype.init = function () {
            this.ButtonReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonReturn_CallBack, this);
            this.ButtonQuit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonQuit_CallBack, this);
        };
        Fight_Pop.prototype.ButtonReturn_CallBack = function () {
            this.scene.resumeAll();
            this.scene = null;
            this.close();
        };
        Fight_Pop.prototype.ButtonQuit_CallBack = function () {
            this.close();
            zj.StageSceneManager.Instance.clearScene();
            zj.SceneManager.instance.checkFightOver();
        };
        return Fight_Pop;
    }(zj.Dialog));
    zj.Fight_Pop = Fight_Pop;
    __reflect(Fight_Pop.prototype, "zj.Fight_Pop");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Pop.js.map