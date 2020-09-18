var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // AoneSDK环境支持
    // 本地推送相关
    var PushNotice = (function () {
        function PushNotice() {
        }
        PushNotice.init = function () {
            PushNotice.powerFulltick = zj.Game.LanguageManager.common_push_2.zhcn;
            PushNotice.powerFulltitle = zj.Game.LanguageManager.common_push_1.zhcn;
            PushNotice.powerFullcontent = zj.Game.LanguageManager.common_push_2.zhcn;
            PushNotice.powerGettick = zj.Game.LanguageManager.common_push_6.zhcn;
            PushNotice.powerGettitle = zj.Game.LanguageManager.common_push_5.zhcn;
            PushNotice.powerGetcontent = zj.Game.LanguageManager.common_push_6.zhcn;
            PushNotice.noticeLogintick = zj.Game.LanguageManager.common_push_16.zhcn;
            PushNotice.noticeLogintitle = zj.Game.LanguageManager.common_push_15.zhcn;
            PushNotice.noticeLogincontent = zj.Game.LanguageManager.common_push_16.zhcn;
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, PushNotice.PowerFull, this);
        };
        PushNotice.AddNotify = function (notifyId, tickText, title, content, interval, repeatInterval) {
            if (repeatInterval == undefined || repeatInterval == null)
                repeatInterval = 0;
            var param = {
                action: "AddNotify",
                notifyId: notifyId.toString(),
                tickText: tickText.toString(),
                title: title.toString(),
                content: content.toString(),
                interval: interval.toString(),
                repeatInterval: repeatInterval.toString()
            };
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform'])) {
                egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
            }
            console.log("sendToNative: " + JSON.stringify(param));
        };
        PushNotice.ClearNotify = function (notifyId) {
            var param = {
                action: "ClearNotify",
                notifyId: notifyId.toString(),
            };
            if (window['AoneSDKPlatform'] && (zj.platform instanceof window['AoneSDKPlatform'])) {
                egret.ExternalInterface.call("sendToNative", JSON.stringify(param));
            }
            console.log("sendToNative: " + JSON.stringify(param));
        };
        // 获取当前时间到指定时间的秒数（传入0点到该时间的秒数）
        PushNotice.getInterval = function (time) {
            // 获取当前时间
            var curTime = zj.Game.Controller.serverNow();
            // 获取0点到当前时间的秒数
            var timeS = curTime.getHours() * 3600 + curTime.getMinutes() * 60 + curTime.getSeconds();
            if (timeS <= time) {
                return time - timeS;
            }
            else {
                return time + 24 * 3600 - timeS;
            }
        };
        // 设置根据当前体力设置体力回满推送
        PushNotice.PowerFull = function () {
            console.log("call PushNotice.PowerFull");
            if (!zj.Game.PlayerUserSystem.info.physical) {
                PushNotice.ClearNotify(zj.TableEnum.Enum.NotifyType.PowerFull);
                return;
            }
            // 重新计算体力回满推送时间
            var levelinfo = zj.TableLevel.Item(zj.Game.PlayerInfoSystem.Level);
            if (levelinfo == null) {
                console.log("PowerFull error");
                return;
            }
            var left_power = levelinfo.role_power - zj.Game.PlayerInfoSystem.Power;
            var currServerTime = zj.Game.Controller.serverNow().getTime() / 1000;
            var left_time = zj.CommonConfig.role_add_power_time - Math.floor(currServerTime - zj.Game.Controller.lastPower);
            if (left_time < 0 && left_power > 0) {
                if (zj.Device.GetSaveBoolInfo(zj.StringConfig_Save.power_bug) == false) {
                    zj.Device.SetSaveBoolInfo(zj.StringConfig_Save.power_bug, true);
                    zj.Game.PlayerInfoSystem.BaseInfo.power = zj.Game.PlayerInfoSystem.Power + 1;
                    left_power = left_power - 1;
                }
                left_time = zj.CommonConfig.role_add_power_time + left_time;
            }
            else if (left_power == 0) {
                zj.Game.Controller.lastPower = currServerTime;
                zj.Device.SetSaveBoolInfo(zj.StringConfig_Save.power_bug, false);
            }
            var interval = zj.yuan3(left_power > 0, (left_power - 1) * 300 + left_time, 0);
            console.log("call PushNotice.PowerFull, left_power:" + left_power + ", currServerTime:" + currServerTime + ", lastPower:" + zj.Game.Controller.lastPower + ", left_time: " + left_time + ", interval: " + interval);
            if (isNaN(interval) || interval == undefined)
                return;
            if (interval != 0) {
                PushNotice.AddNotify(zj.TableEnum.Enum.NotifyType.PowerFull, PushNotice.powerFulltick, PushNotice.powerFulltitle, PushNotice.powerFullcontent, interval);
            }
            else {
                PushNotice.ClearNotify(zj.TableEnum.Enum.NotifyType.PowerFull);
            }
        };
        // 设置领体力推送 每天 12点 18点 21点推送
        PushNotice.PowerGet = function () {
            var times = [3600 * 12, 3600 * 18, 3600 * 21];
            var types = [zj.TableEnum.Enum.NotifyType.PowerGet12, zj.TableEnum.Enum.NotifyType.PowerGet18, zj.TableEnum.Enum.NotifyType.PowerGet21];
            if (!zj.Game.PlayerUserSystem.info.physical) {
                for (var i = 0; i < types.length; i++) {
                    PushNotice.ClearNotify(types[i]);
                }
                return;
            }
            for (var i = 0; i < times.length; i++) {
                PushNotice.AddNotify(types[i], PushNotice.powerGettick, PushNotice.powerGettitle, PushNotice.powerGetcontent, PushNotice.getInterval(times[i]), 24 * 3600);
            }
        };
        // 设置一个距离现在24小时后的推送，提醒登陆
        PushNotice.NotifyLogin = function () {
            PushNotice.ClearNotify(zj.TableEnum.Enum.NotifyType.NotifyLogin);
            PushNotice.AddNotify(zj.TableEnum.Enum.NotifyType.NotifyLogin, PushNotice.noticeLogintick, PushNotice.noticeLogintitle, PushNotice.noticeLogincontent, 24 * 3600, 
            //120,
            24 * 3600);
        };
        // 刷新本地推送设置
        PushNotice.RefreshNotice = function (index) {
            if (index == message.ClientOperation.CLIENT_OPERATION_POWERFULL) {
                PushNotice.PowerFull();
            }
            else if (index == message.ClientOperation.CLIENT_OPERATION_POWERREWARD) {
                PushNotice.PowerGet();
            }
        };
        return PushNotice;
    }());
    zj.PushNotice = PushNotice;
    __reflect(PushNotice.prototype, "zj.PushNotice");
})(zj || (zj = {}));
//# sourceMappingURL=PushNotice.js.map