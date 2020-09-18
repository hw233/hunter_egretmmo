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
     * 战斗力提示
     */
    var CommonTipBmfont = (function (_super) {
        __extends(CommonTipBmfont, _super);
        function CommonTipBmfont() {
            var _this = _super.call(this) || this;
            _this.oldValue = 500000;
            _this.newValue = 999999;
            _this.vis = true;
            _this.time = 0;
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.skinName = "resource/skins/common/Common_TipBmfontSkin.exml";
            _this.addEventListener(egret.Event.ACTIVATE, function () {
                _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            }, _this);
            _this.addEventListener(egret.Event.DEACTIVATE, function () {
                _this.removeEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            }, _this);
            egret.Tween.get(_this).wait(800).call(function () {
                _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            });
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
                _this.removeEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
            }, _this);
            _this.groupmain.alpha = 1;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            return _this;
        }
        CommonTipBmfont.prototype.setInfo = function (oldValue, newValue) {
            this.oldValue = oldValue;
            this.newValue = newValue;
            this.lableDes.text = "" + this.oldValue;
            if (oldValue > newValue || newValue >= 10000000) {
                this.vis = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
                this.close();
            }
        };
        CommonTipBmfont.prototype.update = function () {
            this.time++;
            if (this.oldValue == this.newValue) {
                this.groupmain.y -= 3;
                this.groupmain.alpha -= 0.05;
            }
            if (this.time > 2) {
                this.time = 0;
            }
            else {
                return;
            }
            if (this.vis == true) {
                if (this.oldValue % 10 != this.newValue % 10) {
                    this.oldValue++;
                    if (this.oldValue % 10 > 9) {
                        this.oldValue % 10 === 0;
                    }
                }
                else if (this.oldValue % 100 != this.newValue % 100) {
                    this.oldValue += 10;
                    if (this.oldValue % 10 > 9) {
                        this.oldValue % 10 === 0;
                    }
                }
                else if (this.oldValue % 1000 != this.newValue % 1000) {
                    this.oldValue += 100;
                    if (this.oldValue % 100 > 9) {
                        this.oldValue % 100 === 0;
                    }
                }
                else if (this.oldValue % 10000 != this.newValue % 10000) {
                    this.oldValue += 1000;
                    if (this.oldValue % 1000 > 9) {
                        this.oldValue % 1000 === 0;
                    }
                }
                else if (this.oldValue % 100000 != this.newValue % 100000) {
                    this.oldValue += 10000;
                    if (this.oldValue % 10000 > 9) {
                        this.oldValue % 10000 === 0;
                    }
                }
                else if (this.oldValue % 1000000 != this.newValue % 1000000) {
                    this.oldValue += 100000;
                    if (this.oldValue % 100000 > 9) {
                        this.oldValue % 100000 === 0;
                    }
                }
                else {
                    if (this.groupmain.alpha <= 0) {
                        // this.parent.removeChild(this);
                        this.vis = false;
                        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
                        this.close();
                    }
                }
                this.lableDes.text = "" + this.oldValue;
            }
        };
        /**
         * 战斗力提示
         * @param oldValue 就值
         * @param newValue 新值
         */
        CommonTipBmfont.promptBattleValue = function (oldValue, newValue) {
            var tip = new CommonTipBmfont();
            tip.setInfo(oldValue, newValue);
            zj.Game.UIManager.AnimationGroup.addChild(tip);
        };
        return CommonTipBmfont;
    }(zj.UI));
    zj.CommonTipBmfont = CommonTipBmfont;
    __reflect(CommonTipBmfont.prototype, "zj.CommonTipBmfont");
})(zj || (zj = {}));
//# sourceMappingURL=Common_TipBmfont.js.map