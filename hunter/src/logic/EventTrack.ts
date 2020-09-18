namespace zj {

// 埋点记录事件(微信平台)
export class EventTracker {
    public static track(eventName: string, eventParams: Object) {
        if ('wx' in window && 'aldSendEvent' in window['wx']) {
            window['wx']['aldSendEvent'](eventName, eventParams);
        }
    }
}

// 设备埋点
export class DevicePointTracker {
    public static track(sdk_point: number) {
        // 安卓通过aonesdk上传埋点数据到aone平台和热云平台
        if (window['AoneSDKPlatform'] &&　(platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
            egret.ExternalInterface.call("sendToNative_trackDeviceEvent", JSON.stringify({step: sdk_point}));
            return;
        }
        
        // 发送埋点数据到aone平台
        let pageview_count_str = Controller.getGlobalStorageItem("pageview_count");
        let pageview_count = parseInt(pageview_count_str);
        if (!pageview_count_str || isNaN(pageview_count) || pageview_count == undefined) pageview_count = 0;

        let record_request = new message.RecordDevicePointReqBody();
        record_request.sdk_point = sdk_point;
        record_request.device_info = Util.getDeviceInfo();
        record_request.version_info = Util.getAppVersionInfo();
        record_request.is_first_login = (pageview_count <= 1);
        let body = JSON.stringify(record_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("record_device_point response: " + request.response);
            return;
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
            console.warn("record_device_point io error");
            return;
        }, this);
        request.open(AppConfig.ApiUrlRoot + "/api/record_device_point.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("###record_device_point request: " + body);
    }
}

export enum Buried_Point {
    INSTANCE1_7 = 20000,
    PLAYER_LEVEL_5 = 20001,
    PLAYER_LEVEL_10 = 20002,
    PLAYER_LEVEL_15 = 20003,
    PLAYER_LEVEL_20 = 20004,
    PLAYER_LEVEL_25 = 20005,
    PLAYER_LEVEL_30 = 20006
}

// 角色埋点
export class RolePointTracker {
    public static track(game_point: number) {
        // 安卓通过aonesdk上传埋点数据到aone平台和热云平台
        if (window['AoneSDKPlatform'] &&　(platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
            egret.ExternalInterface.call("sendToNative_trackRoleEvent", JSON.stringify({userId: Game.Controller.userID(), roleId: Game.Controller.roleID(), step: game_point}));
            return;
        }

        // 发送埋点数据到aone平台
        let record_request = new message.RecordRolePointReqBody();
        record_request.game_point = game_point;
        record_request.device_info = Util.getDeviceInfo();
        record_request.version_info = Util.getAppVersionInfo();
        record_request.user_id = Game.Controller.userID();
        record_request.cp_role_id = "" + Game.Controller.roleID();
        record_request.cp_role_name = Game.Controller.roleInfo().role_name;
        record_request.cp_group_id = "" + Game.Controller.groupOwnerID();
        let body = JSON.stringify(record_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("record_role_point response: " + request.response);
            return;
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
            console.warn("record_role_point io error");
            return;
        }, this);
        request.open(AppConfig.ApiUrlRoot + "/api/record_role_point.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("###record_role_point request: " + body);
    }
}

// 上传埋点数据到热云平台
// evnetName取值：
//    createRole: 创建角色成功
//    login: 登录
//    purchase: 支付完成
//    ......   其他自定义类型
export class ReyunTracker {
    public static track(eventName: string) {
        // 上传埋点数据到热云平台
        if (window['AoneSDKPlatform'] &&　(platform instanceof window['AoneSDKPlatform'])) {
            let obj = {
                action: "trackReyunEvent",
                evnetName: eventName,
                roleId: "" + Game.Controller.roleID(),
                role_id: "" + Game.Controller.roleID(),
                userId: "" + Game.Controller.userID(),
                user_id: "" + Game.Controller.userID(),
                currency: "CNY",
                order: "",
                zfType: "",
                price: ""
            }
            egret.ExternalInterface.call("sendToNative", JSON.stringify(obj));
            return;
        }
    }
}

// AONE平台埋点需求
export class AoneTracker {
    public static track(eventName: string) {
        // 安卓通过aonesdk上传埋点数据到aone平台
        if (window['AoneSDKPlatform'] &&　(platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
            platform.updateRole(eventName);
            return;
        }

        // 发送埋点数据到aone平台
        let group = Game.Controller.selectedGroup();
        let record_request = new message.RecordRoleLoginReqBody();
        record_request.user_id = Game.Controller.userID();
        record_request.role_id = "" + Game.Controller.roleID();
        record_request.group_id = "" + Game.Controller.groupOwnerID();
        record_request.role_name = Game.Controller.roleInfo().role_name;
        record_request.group_name = group ? AoneTracker.getGroupName(group) : "";
        record_request.device_info = Util.getDeviceInfo();
        record_request.version_info = Util.getAppVersionInfo();
        record_request.version_info.ext = eventName;
        let body = JSON.stringify(record_request);

        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
            let request = <egret.HttpRequest>event.currentTarget;
            console.log("RecordRoleLogin response: " + request.response);
            return;
        }, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
            console.warn("RecordRoleLogin io error");
            return;
        }, this);
        request.open(AppConfig.ApiUrlRoot + "/api/record_role_login.do", egret.HttpMethod.POST);
        request.send(body);
        console.log("###RecordRoleLogin request: " + body);
    }

    private static getGroupName(groupinfo: message.GameGroupInfo): string {
        if (groupinfo == null) return LANG("未知分区");
        let json = JSON.parse(groupinfo.group_name);
        if (typeof json != "object") return this.parseGroupName(groupinfo.group_name);
        if (Game.LanguageManager.getLang() in json) return this.parseGroupName(json[Game.LanguageManager.getLang()]);
        if ('zhcn' in json) return this.parseGroupName(json['zhcn']);
        if ('en' in json) return this.parseGroupName(json['en']);
        for (let k in json) {
            return this.parseGroupName(json[k]);
        }
        return LANG("未知分区");
    }

    // 解析分区名
    private static parseGroupName(groupName: string): string {
        let names = groupName.split("&");
        if (names.length <= 1) return Util.cutString(groupName, 16);
        return Util.cutString(`${names[0]}区 ${names[1]}`, 16);
    }
}

}