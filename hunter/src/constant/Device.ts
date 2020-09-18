namespace zj {
    export class Device {
        public static deviceInfo = {};
        public static appInfo = {};
        //userdate
        private static _gameserver = {
            ShowID: "1",
            name: "H5_172"  // to do, test code.
        };
        public static get gameserver() {
            return this._gameserver;
        }
        public static set gameserver(v: any) {
            this._gameserver = v;
        }

        public static gameserverMap = {};
        public static accountMap = {};
        public static mail = "";
        public static password = "";
        //device
        public static languageType: number = 1;
        public static languageInfo = "zhcn";
        public static languageInfoPre = "zhcn";
        public static user_id: number = 0;

        public static user_name = "";
        public static sessionId: number = 0;
        public static messageSep: number = 0;
        public static memory: number = 1024 * 1024;
        /**标准屏幕宽 */
        public static STANDARD_SCREEN_W = 960;
        /**标准屏幕高 */
        public static STANDARD_SCREEN_H = 640;

        public static screenWidth = 960;
        public static screenHeight = 640;
        public static uiOffsetX = 0;
        public static uiOffsetY = 0;
        public static scaleFactor = 1.0;
        public static bSDKInitFailed = false;
        public static bSDKNetFailed = false;

        public static bFirstLogin = false;
        public static bFirstPlayVideo = false;
        public static bQuickLogin = false;
        public static bSavePwd = false;
        public static bAutoLogin = false;
        public static bBind = false;
        public static isLogined = false;
        public static isTeachOpen = true;
        public static isBattleValidate = false;
        public static isBattleSeedOpen = false;
        public static isDebug = true;
        public static isDevLog = false;
        public static isTestSwitch = false;
        public static isCCBCached = true;
        public static isSpineCached = false;
        public static isSpineHidePz = true;
        public static isLocalTestSkill = false;
        public static bShowMp4Once = false;
        public static bShowWarCheats = true;
        public static bAutoRunLogin = true;
        public static isFirstHeart = true;
        public static isHeartMonitor = false;
        public static isVipOpen = true;
        public static isFuncOpen = false;
        public static isCanOpen = true;
        public isSssMode = false;

        //公告
        public static notice = "";
        public static severVersion = null; //服务器版本（用来判断是否需要强制热更）
        public static bReLoadLua = false; //强制热更标志位

        //仙境开启
        public static wonderlandOpen = {};
        //首次开启钓鱼
        public static firstFish = true;

        //仙境换头像提示第二次进入仙境时提醒
        public static wonderlandChangeHeadTips = 0;

        //关闭快速战斗提示3次后提示
        public static fastBattleHideTips = 4;
        //快速战斗开关
        public static fastBattleSwitch = false;
        //祭祀跳过动画开关
        public static fastRunesSwitch = false;

        //预加载开关
        public static preloadSwitch = false;

        //客服名字
        public static customerName = "";

        //客服充值地址
        public static customerWeb = "";

        //首次网页充值提示
        public static firstWebPay = true;

        public static phoneNumber = "";
        public static lastReqBindPhoneTime = 0;

        //share info
        public static shareInfo = {};
        //teach Cheats
        public static teachCheats = false;

        //true为评审表
        public static isReviewSwitch: boolean = false;
        // 是否规避版权
        public static isCopyright: boolean = false;

        public isDebug: boolean = true;

        public static CustomAccountInfo = { ["name"]: "CustomAccountInfo", }



        public static yuan3(condition, param1, param2) {
            if (condition == true) {
                return param1;
            } else {
                return param2;
            }
        }

        public mtirand(...args) {
            let rand = this.mtirand();
            return rand;
        }

        public static SetSaveBoolInfo(key, value) {
            let msg = JSON.stringify(value);
            Controller.setGlobalStorageItem(key, msg);
        }

        public static GetSaveBoolInfo(key) {
            let msg = Controller.getGlobalStorageItem(key);
            if (msg == null || msg == undefined || msg == "") {
                Device.SetSaveBoolInfo(key, Device.fastBattleSwitch);
                return null;
            } else {
                let map = JSON.parse(msg);
                if (key == (Game.PlayerInfoSystem.BaseInfo.id + StringConfig_Save.fastBattleSwitch)) {
                    Device.fastBattleSwitch = map;
                }
                return map;
            }
        }

        public static SetSaveIntInfo(key, value) {
            let msg = JSON.stringify(value);
            Controller.setGlobalStorageItem(key, msg);
        }

        public static GetSaveIntInfo(key) {
            let msg = Controller.getGlobalStorageItem(key);
            if (msg == null || msg == undefined || msg == "") {
                Device.SetSaveIntInfo(key, -1);
                return -1;
            } else {
                let map = JSON.parse(msg);
                return map;
            }
        }
    }
}