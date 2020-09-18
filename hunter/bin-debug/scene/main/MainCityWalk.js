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
    // 改版主城方向键
    // 翟伟利
    // 2019.11.7
    var MainCityWalk = (function (_super) {
        __extends(MainCityWalk, _super);
        function MainCityWalk() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/main/MainCityWalkSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            return _this;
        }
        MainCityWalk.prototype.init = function (mainCityUI) {
            this.mainCityUI = mainCityUI;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegan, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMoved, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnded, this);
            var centerx = this.groupWalk.left + this.groupWalk.width / 2;
            var centery = this.height - this.groupWalk.bottom - this.groupWalk.width / 2;
            this.posCenter = new egret.Point(centerx, centery);
            this.dotDisMax = (this.groupWalk.width - this.imgDot.width) / 2;
            this._currArc = 0;
            this.imgDot.visible = true;
            this.setUp();
        };
        MainCityWalk.prototype.isTouch = function () {
            return this._isTouch;
        };
        MainCityWalk.prototype.currArc = function () {
            return Math.floor(this._currArc);
        };
        MainCityWalk.prototype.setUp = function () {
            this._isTouch = false;
            this.groupBG.visible = false;
            this.alpha = 0.5;
            this.imgDot.x = this.posCenter.x;
            this.imgDot.y = this.posCenter.y;
        };
        MainCityWalk.prototype.updatePos = function (touchX, touchY) {
            var dis = zj.Util.pDisPoint(this.posCenter.x, this.posCenter.y, touchX, touchY);
            if (dis < 4) {
                return;
            }
            if (dis > this.dotDisMax) {
                var pc = this.dotDisMax / dis;
                this.imgDot.x = this.posCenter.x + (touchX - this.posCenter.x) * pc;
                this.imgDot.y = this.posCenter.y + (touchY - this.posCenter.y) * pc;
            }
            else {
                this.imgDot.x = touchX;
                this.imgDot.y = touchY;
            }
            this._currArc = 180 - zj.Util.angleTo360(this.posCenter.x, this.posCenter.y, touchX, touchY);
            return;
        };
        MainCityWalk.prototype.OnTouchBegan = function (touchs) {
            if (this.mainCityUI.isMapLock()) {
                return;
            }
            this.updatePos(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y);
            this.groupBG.visible = true;
            this.alpha = 1;
            this._isTouch = true;
            this.mainCityUI.onWalkStart();
        };
        MainCityWalk.prototype.OnTouchMoved = function (touchs) {
            if (this._isTouch) {
                this.updatePos(touchs.stageX - zj.Game.UIManager.x, touchs.stageY - zj.Game.UIManager.y);
            }
        };
        MainCityWalk.prototype.OnTouchEnded = function (touchs) {
            this.setUp();
            this.mainCityUI.onWalkEnd();
        };
        return MainCityWalk;
    }(zj.UI));
    zj.MainCityWalk = MainCityWalk;
    __reflect(MainCityWalk.prototype, "zj.MainCityWalk");
})(zj || (zj = {}));
//# sourceMappingURL=MainCityWalk.js.map