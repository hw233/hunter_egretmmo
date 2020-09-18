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
    // 列表游戏分区区段的item reader
    // guoshanhe 创建于2018.11.15
    var GameGroupSectionIR = (function (_super) {
        __extends(GameGroupSectionIR, _super);
        function GameGroupSectionIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/login/GameGroupSectionIRSkin.exml";
            _this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSelect, _this);
            return _this;
        }
        GameGroupSectionIR.prototype.onBtnSelect = function () {
            //toast("item");
        };
        GameGroupSectionIR.prototype.dataChanged = function () {
            this.lbGroupName.text = this.data.start + "-" + this.data.end + "\u533A";
            this.lbGroupNameShadow.text = this.data.start + "-" + this.data.end + "\u533A";
            if (this.data.is_selected) {
                this.btnSelect.currentState = "down";
            }
            else {
                this.btnSelect.currentState = "up";
            }
            console.log("GameGroupSectionIR dataChanged ", this.lbGroupName.text);
        };
        return GameGroupSectionIR;
    }(eui.ItemRenderer));
    zj.GameGroupSectionIR = GameGroupSectionIR;
    __reflect(GameGroupSectionIR.prototype, "zj.GameGroupSectionIR");
})(zj || (zj = {}));
//# sourceMappingURL=GameGroupSectionIR.js.map