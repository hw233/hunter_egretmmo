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
     * 剧情
     * zhaiweili
     */
    var PlotMain = (function (_super) {
        __extends(PlotMain, _super);
        function PlotMain() {
            var _this = _super.call(this) || this;
            _this.thisObj = null;
            _this.skinName = "resource/skins/plot/PlotMainSkin.exml";
            return _this;
        }
        PlotMain.prototype.initData = function (items, callback, thisObj) {
            if (callback === void 0) { callback = null; }
            if (thisObj === void 0) { thisObj = null; }
            this.isAni = false;
            this.isClose = false;
            this.items = items;
            this.callback = callback;
            this.thisObj = thisObj;
            this.plotIdx = 0;
            for (var i = 0; i < items.length; ++i) {
                var list = zj.StoryDialog.getPlotCacheImg(items[i]);
                zj.cachekeys(list, this);
            }
            this.plotPanel = zj.newUI(zj.PlotInfo);
            this.plotPanel.setOwner(this);
            this.groupPlot.addChild(this.plotPanel);
            this.addEvent();
            if (this.checkPlotStart()) {
                return true;
            }
            this.onClose();
            return false;
        };
        PlotMain.prototype.checkPlotStart = function () {
            while (this.plotIdx < this.items.length) {
                if (this.items[this.plotIdx]) {
                    if (this.plotPanel.setInfo(this.items[this.plotIdx])) {
                        return true;
                    }
                    console.error("Plot main checkPlotStart error: " + this.items[this.plotIdx].id);
                }
                else {
                    console.error("Plot main checkPlotStart null: " + this.plotIdx);
                }
                ++this.plotIdx;
            }
            return false;
        };
        PlotMain.prototype.addEvent = function () {
            this.btnSkip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkip, this);
            this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnContinue, this);
        };
        PlotMain.prototype.clearEvent = function () {
            this.btnSkip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkip, this);
            this.groupTouch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnContinue, this);
        };
        // 显示对话框
        PlotMain.prototype.showDialog = function (animation) {
            var _this = this;
            this.isAni = true;
            this.width = zj.UIManager.StageWidth;
            this.height = zj.UIManager.StageHeight;
            this.alpha = 0;
            zj.Game.UIManager.GroupStory.addChild(this);
            var tw = egret.Tween.get(this)
                .to({ alpha: 1 }, 600)
                .wait(400)
                .call(function () {
                egret.Tween.removeTweens(_this);
                _this.plotPanel.onStart();
                _this.isAni = false;
            });
        };
        // 关闭对话框
        PlotMain.prototype.closeDialog = function (animation) {
            if (this.parent)
                this.parent.removeChild(this);
            zj.Game.UIManager.removeCacheResouce(this); // 移除UI缓存资源到待释放队列
            zj.Game.UIManager.GroupStory.removeChildren();
            if (this.callback) {
                this.callback.call(this.thisObj);
                this.callback = null;
            }
        };
        PlotMain.prototype.notifyPlotFinish = function () {
            var _this = this;
            if (++this.plotIdx < this.items.length) {
                this.isAni = true;
                egret.Tween.get(this.plotPanel)
                    .to({ alpha: 0 }, 800)
                    .wait(400)
                    .call(function () {
                    egret.Tween.removeTweens(_this.plotPanel);
                    _this.isAni = false;
                    if (_this.checkPlotStart()) {
                        _this.plotPanel.alpha = 1;
                        _this.plotPanel.onStart();
                        return true;
                    }
                    _this.onClose();
                });
            }
            else {
                this.onClose();
            }
        };
        PlotMain.prototype.onBtnContinue = function () {
            if (!this.isAni) {
                this.plotPanel.onContinue();
            }
        };
        PlotMain.prototype.onBtnSkip = function () {
            if (!this.isAni) {
                this.onClose();
            }
        };
        PlotMain.prototype.onClose = function () {
            var _this = this;
            if (!this.isClose) {
                console.log("-----------------------关闭剧情界面----------------------");
                this.isClose = true;
                this.clearEvent();
                this.isAni = true;
                egret.Tween.get(this)
                    .to({ alpha: 0 }, 600)
                    .call(function () {
                    egret.Tween.removeTweens(_this);
                    _this.closeDialog();
                    zj.Story.bFinish = false;
                    zj.Teach.DoOperateTeach();
                    _this.isAni = false;
                });
            }
        };
        return PlotMain;
    }(zj.Dialog));
    zj.PlotMain = PlotMain;
    __reflect(PlotMain.prototype, "zj.PlotMain");
})(zj || (zj = {}));
//# sourceMappingURL=PlotMain.js.map