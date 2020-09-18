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
     * MovieClip 基类
     * 翟伟利
     * 2019.12.10
     */
    var AnimationBody = (function (_super) {
        __extends(AnimationBody, _super);
        function AnimationBody() {
            var _this = _super.call(this) || this;
            _this._mcFactory = new egret.MovieClipDataFactory();
            _this._movieClip = new egret.MovieClip();
            _this._movieClip.addEventListener(egret.Event.COMPLETE, _this.onMovieFinish, _this);
            return _this;
        }
        AnimationBody.prototype.setRes = function (res, actionName, isAutoRemove) {
            if (actionName === void 0) { actionName = null; }
            if (isAutoRemove === void 0) { isAutoRemove = false; }
            this.isPlay = false;
            this._playNum = 1;
            this._actionName = actionName;
            this._frame = "1";
            this.isAutoRemove = isAutoRemove;
            this.isShow = true;
            this.rotation = 0;
            this.onLoadHandler(res);
        };
        AnimationBody.prototype.onLoadHandler = function (res) {
            if (this._resName != res) {
                this._resName = res;
                this.isCompont = false;
                this.loadJsonCount = 0;
                this.loadPngCount = 0;
                this.finishCallback = null;
                this.finishThisObj = null;
                this.removeChildren();
                this.onLoadComplete();
            }
        };
        //加载完成处理
        AnimationBody.prototype.onLoadComplete = function () {
            var resJson = this._resName + "_json";
            var _animJson = RES.getRes(resJson);
            if (!_animJson) {
                if (this.loadJsonCount > 2) {
                    console.error("AnimatioinBody - onLoadComplete - error：res - json：" + resJson);
                    return;
                }
                ++this.loadJsonCount;
                RES.getResAsync(resJson, this.onLoadComplete, this);
                return;
            }
            var resPng = this._resName + "_png";
            var _animTexture = RES.getRes(resPng);
            if (!_animTexture) {
                if (this.loadPngCount > 2) {
                    console.error("模型动画资源出错 Animatioin - onLoadComplete - error：res - texture：" + resPng);
                    return;
                }
                ++this.loadPngCount;
                RES.getResAsync(resPng, this.onLoadComplete, this);
                return;
            }
            this.isCompont = true;
            this.initMovieClip(_animJson, _animTexture);
        };
        AnimationBody.prototype.initMovieClip = function (_animJson, _animTexture) {
            if (this._mcFactory) {
                this._mcFactory.clearCache();
            }
            this._mcFactory.mcDataSet = _animJson;
            this._mcFactory.texture = _animTexture;
            var acName = this._actionName ? this._actionName : this._resName;
            this._movieClip.movieClipData = this._mcFactory.generateMovieClipData(acName);
            if (!this._movieClip.parent) {
                this.addChild(this._movieClip);
            }
            this.checkPlay();
        };
        AnimationBody.prototype.setAutoRemove = function (isAutoRemove) {
            this.isAutoRemove = isAutoRemove;
        };
        AnimationBody.prototype.setBlendMode = function (type) {
            if (type === void 0) { type = egret.BlendMode.ADD; }
            zj.Util.setBlendMode(this._movieClip, type);
        };
        AnimationBody.prototype.setFinishCallback = function (func, thisObj) {
            this.finishCallback = func;
            this.finishThisObj = thisObj;
        };
        AnimationBody.prototype.onPlayFrame = function (frame, num) {
            if (num === void 0) { num = -1; }
            this._frame = frame ? frame : "1";
            this.onPlay(num);
        };
        AnimationBody.prototype.onPlay = function (num) {
            if (num === void 0) { num = -1; }
            this._playNum = num;
            this.isPlay = true;
            this.checkPlay();
        };
        AnimationBody.prototype.checkPlay = function () {
            if (this.isCompont && this.isShow && this.isPlay) {
                if (!this._movieClip || !this._movieClip.parent) {
                    return;
                }
                try {
                    this._movieClip.visible = true;
                    this._movieClip.gotoAndPlay(this._frame, this._playNum);
                }
                catch (e) {
                    console.error("AnimationBody - checkPlay - error：res：" + this._resName + " -> " + this._frame);
                }
            }
        };
        AnimationBody.prototype.onMovieFinish = function () {
            if (this.isAutoRemove) {
                this.onRelease();
            }
            if (this.finishCallback) {
                this.finishCallback.call(this.finishThisObj);
                this.finishCallback = null;
                this.finishThisObj = null;
            }
        };
        AnimationBody.prototype.onRelease = function () {
            this.isShow = false;
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.rotation = 0;
            this.x = this.y = 0;
            zj.Game.AnimationManager.return(this);
        };
        return AnimationBody;
    }(egret.DisplayObjectContainer));
    zj.AnimationBody = AnimationBody;
    __reflect(AnimationBody.prototype, "zj.AnimationBody");
})(zj || (zj = {}));
//# sourceMappingURL=AnimationBody.js.map