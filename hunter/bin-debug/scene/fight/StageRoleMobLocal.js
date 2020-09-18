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
    var StageRoleMobLocal = (function (_super) {
        __extends(StageRoleMobLocal, _super);
        function StageRoleMobLocal(node, aiTag, roleId) {
            return _super.call(this, node, aiTag, roleId) || this;
        }
        StageRoleMobLocal.prototype.getDbInstance = function () {
            return zj.TableClientMonsterLocal.Item(this.roleId);
        };
        return StageRoleMobLocal;
    }(zj.StageRoleMobCommon));
    zj.StageRoleMobLocal = StageRoleMobLocal;
    __reflect(StageRoleMobLocal.prototype, "zj.StageRoleMobLocal");
})(zj || (zj = {}));
//# sourceMappingURL=StageRoleMobLocal.js.map