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
     * @date 2019-4-8
     *
     * @class 公共对话框
     */
    var CommonConfirm = (function (_super) {
        __extends(CommonConfirm, _super);
        function CommonConfirm() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonBossSkillItemSkin.exml";
            _this.init();
            return _this;
        }
        CommonConfirm.prototype.init = function () {
            var _this = this;
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnConfirm, this);
            zj.Game.DragonBonesManager.playAnimation(this, "npc_bisiji", null, "animation2", 0)
                .then(function (display) {
                display.x = _this.groupAni.width / 2;
                display.y = _this.groupAni.height;
                display.scaleX = 0.6;
                display.scaleY = 0.58;
                _this.groupAni.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        CommonConfirm.prototype.onBtnConfirm = function () {
            var _this = this;
            var tmp = function () {
                if (_this.confirmCB != null) {
                    _this.confirmCB();
                }
            };
            tmp();
            this.close();
        };
        CommonConfirm.prototype.setInfo = function (message, bFreezeRootAction) {
            if (bFreezeRootAction != false) {
                this.LayerShow.visible = false;
            }
            this.labelNotice.text = message;
        };
        CommonConfirm.prototype.setCB = function (confirmCB) {
            this.confirmCB = confirmCB;
        };
        return CommonConfirm;
    }(zj.Dialog));
    zj.CommonConfirm = CommonConfirm;
    __reflect(CommonConfirm.prototype, "zj.CommonConfirm");
})(zj || (zj = {}));
//# sourceMappingURL=CommonConfirm.js.map