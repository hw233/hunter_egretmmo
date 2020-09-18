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
    var AdventureOpenAni = (function (_super) {
        __extends(AdventureOpenAni, _super);
        function AdventureOpenAni() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/adventure/AdventureOpenAniSkin.exml";
            _this.width = 320;
            _this.height = 116;
            return _this;
        }
        AdventureOpenAni.prototype.startAni = function (type, data, callback, thisobj) {
            this.callback = callback;
            this.thisobj = thisobj;
            this.lbName.text = data.area_id + "." + data.area_name;
            this.imgFontMask.visible = false;
            this.imgIcon.visible = false;
            this.currentState = "open" + type;
            this.group.scaleX = this.group.scaleY = 0;
            // 整体放大
            var time = 500;
            var tw = egret.Tween.get(this.group);
            zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30069), 500);
            tw.to({ scaleX: 1, scaleY: 1 }, 1 * time, egret.Ease.backOut);
            tw.wait(200);
            tw.call(this.aniFinish1, this);
        };
        AdventureOpenAni.prototype.aniFinish1 = function () {
            egret.Tween.removeTweens(this.group);
            // new图标放大
            this.imgIcon.scaleX = this.imgIcon.scaleY = 0;
            this.imgIcon.visible = true;
            var tw = egret.Tween.get(this.imgIcon);
            var time = 300;
            tw.to({ scaleX: 1.3, scaleY: 1.3 }, 1 * time);
            tw.to({ scaleX: 0.7, scaleY: 0.7 }, 0.6 * time);
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 0.4 * time);
            tw.to({ scaleX: 1, scaleY: 1 }, 0.1 * time);
            tw.wait(200);
            tw.call(this.aniFinish2, this);
        };
        AdventureOpenAni.prototype.aniFinish2 = function () {
            egret.Tween.removeTweens(this.imgIcon);
            // new mission文字闪烁
            this.imgFontMask.alpha = 0;
            this.imgFontMask.visible = true;
            var tw = egret.Tween.get(this.imgFontMask);
            tw.to({ alpha: 1 }, 300);
            tw.wait(300);
            tw.to({ alpha: 0 }, 400);
            tw.wait(600);
            tw.call(this.aniFinishAll, this);
        };
        AdventureOpenAni.prototype.aniFinishAll = function () {
            egret.Tween.removeTweens(this.imgFontMask);
            this.close();
            if (this.callback && this.thisobj) {
                this.callback.call(this.thisobj);
            }
        };
        return AdventureOpenAni;
    }(zj.UI));
    zj.AdventureOpenAni = AdventureOpenAni;
    __reflect(AdventureOpenAni.prototype, "zj.AdventureOpenAni");
})(zj || (zj = {}));
//# sourceMappingURL=AdventureOpenAni.js.map