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
    /**场景基类 */
    var StageObject = (function (_super) {
        __extends(StageObject, _super);
        function StageObject() {
            return _super.call(this) || this;
        }
        return StageObject;
    }(eui.Component));
    zj.StageObject = StageObject;
    __reflect(StageObject.prototype, "zj.StageObject");
})(zj || (zj = {}));
//# sourceMappingURL=StageObject.js.map