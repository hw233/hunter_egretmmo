var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var zj;
(function (zj) {
    // 测试环境支持
    var TestPlatform = (function () {
        function TestPlatform() {
        }
        // 当前环境是否支持该平台
        TestPlatform.isSupport = function () {
            return true; // 支持所有的环境
        };
        // 平台名字
        TestPlatform.prototype.name = function () {
            return "test";
        };
        TestPlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // if (!Device.isReviewSwitch) AppConfig.Channel = "test";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("test platform init ok");
                            resolve();
                        })];
                });
            });
        };
        // 关闭平台
        TestPlatform.prototype.close = function () {
            if (window && "close" in window) {
                window["close"]();
            }
            return;
        };
        // 复制文本到剪贴板
        TestPlatform.prototype.setClipboardData = function (str) {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
                var input = document.createElement("input");
                input.value = str;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
                document.body.removeChild(input);
                zj.toast_success("复制成功");
            }
        };
        TestPlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        // 重启
        TestPlatform.prototype.restart = function () {
            if (window && "location" in window && "reload" in window["location"]) {
                window.location.reload(true);
            }
            return;
        };
        // 通知平台资源加载的百分比(0~100)
        TestPlatform.prototype.setLoadingProgress = function (percentage) {
            return;
        };
        TestPlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            console.log("aonegame platform shared ok");
            zj.toast_success("分享成功");
            return;
        };
        // 登录
        TestPlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            console.log("登录方式：Aone登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            zj.loadUI(zj.AoneLoginDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.open(callback_success, callback_fail, callback_this);
            });
        };
        // 更新角色信息
        // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
        TestPlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        TestPlatform.prototype.getOption = function (key) {
            var result = egret.getOption(key);
            if (result == undefined || result == null)
                return "";
            return result;
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        TestPlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        TestPlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        TestPlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        TestPlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        TestPlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        TestPlatform.prototype.pay = function (productID, productNum, developerPayload) {
            zj.toast_warning("暂不支持支付功能");
            zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
        };
        TestPlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("aone platform not support RewardedVideoAd");
                            reject("暂不支持视频激励广告功能");
                        })];
                });
            });
        };
        TestPlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("aone platform not support BannerAd");
                            reject("暂不支持Banner广告功能");
                        })];
                });
            });
        };
        TestPlatform.prototype.hideBannerAd = function () {
            return;
        };
        return TestPlatform;
    }());
    zj.TestPlatform = TestPlatform;
    __reflect(TestPlatform.prototype, "zj.TestPlatform", ["zj.Platform"]);
    window['TestPlatform'] = TestPlatform;
})(zj || (zj = {}));
//# sourceMappingURL=TestPlatform.js.map