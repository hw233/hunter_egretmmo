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
    var Dialog_Simple = (function (_super) {
        __extends(Dialog_Simple, _super);
        function Dialog_Simple() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/teach/Dialog_SimpleSkin.exml";
            _this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOk, _this);
            return _this;
        }
        Dialog_Simple.prototype.RunAction = function () {
            this.NodeBG.visible = true;
            var x0 = this.NodeBG.x;
            var y0 = this.NodeBG.y;
            var time = 150;
            egret.Tween.get(this.NodeBG).
                to({ alpha: 0 }, 0).
                to({ x: x0, y: y0 }).
                to({ alpha: 1 }, time * 3);
        };
        Dialog_Simple.prototype.onBtnOk = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            if (scene != null && scene.pauseAll != null) {
                scene.resumeAll();
            }
            zj.Teach.bAsyncContinue = true;
        };
        return Dialog_Simple;
    }(zj.UI));
    zj.Dialog_Simple = Dialog_Simple;
    __reflect(Dialog_Simple.prototype, "zj.Dialog_Simple");
})(zj || (zj = {}));
//# sourceMappingURL=Dialog_Simple.js.map