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
     * @author xing li wei
     *
     * @date 2019-4-26
     *
     * @class 强者之路
     */
    var ActivityNoviceContinue = (function (_super) {
        __extends(ActivityNoviceContinue, _super);
        function ActivityNoviceContinue() {
            return _super.call(this) || this;
            // this.skinName = "resource/skins/activity/ActivityNoviceContinueSkin.exml";
            // this.init();
        }
        ActivityNoviceContinue.prototype.init = function () {
            // super.init();
            // this.addEventListener(egret.TouchEvent.TOUCH_END, super.up, this);
        };
        /**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
        ActivityNoviceContinue.prototype.up = function () {
            // this.btnGift.scaleX = 1;
            // this.btnGift.scaleY = 1;
            // let dialogDrop = this.getChildByName("UI");
            // if (dialogDrop) {
            // 	this.removeChild(dialogDrop);
            // }
        };
        return ActivityNoviceContinue;
    }(zj.noviceBase));
    zj.ActivityNoviceContinue = ActivityNoviceContinue;
    __reflect(ActivityNoviceContinue.prototype, "zj.ActivityNoviceContinue");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityNoviceContinue.js.map