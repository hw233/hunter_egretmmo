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
    // lizhengqiang
    // 2018/11/08
    var PackageMainItemIR = (function (_super) {
        __extends(PackageMainItemIR, _super);
        function PackageMainItemIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/package/PackageMainItemIRSkin.exml";
            zj.cachekeys(zj.UIResource["PackageMainItemIR"], null);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.scaleX = 0.9;
            _this.imgMask.scaleY = 0.9;
            _this.groupItem.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(75, 78);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            return _this;
        }
        PackageMainItemIR.prototype.dataChanged = function () {
            var _this = this;
            this.groupAnimation.visible = false;
            this.groupAnimation.removeChildren();
            if (!this.data.isEmpty) {
                var config = zj.PlayerItemSystem.ItemConfig(this.data.itemId);
                this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(this.data.itemId), this);
                this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.data.itemId), this);
                this.imgTips.visible = (config.hasOwnProperty("red_tips") && config["red_tips"] != 0) ? true : false;
                this.lbNum.text = this.data.labelNum;
                this.lbCount.text = zj.Game.PlayerItemSystem.itemCount(this.data.itemId).toString();
                // 遮罩
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMask.verticalCenter = 0;
                this.imgIcon.mask = null;
                this.imgIcon.scaleX = 0.9;
                this.imgIcon.scaleY = 0.9;
                if (zj.PlayerItemSystem.IsImgMask(this.data.itemId)) {
                    this.imgMask.visible = true;
                    this.imgIcon.mask = this.imgMask;
                }
                else if (zj.PlayerItemSystem.IsRectMask(this.data.itemId)) {
                    this.rectMask.visible = true;
                    this.rectMask.verticalCenter = -1;
                    this.rectMask.scaleX = 0.85;
                    this.rectMask.scaleY = 0.83;
                    this.imgIcon.scaleX = 0.75;
                    this.imgIcon.scaleY = 0.75;
                    this.imgIcon.mask = this.rectMask;
                }
                else {
                    this.rectMask.visible = true;
                    this.rectMask.scaleX = 1;
                    this.rectMask.scaleY = 1;
                    this.imgIcon.mask = this.rectMask;
                }
                if (this.selected) {
                    this.groupAnimation.visible = true;
                    zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                        .then(function (display) {
                        _this.groupAnimation.addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            }
            else {
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Common.nothing, this);
                this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Common.nothing, this);
                this.imgTips.visible = false;
                this.lbNum.text = "";
                this.lbCount.text = "";
            }
        };
        return PackageMainItemIR;
    }(eui.ItemRenderer));
    zj.PackageMainItemIR = PackageMainItemIR;
    __reflect(PackageMainItemIR.prototype, "zj.PackageMainItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=PackageMainItemIR.js.map