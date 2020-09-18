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
    // 兑换码  关注公众号
    // wangshenzhuo
    // 2019-7-26
    var AttentionGiftDialog = (function (_super) {
        __extends(AttentionGiftDialog, _super);
        function AttentionGiftDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/gift/AttentionGiftDialogSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonCopy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonCopy, _this);
            return _this;
        }
        AttentionGiftDialog.prototype.isFullScreen = function () {
            return true;
        };
        // 关闭按钮
        AttentionGiftDialog.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            // let vis: boolean = true;
            // for (var key of Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType) {
            //     if (key == 10001) {
            //         vis = false;
            //     }
            // }
            // let isShow = vis && ActivityCollection.vis && ((Util.isWxMiniGame() && egret.Capabilities.os == "Android") || ActivityCollection.myBrowser() == "Safari" || (ActivityCollection.myBrowser() == "micromessenger" && egret.Capabilities.os == "iOS") || egret.Capabilities.os == "iOS");
            // if (isShow && !Teach.isDone(teachBattle.teachPartID_GiftBag)) {
            //     Teach.SetTeachPart(teachBattle.teachPartID_GiftBag);    
            // }
        };
        // 点击复制
        AttentionGiftDialog.prototype.onButtonCopy = function () {
            zj.platform.setClipboardData("猎人世界");
        };
        return AttentionGiftDialog;
    }(zj.Dialog));
    zj.AttentionGiftDialog = AttentionGiftDialog;
    __reflect(AttentionGiftDialog.prototype, "zj.AttentionGiftDialog");
})(zj || (zj = {}));
//# sourceMappingURL=AttentionGiftDialog.js.map