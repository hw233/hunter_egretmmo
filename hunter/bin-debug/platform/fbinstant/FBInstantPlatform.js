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
    // Imud测试环境支持
    var FBInstantPlatform = (function () {
        function FBInstantPlatform() {
            this.timer = null; // 失败重试的定时器
        }
        // 当前环境是否支持该平台
        FBInstantPlatform.isSupport = function () {
            return (('FBInstant' in window) && ('initializeAsync' in FBInstant));
        };
        // 平台名字
        FBInstantPlatform.prototype.name = function () {
            return "fbinstant";
        };
        // 复制文本到剪贴板
        FBInstantPlatform.prototype.setClipboardData = function (str) {
        };
        FBInstantPlatform.prototype.playVideo = function (videoName) {
            return new Promise(function (resolve, reject) {
                resolve();
                return;
            });
        };
        FBInstantPlatform.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    zj.AppConfig.Channel = "fbinstant";
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!('FBInstant' in window)) {
                                reject("不支持FBInstant平台");
                                return;
                            }
                            FBInstant.initializeAsync()
                                .then(function () {
                                var locale = FBInstant.getLocale(); // 'en_US'
                                var platform = FBInstant.getPlatform(); // 'IOS'
                                var sdkVersion = FBInstant.getSDKVersion(); // '4.1'
                                var playerID = FBInstant.player.getID();
                                console.log("facebook locale " + locale);
                                console.log("facebook platform " + platform);
                                console.log("facebook sdkVersion " + sdkVersion);
                                console.log("facebook playerID " + playerID);
                                FBInstant.getRewardedVideoAsync('2135293090085948_2143545989260658').then(function (rewardedVideo) {
                                    _this.rewardedVideoAd = rewardedVideo;
                                    rewardedVideo.loadAsync();
                                    resolve();
                                }).catch(function (error) {
                                    console.log(error);
                                    console.log("获取激励视频广告位实例失败");
                                    resolve();
                                });
                            })
                                .catch(function (error) {
                                console.log(error);
                                reject(error);
                            });
                        })];
                });
            });
        };
        // 关闭平台
        FBInstantPlatform.prototype.close = function () {
            if ('FBInstant' in window)
                FBInstant.quit();
        };
        // 重启
        FBInstantPlatform.prototype.restart = function () {
            if ('FBInstant' in window)
                FBInstant.quit();
        };
        // 通知平台资源加载的百分比(0~100)
        FBInstantPlatform.prototype.setLoadingProgress = function (percentage) {
            if (!('FBInstant' in window))
                return;
            FBInstant.setLoadingProgress(percentage);
            if (percentage == 100) {
                FBInstant.startGameAsync().then(function () {
                    if ('payments' in FBInstant) {
                        var payments_1 = FBInstant["payments"];
                        payments_1.getPurchasesAsync().then(function (purchases) {
                            for (var i = 0; i < purchases.length; i++) {
                                payments_1.consumePurchaseAsync(purchases[i]['productID']);
                            }
                        });
                    }
                    ;
                    var contextId = FBInstant.context.getID();
                    var contextType = FBInstant.context.getType();
                    var playerName = FBInstant.player.getName();
                    var playerPhoto = FBInstant.player.getPhoto();
                    var playerId = FBInstant.player.getID();
                    console.log("facebook contextId " + contextId);
                    console.log("facebook contextType " + contextType);
                    console.log("facebook playerName " + playerName);
                    console.log("facebook playerPhoto " + playerPhoto);
                    console.log("facebook playerId " + playerId);
                });
            }
        };
        FBInstantPlatform.prototype.share = function (title, imageUrl, linkUrl, query) {
            var _this = this;
            if (imageUrl.length == 0)
                imageUrl = "resource/assets/images/2048.png";
            return new Promise(function (resolve, reject) {
                if (!("FBInstant" in window) || !('shareAsync' in FBInstant)) {
                    reject("不支持Facebook支付");
                }
                var imgLoader = new egret.ImageLoader();
                imgLoader.once(egret.Event.COMPLETE, function (evt) {
                    var loader = evt.currentTarget;
                    var bmd = loader.data;
                    var renderTexture = new egret.RenderTexture();
                    renderTexture._setBitmapData(bmd);
                    var imgData = renderTexture.toDataURL("image/png", new egret.Rectangle(0, 0, bmd.width, bmd.height)); // 获取数据
                    FBInstant.shareAsync({
                        intent: 'REQUEST',
                        image: imgData,
                        text: title,
                        data: { query: query }
                    })
                        .then(function () {
                        console.log("shared ok");
                        resolve();
                    })
                        .catch(function (error) {
                        console.log(error);
                        reject(error);
                    });
                }, _this);
                imgLoader.once(egret.IOErrorEvent.IO_ERROR, function (evt) {
                    console.log("加载图片失败");
                    reject("加载图片失败");
                }, _this);
                imgLoader.load(imageUrl);
                return;
            });
        };
        // 登录
        FBInstantPlatform.prototype.login = function (callback_success, callback_fail, callback_this) {
            var _this = this;
            console.log("登录方式：FBInstant登录");
            if (callback_success == null || callback_fail == null || callback_this == null)
                return;
            this.callback_success = callback_success;
            this.callback_fail = callback_fail;
            this.callback_this = callback_this;
            FBInstant.player.getSignedPlayerInfoAsync("userinfo")
                .then(function (result) {
                _this.login_signature = result.getSignature();
                _this.auth_fbinstant();
            });
            return;
        };
        // 登录验证获取token
        FBInstantPlatform.prototype.auth_fbinstant = function () {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            var fblogin_request = new message.SDKLoginReqBody();
            fblogin_request.sdk_userid = FBInstant.player.getID();
            fblogin_request.sdk_version = "";
            fblogin_request.sdk_token = this.login_signature;
            fblogin_request.device_info = zj.Util.getDeviceInfo();
            fblogin_request.version_info = zj.Util.getAppVersionInfo();
            fblogin_request.auth_key = "";
            var body = JSON.stringify(fblogin_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onFBInstantGetComplete, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
            request.send(body);
            //console.log("fb_login request: " + body);
            zj.Game.UIManager.openWaitingUI();
        };
        // ajax请求IO错误回调
        FBInstantPlatform.prototype.onGetIOError = function (event) {
            console.log("Ajax调用错误，登陆验证失败，重试...");
            zj.toast("网络错误，登陆验证失败，重试...");
            zj.Game.UIManager.openWaitingUI();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_fbinstant, this);
            this.timer.start();
        };
        // ajax请求fbinstant登陆回复
        FBInstantPlatform.prototype.onFBInstantGetComplete = function (event) {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            zj.Game.UIManager.closeWaitingUI();
            var request = event.currentTarget;
            //console.log("fbinstant_login response: " + request.response);
            var json = JSON.parse(request.response);
            if (json.retcode != 0) {
                zj.toast(zj.LANG("Facebook登录API失败:") + json.retcode);
                return;
            }
            var response = json.body;
            if (this.callback_this) {
                this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
                this.callback_fail = null;
                this.callback_success = null;
                this.callback_this = null;
            }
            return;
        };
        // 更新角色信息
        // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
        FBInstantPlatform.prototype.updateRole = function (type) {
            return;
        };
        // 获取程序启动参数
        FBInstantPlatform.prototype.getOption = function (key) {
            var obj = FBInstant.getEntryPointData();
            if (obj == null)
                return "";
            if ('query' in obj) {
                var query = obj['query'];
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = query.match(reg);
                if (r != null) {
                    return r[2];
                }
                else {
                    return "";
                }
            }
            return "";
        };
        // 获取程序启动场景信息
        // 类似于 scene=1038  或scene=1037&appid=123456
        FBInstantPlatform.prototype.getScene = function () {
            return "";
        };
        // 显示游戏圈(游戏论坛)按钮
        FBInstantPlatform.prototype.showClubButton = function () {
            return; // 不支持
        };
        // 隐藏游戏圈(游戏论坛)按钮
        FBInstantPlatform.prototype.hideClubButton = function () {
            return; // 不支持
        };
        // 短时间振动(15ms)
        FBInstantPlatform.prototype.vibrateShort = function () {
            return; // 不支持
        };
        // 较长时间振动(400ms)
        FBInstantPlatform.prototype.vibrateLong = function () {
            return; // 不支持
        };
        FBInstantPlatform.prototype.pay = function (productID, productNum, developerPayload) {
            if (!('FBInstant' in window) || !('payments' in FBInstant)) {
                zj.toast_warning("不支持FBInstant平台");
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
                return;
            }
            var payments = FBInstant["payments"];
            payments.onReady(function () {
                console.log('Payments Ready!');
            });
            payments.purchaseAsync({
                productID: productID,
                developerPayload: (developerPayload != null) ? developerPayload : ""
            })
                .then(function (purchase) {
                console.log(purchase);
                zj.toast_success("支付成功");
                // 消耗掉，要不不能再次支付同一商品
                payments.consumePurchaseAsync(purchase.productID);
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: true });
            })
                .catch(function (error) {
                console.log(error);
                zj.toast_warning(error.toString());
                zj.Game.EventManager.event(zj.GameEvent.USER_PAY_RESULT, { result: false });
            });
        };
        FBInstantPlatform.prototype.showRewardedVideoAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (!('FBInstant' in window) || !('payments' in FBInstant)) {
                                reject("不支持FBInstant平台");
                                return;
                            }
                            if (!_this.rewardedVideoAd) {
                                reject("暂不支持视频激励广告");
                                return;
                            }
                            _this.rewardedVideoAd.loadAsync().then(function () {
                                console.log("广告加载完了");
                                _this.rewardedVideoAd.showAsync().then(function () {
                                    console.log("广告播放完了");
                                    _this.rewardedVideoAd.loadAsync();
                                    resolve();
                                }).catch(function (error) {
                                    console.log(error);
                                    this.rewardedVideoAd.loadAsync();
                                    reject("视频激励广告播放失败");
                                });
                            }).catch(function (error) {
                                console.log(error);
                                reject("视频激励广告加载失败");
                            });
                        })];
                });
            });
        };
        FBInstantPlatform.prototype.showBannerAd = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log("fbinstant platform not support BannerAd");
                            reject("暂不支持Banner广告功能");
                        })];
                });
            });
        };
        FBInstantPlatform.prototype.hideBannerAd = function () {
            return;
        };
        return FBInstantPlatform;
    }());
    zj.FBInstantPlatform = FBInstantPlatform;
    __reflect(FBInstantPlatform.prototype, "zj.FBInstantPlatform", ["zj.Platform"]);
    window['FBInstantPlatform'] = FBInstantPlatform;
})(zj || (zj = {}));
//# sourceMappingURL=FBInstantPlatform.js.map