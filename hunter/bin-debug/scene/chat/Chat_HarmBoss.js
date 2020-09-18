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
    var Chat_HarmBoss = (function (_super) {
        __extends(Chat_HarmBoss, _super);
        function Chat_HarmBoss() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/chat/Chat_HarmBossSkin.exml";
            return _this;
        }
        Chat_HarmBoss.prototype.dataChanged = function () {
            this.Initsa();
        };
        Chat_HarmBoss.prototype.Initsa = function () {
            var content = zj.Game.PlayerChatDataSystem.GetChatInfo(this.data, 1);
            this.tail.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[2]));
        };
        return Chat_HarmBoss;
    }(eui.ItemRenderer));
    zj.Chat_HarmBoss = Chat_HarmBoss;
    __reflect(Chat_HarmBoss.prototype, "zj.Chat_HarmBoss");
})(zj || (zj = {}));
//# sourceMappingURL=Chat_HarmBoss.js.map