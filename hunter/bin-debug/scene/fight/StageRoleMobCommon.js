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
    //普通怪物类，继承怪物类
    var StageRoleMobCommon = (function (_super) {
        __extends(StageRoleMobCommon, _super);
        function StageRoleMobCommon(node, aiTag, roleId) {
            var _this = _super.call(this, node, aiTag, roleId) || this;
            _this.setRoleType(zj.TableEnum.TableEnumRoleType.ROLE_TYPE_MOB);
            return _this;
        }
        StageRoleMobCommon.prototype.loadStorageSpx = function () {
        };
        return StageRoleMobCommon;
    }(zj.StageRoleMob));
    zj.StageRoleMobCommon = StageRoleMobCommon;
    __reflect(StageRoleMobCommon.prototype, "zj.StageRoleMobCommon");
})(zj || (zj = {}));
//# sourceMappingURL=StageRoleMobCommon.js.map