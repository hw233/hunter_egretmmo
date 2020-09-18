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
     * 领取体力提示
     */
    var Common_Tip = (function (_super) {
        __extends(Common_Tip, _super);
        function Common_Tip() {
            var _this = _super.call(this) || this;
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.skinName = "resource/skins/common/Common_TipSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            return _this;
        }
        Common_Tip.prototype.SetInfo = function (textStr, posY, posX, picStr, tipStr) {
            var _this = this;
            this.x = posX / 2 - 100;
            this.y = posY / 2;
            if (picStr == null) {
                this.labelTextAttri.visible = true;
                this.labelTextRes.visible = false;
                this.imageRes.visible = false;
                this.labelTextAttri.textFlow = zj.Util.RichText(textStr) || zj.Util.RichText("");
            }
            else {
                this.labelTextAttri.visible = false;
                this.labelTextRes.visible = true;
                this.imageRes.visible = true;
                this.labelTextRes.text = textStr || "";
                this.imageRes.source = zj.cachekey(picStr, this);
            }
            if (tipStr != null) {
                this.imageBoard.source = zj.cachekey(tipStr, this);
                this.labelTextAttri.x = 70;
            }
            egret.Tween.get(this).wait(500)
                .to({ y: posY / 2, x: posX / 2 - 100 }, 0)
                .to({ y: posY / 2 - 50 }, 500).wait(500)
                .to({ y: posY / 2 - 100 }, 500).wait(500)
                .call(function () {
                _this.removeChildren();
            });
        };
        Common_Tip.AddTip = function (txtStr, posY, posX, picStr, tipStr) {
            var tip = new Common_Tip();
            tip.SetInfo(txtStr, posY, posX, picStr, tipStr);
            zj.Game.UIManager.AnimationGroup.addChild(tip);
            tip.y = posY / 2;
            tip.x = posX / 2;
        };
        return Common_Tip;
    }(zj.UI));
    zj.Common_Tip = Common_Tip;
    __reflect(Common_Tip.prototype, "zj.Common_Tip");
})(zj || (zj = {}));
//# sourceMappingURL=Common_Tip.js.map