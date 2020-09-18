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
    var TemporaryScene = (function (_super) {
        __extends(TemporaryScene, _super);
        function TemporaryScene() {
            return _super.call(this) || this;
            // this.skinName = "resource/skins/fight/Fight_Instance.exml";
        }
        TemporaryScene.prototype.close = function (animation) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.close, this);
            zj.Game.UIManager.removeScene(this);
        };
        return TemporaryScene;
    }(zj.Scene));
    zj.TemporaryScene = TemporaryScene;
    __reflect(TemporaryScene.prototype, "zj.TemporaryScene");
})(zj || (zj = {}));
//# sourceMappingURL=TemporaryScene.js.map