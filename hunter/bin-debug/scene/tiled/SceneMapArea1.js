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
     * 副本界面-关卡跑图
     * zhaiweili
     * 2019.11.7
     */
    var SceneMapArea1 = (function (_super) {
        __extends(SceneMapArea1, _super);
        function SceneMapArea1() {
            return _super.call(this) || this;
        }
        SceneMapArea1.prototype.initUI = function () {
            _super.prototype.initUI.call(this);
        };
        SceneMapArea1.prototype.init = function (ui, param) {
            if (param === void 0) { param = null; }
            _super.prototype.init.call(this, ui, param);
        };
        SceneMapArea1.prototype.setData = function (data) {
            this.currData = data;
        };
        // 场景进入栈顶
        SceneMapArea1.prototype.onEntryTopScene = function () {
        };
        // 场景离开栈顶
        SceneMapArea1.prototype.onLeaveTopScene = function () {
        };
        /**
         * 单位移动中调用
         */
        SceneMapArea1.prototype.playerMove = function (unit, offx, offy) {
        };
        /**
         * 单位移动结束
         */
        SceneMapArea1.prototype.playerMoveFinish = function (unit) {
        };
        return SceneMapArea1;
    }(zj.SceneMapBase));
    zj.SceneMapArea1 = SceneMapArea1;
    __reflect(SceneMapArea1.prototype, "zj.SceneMapArea1");
})(zj || (zj = {}));
//# sourceMappingURL=SceneMapArea1.js.map