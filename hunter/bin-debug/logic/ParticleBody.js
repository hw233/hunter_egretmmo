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
    // 粒子对象类
    // zhaiweili
    // 2019.12.12
    var ParticleBody = (function (_super) {
        __extends(ParticleBody, _super);
        function ParticleBody() {
            var _this = _super.call(this) || this;
            _this.width = 1;
            _this.height = 1;
            return _this;
        }
        ParticleBody.prototype.init = function (res, xMin, xMax, yMin, yMax, moveSp, rotaSp, faceMin, faceMax, callFinish) {
            this.visible = false;
            this.res = res;
            this.x = zj.Util.randomValue(xMin, xMax);
            this.y = zj.Util.randomValue(yMin, yMax);
            this.moveSp = moveSp;
            this.rotaSp = rotaSp;
            this.faceMin = faceMin;
            this.faceMax = faceMax;
            this.callFinish = callFinish;
            this.isFinish = false;
            RES.getResAsync(res, this.onLoadComplete, this);
        };
        ParticleBody.prototype.onLoadComplete = function () {
            var texture = RES.getRes(this.res);
            if (texture) {
                if (!this.img) {
                    this.img = new egret.Bitmap(texture);
                    this.img.scaleX = this.img.scaleY = 0.7;
                }
                this.img.anchorOffsetX = this.img.width / 2;
                this.img.anchorOffsetY = this.img.height / 2;
                this.addChild(this.img);
                this.setRun();
            }
            else {
                this.isFinish = true;
                this.visible = false;
                console.error("ParticleBody - load - error: " + this.res);
            }
        };
        ParticleBody.prototype.setRun = function () {
            this.faceCurr = zj.Util.randomValue(this.faceMin, this.faceMax);
            this.visible = true;
        };
        ParticleBody.prototype.update = function (dt) {
            if (!this.isFinish && this.visible) {
                var disp = dt * this.moveSp;
                var offx = zj.Util.getArcX(disp, this.faceCurr);
                var offy = zj.Util.getArcY(disp, this.faceCurr);
                this.x += offx;
                this.y += offy;
                this.rotation += this.rotaSp;
                if (this.callFinish(this.x, this.y)) {
                    this.isFinish = true;
                    this.visible = false;
                }
            }
        };
        ParticleBody.prototype.onRelease = function () {
            this.isFinish = true;
            this.visible = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            zj.Game.ParticleManager.pool.push(this);
        };
        return ParticleBody;
    }(zj.UI));
    zj.ParticleBody = ParticleBody;
    __reflect(ParticleBody.prototype, "zj.ParticleBody");
})(zj || (zj = {}));
//# sourceMappingURL=ParticleBody.js.map