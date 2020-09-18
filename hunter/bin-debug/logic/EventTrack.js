var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 埋点记录事件(微信平台)
    var EventTracker = (function () {
        function EventTracker() {
        }
        EventTracker.track = function (eventName, eventParams) {
            if ('wx' in window && 'aldSendEvent' in window['wx']) {
                window['wx']['aldSendEvent'](eventName, eventParams);
            }
        };
        return EventTracker;
    }());
    zj.EventTracker = EventTracker;
    __reflect(EventTracker.prototype, "zj.EventTracker");
    // 设备埋点
    var DevicePointTracker = (function () {
        function DevicePointTracker() {
        }
        DevicePointTracker.track = function (sdk_point) {
            // 安卓通过aonesdk上传埋点数据到aone平台和热云平台
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
                egret.ExternalInterface.call("sendToNative_trackDeviceEvent", JSON.stringify({ step: sdk_point }));
                return;
            }
            // 发送埋点数据到aone平台
            var pageview_count_str = zj.Controller.getGlobalStorageItem("pageview_count");
            var pageview_count = parseInt(pageview_count_str);
            if (!pageview_count_str || isNaN(pageview_count) || pageview_count == undefined)
                pageview_count = 0;
            var record_request = new message.RecordDevicePointReqBody();
            record_request.sdk_point = sdk_point;
            record_request.device_info = zj.Util.getDeviceInfo();
            record_request.version_info = zj.Util.getAppVersionInfo();
            record_request.is_first_login = (pageview_count <= 1);
            var body = JSON.stringify(record_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("record_device_point response: " + request.response);
                return;
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                console.warn("record_device_point io error");
                return;
            }, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/record_device_point.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("###record_device_point request: " + body);
        };
        return DevicePointTracker;
    }());
    zj.DevicePointTracker = DevicePointTracker;
    __reflect(DevicePointTracker.prototype, "zj.DevicePointTracker");
    var Buried_Point;
    (function (Buried_Point) {
        Buried_Point[Buried_Point["INSTANCE1_7"] = 20000] = "INSTANCE1_7";
        Buried_Point[Buried_Point["PLAYER_LEVEL_5"] = 20001] = "PLAYER_LEVEL_5";
        Buried_Point[Buried_Point["PLAYER_LEVEL_10"] = 20002] = "PLAYER_LEVEL_10";
        Buried_Point[Buried_Point["PLAYER_LEVEL_15"] = 20003] = "PLAYER_LEVEL_15";
        Buried_Point[Buried_Point["PLAYER_LEVEL_20"] = 20004] = "PLAYER_LEVEL_20";
        Buried_Point[Buried_Point["PLAYER_LEVEL_25"] = 20005] = "PLAYER_LEVEL_25";
        Buried_Point[Buried_Point["PLAYER_LEVEL_30"] = 20006] = "PLAYER_LEVEL_30";
    })(Buried_Point = zj.Buried_Point || (zj.Buried_Point = {}));
    // 角色埋点
    var RolePointTracker = (function () {
        function RolePointTracker() {
        }
        RolePointTracker.track = function (game_point) {
            // 安卓通过aonesdk上传埋点数据到aone平台和热云平台
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
                egret.ExternalInterface.call("sendToNative_trackRoleEvent", JSON.stringify({ userId: zj.Game.Controller.userID(), roleId: zj.Game.Controller.roleID(), step: game_point }));
                return;
            }
            // 发送埋点数据到aone平台
            var record_request = new message.RecordRolePointReqBody();
            record_request.game_point = game_point;
            record_request.device_info = zj.Util.getDeviceInfo();
            record_request.version_info = zj.Util.getAppVersionInfo();
            record_request.user_id = zj.Game.Controller.userID();
            record_request.cp_role_id = "" + zj.Game.Controller.roleID();
            record_request.cp_role_name = zj.Game.Controller.roleInfo().role_name;
            record_request.cp_group_id = "" + zj.Game.Controller.groupOwnerID();
            var body = JSON.stringify(record_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("record_role_point response: " + request.response);
                return;
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                console.warn("record_role_point io error");
                return;
            }, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/record_role_point.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("###record_role_point request: " + body);
        };
        return RolePointTracker;
    }());
    zj.RolePointTracker = RolePointTracker;
    __reflect(RolePointTracker.prototype, "zj.RolePointTracker");
    // 上传埋点数据到热云平台
    // evnetName取值：
    //    createRole: 创建角色成功
    //    login: 登录
    //    purchase: 支付完成
    //    ......   其他自定义类型
    var ReyunTracker = (function () {
        function ReyunTracker() {
        }
        ReyunTracker.track = function (eventName) {
            // 上传埋点数据到热云平台
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform'])) {
                var obj = {
                    action: "trackReyunEvent",
                    evnetName: eventName,
                    roleId: "" + zj.Game.Controller.roleID(),
                    role_id: "" + zj.Game.Controller.roleID(),
                    userId: "" + zj.Game.Controller.userID(),
                    user_id: "" + zj.Game.Controller.userID(),
                    currency: "CNY",
                    order: "",
                    zfType: "",
                    price: ""
                };
                egret.ExternalInterface.call("sendToNative", JSON.stringify(obj));
                return;
            }
        };
        return ReyunTracker;
    }());
    zj.ReyunTracker = ReyunTracker;
    __reflect(ReyunTracker.prototype, "zj.ReyunTracker");
    // AONE平台埋点需求
    var AoneTracker = (function () {
        function AoneTracker() {
        }
        AoneTracker.track = function (eventName) {
            // 安卓通过aonesdk上传埋点数据到aone平台
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform']) && egret.Capabilities.os == "Android") {
                zj.platform.updateRole(eventName);
                return;
            }
            // 发送埋点数据到aone平台
            var group = zj.Game.Controller.selectedGroup();
            var record_request = new message.RecordRoleLoginReqBody();
            record_request.user_id = zj.Game.Controller.userID();
            record_request.role_id = "" + zj.Game.Controller.roleID();
            record_request.group_id = "" + zj.Game.Controller.groupOwnerID();
            record_request.role_name = zj.Game.Controller.roleInfo().role_name;
            record_request.group_name = group ? AoneTracker.getGroupName(group) : "";
            record_request.device_info = zj.Util.getDeviceInfo();
            record_request.version_info = zj.Util.getAppVersionInfo();
            record_request.version_info.ext = eventName;
            var body = JSON.stringify(record_request);
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var request = event.currentTarget;
                console.log("RecordRoleLogin response: " + request.response);
                return;
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                console.warn("RecordRoleLogin io error");
                return;
            }, this);
            request.open(zj.AppConfig.ApiUrlRoot + "/api/record_role_login.do", egret.HttpMethod.POST);
            request.send(body);
            console.log("###RecordRoleLogin request: " + body);
        };
        AoneTracker.getGroupName = function (groupinfo) {
            if (groupinfo == null)
                return zj.LANG("未知分区");
            var json = JSON.parse(groupinfo.group_name);
            if (typeof json != "object")
                return this.parseGroupName(groupinfo.group_name);
            if (zj.Game.LanguageManager.getLang() in json)
                return this.parseGroupName(json[zj.Game.LanguageManager.getLang()]);
            if ('zhcn' in json)
                return this.parseGroupName(json['zhcn']);
            if ('en' in json)
                return this.parseGroupName(json['en']);
            for (var k in json) {
                return this.parseGroupName(json[k]);
            }
            return zj.LANG("未知分区");
        };
        // 解析分区名
        AoneTracker.parseGroupName = function (groupName) {
            var names = groupName.split("&");
            if (names.length <= 1)
                return zj.Util.cutString(groupName, 16);
            return zj.Util.cutString(names[0] + "\u533A " + names[1], 16);
        };
        return AoneTracker;
    }());
    zj.AoneTracker = AoneTracker;
    __reflect(AoneTracker.prototype, "zj.AoneTracker");
})(zj || (zj = {}));
//# sourceMappingURL=EventTrack.js.map