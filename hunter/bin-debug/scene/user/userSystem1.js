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
    var userSystem1 = (function (_super) {
        __extends(userSystem1, _super);
        function userSystem1() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/user/userSystem1Skin.exml";
            return _this;
        }
        return userSystem1;
    }(eui.ItemRenderer));
    zj.userSystem1 = userSystem1;
    __reflect(userSystem1.prototype, "zj.userSystem1");
})(zj || (zj = {}));
//# sourceMappingURL=userSystem1.js.map