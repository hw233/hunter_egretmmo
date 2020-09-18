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
     * MovieClip 时间类
     * 翟伟利
     * 2019.12.10
     */
    var AnimationTime = (function (_super) {
        __extends(AnimationTime, _super);
        function AnimationTime() {
            return _super.call(this) || this;
        }
        AnimationTime.prototype.setTime = function (timeMin, timeMax) {
            this.timeMin = timeMin;
            this.timeMax = timeMax;
        };
        AnimationTime.prototype.onPlay = function (num) {
            var _this = this;
            if (num === void 0) { num = 1; }
            this._movieClip.visible = false;
            egret.setTimeout(function () {
                _super.prototype.onPlay.call(_this, num);
            }, this, zj.Util.randomValue(this.timeMin, this.timeMax));
        };
        AnimationTime.prototype.onMovieFinish = function () {
            this._movieClip.visible = false;
            egret.setTimeout(this.checkPlay, this, zj.Util.randomValue(this.timeMin, this.timeMax));
        };
        return AnimationTime;
    }(zj.AnimationBody));
    zj.AnimationTime = AnimationTime;
    __reflect(AnimationTime.prototype, "zj.AnimationTime");
})(zj || (zj = {}));
//# sourceMappingURL=AnimationTime.js.map