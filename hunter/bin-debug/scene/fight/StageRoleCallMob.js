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
    //玩家召唤出来的怪
    var StageRoleCallMob = (function (_super) {
        __extends(StageRoleCallMob, _super);
        function StageRoleCallMob(node, aiTag, roleId) {
            var _this = _super.call(this, node, aiTag, roleId) || this;
            _this.setRoleType(zj.TableEnum.TableEnumRoleType.ROLE_TYPE_CALL);
            _this.father = null;
            _this.skill_level = null;
            _this.expandTime = 0;
            _this.leftTime = -1;
            _this.bCall = true;
            return _this;
        }
        return StageRoleCallMob;
    }(zj.StageRoleMob));
    zj.StageRoleCallMob = StageRoleCallMob;
    __reflect(StageRoleCallMob.prototype, "zj.StageRoleCallMob");
})(zj || (zj = {}));
//# sourceMappingURL=StageRoleCallMob.js.map