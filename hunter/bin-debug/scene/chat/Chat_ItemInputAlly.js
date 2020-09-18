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
     * 输入
     */
    var Chat_ItemInputAlly = (function (_super) {
        __extends(Chat_ItemInputAlly, _super);
        function Chat_ItemInputAlly() {
            return _super.call(this) || this;
        }
        return Chat_ItemInputAlly;
    }(zj.chatInput));
    zj.Chat_ItemInputAlly = Chat_ItemInputAlly;
    __reflect(Chat_ItemInputAlly.prototype, "zj.Chat_ItemInputAlly");
})(zj || (zj = {}));
//# sourceMappingURL=Chat_ItemInputAlly.js.map