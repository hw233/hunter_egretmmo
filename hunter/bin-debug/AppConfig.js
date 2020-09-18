// 定义项目全局配置项
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var AppConfig = (function () {
        function AppConfig() {
        }
        // 运营平台分配的应用ID
        AppConfig.AppId = 2010; // 测试环境
        //public static AppId = 2039; // 正式环境
        // 发行渠道
        AppConfig.Channel = "test"; // aone_h5game
        // 当前主版本
        AppConfig.MajorVersion = 1;
        // 当前子版本
        AppConfig.MinorVersion = 5;
        // 当前修订版本
        AppConfig.RevisionVersion = 5;
        // 游戏资源版本号
        AppConfig.ResourceVersion = 1909050;
        // 游戏LOGO图片key
        AppConfig.GameLogoImageKey = "ui_login_OrnLogo_png"; // 默认“热血猎人”
        // API服务URL根路径testapi01.smartspace-game.com
        AppConfig.ApiUrlRoot = "https://testapi01.smartspace-game.com"; // 测试环境
        //public static ApiUrlRoot = "https://hunterh5api.zhijian-game.com"; // 正式环境
        // 入口服务URL根路径
        AppConfig.EntryUrlRoot = "https://testapi01.smartspace-game.com"; // 测试环境
        //public static EntryUrlRoot = "https://hunterh5login.zhijian-game.com"; // 正式环境
        // 备份入口服务URL根路径(从API服动态获取)
        AppConfig.EntryBackupUrlRoot = "";
        // 微信小游戏等环境资源分离时，项目URL根目录(WEB端同源拉取)
        AppConfig.ProjectUrlRoot = "https://testapi01.smartspace-game.com/hunter/"; // 测试环境
        //public static ProjectUrlRoot = "https://hunterh5.zhijian-game.com/"; // 正式环境
        // 推送服务token
        AppConfig.PushToken = ""; // 从native获取
        // 微信激励视频广告unit id
        AppConfig.WxRewardVideoAdUnitId = "adunit-d0dac4268d1e824f";
        AppConfig.WxBannerAdUnitId = "adunit-f0c54010dbcc58b5";
        // QQ激励视频广告unit id
        AppConfig.QQRewardVideoAdUnitId = "";
        AppConfig.QQBannerAdUnitId = "";
        return AppConfig;
    }());
    zj.AppConfig = AppConfig;
    __reflect(AppConfig.prototype, "zj.AppConfig");
})(zj || (zj = {}));
//# sourceMappingURL=AppConfig.js.map