namespace zj {
// 加载界面

export class LoadingScene extends Scene {
    private back_img: eui.Image;
    private bar_img: eui.Image;
    private rect_board: eui.Rect;
    private tick_count = 0;
    private lbLoading: eui.Label;
    private timer: egret.Timer;

    private process = 0; // 进度百分比

    public constructor() {
        super();
        this.skinName = "resource/skins/login/LoadingSceneSkin.exml";

        let back_width = 1344;
        let back_height = 640;
        let rate1 = back_width / UIManager.StageWidth;
        let rate2 = back_height / UIManager.StageHeight;
        let rate = rate1;
        if (rate2 < rate1) rate = rate2;
        this.back_img.width = back_width / rate;
        this.back_img.height = back_height / rate;

        this.timer = new egret.Timer(100, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            if (this.timer) this.timer.stop();
        }, null);
        this.timer.start();
    }

    private onTimer() {
        this.tick_count++;
        if (this.tick_count % 5 == 0) {
            let str = "资源加载中";
            let count = this.tick_count % 3;
            for (let i = 0; i <= count; i++) {
                str += ".";
            }
            this.lbLoading.text = str;
        }

        let process = (Game.ConfigManager.loadProgress + Game.ConfigManager.parseProgress) / (Game.ConfigManager.loadCount * 2);
        if (process > this.process) this.process = process;
        if (this.process > 0.95) this.process = 0.95;
        this.bar_img.percentWidth = this.process * 100;
    }

    public close() {
    }
}
}