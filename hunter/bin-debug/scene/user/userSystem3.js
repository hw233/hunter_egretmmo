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
     * @author xingliwei
     *
     * @date 2019-5-16
     *
     * @class 玩家详情系统设置list子项
     */
    var userSystem3 = (function (_super) {
        __extends(userSystem3, _super);
        function userSystem3() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/user/userSystem3Skin.exml";
            return _this;
        }
        return userSystem3;
    }(eui.ItemRenderer));
    zj.userSystem3 = userSystem3;
    __reflect(userSystem3.prototype, "zj.userSystem3");
})(zj || (zj = {}));
//# sourceMappingURL=userSystem3.js.map