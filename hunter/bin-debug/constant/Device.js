var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var Device = (function () {
        function Device() {
            this.isSssMode = false;
            this.isDebug = true;
        }
        Object.defineProperty(Device, "gameserver", {
            get: function () {
                return this._gameserver;
            },
            set: function (v) {
                this._gameserver = v;
            },
            enumerable: true,
            configurable: true
        });
        Device.yuan3 = function (condition, param1, param2) {
            if (condition == true) {
                return param1;
            }
            else {
                return param2;
            }
        };
        Device.prototype.mtirand = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var rand = this.mtirand();
            return rand;
        };
        Device.SetSaveBoolInfo = function (key, value) {
            var msg = JSON.stringify(value);
            zj.Controller.setGlobalStorageItem(key, msg);
        };
        Device.GetSaveBoolInfo = function (key) {
            var msg = zj.Controller.getGlobalStorageItem(key);
            if (msg == null || msg == undefined || msg == "") {
                Device.SetSaveBoolInfo(key, Device.fastBattleSwitch);
                return null;
            }
            else {
                var map = JSON.parse(msg);
                if (key == (zj.Game.PlayerInfoSystem.BaseInfo.id + zj.StringConfig_Save.fastBattleSwitch)) {
                    Device.fastBattleSwitch = map;
                }
                return map;
            }
        };
        Device.SetSaveIntInfo = function (key, value) {
            var msg = JSON.stringify(value);
            zj.Controller.setGlobalStorageItem(key, msg);
        };
        Device.GetSaveIntInfo = function (key) {
            var msg = zj.Controller.getGlobalStorageItem(key);
            if (msg == null || msg == undefined || msg == "") {
                Device.SetSaveIntInfo(key, -1);
                return -1;
            }
            else {
                var map = JSON.parse(msg);
                return map;
            }
        };
        Device.deviceInfo = {};
        Device.appInfo = {};
        //userdate
        Device._gameserver = {
            ShowID: "1",
            name: "H5_172" // to do, test code.
        };
        Device.gameserverMap = {};
        Device.accountMap = {};
        Device.mail = "";
        Device.password = "";
        //device
        Device.languageType = 1;
        Device.languageInfo = "zhcn";
        Device.languageInfoPre = "zhcn";
        Device.user_id = 0;
        Device.user_name = "";
        Device.sessionId = 0;
        Device.messageSep = 0;
        Device.memory = 1024 * 1024;
        /**标准屏幕宽 */
        Device.STANDARD_SCREEN_W = 960;
        /**标准屏幕高 */
        Device.STANDARD_SCREEN_H = 640;
        Device.screenWidth = 960;
        Device.screenHeight = 640;
        Device.uiOffsetX = 0;
        Device.uiOffsetY = 0;
        Device.scaleFactor = 1.0;
        Device.bSDKInitFailed = false;
        Device.bSDKNetFailed = false;
        Device.bFirstLogin = false;
        Device.bFirstPlayVideo = false;
        Device.bQuickLogin = false;
        Device.bSavePwd = false;
        Device.bAutoLogin = false;
        Device.bBind = false;
        Device.isLogined = false;
        Device.isTeachOpen = true;
        Device.isBattleValidate = false;
        Device.isBattleSeedOpen = false;
        Device.isDebug = true;
        Device.isDevLog = false;
        Device.isTestSwitch = false;
        Device.isCCBCached = true;
        Device.isSpineCached = false;
        Device.isSpineHidePz = true;
        Device.isLocalTestSkill = false;
        Device.bShowMp4Once = false;
        Device.bShowWarCheats = true;
        Device.bAutoRunLogin = true;
        Device.isFirstHeart = true;
        Device.isHeartMonitor = false;
        Device.isVipOpen = true;
        Device.isFuncOpen = false;
        Device.isCanOpen = true;
        //公告
        Device.notice = "";
        Device.severVersion = null; //服务器版本（用来判断是否需要强制热更）
        Device.bReLoadLua = false; //强制热更标志位
        //仙境开启
        Device.wonderlandOpen = {};
        //首次开启钓鱼
        Device.firstFish = true;
        //仙境换头像提示第二次进入仙境时提醒
        Device.wonderlandChangeHeadTips = 0;
        //关闭快速战斗提示3次后提示
        Device.fastBattleHideTips = 4;
        //快速战斗开关
        Device.fastBattleSwitch = false;
        //祭祀跳过动画开关
        Device.fastRunesSwitch = false;
        //预加载开关
        Device.preloadSwitch = false;
        //客服名字
        Device.customerName = "";
        //客服充值地址
        Device.customerWeb = "";
        //首次网页充值提示
        Device.firstWebPay = true;
        Device.phoneNumber = "";
        Device.lastReqBindPhoneTime = 0;
        //share info
        Device.shareInfo = {};
        //teach Cheats
        Device.teachCheats = false;
        //true为评审表
        Device.isReviewSwitch = false;
        // 是否规避版权
        Device.isCopyright = false;
        Device.CustomAccountInfo = (_a = {}, _a["name"] = "CustomAccountInfo", _a);
        return Device;
    }());
    zj.Device = Device;
    __reflect(Device.prototype, "zj.Device");
    var _a;
})(zj || (zj = {}));
//# sourceMappingURL=Device.js.map