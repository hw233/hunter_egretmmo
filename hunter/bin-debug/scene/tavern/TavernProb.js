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
    // TavernProb
    //hexiaowei
    // 2018/11/15
    var TavernProb = (function (_super) {
        __extends(TavernProb, _super);
        function TavernProb() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/tavern/TavernProbSkin.exml";
            _this.group1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroup1Close, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelCloseTheTip); // 因为是循环播放，需要特别处理
            }, null);
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.labelSoda.textFlow = zj.Util.RichText(zj.RuleConfig.Tavern[1]);
            _this.labelBeer.textFlow = zj.Util.RichText(zj.RuleConfig.Tavern[2]);
            _this.labelRedWine.textFlow = zj.Util.RichText(zj.RuleConfig.Tavern[3]);
            _this.labelChampagne.textFlow = zj.Util.RichText(zj.RuleConfig.Tavern[4]);
            //点击任意区域关闭
            egret.Tween.get(_this.labelCloseTheTip, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000);
            return _this;
        }
        TavernProb.prototype.init = function (tavern) {
            this.tavern = tavern;
            if (zj.Device.isReviewSwitch) {
                this.sodaWater.visible = false;
                this.redWine.visible = false;
                this.champagne.visible = false;
                this.IceBeer.x = 26;
                this.IceBeer.y = 75;
            }
            else {
                this.sodaWater.visible = true;
                this.redWine.visible = true;
                this.champagne.visible = true;
            }
        };
        TavernProb.prototype.onGroup1Close = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return TavernProb;
    }(zj.Dialog));
    zj.TavernProb = TavernProb;
    __reflect(TavernProb.prototype, "zj.TavernProb");
})(zj || (zj = {}));
//# sourceMappingURL=TavernProb.js.map