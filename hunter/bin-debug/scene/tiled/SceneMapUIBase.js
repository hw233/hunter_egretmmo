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
     * 地图UI基类
     * zhaiweili
     * 2019.10.24
     */
    var SceneMapUIBase = (function (_super) {
        __extends(SceneMapUIBase, _super);
        function SceneMapUIBase() {
            var _this = _super.call(this) || this;
            _this.timerNum = 0;
            _this.Ticktimer = 0;
            _this.onSkinName();
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            return _this;
        }
        SceneMapUIBase.prototype.onSkinName = function () {
        };
        SceneMapUIBase.prototype.onInit = function () {
            // Game.UIManager.openWaitingUI();
            // Game.EventManager.event(GameEvent.OPEN_LOGING_SCENE);
        };
        SceneMapUIBase.prototype.onLoadMap = function () {
        };
        // 地图加载完成
        SceneMapUIBase.prototype.mapLoadFinish = function (ani) {
            // Game.UIManager.closeWaitingUI();
            zj.Game.EventManager.event(zj.GameEvent.CLOSE_LOGING_SCENE);
            this.show(ani);
        };
        // 场景进入栈顶
        SceneMapUIBase.prototype.onEntryTopScene = function () {
            if (this.sceneMap) {
                this.sceneMap.onEntryTopScene();
            }
            else {
                egret.error("SceneMapUIBase - onEntryTopScene - error: sceneMap is null");
            }
            this.resize();
            this.addEventListener(egret.Event.RESIZE, this.resize, this);
            // egret.startTick(this.Update, this);
            // egret.Ticker.getInstance().register(this.Update, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
        };
        // 场景离开栈顶
        SceneMapUIBase.prototype.onLeaveTopScene = function () {
            if (this.sceneMap) {
                this.sceneMap.onLeaveTopScene();
            }
            // egret.stopTick(this.Update, this);
            // egret.Ticker.getInstance().unregister(this.Update, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
            this.removeEventListener(egret.Event.RESIZE, this.resize, this);
        };
        SceneMapUIBase.prototype.resize = function () {
            this.width = zj.UIManager.StageWidth;
            this.height = zj.UIManager.StageHeight;
            if (this.sceneMap) {
                this.sceneMap.resize();
            }
        };
        SceneMapUIBase.prototype.enterFrame = function () {
            this.timerNum = (egret.getTimer() - this.Ticktimer) / 1000;
            if (this.timerNum > 0.033) {
                this.timerNum = 0.033;
            }
            this.Update(this.timerNum);
            this.Ticktimer = egret.getTimer();
        };
        SceneMapUIBase.prototype.Update = function (tick) {
            tick /= 1000; // 转换为毫秒
            if (this.sceneMap) {
                this.sceneMap.Update(tick);
            }
            return false;
        };
        /**
         * 地图被移出屏幕时调用
         */
        SceneMapUIBase.prototype.onRemoveFromStage = function () {
        };
        return SceneMapUIBase;
    }(zj.Scene));
    zj.SceneMapUIBase = SceneMapUIBase;
    __reflect(SceneMapUIBase.prototype, "zj.SceneMapUIBase");
})(zj || (zj = {}));
//# sourceMappingURL=SceneMapUIBase.js.map