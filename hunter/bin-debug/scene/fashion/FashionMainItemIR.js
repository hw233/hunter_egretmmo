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
    // 形象变换item
    // lizhengiang
    // 20190316
    var FashionMainItemIR = (function (_super) {
        __extends(FashionMainItemIR, _super);
        function FashionMainItemIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/fashion/FashionMainItemIRSkin.exml";
            zj.cachekeys(zj.UIResource["FashionMainItemIR"], null);
            zj.Game.DragonBonesManager.playAnimation(_this, "ui_tongyong_xuanzhong02", "armatureName", null, 0).then(function (display) {
                display.scaleX = 1.05;
                display.scaleY = 1.05;
                display.name = "ani";
                _this.groupAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            return _this;
        }
        FashionMainItemIR.prototype.dataChanged = function () {
            zj.closeCache(this.groupCache);
            this.groupAni.visible = false;
            this.groupAll.visible = false;
            var info = this.data;
            if (!info) {
                return;
            }
            this.groupAll.visible = true;
            var itemSet = zj.PlayerItemSystem.Set(info.general_id);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            var tips = zj.PlayerFashionSystem.GetHunterFashionTips(info.general_id);
            this.imgIconRed.visible = tips;
            this.groupAni.visible = this.selected;
            zj.setCache(this.groupCache);
        };
        return FashionMainItemIR;
    }(eui.ItemRenderer));
    zj.FashionMainItemIR = FashionMainItemIR;
    __reflect(FashionMainItemIR.prototype, "zj.FashionMainItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=FashionMainItemIR.js.map