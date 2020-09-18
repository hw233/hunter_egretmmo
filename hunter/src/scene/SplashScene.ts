namespace zj {
// 闪屏界面

export class SplashScene extends eui.Component {
    private back_img: eui.Image;
    private bar_img: eui.Image;
    private rect_board: eui.Rect;
    private slogan1: eui.Image;
    private slogan2: eui.Image;

    private tick_count = 0;
    private lbLoading: eui.Label;
    private timer: egret.Timer;
    private isRun: boolean;

    private is_closed_splash = false; // 是否已关闭原生闪屏页

    public constructor(stageWidth: number, stageHeight: number) {
        super();
        this.width = stageWidth;
        this.height = stageHeight;

        // 添加背景图片
        this.back_img = new eui.Image();
        this.back_img.horizontalCenter = 0;
        this.back_img.verticalCenter = 0;
        this.addChild(this.back_img);
        egret.ImageLoader.crossOrigin = "anonymous";
        let imgLoader1: egret.ImageLoader = new egret.ImageLoader();
        imgLoader1.once(egret.Event.COMPLETE, this.imgLoadOKHandler1, this);
        let img_name = "loading_splash_qiya.jpg";
        if (Device.isReviewSwitch) img_name = "loading_board_review.jpg";
        if (Device.isCopyright) img_name = "loading_copyright.jpg";
        imgLoader1.load(AppConfig.ProjectUrlRoot + img_name);

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
        this.rect_board = new eui.Rect();
        this.rect_board.percentWidth = 100;
        this.rect_board.height = 50;
        this.rect_board.bottom = 0;
        this.rect_board.horizontalCenter = 0;
        this.rect_board.alpha = 0.5;
        this.addChild(this.rect_board);

        // loading字体
        this.lbLoading = new eui.Label("资源加载中...");
        this.lbLoading.size = 18;
        this.lbLoading.bottom = 22;
        this.lbLoading.width = 120;
        this.lbLoading.horizontalCenter = 0;
        this.lbLoading.textAlign = "center";
        this.lbLoading.verticalAlign = "middle";
        this.addChild(this.lbLoading);

        // 进度条
        let group = new eui.Group();
        group.height = 22;
        group.bottom = 0;
        group.percentWidth = 100;
        group.horizontalCenter = 0;
        this.addChild(group);
        this.bar_img = new eui.Image();
        this.bar_img.bottom = 0;
        this.bar_img.x = 0;
        this.bar_img.percentWidth = 10;
        this.bar_img.scale9Grid = new egret.Rectangle(5, 8, 7, 5);
        group.addChild(this.bar_img);
        egret.ImageLoader.crossOrigin = "anonymous";
        let imgLoader3: egret.ImageLoader = new egret.ImageLoader();
        imgLoader3.once(egret.Event.COMPLETE, this.imgLoadOKHandler3, this);
        imgLoader3.load(AppConfig.ProjectUrlRoot + "loading_bar.png");

        this.isRun = true;
        this.timer = new egret.Timer(100, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            if (this.timer) this.timer.stop();
        }, this);
        this.timer.start();
    }

    private onTimer() {
        if(this.isRun){
            this.tick_count++;
            if (this.tick_count % 5 == 0) {
                let str = "资源加载中";
                let count = this.tick_count % 3;
                for (let i = 0; i <= count; i++) {
                    str += ".";
                }
                this.lbLoading.text = str;
            }
            if (this.bar_img.percentWidth < 100) this.bar_img.percentWidth += 1;
        }
    }

    private imgLoadOKHandler1(evt: egret.Event): void {
        let loader: egret.ImageLoader = evt.currentTarget;
        let bmd: egret.BitmapData = loader.data;
        let texture = new egret.Texture();
        texture._setBitmapData(bmd);
        this.back_img.texture = texture;
        if (this.back_img.height < this.height) {
            let rate = this.height / this.back_img.height;
            this.back_img.width *= rate;
            this.back_img.height *= rate;
        }
        if (this.back_img.width < this.width) {
            let rate2 = this.width / this.back_img.width;
            this.back_img.width *= rate2;
            this.back_img.height *= rate2;
        }
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            let splash = document.getElementById("splash");
            let splash_words1 = document.getElementById("splash_words1");
            let splash_words2 = document.getElementById("splash_words2");
            let splash2 = document.getElementById("splash2");
            let splash3 = document.getElementById("splash3");
            let splash4 = document.getElementById("splash4");
            if (splash) window["document"].body.removeChild(splash);
            if (splash_words1) window["document"].body.removeChild(splash_words1);
            if (splash_words2) window["document"].body.removeChild(splash_words2);
            if (splash2) window["document"].body.removeChild(splash2);
            if (splash3) window["document"].body.removeChild(splash3);
            if (splash4) window["document"].body.removeChild(splash4);
        }

        // 关闭原生闪屏页（如果有的话）
        this.is_closed_splash = true;
        egret.ExternalInterface.call("sendToNative_closeSplash", JSON.stringify({}));
    }

    private imgLoadOKHandler3(evt: egret.Event): void {
        let loader: egret.ImageLoader = evt.currentTarget;
        let bmd: egret.BitmapData = loader.data;
        let texture = new egret.Texture();
        texture._setBitmapData(bmd);
        this.bar_img.texture = texture;
    }

    public setRun(isRun: boolean){
        this.isRun = isRun;
    }

    public close() {
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
        egret.Tween.get(this).wait(500).to({ alpha: 0 }, 1000).call(() => {
            if (this.parent) this.parent.removeChild(this);
        });
    }
}
}