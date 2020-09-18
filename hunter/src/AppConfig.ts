// 定义项目全局配置项

namespace zj {

export class AppConfig {
    // 运营平台分配的应用ID
    public static AppId = 2010; // 测试环境
    //public static AppId = 2039; // 正式环境

    // 发行渠道
    public static Channel = "test";// aone_h5game

    // 当前主版本
    public static MajorVersion = 1;

    // 当前子版本
    public static MinorVersion = 5;

    // 当前修订版本
    public static RevisionVersion = 5;

    // 游戏资源版本号
    public static ResourceVersion = 1909050;

    // 游戏LOGO图片key
    public static GameLogoImageKey = "ui_login_OrnLogo_png"; // 默认“热血猎人”

    // API服务URL根路径testapi01.smartspace-game.com
    public static ApiUrlRoot = "https://testapi01.smartspace-game.com"; // 测试环境
    //public static ApiUrlRoot = "https://hunterh5api.zhijian-game.com"; // 正式环境

    // 入口服务URL根路径
    public static EntryUrlRoot = "https://testapi01.smartspace-game.com"; // 测试环境
    //public static EntryUrlRoot = "https://hunterh5login.zhijian-game.com"; // 正式环境

    // 备份入口服务URL根路径(从API服动态获取)
    public static EntryBackupUrlRoot = "";

    // 微信小游戏等环境资源分离时，项目URL根目录(WEB端同源拉取)
    public static ProjectUrlRoot = "https://testapi01.smartspace-game.com/hunter/"; // 测试环境
    //public static ProjectUrlRoot = "https://hunterh5.zhijian-game.com/"; // 正式环境

    // 推送服务token
    public static PushToken = ""; // 从native获取

    // 微信激励视频广告unit id
    public static WxRewardVideoAdUnitId = "adunit-d0dac4268d1e824f";
    public static WxBannerAdUnitId = "adunit-f0c54010dbcc58b5";

    // QQ激励视频广告unit id
    public static QQRewardVideoAdUnitId = "";
    public static QQBannerAdUnitId = "";

    }
}