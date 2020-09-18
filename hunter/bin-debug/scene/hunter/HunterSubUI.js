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
     * @author chen xi
     *
     * @date 2018-12-23
     *
     * @class 猎人界面基类
     */
    var HunterSubUI = (function (_super) {
        __extends(HunterSubUI, _super);
        function HunterSubUI() {
            var _this = _super.call(this) || this;
            _this.generalId = null;
            _this._father = null;
            return _this;
        }
        Object.defineProperty(HunterSubUI.prototype, "father", {
            get: function () {
                return this._father;
            },
            set: function (v) {
                this._father = v;
            },
            enumerable: true,
            configurable: true
        });
        HunterSubUI.prototype.setSelected = function (isSelected, generalId, animation) {
            if (animation === void 0) { animation = true; }
            this.generalId = generalId;
            if (isSelected) {
                this.enterAnimation(animation);
                zj.Game.EventManager.event(zj.HUNTER_REFRESH_TIP);
                this.reloadGeneral();
            }
            else {
                this.exitAnimation(animation);
            }
        };
        HunterSubUI.prototype.enterAnimation = function (animation) {
            var _this = this;
            if (animation === void 0) { animation = true; }
            if (this.groupMain.visible == true)
                return;
            var width = zj.UIManager.StageWidth;
            var destX = width * 0.5 * (1 - 0.15);
            if (animation) {
                egret.Tween.get(this.groupMain)
                    .call(function () {
                    _this.groupMain.visible = true;
                }, this)
                    .to({ x: width }, 0)
                    .to({ x: destX, alpha: 1 }, 100, egret.Ease.quartOut)
                    .call(function () {
                    zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: egret.getQualifiedClassName(_this) });
                    zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                });
                // .wait(50);
                // .to({ alpha: 1 }, 100);
            }
            else {
                this.groupMain.visible = true;
                this.groupMain.x = destX;
                this.groupMain.alpha = 1;
                zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: egret.getQualifiedClassName(this) });
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }
        };
        HunterSubUI.prototype.exitAnimation = function (animation) {
            var _this = this;
            if (animation === void 0) { animation = true; }
            if (this.groupMain.visible == false)
                return;
            if (animation) {
                var width = zj.UIManager.StageWidth;
                egret.Tween.get(this.groupMain)
                    .to({ x: width }, 100, egret.Ease.quartIn)
                    .to({ alpha: 0 }, 100)
                    .call(function () {
                    _this.groupMain.visible = false;
                    zj.Game.EventManager.event(zj.GameEvent.CLOSE_UI, { typeName: egret.getQualifiedClassName(_this) });
                    zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                }, this);
            }
            else {
                this.groupMain.x = zj.UIManager.StageWidth;
                this.groupMain.alpha = 0;
                this.groupMain.visible = false;
                zj.Game.EventManager.event(zj.GameEvent.CLOSE_UI, { typeName: egret.getQualifiedClassName(this) });
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }
        };
        return HunterSubUI;
    }(zj.UI));
    zj.HunterSubUI = HunterSubUI;
    __reflect(HunterSubUI.prototype, "zj.HunterSubUI");
    zj.HUNTER_REFRESH_TIP = "hunter-refresh-tip";
    // 子界面事件类型
    var HunterSubUIEvent;
    (function (HunterSubUIEvent) {
        HunterSubUIEvent[HunterSubUIEvent["Refresh"] = 0] = "Refresh";
        HunterSubUIEvent[HunterSubUIEvent["GoAwaken"] = 1] = "GoAwaken";
        HunterSubUIEvent[HunterSubUIEvent["UnableAwaken"] = 2] = "UnableAwaken"; // 无法觉醒
    })(HunterSubUIEvent = zj.HunterSubUIEvent || (zj.HunterSubUIEvent = {}));
    // 子界面类型
    var HunterSubUIType;
    (function (HunterSubUIType) {
        HunterSubUIType[HunterSubUIType["Detail"] = 0] = "Detail";
        HunterSubUIType[HunterSubUIType["Skill"] = 1] = "Skill";
        HunterSubUIType[HunterSubUIType["Card"] = 2] = "Card";
        HunterSubUIType[HunterSubUIType["Awaken"] = 3] = "Awaken";
        HunterSubUIType[HunterSubUIType["Collection"] = 4] = "Collection";
        HunterSubUIType[HunterSubUIType["Psychic"] = 5] = "Psychic";
    })(HunterSubUIType = zj.HunterSubUIType || (zj.HunterSubUIType = {}));
})(zj || (zj = {}));
//# sourceMappingURL=HunterSubUI.js.map