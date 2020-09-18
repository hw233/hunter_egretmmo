var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    /**
     * MovieClip 管理类
     * 翟伟利
     * 2019.12.10
     */
    var AnimationManager = (function () {
        function AnimationManager() {
            this.pool = [];
            this.poolTime = [];
        }
        AnimationManager.prototype.checkRes = function (res) {
            if (res && RES.hasRes(res + "_png") && RES.hasRes(res + "_json")) {
                return true;
            }
            console.error("AnimationBody - create - res - not found: " + res);
            return false;
        };
        AnimationManager.prototype.create = function (res, actionName, isAutoRemove) {
            if (actionName === void 0) { actionName = null; }
            if (isAutoRemove === void 0) { isAutoRemove = false; }
            if (!this.checkRes(res)) {
                return null;
            }
            var ani = null;
            if (this.pool.length > 0) {
                ani = this.pool.shift();
            }
            else {
                ani = new zj.AnimationBody();
            }
            ani.setRes(res, actionName, isAutoRemove);
            return ani;
        };
        AnimationManager.prototype.createTime = function (res, timeMin, timeMax) {
            if (!this.checkRes(res)) {
                return null;
            }
            var ani = null;
            if (this.poolTime.length > 0) {
                ani = this.poolTime.shift();
            }
            else {
                ani = new zj.AnimationTime();
            }
            ani.setRes(res);
            ani.setTime(timeMin, timeMax);
            return ani;
        };
        AnimationManager.prototype.return = function (body) {
            // let className = egret.getQualifiedClassName(body);
            // if("zj.AnimationTime" == className){
            // 	this.poolTime.push(body as AnimationTime);
            // } else if("zj.AnimationBody" == className){
            // 	this.pool.push(body);
            // }
        };
        return AnimationManager;
    }());
    zj.AnimationManager = AnimationManager;
    __reflect(AnimationManager.prototype, "zj.AnimationManager");
})(zj || (zj = {}));
//# sourceMappingURL=AnimationManager.js.map