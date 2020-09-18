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
    // Common_DesRandom
    // hexiaowei 
    // 2019/02/20
    var Common_DesRandom = (function (_super) {
        __extends(Common_DesRandom, _super);
        function Common_DesRandom() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_DesRandomSkin.exml";
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            return _this;
        }
        Common_DesRandom.prototype.setInfo = function (goodsId, count) {
            var itemSet = zj.PlayerItemSystem.Set(goodsId, null, count);
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            var info = itemSet.Info;
            this.labelName.text = info.name;
            this.labelType.text = info.des;
            var mnb = zj.PlayerItemSystem.Item(goodsId);
            if (mnb.client_star != null) {
                zj.Helper.NodeStarByAlignLeft(this.groupStar, mnb.client_star, 6, 1.8, false, zj.UIConfig.UIConfig_Role.heroAwakenStar[1]);
            }
            if (this.isRectMask(goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
            }
        };
        //根据奖励类型判断是否添加遮罩
        Common_DesRandom.prototype.isRectMask = function (goodsId) {
            var m = zj.PlayerItemSystem.ItemType(goodsId);
            if (goodsId >= 203001 && goodsId <= 203006) {
                return true;
            }
            return false;
        };
        return Common_DesRandom;
    }(zj.UI));
    zj.Common_DesRandom = Common_DesRandom;
    __reflect(Common_DesRandom.prototype, "zj.Common_DesRandom");
})(zj || (zj = {}));
//# sourceMappingURL=Common_DesRandom.js.map