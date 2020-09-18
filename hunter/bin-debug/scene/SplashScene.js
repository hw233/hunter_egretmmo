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
    // 闪屏界面
    var SplashScene = (function (_super) {
        __extends(SplashScene, _super);
        function SplashScene(stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.tick_count = 0;
            _this.is_closed_splash = false; // 是否已关闭原生闪屏页
            _this.width = stageWidth;
            _this.height = stageHeight;
            // 添加背景图片
            _this.back_img = new eui.Image();
            _this.back_img.horizontalCenter = 0;
            _this.back_img.verticalCenter = 0;
            _this.addChild(_this.back_img);
            egret.ImageLoader.crossOrigin = "anonymous";
            var imgLoader1 = new egret.ImageLoader();
            imgLoader1.once(egret.Event.COMPLETE, _this.imgLoadOKHandler1, _this);
            var img_name = "loading_splash_qiya.jpg";
            if (zj.Device.isReviewSwitch)
                img_name = "loading_board_review.jpg";
            if (zj.Device.isCopyright)
                img_name = "loading_copyright.jpg";
            imgLoader1.load(zj.AppConfig.ProjectUrlRoot + img_name);
            // 添加slogan
            //<e:Image source="ui_login_Android_lrsjh5_Logo_png" horizontalCenter="-102.5" scaleX="0.5" scaleY="0.5" bottom="179"/>
            //<e:Image source="ui_login_ButtonKnowNor_png" horizontalCenter="245" bottom="169"/>
            // this.slogan1 = new eui.Image();
            // this.slogan1.horizontalCenter = -250;
            // this.slogan1.bottom = 50;
            // this.slogan1.scaleX = 0.8;
            // this.slogan1.scaleY = 0.8;
            // this.addChild(this.slogan1);
            // let imgLoader4: egret.ImageLoader = new egret.ImageLoader();
            // imgLoader4.once(egret.Event.COMPLETE, (evt: egret.Event)=>{
            //     let loader: egret.ImageLoader = evt.currentTarget;
            //     let bmd: egret.BitmapData = loader.data;
            //     let texture = new egret.Texture();
            //     texture._setBitmapData(bmd);
            //     this.slogan1.texture = texture;
            // }, this);
            // imgLoader4.load(AppConfig.ProjectUrlRoot + "loading_words1.png");
            // this.slogan2 = new eui.Image();
            // this.slogan2.horizontalCenter = 200;
            // this.slogan2.bottom = 50;
            // this.slogan2.scaleX = 0.8;
            // this.slogan2.scaleY = 0.8;
            // this.addChild(this.slogan2);
            // let imgLoader5: egret.ImageLoader = new egret.ImageLoader();
            // imgLoader5.once(egret.Event.COMPLETE, (evt: egret.Event)=>{
            //     let loader: egret.ImageLoader = evt.currentTarget;
            //     let bmd: egret.BitmapData = loader.data;
            //     let texture = new egret.Texture();
            //     texture._setBitmapData(bmd);
            //     this.slogan2.texture = texture;
            // }, this);
            // imgLoader5.load(AppConfig.ProjectUrlRoot + "loading_words2.png");
            // 添加半透明背景
            _this.rect_board = new eui.Rect();
            _this.rect_board.percentWidth = 100;
            _this.rect_board.height = 50;
            _this.rect_board.bottom = 0;
            _this.rect_board.horizontalCenter = 0;
            _this.rect_board.alpha = 0.5;
            _this.addChild(_this.rect_board);
            // loading字体
            _this.lbLoading = new eui.Label("资源加载中...");
            _this.lbLoading.size = 18;
            _this.lbLoading.bottom = 22;
            _this.lbLoading.width = 120;
            _this.lbLoading.horizontalCenter = 0;
            _this.lbLoading.textAlign = "center";
            _this.lbLoading.verticalAlign = "middle";
            _this.addChild(_this.lbLoading);
            // 进度条
            var group = new eui.Group();
            group.height = 22;
            group.bottom = 0;
            group.percentWidth = 100;
            group.horizontalCenter = 0;
            _this.addChild(group);
            _this.bar_img = new eui.Image();
            _this.bar_img.bottom = 0;
            _this.bar_img.x = 0;
            _this.bar_img.percentWidth = 10;
            _this.bar_img.scale9Grid = new egret.Rectangle(5, 8, 7, 5);
            group.addChild(_this.bar_img);
            egret.ImageLoader.crossOrigin = "anonymous";
            var imgLoader3 = new egret.ImageLoader();
            imgLoader3.once(egret.Event.COMPLETE, _this.imgLoadOKHandler3, _this);
            imgLoader3.load(zj.AppConfig.ProjectUrlRoot + "loading_bar.png");
            _this.isRun = true;
            _this.timer = new egret.Timer(100, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.onTimer, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
            }, _this);
            _this.timer.start();
            return _this;
        }
        SplashScene.prototype.onTimer = function () {
            if (this.isRun) {
                this.tick_count++;
                if (this.tick_count % 5 == 0) {
                    var str = "资源加载中";
                    var count = this.tick_count % 3;
                    for (var i = 0; i <= count; i++) {
                        str += ".";
                    }
                    this.lbLoading.text = str;
                }
                if (this.bar_img.percentWidth < 100)
                    this.bar_img.percentWidth += 1;
            }
        };
        SplashScene.prototype.imgLoadOKHandler1 = function (evt) {
            var loader = evt.currentTarget;
            var bmd = loader.data;
            var texture = new egret.Texture();
            texture._setBitmapData(bmd);
            this.back_img.texture = texture;
            if (this.back_img.height < this.height) {
                var rate = this.height / this.back_img.height;
                this.back_img.width *= rate;
                this.back_img.height *= rate;
            }
            if (this.back_img.width < this.width) {
                var rate2 = this.width / this.back_img.width;
                this.back_img.width *= rate2;
                this.back_img.height *= rate2;
            }
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var splash = document.getElementById("splash");
                var splash_words1 = document.getElementById("splash_words1");
                var splash_words2 = document.getElementById("splash_words2");
                var splash2 = document.getElementById("splash2");
                var splash3 = document.getElementById("splash3");
                var splash4 = document.getElementById("splash4");
                if (splash)
                    window["document"].body.removeChild(splash);
                if (splash_words1)
                    window["document"].body.removeChild(splash_words1);
                if (splash_words2)
                    window["document"].body.removeChild(splash_words2);
                if (splash2)
                    window["document"].body.removeChild(splash2);
                if (splash3)
                    window["document"].body.removeChild(splash3);
                if (splash4)
                    window["document"].body.removeChild(splash4);
            }
            // 关闭原生闪屏页（如果有的话）
            this.is_closed_splash = true;
            egret.ExternalInterface.call("sendToNative_closeSplash", JSON.stringify({}));
        };
        SplashScene.prototype.imgLoadOKHandler3 = function (evt) {
            var loader = evt.currentTarget;
            var bmd = loader.data;
            var texture = new egret.Texture();
            texture._setBitmapData(bmd);
            this.bar_img.texture = texture;
        };
        SplashScene.prototype.setRun = function (isRun) {
            this.isRun = isRun;
        };
        SplashScene.prototype.close = function () {
            var _this = this;
            if (!this.is_closed_splash) {
                // 关闭原生闪屏页（如果有的话）
                this.is_closed_splash = true;
                egret.ExternalInterface.call("sendToNative_closeSplash", JSON.stringify({}));
            }
            this.bar_img.percentWidth = 100;
            egret.Tween.get(this.back_img).to({ alpha: 0 }, 500);
            // egret.Tween.get(this.slogan1).to({ alpha: 0 }, 500);
            // egret.Tween.get(this.slogan2).to({ alpha: 0 }, 500);
            egret.Tween.get(this.bar_img).to({ alpha: 0 }, 500);
            egret.Tween.get(this.lbLoading).to({ alpha: 0 }, 500);
            egret.Tween.get(this.rect_board).to({ alpha: 0 }, 500);
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            // 背景加一个渐隐的动画
            egret.Tween.get(this).wait(500).to({ alpha: 0 }, 1000).call(function () {
                if (_this.parent)
                    _this.parent.removeChild(_this);
            });
        };
        return SplashScene;
    }(eui.Component));
    zj.SplashScene = SplashScene;
    __reflect(SplashScene.prototype, "zj.SplashScene");
})(zj || (zj = {}));
//# sourceMappingURL=SplashScene.js.map