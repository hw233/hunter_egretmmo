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
     * @date 2019-1-31
     *
     * @class 猎人仓库容量达到上限
     */
    var HunterStorageExceed = (function (_super) {
        __extends(HunterStorageExceed, _super);
        function HunterStorageExceed() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterStorageExceedSkin.exml";
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConfirm, _this);
            return _this;
        }
        HunterStorageExceed.prototype.setInfo = function (showMaxStorage, selectedNumber, bigNumber, cb) {
            this.callback = cb;
            this.imgMaxStorage.visible = showMaxStorage;
            this.imgMaxOwn.visible = !showMaxStorage;
            this.labelNumber.text = selectedNumber;
            this.labelBig.text = bigNumber;
        };
        HunterStorageExceed.prototype.onBtnConfirm = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            if (this.callback)
                this.callback();
        };
        return HunterStorageExceed;
    }(zj.Dialog));
    zj.HunterStorageExceed = HunterStorageExceed;
    __reflect(HunterStorageExceed.prototype, "zj.HunterStorageExceed");
})(zj || (zj = {}));
//# sourceMappingURL=HunterStorageExceed.js.map