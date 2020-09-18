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
    // 转圈等待动画
    // guosh
    var NetLoading = (function (_super) {
        __extends(NetLoading, _super);
        function NetLoading() {
            var _this = _super.call(this) || this;
            _this.display = null; // 动画
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.verticalCenter = 0;
            _this.horizontalCenter = 0;
            // 添加半透明背景
            _this.rect_mask = zj.Util.getMaskImgBlack(zj.UIManager.StageWidth, zj.UIManager.StageHeight);
            _this.rect_mask.alpha = 0;
            _this.rect_mask.verticalCenter = 0;
            _this.rect_mask.horizontalCenter = 0;
            _this.addChild(_this.rect_mask);
            // 增加动画
            zj.Game.DragonBonesManager.getArmatureDisplayAsync(_this, "ui_tongyong_loading")
                .then(function (display) {
                _this.display = display;
                _this.display.x = _this.width / 2;
                _this.display.y = _this.height / 2;
                _this.addChild(_this.display);
                _this.display.animation.play("002_jiazai_3", 0);
            });
            return _this;
        }
        return NetLoading;
    }(eui.Component));
    zj.NetLoading = NetLoading;
    __reflect(NetLoading.prototype, "zj.NetLoading");
})(zj || (zj = {}));
//# sourceMappingURL=NetLoading.js.map