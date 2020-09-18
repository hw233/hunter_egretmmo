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
    var HXH_ChatItem = (function (_super) {
        __extends(HXH_ChatItem, _super);
        function HXH_ChatItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/chat/HXH_ChatItemSkin.exml";
            return _this;
        }
        HXH_ChatItem.prototype.dataChanged = function () {
            this.Initsa();
        };
        HXH_ChatItem.prototype.Initsa = function () {
            var color = zj.ConstantConfig_Chat.contentColor[this.data.Data.type - 1];
            this.tail.textColor = zj.Helper.RGBToHex("r:" + color[0].toString() + "," + "g:" + color[1].toString() + "," + "b:" + color[2].toString());
            if (this.data.Data == 0 || this.data.Data == null || this.data.Data == undefined) {
                return;
            }
            var content;
            if (this.data.Data.content_type != "" || this.data.Data.show_type == 5) {
                content = zj.Game.PlayerChatDataSystem.GetChatInfo(this.data.Data, 1);
                this.tail.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(content[0] + content[1] + content[2]));
            }
            else {
                content = zj.Game.PlayerChatDataSystem.GetChatInfo(this.data.Data);
                var str = content[0];
                if (content[1]) {
                    str += content[1];
                }
                if (content[2]) {
                    str += content[2];
                }
                this.tail.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(str));
            }
            if (this.data.Data.type == 2 && this.data.Data.type == 5) {
                this.tail.textColor = zj.Helper.RGBToHex("r:79, g:191, b:89");
            }
            else if (this.data.Data.type == 4) {
                this.tail.textColor = zj.Helper.RGBToHex("r:225, g:0, b:225");
            }
            if (this.data.Data.content_type == "" && this.data.Data.type == 5) {
                this.tail.textColor = 0XFF9E00;
            }
            this.tail.height = this.data.itemNum;
            this.height = this.data.itemNum;
            this.skin.height = this.data.itemNum;
            // let lineNum = Game.PlayerChatDataSystem.getStrlineNum(this.tail.text, 350);
            // if (lineNum == 1) {
            //     this.tail.height = this.tail.height + 20 * (lineNum - 1);
            //     this.height = this.tail.height + 20 * (lineNum - 1);
            //     this.skin.height = this.tail.height + 20 * (lineNum - 1);
            // } else {
            //     this.tail.height = this.tail.height + 20 * (lineNum - 1);
            //     this.height = this.tail.height + 20 * (lineNum - 1);
            //     this.skin.height = this.tail.height + 20 * (lineNum - 1);
            // }
            // 自动修正text宽高
            // let lineNum = Game.PlayerChatDataSystem.getStrlineNum(content[0], 370);
            // this.height = this.height + 20 * (lineNum - 1);
            // this.tail.height = this.height;
        };
        return HXH_ChatItem;
    }(eui.ItemRenderer));
    zj.HXH_ChatItem = HXH_ChatItem;
    __reflect(HXH_ChatItem.prototype, "zj.HXH_ChatItem");
    var FormatChatItem = (function () {
        function FormatChatItem() {
        }
        return FormatChatItem;
    }());
    zj.FormatChatItem = FormatChatItem;
    __reflect(FormatChatItem.prototype, "zj.FormatChatItem");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_ChatItem.js.map