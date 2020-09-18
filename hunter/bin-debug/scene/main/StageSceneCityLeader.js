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
    // 改版主城角色
    // 翟伟利
    // 2019.11.7
    var StageSceneCityLeader = (function (_super) {
        __extends(StageSceneCityLeader, _super);
        function StageSceneCityLeader(node, order) {
            var _this = _super.call(this, node, order) || this;
            _this.currArc = 0;
            return _this;
        }
        StageSceneCityLeader.prototype.loadSpeed = function () {
            _super.prototype.loadSpeed.call(this);
            this.speedCity = this.moveSpeedX * 1000 * 0.03;
        };
        StageSceneCityLeader.prototype.onWalkStart = function () {
        };
        StageSceneCityLeader.prototype.onWalkEnd = function () {
            this.isControlWalk = false;
            this.changeState(zj.TableEnum.TableEnumBaseState.State_None);
            this.curScene.reqLeaderPos(this.moveDistance, this.verDistance, null);
        };
        StageSceneCityLeader.prototype.moveMapWalk = function (arc) {
            if (!this.isControlWalk) {
                _super.prototype.endPath.call(this);
                this.changeState(zj.TableEnum.TableEnumBaseState.State_Walk);
                this.isControlWalk = true;
            }
            this.onMoveLogic(arc);
            return this.speedCity;
        };
        StageSceneCityLeader.prototype.onMoveLogic = function (arc) {
            this.currArc = arc;
            var offx = Math.floor(zj.Util.getArcX(this.speedCity, arc));
            var offy = Math.floor(zj.Util.getArcY(this.speedCity, arc));
            if (offx > 0) {
                this.changeDir(zj.TableEnum.TableEnumDir.Dir_Right);
            }
            else if (offx < 0) {
                this.changeDir(zj.TableEnum.TableEnumDir.Dir_Left);
            }
            this.onLeaderMoveOff(offx, offy);
        };
        StageSceneCityLeader.prototype.onLeaderMoveOff = function (offx, offy) {
            // 无碰撞，则直接移动
            if (this.isCanTouchGround(this.x + offx, this.y + offy)) {
                this.moveMap(offx, offy);
                this.setPos(this.x, this.y);
                return;
            }
            if (Math.abs(offx) > Math.abs(offy)) {
                if (this.isCanTouchGround(this.x + offx, this.y)) {
                    this.moveMap(offx, 0);
                    this.setPos(this.x, this.y);
                    return;
                }
                if (offy != 0) {
                    if (this.isCanTouchGround(this.x, this.y + offy)) {
                        this.moveMap(0, offy);
                        this.setPos(this.x, this.y);
                        return;
                    }
                }
            }
            else {
                if (this.isCanTouchGround(this.x, this.y + offy)) {
                    this.moveMap(0, offy);
                    this.setPos(this.x, this.y);
                    return;
                }
                if (offx != 0) {
                    if (this.isCanTouchGround(this.x + offx, this.y)) {
                        this.moveMap(offx, 0);
                        this.setPos(this.x, this.y);
                        return;
                    }
                }
            }
        };
        return StageSceneCityLeader;
    }(zj.StageSceneFightLeader));
    zj.StageSceneCityLeader = StageSceneCityLeader;
    __reflect(StageSceneCityLeader.prototype, "zj.StageSceneCityLeader");
})(zj || (zj = {}));
//# sourceMappingURL=StageSceneCityLeader.js.map