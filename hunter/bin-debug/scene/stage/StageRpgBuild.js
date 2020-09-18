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
    var StageRpgBuild = (function (_super) {
        __extends(StageRpgBuild, _super);
        function StageRpgBuild(node, order) {
            var _this = _super.call(this, node, order) || this;
            _this.bloodBoard = null;
            _this.bloodBar = null;
            _this.bloodBarWidth = 0;
            _this.bloodBarHeight = 0;
            _this.lastHp = 0;
            _this.buildHp = 0;
            _this.uiHp = -1;
            return _this;
        }
        StageRpgBuild.prototype.release = function () {
            _super.prototype.release.call(this);
            this.nodeNormal.removeChild(this.bloodBoard);
            this.nodeNormal.removeChild(this.bloodBar);
        };
        StageRpgBuild.prototype.LoadData = function () {
            this.map_x = this.info.build_x;
            this.map_y = this.info.build_y;
            var screen_x = this.map_x - (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
            var screen_y = this.map_y - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
            this.x = screen_x;
            this.y = screen_y;
        };
        StageRpgBuild.prototype.LoadView = function () {
        };
        StageRpgBuild.prototype.InitFightBuild = function (info, scenePosInfo, eType) {
            this.info = info;
            this.scenePosInfo = scenePosInfo;
            this.setPositionType(eType);
            this.LoadData();
            this.LoadView();
            this.loadOther();
            this.setRoot(this.x, this.y);
        };
        StageRpgBuild.prototype.loadBloodBar = function () {
        };
        StageRpgBuild.prototype.loadOther = function () {
        };
        return StageRpgBuild;
    }(zj.StageRpgObject));
    zj.StageRpgBuild = StageRpgBuild;
    __reflect(StageRpgBuild.prototype, "zj.StageRpgBuild");
})(zj || (zj = {}));
//# sourceMappingURL=StageRpgBuild.js.map