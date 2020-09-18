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
    var Dialog_InstanceArea = (function (_super) {
        __extends(Dialog_InstanceArea, _super);
        function Dialog_InstanceArea() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/teach/Dialog_InstanceAreaSkin.exml";
            _this.groupCloud.visible = true;
            return _this;
        }
        Dialog_InstanceArea.prototype.cloudAni = function (cb) {
            var _this = this;
            this.callBack = cb;
            egret.Tween.get(this.groupCloud).to({ x: 100, alpha: 1 }, 0).wait(200).to({ x: 650, alpha: 0 }, 3000).call(function () {
                egret.Tween.removeTweens(_this.groupCloud);
                if (_this.callBack)
                    _this.callBack();
            });
        };
        return Dialog_InstanceArea;
    }(zj.Dialog));
    zj.Dialog_InstanceArea = Dialog_InstanceArea;
    __reflect(Dialog_InstanceArea.prototype, "zj.Dialog_InstanceArea");
})(zj || (zj = {}));
//# sourceMappingURL=Dialog_InstanceArea.js.map