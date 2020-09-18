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
    // 全局事件管理器
    // 接受全局事件注册、发布、广播
    // 相当于MVC框架中的中介器角色
    // guoshanhe
    // 2018.11.5
    var EventManager = (function (_super) {
        __extends(EventManager, _super);
        function EventManager() {
            return _super.call(this) || this;
        }
        // 发送事件
        EventManager.prototype.event = function (type, data) {
            if (data === void 0) { data = null; }
            var e = new egret.Event(type);
            e.data = data;
            this.dispatchEvent(e);
        };
        // 监听事件
        EventManager.prototype.on = function (type, listener, thisObject) {
            var _this = this;
            this.addEventListener(type, listener, thisObject);
            if (thisObject instanceof egret.DisplayObject) {
                var display = thisObject;
                display.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                    _this.removeEventListener(type, listener, thisObject);
                }, thisObject);
            }
        };
        // 取消监听事件
        EventManager.prototype.off = function (type, listener, thisObject) {
            this.removeEventListener(type, listener, thisObject);
        };
        // 最多只接受一次事件(自动取消监听事件)
        EventManager.prototype.once = function (type, listener, thisObject) {
            var _this = this;
            this.once(type, listener, thisObject);
            if (thisObject instanceof egret.DisplayObject) {
                var display = thisObject;
                display.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                    _this.removeEventListener(type, listener, thisObject);
                }, null);
            }
        };
        return EventManager;
    }(egret.EventDispatcher));
    zj.EventManager = EventManager;
    __reflect(EventManager.prototype, "zj.EventManager");
})(zj || (zj = {}));
//# sourceMappingURL=EventManager.js.map