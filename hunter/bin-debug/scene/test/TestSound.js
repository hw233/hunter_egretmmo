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
     * @author 翟伟利
     * @date 2019-12-26
     * @class 音乐测试类
     */
    var TestSound = (function (_super) {
        __extends(TestSound, _super);
        function TestSound() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/test/TestSoundSkin.exml";
            return _this;
        }
        TestSound.prototype.onInit = function () {
            var _this = this;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                _this.close(zj.UI.HIDE_TO_TOP);
            }, this);
            var files = RES["config"].config.fileSystem["fsData"];
            var i = 1;
            for (var key in files) {
                var obj = files[key];
                if (obj.type == "sound") {
                    var label = new eui.Label();
                    label.size = 24;
                    label.text = i + ": " + obj.name + ": " + obj.url;
                    label.name = obj.name;
                    label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchLabel, this);
                    this.group.addChild(label);
                    ++i;
                }
            }
        };
        TestSound.prototype.onTouchLabel = function (e) {
            if (this.tuochLabel) {
                this.tuochLabel.textColor = 0xffffff;
                this.tuochLabel = null;
            }
            this.tuochLabel = e.target;
            this.tuochLabel.textColor = 0xFF00;
            var sound = this.tuochLabel.name;
            console.log(sound);
            zj.Game.SoundManager.playMusic(sound, 1);
            this.labelCurr.text = sound;
        };
        return TestSound;
    }(zj.Dialog));
    zj.TestSound = TestSound;
    __reflect(TestSound.prototype, "zj.TestSound");
})(zj || (zj = {}));
//# sourceMappingURL=TestSound.js.map