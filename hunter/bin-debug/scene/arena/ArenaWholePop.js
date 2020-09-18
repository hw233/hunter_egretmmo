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
     * @date 2019-2-26
     *
     * @class 奖励说明详情
     */
    var ArenaWholePop = (function (_super) {
        __extends(ArenaWholePop, _super);
        function ArenaWholePop() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaWholePopSkin.exml";
            return _this;
        }
        ArenaWholePop.prototype.dataChanged = function () {
        };
        ArenaWholePop.prototype.setInfo = function (titleInfo) {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
                .then(function (display) {
                display.width = _this.groupClip.width;
                display.height = _this.groupClip.height;
                display.x = _this.groupClip.width / 2;
                display.y = _this.groupClip.height / 2;
                _this.groupClip.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            var itemSet = zj.PlayerItemSystem.Set(titleInfo.goodsId, 1, titleInfo.count);
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelName.text = itemSet.Info.name;
            this.labelNumber.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wonderland.fruit_cnt_label, titleInfo.count);
            this.labelInfo.text = itemSet.Info.des;
            this.imgLogo.source = zj.cachekey(itemSet.Info.logo, this);
            this.labelInfo.text = itemSet.Info.effect;
        };
        return ArenaWholePop;
    }(zj.UI));
    zj.ArenaWholePop = ArenaWholePop;
    __reflect(ArenaWholePop.prototype, "zj.ArenaWholePop");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaWholePop.js.map