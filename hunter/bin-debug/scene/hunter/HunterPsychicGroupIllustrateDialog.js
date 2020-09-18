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
     * @author chen xi.
     *
     * @date 2019-1-12
     *
     * @class 组合图鉴
     */
    var HunterPsychicGroupIllustrateDialog = (function (_super) {
        __extends(HunterPsychicGroupIllustrateDialog, _super);
        function HunterPsychicGroupIllustrateDialog() {
            var _this = _super.call(this) || this;
            _this.listGroupData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/hunter/HunterPsychicGroupIllustrateDialogSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.loadList();
            return _this;
        }
        HunterPsychicGroupIllustrateDialog.prototype.loadList = function () {
            this.listGroupData.removeAll();
            var listData = zj.PlayerHunterSystem.GetPsychicGroupIllustrateData();
            for (var key in listData) {
                if (listData.hasOwnProperty(key)) {
                    var value = listData[key];
                    this.listGroupData.addItem(Number(key));
                    for (var i = 0; i < value.length; i++) {
                        var vv = value[i];
                        this.listGroupData.addItem(vv);
                    }
                }
            }
            this.listGroup.dataProvider = this.listGroupData;
            this.listGroup.itemRendererFunction = this.listItemRenderer;
        };
        HunterPsychicGroupIllustrateDialog.prototype.listItemRenderer = function (data) {
            if (typeof data === "number") {
                return zj.HunterPsychicGroupIllustrateTitleItem;
            }
            else {
                return zj.HunterPsychicGroupIllustrateItem;
            }
        };
        HunterPsychicGroupIllustrateDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterPsychicGroupIllustrateDialog;
    }(zj.Dialog));
    zj.HunterPsychicGroupIllustrateDialog = HunterPsychicGroupIllustrateDialog;
    __reflect(HunterPsychicGroupIllustrateDialog.prototype, "zj.HunterPsychicGroupIllustrateDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychicGroupIllustrateDialog.js.map