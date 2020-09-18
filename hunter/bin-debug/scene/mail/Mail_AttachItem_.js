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
    // 邮件-信件item
    // lizhengiang
    // 20190517
    var Mail_AttachItem_ = (function (_super) {
        __extends(Mail_AttachItem_, _super);
        function Mail_AttachItem_() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/mail/Mail_AttachItem_Skin.exml";
            zj.cachekeys(zj.UIResource["Mail_AttachItem_"], null);
            return _this;
        }
        Mail_AttachItem_.prototype.dataChanged = function () {
            var itemInfo = this.data.itemInfo;
            var battleResult = this.data.battleResult;
            var itemSet = zj.PlayerItemSystem.Set(itemInfo.goodsId, null, itemInfo.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            if (!battleResult) {
                this.lbNum.text = "x" + itemInfo.count;
            }
            else {
                var bWin = battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN;
                var strNum = bWin ? "x" + itemInfo.count : "-" + itemInfo.count;
                var color = bWin ? this.lbNum.textColor : zj.ConstantConfig_Common.Color.red;
                this.lbNum.text = strNum;
                this.lbNum.textColor = color;
            }
        };
        return Mail_AttachItem_;
    }(eui.ItemRenderer));
    zj.Mail_AttachItem_ = Mail_AttachItem_;
    __reflect(Mail_AttachItem_.prototype, "zj.Mail_AttachItem_");
})(zj || (zj = {}));
//# sourceMappingURL=Mail_AttachItem_.js.map