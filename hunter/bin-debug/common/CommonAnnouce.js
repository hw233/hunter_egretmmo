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
     * @date 2019-7-1
     *
     * @class 滚屏
     */
    var CommonAnnouce = (function (_super) {
        __extends(CommonAnnouce, _super);
        function CommonAnnouce() {
            var _this = _super.call(this) || this;
            _this.string = [];
            _this.vis = true;
            _this.skinName = "resource/skins/common/CommonAnnouceSkin.exml";
            _this.init();
            return _this;
        }
        CommonAnnouce.prototype.init = function () {
            this.labelDes.mask = this.labelBg;
            this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onClose, this);
            this.touchEnabled = false;
        };
        CommonAnnouce.prototype.SetInfo = function (cell, father) {
            this.father = father;
            var ui = this.getChildByName("__rect_back");
            if (ui) {
                this.removeChild(ui);
            }
            this.cell = cell;
            for (var i = 0; i < cell.length; i++) {
                for (var j = 0; j < cell[i].cellsOrig.length; j++) {
                    this.string.push(cell[i].cellsOrig[j]._ui_data);
                }
            }
            if (this.vis == true) {
                this.vis = false;
                this.labelDes.textFlow = zj.Util.RichText(this.string[0]);
                this.labelDes.x = 600;
                this.doAction();
            }
        };
        CommonAnnouce.prototype.doAction = function () {
            var time_unit = zj.ConstantConfig_Common.actionTime.annouceTime;
        };
        CommonAnnouce.prototype.Update = function () {
            if (!zj.Game.PlayerInfoSystem.playAnnouce) {
                this.string = [];
                this.onClose();
            }
            this.labelDes.x -= 3;
            if (this.labelDes.x <= -this.labelDes.width) {
                this.string.splice(0, 1);
                if (this.string.length == 0) {
                    this.onClose();
                }
                else {
                    this.labelDes.textFlow = zj.Util.RichText(this.string[0]);
                    this.labelDes.x = 600;
                }
            }
        };
        CommonAnnouce.prototype.onClose = function () {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.Update, this);
            if (this.father) {
                this.father.CommonAnnouce = null;
            }
            zj.Game.UIManager.AnimationGroup.removeChild(this);
        };
        return CommonAnnouce;
    }(eui.Component));
    zj.CommonAnnouce = CommonAnnouce;
    __reflect(CommonAnnouce.prototype, "zj.CommonAnnouce");
})(zj || (zj = {}));
//# sourceMappingURL=CommonAnnouce.js.map