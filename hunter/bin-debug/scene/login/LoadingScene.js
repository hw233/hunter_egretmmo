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
    // 加载界面
    var LoadingScene = (function (_super) {
        __extends(LoadingScene, _super);
        function LoadingScene() {
            var _this = _super.call(this) || this;
            _this.tick_count = 0;
            _this.process = 0; // 进度百分比
            _this.skinName = "resource/skins/login/LoadingSceneSkin.exml";
            var back_width = 1344;
            var back_height = 640;
            var rate1 = back_width / zj.UIManager.StageWidth;
            var rate2 = back_height / zj.UIManager.StageHeight;
            var rate = rate1;
            if (rate2 < rate1)
                rate = rate2;
            _this.back_img.width = back_width / rate;
            _this.back_img.height = back_height / rate;
            _this.timer = new egret.Timer(100, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.onTimer, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            _this.timer.start();
            return _this;
        }
        LoadingScene.prototype.onTimer = function () {
            this.tick_count++;
            if (this.tick_count % 5 == 0) {
                var str = "资源加载中";
                var count = this.tick_count % 3;
                for (var i = 0; i <= count; i++) {
                    str += ".";
                }
                this.lbLoading.text = str;
            }
            var process = (zj.Game.ConfigManager.loadProgress + zj.Game.ConfigManager.parseProgress) / (zj.Game.ConfigManager.loadCount * 2);
            if (process > this.process)
                this.process = process;
            if (this.process > 0.95)
                this.process = 0.95;
            this.bar_img.percentWidth = this.process * 100;
        };
        LoadingScene.prototype.close = function () {
        };
        return LoadingScene;
    }(zj.Scene));
    zj.LoadingScene = LoadingScene;
    __reflect(LoadingScene.prototype, "zj.LoadingScene");
})(zj || (zj = {}));
//# sourceMappingURL=LoadingScene.js.map