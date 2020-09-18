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
    // 2018/11/27
    var PackageMainPopItemIR = (function (_super) {
        __extends(PackageMainPopItemIR, _super);
        function PackageMainPopItemIR() {
            var _this = _super.call(this) || this;
            _this.isFirst = true;
            _this.skinName = "resource/skins/package/PackageMainPopItemIRSkin.exml";
            zj.cachekeys(zj.UIResource["PackageMainPopItemIR"], null);
            _this.imgIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(73, 70);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            return _this;
        }
        PackageMainPopItemIR.prototype.dataChanged = function () {
            var _this = this;
            var config = zj.PlayerItemSystem.ItemConfig(this.data.goodsId);
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(this.data.goodsId), this);
            this.imgIcon.source = zj.cachekey(config["path"], this);
            this.lbNum.text = "x" + this.data.count;
            this.lbName.text = config["name"];
            if (this.selected) {
                this.btnItem.currentState = "down";
            }
            else {
                this.btnItem.currentState = "up";
            }
            // 遮罩
            this.imgMask.visible = false;
            this.rectMask.visible = false;
            this.imgIcon.mask = null;
            if (zj.PlayerItemSystem.IsImgMask(this.data.goodsId)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }
            else if (zj.PlayerItemSystem.IsRectMask(this.data.goodsId)) {
                this.rectMask.visible = true;
                this.imgIcon.mask = this.rectMask;
            }
            if (this.isFirst) {
                egret.Tween.get(this.groupMain)
                    .wait(this.data.index * 100)
                    .to({ scaleX: 1.1, scaleY: 1.1 }, 150)
                    .to({ scaleX: 0.95, scaleY: 0.95 }, 150)
                    .to({ scaleX: 1, scaleY: 1 }, 150)
                    .call(function () {
                    _this.isFirst = false;
                });
                var type = zj.PlayerItemSystem.Type2(this.data.goodsId);
                if (type == message.EGoodsType.GOODS_TYPE_FASHION || type == message.EGoodsType.GOODS_TYPE_GENERAL || type == message.EGoodsType.GOODS_TYPE_POTATO) {
                    zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
                        .then(function (display) {
                        display.x = _this.groupItem.width / 2;
                        display.y = _this.groupItem.height / 2;
                        _this.groupItem.addChild(display);
                    })
                        .catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            }
        };
        PackageMainPopItemIR.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.data, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return PackageMainPopItemIR;
    }(eui.ItemRenderer));
    zj.PackageMainPopItemIR = PackageMainPopItemIR;
    __reflect(PackageMainPopItemIR.prototype, "zj.PackageMainPopItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=PackageMainPopItemIR.js.map