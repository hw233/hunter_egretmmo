var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 粒子管理类
    // zhaiweili
    // 2019.12.12
    var ParticleManager = (function () {
        function ParticleManager() {
            this.pool = [];
        }
        ParticleManager.prototype.create = function (res, xMin, xMax, yMin, yMax, moveSp, rotaSp, faceMin, faceMax, callFinish) {
            var item;
            if (this.pool.length > 0) {
                item = this.pool.shift();
            }
            else {
                item = new zj.ParticleBody();
            }
            item.init(res, xMin, xMax, yMin, yMax, moveSp, rotaSp, faceMin, faceMax, callFinish);
            return item;
        };
        return ParticleManager;
    }());
    zj.ParticleManager = ParticleManager;
    __reflect(ParticleManager.prototype, "zj.ParticleManager");
})(zj || (zj = {}));
//# sourceMappingURL=ParticleManager.js.map