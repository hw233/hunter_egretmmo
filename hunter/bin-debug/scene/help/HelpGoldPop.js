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
    // HXH_GoldPop
    // wang shen zhuo
    // 2019/1/3
    var HelpGoldPop = (function (_super) {
        __extends(HelpGoldPop, _super);
        function HelpGoldPop() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/help/GoldPopSkin.exml";
            _this.groupClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            // this.addAnimatoin("ui_tongyong_daojuguang","armatureName", null, 0);
            _this.addAnimatoin("ui_tongyong_beijingguang", "armatureName", "003_beijingguang_04", 0);
            return _this;
        }
        HelpGoldPop.prototype.SetInfo = function (money, multiple, father) {
            zj.Game.SoundManager.playEffect(this.SoundOpen(30021));
            this.labelTime.text = multiple;
            this.labelNum.text = zj.Set.NumberUnit3(money);
        };
        HelpGoldPop.prototype.onBtnClose = function () {
            this.close();
        };
        //添加龙骨动画
        HelpGoldPop.prototype.addAnimatoin = function (dbName, armatureName, animationName, playTimes) {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = _this.groupAnimate.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = _this.groupAnimate.explicitHeight / 2;
                _this.groupAnimate.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        HelpGoldPop.prototype.SoundOpen = function (id) {
            var sound = zj.TableClientSoundResource.Item(id);
            var textDrop = sound.sound_path;
            var strs = new Array();
            strs = textDrop.split("/");
            var soundtext = strs[2];
            soundtext = soundtext.replace('.', '_');
            return soundtext;
        };
        return HelpGoldPop;
    }(zj.Dialog));
    zj.HelpGoldPop = HelpGoldPop;
    __reflect(HelpGoldPop.prototype, "zj.HelpGoldPop");
})(zj || (zj = {}));
//# sourceMappingURL=HelpGoldPop.js.map