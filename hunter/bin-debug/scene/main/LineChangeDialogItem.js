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
    // 换线界面列表item
    // 翟伟利
    // 2019.12.14
    var LineChangeDialogItem = (function (_super) {
        __extends(LineChangeDialogItem, _super);
        function LineChangeDialogItem(owner) {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/main/LineChangeDialogItemSkin.exml";
            _this.owner = owner;
            zj.cachekeys(zj.UIResource["LineChangeDialogItem"], _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSel, _this);
            return _this;
        }
        LineChangeDialogItem.prototype.setData = function (data, roleNums) {
            this.data = data;
            this.update(roleNums);
        };
        LineChangeDialogItem.prototype.update = function (roleNums) {
            var data = this.data;
            this.lbLine.text = zj.LineChangeDialog.getLineName(data.key) + "线";
            var isSelf = this.data.key == zj.Game.PlayerWonderLandSystem.serverSceneId;
            this.groupSelf.visible = isSelf;
            this.imgBG.source = zj.cachekey(isSelf ? "ui_line_change_item_bg_sel_png" : "ui_line_change_item_bg_nor_png", this);
            var state = 0;
            if (data.value >= roleNums[1]) {
                state = 2;
            }
            else if (data.value >= roleNums[0]) {
                state = 1;
            }
            this.imgDot.source = zj.cachekey("ui_line_dot_" + state + "_b_png", this);
        };
        LineChangeDialogItem.prototype.onBtnSel = function () {
            this.owner.onSelItem(this.data);
        };
        LineChangeDialogItem.prototype.close = function (animation) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSel, this);
            _super.prototype.close.call(this);
        };
        return LineChangeDialogItem;
    }(zj.UI));
    zj.LineChangeDialogItem = LineChangeDialogItem;
    __reflect(LineChangeDialogItem.prototype, "zj.LineChangeDialogItem");
})(zj || (zj = {}));
//# sourceMappingURL=LineChangeDialogItem.js.map