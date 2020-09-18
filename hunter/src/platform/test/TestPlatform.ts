namespace zj {
// 测试环境支持

export class TestPlatform implements Platform {

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return true; // 支持所有的环境
    }

    // 平台名字
    public name(): string {
        return "test";
    }

    public async init() {
        // if (!Device.isReviewSwitch) AppConfig.Channel = "test";
        return new Promise((resolve,reject)=>{
            console.log("test platform init ok");
            resolve();
        });
    }

    // 关闭平台
    public close() {
        if (window && "close" in window) {
            window["close"]();
        }
        return;
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void{
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            var input = document.createElement("input");
            input.value = str;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
            toast_success("复制成功");
        }
    }

    public playVideo(videoName: string): Promise<any> {
        return new Promise((resolve,reject)=>{
            resolve();
            return;
        });
    }

    // 重启
    public restart() {
        if (window && "location" in window && "reload" in window["location"]) {
            window.location.reload(true);
        }
        return;
    }

    // 通知平台资源加载的百分比(0~100)
    public setLoadingProgress(percentage: number) {
        return;
    }

    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        console.log("aonegame platform shared ok");
        toast_success("分享成功");
        return;
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：Aone登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        
        loadUI(AoneLoginDialog)
        .then((dialog: AoneLoginDialog) => {
            dialog.show(UI.SHOW_FILL_OUT);
            dialog.open(callback_success, callback_fail, callback_this);
        })
    }

    // 更新角色信息
    // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
    public updateRole(type: string) {
        return;
    }

    // 获取程序启动参数
    public getOption(key: string): string {
        let result = egret.getOption(key);
        if (result == undefined || result == null) return "";
        return result;
    }

    // 获取程序启动场景信息
    // 类似于 scene=1038  或scene=1037&appid=123456
    public getScene(): string {
        return "";
    }

    // 显示游戏圈(游戏论坛)按钮
    public showClubButton(): void {
        return; // 不支持
    }

    // 隐藏游戏圈(游戏论坛)按钮
    public hideClubButton(): void {
        return; // 不支持
    }

    // 短时间振动(15ms)
    public vibrateShort(): void {
        return; // 不支持
    }

    // 较长时间振动(400ms)
    public vibrateLong(): void {
        return; // 不支持
    }

    public pay(productID: string, productNum: number, developerPayload?: string) {
        toast_warning("暂不支持支付功能");
        Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            console.log("aone platform not support RewardedVideoAd");
            reject("暂不支持视频激励广告功能");
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            console.log("aone platform not support BannerAd");
            reject("暂不支持Banner广告功能");
        });
    }

    public hideBannerAd() {
        return;
    }
}
window['TestPlatform'] = TestPlatform;
}