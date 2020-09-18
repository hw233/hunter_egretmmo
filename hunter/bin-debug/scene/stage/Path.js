var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var Path = (function () {
        function Path() {
            this.wayPoints_ = [];
            this.curWayPointIndex_ = 0;
            this.isLoop_ = false;
            this.isFinished_ = false;
        }
        Path.prototype.currentWayPoint = function () {
            return this.wayPoints_[this.curWayPointIndex_];
        };
        //当前目标点是否是组后一个路径点
        Path.prototype.isLastPoint = function () {
            return (this.curWayPointIndex_ == this.wayPoints_.length - 1) && (!this.isLoop_);
        };
        //是否完成所有路径
        Path.prototype.finished = function () {
            return this.isFinished_;
        };
        Path.prototype.addWayPoint = function (newPoint) {
            this.wayPoints_[this.wayPoints_.length] = newPoint;
        };
        Path.prototype.setWayPoints = function (points) {
            this.wayPoints_ = points;
        };
        Path.prototype.setIsLoop = function (b) {
            this.isLoop_ = b;
        };
        Path.prototype.clear = function () {
            this.wayPoints_ = [];
        };
        Path.prototype.getWayPoints = function () {
            return this.wayPoints_;
        };
        Path.prototype.getLastPoint = function () {
            return this.wayPoints_[this.wayPoints_.length - 1];
        };
        Path.prototype.goToNextWayPoint = function () {
            var num = this.wayPoints_.length - 1;
            this.curWayPointIndex_ = this.curWayPointIndex_ + 1;
            if (this.curWayPointIndex_ > num) {
                if (this.isLoop_) {
                    this.curWayPointIndex_ = 0;
                }
                else {
                    this.isFinished_ = true;
                }
            }
            else {
                this.isFinished_ = false;
            }
        };
        Path.prototype.isArrivedCurrentPoint = function (pos) {
            var distanceSqrt = Math.pow(egret.Point.distance(this.currentWayPoint(), pos), 2);
            return distanceSqrt < Path.WayPointSeekDistSq;
        };
        Path.WayPointSeekDistSq = Math.pow(30, 2);
        return Path;
    }());
    zj.Path = Path;
    __reflect(Path.prototype, "zj.Path");
})(zj || (zj = {}));
//# sourceMappingURL=Path.js.map