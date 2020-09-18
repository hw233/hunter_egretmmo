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
     * @author xingliwei
     *
     * @date 2019-7-20
     *
     * @class 猎人念力激活念力时弹得小弹窗
     */
    var CommonGetPsychicGroup = (function (_super) {
        __extends(CommonGetPsychicGroup, _super);
        function CommonGetPsychicGroup() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/CommonGetPsychicGroupSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        CommonGetPsychicGroup.prototype.SetCB = function (uiCB) {
            this.cb = uiCB;
        };
        ;
        CommonGetPsychicGroup.prototype.SetPsychicGroupInfo = function (groupInfo) {
            this.imgTitle.source = zj.UIConfig.UIConfig_Psychic.groupUp[groupInfo.length];
            if (groupInfo instanceof Array) {
                for (var i = 1; i < groupInfo.length; i++) {
                    var item = zj.newUI(zj.HunterPsychicGroupItem);
                    item.x = i * 135;
                    this.groupItem.addChild(item);
                    this.groupItem.width = i * 135;
                    item.SetInfo(i, groupInfo[i], this, false, false);
                }
            }
            else {
                var item = zj.newUI(zj.HunterPsychicGroupItem);
                this.groupItem.addChild(item);
                item.SetInfo(0, groupInfo, this, false, false);
            }
        };
        CommonGetPsychicGroup.prototype.onBtnClose = function () {
            if (this.cb) {
                this.cb();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return CommonGetPsychicGroup;
    }(zj.Dialog));
    zj.CommonGetPsychicGroup = CommonGetPsychicGroup;
    __reflect(CommonGetPsychicGroup.prototype, "zj.CommonGetPsychicGroup");
})(zj || (zj = {}));
//# sourceMappingURL=CommonGetPsychicGroup.js.map