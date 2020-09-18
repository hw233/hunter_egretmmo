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
     * 连续挑战
     */
    var SuccessionBattlePopTip = (function (_super) {
        __extends(SuccessionBattlePopTip, _super);
        function SuccessionBattlePopTip() {
            var _this = _super.call(this) || this;
            _this.confirmCB = null;
            _this.skinName = "resource/skins/formation/SuccessionBattlePopTipSkin.exml";
            _this.registerEvents();
            return _this;
        }
        SuccessionBattlePopTip.prototype.setInfo = function (msg1, msg2, msg3) {
            this.LabelContent1.text = msg1; // Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content1, Gmgr.Instance.maxContinueBattleSum);
            this.LabelContent2.text = msg2; // TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content2;
            this.LabelContent3.text = msg3; // Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.continue_battle_content3, Gmgr.Instance.maxContinueBattleSum);
        };
        /**
         * 事件监听
         */
        SuccessionBattlePopTip.prototype.registerEvents = function () {
            this.ButtonGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGetAward, this); // 确定
            this.ButtonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this); // 关闭
        };
        /**
         * 确定按钮
         */
        SuccessionBattlePopTip.prototype.onButtonGetAward = function () {
            zj.Game.EventManager.event(zj.GameEvent.BUTTON_Get_AWARD); // 其他阵型 
        };
        SuccessionBattlePopTip.prototype.setCB = function (confirmCB) {
            this.confirmCB = confirmCB;
        };
        /**
         * 关闭按钮
         */
        SuccessionBattlePopTip.prototype.onButtonClose = function () {
            this.close();
        };
        return SuccessionBattlePopTip;
    }(zj.Dialog));
    zj.SuccessionBattlePopTip = SuccessionBattlePopTip;
    __reflect(SuccessionBattlePopTip.prototype, "zj.SuccessionBattlePopTip");
})(zj || (zj = {}));
//# sourceMappingURL=SuccessionBattlePopTip.js.map