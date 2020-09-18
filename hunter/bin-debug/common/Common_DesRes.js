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
    // Common_DesRes
    // hexiaowei 
    // 2018/12/5
    var Common_DesRes = (function (_super) {
        __extends(Common_DesRes, _super);
        function Common_DesRes() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_DesResSkin.exml";
            return _this;
        }
        Common_DesRes.prototype.setInfo = function (goodsId, count) {
            var itemSet = zj.PlayerItemSystem.Set(goodsId, null, count);
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            var info = itemSet.Info;
            this.labelName.text = info.name;
            this.labelNum.text = count;
            this.labelHas.text = itemSet.Count.toString();
            this.labelInfo.text = info.des;
            this.labelHide.visible = count != "" && count != 0 && count != null;
            this.labelNum.visible = count != "" && count != 0 && count != null;
        };
        return Common_DesRes;
    }(zj.UI));
    zj.Common_DesRes = Common_DesRes;
    __reflect(Common_DesRes.prototype, "zj.Common_DesRes");
})(zj || (zj = {}));
//# sourceMappingURL=Common_DesRes.js.map