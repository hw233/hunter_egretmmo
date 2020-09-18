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
     * tiledMap 移动角色类（副本地图移动小人，无寻路，移动中只对TileObjBase做碰撞）
     * zhaiweili
     * 2019.10.24
     */
    var AdventureMapPlayer = (function (_super) {
        __extends(AdventureMapPlayer, _super);
        function AdventureMapPlayer(owner) {
            return _super.call(this, owner) || this;
        }
        return AdventureMapPlayer;
    }(zj.SceneMapPlayer));
    zj.AdventureMapPlayer = AdventureMapPlayer;
    __reflect(AdventureMapPlayer.prototype, "zj.AdventureMapPlayer");
})(zj || (zj = {}));
//# sourceMappingURL=AdventureMapPlayer.js.map