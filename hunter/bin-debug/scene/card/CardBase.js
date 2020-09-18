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
    // created by hhh in 2018/11/8
    /************** 卡片界面基类 ****************/
    var CardBase = (function (_super) {
        __extends(CardBase, _super);
        function CardBase() {
            var _this = _super.call(this) || this;
            _this.beSelected = false;
            _this.cardUIwidth = 960;
            _this.beginPosX = 0;
            return _this;
        }
        CardBase.prototype.setSelect = function (selected) {
            if (selected == true && this.beSelected == false) {
                this.aniEnter();
                this.beSelected = true;
                this.loadCardList();
            }
            else if (this.beSelected == true) {
                this.aniExit();
                this.beSelected = false;
            }
        };
        CardBase.prototype.aniEnter = function () {
            var _this = this;
            egret.Tween.get(this)
                .call(function () { _this.visible = true; })
                .to({ x: -1 * zj.UIManager.StageWidth }, 0, egret.Ease.sineOut)
                .to({ x: this.beginPosX, alpha: 1 }, 300, egret.Ease.sineOut)
                .call(function () {
                zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: egret.getQualifiedClassName(_this) });
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            });
        };
        CardBase.prototype.aniExit = function () {
            var _this = this;
            egret.Tween.get(this)
                .to({ x: -2 * zj.UIManager.StageWidth, alpha: 0 }, 300, egret.Ease.sineOut)
                .call(function () { _this.visible = false; })
                .to({ x: this.beginPosX }, 0)
                .call(function () {
                zj.Game.EventManager.event(zj.GameEvent.CLOSE_UI, { typeName: egret.getQualifiedClassName(_this) });
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            });
        };
        CardBase.prototype.loadCardList = function () { };
        return CardBase;
    }(zj.UI));
    zj.CardBase = CardBase;
    __reflect(CardBase.prototype, "zj.CardBase");
})(zj || (zj = {}));
//# sourceMappingURL=CardBase.js.map