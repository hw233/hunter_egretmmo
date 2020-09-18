namespace zj {
    // 全局流程控制器

    export class Controller {

        private token = 0; // 登录验证码
        private roleinfo = new message.RoleShortInfo(); // 角色简要信息
        private selectGroup = new message.GameGroupInfo(); // 玩家选择登录的服务器
        private isNewRole = false; // 是否为新创建角色
        private proxyHost = ""; // 网关服主机
        private proxyPort = 0; // 网关服端口
        private timer: egret.Timer = null; // 做心跳的定时器
        private transfer = new AoneTransfer(); // 与服务端连接通道
        private loginState = 0; // 登录状态 0未登录，1登录中，2登录成功

        public keepliveInterval = 120000; // 心跳周期（120秒）
        public lastServerTime: number = new Date().getTime() / 1000; // 最后一次心跳获得的服务端时间(1970至今的秒数)
        private lastGetTimer: number = egret.getTimer(); // 最后一次心跳时客户端已运行毫秒数
        public lastPower: number = new Date().getTime() / 1000; // 最后一次体力刷新时间（1970年至今的秒数）

        private total_servers = new Array<string>(); // 可连接的nginx服务列表
        private usable_servers = new Array<string>(); // 可用的nginx服务列表

        private sessionId = 0; // 会话id
        private isReconnect = false; // 是否为断线重连模式

        private last_server = ""; // 最后尝试连接服务

        private web_pay = ""; // 网页充值地址
        private customer_web_pay = ""; // 玩家特有网页充值地址

        private m_shareRoleid: number = 0;
        private count_ReconnectUI = 0; // 断线重连弹框计数
        private dialog_ReconnectUI = null; // 断线重连框
        private loginInterval: number = 0; // 角色累计在线时间

        private reconnect_fail_count = 0; // 重连失败次数，连续重连3次均失败则弹出对话框
        private activity_redpackage_countdown = 0; // 红包活动结束时间

        public async init() {
            this.registerNotifyHandlers();
            await this.load_servers();
            //this.query_entry_host(); // 异步，不等待结果返回
        }

        public uninit() {
            this.logout();

            this.token = 0;
            this.roleinfo = new message.RoleShortInfo();
            this.selectGroup = new message.GameGroupInfo();
            this.isNewRole = false;
            this.proxyHost = "";
            this.proxyPort = 0;
            this.loginState = 0;
            this.sessionId = 0;
            this.isReconnect = false;
        }

        private load_servers(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                    try {
                        let request = <egret.HttpRequest>event.currentTarget;
                        let json = JSON.parse(request.response);
                        for (let i = 0; i < json.length; i++) {
                            this.total_servers.push(json[i]);
                            this.usable_servers.push(json[i]);
                        }
                        return resolve();
                    } catch (e) {
                        console.log(request.response);
                        toast_warning("解析服务列表失败");
                        return reject();
                    }
                }, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
                    toast_warning("更新服务列表失败");
                    return reject();
                }, this);

                egret.ImageLoader.crossOrigin = "anonymous";
                let serverlist = "servers_debug.json";
                if (AppConfig.AppId != 2010 || Device.isReviewSwitch) serverlist = "servers.json";
                request.open(AppConfig.ProjectUrlRoot + serverlist + "?v=" + Math.random(), egret.HttpMethod.GET);
                request.send();
            });
        }

        // 从API获取入口服务域名
        private query_entry_host() {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                let request = <egret.HttpRequest>event.currentTarget;
                console.log("query_entry_host response: " + request.response);

                let json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    toast(LANG("query_entry_host fail:") + json.retcode);
                    return;
                }

                let response = <message.QueryChannelConfigRespBody>json.body;
                AppConfig.EntryBackupUrlRoot = "https://" + response.entryserver_ip;
                return;
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
                console.warn("query_entry_host io error");
            }, this);
            request.open(AppConfig.ApiUrlRoot + "/api/query_channel_config.do", egret.HttpMethod.POST);
            let queryconfig_request = new message.QueryChannelConfigReqBody();
            queryconfig_request.device_info = Util.getDeviceInfo();
            queryconfig_request.version_info = Util.getAppVersionInfo();
            queryconfig_request.auth_key = Util.AuthKey(queryconfig_request.device_info.device_id, "");
            request.send(JSON.stringify(queryconfig_request));
            console.log("query config request: " + JSON.stringify(queryconfig_request));
        }

        // 是否已登陆游戏成功
        public get isLoginOK(): boolean {
            return this.loginState == 2;
        }

        // 获取用户ID
        public userID(): number {
            return this.roleinfo.user_id;
        }

        // 获取角色ID
        public roleID(): number {
            return this.roleinfo.role_id;
        }

        // 获取share_roleid
        public shareRoleID(): number {
            return this.m_shareRoleid;
        }

        // 获取所属分区ID
        public groupOwnerID(): number {
            return this.roleinfo.owner_groupid;
        }
        // 获取最后登录分区ID
        public lastLoginGroupID(): number {
            return this.roleinfo.last_groupid;
        }
        // 获取玩家登录的分区信息
        public selectedGroup(): message.GameGroupInfo {
            return this.selectGroup;
        }

        // 获取角色简要信息
        public roleInfo(): message.RoleShortInfo {
            return this.roleinfo;
        }

        // 网页充值地址
        public webPayUrl(): string {
            return this.web_pay;
        }

        // 玩家特有网页充值地址
        public customerWebPayUrl(): string {
            return this.customer_web_pay;
        }

        // 获取本地维护的服务器时间
        public serverNow(): Date {
            var ms = this.lastServerTime * 1000 + (egret.getTimer() - this.lastGetTimer);
            let now = new Date();
            now.setTime(ms);
            return now;
        }

        public get curServerTime(): number {
            return Math.floor(this.serverNow().valueOf() / 1000);
        }

        public get LoginInterval(): number {
            return this.loginInterval;
        }
        
        public get Activity_redpackage_countdown(): number {
            return this.activity_redpackage_countdown;
        }

        // 本地存储
        public static getGlobalStorageItem(key: string): string {
            if (Util.IsNullOrEmptyString(key)) return "";
            let v = egret.localStorage.getItem(key);
            if (Util.IsNullOrEmptyString(v)) return "";
            return v;
        }
        public static setGlobalStorageItem(key: string, value: string): boolean {
            if (Util.IsNullOrEmptyString(key) || Util.IsNullOrEmptyString(value)) return false;
            egret.localStorage.setItem(key, value);
            return true;
        }
        public static removeGlobalStorageItem(key: string) {
            if (Util.IsNullOrEmptyString(key)) return;
            egret.localStorage.removeItem(key);
            return;
        }
        public getRoleStorageItem(key: string): string {
            if (Util.IsNullOrEmptyString(key)) return "";
            key = `${this.roleID()}_${key}`;
            let v = egret.localStorage.getItem(key);
            if (Util.IsNullOrEmptyString(v)) return "";
            return v;
        }
        public setRoleStorageItem(key: string, value: string): boolean {
            if (Util.IsNullOrEmptyString(key) || Util.IsNullOrEmptyString(value)) return false;
            key = `${this.roleID()}_${key}`;
            egret.localStorage.setItem(key, value);
            return true;
        }
        public removeRoleStorageItem(key: string) {
            if (Util.IsNullOrEmptyString(key)) return;
            key = `${this.roleID()}_${key}`;
            egret.localStorage.removeItem(key);
            return;
        }

        // 获取一个可用的服务
        private get_usable_server(): string {
            if (this.total_servers.length == 0) return "";
            if (this.usable_servers.length == 0) {
                for (let i = 0; i < this.total_servers.length; i++) {
                    this.usable_servers.push(this.total_servers[i]);
                }
            }
            let rnd = (Math.random() * 1000) >> 0;
            let index = rnd % this.usable_servers.length;
            let server = this.usable_servers[index];
            return server;
        }

        // 删除一个服务
        private remove_server(server: string) {
            for (let i = 0; i < this.usable_servers.length; i++) {
                if (this.usable_servers[i] == server) {
                    this.usable_servers.splice(i, 1);
                    return;
                }
            }
        }

        // 发送消息
        // msg: 要发送的请求消息
        // thisObject: 回调时的上下文指针
        // callback_response: 对应的回复消息处理方法
        // callback_timeout: 消息处理超时的处理方法
        // isQuietLoading: true时网络请求有loading转圈
        // isQuietToast: true时如果返回消息result非0则弹toast提示
        public send(msg: aone.AoneRequest,
            callback_response?: (req: aone.AoneRequest, resp: aone.AoneResponse) => void,
            callback_timeout?: (req: aone.AoneRequest) => void,
            thisObject?: any,
            isQuietLoading?: boolean,
            isQuietToast?: boolean): boolean {
            if (this.loginState == 0) {
                //toast_warning(LANG("当前处于未登录状态，无法发送请求"));
                this.showReconnectUI(true);
                return false;
            }
            if (!this.transfer.isConnected || !this.transfer.send(msg, callback_response, callback_timeout, thisObject, isQuietLoading, isQuietToast)) {
                //toast_warning(LANG("网络连接不通畅，无法发送请求"));
                this.showReconnectUI(true);
                return false;
            }
            return true;
        }


        // 开始登录游戏服流程
        public login(proxyHost: string, proxyPort: number, roleinfo: message.RoleShortInfo, token: number, selectedGroup: message.GameGroupInfo, isnewRole: boolean) {
            this.proxyHost = proxyHost;
            this.proxyPort = proxyPort;
            this.roleinfo = roleinfo;
            this.token = token;
            this.selectGroup = selectedGroup;
            this.isNewRole = isnewRole;
            this.isReconnect = false;
            this.doLoginGame();
        }

        // 登出游戏
        public logout() {
            this.isReconnect = false;
            this.token = 0;
            this.loginState = 0;
            this.transfer.close();
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
        }

        // 登录
        private doLoginGame() {
            if (!this.dialog_ReconnectUI) this.dialog_ReconnectUI = new Common_ReLogin();
            this.loginState = 1; // 置为登录流程中状态
            this.transfer.close();
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }

            this.last_server = this.get_usable_server();
            if (this.last_server.length == 0) {
                toast_warning("没有可用的服务");
                if (Game.UIManager.topScene() instanceof LoadingScene) Game.UIManager.popScene();
                this.showReconnectUI(this.isReconnect);
                return;
            }

            // 开始连接
            if (this.selectGroup.group_id == 31) {
                this.transfer.open(`ws://192.168.13.17:25000/hunter`, this.onSocketOpen, this.onSocketClose, this);
            }
            else {
                this.transfer.open(`wss://${this.last_server}/hunter/${this.selectGroup.group_id}`, this.onSocketOpen, this.onSocketClose, this);
            }
            Game.UIManager.openWaitingUI();
        }

        // websocket关闭
        private onSocketClose(event: egret.Event) {
            this.transfer.close();
            if (this.loginState == 1) {
                if (Game.UIManager.topScene() instanceof LoadingScene) Game.UIManager.popScene();
                Game.UIManager.closeWaitingUI();
                this.remove_server(this.last_server);
                this.showReconnectUI(!!this.isReconnect);
            } else if (this.loginState == 2) {
                Game.EventManager.event(GameEvent.NET_SERVER_DISCONNECTED, {}); // 连接断开(只有断线重连时有事件)
                this.showReconnectUI(true);
            } // 其他情况(忽略)
        }

        // 显示重连UI
        private showReconnectUI(isReconnect?: boolean) {
            if (this.count_ReconnectUI > 0) return;
            if (this.reconnect_fail_count < 3) { // 不显示UI，自动重连
                this.reconnect_fail_count++;
                this.isReconnect = !!isReconnect;
                this.doLoginGame();
                return;
            }

            this.reconnect_fail_count++;
            let dialog = new Common_ReLogin();
            dialog.setCB(() => {
                this.reLogin();
                if (this.count_ReconnectUI > 0) this.count_ReconnectUI--;
            }, () => {
                this.isReconnect = !!isReconnect;
                this.doLoginGame();
                if (this.count_ReconnectUI > 0) this.count_ReconnectUI--;
            }, this);
            dialog.width = UIManager.StageWidth;
            dialog.height = UIManager.StageHeight;
            dialog.anchorOffsetX = 0;
            dialog.anchorOffsetY = 0;
            dialog.x = 0;
            dialog.y = 0;
            let rect_back = new eui.Rect();
            rect_back.fillAlpha = 0;
            egret.Tween.get(rect_back).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
            rect_back.name = "__rect_back";
            rect_back.width = UIManager.StageWidth;
            rect_back.height = UIManager.StageHeight;
            rect_back.x = 0;
            rect_back.y = 0;
            dialog.addChildAt(rect_back, 0);
            Game.UIManager.addChild(dialog);
            this.count_ReconnectUI++;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
        }

        // 强制重新登录
        public showLoadErrorUI() {
            if (this.count_ReconnectUI > 0) return;
            let dialog = new Common_ReLogin();
            dialog.setCB(() => {
                this.reLogin();
                if (this.count_ReconnectUI > 0) this.count_ReconnectUI--;
            }, null, this);
            dialog.width = UIManager.StageWidth;
            dialog.height = UIManager.StageHeight;
            dialog.anchorOffsetX = 0;
            dialog.anchorOffsetY = 0;
            dialog.x = 0;
            dialog.y = 0;
            let rect_back = new eui.Rect();
            rect_back.fillAlpha = 0;
            egret.Tween.get(rect_back).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
            rect_back.name = "__rect_back";
            rect_back.width = UIManager.StageWidth;
            rect_back.height = UIManager.StageHeight;
            rect_back.x = 0;
            rect_back.y = 0;
            dialog.addChildAt(rect_back, 0);
            dialog.setOneBtn();
            dialog.setMsgInfo(TextsConfig.TextsConfig_Reconnect.loadError);
            Game.UIManager.addChild(dialog);
            this.count_ReconnectUI++;
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
        }

        /**断线重连 返回登陆界面 */
        private reLogin() {
            Teach.cleanTeach(); // 清除新手引导
            loadUI(LoginScene).then((scene: LoginScene) => {
                Game.UIManager.popAllUIs();
                scene.show();
                Game.uninit();
            });
            Game.EventManager.event(GameEvent.NET_SERVER_DISCONNECTED, {}); // 连接断开(只有断线重连时有事件)
        }

        // websocket打开
        private onSocketOpen(event: egret.Event) {
            Game.UIManager.closeWaitingUI();
            //toast(LANG("连接游戏服成功"));
            if (!this.isReconnect) {
                let request = new message.LoginGameserverRequest();
                request.body.token = this.token;
                request.body.userId = this.roleinfo.user_id;
                request.body.roleId = this.roleinfo.role_id;
                request.body.push_token = ""
                request.body.push_channel = ""
                request.body.screen_w = UIManager.StageWidth;
                request.body.screen_h = UIManager.StageHeight;
                request.body.local_language = Util.getAppVersionInfo().app_lang;
                request.body.login_channel = Util.getAppVersionInfo().channel;
                if (!this.transfer.send(request, this.onLoginGameResponse, this.onLoginGameTimeout, this, false)) {
                    this.showReconnectUI(this.isReconnect);
                    if (Game.UIManager.topScene() instanceof LoadingScene) Game.UIManager.popScene();
                    return;
                }
            }
            else {
                let request = new message.ReconnectRequest();
                request.header.srcid = this.roleID();
                request.header.session = this.sessionId;
                request.body.sessionId = this.sessionId;
                if (!this.transfer.send(request, this.onReLoginGameResponse, this.onLoginGameTimeout, this, false)) {
                    this.showReconnectUI(this.isReconnect);
                    return;
                }
            }
        }

        private onReLoginGameResponse(req: aone.AoneRequest, resp: aone.AoneResponse) {
            let request = <message.ReconnectRequest>req;
            let response = <message.ReconnectResponse>resp;
            if (response.header.result != 0) {
                loadUI(ConfirmOkDialog)
                    .then((dialog: ConfirmOkDialog) => {
                        dialog.show(UI.SHOW_FILL_OUT);
                        let msg = `${Game.ConfigManager.getAone2CodeReason(response.header.result)}(${response.header.result})`;
                        if (response.header.result == message.EC.XG_INVALID_ROLEID_OR_SESSION) msg = "账号已在其他设备登录，确定返回登录界面";
                        if (response.header.result == message.EC.XG_INVALID_LOGIN) msg = "已被管理员强制下线，确定返回登录界面";
                        if (response.header.result == message.EC.XG_INVALID_ARG) msg = "服务器已重新启动，确定返回登录界面";
                        if (response.header.result == message.EC.XC_SERVER_ID_NOT_EXIST) msg = "服务器已完全断开，确定返回登录界面";
                        if (response.header.result == message.EC.XG_SERVER_RESTART) msg = "服务器已重新启动，确定返回登录界面";
                        if (response.header.result == message.EC.XG_PLUGIN_CHECK_SPEEDUP) msg = "检测到您的网络环境不佳，请检测网络环境后重新进入游戏";
                        dialog.setInfo(msg, () => {
                            this.logout();
                            this.reLogin();
                        }, this);
                    });
                return;
            }

            this.web_pay = response.body.web_pay;
            this.customer_web_pay = response.body.customer_web_pay;
            this.lastPower = response.body.lastPower;
            this.loginInterval = response.body.loginInterval;

            // 解压gameinfo信息
            let para = {}
            para["index"] = 4
            let inflate = new Zlib.Inflate(response.body.gameInfo, para);
            let plain = inflate.decompress();
            let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
            let gameInfo = new message.GameInfo()
            if (!gameInfo.parse_bytes(decoder)) {
                toast(LANG("游戏数据解析失败"));
                this.showReconnectUI(false);
                if (Game.UIManager.topScene() instanceof LoadingScene) Game.UIManager.popScene();
                return;
            }
            this.onUpdateGameInfo(gameInfo);

            this.loginState = 2; // 登录成功

            Game.EventManager.event(GameEvent.NET_SERVER_CONNECTED, {}); // 登录成功后广播事件

            // 定时心跳
            if (this.timer) this.timer.stop();
            this.timer = new egret.Timer(this.keepliveInterval, 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.doKeepLive, this);
            this.timer.start();

            // 转到主城界面
            //Game.UIManager.popAllScenesAndDialogs();
            this.doKeepLive();
            this.doCheckVersion();

            // 重新进入主城
            if (this.reconnect_fail_count <= 0 || this.reconnect_fail_count > 3) {
                Teach.cleanTeach();
                Game.TeachSystem.uninit();
                Game.TeachSystem.init();
               SceneManager.instance.ReEnterMainCityNew(); // 自动重连不进主城
           }
           this.reconnect_fail_count = 0; // 清0
            return;
        }

        // 登录游戏回复
        private onLoginGameResponse(req: aone.AoneRequest, resp: aone.AoneResponse) {
            let request = <message.LoginGameserverRequest>req;
            let response = <message.LoginGameserverResponse>resp;
            if (response.header.result != 0) {
                loadUI(ConfirmOkDialog)
                    .then((dialog: ConfirmOkDialog) => {
                        if (Game.UIManager.topScene() instanceof LoadingScene) Game.UIManager.popScene();
                        dialog.show(UI.SHOW_FILL_OUT);
                        let msg = `${Game.ConfigManager.getAone2CodeReason(response.header.result)}(${response.header.result})`;
                        dialog.setInfo(msg, () => {
                            this.logout();
                        }, this);
                    });
                return;
            }

            this.sessionId = response.body.sessionId;
            this.web_pay = response.body.web_pay;
            this.customer_web_pay = response.body.customer_web_pay;
            this.m_shareRoleid = response.body.share_roleId;
            this.loginInterval = response.body.loginInterval;

            // 解压gameinfo信息
            let para = {}
            para["index"] = 4
            let inflate = new Zlib.Inflate(response.body.gameInfo, para);
            let plain = inflate.decompress();
            let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
            let gameInfo = new message.GameInfo()
            if (!gameInfo.parse_bytes(decoder)) {
                toast(LANG("游戏数据解析失败"));
                this.showReconnectUI(false);
                if (Game.UIManager.topScene() instanceof LoadingScene) Game.UIManager.popScene();
                return;
            }

            // 更新各个系统
            Game.EventManager.event(GameEvent.PLAYER_LOGIN_GAMESERVER_INFO, response.body);
            this.onUpdateGameInfo(gameInfo);

            // 拉取帮会等其他数据
            let other_request = new message.QueryRoleOtherInfoRequest();
            if (!this.transfer.send(other_request, this.onQueryRoleOtherInfoResponse, this.onLoginGameTimeout, this, false)) {
                this.showReconnectUI(false);
                if (Game.UIManager.topScene() instanceof LoadingScene) Game.UIManager.popScene();
                return;
            }
        }

        private onQueryRoleOtherInfoResponse(req: aone.AoneRequest, resp: aone.AoneResponse) {
            let request = <message.QueryRoleOtherInfoRequest>req;
            let response = <message.QueryRoleOtherInfoResponse>resp;
            if (response.header.result != 0) {
                toast(LANG("游戏数据拉取失败"));
                this.showReconnectUI(false);
                if (Game.UIManager.topScene() instanceof LoadingScene) Game.UIManager.popScene();
                return;
            }

            // 解压其他gameinfo信息
            let para = {}
            para["index"] = 4
            let inflate = new Zlib.Inflate(response.body.otherInfo, para);
            let plain = inflate.decompress();
            let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
            let otherGameInfo = new message.OtherGameInfo()
            if (!otherGameInfo.parse_bytes(decoder)) {
                toast_warning(LANG("其他游戏数据解析失败"));
                this.showReconnectUI(false);
                if (Game.UIManager.topScene() instanceof LoadingScene) Game.UIManager.popScene();
                return;
            }

            this.loginState = 2; // 登录成功
           this.reconnect_fail_count = 0; // 清0

            EventTracker.track('角色登录', {
                "user_id": this.roleinfo.user_id.toString(),
                "role_id": this.roleinfo.role_id.toString(),
                "role_name": this.roleinfo.role_name,
                "group_id": this.selectGroup.group_id.toString()
            });

            //toast_success(LANG("登录游戏成功V3"));

            // 更新各个系统
            this.onUpdateOtherGameInfo(otherGameInfo);

            Game.EventManager.event(GameEvent.NET_SERVER_CONNECTED, {}); // 登录成功后广播事件

            // 向平台更新角色信息
            AoneTracker.track("login");
            if (this.isNewRole) {
                AoneTracker.track("createRole");
            }

            // 定时心跳
            if (this.timer) this.timer.stop();
            this.timer = new egret.Timer(this.keepliveInterval, 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.doKeepLive, this);
            this.timer.start();

            // 转到主城界面(如果新手引导开启并且演示关未结束 跳转到演示关)
            // Device.isTeachOpen == true 新手引导开启 关闭新手引导修改Device.isTeachOpen = false
            // Device.isReviewSwitch评审版标志  为true时不开启新手引导
            // Device.isTeachOpen = false
            this.isShowMainCity(!Device.isTeachOpen && !Device.isReviewSwitch);
            this.doKeepLive();
            return;
        }

        private gotoMainCityScene() {
            SceneManager.instance.EnterMainCityLogin();
        }
        private isShowMainCity(isShow: boolean) {
            if (isShow) {
                // Game.TeachSystem.QueryTeach().then((teachItems: Array<message.TeachItem>) => {
                //     Teach.nServerPart = teachItems;
                //     Game.TeachSystem.init();
                this.gotoMainCityScene();
                // });
            }
            else {
                let self = this;
                Game.TeachSystem.QueryTeach().then((teachItems: Array<message.TeachItem>) => {
                    Teach.nServerPart = teachItems;
                    Teach.nServerPartLocal = Teach.nServerPart;
                    Teach.m_bOpenTeach = true
                    if (Teach.m_bOpenTeach == true) {
                        if (Teach.isDone(teachBattle.teachPart) == false) {
                            loadUI(Common_Animation).then((dialog: Common_Animation) => {
                                dialog.show();
                                dialog.LoadAni(1000, () => { });
                            });
                        }
                        else {
                            Game.TeachSystem.init();
                            self.gotoMainCityScene();
                        }
                    }
                    else {
                        self.gotoMainCityScene();
                    }
                }).catch(() => {
                    self.gotoMainCityScene();
                });
            }
        }

        // 登录游戏请求超时
        private onLoginGameTimeout(req: aone.AoneRequest) {
            toast_warning(LANG("登录超时，尝试重新登录..."));
            this.transfer.close();

            // 定时3秒后重试
            if (this.timer) this.timer.stop();
            this.timer = new egret.Timer(3000 + Math.random() * 2000, 1); // 随机分散服务端压力
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.doLoginGame, this);
            this.timer.start();
        }

        private doKeepLive() {
            console.log("////////////////////////////////////////////////////////////////////");
            console.log("/////////////////////////////doKeepLive/////////////////////////////");
            console.log("////////////////////////////////////////////////////////////////////");
            let request = new message.HeartBeatRequest();
            if (!this.transfer.send(request, this.onKeepLiveResponse, this.onKeepLiveTimeout, this, true)) {
                this.isReconnect = true;
                this.doLoginGame();
                return;
            }
        }

        private onKeepLiveTimeout(req: aone.AoneRequest) {
            //toast(LANG("网络似乎有点弱~~"));
            this.showReconnectUI(true);
            return;
        }

        private onKeepLiveResponse(req: aone.AoneRequest, resp: aone.AoneResponse) {
            let request = <message.HeartBeatRequest>req;
            let response = <message.HeartBeatResponse>resp;
            if (response.header.result != 0) {
                loadUI(ConfirmOkDialog)
                    .then((dialog: ConfirmOkDialog) => {
                        dialog.show(UI.SHOW_FILL_OUT);
                        let msg = `${Game.ConfigManager.getAone2CodeReason(response.header.result)}(${response.header.result})`;
                        if (response.header.result == message.EC.XG_PLUGIN_CHECK_SPEEDUP) msg = "检测到您的网络环境不佳，请检测网络环境后重新进入游戏";
                        dialog.setInfo(msg, () => {
                            this.logout();
                            this.reLogin();
                        }, this);
                    });
                return;
            }

            this.lastServerTime = response.body.serverTime;
            this.lastGetTimer = egret.getTimer();
            this.lastPower = response.body.lastPower;
            for (const key in response.body.processes) {
                const element = response.body.processes[key];
                if (element.type == message.EProcessType.PROCESS_TYPE_ACTIVITY_REDPACKET) {
                    this.activity_redpackage_countdown = Game.Controller.curServerTime + element.leftTime;
                    Game.PlayerProgressesSystem.progressMap[element.type] = element;
                    break;
                }
            }
            let newPower = response.body.power;
            Game.PlayerInfoSystem.Power = newPower;
            Game.EventManager.event(GameEvent.PLAYER_POWER_CHANGE, newPower);
            Game.PlayerInfoSystem.checkPowerAdd(response.body.serverTime, response.body.lastPower);

            Game.EventManager.event(GameEvent.HUNTER_USERSTRENG_POWER, { power: response.body.power, lastPower: response.body.lastPower });

            // 设置推送
            PushNotice.NotifyLogin();

            // 定时心跳
            if (this.timer) this.timer.stop();
            this.timer = new egret.Timer(this.keepliveInterval, 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.doKeepLive, this);
            this.timer.start();
        }

        // 检测版本
        private doCheckVersion() {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, this.onCheckVersionResponse, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
            request.open(AppConfig.EntryUrlRoot + "/entry/check_version.do", egret.HttpMethod.POST);
            let checkversion_request = new message.CheckVersionReqBody();
            checkversion_request.device_info = Util.getDeviceInfo();
            checkversion_request.version_info = Util.getAppVersionInfo();
            checkversion_request.auth_key = Util.AuthKey(checkversion_request.device_info.device_id, "");
            request.send(JSON.stringify(checkversion_request));
            //console.log("checkversion request: " + JSON.stringify(checkversion_request));
        }

        private onGetIOError(event: egret.IOErrorEvent): void {
            console.log("检测版本，Ajax调用错误");
        }

        private onCheckVersionResponse(event: egret.Event): void {
            let request = <egret.HttpRequest>event.currentTarget;
            //console.log("checkversion response: " + request.response);

            let json = JSON.parse(request.response);
            if (json.retcode != 0) {
                toast(LANG("检查版本失败:") + json.retcode);
                return;
            }

            let response = <message.CheckVersionRespBody>json.body;
            let version = parseInt(response.update_url);
            if (!version) version = 0;
            if (!Game.Controller.checkVersionScheme(version)) {
                console.log("版本检测拦截，需要重启客户端");
                return;
            }
            return;
        }

        // 检测通过返回true
        public checkVersionScheme(version: number): boolean {
            if (version == 0 || version <= AppConfig.ResourceVersion) return true;

            let rect_back = new eui.Rect();
            rect_back.width = Game.UIManager.stage.stageWidth;
            rect_back.height = Game.UIManager.stage.stageHeight;
            rect_back.fillAlpha = 0;
            egret.Tween.get(rect_back).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
            Game.UIManager.stage.addChild(rect_back);
            let dialog = new NewVersionDialog();
            dialog.width = Game.UIManager.stage.stageWidth;
            dialog.height = Game.UIManager.stage.stageHeight;
            Game.UIManager.stage.addChild(dialog);
            dialog.model().then((bl) => {
                Game.UIManager.stage.removeChild(rect_back);
                Game.UIManager.stage.removeChild(dialog);
                if (bl) zj.platform.restart();
            })
            return false;
        }

        // 注册服务端通知
        private registerNotifyHandlers() {
            // 玩家数据变更
            this.transfer.setNotifyHandler(message.RoleInfoNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.RoleInfoNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_ROLE_INFO, request);
                Game.Controller.onUpdateGameInfo(request.body.gameInfo);
            }, this);

            // 玩家其他数据变更
            this.transfer.setNotifyHandler(message.RoleOtherInfoNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.RoleOtherInfoNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_OTHER_ROLE_INFO, request);
                Game.Controller.onUpdateOtherGameInfo(request.body.otherGameInfo);
            }, this);

            // 跨服聊天频道变化通知
            this.transfer.setNotifyHandler(message.ChatChannelChangeNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.ChatChannelChangeNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_CHAT_CHANNEL, request);
            }, this);

            // 是否参与Ip筛选通知
            this.transfer.setNotifyHandler(message.IPCheckResultNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.IPCheckResultNoticeRequest>ms;
                // 暂时忽略该通知
            }, this);

            // 推送聊天消息
            this.transfer.setNotifyHandler(message.ChatMessageNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.ChatMessageNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, request);
            }, this);

            // 新邮件通知
            this.transfer.setNotifyHandler(message.MailStateNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.MailStateNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_MAIL_STATE, request);
            }, this);

            // 新充值通知
            this.transfer.setNotifyHandler(message.ChargeNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.ChargeNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_CHARGE, request);
            }, this);

            // 申请联盟通知
            this.transfer.setNotifyHandler(message.LeagueApplyNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.LeagueApplyNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_LEAGUE_APPLY, request);
            }, this);

            // 好友申请通知
            this.transfer.setNotifyHandler(message.FriendApplyNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.FriendApplyNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_FRIEND_APPLY, request);
            }, this);

            // 删除阵型通知
            this.transfer.setNotifyHandler(message.RemoveFormationNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.RemoveFormationNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_REMOVE_FORMATION, request);
            }, this);

            // 新手引导通知
            this.transfer.setNotifyHandler(message.TeachStepNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.TeachStepNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_TEACH_STEP, request);
            }, this);

            // 成员加入场景通知
            this.transfer.setNotifyHandler(message.LeagueSceneJoinNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.LeagueSceneJoinNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_LEAGUE_SCENE_JOIN, request);
            }, this);

            // BOSS变化通知
            this.transfer.setNotifyHandler(message.LeagueBossNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.LeagueBossNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_LEAGUE_BOSS, request);
            }, this);

            // BOSS伤害排行榜通知
            this.transfer.setNotifyHandler(message.LeagueBossRankNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.LeagueBossRankNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_LEAGUE_BOSS_RANK, request);
            }, this);

            // 通知联盟成员信息变化
            this.transfer.setNotifyHandler(message.LeagueMemberNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.LeagueMemberNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, request);
            }, this);

            // 联盟加餐通知
            this.transfer.setNotifyHandler(message.LeagueBossPartyNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.LeagueBossPartyNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_LEAGUE_BOSS_PARTY, request);
            }, this);

            // 联盟副本变化通知
            this.transfer.setNotifyHandler(message.LeagueInstanceNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.LeagueInstanceNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_LEAGUE_INSTANCE, request);
            }, this);

            // 联赛联盟信息变化
            this.transfer.setNotifyHandler(message.LeagueMatchBattleNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.LeagueMatchBattleNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_LEAGUE_MATCH_BATTLE, request);
            }, this);

            // 场景推送其他玩家位置
            this.transfer.setNotifyHandler(message.SceneItemPosInfoNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.SceneItemPosInfoNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS_INFO, request);
            }, this);

            // 推送对方战斗结果
            this.transfer.setNotifyHandler(message.BattleImitateResultNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.BattleImitateResultNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_BATTLE_IMITATE_RESULT, request);
            }, this);

            // 推送其他玩家位置
            this.transfer.setNotifyHandler(message.SceneItemPosNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.SceneItemPosNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_SCENE_ITEM_POS, request);
            }, this);

            // 仙境玩家信息
            this.transfer.setNotifyHandler(message.WonderlandRoleInfoNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.WonderlandRoleInfoNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_WONDERLAND_ROLE_INFO, request);
            }, this);

            // 仙境boss血量变化
            this.transfer.setNotifyHandler(message.BossHpChangeNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.BossHpChangeNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_BOSS_HP_CHANGE, request);
            }, this);

            // 仙境BOSS玩家信息
            this.transfer.setNotifyHandler(message.BossRoleInfoNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.BossRoleInfoNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_BOSS_ROLE_INFO, request);
            }, this);

            // 仙境boss结算信息
            this.transfer.setNotifyHandler(message.SceneBossResultNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.SceneBossResultNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_SCENE_BOSS_RESULT, request);
            }, this);

            // 推送匹配成功信息
            this.transfer.setNotifyHandler(message.MatchingResultNoticeRequest.ID, (ms: aone.AoneMessage) => {
                let request = <message.MatchingResultNoticeRequest>ms;
                Game.EventManager.event(GameEvent.SERVER_NOTICE_MATCHING_RESULT, request);
            }, this);
        }

        public onUpdateGameInfo(gameInfo: message.GameInfo) {
            if (gameInfo == null) return;

            let isNeedSetTipsOfAllActivity = false;

            // 1.角色基础数据(取最后一个元素)
            if (gameInfo.baseInfo.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_BASE_INFO_CHANGE, gameInfo.baseInfo[gameInfo.baseInfo.length - 1]);
            }

            // 2.数据杂项(取最后一个元素)
            if (gameInfo.mixUnitInfo.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_MIX_UNIT_INFO_CHANGE, gameInfo.mixUnitInfo[gameInfo.mixUnitInfo.length - 1]);
            }

            // 3.宝物信息(不覆盖)
            if (gameInfo.potatos.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_POTATOS_INFO_CHANGE, gameInfo.potatos);
            }

            // 4.签到信息(取最后一个元素)
            // if (gameInfo.signInfo.length > 0) {
            //     Game.EventManager.event(GameEvent.PLAYER_SIGN_INFO_CHANGE, gameInfo.signInfo[gameInfo.signInfo.length - 1]);
            //     // 领奖提示
            //     Tips.SetTipsOfId(Tips.TAG.AWARD, Tips.TAG.AWARD_SIGN);
            //     Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_SIGN);
            // }

            // 5.物品信息(不覆盖)
            // 6.删除物品(删除没有的物品Id)
            if (gameInfo.goodsInfo.length > 0 || gameInfo.delGoods.length > 0) {
                let ev = new PlayerGoodsInfoChangeEvent(GameEvent.PLAYER_GOODS_INFO_CHANGE);
                ev.goodsInfo = gameInfo.goodsInfo;
                ev.delGoods = gameInfo.delGoods;
                Game.EventManager.dispatchEvent(ev);

                // 背包
                Tips.SetTipsOfId(Tips.TAG.PACKAGE, 1);
                // 福利
                Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GATAWARD);
                Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_UpStar);
                // 时装
                Tips.SetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.FASHION);
                //活动提示（兑换活动，获得红陀螺时）
                //Tips.SetTipsOfAllActivity()
                isNeedSetTipsOfAllActivity = true;
            }

            // 7.执照信息(取最后一个元素)
            if (gameInfo.licenceInfo.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_LICENCE_INFO_CHANGE, gameInfo.licenceInfo[gameInfo.licenceInfo.length - 1]);
            }

            //活动红点
            if (gameInfo.activities.length > 0) {
                //活动红点
                //Tips.SetTipsOfAllActivity();
                isNeedSetTipsOfAllActivity = true;
            }

            // 8.任务信息(不覆盖)
            if (gameInfo.missionInfo.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_MISSION_INFO_CHANGE, gameInfo.missionInfo);
            }

            // 9.每日活跃度(取最后一个元素)
            if (gameInfo.missionActive.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_MISSION_ACTIVE_CHANGE, gameInfo.missionActive[gameInfo.missionActive.length - 1]);
            }

            // 10.武将信息(不覆盖)
            if (gameInfo.generals.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_GENERALS_CHANGE, gameInfo.generals);
            }

            // 11.普通怪物信息(不覆盖)
            if (gameInfo.mobInfos.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_MOB_INFO_CHANGE, gameInfo.mobInfos);
            }

            // 12.副本其他信息(取最后一个元素)
            if (gameInfo.instanceInfo.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_INSTANCE_INFO_CHANGE, gameInfo.instanceInfo[gameInfo.instanceInfo.length - 1]);
            }

            // 13.塔信息(取最后一个元素)
            if (gameInfo.towerInfo.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_TOWER_INFO_CHANGE, gameInfo.towerInfo[gameInfo.towerInfo.length - 1]);
            }

            // 14.军师信息(不覆盖)
            if (gameInfo.advisers.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_ADVISER_INFO_CHANGE, gameInfo.advisers);
            }

            // 15.阵型信息(不覆盖)
            if (gameInfo.formations.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_FORMATION_INFO_CHANGE, gameInfo.formations);
            }

            // 16.进程队列(不覆盖)
            if (gameInfo.progresses.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_PROGRESS_INFO_CHANGE, gameInfo.progresses);
            }

            // 18.联盟成员信息(取最后一个元素)
            if (gameInfo.memberInfo.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_MEMBER_INFO_CHANGE, gameInfo.memberInfo[gameInfo.memberInfo.length - 1]);
            }

            // 19.通缉令(取最后一个元素)
            if (gameInfo.wantedInfo.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_WANTED_INFO_CHANGE, gameInfo.wantedInfo[gameInfo.wantedInfo.length - 1]);
            }

            // 20.所有活动信息(不覆盖)
            if (gameInfo.activities.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_ACTIVITY_INFO_CHANGE, gameInfo.activities);
            }

            // 21.角色属性(取最后一个元素)
            if (gameInfo.otherAttri.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_ROLE_OTHER_ATTRI_CHANGE, gameInfo.otherAttri[gameInfo.otherAttri.length - 1]);
            }

            // 22.神兵信息(不覆盖)
            if (gameInfo.artifacts.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_ARTIFACT_INFO_CHANGE, gameInfo.artifacts);
            }

            // 23.礼包情况(不覆盖)
            // 24.删除礼包(删除已购买的礼包)
            if (gameInfo.giftInfos.length > 0 || gameInfo.delGiftIndexs.length > 0) {
                let ev = new PlayerGiftsInfoChangeEvent(GameEvent.PLAYER_GIFTS_INFO_CHANGE);
                ev.giftInfos = gameInfo.giftInfos;
                ev.delGiftIndexs = gameInfo.delGiftIndexs;
                Game.EventManager.dispatchEvent(ev);
            }

            // 25.已通关最大关卡(不覆盖)
            if (gameInfo.enemyCamp.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_ENEMY_CAMP_CHANGE, gameInfo.enemyCamp);
            }

            // 26.跨服信息
            if (gameInfo.singlecraft.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_SINGLECRAFT_INFO_CHANGE, gameInfo.singlecraft);
            }

            // 27.猎人图鉴
            if (gameInfo.generalHistoryIds.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_GENERAL_HISTORY_IDS_CHANGE, gameInfo.generalHistoryIds);
                // Tips.SetTipsOfId(Tips.TAG.Pokedex);
                // Tips.SetTipsOfId(Tips.TAG.Biography)
            }

            // 28.卡片图鉴
            if (gameInfo.potatoHistoryIds.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_POTATO_HISTORY_IDS_CHANGE, gameInfo.potatoHistoryIds);
            }

            // 30. 宠物信息
            if (gameInfo.petInfo.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_PET_INFO_CHANGE, gameInfo.petInfo);
            }
            if (gameInfo.baseInfo.length > 0 || gameInfo.goodsInfo.length > 0 || gameInfo.delGoods.length > 0 || gameInfo.advisers.length > 0) {
                Tips.SetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.ADVISER_GET);
                Tips.SetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.ADVISER_UP);
                Tips.SetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.ADVISER_AWARD);
                Tips.SetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.PET_GET);
                Tips.SetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.PET_UPSTAR);
                Tips.SetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.PET_STEP);
                // 福利
                Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GATAWARD);
                Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GETPOWER);
                // 荣耀福利
                Tips.SetTipsOfId(Tips.TAG.VIPX, Tips.TAG.VipX_Right);
                // 领奖提示
                Tips.SetTipsOfId(Tips.TAG.AWARD);
                // 背包提示
                Tips.SetTipsOfId(Tips.TAG.PACKAGE, 1);
                // 时装
                Tips.SetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.FASHION);
                // 帮会提示
                Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_DONATE);
                Tips.SetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_APPLY);
            }


            // 物品获得信息
            if (gameInfo.getGoods.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_GET_GOODS_CHANGE, gameInfo.getGoods);
            }

            if (gameInfo.giftInfos.length > 0) {
                Tips.SetTipsOfId(Tips.TAG.NEWGIFT);
                Tips.SetTipsOfId(Tips.TAG.VIPX, Tips.TAG.VipXGift);
            }

            if (gameInfo.missionInfo.length > 0) {
                Tips.SetTipsOfId(Tips.TAG.DAILY, Tips.TAG.DAILY_ACTIVE);
                Tips.SetTipsOfId(Tips.TAG.DAILY, Tips.TAG.DAILY_ACHIEVE);
                Tips.SetTipsOfId(Tips.TAG.RACE, Tips.TAG.RACEDAY);
            }

            if (gameInfo.missionActive.length > 0) {
                Tips.SetTipsOfId(Tips.TAG.DAILY, Tips.TAG.DAILY_GIFT);
                Tips.SetTipsOfId(Tips.TAG.RACE, Tips.TAG.RACEBOX);

                //宝石商店
                Tips.SetTipsOfId(Tips.TAG.Jewel, Tips.TAG.Jewel_Mall)
            }

            if (gameInfo.goodsInfo.length > 0 || gameInfo.potatos.length > 0 || gameInfo.generals.length > 0) {//gameInfo.baseInfo.length > 0 || 
                //武将提示
                if (zj.Game.PlayerHunterSystem.queryAllHunters().length == gameInfo.generals.length) {
                    for (const k in Game.PlayerHunterSystem.queryAllHunters()) {
                        const v = Game.PlayerHunterSystem.queryAllHunters()[k];
                        Tips.SetTipsOfHero(v.general_id);
                    }
                } else if (gameInfo.generals.length == 1) {
                    for (const k in Game.PlayerHunterSystem.queryAllHunters()) {
                        const v = Game.PlayerHunterSystem.queryAllHunters()[k];
                        for (let i = 0; i < gameInfo.generals.length; i++) {
                            if (v.general_id == gameInfo.generals[i].general_id) {
                                Tips.SetTipsOfHero(v.general_id);
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < gameInfo.generals.length; i++) {
                        Tips.SetTipsOfHero(gameInfo.generals[i].general_id);
                    }
                }
                Tips.SetTipsOfAllHero();

                //卡片提示
                Tips.SetTipsOfId(Tips.TAG.POTATO);
            }

            if (gameInfo.generals.length > 0) {
                Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_UpStar);
            }

            if (gameInfo.mobInfos.length > 0 || gameInfo.instanceInfo.length > 0) {
                //遗迹提示
                Tips.SetTipsOfId(Tips.TAG.DarkLand, Tips.TAG.RELIC_INSTANCE);
            }

            if (gameInfo.baseInfo.length > 0) {
                //首充
                Tips.SetTipsOfId(Tips.TAG.FIRST);
                //遗迹
                Tips.SetTipsOfId(Tips.TAG.DarkLand, Tips.TAG.RELIC_INSTANCE);
                //扭蛋机
                Tips.SetTipsOfId(Tips.TAG.EGG);
                Tips.SetTipsOfId(Tips.TAG.NEWGIFT);
                // 通行证
                // Tips.SetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_AWARD)
                // Tips.SetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_MISSION)
            }

            if (gameInfo.wantedInfo.length > 0) {
                Tips.SetTipsOfId(Tips.TAG.DarkLand, Tips.TAG.GROUPDARKFIGHT);
            }

            if (gameInfo.mixUnitInfo.length > 0) {
                //首冲提示
                Tips.SetTipsOfId(Tips.TAG.FIRST);
                // 领奖提示
                Tips.SetTipsOfId(Tips.TAG.AWARD);
                // 福利
                Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_GATAWARD);
                Tips.SetTipsOfId(Tips.TAG.SPECIAL, Tips.TAG.SPECIAL_UpStar);
                //活动
                //Tips.SetTipsOfAllActivity();
                isNeedSetTipsOfAllActivity = true;
                //猎人传记
                Tips.SetTipsOfId(Tips.TAG.Biography);
                //钓鱼提示
                Tips.SetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.FISH);
                //双色果
                Tips.SetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.DOUBLE);
                //猜拳
                Tips.SetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.RUNES);
                // 通行证
                // Tips.SetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_AWARD)
                // Tips.SetTipsOfId(Tips.TAG.PassBattle, Tips.TAG.PASS_MISSION)
            }

            if (gameInfo.licenceInfo.length > 0) {
                //竞技场提示
                Tips.SetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_FIGHT)
                //酒馆提示
                Tips.SetTipsOfId(Tips.TAG.TAVERN, Tips.TAG.TAVERN_FREE)
                //争霸
                Tips.SetTipsOfId(Tips.TAG.LADDER, Tips.TAG.CONTEND_COUNT)
                //跨服战
                Tips.SetTipsOfId(Tips.TAG.LADDER, Tips.TAG.CHARGE_CHALLENGE)
            }

            isNeedSetTipsOfAllActivity = true;
            if (isNeedSetTipsOfAllActivity) {
                Tips.SetTipsOfAllActivity();
            }
        }

        public onUpdateOtherGameInfo(otherGameInfo: message.OtherGameInfo) {
            if (otherGameInfo == null) return;

            // 联盟
            if (otherGameInfo.info.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_LEAGUE_INFO_CHANGE, otherGameInfo.info[0]);
            }

            // 签到
            // if (otherGameInfo.items.length > 0) {
            //     Game.EventManager.event(GameEvent.PLAYER_SIGN_ITEMS_CHANGE, otherGameInfo.items);
            //     Tips.SetTipsOfId(Tips.TAG.AWARD, Tips.TAG.AWARD_SIGN);
            // }

            // 邮件
            if (otherGameInfo.mailBoxs.length > 0) {
                Game.EventManager.event(GameEvent.PLAYER_MAIL_BOX_INFO_CHANGE, otherGameInfo.mailBoxs);
            }

            // 联盟提示
            Tips.SetTipsOfId(Tips.TAG.LEAGUE, 1);
            Tips.SetTipsOfId(Tips.TAG.LEAGUE, 3);
            Tips.SetTipsOfId(Tips.TAG.LEAGUE, 4);
        }
    }
}