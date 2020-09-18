namespace zj {
// Imud测试环境支持

export class FBInstantPlatform implements Platform {

    private timer: egret.Timer = null; // 失败重试的定时器
    private callback_this: any; // 登录验证回调函数的上下文指针
    private callback_success: (user_id: number, user_account: string, token: string) => void; // 登录验证成功
    private callback_fail: (retcode: number) => void; // 登录验证失败
    private login_signature: string; // 登录签名

    private rewardedVideoAd: any; // FB视频激励广告控件

    // 当前环境是否支持该平台
    public static isSupport(): boolean {
        return (('FBInstant' in window) && ('initializeAsync' in FBInstant));
    }

    // 平台名字
    public name(): string {
        return "fbinstant";
    }

    // 复制文本到剪贴板
    public setClipboardData(str): void{
    }

    public playVideo(videoName: string): Promise<any> {
        return new Promise((resolve,reject)=>{
            resolve();
            return;
        });
    }

    public async init() {
        AppConfig.Channel = "fbinstant";
        return new Promise((resolve, reject) => {
            if (!('FBInstant' in window)) {
                reject("不支持FBInstant平台");
                return;
            }
            FBInstant.initializeAsync()
            .then(() => {
                var locale = FBInstant.getLocale(); // 'en_US'
                var platform = FBInstant.getPlatform(); // 'IOS'
                var sdkVersion = FBInstant.getSDKVersion(); // '4.1'
                var playerID = FBInstant.player.getID();
                console.log("facebook locale " + locale);
                console.log("facebook platform " + platform);
                console.log("facebook sdkVersion " + sdkVersion);
                console.log("facebook playerID " + playerID);

                FBInstant.getRewardedVideoAsync('2135293090085948_2143545989260658').then((rewardedVideo) => {
                    this.rewardedVideoAd = rewardedVideo;
                    rewardedVideo.loadAsync();
                    resolve();
                }).catch(function(error) {
                    console.log(error);
                    console.log("获取激励视频广告位实例失败");
                    resolve();
                });
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }

    // 关闭平台
    public close() {
        if ('FBInstant' in window) FBInstant.quit();
    }

    // 重启
    public restart() {
        if ('FBInstant' in window) FBInstant.quit();
    }

    // 通知平台资源加载的百分比(0~100)
    public setLoadingProgress(percentage: number) {
        if (!('FBInstant' in window)) return;
        FBInstant.setLoadingProgress(percentage);
        if (percentage == 100) {
            FBInstant.startGameAsync().then(function() {
                if ('payments' in FBInstant) {
                    let payments: any = FBInstant["payments"];
                    payments.getPurchasesAsync().then((purchases: any) => {
                        for (let i = 0; i < purchases.length; i++) {
                            payments.consumePurchaseAsync(purchases[i]['productID']);
                        }
                    });
                };
                let contextId = FBInstant.context.getID();
                let contextType = FBInstant.context.getType();
                let playerName = FBInstant.player.getName();
                let playerPhoto = FBInstant.player.getPhoto();
                let playerId = FBInstant.player.getID();

                console.log("facebook contextId " + contextId);
                console.log("facebook contextType " + contextType);
                console.log("facebook playerName " + playerName);
                console.log("facebook playerPhoto " + playerPhoto);
                console.log("facebook playerId " + playerId);
            });
        }
    }

    public share(title: string, imageUrl: string, linkUrl: string, query: string) {
        if (imageUrl.length == 0) imageUrl = "resource/assets/images/2048.png";
        return new Promise((resolve,reject)=>{
            if (!("FBInstant" in window) || !('shareAsync' in FBInstant)) {
                reject("不支持Facebook支付");
            }

            let imgLoader: egret.ImageLoader = new egret.ImageLoader();
            imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event) => {
                let loader: egret.ImageLoader = evt.currentTarget;
                let bmd: egret.BitmapData = loader.data;
                let renderTexture: egret.RenderTexture = new egret.RenderTexture();
                renderTexture._setBitmapData(bmd);
                let imgData = renderTexture.toDataURL("image/png", new egret.Rectangle( 0, 0, bmd.width, bmd.height )); // 获取数据

                FBInstant.shareAsync({
                    intent: 'REQUEST',
                    image: imgData,
                    text: title,
                    data: { query: query }
                })
                .then(function() {
                    console.log("shared ok");
                    resolve();
                })
                .catch(function(error) {
                    console.log(error);
                    reject(error);
                });

            }, this);
            imgLoader.once(egret.IOErrorEvent.IO_ERROR, (evt: egret.Event) => {
                console.log("加载图片失败");
                reject("加载图片失败");
            }, this);
            imgLoader.load(imageUrl);
            return;
        });
    }

    // 登录
    public login(callback_success: (user_id: number, user_account: string, token: string) => void, callback_fail: (retcode: number) => void, callback_this: any): void {
        console.log("登录方式：FBInstant登录");
        if (callback_success == null || callback_fail == null || callback_this == null) return;
        this.callback_success = callback_success;
        this.callback_fail = callback_fail;
        this.callback_this = callback_this;

        FBInstant.player.getSignedPlayerInfoAsync("userinfo")
        .then((result) => {
            this.login_signature = result.getSignature();
            this.auth_fbinstant();
        });

        return;
    }

    // 登录验证获取token
    private auth_fbinstant(): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        let fblogin_request = new message.SDKLoginReqBody();
        fblogin_request.sdk_userid = FBInstant.player.getID();
        fblogin_request.sdk_version = "";
        fblogin_request.sdk_token = this.login_signature;
        fblogin_request.device_info = Util.getDeviceInfo();
        fblogin_request.version_info = Util.getAppVersionInfo();
        fblogin_request.auth_key = "";
        let body = JSON.stringify(fblogin_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, this.onFBInstantGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.open(AppConfig.ApiUrlRoot + "/api/sdk_login.do", egret.HttpMethod.POST);
        request.send(body);
        //console.log("fb_login request: " + body);
        Game.UIManager.openWaitingUI();
    }

    // ajax请求IO错误回调
    private onGetIOError(event: egret.IOErrorEvent): void {
        console.log("Ajax调用错误，登陆验证失败，重试...");
        toast("网络错误，登陆验证失败，重试...");
        Game.UIManager.openWaitingUI();

        this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.auth_fbinstant, this);
        this.timer.start();
    }

    // ajax请求fbinstant登陆回复
    private onFBInstantGetComplete(event: egret.Event): void {
        if (this.timer) {
            this.timer.stop();
            this.timer = null;
        }

        Game.UIManager.closeWaitingUI();
        let request = <egret.HttpRequest>event.currentTarget;
        //console.log("fbinstant_login response: " + request.response);

        let json = JSON.parse(request.response);
        if (json.retcode != 0) {
            toast(LANG("Facebook登录API失败:") + json.retcode);
            return;
        }

        let response = <message.SDKLoginRespBody>json.body;

        if (this.callback_this) {
            this.callback_success.call(this.callback_this, response.user_id, response.user_account, response.token);
            this.callback_fail = null;
            this.callback_success = null;
            this.callback_this = null;
        }
        return;
    }

    // 更新角色信息
    // type: 四种类型，login登录游戏，createRole创建角色，roleUp角色升级，logout退出游戏
    public updateRole(type: string) {
        return;
    }

    // 获取程序启动参数
    public getOption(key: string): string {
        let obj = FBInstant.getEntryPointData();
        if (obj == null) return "";
        if ('query' in obj) {
            let query = obj['query'];
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
            var r = query.match(reg); 
            if (r != null) {
                return r[2];
            } else {
                return "";
            }
        }
        return "";
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
        if (!('FBInstant' in window) || !('payments' in FBInstant)) {
            toast_warning("不支持FBInstant平台");
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
            return;
        }
        let payments: any = FBInstant["payments"];
        payments.onReady(function () {
            console.log('Payments Ready!');
        });
        payments.purchaseAsync({
            productID: productID,
            developerPayload: (developerPayload != null) ? developerPayload : ""
        })
        .then((purchase: any) => {
            console.log(purchase);
            toast_success("支付成功");
            
            // 消耗掉，要不不能再次支付同一商品
            payments.consumePurchaseAsync(purchase.productID);
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:true});
        })
        .catch((error) => {
            console.log(error);
            toast_warning(error.toString());
            Game.EventManager.event(GameEvent.USER_PAY_RESULT, {result:false});
        });
    }

    public async showRewardedVideoAd() {
        return new Promise((resolve, reject) => {
            if (!('FBInstant' in window) || !('payments' in FBInstant)) {
                reject("不支持FBInstant平台");
                return;
            }

            if (!this.rewardedVideoAd) {
                reject("暂不支持视频激励广告");
                return;
            }

            this.rewardedVideoAd.loadAsync().then(() => {
                console.log("广告加载完了");
                this.rewardedVideoAd.showAsync().then(() => {
                    console.log("广告播放完了");
                    this.rewardedVideoAd.loadAsync();
                    resolve();
                }).catch(function(error) {
                    console.log(error);
                    this.rewardedVideoAd.loadAsync();
                    reject("视频激励广告播放失败");
                });
            }).catch(function(error) {
                console.log(error);
                reject("视频激励广告加载失败");
            });
        });
    }

    public async showBannerAd() {
        return new Promise((resolve, reject) => {
            console.log("fbinstant platform not support BannerAd");
            reject("暂不支持Banner广告功能");
        });
    }

    public hideBannerAd() {
        return;
    }
}
window['FBInstantPlatform'] = FBInstantPlatform;
}