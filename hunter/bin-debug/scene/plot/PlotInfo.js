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
    var PlotInfo = (function (_super) {
        __extends(PlotInfo, _super);
        function PlotInfo() {
            return _super.call(this) || this;
        }
        PlotInfo.prototype.setOwner = function (owner) {
            this.owner = owner;
        };
        PlotInfo.prototype.setInfo = function (item) {
            if (item) {
                this.item = item;
                this.stepIdx = 0;
                this.stepState = 0;
                this.skinName = "resource/skins/plot/PlotSkin" + item.content + ".exml";
                return this.parseItem();
            }
            return false;
        };
        PlotInfo.prototype.parseItem = function () {
            this.imgBacks = [];
            this.imgTalks = [];
            var idx = 0;
            var isHas = true;
            while (isHas) {
                var backId = "img_back_" + idx;
                var talkId = "img_talk_" + idx;
                if (this[backId]) {
                    this.imgBacks[idx] = this[backId];
                }
                if (this[talkId]) {
                    this.imgTalks[idx] = this[talkId];
                }
                if (this.imgBacks[idx] || this.imgTalks[idx]) {
                    ++idx;
                    this.stepMax = idx;
                }
                else {
                    isHas = false;
                }
            }
            if (this.stepMax > 0) {
                this.onInit();
                return true;
            }
            return false;
        };
        PlotInfo.prototype.onInit = function () {
            this.stepIdx = 0;
            this.stepState = 0;
            for (var i = 0; i < this.stepMax; ++i) {
                this.setImgInit(this.imgBacks[i], this.imgTalks[i]);
            }
        };
        PlotInfo.prototype.setImgInit = function (imgBack, imgTalk) {
            if (imgBack) {
                imgBack.visible = false;
                imgBack.alpha = 0;
            }
            if (imgTalk) {
                imgTalk.visible = false;
                imgTalk.alpha = 0;
            }
        };
        PlotInfo.prototype.setImgAni = function (imgBack, imgTalk) {
            var _this = this;
            if (imgBack) {
                imgBack.visible = true;
                imgBack.alpha = 0;
                var twb = egret.Tween.get(imgBack)
                    .to({ alpha: 1 }, PlotInfo.time_show)
                    .call(function () {
                    egret.Tween.removeTweens(imgBack);
                    _this.setImgWait();
                });
            }
            if (imgTalk) {
                imgTalk.visible = true;
                imgTalk.alpha = 0;
                var twt = egret.Tween.get(imgTalk)
                    .to({ alpha: 1 }, PlotInfo.time_show)
                    .call(function () {
                    egret.Tween.removeTweens(imgTalk);
                    if (!imgBack) {
                        _this.setImgWait();
                    }
                });
            }
            this.currImgBack = imgBack;
            this.currImgTalk = imgTalk;
        };
        PlotInfo.prototype.setImgShow = function (imgBack, imgTalk) {
            if (imgBack) {
                egret.Tween.removeTweens(imgBack);
                imgBack.alpha = 1;
            }
            if (imgTalk) {
                egret.Tween.removeTweens(imgTalk);
                imgTalk.alpha = 1;
            }
            this.setImgWait();
        };
        PlotInfo.prototype.setImgWait = function () {
            var _this = this;
            var waitTime = this.stepIdx >= this.stepMax - 1 ? PlotInfo.time_wait * 1.5 : PlotInfo.time_wait;
            var tw = egret.Tween.get(this)
                .wait(waitTime)
                .call(function () {
                _this.setClearWait();
            });
            this.stepState = 1;
        };
        PlotInfo.prototype.setClearWait = function () {
            egret.Tween.removeTweens(this);
            this.next();
        };
        PlotInfo.prototype.onStart = function () {
            this.stepIdx = 0;
            this.onPlayStep();
        };
        PlotInfo.prototype.onPlayStep = function () {
            this.setImgAni(this.imgBacks[this.stepIdx], this.imgTalks[this.stepIdx]);
            this.stepState = 0;
        };
        PlotInfo.prototype.onContinue = function () {
            switch (this.stepState) {
                case 0:
                    this.setImgShow(this.currImgBack, this.currImgTalk);
                    break;
                case 1:
                    this.setClearWait();
                    if (this.stepIdx < this.stepMax) {
                        this.setImgShow(this.currImgBack, this.currImgTalk);
                    }
                    break;
            }
        };
        PlotInfo.prototype.next = function () {
            if (this.stepIdx < this.stepMax - 1) {
                ++this.stepIdx;
                this.onPlayStep();
            }
            else {
                this.owner.notifyPlotFinish();
            }
        };
        PlotInfo.time_show = 800; // 剧情图片出现的动画时间
        PlotInfo.time_wait = 2200; // 剧情出现后的等待时间
        return PlotInfo;
    }(zj.UI));
    zj.PlotInfo = PlotInfo;
    __reflect(PlotInfo.prototype, "zj.PlotInfo");
})(zj || (zj = {}));
//# sourceMappingURL=PlotInfo.js.map