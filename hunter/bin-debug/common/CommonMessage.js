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
    // lizhengqiang
    // 2018/11/27
    // 获得体力/金币
    var CommonMessage = (function (_super) {
        __extends(CommonMessage, _super);
        function CommonMessage() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonMessageSkin.exml";
            return _this;
        }
        CommonMessage.prototype.init = function (source, text, scaleX, scaleY, isTween) {
            var _this = this;
            if (scaleX === void 0) { scaleX = 1; }
            if (scaleY === void 0) { scaleY = 1; }
            if (isTween === void 0) { isTween = true; }
            this.horizontalCenter = 0;
            this.verticalCenter = 0;
            this.imgIcon.source = zj.cachekey(source, this);
            this.imgIcon.scaleX = scaleX;
            this.imgIcon.scaleY = scaleY;
            this.lbadd.text = text;
            if (!isTween) {
                this.imgIcon.right = this.width / 2;
                this.lbadd.left = this.width / 2;
            }
            else {
                this.imgIcon.right = zj.UIManager.StageWidth;
                egret.Tween.get(this.imgIcon)
                    .to({ right: this.width / 2 }, 260)
                    .call(function () {
                    egret.Tween.removeTweens(_this.imgIcon);
                });
                this.lbadd.left = zj.UIManager.StageWidth;
                egret.Tween.get(this.lbadd)
                    .to({ left: this.width / 2 }, 260)
                    .call(function () {
                    egret.Tween.removeTweens(_this.lbadd);
                });
            }
            egret.Tween.get(this.groupMain)
                .wait(800).to({ y: -zj.UIManager.StageHeight }, 300, egret.Ease.circIn)
                .call(function () {
                egret.Tween.removeTweens(_this.groupMain);
                _this.close();
            });
        };
        return CommonMessage;
    }(zj.Dialog));
    zj.CommonMessage = CommonMessage;
    __reflect(CommonMessage.prototype, "zj.CommonMessage");
})(zj || (zj = {}));
//# sourceMappingURL=CommonMessage.js.map