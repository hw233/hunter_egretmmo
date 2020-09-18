namespace zj {
    /** 
     * 平台数据接口。
     * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
     * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
     * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
     */
    export declare interface Platform {

        // 平台名字
        name(): string;

        // 初始化平台
        init(): Promise<any>;

        // 关闭平台
        close(): void;

        // 重启游戏
        restart(): void;

        // 通知平台资源加载的百分比(0~100)
        setLoadingProgress(percentage: number): void;

        // 登录
        login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void;

        // 更新角色信息
        // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
        updateRole(type: string);

        // 分享
        // title: 转发标题，不传则默认使用当前小游戏的昵称。
        // imageUrl: 转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4
        // linkUrl: // 分享跳转的url路径(可选)
        // query: 查询字符串, 必须是 key1=val1&key2=val2 的格式
        share(title: string, imageUrl: string, linkUrl: string, query: string): void;

        // 获取程序启动参数
        getOption(key: string): string;

        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        getScene(): string;

        // 显示游戏圈(游戏论坛)按钮
        showClubButton(): void;

        // 隐藏游戏圈(游戏论坛)按钮
        hideClubButton(): void;

        // 短时间振动(15ms)
        vibrateShort(): void;

        // 较长时间振动(400ms)
        vibrateLong(): void;

        // 支付请求
        // productID: 商口唯一ID
        // productNum: 购买数量
        // developerPayload: 开发附加信息
        pay(productID: string, productNum: number, developerPayload?: string);

        // 显示视频激励广告
        showRewardedVideoAd(): Promise<any>;

        // 显示Banner广告
        showBannerAd(): void;

        // 隐藏Banner广告
        hideBannerAd(): void;

        // 复制字符串到剪贴板接口
        setClipboardData(str: string): void;

        // 全屏播放视频
        playVideo(videoName: string): Promise<any>;
    }

    export function initPlatform() {
        console.log("AppConfig.Channel: " + AppConfig.Channel);
        if (AppConfig.Channel == "wxapp") {
            platform = new window['WxAppPlatform']();
        } else if (AppConfig.Channel == "qqgame") {
            platform = new window['QQGamePlatform']();
        } else if (AppConfig.Channel == "baiduapp") {
            platform = new window['BaiduAppPlatform']();
        } else if (AppConfig.Channel == "oppogame") {
            platform = new window['OppoPlatform']();
        } else if (AppConfig.Channel == "vivoqgame") {
            platform = new window['VivoQGamePlatform']();
        } else if (AppConfig.Channel == "xiaomiqgame") {
            platform = new window['XiaoMiQGamePlatform']();
        } else if (AppConfig.Channel == "huaweiqgame") {
            platform = new window['HuaweiGamePlatform']();
        } else if (AppConfig.Channel == "chongchongwgame") {
            platform = new window['ChongchongWebGamePlatform']();
        } else if (AppConfig.Channel == "sinawgame") {
            platform = new window['SinaWebGamePlatform']();
        } else if (AppConfig.Channel == "gamerealwgame") {
            platform = new window['GameRealWebGamePlatform']();
        } else if (AppConfig.Channel == "baisibudejiewgame") {
            platform = new window['MoboWebGamePlatform']();
        } else if (AppConfig.Channel == "yilewanwgame") {
            platform = new window['YilewanWebGamePlatform']();
        } else if (AppConfig.Channel == "hortor") {
            platform = new window['HortorPlatform']();
        } else if (AppConfig.Channel == "fbinstant") {
            platform = new window['FBInstantPlatform']();
        } else if (window['AoneSDKIosReviewPlatform'] && window['AoneSDKIosReviewPlatform'].isSupport()) {
            platform = new window['AoneSDKIosReviewPlatform']();
        } else if (window['AoneSDKPlatform'] && window['AoneSDKPlatform'].isSupport()) {
            platform = new window['AoneSDKPlatform']();
        } else if (window['AonePlatform'] && window['AonePlatform'].isSupport()) {
            platform = new window['AonePlatform']();
        } else if (window['TestPlatform'] && window['TestPlatform'].isSupport()) {
            platform = new window['TestPlatform']();
        }

        console.log("select platform " + platform ? platform.name() : "unknown");
    }

    export declare let platform: Platform;

    export declare interface Window {

        platform: Platform
    }

}