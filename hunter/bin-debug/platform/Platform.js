var zj;
(function (zj) {
    function initPlatform() {
        console.log("AppConfig.Channel: " + zj.AppConfig.Channel);
        if (zj.AppConfig.Channel == "wxapp") {
            zj.platform = new window['WxAppPlatform']();
        }
        else if (zj.AppConfig.Channel == "qqgame") {
            zj.platform = new window['QQGamePlatform']();
        }
        else if (zj.AppConfig.Channel == "baiduapp") {
            zj.platform = new window['BaiduAppPlatform']();
        }
        else if (zj.AppConfig.Channel == "oppogame") {
            zj.platform = new window['OppoPlatform']();
        }
        else if (zj.AppConfig.Channel == "vivoqgame") {
            zj.platform = new window['VivoQGamePlatform']();
        }
        else if (zj.AppConfig.Channel == "xiaomiqgame") {
            zj.platform = new window['XiaoMiQGamePlatform']();
        }
        else if (zj.AppConfig.Channel == "huaweiqgame") {
            zj.platform = new window['HuaweiGamePlatform']();
        }
        else if (zj.AppConfig.Channel == "chongchongwgame") {
            zj.platform = new window['ChongchongWebGamePlatform']();
        }
        else if (zj.AppConfig.Channel == "sinawgame") {
            zj.platform = new window['SinaWebGamePlatform']();
        }
        else if (zj.AppConfig.Channel == "gamerealwgame") {
            zj.platform = new window['GameRealWebGamePlatform']();
        }
        else if (zj.AppConfig.Channel == "baisibudejiewgame") {
            zj.platform = new window['MoboWebGamePlatform']();
        }
        else if (zj.AppConfig.Channel == "yilewanwgame") {
            zj.platform = new window['YilewanWebGamePlatform']();
        }
        else if (zj.AppConfig.Channel == "hortor") {
            zj.platform = new window['HortorPlatform']();
        }
        else if (zj.AppConfig.Channel == "fbinstant") {
            zj.platform = new window['FBInstantPlatform']();
        }
        else if (window['AoneSDKIosReviewPlatform'] && window['AoneSDKIosReviewPlatform'].isSupport()) {
            zj.platform = new window['AoneSDKIosReviewPlatform']();
        }
        else if (window['AoneSDKPlatform'] && window['AoneSDKPlatform'].isSupport()) {
            zj.platform = new window['AoneSDKPlatform']();
        }
        else if (window['AonePlatform'] && window['AonePlatform'].isSupport()) {
            zj.platform = new window['AonePlatform']();
        }
        else if (window['TestPlatform'] && window['TestPlatform'].isSupport()) {
            zj.platform = new window['TestPlatform']();
        }
        console.log("select platform " + zj.platform ? zj.platform.name() : "unknown");
    }
    zj.initPlatform = initPlatform;
})(zj || (zj = {}));
//# sourceMappingURL=Platform.js.map