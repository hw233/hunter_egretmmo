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
     * @date 2019-1-24
     *
     * @class 天赋效果描述
     */
    var CommonDesTalents = (function (_super) {
        __extends(CommonDesTalents, _super);
        function CommonDesTalents() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_DesTalents.exml";
            return _this;
        }
        CommonDesTalents.prototype.setInfo = function (id) {
            var info = zj.TableClientWantedMobsFeature.Item(id);
            var frame = zj.PlayerItemSystem.QualityFrame(info.quality);
            this.imgFrame.source = zj.cachekey(frame, this);
            this.imgIcon.source = zj.cachekey(info.path, this);
            this.labelName.text = info.name;
            this.labelDes.text = info.des;
        };
        return CommonDesTalents;
    }(zj.UI));
    zj.CommonDesTalents = CommonDesTalents;
    __reflect(CommonDesTalents.prototype, "zj.CommonDesTalents");
})(zj || (zj = {}));
//# sourceMappingURL=CommonDesTalents.js.map